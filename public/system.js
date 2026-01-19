// initialize toolbox, Mutator, Blockly, and Name Pool 

import { toolbox } from "./toolbox.js";
import * as Utils from './block_category/function.js' 

const Reconnect_Block = (targetConnection, sourceBlock, inputName) => {
    if (!targetConnection || !targetConnection.getSourceBlock().workspace) {
        return; 
    }
    const input = sourceBlock.getInput(inputName);
    if (input && input.connection) {
        input.connection.connect(targetConnection);
    }
};

Blockly.Blocks['if_block'] = {
        init: function() {
            this.jsonInit({
                "type": "if_block",
                "message0": "如果 %1",
                "args0": [{ "type": "input_value", "name": "IF_VALUE", "check": "Boolean" }],
                "message1": "執行 %1",
                "args1": [{ "type": "input_statement", "name": "IF_DO" }],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#00abea",
                "mutator": "if_mutator" // 這裡直接寫你 registerMutator 的那個 ID
            });

            this.elifCount_ = 0;
            this.hasElse_ = false;
        }
    }
    Blockly.Blocks['if_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('如果'); this.setNextStatement(true);} };
    Blockly.Blocks['elif_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('否則如果'); this.setPreviousStatement(true); this.setNextStatement(true); this.valueConnection_ = null; this.statementConnection_ = null;} };
    Blockly.Blocks['else_mutator'] = { init: function() { this.setColour('#00abea'); this.appendDummyInput().appendField('否則'); this.setPreviousStatement(true); this.contextMenu = false;} };

Blockly.Extensions.registerMutator(
    'if_mutator', 
    {
        saveExtraState: function() {
            return {
                'elifCount': this.elifCount_,
                'hasElse': this.hasElse_
            };
        },
        loadExtraState: function(state) {
            this.elifCount_ = state['elifCount'] || 0;
            this.hasElse_ = state['hasElse'] || false;
            this.updateShape_();
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
            if (!this.elifCount_ && !this.hasElse_) return null;
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

            workspace.addChangeListener(()=>{
                const blocks = workspace.getAllBlocks(false);
                let elseCheck = false;
                blocks.forEach(b => {
                    if (b.type === 'else_mutator'){
                        if (elseCheck) b.dispose();
                        elseCheck = true;
                    } 
                }); 
            })

            return containerBlock;
        },
        compose: function(containerBlock) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();
            let elifCount = 0;
            let hasElse = false;

            const valueConns = [];
            const stmtConns = [];
            while (clauseBlock) {
                if (clauseBlock.type === 'elif_mutator') {
                    valueConns[elifCount] = clauseBlock.valueConnection_;
                    stmtConns[elifCount] = clauseBlock.statementConnection_;
                    elifCount++;
                } else if (clauseBlock.type === 'else_mutator') {
                    hasElse = true;
                    var elseConn = clauseBlock.statementConnection_;
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }

            this.elifCount_ = elifCount;
            this.hasElse_ = hasElse;

            this.updateShape_();

            for (let i = 0; i < this.elifCount_; i++) {
                Reconnect_Block(valueConns[i], this, 'ELIF' + i);
                Reconnect_Block(stmtConns[i], this, 'ELIF_DO' + i);
            }
            if (this.hasElse_) Reconnect_Block(elseConn, this, 'ELSE');
        },
        updateShape_: function() {
            for (let i = 0; this.getInput('ELIF' + i); i++) {
                this.removeInput('ELIF' + i);
                this.removeInput('ELIF_DO' + i);
            }
            if (this.getInput('ELSE')) this.removeInput('ELSE');
            for (let i = 0; i < this.elifCount_; i++) {
                this.appendValueInput('ELIF' + i)
                    .setCheck('Boolean')
                    .appendField('否則如果');
                this.appendStatementInput('ELIF_DO' + i)
                    .appendField('執行');
            }

            if (this.hasElse_) {
                this.appendStatementInput('ELSE')
                    .appendField('否則執行');
            }
        }
    }, 
    undefined, 
    ['elif_mutator', 'else_mutator']
);

Blockly.Cpp = new Blockly.Generator('Cpp');
Blockly.Cpp.ORDER_ATOMIC = 1;
Blockly.Cpp.ORDER_NONE = 99;
 
const CategoryType = ["VAR", "PTR", "REF", 
                      "Array", "Vector", "Deque", 
                      "Stack", "Queue", "Priority_queue", 
                      "Set", "Unordered_set", "Flat_set", "Multiset", 
                      "Map", "Unordered_map", "Pair", 
                      "Bitset", 
                      "Function", "Lambda", "Operation", 
                      "Struct", "Struct_Name", "Class", "Class_Name"
                     ];
CategoryType.forEach(t => Blockly.Cpp[t] = []);

if (!window.data_type_checked) {
    window.data_type_checked = {};
    CategoryType.forEach(t => window.data_type_checked[t] = false);
}

const usedName = new Set();

Blockly.Blocks['define_class'] = {
    init: function() {
        this.jsonInit({
            "type": "define_class",
            "message0": "類別 名稱: %1", 
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "class_name",
                    "options": () => Blockly.Cpp["Class"].map(v => [v, v])
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e9967a",
            "mutator": "class_mutator"
        });
    }
};

    Blockly.Blocks['class_mutator'] = {init: function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Class"); this.setNextStatement(true);}}
    Blockly.Blocks['public_mutator'] = {init: function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Public"); this.setNextStatement(true); this.setPreviousStatement(true); this.contextMenu = false;}};
    Blockly.Blocks['private_mutator'] = {init: function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Private"); this.setNextStatement(true); this.setPreviousStatement(true); this.contextMenu = false;}};
    Blockly.Blocks['protected_mutator'] = {init: function(){this.setColour('#e9967a'); this.appendDummyInput().appendField("Protected"); this.setPreviousStatement(true); this.contextMenu = false;}};

Blockly.Extensions.registerMutator(
    "class_mutator",
    {
        saveExtraState: function(){
            if (!this.hasPublic_ && !this.hasPrivate_ && !this.hasProtected_) return null;
            return {
                'hasPublic': this.hasPublic_,
                'hasPrivate': this.hasPrivate_,
                'hasProtected': this.hasProtected_
            };
        }, 
        loadExtraState: function(state) {
            this.hasPublic_ = state['hasPublic'] || false;
            this.hasPrivate_ = state['hasPrivate'] || false;
            this.hasProtected_ = state['hasProtected'] || false;
            
            this.updateShape_();
        }, 
        compose: function(containerBlock){
            this.hasPublic_ = false;
            this.hasPrivate_ = false;
            this.hasProtected_ = false;

            let clauseBlock = containerBlock.nextConnection.targetBlock();
            
            while (clauseBlock){
                if (clauseBlock.type === "public_mutator") this.hasPublic_ = true; var publicConn = clauseBlock.statementConnection_;
                if (clauseBlock.type === "private_mutator") this.hasPrivate_ = true; var privateConn = clauseBlock.statementConnection_;
                if (clauseBlock.type === 'protected_mutator') this.hasProtected_ = true; var protectedConn = clauseBlock.statementConnection_;

                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }
            this.updateShape_();

            if (this.hasPublic_) Reconnect_Block(publicConn, this, 'Public');
            if (this.hasPrivate_) Reconnect_Block(privateConn, this, 'Private');
            if (this.hasProtected_) Reconnect_Block(protectedConn, this, 'Protected');
        }, 
        decompose: function(workspace){
            const containerBlock = workspace.newBlock('class_mutator');
            containerBlock.initSvg();
            let connection = containerBlock.nextConnection;

            if (this.hasPublic_){
                const publicBlock = workspace.newBlock('public_mutator');
                publicBlock.initSvg();
                connection.connect(publicBlock.previousConnection);
                connection = publicBlock.nextConnection;
            } 
            
            if (this.hasPrivate_){
                const privateBlock = workspace.newBlock('private_mutator');
                privateBlock.initSvg();
                connection.connect(privateBlock.previousConnection);
                connection = privateBlock.nextConnection;
            }

            if (this.hasProtected_){
                const protectedBlock = workspace.newBlock('protected_mutator');
                protectedBlock.initSvg();
                connection.connect(protectedBlock.previousConnection);
                connection = protectedBlock.nextConnection;
            } 
            
            workspace.addChangeListener(()=>{
                const blocks = workspace.getAllBlocks(false);
                let publicCheck = false;
                let privateCheck = false;
                blocks.forEach(b => {
                    if (b.type === 'public_mutator'){
                        if (publicCheck) b.dispose();
                        publicCheck = true;
                    } 
                    if (b.type === 'private_mutator'){
                        if(privateCheck) b.dispose();
                        privateCheck = true;
                    }
                }); 
            })

            return containerBlock;
        }, 
        updateShape_: function(){
            const inputs = [
                { key: 'hasPublic_', name: 'Public', label: 'public:' },
                { key: 'hasPrivate_', name: 'Private', label: 'private:' },
                { key: 'hasProtected_', name: 'Protected', label: 'protected:' }
            ];

            inputs.forEach(input => {
                if (this[input.key]) {
                    if (!this.getInput(input.name)) {
                        this.appendStatementInput(input.name).appendField(input.label);
                    }
                } else {
                    if (this.getInput(input.name)) {
                        this.removeInput(input.name);
                    }
                }
            });
        }, 
        saveConnections: function(containerBlock) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();
            if (!containerBlock || !clauseBlock) return;

            while (clauseBlock) {
                if (clauseBlock.type === "public_mutator"){
                    const publicInput = this.getInput("Public");
                    clauseBlock.statementConnection_ = publicInput && publicInput.connection.targetconnection;
                } else if (clauseBlock.type === "private_mutator"){
                    const privateInput = this.getInput("Private");
                    clauseBlock.statementConnection_ = privateInput && privateInput.connection.targetconnection;
                } else {
                    const protectedInput = this.getInput("Protected");
                    clauseBlock.statementConnection_ = protectedInput && protectedInput.connection.targetconnection;
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.target;
            }
        }
    },
    undefined, 
    ["public_mutator", "private_mutator", "protected_mutator"]
);

var workspace = Blockly.inject('blockly-workspace', {
    toolbox: toolbox,
    scrollbars: true,
    trashcan: true,
    grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.7,
        maxScale: 2.0,
        minScale: 0.1,
        scaleSpeed: 1.5
    },
    undo: true, 
    renderer: 'zelos'
});
workspace.resizeContents();

setTimeout(() => {
    workspace.setScale(0.68);
    const metrics = workspace.getMetrics();
    const xOffset = (metrics.viewWidth - metrics.contentWidth * 0.5) / 2.5;
    const yOffset = (metrics.viewHeight - metrics.contentHeight * 0.5) / 2.2;
    workspace.scroll(xOffset, yOffset);
}, 100);

function initializeMainBlock() {
    const existingMainBlock = workspace.getBlocksByType('main_block', false);
    if (existingMainBlock.length === 0) {
        const mainBlock = workspace.newBlock('main_block');
        mainBlock.initSvg();
        mainBlock.render();
        mainBlock.setMovable(true);
        mainBlock.setDeletable(false);
    }
}
workspace.addChangeListener(() => {
    const mainBlocks = workspace.getBlocksByType('main_block', false);
    if (mainBlocks.length > 1) {
        mainBlocks.slice(1).forEach(block => block.dispose());
    }
    initializeMainBlock();
    updateCodeOutput();
});

// 在 workspace 創建之後添加
workspace.addChangeListener(function(event) {
    // 監聽變數選擇器關閉
    if (event.type === Blockly.Events.BLOCK_CHANGE || 
        event.type === Blockly.Events.CLICK) {
        
        // 檢查 dropdown 是否關閉
        const dropdownDiv = document.querySelector('.blocklyDropDownDiv');
        if (dropdownDiv && dropdownDiv.style.display === 'none') {
            // 釋放卡住的手勢
            setTimeout(() => {
                if (Blockly.Gesture.inProgress()) {
                    const gesture = Blockly.Gesture.inProgress();
                    // 只取消沒有開始拖曳的手勢
                    if (gesture && !gesture.isDragging_) {
                        gesture.cancel();
                    }
                }
            }, 50);
        }
    }
});

/***** 其他原有功能保持不變 *****/
window.addEventListener("resize", function() {
    Blockly.svgResize(workspace);
});

Blockly.Cpp.init(workspace);

let id_code = '';
async function updateCodeOutput() {
    id_code = Blockly.Cpp.workspaceToCode(workspace);
    var convElement = document.getElementById('code');
    if (convElement) {
        convElement.innerHTML = '';
        var codeBlock = document.createElement('pre');
        var codeContent = document.createElement('code');
        codeContent.className = 'language-cpp';
        codeContent.textContent = id_code;
        codeBlock.appendChild(codeContent);
        convElement.appendChild(codeBlock);
        hljs.highlightElement(codeContent);
    }

    function renderMarkdown() {
        const markdownInput = document.getElementById('markdown-input');
        const markdownOutput = document.getElementById('output');
        if (markdownInput && markdownOutput) {
            const markdownText = markdownInput.value;
            const htmlContent = marked.parse(markdownText);
            markdownOutput.innerHTML = htmlContent;
            markdownOutput.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });
        }
    }
    marked.setOptions({
        highlight: function(id_code, lang) {
            const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(id_code, {
                language: validLang
            }).value;
        }
    });
    renderMarkdown();
}

document.getElementById('c').addEventListener('click', async () => {
    alert(`編譯以下代碼:\n${id_code}`);
    const response = await fetch('https://cplusplusblockly-production.up.railway.app/compile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_code: id_code
        })
    });
    const result = await response.json();
    report.value = result.message;
});
document.getElementById('c_r').addEventListener('click', async () => {
    alert('編譯並執行');
    const response = await fetch('https://cplusplusblockly-production.up.railway.app/compile_and_run', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_code: id_code,
            test_file: textarea.value
        })
    });
    const result = await response.json();
    report.value = result.message;
}); 

