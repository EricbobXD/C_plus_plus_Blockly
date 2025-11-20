// string
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

Blockly.Cpp['string'] = function(block) {
  var text = block.getFieldValue('TEXT') || '';
  return ['"' + text + '"', Blockly.Cpp.ORDER_ATOMIC];
};

// char
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

Blockly.Cpp['char'] = function(block) {
  var text = block.getFieldValue('TEXT') || '';
  return ['\'' + text + '\'', Blockly.Cpp.ORDER_ATOMIC];
};

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

Blockly.Cpp['add_line'] = function(block) {
  return '\n';
};

// 定義方塊：string_generic
Blockly.Blocks['string_generic'] = {
    init: function() {
        this.setColour("#71b700");
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setMutator(new Blockly.Mutator(['string_generic_item']));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = '+'; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        container.setAttribute('operator', this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute('operator') || '+';
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('string_generic_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('string_generic_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput('ADD' + j).setCheck("String");
            if (j > 0) {
                input.appendField(this.operator_);
            }
        }
    },
    setOperator: function(operator) {
        this.operator_ = operator;
        this.updateShape_();
    }
};

// 定義方塊：string_generic_container
Blockly.Blocks['string_generic_container'] = {
    init: function() {
        this.setColour("#71b700");
        this.appendDummyInput().appendField("輸入");
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

// 定義方塊：string_generic_item
Blockly.Blocks['string_generic_item'] = {
    init: function() {
        this.setColour("#71b700");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

function defineStringOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['string_generic'], {
        init: function() {
            Blockly.Blocks['string_generic'].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}

defineStringOperatorBlock('string_plus', '+');
defineStringOperatorBlock('string_commas', ',');
defineStringOperatorBlock('string_cin', '>>');
defineStringOperatorBlock('string_cout', '<<');

Blockly.Cpp['string_plus'] = function(block) {
    return string_generateCode(block, ' + ');
};

Blockly.Cpp['string_commas'] = function(block) {
    return string_generateCode(block, ' , ');
};

Blockly.Cpp['string_cout'] = function(block) {
    return string_generateCode(block, ' << ');
};

Blockly.Cpp['string_cin'] = function(block) {
    return string_generateCode(block, ' >> ');
};

function string_generateCode(block, operator) {
    let code = '';
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
        if (argument.startsWith('(') && argument.endsWith(')')) {
            argument = argument.slice(1, -1);
        }

        code += argument;
        if (i < block.itemCount_ - 1) {
            code += operator;
        }
    }


    return [`${code}`, Blockly.Cpp.ORDER_ATOMIC];
}

Blockly.Blocks['comment_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('註解')
            .appendField(new Blockly.FieldTextInput('comment'), 'COMMENT');
        this.setOutput(true, 'String');
        this.setColour('#FF8C00');
        this.setTooltip('註解');
        this.setHelpUrl('');
    }
};

Blockly.Cpp['comment_block'] = function(block) {
  var comment = block.getFieldValue('COMMENT') || '';
  return '// ' + comment + '\n';
};