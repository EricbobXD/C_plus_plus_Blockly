// Block definitions adapted from EricbobXD/C_plus_plus_Blockly (Apache-2.0).
// This module migrates block vocabulary and C++ generation only; the current
// Blocksmith workspace, fixed cpp_main frame, and application features remain authoritative.
let Blockly;

const value = (name, label, check = null) => ({ type: 'input_value', name, check, ...(label ? { title: label } : {}) });
const field = (name, text = '') => ({ type: 'field_input', name, text });
const dropdown = (name, options) => ({ type: 'field_dropdown', name, options });
const out = (type, label, args, colour, check = null, tooltip = '') => ({ type, message0: `${label} ${args.map((_, i) => `%${i + 1}`).join(' ')}`, args0: args, output: check, colour, tooltip });
const stmt = (type, label, args = [], colour = 210, tooltip = '') => ({ type, message0: `${label}${args.length ? ` ${args.map((_, i) => `%${i + 1}`).join(' ')}` : ''}`, ...(args.length ? { args0: args } : {}), previousStatement: null, nextStatement: null, colour, tooltip });
const valueNames = (...names) => names.map((name) => ({ type: 'input_value', name }));

const definitions = [
  out('string', '字串', [field('TEXT', 'Hello world')], 25, 'String', '建立字串'),
  out('char', '字元', [field('TEXT', 'A')], 25, 'Char', '建立字元'),
  stmt('add_line', '換行', [], 25, '輸出換行符號'),
  out('tab', 'Tab（4 格）', [], 25, 'String'),
  out('number', '數字', [{ type: 'field_number', name: 'NUMBER', value: 0 }], 230, 'Number'),
  out('abs_block', '絕對值', [value('value', '', 'Number')], 230, 'Number'),
  stmt('comment_block', '// 註解', [field('COMMENT', '註解')], 25),
  { type: 'for_block', message0: '初始值 %1 條件 %2 更新 %3', args0: valueNames('init', 'condition', 'iter'), message1: '執行 %1', args1: [{ type: 'input_statement', name: 'DO' }], inputsInline: true, previousStatement: null, nextStatement: null, colour: 210, tooltip: 'C++ for 迴圈' },
  { type: 'for_range_block', message0: '逐一取出 %1 自容器 %2', args0: valueNames('VAR', 'container'), message1: '執行 %1', args1: [{ type: 'input_statement', name: 'DO' }], previousStatement: null, nextStatement: null, colour: 210, tooltip: '範圍 for 迴圈' },
  { type: 'while_block', message0: '當 %1', args0: [value('CONDITION', '', 'Boolean')], message1: '重複執行 %1', args1: [{ type: 'input_statement', name: 'DO' }], previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'if_else', message0: '條件 %1 成立時 %2 否則 %3', args0: [value('CONDITION', '', 'Boolean'), value('r1'), value('r2')], output: null, inputsInline: true, colour: 210 },
  out('var_cal', '變數運算', [value('A'), dropdown('OPERATOR', [['+=', 'ADD_EQUALS'], ['-=', 'SUBTRACT_EQUALS'], ['*=', 'MULTIPLY_EQUALS'], ['/=', 'DIVIDE_EQUALS']]), value('B')], 230, 'Number'),
  stmt('break_block', '結束迴圈', [], 210), stmt('continue_block', '跳至下一輪', [], 210),
  stmt('return_block', '回傳', [value('RETURN_VALUE')], 210),
  out('or_and_xor', '條件', [value('A'), dropdown('OPERATOR', [['且', 'AND'], ['或', 'OR'], ['XOR', 'XOR']]), value('B')], 230, 'Boolean'),
  out('logic_operators', '比較', [value('A'), dropdown('OPERATOR', [['==', 'EQUAL'], ['!=', 'NOT_EQUAL'], ['>', 'GREATER'], ['<', 'LESS'], ['>=', 'GREATER_EQUAL'], ['<=', 'LESS_EQUAL']]), value('B')], 230, 'Boolean'),
  out('logic_not', '否定', [value('A')], 230, 'Boolean'),
  out('var_calculate', '變數運算', [value('A'), dropdown('OPERATOR', [['+=', 'ADD_EQUALS'], ['-=', 'SUBTRACT_EQUALS'], ['*=', 'MULTIPLY_EQUALS'], ['/=', 'DIVIDE_EQUALS'], ['%=', 'MODULO_EQUALS']]), value('B')], 230, 'Number'),
  out('compare_block', '比較值', [value('A'), dropdown('OPERATOR', [['=', 'EQUAL'], ['!=', 'NOT_EQUAL'], ['>', 'GREATER'], ['<', 'LESS'], ['>=', 'GREATER_EQUAL'], ['<=', 'LESS_EQUAL']]), value('B')], 230, null),
  stmt('cin_block', '輸入', [value('VARIABLES')], 160),
  stmt('cout_block', '輸出', [value('INPUT'), dropdown('ENDL_OPTION', [['換行', 'endl'], ['不換行', '']])], 160),
  out('true', 'True', [], 230, 'Boolean'), out('false', 'False', [], 230, 'Boolean'),
  stmt('new_block', '配置動態記憶體', [dropdown('TYPE', [['整數', 'int'], ['浮點數', 'float'], ['雙精度', 'double'], ['字元', 'char'], ['字串', 'string'], ['長整數', 'long long']]), { type: 'field_checkbox', name: 'value', checked: false }, { type: 'field_checkbox', name: 'array', checked: false }], 45),
  stmt('delete_block', '釋放記憶體', [dropdown('TYPE1', [['整數', 'int'], ['浮點數', 'float'], ['雙精度', 'double'], ['字元', 'char'], ['字串', 'string'], ['長整數', 'long long']]), field('var_name', 'value'), dropdown('TYPE2', [['單一值', ''], ['陣列', '[]']])], 45),
  stmt('define_block', '定義巨集', [field('name', 'NAME'), field('func_name', 'value')], 260),
  stmt('def_var', '宣告變數', [dropdown('unsigned', [['一般',''],['unsigned','unsigned']]), dropdown('TYPE', [['整數','int'],['浮點數','float'],['雙精度','double'],['字元','char'],['字串','string'],['長整數','long long']]), field('var_name','value'), value('value')], 260),
  stmt('typedef_block', 'typedef', [field('type_name', 'int'), field('name', 'Integer')], 260),
  stmt('define_template', 'template', [value('var')], 260), out('define_typename', 'typename', [value('var')], 260),
  stmt('define_using', 'using', [value('var'), field('change_var', 'Alias')], 260),
  stmt('using_namespace_std', 'using namespace std;', [], 260),
  { type: 'define_namespace', message0: 'namespace %1', args0: [field('var', 'name')], message1: '%1', args1: [{ type: 'input_statement', name: 'statement' }], previousStatement: null, nextStatement: null, colour: 260 },
  out('math_calculate', '計算', [value('A'), dropdown('OPERATOR', [['+', 'ADD'], ['-', 'SUBTRACT'], ['×', 'MULTIPLY'], ['÷', 'DIVIDE'], ['整數除法', 'INTEGER_DIVIDE'], ['%', 'MODULO'], ['次方', 'POWER']]), value('B')], 230, 'Number'),
  ...[['math_sqrt','平方根','X','sqrt'],['math_abs','絕對值','A','abs'],['math_sine','sin','ANGLE','sin'],['math_cosine','cos','ANGLE','cos'],['math_tangent','tan','ANGLE','tan'],['math_ceil','向上取整','X','ceil'],['math_floor','向下取整','X','floor'],['math_random','隨機數，小於','RANGE','rand']].map(([type,label,input]) => out(type,label,[value(input)],230,'Number')),
  ...[['sort','排序'],['max','最大值'],['min','最小值'],['find','尋找'],['binary_search','二分搜尋'],['lower_bound','第一個大於等於'],['upper_bound','第一個大於'],['reverse','反轉']].map(([type,label]) => stmt(type, label, [dropdown('TYPE', [['內建陣列','內建陣列'],['容器','模組陣列']]), field('name','values'), value('value'), value('start'), value('end')], 205)),
  out('setbase', '輸出進位', [dropdown('carry', [['二進位','2'],['八進位','8'],['十進位','10'],['十六進位','16']])], 160),
  out('setprecision', '設定精度', [dropdown('choice', [['有效位數','sig_figs'],['小數位數','place']]), value('number')], 160),
  out('setw', '輸出欄寬', [value('number')], 160), out('setfill', '填補字元', [value('strings')], 160),
  ...[['char_bit','CHAR_BIT'],['schar_min','SCHAR_MIN'],['schar_max','SCHAR_MAX'],['uchar_min','UCHAR_MIN'],['uchar_max','UCHAR_MAX'],['char_min','CHAR_MIN'],['char_max','CHAR_MAX'],['int_min','INT_MIN'],['int_max','INT_MAX'],['uint_max','UINT_MAX'],['llong_min','LLONG_MIN'],['llong_max','LLONG_MAX'],['ullong_max','ULLONG_MAX'],['mb_len_max','MB_LEN_MAX']].map(([type,label]) => out(type,label,[],265)),
  stmt('boost_ios_sync','停用輸入輸出同步',[],160), stmt('boost_cin_cout_tie','解除 cin/cout 綁定',[],160), out('cin.eof','cin 到達 EOF',[],160,'Boolean'),
  stmt('define_sstream','建立 stringstream',[field('sstream_name','ss'),value('sstream_content')],330),
  out('sstream_<<','串流插入',[field('var1','ss'),field('var2','value')],330), out('sstream_>>','串流讀取',[field('var1','ss'),field('var2','value')],330),
  out('llabs_block','long long 絕對值',[value('value')],330,'Number'),
  out('data_type','資料型別',[dropdown('TYPE', [['int','int'],['long long','long long'],['float','float'],['double','double'],['char','char'],['bool','bool'],['string','std::string']])],260,'TYPE'),
  out('void','void 型別',[],260,'TYPE'),
  out('sizeof','sizeof',[value('VALUE')],260,'Number'),
  stmt('sort_container','排序容器',[field('NAME','values')],205),
  out('bind','std::bind',[value('FUNCTION'),value('ARGUMENT')],205),
  out('placeholder','函式佔位符',[dropdown('INDEX', [['第 1 個','1'],['第 2 個','2'],['第 3 個','3']])],205),
  { type: 'if_block', message0: '如果 %1', args0: [value('IF_VALUE','', 'Boolean')], message1: '執行 %1', args1: [{type:'input_statement',name:'IF_DO'}], previousStatement:null,nextStatement:null,colour:210 },
  ...[['define_function','定義函式'],['define_function_void','定義 void 函式'],['define_operator','定義運算子'],['define_array','定義陣列'],['define_vector','定義 vector'],['define_set','定義 set'],['define_map','定義 map'],['define_pair','定義 pair'],['define_stack','定義 stack'],['define_queue','定義 queue'],['define_deque','定義 deque'],['define_priority_queue','定義 priority_queue'],['define_bitset','定義 bitset'],['define_struct','定義 struct'],['define_class','定義 class'],['define_variable','定義變數'],['define_pointer','定義指標'],['define_reference','定義參考']].map(([type,label]) => {
    const needsType = !['define_function_void','define_struct','define_class'].includes(type);
    const usesValue = ['define_array','define_variable'].includes(type);
    const args = [...(needsType ? [field('TYPE','int')] : []), field('name','value'), ...(usesValue ? [value('VALUE')] : []), {type:'input_statement',name:'DO'}];
    return stmt(type,label,args,260);
  }),
  { type:'switch_block', message0:'switch %1', args0:[value('SWITCH_VALUE')], message1:'預設 %1',args1:[{type:'input_statement',name:'DEFAULT'}], previousStatement:null,nextStatement:null,colour:190 },
  ...[['switch_mutator','切換分支數量'],['case_mutator','case 分支'],['string_generic_container','字串運算輸入'],['string_generic_item','字串項目'],['math_generic_container','數學運算輸入'],['math_generic_item','數學項目'],['bitwise_generic_container','位元運算輸入'],['bitwise_generic_item','位元項目']].map(([type,label]) => type.endsWith('_container') ? ({type,message0:label,message1:'%1',args1:[{type:'input_statement',name:'STACK'}],colour:210}) : stmt(type,label,[],210)),
  ...['math_generic','string_generic','bitwise_generic'].map((type) => out(type, type==='math_generic'?'多項數學運算':type==='string_generic'?'多項字串運算':'多項位元運算',[value('ADD0'),value('ADD1')], type==='string_generic'?25:230, type==='string_generic'?'String':'Number')),
  ...[['math_plus','多項加法'],['math_multiply','多項乘法'],['math_percent','多項取餘數'],['math_divide','多項除法'],['math_subtract','多項減法'],['bitwise_and','位元 AND'],['bitwise_or','位元 OR'],['bitwise_xor','位元 XOR'],['bitwise_left','位元左移'],['bitwise_right','位元右移'],['string_plus','字串串接'],['string_commas','以逗號組合'],['string_cin','字串串流讀取'],['string_cout','字串串流輸出']].map(([type,label]) => out(type,label,[value('ADD0'),value('ADD1')],type.startsWith('string')?25:230,type.startsWith('string')?'String':'Number')),
  out('bitwise_not','位元 NOT',[value('VALUE')],230,'Number'),
];

