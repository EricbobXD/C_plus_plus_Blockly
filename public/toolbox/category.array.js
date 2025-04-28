// category.array.js
// === 分類：陣列 (Array) ===

// 定義方塊：define_array
Blockly.Blocks['define_array'] = {
  init: function() {
    this.appendValueInput('TYPE')
        .setCheck(null)
        .appendField('定義C++內建陣列資料型態');
    this.appendDummyInput()
        .appendField(', 陣列名稱')
        .appendField(new Blockly.FieldTextInput('array'), 'array_name');
    this.appendValueInput('size')
        .setCheck('Number')
        .appendField(', 大小');
    this.appendValueInput('content')
        .setCheck('Array')
        .appendField(', 陣列內容 (可加可不加)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#ff5757');
    this.setTooltip('創建一個矩陣');
    this.setHelpUrl('');
  }
};

// 定義方塊：array_name_block
Blockly.Blocks['array_name_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('陣列')
        .appendField(new Blockly.FieldTextInput('array'), 'array_name');
    this.setOutput(true, null);
    this.setColour('#ff5757');
    this.setTooltip('矩陣');
    this.setHelpUrl('');
  }
};

// 定義方塊：array_content
Blockly.Blocks['array_content'] = {
  init: function() {
    this.appendValueInput('content')
        .appendField('陣列內容〔')
        .appendField('', 'CONTENT')
        .appendField('〕');
    this.setOutput(true, null);
    this.setColour('#ff5757');
    this.setTooltip('矩陣內容');
    this.setHelpUrl('');
  }
};

// 定義方塊：array_operate[]
Blockly.Blocks['array_operate[]'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('陣列')
        .appendField(new Blockly.FieldTextInput('array'), 'array_name')
        .appendField('[');
    this.appendValueInput('pos')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField(']');
    this.setOutput(true, null);
    this.setColour('#ff5757');
    this.setTooltip('矩陣名稱');
    this.setHelpUrl('');
  }
};

// C++ 語法生成器：define_array
Blockly.Cpp['define_array'] = function(block) {
  var type = Blockly.Cpp.valueToCode(block, 'TYPE', Blockly.Cpp.ORDER_ATOMIC) || '';
  var array_name = block.getFieldValue('array_name');
  var size = Blockly.Cpp.valueToCode(block, 'size', Blockly.Cpp.ORDER_ATOMIC) || '';
  var content = Blockly.Cpp.valueToCode(block, 'content', Blockly.Cpp.ORDER_ATOMIC) || '';
  // 去除外層括號
  size = size.replace(/^\(?|\)?$/g, '');
  content = content.replace(/^\(?|\)?$/g, '');
  if (!content) {
    return type + ' ' + array_name + '[' + size + '];';
  }
  return type + ' ' + array_name + '[' + size + '] = {' + content + '};\n';
};

// C++ 語法生成器：array_name_block
Blockly.Cpp['array_name_block'] = function(block) {
  var array_name = block.getFieldValue('array_name');
  return [array_name, Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：array_content
Blockly.Cpp['array_content'] = function(block) {
  var content = Blockly.Cpp.valueToCode(block, 'content', Blockly.Cpp.ORDER_ATOMIC) || '';
  content = content.replace(/^\(?|\)?$/g, '');
  return ['{' + content + '}', Blockly.Cpp.ORDER_ATOMIC];
};

// C++ 語法生成器：array_operate[]
Blockly.Cpp['array_operate[]'] = function(block) {
  var array_name = block.getFieldValue('array_name');
  var pos = Blockly.Cpp.valueToCode(block, 'pos', Blockly.Cpp.ORDER_ATOMIC) || '';
  pos = pos.replace(/^\(?|\)?$/g, '');
  var code = array_name + '[' + pos + ']';
  return [code, Blockly.Cpp.ORDER_ATOMIC];
};
