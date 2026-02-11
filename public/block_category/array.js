const Cpp = Blockly.Cpp

function Dropdown() {
    return new Blockly.FieldDropdown(
        Cpp["Array"].map(v => [v, v])
    );
}

Blockly.Blocks["define_array"] = {
    init: function() {
        this.appendValueInput("TYPE")
            .appendField("定義陣列資料型態: ");

        this.text = "陣列名稱: ";
        this.Block_type = "Array";
        this.appendDummyInput("Name_Input")
            .appendField("陣列名稱: ")
            .appendField(Dropdown(), "Name");

        this.jsonInit({
            "type": "define_array",
            "message0": ", %1",
            "args0": [{
                    "type": "field_dropdown", 
                    "name": "mode", 
                    "options": [
                        ["元素個數", "size"], 
                        ["元素個數+元素", "size_element"]
                    ]
            }], 
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "tooltip": "創建一個陣列",
            "helpUrl": ""
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
        const allinput = ["size", "element"]; 
        allinput.forEach(name => { 
            if (this.getInput(name)) this.removeInput(name); 
        });

        if (mode === "size") 
            this.appendValueInput("size").appendField("元素個數: ");
        else if (mode === "size_element") {
            this.appendValueInput("size").appendField("元素個數");
            this.appendValueInput("element").appendField("元素");
        }
    }
};

Cpp.forBlock["define_array"] = function(block) {
    var type = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var Name = block.getFieldValue("Name");
    var mode = block.getFieldValue("mode");

    
    if (mode === "size") {
        var size = Cpp.valueToCode(block, "size", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return type + " " + Name + "[" + size + "];";
    } else if (mode === "size_element"){
        if (!this.getInput("element")) return "";
        console.log(111);
        var size = Cpp.valueToCode(block, "size", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return type + " " + Name + "[" + size + "] = {" + element + "};\n";
    }
};

Blockly.Blocks["array_name"] = {
    init: function() {

        this.text = "陣列名稱: ";
        this.Block_type = "Array";
        this.appendDummyInput("Name_Input")
            .appendField("陣列名稱: ")
            .appendField(Dropdown(), "Name");
        this.jsonInit({
            "type": "array_name", 
            "output": null, 
            "colour": "#ff5757", 
            "extensions": ["dynamic_dropdown"],
            "tooltip": "陣列",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["array_name"] = function(block) {
    var Name = block.getFieldValue("Name");
    return [Name, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["array_content"] = {
    init: function() {
        this.jsonInit({
            "type": "array_content", 
            "message0": "陣列內容 { %1 }",
            "args0": [{
                "type": "input_value", 
                "name": "mode"
            }], 
            "output": null, 
            "colour": "#ff5757",
            "tooltip": "陣列",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["array_content"] = function(block) {
    var content = Cpp.valueToCode(block, "mode", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return ["{" + content + "}", Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["array_operate[]"] = {
    init: function() {
        this.text = "陣列名稱: ";
        this.Block_type = "Array";
        this.appendDummyInput("Name_Input")
            .appendField("陣列")
            .appendField(Dropdown(), "Name");
        this.jsonInit({
            "type": "array_operate[]", 
            "message0": "[%1]",
            "args0": [{
                "type": "input_value", 
                "name": "pos"
            }], 
            "output": null, 
            "colour": "#ff5757", 
            "extensions": ["dynamic_dropdown"],
            "tooltip": "陣列索引值",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["array_operate[]"] = function(block) {
    var Name = block.getFieldValue("Name");
    var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var code = Name + "[" + pos + "]";
    return [code, Cpp.ORDER_ATOMIC];
};

