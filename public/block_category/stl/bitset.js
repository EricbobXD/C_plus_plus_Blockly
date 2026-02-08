const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

Blockly.Blocks["define_Bitset"] = {  
    init: function() {
        this.text = "Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "define_Bitset",
            "message0": "元素個數: %1, 初始化方式: %2",
            "args0": [
                {
                    "type": "input_value", 
                    "name": "size"
                }, 
                {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        ["空", "empty"],
                        ["十進位制數字", "dec"],
                        ["十六進位制數字", "hex"],
                        ["0, 1組成字串", "bin"],
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown", "change_block_type"],
            "tooltip": "創建一個 Bitset 容器，只能裝二進位制的數字",
            "helpUrl": ""
        }), 
        
        this.setOnChange(function(e) {
            if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
        });
    },
    saveExtraState: function(){
        return {"mode": this.getFieldValue("mode")};
    },
    loadExtraState: function(state){
        this.UpdateShape_(state.mode);
    }, 
    UpdateShape_: function(mode){
        if (!mode) mode = this.getFieldValue("mode");
        
        if (this.getInput("number")) this.removeInput("number");
        if (mode !== "empty")
            this.appendValueInput("number");
    }
};
    
Cpp.forBlock["define_Bitset"] = function(block) {
    const Name = block.getFieldValue("Name");
    const size = Cpp.valueToCode(block, "size", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const mode = block.getFieldValue("mode");

    var code = `Bitset<${size}>${Name}`;
    if (mode !== "empty"){
        if (!this.getInput("number")) return "";
        code += `(${Cpp.valueToCode(block, "number", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""})`
    }

    if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
    else return `${code};\n`;
};

Blockly.Blocks["Bitset_operate[]"] = {  
    init: function() {
        this.text = "Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "Bitset_operate[]",
            "message0": "賦予位置%1 值%2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "pos"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "inputsInline": true,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "tooltip": "Bitset 陣列索引值",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["Bitset_operate[]"] = function(block) {
    var Name = block.getFieldValue("Name");
    var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

    return [`${Name}[${pos}] = ${value}`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["Bitset_size"] = {  
    init: function() {
        this.text = "讀取 Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("讀取 Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "Bitset_size",
            "message0": "元素個數",
            "inputsInline": true,
            "output": null, 
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "tooltip": "讀取 Bitset 容器元素個數",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["Bitset_size"] = function(block) {
    return [`${block.getFieldValue("Name")}.size()`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["Bitset_set"] = {  
    init: function() {
        this.text = "修改 Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("修改 Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "Bitset_set",
            "message0": "內容全部變成%1",
            "args0": [{
                "type": "field_dropdown",
                "name": "func", 
                "options": [
                    ["1(true)", "set"],
                    ["0(false)", "reset"]
                ]
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "helpUrl": ""
        });
        
        this.setTooltip(()=>{
            const func = this.getFieldValue("func");
            return `在 Bitset 容器中把內容全部修改為${(func === "set")?"1(true)":"0(false)"}`;
        })
    }
};

Cpp.forBlock["Bitset_set"] = function(block) {
    const Name = block.getFieldValue("Name");
    const func = block.getFieldValue("func");
    return [`${Name}.${func}()`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["Bitset_count"] = {  
    init: function() {
        this.text = "讀取 Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("讀取 Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "Bitset_count",
            "message0": "true(1) 元素個數",
            "inputsInline": true,
            "output": null,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "tooltip": "在 Bitset 容器中讀取元素 = 1(true) 的元素個數",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["Bitset_count"] = function(block) {
    return [`${block.getFieldValue("Name")}.count()`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["Bitset_true"] = {  
    init: function() {
        this.text = "Bitset 名稱: ";
        this.Block_type = "Bitset";
        this.appendDummyInput("Name_Input")
            .appendField("Bitset 名稱: ")
            .appendField(VarDropdown("Bitset"), "Name");

        this.jsonInit({
            "type": "bitset_all",
            "message0": "判斷是否%1 1(true)",
            "args0": [{
                "type": "field_dropdown",
                "name": "func", 
                "options": [
                    ["都是", "all"], 
                    ["有", "any"], 
                    ["沒有", "none"]
                ]
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#ff5757",
            "extensions": ["dynamic_dropdown"],
            "helpUrl": ""
        });

        this.setTooltip(()=>{
            const func = this.getInput("func");
            const tooltip = {
                "all": "都是", 
                "any": "有", 
                "none": "沒有"
            };

            return `在 Bitset 容器中判斷是否${tooltip[func]} 1(true)`;
        })
    }
};

Cpp.forBlock["Bitset_true"] = function(block) {
    const Name = block.getFieldValue("Name");
    const func = block.getFieldValue("func");
    return [`${Name}.${func}()`, Cpp.ORDER_ATOMIC];
};