const Cpp = Blockly.Cpp;

function VarDropdown(type) {
    return new Blockly.FieldDropdown(
        Cpp[type].map(v => [v, v])
    );
}

const data_type = {"VAR": "變數", "PTR": "指標", "REF": "參考"};
["VAR", "PTR", "REF"].forEach(Block_type =>{
    Blockly.Blocks[`define_${Block_type}`] = {
        init: function() {
            this.jsonInit({
                "type": `define_${Block_type}`, 
                "message0": "宣告%1%2%3", 
                "args0": [
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
                        "type": "input_value", 
                        "name": "type"
                    }
                ], 
                "inputsInline": true, 
                "previousStatement": null, 
                "nextStatement": null,
                "colour": "#DABD00",
                "extensions": ["dynamic_dropdown", "change_block_type"],
                "tooltip": `定義一個${data_type[Block_type]}`,
                "helpurl": ""
            });

            this.text = `${data_type[Block_type]}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");

            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["不賦予值", "no"],
                    ["賦予值", "val"]
                ]), "mode")

            this.setOnChange(function(e) {
                if (this.workspace && !this.isInFlyout && e.blockId === this.id) this.UpdateShape_();
            });
        }, 
        saveExtraState: function(){
            return {"mode": this.getFieldValue("mode")};
        }, 
        loadExtraState: function(state){
            this.UpdateShape_(state.mode);
        }, 
        UpdateShape_: function(mode){
            if (!mode) mode = this.getFieldValue("mode");

            if (this.getInput("value")) this.removeInput("value");
            if (mode === "val")
                this.appendValueInput("value").appendField("=");      
        }
    };

    Cpp.forBlock[`define_${Block_type}`] = function(block) {
        const Const = block.getFieldValue("const");
        const unsigned = block.getFieldValue("unsigned");
        const type = Cpp.valueToCode(block, "type", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
        const Name = block.getFieldValue("Name");
        const mode = block.getFieldValue("mode")
        var code = `${Const === "const"?"const ": ""}${unsigned === "unsigned "?"unsigned": ""}${type}`;

        if (Block_type === "PTR") code += "*" ;
        else if (Block_type === "REF") code += "&";

        code += ` ${Name}`;
        if (mode === "val"){
            if(!this.getInput("value")) return '';
            const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "";
            code += ` = ${value}`;
        }
        
        if (block.outputConnection) return [code, Cpp.ORDER_ATOMIC];
        else return `${code};\n`;
    };

    Blockly.Blocks[`${Block_type}_equal`] = {
        init: function() {
            this.text = `${data_type[Block_type]}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            
            this.jsonInit({
                "type": `${Block_type}_equal`,
                "message0": " = %1", 
                "args0": [{
                    "type": "input_value", 
                    "name": "value"
                }], 
                "inputsInline": true, 
                "previousStatement": null, 
                "nextStatement": null,
                "colour": "#DABD00",
                "extensions": ["dynamic_dropdown"],
                "tooltip": `賦予值給 ${data_type[Block_type]}`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_equal`] = function(block) {
        const Name = block.getFieldValue("Name");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";
        return `${Name} = ${value};\n`;
    };

    Blockly.Blocks[`get_${Block_type}`] = {
        init: function() {
            this.text = `${data_type[Block_type]}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `get_${Block_type}`, 
                "inputsInline": true, 
                "output": null,
                "colour": "#DABD00",
                "extensions": ["dynamic_dropdown"],
                "tooltip": `${data_type[Block_type]}`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`get_${Block_type}`] = function(block){
        return [block.getFieldValue("Name"), Cpp.ORDER_ATOMIC];
    };
});

["PTR", "REF"].forEach(Block_type =>{
    Blockly.Blocks[`${Block_type}_of`] = {
        init: function() {
            this.text = `${data_type[Block_type]}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_of`, 
                "message0": " -> %1", 
                "args0": [{
                    "type": "input_value", 
                    "name": "value"
                }], 
                "inputsInline": true, 
                "output": null, 
                "colour": "#DABD00",
                "extensions": ["dynamic_dropdown"],
                "tooltip": `指向${data_type[Block_type]}下的參數`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_of`] = function(block) {
        const Name = block.getFieldValue("Name");
        const value = Cpp.valueToCode(block, "value", Cpp.ORDER_ATOMIC).replace(/^\(?|\)?$/g, "") || "0";
        return [`${Name} -> ${value}`, Cpp.ORDER_ATOMIC];
    };

    Blockly.Blocks[`${Block_type}_to`] = {
        init: function() {
           this.text = `${data_type[Block_type]}名稱: `;
            this.Block_type = Block_type;
            this.appendDummyInput("Name_Input")
                .appendField(`${data_type[Block_type]}名稱: `)
                .appendField(VarDropdown(Block_type), "Name");
            this.jsonInit({
                "type": `${Block_type}_to`, 
                "inputsInline": true, 
                "output": null, 
                "colour": "#DABD00",
                "extensions": ["dynamic_dropdown"],
                "tooltip": `${data_type[Block_type]}`,
                "helpurl": ""
            });
        }
    };

    Cpp.forBlock[`${Block_type}_to`] = function(block) {
        const Name = block.getFieldValue("Name");
        return [`*${Name}`, 1];
    };
})

Blockly.Blocks[`nullptr`] = {
    init: function() {
        this.jsonInit({
            "type": "nullptr", 
            "message0": "nullptr", 
            "output": null, 
            "colour": "#DABD00",
            "tooltip": `nullptr`,
            "helpurl": ""
        });
    }
}

Cpp.forBlock[`nullptr`] = function(block){
    return [`nullptr`, Cpp.ORDER_ATOMIC];
}