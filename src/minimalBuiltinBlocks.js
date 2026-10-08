export const MINIMAL_BUILTIN_TYPES = new Set([
  'text_print',
  'text',
  'math_number',
  'logic_boolean',
  'controls_repeat_ext',
  'controls_whileUntil',
  'controls_for',
  'variables_set',
]);

const MINIMAL_BUILTIN_DEFINITIONS = [
  {
    type: 'text_print',
    message0: '輸出 %1',
    args0: [{ type: 'input_value', name: 'TEXT' }],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '將文字或運算結果輸出至主控台',
  },
  {
    type: 'text',
    message0: '%1',
    args0: [{ type: 'field_input', name: 'TEXT', text: '' }],
    output: 'String',
    colour: 25,
    tooltip: '文字常數',
  },
  {
    type: 'math_number',
    message0: '%1',
    args0: [{ type: 'field_number', name: 'NUM', value: 0 }],
    output: 'Number',
    colour: 230,
    tooltip: '數值常數',
  },
  {
    type: 'logic_boolean',
    message0: '%1',
    args0: [{ type: 'field_dropdown', name: 'BOOL', options: [['真', 'TRUE'], ['假', 'FALSE']] }],
    output: 'Boolean',
    colour: 210,
    tooltip: '真假值',
  },
  {
    type: 'controls_repeat_ext',
    message0: '重複 %1 次',
    args0: [{ type: 'input_value', name: 'TIMES', check: 'Number' }],
    message1: '執行 %1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: '重複執行指定次數',
  },
  {
    type: 'controls_whileUntil',
    message0: '當 %1 時',
    args0: [{ type: 'field_dropdown', name: 'MODE', options: [['條件成立', 'WHILE'], ['條件不成立', 'UNTIL']] }],
    message1: '%1',
    args1: [{ type: 'input_value', name: 'BOOL', check: 'Boolean' }],
    message2: '執行 %1',
    args2: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: '以條件控制迴圈',
  },
  {
    type: 'controls_for',
    message0: '計數 %1 從 %2 到 %3 每次增加 %4',
    args0: [
      { type: 'field_input', name: 'VAR', text: 'i' },
      { type: 'input_value', name: 'FROM', check: 'Number' },
      { type: 'input_value', name: 'TO', check: 'Number' },
      { type: 'input_value', name: 'BY', check: 'Number' },
    ],
    message1: '執行 %1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: '設定初值、終值與遞增值',
  },
  {
    type: 'variables_set',
    message0: '設定變數 %1 為 %2',
    args0: [
      { type: 'field_input', name: 'VAR', text: 'value' },
      { type: 'input_value', name: 'VALUE' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '將值指定給變數',
  },
];

export function registerMinimalBuiltinBlocks(Blockly) {
  const missing = MINIMAL_BUILTIN_DEFINITIONS.filter((definition) => !Blockly.Blocks[definition.type]);
  if (missing.length) Blockly.defineBlocksWithJsonArray(missing);
}

export function xmlNeedsFullBuiltinPack(xml, Blockly) {
  const elements = [...xml.querySelectorAll('block[type], shadow[type]')];
  if (xml.matches?.('block[type], shadow[type]')) elements.unshift(xml);
  return elements
    .some((element) => {
      const type = element.getAttribute('type');
      return !MINIMAL_BUILTIN_TYPES.has(type) && !Blockly.Blocks[type];
    });
}

export async function ensureBuiltinDefinitionsForXml(xml, Blockly, loadFullBuiltinPack, onPhase) {
  const scanStartedAt = performance.now();
  const needsFullPack = xmlNeedsFullBuiltinPack(xml, Blockly);
  onPhase?.('legacy-builtin-scan', performance.now() - scanStartedAt, { needsFullPack });
  if (!needsFullPack) return false;
  const loadStartedAt = performance.now();
  await loadFullBuiltinPack();
  onPhase?.('full-builtin-load', performance.now() - loadStartedAt);
  return true;
}
