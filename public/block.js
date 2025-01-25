        // 方塊定義&轉換程式碼
        Blockly.defineBlocksWithJsonArray(
            [
                //bitset
                {//define bitset
                    "type" : "define_bitset",
                    "message0": "創建 bitset陣列 名稱: %1, 大小 %2, 內容: %3",
                    "args0": [
                        {
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
                    "colour": "#bad63d",
                    "previousStatement": null,
                    "nextStatement": null,
                    "tooltip": "創建一個bitset陣列，bitset是一加速的布林陣列",
                    "helpurl": ""
                },   
                { //array[i]
                    "type" : "bitset[i]",
                    "message0" : "bitset陣列 %1 [位置%2] = 值%3",
                    "args0" :[
                        {
                            "type" : "field_input",
                            "name" : "bitset_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "pos"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour": "#ff5757",
                    "output": null,
                    "tooltip": "矩陣名稱",
                    "helpurl": ""
                },
                {//bitset_size
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
                {//bitset_set
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
                {//bitset_reset
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
                {//bitset_count
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
                {//bitset_all
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
                {//bitset_any
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
                {//bitset_none
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
                    "helpurl":""
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
                            "type":"input_value",
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
                    "helpurl":""
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
                { //int main
                    "type": "main_block",
                    "message0": "主程式框架",
                    "message1": "%1",
                    "args1": [{
                        "type": "input_statement",
                        "name": "DO"
                    }],
                    "message2": "回傳值: 0",
                    "colour": "#24B324",
                    "inputsInline": false,
                    "tooltip": "運行主要程式碼的框架",
                    "helpUrl": ""
                },        
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
                //condition
                { //for
                    "type": "for_block",
                    "message0": "初始變數值 %1  循環條件 %2 迴圈條件 %3  執行%4 ",
                    "args0": [
                        {
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
                    "message0" : "宣告 %1 %2 變數名稱: %3 = %4",
                    "args0" : [
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
                            "type" : "field_input",
                            "name" : "var_name",
                            "text" : "i"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        },
                    ],
                    "colour": "#DABD00",
                    "output": null,
                    "tooltip" : "定義一個變數",
                    "helpurl" : ""
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
                    "args0": [
                        {
                            "type" : "field_input",
                            "name" : "funcName",
                            "text" : "MyFunction"
                        },
                        {
                            "type" : "input_value",
                            "name" : "data",
                        }
                    ],
                    "message1" : "%1 回傳值%2",
                    "args1" : [
                        {
                            "type" : "input_statement",
                            "name" : "DO"
                        },
                        {
                            "type" : "field_dropdown",
                            "name" : "expression",
                            "options" : [
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
                            "type" : "field_input",
                            "name" : "funcName",
                            "text" : "MyFunction2"
                        },
                        {
                            "type" : "input_value",
                            "name" : "data",
                        }
                    ],
                    "message1" : "%1 回傳值 %2",
                    "args1" : [
                        {
                            "type" : "input_statement",
                            "name" : "DO"
                        },
                        {
                            "type" : "input_value",
                            "name" : "expression"
                        }
                    ],
                    "colour": "#db00db",
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
                
                //define variable
                { //def variable
                    "type": "declare_variable",
                    "message0" : "宣告 %1 %2 %3 變數名稱: %4 = %5",
                    "args0" : [
                        {
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
                            "type" : "field_input",
                            "name" : "var_name",
                            "text" : "i"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        },
                    ],
                    "colour": "#DABD00",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "定義一個變數",
                    "helpurl" : ""
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
                    "type": "var_caculacte",
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
                    "message0" : "宣告 %1 %2 %3 %4指標名稱: %5 = %6",
                    "args0" : [
                        {
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
                            "type" : "field_input",
                            "name" : "var_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        },
                    ],
                    "colour": "#5f9ea0",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "定義一個指標",
                    "helpurl" : ""
                },
                { //declart_reference
                    "type": "declare_reference",
                    "message0" : "宣告 %1 %2 %3 位置名稱: %4 = %5",
                    "args0" : [
                        {   
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
                            "type" : "field_input",
                            "name" : "var_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        },
                    ],
                    "colour": "#5f9ea0",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "宣告一個位置",
                    "helpurl" : ""
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
                
                //Standard Library
                //math
                { //math caculacte
                    "type": "math_caculacte",
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
                { //define vector
                    "type": "define_vector",
                    "message0": "資料型態%1 , 名字 : %2 , 大小 : %3(可加可不加) : 陣列內容 : %4(可加可不加)",
                    "args0": [{
                            "type": "field_dropdown",
                            "name": "TYPE",
                            "options": [
                                ["整數", "int"],
                                ["浮整數", "float"],
                                ["雙重浮點數", "double"],
                                ["字元", "char"],
                                ["字串", "string"],
                                ["更長的整數", "long long"]
                            ]
                        },
                        {
                            "type": "field_input",
                            "name": "vec_name",
                        },
                        {
                            "type": "input_value",
                            "name": "vec_size"
                        },
                        {
                            "type": "input_value",
                            "name": "vec_content"
                        }
                    ],
                    "colour": "#3d7fd6",
                    "previousStatement": null,
                    "nextStatement": null,
                    "tooltip": "創建一個vector陣列，vector是會自動擴展容量的陣列",
                    "helpurl": ""
                },
                { //vector push back
                    "type": "push_back",
                    "message0": "在 %1 新增 %2 在最後一個(只能輸入單個)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vec_name"
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
                { //vector pop back
                    "type": "pop_back",
                    "message0": "在 %1 刪除最後一個",
                    "args0": [{
                        "type": "field_input",
                        "name": "vec_name"
                    }, ],
                    "inputsInline": true,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#3d7fd6",
                    "tooltip": "刪除 vector 最尾端的元素。",
                    "helpUrl": ""
                },
                { //vector clear
                    "type": "vector_clear",
                    "message0": "把 %1 的元素全部清除",
                    "args0": [{
                        "type": "field_input",
                        "name": "vec_name"
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
                        "name": "vec_name"
                    }],
                    "inputsInline": true,
                    "output": null,
                    "colour": "#3d7fd6",
                    "tooltip": "取得 vector 目前持有的元素個數。",
                    "helpUrl": ""
                },
                { //vec empty
                    "type" : "vector_empty",
                    "message0" : "判斷vector %1 是否為空",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "vec_name"
                        }
                    ],
                    "colour": "#3d7fd6",
                    "output" : null,
                    "tooltip": "如果 vector 內部為空，則傳回 true 值。",
                    "helpUrl": ""
                },
                { //vector insert
                    "type" : "vector_insert",
                    "message0" : "vector %1 在 %2 位置插入 %3",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "vec_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "pos"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour": "#3d7fd6",
                    "inputsInline": true,
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "插入一個或多個元素至 vector 內的任意位置。",
                    "helpurl" : ""
                },
                { //vector erase
                    "type" : "vector_erase",
                    "message0" : "vector %1 在 %2 位置刪除 %3",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "vec_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "pos"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour": "#3d7fd6",
                    "inputsInline": true,
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "刪除 vector 中一個或多個元素。",
                    "helpurl" : ""
                },
                { //emplace back
                    "type": "emplace_back",
                    "message0": "在 %1 新增 %2 在最後一個(可輸入多個 , 用空白分開)",
                    "args0": [
                    {
                        "type": "field_input",
                        "name": "NAME",
                        "check" : ["Number" , "String"]
                    },
                    {
                        "type": "field_input",
                        "name": "number",
                        "text": ""
                    }
                    ],
                    "inputsInline": true,
                    "nextStatement": null,
                    "colour": "#3d7fd6",
                    "tooltip": "直接在vector內建立物件",
                    "helpUrl": ""
                },
                { //vec begin
                    "type": "vec_begin",
                    "message0": "陣列 %1 (begin)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vec_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個迭代器，它指向 vector 第一個元素。",
                    "helpUrl": ""
                },
                { //vec end
                    "type": "vec_end",
                    "message0": "陣列 %1 (end)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vec_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個反向迭代器，它指向 vector 最尾端元素的下一個位置",
                    "helpUrl": ""
                },
                { //vec rbegin
                    "type": "vec_rbegin",
                    "message0": "陣列 %1 (rbegin)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vec_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個迭代器，它指向 vector 最尾端元素的。",
                    "helpUrl": ""
                },
                { //vec rend
                    "type": "vec_rend",
                    "message0": "陣列 %1 (rend)",
                    "args0": [{
                            "type": "field_input",
                            "name": "vec_name",
                            "check": "String"
                        }

                    ],
                    "colour": "#778899",
                    "output": null,
                    "tooltip": "回傳一個迭代器，它指向 vector 的第一個元素的前一個位置。",
                    "helpUrl": ""
                },
                                
                //map
                { //create map
                    "type" : "create_map",
                    "message0" : "資料型態 <%1, %2>, 陣列名稱 %3, 大小 %4, 陣列內容 %5",
                    "args0" : [
                        {
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
                            "type": "field_dropdown",
                            "name": "TYPE2",
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
                            "type" : "field_input",
                            "name" : "map_name",
                            "check" : "String"
                        },
                        {
                            "type" : "input_value", 
                            "name" : "map_size",
                            "check" : "Number"
                        },
                        {
                            "type" : "input_value",
                            "name" : "content"
                        }
                    ],
                    "inputsInline": true,
                    "colour": "#20b2aa",
                    "previousStatement": null,
                    "nextStatement": null,
                    "helpUrl": ""
                },
                { //map insert
                    "type" : "map_insert",
                    "message0" : "map %1 新增陣列元素〔%2, %3〕",
                    "args0" :[
                        {
                            "type" : "field_input",
                            "name" : "map_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "first"
                        },
                        {
                            "type" : "input_value",
                            "name" : "second"
                        },
                    ],
                    "colour": "#20b2aa",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "path 1 to insert key and value in map"
                },
                { //map[i]
                    "type" : "map[i]",
                    "message0" : "map名稱 %1, key: %2, value: %3",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "map_name"
                        },
                        {
                            "type" : "field_input",
                            "name" : "map_key"
                        },
                        {
                            "type" : "field_input",
                            "name" : "map_value"
                        }
                    ],
                    "colour": "#20b2aa",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "path 2 to insert key and value in map"
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
                "type" : "map_empty",
                "message0" : "判斷map %1 是否為空",
                "args0" : [
                    {
                        "type" : "field_input",
                        "name" : "map_name"
                    }
                ],
                "colour": "#20b2aa",
                "output" : null,
                "helpUrl": ""
                },
                { //map first
                    "type" : "map_first",
                    "message0" : "map: %1, 位置: %2 的key(first)",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "map_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "key"
                        }
                    ],
                    "output" : null,
                    "colour": "#20b2aa",
                    "tooltip": "map key(first)",
                    "helpUrl": ""
                },
                { //map second
                    "type" : "map_second",
                    "message0" : "map: %1, 位置: %2 的value(second)",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "map_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "key"
                        }
                    ],
                    "output" : null,
                    "colour": "#20b2aa",
                    "tooltip": "map value(second)",
                    "helpUrl": ""
                },
                { //map find
                    "type" : "map_find",
                    "message0" : "map: %1 中尋找有沒有 %2 (key)值",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "map_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "output" : null,
                    "colour": "#20b2aa",
                    "tooltip": "尋找元素",
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
                    "type" : "array[i]",
                    "message0" : "陣列 %1 [%2]",
                    "args0" :[
                        {
                            "type" : "field_input",
                            "name" : "array_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "pos"
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
                    "colour": "#eac800",
                    "tooltip": "以一個時間戳回傳正確時間",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //calculate time difference
                    "type": "calculate_time_difference",
                    "message0": "時間 %1 和 %2 秒差",
                    "args0": [
                        { "type": "input_value", "name": "END_TIME", "check": "time_t" },
                        { "type": "input_value", "name": "START_TIME", "check": "time_t" }
                    ],
                    "output": "Number",
                    "colour": "#eac800",
                    "tooltip": "計算兩個時間戳之間的秒數差",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //convert to local time
                    "type": "convert_to_local_time",
                    "message0": "轉換 %1 到本地時間",
                    "args0": [
                        { "type": "input_value", "name": "TIMESTAMP", "check": "time_t" }
                    ],
                    "output": "tm",
                    "colour": "#eac800",
                    "tooltip": "以一個結構轉換一個時間戳至本地時間",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //convert to utc time
                    "type": "convert_to_utc_time",
                    "message0": "轉換 %1 到 UTC 時間",
                    "args0": [
                        { "type": "input_value", "name": "TIMESTAMP", "check": "time_t" }
                    ],
                    "output": "tm",
                    "colour": "#eac800",
                    "tooltip": "以一個結構轉換一個時間戳至UTC時間",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //format time string
                    "type": "format_time_string",
                    "message0": "格式化時間 %1 格式: %2",
                    "args0": [
                        { "type": "input_value", "name": "TIME_STRUCT", "check": "tm" },
                        { "type": "field_input", "name": "FORMAT", "text": "%Y-%m-%d %H:%M:%S" }
                    ],
                    "output": "String",
                    "colour": "#eac800",
                    "tooltip": "使用給定格式將時間結構格式化為字串。",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //set time structure
                    "type": "set_time_structure",
                    "message0": "設定時間結構: ",
                    "message1": "年 %1 月 %2 日 %3",
                    "args1": [
                        { "type": "input_value", "name": "YEAR", "check": "Number" },
                        { "type": "input_value", "name": "MONTH", "check": "Number" },
                        { "type": "input_value", "name": "DAY", "check": "Number" }
                    ],
                    "message2": "時 %1 分 %2 秒 %3",
                    "args2": [
                        { "type": "input_value", "name": "HOUR", "check": "Number" },
                        { "type": "input_value", "name": "MINUTE", "check": "Number" },
                        { "type": "input_value", "name": "SECOND", "check": "Number" }
                    ],
                    "output": "tm",
                    "colour": "#eac800",
                    "tooltip": "用給予值創建一個時間結構",
                    "helpUrl": "",
                    "inputsInline": false,
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //read time structure member
                    "type": "read_time_structure_member",
                    "message0": "讀取 %1 來源: %2",
                    "args0": [
                        { "type": "field_dropdown", "name": "MEMBER", "options": [
                            ["年", "tm_year"],
                            ["月", "tm_mon"],
                            ["日", "tm_mday"],
                            ["小時", "tm_hour"],
                            ["分鐘", "tm_min"],
                            ["秒", "tm_sec"]
                        ]},
                        { "type": "input_value", "name": "TIME_STRUCT", "check": "tm" }
                    ],
                    "output": "Number",
                    "colour": "#eac800",
                    "tooltip": "從時間結構中讀取特定數值",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //get current local time
                    "type": "get_current_local_time",
                    "message0": "取得本地目前時間",
                    "output": "tm",
                    "colour": "#eac800",
                    "tooltip": "以一個tm結構回傳本地目前時間",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },
                { //get current utc time
                    "type": "get_current_utc_time",
                    "message0": "取得準確 UTC 時間",
                    "output": "tm",
                    "colour": "#eac800",
                    "tooltip": "一個tm結構回傳準確的UTC時間",
                    "helpUrl": "",
                    "previousStatement": null,
                    "nextStatement": null
                },

                //set
                { //create set
                    "type" : "create_set",
                    "message0": "創建set 資料型態 %1 , 名字 : %2 , 大小 : %3(可加可不加) : 陣列內容 : %4 (可加可不加)",
                    "args0" : [
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
                            "type" : "field_input",
                            "name" : "set_name",
                        },
                        {
                            "type" : "input_value",
                            "name" : "set_size"
                        },
                        {
                            "type" : "input_value",
                            "name" : "set_content"
                        }
                    ],
                    "colour" : "#f9943b",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "建立一個集合，集合是一個有序列表",
                    "helpurl" : ""
                },
                { //set insert
                    "type" : "set_insert",
                    "message0" : "set %1 插入 %2",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour" : "#f9943b",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "插入元素",
                    "helpurl" : ""
                },
                { //set erase
                    "type" : "set_erase",
                    "message0" : "set %1 刪除 %2",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour" : "#f9943b",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "刪除元素",
                    "helpurl" : ""
                },
                { //set begin
                    "type" : "set_begin",
                    "message0" : "set %1 (begin)",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name",
                            "check" : "String"
                        }

                    ],
                    "colour" : "#778899",
                    "output" : null,
                    "tooltip": "返回容器開始處的迭代器",
                    "helpUrl": ""
                },
                { //set end
                    "type" : "set_end",
                    "message0" : "set %1 (end)",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name",
                            "check" : "String"
                        }

                    ],
                    "colour" : "#778899",
                    "output" : null,
                    "tooltip": "返回容器結束處的迭代器",
                    "helpUrl": ""
                },
                { //set empty
                    "type" : "set_empty",
                    "message0" : "判斷set %1 是否為空",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name"
                        }
                    ],
                    "colour" : "#f9943b",
                    "output" : null,
                    "tooltip": "檢查容器是否為空",
                    "helpUrl": ""
                },
                { //set find
                    "type" : "set_find",
                    "message0" : "set: %1 中尋找有沒有 %2 (key)值",
                    "args0" : [
                        {
                            "type" : "field_input",
                            "name" : "set_name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        }
                    ],
                    "colour" : "#f9943b",
                    "output" : null,
                    "tooltip": "搜到特定鍵值的元素",
                    "helpUrl": ""
                },

                //algorithm
                { //algorithm sort
                    "type" : "sort",
                    "message0" : "%1 陣列 %2 排序, 範圍(頭: %3, 尾: %4)",
                    "args0" : [ 
                        {
                            "type" : "field_dropdown",
                            "name" : "TYPE",
                            "options" : [
                                ["內建陣列", "內建陣列"],
                                ["模組陣列", "模組陣列"]
                            ]
                        },
                        {
                            "type" : "field_input",
                            "name" : "name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "start"
                        },
                        {
                            "type" : "input_value",
                            "name" : "end"
                        }
                    ],
                    "colour" : "#3cb371",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "陣列排序"
                },
                { //algorithm max
                    "type" : "max",
                    "message0" : "%1 陣列 %2 最大值, 範圍(頭: %3, 尾: %4)",
                    "args0" : [ 
                        {
                            "type" : "field_dropdown",
                            "name" : "TYPE",
                            "options" : [
                                ["內建陣列", "內建陣列"],
                                ["模組陣列", "模組陣列"]
                            ]
                        },
                        {
                            "type" : "field_input",
                            "name" : "name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "start"
                        },
                        {
                            "type" : "input_value",
                            "name" : "end"
                        }
                    ],
                    "colour" : "#3cb371",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "在陣列中搜尋最大元素"
                },
                { //algorithm min
                    "type" : "min",
                    "message0" : "%1 陣列 %2 最小值, 範圍(頭: %3, 尾: %4)",
                    "args0" : [ 
                        {
                            "type" : "field_dropdown",
                            "name" : "TYPE",
                            "options" : [
                                ["內建陣列", "內建陣列"],
                                ["模組陣列", "模組陣列"]
                            ]
                        },
                        {
                            "type" : "field_input",
                            "name" : "name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "start"
                        },
                        {
                            "type" : "input_value",
                            "name" : "end"
                        }
                    ],
                    "colour" : "#3cb371",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "在陣列中搜尋最小元素"
                },
                { //algorithm find
                    "type" : "find",
                    "message0" : "%1 陣列 %2 尋找 %3 範圍(頭: %4, 尾: %5)",
                    "args0" : [ 
                        {
                            "type" : "field_dropdown",
                            "name" : "TYPE",
                            "options" : [
                                ["內建陣列", "內建陣列"],
                                ["模組陣列", "模組陣列"]
                            ]
                        },
                        {
                            "type" : "field_input",
                            "name" : "name"
                        },
                        {
                            "type" : "input_value",
                            "name" : "value"
                        },
                        {
                            "type" : "input_value",
                            "name" : "start"
                        },
                        {
                            "type" : "input_value",
                            "name" : "end"
                        }
                    ],
                    "colour" : "#3cb371",
                    "previousStatement" : null,
                    "nextStatement" : null,
                    "tooltip" : "在陣列中尋找元素"
                },
                // iomanip
                {// setbase 
                  "type": "setbase",
                  "message0": "更改數字為%1",
                  "args0": [{
                    "type": "field_dropdown",
                    "name": "carry",
                    "options":[
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
                  "args0": [
                    {
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
                }
            ]
        );

        Blockly.Blocks['if_block'] = {
            init: function () {
                this.setPreviousStatement(true);
                this.appendValueInput("IF_VALUE")
                    .setCheck("Boolean")
                    .appendField("如果");
                this.appendStatementInput('IF_DO')
                    .setCheck(null)
                    .appendField("執行");
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['elif_mutator', 'else_mutator']));
                this.setColour("#00abea");
                this.setTooltip("If 判斷式");
                this.setHelpUrl("");
                this.elifCount_ = 0;
                this.hasElse_ = false;
            },

            saveConnections: function(containerBlock) {
                let clauseBlock = containerBlock.nextConnection.targetBlock();
                let i = 0;
                while (clauseBlock) {
                    if (clauseBlock.type === 'elif_mutator') {
                        const inputIf = this.getInput('ELIF' + i);
                        clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
                        i++;
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            },

            mutationToDom: function() {
                if (!this.elifCount_ && !this.hasElse_) {
                    return null;
                }
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
                
                return containerBlock;
            },

            compose: function(containerBlock) {
                let clauseBlock = containerBlock.nextConnection.targetBlock();
                let elifConnections = [];
                let elifCount = 0;
                let hasElse = false;
                
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'elif_mutator':
                            elifConnections[elifCount] = clauseBlock.valueConnection_;
                            elifCount++;
                            break;
                        case 'else_mutator':
                            hasElse = true;
                            break;
                        default:
                            throw TypeError('Unknown block type: ' + clauseBlock.type);
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
                
                this.elifCount_ = elifCount;
                this.hasElse_ = hasElse;
                this.updateShape_();
                
                for (let i = 0; i < this.elifCount_; i++) {
                    if (elifConnections[i]) {
                        Blockly.Mutator.reconnect(elifConnections[i], this, 'ELIF' + i);
                    }
                }
            },

            updateShape_: function() {
                // 移除現有的 elif 和 else 輸入
                for (let i = 0; this.getInput('ELIF' + i); i++) {
                    this.removeInput('ELIF' + i);
                    this.removeInput('ELIF_DO' + i);
                }
                if (this.getInput('ELSE')) {
                    this.removeInput('ELSE');
                }
                
                // 重新添加所需的輸入
                for (let i = 0; i < this.elifCount_; i++) {
                    this.appendValueInput('ELIF' + i)
                        .setCheck('Boolean')
                        .appendField('否則如果');
                    this.appendStatementInput('ELIF_DO' + i)
                        .setCheck(null)
                        .appendField('執行');
                }
                
                if (this.hasElse_) {
                    this.appendStatementInput('ELSE')
                        .setCheck(null)
                        .appendField('否則執行');
                }
            }
        };

        Blockly.Blocks['if_mutator'] = {
            init: function() {
                this.setColour("#00abea");
                this.appendDummyInput()
                    .appendField('如果');
                this.setNextStatement(true);
            }
        };

        Blockly.Blocks['elif_mutator'] = {
            init: function() {
                this.setColour("#00abea");
                this.appendDummyInput()
                    .appendField('否則如果');
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.valueConnection_ = null;
            }
        };

        Blockly.Blocks['else_mutator'] = {
            init: function() {
                this.setColour("#00abea");
                this.appendDummyInput()
                    .appendField('否則');
                this.setPreviousStatement(true);
            }
        };

        Blockly.Cpp['if_block'] = function(block) {
            const ifValue = Blockly.Cpp.valueToCode(block, 'IF_VALUE', Blockly.Cpp.ORDER_ATOMIC) || 'false';
            let code = `if (${ifValue}) {\n`;
            code += Blockly.Cpp.statementToCode(block, 'IF_DO');
            
            for (let i = 0; i < block.elifCount_; i++) {
                const elifValue = Blockly.Cpp.valueToCode(block, 'ELIF' + i, Blockly.Cpp.ORDER_ATOMIC) || 'false';
                code += `} else if (${elifValue}) {\n`;
                code += Blockly.Cpp.statementToCode(block, 'ELIF_DO' + i);
            }
            
            if (block.hasElse_) {
                code += '} else {\n';
                code += Blockly.Cpp.statementToCode(block, 'ELSE');
            }
            
            code += '}\n';
            return code;
        };

        Blockly.Blocks['switch_block'] = {
            init: function() {
                this.setPreviousStatement(true);
                this.appendValueInput("SWITCH_VALUE")
                    .setCheck(null)
                    .appendField("切換");
                this.appendStatementInput("DEFAULT")
                    .setCheck(null)
                    .appendField("預設執行");
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['case_mutator']));
                this.setColour("#00abea");
                this.setTooltip("Switch 判斷式");
                this.setHelpUrl("");
                this.caseCount_ = 0;
            },

            saveConnections: function(containerBlock) {
                let clauseBlock = containerBlock.nextConnection.targetBlock();
                let i = 0;
                while (clauseBlock && clauseBlock.type === 'case_mutator') {
                    const input = this.getInput('CASE' + i);
                    clauseBlock.valueConnection_ = input && input.connection.targetConnection;
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                    i++;
                }
            },

            mutationToDom: function() {
                if (!this.caseCount_) return null;
                const container = Blockly.utils.xml.createElement('mutation');
                container.setAttribute('caseCount', this.caseCount_);
                return container;
            },

            domToMutation: function(xmlElement) {
                this.caseCount_ = parseInt(xmlElement.getAttribute('caseCount'), 10) || 0;
                this.updateShape_();
            },

            decompose: function(workspace) {
                const containerBlock = workspace.newBlock('switch_mutator');
                containerBlock.initSvg();
                containerBlock.setFieldValue(this.caseCount_, 'CASE_COUNT');
                
                let connection = containerBlock.nextConnection;
                for (let i = 0; i < this.caseCount_; i++) {
                    const caseBlock = workspace.newBlock('case_mutator');
                    caseBlock.initSvg();
                    connection.connect(caseBlock.previousConnection);
                    connection = caseBlock.nextConnection;
                }
                
                return containerBlock;
            },

            compose: function(containerBlock) {
                let clauseBlock = containerBlock.nextConnection.targetBlock();
                let connections = [];
                
                while (clauseBlock) {
                    if (clauseBlock.type === 'case_mutator') {
                        connections.push(clauseBlock.valueConnection_);
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
                
                this.caseCount_ = connections.length;
                this.updateShape_();
                
                for (let i = 0; i < this.caseCount_; i++) {
                    if (connections[i]) {
                        Blockly.Mutator.reconnect(connections[i], this, 'CASE' + i);
                    }
                }
            },

            updateShape_: function() {
                // Remove old inputs
                for (let i = 0; this.getInput('CASE' + i); i++) {
                    this.removeInput('CASE' + i);
                    this.removeInput('CASE_DO' + i);
                }
                
                // Add new inputs
                for (let i = 0; i < this.caseCount_; i++) {
                    this.appendValueInput('CASE' + i)
                        .setCheck(null)
                        .appendField("狀況 " + (i + 1) + " 執行");
                    this.appendStatementInput('CASE_DO' + i)
                        .setCheck(null)
                        .appendField("動作");
                }
            }
        };

        Blockly.Blocks['switch_mutator'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("切換的狀況數量")
                    .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), 'CASE_COUNT');
                this.setNextStatement(true);
                this.setColour("#00abea");
            }
        };

        Blockly.Blocks['case_mutator'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("狀況");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#00abea");
                this.valueConnection_ = null;
            }
        };

        Blockly.Cpp['switch_block'] = function(block) {
            const switchValue = Blockly.Cpp.valueToCode(block, 'SWITCH_VALUE', Blockly.Cpp.ORDER_ATOMIC) || '()';
            let code = `switch ${switchValue} {\n`;

            for (let i = 0; i < block.caseCount_; i++) {
                const caseValue = Blockly.Cpp.valueToCode(block, 'CASE' + i, Blockly.Cpp.ORDER_ATOMIC) || '0';
                const caseCode = Blockly.Cpp.statementToCode(block, 'CASE_DO' + i);
                code += `  case ${caseValue}:\n${caseCode}    break;\n`;
            }

            const defaultCode = Blockly.Cpp.statementToCode(block, 'DEFAULT');
            code += `  default:\n${defaultCode}    break;\n`;
            code += '}\n';
            return code;
        };

        Blockly.Blocks['string_generic'] = {
            init: function () {
                this.setColour("#71b700");
                this.setOutput(true, "String");
                this.setInputsInline(true);
                this.setMutator(new Blockly.Mutator(['string_generic_item']));
                this.itemCount_ = 2; // 預設至少兩個輸入欄位
                this.operator_ = '+'; // 預設運算符為加法
                this.updateShape_();
            },
            mutationToDom: function () {
                const container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                container.setAttribute('operator', this.operator_);
                return container;
            },
            domToMutation: function (xmlElement) {
                this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
                this.operator_ = xmlElement.getAttribute('operator') || '+';
                this.updateShape_();
            },
            decompose: function (workspace) {
                const containerBlock = workspace.newBlock('string_generic_container');
                containerBlock.initSvg();
                let connection = containerBlock.getInput('STACK').connection;
                for (let i = 0; i < this.itemCount_; i++) {
                    const itemBlock = workspace.newBlock('string_generic_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return containerBlock;
            },
            compose: function (containerBlock) {
                let itemBlock = containerBlock.getInputTargetBlock('STACK');
                const connections = [];
                while (itemBlock) {
                    connections.push(itemBlock.valueConnection_);
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
                this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
                this.updateShape_();
                for (let i = 0; i < this.itemCount_; i++) {
                    Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
                }
            },
            updateShape_: function () {
                // 移除多餘的輸入
                let i = 0;
                while (this.getInput('ADD' + i)) {
                    this.removeInput('ADD' + i);
                    i++;
                }

                // 添加所需的輸入
                for (let j = 0; j < this.itemCount_; j++) {
                    const input = this.appendValueInput('ADD' + j).setCheck("String");
                    if (j > 0) {
                        input.appendField(this.operator_);
                    }
                }
            },
            setOperator: function (operator) {
                this.operator_ = operator;
                this.updateShape_();
            }
        };

        Blockly.Blocks['string_generic_container'] = {
            init: function () {
                this.setColour("#71b700");
                this.appendDummyInput().appendField("輸入");
                this.appendStatementInput('STACK');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['string_generic_item'] = {
            init: function () {
                this.setColour("#71b700");
                this.appendDummyInput().appendField("項目");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['math_generic'] = {
            init: function () {
                this.setColour("#277ace");
                this.setOutput(true, "Number");
                this.setInputsInline(true);
                this.setMutator(new Blockly.Mutator(['math_generic_item']));
                this.itemCount_ = 2; // 預設至少兩個輸入欄位
                this.operator_ = '+'; // 預設運算符為加法
                this.updateShape_();
            },
            mutationToDom: function () {
                const container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                container.setAttribute('operator', this.operator_);
                return container;
            },
            domToMutation: function (xmlElement) {
                this.itemCount_ = Math.max(2, parseInt(xmlElement.getAttribute('items'), 10)); // 確保最少兩個
                this.operator_ = xmlElement.getAttribute('operator') || '+';
                this.updateShape_();
            },
            decompose: function (workspace) {
                const containerBlock = workspace.newBlock('math_generic_container');
                containerBlock.initSvg();
                let connection = containerBlock.getInput('STACK').connection;
                for (let i = 0; i < this.itemCount_; i++) {
                    const itemBlock = workspace.newBlock('math_generic_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return containerBlock;
            },
            compose: function (containerBlock) {
                let itemBlock = containerBlock.getInputTargetBlock('STACK');
                const connections = [];
                while (itemBlock) {
                    connections.push(itemBlock.valueConnection_);
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
                this.itemCount_ = Math.max(2, connections.length); // 確保最少兩個
                this.updateShape_();
                for (let i = 0; i < this.itemCount_; i++) {
                    Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
                }
            },
            updateShape_: function () {
                // 移除多餘的輸入
                let i = 0;
                while (this.getInput('ADD' + i)) {
                    this.removeInput('ADD' + i);
                    i++;
                }

                // 添加所需的輸入
                for (let j = 0; j < this.itemCount_; j++) {
                    const input = this.appendValueInput('ADD' + j).setCheck("Number");
                    if (j > 0) {
                        input.appendField(this.operator_);
                    }
                }
            },
            setOperator: function (operator) {
                this.operator_ = operator;
                this.updateShape_();
            }
        };

        Blockly.Blocks['math_generic_container'] = {
            init: function () {
                this.setColour("#277ace");
                this.appendDummyInput().appendField("數字輸入");
                this.appendStatementInput('STACK');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks['math_generic_item'] = {
            init: function () {
                this.setColour("#277ace");
                this.appendDummyInput().appendField("項目");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.contextMenu = false;
            }
        };

        function createMathOperatorBlock(type, operatorSymbol) {
            Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['math_generic'], {
                init: function () {
                    Blockly.Blocks['math_generic'].init.call(this);
                    this.setOperator(operatorSymbol);
                }
            });
        }

        function createStringOperatorBlock(type, operatorSymbol) {
            Blockly.Blocks[type] = Object.assign({}, Blockly.Blocks['string_generic'], {
                init: function () {
                    Blockly.Blocks['string_generic'].init.call(this);
                    this.setOperator(operatorSymbol);
                }
            });
        }

        createMathOperatorBlock('math_plus', '+');
        createMathOperatorBlock('math_multiply', '*');
        createMathOperatorBlock('math_percent', '%');
        createMathOperatorBlock('math_devide', '/');
        createMathOperatorBlock('math_subtract', '-');

        createStringOperatorBlock('string_plus', '+');
        createStringOperatorBlock('string_commas', ',');
        createStringOperatorBlock('string_cin', '>>');
        createStringOperatorBlock('string_cout', '<<');

        Blockly.Cpp = Blockly.Cpp || {};

        Blockly.Cpp['math_plus'] = function (block) {
            return math_generateCode(block, ' + ');
        };

        Blockly.Cpp['math_multiply'] = function (block) {
            return math_generateCode(block, ' * ');
        };

        Blockly.Cpp['math_percent'] = function (block) {
            return math_generateCode(block, ' % ');
        };

        Blockly.Cpp['math_devide'] = function (block) {
            return math_generateCode(block, ' / ');
        };

        Blockly.Cpp['math_subtract'] = function (block) {
            return math_generateCode(block, ' - ');
        };

        Blockly.Cpp['string_plus'] = function (block) {
            return string_generateCode(block, ' + ');
        };

        Blockly.Cpp['string_commas'] = function (block) {
            return string_generateCode(block, ' , ');
        };

        Blockly.Cpp['string_cout'] = function (block) {
            return string_generateCode(block, ' << ');
        };

        Blockly.Cpp['string_cin'] = function (block) {
            return string_generateCode(block, ' >> ');
        };

        function math_generateCode(block, operator) {
            let code = '';
            for (let i = 0; i < block.itemCount_; i++) {
                let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
                if (argument.startsWith('(') && argument.endsWith(')')) {
                    argument = argument.slice(1, -1);
                }

                    code += argument;
                if (i < block.itemCount_ - 1) {
                    code += operator;
                }
            }


            return [`(${code})`, Blockly.Cpp.ORDER_ATOMIC];
        }

        function string_generateCode(block, operator) {
            let code = '';
            for (let i = 0; i < block.itemCount_; i++) {
                let argument = Blockly.Cpp.valueToCode(block, 'ADD' + i, Blockly.Cpp.ORDER_ATOMIC) || '';
                if (argument.startsWith('(') && argument.endsWith(')')) {
                    argument = argument.slice(1, -1);
                }

                    code += argument;
                if (i < block.itemCount_ - 1) {
                    code += operator;
                }
            }


            return [`${code}`, Blockly.Cpp.ORDER_ATOMIC];
        }

        // struct
        Blockly.Cpp['def_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var def_var = Blockly.Cpp.statementToCode(block, 'def_var');
            return `struct ${struct_name} {\n${def_var}};`;
        }

        Blockly.Cpp['get_struct'] = function(block) {
            var struct_name = block.getFieldValue('struct_name');
            var var_name = block.getFieldValue('var_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1);
            if (size){
                return `${struct_name} ${var_name}[${size}];`
            }
            return `${struct_name} ${var_name};`;
        };

        // class
        Blockly.Cpp['def_class'] = function(block) {
            var class_name = block.getFieldValue('class_name');
            var public = Blockly.Cpp.statementToCode(block, 'public') || '';
            var private = Blockly.Cpp.statementToCode(block, 'private') || '';

            var code = `class ${class_name} {\n`;
            if (public !== '') {
                code += `  public:\n${public}\n`;
            }
            if (private !== '') {
                code += `  private:\n${private}\n`;
            }
            code += `};`;

            return code;
        };
 
        Blockly.Cpp['get_class'] = function(block) {
            var class_name = block.getFieldValue('class_name');
            var var_name = block.getFieldValue('var_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1);
            if (size){
                return `${class_name} ${var_name}[${size}];`
            }
            return `${class_name} ${var_name};`;
        };

        // data
        Blockly.Cpp['add_line'] = function(block) {
            return `\n`;
        };

        Blockly.Cpp['tab'] = function(block) {
            return [`  `, 1];
        };
        
        Blockly.Cpp['label'] = function(block) {
            var text = block.getFieldValue('TEXT') || '';
            return [`"${text}"`, 1];
        };

        Blockly.Cpp['comment_block'] = function(block) {
            return `// ${block.getFieldValue('COMMENT')}\n`;
        };

        Blockly.Cpp['number'] = function(block) {
            return [block.getFieldValue('NUMBER') || '0', 1];
        };

        // initializaiton
        Blockly.Cpp['boost_ios_sync'] = function(block) {
            return 'ios::sync_with_stdio(0);\n';
        };

        Blockly.Cpp['boost_cin_cout_tie'] = function(block) {
            return 'cin.tie(0); cout.tie(0);\n';
        };

        Blockly.Cpp['main_block'] = function(block) {
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO');
            return `int main() {\n${statements_body}\n  return 0;\n}`;
        };

        // stop
        Blockly.Cpp['break_block'] = function() {
            return 'break;\n';
        };

        Blockly.Cpp['continue_block'] = function() {
            return 'continue;\n';
        };

        Blockly.Cpp['return_block'] = function(block) {
            var returnValue = Blockly.Cpp.valueToCode(block, 'RETURN_VALUE', 1);

            if (returnValue.startsWith('(') && returnValue.endsWith(')')) {
                returnValue = returnValue.slice(1, -1);
            }

            if (returnValue === "") {
                return `return;`
            }
            else {
                return `return ${returnValue};\n`;
            }
        };

        // condition
        Blockly.Cpp['while_block'] = function(block) {
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1) || `((false))`;
            var statements_do = Blockly.Cpp.statementToCode(block, 'DO');

            if (condition.startsWith('(') && condition.endsWith(')')) {
                condition = condition.slice(1, -1);
            }

            var code = 'while ' + condition + ' {\n' + statements_do + '\n}\n';
            return code;
        };

         Blockly.Cpp['for_block'] = function(block) {
            var init = Blockly.Cpp.valueToCode(block, 'INIT', 1);
            var condition = Blockly.Cpp.valueToCode(block, 'CONDITION', 1);
            var var_cal = Blockly.Cpp.valueToCode(block, 'var_cal', 1);
            var statements_body = Blockly.Cpp.statementToCode(block, 'DO')

            if (init.startsWith('(') && init.endsWith(')')) {
                init = init.slice(1, -1);
            }
            if (condition.startsWith('(') && condition.endsWith(')')) {
                condition = condition.slice(1, -1);
            }
            if (var_cal.startsWith('(') && var_cal.endsWith(')')) {
                var_cal = var_cal.slice(1, -1);
            }
            return `for (${init}; ${condition}; ${var_cal}){\n${statements_body}\n}\n`;
        };

        Blockly.Cpp['var_cal'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

            var operator = block.getFieldValue('OPERATOR');
            var operatorSymbol;

            switch (operator) {
                case 'ADD_EQUALS':
                    operatorSymbol = '+=';
                    break;
                case 'SUBTRACT_EQUALS':
                    operatorSymbol = '-=';
                    break;
                case 'MUTIPLY_EQUALS':
                    operatorSymbol = '*=';
                    break;
                case 'DEVIDE_EQUALS':
                    operatorSymbol = '/=';
                    break;
                default:
                    operatorSymbol = '+=';
            }

            if (Value1.startsWith('(') && Value1.endsWith(')')) {
                Value1 = Value1.slice(1, -1);
            }
            if (Value2.startsWith('(') && Value2.endsWith(')')) {
                Value2 = Value2.slice(1, -1);
            }

            code = `(${Value1} ${operatorSymbol} ${Value2})`;

            return [code, 1];
        };
        // define variable
        Blockly.Cpp['def_var'] = function(block) {
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += type + ' ' + var_name;
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += ` = ${value}`;
            }
            code += ';\n';
            return code;
        };
        // input and output
        Blockly.Cpp['cin_block'] = function(block) {
            var value_var = Blockly.Cpp.valueToCode(block, 'VARIABLES', 1);
            if (value_var.startsWith('(') && value_var.endsWith(')')) {
                value_var = value_var.slice(1, -1);
            }

            return `cin >> ${value_var};\n`;
        };

        Blockly.Cpp['cout_block'] = function(block) {
            var argument = Blockly.Cpp.valueToCode(block, 'INPUT', 1) || '';

            if (argument.startsWith('(') && argument.endsWith(')')) {
                argument = argument.slice(1, -1);
            }

            if (argument.endsWith(';\n')) {
                argument = argument.slice(0, -2);
            }

            if (isNaN(argument) && !argument.startsWith('"') && !argument.endsWith('"')) {
                argument = `${argument}`;
            }

            if (block.getFieldValue('ENDL_OPTION') === "endl") {
                return `cout << ${argument} << endl;\n`;
            } else {
                return `cout << ${argument};\n`;
            }
        };

        // operation
        Blockly.Cpp['logic_not'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'A', 1) || 'true';

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return `!${Value};\n`;
        };

        Blockly.Cpp['logic_operators'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

            var operator = block.getFieldValue('OPERATOR');
            var operatorSymbol;

            switch (operator) {
                case 'EQUAL':
                    operatorSymbol = '==';
                    break;
                case 'NOT_EQUAL':
                    operatorSymbol = '!=';
                    break;
                case 'GREATER':
                    operatorSymbol = '>';
                    break;
                case 'LESS':
                    operatorSymbol = '<';
                    break;
                case 'GREATER_EQUAL':
                    operatorSymbol = '>=';
                    break;
                case 'LESS_EQUAL':
                    operatorSymbol = '<=';
                    break;
                default:
                    operatorSymbol = '==';
            }

            if (Value1.startsWith('(') && Value1.endsWith(')')) {
                Value1 = Value1.slice(1, -1);
            }
            if (Value2.startsWith('(') && Value2.endsWith(')')) {
                Value2 = Value2.slice(1, -1);
            }

            code = `(${Value1} ${operatorSymbol} ${Value2})`;
            return [code, 1];
        };

        Blockly.Cpp['or_and_xor'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

            var operator = block.getFieldValue('OPERATOR');
            var operatorSymbol;

            switch (operator) {
                case 'AND':
                    operatorSymbol = '&&';
                    break;
                case 'OR':
                    operatorSymbol = '||';
                    break;
                case 'XOR':
                    operatorSymbol = '^';
                    break;
                case 'NOT':
                    operatorSymbol = '!';
                    break;
                default:
                    operatorSymbol = '&&';
            }

            if (Value1.startsWith('(') && Value1.endsWith(')')) {
                Value1 = Value1.slice(1, -1);
            }
            if (Value2.startsWith('(') && Value2.endsWith(')')) {
                Value2 = Value2.slice(1, -1);
            }

            code = `(${Value1} ${operatorSymbol} ${Value2})`;
            return [code, 1];
        };

        Blockly.Cpp['var_caculacte'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

            var operator = block.getFieldValue('OPERATOR');
            var operatorSymbol;

            switch (operator) {
                case 'ADD_EQUALS':
                    operatorSymbol = '+=';
                    break;
                case 'SUBTRACT_EQUALS':
                    operatorSymbol = '-=';
                    break;
                case 'MUTIPLY_EQUALS':
                    operatorSymbol = '*=';
                    break;
                case 'DEVIDE_EQUALS':
                    operatorSymbol = '/=';
                    break;
                case 'MODULO_EQUALS':
                    operatorSymbol = '%=';
                    break;
                default:
                    operatorSymbol = '+=';
            }

            if (Value1.startsWith('(') && Value1.endsWith(')')) {
                Value1 = Value1.slice(1, -1);
            }
            if (Value2.startsWith('(') && Value2.endsWith(')')) {
                Value2 = Value2.slice(1, -1);
            }

            code = `(${Value1} ${operatorSymbol} ${Value2})`;

            return [code, 1];
        };

        // bool
        Blockly.Cpp['true'] = function() {
            return ['true', 1];
        };

        Blockly.Cpp['false'] = function() {
            return ['false', 1];
        };

        // pointer 
        Blockly.Cpp['nullptr'] = function() {
            return ['nullptr', 1];
        };
        
        Blockly.Cpp['declare_pointer'] = function(block) {
            var Const_ptr = block.getFieldValue('const_ptr');
            var Const_var = block.getFieldValue('const_var');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const_ptr'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += `${type}* `;
            if (Const_var === 'const_var'){
                code += 'const '; 
            }
            
            code += var_name + ' ';

            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
        };
        
        Blockly.Cpp['declare_reference'] = function(block) {
            var Const_ptr = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const_ptr === 'const'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            if (type === 'no'){
                code += `&${var_name} `;
            }
            else {
                code += `${type} &${var_name} `;
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += `= ${value}`;
            }
            code += ';\n';
            return code;
        };
        
        Blockly.Cpp['ptr_equal'] = function(block) {
            var ptr = block.getFieldValue('ptr_name');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${ptr} = ${value};\n`;
        };

        Blockly.Cpp['get_ptr'] = function(block) {
            var ptr = block.getFieldValue('ptr_name');
            return [`${ptr}`, 1];
        };

        Blockly.Cpp['ref_equal'] = function(block) {
            var ref = block.getFieldValue('ref_name');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${ref} = ${value};\n`;
        };

        Blockly.Cpp['get_ref'] = function(block) {
            var ref = block.getFieldValue('ref_name');
            return [`${ref}`, 1];
        };

        // define variable
        Blockly.Cpp['declare_variable'] = function(block) {
            var Const = block.getFieldValue('const');
            var unsigned = block.getFieldValue('unsigned');
            var type = block.getFieldValue('TYPE');
            var var_name = block.getFieldValue('var_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            code = '';
            if (Const === 'const'){
                code += 'const ';
            }
            if (unsigned === 'unsigned'){
                code += 'unsigned ';
            }
            
            code += type + ' ' + var_name;
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value !== ''){
                code += ` = ${value}`;
            }
            code += ';\n';
            return code;
        };

        Blockly.Cpp['var_equal'] = function(block) {
            var variable = block.getFieldValue('VAR_NAME');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1) || '0';
            if (value.startsWith('(') && value.endsWith(')')) {
                value = value.slice(1, -1);
            }
            return `${variable} = ${value};\n`;
        };

        Blockly.Cpp['get_var'] = function(block) {
            var variable = block.getFieldValue('VAR_NAME');
            return [`${variable}`, 1];
        };

        // function
        Blockly.Cpp['function_call'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var value = Blockly.Cpp.valueToCode(block, 'VALUE', 1);
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            if (value){
                return `${funcName}(${value});\n`;
            }
            else{
                return funcName + '\n';
            }
            
        };

        Blockly.Cpp['function_definition'] = function(block) {
            var Type = block.getFieldValue('TYPE');
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = Blockly.Cpp.valueToCode(block, 'expression', 1);
            if (data.startsWith('(') && data.endsWith(')')) {
                    data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            if (expression.startsWith('(') && expression.endsWith(')')) {
                expression = expression.slice(1, -1);
            }

            return `${Type} ${funcName}(${data}) {\n${content}  return ${expression};\n}\n`;
        };
        
        Blockly.Cpp['function_definition_void'] = function(block) {
            var funcName = block.getFieldValue('funcName');
            var data = Blockly.Cpp.valueToCode(block, 'data', 1);
            var content = Blockly.Cpp.statementToCode(block, 'DO') || '';
            var expression = block.getFieldValue('expression');
            if (data.startsWith('(') && data.endsWith(')')) {
                    data = data.slice(1, -1);
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }

            if (expression === 'no'){
                return `void ${funcName}(${data}) {\n${content}\n}\n`;
            }
            else{
                return `void ${funcName}(${data}) {\n${content}  return;\n}\n`;
            }
        };

        // Standard Library
        // math
        Blockly.Cpp['math_random'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'RANGE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`rand() % ${Value};\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_floor'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`floor(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_ceil'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`ceil(${Value});\n`, , Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_tangent'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`tan(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_cosine'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`cos(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_sine'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'ANGLE', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`sin(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_abs'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'A', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`abs(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_sqrt'] = function(block) {
            var Value = Blockly.Cpp.valueToCode(block, 'X', 1);

            if (Value.startsWith('(') && Value.endsWith(')')) {
                Value = Value.slice(1, -1);
            }

            return [`sqrt(${Value});\n`, Blockly.Cpp.ORDER_ATOMIC];
        };

        Blockly.Cpp['math_caculacte'] = function(block) {
            var Value1 = Blockly.Cpp.valueToCode(block, 'A', 1) || '0';
            var Value2 = Blockly.Cpp.valueToCode(block, 'B', 1) || '0';

            var operator = block.getFieldValue('OPERATOR');
            var operatorSymbol;

            switch (operator) {
                case 'ADD':
                    operatorSymbol = '+';
                    break;
                case 'SUBTRACT':
                    operatorSymbol = '-';
                    break;
                case 'MUTIPLY':
                    operatorSymbol = '*';
                    break;
                case 'DEVIDE':
                    operatorSymbol = '/';
                    break;
                case 'DEVIDE_INT':
                    operatorSymbol = '//';
                    break;
                case 'MODULO':
                    operatorSymbol = '%';
                    break;
                case 'POWER':
                    operatorSymbol = '^';
                    break;
                default:
                    operatorSymbol = '+';
            }

            if (Value1.startsWith('(') && Value1.endsWith(')')) {
                Value1 = Value1.slice(1, -1);
            }
            if (Value2.startsWith('(') && Value2.endsWith(')')) {
                Value2 = Value2.slice(1, -1);
            }

            let code;
            if (operator === 'POWER') {
                code = `pow(${Value1}, ${Value2})`;
            } else {
                code = `(${Value1} ${operatorSymbol} ${Value2})`;
            }

            return [code, 1];
        };

        // vector
        Blockly.Cpp['push_back'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var number = Blockly.Cpp.valueToCode(block, 'number', 1) || '';
            if (number.startsWith('(') && number.endsWith(')')) {
                number = number.slice(1, -1);
            }
            return vec_name + ".push_back(" + number + ");\n";
        };

        Blockly.Cpp['pop_back'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".pop_back();\n";
        };

        Blockly.Cpp['emplace_back'] = function(block) {
            var name = block.getFieldValue('NAME');
            var num = block.getFieldValue('number');
            return code = name + ".emplace_back(" + num + ");\n";
        };

        Blockly.Cpp['define_vector'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var vec_name = block.getFieldValue('vec_name');
            var vec_size = Blockly.Cpp.valueToCode(block, 'vec_size', 1) || '';
            var content = Blockly.Cpp.valueToCode(block, 'vec_content', 1) || '';
            var code = `vector<${type}>${vec_name}\n`;
            if (vec_size) {
                if (vec_size.startsWith('(') && vec_size.endsWith(')')) {
                    vec_size = vec_size.slice(1, -1);
                }
                code += '(' + vec_size;
            }
            if (content) {
                if (content.startsWith('(') && content.endsWith(')')) {
                    content = content.slice(1, -1);
                }
                if (vec_size) {
                    code += ' , ' + content;
                } else {
                    code += '(' + content;
                }
            }
            if (vec_size || content) {
                code += ')';
            }
            return code;
        }

        Blockly.Cpp['vec_begin'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.begin()';
            return [code, 1];
        }

        Blockly.Cpp['vec_end'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + 'end()';
            return [code, 1];
        }

        Blockly.Cpp['vec_rbegin'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.rbegin()';
            return [code, 1];
        }

        Blockly.Cpp['vec_rend'] = function(block) {
            var vec_name = block.getFieldValue('vec_name') || '';
            var code = vec_name + '.rend()';
            return [code, 1];
        }

        Blockly.Cpp['vector_insert'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos === '0'){
                pos = '';
            }
            else{
                if (pos.startsWith('(') && pos.endsWith(')')){
                    pos = pos.slice(1, -1);
                }
            }
            if (value.startsWith('(') && value.endsWith(')')){
                    value = value.slice(1, -1);
            }
            
            return `${vec_name}.insert(${vec_name}.begin()+${pos}, ${value})\n`; 
        }

        Blockly.Cpp['vector_erase'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos === '0'){
                pos = '';
            }
            else{
                if (pos.startsWith('(') && pos.endsWith(')')){
                    pos = pos.slice(1, -1);
                }
            }
            if (value.startsWith('(') && value.endsWith(')')){
                    value = value.slice(1, -1);
            }
            
            return `${vec_name}.insert(${vec_name}.begin()+${pos}, ${value})\n`; 
        }

        Blockly.Cpp['vector_clear'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".clear();\n";
        };

        Blockly.Cpp['vector_size'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            return vec_name + ".size();\n";
        }

        Blockly.Cpp['vector_empty'] = function(block) {
            var vec_name = block.getFieldValue('vec_name');
            var code = vec_name + ".empty\n";
            return [code, 1];
        }
        
        // array
        Blockly.Cpp['create_array'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var array_name = block.getFieldValue('array_name');
            var size = Blockly.Cpp.valueToCode(block, 'size', 1) || '';
            var content = Blockly.Cpp.valueToCode(block, 'content', 1) || '';
            if (size.startsWith('(') && size.endsWith(')')) {
                size = size.slice(1, -1);
            }
            if (content === '') {
                return `${type} ${array_name}[${size}];`
            }
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            return `${type} ${array_name}[${size}] = ${content};\n`
        }

        Blockly.Cpp['array_name_block'] = function(block) {
            var array_name = block.getFieldValue('array_name');
            return [`${array_name}`, 1];
        }

        Blockly.Cpp['array_content'] = function(block) {
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);
            if (content.startsWith('(') && content.endsWith(')')) {
                content = content.slice(1, -1);
            }
            return [`{${content}}`, 1];
        }

        Blockly.Cpp['array[i]'] = function(block) {
            var array_name = block.getFieldValue('array_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            if (pos.startsWith('(') && pos.endsWith(')')){
                pos = pos.slice(1, -1);
            }
            var code = `${array_name}[${pos}]`;
            return [code, 1];
        }

        // map
        Blockly.Cpp['create_map'] = function(block) {
            var type1 = block.getFieldValue('TYPE1');
            var type2 = block.getFieldValue('TYPE2');
            var map_name = block.getFieldValue('map_name');
            var map_size = Blockly.Cpp.valueToCode(block, 'map_size', 1);
            var content = Blockly.Cpp.valueToCode(block, 'content', 1);
            var code = `map<${type1}, ${type2}>${map_name}\n`;
            if (map_size){
                if (map_size.startsWith('(') && map_size.endsWith(')')){
                    map_size = map_size.slice(1, -1);
                }
                code += '(' + map_size;
            } 
            if (content){
                if (content.startsWith('(') && content.endsWith(')')){
                    content = content.slice(1, -1);
                }
                if (map_size){
                    code += ' , ' + content;
                }
                else{
                    code += '(' + content;
                }
            }
            if (map_size || content){
                code += ')';
            }
            return code;
        }

        Blockly.Cpp['map_insert'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var first = Blockly.Cpp.valueToCode(block, 'first', 1) || '';
            var second = Blockly.Cpp.valueToCode(block, 'second', 1) || '';
            if (first.startsWith('(') && first.endsWith(')')){
                first = first.slice(1, -1);
            }
            if (second.startsWith('(') && second.endsWith(')')){
                second = second.slice(1, -1);
            }
            return `${map_name}.insert({${first}, ${second}})\n`;
        }

        Blockly.Cpp['map[i]'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var map_key = block.getFieldValue('map_key');
            var map_value = block.getFieldValue('map_value');
            return `${map_name}[${map_key}] = ${map_value}\n`;
        }        

        Blockly.Cpp['map_begin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.begin()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_end'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + 'end()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_rbegin'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.rbegin()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_rend'] = function(block) {
            var map_name = block.getFieldValue('map_name') || '';
            var code = map_name + '.rend()\n';
            return [code, 1];
        }

        Blockly.Cpp['map_clear'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return map_name + ".clear();\n";
        };

        Blockly.Cpp['map_size'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            return map_name + ".size();";
        }

        Blockly.Cpp['map_empty'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var code = map_name + ".empty";
            return [code, 1];
        }

        Blockly.Cpp['map_first'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            if (key.startsWith('(') && key.endsWith(')')){
                key = key.slice(1, -1);
            }
            var code = `${map_name}[${key}].first`;
            return [code, 1];
        }
        
        Blockly.Cpp['map_second'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var key = Blockly.Cpp.valueToCode(block, 'key', 1);
            if (key.startsWith('(') && key.endsWith(')')){
                key = key.slice(1, -1);
            }
            var code = `${map_name}[${key}].second`;
            return [code, 1];
        }

        Blockly.Cpp['map_find'] = function(block) {
            var map_name = block.getFieldValue('map_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `${map_name}.find(${value})`;
            return [code, 1];
        }

        // set
        Blockly.Cpp['create_set'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var set_name = block.getFieldValue('set_name');
            var set_size = Blockly.Cpp.valueToCode(block, 'set_size', 1) || '';
            var content = Blockly.Cpp.valueToCode(block, 'set_content', 1) || '';
            var code = `set<${type}>${set_name}\n`;
            if (set_size){
                if (set_size.startsWith('(') && set_size.endsWith(')')){
                    set_size = set_size.slice(1, -1);
                }
                code += '(' + set_size;
            }
            if (content){
                if (content.startsWith('(') && content.endsWith(')')){
                    content = content.slice(1, -1);
                }
                if (set_size){
                    code += ' , ' + content;
                }
                else{
                    code += '(' + content;
                }
            }
            if (set_size || content){
                code += ')';
            }
            return code;
        }

        Blockly.Cpp['set_insert'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            return `${set_name}.insert(${value})\n`;
        }

        Blockly.Cpp['set_erase'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            return `${set_name}.insert(${value})\n`;
        }

        Blockly.Cpp['set_begin'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var code = set_name + '.begin()';
            return [code, 1];
        }

        Blockly.Cpp['set_end'] = function(block) {
            var set_name = block.getFieldValue('set_name') || '';
            var code = set_name + 'end()';
            return [code, 1];
        }

        Blockly.Cpp['set_empty'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var code = set_name + ".empty\n";
            return [code, 1];
        }

        Blockly.Cpp['set_find'] = function(block) {
            var set_name = block.getFieldValue('set_name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `${set_name}.find(${value})\n`;
            return [code, 1];
        }

        // algorithm
        Blockly.Cpp['sort'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }
            
            if (type === "內建陣列"){
                return `sort(${name}${start}, ${name}+${end})\n`;
            }
            else{
                return `sort(${name}.begin()${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['max'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }

            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `*max_element(${name}+${start}, ${name}+${end})\n`;
            }
            else{
                return `*max_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['min'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `*min_element(${name}+${start}, ${name}+${end})\n`;
            }
            else{
                return `*min_element(${name}.begin()+${start}, ${name}.begin()+${end})\n`;
            }
        }

        Blockly.Cpp['find'] = function(block) {
            var type = block.getFieldValue('TYPE');
            var name = block.getFieldValue('name');
            var value = Blockly.Cpp.valueToCode(block, 'value', 1) || '';
            var start = Blockly.Cpp.valueToCode(block, 'start', 1) || '';
            var end = Blockly.Cpp.valueToCode(block, 'end', 1) || '';
            if (start.startsWith('(') && start.endsWith(')')){
                start = start.slice(1, -1);
            }
            if (end.startsWith('(') && end.endsWith(')')){
                end = end.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            
            if (start === '0'){
                start = '';
            }
            else{
                start = '+' + start;
            }

            if (type === "內建陣列"){
                return `find(${name}${start}, ${name}+${end}, ${value})\n`;
            }
            else{
                return `find(${name}.begin()${start}, ${name}.begin()+${end}, ${value})\n`;
            }
        }

        // time
        Blockly.Cpp['get_current_timestamp'] = function(block) {
            return 'time_t currentTime = time(nullptr);\n';
        };

        Blockly.Cpp['calculate_time_difference'] = function(block) {
            var endTime = Blockly.Cpp.valueToCode(block, 'END_TIME', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var startTime = Blockly.Cpp.valueToCode(block, 'START_TIME', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'double diff = difftime(' + endTime + ', ' + startTime + ');\n';
        };

        Blockly.Cpp['convert_to_local_time'] = function(block) {
            var timestamp = Blockly.Cpp.valueToCode(block, 'TIMESTAMP', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm* localTime = localtime(&' + timestamp + ');\n';
        };

        Blockly.Cpp['convert_to_utc_time'] = function(block) {
            var timestamp = Blockly.Cpp.valueToCode(block, 'TIMESTAMP', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm* utcTime = gmtime(&' + timestamp + ');\n';
        };

        Blockly.Cpp['format_time_string'] = function(block) {
            var timeStruct = Blockly.Cpp.valueToCode(block, 'TIME_STRUCT', Blockly.Cpp.ORDER_ATOMIC) || 'tm';
            var format = block.getFieldValue('FORMAT') || '%Y-%m-%d %H:%M:%S';
            return 'char buffer[80];\nstrftime(buffer, sizeof(buffer), "' + format + '", &' + timeStruct + ');\n';
        };

        Blockly.Cpp['set_time_structure'] = function(block) {
            var year = Blockly.Cpp.valueToCode(block, 'YEAR', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var month = Blockly.Cpp.valueToCode(block, 'MONTH', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var day = Blockly.Cpp.valueToCode(block, 'DAY', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var hour = Blockly.Cpp.valueToCode(block, 'HOUR', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var minute = Blockly.Cpp.valueToCode(block, 'MINUTE', Blockly.Cpp.ORDER_ATOMIC) || '0';
            var second = Blockly.Cpp.valueToCode(block, 'SECOND', Blockly.Cpp.ORDER_ATOMIC) || '0';
            return 'tm timeStruct = {};\n' +
                'timeStruct.tm_year = ' + year + ' - 1900;\n' +
                'timeStruct.tm_mon = ' + month + ' - 1;\n' +
                'timeStruct.tm_mday = ' + day + ';\n' +
                'timeStruct.tm_hour = ' + hour + ';\n' +
                'timeStruct.tm_min = ' + minute + ';\n' +
                'timeStruct.tm_sec = ' + second + ';\n';
        };

        Blockly.Cpp['read_time_structure_member'] = function(block) {
            var timeStruct = Blockly.Cpp.valueToCode(block, 'TIME_STRUCT', Blockly.Cpp.ORDER_ATOMIC) || 'tm';
            var member = block.getFieldValue('MEMBER') || 'tm_year';
            return timeStruct + '.' + member + '\n';
        };

        Blockly.Cpp['get_current_local_time'] = function(block) {
            return 'time_t currentTime = time(nullptr);\ntm* localTime = localtime(&currentTime);\n';
        };

        Blockly.Cpp['get_current_utc_time'] = function(block) {
            return 'time_t currentTime = time(nullptr);\ntm* utcTime = gmtime(&currentTime);\n';
        };

        // iomanip
        // setbase
        Blockly.Cpp['setbase'] = function(block) {
            var code = `setbase(${block.getFieldValue('carry')})`; 
            return [code, 1]
        };

        Blockly.Cpp['setprecision'] = function(block) {
            var code = '';
            if (choice = block.getFieldValue('choice') === 'sig_figs'){
                code += 'fixed << ';
            }
            code += `setprecision(${Blockly.Cpp.valueToCode(block, 'number', 1)})`
            return [code, 1];
        };

        Blockly.Cpp['setw'] = function(block) {
            var code = `setw(${Blockly.Cpp.valueToCode(block, 'number', 1)})`; 
            return [code, 1];
        };

        Blockly.Cpp['setfill'] = function(block) {
            var code = `setfill(${Blockly.Cpp.valueToCode(block, 'number', 1)})`; 
            return [code, 1];
        };
      
        Blockly.Cpp['define_bitset'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            var bitset_size = Blockly.Cpp.valueToCode(block, 'bitset_size', 1);
            var bitset_content = Blockly.Cpp.valueToCode(block, 'bitset_content', 1) || '';
            if (bitset_size.startsWith('(') && bitset_size.endsWith(')')){
                bitset_size = bitset_size.slice(1, -1);
            }
            var code = `bitset<${bitset_size}>${bitset_name}`;
            if (bitset_content !== ''){
                if (bitset_content.startsWith('(') && bitset_content.endsWith(')')){
                    bitset_content = bitset_content.slice(1, -1);
                }
                code += bitset_content;
            }  
            return code +';\n';
        };
        
        Blockly.Cpp['bitset[i]'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            var pos = Blockly.Cpp.valueToCode(block, 'pos', 1);
            var value = Blockly.Cpp.valueToCode(block, 'value', 1);
            if (pos.startsWith('(') && pos.endsWith(')')){
                pos = pos.slice(1, -1);
            }
            if (value.startsWith('(') && value.endsWith(')')){
                value = value.slice(1, -1);
            }
            var code = `${bitset_name}[${pos}] = ${value}`;
            return [code, 1];
        };

        Blockly.Cpp['bitset_set'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.set()`, 1];
        };

        Blockly.Cpp['bitset_reset'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.reset()`, 1];
        };
        
        Blockly.Cpp['bitset_size'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.size()`, 1];
        };

        Blockly.Cpp['bitset_count'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.count()`, 1];
        };
        
        Blockly.Cpp['bitset_all'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.all()`, 1];
        };

        Blockly.Cpp['bitset_any'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.any()`, 1];
        };

        Blockly.Cpp['bitset_none'] = function(block) {
            var bitset_name = block.getFieldValue('bitset_name');
            return [`${bitset_name}.none()`, 1];
        };
