// category.input_output.js
// === 分類：輸入/輸出 (Input/Output) ===

// 定義方塊：cin_block
Blockly.Blocks['cin_block'] = {
  init: function() {
    this.appendValueInput('VARIABLES')
        .appendField('輸入');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#24B324');
    this.setTooltip('輸入');
    this.setHelpUrl('');
  }
};

// 定義方塊：cout_block
Blockly.Blocks['cout_block'] = {
  init: function() {
    this.appendValueInput('INPUT')
        .appendField('輸出');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['換行', 'endl'],
          ['不換行', '']
        ]), 'ENDL_OPTION');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#24B324');
    this.setTooltip('輸出');
    this.setHelpUrl('');
  }
};

// C++ 語法生成器：cin_block
Blockly.Cpp['cin_block'] = function(block) {
  var value_var = Blockly.Cpp.valueToCode(block, 'VARIABLES', Blockly.Cpp.ORDER_ATOMIC) || '';
  // 去除外層括號
  if (value_var.startsWith('(') && value_var.endsWith(')')) {
    value_var = value_var.slice(1, -1);
  }
  return 'cin >> ' + value_var + ';\n';
};

// C++ 語法生成器：cout_block
Blockly.Cpp['cout_block'] = function(block) {
  var argument = Blockly.Cpp.valueToCode(block, 'INPUT', Blockly.Cpp.ORDER_ATOMIC) || '';
  // 去除外層括號和末尾分號
  if (argument.startsWith('(') && argument.endsWith(')')) {
    argument = argument.slice(1, -1);
  }
  if (argument.endsWith(';\n')) {
    argument = argument.slice(0, -2);
  }
  // 非數值且非字串引用，保留原始
  if (isNaN(argument) && !argument.startsWith('"') && !argument.endsWith('"')) {
    argument = argument;
  }
  // 處理換行選項
  if (block.getFieldValue('ENDL_OPTION') === 'endl') {
    return 'cout << ' + argument + ' << endl;\n';
  } else {
    return 'cout << ' + argument + ';\n';
  }
};
