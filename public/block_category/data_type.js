const Cpp = Blockly.Cpp

Blockly.Blocks['data_type'] = {
    init: function() {
        this.jsonInit({
            "type": "data_type",
            "message0": "資料型態%1",
            "args0": [{
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["整數", "int"],
                    ["浮點數", "float"],
                    ["雙重浮點數", "double"],
                    ["字元", "char"],
                    ["字串", "string"],
                    ["更長的整數", "long long"]
                ]
            }],
            "colour": "#EB5160",
            "output": "null",
            "tooltip": "選擇資料型態", 
            "helpurl": ""
        });
    }
};

Cpp.forBlock['data_type'] = function(block) {
    return [block.getFieldValue('TYPE'), Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["void"] = {
    init: function() {
        this.jsonInit({
            "type": "void", 
            "message0": "void", 
            "output": null,
            "colour": "#db00db", 
            "tootip": "特別資料型態", 
            "helpurl": ""
        });
    }
};

Cpp.forBlock["void"] = function(){
    return ["void", Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["sizeof"] = {
    init: function() {
        this.jsonInit({
            "type": "sizeof", 
            "message0": "回傳 %1 記憶體所占位元數", 
            "args0": [{
                "type": "input_value", 
                "name": "obj"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#EB5160", 
            "tootip": "特別資料型態", 
            "helpurl": ""
        });
    }
};

Cpp.forBlock["sizeof"] = function(block){
    return [`sizeof(${Cpp.valueToCode(block, "obj", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, '') || ''})`, Cpp.ORDER_ATOMIC];
};