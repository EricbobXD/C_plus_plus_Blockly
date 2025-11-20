Blockly.Blocks['logic_operators'] = {
  init: function() {
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['==', 'EQUAL'],
          ['!=', 'NOT_EQUAL'],
          ['>', 'GREATER'],
          ['<', 'LESS'],
          ['>=', 'GREATER_EQUAL'],
          ['<=', 'LESS_EQUAL']
        ]), 'OPERATOR');
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#29A1CD');
    this.setTooltip('運算符');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['logic_operators'] = function(block) {
  let a = Blockly.Cpp.valueToCode(block, 'A', Blockly.Cpp.ORDER_ATOMIC) || '0';
  let b = Blockly.Cpp.valueToCode(block, 'B', Blockly.Cpp.ORDER_ATOMIC) || '0';
  const op = block.getFieldValue('OPERATOR');
  const map = { EQUAL:'==', NOT_EQUAL:'!=', GREATER:'>', LESS:'<', GREATER_EQUAL:'>=', LESS_EQUAL:'<=' };
  a = a.replace(/^\(?|\)?$/g, ''); b = b.replace(/^\(?|\)?$/g, '');
  return [a + ' ' + (map[op] || '==') + ' ' + b, Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Blocks['or_and_xor'] = {
  init: function() {
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['且', 'AND'],
          ['或', 'OR'],
          ['XOR', 'XOR']
        ]), 'OPERATOR');
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#29A1CD');
    this.setTooltip('運算符');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['or_and_xor'] = function(block) {
  let a = Blockly.Cpp.valueToCode(block, 'A', Blockly.Cpp.ORDER_ATOMIC) || '0';
  let b = Blockly.Cpp.valueToCode(block, 'B', Blockly.Cpp.ORDER_ATOMIC) || '0';
  const op = block.getFieldValue('OPERATOR');
  const map = { AND:'&&', OR:'||', XOR:'^' };
  a = a.replace(/^\(?|\)?$/g, ''); b = b.replace(/^\(?|\)?$/g, '');
  return [a + ' ' + (map[op] || '&&') + ' ' + b, Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Blocks['true'] = {
  init: function() {
    this.appendDummyInput().appendField('True');
    this.setOutput(true, 'Boolean');
    this.setColour('#29A1CD');
    this.setTooltip('是/真');
    this.setHelpUrl('');
  }
};
Blockly.Cpp['true'] = () => ['true', Blockly.Cpp.ORDER_ATOMIC];

Blockly.Blocks['false'] = {
  init: function() {
    this.appendDummyInput().appendField('False');
    this.setOutput(true, 'Boolean');
    this.setColour('#29A1CD');
    this.setTooltip('否/假');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['false'] = () => ['false', Blockly.Cpp.ORDER_ATOMIC];

Blockly.Blocks['logic_not'] = {
  init: function() {
    this.appendValueInput('A').appendField('否');
    this.setOutput(true, 'Boolean');
    this.setColour('#29A1CD');
    this.setTooltip('如果條件為 false 則回傳 true');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['logic_not'] = block => ['!' + Blockly.Cpp.valueToCode(block, 'A', Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, ''), Blockly.Cpp.ORDER_ATOMIC];

Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('數字')
        .appendField(new Blockly.FieldNumber(0), 'NUMBER');
    this.setOutput(true, 'Number');
    this.setColour('#29A1CD');
    this.setTooltip('數字');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['number'] = block => [block.getFieldValue('NUMBER').toString(), Blockly.Cpp.ORDER_ATOMIC];

Blockly.Blocks['abs_block'] = {
  init: function() {
    this.appendValueInput('value').appendField('絕對值:');
    this.setOutput(true, 'Number');
    this.setColour('#29A1CD');
    this.setTooltip('絕對值');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['abs_block'] = block => ['abs(' + Blockly.Cpp.valueToCode(block, 'value', Blockly.Cpp.ORDER_ATOMIC) + ')', Blockly.Cpp.ORDER_ATOMIC];

Blockly.Blocks['var_calculate'] = {
  init: function() {
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['+=', 'ADD_EQUALS'],
          ['-=', 'SUBTRACT_EQUALS'],
          ['*=', 'MUTIPLY_EQUALS'],
          ['/=', 'DEVIDE_EQUALS'],
          ['%=', 'MODULO_EQUALS']
        ]), 'OPERATOR');
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#29A1CD');
    this.setTooltip('簡化運算符');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['var_calculate'] = function(block) {
  let a = Blockly.Cpp.valueToCode(block, 'A', Blockly.Cpp.ORDER_ATOMIC) || '0';
  let b = Blockly.Cpp.valueToCode(block, 'B', Blockly.Cpp.ORDER_ATOMIC) || '0';
  const op = block.getFieldValue('OPERATOR');
  const map = { ADD_EQUALS:'+=', SUBTRACT_EQUALS:'-=', MUTIPLY_EQUALS:'*=', DEVIDE_EQUALS:'/=', MODULO_EQUALS:'%=' };
  a = a.replace(/^\(?|\)?$/g, ''); b = b.replace(/^\(?|\)?$/g, '');
  return [a + ' ' + (map[op] || '+=') + ' ' + b, Blockly.Cpp.ORDER_ATOMIC];
};

// math 
Blockly.Blocks['math_calculate'] = {
  init: function() {
    this.appendValueInput('A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['+', 'ADD'],
          ['-', 'SUBTRACT'],
          ['*', 'MUTIPLY'],
          ['/', 'DEVIDE'],
          ['//', 'DEVIDE_INT'],
          ['%', 'MODULO'],
          ['^', 'POWER']
        ]), 'OPERATOR');
    this.appendValueInput('B');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#29A1CD');
    this.setTooltip('運算');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['math_calculate'] = block => {
  let a = Blockly.Cpp.valueToCode(block, 'A', Blockly.Cpp.ORDER_ATOMIC) || '0';
  let b = Blockly.Cpp.valueToCode(block, 'B', Blockly.Cpp.ORDER_ATOMIC) || '0';
  const op = block.getFieldValue('OPERATOR');
  const map = { ADD:'+', SUBTRACT:'-', MUTIPLY:'*', DEVIDE:'/', DEVIDE_INT:'//', MODULO:'%', POWER:'^' };
  if(op==='POWER') return ['pow(' + a + ', ' + b + ')', Blockly.Cpp.ORDER_ATOMIC];
  return ['(' + a + ' ' + (map[op]||'+') + ' ' + b + ')', Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Blocks['math_generic'] = {
  init: function() {
    this.setColour('#277ace');
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['math_generic_item']));
    this.itemCount_ = 2;
    this.operator_ = '+';
    this.updateShape_();
  },
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    container.setAttribute('operator', this.operator_);
    return container;
  },
  domToMutation: function(xmlElement) {
    this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10));
    this.operator_ = xmlElement.getAttribute('operator') || '+';
    this.updateShape_();
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('math_generic_container');
    containerBlock.initSvg();
    let conn = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const item = workspace.newBlock('math_generic_item');
      item.initSvg();
      conn.connect(item.previousConnection);
      conn = item.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    const conns = [];
    while (itemBlock) {
      conns.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = Math.max(2, conns.length);
    this.updateShape_();
    conns.forEach((c, i) => Blockly.Mutator.reconnect(c, this, 'ADD' + i));
  },
  updateShape_: function() {
    let i = 0;
    while (this.getInput('ADD' + i)) { this.removeInput('ADD' + i); i++; }
    for (let j = 0; j < this.itemCount_; j++) {
      const inp = this.appendValueInput('ADD' + j).setCheck('Number');
      if (j > 0) inp.appendField(this.operator_);
    }
  },
  setOperator: function(op) { this.operator_ = op; this.updateShape_(); }
};

Blockly.Blocks['math_generic_container'] = {
  init: function() {
    this.setColour('#277ace');
    this.appendDummyInput().appendField('數字輸入');
    this.appendStatementInput('STACK');
    this.contextMenu = false;
  }
};

Blockly.Blocks['math_generic_item'] = {
  init: function() {
    this.setColour('#277ace');
    this.appendDummyInput().appendField('項目');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};

// 通用數學運算生成器
function math_generateCode(block, op) {
  let code = '';
  for (let i = 0; i < block.itemCount_; i++) {
    let arg = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
    arg = arg.replace(/^\(?|\)?$/g, '');
    code += arg + (i < block.itemCount_ - 1 ? op : '');
  }
  return ['(' + code + ')', Blockly.Cpp.ORDER_ATOMIC];
}

// 通用位元運算生成器
function bitwise_generateCode(block, op) {
  let code = '';
  for (let i = 0; i < block.itemCount_; i++) {
    let arg = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
    arg = arg.replace(/^\(?|\)?$/g, '');
    code += arg + (i < block.itemCount_ - 1 ? op : '');
  }
  return [code, Blockly.Cpp.ORDER_ATOMIC];
}

// 定義運算符方塊
function defineMathOperatorBlock(type, symbol) {
  Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['math_generic'], {
    init: function() { Blockly.Blocks['math_generic'].init.call(this); this.setOperator(symbol); }
  });
}
defineMathOperatorBlock('math_plus', ' + ');
defineMathOperatorBlock('math_subtract', ' - ');
defineMathOperatorBlock('math_multiply', ' * ');
defineMathOperatorBlock('math_divide', ' / ');
defineMathOperatorBlock('math_percent', ' % ');
defineMathOperatorBlock('math_power', ' ^ ');

// 定義位元運算方塊
function defineBitwiseOperatorBlock(type, symbol) {
  Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['math_generic'], {
    init: function() { Blockly.Blocks['math_generic'].init.call(this); this.setOperator(symbol); }
  });
}
defineBitwiseOperatorBlock('bitwise_and', ' & ');
defineBitwiseOperatorBlock('bitwise_or', ' | ');
defineBitwiseOperatorBlock('bitwise_xor', ' ^ ');
defineBitwiseOperatorBlock('bitwise_left', ' << ');
defineBitwiseOperatorBlock('bitwise_right', ' >> ');
defineBitwiseOperatorBlock('bitwise_not', ' ~ ');

['math_plus','math_subtract','math_multiply','math_divide','math_percent','math_power'].forEach(type => {
  Blockly.Cpp[type] = block => math_generateCode(block, type.replace('math_',' ').trim());
});
['bitwise_and','bitwise_or','bitwise_xor','bitwise_left','bitwise_right','bitwise_not'].forEach(type => {
  Blockly.Cpp[type] = block => bitwise_generateCode(block, type.replace('bitwise_',' ').trim());
});
