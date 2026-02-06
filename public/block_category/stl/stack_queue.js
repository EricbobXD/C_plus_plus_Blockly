const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const color = {"Stack": "#c74134", "Queue": "#fd79a8", "Priority_queue": "#F56FA1"};
["Stack", "Queue", "Priority_queue"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_push`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({ 
                "type": `${Block_type}_push`,
                "message0": "新增元素 %1 在最尾端",
                "args0": [{
                    "type": "input_value",
                    "name": "element"
                }],
                "colour": color[Block_type],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `新增元素至 ${Block_type} 最尾端`,
                "helpurl": ""
            });
        }
    }

    Cpp.forBlock[`${Block_type}_push`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.push(${element});\n`;
    };

    Blockly.Blocks[`${Block_type}_emplace`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({ 
                "type": `${Block_type}_emplace`,
                "message0": "新增 %1 在最尾端(直接填入多個參數)",
                "args0": [{
                    "type": "input_value",
                    "name": "element"
                }],
                "colour": color[Block_type],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `新增元素至 ${Block_type} 最尾端`,
                "helpurl": ""
            });
        }
    }

    Cpp.forBlock[`${Block_type}_emplace`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.emplace(${element});\n`;
    };

    Blockly.Blocks[`${Block_type}_push_range`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({ 
                "type": `${Block_type}_push_range`,
                "message0": "新增元素集合 %1 在最尾端",
                "args0": [{
                    "type": "input_value",
                    "name": "Name2"
                }],
                "colour": color[Block_type],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `新增元素集合至 ${Block_type} 最尾端`,
                "helpurl": ""
            });
        }
    }

    Cpp.forBlock[`${Block_type}_push_range`] = function(block) {
        var Name = block.getFieldValue("Name");
        var Name2 = Cpp.valueToCode(block, "Name2", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.push_range(${Name2});\n`;
    };

    Blockly.Blocks[`${Block_type}_pop`] = {
        init: function(){
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({ 
                "type": `${Block_type}_pop`,
                "message0": "加元素 %1( 在最後一個(push)",
                "args0": [{
                    "type": "input_value",
                    "name": "element"
                }],
                "colour": color[Block_type],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `刪除 ${Block_type} 最尾端元素`,
                "helpurl": ""
            });
        }
    }

    Cpp.forBlock[`${Block_type}_pop`] = function(block) {
        var Name = block.getFieldValue("Name");
        var element = Cpp.valueToCode(block, "element", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${Name}.pop(${element});\n`;
    };
});

["Stack", "Queue"].forEach(Block_type =>{
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
                        [`複製${Block_type}內容`, "copy"]
                    ]
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `創建一個 ${Block_type} 元素集合，${Block_type} 是會自動擴展容量的元素集合，但沒有索引值`,
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
            const allinput = ["array", `${Block_type}`];
            allinput.forEach(name => {
                if (this.getInput(name))  this.removeInput(name); 
            });

            if (mode === "array") 
                this.appendValueInput("array").appendField("元素集合");
            else if (mode === "copy")
                this.appendDummyInput(`${Block_type}`).appendField(`${Block_type}元素集合`).appendField(VarDropdown(Block_type), "Name2");
        }
    };
        
    Cpp.forBlock[`define_${Block_type}`] = function(block) {
        const container = Block_type.toLowerCase();

        var type = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var Name = block.getFieldValue("Name");
        var mode = block.getFieldValue("mode");
        var code = `${container}<${type}>${Name}`;

        if (mode === "array"){
            if (!this.getInput("array")) return;
            code += `(${Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""})`;
        } else if (mode === "copy")
            code += `(${block.getFieldValue(`${Block_type}`)})`;
        
        if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
        else return `${code};\n`;
    };
});

Blockly.Blocks["define_Priority_queue"] = {
    init: function() {
        this.appendValueInput("TYPE")
            .appendField(`定義 Priority_queue 資料型態: `);

        this.text = `Priority_queue 名稱: `;
        this.Block_type = "Priority_queue";
        this.appendDummyInput("Name_Input")
            .appendField(`Priority_queue 名稱: `)
            .appendField(VarDropdown("Priority_queue"), "Name");

        this.jsonInit({
            "type": "define_Priority_queue",
            "message0": "初始化方式: %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "mode",
                "options": [
                    ["空", "empty"],
                    ["陣列", "array"],
                    ["迭代器區間", "iter"], 
                    [`複製Priority_queue內容`, "copy"]
                ]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": color[Priority_queue],
            "extensions": ["dynamic_dropdown", "change_block_type"],
            "tooltip": `創建一個 Priority_queue 元素集合，Priority_queue 是會自動擴展容量的元素集合，但沒有索引值`,
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
        const allinput = ["array", "start", "end", "Priority_queue"];
        allinput.forEach(name => {
            if (this.getInput(name))  this.removeInput(name); 
        });

        if (mode === "array") 
            this.appendValueInput("array").appendField("元素集合");
        else if (mode === "iter"){
            this.appendValueInput("start").appendField("開始位置");
            this.appendValueInput("end").appendField("結束位置");
        }
        else if (mode === "copy")
            this.appendDummyInput("Priority_queue").appendField("Priority_queue元素集合").appendField(VarDropdown("Priority_queue"), "Name2");
    }
}; 

Cpp.forBlock["define_Priority_queue"] = function(block) {
    const container = "Priority_queue".toLowerCase();

    var type = Cpp.valueToCode(block, "TYPE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var Name = block.getFieldValue("Name");
    var mode = block.getFieldValue("mode");
    var code = `${container}<${type}>${Name}`;

    if (mode === "array"){
        if (!this.getInput("array")) return;
        code += `(${Cpp.valueToCode(block, "array", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || ""})`;
    } else if (mode === "iter"){
        if (!this.getInput("start") || !this.getInput("end")) return "";
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code += `(${start}, ${end})`;
    } else if (mode === "copy")
        code += `(${block.getFieldValue(`${Block_type}`)})`;
    
    if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
    else return `${code};\n`;
};

["Stack", "Priority_queue"].forEach(Block_type => {
    Blockly.Blocks[`${Block_type}_top`] = {
        init: function(){
            const pos = (Block_type === "Stack")?"最尾端": "最前端";
            this.text = `${Block_type} 名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type} 名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({ 
                "type": `${Block_type}_top`,
                "message0": `讀取${pos}元素`,
                "colour": color[Block_type],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `讀取 ${Block_type} ${pos}元素`,
                "helpurl": ""
            });
        }
    }

    Cpp.forBlock[`${Block_type}_top`] = function(block) {
        return [`${block.getFieldValue("Name")}.top()`, Cpp.ORDER_ATOMIC];
    };
});

Blockly.Blocks["Queue_front"] = {
    init: function(){
        this.text = `${Block_type} 名稱: `;
        this.Block_type = Block_type;
        this.appendDummyInput("Name_Input")
            .appendField(`${Block_type} 名稱: `)
            .appendField(VarDropdown(Block_type), "Name");
        this.jsonInit({ 
            "type": "Queue_fron",
            "message0": "讀取最尾端元素",
            "colour": color[Block_type],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": `讀取 ${Block_type} 最尾端元素`,
            "helpurl": ""
        });
    }
}

Cpp.forBlock["Queue_front"] = function(block) {
    return [`${block.getFieldValue("Name")}.front()`, Cpp.ORDER_ATOMIC];
};