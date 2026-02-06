
// 方塊定義&轉換程式碼
Blockly.defineBlocksWithJsonArray(
    [
        //date-type
        {
            "type": "data_type",
            "message0": "資料型態%1",
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
            }],
            "colour": "#EB5160",
            "output": "null"
        },
        {
            "type": "void", 
            "message0": "void", 
            "output": null,
            "colour": "#db00db", 
            "tootip": "特別資料型態", 
            "helpurl": ""
        },
        {
            "type": "struct_type",
            "message0": "struct %1",
            "args0": [{
                "type": "field_input",
                "name": "TYPE",
            }],
            "colour": "#f4a460",
            "output": "null"
        },
        {
            "type": "class_type",
            "message0": "class %1",
            "args0": [{
                "type": "field_input",
                "name": "TYPE",
            }],
            "colour": "#e9967a",
            "output": "null"
        },

        //bitset
        { //define bitset
            "type": "define_bitset",
            "message0": "定義bitset陣列 名稱: %1, 大小 %2, 內容: %3",
            "args0": [{
                    "type": "field_input",
                    "name": "bitset_name",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "bitset_size"
                },
                {
                    "type": "input_value",
                    "name": "bitset_content"
                }
            ],
            "colour": "#ff5757",
            "inputsInline": true, 
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "創建一個bitset陣列，bitset是一加速的布林陣列",
            "helpurl": ""
        },
        { //array[i]
            "type": "bitset[i]",
            "message0": "bitset陣列 %1 [位置%2] = 值%3",
            "args0": [{
                    "type": "field_input",
                    "name": "bitset_name"
                },
                {
                    "type": "input_value",
                    "name": "pos"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#ff5757",
            "inputsInline": true,   
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_size
            "type": "bitset_size",
            "message0": "bitset 名稱: %1 大小",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_set
            "type": "bitset_set",
            "message0": "bitset 名稱: %1 設內容全部是true(1)",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_reset
            "type": "bitset_reset",
            "message0": "bitset 名稱: %1 設內容全部是false(0)",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_count
            "type": "bitset_count",
            "message0": "bitset 名稱: %1 的 true(1) 個數",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_all
            "type": "bitset_all",
            "message0": "bitset 名稱: %1 判斷是否都是true(1)",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_any
            "type": "bitset_any",
            "message0": "bitset 名稱: %1 判斷是否有true(1)",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },
        { //bitset_none
            "type": "bitset_none",
            "message0": "bitset 名稱: %1 判斷是否沒有true(1)",
            "args0": [{
                "type": "field_input",
                "name": "bitset_name"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
        },

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
            "message0": "初始變數值 %1  循環條件 %2 迴圈條件 %3  執行%4 ",
            "args0": [{
                    "type": "input_value",
                    "name": "INIT"
                },
                {
                    "type": "input_value",
                    "name": "CONDITION",
                    "check": "Boolean"
                },
                {
                    "type": "input_value",
                    "name": "var_cal",
                },
                {
                    "type": "input_statement",
                    "name": "DO"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
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

        //map
        { //map[i]
            "type": "map[i]",
            "message0": "map名稱 %1, key: %2, value: %3",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "field_input",
                    "name": "map_key"
                },
                {
                    "type": "field_input",
                    "name": "map_value"
                }
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "path 2 to insert key and value in map"
        },
        { //map clear
            "type": "map_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }, ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "map size",
            "helpUrl": ""
        },
        { //map size
            "type": "map_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map size",
            "helpUrl": ""
        },
        { //map empty
            "type": "map_empty",
            "message0": "判斷map %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }],
            "colour": "#20b2aa",
            "output": null,
            "helpUrl": ""
        },
        { //map first
            "type": "map_first",
            "message0": "map: %1, 位置: %2 的key(first)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                }
            ],
            "output": null,
            "colour": "#20b2aa",
            "tooltip": "map key(first)",
            "helpUrl": ""
        },
        { //map second
            "type": "map_second",
            "message0": "map: %1, 位置: %2 的value(second)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                }
            ],
            "output": null,
            "colour": "#20b2aa",
            "tooltip": "map value(second)",
            "helpUrl": ""
        },
        { //map find
            "type": "map_find",
            "message0": "map: %1 中尋找有沒有 %2 (key)值",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "colour": "#20b2aa",
            "tooltip": "尋找元素",
            "helpUrl": ""
        },
        //pair
        { //pair first
            "type": "pair_first",
            "message0": "pair: %1 的 key(first)",
            "args0": [{
                "type": "field_input",
                "name": "pair_name"
            }],
            "output": null,
            "colour": "#49a34b",
            "tooltip": "pair key(first)",
            "helpUrl": ""
        },
        { //pair second
            "type": "pair_second",
            "message0": "pair: %1 的value(second)",
            "args0": [{
                "type": "field_input",
                "name": "pair_name"
            }],
            "output": null,
            "colour": "#49a34b",
            "tooltip": "pair value(second)",
            "helpUrl": ""
        },
        { //make_pair
            "type": "make_pair",
            "message0": "pair key: %1, value: %2",
            "args0": [{
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "inputsInline": true,
            "colour": "#49a34b",
            "tooltip": "define new pair has key and value",
            "helpUrl": ""
        },
        //map
        { //map insert
            "type": "map_insert",
            "message0": "map %1 插入{key: %2, value: %3〕",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 map 內的任意位置。",
            "helpurl": ""
        },
        { //map insert_range
            "type": "map_insert_range",
            "message0": "在 map 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到map最後",
            "helpurl": ""
        },
        { //map insert_or_assign
            "type": "map_insert_or_assign",
            "message0": "map %1 新增或取代陣列元素〔key: %2, value: %3〕",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": ""
        },
        { //map erase
            "type": "map_erase",
            "message0": "map %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 map 中一個或多個元素。",
            "helpurl": ""
        },
        { //map emplace
            "type": "map_emplace",
            "message0": "在 map 名稱: %1 加一個元素 {key: %2, value: %3} (emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到map最後",
            "helpurl": ""
        },
        { //map emplace
            "type": "map_try_emplace",
            "message0": "在 map 名稱: %1, 元素 {key: %2, value: %3}, 元素如果不在map哩，會emplace，在的話會直接忽略",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到map最後",
            "helpurl": ""
        },
        { //map extract
            "type": "map_extract",
            "message0": "map %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map 提取元素",
            "helpurl": ""
        },
        { //map merge
            "type": "map_merge",
            "message0": "map1: %1 合併 map2: %2, 並map2 刪除 map1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name1"
                },
                {
                    "type": "field_input",
                    "name": "map_name2"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "map1合併map2, 並map2 刪除 map1 有的元素",
            "helpurl": ""
        },
        { //map swap
            "type": "map_swap",
            "message0": "交換 map 名稱: %1, map 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name1"
                },
                {
                    "type": "field_input",
                    "name": "map_name2"
                }
            ],
            "colour": "#20b2aa",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個map中的元素交換",
            "helpurl": ""
        },
        
        // condition
        { //map clear
            "type": "map_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#20b2aa",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //map size
            "type": "map_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#20b2aa",
            "tooltip": "取得 map 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //map empty
            "type": "map_empty",
            "message0": "判斷map %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "map_name"
            }],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "如果 map 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //map max_size
            "type": "map_max_size",
            "message0": "map 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                }],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "球map最大元素數量",
            "helpUrl": ""
        },
        
        //lookup
        {//map count
            "type": "map_count",
            "message0": "map %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//map find
            "type": "map_find",
            "message0": "map %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//map contains
            "type": "map_contains",
            "message0": "map %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//map equal_range
            "type": "map_equal_range",
            "message0": "map %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
        {//map lower_bound
            "type": "map_lower_bound",
            "message0": "map %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "helpurl": ""
        },
        {//map upper_bound
            "type": "map_upper_bound",
            "message0": "map %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#20b2aa",
            "inputsInline": true,
            "output": null,
            "tooltip": "map判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "helpurl": ""
        },

        //iterator
        { //map begin
            "type": "map_begin",
            "message0": "map 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name",
                    "check": "String"
                }
        
            ],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 map 第一個元素。",
            "helpUrl": ""
        },
        { //map end
            "type": "map_end",
            "message0": "map 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name",
                    "check": "String"
                }
        
            ],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 map 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //map rbegin
            "type": "map_rbegin",
            "message0": "map 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name",
                    "check": "String"
                }
        
            ],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 map 最尾端元素的。",
            "helpUrl": ""
        },
        { //map rend
            "type": "map_rend",
            "message0": "map 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "map_name",
                    "check": "String"
                }
        
            ],
            "colour": "#20b2aa",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 map 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        { //make_map
            "type": "make_map",
            "message0": "map key: %1, value: %2",
            "args0": [{
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "inputsInline": true,
            "colour": "#49a34b",
            "tooltip": "define new map has key and value",
            "helpUrl": ""
        },

        //unordered_map
        { //unordered_map[i]
            "type": "unordered_map[i]",
            "message0": "unordered_map名稱 %1, key: %2, value: %3",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "field_input",
                    "name": "unordered_map_key"
                },
                {
                    "type": "field_input",
                    "name": "unordered_map_value"
                }
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "path 2 to insert key and value in unordered_map"
        },
        { //unordered_map clear
            "type": "unordered_map_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }, ],
            "colour": "#1282A2",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "unordered_map size",
            "helpUrl": ""
        },
        { //unordered_map size
            "type": "unordered_map_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map size",
            "helpUrl": ""
        },
        { //unordered_map empty
            "type": "unordered_map_empty",
            "message0": "判斷unordered_map %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }],
            "colour": "#1282A2",
            "output": null,
            "helpUrl": ""
        },
        { //unordered_map first
            "type": "unordered_map_first",
            "message0": "unordered_map: %1, 位置: %2 的key(first)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                }
            ],
            "output": null,
            "colour": "#1282A2",
            "tooltip": "unordered_map key(first)",
            "helpUrl": ""
        },
        { //unordered_map second
            "type": "unordered_map_second",
            "message0": "unordered_map: %1, 位置: %2 的value(second)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                }
            ],
            "output": null,
            "colour": "#1282A2",
            "tooltip": "unordered_map value(second)",
            "helpUrl": ""
        },
        { //unordered_map find
            "type": "unordered_map_find",
            "message0": "unordered_map: %1 中尋找有沒有 %2 (key)值",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "colour": "#1282A2",
            "tooltip": "尋找元素",
            "helpUrl": ""
        },
            //pair
        { //pair first
            "type": "pair_first",
            "message0": "pair: %1 的 key(first)",
            "args0": [{
                "type": "field_input",
                "name": "pair_name"
            }],
            "output": null,
            "colour": "#49a34b",
            "tooltip": "pair key(first)",
            "helpUrl": ""
        },
        { //pair second
            "type": "pair_second",
            "message0": "pair: %1 的value(second)",
            "args0": [{
                "type": "field_input",
                "name": "pair_name"
            }],
            "output": null,
            "colour": "#49a34b",
            "tooltip": "pair value(second)",
            "helpUrl": ""
        },
        { //make_pair
            "type": "make_pair",
            "message0": "pair key: %1, value: %2",
            "args0": [{
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "output": null,
            "inputsInline": true,
            "colour": "#49a34b",
            "tooltip": "define new pair has key and value",
            "helpUrl": ""
        },
        { //unordered_map insert
            "type": "unordered_map_insert",
            "message0": "unordered_map %1 插入{key: %2, value: %3〕",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 unordered_map 內的任意位置。",
            "helpurl": ""
        },
        { //unordered_map insert_range
            "type": "unordered_map_insert_range",
            "message0": "在 unordered_map 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到unordered_map最後",
            "helpurl": ""
        },
        { //unordered_map insert_or_assign
            "type": "unordered_map_insert_or_assign",
            "message0": "unordered_map %1 新增或取代陣列元素〔key: %2, value: %3〕",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": ""
        },
        { //unordered_map erase
            "type": "unordered_map_erase",
            "message0": "unordered_map %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 unordered_map 中一個或多個元素。",
            "helpurl": ""
        },
        { //unordered_map emplace
            "type": "unordered_map_emplace",
            "message0": "在 unordered_map 名稱: %1 加一個元素 {key: %2, value: %3} (emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到unordered_map最後",
            "helpurl": ""
        },
        { //unordered_map emplace
            "type": "unordered_map_try_emplace",
            "message0": "在 unordered_map 名稱: %1, 元素 {key: %2, value: %3}, 元素如果不在unordered_map哩，會emplace，在的話會直接忽略",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "key"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到unordered_map最後",
            "helpurl": ""
        },
        { //unordered_map extract
            "type": "unordered_map_extract",
            "message0": "unordered_map %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map 提取元素",
            "helpurl": ""
        },
        { //unordered_map merge
            "type": "unordered_map_merge",
            "message0": "unordered_map1: %1 合併 unordered_map2: %2, 並unordered_map2 刪除 unordered_map1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name1"
                },
                {
                    "type": "field_input",
                    "name": "unordered_map_name2"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "unordered_map1合併unordered_map2, 並unordered_map2 刪除 unordered_map1 有的元素",
            "helpurl": ""
        },
        { //unordered_map swap
            "type": "unordered_map_swap",
            "message0": "交換 unordered_map 名稱: %1, unordered_map 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name1"
                },
                {
                    "type": "field_input",
                    "name": "unordered_map_name2"
                }
            ],
            "colour": "#1282A2",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個unordered_map中的元素交換",
            "helpurl": ""
        },
            
        // condition
        { //unordered_map clear
            "type": "unordered_map_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#1282A2",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //unordered_map size
            "type": "unordered_map_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#1282A2",
            "tooltip": "取得 unordered_map 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //unordered_map empty
            "type": "unordered_map_empty",
            "message0": "判斷unordered_map %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "unordered_map_name"
            }],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "如果 unordered_map 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //unordered_map max_size
            "type": "unordered_map_max_size",
            "message0": "unordered_map 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                }],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "球unordered_map最大元素數量",
            "helpUrl": ""
        },
            
        //lookup
        {//unordered_map count
            "type": "unordered_map_count",
            "message0": "unordered_map %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//unordered_map find
            "type": "unordered_map_find",
            "message0": "unordered_map %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//unordered_map contains
            "type": "unordered_map_contains",
            "message0": "unordered_map %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//unordered_map equal_range
            "type": "unordered_map_equal_range",
            "message0": "unordered_map %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
        {//unordered_map lower_bound
            "type": "unordered_map_lower_bound",
            "message0": "unordered_map %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "helpurl": ""
        },
        {//unordered_map upper_bound
            "type": "unordered_map_upper_bound",
            "message0": "unordered_map %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#1282A2",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_map判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "helpurl": ""
        },
            
        //iterator
        { //unordered_map begin
            "type": "unordered_map_begin",
            "message0": "unordered_map 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name",
                    "check": "String"
                }
            
            ],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_map 第一個元素。",
            "helpUrl": ""
        },
        { //unordered_map end
            "type": "unordered_map_end",
            "message0": "unordered_map 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name",
                    "check": "String"
                }
            
            ],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 unordered_map 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //unordered_map rbegin
            "type": "unordered_map_rbegin",
            "message0": "unordered_map 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name",
                    "check": "String"
                }
            
            ],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_map 最尾端元素的。",
            "helpUrl": ""
        },
        { //unordered_map rend
            "type": "unordered_map_rend",
            "message0": "unordered_map 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_map_name",
                    "check": "String"
                }
            
            ],
            "colour": "#1282A2",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_map 的第一個元素的前一個位置。",
            "helpUrl": ""
        },

        //time
        { //get current timestamp
            "type": "get_current_timestamp",
            "message0": "取得目前時間戳記",
            "output": "time_t",
            "colour": "#9458ad",
            "tooltip": "以一個時間戳回傳正確時間",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //calculate time difference
            "type": "calculate_time_difference",
            "message0": "時間 %1 和 %2 秒差",
            "args0": [{
                    "type": "input_value",
                    "name": "END_TIME",
                    "check": "time_t"
                },
                {
                    "type": "input_value",
                    "name": "START_TIME",
                    "check": "time_t"
                }
            ],
            "output": "Number",
            "colour": "#9458ad",
            "tooltip": "計算兩個時間戳之間的秒數差",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //convert to local time
            "type": "convert_to_local_time",
            "message0": "轉換 %1 到本地時間",
            "args0": [{
                "type": "input_value",
                "name": "TIMESTAMP",
                "check": "time_t"
            }],
            "output": "tm",
            "colour": "#9458ad",
            "tooltip": "以一個結構轉換一個時間戳至本地時間",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //convert to utc time
            "type": "convert_to_utc_time",
            "message0": "轉換 %1 到 UTC 時間",
            "args0": [{
                "type": "input_value",
                "name": "TIMESTAMP",
                "check": "time_t"
            }],
            "output": "tm",
            "colour": "#9458ad",
            "tooltip": "以一個結構轉換一個時間戳至UTC時間",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //format time string
            "type": "format_time_string",
            "message0": "格式化時間 %1 格式: %2",
            "args0": [{
                    "type": "input_value",
                    "name": "TIME_STRUCT",
                    "check": "tm"
                },
                {
                    "type": "field_input",
                    "name": "FORMAT",
                    "text": "%Y-%m-%d %H:%M:%S"
                }
            ],
            "output": "String",
            "colour": "#9458ad",
            "tooltip": "使用給定格式將時間結構格式化為字串。",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //set time structure
            "type": "set_time_structure",
            "message0": "設定時間結構: ",
            "message1": "年 %1 月 %2 日 %3",
            "args1": [{
                    "type": "input_value",
                    "name": "YEAR",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "MONTH",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "DAY",
                    "check": "Number"
                }
            ],
            "message2": "時 %1 分 %2 秒 %3",
            "args2": [{
                    "type": "input_value",
                    "name": "HOUR",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "MINUTE",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "SECOND",
                    "check": "Number"
                }
            ],
            "output": "tm",
            "colour": "#9458ad",
            "tooltip": "用給予值創建一個時間結構",
            "helpUrl": "",
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null
        },
        { //read time structure member
            "type": "read_time_structure_member",
            "message0": "讀取 %1 來源: %2",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "MEMBER",
                    "options": [
                        ["年", "tm_year"],
                        ["月", "tm_mon"],
                        ["日", "tm_mday"],
                        ["小時", "tm_hour"],
                        ["分鐘", "tm_min"],
                        ["秒", "tm_sec"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "TIME_STRUCT",
                    "check": "tm"
                }
            ],
            "output": "Number",
            "colour": "#9458ad",
            "tooltip": "從時間結構中讀取特定數值",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //get current local time
            "type": "get_current_local_time",
            "message0": "取得本地目前時間",
            "output": "tm",
            "colour": "#9458ad",
            "tooltip": "以一個tm結構回傳本地目前時間",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
        },
        { //get current utc time
            "type": "get_current_utc_time",
            "message0": "取得準確 UTC 時間",
            "output": "tm",
            "colour": "#9458ad",
            "tooltip": "一個tm結構回傳準確的UTC時間",
            "helpUrl": "",
            "previousStatement": null,
            "nextStatement": null
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
