/** init toolbox, Mutator, Blockly, Name Pool, background connection **/

import { toolbox } from "./toolbox.js";
import * as Utils from "./block_category/button.function.js" 

const Reconnect_Block = (targetConnection, sourceBlock, inputName) => {
    if (!targetConnection || !targetConnection.getSourceBlock().workspace) {
        return; 
    }
    const input = sourceBlock.getInput(inputName);
    if (input && input.connection) {
        input.connection.connect(targetConnection);
    }
};

/**  init Blockly and define the constant **/
Blockly.Cpp = new Blockly.Generator("Cpp");
Blockly.Cpp.ORDER_ATOMIC = 1;
Blockly.Cpp.ORDER_NONE = 99;

/**  regist Mutator ( Must init before the workspace ) **/
Blockly.Blocks["if_block"] = {
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
    Blockly.Blocks["if_mutator"] = { init: function() { this.setColour("#00abea"); this.appendDummyInput().appendField("如果"); this.setNextStatement(true);} };
    Blockly.Blocks["elif_mutator"] = { init: function() { this.setColour("#00abea"); this.appendDummyInput().appendField("否則如果"); this.setPreviousStatement(true); this.setNextStatement(true); this.valueConnection_ = null; this.statementConnection_ = null;} };
    Blockly.Blocks["else_mutator"] = { init: function() { this.setColour("#00abea"); this.appendDummyInput().appendField("否則"); this.setPreviousStatement(true); this.contextMenu = false;} };

Blockly.Extensions.registerMutator(
    "if_mutator", 
    {
        saveExtraState: function() {
            return {
                "elifCount": this.elifCount_,
                "hasElse": this.hasElse_
            };
        },
        loadExtraState: function(state) {
            this.elifCount_ = state["elifCount"] || 0;
            this.hasElse_ = state["hasElse"] || false;
            this.updateShape_();
        },
        saveConnections: function(containerBlock) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();
            let i = 0;
            while (clauseBlock) {
                if (clauseBlock.type === "elif_mutator") {
                    const valueInput = this.getInput("ELIF" + i);
                    const stmtInput = this.getInput("ELIF_DO" + i);
                    clauseBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
                    clauseBlock.statementConnection_ = stmtInput && stmtInput.connection.targetConnection;
                    i++;
                } else if (clauseBlock.type === "else_mutator") {
                    const elseInput = this.getInput("ELSE");
                    clauseBlock.statementConnection_ = elseInput && elseInput.connection.targetConnection;
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }
        },
        decompose: function(workspace) {
            const containerBlock = workspace.newBlock("if_mutator");
            containerBlock.initSvg();
            let connection = containerBlock.nextConnection;
            for (let i = 0; i < this.elifCount_; i++) {
                const elifBlock = workspace.newBlock("elif_mutator");
                elifBlock.initSvg();
                connection.connect(elifBlock.previousConnection);
                connection = elifBlock.nextConnection;
            }

            if (this.hasElse_) {
                const elseBlock = workspace.newBlock("else_mutator");
                elseBlock.initSvg();
                connection.connect(elseBlock.previousConnection);
            }

            workspace.addChangeListener(()=>{
                const blocks = workspace.getAllBlocks(false);
                let elseCheck = false;
                blocks.forEach(b => {
                    if (b.type === "else_mutator"){
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
                if (clauseBlock.type === "elif_mutator") {
                    valueConns[elifCount] = clauseBlock.valueConnection_;
                    stmtConns[elifCount] = clauseBlock.statementConnection_;
                    elifCount++;
                } else if (clauseBlock.type === "else_mutator") {
                    hasElse = true;
                    var elseConn = clauseBlock.statementConnection_;
                }
                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }

            this.elifCount_ = elifCount;
            this.hasElse_ = hasElse;

            this.updateShape_();

            for (let i = 0; i < this.elifCount_; i++) {
                Reconnect_Block(valueConns[i], this, "ELIF" + i);
                Reconnect_Block(stmtConns[i], this, "ELIF_DO" + i);
            }
            if (this.hasElse_) Reconnect_Block(elseConn, this, "ELSE");
        },
        updateShape_: function() {
            for (let i = 0; this.getInput("ELIF" + i); i++) {
                this.removeInput("ELIF" + i);
                this.removeInput("ELIF_DO" + i);
            }
            if (this.getInput("ELSE")) this.removeInput("ELSE");
            for (let i = 0; i < this.elifCount_; i++) {
                this.appendValueInput("ELIF" + i)
                    .setCheck("Boolean")
                    .appendField("否則如果");
                this.appendStatementInput("ELIF_DO" + i)
                    .appendField("執行");
            }

            if (this.hasElse_) {
                this.appendStatementInput("ELSE")
                    .appendField("否則執行");
            }
        }
    }, 
    undefined, 
    ["elif_mutator", "else_mutator"]
);

/** define the Name Pool**/
// to save a;l variable names of different type  
const CategoryType = ["VAR", "PTR", "REF",  
                      "Array", "Vector", "Deque", 
                      "Stack", "Queue", "Priority_queue", 
                      "Set", "Unordered_set", "Multiset", "Flat_set", 
                      "Map", "Unordered_map", "Pair", 
                      "Bitset", 
                      "Function", "Lambda", "Operation", 
                      "Struct", "Struct_Name", "Class", "Class_Name", 
                      "Vector", "Deque", 
                      "Stack", "Queue", "Priority_queue", 
                      "Map", "Unordered_map", "Pair", 
                      "Set", "Unordered_set", "Flat_set", "Multiset"
                     ];
CategoryType.forEach(t => Blockly.Cpp[t] = []);

// checked the data_type whether it"s a global variable
if (!window.data_type_checked) {
    window.data_type_checked = {};
    CategoryType.forEach(t => window.data_type_checked[t] = false);
}

// save all variable names, to prevent the repeating name and lead to error
const usedName = new Set();

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

Blockly.Blocks["define_class"] = {
    init: function() {
        this.text = "類別 名稱: ";
        this.Block_type = "Class";
        this.appendDummyInput()
            .appendField("類別 名稱: ")
            .appendField(VarDropdown("Class"), "Name")
        this.jsonInit({
            "type": "define_class",
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e9967a",
            "extensions": ["dynamic_dropdown"],
            "mutator": "class_mutator"
        });
    }
};

    Blockly.Blocks["class_mutator"] = {init: function(){this.setColour("#e9967a"); this.appendDummyInput().appendField("Class"); this.setNextStatement(true);}}
    Blockly.Blocks["public_mutator"] = {init: function(){this.setColour("#e9967a"); this.appendDummyInput().appendField("Public"); this.setNextStatement(true); this.setPreviousStatement(true); this.contextMenu = false;}};
    Blockly.Blocks["private_mutator"] = {init: function(){this.setColour("#e9967a"); this.appendDummyInput().appendField("Private"); this.setNextStatement(true); this.setPreviousStatement(true); this.contextMenu = false;}};
    Blockly.Blocks["protected_mutator"] = {init: function(){this.setColour("#e9967a"); this.appendDummyInput().appendField("Protected"); this.setPreviousStatement(true); this.contextMenu = false;}};

Blockly.Extensions.registerMutator(
    "class_mutator",
    {
        saveExtraState: function(){
            if (!this.hasPublic_ && !this.hasPrivate_ && !this.hasProtected_) return null;
            return {
                "hasPublic": this.hasPublic_,
                "hasPrivate": this.hasPrivate_,
                "hasProtected": this.hasProtected_
            };
        }, 
        loadExtraState: function(state) {
            this.hasPublic_ = state["hasPublic"] || false;
            this.hasPrivate_ = state["hasPrivate"] || false;
            this.hasProtected_ = state["hasProtected"] || false;
            
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
                if (clauseBlock.type === "protected_mutator") this.hasProtected_ = true; var protectedConn = clauseBlock.statementConnection_;

                clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
            }
            this.updateShape_();

            if (this.hasPublic_) Reconnect_Block(publicConn, this, "Public");
            if (this.hasPrivate_) Reconnect_Block(privateConn, this, "Private");
            if (this.hasProtected_) Reconnect_Block(protectedConn, this, "Protected");
        }, 
        decompose: function(workspace){
            const containerBlock = workspace.newBlock("class_mutator");
            containerBlock.initSvg();
            let connection = containerBlock.nextConnection;

            if (this.hasPublic_){
                const publicBlock = workspace.newBlock("public_mutator");
                publicBlock.initSvg();
                connection.connect(publicBlock.previousConnection);
                connection = publicBlock.nextConnection;
            } 
            
            if (this.hasPrivate_){
                const privateBlock = workspace.newBlock("private_mutator");
                privateBlock.initSvg();
                connection.connect(privateBlock.previousConnection);
                connection = privateBlock.nextConnection;
            }

            if (this.hasProtected_){
                const protectedBlock = workspace.newBlock("protected_mutator");
                protectedBlock.initSvg();
                connection.connect(protectedBlock.previousConnection);
                connection = protectedBlock.nextConnection;
            } 
            
            workspace.addChangeListener(()=>{
                const blocks = workspace.getAllBlocks(false);
                let publicCheck = false;
                let privateCheck = false;
                blocks.forEach(b => {
                    if (b.type === "public_mutator"){
                        if (publicCheck) b.dispose();
                        publicCheck = true;
                    } 
                    if (b.type === "private_mutator"){
                        if(privateCheck) b.dispose();
                        privateCheck = true;
                    }
                }); 
            })

            return containerBlock;
        }, 
        updateShape_: function(){
            const inputs = [
                { key: "hasPublic_", name: "Public", label: "public:" },
                { key: "hasPrivate_", name: "Private", label: "private:" },
                { key: "hasProtected_", name: "Protected", label: "protected:" }
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

/** regist extensions **/
// to update the Name Pool when adding the new name of same type
Blockly.Extensions.register("dynamic_dropdown", function(){
    this.updateDropdown_ = function(){
        const update_dropdown = (targetInput, Name) =>{
            if (targetInput.fieldRow.length === 0) return;

            while (targetInput.fieldRow.length > 0){
                targetInput.fieldRow[0].dispose();
                targetInput.fieldRow.splice(0, 1);
            }

            if (targetInput.sourceBlock && targetInput.sourceBlock.render) {
                targetInput.sourceBlock.render();
            }

            targetInput.appendField(this.text)
                    .appendField(VarDropdown(this.Block_type), Name);
        }

        if (this.getInput("Name_Input")) update_dropdown(this.getInput("Name_Input"), "Name");
        if (this.getInput("Name_Input2")) update_dropdown(this.getInput("Name_Input2"), "Name2");
    }
});

// to change the type when press the options on context menu
Blockly.Extensions.register("change_block_type", function(){
    this.updateModeShape_ = function(isOutput){
        [this.OutputConnection, this.previousConnection, this.nextConnection].forEach(c => c?.disconnect());

        if (isOutput){
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true, null);
        } else {
            this.setOutput(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);  
        };
        this.render();
    }
});

/** workspace setting **/ 
//  define, set, init 
var workspace = Blockly.inject("blockly-workspace", {
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
    contextMenu: true, 
    readOnly: false, 
    renderer: "zelos"
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
    const existingMainBlock = workspace.getBlocksByType("main_block", false);
    if (existingMainBlock.length === 0) {
        const mainBlock = workspace.newBlock("main_block");
        mainBlock.initSvg();
        mainBlock.render();
        mainBlock.setMovable(true);
        mainBlock.setDeletable(false);
    }
}

// to initalize setting of main_block 
workspace.addChangeListener(() => {
    const mainBlocks = workspace.getBlocksByType("main_block", false);
    if (mainBlocks.length > 1) {
        mainBlocks.slice(1).forEach(block => block.dispose());
    }
    initializeMainBlock();
    updateCodeOutput();
});

// to force quit the not released properly gesture and prevent the dropdown to shut down"
workspace.addChangeListener(function(event) {
    // 監聽變數選擇器關閉
    if (event.type === Blockly.Events.BLOCK_CHANGE || 
        event.type === Blockly.Events.CLICK) {
        
        // 檢查 dropdown 是否關閉
        const dropdownDiv = document.querySelector(".blocklyDropDownDiv");
        if (dropdownDiv && dropdownDiv.style.display === "none") {
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

// to resize the svg
window.addEventListener("resize", function() {
    Blockly.svgResize(workspace);
});

/**  regist the context menu **/ 
// to point our website
Blockly.ContextMenuRegistry.registry.register({
    id: "website_cutsom",
    weight: 100,
    displayText: "我們的網頁", 
    preconditionFn: () =>"enabled",
    callback: function(scope) {
        window.open("https://hackmd.io/@cpp-blockly", "_blank");
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK
});

// to change the block type 
Blockly.ContextMenuRegistry.registry.register({
    id: "change_block_custom", 
    weight: 100, 
    displayText: function(scope){return scope.block.outputConnection?"圓形模式": "方塊模式"; },
    preconditionFn: function(scope){
        if (scope.block && scope.block.updateModeShape_)
            return "enabled";
        return "hidden";
    }, 
    callback: function(scope){
        const block = scope.block;
        const isOutput = !block.outputConnection;
        console.log(isOutput);
        block.updateModeShape_(isOutput);

        // manually update the block
        Blockly.Events.fire(new Blockly.Events.BlockChange(
            block, "mutation", null, "", `update ${block} mode to ${isOutput?"to_output": "to_statement"}`
        ));
    }
});

Blockly.Cpp.init(workspace);

/** background connection **/
let id_code = "";
async function updateCodeOutput() {
    id_code = Blockly.Cpp.workspaceToCode(workspace);
    var convElement = document.getElementById("code");
    if (convElement) {
        convElement.innerHTML = "";
        var codeBlock = document.createElement("pre");
        var codeContent = document.createElement("code");
        codeContent.className = "language-cpp";
        codeContent.textContent = id_code;
        codeBlock.appendChild(codeContent);
        convElement.appendChild(codeBlock);
        hljs.highlightElement(codeContent);
    }

    function renderMarkdown() {
        const markdownInput = document.getElementById("markdown-input");
        const markdownOutput = document.getElementById("output");
        if (markdownInput && markdownOutput) {
            const markdownText = markdownInput.value;
            const htmlContent = marked.parse(markdownText);
            markdownOutput.innerHTML = htmlContent;
            markdownOutput.querySelectorAll("pre code").forEach((el) => {
                hljs.highlightElement(el);
            });
        }
    }
    marked.setOptions({
        highlight: function(id_code, lang) {
            const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(id_code, {
                language: validLang
            }).value;
        }
    });
    renderMarkdown();
}

// compile the code 
document.getElementById("c").addEventListener("click", async () => {
    alert(`編譯以下代碼:\n${id_code}`);
    const response = await fetch("https://cplusplusblockly-production.up.railway.app/compile", {
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

// compile and run the code 
document.getElementById("c_r").addEventListener("click", async () => {
    alert("編譯並執行");
    const response = await fetch("https://cplusplusblockly-production.up.railway.app/compile_and_run", {
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
        return "";
    }
    let code = originalBlockToCode.call(this, block);
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
        code += Blockly.Cpp.blockToCode(nextBlock);
    }
    return code;
};

/** initialize undo and redo button **/
document.getElementById("undoBtn").addEventListener("click", async ()=>{
    if (workspace.getUndoStack().length === 0) alert("CANNOT UNDO");
    else workspace.undo(false);
});
document.getElementById("redoBtn").addEventListener("click", async ()=>{
    if (!workspace.getRedoStack().length === 0) alert("CANNOT REDO");
    else workspace.undo(true);
});

/** Different type name pools setting **/
//regist the call back button and control the web open and close
const model = ["var", "array", "func", "get", "vec", "deq", "st", "qu", "pq", "set"];
model.forEach(t => workspace.registerButtonCallback(`${t}_category`, function(){document.getElementById(`${t}_model`).style.display = "block";}));

// have only one options 
export function Confirm(text_name, type, model_name, Func) {
    const name = document.getElementById(text_name).value;

    if (!name) return;
    if (usedName.has(name)) {
        alert("此變數名稱已被使用於其他種類！");
        return;
    }
    usedName.add(name);

    // make the web close and clear all the blank
    document.getElementById(model_name).style.display = "none";
    document.getElementById(text_name).value = "";

    // to prevent repeating name add in the Name Pool
    if (!Blockly.Cpp[type].includes(name)) {
        Blockly.Cpp[type].push(name);

        if (window.data_type_checked[type]) {
            workspace.getAllBlocks().forEach(block => { 
                if (block.updateDropdown_) 
                    block.updateDropdown_(); 
            });
            return;
        }
        Func(type, toolbox, workspace);
        window.data_type_checked[type] = true;
    }

    // refresh the toolbox making the blocks exist 
    Blockly.getMainWorkspace().refreshToolboxSelection();
};

const confirmList = [
    {name: "Array",          id: "ArrayName", model: "array_model", creator: Utils.Create_Array},
    {name: "Vector",         id: "VecName",   model: "vec_model",   creator: Utils.Create_Random_Access_Containers},
    {name: "Deque",          id: "DeqName",   model: "deq_model",   creator: Utils.Create_Random_Access_Containers},
    {name: "Stack",          id: "StName",    model: "st_model",    creator: Utils.Create_Container_Adapters},
    {name: "Set",            id: "SetName",   model: "set_model",   creator: Utils},
    {name: "Queue",          id: "QuName",    model: "qu_model",    creator: Utils.Create_Container_Adapters},
    {name: "Priority_Queue", id: "PqName",    model: "pq_model",    creator: Utils.Create_Container_Adapters},
];

const actions = {};
confirmList.forEach(({ name, id, model, creator }) => {
    actions[`Confirm${name}`] = () => Confirm(id, name, model, creator);
});

// have more than one options 
function Confirm_Options(text_name, type_name, model_name, Func) {
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

        if (window.data_type_checked[type]) {
            workspace.getAllBlocks().forEach(block => { 
                if (block.updateDropdown_) 
                    block.updateDropdown_(); 
            });
            return;
        }
        Func(type, toolbox, workspace);
        window.data_type_checked[type] = true;
    }
    Blockly.getMainWorkspace().refreshToolboxSelection();
};

const ConfirmList_options = [
    {name: "Variable", type: "var_type",  id: "VarName",  model: "var_model",  creator: Utils.Create_Variable},
    {name: "Function", type: "func_type", id: "FuncName", model: "func_model", creator: Utils.Create_Function},
    {name: "Get",      type: "get_type",  id: "GetName",  model: "get_model",  creator: Utils.Create_getName},
    {name: "Set",      type: "set_type",  id: "SetName",  model: "set_model",  creator: Utils.Create_Associative_Container},
    //{name: "Map",      type: "map_type",  id: "MapName",  model: "map_model",  creator: Utils.Create_Associative_Container},
]

ConfirmList_options.forEach(({name, type, id, model, creator}) => {
    actions[`Confirm${name}`] = () => Confirm_Options(id, type, model, creator);
})

actions["Cancel"] = (type) => document.getElementById(type).style.display = "none";
export const { 
    ConfirmArray, 
    ConfirmVector, 
    ConfirmDeque, 
    ConfirmStack, 
    ConfirmQueue, 
    ConfirmPriority_Queue, 
    ConfirmVariable,
    ConfirmFunction, 
    ConfirmGet, 
    ConfirmSet, 
    //ConfirmMap, 
    Cancel
} = actions

// to init the callback function from local to global 
Object.keys(actions).forEach(key => {
  window[key] = actions[key];
});

/** template (declate html div) **/
const configs = [
    // has one option
    {id: "array", label: "輸入陣列名稱：",             name: "Array", Func: ConfirmArray}, 
    {id: "vec",   label: "輸入 Vector 名稱：",         name: "Vec",   Func: ConfirmVector}, 
    {id: "deq",   label: "輸入 Deque 名稱：",          name: "Deq",   Func: ConfirmDeque}, 
    {id: "st",    label: "輸入 Stack 名稱：",          name: "St",    Func: ConfirmStack}, 
    {id: "qu",    label: "輸入 Queue 名稱：",          name: "Qu",    Func: ConfirmQueue}, 
    {id: "pq",    label: "輸入 Priority_queue 名稱：", name: "Pq",    Func: ConfirmPriority_Queue}, 

    // have many options
    {id: "var",  label: "輸入變數名稱：",  name: "Var",  value: ["VAR", "PTR", "REF"]         , Func: ConfirmVariable}, 
    {id: "get",  label: "輸入變數名稱：",  name: "Var",  value: ["Struct_Name", "Class_Name"] , Func: ConfirmVariable}, 
    {id: "func", label: "輸入函數名稱：",  name: "Func", value: ["Function", "Lambda", "Struct", "Class", "Operation"] , Func: ConfirmVariable}, 
    {id: "set",  label: "輸入 Set 名稱：", name: "Set",  value: ["Set", "Unordered_set", "Multiset", "Flat_set"],        Func: ConfirmSet}, 
    //{id: "map",  label: "輸入 Map 名稱：", "options": {id: "MapName", value: ["Map", "Unordered_map", "Multimap"]},                    Func: ConfirmMap}, 
]

const temp = document.getElementById("callback_template");
const contanier = document.getElementById("callback_container");

const data_type = {
    "VAR": "變數", "PTR": "指標", "REF": "參考", 
    "Struct_Name": "結構變數", "Class_Name": "類別變數"
};
window.onload = function(){
    configs.forEach( conf =>{
        const clone = temp.content.cloneNode(true);
        const div = clone.querySelector(".model");

        div.id = conf.id + "_model";
        clone.querySelector(".label_model").innerText = conf.label;
        clone.querySelector(".input_model").id = `${conf.name}Name`;
        clone.querySelector(".confirm_btn").onclick = conf.Func;
        clone.querySelector(".cancel_btn").onclick = () => Cancel(`${conf.id}_model`);

        if (Object.hasOwn(conf, "value")){            
            const radio_placeholder = clone.getElementById("radio_placeholder");
            conf.value.forEach((val, idx) =>{
                const radio = Object.assign(document.createElement("input"), {
                    type: "radio", 
                    name: `${conf.id}_type`, 
                    value: val, 
                    id: conf.id,
                    checked: idx === 0
                });

                const label = Object.assign(document.createElement("label"), {
                    htmlFor: conf.id,
                    innerText: (Object.hasOwn(data_type, val)) ? data_type[val] : val
                });

                radio_placeholder.append(radio, label, document.createElement("br"));
            })
        }

        contanier.appendChild(clone);
    });
};