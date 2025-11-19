// category.conditional.js
// === 分類：條件 (Conditional) ===

Blockly.Blocks['if_block'] = {
  init: function() {
    this.setPreviousStatement(true);
    this.appendValueInput('IF_VALUE')
        .setCheck('Boolean')
        .appendField('如果');
    this.appendStatementInput('IF_DO')
        .setCheck(null)
        .appendField('執行');
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['elif_mutator', 'else_mutator']));
    this.setColour('#00abea');
    this.setTooltip('If 判斷式');
    this.setHelpUrl('');
    this.elifCount_ = 0;
    this.hasElse_ = false;
  },
  saveConnections: function(containerBlock) {
    let clauseBlock = containerBlock.nextConnection.targetBlock();
    let i = 0;
    while (clauseBlock) {
      if (clauseBlock.type === 'elif_mutator') {
        const valueInput = this.getInput('ELIF' + i);
        const stmtInput = this.getInput('ELIF_DO' + i);
        clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
        clauseBlock.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
        i++;
      } else if (clauseBlock.type === 'else_mutator') {
        const elseInput = this.getInput('ELSE');
        clauseBlock.statementConnection_ = elseInput && elseInput.connection.targetConnection;
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  mutationToDom: function() {
    if (!this.elifCount_ && !this.hasElse_) return null;
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('elifCount', this.elifCount_);
    container.setAttribute('hasElse', this.hasElse_);
    return container;
  },
  domToMutation: function(xmlElement) {
    this.elifCount_ = parseInt(xmlElement.getAttribute('elifCount'), 10) || 0;
    this.hasElse_ = xmlElement.getAttribute('hasElse') === 'true';
    this.updateShape_();
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('if_mutator');
    containerBlock.initSvg();
    let connection = containerBlock.nextConnection;
    for (let i = 0; i < this.elifCount_; i++) {
      const elifBlock = workspace.newBlock('elif_mutator');
      elifBlock.initSvg();
      connection.connect(elifBlock.previousConnection);
      connection = elifBlock.nextConnection;
    }
    if (this.hasElse_) {
      const elseBlock = workspace.newBlock('else_mutator');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    let clauseBlock = containerBlock.nextConnection.targetBlock();
    let elifCount = 0;
    let hasElse = false;
    const valueConns = [];
    const stmtConns = [];
    while (clauseBlock) {
      if (clauseBlock.type === 'elif_mutator') {
        valueConns[elifCount] = clauseBlock.valueConnection_;
        stmtConns[elifCount] = clauseBlock.statementConnection_;
        elifCount++;
      } else if (clauseBlock.type === 'else_mutator') {
        hasElse = true;
        var elseConn = clauseBlock.statementConnection_;
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.elifCount_ = elifCount;
    this.hasElse_ = hasElse;
    this.updateShape_();
    for (let i = 0; i < this.elifCount_; i++) {
      Blockly.Mutator.reconnect(valueConns[i], this, 'ELIF' + i);
      Blockly.Mutator.reconnect(stmtConns[i], this, 'ELIF_DO' + i);
    }
    if (this.hasElse_) Blockly.Mutator.reconnect(elseConn, this, 'ELSE');
  },
  updateShape_: function() {
    for (let i = 0; this.getInput('ELIF' + i); i++) {
      this.removeInput('ELIF' + i);
      this.removeInput('ELIF_DO' + i);
    }
    if (this.getInput('ELSE')) this.removeInput('ELSE');
    for (let i = 0; i < this.elifCount_; i++) {
      this.appendValueInput('ELIF' + i)
          .setCheck('Boolean')
          .appendField('否則如果');
      this.appendStatementInput('ELIF_DO' + i)
          .appendField('執行');
    }
    if (this.hasElse_) {
      this.appendStatementInput('ELSE')
          .appendField('否則執行');
    }
  }
};

Blockly.Blocks['if_else'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('條件:');
    this.appendValueInput('r1')
        .appendField('true回傳值:');
    this.appendValueInput('r2')
        .appendField('false回傳值:');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#00abea');
    this.setTooltip('條件運算');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['if_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('如果'); this.setNextStatement(true);} };
Blockly.Blocks['elif_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('否則如果'); this.setPreviousStatement(true); this.setNextStatement(true); this.valueConnection_ = null; this.statementConnection_ = null;} };
Blockly.Blocks['else_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('否則'); this.setPreviousStatement(true);} };

Blockly.Cpp['if_block'] = function(block) {
  const cond = Blockly.Cpp.valueToCode(block, 'IF_VALUE', Blockly.Cpp.ORDER_ATOMIC) || 'false';
  let code = 'if (' + cond + ') {\n' + Blockly.Cpp.statementToCode(block, 'IF_DO');
  for (let i = 0; i < block.elifCount_; i++) {
    const ec = Blockly.Cpp.valueToCode(block, 'ELIF' + i, Blockly.Cpp.ORDER_ATOMIC) || 'false';
    code += '} else if (' + ec + ') {\n' + Blockly.Cpp.statementToCode(block, 'ELIF_DO' + i);
  }
  if (block.hasElse_) code += '} else {\n' + Blockly.Cpp.statementToCode(block, 'ELSE');
  code += '}\n';
  return code;
};

Blockly.Cpp['if_else'] = function(block) {
  var cond = Blockly.Cpp.valueToCode(block, 'CONDITION', Blockly.Cpp.ORDER_ATOMIC) || 'false';
  var r1 = Blockly.Cpp.valueToCode(block, 'r1', Blockly.Cpp.ORDER_ATOMIC) || '';
  var r2 = Blockly.Cpp.valueToCode(block, 'r2', Blockly.Cpp.ORDER_ATOMIC) || '';
  cond = cond.replace(/^\(?|\)?$/g, '');
  r1 = r1.replace(/^\(?|\)?$/g, '');
  r2 = r2.replace(/^\(?|\)?$/g, '');
  return [cond + '?' + r1 + ':' + r2, Blockly.Cpp.ORDER_ATOMIC];
};


Blockly.Blocks['switch_block'] = {
  init: function() {
    this.setPreviousStatement(true);
    this.appendValueInput('SWITCH_VALUE')
        .appendField('切換');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'CHECKBOX-1')
        .appendField('break');
    this.appendStatementInput('DEFAULT')
        .appendField('預設執行');
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['case_mutator']));
    this.setColour('#00abea');
    this.setTooltip('Switch 判斷式');
    this.setHelpUrl('');
    this.caseCount_ = 0;
  },
  saveConnections: function(containerBlock) {
    let clause = containerBlock.nextConnection.targetBlock();
    let i = 0;
    while (clause && clause.type === 'case_mutator') {
      const valueInput = this.getInput('CASE' + i);
      const stmtInput = this.getInput('CASE_DO' + i);
      clause.valueConnection_ = valueInput && valueInput.connection.targetConnection;
      clause.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
      clause = clause.nextConnection && clause.nextConnection.targetBlock(); i++;
    }
    this.defaultConnection_ = this.getInput('DEFAULT').connection.targetConnection;
  },
  mutationToDom: function() {
    if (!this.caseCount_) return null;
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('caseCount', this.caseCount_);
    return container;
  },
  domToMutation: function(xml) {
    this.caseCount_ = parseInt(xml.getAttribute('caseCount'), 10) || 0;
    this.updateShape_();
  },
  decompose: function(workspace) {
    const container = workspace.newBlock('switch_mutator');
    container.initSvg();
    container.setFieldValue(this.caseCount_, 'CASE_COUNT');
    let connection = container.nextConnection;
    for (let i = 0; i < this.caseCount_; i++) {
      const cb = workspace.newBlock('case_mutator'); cb.initSvg(); connection.connect(cb.previousConnection); connection = cb.nextConnection;
    }
    return container;
  },
  compose: function(containerBlock) {
    let clause = containerBlock.nextConnection.targetBlock();
    const valConns = [], stmtConns = [];
    while (clause) {
      if (clause.type === 'case_mutator') {
        valConns.push(clause.valueConnection_);
        stmtConns.push(clause.statementConnection_);
      }
      clause = clause.nextConnection && clause.nextConnection.targetBlock();
    }
    this.caseCount_ = valConns.length;
    this.updateShape_();
    valConns.forEach((c, i) => Blockly.Mutator.reconnect(c, this, 'CASE' + i));
    stmtConns.forEach((c, i) => Blockly.Mutator.reconnect(c, this, 'CASE_DO' + i));
    Blockly.Mutator.reconnect(this.defaultConnection_, this, 'DEFAULT');
  },
  updateShape_: function() {
    for (let i = 0; this.getInput('CASE' + i); i++) {
      this.removeInput('CASE' + i); this.removeInput('CASE_DO' + i);
    }
    for (let i = 0; i < this.caseCount_; i++) {
      this.appendValueInput('CASE' + i)
          .appendField('狀況 ' + (i+1))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'CHECKBOX' + i)
          .appendField('break');
      this.appendStatementInput('CASE_DO' + i).appendField('動作');
    }
  }
};
Blockly.Blocks['switch_mutator'] = { init: function() { this.appendDummyInput().appendField('切換狀況數量').appendField(new Blockly.FieldNumber(0,0,Infinity,1), 'CASE_COUNT'); this.setNextStatement(true); this.setColour('#00abea'); } };
Blockly.Blocks['case_mutator'] = { init: function() { this.appendDummyInput().appendField('狀況'); this.setPreviousStatement(true); this.setNextStatement(true); this.valueConnection_ = null; this.statementConnection_ = null; this.setColour('#00abea'); } };

Blockly.Cpp['switch_block'] = function(block) {
  let val = Blockly.Cpp.valueToCode(block, 'SWITCH_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '()';
  let code = 'switch (' + val + ') {\n';
  for (let i = 0; i < block.caseCount_; i++) {
    let cv = Blockly.Cpp.valueToCode(block, 'CASE' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
    cv = cv.replace(/^\(?|\)?$/g, '');
    let body = Blockly.Cpp.statementToCode(block, 'CASE_DO' + i);
    code += '  case ' + cv + ':\n' + body;
    if (block.getFieldValue('CHECKBOX' + i) === 'TRUE') code += '    break;\n';
  }
  let def = Blockly.Cpp.statementToCode(block, 'DEFAULT');
  code += '  default:\n' + def;
  if (block.getFieldValue('CHECKBOX-1') === 'TRUE') code += '    break;\n';
  code += '}\n';
  return code;
};
