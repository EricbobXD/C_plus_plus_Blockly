const STANDARD_EXTENSIONS = [
  'contextMenu_newGetVariableBlock',
  'contextMenu_variableDynamicSetterGetter',
  'contextMenu_variableSetterGetter',
  'controls_for_tooltip',
  'controls_forEach_tooltip',
  'controls_flow_tooltip',
  'controls_flow_in_loop_check',
  'controls_if_tooltip',
  'controls_whileUntil_tooltip',
  'logic_compare',
  'logic_op_tooltip',
  'logic_ternary',
  'math_change_tooltip',
  'math_op_tooltip',
  'parent_tooltip_when_inline',
  'text_append_tooltip',
  'text_indexOf_tooltip',
  'text_quotes',
];

function variableContextMenuMixin(Blockly, dynamic = false) {
  const makeCreateCallback = (block, type, field) => {
    const state = { type, fields: { VAR: field.saveState(true) } };
    return Blockly.ContextMenu.callbackFactory(block, state);
  };
  const renameOrDelete = (block, action) => () => {
    const variable = block.getField('VAR')?.getVariable();
    if (!variable) return;
    if (action === 'rename') Blockly.Variables.renameVariable(block.workspace, variable);
    else Blockly.Variables.deleteVariable(block.workspace, variable, block);
  };
  return {
    customContextMenu(options) {
      const getterTypes = dynamic ? ['variables_get_dynamic', 'variables_get_reporter_dynamic'] : ['variables_get', 'variables_get_reporter'];
      const getter = getterTypes.includes(this.type);
      const setterType = dynamic ? 'variables_set_dynamic' : 'variables_set';
      const getterType = dynamic ? 'variables_get_dynamic' : 'variables_get';
      const field = this.getField('VAR');
      if (!field) return;
      if (!this.isInFlyout) {
        const type = getter ? setterType : getterType;
        const textKey = getter ? 'VARIABLES_GET_CREATE_SET' : 'VARIABLES_SET_CREATE_GET';
        const label = Blockly.Msg[textKey] || (getter ? '建立「%1」的設定方塊' : '建立「%1」的取得方塊');
        options.push({
          text: label.replace('%1', field.getText()),
          enabled: this.workspace.remainingCapacity() > 0,
          callback: makeCreateCallback(this, type, field),
        });
        return;
      }
      if (!getter) return;
      const name = field.getText();
      options.unshift(
        { text: Blockly.Msg.RENAME_VARIABLE || '重新命名變數', enabled: true, callback: renameOrDelete(this, 'rename') },
        { text: (Blockly.Msg.DELETE_VARIABLE || '刪除變數 %1').replace('%1', name), enabled: true, callback: renameOrDelete(this, 'delete') },
      );
    },
    ...(dynamic ? {
      onchange() {
        const variable = Blockly.Variables.getVariable(this.workspace, this.getFieldValue('VAR'));
        if (!variable) return;
        if (getterTypesFor(this.type)) this.outputConnection?.setCheck(variable.getType());
        else this.getInput('VALUE')?.connection?.setCheck(variable.getType());
      },
    } : {}),
  };
}

function getterTypesFor(type) {
  return type === 'variables_get_dynamic' || type === 'variables_get_reporter_dynamic';
}

function tooltipByDropdown(Blockly, fieldName, messageByValue, fallbackKey) {
  return function () {
    this.setTooltip(() => {
      const key = messageByValue[this.getFieldValue(fieldName)] || fallbackKey;
      return Blockly.Msg[key] || '';
    });
  };
}

function registerExtensionIfMissing(Blockly, name, extension) {
  if (!Blockly.Extensions.isRegistered(name)) Blockly.Extensions.register(name, extension);
}

function registerMixinIfMissing(Blockly, name, mixin) {
  if (!Blockly.Extensions.isRegistered(name)) Blockly.Extensions.registerMixin(name, mixin);
}

function logicCompareExtension() {
  this.getField('OP')?.setValidator((operation) => {
    const check = ['LT', 'LTE', 'GT', 'GTE'].includes(operation) ? 'Number' : null;
    this.getInput('A')?.setCheck(check);
    this.getInput('B')?.setCheck(check);
    return operation;
  });
}

