import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(root, '../fixtures');
const requested = Number(process.argv[2] || 600);
if (!Number.isInteger(requested) || requested < 50 || requested > 5000) {
  throw new Error('Block count must be an integer from 50 to 5000.');
}

const variableIds = ['synthetic-count', 'synthetic-limit', 'synthetic-total'];
const variableNames = ['count', 'limit', 'total'];
const variable = (index) => `<block type="variables_get"><field name="VAR" id="${variableIds[index % variableIds.length]}">${variableNames[index % variableNames.length]}</field></block>`;
const patterns = [
  (n) => `<block type="controls_if" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation elseif="1" else="1"></mutation><value name="IF0"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="IF1"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value><statement name="DO0"><block type="controls_flow_statements"><field name="FLOW">BREAK</field></block></statement></block>`,
  (n) => `<block type="math_number_property" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation divisor_input="true"></mutation><field name="PROPERTY">DIVISIBLE_BY</field><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">${n % 17 + 1}</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">${n % 5 + 2}</field></shadow></value></block>`,
  (n) => `<block type="math_on_list" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation op="MODE"></mutation><field name="OP">MODE</field><value name="LIST"><shadow type="lists_create_with"><mutation items="4"></mutation></shadow></value></block>`,
  (n) => `<block type="text_charAt" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><shadow type="text"><field name="TEXT">legacy-${n}</field></shadow></value></block>`,
  (n) => `<block type="text_join" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><shadow type="text"><field name="TEXT">part-${n}-${i}</field></shadow></value>`).join('')}</block>`,
  (n) => `<block type="string_generic" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><shadow type="string"><field name="TEXT">text-${n}-${i}</field></shadow></value>`).join('')}</block>`,
  (n) => `<block type="switch_block" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation cases="2" default="1"></mutation><value name="SWITCH_VALUE"><shadow type="math_number"><field name="NUM">${n % 8}</field></shadow></value></block>`,
  (n) => `<block type="math_arithmetic" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><field name="OP">ADD</field><value name="A"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value><value name="B">${variable(n % variableIds.length)}</value></block>`,
  (n) => `<block type="variables_get" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><field name="VAR" id="${variableIds[n % variableIds.length]}">${variableNames[n % variableNames.length]}</field></block>`,
  (n) => `<block type="logic_compare" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><field name="OP">${n % 2 ? 'GTE' : 'LT'}</field><value name="A"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value><value name="B">${variable(n % variableIds.length)}</value></block>`,
  (n) => `<block type="if_block" x="${40 + n % 8 * 250}" y="${50 + Math.floor(n / 8) * 190}"><mutation elseif="1" else="1"></mutation><value name="IF_VALUE"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="ELSEIF_VALUE0"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value></block>`,
];

