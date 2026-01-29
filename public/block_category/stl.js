function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

const Cpp = Blockly.Cpp;
["Vector", "Deque", 
 "Stack", "Queue", "Priority_queue", 
 "Map", "Unordered_map", "Pair", 
 "Set", "Unordered_set", "Flat_set", "multiset"].forEach(Block_type =>{

    Blockly.Blocks[`${Block_type}_swap`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`交換 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name1");
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name2");
            this.jsonInit({
                "type": "vector_swap",
                "colour": "#3d7fd6",
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `把兩個 ${Block_type} 中的元素交換`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_swap`] = function(block) {
        var Name1 = block.getFieldValue('Name1');
        var Name2 = block.getFieldValue('Name2');
        return `${Name1}.swap(${Name2});\n`;
    };

    Blockly.Blocks[`${Block_type}_front`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("讀取第一個元素");
            this.jsonInit({
                "type": `${Block_type}_front`,
                "colour": "#3d7fd6",
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 第一個元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_front`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.front()`, 1];
    }

    Blockly.Blocks[`${Block_type}_back`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("讀取最後一個元素");
            this.jsonInit({
                "type": `${Block_type}_back`,
                "colour": "#3d7fd6",
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 最後一個元素。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_back`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.back()`, 1];
    };

    Blockly.Blocks[`${Block_type}_clear`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("的元素全部清除")
            this.jsonInit({
                "type": `${Block_type}_clear`,
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#3d7fd6",
                "tooltip": `清空 ${Block_type} 所有元素。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_clear`] = function(block) {
        var Name = block.getFieldValue('Name');
        return Name + ".clear()";
    };

    Blockly.Blocks[`${Block_type}_empty`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`判斷 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("是否為空");
            this.jsonInit({
                "type": `${Block_type}_empty`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `若 ${Block_type} 內部為空，回傳 false，否則回傳 true。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_empty`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.empty()`, 1];
    }

    Blockly.Blocks[`${Block_type}_size`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`讀取 ${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("的元素個數");
            this.jsonInit({
                "type": `${Block_type}_size`,
                "inputsInline": true,
                "output": null,
                "colour": "#3d7fd6",
                "tooltip": `讀取 ${Block_type} 目前持有的元素個數`,
                "helpUrl": ""
            });
        }
    };

    Blockly.Blocks[`${Block_type}_max_size`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最大元素數量")
            this.jsonInit({
                "type": `${Block_type}_max_size`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": "球vector最大元素數量",
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_max_size`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.max_size()`, 1];
    }

    Blockly.Blocks[`${Block_type}_begin`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(順著走)");
            this.jsonInit({
                "type": `${Block_type}_begin`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，順著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_begin`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.begin()`, 1];
    }

    Blockly.Blocks[`${Block_type}_end`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(順著走)");
            this.jsonInit({
                "type": `${Block_type}_end`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，順著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_end`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.end()`, 1];
    }

    Blockly.Blocks[`${Block_type}_rbegin`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(逆著走)");
            this.jsonInit({
                "type": `${Block_type}_rbegin`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，逆著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_rbegin`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.rbegin()`, 1];
    }

    Blockly.Blocks[`${Block_type}_rend`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(逆著走)");
            this.jsonInit({
                "type": `${Block_type}_rend`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，逆著走且可讀可寫。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_rend`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.rend()`, 1];
    }

    Blockly.Blocks[`${Block_type}_cbegin`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("第一個元素(順著走且只能讀)");
            this.jsonInit({
                "type": `${Block_type}_cbegin`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 第一個元素，順著走且只能讀。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_cbegin`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.cbegin()`, 1];
    }

    Blockly.Blocks[`${Block_type}_cend`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("最後一個元素(順著走且只能讀)");
            this.jsonInit({
                "type": `${Block_type}_cend`,
                "colour": "#3d7fd6",
                "output": null,
                "tooltip": `回傳一個迭代器，它指向 ${Block_type} 最後一個元素，順著走且只能讀。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_cend`] = function(block) {
        var Name = block.getFieldValue('Name') || '';
        return [`${Name}.cend()`, 1];
    }
});