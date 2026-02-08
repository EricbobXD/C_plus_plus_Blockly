const Cpp = Blockly.Cpp;
Blockly.Blocks["main_block"] = {
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
    Cpp.forBlock["main_block"] = function(block) {
        var define_code = Cpp.statementToCode(block, "DEFINES");
        var statements_body = Cpp.statementToCode(block, "DO");

        define_code = define_code.replace(/^  /gm, "");
        statements_body = statements_body.replace(/^ {2}/gm, "    ");

        return `#include <bits/stdc++.h>\nusing namespace std;\n${define_code}\nint main() {\n${statements_body}\n    return 0;\n}`;
    };
    
Blockly.Blocks["new_block"] = {  
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
                block.appendValueInput("val")
                    .setCheck("Number")
                    .appendField("指定值")
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!valueChecked && block.getInput("val")) {
                block.removeInput("val", true);
            }

            // 動態新增 / 移除 iterator 輸入
            if (arrayChecked && !block.getInput("array_content")) {
                block.appendValueInput("sizes2")
                    .setCheck("Number")
                    .appendField("陣列大小")
                    .setAlign(Blockly.ALIGN_LEFT);
                block.appendValueInput("array_content")
                    .setCheck("Array")
                    .appendField("陣列內容")
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!arrayChecked && block.getInput("array_content")) {
                block.removeInput("array_content", true);
                block.removeInput("sizes2", true);
            }
        });
    },

    // 儲存積木狀態
    mutationToDom: function() {
        var container = document.createElement("mutation");
        container.setAttribute("value", this.getFieldValue("value"));
        container.setAttribute("array", this.getFieldValue("array"));
    return container;
    },

    // 讀取積木狀態
    domToMutation: function(xmlElement) {
        this.setFieldValue(xmlElement.getAttribute("value"), "value");
        this.setFieldValue(xmlElement.getAttribute("array"), "array");

        const valueChecked  = xmlElement.getAttribute("value") === "TRUE";
        const arrayChecked    = xmlElement.getAttribute("array") === "TRUE";

        // 確保 inputsInline 為 false，避免縮成一行
        this.setInputsInline(false);

        if (valueChecked && !this.getInput("val")) {
            this.appendValueInput("val")
                .setCheck("Number")
                .appendField("指定值")
                .setAlign(Blockly.ALIGN_LEFT);
        }

        if (arrayChecked && !this.getInput("array_content")) {
            this.appendValueInput("sizes2")
                .setCheck("Number")
                .appendField("陣列大小")
                .setAlign(Blockly.ALIGN_LEFT);
            this.appendValueInput("array_content")
                .setCheck("Array")
                .appendField("陣列內容")
                .setAlign(Blockly.ALIGN_LEFT);
        }
    }
};  

    Cpp.forBlock["new_block"] = function(block){
        var type = block.getFieldValue("TYPE");
        var value = block.getFieldValue("value") === "TRUE";
        var array = block.getFieldValue("array") === "TRUE";
        var code = `new ${type}`;
        if (value){
            var val = Cpp.valueToCode(block, "val", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (val.startsWith("(") && val.endsWith(")")){
                val = val.slice(1, -1);
            }
            code += `(${val})`;
        }else if (array){
            var sizes = Cpp.valueToCode(block, "sizes2", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            var content = Cpp.valueToCode(block, "array_content", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            if (sizes.startsWith("(") && sizes.endsWith(")")){
                sizes = sizes.slice(1, -1);
            }
            if (content.startsWith("(") && content.endsWith(")")){
                content = content.slice(1, -1);
            }
            code += `[${sizes}](${content})`;
        }
        return [code, Cpp.ORDER_ATOMIC];
    }

Blockly.Blocks["switch_block"] = {
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
        this.setMutator(new Blockly.icons.MutatorIcon(["case_mutator"], this));
        this.setColour("#00abea");
        this.setTooltip("Switch 判斷式");
        this.setHelpUrl("");
        this.caseCount_ = 0;
    },

    saveConnections: function(containerBlock) {
        let clauseBlock = containerBlock.nextConnection.targetBlock();
        let i = 0;
        while (clauseBlock && clauseBlock.type === "case_mutator") {
            const valueInput = this.getInput("CASE" + i);
            const stmtInput = this.getInput("CASE_DO" + i);
            clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
            clauseBlock.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            i++;
        }

        // 預設段也記錄（optional，通常你沒動態移除 DEFAULT）
        const defaultInput = this.getInput("DEFAULT");
        if (defaultInput) {
            containerBlock.defaultStatementConnection_ = defaultInput.connection.targetConnection;
        }
    },

    mutationToDom: function() {
        if (!this.caseCount_) return null;
        const container = Blockly.utils.xml.createElement("mutation");
        container.setAttribute("caseCount", this.caseCount_);
        return container;
    },

    domToMutation: function(xmlElement) {
        this.caseCount_ = parseInt(xmlElement.getAttribute("caseCount"), 10) || 0;
        this.updateShape_();
    },

    decompose: function(workspace) {
        const containerBlock = workspace.newBlock("switch_mutator");
        containerBlock.initSvg();
        containerBlock.setFieldValue(this.caseCount_, "CASE_COUNT");

        let connection = containerBlock.nextConnection;
        for (let i = 0; i < this.caseCount_; i++) {
            const caseBlock = workspace.newBlock("case_mutator");
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
            if (clauseBlock.type === "case_mutator") {
                connections.push(clauseBlock.valueConnection_);
                statementConnections.push(clauseBlock.statementConnection_);
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }

        this.caseCount_ = connections.length;
        this.updateShape_();

        for (let i = 0; i < this.caseCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "CASE" + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, "CASE_DO" + i);
        }

        // 預設段（如有）
        if (containerBlock.defaultStatementConnection_) {
            Blockly.Mutator.reconnect(containerBlock.defaultStatementConnection_, this, "DEFAULT");
        }
    },

    updateShape_: function() {
        // Remove old inputs
        for (let i = 0; this.getInput("CASE" + i); i++) {
            this.removeInput("CASE" + i);
            this.removeInput("CASE_DO" + i);
        }

        // Add new inputs
        for (let i = 0; i < this.caseCount_; i++) {
            this.appendValueInput("CASE" + i)
                .setCheck(null)
                .appendField("狀況 " + (i + 1) + " 執行")
                .appendField("break")
                .appendField(new Blockly.FieldCheckbox("TRUE"), `CHECKBOX${i}`)
            this.appendStatementInput("CASE_DO" + i)
                .setCheck(null)
                .appendField("動作");
        }
    }
};

Blockly.Blocks["switch_mutator"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("切換的狀況數量")
            .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "CASE_COUNT");
        this.setNextStatement(true);
        this.setColour("#00abea");
    }
};

