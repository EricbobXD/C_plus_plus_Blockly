const Cpp = Blockly.Cpp;
Blockly.Blocks['main_block'] = {
    init: function() {
        this.jsonInit({
            "type": "main_block",
            "message0": "#include <bits/stdc++.h>",
            "message1": "using namespace std",
            "message2": "%1", 
            "args2": [
                {
                    "type": "input_statement",
                    "name": "DEFINES"
                }
            ],
            "message3": "int main() {",
            "message4": "    %1",
            "args4": [
                {
                    "type": "input_statement",
                    "name": "DO"
                }
            ],
            "message5": "    return 0;",
            "message6": "}",
            "colour": "#24B324",
            "inputsInline": false,
            "tooltip": "C++ 主函式結構",
            "helpUrl": "",
            "movable": true,
            "deletable": false
        });

        // 限制 "DEFINES"
        this.setOnChange(function(event) {
            if (!this.workspace) return; // 防止 Blockly 初始化時觸發錯誤

            let allowedBlocks = ["define_block", "typedef_block", "define_function", "define_function_void", "define_operator", "define_array", "define_vector", "define_set", "define_map", "define_pair", "define_stack", "define_queue", "define_deque", "define_priority_queue", "define_bitset", "define_struct", "define_class", "define_variable", "define_pointer", "define_reference", "comment_block", "define_template", "define_using", "define_namespace"];
            let connection = this.getInputTargetBlock("DEFINES");

            while (connection) {
                if (!allowedBlocks.includes(connection.type)) {
                    // 不是允許的積木類型，將其自動斷開
                    connection.unplug();
                    alert(`檢測到非法方塊組合，已阻止連接。\n被攔截方塊 ID： ${connection.type}\n僅接受方塊 ID： define_block, typedef_block`);
                }
                connection = connection.getNextBlock();
            }
        });
    }
};
    Cpp.forBlock['main_block'] = function(block) {
        var define_code = Cpp.statementToCode(block, 'DEFINES');
        var statements_body = Cpp.statementToCode(block, 'DO');

        define_code = define_code.replace(/^  /gm, '');
        statements_body = statements_body.replace(/^ {2}/gm, '    ');

        return `#include <bits/stdc++.h>\nusing namespace std;\n${define_code}\nint main() {\n${statements_body}\n    return 0;\n}`;
    };

