export function Create_Array(toolbox, workspace) {
  const category = toolbox.contents.find(cat => cat.name === '陣列');
  const blockSet = ['define_array', 'array_name_block', 'array_content', 'array_operate[]'];
  if (category) {
      blockSet.forEach(blockType => category.contents.push({kind: "block", type: blockType}))
  }
  
  const newToolbox = JSON.parse(JSON.stringify(toolbox));
  workspace.updateToolbox(newToolbox);
}

const data_type = {"VAR": "變數", "PTR": "指標", "REF": "參考"};
export function Create_Variable(Block_type, toolbox, workspace, check=false){
    let blockSet = new Set([
        `define_${Block_type}`,
        `${Block_type}_equal`,
        `get_${Block_type}`,
        `def_${Block_type}`
    ]);

    if (Block_type === "PTR" || Block_type === "REF"){
        blockSet.add(`${Block_type}_of`)
        blockSet.add(`${Block_type}_to`);
        if (Block_type === "PTR"){
            blockSet.add(`nullptr`);
        }
    }

    const category = toolbox.contents.find(cat => cat.name === '變數/指標/位置');

    if (category) {
        category.contents.push({kind: "label", text: data_type[Block_type]})
        blockSet.forEach(blockType => category.contents.push({kind: "block", type: blockType}))
    }
    
    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
};

export function Create_Function(Block_type, toolbox, workspace, check=false) {
    const category = toolbox.contents.find(cat => cat.name === '函式/結構/類別');
    if (Block_type === "Function") {
        const blockSet = ["define_function_void", "define_function", "function_call"];
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

export function Create_getName(Block_type, toolbox, workspace, check=false){
    const category = toolbox.contents.find(cat => cat.name === '函式/結構/類別');
    if (category) {
        var block_index = category.contents.findIndex(button => ( button.id === `${Block_type}_id`));
        if (block_index !== -1)
            category.contents.splice(block_index+1, 0, {"kind": "block", "type": `get_${Block_type}`});
            
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
}

export function Create_Random_Access_Containers(Block_type, toolbox, workspace, check=false){
    const category = toolbox.contents.find(cat => cat.name === "STL模組")?.contents?.find(sub => sub.name === Block_type);

    /*
    if (check) {
        const update_cat = category.contents;
        category.contents = [];
        const newToolbox = JSON.parse(JSON.stringify(toolbox));
        workspace.updateToolbox(newToolbox);

        category.contents = update_cat;
        const newToolbox2 = JSON.parse(JSON.stringify(toolbox));
        workspace.updateToolbox(newToolbox2);
    }
    */
    let blockSet = new Set([   
            `define_${Block_type}`, 
            `${Block_type}_push_back`, `${Block_type}_emplace_back`, `${Block_type}_append_range`, `${Block_type}_insert`, `${Block_type}_insert_range`, 
            `${Block_type}_pop_back`, `${Block_type}_erase`, 
            `${Block_type}_swap`, `${Block_type}_assign`, 
            `${Block_type}_operate[]`, `${Block_type}_front`, `${Block_type}_back`,
            `${Block_type}_clear`, `${Block_type}_size`, `${Block_type}_empty`,
            `${Block_type}_begin`, `${Block_type}_end`, `${Block_type}_rbegin`, `${Block_type}_rend`, `${Block_type}_cbegin`, `${Block_type}_end`
        ]);
    if(category){
        if (Block_type === 'Deque') 
            blockSet.add(`${Block_type}_push_front`, `${Block_type}_emplace_front`, `${Block_type}_prepend_range`, `${Block_type}_pop_front`);
        blockSet.forEach(blockType => category.contents.push({kind: "block", type: blockType}))
    }

    const newToolbox = JSON.parse(JSON.stringify(toolbox));
    workspace.updateToolbox(newToolbox);
}