definitions.push(
  { type: 'if_mutator_container', message0: '條件分支 %1', args0: [{ type: 'input_statement', name: 'STACK' }], previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'if_elseif_mutator', message0: '否則如果', previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'if_else_mutator', message0: '否則', previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'switch_default_mutator', message0: 'default', previousStatement: null, nextStatement: null, colour: 190 },
);
Object.assign(definitions.find((item) => item.type === 'switch_mutator'), { message0: 'case 分支 %1', args0: [{ type: 'input_statement', name: 'STACK' }], previousStatement: null, nextStatement: null, colour: 190 });
Object.assign(definitions.find((item) => item.type === 'case_mutator'), { message0: 'case', args0: [], previousStatement: null, nextStatement: null, colour: 190 });

const ifBranchMutator = {
  mutationToDom() { const node=Blockly.utils.xml.createElement('mutation');node.setAttribute('elseif',this.elseifCount_||0);node.setAttribute('else',this.hasElse_?'1':'0');return node; },
  domToMutation(node) { this.elseifCount_=Number(node.getAttribute('elseif'))||0;this.hasElse_=node.getAttribute('else')==='1';this.updateIfShape_(); },
  updateIfShape_() { const saved=[];for(let i=0;i<32;i++)saved.push([this.getInput(`ELSEIF_VALUE${i}`)?.connection.targetConnection,this.getInput(`ELSEIF_DO${i}`)?.connection.targetConnection]);const elseC=this.getInput('ELSE')?.connection.targetConnection;for(let i=0;i<32;i++){if(this.getInput(`ELSEIF_VALUE${i}`))this.removeInput(`ELSEIF_VALUE${i}`);if(this.getInput(`ELSEIF_DO${i}`))this.removeInput(`ELSEIF_DO${i}`);}if(this.getInput('ELSE'))this.removeInput('ELSE');for(let i=0;i<(this.elseifCount_||0);i++){const v=this.appendValueInput(`ELSEIF_VALUE${i}`).appendField('否則如果');const s=this.appendStatementInput(`ELSEIF_DO${i}`).appendField('執行');if(saved[i]?.[0])v.connection.connect(saved[i][0]);if(saved[i]?.[1])s.connection.connect(saved[i][1]);}if(this.hasElse_){const s=this.appendStatementInput('ELSE').appendField('否則');if(elseC)s.connection.connect(elseC);} },
  decompose(ws) { const root=ws.newBlock('if_mutator_container');root.initSvg();let c=root.getInput('STACK').connection;for(let i=0;i<(this.elseifCount_||0);i++){const it=ws.newBlock('if_elseif_mutator');it.initSvg();c.connect(it.previousConnection);c=it.nextConnection;}if(this.hasElse_){const it=ws.newBlock('if_else_mutator');it.initSvg();c.connect(it.previousConnection);}return root; },
  compose(root) { let it=root.getInputTargetBlock('STACK'),n=0,hasElse=false;const conns=[];while(it){if(it.type==='if_elseif_mutator'){conns.push({kind:'elseif',v:it.valueConnection_,s:it.statementConnection_});n++;}else if(it.type==='if_else_mutator'){hasElse=true;conns.push({kind:'else',s:it.statementConnection_});}it=it.nextConnection?.targetBlock()||null;}for(let i=0;i<32;i++){this.getInput(`ELSEIF_VALUE${i}`)?.connection.targetConnection?.disconnect();this.getInput(`ELSEIF_DO${i}`)?.connection.targetConnection?.disconnect();}this.getInput('ELSE')?.connection.targetConnection?.disconnect();this.elseifCount_=n;this.hasElse_=hasElse;this.updateIfShape_();let index=0;for(const entry of conns){if(entry.kind==='elseif'){if(entry.v)this.getInput(`ELSEIF_VALUE${index}`)?.connection.connect(entry.v);if(entry.s)this.getInput(`ELSEIF_DO${index}`)?.connection.connect(entry.s);index++;}else if(entry.s)this.getInput('ELSE')?.connection.connect(entry.s);} },
  saveConnections(root) { let it=root.getInputTargetBlock('STACK'),i=0;while(it){if(it.type==='if_elseif_mutator'){it.valueConnection_=this.getInput(`ELSEIF_VALUE${i}`)?.connection.targetConnection;it.statementConnection_=this.getInput(`ELSEIF_DO${i}`)?.connection.targetConnection;i++;}else if(it.type==='if_else_mutator')it.statementConnection_=this.getInput('ELSE')?.connection.targetConnection;it=it.nextConnection?.targetBlock()||null;} },
};
const switchCaseMutator = {
  mutationToDom() {const n=Blockly.utils.xml.createElement('mutation');n.setAttribute('cases',this.caseCount_||0);n.setAttribute('default',this.hasDefault_===false?'0':'1');return n;},
  domToMutation(n) {this.caseCount_=Number(n.getAttribute('cases'))||0;this.hasDefault_=n.getAttribute('default')!=='0';this.updateSwitchShape_();},
  updateSwitchShape_() {const old=[];for(let i=0;i<64;i++)old.push([this.getInput(`CASE_VALUE${i}`)?.connection.targetConnection,this.getInput(`CASE_DO${i}`)?.connection.targetConnection]);const d=this.getInput('DEFAULT')?.connection.targetConnection;for(let i=0;i<64;i++){if(this.getInput(`CASE_VALUE${i}`))this.removeInput(`CASE_VALUE${i}`);if(this.getInput(`CASE_DO${i}`))this.removeInput(`CASE_DO${i}`);}if(this.getInput('DEFAULT'))this.removeInput('DEFAULT');for(let i=0;i<(this.caseCount_||0);i++){const v=this.appendValueInput(`CASE_VALUE${i}`).appendField('case');const s=this.appendStatementInput(`CASE_DO${i}`).appendField(':');if(old[i]?.[0])v.connection.connect(old[i][0]);if(old[i]?.[1])s.connection.connect(old[i][1]);}if(this.hasDefault_!==false){const input=this.appendStatementInput('DEFAULT').appendField('default');if(d)input.connection.connect(d);}},
  decompose(ws) {const root=ws.newBlock('switch_mutator');root.initSvg();let c=root.getInput('STACK').connection;for(let i=0;i<(this.caseCount_||0);i++){const it=ws.newBlock('case_mutator');it.initSvg();c.connect(it.previousConnection);c=it.nextConnection;}if(this.hasDefault_!==false){const it=ws.newBlock('switch_default_mutator');it.initSvg();c.connect(it.previousConnection);}return root;},
  compose(root) {let it=root.getInputTargetBlock('STACK'),n=0,hasDefault=false;const conns=[];while(it){if(it.type==='case_mutator'){conns.push({kind:'case',v:it.valueConnection_,s:it.statementConnection_});n++;}else if(it.type==='switch_default_mutator'){hasDefault=true;conns.push({kind:'default',s:it.statementConnection_});}it=it.nextConnection?.targetBlock()||null;}for(let i=0;i<64;i++){this.getInput(`CASE_VALUE${i}`)?.connection.targetConnection?.disconnect();this.getInput(`CASE_DO${i}`)?.connection.targetConnection?.disconnect();}this.getInput('DEFAULT')?.connection.targetConnection?.disconnect();this.caseCount_=n;this.hasDefault_=hasDefault;this.updateSwitchShape_();let index=0;for(const entry of conns){if(entry.kind==='case'){if(entry.v)this.getInput(`CASE_VALUE${index}`)?.connection.connect(entry.v);if(entry.s)this.getInput(`CASE_DO${index}`)?.connection.connect(entry.s);index++;}else if(entry.s)this.getInput('DEFAULT')?.connection.connect(entry.s);}},
  saveConnections(root) {let it=root.getInputTargetBlock('STACK'),i=0;while(it){if(it.type==='case_mutator'){it.valueConnection_=this.getInput(`CASE_VALUE${i}`)?.connection.targetConnection;it.statementConnection_=this.getInput(`CASE_DO${i}`)?.connection.targetConnection;i++;}else if(it.type==='switch_default_mutator')it.statementConnection_=this.getInput('DEFAULT')?.connection.targetConnection;it=it.nextConnection?.targetBlock()||null;}},
};
definitions.find((item)=>item.type==='if_block').mutator='legacy_if_branches';
definitions.find((item)=>item.type==='switch_block').mutator='legacy_switch_cases';

