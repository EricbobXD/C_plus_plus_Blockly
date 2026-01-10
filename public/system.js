import { toolbox } from "./toolbox.js";
import * as Utils from './block_category/index.js' 
/***** 全域變數 *****/
let teachingMode = false; // 教學進行時禁止一般操作
let tutorialSteps = [];
let currentStep = 0;

/***** 面板開關函式 *****/
function togglePanel(panelId) {
    if (teachingMode) return; // 教學中不允許切換
    // 關閉其他面板
    ['test_compiler', 'code-view', 'blockly-view', 'info', 'class-view'].forEach(id => {
        if (id !== panelId) document.getElementById(id).classList.remove("active");
    });
    const panel = document.getElementById(panelId);
    if (panel.classList.contains("active")) {
        panel.classList.remove("active");
    } else {
        panel.classList.add("active");
    }
}

function openPanel(panelId) {
    document.getElementById(panelId).classList.add("active");
}

function closePanel(panelId) {
    document.getElementById(panelId).classList.remove("active");
}

function closeAllPanels() {
    ['test_compiler', 'code-view', 'blockly-view', 'info', 'class-view'].forEach(id => {
        closePanel(id);
    });
}

function openMenu() {
    document.getElementById("menu-container").classList.add("active");
}

function closeMenu() {
    document.getElementById("menu-container").classList.remove("active");
}

/***** 教學流程（只介紹重點區塊） *****/
function initTutorialSteps() {
    tutorialSteps = [{
            element: document.getElementById("searchContainer"),
            text: "【搜尋區】：在此輸入方塊 ID 進行搜尋。"
        },
        {
            element: document.querySelector(".actions"),
            text: "【功能按鈕區】：包含編譯、執行、快速教學及設定。"
        },
        {
            element: document.getElementById("blockly-workspace"),
            text: "【Blockly 工作區】：在此拖曳積木設計程式。"
        },

        // Menu 介紹
        {
            preAction: () => {
                openMenu();
            },
            element: document.getElementById("menu-container"),
            text: "這是【Menu】，包含各種功能。"
        },
        {
            element: document.getElementById("menu-codeview"),
            text: "【測試編譯】：點此開啟測試編譯面板。"
        },
        {
            element: document.getElementById("menu-conversion"),
            text: "【轉換代碼】：點此顯示轉換後的 C++ 程式碼。"
        },
        {
            element: document.getElementById("menu-intro"),
            text: "【方塊說明】：點此查看積木詳細說明。"
        },
        {
            element: document.getElementById("menu-class-intro"),
            text: "【分類說明】：點此查看模組詳細說明。"
        },
        {
            element: document.getElementById("menu-info"),
            text: "【關於我們】：點此顯示網站與團隊資訊。"
        },
        {
            preAction: () => {},
            element: document.getElementById("menu-container"),
            text: "【Menu 介紹完成】"
        },

        // 各面板介紹
        {
            preAction: () => {
                closeMenu();
                openPanel("test_compiler");
            },
            element: document.getElementById("test_compiler"),
            text: "【測試編譯面板】：輸入測資並查看結果。"
        },
        {
            preAction: () => {
                openPanel("code-view");
            },
            element: document.getElementById("code-view"),
            text: "【轉換程式碼面板】：顯示從 Blockly 轉換出的 C++ 程式碼。"
        },
        {
            preAction: () => {
                openPanel("blockly-view");
            },
            element: document.getElementById("blockly-view"),
            text: "【方塊說明面板】：提供積木使用說明。"
        },
        {
            preAction: () => {
                openPanel("class-view");
            },
            element: document.getElementById("class-view"),
            text: "【分類說明面板】：提供查詢模組說明。"
        },
        {
            preAction: () => {
                closePanel("class-view");
                openPanel("info");
            },
            element: document.getElementById("info"),
            text: "【關於我們面板】：顯示網站與團隊資訊。"
        }
    ];
}

// 輔助函式：等待目標元素完成 transition（或 fallback 800ms）
function waitForTransitionEnd(element, callback) {
    if (!element) {
        callback();
        return;
    }
    // 強制 reflow，確保更新
    element.offsetHeight;
    let called = false;

    function done() {
        if (!called) {
            called = true;
            callback();
        }
    }
    element.addEventListener('transitionend', done, {
        once: true
    });
    setTimeout(done, 800); // 延長 fallback 時間
}

