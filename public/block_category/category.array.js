function Dropdown() {
    return new Blockly.FieldDropdown(
        Blockly.Cpp["Array"].map(v => [v, v])
    );
}

export function Create_Array(toolbox, workspace) {
  Blockly.Blocks['define_array'] = {
    init: function() {
      this.appendValueInput('TYPE')
          .setCheck(null)
          .appendField('定義C++內建陣列資料型態');
      this.appendDummyInput()
          .appendField(', 陣列名稱')
          .appendField(Dropdown(), 'array_name');
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

  Blockly.Cpp.forBlock['define_array'] = function(block) {
    var type = Blockly.Cpp.valueToCode(block, 'TYPE', Blockly.Cpp.ORDER_ATOMIC) || '';
    var array_name = block.getFieldValue('array_name');
    var size = Blockly.Cpp.valueToCode(block, 'size', Blockly.Cpp.ORDER_ATOMIC) || '';
    var content = Blockly.Cpp.valueToCode(block, 'content', Blockly.Cpp.ORDER_ATOMIC) || '';
    size = size.replace(/^\(?|\)?$/g, '');
    content = content.replace(/^\(?|\)?$/g, '');
    if (!content) {
      return type + ' ' + array_name + '[' + size + '];';
    }
    return type + ' ' + array_name + '[' + size + '] = {' + content + '};\n';
  };

  Blockly.Blocks['array_name_block'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('陣列')
          .appendField(Dropdown(), 'array_name');
      this.setOutput(true, null);
      this.setColour('#ff5757');
      this.setTooltip('矩陣');
      this.setHelpUrl('');
    }
  };

  Blockly.Cpp.forBlock['array_name_block'] = function(block) {
    var array_name = block.getFieldValue('array_name');
    return [array_name, Blockly.Cpp.ORDER_ATOMIC];
  };

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

  Blockly.Cpp.forBlock['array_content'] = function(block) {
    var content = Blockly.Cpp.valueToCode(block, 'content', Blockly.Cpp.ORDER_ATOMIC) || '';
    content = content.replace(/^\(?|\)?$/g, '');
    return ['{' + content + '}', Blockly.Cpp.ORDER_ATOMIC];
  };

  Blockly.Blocks['array_operate[]'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('陣列')
          .appendField(Dropdown(), 'array_name')
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

  Blockly.Cpp.forBlock['array_operate[]'] = function(block) {
    var array_name = block.getFieldValue('array_name');
    var pos = Blockly.Cpp.valueToCode(block, 'pos', Blockly.Cpp.ORDER_ATOMIC) || '';
    pos = pos.replace(/^\(?|\)?$/g, '');
    var code = array_name + '[' + pos + ']';
    return [code, Blockly.Cpp.ORDER_ATOMIC];
  };

  const category = toolbox.contents.find(cat => cat.name === '陣列');
  const blockSet = ['define_array', 'array_name_block', 'array_content', 'array_operate[]'];
  if (category) {
      blockSet.forEach(blockType => category.contents.push({kind: "block", type: blockType}))
  }
  
  const newToolbox = JSON.parse(JSON.stringify(toolbox));
  workspace.updateToolbox(newToolbox);
}