const cppTypes = [['int','int'],['long long','long long'],['float','float'],['double','double'],['char','char'],['bool','bool'],['string','std::string']];
// Use structured type choices on type slots. Bitset's TYPE is its bit count.
for (const definition of definitions) {
  const arg = definition.args0?.find((item) => item.name === 'TYPE');
  if (arg && definition.type !== 'define_bitset') {
    Object.assign(arg, { type: 'field_dropdown', options: cppTypes });
    delete arg.text;
  }
  if (definition.type === 'define_bitset' && arg) Object.assign(arg, { type: 'field_number', value: 8, min: 1, max: 4096, precision: 1 });
}

const variadicTypes = ['math_generic','string_generic','bitwise_generic','math_plus','math_multiply','math_percent','math_divide','math_subtract','bitwise_and','bitwise_or','bitwise_xor','bitwise_left','bitwise_right','string_plus','string_commas','string_cin','string_cout'];
const variadicMixin = {
  mutationToDom() { const mutation = Blockly.utils.xml.createElement('mutation'); mutation.setAttribute('items', this.itemCount_ || 2); return mutation; },
  domToMutation(xml) { this.itemCount_ = Math.max(2, Number(xml.getAttribute('items')) || 2); this.updateVariadicShape_(); },
  updateWarning_() { this.setWarningText(null); },
  onchange() { this.updateWarning_(); },
  updateVariadicShape_() {
    const count = Math.max(2, this.itemCount_ || 2);
    const connections = Array.from({ length: 32 }, (_, i) => this.getInput(`ADD${i}`)?.connection.targetConnection || null);
    for (let i = 0; i < 32; i++) if (this.getInput(`ADD${i}`)) this.removeInput(`ADD${i}`);
    for (let i = 0; i < count; i++) {
      const input = this.appendValueInput(`ADD${i}`);
      if (this.outputConnection?.getCheck()) input.setCheck(this.outputConnection.getCheck());
      if (connections[i]) input.connection.connect(connections[i]);
    }
    this.updateWarning_();
  },
  decompose(workspace) {
    const container = workspace.newBlock(this.mutatorContainerType_); container.initSvg();
    let connection = container.getInput('STACK').connection;
    for (let i = 0; i < (this.itemCount_ || 2); i++) { const item = workspace.newBlock(this.mutatorItemType_); item.initSvg(); connection.connect(item.previousConnection); connection = item.nextConnection; }
    return container;
  },
  compose(container) {
    let item = container.getInputTargetBlock('STACK'); let count = 0; const connections = [];
    while (item) { connections.push(item.valueConnection_ || null); count++; item = item.nextConnection?.targetBlock() || null; }
    for (let i = 0; i < (this.itemCount_ || 2); i++) this.getInput(`ADD${i}`)?.connection.targetConnection?.disconnect();
    this.itemCount_ = Math.max(2, count); this.updateVariadicShape_();
    connections.forEach((connection, index) => { if (connection && this.getInput(`ADD${index}`)) this.getInput(`ADD${index}`).connection.connect(connection); });
  },
  saveConnections(container) { let item = container.getInputTargetBlock('STACK'); let i = 0; while (item) { item.valueConnection_ = this.getInput(`ADD${i}`)?.connection.targetConnection || null; i++; item = item.nextConnection?.targetBlock() || null; } },
};
for (const [family, itemType] of [['math','math_generic_item'],['string','string_generic_item'],['bitwise','bitwise_generic_item']]) {
  const containerType = `${family}_generic_container`;
  const containerDef = definitions.find((item) => item.type === containerType);
  if (containerDef) Object.assign(containerDef, { message0: '輸入項目 %1', args0: [{ type: 'input_statement', name: 'STACK' }], message1: undefined, previousStatement: null, nextStatement: null });
  const itemDef = definitions.find((item) => item.type === itemType);
  if (itemDef) Object.assign(itemDef, { message0: '項目', args0: [], previousStatement: null, nextStatement: null });
  for (const type of variadicTypes.filter((name) => family === 'string' ? name.startsWith('string') : family === 'math' ? name.startsWith('math') : name.startsWith('bitwise'))) {
    const definition = definitions.find((item) => item.type === type);
    if (definition) definition.mutator = `legacy_${family}_variadic`;
  }
}

