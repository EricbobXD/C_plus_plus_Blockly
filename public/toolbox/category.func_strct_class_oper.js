// 📁 category.func_strct_class_oper.js

Blockly.Blocks['define_function_void'] = {
    init: function() {
        this.jsonInit({
            "message0": "函式型態: void 名稱 %1 變數 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction"
                },
                {
                    "type": "input_value",
                    "name": "data"
                }
            ],
            "message1": "%1 回傳值%2",
            "args1": [{
                    "type": "input_statement",
                    "name": "DO"
                },
                {
                    "type": "field_dropdown",
                    "name": "expression",
                    "options": [
                        ["回傳", "return"],
                        ["不回傳", "no"]
                    ]
                }
            ],
            "colour": "#db00db",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個沒有回傳值的函數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['define_function'] = {
    init: function() {
        this.jsonInit({
            "message0": "函式型態: %1 名稱 %2 變數%3",
            "args0": [{
                    "type": "input_value",
                    "name": "TYPE"
                },
                {
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction2"
                },
                {
                    "type": "input_value",
                    "name": "data"
                }
            ],
            "message1": "%1 回傳值 %2",
            "args1": [{
                    "type": "input_statement",
                    "name": "DO"
                },
                {
                    "type": "input_value",
                    "name": "expression"
                }
            ],
            "inputsInline": true,
            "colour": "#db00db",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個有回傳值的函數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['function_call'] = {
    init: function() {
        this.jsonInit({
            "message0": "函式 %1 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#db00db",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "呼叫函數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['lambda'] = {
    init: function() {
        this.jsonInit({
            "message0": "lambda [%1](引用變數: %2)，多行%3",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "captures",
                    "options": [
                        ["都不要", ""],
                        ["&", "&"],
                        ["=", "="]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VAR"
                },
                {
                    "type": "field_checkbox",
                    "name": "line",
                    "checked": false
                }
            ],
            "message1": "%1",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "colour": "#db00db",
            "output": null,
            "tooltip": "定義一個lambda",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['define_struct'] = {
    init: function() {
        this.jsonInit({
            "message0": "結構 名字: %1",
            "args0": [{
                "type": "field_input",
                "name": "struct_name"
            }],
            "message1": "%1",
            "args1": [{
                "type": "input_statement",
                "name": "def_var"
            }],
            "colour": "#f4a460",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個結構",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['get_struct'] = {
    init: function() {
        this.jsonInit({
            "message0": "結構 名字: %1, 變數名: %2, 大小%3",
            "args0": [{
                    "type": "field_input",
                    "name": "struct_name"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "size"
                }
            ],
            "colour": "#f4a460",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個結構的資料",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['define_class'] = {
    init: function() {
        this.jsonInit({
            "message0": "類別 名子: %1",
            "args0": [{
                "type": "field_input",
                "name": "class_name"
            }],
            "message1": "公開 %1",
            "args1": [{
                "type": "input_statement",
                "name": "public"
            }],
            "message2": "私人 %1",
            "args2": [{
                "type": "input_statement",
                "name": "private"
            }],
            "colour": "#e9967a",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個類別",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['get_class'] = {
    init: function() {
        this.jsonInit({
            "message0": "類別 名字: %1, 變數名: %2, 大小%3",
            "args0": [{
                    "type": "field_input",
                    "name": "class_name"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "size"
                }
            ],
            "colour": "#e9967a",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個類別的資料",
            "helpurl": ""
        });
    }
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

//function
Blockly.Cpp['define_function'] = function(block) {
    var Type = block.getFieldValue('TYPE');
    var funcName = block.getFieldValue('funcName');
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

Blockly.Cpp['define_function_void'] = function(block) {
    var funcName = block.getFieldValue('funcName');
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
        return `void ${funcName}(${data}) {\n${content}  return;\n}\n`, 1;
    }
};
Blockly.Cpp['lambda'] = function(block) {
    var capture = block.getFieldValue('captures');
    var VAR = Blockly.Cpp.valueToCode(block, 'VAR', 1);
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

// function
Blockly.Cpp['function_call'] = function(block) {
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

// struct
Blockly.Cpp['define_struct'] = function(block) {
    var struct_name = block.getFieldValue('struct_name');
    var def_var = Blockly.Cpp.statementToCode(block, 'def_var').replace(/^ {2}/gm, '    ');
    return `struct ${struct_name} {\n${def_var}};`;
}

Blockly.Cpp['get_struct'] = function(block) {
    var struct_name = block.getFieldValue('struct_name');
    var var_name = block.getFieldValue('var_name');
    var size = Blockly.Cpp.valueToCode(block, 'size', 1);
    if (size) {
        return `${struct_name} ${var_name}[${size}];`
    }
    return `${struct_name} ${var_name};`;
};

// class
Blockly.Cpp['define_class'] = function(block) {
    var class_name = block.getFieldValue('class_name');
    var public = Blockly.Cpp.statementToCode(block, 'public').replace(/^ {2}/gm, '    ') || '';
    var private = Blockly.Cpp.statementToCode(block, 'private').replace(/^ {2}/gm, '    ') || '';

    var code = `class ${class_name} {\n`;
    if (public !== '') {
        code += `  public:\n${public}\n`;
    }
    if (private !== '') {
        code += `  private:\n${private}\n`;
    }
    code += `};`;

    return code;
};

Blockly.Cpp['get_class'] = function(block) {
    var class_name = block.getFieldValue('class_name');
    var var_name = block.getFieldValue('var_name');
    var size = Blockly.Cpp.valueToCode(block, 'size', 1);
    if (size) {
        return `${class_name} ${var_name}[${size}];`
    }
    return `${class_name} ${var_name};`;
};

Blockly.Cpp['define_operator'] = function(block) {
    var type1 = block.getFieldValue('TYPE1');
    var var1_1 = Blockly.Cpp.valueToCode(block, 'var1_1', 1);
    var var1_2 = Blockly.Cpp.valueToCode(block, 'var1_2', 1);
    var type2 = block.getFieldValue('TYPE2');
    var var2_1 = Blockly.Cpp.valueToCode(block, 'var2_1', 1);
    var var2_2 = Blockly.Cpp.valueToCode(block, 'var2_2', 1);
    return `bool operator${type1}(${var1_1}, ${var1_2}){\n    return ${var2_1} ${type2} ${var2_2};\n}`;
}
