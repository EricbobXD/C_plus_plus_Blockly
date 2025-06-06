// 📁 category.var_ptr_ref_memory.js

Blockly.Blocks['define_variable'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 %3 變數名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定", "no"],
                        ["固定", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個變數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['var_equal'] = {
    init: function() {
        this.jsonInit({
            "message0": "變數 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "VAR_NAME",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予變數值",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['get_var'] = {
    init: function() {
        this.jsonInit({
            "message0": "變數 %1",
            "args0": [{
                "type": "field_input",
                "name": "VAR_NAME",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "取得一個變數的資料",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['def_var'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 變數名稱: %3 = %4",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
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
                    "type": "field_input",
                    "name": "var_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "output": null,
            "tooltip": "定義一個變數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['nullptr'] = {
    init: function() {
        this.jsonInit({
            "message0": "nullptr",
            "output": "Pointer",
            "colour": "#DABD00",
            "tooltip": "空指標的常值",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['define_pointer'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 %3 %4指標名稱: %5 = %6",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const_ptr",
                    "options": [
                        ["不固定指標位置", "no"],
                        ["固定指標位置", "const_ptr"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_dropdown",
                    "name": "const_var",
                    "options": [
                        ["不固定變數大小", "no"],
                        ["固定變數大小", "const_var"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個指標",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['def_ptr'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 %3 %4指標名稱: %5 = %6",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const_ptr",
                    "options": [
                        ["不固定指標位置", "no"],
                        ["固定指標位置", "const_ptr"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_dropdown",
                    "name": "const_var",
                    "options": [
                        ["不固定變數大小", "no"],
                        ["固定變數大小", "const_var"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "output": true,
            "tooltip": "定義一個指標",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['define_reference'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 %3 位置名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定變數位置", "no"],
                        ["固定變數位置", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "宣告一個位置",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['def_ref'] = {
    init: function() {
        this.jsonInit({
            "message0": "宣告 %1 %2 %3 位置名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定變數位置", "no"],
                        ["固定變數位置", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "output": true,
            "tooltip": "宣告一個位置",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['ptr_equal'] = {
    init: function() {
        this.jsonInit({
            "message0": "指標 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ptr_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予指標新的值或算式",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['ref_equal'] = {
    init: function() {
        this.jsonInit({
            "message0": "位置 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ref_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予位置新的值或算式",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['get_ptr'] = {
    init: function() {
        this.jsonInit({
            "message0": "指標 %1",
            "args0": [{
                "type": "field_input",
                "name": "ptr_name",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "獲取指標的值",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['get_ref'] = {
    init: function() {
        this.jsonInit({
            "message0": "位置 %1",
            "args0": [{
                "type": "field_input",
                "name": "ref_name",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "獲取位置的值",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['ptr_of'] = {
    init: function() {
        this.jsonInit({
            "message0": "指標 %1 -> %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ptr_name"
                },
                {
                    "type": "input_value",
                    "name": "of"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "指標指向物件",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['ptr_to'] = {
    init: function() {
        this.jsonInit({
            "message0": "* 變數 %1",
            "args0": [{
                "type": "field_input",
                "name": "var_name"
            }],
            "colour": "#DABD00",
            "output": null,
            "tooltip": "*變數",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['delete_block'] = {
    init: function() {
        this.jsonInit({
            "message0": "刪除動態記憶體資料型態: %1, 名稱: %2, 類型: %3",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE1",
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
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE2",
                    "options": [
                        ["數值", ""],
                        ["陣列", "[]"]
                    ]
                }
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "",
            "helpurl": ""
        });
    }
};

Blockly.Blocks['new_block'] = {
    init: function() {
        this.jsonInit({
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
            "inputsInline": false
        });

        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;
            const valueChecked = block.getFieldValue("value") === "TRUE";
            const arrayChecked = block.getFieldValue("array") === "TRUE";
            block.setInputsInline(false);
            if (valueChecked && arrayChecked) alert("指定值跟指定陣列內容不能一起使用喔😘");
            if (valueChecked && !block.getInput("val")) block.appendValueInput("val").setCheck("Number").appendField("指定值").setAlign(Blockly.ALIGN_LEFT);
            else if (!valueChecked && block.getInput("val")) block.removeInput("val", true);
            if (arrayChecked && !block.getInput("array_content")) {
                block.appendValueInput("sizes2").setCheck("Number").appendField("陣列大小").setAlign(Blockly.ALIGN_LEFT);
                block.appendValueInput("array_content").setCheck("Array").appendField("陣列內容").setAlign(Blockly.ALIGN_LEFT);
            } else if (!arrayChecked && block.getInput("array_content")) {
                block.removeInput("array_content", true);
                block.removeInput("sizes2", true);
            }
        });
    },
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('value', this.getFieldValue('value'));
        container.setAttribute('array', this.getFieldValue('array'));
        return container;
    },
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('value'), 'value');
        this.setFieldValue(xmlElement.getAttribute('array'), 'array');
        const valueChecked = xmlElement.getAttribute('value') === "TRUE";
        const arrayChecked = xmlElement.getAttribute('array') === "TRUE";
        this.setInputsInline(false);
        if (valueChecked && !this.getInput("val")) this.appendValueInput("val").setCheck("Number").appendField("指定值").setAlign(Blockly.ALIGN_LEFT);
        if (arrayChecked && !this.getInput("array_content")) {
            this.appendValueInput("sizes2").setCheck("Number").appendField("陣列大小").setAlign(Blockly.ALIGN_LEFT);
            this.appendValueInput("array_content").setCheck("Array").appendField("陣列內容").setAlign(Blockly.ALIGN_LEFT);
        }
    }
};

// define variable
Blockly.Cpp['define_variable'] = function(block) {
    var Const = block.getFieldValue('const');
    var unsigned = block.getFieldValue('unsigned');
    var type = Blockly.Cpp.valueToCode(block, 'type', 1) || '';
    var var_name = block.getFieldValue('var_name');
    var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
    code = '';
    if (Const === 'const') {
        code += 'const ';
    }
    if (unsigned === 'unsigned') {
        code += 'unsigned ';
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

// pointer 
Blockly.Cpp['nullptr'] = function() {
    return ['nullptr', 1];
};

Blockly.Cpp['define_pointer'] = function(block) {
    var Const_ptr = block.getFieldValue('const_ptr');
    var Const_var = block.getFieldValue('const_var');
    var unsigned = block.getFieldValue('unsigned');
    var type = block.getFieldValue('TYPE');
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
    var type = block.getFieldValue('TYPE');
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
    var type = block.getFieldValue('TYPE');
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
    var type = block.getFieldValue('TYPE');
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

Blockly.Cpp['delete_block'] = function(block) {
    var type1 = block.getFieldValue('TYPE1');
    var var_name = block.getFieldValue('var_name');
    var type2 = block.getFieldValue('TYPE2');
    return `delete ${type1} ${var_name}${type2};`
}

Blockly.Cpp['new_block'] = function(block) {
    var type = block.getFieldValue('TYPE');
    var value = block.getFieldValue('value') === 'TRUE';
    var array = block.getFieldValue('array') === 'TRUE';
    var code = `new ${type}`;
    if (value) {
        var val = Blockly.Cpp.valueToCode(block, 'val', 1);
        if (val.startsWith('(') && val.endsWith(')')) {
            val = val.slice(1, -1);
        }
        code += `(${val})`;
    } else if (array) {
        var sizes = Blockly.Cpp.valueToCode(block, 'sizes2', 1);
        var content = Blockly.Cpp.valueToCode(block, 'array_content', 1);
        if (sizes.startsWith('(') && sizes.endsWith(')')) {
            sizes = sizes.slice(1, -1);
        }
        if (content.startsWith('(') && content.endsWith(')')) {
            content = content.slice(1, -1);
        }
        code += `[${sizes}](${content})`;
    }
    return [code, 1];
}
