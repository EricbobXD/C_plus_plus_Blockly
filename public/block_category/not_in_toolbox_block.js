const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

Blockly.Blocks["define_VAR_"] = {
    init: function() {
        this.jsonInit({
            "type": "define_VAR_", 
            "message0": "宣告%1%2%3", 
            "args0": [
                {
                    "type": "field_dropdown", 
                    "name": "const", 
                    "options": [
                        ["不固定", "no"],
                        ["固定", "const"]
                    ]
                }, 
                {
                    "type": "field_dropdown", 
                    "name": "unsigned", 
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                }, 
                {
                    "type": "input_value", 
                    "name": "type"
                }
            ], 
            "inputsInline": true, 
            "previousStatement": null, 
            "nextStatement": null,
            "colour": "#DABD00",
            "extensions": ["dynamic_dropdown", "change_block_type"],
            "tooltip": "定義一個變數",
            "helpurl": ""
        });

        this.text = "變數名稱: ";
        this.Block_type = "VAR";
        this.appendDummyInput("Name_Input")
            .appendField("變數名稱: ")
            .appendField(VarDropdown("VAR"), "Name");

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["賦予值", "val"],
                ["不賦予值", "no"]
            ]), "mode");
        
        this.appendValueInput("value").appendField("=");      
    }
};

Cpp.forBlock["define_VAR_"] = function(block) {
    const Const = block.getFieldValue("const");
    const unsigned = block.getFieldValue("unsigned");
    const type = Cpp.valueToCode(block, "type", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const Name = block.getFieldValue("Name");
    const mode = block.getFieldValue("mode")
    var code = `${Const === "const"?"const ": ""}${unsigned === "unsigned "?"unsigned": ""}${type}`;

    code += ` ${Name}`;
    if (mode === "val"){
        if(!this.getInput("value")) return '';
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code += ` = ${value}`;
    }
    
    if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
    else return `${code};\n`;
};

Blockly.Blocks["compare_block_"] = {
    init: function(){
        this.jsonInit({
            "type": "compare_block",
            "message0": "%1 %2 %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["=", "EQUAL"],
                        ["!=", "NOT_EQUAL"],
                        [">", "GREATER"],
                        ["<", "LESS"],
                        [">=", "GREATER_EQUAL"],
                        ["<=", "LESS_EQUAL"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "inputsInline": true, 
            "previousStatement": null, 
            "nextStatement": null,
            "colour": "#29A1CD",
            "extensions": ["change_block_type"],
            "inputsInline": true,
            "tooltip": "運算符",
            "helpUrl": ""
        });
    }
};

Cpp.forBlock["compare_block_"] = function(block){
    var A = Cpp.valueToCode(block, "A", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";
    var B = Cpp.valueToCode(block, "B", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";

    const operator = block.getFieldValue("OPERATOR");
    var operatorSymbol;

    switch (operator) {
        case "EQUAL":
            operatorSymbol = "=";
            break;
        case "NOT_EQUAL":
            operatorSymbol = "!=";
            break;
        case "GREATER":
            operatorSymbol = ">";
            break;
        case "LESS":
            operatorSymbol = "<";
            break;
        case "GREATER_EQUAL":
            operatorSymbol = ">=";
            break;
        case "LESS_EQUAL":
            operatorSymbol = "<=";
            break;
        default:
            operatorSymbol = "==";
    }

    if (["<", ">", "=", "==", ">=", "<=", "&", "|", "^"].some(op => String(A).includes(op))) {
        A = `(${A})`;
    }
    if (["<", ">", "=", "==", ">=", "<=", "&", "|", "^"].some(op => String(B).includes(op))) {
        B = `(${B})`;
    }

    const code = `${A} ${operatorSymbol} ${B}`;
    if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
    else return `${code};\n`;
};

Blockly.Blocks["math_divide_"] = {
    init: function(){
        this.jsonInit({
            "type": "math_divide_", 
            "message0": "%1 / %2", 
            "args0": [
                {
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ], 
            "inputsInline": true,
            "output": null, 
            "colour": "#277ace"
        })
    }
};

Cpp.forBlock["math_divide_"] = function(block){
    const A = Cpp.valueToCode(block, "A", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";
    const B = Cpp.valueToCode(block, "B", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";
    return [`${A} / ${B}`, Cpp.ORDER_ATOMIC];
}