function showNextTutorialStep() {
    if (currentStep < tutorialSteps.length) {
        let step = tutorialSteps[currentStep];

        // 淡出上一個步驟（高亮與 tooltip）
        let highlight = document.getElementById("highlight");
        let tooltip = document.getElementById("tooltip");
        highlight.style.opacity = "0";
        tooltip.style.opacity = "0";
        tooltip.style.transform = "scale(0.95)";

        setTimeout(() => { // 等待淡出動畫完成
            if (step.preAction) step.preAction();

            // 等待目標元素動畫結束後再計算正確位置
            waitForTransitionEnd(step.element, () => {
                let overlay = document.getElementById("overlay");
                let highlight = document.getElementById("highlight");
                let tooltip = document.getElementById("tooltip");

                if (step.element) {
                    // 強制 reflow以獲取正確尺寸
                    step.element.offsetHeight;
                    let rect = step.element.getBoundingClientRect();
                    let scrollY = window.scrollY || document.documentElement.scrollTop;

                    // 設定高亮框位置與尺寸
                    highlight.style.top = `${rect.top + scrollY}px`;
                    highlight.style.left = `${rect.left}px`;
                    highlight.style.width = `${rect.width * 0.98}px`;
                    highlight.style.height = `${rect.height * 0.98}px`;
                    highlight.style.opacity = "1";
                    highlight.style.display = "block";

                    // 計算 Tooltip 最佳位置（面板介紹固定放左側、工作區置中）
                    let ttWidth = 280,
                        ttHeight = 80,
                        margin = 10;
                    let chosenPosition = {};
                    if (step.element.id === "blockly-workspace") {
                        chosenPosition.top = rect.top + scrollY + (rect.height - ttHeight) / 2;
                        chosenPosition.left = rect.left + (rect.width - ttWidth) / 2;
                    } else if (["test_compiler", "code-view", "blockly-view", "info", "class-view"].includes(step.element.id)) {
                        chosenPosition.top = rect.top + scrollY + (rect.height - ttHeight) / 2;
                        chosenPosition.left = rect.left - ttWidth - margin;
                        if (chosenPosition.left < margin) {
                            chosenPosition.left = margin;
                        }
                    } else {
                        // 備選位置邏輯
                        let positions = [{
                                top: rect.bottom + scrollY + margin,
                                left: rect.left
                            },
                            {
                                top: rect.top + scrollY - ttHeight - margin,
                                left: rect.left
                            },
                            {
                                top: rect.top + scrollY,
                                left: rect.right + margin
                            },
                            {
                                top: rect.top + scrollY,
                                left: rect.left - ttWidth - margin
                            }
                        ];
                        chosenPosition = positions[0];
                        for (let pos of positions) {
                            if (pos.top > scrollY && pos.top + ttHeight < window.innerHeight + scrollY &&
                                pos.left > 0 && pos.left + ttWidth < window.innerWidth) {
                                chosenPosition = pos;
                                break;
                            }
                        }
                    }

                    tooltip.style.top = `${chosenPosition.top}px`;
                    tooltip.style.left = `${chosenPosition.left}px`;
                    tooltip.style.display = "block";
                    tooltip.style.opacity = "1";
                    tooltip.style.transform = "scale(1)";
                    document.getElementById("tooltip-text").innerText = step.text;
                } else {
                    highlight.style.display = "none";
                    tooltip.style.display = "block";
                    tooltip.style.top = "60px";
                    tooltip.style.left = "20px";
                    tooltip.style.opacity = "1";
                    tooltip.style.transform = "scale(1)";
                    document.getElementById("tooltip-text").innerText = step.text;
                }
                overlay.style.display = "block";
            });
        }, 300); // 淡出動畫時間

        currentStep++;
    } else {
        endTutorial();
    }
}

function endTutorial() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("highlight").style.display = "none";
    document.getElementById("tooltip").style.display = "none";
    teachingMode = false;
    currentStep = 0;
    closeAllPanels();
    closeMenu();
    alert("教學結束！");
}

/***** 教學啟動 *****/
document.getElementById("start-tutorial").addEventListener("click", () => {
    teachingMode = true;
    closeAllPanels();
    closeMenu();
    document.getElementById("overlay").style.display = "block";
    document.getElementById("highlight").style.display = "none";
    document.getElementById("tooltip").style.display = "none";
    initTutorialSteps();
    currentStep = 0;
    showNextTutorialStep();
});
document.getElementById("next-step").addEventListener("click", showNextTutorialStep);

