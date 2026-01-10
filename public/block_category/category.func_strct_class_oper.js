function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}
export function Create_Function(Block_type, toolbox, workspace) {
    const category = toolbox.contents.find(cat => cat.name === '函式/結構/類別');
    if (Block_type === "Function") {
        Blockly.Blocks['define_function_void'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("函式型態: void, 名稱")
                    .appendField(VarDropdown(Block_type), "func_name");
                this.appendValueInput('data');
                this.appendStatementInput("DO")
                    .setCheck(null)
                    .appendField("回傳值")
                    .appendField(
                        new Blockly.FieldDropdown([
                            ["回傳", "return"],
                            ["不回傳", "no"]
                        ]), "expression"
                    );
                this.setInputsInline(true);
                this.setPreviousStatement(true); 
                this.setNextStatement(true);    
                this.setColour('#db00db');
                this.setTooltip(`定義一個沒有回傳值的函數`);
                this.setHelpUrl(''); 

            }
        };

        Blockly.Cpp.forBlock['define_function_void'] = function(block) {
            var funcName = block.getFieldValue('func_name');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = block.getFieldValue('expression');
            content = content.replace(/^ {2}/gm, '    ');
            if (data.startsWith('(') && data.endsWith(')')) {
                data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }

            if (expression === 'no') {
                return `void ${funcName}(${data}) {\n${content}\n}\n`;
            } else {
                return `void ${funcName}(${data}) {\n${content}  return;\n}\n`;
            }
        };

        Blockly.Blocks['define_function'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("函式型態:");
                this.appendValueInput("TYPE");
                this.appendDummyInput()
                    .appendField("名稱: ")
                    .appendField(VarDropdown(Block_type), "func_name");
                this.appendValueInput('data');
                this.appendStatementInput("DO")
                    .setCheck(null)
                    .appendField("回傳值");
                this.appendValueInput("expression");
                this.setInputsInline(true);
                this.setPreviousStatement(true); 
                this.setNextStatement(true);    
                this.setColour('#db00db');
                this.setTooltip(`定義一個沒有回傳值的函數`);
                this.setHelpUrl(''); 
            }
        };

        Blockly.Cpp.forBlock['define_function'] = function(block) {
            var Type = block.getFieldValue('TYPE');
            var funcName = block.getFieldValue('func_name');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = Blockly.Cpp.valueToCode(block, 'expression', 1);
            content = content.replace(/^ {2}/gm, '    ');
            if (data.startsWith('(') && data.endsWith(')')) {
                data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            if (expression.startsWith('(') && expression.endsWith(')')) {
                expression = expression.slice(1, -1);
            }

            return `${Type} ${funcName}(${data}) {\n${content}    return ${expression};\n}\n`;
        };

        Blockly.Blocks['function_call'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("函式名稱: ")
                    .appendField(VarDropdown(Block_type), "func_name");
                this.appendValueInput("VALUE");
                this.setInputsInline(true);
                this.setPreviousStatement(true); 
                this.setNextStatement(true);    
                this.setColour('#db00db');
                this.setTooltip(`定義一個沒有回傳值的函數`);
                this.setHelpUrl(''); 
            }
        };

        Blockly.Cpp.forBlock['function_call'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value) {
                return `${funcName}(${value});\n`;
            } else {
                return funcName + '\n';
            }

        };

        const blockSet = ["define_function_void", "define_function", "function_call"];
        if (category) {
            category.contents.push({kind: "label", text: "函式"});
            blockSet.forEach(t => category.contents.push({kind: "block", type: t}));
        }
    } else if (Block_type === "Lambda") {
        Blockly.Blocks['lambda'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("lambda [")
                    .appendField(
                        new Blockly.FieldDropdown([
                            ["都不要", ""],
                            ["&", "&"],
                            ["=", "="]
                        ], "captures")
                    )
                    .appendField("] 引用變數: %2")
                this.appendValueInput("var_name");
                this.appendDummyInput()
                    .appendField(new Blockly.FieldCheckbox(false), "line")
                this.appendStatementInput("DO")
                    .setCheck(null);
                this.setOutput(true, null);  
                this.setColour('#db00db');
                this.setTooltip(`定義一個lambda`);
                this.setHelpUrl(''); 
            }
        };
        Blockly.Cpp.forBlock['lambda'] = function(block) {
            var capture = block.getFieldValue('captures');
            var VAR = Blockly.Cpp.valueToCode(block, 'var_name', 1);
            var statement = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var line = block.getFieldValue('line') === "TRUE";
            if (VAR.startsWith('(') && VAR.endsWith(')')) {
                VAR = VAR.slice(1, -1);
            }
            if (line) {
                if (statement.startsWith('(') && statement.endsWith(')')) {
                    statement = statement.slice(1, -1);
                }
                statement = statement.replace(/^ {2}/gm, '    ')
                return [`[${capture}](${VAR}){\n${statement}\n}`, 1];
            } else {
                if (statement.startsWith('(') && statement.endsWith(')')) {
                    statement = statement.slice(1, -1);
                }
                statement = statement.replace(/\n/g, '');
                return [`[${capture}](${VAR}){${statement}}`, 1];
            }
        };
        
        if (category) {
            category.contents.push({"kind": "label", "text": "Lambda"});
            category.contents.push({"kind": "block", "type": "lambda"});
        }
    } else if (Block_type === "Struct"){
        Blockly.Blocks['define_struct'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("結構 名字: ")
                    .appendField(VarDropdown(Block_type), "struct_name");
                this.appendStatementInput("DO");
                this.setPreviousStatement(true); 
                this.setNextStatement(true);    
                this.setColour('#f4a460');
                this.setTooltip(`定義一個結構`);
                this.setHelpUrl(''); 
            }
        };

        Blockly.Cpp.forBlock['define_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var DO = Blockly.Cpp.statementToCode(block, 'DO').replace(/^ {2}/gm, '    ');
            return `struct ${struct_name} {\n${DO}};`;
        }

        if (category){
            category.contents.push({"kind": "label", "text": "Struct"});
            category.contents.push({"kind": "block", "type": "define_struct"})
            category.contents.push({"kind": "button", "id": "Struct_id", "text": `創建${Block_type}變數`, "callbackKey": "get_category"});
        }
    } else if (Block_type === "Class") {
        /*
        Blockly.Blocks['define_class'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("類別 名字: ")
                    .appendField(VarDropdown(Block_type), "class_name");
                this.setMutator(new Blockly.Mutator(["public_mutator", "private_mutator", "protected_mutator"]));
                this.setPreviousStatement(true); 
                this.setNextStatement(true);    
                this.setColour('#e9967a');
                this.setTooltip(`定義一個類別`);
                this.setHelpUrl(''); 
                this.hasPublic_ = false;
                this.hasPrivate_ = false;
                this.hasProtected_ = false;
            }, 
            saveExtraState: function(){
                if (!this.hasPublic_ && !this.hasPrivate_ && !this.hasProtected_) return null;
                return {
                    'hasPublic': this.hasPublic_,
                    'hasPrivate': this.hasPrivate_,
                    'hasProtected': this.hasProtected_
                };
            }, 
            loadExtraState: function(state) {
                this.hasPublic_ = state['hasPublic'] || false;
                this.hasPrivate_ = state['hasPrivate'] || false;
                this.hasProtected_ = state['hasProtected'] || false;
                
                this.updateShape_();
            }, 
            decompose: function(workspace){
                const containerBlock = workspace.newBlock('mutator_container');
                containerBlock.initSvg();
                let connection = containerBlock.getInput('Stack').connection;

                if (this.hasPublic_){
                    const publicBlock = workspace.newBlock('public_mutator');
                    publicBlock.initSvg();
                    connection.connect(publicBlock.previousConnection);
                    connection = publicBlock.nextConnection;
                } 
                
                if (this.hasPrivate_){
                    const privateBlock = workspace.newBlock('private_mutator');
                    privateBlock.initSvg();
                    connection.connect(privateBlock.previousConnection);
                    connection = privateBlock.nextConnection;
                }

                if (this.hasProtected_){
                    const protectedBlock = workspace.newBlock('protected_mutator');
                    protectedBlock.initSvg();
                    connection.connect(protectedBlock.previousConnection);
                    connection = protectedBlock.nextConnection;
                } 
                return containerBlock;
            }, 
            compose: function(containerBlock){
                this.hasPublic_ = false;
                this.hasPrivate_ = false;
                this.hasProtected_ = false;

                const clauseBlock = containerBlock.getInputTargetBlock('Stack');
                
                while (clauseBlock){
                    if (clauseBlock.type === "public_mutator") this.hasPublic_ = true;
                    if (clauseBlock.type === "private_mutator") this.hasPrivate_ = true;
                    if (clauseBlock.type === 'protected_mutator') this.hasProtected_ = true;

                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
                this.updateShape_();
                this.reconnectChildBlocks_(containerBlock);
            }, 
            updateShape_: function(){
                const inputs = [
                    { key: 'hasPublic_', name: 'Public', label: 'public:' },
                    { key: 'hasPrivate_', name: 'Private', label: 'private:' },
                    { key: 'hasProtected_', name: 'Protected', label: 'protected:' }
                ];

                inputs.forEach(input => {
                    if (this[input.key]) {
                        if (!this.getInput(input.name)) {
                            this.appendStatementInput(input.name).appendField(input.label);
                        }
                    } else {
                        if (this.getInput(input.name)) {
                            this.removeInput(input.name);
                        }
                    }
                });
            }, 
            saveConnections: function(containerBlock) {
                let clauseBlock = containerBlock.getInputTargetBlock('Stack');
                if (clauseBlock.type === "public_mutator"){
                    const publicInput = this.getInput("Public");
                    clauseBlock.statementConnection_ = publicInput && publicInput.connection.targetconnection;
                } else if (clauseBlock.type === "private_mutator"){
                    const privateInput = this.getInput("Private");
                    clauseBlock.statementConnection_ = privateInput && privateInput.connection.targetconnection;
                } else {
                    const protectedInput = this.getInput("Private");
                    clauseBlock.statementConnection_ = protectedInput && protectedInput.connection.targetconnection;
                }
            },
            reconnectChildBlocks_: function(containerBlock) {
                let clauseBlock = containerBlock.getInputTargetBlock('Stack');
                while (clauseBlock) {
                    if (clauseBlock.type === 'public_mutator') {
                        const input = this.getInput('Public');
                        if (clauseBlock.statementConnection_) input.connection.connect(clauseBlock.statementConnection_);
                    } 

                    if (clauseBlock.type === 'private_mutator') {
                        const input = this.getInput('Private');
                        if (clauseBlock.statementConnection_) input.connection.connect(clauseBlock.statementConnection_);
                    } 

                    if (clauseBlock.type === 'protected_mutator') {
                        const input = this.getInput('Protected');
                        if (clauseBlock.statementConnection_) input.connection.connect(clauseBlock.statementConnection_);
                    } 
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            }
        };

        Blockly.Blocks['public_mutator'] = {init:function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Public"); this.setNextStatement(true);}};
        Blockly.Blocks['private_mutator'] = {init:function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Private"); this.setNextStatement(true); this.setPreviousStatement(true);}};
        Blockly.Blocks['protected_mutator'] = {init:function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Protected"); this.setPreviousStatement(true);}};
        Blockly.Cpp.forBlock['define_class'] = function(block) {
            const name = block.getFieldValue('class_name');
            let code = `class ${name} {\n`;
            if (block.hasPublic_) {
                code += '  // public\n' + Blockly.Cpp.statementToCode(block, 'PUBLIC');
            }
            if (block.hasPrivate_) {
                code += '  // private\n' + Blockly.Cpp.statementToCode(block, 'PRIVATE');
            }
            if (block.hasProtected_) {
                code += '  // protected\n' + Blockly.Cpp.statementToCode(block, 'PROTECTED');
            }
            code += '}\n';
            return code;
        };

        const blockSet = ["define_class"];
        if (category) {
            category.contents.push({kind: "label", text: "類別"});
            blockSet.forEach(t => category.contents.push({kind: "block", type: t}));
        }*/
    } else {
        Blockly.Blocks['define_operator'] = {
            init: function() {
                this.jsonInit({
                    "message0": "運算子%1, 變數(%2, %3)",
                    "args0": [{
                            "type": "field_dropdown",
                            "name": "TYPE1",
                            "options": [
                                [">", ">"],
                                ["<", "<"],
                                ["==", "=="],
                                [">=", ">="],
                                ["<=", "<="]
                            ]
                        },
                        {
                            "type": "input_value",
                            "name": "var1_1"
                        },
                        {
                            "type": "input_value",
                            "name": "var1_2"
                        }
                    ],
                    "message1": "回傳值: %1 %2 %3",
                    "args1": [{
                            "type": "input_value",
                            "name": "var2_1"
                        },
                        {
                            "type": "field_dropdown",
                            "name": "TYPE2",
                            "options": [
                                [">", ">"],
                                ["<", "<"],
                                ["==", "=="],
                                [">=", ">="],
                                ["<=", "<="]
                            ]
                        },
                        {
                            "type": "input_value",
                            "name": "var2_2"
                        }
                    ],
                    "previousStatement": true,
                    "nextStatement": true,
                    "colour": "#DAA520",
                    "tooltip": "",
                    "helpurl": ""
                });
            }
        };


        Blockly.Cpp.forBlock['define_operator'] = function(block) {
            var type1 = block.getFieldValue('TYPE1');
            var var1_1 = Blockly.Cpp.valueToCode(block, 'var1_1', 1);
            var var1_2 = Blockly.Cpp.valueToCode(block, 'var1_2', 1);
            var type2 = block.getFieldValue('TYPE2');
            var var2_1 = Blockly.Cpp.valueToCode(block, 'var2_1', 1);
            var var2_2 = Blockly.Cpp.valueToCode(block, 'var2_2', 1);
            return `bool operator${type1}(${var1_1}, ${var1_2}){\n    return ${var2_1} ${type2} ${var2_2};\n}`;
        }
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_getName(Block_type, toolbox, workspace){
    var str = (Block_type === "Struct_Name")?"結構":"類別";
    Blockly.Blocks[`get_${Block_type}`] = {
        init: function() {
            this.appendDummyInput()
                .appendField(`${str} 名字: `)
                .appendField(VarDropdown(Block_type), "stuct_name");
            this.appendDummyInput()
                .appendField("變數名: ")
                .appendField(VarDropdown("Struct_Name"), "var_name");
            this.appendValueInput("size");
            this.setPreviousStatement(true); 
            this.setNextStatement(true);    
            this.setColour('#f4a460');
            this.setTooltip(`取得一個${str}的資料`);
            this.setHelpUrl(''); 
        }
    };

    Blockly.Cpp.forBlock[`get_${Block_type}`] = function(block) {
        var struct_name = block.getFieldValue('struct_name');
        var var_name = block.getFieldValue('var_name');
        var size = Blockly.Cpp.valueToCode(block, 'size', 1);
        if (size) {
            return `${struct_name} ${var_name}[${size}];`
        }
        return `${struct_name} ${var_name};`;
    };
    const category = toolbox.contents.find(cat => cat.name === '函式/結構/類別');
    if (category) {
        var block_index = category.contents.findIndex(button => ( button.id === `${Block_type}_id`));

        if (block_index !== -1)
            category.contents.splice(block_index+1, 0, {"kind": "block", "type": `get_${Block_type}`});
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
}