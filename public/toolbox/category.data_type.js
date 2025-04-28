// category.data_type.js
// === 分類：資料型態 (Data Types) ===

// 定義方塊：data_type
Blockly.Blocks['data_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('資料型態')
        .appendField(new Blockly.FieldDropdown([
          ['整數', 'int'],
          ['浮點數', 'float'],
          ['雙重浮點數', 'double'],
          ['字元', 'char'],
          ['字串', 'string'],
          ['更長的整數', 'long long']
        ]), 'TYPE');
    this.setOutput(true, null);
    this.setColour('#EB5160');
    this.setTooltip('選擇資料型態');
    this.setHelpUrl('');
  }
};

// 定義方塊：struct_type
Blockly.Blocks['struct_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('struct')
        .appendField(new Blockly.FieldTextInput(''), 'TYPE');
    this.setOutput(true, null);
    this.setColour('#f4a460');
    this.setTooltip('定義 struct 類型');
    this.setHelpUrl('');
  }
};

// 定義方塊：class_type
Blockly.Blocks['class_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput(''), 'TYPE');
    this.setOutput(true, null);
    this.setColour('#e9967a');
    this.setTooltip('定義 class 類型');
    this.setHelpUrl('');
  }
};

// C++ 語法生成器：data_type
Blockly.Cpp['data_type'] = function(block) {
  var type = block.getFieldValue('TYPE');
  return [type, Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：struct_type
Blockly.Cpp['struct_type'] = function(block) {
  var name = block.getFieldValue('TYPE');
  return ['struct ' + name, Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：class_type
Blockly.Cpp['class_type'] = function(block) {
  var name = block.getFieldValue('TYPE');
  return ['class ' + name, Blockly.Cpp.ORDER_ATOMIC];
};
