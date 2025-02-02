        // 各項設定以及系統工具
        // 切換顯示尺寸(各占一半,程式碼/測試,全Blockly)
        let currentModeIndex = 0;
        const modes = [
            { className: '', next: '各占一半' },
            { className: 'code-only', next: '程式碼/測試' },
            { className: 'blockly-only', next: '全Blockly' },
        ];

        function toggleView() {
            const mainContainer = document.getElementById('main-container');
            const toggleButton = document.getElementById('toggle-button');
            currentModeIndex = (currentModeIndex + 1) % modes.length;
            mainContainer.className = modes[currentModeIndex].className;
            toggleButton.textContent = modes[currentModeIndex].next;
            Blockly.svgResize(workspace);

            // 先執行縮放到適合大小
            workspace.zoomToFit();

            // 延遲進一步調整縮放比例
            setTimeout(() => {
                workspace.setScale(0.75); // 設置縮放比例為 0.75
                const metrics = workspace.getMetrics();

                // 重新置中
                const xOffset = (metrics.viewWidth - metrics.contentWidth * 0.5) / 2.2;
                const yOffset = (metrics.viewHeight - metrics.contentHeight * 0.5) / 3.1;
                workspace.scroll(xOffset, yOffset);
            }, 100); // 延遲 100 毫秒以確保 `zoomToFit` 生效
        }

        document.getElementById('toggle-button').textContent = "切換模式"; // 初始樣式

        // 網頁教學系統
        window.onload = function () {
            const steps = []; // 初始化 steps 變數
    
            // 設置教學步驟
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.setAttribute('data-step', '1');
            searchContainer.setAttribute('data-text', '這是搜尋區域，您可以輸入Block ID搜尋您要的方塊。');
            steps.push(searchContainer);
    
            const actions = document.querySelector('.actions');
            actions.setAttribute('data-step', '2');
            actions.setAttribute('data-text', '這是按鈕區域，包含了編譯、執行等功能按鈕。');
            steps.push(actions);
    
            const blocklyWorkspace = document.getElementById('blockly-workspace');
            blocklyWorkspace.setAttribute('data-step', '3');
            blocklyWorkspace.setAttribute('data-text', '這是 Blockly 的工作區，您可以在旁邊的列表裡拖曳程式積木來設計程式。');
            steps.push(blocklyWorkspace);
    
            const codeview = document.querySelector('.code-view');
            codeview.setAttribute('data-step', '4');
            codeview.setAttribute('data-text', '這是呈現轉換後的程式碼、測試和編譯區域，您可以在這裡觀察結果。');
            steps.push(codeview);
    
            const overlay = document.getElementById('overlay');
            const highlight = document.getElementById('highlight');
            const tooltip = document.getElementById('tooltip');
            const tooltipText = document.getElementById('tooltip-text');
            const nextButton = document.getElementById('next-step');
    
            let currentStep = 0;
    
            function highlightStep(stepIndex) {
                const step = steps[stepIndex];

                // 獲取當前步驟的邊界框
                const rect = step.getBoundingClientRect();
                const scrollY = window.scrollY || document.documentElement.scrollTop;

                // 設置高亮框選的位置
                highlight.style.top = `${rect.top + scrollY}px`;
                highlight.style.left = `${rect.left}px`;
                highlight.style.width = `${rect.width}px`;
                highlight.style.height = `${rect.height}px`;

                // 設置提示框的位置
                if (stepIndex === 2 || stepIndex === 3) { // 如果是最後兩個步驟
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;

                    tooltipText.innerText = step.dataset.text;
                    tooltip.style.top = `${centerY + 20}px`; // 提示框位置在螢幕中心下方
                    tooltip.style.left = `${centerX - tooltip.offsetWidth / 2}px`; // 提示框居中
                } else {
                    tooltipText.innerText = step.dataset.text;
                    tooltip.style.top = `${rect.bottom + scrollY + 10}px`; // 提示框位置在高亮下方
                    tooltip.style.left = `${rect.left}px`;
                }

                highlight.style.display = 'block';
                tooltip.style.display = 'block';
            }

            
            function showNextStep() {
                if (currentStep < steps.length) {
                    highlightStep(currentStep);
                    currentStep++;
                } else {
                    endTutorial();
                }
            }
    
            function endTutorial() {
                overlay.style.display = 'none';
                highlight.style.display = 'none';
                tooltip.style.display = 'none';
                currentStep = 0;
            }
    
            document.getElementById('start-tutorial').addEventListener('click', () => {
                overlay.style.display = 'block';
                showNextStep();
            });
    
            nextButton.addEventListener('click', showNextStep);
        };

        // 搜尋系統
        let clearSearchTimeout;

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
                category => category.name === 'Search'
            );

            const searchCategory = {
                kind: "category",
                name: "Search",
                contents: []
            };

            if (searchResults.length > 0) {
                searchResults.forEach(block => {
                    searchCategory.contents.push({ kind: "block", type: block.type });
                });
            } else {
                searchCategory.contents.push({ kind: "label", text: "No results found" });
            }

            if (searchCategoryIndex !== -1) {
                updatedToolbox.contents[searchCategoryIndex] = searchCategory;
            } else {
                updatedToolbox.contents.push(searchCategory);
            }

            workspace.updateToolbox(updatedToolbox);

            if (clearSearchTimeout) {
                clearTimeout(clearSearchTimeout);
            }

            clearSearchTimeout = setTimeout(() => {
                const emptySearchCategory = {
                    kind: "category",
                    name: "Search",
                    contents: []
                };
                updatedToolbox.contents[searchCategoryIndex] = emptySearchCategory;
                workspace.updateToolbox(updatedToolbox);
            }, 100);
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
        const toolbox = 
        {
            "kind": "categoryToolbox",
            "contents": [
              { // stl
                "kind": "category",
                "name": "STL模組",
                "contents": [
                  { // vector
                    "kind": "category",
                    "name": "序列容器 Vector",
                    "colour": "#5C4AB6",
                    "contents": [
                      {"kind": "block", "type": "define_vector"},
                      {"kind": "block", "type": "push_back"},
                      {"kind": "block", "type": "emplace_back"},
                      {"kind": "block", "type": "pop_back"},
                      {"kind": "block", "type": "vector_insert"},
                      {"kind": "block", "type": "vector_erase"},
                      {"kind": "block", "type": "vector_clear"},
                      {"kind": "block", "type": "vector_size"},
                      {"kind": "block", "type": "vector_empty"},

                      {"kind": "label", "text": "Vector 迭代器"},
                      {"kind": "block", "type": "vec_begin"},
                      {"kind": "block", "type": "vec_end"},
                      {"kind": "block", "type": "vec_rbegin"},
                      {"kind": "block", "type": "vec_rend"}
                    ]
                  },
                  { // set
                    "kind": "category",
                    "name": "關聯式容器 Set",
                    "colour": "#f9943b",
                    "contents": [
                      {"kind": "block", "type": "create_set"},
                      {"kind": "block", "type": "set_insert"},
                      {"kind": "block", "type": "set_erase"},
                      {"kind": "block", "type": "set_empty"},
                      {"kind": "block", "type": "set_find"},

                      {"kind": "label", "text": "set 迭代器"},
                      {"kind": "block", "type": "set_begin"},
                      {"kind": "block", "type": "set_end"}
                    ]
                  },
                  { // bitset
                    "kind": "category",
                    "name": "bitset",
                    "colour": "#C9A200",
                    "contents": [
                      {"kind": "block", "type": "define_bitset"},
                      {"kind": "block", "type": "bitset[i]"},
                      {"kind": "block", "type": "bitset_size"},
                      {"kind": "block", "type": "bitset_count"},
                      {"kind": "block", "type": "bitset_set"},
                      {"kind": "block", "type": "bitset_reset"},
                      {"kind": "block", "type": "bitset_all"},
                      {"kind": "block", "type": "bitset_any"},
                      {"kind": "block", "type": "bitset_none"},
                      {"kind": "block", "type": "get_var"}
                    ]
                  },
                  { // map
                    "kind": "category",
                    "name": "字典 Map",
                    "colour": "#1AA197",
                    "contents": [
                      {"kind": "block", "type": "create_map"},
                      {"kind": "block", "type": "map_insert"},
                      {"kind": "block", "type": "map[i]"},
                      {"kind": "block", "type": "map_clear"},
                      {"kind": "block", "type": "map_size"},
                      {"kind": "block", "type": "map_empty"},
                      {"kind": "block", "type": "map_first"},
                      {"kind": "block", "type": "map_second"},
                      {"kind": "block", "type": "map_find"},

                      {"kind": "label", "text": "map 迭代器"},

                      {"kind": "block", "type": "map_begin"},
                      {"kind": "block", "type": "map_end"},
                      {"kind": "block", "type": "map_rbegin"},
                      {"kind": "block", "type": "map_rend"}
                    ]
                  },
                  { // stack
                    "kind": "category",
                    "name": "堆疊 stack",
                    "colour": "#561229",
                    "contents": [
                      {"kind": "block", "type": "def_stack"},
                      {"kind": "block", "type": "stack_top"},
                      {"kind": "block", "type": "stack_push"},
                      {"kind": "block", "type": "stack_pop"},
                      {"kind": "block", "type": "stack_push_range"},
                      {"kind": "block", "type": "stack_swap"},
                    ]
                  },
                  { // algorithm
                    "kind": "category",
                    "name": "演算法 algorithm",
                    "colour": "#2E8B57",
                    "contents": [
                      {"kind": "block", "type": "sort"},
                      {"kind": "block", "type": "max"},
                      {"kind": "block", "type": "min"},
                      {"kind": "block", "type": "find"}
                    ]
                  },
                  { // iomanip
                    "kind": "category",
                    "name": "控制輸出格式 iomanip",
                    "colour": "#51c2c0",
                    "contents": [
                      {"kind": "block", "type": "setbase"},
                      {"kind": "block", "type": "setprecision"},
                      {"kind": "block", "type": "setw"},
                      {"kind": "block", "type": "setfill"}
                    ]
                  },
                  { // math
                    "kind": "category",
                    "name": "數學 Math",
                    "colour": "#009CD5",
                    "contents": [
                      {"kind": "block", "type": "math_ceil"},
                      {"kind": "block", "type": "math_floor"},
                      {"kind": "block", "type": "math_sqrt"},
                      {"kind": "block", "type": "math_abs"},
                      {"kind": "block", "type": "math_random"},
                      {"kind": "block", "type": "math_sine"},
                      {"kind": "block", "type": "math_cosine"},
                      {"kind": "block", "type": "math_tangent"}
                    ]
                  },
                  { // Ctime
                    "kind": "category",
                    "name": "時間 Ctime",
                    "colour": "#D4A017",
                    "contents": [
                      {"kind": "block", "type": "get_current_timestamp"},
                      {"kind": "block", "type": "calculate_time_difference"},
                      {"kind": "block", "type": "convert_to_local_time"},
                      {"kind": "block", "type": "convert_to_utc_time"},
                      {"kind": "block", "type": "format_time_string"},
                      {"kind": "block", "type": "set_time_structure"},
                      {"kind": "block", "type": "read_time_structure_member"},
                      {"kind": "block", "type": "get_current_local_time"},
                      {"kind": "block", "type": "get_current_utc_time"}
                    ]
                  }
                ]
              },
              {"kind": "sep"},
              { // function
                "kind": "category",
                "name": "自定義函式",
                "colour": "#db00db",
                "contents": [
                  {"kind": "block", "type": "function_definition_void"},
                  {"kind": "block", "type": "function_definition"},
                  {"kind": "block", "type": "function_call"},
                    
                  {"kind": "label", "text": "變數定義"},
                  {"kind": "block", "type": "def_var"},
                  {"kind": "block", "type": "string_commas"}
                ]
              },
              { // variable
                "kind": "category",
                "name": "變數與資料類型",
                "colour": "#C9A200",
                "contents": [
                  {"kind": "block", "type": "declare_variable"},
                  {"kind": "block", "type": "var_equal"},
                  {"kind": "block", "type": "get_var"}
                ]
              },
              { // pointer
                "kind": "category",
                "name": "自定義指標",
                "colour": "#5f9ea0",
                "contents": [
                  {"kind": "label", "text": "pointer"},
                  {"kind": "block", "type": "declare_pointer"},
                  {"kind": "block", "type": "ptr_equal"},
                  {"kind": "block", "type": "get_ptr"},
                  {"kind": "label", "text": "reference"},
                  {"kind": "block", "type": "ref_equal"},
                  {"kind": "block", "type": "get_ref"},
                  {"kind": "block", "type": "nullptr"}
                ]
              },
              { // array
                "kind": "category",
                "name": "陣列 Array",
                "colour": "#ff5757",
                "contents": [
                  {"kind": "block", "type": "create_array"},
                  {"kind": "block", "type": "array_name_block"},
                  {"kind": "block", "type": "array_content"},
                  {"kind": "block", "type": "array[i]"}
                ]
              },
              { // struct & class
                "kind": "category",
                "name": "結構與類別",
                "colour": "#f4a460",
                "contents": [
                  {"kind": "label", "text": "Struct"},
                  {"kind": "block", "type": "def_struct"},
                  {"kind": "block", "type": "get_struct"},

                  {"kind": "label", "text": "Class"},
                  {"kind": "block", "type": "def_class"},
                  {"kind": "block", "type": "get_class"}
                ]
              },
              { // text and more
                "kind": "category",
                "name": "文本操作",
                "colour": "#FF8C00",
                "contents": [
                  {"kind": "block", "type": "label"},
                  {"kind": "block", "type": "add_line"},
                  {"kind": "block", "type": "tab"},
                  {"kind": "block", "type": "comment_block"},

                  {"kind": "label", "text": "擴充模組"},
                  {"kind": "block", "type": "string_plus"},
                  {"kind": "block", "type": "string_commas"}
                ]
              },
              { // input/output
                "kind": "category",
                "name": "資料輸入與輸出",
                "colour": "#2EC832",
                "contents": [
                  {"kind": "block", "type": "cin_block"},
                  {"kind": "block", "type": "cout_block"},

                  {"kind": "label", "text": "解除限制"},
                  {"kind": "block", "type": "boost_ios_sync"},
                  {"kind": "block", "type": "boost_cin_cout_tie"},

                  {"kind": "label", "text": "擴充模組"},
                  {"kind": "block", "type": "string_cin"},
                  {"kind": "block", "type": "string_cout"}
                ]
              },
              { // math and caculate
                "kind": "category",
                "name": "數學與運算",
                "colour": "#1F91B5",
                "contents": [
                  {"kind": "block", "type": "logic_operators"},
                  {"kind": "block", "type": "or_and_xor"},
                  {"kind": "block", "type": "var_caculacte"},
                  {"kind": "block", "type": "math_caculacte"},
                  {"kind": "block", "type": "number"},
                  {"kind": "block", "type": "false"},
                  {"kind": "block", "type": "true"},
                  {"kind": "block", "type": "logic_not"},

                  {"kind": "label", "text": "擴充模組"},
                  {"kind": "block", "type": "math_plus"},
                  {"kind": "block", "type": "math_multiply"},
                  {"kind": "block", "type": "math_percent"},
                  {"kind": "block", "type": "math_devide"},
                  {"kind": "block", "type": "math_subtract"}

                ]
              },
              { // condition and loop
                "kind": "category",
                "name": "條件與終止",
                "colour": "#00ABEA",
                "contents": [
                  {"kind": "block", "type": "if_block"},
                  {"kind": "block", "type": "switch_block"},
                  {"kind": "block", "type": "break_block"},
                  {"kind": "block", "type": "continue_block"},
                  {"kind": "block", "type": "return_block"}
                ]
              },
              { // loop
                "kind": "category",
                "name": "迴圈",
                "colour": "#2473c2",
                "contents": [
                  {"kind": "block", "type": "for_block"},
                  {"kind": "label", "text": "初始變數值"},
                  {"kind": "block", "type": "def_var"},
                  {"kind": "label", "text": "循環條件"},
                  {"kind": "block", "type": "logic_operators"},
                  {"kind": "label", "text": "迴圈條件"},
                  {"kind": "block", "type": "var_cal"},
                  {"kind": "block", "type": "while_block"}
                ]
              },
            ]
        };

        // 工作區功能設定
        var workspace = Blockly.inject('blockly-workspace', {
            toolbox: toolbox,
            scrollbars: true,
            trashcan: true,
            plugins: {
            },
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
                minScale: 0.5,
                scaleSpeed: 1.5
            },
            renderer: 'zelos'/*minimalist*/
        });

        // 網頁初始化以及int main()設定
        Blockly.svgResize(workspace);
        workspace.zoomToFit(); // 先執行縮放到適合大小

        setTimeout(() => { // 延遲進一步調整縮放比例
            workspace.setScale(0.68); // 設置縮放比例為 0.68
            const metrics = workspace.getMetrics();

            // 重新置中
            const xOffset = (metrics.viewWidth - metrics.contentWidth * 0.5) / 2.5;
            const yOffset = (metrics.viewHeight - metrics.contentHeight * 0.5) / 2.2;
            workspace.scroll(xOffset, yOffset);
        }, 100); // 延遲 100 毫秒以確保 `zoomToFit` 生效

        // 初始化 main_block
        function initializeMainBlock() {
            const existingMainBlock = workspace.getBlocksByType('main_block', false);
            if (existingMainBlock.length === 0) {
                const mainBlock = workspace.newBlock('main_block');
                mainBlock.initSvg();
                mainBlock.render();
                mainBlock.setMovable(true); // 設置可移動
                mainBlock.setDeletable(false); // 設置不可刪除
            }
        }

        // 限制工作區內只能有一個 main_block
        workspace.addChangeListener(() => {
            const mainBlocks = workspace.getBlocksByType('main_block', false);
            if (mainBlocks.length > 1) {
                mainBlocks.slice(1).forEach(block => block.dispose()); // 刪除多餘的 main_block
            }
            initializeMainBlock();
            updateCodeOutput();
        });

        //let toolboxXml = Blockly.Xml.textToDom(toolbox); // 未使用程式碼

        // cpp 自訂語言設定
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

        // 程式碼同步轉換
        var id_code = '';
        async function updateCodeOutput() {
            id_code = '#include <bits/stdc++.h>\nusing namespace std;\n\n' + Blockly.Cpp.workspaceToCode(workspace); // 獲取 Blockly 生成的 C++ 代碼
            var lines = id_code.split('\n'); // 按行分割代碼
            var outputElement = document.getElementById('code-output');

            outputElement.innerHTML = ''; // 清空現有內容
            var codeBlock = document.createElement('pre'); // 使用 <pre> 包裝代碼塊
            var codeContent = document.createElement('code'); // 使用 <code> 放置代碼內容
            codeContent.className = 'language-cpp'; // 設置語言類型為 C++（適用於 highlight.js）

            // 設置字體大小、高度和邊框樣式
            codeBlock.style.height = 'auto'; // 設置高度
            codeBlock.style.width = 'auto';
            codeBlock.style.overflowX = 'auto'; // 開啟垂直滾動條
            codeBlock.style.overflowY = 'auto'; // 開啟垂直滾動條
            codeContent.style.fontSize = '16px'; // 設置字體大小

            // 將每行代碼添加到 codeContent
            codeContent.textContent = id_code; // 保持代碼的原始格式
            codeBlock.appendChild(codeContent);
            outputElement.appendChild(codeBlock); // 添加代碼塊到輸出區域

            // 初始化 highlight.js，處理語法高亮
            hljs.highlightElement(codeContent);

            // 渲染 Markdown 區域
            function renderMarkdown() {
                const markdownInput = document.getElementById('markdown-input');
                const markdownOutput = document.getElementById('output');

                // 確保 Markdown 輸入區域存在
                if (markdownInput && markdownOutput) {
                    const markdownText = markdownInput.value; // 獲取 Markdown 文本
                    const htmlContent = marked.parse(markdownText); // 轉換 Markdown 為 HTML
                    markdownOutput.innerHTML = htmlContent;

                    // 處理嵌套的代碼高亮
                    markdownOutput.querySelectorAll('pre code').forEach((el) => {
                        hljs.highlightElement(el);
                    });
                }
            }

            // 配置 marked.js，啟用 highlight.js 支援
            marked.setOptions({
                highlight: function(id_code, lang) {
                    const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(id_code, {
                        language: validLang
                    }).value;
                }
            });

           
            // 初次渲染 Markdown 區域
            renderMarkdown();
        }

        // 複製系統
        function copyText(elementId) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text).then(() => alert("Copied!"));
        }

        // 下載系統
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

        //編譯、執行、編譯&執行 系統
        const sent_data = document.getElementById('sent_data');
        const reset = document.getElementById('reset');
        const textarea = document.getElementById('textarea');

        let save_data = '';

        sent_data.addEventListener('click', () => {
            save_data = textarea.value;
            alert(`測資已送出，原始碼如下:\n${save_data}`)
        });

        reset.addEventListener('click', () => {
            textarea.value = '';
            alert('測資已清除')
        });

        const reset_2 = document.getElementById('reset_2');
        const report = document.getElementById('report');

        reset_2.addEventListener('click', () => {
            report.value = '結果將顯示在這裡...';
            alert('編譯執行結果歷史紀錄已刪除')
        });

        document.getElementById('c').addEventListener('click', async () => {
            alert(`編譯以下代碼:\n${id_code}`);
            const response = await fetch('https://cplusplusblockly-production.up.railway.app/compile', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id_code: id_code})
            });

            const result = await response.json();

            report.value = result.message;
            
        });

        document.getElementById('r').addEventListener('click', async () => {
            alert(`執行測資\n${textarea.value}`);
            const response = await fetch('https://cplusplusblockly-production.up.railway.app/run', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({test_file : textarea.value})
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
                body: JSON.stringify({id_code: id_code, test_file : textarea.value})
            });
            const result = await response.json();
            
            report.value = result.message;
        });
