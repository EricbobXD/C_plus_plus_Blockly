const Cpp = Blockly.Cpp;
function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const color = {
    "Vector": "#3d7fd6", "Deque": "#85B09A", 
    "Stack": "#c74134", "Queue": "#fd79a8", "Priority_queue": "#F56FA1", 
    "Set": "#DAA520", "Unordered_set": "#FFD700", "Multiset": "#FACA16", "Flat_set": "#F8DE7E", 
    "Map": "#1abc9c", "Unordered_map": "#1282A2", "Pair": "#338f35"
};

["Vector", "Deque", 
 "Stack", "Queue", "Priority_queue", 
 "Set", "Unordered_set", "Multiset", "Flat_set", 
 "Map", "Unordered_map", "Pair"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_swap`] = {  
        init: function() {
            this.text = `交換 ${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`交換 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name1");
            this.appendDummyInput("Name_Input2")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name2");
            this.jsonInit({
                "type": `${Block_type}_swap`,
                "inputsInline": true,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `把兩個 ${Block_type} 中的元素交換`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_swap`] = function(block) {
        return `${block.getFieldValue('Name1')}.swap(${block.getFieldValue('Name2')});\n`;
    };

    Blockly.Blocks[`${Block_type}`] = {
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}`,
                "inputsInline": true,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "extensions": ["dynamic_dropdown"],
                "output": null, 
                "tooltip": `${Block_type}`,
                "helpurl": ""
            });
        }
    }
    Cpp.forBlock[`${Block_type}`] = function(block) {
        return [`${block.getFieldValue('Name')}`, Cpp.ORDER_ATOMIC];
    };
});

["Vector", "Deque", 
 "Stack", "Queue", "Priority_queue", 
 "Set", "Unordered_set", "Multiset", "Flat_set", 
 "Map", "Unordered_map"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_empty`] = {  
        init: function() {
            this.text = `判斷 ${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`判斷 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("是否為空");
            this.jsonInit({
                "type": `${Block_type}_empty`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `若 ${Block_type} 內部為空，回傳 false，否則回傳 true。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_empty`] = function(block) {
        return [`${block.getFieldValue('Name')}.empty()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_size`] = {  
        init: function() {
            this.text = `讀取 ${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`讀取 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("的元素個數");
            this.jsonInit({
                "type": `${Block_type}_size`,
                "inputsInline": true,
                "output": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `讀取 ${Block_type} 目前持有的元素個數`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_size`] = function(block){
        return [`${block.getFieldValue("Name")}.size()`, Cpp.ORDER_ATOMIC]
    };
});

["Vector", "Deque",
 "Set", "Unordered_set", "Multiset", "Flat_set", 
 "Map", "Unordered_map"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_clear`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("的元素全部清除")
            this.jsonInit({
                "type": `${Block_type}_clear`,
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "tooltip": `清空 ${Block_type} 所有元素。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_clear`] = function(block) {
        return `${block.getFieldValue('Name')}.clear()`;
    };

     Blockly.Blocks[`${Block_type}_max_size`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最大元素數量")
            this.jsonInit({
                "type": `${Block_type}_max_size`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": "球vector最大元素數量",
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_max_size`] = function(block) {
        return [`${block.getFieldValue('Name')}.max_size()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_begin`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(順著走)");
            this.jsonInit({
                "type": `${Block_type}_begin`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，順著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_begin`] = function(block) {
        return [`${block.getFieldValue('Name')}.begin()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_end`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(順著走)");
            this.jsonInit({
                "type": `${Block_type}_end`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，順著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_end`] = function(block) {
        return [`${block.getFieldValue('Name')}.end()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_rbegin`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(逆著走)");
            this.jsonInit({
                "type": `${Block_type}_rbegin`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，逆著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_rbegin`] = function(block) {
        return [`${block.getFieldValue('Name')}.rbegin()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_rend`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(逆著走)");
            this.jsonInit({
                "type": `${Block_type}_rend`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，逆著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_rend`] = function(block) {
        return [`${block.getFieldValue('Name')}.rend()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_cbegin`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(順著走且只能讀)");
            this.jsonInit({
                "type": `${Block_type}_cbegin`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，順著走且只能讀。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_cbegin`] = function(block) {
        return [`${block.getFieldValue('Name')}.cbegin()`, Cpp.ORDER_ATOMIC];
    }

    Blockly.Blocks[`${Block_type}_cend`] = {  
        init: function() {
            this.text = `${Block_type}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(順著走且只能讀)");
            this.jsonInit({
                "type": `${Block_type}_cend`,
                "colour": color[Block_type],
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，順著走且只能讀。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_cend`] = function(block) {
        return [`${block.getFieldValue('Name')}.cend()`, Cpp.ORDER_ATOMIC];
    }
});