Blockly.Blocks['define_set'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_set",
            "message0": "定義set資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "Name"
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
            "colour": "#DAA520",
            "previousStatement": null,
            "inputsInline": true,
            "nextStatement": null,
            "tooltip": "創建一個 set 陣列，set 是會自動擴展容量的陣列",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                .appendField("輸入陣列名稱: ")
                .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
            } else if (!arrayChecked && block.getInput("array")) {
                block.removeInput("array", true);
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
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (arrayChecked && !this.getInput("array_name")) {
            this.appendDummyInput("array_name")
            .appendField("輸入陣列名稱: ")
            .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
        }

        if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入名稱: ")
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
    Cpp.forBlock['define_set'] = function(block) {
        var type = Cpp.valueToCode(block, 'TYPE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var Name = block.getFieldValue('Name');
        var code = `set<${type}>${Name}`;

        var array = block.getFieldValue('array') === "TRUE";
        var it = block.getFieldValue('it') === "TRUE";

        if (array){
            var array_name = block.getFieldValue('array_name');
            if (array_name.startsWith('(') && array_name.endsWith(')')) {
                array_name = array_name.slice(1, -1);
            }
            code += `(${array_name})`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
        }
        code += ';';
        return code;
    };
Blockly.Blocks['define_unordered_set'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_unordered_set",
            "message0": "定義unordered_set資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "Name"
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
            "colour": "#FFD700",
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "tooltip": "創建一個 unordered_set 陣列，unordered_set 是會自動擴展容量的陣列",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                .appendField("輸入陣列名稱: ")
                .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
            } else if (!arrayChecked && block.getInput("array")) {
                block.removeInput("array", true);
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
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (arrayChecked && !this.getInput("array_name")) {
            this.appendDummyInput("array_name")
            .appendField("輸入陣列名稱: ")
            .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
        }

        if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入名稱: ")
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
    Cpp.forBlock['define_unordered_set'] = function(block) {
        var type = Cpp.valueToCode(block, 'TYPE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var unordered_Name = block.getFieldValue('unordered_Name');
        var code = `unordered_set<${type}>${unordered_Name}`;

        var array = block.getFieldValue('array') === "TRUE";
        var it = block.getFieldValue('it') === "TRUE";

        if (array){
            var array_name = block.getFieldValue('array_name');
            if (array_name.startsWith('(') && array_name.endsWith(')')) {
                array_name = array_name.slice(1, -1);
            }
            code += `(${array_name})`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
        }
        code += ';';
        return code;
    };
Blockly.Blocks['define_multiset'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_multiset",
            "message0": "定義multiset資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "Name"
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
            "colour": "#FACA16",
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "tooltip": "創建一個 multiset 陣列，multiset 是會自動擴展容量的陣列",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                .appendField("輸入陣列名稱: ")
                .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
            } else if (!arrayChecked && block.getInput("array")) {
                block.removeInput("array", true);
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
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (arrayChecked && !this.getInput("array_name")) {
            this.appendDummyInput("array_name")
            .appendField("輸入陣列名稱: ")
            .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
        }

        if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入名稱: ")
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
    Cpp.forBlock['define_multiset'] = function(block) {
        var type = Cpp.valueToCode(block, 'TYPE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var multiName = block.getFieldValue('multiName');
        var code = `multiset<${type}>${multiName}`;

        var array = block.getFieldValue('array') === "TRUE";
        var it = block.getFieldValue('it') === "TRUE";

        if (array){
            var array_name = block.getFieldValue('array_name');
            if (array_name.startsWith('(') && array_name.endsWith(')')) {
                array_name = array_name.slice(1, -1);
            }
            code += `(${array_name})`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
        }
        code += ';';
        return code;
                        };
Blockly.Blocks['define_flat_set'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_flat_set",
            "message0": "定義flat_set資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "Name"
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
            "colour": "#F8DE7E",
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "tooltip": "創建一個 flat_set 陣列，flat_set 是會自動擴展容量的陣列",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                .appendField("輸入陣列名稱: ")
                .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
            } else if (!arrayChecked && block.getInput("array")) {
                block.removeInput("array", true);
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
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (arrayChecked && !this.getInput("array_name")) {
            this.appendDummyInput("array_name")
            .appendField("輸入陣列名稱: ")
            .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
        }

        if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入名稱: ")
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
    Cpp.forBlock['define_flat_set'] = function(block) {
        var type = Cpp.valueToCode(block, 'TYPE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var flat_Name = block.getFieldValue('flat_Name');
        var code = `flat_set<${type}>${flat_Name}`;

        var array = block.getFieldValue('array') === "TRUE";
        var it = block.getFieldValue('it') === "TRUE";

        if (array){
            var array_name = block.getFieldValue('array_name');
            if (array_name.startsWith('(') && array_name.endsWith(')')) {
                array_name = array_name.slice(1, -1);
            }
            code += `(${array_name})`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
        }
        code += ';';
        return code;
    };


function defineCommonBehavior(event) {
    const block = this;
    if (!block.workspace) return;

    const arrayChecked = block.getFieldValue("array") === "TRUE";
    const itChecked = block.getFieldValue("it") === "TRUE";

    if (arrayChecked && itChecked) {
        alert("陣列不能跟迭代器不能一起使用喔😘");
    }

    block.setInputsInline(false);

    if (arrayChecked && !block.getInput("array_name")) {
        block.appendDummyInput("array_name")
        .appendField("輸入陣列名稱: ")
        .appendField(new Blockly.FieldTextInput("array_name"), "array_name");
    } else if (!arrayChecked && block.getInput("array_name")) {
        block.removeInput("array_name", true);
    }

    if (itChecked && !block.getInput("iterator_name")) {
        block.appendDummyInput("iterator_name")
        .appendField("輸入名稱: ")
        .appendField(new Blockly.FieldTextInput("array2_name"), "array2_name");

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
}

function defineMutationToDom() {
    const container = document.createElement("mutation");
    container.setAttribute("array", this.getFieldValue("array"));
    container.setAttribute("it", this.getFieldValue("it"));
    return container;
}

function defineDomToMutation(xmlElement) {
    this.setFieldValue(xmlElement.getAttribute("array"), "array");
    this.setFieldValue(xmlElement.getAttribute("it"), "it");

    const arrayChecked = xmlElement.getAttribute("array") === "TRUE";
    const itChecked = xmlElement.getAttribute("it") === "TRUE";


    if (arrayChecked && !this.getInput("array_name")) {
        this.appendDummyInput("array_name")
        .appendField("輸入陣列名稱: ")
        .appendField(new Blockly.FieldTextInput("array_name"), "array_name");
    }

    if (itChecked && !this.getInput("iterator_name")) {
        this.appendDummyInput("iterator_name")
        .appendField("輸入名稱: ")
        .appendField(new Blockly.FieldTextInput("array2_name"), "array2_name");

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
                        
Blockly.Blocks['define_map'] = {
    init: function () {
        this.jsonInit({
        "type": "define_map",
        "message0": "定義map資料型態 <%1, %2>, 陣列名稱 %3, 陣列內容 %4, 迭代器: %5",
        "args0": [
            { "type": "input_value", "name": "TYPE1" },
            { "type": "input_value", "name": "TYPE2" },
            { "type": "field_input", "name": "map_name", "check": "String" },
            { "type": "field_checkbox", "name": "array", "checked": false },
            { "type": "field_checkbox", "name": "it", "checked": false }
        ],
        "inputsInline": false,
        "colour": "#20b2aa",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
        });
        this.setOnChange(defineCommonBehavior);
    },
    mutationToDom: defineMutationToDom,
    domToMutation: defineDomToMutation
};

    Cpp.forBlock['define_map'] = function(block) {
        var type1 = Cpp.valueToCode(block, 'TYPE1', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var type2 = Cpp.valueToCode(block, 'TYPE2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var map_name = block.getFieldValue('map_name');
        var code = `map<${type1}, ${type2}>${map_name}`;

        if (type1.startsWith('(') && type1.endsWith(')')) {
                type1 = type1.slice(1, -1);
        }
        if (type2.startsWith('(') && type2.endsWith(')')) {
                type2 = type2.slice(1, -1);
        }
        var array = block.getFieldValue('array') === "TRUE";
        var it = block.getFieldValue('it') === "TRUE";
        
        if (array){
            var array_name = block.getFieldValue('array_name');
            if (array_name.startsWith('(') && array_name.endsWith(')')) {
                array_name = array_name.slice(1, -1);
            }
            code += `(${array_name})`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
        }
        code += ';';
        return code;
    };

Blockly.Blocks['define_unordered_map'] = {
    init: function () {
        this.jsonInit({
        "type": "define_unordered_map",
        "message0": "定義unordered_map資料型態 <%1, %2>, 陣列名稱 %3, 陣列內容 %4, 迭代器: %5",
        "args0": [
            { "type": "input_value", "name": "TYPE1" },
            { "type": "input_value", "name": "TYPE2" },
            { "type": "field_input", "name": "unordered_map_name", "check": "String" },
            { "type": "field_checkbox", "name": "array", "checked": false },
            { "type": "field_checkbox", "name": "it", "checked": false }
        ],
        "inputsInline": false,
        "colour": "#1282A2",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
        });
        this.setOnChange(defineCommonBehavior);
    },
    mutationToDom: defineMutationToDom,
    domToMutation: defineDomToMutation
};       

    Cpp.forBlock['define_unordered_map'] = function(block) {
                var type1 = Cpp.valueToCode(block, 'TYPE1', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                var type2 = Cpp.valueToCode(block, 'TYPE2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                var unordered_map_name = block.getFieldValue('unordered_map_name');
                var code = `unordered_map<${type1}, ${type2}>${unordered_map_name}`;
    
                var array = block.getFieldValue('array') === "TRUE";
                var it = block.getFieldValue('it') === "TRUE";
    
                if (array){
                    var array_name = block.getFieldValue('array_name');
                    if (array_name.startsWith('(') && array_name.endsWith(')')) {
                        array_name = array_name.slice(1, -1);
                    }
                    code += `(${array_name})`;
                }
    
                if (it){
                    var array2_name = block.getFieldValue('array2_name');
                    var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                    var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
                    code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
                }
                code += ';';
                return code;
            };

Blockly.Blocks['define_pair'] = {
    init: function () {
        this.jsonInit({
        "type": "define_pair",
        "message0": "定義pair資料型態 <%1, %2>, 陣列名稱 %3, 陣列內容 %4, 迭代器: %5",
        "args0": [
            { "type": "input_value", "name": "TYPE1" },
            { "type": "input_value", "name": "TYPE2" },
            { "type": "field_input", "name": "pair_name", "check": "String" },
            { "type": "field_checkbox", "name": "array", "checked": false },
            { "type": "field_checkbox", "name": "it", "checked": false }
        ],
        "inputsInline": false,
        "colour": "#49a34b",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": ""
    });
    this.setOnChange(defineCommonBehavior);
    },
    mutationToDom: defineMutationToDom,
    domToMutation: defineDomToMutation
};
                
Cpp.forBlock['define_pair'] = function(block) {
    var type1 = Cpp.valueToCode(block, 'TYPE1', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var type2 = Cpp.valueToCode(block, 'TYPE2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
    var pair_name = block.getFieldValue('pair_name');
    var code = `pair<${type1}, ${type2}>${pair_name}`;

    var array = block.getFieldValue('array') === "TRUE";
    var it = block.getFieldValue('it') === "TRUE";

    if (array){
        var array_name = block.getFieldValue('array');
        if (array_name.startsWith('(') && array_name.endsWith(')')) {
            array_name = array_name.slice(1, -1);
        }
        code += `(${array_name})`;
    }

    if (it){
        var array2_name = block.getFieldValue('array2_name');
        var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
    }
    code += ';';
    return code;
};



Blockly.Blocks['deque_assign'] = {  
    init: function() {
        this.jsonInit({
            "type": "deque_assign",
            "message0": "deque 名稱: %1清空並插入 1. 重複次數: %2, 2. 陣列: %3, 3. 迭代器: %4",
            "args0": [{
                  "type": "field_input",
                  "name": "deque_name"
            },
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
            }],
            "colour": "#85B09A",
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
    Cpp.forBlock['deque_assign'] = function(block){
        var deque_name = block.getFieldValue('deque_name');
        var count = block.getFieldValue('count') === 'TRUE';
        var array = block.getFieldValue('array') === 'TRUE';
        var it = block.getFieldValue('it') === 'TRUE';
        var code = `${deque_name}.assign(`;
        
        if (count){
            var count_num = Cpp.valueToCode(block, 'count_num', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var str = Cpp.valueToCode(block, 'str', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (count_num.startsWith('(') && count_num.endsWith(')')) {
                count_num = count_num.slice(1, -1);
            }   
            if (str.startsWith('(') && str.endsWith(')')) {
                str = str.slice(1, -1);
            }   
            code += `${str}, ${count_num}`;
        }
        if (array){
            var array_content = Cpp.valueToCode(block, 'array_name', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (array_content.startsWith('(') && array_content.endsWith(')')) {
                array_content = array_content.slice(1, -1);
            }   
            code += `${array_content}`;
        }

        if (it){
            var array2_name = block.getFieldValue('array2_name');
            var begin = Cpp.valueToCode(block, 'begin', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
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

Blockly.Blocks['new_block'] = {  
    init: function() {
        this.jsonInit({
            "type": "new_block",
            "message0": "動態配置記憶體(new) 資料型態%1, 1. 指定值%2, 2.指定陣列%3",
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
                },
                {
                    "type": "field_checkbox",
                    "name": "value",
                    "checked": false
                },
                {
                    "type": "field_checkbox",
                    "name": "array",
                    "checked": false
                }
            ],
            "colour": "#DABD00",
            "output": null,
            "tooltip": "",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;
            
            var valueChecked  = block.getFieldValue("value") === "TRUE";
            var arrayChecked  = block.getFieldValue("array") === "TRUE";

            if (valueChecked && arrayChecked){
                alert("指定值跟指定陣列內容不能一起使用喔😘");
            }

            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 value 輸入
            if (valueChecked && !block.getInput("val")) {
                block.appendValueInput('val')
                    .setCheck("Number")
                    .appendField('指定值')
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!valueChecked && block.getInput("val")) {
                block.removeInput("val", true);
            }

            // 動態新增 / 移除 iterator 輸入
            if (arrayChecked && !block.getInput("array_content")) {
                block.appendValueInput("sizes2")
                    .setCheck("Number")
                    .appendField('陣列大小')
                    .setAlign(Blockly.ALIGN_LEFT);
                block.appendValueInput("array_content")
                    .setCheck("Array")
                    .appendField('陣列內容')
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!arrayChecked && block.getInput("array_content")) {
                block.removeInput("array_content", true);
                block.removeInput("sizes2", true);
            }
        });
    },

    // 儲存積木狀態
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('value', this.getFieldValue('value'));
        container.setAttribute('array', this.getFieldValue('array'));
    return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('value'), 'value');
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');

        const valueChecked  = xmlElement.getAttribute('value') === "TRUE";
        const arrayChecked    = xmlElement.getAttribute('array') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (valueChecked && !this.getInput("val")) {
            this.appendValueInput('val')
                .setCheck("Number")
                .appendField('指定值')
                .setAlign(Blockly.ALIGN_LEFT);
        }

        if (arrayChecked && !this.getInput("array_content")) {
            this.appendValueInput("sizes2")
                .setCheck("Number")
                .appendField('陣列大小')
                .setAlign(Blockly.ALIGN_LEFT);
            this.appendValueInput("array_content")
                .setCheck("Array")
                .appendField('陣列內容')
                .setAlign(Blockly.ALIGN_LEFT);
        }
    }
};  

    Cpp.forBlock['new_block'] = function(block){
        var type = block.getFieldValue('TYPE');
        var value = block.getFieldValue('value') === 'TRUE';
        var array = block.getFieldValue('array') === 'TRUE';
        var code = `new ${type}`;
        if (value){
            var val = Cpp.valueToCode(block, 'val', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (val.startsWith('(') && val.endsWith(')')){
                val = val.slice(1, -1);
            }
            code += `(${val})`;
        }else if (array){
            var sizes = Cpp.valueToCode(block, 'sizes2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var content = Cpp.valueToCode(block, 'array_content', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (sizes.startsWith('(') && sizes.endsWith(')')){
                sizes = sizes.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')){
                content = content.slice(1, -1);
            }
            code += `[${sizes}](${content})`;
        }
        return [code, 1];
    }
    
/*
Blockly.Blocks['if_block'] = {
    init: function() {
        this.setPreviousStatement(true);
        this.appendValueInput("IF_VALUE")
            .setCheck("Boolean")
            .appendField("如果");
        this.appendStatementInput('IF_DO')
            .setCheck(null)
            .appendField("執行");
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['elif_mutator', 'else_mutator'], this));
        this.setColour("#00abea");
        this.setTooltip("If 判斷式");
        this.setHelpUrl("");
        this.elifCount_ = 0;
        this.hasElse_ = false;
    },

    saveConnections: function(containerBlock) {
        let clauseBlock = containerBlock.nextConnection.targetBlock();
        let i = 0;
        while (clauseBlock) {
            if (clauseBlock.type === 'elif_mutator') {
                const valueInput = this.getInput('ELIF' + i);
                const stmtInput = this.getInput('ELIF_DO' + i);
                clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
                clauseBlock.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
                i++;
            } else if (clauseBlock.type === 'else_mutator') {
                const elseInput = this.getInput('ELSE');
                clauseBlock.statementConnection_ = elseInput && elseInput.connection.targetConnection;
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },

    mutationToDom: function() {
        if (!this.elifCount_ && !this.hasElse_) {
            return null;
        }
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('elifCount', this.elifCount_);
        container.setAttribute('hasElse', this.hasElse_);
        return container;
    },

    domToMutation: function(xmlElement) {
        this.elifCount_ = parseInt(xmlElement.getAttribute('elifCount'), 10) || 0;
        this.hasElse_ = xmlElement.getAttribute('hasElse') === 'true';
        this.updateShape_();
    },

    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('if_mutator');
        containerBlock.initSvg();
        let connection = containerBlock.nextConnection;

        for (let i = 0; i < this.elifCount_; i++) {
            const elifBlock = workspace.newBlock('elif_mutator');
            elifBlock.initSvg();
            connection.connect(elifBlock.previousConnection);
            connection = elifBlock.nextConnection;
        }

        if (this.hasElse_) {
            const elseBlock = workspace.newBlock('else_mutator');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }

        return containerBlock;
    },

    compose: function(containerBlock) {
        let clauseBlock = containerBlock.nextConnection.targetBlock();
        let elifCount = 0;
        let hasElse = false;
        const elifConnections = [];
        const elifStatementConnections = [];
        let elseStatementConnection = null;

        while (clauseBlock) {
            if (clauseBlock.type === 'elif_mutator') {
                elifConnections[elifCount] = clauseBlock.valueConnection_;
                elifStatementConnections[elifCount] = clauseBlock.statementConnection_;
                elifCount++;
            } else if (clauseBlock.type === 'else_mutator') {
                hasElse = true;
                elseStatementConnection = clauseBlock.statementConnection_;
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }

        this.elifCount_ = elifCount;
        this.hasElse_ = hasElse;
        this.updateShape_();

        for (let i = 0; i < this.elifCount_; i++) {
            Blockly.Mutator.reconnect(elifConnections[i], this, 'ELIF' + i);
            Blockly.Mutator.reconnect(elifStatementConnections[i], this, 'ELIF_DO' + i);
        }

        if (this.hasElse_) {
            Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
        }
    },

    updateShape_: function() {
        // 移除現有的 elif 和 else 輸入
        for (let i = 0; this.getInput('ELIF' + i); i++) {
            this.removeInput('ELIF' + i);
            this.removeInput('ELIF_DO' + i);
        }
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }

        // 重新添加所需的輸入
        for (let i = 0; i < this.elifCount_; i++) {
            this.appendValueInput('ELIF' + i)
                .setCheck('Boolean')
                .appendField('否則如果');
            this.appendStatementInput('ELIF_DO' + i)
                .setCheck(null)
                .appendField('執行');
        }

        if (this.hasElse_) {
            this.appendStatementInput('ELSE')
                .setCheck(null)
                .appendField('否則執行');
        }
    }
};
Blockly.Blocks['if_else'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("如果");
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField("則執行");
        this.appendStatementInput("ELSE")
            .setCheck(null)
            .appendField("否則執行");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#00abea");
        this.setTooltip("如果...否則...");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['if_mutator'] = {
    init: function() {
        this.setColour("#00abea");
        this.appendDummyInput()
            .appendField('如果');
        this.setNextStatement(true);
    }
};

    Blockly.Blocks['elif_mutator'] = {
        init: function() {
            this.setColour("#00abea");
            this.appendDummyInput()
                .appendField('否則如果');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.valueConnection_ = null;
            this.statementConnection_ = null;
        }
    };

    Blockly.Blocks['else_mutator'] = {
        init: function() {
            this.setColour("#00abea");
            this.appendDummyInput()
                .appendField('否則');
            this.setPreviousStatement(true);
        }
    };

    Cpp.forBlock['if_block'] = function(block) {
        const ifValue = Cpp.valueToCode(block, 'IF_VALUE', Cpp.ORDER_ATOMIC) || 'false';
        let code = `if ${ifValue} {\n`;
        code += Cpp.statementToCode(block, 'IF_DO').replace(/^ {2}/gm, '    ');

        for (let i = 0; i < block.elifCount_; i++) {
            const elifValue = Cpp.valueToCode(block, 'ELIF' + i, Cpp.ORDER_ATOMIC) || 'false';
            code += `}\nelse if (${elifValue}) {\n`;
            code += Cpp.statementToCode(block, 'ELIF_DO' + i).replace(/^ {2}/gm, '    ');
        }

        if (block.hasElse_) {
            code += '}\nelse{\n';
            code += Cpp.statementToCode(block, 'ELSE').replace(/^ {2}/gm, '    ');
        }

        code += '}\n';
        return code;
    };
*/
Blockly.Blocks['switch_block'] = {
    init: function() {
        this.setPreviousStatement(true);
        this.appendValueInput("SWITCH_VALUE")
            .setCheck(null)
            .appendField("切換" + " break")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "CHECKBOX-1")
        this.appendStatementInput("DEFAULT")
            .setCheck(null)
            .appendField("預設執行");
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['case_mutator'], this));
        this.setColour("#00abea");
        this.setTooltip("Switch 判斷式");
        this.setHelpUrl("");
        this.caseCount_ = 0;
    },

    saveConnections: function(containerBlock) {
        let clauseBlock = containerBlock.nextConnection.targetBlock();
        let i = 0;
        while (clauseBlock && clauseBlock.type === 'case_mutator') {
            const valueInput = this.getInput('CASE' + i);
            const stmtInput = this.getInput('CASE_DO' + i);
            clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
            clauseBlock.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
        }

        // 預設段也記錄（optional，通常你沒動態移除 DEFAULT）
        const defaultInput = this.getInput('DEFAULT');
        if (defaultInput) {
            containerBlock.defaultStatementConnection_ = defaultInput.connection.targetConnection;
        }
    },

    mutationToDom: function() {
        if (!this.caseCount_) return null;
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('caseCount', this.caseCount_);
        return container;
    },

    domToMutation: function(xmlElement) {
        this.caseCount_ = parseInt(xmlElement.getAttribute('caseCount'), 10) || 0;
        this.updateShape_();
    },

    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('switch_mutator');
        containerBlock.initSvg();
        containerBlock.setFieldValue(this.caseCount_, 'CASE_COUNT');

        let connection = containerBlock.nextConnection;
        for (let i = 0; i < this.caseCount_; i++) {
            const caseBlock = workspace.newBlock('case_mutator');
            caseBlock.initSvg();
            connection.connect(caseBlock.previousConnection);
            connection = caseBlock.nextConnection;
        }

        return containerBlock;
    },

    compose: function(containerBlock) {
        let clauseBlock = containerBlock.nextConnection.targetBlock();
        const connections = []; // value connections
        const statementConnections = [];

        while (clauseBlock) {
            if (clauseBlock.type === 'case_mutator') {
                connections.push(clauseBlock.valueConnection_);
                statementConnections.push(clauseBlock.statementConnection_);
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }

        this.caseCount_ = connections.length;
        this.updateShape_();

        for (let i = 0; i < this.caseCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'CASE' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'CASE_DO' + i);
        }

        // 預設段（如有）
        if (containerBlock.defaultStatementConnection_) {
            Blockly.Mutator.reconnect(containerBlock.defaultStatementConnection_, this, 'DEFAULT');
        }
    },

    updateShape_: function() {
        // Remove old inputs
        for (let i = 0; this.getInput('CASE' + i); i++) {
            this.removeInput('CASE' + i);
            this.removeInput('CASE_DO' + i);
        }

        // Add new inputs
        for (let i = 0; i < this.caseCount_; i++) {
            this.appendValueInput('CASE' + i)
                .setCheck(null)
                .appendField("狀況 " + (i + 1) + " 執行")
                .appendField("break")
                .appendField(new Blockly.FieldCheckbox("TRUE"), `CHECKBOX${i}`)
            this.appendStatementInput('CASE_DO' + i)
                .setCheck(null)
                .appendField("動作");
        }
    }
};

Blockly.Blocks['switch_mutator'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("切換的狀況數量")
            .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), 'CASE_COUNT');
        this.setNextStatement(true);
        this.setColour("#00abea");
    }
};

Blockly.Blocks['case_mutator'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("狀況");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#00abea");
        this.valueConnection_ = null;
        this.statementConnection_ = null;
    }
};

    Cpp.forBlock['switch_block'] = function(block) {
        const switchValue = Cpp.valueToCode(block, 'SWITCH_VALUE', Cpp.ORDER_ATOMIC) || '()';
        let code = `switch ${switchValue} {\n`;

        for (let i = 0; i < block.caseCount_; i++) {
            const caseValue = Cpp.valueToCode(block, 'CASE' + i, Cpp.ORDER_ATOMIC) || '0';
            var caseCode = Cpp.statementToCode(block, 'CASE_DO' + i);
            const checkbox2 = block.getFieldValue(`CHECKBOX${i}`) === "TRUE";
            if (caseValue.startsWith('(') && caseValue.endsWith(')')){
                caseValue = caseValue.slice(1, -1);
            }
            caseCode = caseCode.replace(/^ {2}/gm, '        ');
            code += `    case ${caseValue}:\n${caseCode}`;
            if (checkbox2){
                code += "        break\n";
            }else{
                code += '\n';
            }
        }

        var defaultCode = Cpp.statementToCode(block, 'DEFAULT');
        const checkbox1 = block.getFieldValue('CHECKBOX-1') === "TRUE";
        defaultCode = defaultCode.replace(/^ {2}/gm, '       ');
        code += `    default:\n ${defaultCode}`;
        if (checkbox1){
            code += "        break\n}\n";
        }else{
            code += '\n}\n';
        }
        return code;
    };

Blockly.Blocks['string_generic'] = {
    init: function() {
        this.setColour("#FF8C00");
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['string_generic_item'], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = '+'; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        container.setAttribute('operator', this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute('operator') || '+';
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('string_generic_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('string_generic_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput('ADD' + j).setCheck("String");
            if (j > 0) {
                input.appendField(this.operator_);
            }
        }
    },
    setOperator: function(operator) {
        this.operator_ = operator;
        this.updateShape_();
    }
};

Blockly.Blocks['string_generic_container'] = {
    init: function() {
        this.setColour("#FF8C00");
        this.appendDummyInput().appendField("輸入");
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['string_generic_item'] = {
    init: function() {
        this.setColour("#FF8C00");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks['math_generic'] = {
    init: function() {
        this.setColour("#277ace");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['math_generic_item'], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = '+'; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        container.setAttribute('operator', this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute('operator') || '+';
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('math_generic_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('math_generic_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput('ADD' + j).setCheck("Number");
            if (j > 0) {
                input.appendField(this.operator_);
            }
        }
    },
    setOperator: function(operator) {
        this.operator_ = operator;
        this.updateShape_();
    }
};

Blockly.Blocks['math_generic_container'] = {
    init: function() {
        this.setColour("#277ace");
        this.appendDummyInput().appendField("數字輸入");
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['math_generic_item'] = {
    init: function() {
        this.setColour("#277ace");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks['bitwise_generic'] = {
    init: function() {
        this.setColour("#ababab");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['bitwise_generic_item'], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = '&'; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        container.setAttribute('operator', this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute('operator') || '&';
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock('bitwise_generic_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('bitwise_generic_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = bitwise.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput('ADD' + j).setCheck("Number");
            if (j > 0) {
                input.appendField(this.operator_);
            }
        }
    },
    setOperator: function(operator) {
        this.operator_ = operator;
        this.updateShape_();
    }
};

Blockly.Blocks['bitwise_generic_container'] = {
    init: function() {
        this.setColour("#ababab");
        this.appendDummyInput().appendField("數字輸入");
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['bitwise_generic_item'] = {
    init: function() {
        this.setColour("#ababab");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};


function defineMathOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['math_generic'], {
        init: function() {
            Blockly.Blocks['math_generic'].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}

function defineStringOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['string_generic'], {
        init: function() {
            Blockly.Blocks['string_generic'].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}

function defineBitwiseOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['bitwise_generic'], {
        init: function() {
            Blockly.Blocks['bitwise_generic'].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}
        
//math
    defineMathOperatorBlock('math_plus', '+');
    defineMathOperatorBlock('math_multiply', '*');
    defineMathOperatorBlock('math_percent', '%');
    defineMathOperatorBlock('math_divide', '/');
    defineMathOperatorBlock('math_subtract', '-');
    
    //bool
    defineBitwiseOperatorBlock('bitwise_and', '&');
    defineBitwiseOperatorBlock('bitwise_or', '|');
    defineBitwiseOperatorBlock('bitwise_xor', '^');
    defineBitwiseOperatorBlock('bitwise_left', '>>');
    defineBitwiseOperatorBlock('bitwise_right', '<<');
    defineBitwiseOperatorBlock('bitwise_not', '~');

    //string
    defineStringOperatorBlock('string_plus', '+');
    defineStringOperatorBlock('string_commas', ',');
    defineStringOperatorBlock('string_cin', '>>');
    defineStringOperatorBlock('string_cout', '<<');

    Cpp.forBlock['math_plus'] = function(block) {
        return math_generateCode(block, ' + ');
    };

    Cpp.forBlock['math_multiply'] = function(block) {
        return math_generateCode(block, ' * ');
    };

    Cpp.forBlock['math_percent'] = function(block) {
        return math_generateCode(block, ' % ');
    };

    Cpp.forBlock['math_divide'] = function(block) {
        return math_generateCode(block, ' / ');
    };

    Cpp.forBlock['math_subtract'] = function(block) {
        return math_generateCode(block, ' - ');
    };

    Cpp.forBlock['string_plus'] = function(block) {
        return string_generateCode(block, ' + ');
    };

    Cpp.forBlock['string_commas'] = function(block) {
        return string_generateCode(block, ' , ');
    };

    Cpp.forBlock['string_cout'] = function(block) {
        return string_generateCode(block, ' << ');
    };

    Cpp.forBlock['string_cin'] = function(block) {
        return string_generateCode(block, ' >> ');
    };

    Cpp.forBlock['bitwise_and'] = function(block) {
        return bitwise_generateCode(block, ' & ');
    };

    Cpp.forBlock['bitwise_or'] = function(block) {
        return bitwise_generateCode(block, ' | ');
    };

    Cpp.forBlock['bitwise_xor'] = function(block) {
        return bitwise_generateCode(block, ' ^ ');
    };

    Cpp.forBlock['bitwise_left'] = function(block) {
        return bitwise_generateCode(block, ' >> ');
    };

    Cpp.forBlock['bitwise_right'] = function(block) {
        return bitwise_generateCode(block, ' << ');
    };

    Cpp.forBlock['bitwise_not'] = function(block) {
        return bitwise_generateCode(block, ' ~ ');
    };

function math_generateCode(block, operator) {
    let code = '';
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, 'ADD' + i, Cpp.ORDER_ATOMIC) || '';
        if (argument.startsWith('(') && argument.endsWith(')')) {
            argument = argument.slice(1, -1);
        }

        code += argument;
        if (i < block.itemCount_ - 1) {
            code += operator;
        }
    }


    return [`(${code})`, Cpp.ORDER_ATOMIC];
}

function string_generateCode(block, operator) {
    let code = '';
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, 'ADD' + i, Cpp.ORDER_ATOMIC) || '';
        if (argument.startsWith('(') && argument.endsWith(')')) {
            argument = argument.slice(1, -1);
        }

        code += argument;
        if (i < block.itemCount_ - 1) {
            code += operator;
        }
    }


    return [`${code}`, Cpp.ORDER_ATOMIC];
}

function bitwise_generateCode(block, operator) {
    let code = '';
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, 'ADD' + i, Cpp.ORDER_ATOMIC) || '0';
        if (argument.startsWith('(') && argument.endsWith(')')) {
            argument = argument.slice(1, -1);
        }

        code += argument;
        if (i < block.itemCount_ - 1) {
            code += operator;
        }
    }

    return [`${code}`, Cpp.ORDER_ATOMIC];
}

    // date_type
    Cpp.forBlock['data_type'] = function(block) {
        return [`${block.getFieldValue('TYPE')}`, 1];
    }

    Cpp.forBlock["void"] = function(){
        return ["void", Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock['struct_type'] = function(block) {
        return [`struct ${block.getFieldValue('TYPE')}`, 1];
    }

    Cpp.forBlock['class_type'] = function(block) {
        return [`class ${block.getFieldValue('TYPE')}`, 1];
    }


    // data
    Cpp.forBlock['add_line'] = function(block) {
        return `\n`;
    };

    Cpp.forBlock['tab'] = function(block) {
        return [`  `, 1];
    };

    Cpp.forBlock['string'] = function(block) {
        var text = block.getFieldValue('TEXT') || '';
        return [`"${text}"`, 1];
    };

    Cpp.forBlock['char'] = function(block) {
        var text = block.getFieldValue('TEXT') || '';
        return [`'${text}'`, 1];
    };

    Cpp.forBlock['comment_block'] = function(block) {
        return `// ${block.getFieldValue('COMMENT')}\n`;
    };

    Cpp.forBlock['number'] = function(block) {
        return [block.getFieldValue('NUMBER') || '0', 1];
    }

    Cpp.forBlock['abs_block'] = function(block) {
        return [`abs(${Cpp.valueToCode(block, 'value', 1) || '0'})`, 1];
    }

    // stop
    Cpp.forBlock['break_block'] = function() {
        return 'break;\n';
    };

    Cpp.forBlock['continue_block'] = function() {
        return 'continue;\n';
    };

    Cpp.forBlock['return_block'] = function(block) {
        var returnValue = Cpp.valueToCode(block, 'RETURN_VALUE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (returnValue.startsWith('(') && returnValue.endsWith(')')) {
            returnValue = returnValue.slice(1, -1);
        }

        if (returnValue === "") {
            return `return\n;`
        } else {
            return `return ${returnValue};\n`;
        }
    };

    // condition
    Cpp.forBlock['while_block'] = function(block) {
        var condition = Cpp.valueToCode(block, 'CONDITION', 1) || `(false)`;
        var statements_do = Cpp.statementToCode(block, 'DO');

        var code = 'while ' + condition + ' {\n' + statements_do + '\n}\n';
        return code;
    };

    Cpp.forBlock['for_block'] = function(block) {
        var init = Cpp.valueToCode(block, 'INIT', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var condition = Cpp.valueToCode(block, 'CONDITION', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var_cal = Cpp.valueToCode(block, 'var_cal', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var statements_body = Cpp.statementToCode(block, 'DO')
        statements_body = statements_body.replace(/^ {2}/gm, '    ');

        if (init.startsWith('(') && init.endsWith(')')) {
            init = init.slice(1, -1);
        }
        if (condition.startsWith('(') && condition.endsWith(')')) {
            condition = condition.slice(1, -1);
        }
        if (var_cal.startsWith('(') && var_cal.endsWith(')')) {
            var_cal = var_cal.slice(1, -1);
        }
        return `for (${init}; ${condition}; ${var_cal}){\n${statements_body}}\n`;
    };

    Cpp.forBlock['for_range_block'] = function(block) {
        var VAR = Cpp.valueToCode(block, 'VAR', Cpp.ORDER_ATOMIC) || '';
        var container = Cpp.valueToCode(block, 'container', Cpp.ORDER_ATOMIC) || '';
        var statements_body = Cpp.statementToCode(block, 'DO');

        VAR = VAR.replace(/^\(?|\)?$/g, '');
        container = container.replace(/^\(?|\)?$/g, '');
        statements_body = statements_body.replace(/^ {2}/gm, '    ');

        return `for (auto ${VAR}: ${container}) {\n ${statements_body}}\n`;
    };

    Cpp.forBlock['var_cal'] = function(block) {
        var Value1 = Cpp.valueToCode(block, 'A', 1) || '0';
        var Value2 = Cpp.valueToCode(block, 'B', 1) || '0';

        var operator = block.getFieldValue('OPERATOR');
        var operatorSymbol;

        switch (operator) {
            case 'ADD_EQUALS':
                operatorSymbol = '+=';
                break;
            case 'SUBTRACT_EQUALS':
                operatorSymbol = '-=';
                break;
            case 'MUTIPLY_EQUALS':
                operatorSymbol = '*=';
                break;
            case 'DEVIDE_EQUALS':
                operatorSymbol = '/=';
                break;
            default:
                operatorSymbol = '+=';
        }

        if (Value1.startsWith('(') && Value1.endsWith(')')) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith('(') && Value2.endsWith(')')) {
            Value2 = Value2.slice(1, -1);
        }

        code = `(${Value1} ${operatorSymbol} ${Value2})`;

        return [code, 1];
    };
    // define variable
    Cpp.forBlock['def_var'] = function(block) {
        var unsigned = block.getFieldValue('unsigned');
        var type = block.getFieldValue('TYPE');
        var var_name = block.getFieldValue('var_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code = '';
        if (unsigned === 'unsigned') {
            code += 'unsigned ';
        }

        code += type + ' ' + var_name;
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        if (value !== '') {
            code += ` = ${value}`;
        }
        return [code, 1];
    };
    // input and output
    Cpp.forBlock['cin_block'] = function(block) {
        var value_var = Cpp.valueToCode(block, 'VARIABLES', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value_var.startsWith('(') && value_var.endsWith(')')) {
            value_var = value_var.slice(1, -1);
        }

        return `cin >> ${value_var};\n`;
    };

    Cpp.forBlock['cout_block'] = function(block) {
        var argument = Cpp.valueToCode(block, 'INPUT', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (argument.startsWith('(') && argument.endsWith(')')) {
            argument = argument.slice(1, -1);
        }

        if (argument.endsWith(';\n')) {
            argument = argument.slice(0, -2);
        }

        if (isNaN(argument) && !argument.startsWith('"') && !argument.endsWith('"')) {
            argument = `${argument}`;
        }

        if (block.getFieldValue('ENDL_OPTION') === "endl") {
            return `cout << ${argument} << endl;\n`;
        } else {
            return `cout << ${argument};\n`;
        }
    };

    // operation
    Cpp.forBlock['logic_not'] = function(block) {
        var Value = Cpp.valueToCode(block, 'A', 1) || 'true';

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }
        return [`!${Value}`, 1];
    };

    Cpp.forBlock['logic_operators'] = function(block) {
        var Value1 = Cpp.valueToCode(block, 'A', 1) || '0';
        var Value2 = Cpp.valueToCode(block, 'B', 1) || '0';

        var operator = block.getFieldValue('OPERATOR');
        var operatorSymbol;

        switch (operator) {
            case 'EQUAL':
                operatorSymbol = '==';
                break;
            case 'NOT_EQUAL':
                operatorSymbol = '!=';
                break;
            case 'GREATER':
                operatorSymbol = '>';
                break;
            case 'LESS':
                operatorSymbol = '<';
                break;
            case 'GREATER_EQUAL':
                operatorSymbol = '>=';
                break;
            case 'LESS_EQUAL':
                operatorSymbol = '<=';
                break;
            default:
                operatorSymbol = '==';
        }

        if (Value1.startsWith('(') && Value1.endsWith(')')) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith('(') && Value2.endsWith(')')) {
            Value2 = Value2.slice(1, -1);
        }

        if (['<', '>', '=', '==', '>=', '<=', '&', '|', '^'].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (['<', '>', '=', '==', '>=', '<=', '&', '|', '^'].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }

        code = `${Value1} ${operatorSymbol} ${Value2}`;
        return [code, 1];
    };

    Cpp.forBlock['or_and_xor'] = function(block) {
        var Value1 = Cpp.valueToCode(block, 'A', 1) || '0';
        var Value2 = Cpp.valueToCode(block, 'B', 1) || '0';

        var operator = block.getFieldValue('OPERATOR');
        var operatorSymbol;

        switch (operator) {
            case 'AND':
                operatorSymbol = '&&';
                break;
            case 'OR':
                operatorSymbol = '||';
                break;
            case 'XOR':
                operatorSymbol = '^^';
                break;
            default:
                operatorSymbol = '&&';
        }

        if (Value1.startsWith('(') && Value1.endsWith(')')) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith('(') && Value2.endsWith(')')) {
            Value2 = Value2.slice(1, -1);
        }

        if (['<', '>', '=', '==', '>=', '<=', '&&', '==', '||', '&', '|', '^'].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (['<', '>', '=', '==', '>=', '<=', '&&', '==', '||', '&', '|', '^'].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }
        code = `${Value1} ${operatorSymbol} ${Value2}`;
        return [code, 1];
    };

    Cpp.forBlock['var_calculate'] = function(block) {
        var Value1 = Cpp.valueToCode(block, 'A', 1) || '0';
        var Value2 = Cpp.valueToCode(block, 'B', 1) || '0';

        var operator = block.getFieldValue('OPERATOR');
        var operatorSymbol;

        switch (operator) {
            case 'ADD_EQUALS':
                operatorSymbol = '+=';
                break;
            case 'SUBTRACT_EQUALS':
                operatorSymbol = '-=';
                break;
            case 'MUTIPLY_EQUALS':
                operatorSymbol = '*=';
                break;
            case 'DEVIDE_EQUALS':
                operatorSymbol = '/=';
                break;
            case 'MODULO_EQUALS':
                operatorSymbol = '%=';
                break;
            default:
                operatorSymbol = '+=';
        }

        if (Value1.startsWith('(') && Value1.endsWith(')')) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith('(') && Value2.endsWith(')')) {
            Value2 = Value2.slice(1, -1);
        }

        if (['&', '|', '^', '+', '-', '*', '/'].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (['&', '|', '^', '+', '-', '*', '/'].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }            

        code = `${Value1} ${operatorSymbol} ${Value2}`;

        return [code, 1];
    };

    // bool
    Cpp.forBlock['true'] = function() {
        return ['true', 1];
    };

    Cpp.forBlock['false'] = function() {
        return ['false', 1];
    };


    Cpp.forBlock['define_block'] = function(block) {
        var name = block.getFieldValue('name');
        var func_name = block.getFieldValue('func_name');
        return `#define ${name} ${func_name}\n`;
    };

    Cpp.forBlock['typedef_block'] = function(block) {
        var type_name = block.getFieldValue('type_name');
        var name = block.getFieldValue('name');
        return `typedef ${type_name} ${name};\n`;
    };


    // useful things
    Cpp.forBlock['define_template'] = function(block) {
        var Var = Cpp.valueToCode(block, 'var', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Var.startsWith('(') && Var.endsWith(')')) {
            Var = Var.slice(1, -1);
        }

        return `template <${Var}>\n`;
    };

    Cpp.forBlock['define_typename'] = function(block) {
        var Var = Cpp.valueToCode(block, 'var', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Var.startsWith('(') && Var.endsWith(')')) {
            Var = Var.slice(1, -1);
        }

        return [`typename <${Var}>`, 1];
    };

    Cpp.forBlock['define_using'] = function(block) {
        var Var = Cpp.valueToCode(block, 'var', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var change_Var = block.getFieldValue('change_var') || '';

        if (Var.startsWith('(') && Var.endsWith(')')) {
            Var = Var.slice(1, -1);
        }


        return `using ${Var} ${change_Var};`;
    };

    Cpp.forBlock['define_namespace'] = function(block) {
        var var_name = block.getFieldValue('var');
        var code = Cpp.statementToCode(block, 'statement').replace(/^ {2}/gm, '    ');
        
        return `namespce ${var_name} {\n${code}};`;
    }

    // Standard Library
    // math
    Cpp.forBlock['math_random'] = function(block) {
        var Value = Cpp.valueToCode(block, 'RANGE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`rand() % ${Value};\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_floor'] = function(block) {
        var Value = Cpp.valueToCode(block, 'X', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`floor(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_ceil'] = function(block) {
        var Value = Cpp.valueToCode(block, 'X', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`ceil(${Value});\n`, , Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_tangent'] = function(block) {
        var Value = Cpp.valueToCode(block, 'ANGLE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`tan(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_cosine'] = function(block) {
        var Value = Cpp.valueToCode(block, 'ANGLE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`cos(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_sine'] = function(block) {
        var Value = Cpp.valueToCode(block, 'ANGLE', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`sin(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_abs'] = function(block) {
        var Value = Cpp.valueToCode(block, 'A', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`abs(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_sqrt'] = function(block) {
        var Value = Cpp.valueToCode(block, 'X', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith('(') && Value.endsWith(')')) {
            Value = Value.slice(1, -1);
        }

        return [`sqrt(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock['math_calculate'] = function(block) {
        var Value1 = Cpp.valueToCode(block, 'A', 1) || '0';
        var Value2 = Cpp.valueToCode(block, 'B', 1) || '0';

        var operator = block.getFieldValue('OPERATOR');
        var operatorSymbol;

        switch (operator) {
            case 'ADD':
                operatorSymbol = '+';
                break;
            case 'SUBTRACT':
                operatorSymbol = '-';
                break;
            case 'MUTIPLY':
                operatorSymbol = '*';
                break;
            case 'DEVIDE':
                operatorSymbol = '/';
                break;
            case 'DEVIDE_INT':
                operatorSymbol = '//';
                break;
            case 'MODULO':
                operatorSymbol = '%';
                break;
            case 'POWER':
                operatorSymbol = '^';
                break;
            default:
                operatorSymbol = '+';
        }

        if (Value1.startsWith('(') && Value1.endsWith(')')) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith('(') && Value2.endsWith(')')) {
            Value2 = Value2.slice(1, -1);
        }

        let code;
        if (operator === 'POWER') {
            code = `pow(${Value1}, ${Value2})`;
        } else {
            code = `(${Value1} ${operatorSymbol} ${Value2})`;
        }

        return [code, 1];
    };

    Cpp.forBlock['map_insert'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${map_name}.insert({${key}, ${value}});\n`;
    }
    
    Cpp.forBlock['map_insert_range'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var array = Cpp.valueToCode(block, 'array', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (array.startsWith('(') && value.endsWith(')')) {
            array = array.slice(1, -1);
        }
        return `${map_name}.insert(${array});\n`;
    }
    
    Cpp.forBlock['map_insert_or_assign'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${map_name}.insert_or_assign({${key}, ${value}});\n`;
    }

    Cpp.forBlock['map_erase'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${map_name}.erase(${value});\n`;
    }
    
    Cpp.forBlock['map_emplace'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${map_name}.emplace(${key}, ${value});\n`;
    };

    Cpp.forBlock['map_try_emplace'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${map_name}.try_emplace(${key}, ${value});\n`;
    };
    
    
    Cpp.forBlock['map_extract'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.extract(${value})`, 1];
    }
    
    Cpp.forBlock['map_merge'] = function(block) {
        var map_name1 = block.getFieldValue('map_name1');
        var map_name2 = block.getFieldValue('map_name2');
        return `${map_name1}.merge(${map_name2}\n`;
    };
    
    Cpp.forBlock['map_swap'] = function(block) {
        var map_name1 = block.getFieldValue('map_name1');
        var map_name2 = block.getFieldValue('map_name2');
        return `${map_name1}.swap(${map_name2})\n`;
    };
    
    
    
    Cpp.forBlock['map_clear'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        return map_name + ".clear();";
    };
    
    Cpp.forBlock['map_size'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        return [`${map_name}.size()`, 1];
    }
    
    Cpp.forBlock['map_empty'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        return [`${map_name}.empty()`, 1];
    }
    
    
    Cpp.forBlock['map_max_size'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        return [`${map_name}.max_size()`, 1];
    }
    
    Cpp.forBlock['map_count'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.count(${value})`, 1];
    }
    
    Cpp.forBlock['map_find'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.find(${value})`, 1];
    }
    
    Cpp.forBlock['map_contains'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.contains(${value})`, 1];
    }
    
    Cpp.forBlock['map_equal_range'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.equal_range(${value})`, 1];
    }
    
    Cpp.forBlock['map_lower_bound'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.lower_bound(${value})`, 1];
    }
    
    Cpp.forBlock['map_upper_bound'] = function(block) {
        var map_name = block.getFieldValue('map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${map_name}.upper_bound(${value})`, 1];
    }
    
    Cpp.forBlock['map_begin'] = function(block) {
        var map_name = block.getFieldValue('map_name') || '';
        return [`${map_name}.begin()`, 1];
    }
    
    Cpp.forBlock['map_end'] = function(block) {
        var map_name = block.getFieldValue('map_name') || '';
        return [`${map_name}.end()`, 1];
    }
    
    Cpp.forBlock['map_rbegin'] = function(block) {
        var map_name = block.getFieldValue('map_name') || '';
        return [`${map_name}.rbegin()`, 1];
    }
    
    Cpp.forBlock['map_rend'] = function(block) {
        var map_name = block.getFieldValue('map_name') || '';
        return [`${map_name}.rend()`, 1];
    }
    
    Cpp.forBlock['make_map'] = function(block) {
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        var code = `{${key}, ${value}}`;
        return [code, 1];
    }

    //unoredered_map
    Cpp.forBlock['unordered_map_insert'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${unordered_map_name}.insert({${key}, ${value}});\n`;
    }
    
    Cpp.forBlock['unordered_map_insert_range'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var array = Cpp.valueToCode(block, 'array', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (array.startsWith('(') && value.endsWith(')')) {
            array = array.slice(1, -1);
        }
        return `${unordered_map_name}.insert(${array});\n`;
    }
    
    Cpp.forBlock['unordered_map_insert_or_assign'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${unordered_map_name}.insert_or_assign({${key}, ${value}});\n`;
    }
    
    Cpp.forBlock['unordered_map_erase'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${unordered_map_name}.erase(${value});\n`;
    }
    
    Cpp.forBlock['unordered_map_emplace'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${unordered_map_name}.emplace(${key}, ${value});\n`;
    };
    
    Cpp.forBlock['unordered_map_try_emplace'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return `${unordered_map_name}.try_emplace(${key}, ${value});\n`;
    };
    
    
    Cpp.forBlock['unordered_map_extract'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.extract(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_merge'] = function(block) {
        var unordered_map_name1 = block.getFieldValue('unordered_map_name1');
        var unordered_map_name2 = block.getFieldValue('unordered_map_name2');
        return `${unordered_map_name1}.merge(${unordered_map_name2};\n`;
    };
    
    Cpp.forBlock['unordered_map_swap'] = function(block) {
        var unordered_map_name1 = block.getFieldValue('unordered_map_name1');
        var unordered_map_name2 = block.getFieldValue('unordered_map_name2');
        return `${unordered_map_name1}.swap(${unordered_map_name2});\n`;
    };
    
    
    
    Cpp.forBlock['unordered_map_clear'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        return unordered_map_name + ".clear();";
    };
    
    Cpp.forBlock['unordered_map_size'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        return [`${unordered_map_name}.size()`, 1];
    }
    
    Cpp.forBlock['unordered_map_empty'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        return [`${unordered_map_name}.empty()`, 1];
    }
    
    
    Cpp.forBlock['unordered_map_max_size'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        return [`${unordered_map_name}.max_size()`, 1];
    }
    
    Cpp.forBlock['unordered_map_count'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.count(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_find'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.find(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_contains'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.contains(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_equal_range'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.equal_range(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_lower_bound'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.lower_bound(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_upper_bound'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        return [`${unordered_map_name}.upper_bound(${value})`, 1];
    }
    
    Cpp.forBlock['unordered_map_begin'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
        return [`${unordered_map_name}.begin()`, 1];
    }
    
    Cpp.forBlock['unordered_map_end'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
        return [`${unordered_map_name}.end()`, 1];
    }
    
    Cpp.forBlock['unordered_map_rbegin'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
        return [`${unordered_map_name}.rbegin()`, 1];
    }
    
    Cpp.forBlock['unordered_map_rend'] = function(block) {
        var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
        return [`${unordered_map_name}.rend()`, 1];
    }

    // pair
    Cpp.forBlock['define_pair'] = function(block) {
        var type1 = Cpp.valueToCode(block, 'TYPE1', 1) || 'int';
        var type2 = Cpp.valueToCode(block, 'TYPE2', 1) || 'int';
        var pair_name = block.getFieldValue('pair_name');
        var content = Cpp.valueToCode(block, 'content', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (type1.startsWith('(') && type1.endsWith(')')) {
                type1 = type1.slice(1, -1);
        }
        if (type2.startsWith('(') && type2.endsWith(')')) {
                type2 = type2.slice(1, -1);
        }
        var code = `pair<${type1}, ${type2}>${pair_name}`;
        
        if (content) {
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            code += `(${content})`;
        }
        code += ';\n';
        return code;
    }
    Cpp.forBlock['pair_first'] = function(block) {
        var pair_name = block.getFieldValue('pair_name');
        var code = `${pair_name}.first`;
        return [code, 1];
    }

    Cpp.forBlock['pair_second'] = function(block) {
        var pair_name = block.getFieldValue('pair_name');
        var code = `${pair_name}.second`;
        return [code, 1];
    }

    Cpp.forBlock['make_pair'] = function(block) {
        var key = Cpp.valueToCode(block, 'key', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (key.startsWith('(') && key.endsWith(')')) {
            key = key.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        var code = `make_pair(${key}, ${value})`;
        return [code, 1];
    }

    /* set 
    Cpp.forBlock['set_extract_value'] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.value`, 1];
    }

    Cpp.forBlock['set_extract_is_value'] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.is_value`, 1];
    }

    Cpp.forBlock['set_extract_release'] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.release`, 1];
    }

    Cpp.forBlock['set_equal_range_first'] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.first`, 1];
    }

    Cpp.forBlock['set_equal_range_second'] = function(block) {
        var Name = block.getFieldValue('Name');
        return [`${Name}.second`, 1];
    }
    */

    // algorithm
    Cpp.forBlock['sort'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `sort(${name}${start}, ${name}+${end})\n`;
        } else {
            return `sort(${name}.begin()${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock['max'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `*max_element(${name}+${start}, ${name}+${end})\n`;
        } else {
            return `*max_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock['min'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `*min_element(${name}+${start}, ${name}+${end})\n`;
        } else {
            return `*min_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock['find'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `find(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `find(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock['binary_searchd'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `binary_search(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `binary_search(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock['lower_bound'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `lower_bound(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `lower_bound(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock['upper_bound'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, 'start', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, 'end', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith('(') && start.endsWith(')')) {
            start = start.slice(1, -1);
        }
        if (end.startsWith('(') && end.endsWith(')')) {
            end = end.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }

        if (start === '0') {
            start = '';
        } else {
            start = '+' + start;
        }

        if (type === "內建陣列") {
            return `upper_bound(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `upper_bound(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock['reverse'] = function(block) {
        var type = block.getFieldValue('TYPE');
        var name = block.getFieldValue('name');
        if (type === "內建陣列") {
            return `reverse(${name}, ${name} + ${name}.size())\n`;
        } else {
            return `reverse(${name}.begin(), ${name}.end())\n`;
        }
    }
    // time
    Cpp.forBlock['get_current_timestamp'] = function(block) {
        return 'time_t currentTime = time(nullptr);\n';
    };

    Cpp.forBlock['calculate_time_difference'] = function(block) {
        var endTime = Cpp.valueToCode(block, 'END_TIME', Cpp.ORDER_ATOMIC) || '0';
        var startTime = Cpp.valueToCode(block, 'START_TIME', Cpp.ORDER_ATOMIC) || '0';
        return 'double diff = difftime(' + endTime + ', ' + startTime + ');\n';
    };

    Cpp.forBlock['convert_to_local_time'] = function(block) {
        var timestamp = Cpp.valueToCode(block, 'TIMESTAMP', Cpp.ORDER_ATOMIC) || '0';
        return 'tm* localTime = localtime(&' + timestamp + ');\n';
    };

    Cpp.forBlock['convert_to_utc_time'] = function(block) {
        var timestamp = Cpp.valueToCode(block, 'TIMESTAMP', Cpp.ORDER_ATOMIC) || '0';
        return 'tm* utcTime = gmtime(&' + timestamp + ');\n';
    };

    Cpp.forBlock['format_time_string'] = function(block) {
        var timeStruct = Cpp.valueToCode(block, 'TIME_STRUCT', Cpp.ORDER_ATOMIC) || 'tm';
        var format = block.getFieldValue('FORMAT') || '%Y-%m-%d %H:%M:%S';
        return 'char buffer[80];\nstrftime(buffer, sizeof(buffer), "' + format + '", &' + timeStruct + ');\n';
    };

    Cpp.forBlock['set_time_structure'] = function(block) {
        var year = Cpp.valueToCode(block, 'YEAR', Cpp.ORDER_ATOMIC) || '0';
        var month = Cpp.valueToCode(block, 'MONTH', Cpp.ORDER_ATOMIC) || '0';
        var day = Cpp.valueToCode(block, 'DAY', Cpp.ORDER_ATOMIC) || '0';
        var hour = Cpp.valueToCode(block, 'HOUR', Cpp.ORDER_ATOMIC) || '0';
        var minute = Cpp.valueToCode(block, 'MINUTE', Cpp.ORDER_ATOMIC) || '0';
        var second = Cpp.valueToCode(block, 'SECOND', Cpp.ORDER_ATOMIC) || '0';
        return 'tm timeStruct = {};\n' +
            'timeStruct.tm_year = ' + year + ' - 1900;\n' +
            'timeStruct.tm_mon = ' + month + ' - 1;\n' +
            'timeStruct.tm_mday = ' + day + ';\n' +
            'timeStruct.tm_hour = ' + hour + ';\n' +
            'timeStruct.tm_min = ' + minute + ';\n' +
            'timeStruct.tm_sec = ' + second + ';\n';
    };

    Cpp.forBlock['read_time_structure_member'] = function(block) {
        var timeStruct = Cpp.valueToCode(block, 'TIME_STRUCT', Cpp.ORDER_ATOMIC) || 'tm';
        var member = block.getFieldValue('MEMBER') || 'tm_year';
        return timeStruct + '.' + member + '\n';
    };

    Cpp.forBlock['get_current_local_time'] = function(block) {
        return 'time_t currentTime = time(nullptr);\ntm* localTime = localtime(&currentTime);\n';
    };

    Cpp.forBlock['get_current_utc_time'] = function(block) {
        return 'time_t currentTime = time(nullptr);\ntm* utcTime = gmtime(&currentTime);\n';
    };

    // iomanip
    // setbase
    Cpp.forBlock['setbase'] = function(block) {
        var code = `setbase(${block.getFieldValue('carry')})`;
        return [code, 1]
    };

    Cpp.forBlock['setprecision'] = function(block) {
        var code = '';
        if (choice = block.getFieldValue('choice') === 'sig_figs') {
            code += 'fixed << ';
        }
        code += `setprecision(${Cpp.valueToCode(block, 'number', 1)})`
        return [code, 1];
    };

    Cpp.forBlock['setw'] = function(block) {
        var code = `setw(${Cpp.valueToCode(block, 'number', 1)})`;
        return [code, 1];
    };

    Cpp.forBlock['setfill'] = function(block) {
        var code = `setfill(${Cpp.valueToCode(block, 'number', 1)})`;
        return [code, 1];
    };

    Cpp.forBlock['define_bitset'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        var bitset_size = Cpp.valueToCode(block, 'bitset_size', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var bitset_content = Cpp.valueToCode(block, 'bitset_content', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (bitset_size.startsWith('(') && bitset_size.endsWith(')')) {
            bitset_size = bitset_size.slice(1, -1);
        }
        var code = `bitset<${bitset_size}>${bitName}`;
        if (bitset_content !== '') {
            if (bitset_content.startsWith('(') && bitset_content.endsWith(')')) {
                bitset_content = bitset_content.slice(1, -1);
            }
            code += bitset_content;
        }
        return code + ';\n';
    };

    Cpp.forBlock['bitset[i]'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        var pos = Cpp.valueToCode(block, 'pos', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var value = Cpp.valueToCode(block, 'value', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (pos.startsWith('(') && pos.endsWith(')')) {
            pos = pos.slice(1, -1);
        }
        if (value.startsWith('(') && value.endsWith(')')) {
            value = value.slice(1, -1);
        }
        var code = `${bitName}[${pos}] = ${value}`;
        return [code, 1];
    };

    Cpp.forBlock['bitset_set'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.set()`, 1];
    };

    Cpp.forBlock['bitset_reset'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.reset()`, 1];
    };

    Cpp.forBlock['bitset_size'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.size()`, 1];
    };

    Cpp.forBlock['bitset_count'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.count()`, 1];
    };

    Cpp.forBlock['bitset_all'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.all()`, 1];
    };

    Cpp.forBlock['bitset_any'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.any()`, 1];
    };

    Cpp.forBlock['bitset_none'] = function(block) {
        var bitName = block.getFieldValue('bitName');
        return [`${bitName}.none()`, 1];
    };

    Cpp.forBlock['char_bit'] = function() {
        return 'CHAR_BIT';  
    };
    
    Cpp.forBlock['schar_min'] = function() {
        return 'SCHAR_MIN';  
    };
    
    Cpp.forBlock['schar_max'] = function() {
        return 'SCHAR_MAX';  
    };
    
    Cpp.forBlock['uchar_max'] = function() {
        return 'UCHAR_MAX';  
    };
    
    Cpp.forBlock['char_min'] = function() {
        return 'CHAR_MIN'; 
    };
    
    Cpp.forBlock['char_max'] = function() {
        return 'CHAR_MAX'; 
    };
                                                                            
    Cpp.forBlock['mb_len_max'] = function() {
        return 'MB_LEN_MAX'; 
    };
    
    Cpp.forBlock['int_min'] = function() {
        return 'INT_MIN';  
    };
    
    Cpp.forBlock['int_max'] = function() {
        return 'INT_MAX';  
    };
    
    Cpp.forBlock['uint_max'] = function() {
        return 'UINT_MAX';
    };
    
    Cpp.forBlock['llong_min'] = function() {
        return 'LLONG_MIN';  
    };
    
    Cpp.forBlock['llong_max'] = function() {
        return 'LLONG_MAX';  
    };
    
    Cpp.forBlock['ullong_max'] = function() {
        return 'ULLONG_MAX'; 
    };

    //ios
    Cpp.forBlock['boost_ios_sync'] = function(block) {
        return 'ios::sync_with_stdio(0);\n';
    };

    Cpp.forBlock['boost_cin_cout_tie'] = function(block) {
        return 'cin.tie(0); cout.tie(0);\n';
    };

    Cpp.forBlock['cin.eof'] = function(block) {
        return ['cin.eof()', 1];
    };

    Cpp.forBlock['define_sstream'] = function(block) {
        var sstream_name = block.getFieldValue('sstream_name');
        var sstream_content = Cpp.valueToCode(block, 'sstream_content', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var code = `stringstream ${sstream_name}`;
        if (sstream_content) {
            if (sstream_content.startsWith('(') && sstream_content.endsWith(')')) {
                sstream_content = sstream_content.slice(1, -1);
            }
            code += `(${sstream_content})`;
        }
        return code + ';\n';
    };

    Cpp.forBlock['sstream_>>'] = function(block){
        var var1 = Cpp.valueToCode(block, 'var1', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var2 = Cpp.valueToCode(block, 'var2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${var1} >> ${var2}`;
    };

    Cpp.forBlock['sstream_<<'] = function(block){
        var var1 = Cpp.valueToCode(block, 'var1', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var2 = Cpp.valueToCode(block, 'var2', Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${var1} << ${var2}`;
    };

    Cpp.forBlock['llabs_block'] = function(block) {
        return [`llabs(${Cpp.valueToCode(block, 'value', 1) || '0'})`, 1];
    }

    Cpp.forBlock['if_block'] = function(block) {
        const ifValue = Cpp.valueToCode(block, 'IF_VALUE', Cpp.ORDER_ATOMIC) || 'false';
        let code = `if ${ifValue} {\n`;
        code += Cpp.statementToCode(block, 'IF_DO').replace(/^ {2}/gm, '    ');

        for (let i = 0; i < block.elifCount_; i++) {
            const elifValue = Cpp.valueToCode(block, 'ELIF' + i, Cpp.ORDER_ATOMIC) || 'false';
            code += `}\nelse if (${elifValue}) {\n`;
            code += Cpp.statementToCode(block, 'ELIF_DO' + i).replace(/^ {2}/gm, '    ');
        }

        if (block.hasElse_) {
            code += '}\nelse{\n';
            code += Cpp.statementToCode(block, 'ELSE').replace(/^ {2}/gm, '    ');
        }

        code += '}\n';
        return code;
    };


