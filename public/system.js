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
        const toolbox = {
            "kind": "categoryToolbox",
            "contents": [{
                    "kind": "category",
                    "name": "STL模組",
                    "contents": [{
                            "kind": "category",
                            "name": "vector",
                            "colour": "#6c5ce7",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_vector"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_push_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_emplace_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_append_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_pop_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_insert"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_insert_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_erase"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_swap"
                                },
                                {
                                    "kind": "label",
                                    "text": "Vector 讀取元素"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_operate[]"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_back"
                                },
                                {
                                    "kind": "label",
                                    "text": "Vector 條件判斷"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_clear"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_reserve"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_capacity"
                                },
                                 {
                                    "kind": "block",
                                    "type": "vector_max_size"
                                },
                                {
                                    "kind": "label",
                                    "text": "Vector 迭代器"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_begin"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_end"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_rbegin"
                                },
                                {
                                    "kind": "block",
                                    "type": "vector_rend"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "set",
                            "colour": "#e67e22",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_set"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_insert"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_insert_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_erase"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_extract"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_merge"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_swap"
                                },
                                {
                                    "kind": "label",
                                    "text": "Set 條件判斷"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_clear"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_max_size"
                                },
                                {
                                    "kind": "label",
                                    "text": "Set 尋找元素"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_count"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_find"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_contains"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_equal_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_lower_bound"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_upper_bound"
                                },
                                {
                                    "kind": "label",
                                    "text": "set 迭代器"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_begin"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_end"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_rbegin"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_rend"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "map",
                            "colour": "#1abc9c",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_map"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_insert"
                                },
                                {
                                    "kind": "block",
                                    "type": "map[i]"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_clear"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_first"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_second"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_find"
                                },
                                {
                                    "kind": "label",
                                    "text": "map 迭代器"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_begin"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_end"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_rbegin"
                                },
                                {
                                    "kind": "block",
                                    "type": "map_rend"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "pair",
                            "colour": "#338f35",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_pair"
                                },
                                {
                                    "kind": "block",
                                    "type": "pair_first"
                                },
                                {
                                    "kind": "block",
                                    "type": "pair_second"
                                },
                                {
                                    "kind": "block",
                                    "type": "make_pair"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "stack",
                            "colour": "#c74134",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_stack"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_top"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_push"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_push_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_pop"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "stack_swap"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "queue",
                            "colour": "#fd79a8",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_queue"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_push"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_push_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_pop"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "queue_swap"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "deque",
                            "colour": "#dde3b0",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_deque"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_push_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_emplace_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_append_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_pop_back"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_push_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_emplace_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_prepend_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_pop_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_insert"
                                },
                                 {
                                    "kind": "block",
                                    "type": "deque_insert_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_erase"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_swap"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_assign"
                                },
                                {
                                    "kind": "label",
                                    "text": "Deque 讀取元素"
                                },
                                 {
                                    "kind": "block",
                                    "type": "deque_operate[]"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_back"
                                },
                                {
                                    "kind": "label",
                                    "text": "Deque 條件判斷"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_clear"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_empty"
                                },
                                {
                                    "kind": "label",
                                    "text": "Deque 迭代器"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_begin"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_end"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_rbegin"
                                },
                                {
                                    "kind": "block",
                                    "type": "deque_rend"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "priority_queue",
                            "colour": "#f1c40f",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_priority_queue"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_front"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_push"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_push_range"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_pop"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_empty"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "priority_queue_swap"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "bitset",
                            "colour": "#d35400",
                            "contents": [{
                                    "kind": "block",
                                    "type": "define_bitset"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset[i]"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_size"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_count"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_set"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_reset"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_all"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_any"
                                },
                                {
                                    "kind": "block",
                                    "type": "bitset_none"
                                },
                                {
                                    "kind": "block",
                                    "type": "get_var"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "algorithm",
                            "colour": "#247bb5",
                            "contents": [{
                                    "kind": "block",
                                    "type": "sort"
                                },
                                {
                                    "kind": "block",
                                    "type": "max"
                                },
                                {
                                    "kind": "block",
                                    "type": "min"
                                },
                                {
                                    "kind": "block",
                                    "type": "find"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "iomanip",
                            "colour": "#00bab6",
                            "contents": [{
                                    "kind": "block",
                                    "type": "setbase"
                                },
                                {
                                    "kind": "block",
                                    "type": "setprecision"
                                },
                                {
                                    "kind": "block",
                                    "type": "setw"
                                },
                                {
                                    "kind": "block",
                                    "type": "setfill"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "math",
                            "colour": "#2980b9",
                            "contents": [{
                                    "kind": "block",
                                    "type": "math_ceil"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_floor"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_sqrt"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_abs"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_random"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_sine"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_cosine"
                                },
                                {
                                    "kind": "block",
                                    "type": "math_tangent"
                                }
                            ]
                        },
                        {
                            "kind": "category",
                            "name": "ctime",
                            "colour": "#8e44ad",
                            "contents": [{
                                    "kind": "block",
                                    "type": "get_current_timestamp"
                                },
                                {
                                    "kind": "block",
                                    "type": "calculate_time_difference"
                                },
                                {
                                    "kind": "block",
                                    "type": "convert_to_local_time"
                                },
                                {
                                    "kind": "block",
                                    "type": "convert_to_utc_time"
                                },
                                {
                                    "kind": "block",
                                    "type": "format_time_string"
                                },
                                {
                                    "kind": "block",
                                    "type": "set_time_structure"
                                },
                                {
                                    "kind": "block",
                                    "type": "read_time_structure_member"
                                },
                                {
                                    "kind": "block",
                                    "type": "get_current_local_time"
                                },
                                {
                                    "kind": "block",
                                    "type": "get_current_utc_time"
                                }
                            ]
                        }
                    ]
                },
                {
                    "kind": "sep"
                },
                { // function
                    "kind": "category",
                    "name": "自定義函式",
                    "colour": "#db00db",
                    "contents": [{
                            "kind": "block",
                            "type": "define_function_void"
                        },
                        {
                            "kind": "block",
                            "type": "define_function"
                        },
                        {
                            "kind": "block",
                            "type": "function_call"
                        },
                        {
                            "kind": "block",
                            "type": "lambda"
                        },

                        {
                            "kind": "label",
                            "text": "變數定義"
                        },
                        {
                            "kind": "block",
                            "type": "def_var"
                        },
                        {
                            "kind": "block",
                            "type": "def_ptr"
                        },
                        {
                            "kind": "block",
                            "type": "def_ref"
                        },
                        {
                            "kind": "block",
                            "type": "string_commas"
                        }
                    ]
                },
                { // variable
                    "kind": "category",
                    "name": "變數資料類型",
                    "colour": "#C9A200",
                    "contents": [{
                            "kind": "block",
                            "type": "define_variable"
                        },
                        {
                            "kind": "block",
                            "type": "var_equal"
                        },
                        {
                            "kind": "block",
                            "type": "get_var"
                        }
                    ]
                },
                { // pointer
                    "kind": "category",
                    "name": "自定義指標",
                    "colour": "#5f9ea0",
                    "contents": [{
                            "kind": "label",
                            "text": "pointer"
                        },
                        {
                            "kind": "block",
                            "type": "define_pointer"
                        },
                        {
                            "kind": "block",
                            "type": "ptr_equal"
                        },
                        {
                            "kind": "block",
                            "type": "get_ptr"
                        },
                        {
                            "kind": "block",
                            "type": "ptr_of"
                        },
                        {
                            "kind": "block",
                            "type": "ptr_to"
                        },
                        {
                            "kind": "label",
                            "text": "reference"
                        },
                        {
                            "kind": "block",
                            "type": "define_reference"
                        },
                        {
                            "kind": "block",
                            "type": "ref_equal"
                        },
                        {
                            "kind": "block",
                            "type": "get_ref"
                        },
                        {
                            "kind": "block",
                            "type": "nullptr"
                        }
                    ]
                },
                { // array
                    "kind": "category",
                    "name": "陣列 Array",
                    "colour": "#ff5757",
                    "contents": [{
                            "kind": "block",
                            "type": "define_array"
                        },
                        {
                            "kind": "block",
                            "type": "array_name_block"
                        },
                        {
                            "kind": "block",
                            "type": "array_content"
                        },
                        {
                            "kind": "block",
                            "type": "array_operate[]"
                        }
                    ]
                },
                { // struct & class
                    "kind": "category",
                    "name": "結構與類別",
                    "colour": "#f4a460",
                    "contents": [{
                            "kind": "label",
                            "text": "Struct"
                        },
                        {
                            "kind": "block",
                            "type": "define_struct"
                        },
                        {
                            "kind": "block",
                            "type": "get_struct"
                        },

                        {
                            "kind": "label",
                            "text": "Class"
                        },
                        {
                            "kind": "block",
                            "type": "define_class"
                        },
                        {
                            "kind": "block",
                            "type": "get_class"
                        },
                        {
                            "kind": "label",
                            "text": "Function"
                        },
                        {
                            "kind": "block",
                            "type": "define_function"
                        },
                        {
                            "kind": "block",
                            "type": "define_function_void"
                        }
                    ]
                },
                { // text and more
                    "kind": "category",
                    "name": "文本操作",
                    "colour": "#FF8C00",
                    "contents": [{
                            "kind": "block",
                            "type": "label"
                        },
                        {
                            "kind": "block",
                            "type": "add_line"
                        },
                        {
                            "kind": "block",
                            "type": "tab"
                        },
                        {
                            "kind": "block",
                            "type": "comment_block"
                        },

                        {
                            "kind": "label",
                            "text": "擴充模組"
                        },
                        {
                            "kind": "block",
                            "type": "string_plus"
                        },
                        {
                            "kind": "block",
                            "type": "string_commas"
                        }
                    ]
                },
                { // input/output
                    "kind": "category",
                    "name": "資料輸入輸出",
                    "colour": "#2EC832",
                    "contents": [{
                            "kind": "block",
                            "type": "cin_block"
                        },
                        {
                            "kind": "block",
                            "type": "cout_block"
                        },

                        {
                            "kind": "label",
                            "text": "解除限制"
                        },
                        {
                            "kind": "block",
                            "type": "boost_ios_sync"
                        },
                        {
                            "kind": "block",
                            "type": "boost_cin_cout_tie"
                        },

                        {
                            "kind": "label",
                            "text": "擴充模組"
                        },
                        {
                            "kind": "block",
                            "type": "string_cin"
                        },
                        {
                            "kind": "block",
                            "type": "string_cout"
                        }
                    ]
                },
                { // math and caculate
                    "kind": "category",
                    "name": "數學與運算",
                    "colour": "#1F91B5",
                    "contents": [{
                            "kind": "block",
                            "type": "logic_operators"
                        },
                        {
                            "kind": "block",
                            "type": "or_and_xor"
                        },
                        {
                            "kind": "block",
                            "type": "var_calculate"
                        },
                        {
                            "kind": "block",
                            "type": "math_calculate"
                        },
                        {
                            "kind": "block",
                            "type": "number"
                        },
                        {
                            "kind": "block",
                            "type": "false"
                        },
                        {
                            "kind": "block",
                            "type": "true"
                        },
                        {
                            "kind": "block",
                            "type": "logic_not"
                        },

                        {
                            "kind": "label",
                            "text": "擴充模組"
                        },
                        {
                            "kind": "block",
                            "type": "math_plus"
                        },
                        {
                            "kind": "block",
                            "type": "math_multiply"
                        },
                        {
                            "kind": "block",
                            "type": "math_percent"
                        },
                        {
                            "kind": "block",
                            "type": "math_divide"
                        },
                        {
                            "kind": "block",
                            "type": "math_subtract"
                        }

                    ]
                },
                { // condition and loop
                    "kind": "category",
                    "name": "條件與終止",
                    "colour": "#00ABEA",
                    "contents": [{
                            "kind": "block",
                            "type": "if_block"
                        },
                        {
                            "kind": "block",
                            "type": "switch_block"
                        },
                        {
                            "kind": "block",
                            "type": "break_block"
                        },
                        {
                            "kind": "block",
                            "type": "continue_block"
                        },
                        {
                            "kind": "block",
                            "type": "return_block"
                        }
                    ]
                },
                { // loop
                    "kind": "category",
                    "name": "迴圈",
                    "colour": "#2473c2",
                    "contents": [{
                            "kind": "block",
                            "type": "for_block"
                        },
                        {
                            "kind": "label",
                            "text": "初始變數值"
                        },
                        {
                            "kind": "block",
                            "type": "def_var"
                        },
                        {
                            "kind": "label",
                            "text": "循環條件"
                        },
                        {
                            "kind": "block",
                            "type": "logic_operators"
                        },
                        {
                            "kind": "label",
                            "text": "迴圈條件"
                        },
                        {
                            "kind": "block",
                            "type": "var_cal"
                        },
                        {
                            "kind": "block",
                            "type": "while_block"
                        }
                    ]
                },
                { // another
                    "kind": "category",
                    "name": "基本工具",
                    "colour": "#123456",
                    "contents": [{
                            "kind": "block",
                            "type": "include_std_block"
                        },
                        {
                            "kind": "block",
                            "type": "include_pbds_block"
                        },
                        {
                            "kind": "block",
                            "type": "std_space_block"
                        },
                        {
                            "kind": "block",
                            "type": "pbds_space_block"
                        },
                        {
                            "kind": "block",
                            "type": "define_block"
                        },
                        {
                            "kind": "block",
                            "type": "typedef_block"
                        }
                    ]
                },
            ]
        };

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