const originalBlockToCode = Blockly.Cpp.blockToCode;
Blockly.Cpp.blockToCode = function(block) {
    if (!block) {
        return '';
    }
    let code = originalBlockToCode.call(this, block);
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
        code += Blockly.Cpp.blockToCode(nextBlock);
    }
    return code;
};

document.getElementById('undoBtn').addEventListener('click', async ()=>{
    if (workspace.getUndoStack().length === 0) alert("CANNOT UNDO");
    else workspace.undo(false);
});
document.getElementById('redoBtn').addEventListener('click', async ()=>{
    if (!workspace.getRedoStack().length === 0) alert("CANNOT REDO");
    else workspace.undo(true);
});

const model = ['var', 'array', 'func', 'get'];
model.forEach(t => workspace.registerButtonCallback(`${t}_category`, function(){document.getElementById(`${t}_model`).style.display = "block";}));

export function confirmArray() {
    const name = document.getElementById("ArrayName").value;

    if (!name) return;
    if (usedName.has(name)) {
        alert("此變數名稱已被使用於其他種類！");
        return;
    }
    
    usedName.add(name);
    document.getElementById("array_model").style.display = "none";
    document.getElementById("ArrayName").value = "";

    if (!Blockly.Cpp["Array"].includes(name)) {
        Blockly.Cpp["Array"].push(name);
        if (window.data_type_checked["Array"]) return;
        Utils.Create_Array(toolbox, workspace);
        window.data_type_checked["Array"] = true;
    }
    Blockly.getMainWorkspace().refreshToolboxSelection();
};

