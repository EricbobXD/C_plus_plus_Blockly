Blockly.Blocks['while_block'] = {
    init: function() {
        this.jsonInit({
            "type": "while_block", 
            "message0": "當 %1",
            "args0": [{
                "type": "input_value", 
                "name": "condition", 
            }], 
            "message1": "%1",
            "args1": [{
                "type": "input_statement", 
                "name": "DO"
            }], 
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00abea",
            "tooltip": "While 迴圈",
            "helpUrl": ""
        });
    }
};

Blockly.Cpp['while_block'] = function(block) {
    const condition = Blockly.Cpp.valueToCode(block, 'condition', Blockly.Cpp.ORDER_ATOMIC) || 'false';
    const DO = Blockly.Cpp.statementToCode(block, 'DO');
    return `while (${condition}) {\n${DO}\n}\n`;
};

Blockly.Blocks['for_block'] = {
    init: function() {
        this.jsonInit({
            "type": "for_block", 
            "message0": "初始變數值: %1, 循環條件: %2, 調整變數: %3",
            "args0": [
                {
                    "type": "input_value", 
                    "name": "init", 
                }, 
                {
                    "type": "input_value", 
                    "name": "condition", 
                }, 
                {
                    "type": "input_value", 
                    "name": "iter", 
                }
            ], 
            "message1": "%1",
            "args1": [{
                "type": "input_statement", 
                "name": "DO"
            }], 
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#2473c2",
            "tooltip": "For 迴圈",
            "helpUrl": ""
        });
    }
};

Blockly.Cpp['for_block'] = function(block) {
    const init = Blockly.Cpp.valueToCode(block, 'init', Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    const condition = Blockly.Cpp.valueToCode(block, 'condition', Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    const iter = Blockly.Cpp.valueToCode(block, 'iter', Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    const DO = Blockly.Cpp.statementToCode(block, 'DO').replace(/^ {2}/gm, '    ');

    return `for (${init}; ${condition}; ${iter}) {\n${DO}}\n`;
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
  const VAR = Blockly.Cpp.valueToCode(block, 'VAR', Blockly.Cpp.ORDER_ATOMIC) || '';
  const container = Blockly.Cpp.valueToCode(block, 'container', Blockly.Cpp.ORDER_ATOMIC) || '';
  const statements_body = Blockly.Cpp.statementToCode(block, 'DO');

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
  const returnValue = Blockly.Cpp.valueToCode(block, 'RETURN_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '';
  returnValue = returnValue.replace(/^\(?|\)?$/g, '');
  if (returnValue === '') {
    return 'return;\n';
  }
  return 'return ' + returnValue + ';\n';
};