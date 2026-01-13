export const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category", 
            "name": "測試", 
            "contents": [{
            }]
        },
        {
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
                    "type": "struct_type"
                },
                {
                    "kind": "block",
                    "type": "class_type"
                }
            ] 
        },
        { // 陣列
            "kind": "category",
            "name": "陣列",
            "colour": "#ff5757",
            "contents": [{
                "kind": "button", 
                "text": "新增變數",
                "callbackKey": "array_category"
            }]
        },                
        { // 文本
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
        { // 操作
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
        { // 運算
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
        { // 判斷
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
        { // 迴圈
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
        { // 定義
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
        { // 變數/指標/位置
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
        { // 函式/結構/類別
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
            { // 函式/結構/類別
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
                {
                    "kind": "category",
                    "name": "vector",
                    "colour": "#3d7fd6",
                    "contents": [{
                            "kind": "block",
                            "type": "define_vector"
                        },
                        {
                            "kind": "label",
                            "text": "Vector 加入元素"
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
                            "type": "vector_insert"
                        },
                        {
                            "kind": "block",
                            "type": "vector_insert_range"
                        },
                        {
                            "kind": "label",
                            "text": "Vector 刪除元素"
                        },
                        {
                            "kind": "block",
                            "type": "vector_pop_back"
                        },
                        {
                            "kind": "block",
                            "type": "vector_erase"
                        },
                        {
                            "kind": "label",
                            "text": "Vector 集合操作"
                        },
                        {
                            "kind": "block",
                            "type": "vector_swap"
                        },
                        {
                            "kind": "block",
                            "type": "vector_assign"
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
                    "name": "deque",
                    "colour": "#85B09A",
                    "contents": [{
                            "kind": "block",
                            "type": "define_deque"
                        },
                        {
                            "kind": "label",
                            "text": "Deque 新增元素"
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
                            "type": "deque_insert"
                        },
                        {
                            "kind": "block",
                            "type": "deque_insert_range"
                        },
                        {
                            "kind": "label",
                            "text": "Deque 刪除元素"
                        },
                        {
                            "kind": "block",
                            "type": "deque_pop_back"
                        },
                        {
                            "kind": "block",
                            "type": "deque_pop_front"
                        },
                        {
                            "kind": "block",
                            "type": "deque_erase"
                        },
                        {
                            "kind": "label",
                            "text": "Deque 集合操作"
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
                    "name": "set函式庫",
                    "contents":[{
                        "kind": "category",
                        "name": "set",
                        "colour": "#DAA520",
                        "contents": [{
                                "kind": "block",
                                "type": "define_set"
                            },
                            {
                                "kind": "label",
                                "text": "Set 加入元素"
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
                                "type": "set_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "Set 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "set_erase"
                            },
                            {
                                "kind": "label",
                                "text": "Set 集合操作"
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
                                "text": "set::extract / set::node-type"
                            },
                            {
                                "kind": "block",
                                "type": "set_extract_value"
                            },
                            {
                                "kind": "block",
                                "type": "set_extract_is_value"
                            },
                            {
                                "kind": "block",
                                "type": "set_extract_release"
                            },
                            {
                                "kind": "label",
                                "text": "set::equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "set_equal_range_first"
                            },
                            {
                                "kind": "block",
                                "type": "set_equal_range_second"
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
                        "name": "unordered_set",
                        "colour": "#FFD700",
                        "contents": [{
                                "kind": "block",
                                "type": "define_unordered_set"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 加入元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_insert"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_insert_range"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_erase"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 集合操作"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_extract"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_merge"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_swap"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 條件判斷"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_clear"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_size"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_empty"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_max_size"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 尋找元素"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_count"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_find"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_contains"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_equal_range"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set::extract / unordered_set::node-type"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_extract_value"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_extract_is_value"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_extract_release"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set::equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_equal_range_first"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_equal_range_second"
                            },
                            {
                                "kind": "label",
                                "text": "unordered_set 迭代器"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_begin"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_end"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_rbegin"
                            },
                            {
                                "kind": "block",
                                "type": "unordered_set_rend"
                            }
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "multiset",
                        "colour": "#FACA16",
                        "contents": [{
                                "kind": "block",
                                "type": "define_multiset"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 加入元素"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_insert"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_insert_range"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_erase"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 集合操作"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_extract"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_merge"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_swap"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 條件判斷"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_clear"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_size"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_empty"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_max_size"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 尋找元素"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_count"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_find"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_contains"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_lower_bound"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_upper_bound"
                            },
                            {
                                "kind": "label",
                                "text": "multiset::extract / multiset::node-type"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_extract_value"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_extract_is_value"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_extract_release"
                            },
                            {
                                "kind": "label",
                                "text": "multiset::equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_equal_range_first"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_equal_range_second"
                            },
                            {
                                "kind": "label",
                                "text": "multiset 迭代器"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_begin"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_end"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_rbegin"
                            },
                            {
                                "kind": "block",
                                "type": "multiset_rend"
                            }
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "flat_set",
                        "colour": "#F8DE7E",
                        "contents": [{
                                "kind": "block",
                                "type": "define_flat_set"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 加入元素"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_insert"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_insert_range"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_emplace"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 刪除元素"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_erase"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 集合操作"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_extract"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_merge"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_swap"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 條件判斷"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_clear"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_size"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_empty"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_max_size"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 尋找元素"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_count"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_find"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_contains"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_lower_bound"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_upper_bound"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set::extract / flat_set::node-type"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_extract_value"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_extract_is_value"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_extract_release"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set::equal_range"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_equal_range_first"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_equal_range_second"
                            },
                            {
                                "kind": "label",
                                "text": "flat_set 迭代器"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_begin"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_end"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_rbegin"
                            },
                            {
                                "kind": "block",
                                "type": "flat_set_rend"
                            }
                        ]
                    }]
                },
                {    
                    "kind": "category",
                    "name": "map函式庫",
                    "contents":[{
                        "kind": "category",
                        "name": "map",
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
                        "name": "unordered_map",
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
                {
                    "kind": "category",
                    "name": "pair",
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
                {
                    "kind": "category",
                    "name": "stack",
                    "colour": "#c74134",
                    "contents": [{
                            "kind": "block",
                            "type": "define_stack"
                        },
                        {
                            "kind": "label",
                            "text": "Stack 新增元素"
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
                            "type": "stack_emplace"
                        },
                        {
                            "kind": "label",
                            "text": "Stack 刪除元素"
                        },
                        {
                            "kind": "block",
                            "type": "stack_pop"
                        },
                        {
                            "kind": "label",
                            "text": "Stack 集合操作"
                        },
                        {
                            "kind": "block",
                            "type": "stack_swap"
                        },
                        {
                            "kind": "label",
                            "text": "Stack 讀取元素"
                        },
                        {
                            "kind": "block",
                            "type": "stack_top"
                        },
                        {
                            "kind": "label",
                            "text": "Stack 條件判斷"
                        },
                        {
                            "kind": "block",
                            "type": "stack_size"
                        },
                        {
                            "kind": "block",
                            "type": "stack_empty"
                        },
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
                            "kind": "label",
                            "text": "Queue 新增元素"
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
                            "type": "queue_emplace"
                        },
                        {
                            "kind": "label",
                            "text": "Queue 刪除元素"
                        },
                        {
                            "kind": "block",
                            "type": "queue_pop"
                        },
                        {
                            "kind": "label",
                            "text": "Queue 集合操作"
                        },
                        {
                            "kind": "block",
                            "type": "queue_swap"
                        },        
                        {
                            "kind": "label",
                            "text": "Queue 讀取元素"
                        },
                        {
                            "kind": "block",
                            "type": "queue_front"
                        },
                        {
                            "kind": "label",
                            "text": "Queue 條件判斷"
                        },
                        {
                            "kind": "block",
                            "type": "queue_empty"
                        },
                        {
                            "kind": "block",
                            "type": "queue_size"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "priority_queue",
                    "colour": "#F56FA1",
                    "contents": [{
                            "kind": "block",
                            "type": "define_priority_queue"
                        },
                        {
                            "kind": "label",
                            "text": "Priority_queue 新增元素"
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
                            "type": "priority_queue_emplace"
                        },
                        {
                            "kind": "label",
                            "text": "Priority_queue 刪除元素"
                        },
                        {
                            "kind": "block",
                            "type": "priority_queue_pop"
                        },
                        {
                            "kind": "label",
                            "text": "Priority_queue 集合操作"
                        },
                        {
                            "kind": "block",
                            "type": "priority_queue_swap"
                        },
                        {
                            "kind": "label",
                            "text": "Priority_queue 讀取元素"
                        },
                        {
                            "kind": "block",
                            "type": "priority_queue_top"
                        },
                        {
                            "kind": "label",
                            "text": "Priority_queue 判斷條件"
                        },
                        {
                            "kind": "block",
                            "type": "priority_queue_empty"
                        },
                        {
                            "kind": "block",
                            "type": "priority_queue_size"
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
                        {
                            "kind": "label",
                            "text": "Bitset 輔助工具"
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
                {
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
                {
                    "kind": "category",
                    "name": "cstdlib",
                    "colour": "#AFEEEE",
                    "contents": [{
                        "kind": "block",
                        "type": "llabs_block"
                    }]
                },
                {
                    "kind": "category",
                    "name": "ctime",
                    "colour": "#8e44ad",
                    "contents": [{
                            "kind": "label",
                            "text": "Ctime 取得時間"
                        },
                        {
                            "kind": "block",
                            "type": "get_current_timestamp"
                        },
                        {
                            "kind": "block",
                            "type": "get_current_local_time"
                        },
                        {
                            "kind": "block",
                            "type": "get_current_utc_time"
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
                        }
                    ]
                },
                {
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
                {
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
                {
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