function logicTernaryExtension() {
  const updateOutputCheck = () => {
    const thenBlock = this.getInputTargetBlock('THEN');
    const elseBlock = this.getInputTargetBlock('ELSE');
    const thenCheck = thenBlock?.outputConnection?.getCheck();
    const elseCheck = elseBlock?.outputConnection?.getCheck();
    const common = thenCheck && elseCheck && thenCheck.some((check) => elseCheck.includes(check))
      ? thenCheck.filter((check) => elseCheck.includes(check))
      : null;
    this.outputConnection?.setCheck(common);
  };
  this.setOnChange((event) => {
    if (event?.type === Blockly.Events.BLOCK_MOVE || event?.type === Blockly.Events.BLOCK_CREATE || event?.type === Blockly.Events.BLOCK_DELETE) updateOutputCheck();
  });
  updateOutputCheck();
}

function controlsFlowInLoopExtension(Blockly) {
  return function () {
    this.setOnChange((event) => {
      if (!event || ![Blockly.Events.BLOCK_MOVE, Blockly.Events.BLOCK_CREATE].includes(event.type)) return;
      let parent = this.getSurroundParent();
      let inLoop = false;
      while (parent) {
        if (['controls_repeat', 'controls_repeat_ext', 'controls_forEach', 'controls_for', 'controls_whileUntil'].includes(parent.type)) { inLoop = true; break; }
        parent = parent.getSurroundParent();
      }
      this.setWarningText(inLoop ? null : (Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING || '此方塊必須放在迴圈內。'));
      this.setDisabledReason?.(!inLoop, 'CONTROL_FLOW_NOT_IN_LOOP');
    });
  };
}

function registerMutatorIfMissing(Blockly, name, mixin, helperBlocks = [], helperFn = null) {
  if (!Blockly.Extensions.isRegistered(name)) {
    Blockly.Extensions.registerMutator(name, mixin, helperFn, helperBlocks);
  }
}

function controlsIfMixin(Blockly) {
  return {
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('elseif', this.elseifCount_ || 0);
      mutation.setAttribute('else', this.elseCount_ ? 1 : 0);
      return mutation;
    },
    domToMutation(mutation) {
      this.elseifCount_ = Math.max(0, Number(mutation.getAttribute('elseif')) || 0);
      this.elseCount_ = mutation.getAttribute('else') === '1' ? 1 : 0;
      this.updateCompatibilityShape_();
    },
    updateCompatibilityShape_() {
      for (let i = 1; i < 100; i++) {
        if (this.getInput(`IF${i}`)) this.removeInput(`IF${i}`);
        if (this.getInput(`DO${i}`)) this.removeInput(`DO${i}`);
      }
      if (this.getInput('ELSE')) this.removeInput('ELSE');
      for (let i = 1; i <= (this.elseifCount_ || 0); i++) {
        this.appendValueInput(`IF${i}`).setCheck('Boolean').appendField('否則如果');
        this.appendStatementInput(`DO${i}`).appendField('執行');
      }
      if (this.elseCount_) this.appendStatementInput('ELSE').appendField('否則');
    },
    decompose(workspace) {
      const root = workspace.newBlock('controls_if_if');
      root.initSvg();
      let connection = root.nextConnection;
      for (let i = 0; i < (this.elseifCount_ || 0); i++) {
        const clause = workspace.newBlock('controls_if_elseif');
        clause.initSvg();
        connection.connect(clause.previousConnection);
        connection = clause.nextConnection;
      }
      if (this.elseCount_) {
        const clause = workspace.newBlock('controls_if_else');
        clause.initSvg();
        connection.connect(clause.previousConnection);
      }
      return root;
    },
    compose(root) {
      const valueConnections = [this.getInput('IF0')?.connection.targetConnection || null];
      const statementConnections = [this.getInput('DO0')?.connection.targetConnection || null];
      let elseifCount = 0;
      let elseCount = 0;
      let elseConnection = null;
      let clause = root.nextConnection?.targetBlock() || null;
      while (clause) {
        if (clause.type === 'controls_if_elseif') {
          valueConnections.push(clause.valueConnection_ || null);
          statementConnections.push(clause.statementConnection_ || null);
          elseifCount++;
        } else if (clause.type === 'controls_if_else') {
          elseCount = 1;
          elseConnection = clause.statementConnection_ || null;
        }
        clause = clause.nextConnection?.targetBlock() || null;
      }
      for (let i = 0; i < 100; i++) {
        this.getInput(`IF${i}`)?.connection.targetConnection?.disconnect();
        this.getInput(`DO${i}`)?.connection.targetConnection?.disconnect();
      }
      this.getInput('ELSE')?.connection.targetConnection?.disconnect();
      this.elseifCount_ = elseifCount;
      this.elseCount_ = elseCount;
      this.updateCompatibilityShape_();
      for (let i = 0; i <= elseifCount; i++) {
        if (valueConnections[i]) this.getInput(`IF${i}`)?.connection.connect(valueConnections[i]);
        if (statementConnections[i]) this.getInput(`DO${i}`)?.connection.connect(statementConnections[i]);
      }
      if (elseCount && elseConnection) this.getInput('ELSE')?.connection.connect(elseConnection);
    },
    saveConnections(root) {
      let clause = root.nextConnection?.targetBlock() || null;
      let index = 1;
      while (clause) {
        if (clause.type === 'controls_if_elseif') {
          clause.valueConnection_ = this.getInput(`IF${index}`)?.connection.targetConnection || null;
          clause.statementConnection_ = this.getInput(`DO${index}`)?.connection.targetConnection || null;
          index++;
        } else if (clause.type === 'controls_if_else') {
          clause.statementConnection_ = this.getInput('ELSE')?.connection.targetConnection || null;
        }
        clause = clause.nextConnection?.targetBlock() || null;
      }
    },
  };
}

