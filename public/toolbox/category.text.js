// category.text.js
// === 分類：文本 (Text) ===

// 定義方塊：string
Blockly.Blocks['string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('字串')
        .appendField(new Blockly.FieldTextInput('Hello world'), 'TEXT');
    this.setOutput(true, 'String');
    this.setColour('#FF8C00');
    this.setTooltip('文本');
    this.setHelpUrl('');
  }
};

// 定義方塊：char
Blockly.Blocks['char'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('字元')
        .appendField(new Blockly.FieldTextInput('A'), 'TEXT');
    this.setOutput(true, 'Char');
    this.setColour('#FF8C00');
    this.setTooltip('文本');
    this.setHelpUrl('');
  }
};

// 定義方塊：add_line
Blockly.Blocks['add_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('換行');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF8C00');
    this.setTooltip('換行符\n');
    this.setHelpUrl('');
  }
};

// C++ 語法生成器：add_line
Blockly.Cpp['add_line'] = function(block) {
  // 產生換行符號
  return '\n';
};

// C++ 語法生成器：string
Blockly.Cpp['string'] = function(block) {
  var text = block.getFieldValue('TEXT') || '';
  return ['"' + text + '"', Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：char
Blockly.Cpp['char'] = function(block) {
  var text = block.getFieldValue('TEXT') || '';
  return ['\'' + text + '\'', Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：comment_block
Blockly.Cpp['comment_block'] = function(block) {
  var comment = block.getFieldValue('COMMENT') || '';
  return '// ' + comment + '\n';
};
