        Blockly.Blocks['if_block'] = {
            init: function () {
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
                        const inputIf = this.getInput('ELIF' + i);
                        clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
                        i++;
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
                let elifConnections = [];
                let elifCount = 0;
                let hasElse = false;
                
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'elif_mutator':
                            elifConnections[elifCount] = clauseBlock.valueConnection_;
                            elifCount++;
                            break;
                        case 'else_mutator':
                            hasElse = true;
                            break;
                        default:
                            throw TypeError('Unknown block type: ' + clauseBlock.type);
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
                
                this.elifCount_ = elifCount;
                this.hasElse_ = hasElse;
                this.updateShape_();
                
                for (let i = 0; i < this.elifCount_; i++) {
                    if (elifConnections[i]) {
                        Blockly.Mutator.reconnect(elifConnections[i], this, 'ELIF' + i);
                    }
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
            let code = `if (${ifValue}) {\n`;
            code += Blockly.Cpp.statementToCode(block, 'IF_DO');
            
            for (let i = 0; i < block.elifCount_; i++) {
                const elifValue = Blockly.Cpp.valueToCode(block, 'ELIF' + i, Blockly.Cpp.ORDER_ATOMIC) || 'false';
                code += `} else if (${elifValue}) {\n`;
                code += Blockly.Cpp.statementToCode(block, 'ELIF_DO' + i);
            }
            
            if (block.hasElse_) {
                code += '} else {\n';
                code += Blockly.Cpp.statementToCode(block, 'ELSE');
            }
            
            code += '}\n';
            return code;
        };

        Blockly.Blocks['switch_block'] = {
            init: function() {
                this.setPreviousStatement(true);
                this.appendValueInput("SWITCH_VALUE")
                    .setCheck(null)
                    .appendField("切換");
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
                    const input = this.getInput('CASE' + i);
                    clauseBlock.valueConnection_ = input && input.connection.targetConnection;
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                    i++;
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
                let connections = [];
                
                while (clauseBlock) {
                    if (clauseBlock.type === 'case_mutator') {
                        connections.push(clauseBlock.valueConnection_);
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
                
                this.caseCount_ = connections.length;
                this.updateShape_();
                
                for (let i = 0; i < this.caseCount_; i++) {
                    if (connections[i]) {
                        Blockly.Mutator.reconnect(connections[i], this, 'CASE' + i);
                    }
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
                        .appendField("狀況 " + (i + 1) + " 執行");
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
            }
        };

        Blockly.Cpp['switch_block'] = function(block) {
            const switchValue = Blockly.Cpp.valueToCode(block, 'SWITCH_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '()';
            let code = `switch ${switchValue} {\n`;

            for (let i = 0; i < block.caseCount_; i++) {
                const caseValue = Blockly.Cpp.valueToCode(block, 'CASE' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
                const caseCode = Blockly.Cpp.statementToCode(block, 'CASE_DO' + i);
                code += `  case ${caseValue}:\n${caseCode}    break;\n`;
            }

            const defaultCode = Blockly.Cpp.statementToCode(block, 'DEFAULT');
            code += `  default:\n${defaultCode}    break;\n`;
            code += '}\n';
            return code;
        };

        Blockly.Blocks['string_generic'] = {
            init: function () {
                this.setColour("#71b700");
                this.setOutput(true, "String");
                this.setInputsInline(true);
                this.setMutator(new Blockly.Mutator(['string_generic_item']));
                this.itemCount_ = 2; // 預設至少兩個輸入欄位
                this.operator_ = '+'; // 預設運算符為加法
                this.updateShape_();
            },
            mutationToDom: function () {
                const container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                container.setAttribute('operator', this.operator_);
                return container;
            },
            domToMutation: function (xmlElement) {
                this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
                this.operator_ = xmlElement.getAttribute('operator') || '+';
                this.updateShape_();
            },
            decompose: function (workspace) {
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
            compose: function (containerBlock) {
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
            updateShape_: function () {
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
            setOperator: function (operator) {
                this.operator_ = operator;
                this.updateShape_();
            }
        };

        Blockly.Blocks['string_generic_container'] = {
            init: function () {
                this.setColour("#71b700");
                this.appendDummyInput().appendField("輸入");
                this.appendStatementInput('STACK');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['string_generic_item'] = {
            init: function () {
                this.setColour("#71b700");
                this.appendDummyInput().appendField("項目");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['math_generic'] = {
            init: function () {
                this.setColour("#277ace");
                this.setOutput(true, "Number");
                this.setInputsInline(true);
                this.setMutator(new Blockly.Mutator(['math_generic_item']));
                this.itemCount_ = 2; // 預設至少兩個輸入欄位
                this.operator_ = '+'; // 預設運算符為加法
                this.updateShape_();
            },
            mutationToDom: function () {
                const container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                container.setAttribute('operator', this.operator_);
                return container;
            },
            domToMutation: function (xmlElement) {
                this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
                this.operator_ = xmlElement.getAttribute('operator') || '+';
                this.updateShape_();
            },
            decompose: function (workspace) {
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
            compose: function (containerBlock) {
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
            updateShape_: function () {
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
            setOperator: function (operator) {
                this.operator_ = operator;
                this.updateShape_();
            }
        };

        Blockly.Blocks['math_generic_container'] = {
            init: function () {
                this.setColour("#277ace");
                this.appendDummyInput().appendField("數字輸入");
                this.appendStatementInput('STACK');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['math_generic_item'] = {
            init: function () {
                this.setColour("#277ace");
                this.appendDummyInput().appendField("項目");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.contextMenu = false;
            }
        };

        function createMathOperatorBlock(type, operatorSymbol) {
            Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['math_generic'], {
                init: function () {
                    Blockly.Blocks['math_generic'].init.call(this);
                    this.setOperator(operatorSymbol);
                }
            });
        }

        function createStringOperatorBlock(type, operatorSymbol) {
            Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['string_generic'], {
                init: function () {
                    Blockly.Blocks['string_generic'].init.call(this);
                    this.setOperator(operatorSymbol);
                }
            });
        }

        createMathOperatorBlock('math_plus', '+');
        createMathOperatorBlock('math_multiply', '*');
        createMathOperatorBlock('math_percent', '%');
        createMathOperatorBlock('math_devide', '/');
        createMathOperatorBlock('math_subtract', '-');
        createMathOperatorBlock('number_comma', ',');

        createStringOperatorBlock('string_plus', '+');
        createStringOperatorBlock('string_commas', ',');
        createStringOperatorBlock('string_cin', '>>');
        createStringOperatorBlock('string_cout', '<<');

        Blockly.Cpp = Blockly.Cpp || {};

        Blockly.Cpp['math_plus'] = function (block) {
            return math_generateCode(block, ' + ');
        };

        Blockly.Cpp['math_multiply'] = function (block) {
            return math_generateCode(block, ' * ');
        };
        
        Blockly.Cpp['math_percent'] = function (block) {
            return math_generateCode(block, ' % ');
        };

        Blockly.Cpp['math_devide'] = function (block) {
            return math_generateCode(block, ' / ');
        };

        Blockly.Cpp['math_subtract'] = function (block) {
            return math_generateCode(block, ' - ');
        };

        Blockly.Cpp['number_comma'] = function (block) {
            return math_generateCode(block, ', ');
        };
        
        Blockly.Cpp['string_plus'] = function (block) {
            return string_generateCode(block, ' + ');
        };

        Blockly.Cpp['string_commas'] = function (block) {
            return string_generateCode(block, ' , ');
        };

        Blockly.Cpp['string_cout'] = function (block) {
            return string_generateCode(block, ' << ');
        };

        Blockly.Cpp['string_cin'] = function (block) {
            return string_generateCode(block, ' >> ');
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

        // struct
        Blockly.Cpp['def_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var def_var = Blockly.Cpp.statementToCode(block, 'def_var');
            return `struct ${struct_name} {\n${def_var}};`;
        }

        Blockly.Cpp['get_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var var_name = block.getFieldValue('var_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1);
            if (size){
                return `${struct_name} ${var_name}[${size}];`
            }
            return `${struct_name} ${var_name};`;
        };

        // class
        Blockly.Cpp['def_class'] = function(block) {
            var class_name = block.getFieldValue('class_name');
            var public = Blockly.Cpp.statementToCode(block, 'public') || '';
            var private = Blockly.Cpp.statementToCode(block, 'private') || '';

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
            if (size){
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
        
        Blockly.Cpp['label'] = function(block) {
            var text = block.getFieldValue('TEXT') || '';
            return [`"${text}"`, 1];
        };

        Blockly.Cpp['comment_block'] = function(block) {
            return `// ${block.getFieldValue('COMMENT')}\n`;
        };

        Blockly.Cpp['number'] = function(block) {
            return [block.getFieldValue('NUMBER') || '0', 1];
        };

        // initializaiton
        Blockly.Cpp['boost_ios_sync'] = function(block) {
            return 'ios::sync_with_stdio(0);\n';
        };

        Blockly.Cpp['boost_cin_cout_tie'] = function(block) {
            return 'cin.tie(0); cout.tie(0);\n';
        };

        Blockly.Cpp['main_block'] = function(block) {
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO');
            return `int main() {\n${statements_body}\n  return 0;\n}`;
        };

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
                return `return;`
            }
            else {
                return `return ${returnValue};\n`;
            }
        };

        // condition
        Blockly.Cpp['while_block'] = function(block) {
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1) || `((false))`;
            var statements_do = Blockly.Cpp.statementToCode(block, 'DO');

            if (condition.startsWith('(') && condition.endsWith(')')) {
                condition = condition.slice(1, -1);
            }

            var code = 'while ' + condition + ' {\n' + statements_do + '\n}\n';
            return code;
        };

         Blockly.Cpp['for_block'] = function(block) {
            var init = Blockly.Cpp.valueToCode(block, 'INIT', 1);
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1);
            var var_cal = Blockly.Cpp.valueToCode(block, 'var_cal', 1);
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO')

            if (init.startsWith('(') && init.endsWith(')')) {
                init = init.slice(1, -1);
            }
            if (condition.startsWith('(') && condition.endsWith(')')) {
                condition = condition.slice(1, -1);
            }
            if (var_cal.startsWith('(') && var_cal.endsWith(')')) {
                var_cal = var_cal.slice(1, -1);
            }
            return `for (${init}; ${condition}; ${var_cal}){\n${statements_body}\n}\n`;
        };

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
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += type + ' ' + var_name;
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += ` = ${value}`;
            }
            code += ';\n';
            return code;
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

            return `!${Value};\n`;
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

            code = `(${Value1} ${operatorSymbol} ${Value2})`;
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
                    operatorSymbol = '^';
                    break;
                case 'NOT':
                    operatorSymbol = '!';
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

            code = `(${Value1} ${operatorSymbol} ${Value2})`;
            return [code, 1];
        };

        Blockly.Cpp['var_caculacte'] = function(block) {
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

            code = `(${Value1} ${operatorSymbol} ${Value2})`;

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
        
        Blockly.Cpp['declare_pointer'] = function(block) {
            var Const_ptr = block.getFieldValue('const_ptr');
            var Const_var = block.getFieldValue('const_var');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const_ptr'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += `${type}* `;
            if (Const_var === 'const_var'){
                code += 'const '; 
            }
            
            code += var_name + ' ';

            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
        };
        
        Blockly.Cpp['declare_reference'] = function(block) {
            var Const_ptr = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            if (type === 'no'){
                code += `&${var_name} `;
            }
            else {
                code += `${type} &${var_name} `;
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
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

        // define variable
        Blockly.Cpp['declare_variable'] = function(block) {
            var Const = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const === 'const'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += type + ' ' + var_name;
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
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
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value){
                return `${funcName}(${value});\n`;
            }
            else{
                return funcName + '\n';
            }
            
        };

        Blockly.Cpp['function_definition'] = function(block) {
            var Type = block.getFieldValue('TYPE');
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = Blockly.Cpp.valueToCode(block, 'expression', 1);
            if (data.startsWith('(') && data.endsWith(')')) {
                    data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            if (expression.startsWith('(') && expression.endsWith(')')) {
                expression = expression.slice(1, -1);
            }

            return `${Type} ${funcName}(${data}) {\n${content}  return ${expression};\n}\n`;
        };
        
        Blockly.Cpp['function_definition_void'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = block.getFieldValue('expression');
            if (data.startsWith('(') && data.endsWith(')')) {
                    data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }

            if (expression === 'no'){
                return `void ${funcName}(${data}) {\n${content}\n}\n`;
            }
            else{
                return `void ${funcName}(${data}) {\n${content}  return;\n}\n`;
            }
        };

        Blockly.Cpp['lambda'] = function(block) {
            var capture = block.getFieldValue('captures');
            var VAR = Blockly.Cpp.valueToCode(block, 'VAR', 1);
            var statement = Blockly.Cpp.statementToCode(block, 'DO') || '';
            if (VAR.startsWith('(') && VAR.endsWith(')')) {
                VAR = VAR.slice(1, -1);
            }
            return `[${capture}](${VAR}){\n${statement}\n}`;
        };
        
        Blockly.Cpp['define_block'] = function(block) {
            var name = block.getFieldValue('name');
            var func_name = block.getFieldValue('func_name');
            return `#define ${name} ${func_name}\n`;
        };

        Blockly.Cpp['typedef_block'] = function(block) {
            var type_name = block.getFieldValue('type_name');
            var name = block.getFieldValue('name');
            return `typedef ${type_name} ${name}\n`;
        };

        Blockly.Cpp['include_std_block'] = function(block) {
            return `#include <bits/stdc++.h>\n`;
        };

        Blockly.Cpp['include_pbds_block'] = function(block) {
            return `#include <bits/extc++.h>\n`;
        };

        Blockly.Cpp['std_space_block'] = function(block) {
            return `using namespace std;\n`;
        };

        Blockly.Cpp['pbds_space_block'] = function(block) {
            return `using namespace __gun_pbds;\n`;
        };

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

        Blockly.Cpp['math_caculacte'] = function(block) {
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
            var vec_name = block.getFieldValue('vec_name');
            var number = Blockly.Cpp.valueToCode(block, 'number', 1) || '';
            if (number.startsWith('(') && number.endsWith(')')) {
                number = number.slice(1, -1);
            }
            return vec_name + ".push_back(" + number + ");\n"; 
        };

        Blockly.Cpp['vector_pop_back'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".pop_back();\n";
        };

        Blockly.Cpp['vector_emplace_back'] = function(block) {
            var name = block.getFieldValue('NAME');
            var num = block.getFieldValue('number');
            return code = name + ".emplace_back(" + num + ");\n";
        };

        Blockly.Cpp['vec_begin'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.begin()';
            return [code, 1];
        }

        Blockly.Cpp['vec_end'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + 'end()';
            return [code, 1];
        }

        Blockly.Cpp['vec_rbegin'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.rbegin()';
            return [code, 1];
        }

        Blockly.Cpp['vec_rend'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.rend()';
            return [code, 1];
        }

        Blockly.Cpp['vector_insert'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1) | '0';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos === '0'){
                pos = '';
            }
            else{
                if (pos.startsWith('(') && pos.endsWith(')')){
                    pos = '+' + pos.slice(1, -1);
                }
            }
            if (value.startsWith('(') && value.endsWith(')')){
                    value = value.slice(1, -1);
                    
            }
            
            return `${vec_name}.insert(${vec_name}.begin()${pos}, ${value})\n`; 
        }

        Blockly.Cpp['vector_erase'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos === '0'){
                pos = '';
            }
            else{
                if (pos.startsWith('(') && pos.endsWith(')')){
                    pos = pos.slice(1, -1);
                }
            }
            if (value.startsWith('(') && value.endsWith(')')){
                    value = value.slice(1, -1);
            }
            
            return `${vec_name}.insert(${vec_name}.begin()+${pos}, ${value})\n`; 
        }

        Blockly.Cpp['vector_clear'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".clear();\n";
        };

        Blockly.Cpp['vector_size'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".size();\n";
        }

        Blockly.Cpp['vector_empty'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var code = vec_name + ".empty\n";
            return [code, 1];
        }
        
        // array
        Blockly.Cpp['create_array'] = function(block) {
            var type = block.getFieldValue('TYPE');
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

        Blockly.Cpp['array[i]'] = function(block) {
            var array_name = block.getFieldValue('array_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            if (pos.startsWith('(') && pos.endsWith(')')){
                pos = pos.slice(1, -1);
            }
            var code = `${array_name}[${pos}]`;
            return [code, 1];
        }

        // map
        Blockly.Cpp['create_map'] = function(block) {
            var type1 = block.getFieldValue('TYPE1');
            var type2 = block.getFieldValue('TYPE2');
            var map_name = block.getFieldValue('map_name');
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);
            var code = `map<${type1}, ${type2}>${map_name}\n`;
            if (content){
                if (content.startsWith('(') && content.endsWith(')')){
                    content = content.slice(1, -1);
                }
                code += `(${content})`;
            }
            code += ';\n';
            return code;
        }

        Blockly.Cpp['map_insert'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var first = Blockly.Cpp.valueToCode(block, 'first', 1) || '';
            var second = Blockly.Cpp.valueToCode(block, 'second', 1) || '';
            if (first.startsWith('(') && first.endsWith(')')){
                first = first.slice(1, -1);
            }
            if (second.startsWith('(') && second.endsWith(')')){
                second = second.slice(1, -1);
            }
            return `${map_name}.insert({${first}, ${second}})\n`;
        }

        Blockly.Cpp['map[i]'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var map_key = block.getFieldValue('map_key');
            var map_value = block.getFieldValue('map_value');
            return `${map_name}[${map_key}] = ${map_value}\n`;
        }        

        Blockly.Cpp['map_begin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.begin()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_end'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + 'end()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_rbegin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.rbegin()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_rend'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.rend()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_clear'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return map_name + ".clear();\n";
        };

        Blockly.Cpp['map_size'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return map_name + ".size();";
        }

        Blockly.Cpp['map_empty'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var code = map_name + ".empty";
            return [code, 1];
        }

        Blockly.Cpp['map_first'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            if (key.startsWith('(') && key.endsWith(')')){
                key = key.slice(1, -1);
            }
            var code = `${map_name}[${key}].first`;
            return [code, 1];
        }
        
        Blockly.Cpp['map_second'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            if (key.startsWith('(') && key.endsWith(')')){
                key = key.slice(1, -1);
            }
            var code = `${map_name}[${key}].second`;
            return [code, 1];
        }

        Blockly.Cpp['map_find'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `${map_name}.find(${value})`;
            return [code, 1];
        }


        // pair
        Blockly.Cpp['create_pair'] = function(block) {
            var type1 = block.getFieldValue('TYPE1');
            var type2 = block.getFieldValue('TYPE2');
            var pair_name = block.getFieldValue('pair_name');
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);
            var code = `pair<${type1}, ${type2}>${pair_name}`;
            if (content){
                if (content.startsWith('(') && content.endsWith(')')){
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
            if (key.startsWith('(') && key.endsWith(')')){
                key = key.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `make_pair(${key}, ${value})`;
            return [code, 1];
        }
        // set
        Blockly.Cpp['create_set'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var set_name = block.getFieldValue('set_name');
            var set_size = Blockly.Cpp.valueToCode(block, 'set_size', 1) || '';
            var content = Blockly.Cpp.valueToCode(block, 'set_content', 1) || '';
            var code = `set<${type}>${set_name}\n`;
            if (set_size){
                if (set_size.startsWith('(') && set_size.endsWith(')')){
                    set_size = set_size.slice(1, -1);
                }
                code += '(' + set_size;
            }
            if (content){
                if (content.startsWith('(') && content.endsWith(')')){
                    content = content.slice(1, -1);
                }
                if (set_size){
                    code += ' , ' + content;
                }
                else{
                    code += '(' + content;
                }
            }
            if (set_size || content){
                code += ')';
            }
            return code;
        }

        Blockly.Cpp['set_insert'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            return `${set_name}.insert(${value})\n`;
        }

        Blockly.Cpp['set_erase'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            return `${set_name}.insert(${value})\n`;
        }

        Blockly.Cpp['set_begin'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var code = set_name + '.begin()';
            return [code, 1];
        }

        Blockly.Cpp['set_end'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var code = set_name + 'end()';
            return [code, 1];
        }

        Blockly.Cpp['set_empty'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var code = set_name + ".empty\n";
            return [code, 1];
        }

        Blockly.Cpp['set_find'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `${set_name}.find(${value})\n`;
            return [code, 1];
        }

        // algorithm
        Blockly.Cpp['sort'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }
            
            if (type === "內建陣列"){
                return `sort(${name}${start}, ${name}+${end})\n`;
            }
            else{
                return `sort(${name}.begin()${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['max'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }

            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `*max_element(${name}+${start}, ${name}+${end})\n`;
            }
            else{
                return `*max_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['min'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `*min_element(${name}+${start}, ${name}+${end})\n`;
            }
            else{
                return `*min_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['find'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `find(${name}${start}, ${name}+${end}, ${value})\n`;
            }
            else{
                return `find(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
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
            if (choice = block.getFieldValue('choice') === 'sig_figs'){
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
            if (bitset_size.startsWith('(') && bitset_size.endsWith(')')){
                bitset_size = bitset_size.slice(1, -1);
            }
            var code = `bitset<${bitset_size}>${bitset_name}`;
            if (bitset_content !== ''){
                if (bitset_content.startsWith('(') && bitset_content.endsWith(')')){
                    bitset_content = bitset_content.slice(1, -1);
                }
                code += bitset_content;
            }  
            return code +';\n';
        };
        
        Blockly.Cpp['bitset[i]'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos.startsWith('(') && pos.endsWith(')')){
                pos = pos.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')){
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
        Blockly.Cpp['def_stack'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            var stack_type = block.getFieldValue('stack_type');
            var stack_content = Blockly.Cpp.valueToCode(block, 'stack_content', 1) || '';
            var code = `stack<${stack_type}>${stack_name}`;
            if (stack_content !== ''){
                if (stack_content.startsWith('(') && stack_content.endsWith(')')){
                    stack_content = stack_content.slice(1, -1);
                }
                code += stack_content;
            }  
            return code +';\n';
        };

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

         Blockly.Cpp['stack_top'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return stack_name + ".top();\n";
        };

        Blockly.Cpp['stack_swap'] = function(block) {
            var stack_name1 = block.getFieldValue('stack_name1');
            var stack_name2 = block.getFieldValue('stack_name2');
            return `${stack_name1}.swap(${stack_name2};`;
        };

        Blockly.Cpp['stack_size'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            return stack_name + ".size();\n";
        };

        Blockly.Cpp['stack_empty'] = function(block) {
            var stack_name = block.getFieldValue('stack_name');
            var code = stack_name + ".empty\n";
            return [code, 1];
        };

//queue
        Blockly.Cpp['def_queue'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            var queue_type = block.getFieldValue('queue_type');
            var queue_content = Blockly.Cpp.valueToCode(block, 'queue_content', 1) || '';
            var code = `queue<${queue_type}>${queue_name}`;
            if (queue_content !== ''){
                if (queue_content.startsWith('(') && queue_content.endsWith(')')){
                    queue_content = queue_content.slice(1, -1);
                }
                code += queue_content;
            }  
            return code +';\n';
        };
        
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
        
         Blockly.Cpp['queue_front'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            return queue_name + ".front();\n";
        };
        
        Blockly.Cpp['queue_size'] = function(block) {
            var queue_name = block.getFieldValue('queue_name') || '';
            return queue_name + ".size();\n";
        }
        
        Blockly.Cpp['queue_empty'] = function(block) {
            var queue_name = block.getFieldValue('queue_name') || '';
            var code = queue_name + ".empty\n";
            return [code, 1];
        }

        Blockly.Cpp['queue_swap'] = function(block) {
            var queue_name1 = block.getFieldValue('queue_name1');
            var queue_name2 = block.getFieldValue('queue_name2');
            return `${queue_name1}.swap(${queue_name2};`;
        };
        
        Blockly.Cpp['queue_push_range'] = function(block) {
            var queue_name = block.getFieldValue('queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return queue_name + ".push_range(" + element + ");\n";
        };

//priority_queue
        Blockly.Cpp['def_priority_queue'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var priority_queue_type = block.getFieldValue('priority_queue_type');
            var priority_queue_content = Blockly.Cpp.valueToCode(block, 'priority_queue_content', 1) || '';
            var code = `priority_queue<${priority_queue_type}>${priority_queue_name}`;
            if (priority_queue_content !== ''){
                if (priority_queue_content.startsWith('(') && priority_queue_content.endsWith(')')){
                    priority_queue_content = priority_queue_content.slice(1, -1);
                }
                code += priority_queue_content;
            }  
            return code +';\n';
        };
        
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
        
         Blockly.Cpp['priority_queue_front'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            return priority_queue_name + ".front();\n";
        };
        
        Blockly.Cpp['priority_queue_size'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name') || '';
            return priority_queue_name + ".size();\n";
        };
        
        Blockly.Cpp['priority_queue_empty'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name') || '';
            var code = priority_queue_name + ".empty\n";
            return [code, 1];
        };
        
        Blockly.Cpp['priority_queue_swap'] = function(block) {
            var priority_queue_name1 = block.getFieldValue('priority_queue_name1');
            var priority_queue_name2 = block.getFieldValue('priority_queue_name2');
            return `${priority_queue_name1}.swap(${priority_queue_name2};`;
        };
        
        Blockly.Cpp['priority_queue_push_range'] = function(block) {
            var priority_queue_name = block.getFieldValue('priority_queue_name');
            var element = Blockly.Cpp.valueToCode(block, 'element', 1) || '';
            if (element.startsWith('(') && element.endsWith(')')) {
                element = element.slice(1, -1);
            }
            return priority_queue_name + ".push_range(" + element + ");\n";
        };
        
        Blockly.Blocks['define_vector'] = {  
              init: function() {
                  this.jsonInit({
                      "type": "define_vector",
                      "message0": "資料型態 %1 , 名字: %2 , 大小: %3, 陣列: %4, 迭代器: %5",
                      "args0": [
                          {
                              "type": "field_dropdown",
                              "name": "TYPE",
                              "options": [
                                  ["整數", "int"],
                                  ["浮整數", "float"],
                                  ["雙重浮點數", "double"],
                                  ["字元", "char"],
                                  ["字串", "string"],
                                  ["更長的整數", "long long"]
                              ]
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
                      "previousStatement": null,
                      "nextStatement": null,
                      "tooltip": "創建一個 vector 陣列，vector 是會自動擴展容量的陣列",
                      "helpurl": "",
                      "inputsInline": false  // 確保預設排列方式為換行
                  });

        // 監聽積木變更
        this.setOnChange(function(event) {
            const block = this;
            if (!block) return;

            const sizeChecked  = block.getFieldValue("size") === "TRUE";
            const arrayChecked = block.getFieldValue("array") === "TRUE";
            const itChecked    = block.getFieldValue("it") === "TRUE";

            if (sizeChecked && itchecked){
                alert("大小跟迭代器不能一起使用喔😘");
            }

            if (arrayChecked && itchecked){
                alert("陣列不能跟迭代器不能一起使用喔😘")
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
            if (arrayChecked && !block.getInput("array")) {
                block.appendValueInput("array")
                    .setCheck("Array")
                    .appendField('陣列')
                    .setAlign(Blockly.ALIGN_LEFT);
            } else if (!arrayChecked && block.getInput("array")) {
                block.removeInput("array", true);
            }

            // 動態新增 / 移除 iterator 輸入
            if (itChecked && !block.getInput("iterator_name")) {
                block.appendDummyInput("iterator_name")
                    .appendField("輸入名稱: ")
                    .appendField(new Blockly.FieldTextInput('array2_name'), "array2_name");

                block.appendValueInput("begin")
                    .setCheck("Iterator")
                    .appendField("迭代器 開始: ")
                    .setAlign(Blockly.ALIGN_LEFT);

                block.appendValueInput("end")
                    .setCheck("Iterator")
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

        if (arrayChecked && !this.getInput("array")) {
            this.appendValueInput("array")
                .setCheck("Array")
                .appendField('陣列')
                .setAlign(Blockly.ALIGN_LEFT);
        }

        if (itChecked && !this.getInput("iterator_name")) {
            this.appendDummyInput("iterator_name")
                .appendField("輸入名稱: ")
                .appendField(new Blockly.FieldTextInput('array2_name'), "array2_name");

            this.appendValueInput("begin")
                .setCheck("Iterator")
                .appendField("迭代器 開始: ")
                .setAlign(Blockly.ALIGN_LEFT);

            this.appendValueInput("end")
                .setCheck("Iterator")
                .appendField("結束: ")
                .setAlign(Blockly.ALIGN_LEFT);
        }
    }
};
        Blockly.Cpp['define_vector'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var vec_name = block.getFieldValue('vec_name');
            var code = `vector<${type}>${vec_name}`;

            var size = block.getFieldValue('size') === "TRUE"
            var array = block.getFieldValue('array') === "TRUE"
            var it = block.getFieldValue('it') === "TRUE"

            if (size){
                var size_value = Blockly.Cpp.valueToCode(block, 'size', 1);
                if (size_value.startsWith('(') && size_value.endsWith(')')) {
                    size_value = size_value.slice(1, -1);
                }
                code += `(${size_value}`;
            }

            if (array){
                var array_name = block.getFieldValue('array');
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
        }
