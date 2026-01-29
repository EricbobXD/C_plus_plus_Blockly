function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

const Cpp = Blockly.Cpp;
["Vector", "Deque"].forEach(Block_type =>{
    const color = (Block_type === "Vector")?"#3d7fd6": "#85B09A";
    Blockly.Blocks[`define_${Block_type}`] = {  
        init: function() {
            this.appendValueInput("TYPE")
                .appendField(`定義 ${Block_type} 資料型態: `);

            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");

            this.jsonInit({
                "type": `define_${Block_type}`,
                "message0": "初始化方式: %1",
                "args0": [{
                    "type": "field_dropdown",
                    "name": "contents",
                    "options": [
                        ["空", "empty"],
                        ["大小", "size"],
                        ["大小+指定元素", "size_element"],
                        ["陣列", "array"],
                        ["迭代器範圍", "iter"],
                        ["複製Vector內容", "copy"]
                    ]
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "tooltip": `創建一個 ${Block_type} 陣列，${Block_type} 是會自動擴展容量的陣列`,
                "helpUrl": ""
            }), 
            
            // 監聽積木變更
            this.setOnChange(function(e) {
                if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
            });

            this.updateInProgress_ = false; 
        },
        saveExtraState: function(){
            return {'mode': this.getFieldValue('contents')};
        },
        loadExtraState: function(state){
            this.UpdateShape_(state.mode);
        }, 
        UpdateShape_: function(mode){
            if (!mode) mode = this.getFieldValue('contents');
            const allinput = ["size", "element", "array", "start", "end"];
            allinput.forEach(name => { if (this.getInput(name))  this.removeInput(name); });

            switch (mode){
                case "size": 
                    this.appendValueInput("size").appendField("元素個數");
                    break;
                case "size_element": 
                    this.appendValueInput("size").appendField("元素個數");
                    this.appendValueInput("element").appendField("元素");
                    break;
                case "array": 
                    this.appendDummyInput("array").appendField("Vector陣列").appendField(VarDropdown(Block_type), "Name2");
                    break;
                case "iter":
                    this.appendDummyInput("array").appendField("Vector陣列").appendField(VarDropdown(Block_type), "Name2");
                    this.appendValueInput("start").appendField("開始位置");
                    this.appendValueInput("end").appendField("結束位置");
                    break;
                default:
                    break;
            }
        }
    };
        
    Cpp.forBlock[`define_${Block_type}`] = function(block) {
        var type = Cpp.valueToCode(block, 'TYPE', 1);
        var Name = block.getFieldValue('Name');
        var contents = block.getFieldValue('contents');
        var code = `vector<${type}>${Name}`;

        switch (contents){
            case "size": 
                if (!this.getInput("size")) break;
                var size = Cpp.valueToCode(block, "size", 1);
                code += `(${size})`;
                break;
            case "size_element": 
                if (!this.getInput("size") || !this.getInput("element")) break;
                var size = Cpp.valueToCode(block, "size", 1);
                var element = Cpp.valueToCode(block, "element", 1);
                code += `(${size}, ${element})`;
                break;
            case "array": 
                var Name2 = block.getFieldValue('Name2');
                code += `(${Name2})`;
                break;
            case "iter":
                if (!this.getInput("start") || !this.getInput("end")) break;
                var Name2 = block.getFieldValue('Name2');
                var start = Cpp.valueToCode(block, "start", 1);
                var end = Cpp.valueToCode(block, "end", 1);
                code += `(${Name2}.begin${(start === 0)?'':`+${start}`}, ${Name2}.end${(end === 0)?'':`+${end}`}`;
                break;
            default: 
                break;
        }

        code += ';\n';
        return code;
    };

    Blockly.Blocks[`${Block_type}_push_back`] = {
        init:function(){
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": `${Block_type}_push_back`,
                "message0": "在 新增 %1 在最尾端(只能輸入單個)",
                "args0": [{
                    "type": "input_value",
                    "name": "value",
                    "check": ["String", "Number", "Char"]
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "tooltip": `新增元素至 ${Block_type} 的最尾端，必要時會進行記憶體組態。`,
                "helpUrl": ""
            });

            if (this.UpdateShape_) this.UpdateShape_();
        }, 
    }

    Cpp.forBlock[`${Block_type}_push_back`] = function(block) {
        var Name = block.getFieldValue('Name');
        var value = Cpp.valueToCode(block, 'value', 1) || '';
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return Name + ".push_back(" + value + ");\n";
    };

    Blockly.Blocks[`${Block_type}_emplace_back`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": `${Block_type}_emplace_back`,
                "message0": "新增 %1 在最尾端(可輸入多個 , 用空白分開)",
                "args0": [{
                    "type": "field_input",
                    "name": "number",
                    "text": ""
                }],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "tooltip": `新增物件至 ${Block_type} 的最尾端，必要時會進行記憶體組態。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_emplace_back`] = function(block) {
        var name = block.getFieldValue('Name');
        var value = block.getFieldValue('value');
        return name + ".emplace_back(" + value + ");\n";
    };

    Blockly.Blocks[`${Block_type}_append_range`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": `${Block_type}_append_range`,
                "message0": "加陣列 %1 到最尾端 (append)",
                "args0": [{
                        "type": "input_value",
                        "name": "element"
                    }],
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `把陣列推到 ${Block_type} 最尾端`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_append_range`] = function(block) {
        var Name = block.getFieldValue('Name');
        var element = Cpp.valueToCode(block, 'element', 1) || '';
        if (element.startsWith('(') && element.endsWith(')')) {
            element = element.slice(1, -1);
        }
        return Name + ".append_range(" + element + ");\n";
    };

    Blockly.Blocks[`${Block_type}_pop_back`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");

            this.appendDummyInput()
                .appendField("刪除最後一個");
            this.jsonInit({
                "type": `${Block_type}_pop_back`,
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "tooltip": `刪除 ${Block_type} 最尾端的元素。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_pop_back`] = function(block) {
        var Name = block.getFieldValue('Name');
        return Name + ".pop_back();\n";
    };

    Blockly.Blocks[`${Block_type}_insert`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
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
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `插入一個或多個元素至 ${Block_type} 內的任意位置。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_insert`] = function(block) {
        var Name = block.getFieldValue('Name');
        var pos = Cpp.valueToCode(block, 'pos', 1) | 0;
        var value = Cpp.valueToCode(block, 'value', 1);
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        if (pos === 0) {
            return `${Name}.insert(${Name}.begin(), ${value});\n`
        }   
        return `${Name}.insert(${Name}.begin()+${pos}, ${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_insert_range`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": `${Block_type}_insert_range`,
                "message0": "在位置: %1 加陣列 %2 (insert)",
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
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": `在 ${Block_type} 把陣列加到特定位置`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_insert_range`] = function(block) {
        var Name = block.getFieldValue('Name');
        var pos = Cpp.valueToCode(block, 'pos', 1) | '0';
        var array = Cpp.valueToCode(block, 'array', 1);
        if (array.startsWith('(') && value.endsWith(')')) {
            array = array.slice(1, -1);
        }
        if (pos === 0) {
            return `${Name}.insert_range(${Name}.begin(), ${value});\n`
        }   
        return `${Name}.insert_range(${Name}.begin()+${pos}, ${value});\n`;
    }

    Blockly.Blocks[`${Block_type}_erase`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
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
                "colour": color,
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
        var Name = block.getFieldValue('Name');
        var pos = Cpp.valueToCode(block, 'pos', 1);
        var value = Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        if (pos === '0') {
                return `${Name}.erase(${Name}.begin(), ${value});\n`;
        } else {
            if (pos.startsWith('(') && pos.endsWith(')')) {
                pos = pos.slice(1, -1);
            }
        }
        return `${Name}.erase(${Name}.begin()+${pos}, ${value});\n`;
    }    

    Blockly.Blocks[`${Block_type}_assign`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": "vector_assign",
                    "message0": "清空並插入 1. 重複次數: %1, 2. 陣列: %2, 3. 迭代器: %3",
                "args0": [
                    {
                        "type": "field_checkbox",
                        "name": "count",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "array",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "it",
                        "checked": false
                    }
                ],
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpurl": "",
                "inputsInline": false  // 確保預設排列方式為換行
            });

            // 監聽積木變更
            this.setOnChange(function(event) {
                const block = this;
                if (!block) return;
                
                var countChecked  = block.getFieldValue("count") === "TRUE";
                var arrayChecked = block.getFieldValue("array") === "TRUE";
                var itChecked    = block.getFieldValue("it") === "TRUE";

                if (countChecked && itChecked){
                    alert("次數跟迭代器不能一起使用喔😘");
                }

                if (arrayChecked && countChecked){
                    alert("陣列不能跟次數不能一起使用喔😘");
                }

                if (arrayChecked && itChecked){
                    alert("陣列不能跟迭代器不能一起使用喔😘");
                }
                // 確保 inputsInline 為 false，讓輸入項目換行排列
                block.setInputsInline(false);

                // 動態新增 / 移除 count 輸入
                if (countChecked && !block.getInput("count_num")) {
                    block.appendValueInput('count_num')
                        .setCheck("Number")
                        .appendField('重複次數')
                        .setAlign(Blockly.ALIGN_LEFT);
                    block.appendValueInput('str')
                        .setCheck("String")
                        .appendField("重複字串")
                        .setAlign(Blockly.ALIGN_LEFT);
                } else if (!countChecked && block.getInput("count_num")) {
                    block.removeInput("count_num", true);
                    block.removeInput("str", true);
                }

                // 動態新增 / 移除 array 輸入
                if (arrayChecked && !block.getInput("array_name")) {
                    block.appendValueInput("array_name")
                        .setCheck("Array")
                        .appendField('陣列')
                        .setAlign(Blockly.ALIGN_LEFT);
                } else if (!arrayChecked && block.getInput("array_name")) {
                    block.removeInput("array_name", true);
                }

                // 動態新增 / 移除 iterator 輸入
                if (itChecked && !block.getInput("iterator_name")) {
                    block.appendDummyInput("iterator_name")
                        .appendField("輸入名稱: ")
                        .appendField(new Blockly.FieldTextInput('array2_name'), "array2_name");

                    block.appendValueInput("begin")
                        .setCheck("Number")
                        .appendField("迭代器 開始: ")
                        .setAlign(Blockly.ALIGN_LEFT);
            
                    block.appendValueInput("end")
                        .setCheck("Number")
                        .appendField("結束: ")
                        .setAlign(Blockly.ALIGN_LEFT);
                } else if (!itChecked && block.getInput("iterator_name")) {
                    block.removeInput("iterator_name", true);
                    block.removeInput("begin", true);
                    block.removeInput("end", true);
                }
            });
        },

        // 儲存積木狀態
        mutationToDom: function() {
            var container = document.createElement('mutation');
            container.setAttribute('count', this.getFieldValue('count'));
            container.setAttribute('array', this.getFieldValue('array'));
            container.setAttribute('it', this.getFieldValue('it'));
        return container;
        },

        // 讀取積木狀態
        domToMutation: function(xmlElement) {
            this.setFieldValue(xmlElement.getAttribute('count'), 'count');
            this.setFieldValue(xmlElement.getAttribute('array'), 'array');
            this.setFieldValue(xmlElement.getAttribute('it'), 'it');

            const countChecked  = xmlElement.getAttribute('count') === "TRUE";
            const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
            const itChecked    = xmlElement.getAttribute('it') === "TRUE";

            // 確保 inputsInline 為 false，避免縮成一行
            this.setInputsInline(false);

            if (countChecked && !this.getInput("count_num")) {
            this.appendValueInput('count_num')
                .setCheck("Number")
                .appendField('大小')
                .setAlign(Blockly.ALIGN_LEFT);
            this.appendValueInput('str')
                .setCheck("String")
                .appendField("重複字串")
                .setAlign(Blockly.ALIGN_LEFT);
            }

            if (arrayChecked && !this.getInput("array_name")) {
            this.appendValueInput("array_name")
                .setCheck("Array")
                .appendField('陣列')
                .setAlign(Blockly.ALIGN_LEFT);
            }

            if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入陣列名稱: ")
                .appendField(new Blockly.FieldTextInput('array2_name'), "array2_name");

            this.appendValueInput("begin")
                .setCheck("Number")
                .appendField("迭代器 開始: ")
                .setAlign(Blockly.ALIGN_LEFT);

            this.appendValueInput("end")
                .setCheck("Number")
                .appendField("結束: ")
                .setAlign(Blockly.ALIGN_LEFT);
            }
        }
    };

    Cpp.forBlock[`${Block_type}_assign`] = function(block){
        var Name = block.getFieldValue('Name');
        var count = block.getFieldValue('count') === 'TRUE';
        var array = block.getFieldValue('array') === 'TRUE';
        var it = block.getFieldValue('it') === 'TRUE';
        var code = `${Name}.assign(`;
        
        if (count){
            var count_num = Cpp.valueToCode(block, 'count_num', 1);
            var str = Cpp.valueToCode(block, 'str', 1);
            if (count_num.startsWith('(') && count_num.endsWith(')')) {
                count_num = count_num.slice(1, -1);
            }   
            if (str.startsWith('(') && str.endsWith(')')) {
                str = str.slice(1, -1);
            }   
            code += `${str}, ${count_num}`;
        }
        if (array){
            var array_content = Cpp.valueToCode(block, 'array_name', 1);
            if (array_content.startsWith('(') && array_content.endsWith(')')) {
                array_content = array_content.slice(1, -1);
            }   
            code += `${array_content}`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', 1);
            var end = Cpp.valueToCode(block, 'end', 1);
            if (begin.startsWith('(') && begin.endsWith(')')) {
                begin = begin.slice(1, -1);
            }   
            if (end.startsWith('(') && end.endsWith(')')) {
                end = end.slice(1, -1);
            }   
            if (begin === '0'){
                begin = '';
            }
            else{
                begin = '+' + begin;
            }
            code += `${array2_name}.begin()${begin}, ${array2_name}.end()+${end}`;
        }
        code += ');';
        return code;
    }

    Blockly.Blocks[`${Block_type}_operate[]`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": `${Block_type}_operate[]`,
                "message0": "讀取第 %1 個元素",
                "args0": [{
                    "type": "input_value",
                    "name": "pos"
                }],
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "inputsInline": true,
                "output": null,
                "tooltip": `讀取 ${Block_type} 索引值。`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_operate[]`] = function(block){
        var Name = block.getFieldValue('Name');
        var pos = Cpp.valueToCode(block, 'pos', 1);
        if (pos.startsWith('(') && pos.endsWith(')')) {
            pos = pos.slice(1, -1);
        }
        var code = `${Name}[${pos}]`;
        return [code, 1];
    };

    Blockly.Blocks[`${Block_type}_front`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField(`${Block_type}名稱: `)
                .appendField(VarDropdown(Block_type), "Name")
                .appendField("讀取第一個元素");
            this.jsonInit({
                "type": `${Block_type}_front`,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
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
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");

            this.appendDummyInput()
                .appendField("讀取最後一個元素");
            this.jsonInit({
                "type": `${Block_type}_back`,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
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

    Blockly.Blocks[`${Block_type}_resize`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");

            this.appendDummyInput()
                .appendField("可容納元素個數")
            this.jsonInit({
                "type": `${Block_type}_resize`,
                "inputsInline": true,
                "output": null,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "tooltip": `改變 ${Block_type} 可容納元素個數。`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_resize`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.resize()`, 1];
    }


    Blockly.Blocks[`${Block_type}_capacity`] = {  
        init: function() {
            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");

            this.appendDummyInput()
                .appendField("內存容量");
            this.jsonInit({
                "type": `${Block_type}_capacity`,
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `${Block_type} 內存容量`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_capacity`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.capacity()`, 1];
    }

    Blockly.Blocks[`${Block_type}_reserve`] = {  
        init: function() {
            this.appendDummyInput()
                .appendField("改變");

            this.Block_type = "Vector";
            this.appendDummyInput("Name_Input");
            this.jsonInit({
                "type": "vector_reserve",
                "message0": "容量 >= %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "size"
                    }
                ],
                "colour": color,
                "extensions": ["dynamic_dropdown"],
                "output": null,
                "tooltip": `強制讓 ${Block_type} 容量 >= n`,
                "helpUrl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_reserve`] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.reserve()`, 1];
    }   
});

Blockly.Blocks['Deque_push_front'] = {
    init:function(){
        this.appendDummyInput("DeqName");
        this.jsonInit({
            "type": 'Deque_push_front',
            "message0": "新增 %1 在最前端(只能輸入單個)",
            "args0": [{
                "type": "input_value",
                "name": "number",
                "check": ["String", "Number", "Char"]
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#85B09A",
            "tooltip": `新增元素至 ${Block_type} 的最前端，必要時會進行記憶體組態。`,
            "helpUrl": ""
        });
    }
}

Cpp.forBlock['Deque_push_front'] = function(block) {
    var Name = block.getFieldValue('Name');
    var value = Cpp.valueToCode(block, 'value', 1) || '';
    if (value.startsWith('(') && value.endsWith(')')) {
        value = value.slice(1, -1);
    }
    return Name + ".push_front(" + value + ");\n";
};

Blockly.Blocks['Deque_emplace_front'] = {  
    init: function() {
        this.appendDummyInput("DeqName");
        this.jsonInit({
            "type": 'Deque_emplace_front',
            "message0": "新增 %1 在最前端(可輸入多個 , 用空白分開)",
            "args0": [{
                "type": "field_input",
                "name": "number",
                "text": ""
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#85B09A",
            "tooltip": `新增物件至 ${Block_type} 的最前端，必要時會進行記憶體組態。`,
            "helpUrl": ""
        });
    }
};

Cpp.forBlock['Deque_emplace_front'] = function(block) {
    var name = block.getFieldValue('Name');
    var value = block.getFieldValue('value');
    return code = name + ".emplace_front(" + value + ");\n";
};

Blockly.Blocks['Deque_prepend_range'] = {  
    init: function() {
        this.appendDummyInput("DeqName");
        this.jsonInit({
            "type": `${Block_type}_prepend_range`,
            "message0": "加陣列 %1 到最前端 (append)",
            "args0": [{
                    "type": "input_value",
                    "name": "element"
                }],
            "colour": "#85B09A",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": `把陣列推到${Block_type}最前端`,
            "helpurl": ""
        });
    }
};

Cpp.forBlock['Deque_prepend_range'] = function(block) {
    var Name = block.getFieldValue('Name');
    var element = Cpp.valueToCode(block, 'element', 1) || '';
    if (element.startsWith('(') && element.endsWith(')')) {
        element = element.slice(1, -1);
    }
    return Name + ".prepend_range(" + element + ");\n";
};