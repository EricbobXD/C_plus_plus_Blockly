const Cpp = Blockly.Cpp;

Blockly.Blocks["sort_container"] = {
    init: function(){
        this.jsonInit({
            "type": "sort_container",
            "message0": `資料型態: %1,排序方式 a %2 b`,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE"
                }, 
                {
                    "type": "field_dropdown", 
                    "name": "func", 
                    "options": [
                        ["<", "less"], 
                        [">", "greater"], 
                        ["==", "eqaul_to"], 
                        ["!=", "not_equal_to"],
                        [">=", "greater_equal"], 
                        ["<=", "less_equal"]
                    ]
                }
            ],
            "output": null, 
            "colour": "#3EABF4",
            "extensions": ["change_block_type"],
            "helpurl": ""
        }); 

        this.setTooltip(()=>{
            const func = this.getFieldValue("func");
            const tooltip = {
                "less":  "<", 
                "greater":  ">",
                "equal_to":  "==", 
                "not_equal_to":  "!=", 
                "greater_equal":  ">=",  
                "less_equal":  "<="
            };
            
            return `自訂義容器排列方式 a ${tooltip[func]} b`
        })
    }
}

Cpp.forBlock["sort_container"] = function(block){
    const TYPE = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";;
    const func = block.getFieldValue("func");
    const code = `${func}<${TYPE}>`;

    if (block.outputConnection) return [`${code}()`, Cpp.ORDER_ATOMIC];
    return code;
}

Blockly.Blocks["bind"] = {
    init: function(){
        this.jsonInit({
            "type": "bind",
            "message0": "函式: %1, 參數%2",
            "args0": [{
                    "type": "input_value",
                    "name": "func"
                },
                {
                    "type": "input_value",
                    "name": "param"
                }
            ],
            "output": null,
            "inputsInline": true,
            "colour": "#3EABF4"
        })
    }
}

Cpp.forBlock["bind"] = function(block) {
    var func = Cpp.valueToCode(block, "func", Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || ''
    var param = Cpp.valueToCode(block, "param", Blockly.Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || ''
    return [`bind(${func}, ${param})`, 1];
}
    


Blockly.Blocks["placeholder"] = {
    init: function(){
        this.jsonInit({
            "type": "placeholder",
            "message0": "placeholder: %1",
            "args0": [{
                "type": "field_input",
                "name": "number"
            }],
            "output": null,
            "inputsInline": true,
            "colour": "#3EABF4"
        })
    }
}

Cpp.forBlock["placeholder"] = function(block){
    return [`placeholder::_${block.getFieldValue("number")}`, 1]
}