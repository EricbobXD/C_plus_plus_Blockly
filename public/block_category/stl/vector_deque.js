const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const color = {"Vector": "#3d7fd6", "Deque": "#85B09A"};
["Vector", "Deque"].forEach(Block_type =>{
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
                        ["大小", "size"],
                        ["大小+指定元素", "size_element"],
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
                "tooltip": `創建一個 ${Block_type} 容器，${Block_type} 是會自動擴展容量的元素集合`,
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
            const Input = ["size", "element", "array", "start", "end", `${Block_type}`];
            Input.forEach(name => {
                if (this.getInput(name))  this.removeInput(name); 
            });

            switch (mode){
                case "size": 
                    this.appendValueInput("size").appendField("元素個數");
                    break;
                case "size_element": 
                    this.appendValueInput("size").appendField("元素個數");
                    this.appendValueInput("element").appendField("元素");
                    break;
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
            case "size": 
                if (!this.getInput("size")) break;
                var size = Cpp.valueToCode(block, "size", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "");
                code += `(${size})`;
                break;
            case "size_element": 
                if (!this.getInput("size") || !this.getInput("element")) break;
                var size = Cpp.valueToCode(block, "size", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                code += `(${size}, ${element})`;
                break;
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

    Blockly.Blocks[`${Block_type}_push_back`] = {
        init:function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;

            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_push_back`,
                "message0": "新增 %1 在最尾端(已經定義好的變數)",
                "args0": [{
                    "type": "input_value",
                    "name": "element",
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `新增元素至 ${Block_type} 的最尾端，必要時會進行記憶體組態。`,
                "helpUrl": ""
            });

            if (this.UpdateShape_) this.UpdateShape_();
        }, 
    }

    Cpp.forBlock[`${Block_type}_push_back`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.push_back(" + ${element}");\n`;
    };

    Blockly.Blocks[`${Block_type}_emplace_back`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_emplace_back`,
                "message0": "新增 %1 在最尾端(支援直接輸入多個物件建構子的參數)",
                "args0": [{
                    "type": "input_value",
                    "name": "parament",
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `新增物件至 ${Block_type} 的最尾端，必要時會進行記憶體組態。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_emplace_back`] = function(block) {
        var Name = block.getFieldValue("Name");
        var parament = Cpp.valueToCode(block, "parament", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.emplace_back(${parament});\n`;
    };

    Blockly.Blocks[`${Block_type}_append_range`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_append_range`,
                "message0": "加元素集合 %1 到最尾端",
                "args0": [{
                        "type": "input_value",
                        "name": "element"
                    }],
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `新增元素集合至 ${Block_type} 最尾端`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_append_range`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.append_range(${element});\n`;
    };

    Blockly.Blocks[`${Block_type}_pop_back`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.appendDummyInput()
                .appendField("刪除最尾端元素");
            this.jsonInit({
                "type": `${Block_type}_pop_back`,
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `刪除 ${Block_type} 最尾端的元素。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_pop_back`] = function(block) {
        var Name = block.getFieldValue("Name");
        return `${Name}.pop_back();\n`;
    };

    Blockly.Blocks[`${Block_type}_insert`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_insert`,
                "message0": "在 %1 位置插入 %2",
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
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `插入一個元素至 ${Block_type} 內的任意位置。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_insert`] = function(block) {
        var Name = block.getFieldValue("Name");
        var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (pos === 0) {
            return `${Name}.insert(${Name}.begin(), ${value});\n`
        }   
        return `${Name}.insert(${Name}.begin()+${pos}, ${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_insert_range`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_insert_range`,
                "message0": "在位置: %1 加元素集合 %2 (insert)",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "pos"
                    },
                    {
                        "type": "input_value",
                        "name": "array"
                    },
                ],
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `插入一個元素集合至 ${Block_type} 內的任意位置`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_insert_range`] = function(block) {
        var Name = block.getFieldValue("Name");
        var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var array = Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (pos === 0) {
            return `${Name}.insert_range(${Name}.begin(), ${array});\n`
        }   
        return `${Name}.insert_range(${Name}.begin()+${pos}, ${array});\n`;
    }

    Blockly.Blocks[`${Block_type}_erase`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_erase`,
                "message0": "在 %1 位置刪除 %2",
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
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `刪除 ${Block_type} 中一個或多個元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_erase`] = function(block) {
        var Name = block.getFieldValue("Name");
        var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC1).replace(/^\(?|\)?$/g, "") || "";
        if (pos === "0") 
            return `${Name}.erase(${Name}.begin(), ${value});\n`;
        else 
            return `${Name}.erase(${Name}.begin()+${pos}, ${value});\n`;
    }    

    Blockly.Blocks[`${Block_type}_assign`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_assign`,
                "message0": "清空並插入 %1",
                "args0": [{
                    "type": "field_dropdown", 
                    "name": "mode", 
                    "options": [ 
                        ["迭代器範圍", "iter"], 
                        ["陣列", "array"], 
                        ["重複多次相同字元", "repetition"], 
                        ["擷取字串片段並改變原字串", "substr"]
                    ]
                }],
                "inputsInline": true,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `會先把 ${Block_type} 容器清空，然後再新增`,
                "helpurl": "",
            });

            // 監聽積木變更
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

            const Input = ["start", "end", "array", "count", "char", "str", "pos", "len"];
            Input.forEach(input => {
                if (this.getInput(input))
                    this.removeInput(input);
            }); 

            if (mode === "iter"){
                this.appendValueInput("start").appendField("開始位置");
                this.appendValueInput("end").appendField("結束位置");
            } else if (mode === "array"){
                this.appendValueInput("array").appendField("陣列");
            } else if (mode === "repetition"){
                this.appendDummyInput("count").appendField("重複次數");
                this.appendValueInput("char").appendField("重複字元")
            } else if (mode === "substr"){
                this.appendValueInput("str").appendField("被切割字串");
                this.appendValueInput("pos").appendField("切割位置");
                this.appendValueInput("len").appendField("切割長度");
            }
        }
    };

    Cpp.forBlock[`${Block_type}_assign`] = function(block){
        var Name = block.getFieldValue("Name");
        var mode = block.getFieldValue("mode");
        var func = "";

        if (mode === "iter"){
            if (!this.getInput("start") || !this.getInput("end")) return "";
            var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            func = `${start}, ${end}`;
        } else if (mode === "array"){
            if (!this.getInput("array")) return "";
            func = `${Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""}`;
        } else if (mode === "repetition"){
            if (!this.getInput("count") || !this.getInput("char")) return "";
            var count = Cpp.valueToCode(block, "count", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var char = Cpp.valueToCode(block, "char", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            func `${count}, ${char}`;
        } else if (mode === "substr"){
            if (!this.getInput("str") || !this.getInput("pos") || !this.getInput("len")) return "";
            var str = Cpp.valueToCode(block, "str", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var len = Cpp.valueToCode(block, "len", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            func = `${str}, ${pos}, ${len}`;
        }
        
        return `${Name}.assign(${func});\n`;
    }

    Blockly.Blocks[`${Block_type}_assign_range`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_assign_range`,
                "message0": "清空並插入元素集合 %1",
                "args0": [{
                    "type": "input_value", 
                    "name": "array"
                }],
                "inputsInline": true,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `會先把 ${Block_type} 容器清空，然後再新增`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_assign_range`] = function(block){
        var Name = block.getFieldValue("Name");
        var array = Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.assign(${array});\n`;
    }

    Blockly.Blocks[`${Block_type}_operate[]`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_operate[]`,
                "message0": "讀取 %1 位置元素",
                "args0": [{
                    "type": "input_value",
                    "name": "pos"
                }],
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 索引值中的元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_operate[]`] = function(block){
        var Name = block.getFieldValue("Name");
        var pos = Cpp.valueToCode(block, "pos", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return [`${Name}[${pos}]`, Cpp.ORDER_ATOMIC];
    };

    Blockly.Blocks[`${Block_type}_front`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("讀取最前端元素");
            this.jsonInit({
                "type": `${Block_type}_front`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 最前端元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_front`] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.front()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_back`] = {  
        init: function() {
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.appendDummyInput()
                .appendField("讀取最尾端元素");
            this.jsonInit({
                "type": `${Block_type}_back`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 最尾端元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_back`] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.back()`, Cpp.ORDER_ATOMIC];
    };

    Blockly.Blocks[`${Block_type}_resize`] = {  
        init: function() {
            this.text = `改變 ${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`改變 ${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.appendDummyInput()
                .appendField("可容納元素個數")
            this.jsonInit({
                "type": `${Block_type}_resize`,
                "inputsInline": true,
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `改變 ${Block_type} 可容納元素個數。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_resize`] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.resize()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_capacity`] = {  
        init: function() {
            this.text = `讀取 ${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`讀取 ${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.appendDummyInput()
                .appendField("內存容量");
            this.jsonInit({
                "type": `${Block_type}_capacity`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `讀取 ${Block_type} 內存容量`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_capacity`] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.capacity()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_reserve`] = {  
        init: function() {
            this.text = `改變 ${Block_type} 名稱: `;
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input")
                .appendField(`改變 ${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_reserve`,
                "message0": "容量 >= %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "size"
                    }
                ],
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `強制讓 ${Block_type} 容量 >= n`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_reserve`] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.reserve()`, Cpp.ORDER_ATOMIC];
    }   
});

Blockly.Blocks["Deque_push_front"] = {
    init:function(){
        this.text = "Deque 名稱: ";
        this.Block_type = "Deque"
        this.appendDummyInput("Name_Input")
            .appendField("Deque 名稱")
            .appendField(VarDropdown("Deque"), "Name");
        this.jsonInit({
            "type": "Deque_push_front",
            "message0": "新增 %1 在最前端(已經定義好的變數)",
            "args0": [{
                "type": "input_value",
                "name": "element",
            }],
            "inputsInline": true,
            "colour": "#85B09A",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": `新增元素至 Deque 的最前端。`,
            "helpUrl": ""
        });
    }
}

Cpp.forBlock["Deque_push_front"] = function(block) {
    var Name = block.getFieldValue("Name");
    var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return `${Name}.push_front(${element});\n`;
};

Blockly.Blocks["Deque_emplace_front"] = {  
    init: function() {
         this.text = "Deque 名稱: ";
        this.Block_type = "Deque"
        this.appendDummyInput("Name_Input")
            .appendField("Deque 名稱")
            .appendField(VarDropdown("Deque"), "Name");
        this.jsonInit({
            "type": "Deque_emplace_front",
            "message0": "新增 %1 在最前端(支援直接輸入多個物件建構子的參數)",
            "args0": [{
                "type": "input_value",
                "name": "parament",
            }],
            "inputsInline": true,
            "colour": "#85B09A",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": `新增物件至 Deque 的最前端。`,
            "helpUrl": ""
        });
    }
};

Cpp.forBlock["Deque_emplace_front"] = function(block) {
    var Name = block.getFieldValue("Name");
    var parament = Cpp.valueToCode(block, "parament", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return `${Name}.emplace_front(${parament});\n`;
};

Blockly.Blocks["Deque_prepend_range"] = {  
    init: function() {
        this.text = "Deque 名稱: ";
        this.Block_type = "Deque"
        this.appendDummyInput("Name_Input")
            .appendField("Deque 名稱")
            .appendField(VarDropdown("Deque"), "Name");
        this.jsonInit({
            "type": `${Block_type}_prepend_range`,
            "message0": "加元素集合 %1 到最前端",
            "args0": [{
                    "type": "input_value",
                    "name": "element"
                }],
            "colour": "#85B09A",
            "extensions": ["dynamic_dropdown"],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": `新增元素集合至 Deque 最前端`,
            "helpurl": ""
        });
    }
};

Cpp.forBlock["Deque_prepend_range"] = function(block) {
    var Name = block.getFieldValue("Name");
    var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    return `${Name}.prepend_range(${element});\n`;
};
