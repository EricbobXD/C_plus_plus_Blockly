
// 方塊定義&轉換程式碼
Blockly.defineBlocksWithJsonArray(
    [
        //data
        { //text
            "type": "string",
            "message0": "字串 %1",
            "args0": [{
                "type": "field_input",
                "name": "TEXT",
                "text": "Hello world"
            }],
            "output": "String",
            "colour": "#FF8C00",
            "tooltip": "文本"
        },
        { //text
            "type": "char",
            "message0": "字元 %1",
            "args0": [{
                "type": "field_input",
                "name": "TEXT",
                "text": "A"
            }],
            "output": "Char",
            "colour": "#FF8C00",
            "tooltip": "文本"
        },
        { //"\n"
            "type": "add_line",
            "message0": "換行",
            "colour": "#FF8C00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "換行符\\n",
            "helpUrl": ""
        },
        { //tab
            "type": "tab",
            "message0": "Tab(4x)",
            "output": "String",
            "colour": "#FF8C00",
            "tooltip": "Tab鍵",
            "helpUrl": ""
        },
        { //number
            "type": "number",
            "message0": "數字 %1",
            "args0": [{
                "type": "field_number",
                "name": "NUMBER",
                "value": 0
            }],
            "output": "Number",
            "colour": "#29A1CD",
            "tooltip": "數字",
            "helpUrl": ""
        },
        {//abs
            "type": "abs_block",
            "message0": "絕對值: %1",
            "args0": [{
                "type": "input_value",
                "name": "value"
            }],
            "output": "Number",
            "colour": "#29A1CD",
            "tooltip": "絕對值",
            "helpurl": ""
        },
        { //comment
            "type": "comment_block",
            "message0": "//註解 %1",
            "args0": [{
                "type": "field_input",
                "name": "COMMENT",
                "text": "註解"
            }],
            "colour": "#FF8C00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "註解",
            "helpUrl": ""
        },

        //condition
        { //for
           "type": "for_block", 
            "message0": "初始變數值: %1, 循環條件: %2, 調整變數: %3",
            "args0": [
                {
                    "type": "input_value", 
                    "name": "init", 
                }, 
                {
                    "type": "input_value", 
                    "name": "condition", 
                }, 
                {
                    "type": "input_value", 
                    "name": "iter", 
                }
            ], 
            "message1": "%1",
            "args1": [{
                "type": "input_statement", 
                "name": "DO"
            }], 
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#2473c2",
            "tooltip": "For 迴圈",
            "helpUrl": ""
        },
        { //for
            "type": "for_range_block",
            "message0": "迭代物件, 參考: %1, 迭代容器: %2",
            "args0": [{
                    "type": "input_value",
                    "name": "VAR"
                },
                {
                    "type": "input_value",
                    "name": "cotainer"
                },
            ], 
            "message1": "執行 %1", 
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }], 
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": "#2473c2",
            "tooltip": "For 迴圈",
            "helpUrl": ""
        },
        { //while
            "type": "while_block",
            "message0": "當 %1",
            "args0": [{
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            }],
            "message1": "重複執行 %1",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "While 迴圈",
            "colour": "#00abea"
        },
        {
            "type": "if_else",
            "message0": "條件: %1, true回傳值: %2, false回傳值: %3",
            "args0": [{
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },{
                "type": "input_value",
                "name": "r1"
            },
            {
                "type": "input_value",
                "name": "r2"
            }],
            "inputsInline": true,
            "colour": "#00abea",
            "output": null,
            "tooltip": ""
        },
        { //var caculacte
            "type": "var_cal",
            "message0": "%1  %2  %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["+=", "ADD_EQUALS"],
                        ["-=", "SUBTRACT_EQUALS"],
                        ["*=", "MUTIPLY_EQUALS"],
                        ["/=", "DEVIDE_EQUALS"],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "output": "Number",
            "colour": "#1F91B5",
            "inputsInline": true,
            "tooltip": "簡化運算符",
            "helpUrl": ""
        },

        //stop
        { //break
            "type": "break_block",
            "message0": "結束執行",
            "colour": "#00abea",
            "previousStatement": null,
            "tooltip": "退出當前的迴圈/遞迴",
            "helpUrl": ""
        },
        { //continue
            "type": "continue_block",
            "message0": "跳過並繼續",
            "colour": "#00abea",
            "previousStatement": null,
            "tooltip": "跳過當前迴圈的剩餘部分，直接進入下一次迴圈",
            "helpUrl": ""
        },
        { //return
            "type": "return_block",
            "message0": "回傳 %1",
            "args0": [{
                "type": "input_value",
                "name": "RETURN_VALUE"
            }],
            "colour": "#00abea",
            "previousStatement": null,
            "tooltip": "返回值",
            "helpUrl": ""
        },

        //operation
        { //& | ^ Not
            "type": "or_and_xor",
            "message0": "%1 %2 %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["且", "AND"],
                        ["或", "OR"],
                        ["XOR", "XOR"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "output": "Boolean",
            "colour": "#29A1CD",
            "inputsInline": true,
            "tooltip": "運算符",
            "helpUrl": ""
        },
        { //logic operators
            "type": "logic_operators",
            "message0": "%1 %2 %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["==", "EQUAL"],
                        ["!=", "NOT_EQUAL"],
                        [">", "GREATER"],
                        ["<", "LESS"],
                        [">=", "GREATER_EQUAL"],
                        ["<=", "LESS_EQUAL"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "output": "Boolean",
            "colour": "#29A1CD",
            "inputsInline": true,
            "tooltip": "運算符",
            "helpUrl": ""
        },
        { //logic not
            "type": "logic_not",
            "message0": "否 %1",
            "args0": [{
                "type": "input_value",
                "name": "A"
            }],
            "output": "Boolean",
            "colour": "#29A1CD",
            "tooltip": "如果條件為false則回傳true",
            "helpUrl": ""
        },
        { //var caculacte
            "type": "var_calculate",
            "message0": "%1  %2  %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["+=", "ADD_EQUALS"],
                        ["-=", "SUBTRACT_EQUALS"],
                        ["*=", "MUTIPLY_EQUALS"],
                        ["/=", "DEVIDE_EQUALS"],
                        ["%=", "MODULO_EQUALS"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "output": "Number",
            "colour": "#29A1CD",
            "inputsInline": true,
            "tooltip": "簡化運算符",
            "helpUrl": ""
        },
        { //compare_block
            "type": "compare_block",
            "message0": "%1 %2 %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["=", "EQUAL"],
                        ["!=", "NOT_EQUAL"],
                        [">", "GREATER"],
                        ["<", "LESS"],
                        [">=", "GREATER_EQUAL"],
                        ["<=", "LESS_EQUAL"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "inputsInline": true, 
            "output": null, 
            "colour": "#29A1CD",
            "extensions": ["change_block_type"],
            "inputsInline": true,
            "tooltip": "運算符",
            "helpUrl": ""
        },
        //input and output
        { //cin
            "type": "cin_block",
            "message0": "輸入 %1",
            "args0": [{
                "type": "input_value",
                "name": "VARIABLES"
            }],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#24B324",
            "tooltip": "輸入",
            "helpUrl": ""
        },
        { //cout
            "type": "cout_block",
            "message0": "輸出 %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "INPUT"
                },
                {
                    "type": "field_dropdown",
                    "name": "ENDL_OPTION",
                    "options": [
                        ["換行", "endl"],
                        ["不換行", ""]
                    ]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#24B324",
            "tooltip": "輸出",
            "helpUrl": ""
        },

        //bool
        { //true
            "type": "true",
            "message0": "True",
            "output": "Boolean",
            "colour": "#29A1CD",
            "tooltip": "是/真",
            "helpUrl": ""
        },
        { //false
            "type": "false",
            "message0": "False",
            "output": "Boolean",
            "colour": "#29A1CD",
            "tooltip": "否/假",
            "helpUrl": ""
        },

        { //delete block
            "type": "delete_block",
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
                        ["陣列", "[]"],
                    ]
                }
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "",
            "helpurl": ""
        },
        {//define_block
            "type": "define_block",
            "message0": "定義 自定義名子: %1, 函式名子: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "name",
                },
                {
                    "type": "field_input",
                    "name": "func_name",
                },
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#123456",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },
        {//typedef_block
            "type": "typedef_block",
            "message0": "定義 資料型態名子: %1, 自定義名子: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "type_name",
                },
                {
                    "type": "field_input",
                    "name": "name",
                },
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#123456",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },
        // useful things
        {//define_template
            "type": "define_template",
            "message0": "template<%1>",
            "args0": [{
                "type": "input_value",
                "name": "var",
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#4A9BFF",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },
        {//define_typename
            "type": "define_typename",
            "message0": "typename <%1>",
            "args0": [{
                "type": "input_value",
                "name": "var",
            }],
            "output": null,
            "colour": "#4A9BFF",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },
        {//define_using
            "type": "define_using",
            "message0": "using %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "var",
                }, 
                {
                    "type": "field_input",
                    "name": "change_var",
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#4A9BFF",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },
        {//define_namespace 
            "type": "define_namespace",
            "message0": "namespace %1 ",
            "args0": [{
                "type": "field_input",
                "name": "var",
            }],
            "message1": "%1",
            "args1": [{
                "type": "input_statement",
                "name": "statement"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#4A9BFF",
            "tooltip": "偷懶作法",
            "helpUrl": ""
        },

        //Standard Library
        //math
        { //math caculacte
            "type": "math_calculate",
            "message0": "%1  %2  %3",
            "args0": [{
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPERATOR",
                    "options": [
                        ["+", "ADD"],
                        ["-", "SUBTRACT"],
                        ["*", "MUTIPLY"],
                        ["/", "DEVIDE"],
                        ["//", "DEVIDE_INT"],
                        ["%", "MODULO"],
                        ["^", "POWER"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "output": "Number",
            "colour": "#29A1CD",
            "inputsInline": true,
            "tooltip": "運算",
            "helpUrl": ""
        },
        { //sqrt
            "type": "math_sqrt",
            "message0": "開根號(%1)",
            "args0": [{
                "type": "input_value",
                "name": "X"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "平方根運算",
            "helpUrl": ""
        },
        { //abs
            "type": "math_abs",
            "message0": "絕對值(%1)",
            "args0": [{
                "type": "input_value",
                "name": "A"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "絕對值運算",
            "helpUrl": ""
        },
        { //sin
            "type": "math_sine",
            "message0": "sin(%1)",
            "args0": [{
                "type": "input_value",
                "name": "ANGLE"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "正弦運算",
            "helpUrl": ""
        },
        { //cos
            "type": "math_cosine",
            "message0": "cos(%1)",
            "args0": [{
                "type": "input_value",
                "name": "ANGLE"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "餘弦運算",
            "helpUrl": ""
        },
        { //tan
            "type": "math_tangent",
            "message0": "tan(%1)",
            "args0": [{
                "type": "input_value",
                "name": "ANGLE"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "正切運算",
            "helpUrl": ""
        },
        { //ceil
            "type": "math_ceil",
            "message0": "向上取整(%1)",
            "args0": [{
                "type": "input_value",
                "name": "X"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "向上取整",
            "helpUrl": ""
        },
        { //floor
            "type": "math_floor",
            "message0": "向下取整(%1)",
            "args0": [{
                "type": "input_value",
                "name": "X"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "向下取整",
            "helpUrl": ""
        },
        { //random
            "type": "math_random",
            "message0": "隨機取數 %1",
            "args0": [{
                "type": "input_value",
                "name": "RANGE"
            }],
            "output": "Number",
            "colour": "#00A9E6",
            "tooltip": "生成隨機數",
            "helpUrl": ""
        },
        
        /* set
        {
            "type": "set_extract_value",
            "message0": "從set名稱: %1取出的值",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "set_extract_is_value",
            "message0": "檢查從set名稱: %1std::extract物件是否有效",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "set_extract_release",
            "message0": "將從set名稱: %1提取的元素從容器中完全移除",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },   
        {
            "type": "set_equal_range_first",
            "message0": "從set名稱: %1提取equal_range的第一個元素，如果相等元素存在，就會指向香等元素位置，否則指向end()",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },
        {
            "type": "set_equal_range_second",
            "message0": "從set名稱: %1提取equal_range的第二個元素，範圍結束的迭代器，通常指向容器的end()",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },   
        */

        //algorithm
        { //algorithm sort
            "type": "sort",
            "message0": "%1 陣列 %2 排序, 範圍(頭: %3, 尾: %4)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "陣列排序"
        },
        { //algorithm max
            "type": "max",
            "message0": "%1 陣列 %2 最大值, 範圍(頭: %3, 尾: %4)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中搜尋最大元素"
        },
        { //algorithm min
            "type": "min",
            "message0": "%1 陣列 %2 最小值, 範圍(頭: %3, 尾: %4)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中搜尋最小元素"
        },
        { //algorithm find
            "type": "find",
            "message0": "%1 陣列 %2 尋找 %3 範圍(頭: %4, 尾: %5)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中尋找元素"
        },
        { //algorithm binary search
            "type": "binary_search",
            "message0": "%1 陣列 %2 用2分搜尋找 %3 範圍(頭: %4, 尾: %5)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中用二分搜尋找元素"
        },
        { //algorithm lower_bound
            "type": "lower_bound",
            "message0": "%1 陣列 %2 尋找第一個 ≥ %3 範圍(頭: %4, 尾: %5)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中尋找元素第一個 ≥ x 的數"
        },
        { //algorithm upper_bound
            "type": "upper_bound",
            "message0": "%1 陣列 %2 尋找第一個 > %3 範圍(頭: %4, 尾: %5)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
                {
                    "type": "input_value",
                    "name": "start"
                },
                {
                    "type": "input_value",
                    "name": "end"
                }
            ],
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "在陣列中尋找元素第一個 > x 的數"
        },
        { //algorithm reverse
            "type": "reverse",
            "message0": "翻轉%1 變數: %2",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ["字串", "字串"],
                        ["內建陣列", "內建陣列"],
                        ["模組陣列", "模組陣列"]
                    ]
                },
                {
                    "type": "field_input", 
                    "name": "name"
                }
            ], 
            "colour": "#226ea1",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "翻轉"
        },
        // iomanip
        { // setbase 
            "type": "setbase",
            "message0": "更改數字為%1",
            "args0": [{
                "type": "field_dropdown",
                "name": "carry",
                "options": [
                    ["二進位制", "2"],
                    ["八進位制", "10"],
                    ["十進位制", "10"],
                    ["十六進位制", "16"]
                ],
            }],
            "output": null,
            "colour": "#51c2c0",
            "tooltip": "轉換數字進位制"
        },
        {
            "type": "setprecision",
            "message0": "取 %1 %2位",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "choice",
                    "options": [
                        ["有效位數", "sig_figs"],
                        ["小數位數", "place"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "nunber"
                }
            ],
            "colour": "#51c2c0",
            "output": null,
            "tooltip": "控制輸出位數"
        },
        {
            "type": "setw",
            "message0": "控制輸出 %1 位",
            "args0": [{
                "type": "input_value",
                "name": "number"
            }],
            "output": null,
            "colour": "#51c2c0",
            "tooltip": "控制輸出位數"
        },
        {
            "type": "setfill",
            "message0": "把setw空格補 %1",
            "args0": [{
                "type": "input_value",
                "name": "strings"
            }],
            "output": null,
            "colour": "#51c2c0",
            "tooltip": "替換掉setw多出的空格"
        },

        //climits
        { //char_bit
            "type": "char_bit",
            "message0": "char 每個字節的位數",
            "colour": "#000000",
            "output": null,
            "tooltip": "char 每個字節的位數",
            "helpUrl": ""
        },
        { //schar_min
            "type": "schar_min",
            "message0": "有正負 char 的最小值",
            "colour": "#000000",
            "output": null,
            "tooltip": "有正負 char 的最小值",
            "helpUrl": ""
        },
        { //schar_max
            "type": "schar_max",
            "message0": "有正負 char 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "有正負 char 的最大值",
            "helpUrl": ""
        },
        { //uchar_min
            "type": "uchar_min",
            "message0": "沒有正負 char 的最小值",
            "colour": "#000000",
            "output": null,
            "tooltip": "沒有正負 char 的最小值",
            "helpUrl": ""
        },
        { //uchar_max
            "type": "uchar_max",
            "message0": "沒有正負 char 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "沒有正負 char 的最大值",
            "helpUrl": ""
        },
        { //char_max
            "type": "char_max",
            "message0": "char 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "char 的最大值",
            "helpUrl": ""
        },
        { //char_min
            "type": "char_min",
            "message0": "char 的最小值",
            "colour": "#000000",
            "output": null,
            "tooltip": "char 的最小值",
            "helpUrl": ""
        },
        { //int_max
            "type": "int_max",
            "message0": "int 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "int 的最大值",
            "helpUrl": ""
        },
        { //uint_max
            "type": "uint_max",
            "message0": "unsigned int 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "int 的最大值",
            "helpUrl": ""
        },
        { //int_min
            "type": "int_min",
            "message0": "int 的最小值",
            "colour": "#000000",
            "output": null,
            "tooltip": "int 的最小值",
            "helpUrl": ""
        },
        { //llong_max
            "type": "llong_max",
            "message0": "long long 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "long long 的最大值",
            "helpUrl": ""
        },
        { //llong_min
            "type": "llong_min",
            "message0": "long long 的最小值",
            "colour": "#000000",
            "output": null,
            "tooltip": "long long 的最小值",
            "helpUrl": ""
        },
        { //ullong_max
            "type": "ullong_max",
            "message0": "unsigned long long 的最大值",
            "colour": "#000000",
            "output": null,
            "tooltip": "long long 的最大值",
            "helpUrl": ""
        },
        //basic ios
        { //ios sync
            "type": "boost_ios_sync",
            "message0": "輸入輸出同步禁用",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
            "tooltip": "輸入輸出同步禁用",
            "helpUrl": ""
        },
        { //cin tie
            "type": "boost_cin_cout_tie",
            "message0": "解除 cin 和 cout 的速度綁定",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
            "tooltip": "解除 cin 和 cout 的綁定",
            "helpUrl": ""
        },
        {
            "type": "cin.eof",
            "message0": "判斷獨到eof停止",
            "output": true,
            "colour": 160,
            "tooltip": "",
            "helpUrl": ""
        },
        {//define sstream
            "type": "define_sstream",
            "message0": "定義sstream名稱: %1, 內容%2",
            "args0": [{
                    "type": "field_input",
                    "name": "sstream_name",
                },
                {
                    "type": "input_value",
                    "name": "sstream_content"
                }
            ],
            "colour": "#a13458",
            "inputsInline": true, 
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "",
            "helpurl": ""
        },
        { //sstream_<<
            "type": "sstream_<<",
            "message0": "把變數 %1 移到 stringstream%2裡面",
            "args0": [{
                    "type": "field_input",
                    "name": "var1"
                },
                {
                    "type": "field_input",
                    "name": "var2"
                }
            ],
            "colour": "#a13458",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予變數值",
            "helpUrl": ""
        },
        { //sstream_<<
            "type": "sstream_>>",
            "message0": "把變數 %1 移到 stringstream%2裡面",
            "args0": [{
                    "type": "field_input",
                    "name": "var1"
                },
                {
                    "type": "field_input",
                    "name": "var2"
                }
            ],
            "colour": "#a13458",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予變數值",
            "helpUrl": ""
        },
        {//llabs
            "type": "llabs_block",
            "message0": "long long絕對值: %1",
            "args0": [{
                "type": "input_value",
                "name": "value"
            }],
            "output": "Number",
            "colour": "#AFEEEE",
            "tooltip": "long long absolute",
            "helpurl": ""
        }
    ]
);
