Blockly.Blocks['while_block'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('當');
    this.appendStatementInput('DO')
        .appendField('重複執行');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abea');
    this.setTooltip('While 迴圈');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['while_block'] = function(block) {
  var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', Blockly.Cpp.ORDER_ATOMIC) || '(false)';
  var statements_do = Blockly.Cpp.statementToCode(block, 'DO');
  var code = 'while ' + condition + ' {\n' + statements_do + '\n}\n';
  return code;
};

Blockly.Blocks['for_block'] = {
  init: function() {
    this.appendValueInput('INIT')
        .appendField('初始變數值');
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('循環條件');
    this.appendValueInput('var_cal')
        .appendField('迴圈條件');
    this.appendStatementInput('DO')
        .appendField('執行');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#2473c2');
    this.setTooltip('For 迴圈');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['for_block'] = function(block) {
  var init = Blockly.Cpp.valueToCode(block, 'INIT', Blockly.Cpp.ORDER_ATOMIC) || '';
  var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', Blockly.Cpp.ORDER_ATOMIC) || '';
  var varCal = Blockly.Cpp.valueToCode(block, 'var_cal', Blockly.Cpp.ORDER_ATOMIC) || '';
  var statements_body = Blockly.Cpp.statementToCode(block, 'DO');
  
  init = init.replace(/^\(?|\)?$/g, '');
  condition = condition.replace(/^\(?|\)?$/g, '');
  varCal = varCal.replace(/^\(?|\)?$/g, '');
  statements_body = statements_body.replace(/^ {2}/gm, '    ');
  return 'for (' + init + '; ' + condition + '; ' + varCal + ') {\n' + statements_body + '}\n';
};

Blockly.Blocks['for_range_block'] = {
  init: function(){
      this.appendValueInput('VAR')
          .appendField('迭代物件, 參考: ');
      this.appendValueInput('container')
          .appendField('迭代容器: ');
      this.appendStatementInput('DO')
          .appendField('執行');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#2473c2');
      this.setTooltip('For 迴圈');
      this.setHelpUrl('');
  }
}

Blockly.Cpp['for_range_block'] = function(block) {
  var VAR = Blockly.Cpp.valueToCode(block, 'VAR', Blockly.Cpp.ORDER_ATOMIC) || '';
  var container = Blockly.Cpp.valueToCode(block, 'container', Blockly.Cpp.ORDER_ATOMIC) || '';
  var statements_body = Blockly.Cpp.statementToCode(block, 'DO');

  VAR = VAR.replace(/^\(?|\)?$/g, '');
  container = container.replace(/^\(?|\)?$/g, '');
  statements_body = statements_body.replace(/^ {2}/gm, '    ');

  return `for (auto ${VAR}: ${container}) {\n ${statements_body}}\n`;
};

Blockly.Blocks['break_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('結束執行');
    this.setPreviousStatement(true, null);
    this.setColour('#00abea');
    this.setTooltip('退出當前的迴圈/遞迴');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['break_block'] = function() {
  return 'break;\n';
};

Blockly.Blocks['continue_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('跳過並繼續');
    this.setPreviousStatement(true, null);
    this.setColour('#00abea');
    this.setTooltip('跳過當前迴圈的剩餘部分，直接進入下一次迴圈');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['continue_block'] = function() {
  return 'continue;\n';
};

Blockly.Blocks['return_block'] = {
  init: function() {
    this.appendValueInput('RETURN_VALUE')
        .appendField('回傳');
    this.setPreviousStatement(true, null);
    this.setColour('#00abea');
    this.setTooltip('返回值');
    this.setHelpUrl('');
  }
};

Blockly.Cpp['return_block'] = function(block) {
  var returnValue = Blockly.Cpp.valueToCode(block, 'RETURN_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '';
  returnValue = returnValue.replace(/^\(?|\)?$/g, '');
  if (returnValue === '') {
    return 'return;\n';
  }
  return 'return ' + returnValue + ';\n';
};