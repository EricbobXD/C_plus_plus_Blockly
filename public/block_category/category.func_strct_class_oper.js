function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

Blockly.Blocks['define_function_void'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("函式型態: void, 名稱")
            .appendField(VarDropdown("Function"), "func_name");
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
            .appendField(VarDropdown("Function"), "func_name");
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
            .appendField(VarDropdown("Function"), "func_name");
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

Blockly.Blocks['define_struct'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("結構 名字: ")
            .appendField(VarDropdown("Struct"), "struct_name");
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

Blockly.Blocks['get_struct'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("結構名字: ")
            .appendField(VarDropdown("Struct"), "stuct_name");
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

Blockly.Cpp.forBlock['get_struct'] = function(block) {
    var struct_name = block.getFieldValue('struct_name');
    var var_name = block.getFieldValue('var_name');
    var size = Blockly.Cpp.valueToCode(block, 'size', 1);
    if (size) {
        return `${struct_name} ${var_name}[${size}];`
    }
    return `${struct_name} ${var_name};`;
};

Blockly.Blocks['get_class'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("類別名字: ")
            .appendField(VarDropdown("Class"), "class_Name");
        this.appendDummyInput()
            .appendField("變數名: ")
            .appendField(VarDropdown("Class_Name"), "var_name");
        this.appendValueInput("size");
        this.setPreviousStatement(true); 
        this.setNextStatement(true);    
        this.setColour('#f4a460');
        this.setTooltip(`取得一個${str}的資料`);
        this.setHelpUrl(''); 
    }
};

Blockly.Cpp.forBlock['get_class'] = function(block) {
    var class_name = block.getFieldValue('class_Name');
    var var_name = block.getFieldValue('var_name');
    var size = Blockly.Cpp.valueToCode(block, 'size', 1);
    if (size) {
        return `${class_name} ${var_name}[${size}];`
    }
    return `${class_name} ${var_name};`;
};

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