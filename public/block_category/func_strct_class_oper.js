const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

Blockly.Blocks['define_function'] = {
    init: function() {
        this.appendValueInput("TYPE")
            .appendField("函式型態: ");

        this.text = "函式名稱"; 
        this.Block_type = "Function";
        this.appendDummyInput("Name_Input")
            .appendField("函式名稱")
            .appendField(VarDropdown("Function"), "Name");

        this.jsonInit({
            "type": "define_function",
            "message0": "變數%1",
            "args0": [{
                "type": "input_value",
                "name": "data",
            }],
            "message1": "%1",
            "args1": [{
                    "type": "input_statement",
                    "name": "DO"
                },
            ],
            "inputsInline": true,
            "colour": "#db00db",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個函數",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock['define_function'] = function(block) {
    var Type = Cpp.valueToCode(block, 'TYPE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    var Name = block.getFieldValue('Name');
    var data = Cpp.valueToCode(block, 'data', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '');
    var DO = Cpp.statementToCode(block, 'DO', Cpp.ORDER_ATOMIC).replace(/^ {2}/gm, '    ') || '';
    return `${Type} ${Name}(${data}) {\n${DO}}\n`;
};

Blockly.Blocks['function_call'] = {
    init: function() {
        this.text = "函式名稱"; 
        this.Block_type = "Function";
        this.appendDummyInput("Name_Input")
            .appendField("函式名稱: ")
            .appendField(VarDropdown("Function"), "Name");
        
        this.jsonInit({
            "type": "function_call",
            "message0": "%1",
            "args0": [{
                "type": "input_value",
                "name": "func_name",
                "text": "這裡放置變數"
            }],
            "colour": "#db00db",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "呼叫函數",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock['function_call'] = function(block) {
    var Name = block.getFieldValue('Name');
    var func_name = Cpp.valueToCode(block, 'func_name', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    return `${Name} ${func_name};`;
};

Blockly.Blocks['lambda'] = {
    init: function() {
        this.jsonInit({
            "type": "lambda",
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
                    "name": "var_name"
                },
                {
                    "type": "field_checkbox",
                    "name": "line",
                    "checked": false
                }
            ],
            "message1": "%1 ",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "colour": "#db00db",
            "output": null,
            "tooltip": "定義一個lambda",
            "helpurl": ""
        })
    }
};

Cpp.forBlock['lambda'] = function(block) {
    var captures = block.getFieldValue('captures');
    var var_name = Cpp.valueToCode(block, 'var_name', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || '';
    var DO = Cpp.statementToCode(block, 'DO', Cpp.ORDER_ATOMIC) || '';
    var line = block.getFieldValue('line') === "TRUE";
    if (line) { 
        DO = DO.replace(/^ {2}/gm, '    '); 
        return [`[${captures}](${var_name}){\n${DO}}`, Cpp.ORDER_ATOMIC];
    }
    else {
        DO = DO.replace(/^\(?|\)?$/g, '');
        return [`[${captures}](${var_name}){${DO}}`, Cpp.ORDER_ATOMIC];
    } 
};

Blockly.Blocks['define_struct'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("結構")

        this.text = "結構 名字: ";
        this.Block_type = "Struct"; 
        
        this.jsonInit({
            "type": "define_struct",
            "message0": "%1",
            "args0": [{
                "type": "field_dropdown", 
                "name": "mode", 
                "options": [
                    ["一般", "basic"], 
                    ["繼承", "heritage"], 
                    ["匿名", "anonymity"] 
                ]
            }],
            "inputsInline": true,
            "colour": "#f4a460",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個結構",
            "helpurl": ""
        }), 

        this.setOnChange(function(e) {
            if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
        })
    }, 
    saveExtraState: function(){
        return {"mode": this.getFieldValue("mode")};
    }, 
    loadExtraState: function(state){
        this.UpdateShape_(state.mode);
    }, 
    UpdateShape_: function(mode){
        if (!mode) mode = this.getFieldValue("mode");

        if (mode === "basic" ){
            this.appendDummyInput("Name_Input")
                .appendField("結構 名字: ")
                .appendField(VarDropdown("Struct"), "Name");

            this.appendValueInput("Name2")
                .appendField("變數名: ");
        } else if (mode === "heritage" && NameInput){
            NameInput.appendField("結構 名字: ")
                     .appendField(VarDropdown("Struct"), "Name");
            
        }
    }
};

Cpp.forBlock['define_struct'] = function(block) {
    var Name = block.getFieldValue('Name');
    var DO = Cpp.statementToCode(block, 'DO', Cpp.ORDER_ATOMIC).replace(/^ {2}/gm, '    ');
    return `struct ${Name} {\n${DO}};`;
}

Cpp.forBlock['define_class'] = function(block) {
    const name = block.getFieldValue("class_name");
    let code = `class ${name} {\n`;
    if (block.hasPublic_) {
        code += '  public:\n'+ Cpp.statementToCode(block, 'Public').replace(/^ {2}/gm, '    ');
    }
    if (block.hasPrivate_) {
        code += '  private:\n' + Cpp.statementToCode(block, 'Private').replace(/^ {2}/gm, '    ');
    }
    if (block.hasProtected_) {
        code += '  protected:\n' + Cpp.statementToCode(block, 'Protected').replace(/^ {2}/gm, '    ')   ;
    }
    code += '}\n';
    return code;
};

Blockly.Blocks['get_Struct'] = {
    init: function() {
        this.text = "結構名字: ";
        this.Block_type = "Struct";
        this.appendDummyInput("Name_Input")
            .appendField("結構名字: ")
            .appendField(VarDropdown("Struct"), "Name");

        this.appendDummyInput("Name_Input2")
            .appendField("結構名子: ")
            .appendField(VarDropdown("Struct"), "Name2");
        this.jsonInit({
            "type": "get_struct",
            "message0": "元素數量%1",
            "args0": [{
                "type": "input_value",
                "name": "size"
            }],
            "colour": "#f4a460",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個 Struct 的資料",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock['get_Struct'] = function(block) {
    var Name = block.getFieldValue('Name');
    var Name2 = block.getFieldValue('Name2');
    var size = Cpp.valueToCode(block, 'size', Cpp.ORDER_ATOMIC) || '';
    if (size) 
        return `${Name} ${Name2}[${size}];`
    return `${Name} ${Name2};`;
};

Blockly.Blocks['get_Class'] = {
    init: function() {
        this.text = "類別名字: ";
        this.Block_type = "Class";
        this.appendDummyInput("Name_Input")
            .appendField("類別名字: ")
            .appendField(VarDropdown("Class"), "Name");

        this.appendDummyInput("Name_Input2")
            .appendField("類別名字: ")
            .appendField(VarDropdown("Class"), "Name2");
        this.jsonInit({
            "type": "get_class",
            "message0": "元素數量: %2",
            "args0": [{
                "type": "input_value",
                "name": "size"
            }],
            "colour": "#e9967a",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個 Class 的資料",
            "helpUrl": ""
        })
        this.appendValueInput("size");
        this.setInputsInline(true);
        this.setPreviousStatement(true); 
        this.setNextStatement(true);    
        this.setColour('#f4a460');
        this.setTooltip("取得一個 Class 的資料");
        this.setHelpUrl(''); 
    }
};

Cpp.forBlock['get_Class'] = function(block) {
    var class_name = block.getFieldValue('class_Name');
    var var_name = block.getFieldValue('var_name');
    var size = Cpp.valueToCode(block, 'size', 1);
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


Cpp.forBlock['define_operator'] = function(block) {
    var type1 = block.getFieldValue('TYPE1');
    var var1_1 = Cpp.valueToCode(block, 'var1_1', 1);
    var var1_2 = Cpp.valueToCode(block, 'var1_2', 1);
    var type2 = block.getFieldValue('TYPE2');
    var var2_1 = Cpp.valueToCode(block, 'var2_1', 1);
    var var2_2 = Cpp.valueToCode(block, 'var2_2', 1);
    return `bool operator${type1}(${var1_1}, ${var1_2}){\n    return ${var2_1} ${type2} ${var2_2};\n}`;
}