export const legacyBlockTypes = definitions.map(({ type }) => type);
export const legacyToolboxCategories = [
  ['文本', ['string','char','comment_block','add_line','tab','string_generic','string_plus','string_commas','string_cin','string_cout']],
  ['操作', ['cin_block','cout_block']],
  ['運算', ['logic_operators','compare_block','or_and_xor','false','true','logic_not','number','abs_block','var_calculate','math_calculate','math_generic','math_plus','math_multiply','math_percent','math_divide','math_subtract','bitwise_generic','bitwise_and','bitwise_or','bitwise_xor','bitwise_left','bitwise_right','bitwise_not']],
  ['判斷', ['if_block','switch_block','if_else']],
  ['迴圈', ['while_block','for_block','for_range_block','break_block','continue_block','return_block']],
  ['定義', ['define_block','typedef_block','define_template','define_typename','define_using','using_namespace_std','define_namespace','def_var','define_function','define_function_void','define_operator','define_array','define_vector','define_set','define_map','define_pair','define_stack','define_queue','define_deque','define_priority_queue','define_bitset','define_struct','define_class','define_variable','define_pointer','define_reference']],
  ['好用的東西', ['data_type','void','sizeof','new_block','delete_block','setbase','setprecision','setw','setfill','boost_ios_sync','boost_cin_cout_tie','cin.eof','define_sstream','sstream_<<','sstream_>>','llabs_block','sort_container','bind','placeholder']],
  ['演算法', ['sort','max','min','find','binary_search','lower_bound','upper_bound','reverse']],
  ['數學函式', ['math_sqrt','math_abs','math_sine','math_cosine','math_tangent','math_ceil','math_floor','math_random']],
  ['數值界限', ['char_bit','schar_min','schar_max','uchar_min','uchar_max','char_min','char_max','int_min','int_max','uint_max','llong_min','llong_max','ullong_max','mb_len_max']],
];