function textJoinMixin(Blockly) {
  return {
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('items', this.itemCount_ || 2);
      return mutation;
    },
    domToMutation(mutation) {
      this.itemCount_ = Math.min(100, Math.max(2, Number(mutation.getAttribute('items')) || 2));
      this.updateCompatibilityShape_();
    },
    updateCompatibilityShape_() {
      const count = Math.min(100, Math.max(2, this.itemCount_ || 2));
      for (let i = 0; i < 100; i++) {
        if (this.getInput(`ADD${i}`)) this.removeInput(`ADD${i}`);
      }
      for (let i = 0; i < count; i++) this.appendValueInput(`ADD${i}`).setCheck('String');
    },
    decompose(workspace) {
      const container = workspace.newBlock('text_create_join_container');
      container.initSvg();
      let connection = container.getInput('STACK').connection;
      for (let i = 0; i < (this.itemCount_ || 2); i++) {
        const item = workspace.newBlock('text_create_join_item');
        item.initSvg();
        connection.connect(item.previousConnection);
        connection = item.nextConnection;
      }
      return container;
    },
    compose(container) {
      const connections = [];
      let item = container.getInputTargetBlock('STACK');
      while (item) {
        if (item.type === 'text_create_join_item') connections.push(item.valueConnection_ || null);
        item = item.nextConnection?.targetBlock() || null;
      }
      for (let i = 0; i < (this.itemCount_ || 2); i++) this.getInput(`ADD${i}`)?.connection.targetConnection?.disconnect();
      this.itemCount_ = Math.max(2, connections.length);
      this.updateCompatibilityShape_();
      connections.forEach((connection, index) => {
        if (connection) this.getInput(`ADD${index}`)?.connection.connect(connection);
      });
    },
    saveConnections(container) {
      let item = container.getInputTargetBlock('STACK');
      let index = 0;
      while (item) {
        if (item.type === 'text_create_join_item') item.valueConnection_ = this.getInput(`ADD${index++}`)?.connection.targetConnection || null;
        item = item.nextConnection?.targetBlock() || null;
      }
    },
  };
}

