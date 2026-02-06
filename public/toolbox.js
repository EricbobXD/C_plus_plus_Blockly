export const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        { //data type
            "kind": "category",
            "name": "資料型態",
            "colour": "#EB5160",
            "contents": [
                {
                    "kind": "block",
                    "type": "data_type"
                },
                {
                    "kind": "block", 
                    "type": "void"
                },
                {
                    "kind": "block",
                    "type": "struct_type"
                },
                {
                    "kind": "block",
                    "type": "class_type"
                }
            ] 
        },
        { // array
            "kind": "category",
            "name": "陣列",
            "colour": "#ff5757",
            "contents": [{
                "kind": "button", 
                "text": "新增變數",
                "callbackKey": "array_category"
            }]
        },                
        { // text
            "kind": "category",
            "name": "文本",
            "colour": "#FF8C00",
            "contents": [
                { // 文本
                    "kind": "label",
                    "text": "文本"
                },
                {
                    "kind": "block",
                    "type": "string"
                },
                {
                    "kind": "block",
                    "type": "char"
                },
                {
                    "kind": "block",
                    "type": "comment_block"
                },
                {
                    "kind": "block",
                    "type": "add_line"
                },
                {
                    "kind": "label",
                    "text": "字串擴充模組"
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
        { // operation
            "kind": "category",
            "name": "操作",
            "colour": "#2EC832",
            "contents": [
                { // 輸入
                    "kind": "label",
                    "text": "輸入"
                },
                {
                    "kind": "block",
                    "type": "cin_block"
                },
                {
                    "kind": "block",
                    "type": "string_cin"
                },
                { // 輸出
                    "kind": "label",
                    "text": "輸出"
                },
                {
                    "kind": "block",
                    "type": "cout_block"
                },
                {
                    "kind": "block",
                    "type": "string_cout"
                }
            ]
        },
        { // calculation
            "kind": "category",
            "name": "運算",
            "colour": "#1F91B5",
            "contents": [
                {
                    "kind": "label",
                    "text": "條件判斷"
                },
                {
                    "kind": "block",
                    "type": "logic_operators"
                },
                {
                    "kind": "block",
                    "type": "or_and_xor"
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
                    "text": "數學基本操作"
                },
                {
                    "kind": "block",
                    "type": "number"
                },
                {
                    "kind": "block",
                    "type": "abs_block"
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
                },
                {
                    "kind": "label",
                    "text": "布林運算"
                },
                {
                    "kind": "block",
                    "type": "bitwise_and"
                },
                {
                    "kind": "block",
                    "type": "bitwise_or"
                },
                {
                    "kind": "block",
                    "type": "bitwise_xor"
                },
                {
                    "kind": "block",
                    "type": "bitwise_left"
                },
                {
                    "kind": "block",
                    "type": "bitwise_right"
                },
                {
                    "kind": "block",
                    "type": "bitwise_not"
                }
            ]
        },
        { // condition
            "kind": "category",
            "name": "判斷",
            "colour": "#00ABEA",
            "contents": [
                {
                    "kind": "label",
                    "text": "判斷"
                },
                {
                    "kind": "block",
                    "type": "if_block"
                },
                {
                    "kind": "block",
                    "type": "switch_block"
                },
                {
                    "kind": "block",
                    "type": "if_else"
                }
            ]
        },
        { // loop
            "kind": "category",
            "name": "迴圈",
            "colour": "#2473c2",
            "contents": [
                { // 迴圈(while/for)
                    "kind": "label",
                    "text": "迴圈(while/for)"
                },
                {
                    "kind": "block",
                    "type": "while_block"
                },
                {
                    "kind": "block",
                    "type": "for_block"
                },
                {
                    "kind": "block",
                    "type": "for_range_block"
                },
                {
                    "kind": "label",
                    "text": "終止工具"
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
        { // define
            "kind": "category",
            "name": "定義",
            "colour": "#123456",
            "contents": [
                { // 定義
                    "kind": "label",
                    "text": "定義"
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
        { // variable/pointer/reference
            "kind": "category",
            "name": "變數/指標/位置",
            "colour": "#C9A200",
            "contents": [
                {
                    "kind": "button", 
                    "text": "新增變數",
                    "callbackKey": "var_category"
                }
            ]
        },
        { // function/struct/class
            "kind": "category",
            "name": "函式/結構/類別",
            "colour": "#db00db",
            "contents": [
                {
                    "kind": "button", 
                    "text": "新增函數、結構、類別",
                    "callbackKey": "func_category"
                }
            ]
        },
        { // good thing
            "kind": "category",
            "name": "好用的東西",
            "colour": "#4A9BFF",
            "contents": [
                {
                    "kind": "block",
                    "type": "define_template"
                },
                {
                    "kind": "block",
                    "type": "define_typename"
                },
                {
                    "kind": "block",
                    "type": "define_using"
                },
                {
                    "kind": "block",
                    "type": "define_namespace"
                }
            ]
        }, 
        { // sep
            "kind": "sep"
        },
        { // STL
            "kind": "category",
            "name": "STL模組",
            "contents": [
                { //vector
                    "kind": "category",
                    "name": "Vector",
                    "colour": "#3d7fd6",
                    "contents": [{
                        "kind": "button", 
                        "text": "新增 Vector",
                        "callbackKey": "vec_category"
                    }]
                },
                { //deque
                    "kind": "category",
                    "name": "Deque",
                    "colour": "#85B09A",
                    "contents": [{
                        "kind": "button", 
                        "text": "新增 Deque",
                        "callbackKey": "deq_category"
                    }]
                },
                { //set
                    "kind": "category",
                    "name": "Set",
                    "contents":[{
                        "kind": "button", 
                        "text": "新增 Set",
                        "callbackKey": "set_category"
                    }]
                },
                { //map
                    "kind": "category",
                    "name": "Map函式庫",
                    "contents":[{
                        "kind": "category",
                        "name": "Map",
                        "colour": "#1abc9c",
                        "contents": [{
                                "kind": "block",
                                "type": "define_map"
                            },
                            {
                                "kind": "label",
                                "text": "Map 新增元素"
                            },
                            {
                                "kind": "block",
                                "type": "map_insert"
                            },
                            {
                                "kind": "block",
                                "type": "map_insert_range"
                            },
                            {
                                "kind": "block",
                                "type": "map_insert_or_assign"
                            },
                            {
                                "kind": "block",
                                "type": "map_emplace"
                            },
                            {
                                "kind": "block",
                                "type": "map_try_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "Map 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "map_erase"
                            },
                            {
                                "kind": "label",
                                "text": "Map 集合元素"
                            },
                            {
                                "kind": "block",
                                "type": "map_extract"
                            },
                            {
                                "kind": "block",
                                "type": "map_merge"
                            },
                            {
                                "kind": "block",
                                "type": "map_swap"
                            },
                            {
                                "kind": "label",
                                "text": "Map 條件判斷"
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
                                "type": "map_max_size"
                            },
                            {
                                "kind": "label",
                                "text": "Map 尋找元素"
                            },
                            {
                                "kind": "block",
                                "type": "map_count"
                            },
                            {
                                "kind": "block",
                                "type": "map_find"
                            },
                            {
                                "kind": "block",
                                "type": "map_contains"
                            },
                            {
                                "kind": "block",
                                "type": "map_equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "map_lower_bound"
                            },
                            {
                                "kind": "block",
                                "type": "map_upper_bound"
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
                            },
                            {
                                "kind": "label",
                                "text": "map 輔助工具"
                            },
                            {
                                "kind": "block",
                                "type": "make_map"
                            },
                            {
                                "kind": "block",
                                "type": "string_commas"
                            }
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "Unordered_map",
                        "colour": "#1282A2",
                        "contents": [{
                                "kind": "block",
                                "type": "define_unordered_map"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 新增元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_insert"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_insert_range"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_insert_or_assign"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_emplace"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_try_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_erase"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 集合元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_extract"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_merge"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_swap"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 條件判斷"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_clear"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_size"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_empty"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_max_size"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 尋找元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_count"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_find"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_contains"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_lower_bound"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_upper_bound"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 迭代器"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_begin"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_end"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_rbegin"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_map_rend"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_map 輔助工具"
                            },
                            {
                                "kind": "block",
                                "type": "make_map"
                            },
                            {
                                "kind": "block",
                                "type": "string_commas"
                            }
                        ]
                    }]
                },
                { //pair
                    "kind": "category",
                    "name": "Pair",
                    "colour": "#338f35",
                    "contents": [{
                            "kind": "block",
                            "type": "define_pair"
                        },
                        {
                            "kind": "label",
                            "text": "Pair 讀取元素"
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
                            "kind": "label",
                            "text": "Pair 創一個pair"
                        },
                        {
                            "kind": "block",
                            "type": "make_pair"
                        }
                    ]
                },
                { //stack
                    "kind": "category",
                    "name": "Stack",
                    "colour": "#c74134",
                    "contents": [{
                        "kind": "button", 
                        "text": "新增 Stack",
                        "callbackKey": "st_category"
                    }]
                },
                { //queue
                    "kind": "category",
                    "name": "Queue",
                    "colour": "#fd79a8",
                    "contents": [{
                        "kind": "button", 
                        "text": "新增 Queue",
                        "callbackKey": "qu_category"
                    }]
                },
                { //priority_queue
                    "kind": "category",
                    "name": "Priority_queue",
                    "colour": "#F56FA1",
                    "contents": [{
                        "kind": "button", 
                        "text": "新增 Priority_queue",
                        "callbackKey": "pq_category"
                    }]
                },
                { //bitset
                    "kind": "category",
                    "name": "bitset",
                    "colour": "#d35400",
                    "contents": [{
                            "kind": "block",
                            "type": "define_bitset"
                        },
                        {
                            "kind": "label",
                            "text": "Bitset 讀取元素"
                        },
                        {
                            "kind": "block",
                            "type": "bitset[i]"
                        },
                        {
                            "kind": "label",
                            "text": "Bitset 條件判斷"
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
                    ]
                },
                { //algorithm
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
                        }, 
                        {
                            "kind": "block",
                            "type": "binary_search"
                        },
                        {
                            "kind": "block",
                            "type": "lower_bound"
                        }, 
                        {
                            "kind": "block",
                            "type": "upper_bound"
                        }, 
                        {
                            "kind": "block", 
                            "type": "reverse"
                        }
                    ]
                },
                { //iomanip
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
                { //climits
                    "kind": "category",
                    "name": "climits",
                    "colour": "#000000",
                    "contents": [{
                            "kind": "label",
                            "text": "字元類型"
                        },
                        {
                            "kind": "block",
                            "type": "char_bit"
                        },
                        {
                            "kind": "block",
                            "type": "schar_min"
                        },
                        {
                            "kind": "block",
                            "type": "schar_max"
                        },
                        {
                            "kind": "block",
                            "type": "uchar_max"
                        },
                        {
                            "kind": "block",
                            "type": "char_min"
                        },
                        {
                            "kind": "block",
                            "type": "char_max"
                        },
                        {
                            "kind": "label",
                            "text": "整數類型"
                        },
                        {
                            "kind": "block",
                            "type": "int_min"
                        },
                        {
                            "kind": "block",
                            "type": "int_max"
                        },
                        {
                            "kind": "block",
                            "type": "uint_max"
                        },
                        {
                            "kind": "label",
                            "text": "長整數類型"
                        },
                        {
                            "kind": "block",
                            "type": "llong_min"
                        },
                        {
                            "kind": "block",
                            "type": "llong_max"
                        },
                        {
                            "kind": "block",
                            "type": "ullong_max"
                        }
                    ]
                },
                { //math
                    "kind": "category",
                    "name": "math",
                    "colour": "#2980b9",
                    "contents": [{
                            "kind": "label",
                            "text": "Math 基本計算"
                        },
                        {
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
                            "kind": "label",
                            "text": "Math 三角函數"
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
                { //cstdlib
                    "kind": "category",
                    "name": "cstdlib",
                    "colour": "#AFEEEE",
                    "contents": [{
                        "kind": "block",
                        "type": "llabs_block"
                    }]
                },
                { //basic_ios
                    "kind": "category",
                    "name": "basic_ios",
                    "colour": 160,
                    "contents": [{
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
                            "text": "條件"
                        },
                        {
                            "kind": "block",
                            "type": "cin.eof"
                        }]
                },
                { //sstream
                    "kind": "category",
                    "name": "sstream",
                    "colour": "a13458",
                    "contents": [{
                        "kind": "label",
                        "text": "stringstream"
                    },
                    {
                        "kind": "block",
                        "type": "define_sstream"
                    },
                    {
                        "kind": "block",
                        "type": "sstream_>>"
                    },
                    {
                        "kind": "block",
                        "type": "sstream_<<"
                    }]
                },
                { //functional
                    "kind": "category",
                    "name": "functional",
                    "colour": "#3EABF4",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "less"
                        },
                        {
                            "kind": "block",
                            "type": "greater"
                        },
                        {
                            "kind": "block",
                            "type": "equal_to"
                        },
                        {
                            "kind": "block",
                            "type": "not_equal_to"
                        },
                        {
                            "kind": "block",
                            "type": "greater_equal"
                        },
                        {
                            "kind": "block",
                            "type": "less_equal"
                        },
                        {
                            "kind": "block",
                            "type": "bind"
                        },
                        {
                            "kind": "block",
                            "type": "placeholder"
                        }
                    ]
                }
            ]
        },
        { // sep
            "kind": "sep"
        },
        {
            "kind": "category",
            "name": "搜尋",
            "colour": "#A1A1A1",
            "contents": []
        }
    ]
};