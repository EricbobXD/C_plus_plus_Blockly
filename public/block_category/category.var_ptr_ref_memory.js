function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

const data_type = {"VAR": "變數", "PTR": "指標", "REF": "參考"};
export function Create_variable(Block_type, toolbox, workspace){
    const blockSet = new Set();

    Blockly.Blocks[`define_${Block_type}`] = {
        init: function() {
            this.appendDummyInput()
                .appendField("宣告")
                .appendField(new Blockly.FieldDropdown([
                    ["不固定", "no"],
                    ["固定", "const"]])
                , "const");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["有正有負", "no"],
                    ["全部取正", "unsigned"]])
                , "unsigned");
            this.appendValueInput('type');
            this.appendDummyInput()
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "var_name");
            this.appendValueInput("value")
                .appendField(" = ");
            this.setInputsInline(true);
            this.setPreviousStatement(true); 
            this.setNextStatement(true);    
            this.setColour('#DABD00');
            this.setTooltip(`定義一個${data_type[Block_type]}`);
            this.setHelpUrl(''); 
        }
    }

    Blockly.Cpp.forBlock[`define_${Block_type}`] = function(block) {
        var Const = block.getFieldValue('const');
        var unsigned = block.getFieldValue('unsigned');
        var type = Blockly.Cpp.valueToCode(block, 'type', 1) || '';
        var var_name = block.getFieldValue('var_name');
        var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
        var code = '';
        if (Const === 'const') {
            code += 'const ';
        }
        if (unsigned === 'unsigned') {
            code += 'unsigned ';
        }

        if (type.startsWith('(') && type.endsWith(')')) {
            type = type.slice(1, -1);
        }

        if (type === "PTR") code = '*' + code;
        else if (type === "REF") code = '&' + code;

        code += ' ' + var_name;
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        if (value !== '') {
            code += ` = ${value}`;
        }
        code += ';\n';
        return code;
    };

    Blockly.Blocks[`${Block_type}_equal`] = {
        init: function() {
            this.appendDummyInput()
                .appendField(`${data_type[Block_type]}`)
                .appendField(VarDropdown(Block_type), "var_name");
            this.appendValueInput("value")
                .appendField(" = ");
            this.setInputsInline(true);
            this.setColour('#DABD00');
            this.setTooltip(`定義一個${data_type[Block_type]}`);
            this.setHelpUrl('');
            this.setPreviousStatement(true); 
            this.setNextStatement(true);    
        }
    };

    Blockly.Cpp.forBlock[`${Block_type}_equal`] = function(block) {
        var var_name = block.getFieldValue('var_name');
        var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '0';
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${var_name} = ${value};\n`;
    };

    Blockly.Blocks[`get_${Block_type}`] = {
            init: function() {
                this.appendDummyInput()
                    .appendField(data_type[Block_type])
                    .appendField(VarDropdown(Block_type), "var_name");
                this.setInputsInline(true);
                this.setOutput(true, null);
                this.setColour('#DABD00');
                this.setTooltip(`定義 ${data_type[Block_type]} 類型`);
                this.setHelpUrl('');
            }
    };

    Blockly.Cpp.forBlock[`get_${Block_type}`] = function(block) {
        var var_name = block.getFieldValue('var_name');
        if (type === "PTR") var_name = '*' + var_name;
        else if (type === "REF") var_name = '&' + var_name;
        return [var_name, Blockly.Cpp.ORDER_ATOMIC];
    };

    Blockly.Blocks[`def_${Block_type}`] = {
        init: function() {
            this.appendDummyInput()
                .appendField("宣告")
                .appendField(new Blockly.FieldDropdown([
                    ["不固定", "no"],
                    ["固定", "const"]])
                , "const");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["有正有負", "no"],
                    ["全部取正", "unsigned"]])
                , "unsigned");
            this.appendValueInput('type');
            this.appendDummyInput()
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "var_name");
            this.appendValueInput("value")
                .appendField(" = ");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour('#DABD00');
            this.setTooltip(`定義一個${data_type[Block_type]}`);
            this.setHelpUrl('');
            }
    }

    Blockly.Cpp.forBlock[`def_${Block_type}`] = function(block) {
        var unsigned = block.getFieldValue('unsigned');
        var type = block.getFieldValue('TYPE');
        var var_name = block.getFieldValue('var_name');
        var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
        var code = '';
        if (unsigned === 'unsigned') {
            code += 'unsigned ';
        }

         if (type === "PTR") code = '*' + code;
        else if (type === "REF") code = '&' + code;

        code += ' ' + var_name;
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        if (value !== '') {
            code += ` = ${value}`;
        }
        return [code, Blockly.Cpp.ORDER_ATOMIC];
    };
    [
    `define_${Block_type}`,
    `${Block_type}_equal`,
    `get_${Block_type}`,
    `def_${Block_type}`
    ].forEach(t => blockSet.add(t));

    if (Block_type === "PTR" || Block_type === "REF"){
        Blockly.Blocks[`${Block_type}_of`] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("變數")
                    .appendField(new Blockly.FieldDropdown(
                        Blockly.Cpp[Block_type].map(item => [item, item]))
                    , "var_name");
                this.appendValueInput("value")
                    .appendField(" -> ");
                this.setInputsInline(true);
                this.setOutput(true, null);
                this.setColour('#DABD00');
                this.setTooltip(``);
                this.setHelpUrl('');
            }
        };

        Blockly.Cpp.forBlock[`${Block_type}_of`] = function(block) {
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${var_name} -> ${value}`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Blocks[`${Block_type}_to`] = {
            init: function() {
                this.appendDummyInput()
                    .appendField(data_type[Block_type])
                    .appendField(VarDropdown(Block_type), "var_name");
                this.setInputsInline(true);
                this.setOutput(true, null);
                this.setColour('#DABD00');
                this.setTooltip(``);
                this.setHelpUrl('');
            }
        };

        Blockly.Cpp.forBlock[`${Block_type}_to`] = function(block) {
            var var_name = block.getFieldValue('var_name');
            return [`*${var_name}`, 1];
        };

        blockSet.add(`${Block_type}_of`)
        blockSet.add(`${Block_type}_to`);
        if (Block_type === "PTR"){
            Blockly.Blocks[`nullptr`] = {
                init:function() {
                    this.appendDummyInput()
                        .appendField("nullptr");
                    this.setOutput(true, null);
                    this.setColour('#DABD00');
                    this.setTooltip(`nullptr`);
                    this.setHelpUrl('');
                }
            }

            Blockly.Cpp.forBlock[`nullptr`] = function(block){
                return [`nullptr`, Blockly.Cpp.ORDER_ATOMIC];
            }
            blockSet.add(`nullptr`);
        }
    }

    const category = toolbox.contents.find(cat => cat.name === '變數/指標/位置');
    if (category) {
        blockSet.forEach(blockType => category.contents.push({kind: "block", type: blockType}))
    }
    
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};
