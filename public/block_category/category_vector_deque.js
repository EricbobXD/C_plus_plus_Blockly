function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Blockly.Cpp[type].map(v => [v, v])
    );
}

function Create_Vec_Deq(name, Block_type, toolbox, workspace){
    
};