// Keep each toolbox category and every block it contains on one shared hue.
const categoryHues = {
  '資料型態': 260, '陣列': 260, '文本': 25, '操作': 160, '運算': 230,
  '判斷': 210, '迴圈': 210, '定義': 260, '變數/指標/位置': 260,
  '函式/結構/類別': 260, '好用的東西': 45, 'STL模組': 260,
  'Vector': 260, 'Deque': 260, 'Set函式庫': 260, 'Map函式庫': 260,
  'Pair': 260, 'Stack': 260, 'Queue': 260, 'Priority_queue': 260,
  'Bitset': 260, 'algorithm': 205, 'iomanip': 160, 'climits': 265,
  'math': 230, 'cstdlib': 45, 'basic_ios': 160, 'sstream': 330,
  'functional': 205,
};
for (const [name, types] of legacyToolboxCategories) {
  const colour = categoryHues[name] ?? 210;
  for (const type of types) {
    const definition = definitions.find((block) => block.type === type);
    if (definition) definition.colour = colour;
  }
}
// The useful-tools group brings together utilities with different legacy
// colours; normalize them as a group so flyout blocks match their category.
for (const type of legacyToolboxCategories.find(([name]) => name === '好用的東西')[1]) {
  const definition = definitions.find((block) => block.type === type);
  if (definition) definition.colour = categoryHues['好用的東西'];
}
// STL child categories use their own matching family hue.
for (const [group, types] of Object.entries({
  algorithm: legacyToolboxCategories.find(([name]) => name === '演算法')[1],
  iomanip: ['setbase','setprecision','setw','setfill'],
  climits: legacyToolboxCategories.find(([name]) => name === '數值界限')[1],
  math: legacyToolboxCategories.find(([name]) => name === '數學函式')[1],
  cstdlib: ['llabs_block'], basic_ios: ['boost_ios_sync','boost_cin_cout_tie','cin.eof'],
  sstream: ['define_sstream','sstream_>>','sstream_<<'],
  functional: ['sort_container','bind','placeholder'],
})) {
  for (const type of types) {
    const definition = definitions.find((block) => block.type === type);
    if (definition) definition.colour = categoryHues[group];
  }
}
// Mutator scaffolding is registered for Blockly's editors, but is intentionally
// omitted from the user-facing toolbox. Every block defined by block_json.js
// and block_cpp.js is otherwise available here.
const internalMutatorTypes = new Set([
  'switch_mutator', 'case_mutator',
  'switch_default_mutator', 'if_mutator_container', 'if_elseif_mutator', 'if_else_mutator',
  'string_generic_container', 'string_generic_item',
  'math_generic_container', 'math_generic_item',
  'bitwise_generic_container', 'bitwise_generic_item',
]);
const visibleLegacyTypes = new Set(legacyToolboxCategories.flatMap(([, types]) => types));
const uncategorizedLegacyTypes = legacyBlockTypes.filter((type) => !internalMutatorTypes.has(type) && !visibleLegacyTypes.has(type));
const blocks = (types) => types.filter((type) => !internalMutatorTypes.has(type) && legacyBlockTypes.includes(type)).map((type) => ({ kind: 'block', type }));
const category = (name, contents, colour) => ({ kind: 'category', name, ...(colour ? { colour } : {}), contents });
const blockCategory = (name, types, colour) => category(name, blocks(types), colour);
const createButton = (text, callbackKey) => ({ kind: 'button', text, callbackKey });
const createNamedCategory = (name, text, callbackKey, type = null) => category(name, [
  ...(type && legacyBlockTypes.includes(type) ? [{ kind: 'block', type }] : []),
  createButton(text, callbackKey),
]);
const createNamedActionCategory = (name, text, callbackKey) => category(name, [createButton(text, callbackKey)]);
const stlCategory = (name, label, callbackKey, type) => createNamedCategory(name, label, callbackKey, type);
export const legacyToolbox = [
  blockCategory('資料型態', ['data_type','void','sizeof'], categoryHues['資料型態']),
  { ...createNamedActionCategory('陣列', '新增陣列', 'legacy-create-array'), colour: categoryHues['陣列'] },
  blockCategory('文本', legacyToolboxCategories[0][1], categoryHues['文本']),
  blockCategory('操作', legacyToolboxCategories[1][1], categoryHues['操作']),
  blockCategory('運算', legacyToolboxCategories[2][1], categoryHues['運算']),
  blockCategory('判斷', legacyToolboxCategories[3][1], categoryHues['判斷']),
  blockCategory('迴圈', legacyToolboxCategories[4][1], categoryHues['迴圈']),
  blockCategory('定義', legacyToolboxCategories[5][1], categoryHues['定義']),
  { ...createNamedCategory('變數/指標/位置', '新增變數', 'legacy-create-variable'), colour: categoryHues['變數/指標/位置'] },
  { ...createNamedCategory('函式/結構/類別', '新增函式、結構、類別', 'legacy-create-function'), colour: categoryHues['函式/結構/類別'] },
  blockCategory('好用的東西', legacyToolboxCategories[6][1], categoryHues['好用的東西']),
  category('STL模組', [
    { ...createNamedActionCategory('Vector', '新增 Vector', 'legacy-create-Vector'), colour: categoryHues.Vector },
    { ...createNamedActionCategory('Deque', '新增 Deque', 'legacy-create-Deque'), colour: categoryHues.Deque },
    { ...createNamedActionCategory('Set函式庫', '新增 Set', 'legacy-create-Set'), colour: categoryHues['Set函式庫'] },
    { ...createNamedActionCategory('Map函式庫', '新增 Map', 'legacy-create-Map'), colour: categoryHues['Map函式庫'] },
    { ...createNamedActionCategory('Pair', '新增 Pair', 'legacy-create-Pair'), colour: categoryHues.Pair },
    { ...createNamedActionCategory('Stack', '新增 Stack', 'legacy-create-Stack'), colour: categoryHues.Stack },
    { ...createNamedActionCategory('Queue', '新增 Queue', 'legacy-create-Queue'), colour: categoryHues.Queue },
    { ...createNamedActionCategory('Priority_queue', '新增 Priority_queue', 'legacy-create-Priority_Queue'), colour: categoryHues.Priority_queue },
    { ...createNamedActionCategory('Bitset', '新增 Bitset', 'legacy-create-Bitset'), colour: categoryHues.Bitset },
    blockCategory('algorithm', legacyToolboxCategories[7][1], categoryHues.algorithm),
    blockCategory('iomanip', ['setbase','setprecision','setw','setfill'], categoryHues.iomanip),
    blockCategory('climits', legacyToolboxCategories[9][1], categoryHues.climits),
    blockCategory('math', legacyToolboxCategories[8][1], categoryHues.math),
    blockCategory('cstdlib', ['llabs_block'], categoryHues.cstdlib),
    blockCategory('basic_ios', ['boost_ios_sync','boost_cin_cout_tie','cin.eof'], categoryHues.basic_ios),
    blockCategory('sstream', ['define_sstream','sstream_>>','sstream_<<'], categoryHues.sstream),
    blockCategory('functional', ['sort_container','bind','placeholder'], categoryHues.functional),
  ], categoryHues['STL模組']),
];
const legacyGroupByType = new Map();
for (const [oldGroup, types] of legacyToolboxCategories) {
  const group = ({
    '文本': '文字與註解', '操作': '輸入與輸出', '運算': '運算', '判斷': '流程控制', '迴圈': '流程控制',
    '定義': '進階 C++', '好用的東西': '進階 C++', '演算法': '演算法', '數學函式': '標準函式庫', '數值界限': '標準函式庫',
  })[oldGroup] || '舊版方塊';
  types.forEach((type) => legacyGroupByType.set(type, group));
}
for (const type of ['string_cin','string_cout','cin_block','cout_block','define_sstream','sstream_<<','sstream_>>','boost_ios_sync','boost_cin_cout_tie','cin.eof']) legacyGroupByType.set(type, '輸入與輸出');
for (const type of ['def_var','typedef_block','define_variable','define_pointer','define_reference','data_type','void','sizeof']) legacyGroupByType.set(type, '宣告與型別');
for (const type of ['define_function','define_function_void','define_operator','define_struct','define_class','cpp_include']) legacyGroupByType.set(type, '程式結構');
for (const type of ['define_array','define_vector','define_set','define_map','define_pair','define_stack','define_queue','define_deque','define_priority_queue','define_bitset']) legacyGroupByType.set(type, '陣列與容器');
for (const type of ['sort','max','min','find','binary_search','lower_bound','upper_bound','reverse','sort_container']) legacyGroupByType.set(type, '演算法');
for (const type of ['setbase','setprecision','setw','setfill','char_bit','schar_min','schar_max','uchar_min','uchar_max','char_min','char_max','int_min','int_max','uint_max','llong_min','llong_max','ullong_max','mb_len_max','math_sqrt','math_abs','math_sine','math_cosine','math_tangent','math_ceil','math_floor','math_random','llabs_block']) legacyGroupByType.set(type, '標準函式庫');
for (const type of ['bind','placeholder']) legacyGroupByType.set(type, '進階 C++');
for (const type of ['new_block','delete_block','define_block','define_template','define_typename','define_using','using_namespace_std','define_namespace']) legacyGroupByType.set(type, '進階 C++');
const legacyAliasesByType = {
  string: ['字串', '字符串', '文字', '文本', '字串常數', '字符串常量', '字串文字'], char: ['字元', '字符', '字元常數', '字符常量', '單個字符'],
  add_line: ['換行', '換行符號', 'newline'], tab: ['定位字元', '縮排', 'tab鍵'],
  number: ['數字', '數值', '常數', '數字常數'], abs_block: ['絕對值', 'absolute value'],
  math_calculate: ['數學運算', '四則運算', '四则运算', '加法', '減法', '减法', '乘法', '除法'],
  math_plus: ['加總', '加法', '總和'], math_multiply: ['連乘', '乘法'], math_percent: ['取餘數', '餘數', 'modulo'],
  math_divide: ['除法'], math_subtract: ['減法'], math_sqrt: ['平方根', '開根號'],
  math_sine: ['正弦', '三角函數'], math_cosine: ['餘弦', '三角函數'], math_tangent: ['正切', '三角函數'],
  logic_operators: ['邏輯', '且', '或', '布林運算'], compare_block: ['比較', '相等', '大於', '小於'],
  or_and_xor: ['邏輯運算', '且或', '布林運算'], logic_not: ['反向', '反轉真假', '否定'], true: ['真', '成立'], false: ['假', '不成立'],
  cin_block: ['輸入', '输入', '讀取', '读取', '讀入', '讀進', '標準輸入', 'cin'], cout_block: ['輸出', '输出', '顯示', '显示', '印出', '打印', '標準輸出', 'cout'],
  string_cin: ['字串輸入', '字符串输入', '讀取字串', '读取字符串'], string_cout: ['字串輸出', '字符串输出', '顯示字串', '显示字符串'],
  string_plus: ['字串串接', '字符串拼接', '合併文字', '合并文本', '文字相加'], string_commas: ['逗號分隔', '逗号分隔', '組合字串', '组合字符串', '多項文字'],
  string_generic: ['多項字串', '文字組合', '字串運算'],
  if_block: ['如果', '若', '條件判斷', '条件判断', 'if'], if_else: ['條件式', '條件分支', '条件分支', '如果否則', '如果否则'], switch_block: ['多重選擇', '多重选择', '分支選擇', '分支选择', 'switch case'],
  for_block: ['計數迴圈', 'for 迴圈', 'for 循環', 'for循环'], for_range_block: ['範圍迴圈', '范围循环', '逐一走訪', '逐个遍历', 'range for'],
  while_block: ['條件迴圈', '條件循环', 'while 迴圈', 'while 循環'], break_block: ['跳出迴圈', '跳出循环', '中斷迴圈', '中断循环'], continue_block: ['略過本次', '跳過本次', '跳过本次', '繼續迴圈'],
  def_var: ['宣告變數', '声明变量', '建立變數', '建立变量', '變量定義', '變數定義', '变量定义'], define_variable: ['宣告變數', '声明变量', '建立變數', '建立变量', '變量定義'],
  define_pointer: ['指標變數', '指针变量', '指標定義', '指针定义'], define_reference: ['參考變數', '引用變數', '引用变量', '參考定義'],
  define_array: ['建立陣列', '建立数组', '宣告陣列', '声明数组', '數組', '数组', 'array'], define_vector: ['向量', '矢量', '動態陣列', '动态数组', 'vector'],
  define_set: ['集合', '不重複元素', '不重复元素', 'set'], define_map: ['映射', '映射表', '键值对容器', '鍵值對容器', 'map'],
  define_pair: ['成對資料', 'pair'], define_stack: ['堆疊', '後進先出', 'stack'],
  define_queue: ['佇列', '队列', '先進先出', '先进先出', 'queue'], define_deque: ['雙向佇列', '双向队列', 'deque'],
  define_priority_queue: ['優先佇列', '优先队列', 'priority queue'], define_bitset: ['位元集合', '位集合', 'bitset'],
  define_function: ['函式', '函數', '函数', '建立函式', '建立函數', 'function'], define_function_void: ['無回傳函式', '無返回值函式', '无返回值函数', 'void 函式'],
  define_struct: ['結構', '結構體', '结构体', '自訂資料型別', '自定义数据类型', 'struct'], define_class: ['類別', '类', '物件導向', '面向对象', 'class'],
  sort: ['排序', '排列', 'sort'], find: ['搜尋', '搜索', '查詢', '查询', '查找', '尋找元素'], binary_search: ['二分搜尋', '二分搜索', '二分查找'],
  reverse: ['反轉順序', '倒序'], max: ['最大值', '較大值'], min: ['最小值', '較小值'],
  data_type: ['資料型態', '資料型別', '資料類型', '數據類型', '数据类型', '型別', '类型', 'type'], sizeof: ['大小', '位元組數', '字节数', '記憶體大小', '内存大小'],
  new_block: ['動態配置', '配置記憶體', 'new'], delete_block: ['釋放記憶體', 'delete'],
  comment_block: ['註解', '備註', '程式說明'], define_block: ['巨集', '預處理器', 'define'],
  using_namespace_std: ['標準命名空間', '標準命名空间', 'std命名空間', 'std命名空间'], define_namespace: ['命名空間', '命名空间', 'namespace'],
  typedef_block: ['型別別名', '类型别名', '自訂型別名稱', '自定义类型名称', 'typedef'],
};
const legacyTyposByType = {
  define_array: ['陳列'],
  data_type: ['資聊型態'],
  define_function: ['函示'],
};
const duplicateDefinitionTypes = new Set([
  'define_variable', 'typedef_block', 'define_pointer', 'define_reference',
  'define_array', 'define_vector', 'define_set', 'define_map', 'define_pair', 'define_stack', 'define_queue', 'define_deque', 'define_priority_queue', 'define_bitset',
  'define_function', 'define_operator', 'define_struct', 'define_class',
]);
export const legacySearchItems = definitions.filter((definition) => !duplicateDefinitionTypes.has(definition.type)).map((definition) => ({
  type: definition.type,
  label: `${definition.message0 || definition.type}`.replace(/%\d+/g, '').trim(),
  group: legacyGroupByType.get(definition.type) || '舊版方塊',
  aliases: [...(legacyAliasesByType[definition.type] || []), ...definition.type.replaceAll('_', ' ').split(' ')],
  typoAliases: legacyTyposByType[definition.type] || [],
  description: definition.tooltip || `${definition.type} 方塊`,
  inputSummary: [...(definition.args0 || []), ...(definition.args1 || [])]
    .map((argument) => argument.name || argument.type)
    .filter(Boolean)
    .join('、'),
}));
export const legacyLibraryBlockTypes = [
  'comment_block','define_block','typedef_block','define_template','define_using','define_namespace',
  'def_var','define_function','define_function_void','define_operator','define_array','define_vector','define_set','define_map','define_pair',
  'define_stack','define_queue','define_deque','define_priority_queue','define_bitset','define_struct','define_class',
  'define_variable','define_pointer','define_reference',
];