function mathDivisibleMixin(Blockly) {
  return {
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('divisor_input', String(this.getFieldValue('PROPERTY') === 'DIVISIBLE_BY'));
      return mutation;
    },
    domToMutation(mutation) {
      this.updateCompatibilityDivisor_(mutation.getAttribute('divisor_input') === 'true');
    },
    updateCompatibilityDivisor_(show) {
      const exists = this.getInput('DIVISOR');
      if (show && !exists) this.appendValueInput('DIVISOR').setCheck('Number');
      if (!show && exists) this.removeInput('DIVISOR');
    },
  };
}

function mathListModesMixin(Blockly) {
  return {
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('op', this.getFieldValue('OP'));
      return mutation;
    },
    domToMutation(mutation) {
      this.updateCompatibilityOutput_(mutation.getAttribute('op'));
    },
    updateCompatibilityOutput_(operation) {
      this.outputConnection?.setCheck(operation === 'MODE' ? 'Array' : 'Number');
    },
  };
}

function textCharAtMixin(Blockly) {
  return {
    isAt_: true,
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('at', String(this.isAt_));
      return mutation;
    },
    domToMutation(mutation) {
      this.updateCompatibilityAt_(mutation.getAttribute('at') !== 'false');
    },
    updateCompatibilityAt_(show) {
      this.removeInput('AT', true);
      if (show) this.appendValueInput('AT').setCheck('Number');
      this.isAt_ = show;
    },
  };
}

