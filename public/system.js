        /***** 全域變數 *****/
        let teachingMode = false; // 教學進行時禁止一般操作
        let tutorialSteps = [];
        let currentStep = 0;

        /***** 面板開關函式 *****/
        function togglePanel(panelId) {
            if (teachingMode) return; // 教學中不允許切換
            // 關閉其他面板
            ['test_compiler', 'code-view', 'blockly-view', 'info'].forEach(id => {
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
            ['test_compiler', 'code-view', 'blockly-view', 'info'].forEach(id => {
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
                            } else if (["test_compiler", "code-view", "blockly-view", "info"].includes(step.element.id)) {
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

        // 方塊分類
        const response = await fetch('https://cplusplusblockly-production.up.railway.app/get_toolbox', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const toolbox = await response.json();
        console.log(response);
        console.log("Toolbox loaded:", toolbox); // Debug 輸出

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
        Blockly.svgResize(workspace);
        workspace.zoomToFit();
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

        Blockly.Cpp = new Blockly.Generator('Cpp');
        Blockly.Cpp.ORDER_ATOMIC = 1;
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

        function copyText(elementId) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text).then(() => alert("Copied!"));
        }

        function downloadText(elementId, filename) {
            const text = document.getElementById(elementId).textContent;
            const blob = new Blob([text], {
                type: "text/plain"
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }

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
            // 定義所有方塊說明資料的 JSON 陣列
            const blockExplanations = [{
                    "blockName": "if_block",
                    "convertedCode": "if (condition) {\n    /* code */\n}",
                    "brief": "條件判斷，當條件為真時執行特定區塊。",
                    "blocklyExample": "images/if_example.png",
                    "cppExample": "if (a > b) {\n  std::cout << \"a > b\";\n}"
                },
                {
                    "blockName": "for_block",
                    "convertedCode": "for (int i = 0; i < n; i++) { /* code */ }",
                    "brief": "迴圈重複執行區塊。",
                    "blocklyExample": "images/for_example.png",
                    "cppExample": "for (int i = 0; i < 10; i++) {\n  std::cout << i;\n}"
                }
                // 可依需求新增其他方塊的說明資料
            ];

            // 更新「方塊說明」面板（假設該面板使用 id="blockly-view"）
            function updateExplanationPanel(desc) {
                const panel = document.getElementById("blockly-view");
                if (desc) {
                    panel.innerHTML = `
            <header>
              <span>方塊 ID：${desc.blockName}</span>
            </header>
            <div style="padding: 10px; overflow-y: auto; max-height: calc(100vh - 150px);">
              <p><strong>簡單說明：</strong>${desc.brief}</p>
              <p><strong>轉換程式碼：</strong></p>
              <pre><code class="language-cpp">${desc.convertedCode}</code></pre>
              <p><strong>使用範例：</strong></p>
              <p><img src="${desc.blocklyExample}" alt="${desc.blockName}" style="max-width:100%; height:auto; margin-bottom:10px;"></p>
              <p><strong>C++ 範例：</strong></p>
              <pre><code class="language-cpp">${desc.cppExample}</code></pre>
            </div>
          `;
                } else {
                    // 預設內容：當沒有點擊到任何方塊時顯示
                    panel.innerHTML = `
            <header>
              <span>Blockly 說明</span>
            </header>
            <div>
              <p>點擊方塊查看說明。</p> 
            </div>
          `;
                }
                // 呼叫 highlight.js 處理面板中所有程式碼區塊
                panel.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }

            // 根據方塊類型（block.type）尋找對應的說明資料
            function getExplanationByBlockType(blockType) {
                return blockExplanations.find(item => item.blockName === blockType);
            }

            // 取得 Blockly 工作區容器（使用 id="blockly-workspace"）
            const workspaceContainer = document.getElementById('blockly-workspace');
            if (workspaceContainer) {
                workspaceContainer.addEventListener('click', function(e) {
                    // 使用 closest() 判斷點擊位置是否位於包含 data-id 屬性的元素上
                    const elementWithId = e.target.closest('[data-id]');
                    if (elementWithId) {
                        const blockId = elementWithId.getAttribute('data-id');
                        if (blockId && typeof workspace !== 'undefined') {
                            const block = workspace.getBlockById(blockId);
                            if (block) {
                                const explanation = getExplanationByBlockType(block.type);
                                updateExplanationPanel(explanation);
                                return; // 找到對應方塊後結束事件處理
                            }
                        }
                    }
                    // 若點擊位置不屬於任何方塊，則重置面板為預設內容
                    updateExplanationPanel(null);
                });
            }
        })();