Blockly.Blocks["case_mutator"] = {
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

    Cpp.forBlock["switch_block"] = function(block) {
        const switchValue = Cpp.valueToCode(block, "SWITCH_VALUE", Cpp.ORDER_ATOMIC) || "()";
        let code = `switch ${switchValue} {\n`;

        for (let i = 0; i < block.caseCount_; i++) {
            const caseValue = Cpp.valueToCode(block, "CASE" + i, Cpp.ORDER_ATOMIC) || "0";
            var caseCode = Cpp.statementToCode(block, "CASE_DO" + i);
            const checkbox2 = block.getFieldValue(`CHECKBOX${i}`) === "TRUE";
            if (caseValue.startsWith("(") && caseValue.endsWith(")")){
                caseValue = caseValue.slice(1, -1);
            }
            caseCode = caseCode.replace(/^ {2}/gm, "        ");
            code += `    case ${caseValue}:\n${caseCode}`;
            if (checkbox2){
                code += "        break\n";
            }else{
                code += "\n";
            }
        }

        var defaultCode = Cpp.statementToCode(block, "DEFAULT");
        const checkbox1 = block.getFieldValue("CHECKBOX-1") === "TRUE";
        defaultCode = defaultCode.replace(/^ {2}/gm, "       ");
        code += `    default:\n ${defaultCode}`;
        if (checkbox1){
            code += "        break\n}\n";
        }else{
            code += "\n}\n";
        }
        return code;
    };

Blockly.Blocks["string_generic"] = {
    init: function() {
        this.setColour("#FF8C00");
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(["string_generic_item"], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = "+"; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement("mutation");
        container.setAttribute("items", this.itemCount_);
        container.setAttribute("operator", this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute("items"), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute("operator") || "+";
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock("string_generic_container");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock("string_generic_item");
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock("STACK");
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput("ADD" + i)) {
            this.removeInput("ADD" + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput("ADD" + j).setCheck("String");
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

Blockly.Blocks["string_generic_container"] = {
    init: function() {
        this.setColour("#FF8C00");
        this.appendDummyInput().appendField("輸入");
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks["string_generic_item"] = {
    init: function() {
        this.setColour("#FF8C00");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks["math_generic"] = {
    init: function() {
        this.setColour("#277ace");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(["math_generic_item"], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = "+"; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement("mutation");
        container.setAttribute("items", this.itemCount_);
        container.setAttribute("operator", this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute("items"), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute("operator") || "+";
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock("math_generic_container");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock("math_generic_item");
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock("STACK");
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput("ADD" + i)) {
            this.removeInput("ADD" + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput("ADD" + j).setCheck("Number");
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

Blockly.Blocks["math_generic_container"] = {
    init: function() {
        this.setColour("#277ace");
        this.appendDummyInput().appendField("數字輸入");
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks["math_generic_item"] = {
    init: function() {
        this.setColour("#277ace");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks["bitwise_generic"] = {
    init: function() {
        this.setColour("#ababab");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(["bitwise_generic_item"], this));
        this.itemCount_ = 2; // 預設至少兩個輸入欄位
        this.operator_ = "&"; // 預設運算符為加法
        this.updateShape_();
    },
    mutationToDom: function() {
        const container = document.createElement("mutation");
        container.setAttribute("items", this.itemCount_);
        container.setAttribute("operator", this.operator_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute("items"), 10)); // 確保最少兩個
        this.operator_ = xmlElement.getAttribute("operator") || "&";
        this.updateShape_();
    },
    decompose: function(workspace) {
        const containerBlock = workspace.newBlock("bitwise_generic_container");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock("bitwise_generic_item");
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock("STACK");
        const connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = bitwise.max(2, connections.length); // 確保最少兩個
        this.updateShape_();
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
        }
    },
    updateShape_: function() {
        // 移除多餘的輸入
        let i = 0;
        while (this.getInput("ADD" + i)) {
            this.removeInput("ADD" + i);
            i++;
        }

        // 添加所需的輸入
        for (let j = 0; j < this.itemCount_; j++) {
            const input = this.appendValueInput("ADD" + j).setCheck("Number");
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

Blockly.Blocks["bitwise_generic_container"] = {
    init: function() {
        this.setColour("#ababab");
        this.appendDummyInput().appendField("數字輸入");
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks["bitwise_generic_item"] = {
    init: function() {
        this.setColour("#ababab");
        this.appendDummyInput().appendField("項目");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};


function defineMathOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks["math_generic"], {
        init: function() {
            Blockly.Blocks["math_generic"].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}

function defineStringOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks["string_generic"], {
        init: function() {
            Blockly.Blocks["string_generic"].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}

function defineBitwiseOperatorBlock(type, operatorSymbol) {
    Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks["bitwise_generic"], {
        init: function() {
            Blockly.Blocks["bitwise_generic"].init.call(this);
            this.setOperator(operatorSymbol);
        }
    });
}
        
//math
    defineMathOperatorBlock("math_plus", "+");
    defineMathOperatorBlock("math_multiply", "*");
    defineMathOperatorBlock("math_percent", "%");
    defineMathOperatorBlock("math_divide", "/");
    defineMathOperatorBlock("math_subtract", "-");
    
    //bool
    defineBitwiseOperatorBlock("bitwise_and", "&");
    defineBitwiseOperatorBlock("bitwise_or", "|");
    defineBitwiseOperatorBlock("bitwise_xor", "^");
    defineBitwiseOperatorBlock("bitwise_left", ">>");
    defineBitwiseOperatorBlock("bitwise_right", "<<");
    defineBitwiseOperatorBlock("bitwise_not", "~");

    //string
    defineStringOperatorBlock("string_plus", "+");
    defineStringOperatorBlock("string_commas", ",");
    defineStringOperatorBlock("string_cin", ">>");
    defineStringOperatorBlock("string_cout", "<<");

    Cpp.forBlock["math_plus"] = function(block) {
        return math_generateCode(block, " + ");
    };

    Cpp.forBlock["math_multiply"] = function(block) {
        return math_generateCode(block, " * ");
    };

    Cpp.forBlock["math_percent"] = function(block) {
        return math_generateCode(block, " % ");
    };

    Cpp.forBlock["math_divide"] = function(block) {
        return math_generateCode(block, " / ");
    };

    Cpp.forBlock["math_subtract"] = function(block) {
        return math_generateCode(block, " - ");
    };

    Cpp.forBlock["string_plus"] = function(block) {
        return string_generateCode(block, " + ");
    };

    Cpp.forBlock["string_commas"] = function(block) {
        return string_generateCode(block, " , ");
    };

    Cpp.forBlock["string_cout"] = function(block) {
        return string_generateCode(block, " << ");
    };

    Cpp.forBlock["string_cin"] = function(block) {
        return string_generateCode(block, " >> ");
    };

    Cpp.forBlock["bitwise_and"] = function(block) {
        return bitwise_generateCode(block, " & ");
    };

    Cpp.forBlock["bitwise_or"] = function(block) {
        return bitwise_generateCode(block, " | ");
    };

    Cpp.forBlock["bitwise_xor"] = function(block) {
        return bitwise_generateCode(block, " ^ ");
    };

    Cpp.forBlock["bitwise_left"] = function(block) {
        return bitwise_generateCode(block, " >> ");
    };

    Cpp.forBlock["bitwise_right"] = function(block) {
        return bitwise_generateCode(block, " << ");
    };

    Cpp.forBlock["bitwise_not"] = function(block) {
        return bitwise_generateCode(block, " ~ ");
    };

function math_generateCode(block, operator) {
    let code = "";
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, "ADD" + i, Cpp.ORDER_ATOMIC) || "";
        if (argument.startsWith("(") && argument.endsWith(")")) {
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
    let code = "";
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, "ADD" + i, Cpp.ORDER_ATOMIC) || "";
        if (argument.startsWith("(") && argument.endsWith(")")) {
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
    let code = "";
    for (let i = 0; i < block.itemCount_; i++) {
        let argument = Cpp.valueToCode(block, "ADD" + i, Cpp.ORDER_ATOMIC) || "0";
        if (argument.startsWith("(") && argument.endsWith(")")) {
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
    Cpp.forBlock["data_type"] = function(block) {
        return [`${block.getFieldValue("TYPE")}`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["void"] = function(){
        return ["void", Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["struct_type"] = function(block) {
        return [`struct ${block.getFieldValue("TYPE")}`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["class_type"] = function(block) {
        return [`class ${block.getFieldValue("TYPE")}`, Cpp.ORDER_ATOMIC];
    }


    // data
    Cpp.forBlock["add_line"] = function(block) {
        return `\n`;
    };

    Cpp.forBlock["tab"] = function(block) {
        return [`  `, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["string"] = function(block) {
        var text = block.getFieldValue("TEXT") || "";
        return [`"${text}"`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["char"] = function(block) {
        var text = block.getFieldValue("TEXT") || "";
        return [`"${text}"`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["comment_block"] = function(block) {
        return `// ${block.getFieldValue("COMMENT")}\n`;
    };

    Cpp.forBlock["number"] = function(block) {
        return [block.getFieldValue("NUMBER") || "0", Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["abs_block"] = function(block) {
        return [`abs(${Cpp.valueToCode(block, "value", 1) || "0"})`, Cpp.ORDER_ATOMIC];
    }

    // stop
    Cpp.forBlock["break_block"] = function() {
        return "break;\n";
    };

    Cpp.forBlock["continue_block"] = function() {
        return "continue;\n";
    };

    Cpp.forBlock["return_block"] = function(block) {
        var returnValue = Cpp.valueToCode(block, "RETURN_VALUE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (returnValue.startsWith("(") && returnValue.endsWith(")")) {
            returnValue = returnValue.slice(1, -1);
        }

        if (returnValue === "") {
            return `return\n;`
        } else {
            return `return ${returnValue};\n`;
        }
    };

    // condition
    Cpp.forBlock["while_block"] = function(block) {
        var condition = Cpp.valueToCode(block, "CONDITION", 1) || `(false)`;
        var statements_do = Cpp.statementToCode(block, "DO");

        var code = "while " + condition + " {\n" + statements_do + "\n}\n";
        return code;
    };

    Cpp.forBlock["for_block"] = function(block) {
        var init = Cpp.valueToCode(block, "INIT", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var condition = Cpp.valueToCode(block, "CONDITION", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var_cal = Cpp.valueToCode(block, "var_cal", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var statements_body = Cpp.statementToCode(block, "DO")
        statements_body = statements_body.replace(/^ {2}/gm, "    ");

        if (init.startsWith("(") && init.endsWith(")")) {
            init = init.slice(1, -1);
        }
        if (condition.startsWith("(") && condition.endsWith(")")) {
            condition = condition.slice(1, -1);
        }
        if (var_cal.startsWith("(") && var_cal.endsWith(")")) {
            var_cal = var_cal.slice(1, -1);
        }
        return `for (${init}; ${condition}; ${var_cal}){\n${statements_body}}\n`;
    };

    Cpp.forBlock["for_range_block"] = function(block) {
        var VAR = Cpp.valueToCode(block, "VAR", Cpp.ORDER_ATOMIC) || "";
        var container = Cpp.valueToCode(block, "container", Cpp.ORDER_ATOMIC) || "";
        var statements_body = Cpp.statementToCode(block, "DO");

        VAR = VAR.replace(/^\(?|\)?$/g, "");
        container = container.replace(/^\(?|\)?$/g, "");
        statements_body = statements_body.replace(/^ {2}/gm, "    ");

        return `for (auto ${VAR}: ${container}) {\n ${statements_body}}\n`;
    };

    Cpp.forBlock["var_cal"] = function(block) {
        var Value1 = Cpp.valueToCode(block, "A", 1) || "0";
        var Value2 = Cpp.valueToCode(block, "B", 1) || "0";

        var operator = block.getFieldValue("OPERATOR");
        var operatorSymbol;

        switch (operator) {
            case "ADD_EQUALS":
                operatorSymbol = "+=";
                break;
            case "SUBTRACT_EQUALS":
                operatorSymbol = "-=";
                break;
            case "MUTIPLY_EQUALS":
                operatorSymbol = "*=";
                break;
            case "DEVIDE_EQUALS":
                operatorSymbol = "/=";
                break;
            default:
                operatorSymbol = "+=";
        }

        if (Value1.startsWith("(") && Value1.endsWith(")")) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith("(") && Value2.endsWith(")")) {
            Value2 = Value2.slice(1, -1);
        }

        code = `(${Value1} ${operatorSymbol} ${Value2})`;

        return [code, Cpp.ORDER_ATOMIC];
    };
    // define variable
    Cpp.forBlock["def_var"] = function(block) {
        var unsigned = block.getFieldValue("unsigned");
        var type = block.getFieldValue("TYPE");
        var var_name = block.getFieldValue("var_name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        code = "";
        if (unsigned === "unsigned") {
            code += "unsigned ";
        }

        code += type + " " + var_name;
        if (value.startsWith("(") && value.endsWith(")")) {
            value = value.slice(1, -1);
        }
        if (value !== "") {
            code += ` = ${value}`;
        }
        return [code, Cpp.ORDER_ATOMIC];
    };
    // input and output
    Cpp.forBlock["cin_block"] = function(block) {
        var value_var = Cpp.valueToCode(block, "VARIABLES", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (value_var.startsWith("(") && value_var.endsWith(")")) {
            value_var = value_var.slice(1, -1);
        }

        return `cin >> ${value_var};\n`;
    };

    Cpp.forBlock["cout_block"] = function(block) {
        var argument = Cpp.valueToCode(block, "INPUT", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (argument.startsWith("(") && argument.endsWith(")")) {
            argument = argument.slice(1, -1);
        }

        if (argument.endsWith(";\n")) {
            argument = argument.slice(0, -2);
        }

        if (isNaN(argument) && !argument.startsWith("") && !argument.endsWith("")) {
            argument = `${argument}`;
        }

        if (block.getFieldValue("ENDL_OPTION") === "endl") {
            return `cout << ${argument} << endl;\n`;
        } else {
            return `cout << ${argument};\n`;
        }
    };

    // operation
    Cpp.forBlock["logic_not"] = function(block) {
        var Value = Cpp.valueToCode(block, "A", 1) || "true";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }
        return [`!${Value}`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["logic_operators"] = function(block) {
        var Value1 = Cpp.valueToCode(block, "A", 1) || "0";
        var Value2 = Cpp.valueToCode(block, "B", 1) || "0";

        var operator = block.getFieldValue("OPERATOR");
        var operatorSymbol;

        switch (operator) {
            case "EQUAL":
                operatorSymbol = "==";
                break;
            case "NOT_EQUAL":
                operatorSymbol = "!=";
                break;
            case "GREATER":
                operatorSymbol = ">";
                break;
            case "LESS":
                operatorSymbol = "<";
                break;
            case "GREATER_EQUAL":
                operatorSymbol = ">=";
                break;
            case "LESS_EQUAL":
                operatorSymbol = "<=";
                break;
            default:
                operatorSymbol = "==";
        }

        if (Value1.startsWith("(") && Value1.endsWith(")")) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith("(") && Value2.endsWith(")")) {
            Value2 = Value2.slice(1, -1);
        }

        if (["<", ">", "=", "==", ">=", "<=", "&", "|", "^"].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (["<", ">", "=", "==", ">=", "<=", "&", "|", "^"].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }

        code = `${Value1} ${operatorSymbol} ${Value2}`;
        return [code, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["or_and_xor"] = function(block) {
        var Value1 = Cpp.valueToCode(block, "A", 1) || "0";
        var Value2 = Cpp.valueToCode(block, "B", 1) || "0";

        var operator = block.getFieldValue("OPERATOR");
        var operatorSymbol;

        switch (operator) {
            case "AND":
                operatorSymbol = "&&";
                break;
            case "OR":
                operatorSymbol = "||";
                break;
            case "XOR":
                operatorSymbol = "^^";
                break;
            default:
                operatorSymbol = "&&";
        }

        if (Value1.startsWith("(") && Value1.endsWith(")")) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith("(") && Value2.endsWith(")")) {
            Value2 = Value2.slice(1, -1);
        }

        if (["<", ">", "=", "==", ">=", "<=", "&&", "==", "||", "&", "|", "^"].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (["<", ">", "=", "==", ">=", "<=", "&&", "==", "||", "&", "|", "^"].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }
        code = `${Value1} ${operatorSymbol} ${Value2}`;
        return [code, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["var_calculate"] = function(block) {
        var Value1 = Cpp.valueToCode(block, "A", 1) || "0";
        var Value2 = Cpp.valueToCode(block, "B", 1) || "0";

        var operator = block.getFieldValue("OPERATOR");
        var operatorSymbol;

        switch (operator) {
            case "ADD_EQUALS":
                operatorSymbol = "+=";
                break;
            case "SUBTRACT_EQUALS":
                operatorSymbol = "-=";
                break;
            case "MUTIPLY_EQUALS":
                operatorSymbol = "*=";
                break;
            case "DEVIDE_EQUALS":
                operatorSymbol = "/=";
                break;
            case "MODULO_EQUALS":
                operatorSymbol = "%=";
                break;
            default:
                operatorSymbol = "+=";
        }

        if (Value1.startsWith("(") && Value1.endsWith(")")) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith("(") && Value2.endsWith(")")) {
            Value2 = Value2.slice(1, -1);
        }

        if (["&", "|", "^", "+", "-", "*", "/"].some(op => String(Value1).includes(op))) {
            Value1 = `(${Value1})`;
        }
        if (["&", "|", "^", "+", "-", "*", "/"].some(op => String(Value2).includes(op))) {
            Value2 = `(${Value2})`;
        }            

        code = `${Value1} ${operatorSymbol} ${Value2}`;

        return [code, Cpp.ORDER_ATOMIC];
    };

    // bool
    Cpp.forBlock["true"] = function() {
        return ["true", Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["false"] = function() {
        return ["false", Cpp.ORDER_ATOMIC];
    };


    Cpp.forBlock["define_block"] = function(block) {
        var name = block.getFieldValue("name");
        var func_name = block.getFieldValue("func_name");
        return `#define ${name} ${func_name}\n`;
    };

    Cpp.forBlock["typedef_block"] = function(block) {
        var type_name = block.getFieldValue("type_name");
        var name = block.getFieldValue("name");
        return `typedef ${type_name} ${name};\n`;
    };


    // useful things
    Cpp.forBlock["define_template"] = function(block) {
        var Var = Cpp.valueToCode(block, "var", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Var.startsWith("(") && Var.endsWith(")")) {
            Var = Var.slice(1, -1);
        }

        return `template <${Var}>\n`;
    };

    Cpp.forBlock["define_typename"] = function(block) {
        var Var = Cpp.valueToCode(block, "var", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Var.startsWith("(") && Var.endsWith(")")) {
            Var = Var.slice(1, -1);
        }

        return [`typename <${Var}>`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["define_using"] = function(block) {
        var Var = Cpp.valueToCode(block, "var", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var change_Var = block.getFieldValue("change_var") || "";

        if (Var.startsWith("(") && Var.endsWith(")")) {
            Var = Var.slice(1, -1);
        }


        return `using ${Var} ${change_Var};`;
    };

    Cpp.forBlock["define_namespace"] = function(block) {
        var var_name = block.getFieldValue("var");
        var code = Cpp.statementToCode(block, "statement").replace(/^ {2}/gm, "    ");
        
        return `namespce ${var_name} {\n${code}};`;
    }

    // Standard Library
    // math
    Cpp.forBlock["math_random"] = function(block) {
        var Value = Cpp.valueToCode(block, "RANGE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`rand() % ${Value};\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_floor"] = function(block) {
        var Value = Cpp.valueToCode(block, "X", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`floor(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_ceil"] = function(block) {
        var Value = Cpp.valueToCode(block, "X", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`ceil(${Value});\n`, , Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_tangent"] = function(block) {
        var Value = Cpp.valueToCode(block, "ANGLE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`tan(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_cosine"] = function(block) {
        var Value = Cpp.valueToCode(block, "ANGLE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`cos(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_sine"] = function(block) {
        var Value = Cpp.valueToCode(block, "ANGLE", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`sin(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_abs"] = function(block) {
        var Value = Cpp.valueToCode(block, "A", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`abs(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_sqrt"] = function(block) {
        var Value = Cpp.valueToCode(block, "X", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";

        if (Value.startsWith("(") && Value.endsWith(")")) {
            Value = Value.slice(1, -1);
        }

        return [`sqrt(${Value});\n`, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["math_calculate"] = function(block) {
        var Value1 = Cpp.valueToCode(block, "A", 1) || "0";
        var Value2 = Cpp.valueToCode(block, "B", 1) || "0";

        var operator = block.getFieldValue("OPERATOR");
        var operatorSymbol;

        switch (operator) {
            case "ADD":
                operatorSymbol = "+";
                break;
            case "SUBTRACT":
                operatorSymbol = "-";
                break;
            case "MUTIPLY":
                operatorSymbol = "*";
                break;
            case "DEVIDE":
                operatorSymbol = "/";
                break;
            case "DEVIDE_INT":
                operatorSymbol = "//";
                break;
            case "MODULO":
                operatorSymbol = "%";
                break;
            case "POWER":
                operatorSymbol = "^";
                break;
            default:
                operatorSymbol = "+";
        }

        if (Value1.startsWith("(") && Value1.endsWith(")")) {
            Value1 = Value1.slice(1, -1);
        }
        if (Value2.startsWith("(") && Value2.endsWith(")")) {
            Value2 = Value2.slice(1, -1);
        }

        let code;
        if (operator === "POWER") {
            code = `pow(${Value1}, ${Value2})`;
        } else {
            code = `(${Value1} ${operatorSymbol} ${Value2})`;
        }

        return [code, Cpp.ORDER_ATOMIC];
    };

    /* set 
    Cpp.forBlock["set_extract_value"] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.value`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["set_extract_is_value"] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.is_value`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["set_extract_release"] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.release`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["set_equal_range_first"] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.first`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["set_equal_range_second"] = function(block) {
        var Name = block.getFieldValue("Name");
        return [`${Name}.second`, Cpp.ORDER_ATOMIC];
    }
    */

    // algorithm
    Cpp.forBlock["sort"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `sort(${name}${start}, ${name}+${end})\n`;
        } else {
            return `sort(${name}.begin()${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock["max"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `*max_element(${name}+${start}, ${name}+${end})\n`;
        } else {
            return `*max_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock["min"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `*min_element(${name}+${start}, ${name}+${end})\n`;
        } else {
            return `*min_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
        }
    }

    Cpp.forBlock["find"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }
        if (value.startsWith("(") && value.endsWith(")")) {
            value = value.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `find(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `find(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock["binary_searchd"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }
        if (value.startsWith("(") && value.endsWith(")")) {
            value = value.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `binary_search(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `binary_search(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock["lower_bound"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }
        if (value.startsWith("(") && value.endsWith(")")) {
            value = value.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `lower_bound(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `lower_bound(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock["upper_bound"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        var value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var start = Cpp.valueToCode(block, "start", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var end = Cpp.valueToCode(block, "end", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        if (start.startsWith("(") && start.endsWith(")")) {
            start = start.slice(1, -1);
        }
        if (end.startsWith("(") && end.endsWith(")")) {
            end = end.slice(1, -1);
        }
        if (value.startsWith("(") && value.endsWith(")")) {
            value = value.slice(1, -1);
        }

        if (start === "0") {
            start = "";
        } else {
            start = "+" + start;
        }

        if (type === "內建陣列") {
            return `upper_bound(${name}${start}, ${name}+${end}, ${value})\n`;
        } else {
            return `upper_bound(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
        }
    }

    Cpp.forBlock["reverse"] = function(block) {
        var type = block.getFieldValue("TYPE");
        var name = block.getFieldValue("name");
        if (type === "內建陣列") {
            return `reverse(${name}, ${name} + ${name}.size())\n`;
        } else {
            return `reverse(${name}.begin(), ${name}.end())\n`;
        }
    };

    // iomanip
    // setbase
    Cpp.forBlock["setbase"] = function(block) {
        var code = `setbase(${block.getFieldValue("carry")})`;
        return [code, Cpp.ORDER_ATOMIC]
    };

    Cpp.forBlock["setprecision"] = function(block) {
        var code = "";
        if (choice = block.getFieldValue("choice") === "sig_figs") {
            code += "fixed << ";
        }
        code += `setprecision(${Cpp.valueToCode(block, "number", 1)})`
        return [code, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["setw"] = function(block) {
        var code = `setw(${Cpp.valueToCode(block, "number", 1)})`;
        return [code, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["setfill"] = function(block) {
        var code = `setfill(${Cpp.valueToCode(block, "number", 1)})`;
        return [code, Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["char_bit"] = function() {
        return "CHAR_BIT";  
    };
    
    Cpp.forBlock["schar_min"] = function() {
        return "SCHAR_MIN";  
    };
    
    Cpp.forBlock["schar_max"] = function() {
        return "SCHAR_MAX";  
    };
    
    Cpp.forBlock["uchar_max"] = function() {
        return "UCHAR_MAX";  
    };
    
    Cpp.forBlock["char_min"] = function() {
        return "CHAR_MIN"; 
    };
    
    Cpp.forBlock["char_max"] = function() {
        return "CHAR_MAX"; 
    };
                                                                            
    Cpp.forBlock["mb_len_max"] = function() {
        return "MB_LEN_MAX"; 
    };
    
    Cpp.forBlock["int_min"] = function() {
        return "INT_MIN";  
    };
    
    Cpp.forBlock["int_max"] = function() {
        return "INT_MAX";  
    };
    
    Cpp.forBlock["uint_max"] = function() {
        return "UINT_MAX";
    };
    
    Cpp.forBlock["llong_min"] = function() {
        return "LLONG_MIN";  
    };
    
    Cpp.forBlock["llong_max"] = function() {
        return "LLONG_MAX";  
    };
    
    Cpp.forBlock["ullong_max"] = function() {
        return "ULLONG_MAX"; 
    };

    //ios
    Cpp.forBlock["boost_ios_sync"] = function(block) {
        return "ios::sync_with_stdio(0);\n";
    };

    Cpp.forBlock["boost_cin_cout_tie"] = function(block) {
        return "cin.tie(0); cout.tie(0);\n";
    };

    Cpp.forBlock["cin.eof"] = function(block) {
        return ["cin.eof()", Cpp.ORDER_ATOMIC];
    };

    Cpp.forBlock["define_sstream"] = function(block) {
        var sstream_name = block.getFieldValue("sstream_name");
        var sstream_content = Cpp.valueToCode(block, "sstream_content", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var code = `stringstream ${sstream_name}`;
        if (sstream_content) {
            if (sstream_content.startsWith("(") && sstream_content.endsWith(")")) {
                sstream_content = sstream_content.slice(1, -1);
            }
            code += `(${sstream_content})`;
        }
        return code + ";\n";
    };

    Cpp.forBlock["sstream_>>"] = function(block){
        var var1 = Cpp.valueToCode(block, "var1", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var2 = Cpp.valueToCode(block, "var2", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${var1} >> ${var2}`;
    };

    Cpp.forBlock["sstream_<<"] = function(block){
        var var1 = Cpp.valueToCode(block, "var1", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        var var2 = Cpp.valueToCode(block, "var2", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        return `${var1} << ${var2}`;
    };

    Cpp.forBlock["llabs_block"] = function(block) {
        return [`llabs(${Cpp.valueToCode(block, "value", 1) || "0"})`, Cpp.ORDER_ATOMIC];
    }

    Cpp.forBlock["if_block"] = function(block) {
        const ifValue = Cpp.valueToCode(block, "IF_VALUE", Cpp.ORDER_ATOMIC) || "false";
        let code = `if ${ifValue} {\n`;
        code += Cpp.statementToCode(block, "IF_DO").replace(/^ {2}/gm, "    ");

        for (let i = 0; i < block.elifCount_; i++) {
            const elifValue = Cpp.valueToCode(block, "ELIF" + i, Cpp.ORDER_ATOMIC) || "false";
            code += `}\nelse if (${elifValue}) {\n`;
            code += Cpp.statementToCode(block, "ELIF_DO" + i).replace(/^ {2}/gm, "    ");
        }

        if (block.hasElse_) {
            code += "}\nelse{\n";
            code += Cpp.statementToCode(block, "ELSE").replace(/^ {2}/gm, "    ");
        }

        code += "}\n";
        return code;
    };


