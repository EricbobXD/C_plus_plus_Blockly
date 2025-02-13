        // 方塊定義&轉換程式碼
        Blockly.defineBlocksWithJsonArray(
            [
                //bitset
                { //define bitset
                    "type": "define_bitset",
                    "message0": "創建 bitset陣列 名稱: %1, 大小 %2, 內容: %3",
                    "args0": [{
                            "type": "field_input",
                            "name": "bitset_name",
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
                    "type": "def_struct",
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
                    "type": "def_class",
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

                //initializaiton
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

                //data
                { //text
                    "type": "label",
                    "message0": "文本 %1",
                    "args0": [{
                        "type": "field_input",
                        "name": "TEXT",
                        "text": "Hello world"
                    }],
                    "output": "String",
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
                { //def function void
                    "type": "function_definition_void",
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
                    "tooltip": "定義一個沒有回傳值的函數",
                    "helpUrl": ""
                },
                { //def function void
                    "type": "function_definition",
                    "message0": "函式型態: %1 名稱 %2 變數%3",
                    "args0": [{
                            "type": "field_dropdown",
                            "name": "TYPE",
                            "options": [
                                ["整數", "int"],
                                ["浮點數", "float"],
                                ["雙重浮點數", "double"],
                                ["字元", "char"],
                                ["字串", "string"]
                            ]
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
                    "colour": "#db00db",
                    "tooltip": "定義一個有回傳值的函數",
                    "helpUrl": ""
                },
                //function
                { //def_fun_void
                    "type": "def_fun_void",
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
                    "previousStatement": null,
                    "nextStatement": null,
                    "tooltip": "定義一個沒有回傳值的函數",
                    "helpUrl": ""
                },
                { //def_fun
                    "type": "def_fun",
                    "message0": "函式型態: %1 名稱 %2 變數%3",
                    "args0": [{
                            "type": "field_dropdown",
                            "name": "TYPE",
                            "options": [
                                ["整數", "int"],
                                ["浮點數", "float"],
                                ["雙重浮點數", "double"],
                                ["字元", "char"],
                                ["字串", "string"]
                            ]
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
                    "message0": "lambda [%1](引用變數: %2)",
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

                //define variable
                { //def variable
                    "type": "declare_variable",
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
                                ["XOR", "XOR"],
                                ["否", "NOT"]
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
                    "colour": "#5f9ea0",
                    "tooltip": "空指標的常值",
                    "helpUrl": ""
                },
                { //declare_pointer
                    "type": "declare_pointer",
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
                    "output": true,
                    "tooltip": "定義一個指標",
                    "helpurl": ""
                },
                { //declart_reference
                    "type": "declare_reference",
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
                            "type": "field_dropdown",
                            "name": "TYPE",
                            "options": [
                                ["整數", "int"],
                                ["浮點數", "float"],
                                ["雙重浮點數", "double"],
                                ["字元", "char"],
                                ["字串", "string"],
                                ["更長的整數", "long long"],
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
                    "colour": "#5f9ea0",
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
                            "type": "field_dropdown",
                            "name": "TYPE",
                            "options": [
                                ["整數", "int"],
                                ["浮點數", "float"],
                                ["雙重浮點數", "double"],
                                ["字元", "char"],
                                ["字串", "string"],
                                ["更長的整數", "long long"],
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
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
                    "colour": "#5f9ea0",
                    "previousStatement": null,
                    "nextStatement": null,
                    "tooltip": "指標指向物件",
                    "helpUrl": ""
                },
                {
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
                {
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
                {
                    "type": "include_std_block",
                    "message0": "引用所有std函式庫",
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#123456",
                    "tooltip": "引用所有std函式庫",
                    "helpUrl": ""
                },
                {
                    "type": "include_pbds_block",
                    "message0": "引用所有pbds函式庫",
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#123456",
                    "tooltip": "引用所有pbds函式庫",
                    "helpUrl": ""
                },
                {
                    "type": "std_space_block",
                    "message0": "引用std空間",
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#123456",
                    "tooltip": "引用std空間",
                    "helpUrl": ""
                },
                {
                    "type": "pbds_space_block",
                    "message0": "引用pbds空間",
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#123456",
                    "tooltip": "引用pbds空間",
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
                    "message0": "vector 在 %1 新增 %2 在最後一個(只能輸入單個)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vector_name"
                        },
                        {
                            "type": "input_value",
                            "name": "number"
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
                    "message0": "在 %1 新增 %2 在最後一個(可輸入多個 , 用空白分開)",
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個迭代器，它指向 vector 的第一個元素的前一個位置。",
                    "helpUrl": ""
                },
                //map
                { //map insert
                    "type": "map_insert",
                    "message0": "map %1 新增陣列元素〔%2, %3〕",
                    "args0": [{
                            "type": "field_input",
                            "name": "map_name"
                        },
                        {
                            "type": "input_value",
                            "name": "first"
                        },
                        {
                            "type": "input_value",
                            "name": "second"
                        },
                    ],
                    "colour": "#20b2aa",
                    "previousStatement": null,
                    "nextStatement": null,
                    "tooltip": "path 1 to insert key and value in map"
                },
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
                { //map begin
                    "type": "map_begin",
                    "message0": "陣列 %1 的第一個(begin)",
                    "args0": [{
                            "type": "field_input",
                            "name": "map_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "helpUrl": ""
                },
                { //map end
                    "type": "map_end",
                    "message0": "陣列 %1 的最後一個(end)",
                    "args0": [{
                            "type": "field_input",
                            "name": "map_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "helpUrl": ""
                },
                { //map rbegin
                    "type": "map_rbegin",
                    "message0": "陣列 %1 的最後一個(rbegin)",
                    "args0": [{
                            "type": "field_input",
                            "name": "map_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "helpUrl": ""
                },
                { //map rend
                    "type": "map_rend",
                    "message0": "陣列 %1 的第一個(rend)",
                    "args0": [{
                            "type": "field_input",
                            "name": "map_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "helpUrl": ""
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
                    "tooltip": "create new pair has key and value",
                    "helpUrl": ""
                },


                //array
                { //create array
                    "type": "create_array",
                    "message0": "資料型態 %1 , 陣列名稱 %2 , 大小 : %3 , 陣列內容 %4 (可加可不加)",
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
                            "name": "content"
                        }
                    ],
                    "colour": "#ff5757",
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
                { //array[i]
                    "type": "array[i]",
                    "message0": "陣列 %1 [%2]",
                    "args0": [{
                            "type": "field_input",
                            "name": "array_name"
                        },
                        {
                            "type": "input_value",
                            "name": "pos"
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個迭代器，它指向 set 的第一個元素的前一個位置。",
                    "helpUrl": ""
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
                { //stack top
                    "type": "stack_top",
                    "message0": "在 stack 名稱: %1 取出最後一個元素()",
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
                { //queue top
                    "type": "queue_front",
                    "message0": "在 queue 名稱: %1 取出最後一個元素(front)",
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
                    "message0": "deque 在 %1 新增 %2 在最後一個(只能輸入單個)",
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
                    "message0": "在 %1 新增 %2 在最後一個(可輸入多個 , 用空白分開)",
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "previousStatement": null,
                    "nextStatement": null,
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                    "colour": "#778899",
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
                { //priority_queue top
                    "type": "priority_queue_front",
                    "message0": "在 priority_queue 名稱: %1 取出最後一個元素(front)",
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
            ]
        );
