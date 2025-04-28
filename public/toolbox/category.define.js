// category.define.js
// === 分類：定義 (Define) ===

// 定義方塊：define_block\Blockly.Blocks['define_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('定義 自定義名子: ')
        .appendField(new Blockly.FieldTextInput(''), 'name')
        .appendField(', 函式名子: ')
        .appendField(new Blockly.FieldTextInput(''), 'func_name');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#123456');
    this.setTooltip('偷懶作法');
    this.setHelpUrl('');
  }
};

// 定義方塊：typedef_block
Blockly.Blocks['typedef_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('定義 資料型態名子: ')
        .appendField(new Blockly.FieldTextInput(''), 'type_name')
        .appendField(', 自定義名子: ')
        .appendField(new Blockly.FieldTextInput(''), 'name');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#123456');
    this.setTooltip('偷懶作法');
    this.setHelpUrl('');
  }
};

// C++ 語法生成器：define_block
Blockly.Cpp['define_block'] = function(block) {
  var name = block.getFieldValue('name');
  var func_name = block.getFieldValue('func_name');
  return '#define ' + name + ' ' + func_name + '\n';
};

// C++ 語法生成器：typedef_block
Blockly.Cpp['typedef_block'] = function(block) {
  var type_name = block.getFieldValue('type_name');
  var name = block.getFieldValue('name');
  return 'typedef ' + type_name + ' ' + name + '\n';
};
