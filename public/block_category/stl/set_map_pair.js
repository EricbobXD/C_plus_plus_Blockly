const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const color = {
    "Set": "#DAA520", "Unordered_set": "#FFD700", "Multiset": "#FACA16", "Flat_set": "#F8DE7E",
    "Map": "#3BC1A8", "Unordered_map": "#249E94", "Multimap": "#0C7779", "Pair": "#005461"
};
["Set", "Unordered_set", "Multiset", "Flat_set", "Map", "Unordered_map", "Multimap"].forEach(Block_type =>{
    Blockly.Blocks[`define_${Block_type}`] = {  
        init: function() {
            this.appendValueInput("Key_TYPE")
                .appendField(`定義 ${Block_type} key 資料型態: `);
            this.appendValueInput("Value_TYPE")
                .appendField("value 資料型態: ")

            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `define_${Block_type}`,
                "message0": "初始化方式: %1",
                "args0": [{
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        ["空", "empty"],
                        ["元素集合", "array"],
                        ["迭代器區間", "iter"],
                        [`複製${Block_type}內容`, "copy"]
                    ]
                }],
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", , "change_block_type"],
                "tooltip": `創建一個 ${Block_type} 容器，${Block_type} 是會自動排列及擴展容量的元素集合`,
                "helpUrl": ""
            }), 
            
            this.setOnChange(function(e) {
                if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
            });

            this.setInputsInline(true);
        },
        saveExtraState: function(){
            return {"mode": this.getFieldValue("mode")};
        },
        loadExtraState: function(state){
            this.UpdateShape_(state.mode);
        }, 
        UpdateShape_: function(mode){
            if (!mode) mode = this.getFieldValue("mode");
            const Input = ["array", "start", "end", `${Block_type}`];
            Input.forEach(name => {
                if (this.getInput(name))  this.removeInput(name); 
            });

            switch (mode){
                case "array": 
                    this.appendValueInput("array").appendField("元素集合");
                    break;
                case "iter":
                    this.appendValueInput("start").appendField("開始位置");
                    this.appendValueInput("end").appendField("結束位置");
                    break;
                case "copy": 
                    this.appendDummyInput(`${Block_type}`).appendField(`${Block_type}元素集合`).appendField(VarDropdown(Block_type), "Name2");
                default:
                    break;
            }
        }
    };
        
    Cpp.forBlock[`define_${Block_type}`] = function(block) {
        const container = Block_type.toLowerCase();

        const Key_TYPE = Cpp.valueToCode(block, "Key_TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        const Value_TYPE = Cpp.valueToCode(block, "Value_TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        const Name = block.getFieldValue("Name");
        const contents = block.getFieldValue("contents");
        var code = `${container}<${Key_TYPE}, ${Value_TYPE}>${Name}`;

        switch (contents){
            case "array": 
                if (!this.getInput("array")) break;
                code += `(${Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""})`;
                break;
            case "iter":
                if (!this.getInput("start") || !this.getInput("end")) break;
                const start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                const end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                code += `(${start}, ${end})`;
                break;
            case "copy":
                code += `(${block.getFieldValue(`${Block_type}`)})`;
            default: 
                break;
        }

        if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
        else return `${code};\n`;
    };

    Blockly.Blocks[`${Block_type}_insert`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_insert`,
                "message0": `插入 %1 %2`,
                "args0": [
                    {
                        "type": "field_dropdown", 
                        "name": "func", 
                        "options": [
                            ["一個元素", "insert"], 
                            ["一個元素集合", "insert_range"], 
                            ["一組物件建構子的參數", "emplace"]
                        ]
                    }, 
                    {
                        "type": "input_value",
                        "name": "value"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "helpUrl": ""
            }), 

            this.setTooltip(()=>{
                const func = this.getFieldValue("func");
                const tooltip = {
                    "insert": "一個元素", 
                    "insert_range": "一個元素集合", 
                    "emplace": "一組物件建構子的參數"
                };

                return `在 ${Block_type} 中插入${tooltip[func]}`;
            })
        }
    }

    Cpp.forBlock[`${Block_type}_insert`] = function(block) {
        const Name = block.getFieldValue("Name");
        const func = block.getFieldValue("func")
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.${func}(${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_erase`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_erase`,
                "message0": "刪除元素 %1",
                "args0": [{
                    "type": "input_value",
                    "name": "value"
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `在 ${Block_type} 中刪除元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_erase`] = function(block) {
        const Name = block.getFieldValue("Name");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.erase(${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_extract`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_extract`,
                "message0": "提取 %1",
                "args0": [{
                    "type": "input_value",
                    "name": "value"
                }],
                "inputsInline": true,
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `在 ${Block_type} 提取元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_extract`] = function(block) {
        const Name = block.getFieldValue("Name");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}.extract(${value})`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_merge`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            
            this.appendDummyInput()
                .appendField("合併");

            this.appendDummyInput("Name_Input2")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name2");

            this.jsonInit({
                "type": `${Block_type}_merge`,
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `在 ${Block_type} 中合併並刪除原本 ${Block_type} 擁有元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_merge`] = function(block) {
        const Name1 = block.getFieldValue("Name1");
        const Name2 = block.getFieldValue("Name2");
        return `${Name1}.merge(${Name2});\n`;
    };

    Blockly.Blocks[`${Block_type}_find`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_find`,
                "message0": "尋找是否有元素: %1, 返回值: %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "value"
                    }, 
                    {
                        "type": "field_dropdown", 
                        "name": "func", 
                        "options": [
                            ["有: 0, 沒有: 1", "count"], 
                            ["有: true, 沒有: false", "contains"], 
                            ["有: 當前位置迭代器, 沒有: end迭代器", "iter"]
                        ]
                    }
                ],
                "inputsInline": true,
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "helpUrl": ""
            })

            this.setTooltip(() =>{
                const func = this.getFieldValue("func");
                const tooltip = {
                    "count": "如果有元素回傳 0，沒有元素則回傳 1", 
                    "contains": "如果有元素回傳 true，沒有元素則回傳 false", 
                    "iter": "如果有元素回傳當前位置迭代器，沒有元素則回傳 end"
                }
                return `在 ${Block_type} 中 ${tooltip[func]}`;
            });
        }
    }

    Cpp.forBlock[`${Block_type}_find`] = function(block) {
        const Name = block.getFieldValue("Name");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        const func = block.getFieldValue("func");
        return [`${Name}.${func}(${value})`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_find_index`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_find_index`,
                "message0": "尋找 %1 %2",
                "args0": [{
                        "type": "field_dropdown",
                        "name": "func", 
                        "options": [
                            ["第一個 ≥", "lower_bound"], 
                            ["最後一個 ≥", "upper_bound"], 
                            ["我全都要", "equal_range"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "value"
                    }
                ],
                "inputsInline": true,
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "helpUrl": ""
            }), 

            this.setTooltip(()=>{
                const func = this.getFieldValue("func");
                const tooltip = {
                    "lower_bound": "尋找第一個 ≥ 值的位置", 
                    "upper_bound": "尋找最後一個 ≥ 值的位置", 
                    "equal_range": "尋找第一個 ≥ 值的位置(first)和最後一個 ≥ 值的位置(second)"
                };

                return `在 ${Block_type} 中${tooltip[func]}`;
            });
        }
    };

    Cpp.forBlock[`${Block_type}_find_index`] = function(block) {
        const Name = block.getFieldValue("Name");
        const func = block.getFieldValue("func");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}.${func}(${value})`, Cpp.ORDER_ATOMIC];
    }
});

["Map", "Multimap", "Unordered_map"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_first`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_first`,
                "message0": "位置: %1 的key(first)",
                "args0": [{
                    "type": "input_value",
                    "name": "pos"
                }],
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `在 ${Block_type} 中讀取某個位置中的 key`,
                "helpUrl": ""
            })
        }
    };

    Cpp.forBlock[`${Block_type}_first`] = function(block) {
        const Name = block.getFieldValue("Name");
        const pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}[${pos}].first`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_second`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_second`,
                "message0": "位置: %1 的value(second)",
                "args0": [{
                    "type": "input_value",
                    "name": "pos"
                }],
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `在 ${Block_type} 中讀取某個位置中的 value`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_second`] = function(block) {
        const Name = block.getFieldValue("Name");
        const pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}[${pos}].second`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`make_${Block_type}`] = {
        init: function(){
            this.jsonInit({
                "type": `make_${Block_type}`,
                "message0": "{key: %1, value: %2}",
                "args0": [{
                        "type": "input_value",
                        "name": "key"
                    },
                    {
                        "type": "input_value",
                        "name": "value"
                    }
                ],
                "output": null,
                "inputsInline": true,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `創建一個 pair 並擁有 key & value`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`make_${Block_type}`] = function(block) {
    const key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return [`{${key}, ${value}}`, Cpp.ORDER_ATOMIC];
    }
})


Blockly.Blocks["define_Pair"] = {  
    init: function() {
        this.appendValueInput("Key_TYPE")
            .appendField(`定義 Pair key 資料型態: `);
        this.appendValueInput("Value_TYPE")
            .appendField("value 資料型態: ")

        this.text = "Pair 名稱: ";
        this.Block_type = "Pair";
        this.appendDummyInput("Name_Input")
            .appendField(`Pair 名稱: `)
            .appendField(VarDropdown("Pair"), "Name");

        this.jsonInit({
            "type": "define_Pair",
            "message0": "初始化方式: %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "mode",
                "options": [
                    ["空", "empty"],
                    ["pair", "pair"]
                ]
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": color["Pair"],
            "extensions": ["dynamic_dropdown", , "change_block_type"],
            "tooltip": "創建一個 Pair 容器",
            "helpUrl": ""
        }), 
        
        this.setOnChange(function(e) {
            if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
        });

        this.setInputsInline(true);
    },
    saveExtraState: function(){
        return {"mode": this.getFieldValue("mode")};
    },
    loadExtraState: function(state){
        this.UpdateShape_(state.mode);
    }, 
    UpdateShape_: function(mode){
        if (!mode) mode = this.getFieldValue("mode");
        if (this.getInput("key")) this.removeInput("key");
        if (this.getInput("value")) this.removeInput("value")

        if (mode === "pair"){
            this.appendValueInput("key").appendField("key: ");
            this.appendDummyInput("value").appendField("value: ");
        }
    }
};
    
Cpp.forBlock["define_Pair"] = function(block) {
    const Key_TYPE = Cpp.valueToCode(block, "Key_TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const Value_TYPE = Cpp.valueToCode(block, "Value_TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const Name = block.getFieldValue("Name");
    const mode = block.getFieldValue("mode");

    var code = `pair<${Key_TYPE}, ${Value_TYPE}>${Name}`;
    if (mode === "pair"){
        if (!this.getInput("key") || !this.getInput("value")) return '';
        const key = Cpp.valueToCode(block, "key", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code += ` = {${key}, ${value}}`;
    }
    
    if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
    else return `${code};\n`;
};  

Blockly.Blocks["Pair_first"] = {
    init: function(){
        this.text = "Pair 名稱: ";
        this.Block_type = "Pair";
        this.appendDummyInput("Name_Input")
            .appendField("Pair 名稱: ")
            .appendField(VarDropdown("Pair"), "Name")
            .appendField("的 key(first)");

        this.jsonInit({
            "type": "Pair_first",
            "output": null,
            "colour": color["Pair"],
            "extensions": ["dynamic_dropdown"],
            "tooltip": "在 Pair 中讀取某個位置中的 key",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["Pair_first"] = function(block) {
    const Name = block.getFieldValue("Name");
    const pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return [`${Name}[${pos}].first`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["Pair_second"] = {
    init: function(){
        this.text = "Pair 名稱: ";
        this.Block_type = "Pair";
        this.appendDummyInput("Name_Input")
            .appendField("Pair 名稱: ")
            .appendField(VarDropdown("Pair"), "Name")
            .appendField("的 value(second)"); 
        this.jsonInit({
            "type": "Pair_second",
            "output": null,
            "colour": color["Pair"],
            "extensions": ["dynamic_dropdown"],
            "tooltip": "在 Pair 中讀取某個位置中的 value",
            "helpUrl": ""
        })
    }
};

Cpp.forBlock["Pair_second"] = function(block) {
    const Name = block.getFieldValue("Name");
    const pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return [`${Name}[${pos}].second`, Cpp.ORDER_ATOMIC];
};

Blockly.Blocks["make_Pair"] = {
    init: function(){
        this.jsonInit({
            "type": "make_pair",
            "message0": "{key: %1, value: %2}",
            "args0": [{
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "inputsInline": true,
            "colour": color["Pair"],
            "extensions": ["dynamic_dropdown"],
            "tooltip": `創建一個 pair 並擁有 key & value`,
            "helpUrl": ""
        })
    }
};

Cpp.forBlock['make_Pair'] = function(block) {
    const key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    const value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return [`{${key}, ${value}}`, Cpp.ORDER_ATOMIC];
};