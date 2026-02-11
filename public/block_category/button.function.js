export function Create_Array(toolbox, workspace) {
    const category = toolbox.contents.find(cat => cat.name === "陣列");
    const blockSet = ["define_array", "array_name", "array_content", "array_operate[]"];
    if (category) {
        blockSet.forEach(block => category.contents.push({kind: "block", type: block}))
    }
    
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

const data_type = {"VAR": "變數", "PTR": "指標", "REF": "參考"};
export function Create_Variable(Block_type, toolbox, workspace){
    let blockSet = [
        `define_${Block_type}`,
        `${Block_type}_equal`,
        `get_${Block_type}`
    ];

    if (Block_type === "VAR") blockSet.push("define_VAR_");

    if (Block_type === "PTR" || Block_type === "REF"){
        blockSet.push(`${Block_type}_of`)
        blockSet.push(`${Block_type}_to`);
        if (Block_type === "PTR"){
            blockSet.push(`nullptr`);
        }
    }

    const category = toolbox.contents.find(cat => cat.name === "變數/指標/位置");

    if (category) {
        category.contents.push({kind: "label", text: data_type[Block_type]})
        blockSet.forEach(block => category.contents.push({kind: "block", type: block}))
    }
    
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Function(Block_type, toolbox, workspace) {
    const category = toolbox.contents.find(cat => cat.name === "函式/結構/類別");
    if (Block_type === "Function") {
        const blockSet = ["define_function", "function_call"];
        if (category) {
            category.contents.push({kind: "label", text: "函式"});
            blockSet.forEach(t => category.contents.push({kind: "block", type: t}));
        }
    } else if (Block_type === "Lambda") {
        if (category) {
            category.contents.push({"kind": "label", "text": "Lambda"});
            category.contents.push({"kind": "block", "type": "lambda"});
        }
    } else if (Block_type === "Struct"){
        if (category){
            category.contents.push({"kind": "label", "text": "Struct"});
            category.contents.push({"kind": "block", "type": "define_struct"})
            category.contents.push({"kind": "button", "id": "Struct_id", "text": `創建${Block_type}變數`, "callbackKey": "get_category"});
        }
    } else if (Block_type === "Class") {
        if (category){
            category.contents.push({"kind": "label", "text": "Class"});
            category.contents.push({"kind": "block", "type": "define_class"})
            category.contents.push({"kind": "button", "id": "Class_id", "text": `創建${Block_type}變數`, "callbackKey": "get_category"});
        }
    } else {
        if (category){
            category.contents.push({"kind": "label", "text": "Operation"});
            category.contents.push({"kind": "block", "type": "define_operator"});
        }
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_getName(Block_type, toolbox, workspace){
    const category = toolbox.contents.find(cat => cat.name === "函式/結構/類別");
    if (category) {
        var block_index = category.contents.findIndex(button => ( button.id === `${Block_type}_id`));
        if (block_index !== -1)
            category.contents.splice(block_index+1, 0, {"kind": "block", "type": `get_${Block_type}`});
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Random_Access_Containers(Block_type, toolbox, workspace){
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === Block_type);

    let blockSet = [`define_${Block_type}`, 
        `${Block_type} 加入元素_txt`, `${Block_type}_add_back`, `${Block_type}_insert`, `${Block_type}_insert_range`, 
        `${Block_type} 刪除元素_txt`, `${Block_type}_pop_back`, `${Block_type}_erase`,
        `${Block_type} 集合操作_txt`, `${Block_type}_swap`, `${Block_type}_assign`, `${Block_type}_assign_range`, 
        `${Block_type} 容器大小_txt`, `${Block_type}_resize`, `${Block_type}_capacity`, `${Block_type}_reserve`, 
        `${Block_type} 讀取元素_txt`, `${Block_type}_operate[]`, `${Block_type}_front`, `${Block_type}_back`, 
        `${Block_type} 條件判斷_txt`, `${Block_type}_clear`, `${Block_type}_size`, `${Block_type}_empty`, `${Block_type}_max_size`, 
        `${Block_type} 迭代器_txt`, `${Block_type}_iter`
        ];
    if(category){
        if (Block_type === "Deque") {
            blockSet.splice(9, 0, `${Block_type}_push_front`, `${Block_type}_emplace_front`, `${Block_type}_prepend_range`); 
            blockSet.splice(15, 0, `${Block_type}_pop_front`);
        }
        blockSet.forEach(block =>{
            if (block.includes("_txt")) category.contents.push({kind: "label", text: block.replace("_txt", "")});
            else category.contents.push({kind: "block", type: block});
        });
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Container_Adapters(Block_type, toolbox, workspace){
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === Block_type);
    
    let blockSet = [`define_${Block_type}`, 
        `${Block_type} 新增元素_txt`, `${Block_type}_push`, `${Block_type}_emplace`, `${Block_type}_push_range`, 
        `${Block_type} 刪除元素_txt`, `${Block_type}_pop`, 
        `${Block_type} 集合操作_txt`, `${Block_type}_swap`, 
        `${Block_type} 讀取元素_txt`, 
        `${Block_type} 條件判斷_txt`, `${Block_type}_size`, `${Block_type}_empty`
    ];

    if(category){
        if (Block_type === "Queue") blockSet.splice(11, 0, "Queue_front"); 
        else blockSet.splice(11, 0, `${Block_type}_top`);

        blockSet.forEach(block =>{
            if (block.includes("_txt")) category.contents.push({kind: "label", text: block.replace("_txt", "")});
            else category.contents.push({kind: "block", type: block});
        });
    }
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

const color = {
    "Set": "#DAA520", 
    "Unordered_set": "#FFD700", 
    "Multiset": "#FACA16", 
    "Flat_set": "#F8DE7E"
};

export function Create_Associative_Container(Block_type, toolbox, workspace){
    const type = (Block_type.includes("ap"))?"Map": "Set"
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === `${type}函式庫`);
    
    
    let blockSet = [`define_${Block_type}`, 
        `${Block_type} 新增元素_txt`, `${Block_type}_insert`, 
        `${Block_type} 刪除元素_txt`, `${Block_type}_erase`, 
        `${Block_type} 集合操作_txt`, `${Block_type}_extract`, `${Block_type}_merge`, `${Block_type}_swap`, 
        `${Block_type} 條件判斷_txt`, `${Block_type}_clear`, `${Block_type}_size`, `${Block_type}_empty`, `${Block_type}_max_size`, 
        `${Block_type} 尋找元素_txt` , `${Block_type}_find`, `${Block_type}_find_index`, 
        `${Block_type} 迭代器_txt`, `${Block_type}_iter`
    ];
    if (type === "Map"){
        blockSet.push(`${Block_type} 輔助工具_txt`, `make_${Block_type}`, "string_commas")
    }
    if(category){
        category.contents.push({
            "kind": "category", 
            "name": `${Block_type}`, 
            "colour": color[Block_type],
            "contents": []
        });
        const block_category = category.contents.find(cat => cat.name === `${Block_type}`);
        if (block_category){
            blockSet.forEach(block =>{
                if (block.includes("_txt")) block_category.contents.push({kind: "label", text: block.replace("_txt", "")});
                else block_category.contents.push({kind: "block", type: block});
            });
        }
    }
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Pair(toolbox, workspace){
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === "Pair");

    const blockSet = ["define_Pair", 
        "Pair 讀取元素_txt", "Pair_first", "Pair_second", 
        "創一個 Pair_txt", "make_Pair"   
    ];

    if(category){
        blockSet.forEach(block =>{
            if (block.includes("_txt")) category.contents.push({kind: "label", text: block.replace("_txt", "")});
            else category.contents.push({kind: "block", type: block});
        });
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Bitset(toolbox, workspace){
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === "Bitset");

    const blockSet = ["define_Bitset", 
        "Bitset 讀取元素_txt", "Bitset_operate[]", 
        "Bitset 條件判斷_txt", "Bitset_size", "Bitset_set", "Bitset_count", "Bitset_true"
    ];

    if(category){
        blockSet.forEach(block =>{
            if (block.includes("_txt")) category.contents.push({kind: "label", text: block.replace("_txt", "")});
            else category.contents.push({kind: "block", type: block});
        });
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};