function Confirm(text_name, type_name, model_name, Func) {
    const name = document.getElementById(text_name).value;
    const type = document.querySelector(`input[name="${type_name}"]:checked`).value;

    if (!name) return;
    if (usedName.has(name)) {
        alert("此變數名稱已被使用於其他種類！");
        return;
    }
    
    usedName.add(name);
    document.getElementById(model_name).style.display = "none";
    document.getElementById(text_name).value = "";

    if (!Blockly.Cpp[type].includes(name)) {
        Blockly.Cpp[type].push(name);
        if (window.data_type_checked[type]) return;
        Func(type, toolbox, workspace);
        window.data_type_checked[type] = true;
    }
    Blockly.getMainWorkspace().refreshToolboxSelection();
};

export function confirmVar(){ Confirm("VarName", "vartype", "var_model", Utils.Create_variable); };

export function confirmFunction(){ Confirm("FuncName", "functype", "func_model", Utils.Create_Function); }

export function confirmGet(){ Confirm("GetName", "gettype", "get_model", Utils.Create_getName); }

export function cancel(type){ document.getElementById(type).style.display = "none"; };

const button_callback = { confirmArray, confirmVar, confirmFunction, confirmGet, cancel };
Object.keys(button_callback).forEach(key => {
  window[key] = button_callback[key];
});