Blockly.Blocks['main_block'] = {
    init: function() {
        this.jsonInit({
            "type": "main_block",
            "message0": "#include <bits/stdc++.h>",
            "message1": "using namespace %1",
            "args1": [
                {
                    "type": "field_dropdown",
                    "name": "NAMESPACE",
                    "options": [
                        ["std", "std"],
                        ["pbds", "__gnu_pbds"]
                    ]
                }
            ],
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
        Blockly.Cpp['main_block'] = function(block) {
            var namespace = block.getFieldValue('NAMESPACE');
            
            var define_code = Blockly.Cpp.statementToCode(block, 'DEFINES');
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO');

            // ✅ 移除 Blockly 自動增加的 2 個空格
            define_code = define_code.replace(/^  /gm, '');
            statements_body = statements_body.replace(/^ {2}/gm, '    ');

            return `#include <bits/stdc++.h>\nusing namespace ${namespace};\n${define_code}\nint main() {\n${statements_body}\n    return 0;\n}`;
        };

        Blockly.Blocks['define_vector'] = {  
        init: function() {
            this.jsonInit({
                "type": "define_vector",
                "message0": "定義vector資料型態 %1 , 名字: %2 , 大小: %3, 陣列: %4, 迭代器: %5",
                "args0": [{
                        "type": "input_value",
                        "name": "TYPE",
                    },
                    {
                        "type": "field_input",
                        "name": "vec_name"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "size",
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
                "colour": "#3d7fd6",
                "inputsInline": false, 
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "創建一個 vector 陣列，vector 是會自動擴展容量的陣列",
                "helpurl": "",
            });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var sizeChecked  = block.getFieldValue("size") === "TRUE";
            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (sizeChecked && itChecked){
                alert("大小跟迭代器不能一起使用喔😘");
            }

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 size 輸入
            if (sizeChecked && !block.getInput("size")) {
                block.appendValueInput('size')
                    .setCheck("Number")
                    .appendField('大小')
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!sizeChecked && block.getInput("size")) {
                block.removeInput("size", true);
            }

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                    .appendField("輸入陣列名稱: ")
                    .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
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
        container.setAttribute('size', this.getFieldValue('size'));
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('size'), 'size');
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const sizeChecked  = xmlElement.getAttribute('size') === "TRUE";
        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (sizeChecked && !this.getInput("size")) {
            this.appendValueInput('size')
                .setCheck("Number")
                .appendField('大小')
                .setAlign(Blockly.ALIGN_LEFT);
        }

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
        
  Blockly.Cpp['define_vector'] = function(block) {
      var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
      var vec_name = block.getFieldValue('vec_name');
      var code = `vector<${type}>${vec_name}`;

      var size = block.getFieldValue('size') === "TRUE";
      var array = block.getFieldValue('array') === "TRUE";
      var it = block.getFieldValue('it') === "TRUE";

      if (size){
          var size_value = Blockly.Cpp.valueToCode(block, 'size', 1);
          if (size_value.startsWith('(') && size_value.endsWith(')')) {
              size_value = size_value.slice(1, -1);
          }
          code += `(${size_value}`;
      }

      if (array){
          var array_name = block.getFieldValue('array_name');
          if (array_name.startsWith('(') && array_name.endsWith(')')) {
              array_name = array_name.slice(1, -1);
          }
          if (size){
              code += `, ${array_name}`;
          } 
          else{
              code += `(${array_name}`;
          }
      }

      if (it){
            var array2_name = block.getFieldValue('array2_name');
          var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
          var end = Blockly.Cpp.valueToCode(block, 'end', 1);
          code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
      }
          
      if (size || array || it){
          code += ')';
      }
      code += ';\n';
      return code;
  };
        
    Blockly.Blocks['define_stack'] = {  
        init: function() {
            this.jsonInit({
                "type": "define_stack",
                "message0": "定義stack資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "TYPE",
                    },
                    {
                        "type": "field_input",
                        "name": "stack_name"
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
                "colour": "#b53c2f",
                "previousStatement": null,
                "nextStatement": null,
                "inputsInline": true,
                "tooltip": "創建一個 stack 陣列，stack 是會自動擴展容量的陣列",
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
        Blockly.Cpp['define_stack'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1)
            var stack_name = block.getFieldValue('stack_name');
            var code = `stack<${type}>${stack_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
            code += ';';
            return code;
        };

Blockly.Blocks['define_queue'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_queue",
            "message0": "定義queue資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "queue_name"
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
            "colour": "#cf5f87",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "創建一個 queue 陣列，queue 是會自動擴展容量的陣列",
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
        Blockly.Cpp['define_queue'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
            var queue_name = block.getFieldValue('queue_name');
            var code = `queue<${type}>${queue_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
            code += ';';
            return code;
        };
Blockly.Blocks['define_deque'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_deque",
            "message0": "定義deque資料型態 %1 , 名字: %2 , 大小: %3, 陣列: %4, 迭代器: %5",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "vec_name"
                },
                {
                    "type": "field_checkbox",
                    "name": "size",
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
            "colour": "#85B09A",
            "previousStatement": null,
            "inputsInline": true,
            "nextStatement": null,
            "tooltip": "創建一個 deque 陣列，deque 是會自動擴展容量的陣列",
            "helpurl": "",
            "inputsInline": false  // 確保預設排列方式為換行
        });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            var sizeChecked  = block.getFieldValue("size") === "TRUE";
            var arrayChecked = block.getFieldValue("array") === "TRUE";
            var itChecked    = block.getFieldValue("it") === "TRUE";

            if (sizeChecked && itChecked){
                alert("大小跟迭代器不能一起使用喔😘");
            }

            if (arrayChecked && itChecked){
                alert("陣列不能跟迭代器不能一起使用喔😘");
            }
            // 確保 inputsInline 為 false，讓輸入項目換行排列
            block.setInputsInline(false);

            // 動態新增 / 移除 size 輸入
            if (sizeChecked && !block.getInput("size")) {
                block.appendValueInput('size')
                    .setCheck("Number")
                    .appendField('大小')
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!sizeChecked && block.getInput("size")) {
                block.removeInput("size", true);
            }

            // 動態新增 / 移除 array 輸入
            if (arrayChecked && !block.getInput("array_name")) {
                block.appendDummyInput("array_name")
                    .appendField("輸入陣列名稱: ")
                    .appendField(new Blockly.FieldTextInput('array_name'), "array_name");
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
        container.setAttribute('size', this.getFieldValue('size'));
        container.setAttribute('array', this.getFieldValue('array'));
        container.setAttribute('it', this.getFieldValue('it'));
        return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('size'), 'size');
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        this.setFieldValue(xmlElement.getAttribute('it'), 'it');

        const sizeChecked  = xmlElement.getAttribute('size') === "TRUE";
        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        const itChecked    = xmlElement.getAttribute('it') === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (sizeChecked && !this.getInput("size")) {
            this.appendValueInput('size')
                .setCheck("Number")
                .appendField('大小')
                .setAlign(Blockly.ALIGN_LEFT);
        }

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
        Blockly.Cpp['define_deque'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
            var vec_name = block.getFieldValue('vec_name');
            var code = `deque<${type}>${vec_name}`;

            var size = block.getFieldValue('size') === "TRUE";
            var array = block.getFieldValue('array') === "TRUE";
            var it = block.getFieldValue('it') === "TRUE";

            if (size){
                var size_value = Blockly.Cpp.valueToCode(block, 'size', 1);
                if (size_value.startsWith('(') && size_value.endsWith(')')) {
                    size_value = size_value.slice(1, -1);
                }
                code += `(${size_value}`;
            }

            if (array){
            var array_name = block.getFieldValue('array_name');
                if (array_name.startsWith('(') && array_name.endsWith(')')) {
                    array_name = array_name.slice(1, -1);
                }
                if (size){
                    code += `, ${array_name}`;
                } 
                else{
                    code += `(${array_name}`;
                }
            }

            if (it){
                var array2_name = block.getFieldValue('array2_name');
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
                
            if (size || array || it){
                code += ')';
            }
            code += ';';
            return code;
        };

Blockly.Blocks['define_priority_queue'] = {  
    init: function() {
        this.jsonInit({
            "type": "define_priority_queue",
            "message0": "定義priority_queue資料型態 %1 , 名字: %2, 陣列: %3, 迭代器: %4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "priority_queue_name"
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
            "colour": "#F56FA1",
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "tooltip": "創建一個 priority_queue 陣列，priority_queue 是會自動擴展容量的陣列",
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
        Blockly.Cpp['define_priority_queue'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1)
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var code = `priority_queue<${type}>${priority_queue_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
            code += ';';
            return code;
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
                    "name": "set_name"
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
        Blockly.Cpp['define_set'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
            var set_name = block.getFieldValue('set_name');
            var code = `set<${type}>${set_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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
                    "name": "set_name"
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
        Blockly.Cpp['define_unordered_set'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var code = `unordered_set<${type}>${unordered_set_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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
                    "name": "set_name"
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
    Blockly.Cpp['define_multiset'] = function(block) {
        var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
        var multiset_name = block.getFieldValue('multiset_name');
        var code = `multiset<${type}>${multiset_name}`;

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
            var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
            var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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
                    "name": "set_name"
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
        Blockly.Cpp['define_flat_set'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1);
            var flat_set_name = block.getFieldValue('flat_set_name');
            var code = `flat_set<${type}>${flat_set_name}`;

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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
            code += ';';
            return code;
        };
                        
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

    Blockly.Cpp['define_map'] = function(block) {
            var type1 = Blockly.Cpp.valueToCode(block, 'TYPE1', 1);
            var type2 = Blockly.Cpp.valueToCode(block, 'TYPE2', 1);
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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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

        Blockly.Cpp['define_unordered_map'] = function(block) {
                    var type1 = Blockly.Cpp.valueToCode(block, 'TYPE1', 1);
                    var type2 = Blockly.Cpp.valueToCode(block, 'TYPE2', 1);
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
                        var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                        var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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
                
Blockly.Cpp['define_pair'] = function(block) {
            var type1 = Blockly.Cpp.valueToCode(block, 'TYPE1', 1);
            var type2 = Blockly.Cpp.valueToCode(block, 'TYPE2', 1);
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
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
                code += `(${array2_name}.begin()+${begin}, ${array2_name}.end()+${end})`;
            }
            code += ';';
            return code;
        };

Blockly.Blocks['vector_assign'] = {  
    init: function() {
        this.jsonInit({
            "type": "vector_assign",
                "message0": "vector 名稱: %1清空並插入 1. 重複次數: %2, 2. 陣列: %3, 3. 迭代器: %4",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
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
                }
            ],
            "colour": "#3d7fd6",
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
        Blockly.Cpp['vector_assign'] = function(block){
            var vector_name = block.getFieldValue('vector_name');
            var count = block.getFieldValue('count') === 'TRUE';
            var array = block.getFieldValue('array') === 'TRUE';
            var it = block.getFieldValue('it') === 'TRUE';
            var code = `${vector_name}.assign(`;
            
            if (count){
                var count_num = Blockly.Cpp.valueToCode(block, 'count_num', 1);
                var str = Blockly.Cpp.valueToCode(block, 'str', 1);
                if (count_num.startsWith('(') && count_num.endsWith(')')) {
                    count_num = count_num.slice(1, -1);
                }   
                if (str.startsWith('(') && str.endsWith(')')) {
                    str = str.slice(1, -1);
                }   
                code += `${str}, ${count_num}`;
            }
            if (array){
                var array_content = Blockly.Cpp.valueToCode(block, 'array_name', 1);
                if (array_content.startsWith('(') && array_content.endsWith(')')) {
                    array_content = array_content.slice(1, -1);
                }   
                code += `${array_content}`;
            }

            if (it){
                var array2_name = block.getFieldValue('array2_name');
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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
        Blockly.Cpp['deque_assign'] = function(block){
            var deque_name = block.getFieldValue('deque_name');
            var count = block.getFieldValue('count') === 'TRUE';
            var array = block.getFieldValue('array') === 'TRUE';
            var it = block.getFieldValue('it') === 'TRUE';
            var code = `${deque_name}.assign(`;
            
            if (count){
                var count_num = Blockly.Cpp.valueToCode(block, 'count_num', 1);
                var str = Blockly.Cpp.valueToCode(block, 'str', 1);
                if (count_num.startsWith('(') && count_num.endsWith(')')) {
                    count_num = count_num.slice(1, -1);
                }   
                if (str.startsWith('(') && str.endsWith(')')) {
                    str = str.slice(1, -1);
                }   
                code += `${str}, ${count_num}`;
            }
            if (array){
                var array_content = Blockly.Cpp.valueToCode(block, 'array_name', 1);
                if (array_content.startsWith('(') && array_content.endsWith(')')) {
                    array_content = array_content.slice(1, -1);
                }   
                code += `${array_content}`;
            }

            if (it){
                var array2_name = block.getFieldValue('array2_name');
                var begin = Blockly.Cpp.valueToCode(block, 'begin', 1);
                var end = Blockly.Cpp.valueToCode(block, 'end', 1);
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

        Blockly.Cpp['new_block'] = function(block){
            var type = block.getFieldValue('TYPE');
            var value = block.getFieldValue('value') === 'TRUE';
            var array = block.getFieldValue('array') === 'TRUE';
            var code = `new ${type}`;
            if (value){
                var val = Blockly.Cpp.valueToCode(block, 'val', 1);
                if (val.startsWith('(') && val.endsWith(')')){
                    val = val.slice(1, -1);
                }
                code += `(${val})`;
            }else if (array){
                var sizes = Blockly.Cpp.valueToCode(block, 'sizes2', 1);
                var content = Blockly.Cpp.valueToCode(block, 'array_content', 1);
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
        Blockly.Cpp['define_operator'] = function(block){
            var type1 = block.getFieldValue('TYPE1');
            var var1_1 = Blockly.Cpp.valueToCode(block, 'var1_1', 1);
            var var1_2 = Blockly.Cpp.valueToCode(block, 'var1_2', 1);
            var type2 = block.getFieldValue('TYPE2');
            var var2_1 = Blockly.Cpp.valueToCode(block, 'var2_1', 1);
            var var2_2 = Blockly.Cpp.valueToCode(block, 'var2_2', 1);
            return `bool operator${type1}(${var1_1}, ${var1_2}){\n    return ${var2_1} ${type2} ${var2_2};\n}`;
        }

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
                this.setMutator(new Blockly.Mutator(['elif_mutator', 'else_mutator']));
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

        Blockly.Cpp['if_block'] = function(block) {
            const ifValue = Blockly.Cpp.valueToCode(block, 'IF_VALUE', Blockly.Cpp.ORDER_ATOMIC) || 'false';
            let code = `if ${ifValue} {\n`;
            code += Blockly.Cpp.statementToCode(block, 'IF_DO').replace(/^ {2}/gm, '    ');

            for (let i = 0; i < block.elifCount_; i++) {
                const elifValue = Blockly.Cpp.valueToCode(block, 'ELIF' + i, Blockly.Cpp.ORDER_ATOMIC) || 'false';
                code += `}\nelse if (${elifValue}) {\n`;
                code += Blockly.Cpp.statementToCode(block, 'ELIF_DO' + i).replace(/^ {2}/gm, '    ');
            }

            if (block.hasElse_) {
                code += '}\nelse{\n';
                code += Blockly.Cpp.statementToCode(block, 'ELSE').replace(/^ {2}/gm, '    ');
            }

            code += '}\n';
            return code;
        };

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
                this.setMutator(new Blockly.Mutator(['case_mutator']));
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

        Blockly.Cpp['switch_block'] = function(block) {
            const switchValue = Blockly.Cpp.valueToCode(block, 'SWITCH_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '()';
            let code = `switch ${switchValue} {\n`;

            for (let i = 0; i < block.caseCount_; i++) {
                const caseValue = Blockly.Cpp.valueToCode(block, 'CASE' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
                var caseCode = Blockly.Cpp.statementToCode(block, 'CASE_DO' + i);
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

            var defaultCode = Blockly.Cpp.statementToCode(block, 'DEFAULT');
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
                this.setMutator(new Blockly.Mutator(['string_generic_item']));
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
                this.setMutator(new Blockly.Mutator(['math_generic_item']));
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
                this.setMutator(new Blockly.Mutator(['bitwise_generic_item']));
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

        Blockly.Cpp = Blockly.Cpp || {};

        Blockly.Cpp['math_plus'] = function(block) {
            return math_generateCode(block, ' + ');
        };

        Blockly.Cpp['math_multiply'] = function(block) {
            return math_generateCode(block, ' * ');
        };

        Blockly.Cpp['math_percent'] = function(block) {
            return math_generateCode(block, ' % ');
        };

        Blockly.Cpp['math_divide'] = function(block) {
            return math_generateCode(block, ' / ');
        };

        Blockly.Cpp['math_subtract'] = function(block) {
            return math_generateCode(block, ' - ');
        };

        Blockly.Cpp['string_plus'] = function(block) {
            return string_generateCode(block, ' + ');
        };

        Blockly.Cpp['string_commas'] = function(block) {
            return string_generateCode(block, ' , ');
        };

        Blockly.Cpp['string_cout'] = function(block) {
            return string_generateCode(block, ' << ');
        };

        Blockly.Cpp['string_cin'] = function(block) {
            return string_generateCode(block, ' >> ');
        };

        Blockly.Cpp['bitwise_and'] = function(block) {
            return bitwise_generateCode(block, ' & ');
        };

        Blockly.Cpp['bitwise_or'] = function(block) {
            return bitwise_generateCode(block, ' | ');
        };

        Blockly.Cpp['bitwise_xor'] = function(block) {
            return bitwise_generateCode(block, ' ^ ');
        };

        Blockly.Cpp['bitwise_left'] = function(block) {
            return bitwise_generateCode(block, ' >> ');
        };

        Blockly.Cpp['bitwise_right'] = function(block) {
            return bitwise_generateCode(block, ' << ');
        };

        Blockly.Cpp['bitwise_not'] = function(block) {
            return bitwise_generateCode(block, ' ~ ');
        };

        function math_generateCode(block, operator) {
            let code = '';
            for (let i = 0; i < block.itemCount_; i++) {
                let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
                if (argument.startsWith('(') && argument.endsWith(')')) {
                    argument = argument.slice(1, -1);
                }

                code += argument;
                if (i < block.itemCount_ - 1) {
                    code += operator;
                }
            }


            return [`(${code})`, Blockly.Cpp.ORDER_ATOMIC];
        }

        function string_generateCode(block, operator) {
            let code = '';
            for (let i = 0; i < block.itemCount_; i++) {
                let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
                if (argument.startsWith('(') && argument.endsWith(')')) {
                    argument = argument.slice(1, -1);
                }

                code += argument;
                if (i < block.itemCount_ - 1) {
                    code += operator;
                }
            }


            return [`${code}`, Blockly.Cpp.ORDER_ATOMIC];
        }

        function bitwise_generateCode(block, operator) {
            let code = '';
            for (let i = 0; i < block.itemCount_; i++) {
                let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
                if (argument.startsWith('(') && argument.endsWith(')')) {
                    argument = argument.slice(1, -1);
                }

                code += argument;
                if (i < block.itemCount_ - 1) {
                    code += operator;
                }
            }

            return [`${code}`, Blockly.Cpp.ORDER_ATOMIC];
        }

        // date_type
        Blockly.Cpp['data_type'] = function(block) {
            return [`${block.getFieldValue('TYPE')}`, 1];
        }

        Blockly.Cpp['struct_type'] = function(block) {
            return [`struct ${block.getFieldValue('TYPE')}`, 1];
        }

        Blockly.Cpp['class_type'] = function(block) {
            return [`class ${block.getFieldValue('TYPE')}`, 1];
        }

        // struct
        Blockly.Cpp['define_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var heritage = Blockly.Cpp.valueToCode(block, 'heritage', 1);
            var def_var = Blockly.Cpp.statementToCode(block, 'def_var').replace(/^ {2}/gm, '    ');
            
            if (heritage.startsWith('(') && heritage.endsWith(')')) {
                heritage = heritage.slice(1, -1);
            }

            if (heritage){
                return `struct ${struct_name}: ${heritage} {\n${def_var}};`;
            }
            return `struct ${struct_name} {\n${def_var}};`;
        }

        Blockly.Cpp['get_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var var_name = block.getFieldValue('var_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1);

            if (size.startsWith('(') && size.endsWith(')')) {
                size = size.slice(1, -1);
            }

            if (size) {
                return `${struct_name} ${var_name}[${size}];`
            }
            return `${struct_name} ${var_name};`;
        };

        // class
        Blockly.Cpp['define_class'] = function(block) {
            var class_name = block.getFieldValue('class_name');
            var public = Blockly.Cpp.statementToCode(block, 'public').replace(/^ {2}/gm, '    ') || '';
            var private = Blockly.Cpp.statementToCode(block, 'private').replace(/^ {2}/gm, '    ') || '';

            var code = `class ${class_name} {\n`;
            if (public !== '') {
                code += `  public:\n${public}\n`;
            }
            if (private !== '') {
                code += `  private:\n${private}\n`;
            }
            code += `};`;

            return code;
        };

        Blockly.Cpp['get_class'] = function(block) {
            var class_name = block.getFieldValue('class_name');
            var var_name = block.getFieldValue('var_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1);

            if (size.startsWith('(') && size.endsWith(')')) {
                size = size.slice(1, -1);
            }

            if (size) {
                return `${class_name} ${var_name}[${size}];`
            }
            return `${class_name} ${var_name};`;
        };

        // data
        Blockly.Cpp['add_line'] = function(block) {
            return `\n`;
        };

        Blockly.Cpp['tab'] = function(block) {
            return [`  `, 1];
        };

        Blockly.Cpp['string'] = function(block) {
            var text = block.getFieldValue('TEXT') || '';
            return [`"${text}"`, 1];
        };

        Blockly.Cpp['char'] = function(block) {
            var text = block.getFieldValue('TEXT') || '';
            return [`'${text}'`, 1];
        };

        Blockly.Cpp['comment_block'] = function(block) {
            return `// ${block.getFieldValue('COMMENT')}\n`;
        };

        Blockly.Cpp['number'] = function(block) {
            return [block.getFieldValue('NUMBER') || '0', 1];
        }

        Blockly.Cpp['abs_block'] = function(block) {
            return [`abs(${Blockly.Cpp.valueToCode(block, 'value', 1) || '0'})`, 1];
        }

        // stop
        Blockly.Cpp['break_block'] = function() {
            return 'break;\n';
        };

        Blockly.Cpp['continue_block'] = function() {
            return 'continue;\n';
        };

        Blockly.Cpp['return_block'] = function(block) {
            var returnValue = Blockly.Cpp.valueToCode(block, 'RETURN_VALUE', 1);

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
        Blockly.Cpp['while_block'] = function(block) {
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1) || `(false)`;
            var statements_do = Blockly.Cpp.statementToCode(block, 'DO');

            var code = 'while ' + condition + ' {\n' + statements_do + '\n}\n';
            return code;
        };

        Blockly.Cpp['for_block'] = function(block) {
            var init = Blockly.Cpp.valueToCode(block, 'INIT', 1) || '';
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1) || '';
            var var_cal = Blockly.Cpp.valueToCode(block, 'var_cal', 1) || '';
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO')
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

        Blockly.Cpp['for_range_block'] = function(block) {
            var VAR = Blockly.Cpp.valueToCode(block, 'VAR', Blockly.Cpp.ORDER_ATOMIC) || '';
            var container = Blockly.Cpp.valueToCode(block, 'container', Blockly.Cpp.ORDER_ATOMIC) || '';
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO');

            VAR = VAR.replace(/^\(?|\)?$/g, '');
            container = container.replace(/^\(?|\)?$/g, '');
            statements_body = statements_body.replace(/^ {2}/gm, '    ');

            return `for (auto ${VAR}: ${container}) {\n ${statements_body}}\n`;
        };

        Blockly.Cpp['if_else'] = function(block) {
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1);
            var r1 = Blockly.Cpp.valueToCode(block, 'r1', 1);
            var r2 = Blockly.Cpp.valueToCode(block, 'r2', 1);  
            if (condition.startsWith('(') && condition.endsWith(')')) {
                condition = condition.slice(1, -1);
            }
            if (r1.startsWith('(') && r1.endsWith(')')) {
                r1 = r1.slice(1, -1);
            }
            if (r2.startsWith('(') && r2.endsWith(')')) {
                r2 = r2.slice(1, -1);
            }
            return [`${condition}?${r1}:${r2}`, 1];
        }

        Blockly.Cpp['var_cal'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

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
        Blockly.Cpp['def_var'] = function(block) {
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
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
        Blockly.Cpp['cin_block'] = function(block) {
            var value_var = Blockly.Cpp.valueToCode(block, 'VARIABLES', 1);
            if (value_var.startsWith('(') && value_var.endsWith(')')) {
                value_var = value_var.slice(1, -1);
            }

            return `cin >> ${value_var};\n`;
        };

        Blockly.Cpp['cout_block'] = function(block) {
            var argument = Blockly.Cpp.valueToCode(block, 'INPUT', 1) || '';

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
        Blockly.Cpp['logic_not'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'A', 1) || 'true';

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }
            return [`!${Value}`, 1];
        };

        Blockly.Cpp['logic_operators'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

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

        Blockly.Cpp['or_and_xor'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

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

        Blockly.Cpp['var_calculate'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

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
        Blockly.Cpp['true'] = function() {
            return ['true', 1];
        };

        Blockly.Cpp['false'] = function() {
            return ['false', 1];
        };

        // pointer 
        Blockly.Cpp['nullptr'] = function() {
            return ['nullptr', 1];
        };

        Blockly.Cpp['define_pointer'] = function(block) {
            var Const_ptr = block.getFieldValue('const_ptr');
            var Const_var = block.getFieldValue('const_var');
            var unsigned = block.getFieldValue('unsigned');
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1) || 'int';
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const_ptr') {
                code += 'const ';
            }
            if (unsigned === 'unsigned') {
                code += 'unsigned ';
            }

            code += `${type}* `;
            if (Const_var === 'const_var') {
                code += 'const ';
            }

            code += var_name + ' ';

            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value !== '') {
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
        };

        Blockly.Cpp['define_reference'] = function(block) {
            var Const_ptr = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1) || 'int';
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const') {
                code += 'const ';
            }
            if (unsigned === 'unsigned') {
                code += 'unsigned ';
            }

            if (type === 'no') {
                code += `&${var_name} `;
            } else {
                code += `${type} &${var_name} `;
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value !== '') {
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
        };

        Blockly.Cpp['def_ptr'] = function(block) {
            var Const_ptr = block.getFieldValue('const_ptr');
            var Const_var = block.getFieldValue('const_var');
            var unsigned = block.getFieldValue('unsigned');
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1) || 'int';
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const_ptr') {
                code += 'const ';
            }
            if (unsigned === 'unsigned') {
                code += 'unsigned ';
            }

            code += `${type}* `;
            if (Const_var === 'const_var') {
                code += 'const ';
            }

            code += var_name + ' ';

            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value !== '') {
                code += `= ${value}`;
            }
            return [code, 1];
        };

        Blockly.Cpp['def_ref'] = function(block) {
            var Const_ptr = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1) || 'int';
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const') {
                code += 'const ';
            }
            if (unsigned === 'unsigned') {
                code += 'unsigned ';
            }

            if (type === 'no') {
                code += `&${var_name} `;
            } else {
                code += `${type} &${var_name} `;
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value !== '') {
                code += `= ${value}`;
            }
            return [code, 1];
        };
        
        Blockly.Cpp['ptr_equal'] = function(block) {
            var ptr = block.getFieldValue('ptr_name');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${ptr} = ${value};\n`;
        };

        Blockly.Cpp['get_ptr'] = function(block) {
            var ptr = block.getFieldValue('ptr_name');
            return [`${ptr}`, 1];
        };

        Blockly.Cpp['ref_equal'] = function(block) {
            var ref = block.getFieldValue('ref_name');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${ref} = ${value};\n`;
        };

        Blockly.Cpp['get_ref'] = function(block) {
            var ref = block.getFieldValue('ref_name');
            return [`${ref}`, 1];
        };

        Blockly.Cpp['ptr_of'] = function(block) {
            var ptr_name = block.getFieldValue('ptr_name');
            var of = Blockly.Cpp.valueToCode(block, 'of', 1);
            return `${ptr_name} -> ${of}\n`;
        };

        Blockly.Cpp['ptr_to'] = function(block) {
            var var_name = block.getFieldValue('var_name');
            return [`*${var_name}`, 1];
        };

        Blockly.Cpp['ref_to'] = function(block) {
            var var_name = block.getFieldValue('var_name');
            return [`&${var_name}`, 1];
        };

        Blockly.Cpp['delete_block'] = function(block){
            var type1 = block.getFieldValue('TYPE1');
            var var_name = block.getFieldValue('var_name');
            var type2 = block.getFieldValue('TYPE2');
            return `delete ${type1} ${var_name}${type2};`
        }

        // define variable
        Blockly.Cpp['define_variable'] = function(block) {
            var Const = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = Blockly.Cpp.valueToCode(block, 'type', 1) || '';
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const === 'const') {
                code += 'const';
            }
            if (unsigned === 'unsigned') {
                code += ' unsigned';
            }
             
            if (type.startsWith('(') && type.endsWith(')')) {
                type = type.slice(1, -1);
            }

            code += type + ' ' + var_name;
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value !== '') {
                code += ` = ${value}`;
            }
            code += ';\n';
            return code;
        };

        Blockly.Cpp['var_equal'] = function(block) {
            var variable = block.getFieldValue('VAR_NAME');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${variable} = ${value};\n`;
        };

        Blockly.Cpp['get_var'] = function(block) {
            var variable = block.getFieldValue('VAR_NAME');
            return [`${variable}`, 1];
        };

        // function
        Blockly.Cpp['function_call'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (value) {
                return `${funcName}(${value});\n`;
            } else {
                return funcName + '\n';
            }

        };

        //function
        Blockly.Cpp['define_function'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'type', 1);
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = Blockly.Cpp.valueToCode(block, 'expression', 1);
            content = content.replace(/^ {2}/gm, '    ');
            if (data.startsWith('(') && data.endsWith(')')) {
                data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            if (expression.startsWith('(') && expression.endsWith(')')) {
                expression = expression.slice(1, -1);
            }
            if (type.startsWith('(') && type.endsWith(')')) {
                type = type.slice(1, -1);
            }
            return `${type} ${funcName}(${data}) {\n${content}    return ${expression};\n}\n`;
        };

        Blockly.Cpp['define_function_void'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1) || '';
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = block.getFieldValue('expression');
            content = content.replace(/^ {2}/gm, '    ');
            if (data.startsWith('(') && data.endsWith(')')) {
                data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }

            if (expression === 'no') {
                return `void ${funcName}(${data}) {\n${content}\n}\n`;
            } else {
                return `void ${funcName}(${data}) {\n${content}  return;\n}\n`;
            }
        };
        Blockly.Cpp['lambda'] = function(block) {
            var capture = block.getFieldValue('captures');
            var VAR = Blockly.Cpp.valueToCode(block, 'VAR', 1);
            var statement = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var line = block.getFieldValue('line') === "TRUE";
            if (VAR.startsWith('(') && VAR.endsWith(')')) {
                VAR = VAR.slice(1, -1);
            }
            if (line){
                if (statement.startsWith('(') && statement.endsWith(')')) {
                    statement = statement.slice(1, -1);
                }
                statement = statement.replace(/^ {2}/gm, '    ')
                return [`[${capture}](${VAR}){\n${statement}\n}`, 1];
            }else{
                if (statement.startsWith('(') && statement.endsWith(')')) {
                    statement = statement.slice(1, -1);
                }
                statement = statement.replace(/\n/g, '');
                return [`[${capture}](${VAR}){${statement}}`, 1];
            }
        };


        Blockly.Cpp['define_block'] = function(block) {
            var name = block.getFieldValue('name');
            var func_name = block.getFieldValue('func_name');
            return `#define ${name} ${func_name}\n`;
        };

        Blockly.Cpp['typedef_block'] = function(block) {
            var type_name = block.getFieldValue('type_name');
            var name = block.getFieldValue('name');
            return `typedef ${type_name} ${name};\n`;
        };


        // useful things
        Blockly.Cpp['define_template'] = function(block) {
            var Var = Blockly.Cpp.valueToCode(block, 'var', 1);

            if (Var.startsWith('(') && Var.endsWith(')')) {
                Var = Var.slice(1, -1);
            }

            return `template <${Var}>\n`;
        };

        Blockly.Cpp['define_typename'] = function(block) {
            var Var = Blockly.Cpp.valueToCode(block, 'var', 1);

            if (Var.startsWith('(') && Var.endsWith(')')) {
                Var = Var.slice(1, -1);
            }

            return [`typename <${Var}>`, 1];
        };

        Blockly.Cpp['define_using'] = function(block) {
            var Var = Blockly.Cpp.valueToCode(block, 'var', 1);
            var change_Var = block.getFieldValue('change_var') || '';

            if (Var.startsWith('(') && Var.endsWith(')')) {
                Var = Var.slice(1, -1);
            }


            return `using ${Var} ${change_Var};`;
        };

        Blockly.Cpp['define_namespace'] = function(block) {
            var var_name = block.getFieldValue('var');
            var code = Blockly.Cpp.statementToCode(block, 'statement').replace(/^ {2}/gm, '    ');
            
            return `namespce ${var_name} {\n${code}};`;
        }

        // Standard Library
        // math
        Blockly.Cpp['math_random'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'RANGE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`rand() % ${Value};\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_floor'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`floor(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_ceil'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`ceil(${Value});\n`, , Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_tangent'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`tan(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_cosine'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`cos(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_sine'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`sin(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_abs'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'A', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`abs(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_sqrt'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`sqrt(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_calculate'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

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

        // vector
        Blockly.Cpp['vector_push_back'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            var number = Blockly.Cpp.valueToCode(block, 'number', 1) || '';
            if (number.startsWith('(') && number.endsWith(')')) {
                number = number.slice(1, -1);
            }
            return vector_name + ".push_back(" + number + ");\n";
        };
        
        Blockly.Cpp['vector_emplace_back'] = function(block) {
            var name = block.getFieldValue('NAME');
            var num = block.getFieldValue('number');
            return code = name + ".emplace_back(" + num + ");\n";
        };
        
        Blockly.Cpp['vector_append_range'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return vector_name + ".append_range(" + element + ");\n";
        };
        
        Blockly.Cpp['vector_pop_back'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return vector_name + ".pop_back();\n";
        };
        
        Blockly.Cpp['vector_insert'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1) | 0;
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (pos === 0) {
                return `${vector_name}.insert(${vector_name}.begin(), ${value});\n`
            }   
            return `${vector_name}.insert(${vector_name}.begin()+${pos}, ${value});\n`;
        }
        
        Blockly.Cpp['vector_insert_range'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1) | '0';
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
           if (pos === 0) {
                return `${vector_name}.insert_range(${vector_name}.begin(), ${value});\n`
            }   
            return `${vector_name}.insert_range(${vector_name}.begin()+${pos}, ${value});\n`;
        }
        
        Blockly.Cpp['vector_erase'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (pos === '0') {
                 return `${vector_name}.erase(${vector_name}.begin(), ${value});\n`;
            } else {
                if (pos.startsWith('(') && pos.endsWith(')')) {
                    pos = pos.slice(1, -1);
                }
            }
            return `${vector_name}.erase(${vector_name}.begin()+${pos}, ${value});\n`;
        }
        
        Blockly.Cpp['vector_swap'] = function(block) {
            var vector_name1 = block.getFieldValue('vector_name1');
            var vector_name2 = block.getFieldValue('vector_name2');
            return `${vector_name1}.swap(${vector_name2});\n`;
        };
        
        Blockly.Cpp['vector_operate[]'] = function(block){
            var vector_name = block.getFieldValue('vector_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            if (pos.startsWith('(') && pos.endsWith(')')) {
                pos = pos.slice(1, -1);
            }
            var code = `${vector_name}[${pos}]`;
            return [code, 1];
        }
        
        Blockly.Cpp['vector_front'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.front()`, 1];
        }
        
        Blockly.Cpp['vector_back'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.back()`, 1];
        };
        
        Blockly.Cpp['vector_clear'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return vector_name + ".clear()";
        };
        
        Blockly.Cpp['vector_size'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.size()`, 1];
        }
        
        Blockly.Cpp['vector_empty'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.empty()`, 1];
        }
        
        Blockly.Cpp['vector_reserve'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.reserve()`, 1];
        }
        
        Blockly.Cpp['vector_capacity'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.capacity()`, 1];
        }
        
        Blockly.Cpp['vector_max_size'] = function(block) {
            var vector_name = block.getFieldValue('vector_name');
            return [`${vector_name}.max_size()`, 1];
        }
        
        Blockly.Cpp['vector_begin'] = function(block) {
            var vector_name = block.getFieldValue('vector_name') || '';
            return [`${vector_name}.begin()`, 1];
        }
        
        Blockly.Cpp['vector_end'] = function(block) {
            var vector_name = block.getFieldValue('vector_name') || '';
            return [`${vector_name}.end()`, 1];
        }
        
        Blockly.Cpp['vector_rbegin'] = function(block) {
            var vector_name = block.getFieldValue('vector_name') || '';
            return [`${vector_name}.rbegin()`, 1];
        }
        
        Blockly.Cpp['vector_rend'] = function(block) {
            var vector_name = block.getFieldValue('vector_name') || '';
            return [`${vector_name}.rend()`, 1];
        }

        // array
        Blockly.Cpp['define_array'] = function(block) {
            var type = Blockly.Cpp.valueToCode(block, 'TYPE', 1) || 'int';
            var array_name = block.getFieldValue('array_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1) || '';
            var content = Blockly.Cpp.valueToCode(block, 'content', 1) || '';
            if (size.startsWith('(') && size.endsWith(')')) {
                size = size.slice(1, -1);
            }
            if (content === '') {
                return `${type} ${array_name}[${size}];`
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            return `${type} ${array_name}[${size}] = ${content};\n`
        }

        Blockly.Cpp['array_name_block'] = function(block) {
            var array_name = block.getFieldValue('array_name');
            return [`${array_name}`, 1];
        }

        Blockly.Cpp['array_content'] = function(block) {
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            return [`{${content}}`, 1];
        }

        Blockly.Cpp['array_operate[]'] = function(block) {
            var array_name = block.getFieldValue('array_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            if (pos.startsWith('(') && pos.endsWith(')')) {
                pos = pos.slice(1, -1);
            }
            var code = `${array_name}[${pos}]`;
            return [code, 1];
        }

        Blockly.Cpp['map_insert'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${map_name}.insert({${key}, ${value}});\n`;
        }
        
        Blockly.Cpp['map_insert_range'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${map_name}.insert(${array});\n`;
        }
        
        Blockly.Cpp['map_insert_or_assign'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${map_name}.insert_or_assign({${key}, ${value}});\n`;
        }

        Blockly.Cpp['map_erase'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${map_name}.erase(${value});\n`;
        }
        
        Blockly.Cpp['map_emplace'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${map_name}.emplace(${key}, ${value});\n`;
        };

        Blockly.Cpp['map_try_emplace'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${map_name}.try_emplace(${key}, ${value});\n`;
        };
        
        
        Blockly.Cpp['map_extract'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.extract(${value})`, 1];
        }
        
        Blockly.Cpp['map_merge'] = function(block) {
            var map_name1 = block.getFieldValue('map_name1');
            var map_name2 = block.getFieldValue('map_name2');
            return `${map_name1}.merge(${map_name2}\n`;
        };
        
        Blockly.Cpp['map_swap'] = function(block) {
            var map_name1 = block.getFieldValue('map_name1');
            var map_name2 = block.getFieldValue('map_name2');
            return `${map_name1}.swap(${map_name2})\n`;
        };
        
        
        
        Blockly.Cpp['map_clear'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return map_name + ".clear();";
        };
        
        Blockly.Cpp['map_size'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return [`${map_name}.size()`, 1];
        }
        
        Blockly.Cpp['map_empty'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return [`${map_name}.empty()`, 1];
        }
        
        
        Blockly.Cpp['map_max_size'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return [`${map_name}.max_size()`, 1];
        }
        
        Blockly.Cpp['map_count'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.count(${value})`, 1];
        }
        
        Blockly.Cpp['map_find'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.find(${value})`, 1];
        }
        
        Blockly.Cpp['map_contains'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.contains(${value})`, 1];
        }
        
        Blockly.Cpp['map_equal_range'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.equal_range(${value})`, 1];
        }
        
        Blockly.Cpp['map_lower_bound'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.lower_bound(${value})`, 1];
        }
        
        Blockly.Cpp['map_upper_bound'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${map_name}.upper_bound(${value})`, 1];
        }
        
        Blockly.Cpp['map_begin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            return [`${map_name}.begin()`, 1];
        }
        
        Blockly.Cpp['map_end'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            return [`${map_name}.end()`, 1];
        }
        
        Blockly.Cpp['map_rbegin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            return [`${map_name}.rbegin()`, 1];
        }
        
        Blockly.Cpp['map_rend'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            return [`${map_name}.rend()`, 1];
        }
        
        Blockly.Cpp['make_map'] = function(block) {
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
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
        Blockly.Cpp['unordered_map_insert'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_map_name}.insert({${key}, ${value}});\n`;
        }
        
        Blockly.Cpp['unordered_map_insert_range'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${unordered_map_name}.insert(${array});\n`;
        }
        
        Blockly.Cpp['unordered_map_insert_or_assign'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_map_name}.insert_or_assign({${key}, ${value}});\n`;
        }
        
        Blockly.Cpp['unordered_map_erase'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_map_name}.erase(${value});\n`;
        }
        
        Blockly.Cpp['unordered_map_emplace'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_map_name}.emplace(${key}, ${value});\n`;
        };
        
        Blockly.Cpp['unordered_map_try_emplace'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_map_name}.try_emplace(${key}, ${value});\n`;
        };
        
        
        Blockly.Cpp['unordered_map_extract'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.extract(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_merge'] = function(block) {
            var unordered_map_name1 = block.getFieldValue('unordered_map_name1');
            var unordered_map_name2 = block.getFieldValue('unordered_map_name2');
            return `${unordered_map_name1}.merge(${unordered_map_name2};\n`;
        };
        
        Blockly.Cpp['unordered_map_swap'] = function(block) {
            var unordered_map_name1 = block.getFieldValue('unordered_map_name1');
            var unordered_map_name2 = block.getFieldValue('unordered_map_name2');
            return `${unordered_map_name1}.swap(${unordered_map_name2});\n`;
        };
        
        
        
        Blockly.Cpp['unordered_map_clear'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            return unordered_map_name + ".clear();";
        };
        
        Blockly.Cpp['unordered_map_size'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            return [`${unordered_map_name}.size()`, 1];
        }
        
        Blockly.Cpp['unordered_map_empty'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            return [`${unordered_map_name}.empty()`, 1];
        }
        
        
        Blockly.Cpp['unordered_map_max_size'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            return [`${unordered_map_name}.max_size()`, 1];
        }
        
        Blockly.Cpp['unordered_map_count'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.count(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_find'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.find(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_contains'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.contains(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_equal_range'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.equal_range(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_lower_bound'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.lower_bound(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_upper_bound'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_map_name}.upper_bound(${value})`, 1];
        }
        
        Blockly.Cpp['unordered_map_begin'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
            return [`${unordered_map_name}.begin()`, 1];
        }
        
        Blockly.Cpp['unordered_map_end'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
            return [`${unordered_map_name}.end()`, 1];
        }
        
        Blockly.Cpp['unordered_map_rbegin'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
            return [`${unordered_map_name}.rbegin()`, 1];
        }
        
        Blockly.Cpp['unordered_map_rend'] = function(block) {
            var unordered_map_name = block.getFieldValue('unordered_map_name') || '';
            return [`${unordered_map_name}.rend()`, 1];
        }

        // pair
        Blockly.Cpp['define_pair'] = function(block) {
            var type1 = Blockly.Cpp.valueToCode(block, 'TYPE1', 1) || 'int';
            var type2 = Blockly.Cpp.valueToCode(block, 'TYPE2', 1) || 'int';
            var pair_name = block.getFieldValue('pair_name');
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);

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
        Blockly.Cpp['pair_first'] = function(block) {
            var pair_name = block.getFieldValue('pair_name');
            var code = `${pair_name}.first`;
            return [code, 1];
        }

        Blockly.Cpp['pair_second'] = function(block) {
            var pair_name = block.getFieldValue('pair_name');
            var code = `${pair_name}.second`;
            return [code, 1];
        }

        Blockly.Cpp['make_pair'] = function(block) {
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (key.startsWith('(') && key.endsWith(')')) {
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            var code = `make_pair(${key}, ${value})`;
            return [code, 1];
        }

        // set
        Blockly.Cpp['set_insert'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${set_name}.insert(${value});\n`;
        }
        
        Blockly.Cpp['set_insert_range'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${set_name}.insert_range(${array});\n`;
        }
        
        Blockly.Cpp['set_erase'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${set_name}.erase(${value});\n`;
        }

        Blockly.Cpp['set_emplace'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return set_name + ".emplace(" + element + ");\n";
        };

        
        Blockly.Cpp['set_extract'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.extract(${value})`, 1];
        }
        
        Blockly.Cpp['set_merge'] = function(block) {
            var set_name1 = block.getFieldValue('set_name1');
            var set_name2 = block.getFieldValue('set_name2');
            return `${set_name1}.merge(${set_name2});\n`;
        };
        
        Blockly.Cpp['set_swap'] = function(block) {
            var set_name1 = block.getFieldValue('set_name1');
            var set_name2 = block.getFieldValue('set_name2');
            return `${set_name1}.swap(${set_name2});\n`;
        };
        
        
        
        Blockly.Cpp['set_clear'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return set_name + ".clear();";
        };
        
        Blockly.Cpp['set_size'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.size()`, 1];
        }
        
        Blockly.Cpp['set_empty'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.empty()`, 1];
        }
        
        
        Blockly.Cpp['set_max_size'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.max_size()`, 1];
        }
        
        Blockly.Cpp['set_count'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.count(${value})`, 1];
        }
        
        Blockly.Cpp['set_find'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.find(${value})`, 1];
        }
        
        Blockly.Cpp['set_contains'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.contains(${value})`, 1];
        }
        
        Blockly.Cpp['set_equal_range'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.equal_range(${value})`, 1];
        }
        
        Blockly.Cpp['set_lower_bound'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.lower_bound(${value})`, 1];
        }
        
        Blockly.Cpp['set_upper_bound'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${set_name}.upper_bound(${value})`, 1];
        }
        
        Blockly.Cpp['set_begin'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            return [`${set_name}.begin()`, 1];
        }
        
        Blockly.Cpp['set_end'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            return [`${set_name}.end()`, 1];
        }
        
        Blockly.Cpp['set_rbegin'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            return [`${set_name}.rbegin()`, 1];
        }
        
        Blockly.Cpp['set_rend'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            return [`${set_name}.rend()`, 1];
        }
        
        Blockly.Cpp['set_extract_value'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.value`, 1];
        }

        Blockly.Cpp['set_extract_is_value'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.is_value`, 1];
        }

        Blockly.Cpp['set_extract_release'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.release`, 1];
        }

        Blockly.Cpp['set_equal_range_first'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.first`, 1];
        }

        Blockly.Cpp['set_equal_range_second'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            return [`${set_name}.second`, 1];
        }

        // unordered_set
        Blockly.Cpp['unordered_set_insert'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_set_name}.insert(${value});\n`;
        }

        Blockly.Cpp['unordered_set_insert_range'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${unordered_set_name}.insert_range(${array});\n`;
        }

        Blockly.Cpp['unordered_set_erase'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${unordered_set_name}.erase(${value});\n`;
        }

        Blockly.Cpp['unordered_set_emplace'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return unordered_set_name + ".emplace(" + element + ");\n";
        };


        Blockly.Cpp['unordered_set_extract'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_set_name}.extract(${value})`, 1];
        }

        Blockly.Cpp['unordered_set_merge'] = function(block) {
            var unordered_set_name1 = block.getFieldValue('unordered_set_name1');
            var unordered_set_name2 = block.getFieldValue('unordered_set_name2');
            return `${unordered_set_name1}.merge(${unordered_set_name2});\n`;
        };

        Blockly.Cpp['unordered_set_swap'] = function(block) {
            var unordered_set_name1 = block.getFieldValue('unordered_set_name1');
            var unordered_set_name2 = block.getFieldValue('unordered_set_name2');
            return `${unordered_set_name1}.swap(${unordered_set_name2});\n`;
        };



        Blockly.Cpp['unordered_set_clear'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return unordered_set_name + ".clear();";
        };

        Blockly.Cpp['unordered_set_size'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.size()`, 1];
        }

        Blockly.Cpp['unordered_set_empty'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.empty()`, 1];
        }


        Blockly.Cpp['unordered_set_max_size'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.max_size()`, 1];
        }

        Blockly.Cpp['unordered_set_count'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_set_name}.count(${value})`, 1];
        }

        Blockly.Cpp['unordered_set_find'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_set_name}.find(${value})`, 1];
        }

        Blockly.Cpp['unordered_set_contains'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_set_name}.contains(${value})`, 1];
        }

        Blockly.Cpp['unordered_set_equal_range'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${unordered_set_name}.equal_range(${value})`, 1];
        }

        Blockly.Cpp['unordered_set_begin'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name') || '';
            return [`${unordered_set_name}.begin()`, 1];
        }

        Blockly.Cpp['unordered_set_end'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name') || '';
            return [`${unordered_set_name}.end()`, 1];
        }

        Blockly.Cpp['unordered_set_rbegin'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name') || '';
            return [`${unordered_set_name}.rbegin()`, 1];
        }

        Blockly.Cpp['unordered_set_rend'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name') || '';
            return [`${unordered_set_name}.rend()`, 1];
        }

        Blockly.Cpp['unordered_set_extract_value'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.value`, 1];
        }
        Blockly.Cpp['unordered_set_extract_is_value'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.is_value`, 1];
        }

        Blockly.Cpp['unordered_set_extract_release'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.release`, 1];
        }

        Blockly.Cpp['unordered_set_equal_range_first'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.first`, 1];
        }

        Blockly.Cpp['unordered_set_equal_range_second'] = function(block) {
            var unordered_set_name = block.getFieldValue('unordered_set_name');
            return [`${unordered_set_name}.second`, 1];
        }

        // multiset
        Blockly.Cpp['multiset_insert'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${multiset_name}.insert(${value});\n`;
        }

        Blockly.Cpp['multiset_insert_range'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${multiset_name}.insert_range(${array});\n`;
        }

        Blockly.Cpp['multiset_erase'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${multiset_name}.erase(${value});\n`;
        }

        Blockly.Cpp['multiset_emplace'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return multiset_name + ".emplace(" + element + ");\n";
        };


        Blockly.Cpp['multiset_extract'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.extract(${value})`, 1];
        }

        Blockly.Cpp['multiset_merge'] = function(block) {
            var multiset_name1 = block.getFieldValue('multiset_name1');
            var multiset_name2 = block.getFieldValue('multiset_name2');
            return `${multiset_name1}.merge(${multiset_name2});\n`;
        };

        Blockly.Cpp['multiset_swap'] = function(block) {
            var multiset_name1 = block.getFieldValue('multiset_name1');
            var multiset_name2 = block.getFieldValue('multiset_name2');
            return `${multiset_name1}.swap(${multiset_name2});\n`;
        };



        Blockly.Cpp['multiset_clear'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return multiset_name + ".clear();";
        };

        Blockly.Cpp['multiset_size'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.size()`, 1];
        }

        Blockly.Cpp['multiset_empty'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.empty()`, 1];
        }


        Blockly.Cpp['multiset_max_size'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.max_size()`, 1];
        }

        Blockly.Cpp['multiset_count'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.count(${value})`, 1];
        }

        Blockly.Cpp['multiset_find'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.find(${value})`, 1];
        }

        Blockly.Cpp['multiset_contains'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.contains(${value})`, 1];
        }

        Blockly.Cpp['multiset_equal_range'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.equal_range(${value})`, 1];
        }

        Blockly.Cpp['multiset_lower_bound'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.lower_bound(${value})`, 1];
        }

        Blockly.Cpp['multiset_upper_bound'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${multiset_name}.upper_bound(${value})`, 1];
        }

        Blockly.Cpp['multiset_begin'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name') || '';
            return [`${multiset_name}.begin()`, 1];
        }

        Blockly.Cpp['multiset_end'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name') || '';
            return [`${multiset_name}.end()`, 1];
        }

        Blockly.Cpp['multiset_rbegin'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name') || '';
            return [`${multiset_name}.rbegin()`, 1];
        }

        Blockly.Cpp['multiset_rend'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name') || '';
            return [`${multiset_name}.rend()`, 1];
        }

        Blockly.Cpp['multiset_extract_value'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.value`, 1];
        }

        Blockly.Cpp['multiset_extract_is_value'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.is_value`, 1];
        }

        Blockly.Cpp['multiset_extract_release'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.release`, 1];
        }

        Blockly.Cpp['multiset_equal_range_first'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.first`, 1];
        }

        Blockly.Cpp['multiset_equal_range_second'] = function(block) {
            var multiset_name = block.getFieldValue('multiset_name');
            return [`${multiset_name}.second`, 1];
        }

        // flat_set
        Blockly.Cpp['flat_set_insert'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${flat_set_name}.insert(${value});\n`;
        }

        Blockly.Cpp['flat_set_insert_range'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            return `${flat_set_name}.insert_range(${array});\n`;
        }

        Blockly.Cpp['flat_set_erase'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${flat_set_name}.erase(${value});\n`;
        }

        Blockly.Cpp['flat_set_emplace'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return flat_set_name + ".emplace(" + element + ");\n";
        };


        Blockly.Cpp['flat_set_extract'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.extract(${value})`, 1];
        }

        Blockly.Cpp['flat_set_merge'] = function(block) {
            var flat_set_name1 = block.getFieldValue('flat_set_name1');
            var flat_set_name2 = block.getFieldValue('flat_set_name2');
            return `${flat_set_name1}.merge(${flat_set_name2};\n`;
        };

        Blockly.Cpp['flat_set_swap'] = function(block) {
            var flat_set_name1 = block.getFieldValue('flat_set_name1');
            var flat_set_name2 = block.getFieldValue('flat_set_name2');
            return `${flat_set_name1}.swap(${flat_set_name2});\n`;
        };



        Blockly.Cpp['flat_set_clear'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return flat_set_name + ".clear();";
        };

        Blockly.Cpp['flat_set_size'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.size()`, 1];
        }

        Blockly.Cpp['flat_set_empty'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.empty()`, 1];
        }


        Blockly.Cpp['flat_set_max_size'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.max_size()`, 1];
        }

        Blockly.Cpp['flat_set_count'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.count(${value})`, 1];
        }

        Blockly.Cpp['flat_set_find'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.find(${value})`, 1];
        }

        Blockly.Cpp['flat_set_contains'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.contains(${value})`, 1];
        }

        Blockly.Cpp['flat_set_equal_range'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.equal_range(${value})`, 1];
        }

        Blockly.Cpp['flat_set_lower_bound'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.lower_bound(${value})`, 1];
        }

        Blockly.Cpp['flat_set_upper_bound'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return [`${flat_set_name}.upper_bound(${value})`, 1];
        }

        Blockly.Cpp['flat_set_begin'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name') || '';
            return [`${flat_set_name}.begin()`, 1];
        }

        Blockly.Cpp['flat_set_end'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name') || '';
            return [`${flat_set_name}.end();`, 1];
        }

        Blockly.Cpp['flat_set_rbegin'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name') || '';
            return [`${flat_set_name}.rbegin()`, 1];
        }

        Blockly.Cpp['flat_set_rend'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name') || '';
            return [`${flat_set_name}.rend()`, 1];
        }

        Blockly.Cpp['flat_set_extract_value'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.value`, 1];
        }

        Blockly.Cpp['flat_set_extract_is_value'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.is_value`, 1];
        }

        Blockly.Cpp['flat_set_extract_release'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.release`, 1];
        }

        Blockly.Cpp['flat_set_equal_range_first'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.first`, 1];
        }
        
        Blockly.Cpp['flat_set_equal_range_second'] = function(block) {
            var flat_set_name = block.getFieldValue('flat_set_name');
            return [`${flat_set_name}.second`, 1];
        }

        // algorithm
        Blockly.Cpp['sort'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['max'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['min'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['find'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['binary_searchd'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['lower_bound'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['upper_bound'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
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

        Blockly.Cpp['reverse'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            if (type === "內建陣列") {
                return `reverse(${name}, ${name} + ${name}.size())\n`;
            } else {
                return `reverse(${name}.begin(), ${name}.end())\n`;
            }
        }
        // time
        Blockly.Cpp['get_current_timestamp'] = function(block) {
            return 'time_t currentTime = time(nullptr);\n';
        };

        Blockly.Cpp['calculate_time_difference'] = function(block) {
            var endTime = Blockly.Cpp.valueToCode(block, 'END_TIME', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var startTime = Blockly.Cpp.valueToCode(block, 'START_TIME', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'double diff = difftime(' + endTime + ', ' + startTime + ');\n';
        };

        Blockly.Cpp['convert_to_local_time'] = function(block) {
            var timestamp = Blockly.Cpp.valueToCode(block, 'TIMESTAMP', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm* localTime = localtime(&' + timestamp + ');\n';
        };

        Blockly.Cpp['convert_to_utc_time'] = function(block) {
            var timestamp = Blockly.Cpp.valueToCode(block, 'TIMESTAMP', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm* utcTime = gmtime(&' + timestamp + ');\n';
        };

        Blockly.Cpp['format_time_string'] = function(block) {
            var timeStruct = Blockly.Cpp.valueToCode(block, 'TIME_STRUCT', Blockly.Cpp.ORDER_ATOMIC) || 'tm';
            var format = block.getFieldValue('FORMAT') || '%Y-%m-%d %H:%M:%S';
            return 'char buffer[80];\nstrftime(buffer, sizeof(buffer), "' + format + '", &' + timeStruct + ');\n';
        };

        Blockly.Cpp['set_time_structure'] = function(block) {
            var year = Blockly.Cpp.valueToCode(block, 'YEAR', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var month = Blockly.Cpp.valueToCode(block, 'MONTH', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var day = Blockly.Cpp.valueToCode(block, 'DAY', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var hour = Blockly.Cpp.valueToCode(block, 'HOUR', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var minute = Blockly.Cpp.valueToCode(block, 'MINUTE', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var second = Blockly.Cpp.valueToCode(block, 'SECOND', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm timeStruct = {};\n' +
                'timeStruct.tm_year = ' + year + ' - 1900;\n' +
                'timeStruct.tm_mon = ' + month + ' - 1;\n' +
                'timeStruct.tm_mday = ' + day + ';\n' +
                'timeStruct.tm_hour = ' + hour + ';\n' +
                'timeStruct.tm_min = ' + minute + ';\n' +
                'timeStruct.tm_sec = ' + second + ';\n';
        };

        Blockly.Cpp['read_time_structure_member'] = function(block) {
            var timeStruct = Blockly.Cpp.valueToCode(block, 'TIME_STRUCT', Blockly.Cpp.ORDER_ATOMIC) || 'tm';
            var member = block.getFieldValue('MEMBER') || 'tm_year';
            return timeStruct + '.' + member + '\n';
        };

        Blockly.Cpp['get_current_local_time'] = function(block) {
            return 'time_t currentTime = time(nullptr);\ntm* localTime = localtime(&currentTime);\n';
        };

        Blockly.Cpp['get_current_utc_time'] = function(block) {
            return 'time_t currentTime = time(nullptr);\ntm* utcTime = gmtime(&currentTime);\n';
        };

        // iomanip
        // setbase
        Blockly.Cpp['setbase'] = function(block) {
            var code = `setbase(${block.getFieldValue('carry')})`;
            return [code, 1]
        };

        Blockly.Cpp['setprecision'] = function(block) {
            var code = '';
            if (choice = block.getFieldValue('choice') === 'sig_figs') {
                code += 'fixed << ';
            }
            code += `setprecision(${Blockly.Cpp.valueToCode(block, 'number', 1)})`
            return [code, 1];
        };

        Blockly.Cpp['setw'] = function(block) {
            var code = `setw(${Blockly.Cpp.valueToCode(block, 'number', 1)})`;
            return [code, 1];
        };

        Blockly.Cpp['setfill'] = function(block) {
            var code = `setfill(${Blockly.Cpp.valueToCode(block, 'number', 1)})`;
            return [code, 1];
        };

        Blockly.Cpp['define_bitset'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            var bitset_size = Blockly.Cpp.valueToCode(block, 'bitset_size', 1);
            var bitset_content = Blockly.Cpp.valueToCode(block, 'bitset_content', 1) || '';
            if (bitset_size.startsWith('(') && bitset_size.endsWith(')')) {
                bitset_size = bitset_size.slice(1, -1);
            }
            var code = `bitset<${bitset_size}>${bitset_name}`;
            if (bitset_content !== '') {
                if (bitset_content.startsWith('(') && bitset_content.endsWith(')')) {
                    bitset_content = bitset_content.slice(1, -1);
                }
                code += bitset_content;
            }
            return code + ';\n';
        };

        Blockly.Cpp['bitset[i]'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos.startsWith('(') && pos.endsWith(')')) {
                pos = pos.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            var code = `${bitset_name}[${pos}] = ${value}`;
            return [code, 1];
        };

        Blockly.Cpp['bitset_set'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.set()`, 1];
        };

        Blockly.Cpp['bitset_reset'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.reset()`, 1];
        };

        Blockly.Cpp['bitset_size'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.size()`, 1];
        };

        Blockly.Cpp['bitset_count'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.count()`, 1];
        };

        Blockly.Cpp['bitset_all'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.all()`, 1];
        };

        Blockly.Cpp['bitset_any'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.any()`, 1];
        };

        Blockly.Cpp['bitset_none'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.none()`, 1];
        };

        //stack
        Blockly.Cpp['stack_push'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return stack_name + ".push(" + element + ");\n";
        };

        Blockly.Cpp['stack_push_range'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return stack_name + ".push_range(" + element + ");\n";
        };

        Blockly.Cpp['stack_pop'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return stack_name + ".pop();\n";
        };

        Blockly.Cpp['stack_emplace'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return stack_name + ".emplace(" + element + ");\n";
        };
        Blockly.Cpp['stack_top'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return [`${stack_name}.top()`, 1];
        };

        Blockly.Cpp['stack_swap'] = function(block) {
            var stack_name1 = block.getFieldValue('stack_name1');
            var stack_name2 = block.getFieldValue('stack_name2');
            return `${stack_name1}.swap(${stack_name2});\n`;
        };

        Blockly.Cpp['stack_size'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return [`${stack_name}.size()`, 1];
        };

        Blockly.Cpp['stack_empty'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return [`${stack_name}.empty()`, 1];
        };

        //queue
        Blockly.Cpp['queue_push'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return queue_name + ".push(" + element + ");\n";
        };

        Blockly.Cpp['queue_pop'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            return queue_name + ".pop();\n";
        };

        Blockly.Cpp['queue_emplace'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return queue_name + ".emplace(" + element + ");\n";
        };

        Blockly.Cpp['queue_front'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            return [`${queue_name}.front()`, 1];
        };

        Blockly.Cpp['queue_size'] = function(block) {
            var queue_name = block.getFieldValue('queue_name') || '';
            return [`${queue_name}.size()`, 1];
        }

        Blockly.Cpp['queue_empty'] = function(block) {
            var queue_name = block.getFieldValue('queue_name') || '';
            return [`${queue_name}.empty()`, 1];
        }

        Blockly.Cpp['queue_swap'] = function(block) {
            var queue_name1 = block.getFieldValue('queue_name1');
            var queue_name2 = block.getFieldValue('queue_name2');
            return `${queue_name1}.swap(${queue_name2});\n`;
        };

        Blockly.Cpp['queue_push_range'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return queue_name + ".push_range(" + element + ");\n";
        };

        // deque
        Blockly.Cpp['deque_push_back'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var number = Blockly.Cpp.valueToCode(block, 'number', 1) || '';
            if (number.startsWith('(') && number.endsWith(')')) {
                number = number.slice(1, -1);
            }
            return deque_name + ".push_back(" + number + ");\n";
        };

        Blockly.Cpp['deque_emplace_back'] = function(block) {
            var name = block.getFieldValue('NAME');
            var num = block.getFieldValue('number');
            return code = name + ".emplace_back(" + num + ");\n";
        };

        Blockly.Cpp['deque_append_range'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return deque_name + ".append_range(" + element + ");\n";
        };

        Blockly.Cpp['deque_pop_back'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return deque_name + ".pop_back();\n";
        };

        Blockly.Cpp['deque_push_front'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var number = Blockly.Cpp.valueToCode(block, 'number', 1) || '';
            if (number.startsWith('(') && number.endsWith(')')) {
                number = number.slice(1, -1);
            }
            return deque_name + ".push_front(" + number + ");\n";
        };
        
        Blockly.Cpp['deque_emplace_front'] = function(block) {
            var name = block.getFieldValue('NAME');
            var num = block.getFieldValue('number');
            return code = name + ".emplace_front(" + num + ");\n";
        };
        
        Blockly.Cpp['deque_prepend_range'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return deque_name + ".prepend_range(" + element + ");\n";
        };
        
        Blockly.Cpp['deque_pop_front'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return deque_name + ".pop_front();\n";
        };

        Blockly.Cpp['deque_insert'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1) | '0';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
           if (pos === 0) {
                return `${deque_name}.insert(${deque_name}.begin(), ${value});\n`
            }   
            return `${deque_name}.insert(${deque_name}.begin()+${pos}, ${value});\n`;
        }

        Blockly.Cpp['deque_insert_range'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1) | 0;
            var array = Blockly.Cpp.valueToCode(block, 'array', 1);
            if (array.startsWith('(') && value.endsWith(')')) {
                array = array.slice(1, -1);
            }
            if (pos === 0) {
                return `${deque_name}.insert_range(${deque_name}.begin(), ${value});\n`
            }   
            return `${deque_name}.insert_range(${deque_name}.begin()+${pos}, ${value});\n`;
        }

        Blockly.Cpp['deque_erase'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
             if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            if (pos === '0') {
                 return `${deque_name}.erase(${deque_name}.begin(), ${value});\n`;
            } else {
                if (pos.startsWith('(') && pos.endsWith(')')) {
                    pos = pos.slice(1, -1);
                }
            }
            return `${deque_name}.erase(${deque_name}.begin()+${pos}, ${value});\n`;
        }

        Blockly.Cpp['deque_swap'] = function(block) {
            var deque_name1 = block.getFieldValue('deque_name1');
            var deque_name2 = block.getFieldValue('deque_name2');
            return `${deque_name1}.swap(${deque_name2});\n`;
        };

        Blockly.Cpp['deque_oeprate[]'] = function(block){
            var deque_name = block.getFieldValue('deque_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            if (pos.startsWith('(') && pos.endsWith(')')) {
                pos = pos.slice(1, -1);
            }
            var code = `${deque_name}[${pos}]`;
            return [code, 1];
        }

        Blockly.Cpp['deque_front'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return [`${deque_name}.front()`, 1];
        };

        Blockly.Cpp['deque_back'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return [`${deque_name}.back()`, 1];
        };

        Blockly.Cpp['deque_clear'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return deque_name + ".clear();\n";
        };

        Blockly.Cpp['deque_size'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return [`${deque_name}.size()`, 1];
        }

        Blockly.Cpp['deque_empty'] = function(block) {
            var deque_name = block.getFieldValue('deque_name');
            return [`${deque_name}.empty()`, 1];
        }

        Blockly.Cpp['deque_begin'] = function(block) {
            var deque_name = block.getFieldValue('deque_name') || '';
            return [`${deque_name}.begin()`, 1];
        }

        Blockly.Cpp['deque_end'] = function(block) {
            var deque_name = block.getFieldValue('deque_name') || '';
            return [`${deque_name}.end()`, 1];
        }

        Blockly.Cpp['deque_rbegin'] = function(block) {
            var deque_name = block.getFieldValue('deque_name') || '';
           return [`${deque_name}.rbegin()`, 1];
        }

        Blockly.Cpp['deque_rend'] = function(block) {
            var deque_name = block.getFieldValue('deque_name') || '';
            return [`${deque_name}.rend()`, 1];
        }

        //priority_queue
        Blockly.Cpp['priority_queue_push'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return priority_queue_name + ".push(" + element + ");\n";
        };

        Blockly.Cpp['priority_queue_pop'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            return priority_queue_name + ".pop();\n";
        };

        Blockly.Cpp['priority_queue_emplace'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return priority_queue_name + ".emplace(" + element + ");\n";
        };


        Blockly.Cpp['priority_queue_top'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name') || "";
            return [`${priority_queue_name}.top()`, 1];
        };

        Blockly.Cpp['priority_queue_size'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name') || '';
            return [`${priority_queue_name}.size()`, 1];
        };

        Blockly.Cpp['priority_queue_empty'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name') || '';
            return [`${priority_queue_name}.empty()`, 1];
        };

        Blockly.Cpp['priority_queue_swap'] = function(block) {
            var priority_queue_name1 = block.getFieldValue('priority_queue_name1');
            var priority_queue_name2 = block.getFieldValue('priority_queue_name2');
            return `${priority_queue_name1}.swap(${priority_queue_name2});\n`;
        };

        Blockly.Cpp['priority_queue_push_range'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return priority_queue_name + ".push_range(" + element + ");\n";
        };

        Blockly.Cpp['char_bit'] = function() {
            return 'CHAR_BIT';  
        };
        
        Blockly.Cpp['schar_min'] = function() {
            return 'SCHAR_MIN';  
        };
        
        Blockly.Cpp['schar_max'] = function() {
            return 'SCHAR_MAX';  
        };
        
        Blockly.Cpp['uchar_max'] = function() {
            return 'UCHAR_MAX';  
        };
        
        Blockly.Cpp['char_min'] = function() {
            return 'CHAR_MIN'; 
        };
        
        Blockly.Cpp['char_max'] = function() {
            return 'CHAR_MAX'; 
        };
                                                                              
        Blockly.Cpp['mb_len_max'] = function() {
            return 'MB_LEN_MAX'; 
        };
        
        Blockly.Cpp['int_min'] = function() {
            return 'INT_MIN';  
        };
        
        Blockly.Cpp['int_max'] = function() {
            return 'INT_MAX';  
        };
        
        Blockly.Cpp['uint_max'] = function() {
            return 'UINT_MAX';
        };
        
        Blockly.Cpp['llong_min'] = function() {
            return 'LLONG_MIN';  
        };
        
        Blockly.Cpp['llong_max'] = function() {
            return 'LLONG_MAX';  
        };
        
        Blockly.Cpp['ullong_max'] = function() {
            return 'ULLONG_MAX'; 
        };

        //ios
        Blockly.Cpp['boost_ios_sync'] = function(block) {
            return 'ios::sync_with_stdio(0);\n';
        };

        Blockly.Cpp['boost_cin_cout_tie'] = function(block) {
            return 'cin.tie(0); cout.tie(0);\n';
        };

        Blockly.Cpp['cin.eof'] = function(block) {
            return ['cin.eof()', 1];
        };

        Blockly.Cpp['define_sstream'] = function(block) {
            var sstream_name = block.getFieldValue('sstream_name');
            var sstream_content = Blockly.Cpp.valueToCode(block, 'sstream_content', 1) || '';
            var code = `stringstream ${sstream_name}`;
            if (sstream_content) {
                if (sstream_content.startsWith('(') && sstream_content.endsWith(')')) {
                    sstream_content = sstream_content.slice(1, -1);
                }
                code += `(${sstream_content})`;
            }
            return code + ';\n';
        };

        Blockly.Cpp['sstream_>>'] = function(block){
            var var1 = Blockly.Cpp.valueToCode(block, 'var1', 1);
            var var2 = Blockly.Cpp.valueToCode(block, 'var2', 1);
            return `${var1} >> ${var2}`;
        };

        Blockly.Cpp['sstream_<<'] = function(block){
            var var1 = Blockly.Cpp.valueToCode(block, 'var1', 1);
            var var2 = Blockly.Cpp.valueToCode(block, 'var2', 1);
            return `${var1} << ${var2}`;
        };

        Blockly.Cpp['llabs_block'] = function(block) {
            return [`llabs(${Blockly.Cpp.valueToCode(block, 'value', 1) || '0'})`, 1];
        }

        //functional
        Blockly.Cpp['greater'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`greater<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`greater<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];
        }

        Blockly.Cpp['less'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`less<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`less<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];
        }

        Blockly.Cpp['equal_to'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`equal_to<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`equal_to<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];        }

        Blockly.Cpp['not_equal_to'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`not_equal_to<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`not_equal_to<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];
        }
        
        Blockly.Cpp['greater_equal'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`greater_equal<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`greater_equal<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];        }

        Blockly.Cpp['less_equal'] = function(block) {
            if (block.getFieldValue('func') === "TRUE") 
                return [`less_equal<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>()`, 1];
            return [`less_equal<${Blockly.Cpp.valueToCode(block, 'TYPE', 1).slice(1, -1)}>`, 1];
        }

        Blockly.Cpp['bind'] = function(block) {
            var func = Blockly.Cpp.valueToCode(block, 'func', 1);
            var param = Blockly.Cpp.valueToCode(block, 'param', 1);
            if (func.startsWith('(') && func.endsWith(')')) {
                func = func.slice(1, -1);
            }
            
            if (param.startsWith('(') && param.endsWith(')')) {
                param = param.slice(1, -1);
            }
            return [`bind(${func}, ${param})`, 1];
        }

        Blockly.Cpp['placeholder'] = function(block){
            return [`placeholder::_${block.getFieldValue('number')}`, 1]
        }