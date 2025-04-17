
// 方塊定義&轉換程式碼
Blockly.defineBlocksWithJsonArray(
    [
        //date-type
        {
            "options": [
                ["整數", "int"],
                ["浮點數", "float"],
                ["雙重浮點數", "double"],
                ["字元", "char"],
                ["字串", "string"],
                ["更長的整數", "long long"]
            ]
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

        //struct
        { //def struct
            "type": "define_struct",
            "message0": "結構 名字: %1 ",
            "args0": [{
                "type": "field_input",
                "name": "struct_name"
            }],
            "message1": "%1",
            "args1": [{
                "type": "input_statement",
                "name": "def_var"
            }],
            "colour": "#f4a460",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個結構",
            "helpurl": ""
        },
        { //get struct
            "type": "get_struct",
            "message0": "結構 名字: %1, 變數名: %2, 大小%3",
            "args0": [{
                    "type": "field_input",
                    "name": "struct_name",
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "size"
                },
            ],
            "colour": "#f4a460",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個結構的資料",
            "helpUrl": ""
        },

        //class
        { //class
            "type": "define_class",
            "message0": "類別 名子: %1",
            "args0": [{
                "type": "field_input",
                "name": "class_name"
            }],
            "message1": "公開 %1",
            "args1": [{
                "type": "input_statement",
                "name": "public"
            }],
            "message2": "私人 %1",
            "args2": [{
                "type": "input_statement",
                "name": "private"
            }],
            "colour": "#e9967a",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個類別",
            "helpurl": ""
        },
        { //get class
            "type": "get_class",
            "message0": "類別 名字: %1, 變數名: %2, 大小%3",
            "args0": [{
                    "type": "field_input",
                    "name": "class_name",
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "size"
                }
            ],
            "colour": "#e9967a",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "取得一個類別的資料",
            "helpUrl": ""
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

        //define variable
        { //def variable
            "type": "def_var",
            "message0": "宣告 %1 %2 變數名稱: %3 = %4",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
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
                    "type": "field_input",
                    "name": "var_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "output": null,
            "tooltip": "定義一個變數",
            "helpurl": ""
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

        //function
        { //def_fun_void
            "type": "define_function_void",
            "message0": "函式型態: void 名稱 %1 變數 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction"
                },
                {
                    "type": "input_value",
                    "name": "data",
                }
            ],
            "message1": "%1 回傳值%2",
            "args1": [{
                    "type": "input_statement",
                    "name": "DO"
                },
                {
                    "type": "field_dropdown",
                    "name": "expression",
                    "options": [
                        ["回傳", "return"],
                        ["不回傳", "no"]
                    ]
                }
            ],
            "colour": "#db00db",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個沒有回傳值的函數",
            "helpUrl": ""
        },
        { //def_fun
            "type": "define_function",
            "message0": "函式型態: %1 名稱 %2 變數%3",
            "args0": [{
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction2"
                },
                {
                    "type": "input_value",
                    "name": "data",
                }
            ],
            "message1": "%1 回傳值 %2",
            "args1": [{
                    "type": "input_statement",
                    "name": "DO"
                },
                {
                    "type": "input_value",
                    "name": "expression"
                }
            ],
            "inputsInline": true,
            "colour": "#db00db",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個有回傳值的函數",
            "helpUrl": ""
        },
        { //cll function
            "type": "function_call",
            "message0": "函式 %1 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "funcName",
                    "text": "MyFunction"
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "text": "這裡放置變數"
                }
            ],
            "colour": "#db00db",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "呼叫函數",
            "helpUrl": ""
        },
        { //lambda
            "type": "lambda",
            "message0": "lambda [%1](引用變數: %2)，多行%3",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "captures",
                    "options": [
                        ["都不要", ""],
                        ["&", "&"],
                        ["=", "="]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VAR"
                },
                {
                    "type": "field_checkbox",
                    "name": "line",
                    "checked": false
                }
            ],
            "message1": "%1 ",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "colour": "#db00db",
            "output": null,
            "tooltip": "定義一個lambda",
            "helpurl": ""
        },
        {
            "type": "define_operator",
            "message0": "運算子%1, 變數(%2, %3)",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "TYPE1",
                    "options": [
                        [">", ">"],
                        ["<", "<"],
                        ["==", "=="],
                        [">=", ">="],
                        ["<=", "<="]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "var1_1",
                },
                {
                    "type": "input_value",
                    "name": "var1_2",
                }
            ],
            "message1": "回傳值: %1 %2 %3",
            "args1": [{
                    "type": "input_value",
                    "name": "var2_1",
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE2",
                    "options": [
                        [">", ">"],
                        ["<", "<"],
                        ["==", "=="],
                        [">=", ">="],
                        ["<=", "<="]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "var2_2",
                }
            ],
            "previousStatement": true,
            "nextStatement": true,
            "colour": "#FFD700",
            "tooltip": "",
            "helpUrl": ""
        },

        //define variable
        { //def variable
            "type": "define_variable",
            "message0": "宣告 %1 %2 %3 變數名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定", "no"],
                        ["固定", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個變數",
            "helpurl": ""
        },
        { //variable equals
            "type": "var_equal",
            "message0": "變數 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "VAR_NAME",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予變數值",
            "helpUrl": ""
        },
        { //get variable vaule
            "type": "get_var",
            "message0": "變數 %1",
            "args0": [{
                "type": "field_input",
                "name": "VAR_NAME",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "取得一個變數的資料",
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

        //pointer
        { //nullptr
            "type": "nullptr",
            "message0": "nullptr",
            "output": "Pointer",
            "colour": "#DABD00",
            "tooltip": "空指標的常值",
            "helpUrl": ""
        },
        { //define_pointer
            "type": "define_pointer",
            "message0": "宣告 %1 %2 %3 %4指標名稱: %5 = %6",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const_ptr",
                    "options": [
                        ["不固定指標位置", "no"],
                        ["固定指標位置", "const_ptr"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_dropdown",
                    "name": "const_var",
                    "options": [
                        ["不固定變數大小", "no"],
                        ["固定變數大小", "const_var"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "定義一個指標",
            "helpurl": ""
        },
            { //def_ptr
            "type": "def_ptr",
            "message0": "宣告 %1 %2 %3 %4指標名稱: %5 = %6",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const_ptr",
                    "options": [
                        ["不固定指標位置", "no"],
                        ["固定指標位置", "const_ptr"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_dropdown",
                    "name": "const_var",
                    "options": [
                        ["不固定變數大小", "no"],
                        ["固定變數大小", "const_var"]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "output": true,
            "tooltip": "定義一個指標",
            "helpurl": ""
        },
        { //declart_reference
            "type": "define_reference",
            "message0": "宣告 %1 %2 %3 位置名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定變數位置", "no"],
                        ["固定變數位置", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "宣告一個位置",
            "helpurl": ""
        },
        { //declart_reference
            "type": "def_ref",
            "message0": "宣告 %1 %2 %3 位置名稱: %4 = %5",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "const",
                    "options": [
                        ["不固定變數位置", "no"],
                        ["固定變數位置", "const"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "unsigned",
                    "options": [
                        ["有正有負", "no"],
                        ["全部取正", "unsigned"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "type"
                },
                {
                    "type": "field_input",
                    "name": "var_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                },
            ],
            "colour": "#DABD00",
            "inputsInline": true,
            "output": true,
            "tooltip": "宣告一個位置",
            "helpurl": ""
        },
        { //ptr equal
            "type": "ptr_equal",
            "message0": "指標 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ptr_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予指標新的值或算式",
            "helpUrl": ""
        },
        { //ref equal 
            "type": "ref_equal",
            "message0": "位置 %1 = %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ref_name",
                    "text": "i"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "賦予位置新的值或算式",
            "helpUrl": ""
        },
        { //get ptr value
            "type": "get_ptr",
            "message0": "指標 %1",
            "args0": [{
                "type": "field_input",
                "name": "ptr_name",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "獲取指標的值",
            "helpUrl": ""
        },
        { //get ref value
            "type": "get_ref",
            "message0": "位置 %1",
            "args0": [{
                "type": "field_input",
                "name": "ref_name",
                "text": "i"
            }],
            "output": null,
            "colour": "#DABD00",
            "tooltip": "獲取位置的值",
            "helpUrl": ""
        },
        { //ptr of
            "type": "ptr_of",
            "message0": "指標 %1 -> %2",
            "args0": [{
                    "type": "field_input",
                    "name": "ptr_name",
                },
                {
                    "type": "input_value",
                    "name": "of"
                }
            ],
            "colour": "#DABD00",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "指標指向物件",
            "helpUrl": ""
        },
        { //ptr to
            "type": "ptr_to",
            "message0": "* 變數 %1",
            "args0": [{
                    "type": "field_input",
                    "name": "var_name",
                }],
            "colour": "#DABD00",
            "output": null,
            "tooltip": "*變數",
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

        //vector
        { //vector push back
            "type": "vector_push_back",
            "message0": "在 vector: %1 新增 %2 在最後一個(只能輸入單個)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                },
                {
                    "type": "input_value",
                    "name": "number",
                    "check": ["String", "Number", "Char"]
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3d7fd6",
            "tooltip": "新增元素至 vector 的尾端，必要時會進行記憶體組態。",
            "helpUrl": ""
        },
        { //emplace back
            "type": "vector_emplace_back",
            "message0": "在 vector: %1 新增 %2 在最後一個(可輸入多個 , 用空白分開)",
            "args0": [{
                    "type": "field_input",
                    "name": "NAME",
                    "check": ["Number", "String"]
                },
                {
                    "type": "field_input",
                    "name": "number",
                    "text": ""
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3d7fd6",
            "tooltip": "直接在vector內建立物件",
            "helpUrl": ""
        },
        { //vector append_range
            "type": "vector_append_range",
            "message0": "在 vector 名稱: %1 加陣列 %2 到最後 (append)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#3d7fd6",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到vector最後",
            "helpurl": ""
        },
        { //vector pop back
            "type": "vector_pop_back",
            "message0": "vector 在 %1 刪除最後一個",
            "args0": [{
                "type": "field_input",
                "name": "vector_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3d7fd6",
            "tooltip": "刪除 vector 最尾端的元素。",
            "helpUrl": ""
        },
        { //vector insert
            "type": "vector_insert",
            "message0": "vector %1 在 %2 位置插入 %3",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
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
            "colour": "#3d7fd6",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 vector 內的任意位置。",
            "helpurl": ""
        },
        { //vector insert_range
            "type": "vector_insert_range",
            "message0": "在 vector 名稱: %1 在位置: %2 加陣列 %3 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                },
                {
                    "type": "input_value",
                    "name": "pos"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#3d7fd6",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到vector最後",
            "helpurl": ""
        },
        { //vector erase
            "type": "vector_erase",
            "message0": "vector %1 在 %2 位置刪除 %3",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
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
            "colour": "#3d7fd6",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 vector 中一個或多個元素。",
            "helpurl": ""
        },
        { //vector swap
            "type": "vector_swap",
            "message0": "交換 vector 名稱: %1, vector 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name1"
                },
                {
                    "type": "field_input",
                    "name": "vector_name2"
                }
            ],
            "colour": "#3d7fd6",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個vector中的元素交換",
            "helpurl": ""
        },
        
        //read
        {//operate[]
            "type": "vector_operate[]",
            "message0": "vector 讀取名稱%1 第 %2 個元素",
            "args0": [
                {
                    "type": "field_input",
                    "name": "vector_name"
                },
                {
                    "type": "input_value",
                    "name": "pos"
                },
            ],
            "colour": "#3d7fd6",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取vector[i]。",
            "helpurl": ""
        },
        {//vector_front
            "type": "vector_front",
            "message0": "vector 讀取名稱%1 第一個元素",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                }],
            "colour": "#3d7fd6",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取vector第一個元素。",
            "helpurl": ""
        },
        {//vector_back
            "type": "vector_back",
            "message0": "vector 讀取名稱%1 最後一個元素",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                }],
            "colour": "#3d7fd6",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取vector最後一個元素。",
            "helpurl": ""
        },
        
        // condition
        { //vector clear
            "type": "vector_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "vector_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3d7fd6",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //vector size
            "type": "vector_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "vector_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#3d7fd6",
            "tooltip": "取得 vector 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //vector empty
            "type": "vector_empty",
            "message0": "判斷vector %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "vector_name"
            }],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "如果 vector 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //vector reserve
            "type": "vector_reserve",
            "message0": "vector 名稱: %1 預設大小 %2",
            "args0": [
                {
                    "type": "field_input",
                    "name": "vector_name"
                },
                {
                    "type": "input_value",
                    "name": "size"
                }
            ],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "翻轉vector陣列",
            "helpUrl": ""
        },
        { //vector capacity
            "type": "vector_capacity",
            "message0": "vector 名稱: %1 內存容量",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                }],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "vector內存容量",
            "helpUrl": ""
        },
        { //vector max_size
            "type": "vector_max_size",
            "message0": "vector 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name"
                }],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "球vector最大元素數量",
            "helpUrl": ""
        },
        
        
        //iterator
        { //vector begin
            "type": "vector_begin",
            "message0": "vector 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name",
                    "check": "String"
                }
        
            ],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 vector 第一個元素。",
            "helpUrl": ""
        },
        { //vector end
            "type": "vector_end",
            "message0": "vector 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name",
                    "check": "String"
                }
        
            ],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 vector 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //vector rbegin
            "type": "vector_rbegin",
            "message0": "vector 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name",
                    "check": "String"
                }
        
            ],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 vector 最尾端元素的。",
            "helpUrl": ""
        },
        { //vector rend
            "type": "vector_rend",
            "message0": "vector 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "vector_name",
                    "check": "String"
                }
        
            ],
            "colour": "#3d7fd6",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 vector 的第一個元素的前一個位置。",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
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
            "colour": "#191970",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_map 的第一個元素的前一個位置。",
            "helpUrl": ""
        },

        //array
        { //define array
            "type": "define_array",
            "message0": "定義C++內建陣列資料型態 %1 , 陣列名稱 %2 , 大小 : %3 , 陣列內容 %4 (可加可不加)",
            "args0": [{
                    "type": "input_value",
                    "name": "TYPE",
                },
                {
                    "type": "field_input",
                    "name": "array_name",
                    "text": "array"
                },
                {
                    "type": "input_value",
                    "name": "size",
                    "check": "Number",
                    "output": "Number"
                },
                {
                    "type": "input_value",
                    "name": "content", 
                    "check": "Array",
                }
            ],
            "colour": "#ff5757",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "創建一個矩陣",
            "helpurl": ""
        },
        { //array_name_block
            "type": "array_name_block",
            "message0": "陣列 %1",
            "args0": [{
                    "type": "field_input",
                    "name": "array_name",
                    "text": "array"
                }

            ],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣",
            "helpurl": ""
        },
        { //array_content
            "type": "array_content",
            "message0": "陣列內容〔%1〕",
            "args0": [{
                "type": "input_value",
                "name": "content"
            }],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣內容",
            "helpurl": ""
        },
        { //array_operate[]
            "type": "array_operate[]",
            "message0": "陣列 %1 [%2]",
            "args0": [{
                    "type": "field_input",
                    "name": "array_name"
                },
                {
                    "type": "input_value",
                    "name": "pos",
                    "check": "Number"
                }
            ],
            "colour": "#ff5757",
            "output": null,
            "tooltip": "矩陣名稱",
            "helpurl": ""
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

        //set
        { //set insert
            "type": "set_insert",
            "message0": "set %1 插入 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 set 內的任意位置。",
            "helpurl": ""
        },
        { //set insert_range
            "type": "set_insert_range",
            "message0": "在 set 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#f9943b",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到set最後",
            "helpurl": ""
        },
        { //set erase
            "type": "set_erase",
            "message0": "set %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 set 中一個或多個元素。",
            "helpurl": ""
        },
        { //set emplace
            "type": "set_emplace",
            "message0": "在 set 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#f9943b",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到set最後",
            "helpurl": ""
        },
        { //set extract
            "type": "set_extract",
            "message0": "set %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set 提取元素",
            "helpurl": ""
        },
        { //set merge
            "type": "set_merge",
            "message0": "set1: %1 合併 set2: %2, 並set2 刪除 set1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name1"
                },
                {
                    "type": "field_input",
                    "name": "set_name2"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "set1合併set2, 並set2 刪除 set1 有的元素",
            "helpurl": ""
        },
        { //set swap
            "type": "set_swap",
            "message0": "交換 set 名稱: %1, set 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name1"
                },
                {
                    "type": "field_input",
                    "name": "set_name2"
                }
            ],
            "colour": "#f9943b",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個set中的元素交換",
            "helpurl": ""
        },
        
        // condition
        { //set clear
            "type": "set_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#f9943b",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //set size
            "type": "set_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#f9943b",
            "tooltip": "取得 set 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //set empty
            "type": "set_empty",
            "message0": "判斷set %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "如果 set 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //set max_size
            "type": "set_max_size",
            "message0": "set 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                }],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "球set最大元素數量",
            "helpUrl": ""
        },
        
        //lookup
        {//set count
            "type": "set_count",
            "message0": "set %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//set find
            "type": "set_find",
            "message0": "set %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//set contains
            "type": "set_contains",
            "message0": "set %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//set equal_range
            "type": "set_equal_range",
            "message0": "set %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
        {//set lower_bound
            "type": "set_lower_bound",
            "message0": "set %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "helpurl": ""
        },
        {//set upper_bound
            "type": "set_upper_bound",
            "message0": "set %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#f9943b",
            "inputsInline": true,
            "output": null,
            "tooltip": "set判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "helpurl": ""
        },
        
        //iterator
        { //set begin
            "type": "set_begin",
            "message0": "set 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 set 第一個元素。",
            "helpUrl": ""
        },
        { //set end
            "type": "set_end",
            "message0": "set 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 set 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //set rbegin
            "type": "set_rbegin",
            "message0": "set 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 set 最尾端元素的。",
            "helpUrl": ""
        },
        { //set rend
            "type": "set_rend",
            "message0": "set 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#f9943b",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 set 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        {
            "type": "set_extract_value",
            "message0": "從set名稱: %1取出的值",
            "args0": [{
                "type": "field_input",
                "name": "set_name"
            }],
            "colour": "#f9943b",
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
            "colour": "#f9943b",
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
            "colour": "#f9943b",
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
            "colour": "#f9943b",
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
            "colour": "#f9943b",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },     
        
        //unordered_set
        { //unordered_set insert
            "type": "unordered_set_insert",
            "message0": "unordered_set %1 插入 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 unordered_set 內的任意位置。",
            "helpurl": ""
            },
        { //unordered_set insert_range
            "type": "unordered_set_insert_range",
            "message0": "在 unordered_set 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#5F9EA0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到unordered_set最後",
            "helpurl": ""
        },
        { //unordered_set erase
            "type": "unordered_set_erase",
            "message0": "unordered_set %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 unordered_set 中一個或多個元素。",
            "helpurl": ""
        },
        { //unordered_set emplace
            "type": "unordered_set_emplace",
            "message0": "在 unordered_set 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#5F9EA0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到unordered_set最後",
            "helpurl": ""
        },
        { //unordered_set extract
            "type": "unordered_set_extract",
            "message0": "unordered_set %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_set 提取元素",
            "helpurl": ""
        },
        { //unordered_set merge
            "type": "unordered_set_merge",
            "message0": "unordered_set1: %1 合併 unordered_set2: %2, 並unordered_set2 刪除 unordered_set1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name1"
                },
                {
                    "type": "field_input",
                    "name": "unordered_set_name2"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "unordered_set1合併unordered_set2, 並unordered_set2 刪除 unordered_set1 有的元素",
            "helpurl": ""
        },
        { //unordered_set swap
            "type": "unordered_set_swap",
            "message0": "交換 unordered_set 名稱: %1, unordered_set 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name1"
                },
                {
                    "type": "field_input",
                    "name": "unordered_set_name2"
                }
            ],
            "colour": "#5F9EA0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個unordered_set中的元素交換",
            "helpurl": ""
        },
            
            // condition
        { //unordered_set clear
            "type": "unordered_set_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#5F9EA0",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //unordered_set size
            "type": "unordered_set_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#5F9EA0",
            "tooltip": "取得 unordered_set 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //unordered_set empty
            "type": "unordered_set_empty",
            "message0": "判斷unordered_set %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "如果 unordered_set 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //unordered_set max_size
            "type": "unordered_set_max_size",
            "message0": "unordered_set 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "球unordered_set最大元素數量",
            "helpUrl": ""
        },
            
        //lookup
        {//unordered_set count
            "type": "unordered_set_count",
            "message0": "unordered_set %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_set尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//unordered_set find
            "type": "unordered_set_find",
            "message0": "unordered_set %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_set尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//unordered_set contains
            "type": "unordered_set_contains",
            "message0": "unordered_set %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_set尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//unordered_set equal_range
            "type": "unordered_set_equal_range",
            "message0": "unordered_set %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#5F9EA0",
            "inputsInline": true,
            "output": null,
            "tooltip": "unordered_set尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
            
        //iterator
        { //unordered_set begin
            "type": "unordered_set_begin",
            "message0": "unordered_set 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name",
                    "check": "String"
                }
            
            ],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_set 第一個元素。",
            "helpUrl": ""
        },
        { //unordered_set end
            "type": "unordered_set_end",
            "message0": "unordered_set 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name",
                    "check": "String"
                }
            
            ],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 unordered_set 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //unordered_set rbegin
            "type": "unordered_set_rbegin",
            "message0": "unordered_set 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name",
                    "check": "String"
                }
            
            ],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_set 最尾端元素的。",
            "helpUrl": ""
        },
        { //unordered_set rend
            "type": "unordered_set_rend",
            "message0": "unordered_set 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "unordered_set_name",
                    "check": "String"
                }
            
            ],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 unordered_set 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        {
            "type": "unordered_set_extract_value",
            "message0": "從unordered_set名稱: %1取出的值",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "unordered_set_extract_is_value",
            "message0": "檢查從unordered_set名稱: %1std::extract物件是否有效",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "unordered_set_extract_release",
            "message0": "將從unordered_set名稱: %1提取的元素從容器中完全移除",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "unordered_set_equal_range_first",
            "message0": "從unordered_set名稱: %1提取equal_range的第一個元素，如果相等元素存在，就會指向香等元素位置，否則指向end()",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },
        {
            "type": "unordered_set_equal_range_second",
            "message0": "從unordered_set名稱: %1提取equal_range的第二個元素，範圍結束的迭代器，通常指向容器的end()",
            "args0": [{
                "type": "field_input",
                "name": "unordered_set_name"
            }],
            "colour": "#5F9EA0",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },

        //multiset
        { //multiset insert
            "type": "multiset_insert",
            "message0": "multiset %1 插入 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 multiset 內的任意位置。",
            "helpurl": ""
        },
        { //multiset insert_range
            "type": "multiset_insert_range",
            "message0": "在 multiset 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#00FA9A",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到multiset最後",
            "helpurl": ""
        },
        { //multiset erase
            "type": "multiset_erase",
            "message0": "multiset %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 multiset 中一個或多個元素。",
            "helpurl": ""
        },
        { //multiset emplace
            "type": "multiset_emplace",
            "message0": "在 multiset 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#00FA9A",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到multiset最後",
            "helpurl": ""
        },
        { //multiset extract
            "type": "multiset_extract",
            "message0": "multiset %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset 提取元素",
            "helpurl": ""
        },
        { //multiset merge
            "type": "multiset_merge",
            "message0": "multiset1: %1 合併 multiset2: %2, 並multiset2 刪除 multiset1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name1"
                },
                {
                    "type": "field_input",
                    "name": "multiset_name2"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "multiset1合併multiset2, 並multiset2 刪除 multiset1 有的元素",
            "helpurl": ""
        },
        { //multiset swap
            "type": "multiset_swap",
            "message0": "交換 multiset 名稱: %1, multiset 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name1"
                },
                {
                    "type": "field_input",
                    "name": "multiset_name2"
                }
            ],
            "colour": "#00FA9A",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個multiset中的元素交換",
            "helpurl": ""
        },

        // condition
        { //multiset clear
            "type": "multiset_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00FA9A",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //multiset size
            "type": "multiset_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#00FA9A",
            "tooltip": "取得 multiset 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //multiset empty
            "type": "multiset_empty",
            "message0": "判斷multiset %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "如果 multiset 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //multiset max_size
            "type": "multiset_max_size",
            "message0": "multiset 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "球multiset最大元素數量",
            "helpUrl": ""
        },

        //lookup
        {//multiset count
            "type": "multiset_count",
            "message0": "multiset %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//multiset find
            "type": "multiset_find",
            "message0": "multiset %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//multiset contains
            "type": "multiset_contains",
            "message0": "multiset %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//multiset equal_range
            "type": "multiset_equal_range",
            "message0": "multiset %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
        {//multiset lower_bound
            "type": "multiset_lower_bound",
            "message0": "multiset %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "helpurl": ""
        },
        {//multiset upper_bound
            "type": "multiset_upper_bound",
            "message0": "multiset %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#00FA9A",
            "inputsInline": true,
            "output": null,
            "tooltip": "multiset判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "helpurl": ""
        },

        //iterator
        { //multiset begin
            "type": "multiset_begin",
            "message0": "multiset 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name",
                    "check": "String"
                }

            ],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 multiset 第一個元素。",
            "helpUrl": ""
        },
        { //multiset end
            "type": "multiset_end",
            "message0": "multiset 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name",
                    "check": "String"
                }

            ],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 multiset 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //multiset rbegin
            "type": "multiset_rbegin",
            "message0": "multiset 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name",
                    "check": "String"
                }

            ],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 multiset 最尾端元素的。",
            "helpUrl": ""
        },
        { //multiset rend
            "type": "multiset_rend",
            "message0": "multiset 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "multiset_name",
                    "check": "String"
                }

            ],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 multiset 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        {
            "type": "multiset_extract_value",
            "message0": "從multiset名稱: %1取出的值",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "multiset_extract_is_value",
            "message0": "檢查從multiset名稱: %1std::extract物件是否有效",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "multiset_extract_release",
            "message0": "將從multiset名稱: %1提取的元素從容器中完全移除",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "multiset_equal_range_first",
            "message0": "從multiset名稱: %1提取equal_range的第一個元素，如果相等元素存在，就會指向香等元素位置，否則指向end()",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },
        {
            "type": "multiset_equal_range_second",
            "message0": "從multiset名稱: %1提取equal_range的第二個元素，範圍結束的迭代器，通常指向容器的end()",
            "args0": [{
                "type": "field_input",
                "name": "multiset_name"
            }],
            "colour": "#00FA9A",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },

        //flat_set
        { //flat_set insert
            "type": "flat_set_insert",
            "message0": "flat_set %1 插入 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 flat_set 內的任意位置。",
            "helpurl": ""
        },
        { //flat_set insert_range
            "type": "flat_set_insert_range",
            "message0": "在 flat_set 名稱: %1 加陣列 %2 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#DAA520",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到flat_set最後",
            "helpurl": ""
        },
        { //flat_set erase
            "type": "flat_set_erase",
            "message0": "flat_set %1 刪除 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 flat_set 中一個或多個元素。",
            "helpurl": ""
        },
        { //flat_set emplace
            "type": "flat_set_emplace",
            "message0": "在 flat_set 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#DAA520",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到flat_set最後",
            "helpurl": ""
        },
        { //flat_set extract
            "type": "flat_set_extract",
            "message0": "flat_set %1 提取 %2",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set 提取元素",
            "helpurl": ""
        },
        { //flat_set merge
            "type": "flat_set_merge",
            "message0": "flat_set1: %1 合併 flat_set2: %2, 並flat_set2 刪除 flat_set1 有的元素",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name1"
                },
                {
                    "type": "field_input",
                    "name": "flat_set_name2"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "flat_set1合併flat_set2, 並flat_set2 刪除 flat_set1 有的元素",
            "helpurl": ""
        },
        { //flat_set swap
            "type": "flat_set_swap",
            "message0": "交換 flat_set 名稱: %1, flat_set 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name1"
                },
                {
                    "type": "field_input",
                    "name": "flat_set_name2"
                }
            ],
            "colour": "#DAA520",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個flat_set中的元素交換",
            "helpurl": ""
        },
        
        // condition
        { //flat_set clear
            "type": "flat_set_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#DAA520",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //flat_set size
            "type": "flat_set_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#DAA520",
            "tooltip": "取得 flat_set 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //flat_set empty
            "type": "flat_set_empty",
            "message0": "判斷flat_set %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "如果 flat_set 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //flat_set max_size
            "type": "flat_set_max_size",
            "message0": "flat_set 名稱: %1 最大元素數量",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "球flat_set最大元素數量",
            "helpUrl": ""
        },
        
        //lookup
        {//flat_set count
            "type": "flat_set_count",
            "message0": "flat_set %1 尋找是否有元素: %2(返回 0, 1)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set尋找是否有元素(返回 0, 1)",
            "helpurl": ""
        },
        {//flat_set find
            "type": "flat_set_find",
            "message0": "flat_set %1 尋找是否有元素: %2 (返回迭代器)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set尋找是否有元素(返回迭代器)",
            "helpurl": ""
        },
        {//flat_set contains
            "type": "flat_set_contains",
            "message0": "flat_set %1 尋找是否有元素: %2(返回 true, false)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set尋找是否有元素(返回 true, false)",
            "helpurl": ""
        },
        {//flat_set equal_range
            "type": "flat_set_equal_range",
            "message0": "flat_set %1 尋找是否有元素: %2(返回 first: 等於元素位置, second: 下一個元素位置)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set尋找是否有元素(返回 first: 等於元素位置, second: 下一個元素位置)",
            "helpurl": ""
        },
        {//flat_set lower_bound
            "type": "flat_set_lower_bound",
            "message0": "flat_set %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個不小於元素1的元素2)",
            "helpurl": ""
        },
        {//flat_set upper_bound
            "type": "flat_set_upper_bound",
            "message0": "flat_set %1 尋找是否有元素1: %2(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name"
                },
                {
                    "type": "input_value",
                    "name": "value"
                }
            ],
            "colour": "#DAA520",
            "inputsInline": true,
            "output": null,
            "tooltip": "flat_set判斷是否有元素(回傳迭代器, 有元素1回傳元素1位置, 沒元素1為傳第一個大於元素1的元素2)",
            "helpurl": ""
        },
        
        //iterator
        { //flat_set begin
            "type": "flat_set_begin",
            "message0": "flat_set 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 flat_set 第一個元素。",
            "helpUrl": ""
        },
        { //flat_set end
            "type": "flat_set_end",
            "message0": "flat_set 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 flat_set 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //flat_set rbegin
            "type": "flat_set_rbegin",
            "message0": "flat_set 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 flat_set 最尾端元素的。",
            "helpUrl": ""
        },
        { //flat_set rend
            "type": "flat_set_rend",
            "message0": "flat_set 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "flat_set_name",
                    "check": "String"
                }
        
            ],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 flat_set 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        {
            "type": "flat_set_extract_value",
            "message0": "從flat_set名稱: %1取出的值",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "flat_set_extract_is_value",
            "message0": "檢查從flat_set名稱: %1std::extract物件是否有效",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "flat_set_extract_release",
            "message0": "將從flat_set名稱: %1提取的元素從容器中完全移除",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": ""
        },
        {
            "type": "flat_set_equal_range_first",
            "message0": "從flat_set名稱: %1提取equal_range的第一個元素，如果相等元素存在，就會指向香等元素位置，否則指向end()",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },
        {
            "type": "flat_set_equal_range_second",
            "message0": "從flat_set名稱: %1提取equal_range的第二個元素，範圍結束的迭代器，通常指向容器的end()",
            "args0": [{
                "type": "field_input",
                "name": "flat_set_name"
            }],
            "colour": "#DAA520",
            "output": null,
            "tooltip": "",
            "helpurl": "" 
        },

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

        //stack 
        { //stack push
            "type": "stack_push",
            "message0": "在 stack 名稱: %1 加元素 %2( 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "stack_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#b53c2f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到stack最後",
            "helpurl": ""
        },
        { //stack push_range
            "type": "stack_push_range",
            "message0": "在 stack 名稱: %1 加陣列 %2 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "stack_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#b53c2f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到stack最後",
            "helpurl": ""
        },
        { //stack pop
            "type": "stack_pop",
            "message0": "在 stack 名稱: %1 刪除最後一個元素(pop)",
            "args0": [{
                "type": "field_input",
                "name": "stack_name"
            }],
            "colour": "#b53c2f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到stack最後",
            "helpurl": ""
        },
        { //stack emplace
            "type": "stack_emplace",
            "message0": "在 stack 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "stack_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#b53c2f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到stack最後",
            "helpurl": ""
        },
        { //stack top
            "type": "stack_top",
            "message0": "在 stack 名稱: %1 取出最後一個元素(top)",
            "args0": [{
                "type": "field_input",
                "name": "stack_name"
            }],
            "colour": "#b53c2f",
            "output": null,
            "tooltip": "把元素推到stack最後",
            "helpurl": ""
        },
        { //stack swap
            "type": "stack_swap",
            "message0": "交換 stack 名稱: %1, stack 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "stack_name1"
                },
                {
                    "type": "field_input",
                    "name": "stack_name2"
                }
            ],
            "colour": "#b53c2f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到stack最後",
            "helpurl": ""
        },
        { //stack size
            "type": "stack_size",
            "message0": "stack %1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "stack _name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#b53c2f",
            "tooltip": "取得 stack 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //stack empty
            "type": "stack_empty",
            "message0": "判斷stack  %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "stack_name"
            }],
            "colour": "#b53c2f",
            "output": null,
            "tooltip": "如果 stack 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //queue push
            "type": "queue_push",
            "message0": "在 queue 名稱: %1 加元素 %2( 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#cf5f87",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到queue最後",
            "helpurl": ""
        },
        { //queue pop
            "type": "queue_pop",
            "message0": "在 queue 名稱: %1 刪除最後一個元素(pop)",
            "args0": [{
                "type": "field_input",
                "name": "queue_name"
            }],
            "colour": "#cf5f87",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到queue最後",
            "helpurl": ""
        },
        { //queue emplace
            "type": "queue_emplace",
            "message0": "在 queue 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#cf5f87",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到queue最後",
            "helpurl": ""
        },
        { //queue top
            "type": "queue_front",
            "message0": "在 queue 名稱: %1 取出最後一個元素(front)",
            "args0": [{
                "type": "field_input",
                "name": "queue_name"
            }],
            "colour": "#cf5f87",
            "output": null,
            "tooltip": "把元素推到queue最後",
            "helpurl": ""
        },
        { //queue size
            "type": "queue_size",
            "message0": "queue %1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "queue _name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#cf5f87",
            "tooltip": "取得 queue 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //queue empty
            "type": "queue_empty",
            "message0": "判斷queue  %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "queue_name"
            }],
            "colour": "#cf5f87",
            "output": null,
            "tooltip": "如果 queue 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //queue push_range
            "type": "queue_push_range",
            "message0": "在 queue 名稱: %1 加陣列 %2 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#cf5f87",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到queue最後",
            "helpurl": ""
        },
        { //queue swap
            "type": "queue_swap",
            "message0": "交換 queue 名稱: %1, queue 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "queue_name1"
                },
                {
                    "type": "field_input",
                    "name": "queue_name2"
                }
            ],
            "colour": "#cf5f87",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到queue最後",
            "helpurl": ""
        },
        //deqeue
        { //deque push back
            "type": "deque_push_back",
            "message0": "在 deque: %1 新增 %2 在最後一個(只能輸入單個)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "新增元素至 deque 的尾端，必要時會進行記憶體組態。",
            "helpUrl": ""
        },
        { //emplace back
            "type": "deque_emplace_back",
            "message0": "在 deque: %1 新增 %2 在最後一個(可輸入多個 , 用空白分開)",
            "args0": [{
                    "type": "field_input",
                    "name": "NAME",
                    "check": ["Number", "String"]
                },
                {
                    "type": "field_input",
                    "name": "number",
                    "text": ""
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "直接在deque內建立物件",
            "helpUrl": ""
        },
        { //deque append_range
            "type": "deque_append_range",
            "message0": "在 deque 名稱: %1 加陣列 %2 到最後 (append)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#dde3b0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到deque最後",
            "helpurl": ""
        },
        { //deque pop back
            "type": "deque_pop_back",
            "message0": "deque 在 %1 刪除最後一個",
            "args0": [{
                "type": "field_input",
                "name": "deque_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "刪除 deque 最尾端的元素。",
            "helpUrl": ""
        },
        { //deque push front
            "type": "deque_push_front",
            "message0": "deque 在 %1 新增 %2 在第一個(只能輸入單個)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "新增元素至 deque 的前端，必要時會進行記憶體組態。",
            "helpUrl": ""
        },
        { //emplace front
            "type": "deque_emplace_front",
            "message0": "在 %1 新增 %2 在第一個(可輸入多個 , 用空白分開)",
            "args0": [{
                    "type": "field_input",
                    "name": "NAME",
                    "check": ["Number", "String"]
                },
                {
                    "type": "field_input",
                    "name": "number",
                    "text": ""
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "直接在deque內建立物件",
            "helpUrl": ""
        },
        { //deque prepend_range
            "type": "deque_prepend_range",
            "message0": "在 deque 名稱: %1 加陣列 %2 到最後 (prepend)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#dde3b0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到deque最後",
            "helpurl": ""
        },
        { //deque pop front
            "type": "deque_pop_front",
            "message0": "deque 在 %1 刪除第一個",
            "args0": [{
                "type": "field_input",
                "name": "deque_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "刪除 deque 最前端的元素。",
            "helpUrl": ""
        },
        { //deque insert
            "type": "deque_insert",
            "message0": "deque %1 在 %2 位置插入 %3",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
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
            "colour": "#dde3b0",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "插入一個或多個元素至 deque 內的任意位置。",
            "helpurl": ""
        },
        { //deque insert_range
            "type": "deque_insert_range",
            "message0": "在 deque 名稱: %1 在位置: %2 加陣列 %3 (insert)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "pos"
                },
                {
                    "type": "input_value",
                    "name": "array"
                },
            ],
            "colour": "#dde3b0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到deque最後",
            "helpurl": ""
        },
        { //deque erase
            "type": "deque_erase",
            "message0": "deque %1 在 %2 位置刪除 %3",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
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
            "colour": "#dde3b0",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "刪除 deque 中一個或多個元素。",
            "helpurl": ""
        },
        { //deque swap
            "type": "deque_swap",
            "message0": "交換 deque 名稱: %1, deque 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name1"
                },
                {
                    "type": "field_input",
                    "name": "deque_name2"
                }
            ],
            "colour": "#dde3b0",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把兩個deque中的元素交換",
            "helpurl": ""
        },
        
        //read
        {//operate[]
            "type": "deque_operate[]",
            "message0": "deque 讀取名稱%1 第 %2 個元素",
            "args0": [
                {
                    "type": "field_input",
                    "name": "deque_name"
                },
                {
                    "type": "input_value",
                    "name": "pos"
                },
            ],
            "colour": "#dde3b0",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取deque[i]。",
            "helpurl": ""
        },
        {//deque_front
            "type": "deque_front",
            "message0": "deque 讀取名稱%1 第一個元素",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                }],
            "colour": "#dde3b0",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取deque第一個元素。",
            "helpurl": ""
        },
        {//deque_back
            "type": "deque_back",
            "message0": "deque 讀取名稱%1 最後一個元素",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name"
                }],
            "colour": "#dde3b0",
            "inputsInline": true,
            "output": null,
            "tooltip": "讀取deque最後一個元素。",
            "helpurl": ""
        },
        
        // condition
        { //deque clear
            "type": "deque_clear",
            "message0": "把 %1 的元素全部清除",
            "args0": [{
                "type": "field_input",
                "name": "deque_name"
            }, ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#dde3b0",
            "tooltip": "清空所有元素。",
            "helpUrl": ""
        },
        { //deque size
            "type": "deque_size",
            "message0": "%1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "deque_name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#dde3b0",
            "tooltip": "取得 deque 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //deque empty
            "type": "deque_empty",
            "message0": "判斷deque %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "deque_name"
            }],
            "colour": "#dde3b0",
            "output": null,
            "tooltip": "如果 deque 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        
        //iterator
        { //deque begin
            "type": "deque_begin",
            "message0": "deque 陣列 %1 (begin)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name",
                    "check": "String"
                }
        
            ],
            "colour": "#dde3b0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 deque 第一個元素。",
            "helpUrl": ""
        },
        { //deque end
            "type": "deque_end",
            "message0": "deque 陣列 %1 (end)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name",
                    "check": "String"
                }
        
            ],
            "colour": "#dde3b0",
            "output": null,
            "tooltip": "回傳一個反向迭代器，它指向 deque 最尾端元素的下一個位置",
            "helpUrl": ""
        },
        { //deque rbegin
            "type": "deque_rbegin",
            "message0": "deque 陣列 %1 (rbegin)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name",
                    "check": "String"
                }
        
            ],
            "colour": "#dde3b0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 deque 最尾端元素的。",
            "helpUrl": ""
        },
        { //deque rend
            "type": "deque_rend",
            "message0": "deque 陣列 %1 (rend)",
            "args0": [{
                    "type": "field_input",
                    "name": "deque_name",
                    "check": "String"
                }
        
            ],
            "colour": "#dde3b0",
            "output": null,
            "tooltip": "回傳一個迭代器，它指向 deque 的第一個元素的前一個位置。",
            "helpUrl": ""
        },
        //priority_queue
        { //priority_queue push
            "type": "priority_queue_push",
            "message0": "在 priority_queue 名稱: %1 加元素 %2( 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "priority_queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#d6af0f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到priority_queue最後",
            "helpurl": ""
        },
        { //priority_queue pop
            "type": "priority_queue_pop",
            "message0": "在 priority_queue 名稱: %1 刪除最後一個元素(pop)",
            "args0": [{
                "type": "field_input",
                "name": "priority_queue_name"
            }],
            "colour": "#d6af0f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到priority_queue最後",
            "helpurl": ""
        },
        { //priority_queue emplace
            "type": "priority_queue_emplace",
            "message0": "在 priority_queue 名稱: %1 加超過一個元素 %2 在最後一個(emplace)",
            "args0": [{
                    "type": "field_input",
                    "name": "priority_queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#d6af0f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到priority_queue最後",
            "helpurl": ""
        },
        { //priority_queue top
            "type": "priority_queue_top",
            "message0": "在 priority_queue 名稱: %1 取出最後一個元素(top)",
            "args0": [{
                "type": "field_input",
                "name": "priority_queue_name"
            }],
            "colour": "#d6af0f",
            "output": null,
            "tooltip": "把元素推到priority_queue最後",
            "helpurl": ""
        },
        { //priority_queue size
            "type": "priority_queue_size",
            "message0": "priority_queue %1 的陣列大小",
            "args0": [{
                "type": "field_input",
                "name": "priority_queue _name"
            }],
            "inputsInline": true,
            "output": null,
            "colour": "#d6af0f",
            "tooltip": "取得 priority_queue 目前持有的元素個數。",
            "helpUrl": ""
        },
        { //priority_queue empty
            "type": "priority_queue_empty",
            "message0": "判斷priority_queue  %1 是否為空",
            "args0": [{
                "type": "field_input",
                "name": "priority_queue_name"
            }],
            "colour": "#d6af0f",
            "output": null,
            "tooltip": "如果 priority_queue 內部為空，則傳回 true 值。",
            "helpUrl": ""
        },
        { //priority_queue push_range
            "type": "priority_queue_push_range",
            "message0": "在 priority_queue 名稱: %1 加陣列 %2 在最後一個(push)",
            "args0": [{
                    "type": "field_input",
                    "name": "priority_queue_name"
                },
                {
                    "type": "input_value",
                    "name": "element"
                },
            ],
            "colour": "#d6af0f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把陣列推到priority_queue最後",
            "helpurl": ""
        },
        { //priority_queue swap
            "type": "priority_queue_swap",
            "message0": "交換 priority_queue 名稱: %1, priority_queue 名稱: %2",
            "args0": [{
                    "type": "field_input",
                    "name": "priority_queue_name1"
                },
                {
                    "type": "field_input",
                    "name": "priority_queue_name2"
                }
            ],
            "colour": "#d6af0f",
            "previousStatement": null,
            "nextStatement": null,
            "tooltip": "把元素推到priority_queue最後",
            "helpurl": ""
        },
        {
            "type": "greater<int>",
            "message0": "陣列反向專用",
            "colour": "#d6af0f",
            "output": null
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
            "message0": "long lnog絕對值: %1",
            "args0": [{
                "type": "input_value",
                "name": "value"
            }],
            "output": "Number",
            "colour": "#AFEEEE",
            "tooltip": "long long absolute",
            "helpurl": ""
        },
        
        //functional
        {
            "type": "less",
            "message0": "陣列專用, 資料型態%1, 排序方式 a < b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
        {
            "type": "greater",
            "message0": "陣列專用, 資料型態%1, 排序方式 a < b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
        {
            "type": "equal_to",
            "message0": "陣列專用, 資料型態%1, 排序方式 a == b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
        {
            "type": "not_equal_to",
            "message0": "陣列專用, 資料型態%1, 排序方式 a != b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
        {
            "type": "greater_equal",
            "message0": "陣列專用, 資料型態%1, 排序方式 a >= b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
        {
            "type": "equal_to",
            "message0": "陣列專用, 資料型態%1, 排序方式 a <= b",
            "args0": [{
                "type": "input_value",
                "name": "TYPE"
            }],
            "colour": "#urj329",
            "output": null
        },
    ]
);
