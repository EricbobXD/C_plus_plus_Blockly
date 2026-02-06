const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const color = {"Set": "#DAA520", "Unordered_set": "#FFD700", "Multiset": "#FACA16", "Flat_set": "#F8DE7E"};
["Set", "Unordered_set", "Multiset", "Flat_set"].forEach(Block_type =>{
    Blockly.Blocks[`define_${Block_type}`] = {  
        init: function() {
            this.appendValueInput("TYPE")
                .appendField(`定義 ${Block_type} 資料型態: `);

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
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `創建一個 ${Block_type} 容器，${Block_type} 是會自動排列及擴展容量的元素集合`,
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

        var type = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var Name = block.getFieldValue("Name");
        var contents = block.getFieldValue("contents");
        var code = `${container}<${type}>${Name}`;

        switch (contents){
            case "array": 
                if (!this.getInput("array")) break;
                code += `(${Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""})`;
                break;
            case "iter":
                if (!this.getInput("start") || !this.getInput("end")) break;
                var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
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
                "message0": `插入一個元素 %1`,
                "args0": [{
                    "type": "input_value",
                    "name": "value"
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 中插入元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_insert`] = function(block) {
        var Name = block.getFieldValue("Name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.insert(${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_insert_range`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_insert_range`,
                "message0": "插入元素集合 %1",
                "args0": [{
                    "type": "input_value",
                    "name": "array"
                }],
                "inputsInline": true, 
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 中插入元素集合`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_insert_range`] = function(block) {
        var Name = block.getFieldValue("Name");
        var array = Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.insert_range(${array});\n`;
    }

    Blockly.Blocks[`${Block_type}_emplace`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_emplace`, 
                "message0": "新增一個元素 %1(支援直接輸入多個物件建構子的參數)",
                "args0": [{
                    "type": "input_value",
                    "name": "para"
                },],
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 中新增一個元素但可(支援直接輸入多個物件建構子的參數`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_emplace`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.emplace(${element});\n`;
    };

    Blockly.Blocks[`${Block_type}_erase`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.jsonInit({
                "type": `${Block_type}_erase`,
                "message0": "刪除元素 %2",
                "args0": [{
                    "type": "input_value",
                    "name": "value"
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 中刪除元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_erase`] = function(block) {
        var Name = block.getFieldValue("Name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
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
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 提取元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_extract`] = function(block) {
        var Name = block.getFieldValue("Name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}.extract(${value})`, 1];
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
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `在 ${Block_type} 中合併並刪除原本 ${Block_type} 擁有元素`,
                "helpUrl": ""
            })
        }
    }

    Cpp.forBlock[`${Block_type}_merge`] = function(block) {
        var Name1 = block.getFieldValue("Name1");
        var Name2 = block.getFieldValue("Name2");
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
                "extensions": ["dynamic_dropdown", "change_block_type"],
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
        var Name = block.getFieldValue("Name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var func = block.getFieldValue("func");
        return [`${Name}.${func}(${value})`, 1];
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
                "extensions": ["dynamic_dropdown", "change_block_type"],
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
        var Name = block.getFieldValue("Name");
        var func = block.getFieldValue("func");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}.${func}(${value})`, 1];
    }
})