export function registerBuiltinMutatorCompatibility(Blockly) {
  registerExtensionIfMissing(Blockly, 'logic_compare', logicCompareExtension);
  registerExtensionIfMissing(Blockly, 'logic_ternary', logicTernaryExtension);
  registerExtensionIfMissing(Blockly, 'controls_flow_in_loop_check', controlsFlowInLoopExtension(Blockly));
  const extensions = {
    contextMenu_variableSetterGetter: variableContextMenuMixin(Blockly),
    contextMenu_variableDynamicSetterGetter: variableContextMenuMixin(Blockly, true),
    contextMenu_newGetVariableBlock: { customContextMenu(options) {
        if (this.isInFlyout || this.isCollapsed() || this.getField('VAR')?.getValue() == null) return;
        const field = this.getField('VAR');
        options.push({
          text: (Blockly.Msg.VARIABLES_SET_CREATE_GET || '建立「取得 %1」').replace('%1', field.getText()),
          enabled: true,
          callback: Blockly.ContextMenu.callbackFactory(this, { type: 'variables_get', fields: { VAR: field.saveState(true) } }),
        });
      } },
    controls_for_tooltip: Blockly.Extensions.buildTooltipWithFieldText('%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR'),
    controls_forEach_tooltip: Blockly.Extensions.buildTooltipWithFieldText('%{BKY_CONTROLS_FOREACH_TOOLTIP}', 'VAR'),
    controls_flow_tooltip: tooltipByDropdown(Blockly, 'FLOW', { BREAK: 'CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK', CONTINUE: 'CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE' }, 'CONTROLS_FLOW_STATEMENTS_TOOLTIP'),
    controls_if_tooltip() {
      this.setTooltip(() => {
        const count = this.elseifCount_ || 0;
        const key = count && this.elseCount_ ? 'CONTROLS_IF_TOOLTIP_4'
          : count ? 'CONTROLS_IF_TOOLTIP_3'
            : this.elseCount_ ? 'CONTROLS_IF_TOOLTIP_2' : 'CONTROLS_IF_TOOLTIP_1';
        return Blockly.Msg[key] || Blockly.Msg.CONTROLS_IF_TOOLTIP || '';
      });
    },
    controls_whileUntil_tooltip: tooltipByDropdown(Blockly, 'MODE', { WHILE: 'CONTROLS_WHILEUNTIL_TOOLTIP_WHILE', UNTIL: 'CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL' }, 'CONTROLS_WHILEUNTIL_TOOLTIP'),
    logic_op_tooltip: tooltipByDropdown(Blockly, 'OP', { AND: 'LOGIC_OPERATION_TOOLTIP_AND', OR: 'LOGIC_OPERATION_TOOLTIP_OR' }, 'LOGIC_OPERATION_TOOLTIP'),
    math_change_tooltip: Blockly.Extensions.buildTooltipWithFieldText('%{BKY_MATH_CHANGE_TOOLTIP}', 'VAR'),
    math_op_tooltip: tooltipByDropdown(Blockly, 'OP', { ADD: 'MATH_ARITHMETIC_TOOLTIP_ADD', MINUS: 'MATH_ARITHMETIC_TOOLTIP_MINUS', MULTIPLY: 'MATH_ARITHMETIC_TOOLTIP_MULTIPLY', DIVIDE: 'MATH_ARITHMETIC_TOOLTIP_DIVIDE', POWER: 'MATH_ARITHMETIC_TOOLTIP_POWER' }, 'MATH_ARITHMETIC_TOOLTIP'),
    parent_tooltip_when_inline() {
      const ownTooltip = this.tooltip;
      this.setTooltip(() => {
        const parent = this.getParent();
        return parent?.getInputsInline() && parent.tooltip ? parent.tooltip : ownTooltip;
      });
    },
    text_append_tooltip: Blockly.Extensions.buildTooltipWithFieldText('%{BKY_TEXT_APPEND_TOOLTIP}', 'VAR'),
    text_indexOf_tooltip() {
      this.setTooltip(() => (Blockly.Msg.TEXT_INDEXOF_TOOLTIP || '').replace('%1', this.workspace.options.oneBasedIndex ? '0' : '-1'));
    },
    text_quotes() {
      for (const input of this.inputList) {
        const index = input.fieldRow.findIndex((field) => field.name === 'TEXT');
        if (index < 0) continue;
        input.insertFieldAt(index, new Blockly.FieldLabel('“'));
        input.insertFieldAt(index + 2, new Blockly.FieldLabel('”'));
        return;
      }
    },
  };
  ['contextMenu_variableSetterGetter', 'contextMenu_variableDynamicSetterGetter', 'contextMenu_newGetVariableBlock']
    .forEach((name) => registerMixinIfMissing(Blockly, name, extensions[name]));
  STANDARD_EXTENSIONS.filter((name) => !['logic_compare', 'logic_ternary', 'controls_flow_in_loop_check', 'contextMenu_variableSetterGetter', 'contextMenu_variableDynamicSetterGetter', 'contextMenu_newGetVariableBlock'].includes(name))
    .forEach((name) => registerExtensionIfMissing(Blockly, name, extensions[name] || (() => {})));

  const ifMixin = controlsIfMixin(Blockly);
  registerMutatorIfMissing(Blockly, 'controls_if_mutator', ifMixin, ['controls_if_if', 'controls_if_elseif', 'controls_if_else']);

  registerMutatorIfMissing(Blockly, 'text_join_mutator', textJoinMixin(Blockly), ['text_create_join_container', 'text_create_join_item'], function () {
    this.itemCount_ = 2;
    this.updateCompatibilityShape_();
  });
  // Blockly's standard mutators are omitted from its JSON block definitions;
  // restore their XML shape and field-driven behavior for older documents.
  const divisibleMixin = mathDivisibleMixin(Blockly);
  registerMutatorIfMissing(Blockly, 'math_is_divisibleby_mutator', divisibleMixin, [], function () {
    this.getField('PROPERTY')?.setValidator((value) => {
      this.updateCompatibilityDivisor_(value === 'DIVISIBLE_BY');
      return value;
    });
  });
  const modesMixin = mathListModesMixin(Blockly);
  registerMutatorIfMissing(Blockly, 'math_modes_of_list_mutator', modesMixin, [], function () {
    this.getField('OP')?.setValidator((value) => {
      this.updateCompatibilityOutput_(value);
      return value;
    });
  });
  const charAtMixin = textCharAtMixin(Blockly);
  registerMutatorIfMissing(Blockly, 'text_charAt_mutator', charAtMixin, [], function () {
    this.getField('WHERE')?.setValidator((value) => {
      this.updateCompatibilityAt_(value === 'FROM_START' || value === 'FROM_END');
      return value;
    });
    this.updateCompatibilityAt_(true);
  });
}