/***** menu 按鈕點擊事件 *****/
document.getElementById("menu").addEventListener("click", function() {
    if (teachingMode) return;
    let menuContainer = document.getElementById("menu-container");
    if (menuContainer.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});
document.getElementById("menu-codeview").addEventListener("click", function() {
    togglePanel("test_compiler");
});
document.getElementById("menu-conversion").addEventListener("click", function() {
    togglePanel("code-view");
});
document.getElementById("menu-intro").addEventListener("click", function() {
    togglePanel("blockly-view");
});
document.getElementById("menu-info").addEventListener("click", function() {
    togglePanel("info");
});
document.getElementById("menu-class-intro").addEventListener("click", function() {
    togglePanel("class-view");
});

/***** 其他原有功能保持不變 *****/
window.addEventListener("resize", function() {
    Blockly.svgResize(workspace);
});

// 搜尋系統
function findBlocksRecursively(contents, searchTerms) {
    const results = [];
    contents.forEach(item => {
        if (item.kind === 'block' && item.type) {
            if (searchTerms.some(term => item.type.toLowerCase().includes(term))) {
                results.push(item);
            }
        } else if (item.kind === 'category' && item.contents) {
            results.push(...findBlocksRecursively(item.contents, searchTerms));
        }
    });
    return results;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        alert('Please enter a search term.');
        return;
    }

    const searchTerms = searchTerm.split(',').map(term => term.trim());
    const searchResults = findBlocksRecursively(toolbox.contents, searchTerms);

    // 更新或新增 "Search" 分類
    const updatedToolbox = JSON.parse(JSON.stringify(toolbox));
    const searchCategoryIndex = updatedToolbox.contents.findIndex(
        category => category.name === '搜尋'
    );

    const searchCategory = {
        kind: "category",
        name: "搜尋",
        colour: "#A1A1A1",
        contents: []
    };

    if (searchResults.length > 0) {
        searchResults.forEach(block => {
            searchCategory.contents.push({
                kind: "block",
                type: block.type
            });
        });
    } else {
        searchCategory.contents.push({
            kind: "label",
            text: "No results found"
        });
    }

    if (searchCategoryIndex !== -1) {
        updatedToolbox.contents[searchCategoryIndex] = searchCategory;
    } else {
        updatedToolbox.contents.push(searchCategory);
    }

    workspace.updateToolbox(updatedToolbox);
});

