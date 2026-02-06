const Cpp = Blockly.Cpp;

const functional = [
    {name: "less", rule: "<"}, 
    {name: "greater", rule: ">"},
    {name: "equal_to", rule: "=="}, 
    {name: "not_equal_to", rule: "!="}, 
    {name: "greater_equal", rule: ">="},  
    {name: "less_equal", rule: "<="}
]

functional.forEach((item) => {
    Blockly.Blocks[item.name] = {
        init: function(){
            this.jsonInit({
                "type": `${item.name}`,
                "message0": `資料型態%1, 函式: %2, 排序方式 a ${item.rule} b`,
                "args0": [
                    {
                        "type": "input_value",
                        "name": "TYPE"
                    }, 
                    {
                        "type": "field_checkbox",
                        "name": "func"
                    }
                ],
                "colour": "#3EABF4",
                "output": null
            })
        }
    }

    Cpp.forBlock[item.name] = function(block){
        const TYPE = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";;
        if (block.getFieldValue("func") === "TRUE") 
            return [`${item.name}<${TYPE}>()`, 1];
        return [`${item.name}<${TYPE}>`, 1];
    }
});

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
    var func = Cpp.valueToCode(block, "func", 1);
    var param = Cpp.valueToCode(block, "param", 1);
    if (func.startsWith("(") && func.endsWith(")")) {
        func = func.slice(1, -1);
    }
    
    if (param.startsWith("(") && param.endsWith(")")) {
        param = param.slice(1, -1);
    }
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