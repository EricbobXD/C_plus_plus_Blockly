from pymongo import MongoClient

url = "mongodb://mongo:jjjTvYJcsMeAsyoGycpBKTRjYgBTrDBF@yamabiko.proxy.rlwy.net:34669"
client = MongoClient(url)
db_toolbox = client['db_toolbox']
toolbox = db_toolbox['toolbox']

print(client)
blocks = {
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
                        "colour": "#dde3b0",
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
                        "name": "set",
                        "colour": "#e67e22",
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
                                "type": "map_emplace"
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
                                "text": "Set 條件判斷"
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
                                "text": "Set 尋找元素"
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
                        "colour": "#f1c40f",
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
                                "type": "priority_queue_front"
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
                        "colour": "#e67e22",
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
                    }
                ]
            },
            {
                "kind": "sep"
            },
            { # function
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
            { # variable
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
                    },
                    {
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
            { # array
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
            { # struct & class
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
            { # text and more
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
            { # input/output
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
            { # math and caculate
                "kind": "category",
                "name": "數學與運算",
                "colour": "#1F91B5",
                "contents": [{
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
                        "type": "var_calculate"
                    },
                    {
                        "kind": "block",
                        "type": "math_calculate"
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
            { # condition and loop
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
            { # loop
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
            { # define
                "kind": "category",
                "name": "定義",
                "colour": "#123456",
                "contents": [
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
}
for d in toolbox.find():
    if blocks not in d:
        toolbox.insert_one(blocks)