// 幫助筆記選項
Blockly.ContextMenuRegistry.registry.register({
    id: 'help_custom',
    weight: 100,
    displayText: function() {
        return "help?";
    },
    preconditionFn: function(scope) {
        return 'enabled'; // 確保選項顯示
    },
    callback: function(scope) {
        window.open("https://hackmd.io/@cpp-blockly", "_blank");
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    alt: false,
    shift: false
});

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

Blockly.Blocks['define_class'] = {
    init: function() {
        this.jsonInit({
            "type": "define_class",
            "message0": "類別",
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

Blockly.Cpp = new Blockly.Generator('Cpp');
Blockly.Cpp.ORDER_ATOMIC = 1;
Blockly.Cpp.ORDER_NONE = 99;

Blockly.Cpp.init(workspace);

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

var id_code = '';
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

export function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
}

export function downloadText(elementId, filename) {
    const text = document.getElementById(elementId).textContent;
    const blob = new Blob([text], {
        type: "text/plain"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
window.copyText = copyText;
window.downloadText = downloadText;

const sent_data = document.getElementById('sent_data');
const reset = document.getElementById('reset');
const textarea = document.getElementById('textarea');
reset.addEventListener('click', () => {
    textarea.value = '';
    alert('測資已清除');
});
const reset_2 = document.getElementById('reset_2');
const report = document.getElementById('report');
reset_2.addEventListener('click', () => {
    report.value = '結果將顯示在這裡...';
    alert('編譯執行結果歷史紀錄已刪除');
});
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

(function() {
    let blockExplanations = {}; // 存放 JSON 資料

    // **載入 JSON 資料**
    fetch("https://raw.githubusercontent.com/EricbobXD/C_plus_plus_Blockly/main/databases/block_info.json")
        .then(response => response.json())
        .then(data => {
            blockExplanations = data;

            // 確保資料載入後，再更新面板
            updateExplanationPanel('block_name'); // 用實際的 blockType 替代 'block_name'
        })
        .catch(error => console.error("載入 JSON 失敗:", error));

    // **更新「方塊說明」面板**
    function updateExplanationPanel(blockType) {
        const panel = document.getElementById("blockly-view");

        // 確保 JSON 資料已載入，且 blockType 存在於 JSON 內
        if (blockType && blockExplanations[blockType]) {
            const desc = blockExplanations[blockType];

            // 替換 notice 的換行符號
            desc.notice = (desc.notice || "").replace(/\n/g, "<br>");

            panel.innerHTML = `
                <header>
                    <span>方塊 ID：${desc.blockName}</span>
                </header>
                <div style="padding: 10px; overflow-y: auto; max-height: calc(100vh - 150px);">
                    <p><strong>簡單說明：</strong>${desc.brief}</p>
                    <p><strong>注意事項：</strong>${desc.notice}</p>
                    <p><strong>格式：</strong></p>
                    <pre><code class="language-cpp">${desc.formatEnglish}</code></pre>
                    <pre><code class="language-cpp">${desc.formatChinese}</code></pre>
                    <p><strong>C++ 範例：</strong></p>
                    <pre><code class="language-cpp">${desc.cppExample}</code></pre>
                </div>
            `;
        } else {
            // 沒有選擇方塊的預設內容
            panel.innerHTML = `
                <header>
                    <span>Blockly 說明</span>
                </header>
                <div>
                    <p>點擊方塊查看說明。</p> 
                </div>
            `;
        }

        // 呼叫 highlight.js 高亮程式碼
        panel.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // **取得 Blockly 工作區容器（使用 id="blockly-workspace"）**
    const workspaceContainer = document.getElementById('blockly-workspace');
    if (workspaceContainer) {
        workspaceContainer.addEventListener('click', function(e) {
            const elementWithId = e.target.closest('[data-id]');
            if (elementWithId) {
                const blockId = elementWithId.getAttribute('data-id');
                if (blockId && typeof workspace !== 'undefined') {
                    const block = workspace.getBlockById(blockId);
                    if (block) {
                        updateExplanationPanel(block.type);
                        return; // **找到方塊後結束處理**
                    }
                }
            }
            // **若點擊位置不屬於任何方塊，則重置面板**
            updateExplanationPanel(null);
        });
    }
})();

let categoryData = {}; // 載入分類資料
fetch("https://ericbobxd.github.io/C_plus_plus_Blockly/databases/category_info.json") // ← 這裡是新版 JSON 網址
    .then(response => response.json())
    .then(data => {
        categoryData = data;
        renderCategoryMainView();
    })
    .catch(error => console.error("載入分類 JSON 失敗:", error));

// 顯示主分類按鈕
function renderCategoryMainView() {
    const container = document.getElementById("category-details");
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
    container.style.gap = "10px";

    const topic = document.getElementById("topic");
    if (topic) topic.innerHTML = "";

    const sortedKeys = Object.keys(categoryData).sort((a, b) => a.localeCompare(b));

    for (const catName of sortedKeys) {
        const btn = document.createElement("button");
        btn.className = "category-button";
        btn.style.borderRadius = "10px";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.padding = "10px";
        btn.style.height = "80px";

        const span = document.createElement("span");
        span.textContent = formatDisplayName(catName);
        btn.appendChild(span);

        btn.addEventListener("click", () => {
            renderCategoryDetail(catName);
        });

        container.appendChild(btn);
    }
}

// 顯示分類詳細內容（iframe 模式）
function renderCategoryDetail(categoryName) {
    const container = document.getElementById("category-details");
    container.innerHTML = "";
    container.style.display = "block";

    const header = document.getElementById("topic");
    if (header) {
        header.innerHTML = "";

        const backBtn = document.createElement("button");
        backBtn.textContent = "返回";
        backBtn.style.borderRadius = "10px";
        backBtn.style.padding = "5px 10px";
        backBtn.style.marginRight = "10px";
        backBtn.addEventListener("click", renderCategoryMainView);
        header.appendChild(backBtn);
    }

    const titleElement = document.createElement("h3");
    titleElement.innerText = formatDisplayName(categoryName);
    container.appendChild(titleElement);

    const url = categoryData[categoryName]?.url;
    if (url) {
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "calc(100vh - 200px)";
        iframe.style.border = "none";
        iframe.loading = "lazy";
        container.appendChild(iframe);
    } else {
        container.innerHTML += `<p style="color: gray;">❗ 此分類尚未提供說明連結。</p>`;
    }
}

// 格式化顯示名稱（自動首字大寫 + 去底線）
function formatDisplayName(name) {
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

const model = ['var', 'array', 'func', 'get'];
model.forEach(t => workspace.registerButtonCallback(`${t}_category`, function(){document.getElementById(`${t}_model`).style.display = "block";}));
 
const CategoryType = ["VAR", "PTR", "REF", 
                      "Array", "Vector", "Deque", 
                      "Stack", "Queue", "Priority_queue", 
                      "Set", "Unordered_set", "Flat_set", "Multiset", 
                      "Map", "Unordered_map", "Pair", 
                      "Bitset", 
                      "Function", "Lambda", 
                      "Struct", "Struct_Name", "Class", "Class_Name"
                     ];
CategoryType.forEach(t => Blockly.Cpp[t] = []);

const usedName = new Set();

if (!window.data_type_checked) {
    window.data_type_checked = {};
    CategoryType.forEach(t => window.data_type_checked[t] = false);
}

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

/*
function NewButton(type){
    const new_button = document.createElement('button');
    new_button.innerHTML = `創建${type}變數`;
    new_button.style.margin = '5px';

    new_button.addEventListener('click', function(){
        var type_lower = type.toLowerCase();
        Confirm(`${type}Name`, `${type_lower}type`, "get_model", Utils.Create_getName);
    })

    const container = document.querySelector('blockly-workspace');
    console.log(container);
    container.appendChild(new_button); 
}
*/