export function registerLegacyBlocks(generator, blocklyCore) {
  Blockly = blocklyCore;
  Blockly.Extensions.registerMutator('legacy_if_branches',ifBranchMutator,null,['if_elseif_mutator','if_else_mutator']);
  Blockly.Extensions.registerMutator('legacy_switch_cases',switchCaseMutator,null,['case_mutator','switch_default_mutator']);
  for (const [family, itemType] of [['math','math_generic_item'],['string','string_generic_item'],['bitwise','bitwise_generic_item']]) {
    Blockly.Extensions.registerMutator(`legacy_${family}_variadic`, {
      ...variadicMixin,
      mutatorContainerType_: `${family}_generic_container`,
      mutatorItemType_: itemType,
    }, null, [itemType]);
  }
  Blockly.defineBlocksWithJsonArray(definitions);
  Blockly.Blocks.new_block = {
    init() {
      this.appendDummyInput().appendField('配置動態記憶體').appendField(new Blockly.FieldDropdown([['整數','int'],['浮點數','float'],['雙精度','double'],['字元','char'],['字串','string'],['長整數','long long']]), 'TYPE').appendField('指定初值').appendField(new Blockly.FieldCheckbox('FALSE'), 'value').appendField('陣列').appendField(new Blockly.FieldCheckbox('FALSE'), 'array');
      this.setOutput(true);
      this.setColour(45);
      this.setTooltip('建立動態配置的值或陣列');
      this.updateShape_();
      this.setOnChange(() => this.updateShape_());
    },
    updateShape_() {
      const wantsValue = this.getFieldValue('value') === 'TRUE';
      const wantsArray = this.getFieldValue('array') === 'TRUE' && !wantsValue;
      if (wantsValue && !this.getInput('val')) this.appendValueInput('val').appendField('初值');
      if (!wantsValue && this.getInput('val')) this.removeInput('val');
      if (wantsArray && !this.getInput('sizes2')) this.appendValueInput('sizes2').appendField('陣列大小');
      if (wantsArray && !this.getInput('array_content')) this.appendValueInput('array_content').appendField('陣列內容');
      if (!wantsArray && this.getInput('array_content')) this.removeInput('array_content');
      if (!wantsArray && this.getInput('sizes2')) this.removeInput('sizes2');
    },
    mutationToDom() { const xml = Blockly.utils.xml.createElement('mutation'); xml.setAttribute('value', this.getFieldValue('value')); xml.setAttribute('array', this.getFieldValue('array')); return xml; },
    domToMutation(xml) { this.setFieldValue(xml.getAttribute('value') || 'FALSE', 'value'); this.setFieldValue(xml.getAttribute('array') || 'FALSE', 'array'); this.updateShape_(); },
  };
  const expr = (type, fn, order = generator.ORDER_ATOMIC) => { generator.forBlock[type] = (block) => [fn(block), order]; };
  const stmtGen = (type, fn) => { generator.forBlock[type] = (block) => `${fn(block)}\n`; };
  const v = (block, name, fallback = '') => generator.valueToCode(block, name, generator.ORDER_NONE) || fallback;
  const b = generator.forBlock;
  expr('string', (x) => JSON.stringify(x.getFieldValue('TEXT') || ''));
  expr('char', (x) => `'${String(x.getFieldValue('TEXT') || ' ').replaceAll("'", "\\'").slice(0,1)}'`);
  expr('tab', () => 'std::string(4, 32)'); expr('number', (x) => String(x.getFieldValue('NUMBER') ?? 0)); expr('true', () => 'true'); expr('false', () => 'false');
  expr('abs_block', (x) => `std::abs(${v(x,'value')})`); expr('llabs_block', (x) => `std::llabs(${v(x,'value')})`);
  expr('new_block',(x)=> { const type=x.getFieldValue('TYPE'); if(x.getFieldValue('value')==='TRUE') return `new ${type}(${v(x,'val')})`; if(x.getFieldValue('array')==='TRUE') return `new ${type}[${v(x,'sizes2')}]${x.getInputTargetBlock('array_content')?`{${v(x,'array_content')}}`:''}`; return `new ${type}`; });
  stmtGen('add_line', () => ''); stmtGen('comment_block', (x) => `// ${x.getFieldValue('COMMENT') || ''}`);
  const compare = (x) => `${v(x,'A','')} ${{EQUAL:'==',NOT_EQUAL:'!=',GREATER:'>',LESS:'<',GREATER_EQUAL:'>=',LESS_EQUAL:'<='}[x.getFieldValue('OPERATOR')] || '=='} ${v(x,'B','')}`;
  expr('logic_operators', compare, 5); expr('compare_block', compare, 5);
  expr('or_and_xor', (x) => `${v(x,'A','')} ${{AND:'&&',OR:'||',XOR:'!='}[x.getFieldValue('OPERATOR')] || '&&'} ${v(x,'B','')}`, 4);
  expr('logic_not', (x) => `!(${v(x,'A','')})`, 3);
  const math = (x) => { const op={ADD:'+',SUBTRACT:'-',MULTIPLY:'*',DIVIDE:'/',INTEGER_DIVIDE:'/',MODULO:'%',POWER:'pow'}[x.getFieldValue('OPERATOR')]||'+'; return op==='pow'?`std::pow(${v(x,'A','')}, ${v(x,'B','')})`:`(${v(x,'A','')} ${op} ${v(x,'B','')})`; };
  expr('math_calculate', math, 5);
  for (const [type,fn,input] of [['math_sqrt','sqrt','X'],['math_abs','abs','A'],['math_sine','sin','ANGLE'],['math_cosine','cos','ANGLE'],['math_tangent','tan','ANGLE'],['math_ceil','ceil','X'],['math_floor','floor','X']]) expr(type,(x)=>`std::${fn}(${v(x,input)})`);
  expr('math_random',(x)=>`(std::rand() % (${v(x,'RANGE')}))`);
  const valueExprs = ['var_cal','var_calculate','math_generic','math_plus','math_multiply','math_percent','math_divide','math_subtract','bitwise_generic','bitwise_and','bitwise_or','bitwise_xor','bitwise_left','bitwise_right','bitwise_not','string_generic','string_plus','string_commas','string_cin','string_cout'];
  for (const type of valueExprs) expr(type,(x)=>{ const operator = {math_plus:'+',math_multiply:'*',math_percent:'%',math_divide:'/',math_subtract:'-',bitwise_and:'&',bitwise_or:'|',bitwise_xor:'^',bitwise_left:'<<',bitwise_right:'>>',bitwise_not:'~',string_plus:'+',string_commas:',',string_cin:'>>',string_cout:'<<',ADD_EQUALS:'+=',SUBTRACT_EQUALS:'-=',MULTIPLY_EQUALS:'*=',MUTIPLY_EQUALS:'*=',DIVIDE_EQUALS:'/=',DEVIDE_EQUALS:'/=',MODULO_EQUALS:'%='}[type] || {ADD_EQUALS:'+=',SUBTRACT_EQUALS:'-=',MULTIPLY_EQUALS:'*=',MUTIPLY_EQUALS:'*=',DIVIDE_EQUALS:'/=',DEVIDE_EQUALS:'/=',MODULO_EQUALS:'%='}[x.getFieldValue('OPERATOR')] || '+'; if(type==='bitwise_not') { const operand=generator.valueToCode(x,'VALUE',generator.ORDER_NONE); return operand ? `~(${operand})` : ''; } const inputNames = variadicTypes.includes(type) ? Array.from({length:x.itemCount_ || 2},(_,i)=>`ADD${i}`) : [type==='var_cal'||type==='var_calculate'?'A':'ADD0',type==='var_cal'||type==='var_calculate'?'B':'ADD1']; const values=inputNames.map((name)=>generator.valueToCode(x,name,generator.ORDER_NONE)); if (values.some((value)=>!value)) return ''; return `(${values.join(` ${operator} `)})`; },5);
  const statement=(x,n)=>generator.statementToCode(x,n);
  stmtGen('for_block',(x)=>`for (${v(x,'init')}; ${v(x,'condition')}; ${v(x,'iter')}) {\n${statement(x,'DO')}}`);
  stmtGen('for_range_block',(x)=>`for (auto ${v(x,'VAR')} : ${v(x,'container')}) {\n${statement(x,'DO')}}`);
  stmtGen('while_block',(x)=>`while (${v(x,'CONDITION')}) {\n${statement(x,'DO')}}`);
  stmtGen('if_block',(x)=>{let code=`if (${v(x,'IF_VALUE')}) {\n${statement(x,'IF_DO')}}`;for(let i=0;i<(x.elseifCount_||0);i++)code+=` else if (${v(x,`ELSEIF_VALUE${i}`)}) {\n${statement(x,`ELSEIF_DO${i}`)}}`;if(x.hasElse_)code+=` else {\n${statement(x,'ELSE')}}`;return code;});
  stmtGen('switch_block',(x)=>{let code=`switch (${v(x,'SWITCH_VALUE')}) {\n`;for(let i=0;i<(x.caseCount_||0);i++)code+=`case ${v(x,`CASE_VALUE${i}`)}:\n${statement(x,`CASE_DO${i}`)}  break;\n`;if(x.hasDefault_!==false)code+=`default:\n${statement(x,'DEFAULT')}  break;\n`;return `${code}}`;});
  stmtGen('break_block',()=> 'break;'); stmtGen('continue_block',()=> 'continue;'); stmtGen('return_block',(x)=>`return${x.getInputTargetBlock('RETURN_VALUE')?' '+v(x,'RETURN_VALUE'):''};`);
  expr('if_else',(x)=>`(${v(x,'CONDITION')} ? ${v(x,'r1')} : ${v(x,'r2')})`);
  stmtGen('cin_block',(x)=>`std::cin >> ${v(x,'VARIABLES')};`);
  stmtGen('cout_block',(x)=>`std::cout << ${v(x,'INPUT')} ${x.getFieldValue('ENDL_OPTION')==='endl'?'<< std::endl':''};`);
  stmtGen('delete_block',(x)=>`delete${x.getFieldValue('TYPE2')==='[]'?'[]':''} ${x.getFieldValue('var_name')||'value'};`);
  stmtGen('define_block',(x)=>`#define ${x.getFieldValue('name')} ${x.getFieldValue('func_name')}`); stmtGen('typedef_block',(x)=>`typedef ${x.getFieldValue('type_name')} ${x.getFieldValue('name')};`);
  stmtGen('def_var',(x)=>`${x.getFieldValue('unsigned')==='unsigned'?'unsigned ':''}${x.getFieldValue('TYPE')||'int'} ${x.getFieldValue('var_name')||'value'}${x.getInputTargetBlock('value')?` = ${v(x,'value')}`:''};`);
  stmtGen('define_template',(x)=>`template <${v(x,'var','typename T')}>`); expr('define_typename',(x)=>`typename ${v(x,'var','T')}`);
  stmtGen('define_using',(x)=>`using ${v(x,'var','Name')} = ${x.getFieldValue('change_var')||'int'};`);
  stmtGen('using_namespace_std',()=> 'using namespace std;');
  stmtGen('define_namespace',(x)=>`namespace ${x.getFieldValue('var')||'name'} {\n${statement(x,'statement')}}`);
  for (const type of ['define_function','define_function_void','define_operator','define_array','define_vector','define_set','define_map','define_pair','define_stack','define_queue','define_deque','define_priority_queue','define_bitset','define_struct','define_class','define_variable','define_pointer','define_reference']) {
    stmtGen(type,(x)=>{
      const name=x.getFieldValue('name')||'value'; const dataType=x.getFieldValue('TYPE')||'int'; const body=statement(x,'DO');
      if(type==='define_vector') return `std::vector<${dataType}> ${name};`;
      if(type==='define_set') return `std::set<${dataType}> ${name};`;
      if(type==='define_map') return `std::map<${dataType}, int> ${name};`;
      if(type==='define_pair') return `std::pair<${dataType}, int> ${name};`;
      if(type==='define_stack') return `std::stack<${dataType}> ${name};`;
      if(type==='define_queue') return `std::queue<${dataType}> ${name};`;
      if(type==='define_deque') return `std::deque<${dataType}> ${name};`;
      if(type==='define_priority_queue') return `std::priority_queue<${dataType}> ${name};`;
      if(type==='define_bitset') return `std::bitset<${Math.max(1,Number(x.getFieldValue('TYPE'))||8)}> ${name};`;
      if(type==='define_struct'||type==='define_class') return `${type==='define_struct'?'struct':'class'} ${name} {\n${body}};`;
      if(type==='define_array') return `${dataType} ${name}[${v(x,'VALUE','1')}];`;
      if(type==='define_variable') return `${dataType} ${name}${x.getInputTargetBlock('VALUE')?` = ${v(x,'VALUE')}`:''};`;
      if(type==='define_pointer') return `${dataType}* ${name};`;
      if(type==='define_reference') return `${dataType}& ${name};`;
      if(type==='define_function_void') return `void ${name}() {\n${body}}`;
      if(type==='define_function') return `${dataType} ${name}() {\n${body}}`;
      return `${dataType} ${name}() {\n${body}}`;
    });
  }
  stmtGen('boost_ios_sync',()=> 'std::ios::sync_with_stdio(false);'); stmtGen('boost_cin_cout_tie',()=> 'std::cin.tie(nullptr);'); expr('cin.eof',()=> 'std::cin.eof()');
  stmtGen('define_sstream',(x)=>`std::stringstream ${x.getFieldValue('sstream_name')||'ss'}${x.getInputTargetBlock('sstream_content')?`(${v(x,'sstream_content')})`:''};`);
  expr('sstream_<<',(x)=>`${x.getFieldValue('var1')} << ${x.getFieldValue('var2')}`); expr('sstream_>>',(x)=>`${x.getFieldValue('var1')} >> ${x.getFieldValue('var2')}`);
  expr('setbase',(x)=>`std::setbase(${x.getFieldValue('carry')})`); expr('setprecision',(x)=>`std::setprecision(${v(x,'number')})`); expr('setw',(x)=>`std::setw(${v(x,'number')})`); expr('setfill',(x)=>`std::setfill(${v(x,'strings',"' '")})`);
  expr('data_type',(x)=>x.getFieldValue('TYPE') || 'int'); expr('void',()=> 'void'); expr('sizeof',(x)=>`sizeof(${v(x,'VALUE','int')})`);
  stmtGen('sort_container',(x)=>`std::sort(${x.getFieldValue('NAME')||'values'}.begin(), ${x.getFieldValue('NAME')||'values'}.end());`);
  expr('placeholder',(x)=>`std::placeholders::_${x.getFieldValue('INDEX')||'1'}`);
  expr('bind',(x)=>`std::bind(${v(x,'FUNCTION','function')}, ${v(x,'ARGUMENT','std::placeholders::_1')})`);
  for (const [type,macro] of [['char_bit','CHAR_BIT'],['schar_min','SCHAR_MIN'],['schar_max','SCHAR_MAX'],['uchar_min','UCHAR_MIN'],['uchar_max','UCHAR_MAX'],['char_min','CHAR_MIN'],['char_max','CHAR_MAX'],['int_min','INT_MIN'],['int_max','INT_MAX'],['uint_max','UINT_MAX'],['llong_min','LLONG_MIN'],['llong_max','LLONG_MAX'],['ullong_max','ULLONG_MAX'],['mb_len_max','MB_LEN_MAX']]) expr(type,()=>macro);
  const alg=(name,form='call')=>stmtGen(name,(x)=>{ const container=x.getFieldValue('name')||'values'; const start=v(x,'start','0'),end=v(x,'end',`${container}.size()`),needle=v(x,'value'); const isArray=x.getFieldValue('TYPE')==='內建陣列'; const begin=isArray?`${container} + ${start}`:`${container}.begin() + ${start}`; const finish=isArray?`${container} + ${end}`:`${container}.begin() + ${end}`; if(name==='reverse') return `std::reverse(${container}.begin(), ${container}.end());`; if(name==='sort') return `std::sort(${begin}, ${finish});`; if(name==='max'||name==='min') return `auto ${name}_value = *std::${name}_element(${begin}, ${finish});`; return `std::${name==='binary_search'?'binary_search':name}(${begin}, ${finish}, ${needle});`; });
  ['sort','max','min','find','binary_search','lower_bound','upper_bound','reverse'].forEach((type)=>alg(type));
  return legacyBlockTypes;
}