const roots = [];
for (let i = 0; i < requested; i++) roots.push(patterns[i % patterns.length](i));
const projectXml = `<xml xmlns="https://developers.google.com/blockly/xml">\n  <variables>${variableIds.map((id, i) => `<variable id="${id}">${variableNames[i]}</variable>`).join('')}</variables>\n  <block type="cpp_main" x="40" y="35"></block>\n  ${roots.join('\n  ')}\n</xml>\n`;
const variableRef = (index) => `<block type="variables_get"><field name="VAR" id="${variableIds[index % variableIds.length]}">${variableNames[index % variableNames.length]}</field></block>`;
const nestedSegment = (n, next = '') => `<block type="controls_if"><mutation elseif="1" else="1"></mutation><value name="IF0"><block type="logic_compare"><field name="OP">LT</field><value name="A">${variableRef(n)}</value><value name="B"><shadow type="math_number"><field name="NUM">${n % 97 + 1}</field></shadow></value></block></value><statement name="DO0"><block type="if_block"><mutation elseif="1" else="1"></mutation><value name="IF_VALUE"><block type="logic_compare"><field name="OP">GTE</field><value name="A"><block type="math_number_property"><mutation divisor_input="true"></mutation><field name="PROPERTY">DIVISIBLE_BY</field><value name="NUMBER_TO_CHECK">${variableRef(n + 1)}</value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">${n % 5 + 2}</field></shadow></value></block></value><value name="B"><shadow type="math_number"><field name="NUM">${n % 13}</field></shadow></value></block></value><statement name="IF_DO"><block type="switch_block"><mutation cases="2" default="1"></mutation><value name="SWITCH_VALUE">${variableRef(n + 2)}</value><value name="CASE_VALUE0"><shadow type="math_number"><field name="NUM">${n % 4}</field></shadow></value><statement name="CASE_DO0"><block type="cout_block"><field name="ENDL_OPTION">endl</field><value name="INPUT"><block type="text_join"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><shadow type="text"><field name="TEXT">value-${n}-${i}</field></shadow></value>`).join('')}</block></value><next><block type="cout_block"><field name="ENDL_OPTION"></field><value name="INPUT"><block type="string_generic"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><shadow type="text"><field name="TEXT">part-${n}-${i}</field></shadow></value>`).join('')}</block></value></block></next></block></statement></block></statement></block></statement>${next}</block>`;
const textHeavySegment = (n, next = '') => `<block type="cout_block"><field name="ENDL_OPTION">endl</field><value name="INPUT"><block type="string_generic"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><block type="text_join"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, j) => `<value name="ADD${j}"><shadow type="text"><field name="TEXT">text-${n}-${i}-${j}</field></shadow></value>`).join('')}</block></value>`).join('')}</block></value>${next}</block>`;
const segmentsPerLoop = Math.max(4, Math.ceil(requested / 40));
const makeLoop = (depth, segmentBuilder) => {
  let body = depth < 7 ? makeLoop(depth + 1, segmentBuilder) : '';
  for (let i = segmentsPerLoop - 1; i >= 0; i--) body = segmentBuilder(depth * segmentsPerLoop + i, body ? `<next>${body}</next>` : '');
  const closedBody = body;
  return `<block type="for_block"><value name="init"><block type="math_number"><field name="NUMBER">0</field></block></value><value name="condition"><block type="logic_compare"><field name="OP">LT</field><value name="A">${variableRef(depth)}</value><value name="B"><shadow type="math_number"><field name="NUM">${segmentsPerLoop}</field></shadow></value></block></value><value name="iter"><block type="var_cal"><field name="OPERATOR">ADD_EQUALS</field><value name="A">${variableRef(depth)}</value><value name="B"><shadow type="math_number"><field name="NUMBER">1</field></shadow></value></block></value><statement name="DO">${closedBody}</statement></block>`;
};
const makeNestedProject = (segmentBuilder) => `<xml xmlns="https://developers.google.com/blockly/xml">\n  <variables>${variableIds.map((id, i) => `<variable id="${id}">${variableNames[i]}</variable>`).join('')}</variables>\n  <block type="cpp_main" x="40" y="35"><statement name="BODY">${makeLoop(0, segmentBuilder)}</statement></block>\n</xml>\n`;
const nestedProjectXml = makeNestedProject(nestedSegment);
const textHeavyProjectXml = makeNestedProject(textHeavySegment);
const mixedProjectXml = makeNestedProject((n, next) => n % 2 ? nestedSegment(n, next) : textHeavySegment(n, next));

const backpackEntries = [
  { id: 'synthetic-if-branches', type: 'controls_if', label: '合成舊版 if 分支', xml: `<block xmlns="https://developers.google.com/blockly/xml" type="controls_if"><mutation elseif="2" else="1"></mutation><value name="IF0"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="IF1"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value><value name="IF2"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value></block>` },
  { id: 'synthetic-switch', type: 'switch_block', label: '合成舊版 switch', xml: `<block xmlns="https://developers.google.com/blockly/xml" type="switch_block"><mutation cases="3" default="1"></mutation><value name="SWITCH_VALUE"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>` },
  { id: 'synthetic-text-join', type: 'text_join', label: '合成四段文字串接', xml: `<block xmlns="https://developers.google.com/blockly/xml" type="text_join"><mutation items="4"></mutation>${Array.from({ length: 4 }, (_, i) => `<value name="ADD${i}"><shadow type="text"><field name="TEXT">saved-${i}</field></shadow></value>`).join('')}</block>` },
  { id: 'synthetic-variadic', type: 'string_generic', label: '合成多項字串方塊', xml: `<block xmlns="https://developers.google.com/blockly/xml" type="string_generic"><mutation items="5"></mutation>${Array.from({ length: 5 }, (_, i) => `<value name="ADD${i}"><shadow type="string"><field name="TEXT">saved-${i}</field></shadow></value>`).join('')}</block>` },
  { id: 'synthetic-variable', type: 'variables_get', label: '合成變數參照', xml: `<block xmlns="https://developers.google.com/blockly/xml" type="variables_get"><field name="VAR" id="synthetic-count">count</field></block>` },
];

writeFileSync(resolve(outputDir, 'legacy-large-synthetic-project.xml'), projectXml);
writeFileSync(resolve(outputDir, 'legacy-large-nested-synthetic-project.xml'), nestedProjectXml);
writeFileSync(resolve(outputDir, 'legacy-large-text-heavy-nested-project.xml'), textHeavyProjectXml);
writeFileSync(resolve(outputDir, 'legacy-large-mixed-nested-project.xml'), mixedProjectXml);
writeFileSync(resolve(outputDir, 'legacy-large-synthetic-backpack.json'), `${JSON.stringify({ version: 1, synthetic: true, items: backpackEntries }, null, 2)}\n`);
console.info(`Generated ${requested + 1} multi-root fixtures and a nested control-flow project with 3 variable models and ${backpackEntries.length} backpack samples.`);
