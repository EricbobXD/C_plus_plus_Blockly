Blockly.Blocks['define_block'] = {
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


Blockly.Cpp['define_block'] = function(block) {
  var name = block.getFieldValue('name');
  var func_name = block.getFieldValue('func_name');
  return '#define ' + name + ' ' + func_name + '\n';
};

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

Blockly.Cpp['typedef_block'] = function(block) {
  var type_name = block.getFieldValue('type_name');
  var name = block.getFieldValue('name');
  return 'typedef ' + type_name + ' ' + name + '\n';
};
