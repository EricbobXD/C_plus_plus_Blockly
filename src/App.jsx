import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { legacyLibraryBlockTypes, legacyToolbox, registerLegacyBlocks } from './legacyBlocks';
import { SEARCHABLE_BLOCKS } from './searchCatalog';
import { createSearchEngine, normalizeSearchText } from './searchEngine';
import { ensureBuiltinDefinitionsForXml, MINIMAL_BUILTIN_TYPES, registerMinimalBuiltinBlocks, xmlNeedsFullBuiltinPack } from './minimalBuiltinBlocks';
import { registerBuiltinMutatorCompatibility } from './builtinMutatorCompatibility';
import './blockly.css';

let Blockly;
let cpp;
let theme;
let darkTheme;

let blocklyLocalePromise;
let blocklyLocaleName;
const loadBlocklyLocale = (language = 'tw') => {
  const localeName = language === 'en' ? 'en' : 'zh-hant';
  if (!blocklyLocalePromise || blocklyLocaleName !== localeName) {
    blocklyLocaleName = localeName;
    blocklyLocalePromise = (localeName === 'en' ? import('blockly/msg/en') : import('blockly/msg/zh-hant')).then((locale) => {
      Blockly.setLocale(locale);
      return locale;
    }).catch((error) => {
      blocklyLocalePromise = undefined;
      blocklyLocaleName = undefined;
      throw error;
    });
  }
  return blocklyLocalePromise;
};
let fullBuiltinPackPromise;
let fullBuiltinPackLoaded = false;
const loadFullBuiltinPack = () => {
  if (!fullBuiltinPackPromise) {
    const startedAt = performance.now();
    MINIMAL_BUILTIN_TYPES.forEach((type) => { delete Blockly.Blocks[type]; });
    fullBuiltinPackPromise = loadBlocklyLocale()
      .then(() => import('blockly/blocks'))
      .then((standardBlocks) => {
        Object.assign(Blockly.Blocks, ...Object.values(standardBlocks).map((group) => group?.blocks ?? group));
        registerBuiltinMutatorCompatibility(Blockly);
        // App-owned compatibility blocks are part of the minimal registry,
        // but are not shipped by Blockly's standard builtin pack.
        registerMinimalBuiltinBlocks(Blockly);
        fullBuiltinPackLoaded = true;
        if (import.meta.env.DEV) console.info('[blocksmith-perf] full-block-pack-loaded ' + JSON.stringify({ durationMs: Math.round(performance.now() - startedAt) }));
        return true;
      })
      .catch((error) => {
        registerMinimalBuiltinBlocks(Blockly);
        fullBuiltinPackPromise = undefined;
        throw error;
      });
  }
  return fullBuiltinPackPromise;
};

const blocklyFieldCss = `
  .blocklyLiteralText .blocklyEditableField > text,
  .blocklyLiteralText .blocklyNonEditableField > text { fill: #202020 !important; }
  .blocklyLiteralText .blocklyEditableField > rect { fill: #ffffff !important; }
  .blocklyDarkMode .blocklyEditableField > text,
  .blocklyDarkMode .blocklyEditableField > g > text { fill: #f5f5f5 !important; }
  .blocklyDarkMode .blocklyEditableField > rect { fill: #303030 !important; }
  .blocklyTextInputField .blocklyFieldText { fill: #17202a !important; }
  .blocklyTextInputField .blocklyFieldRect { fill: #ffffff !important; }
  .blocklyDarkMode .blocklyTextInputField .blocklyFieldText { fill: #f5f7fa !important; }
  .blocklyDarkMode .blocklyTextInputField .blocklyFieldRect { fill: #303640 !important; }
  .blocklyDarkMode .math_number .blocklyEditableField > text { fill: #202020 !important; }
  .blocklyDarkMode .math_number .blocklyEditableField > rect { fill: #ffffff !important; }
  .blocklyDarkMode .blocklyLiteralText .blocklyEditableField > text { fill: #202020 !important; }
  .blocklyDarkMode .blocklyLiteralText .blocklyEditableField > rect { fill: #ffffff !important; }
`;

const STORAGE_KEY = 'blocksmith-project-v2';
const BACKUP_KEY = 'blocksmith-project-backup-v2';
const LEGACY_STORAGE_KEY = 'blocksmith-xml';
const RECENT_SEARCHES_KEY = 'blocksmith-recent-searches-v1';
const FREQUENT_BLOCKS_KEY = 'blocksmith-frequent-blocks-v1';
const FAVORITE_BLOCKS_KEY = 'blocksmith-favorite-blocks-v1';
const RECENT_BLOCK_TYPES_KEY = 'blocksmith-recent-block-types-v1';
const LAYOUT_PRESETS_KEY = 'blocksmith-layout-presets-v1';
const MINIMAP_VISIBLE_KEY = 'blocksmith-minimap-visible-v2';
const PROJECT_VERSIONS_KEY = 'blocksmith-project-versions-v1';
const PROJECT_TABS_KEY = 'blocksmith-project-tabs-v1';
const ACTIVE_PROJECT_TAB_KEY = 'blocksmith-active-project-tab-v1';
const SEARCH_INSIGHTS_KEY = 'blocksmith-search-insights-v1';
const MAX_TRACKED_SEARCH_QUERIES = 100;
const safeIdentifier = (value) => String(value || '').replace(/\W/g, '_') || 'value';
const normalizePanelSizes = (sizes) => {
  const defaults = { code: 50, input: 20, output: 30 };
  if (!sizes || typeof sizes !== 'object') return defaults;
  const code = Number(sizes.code), input = Number(sizes.input), output = Number(sizes.output);
  const total = code + input + output;
  if (![code, input, output].every(Number.isFinite) || Math.abs(total - 100) > 2 || code < 0 || code > 100 || input < 0 || input > 100 || output < 0 || output > 100) return defaults;
  return { code: code * 100 / total, input: input * 100 / total, output: output * 100 / total };
};
const isHexColor = (value) => /^#[\da-f]{6}$/i.test(String(value || ''));
const ACCENT_COPY_PRESETS = [
  { nameTw: '蒂芬妮綠', nameEn: 'Tiffany', hex: '#0abab5' },
  { nameTw: '天藍', nameEn: 'Sky', hex: '#82baff' },
  { nameTw: '草綠', nameEn: 'Leaf', hex: '#83c99c' },
  { nameTw: '暖橘', nameEn: 'Amber', hex: '#f2b36d' },
  { nameTw: '紫藤', nameEn: 'Violet', hex: '#c28cf4' },
  { nameTw: '珊瑚紅', nameEn: 'Coral red', hex: '#ef5b65' },
];
const accentHexForTheme = (accent, themeMode) => {
  if (isHexColor(accent)) return accent.toLowerCase();
  const colors = themeMode === 'dark'
    ? { green: '#6cb7c2', white: '#f2f4f3', blue: '#82baff' }
    : { green: '#2d8494', orange: '#c55a1a', blue: '#2868b2' };
  return colors[accent] || colors.green;
};
const readableInkForAccent = (hex) => {
  const parts = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
  const luminance = parts.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const whiteContrast = 1.05 / (luminance + 0.05);
  const darkContrast = (luminance + 0.05) / 0.06;
  return whiteContrast >= darkContrast ? '#fff' : '#000';
};

const searchableByType = new Map(SEARCHABLE_BLOCKS.map((item) => [item.type, item]));
const searchEngine = createSearchEngine(SEARCHABLE_BLOCKS);
const searchBlocks = searchEngine.search;
const highlightSearchText = (text, query, extraTerms = []) => {
  const terms = [...new Set([...normalizeSearchText(query).split(/\s+/).filter(Boolean), ...extraTerms])]
    .sort((a, b) => b.length - a.length);
  if (!terms.length) return text;
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return text.split(pattern).map((part, index) => (
    terms.some((term) => part.toLocaleLowerCase('zh-Hant') === term)
      ? <mark className="search-hit" key={`${index}-${part}`}>{part}</mark>
      : part
  ));
};
function configureBlockly(core) {
  Blockly = core;
  Blockly.Css.register(blocklyFieldCss);
  Blockly.Css.register(toolboxStyle);
  Blockly.defineBlocksWithJsonArray([
  {
    type: 'cpp_include',
    message0: '引入標頭檔 %1',
    args0: [{ type: 'field_dropdown', name: 'LIB', options: [['iostream', 'iostream'], ['bits/stdc++.h', 'bits/stdc++.h'], ['string', 'string'], ['vector', 'vector'], ['cmath', 'cmath']] }],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '引入 C++ 標準函式庫',
  },
  {
    type: 'cpp_cin',
    message0: '讀取輸入到變數 %1',
    args0: [{ type: 'field_input', name: 'VAR', text: 'value' }],
    previousStatement: null,
    nextStatement: null,
    style: 'text_blocks',
    tooltip: '從使用者讀取資料；變數名稱只能包含英文字母、數字與底線，且不可用數字開頭。',
  },
  {
    type: 'cpp_main',
    message0: '函式庫',
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'LIBS', check: 'LIBRARY' }],
    message2: '主程式　int main()',
    message3: '%1',
    args3: [{ type: 'input_statement', name: 'BODY', check: 'STATEMENT' }],
    colour: 210,
    tooltip: '固定程式框架：上方放函式庫，下方放主程式方塊',
  },
]);

cpp = new Blockly.Generator('C++');
cpp.ORDER_ATOMIC = 0;
cpp.ORDER_NONE = 99;
const variableFieldName = (block) => safeIdentifier(block.getField('VAR')?.getText() || block.getFieldValue('VAR') || 'value');
cpp.scrub_ = (block, code) => {
  const next = block.nextConnection?.targetBlock();
  return code + (next ? cpp.blockToCode(next) : '');
};
cpp.forBlock.text_print = (block) => `std::cout << ${cpp.valueToCode(block, 'TEXT', cpp.ORDER_NONE)} << std::endl;\n`;
cpp.forBlock.cpp_include = (block) => `#include <${block.getFieldValue('LIB')}>\n`;
cpp.forBlock.cpp_cin = (block) => `std::cin >> ${safeIdentifier(block.getFieldValue('VAR'))};\n`;
cpp.forBlock.cpp_main = (block) => {
  let libraries = cpp.statementToCode(block, 'LIBS').replace(/^  /gm, '');
  const allBlocks = block.workspace.getAllBlocks(false);
  const definitionTypes = new Set(['define_function', 'define_function_void', 'define_operator', 'define_struct', 'define_class']);
  const definitions = [];
  for (let current = block.getInputTargetBlock('BODY'); current; current = current.getNextBlock()) {
    if (!definitionTypes.has(current.type)) continue;
    const generator = cpp.forBlock[current.type];
    const generated = generator?.(current, cpp);
    if (typeof generated === 'string') definitions.push(generated);
    else if (Array.isArray(generated)) definitions.push(generated[0]);
  }
  const inputVariables = [...new Set(allBlocks.filter((child) => child.type === 'cpp_cin').map((child) => safeIdentifier(child.getFieldValue('VAR'))))];
  const requiredHeaders = new Map([
    ['<cmath>', ['math_calculate','math_sqrt','math_abs','math_sine','math_cosine','math_tangent','math_ceil','math_floor']],
    ['<cstdlib>', ['math_random','new_block']], ['<algorithm>', ['sort','max','min','find','binary_search','lower_bound','upper_bound','reverse','sort_container']],
    ['<functional>', ['bind','placeholder']],
    ['<climits>', ['char_bit','schar_min','schar_max','uchar_min','uchar_max','char_min','char_max','int_min','int_max','uint_max','llong_min','llong_max','ullong_max','mb_len_max']],
    ['<iomanip>', ['setbase','setprecision','setw','setfill']], ['<sstream>', ['define_sstream','sstream_<<','sstream_>>']],
    ['<vector>', ['define_vector']], ['<set>', ['define_set']], ['<map>', ['define_map']], ['<utility>', ['define_pair']],
    ['<stack>', ['define_stack']], ['<queue>', ['define_queue','define_priority_queue']], ['<deque>', ['define_deque']], ['<bitset>', ['define_bitset']],
  ]);
  const dynamicHeaderPrefixes = {
    '<vector>': ['named_define_Vector_'], '<deque>': ['named_define_Deque_'], '<set>': ['named_define_Set_', 'named_define_Multiset_', 'named_define_Flat_set_'], '<unordered_set>': ['named_define_Unordered_set_'],
    '<map>': ['named_define_Map_', 'named_define_Multimap_'], '<unordered_map>': ['named_define_Unordered_map_'], '<utility>': ['named_define_Pair_'],
    '<stack>': ['named_define_Stack_'], '<queue>': ['named_define_Queue_', 'named_define_Priority_Queue_'], '<bitset>': ['named_define_Bitset_'],
  };
  for (const [header, types] of requiredHeaders) if (allBlocks.some((child) => types.includes(child.type) || dynamicHeaderPrefixes[header]?.some((prefix) => child.type.startsWith(prefix))) && !libraries.includes(`#include ${header}`)) libraries = `#include ${header}\n${libraries}`;
  const needsString = inputVariables.length > 0 || allBlocks.some((child) => child.type === 'tab');
  if (needsString && !libraries.includes('#include <string>')) libraries = `#include <string>\n${libraries}`;
  const savedDefinitionGenerators = new Map([...definitionTypes].map((type) => [type, cpp.forBlock[type]]));
  for (const type of definitionTypes) if (cpp.forBlock[type]) cpp.forBlock[type] = () => '';
  let statements;
  try { statements = cpp.statementToCode(block, 'BODY'); }
  finally { for (const [type, generator] of savedDefinitionGenerators) cpp.forBlock[type] = generator; }
  const declarations = inputVariables.map((variable) => `  std::string ${variable};\n`).join('');
  return `${libraries}${libraries ? '\n' : ''}${definitions.join('\n')}${definitions.length ? '\n\n' : ''}int main() {\n${declarations}${statements}  return 0;\n}\n`;
};
cpp.forBlock.text = (block) => [JSON.stringify(block.getFieldValue('TEXT')), cpp.ORDER_ATOMIC];
cpp.forBlock.math_number = (block) => [block.getFieldValue('NUM'), cpp.ORDER_ATOMIC];
cpp.forBlock.logic_boolean = (block) => [block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false', cpp.ORDER_ATOMIC];
cpp.forBlock.logic_compare = (block) => {
  const operators = { EQ: '==', NEQ: '!=', LT: '<', LTE: '<=', GT: '>', GTE: '>=' };
  return [`${cpp.valueToCode(block, 'A', cpp.ORDER_NONE)} ${operators[block.getFieldValue('OP')]} ${cpp.valueToCode(block, 'B', cpp.ORDER_NONE)}`, 5];
};
cpp.forBlock.logic_operation = (block) => [
  `${cpp.valueToCode(block, 'A', cpp.ORDER_NONE)} ${block.getFieldValue('OP') === 'AND' ? '&&' : '||'} ${cpp.valueToCode(block, 'B', cpp.ORDER_NONE)}`,
  4,
];
cpp.forBlock.logic_negate = (block) => [`!(${cpp.valueToCode(block, 'BOOL', cpp.ORDER_NONE)})`, 3];
cpp.forBlock.math_arithmetic = (block) => {
  const operators = { ADD: '+', MINUS: '-', MULTIPLY: '*', DIVIDE: '/', POWER: '^' };
  return [`${cpp.valueToCode(block, 'A', cpp.ORDER_NONE)} ${operators[block.getFieldValue('OP')]} ${cpp.valueToCode(block, 'B', cpp.ORDER_NONE)}`, 5];
};
cpp.forBlock.math_modulo = (block) => [`${cpp.valueToCode(block, 'DIVIDEND', cpp.ORDER_NONE)} % ${cpp.valueToCode(block, 'DIVISOR', cpp.ORDER_NONE)}`, 5];
cpp.forBlock.variables_get = (block) => [variableFieldName(block), cpp.ORDER_ATOMIC];
cpp.forBlock.variables_set = (block) => `auto ${variableFieldName(block)} = ${cpp.valueToCode(block, 'VALUE', cpp.ORDER_NONE)};\n`;
cpp.forBlock.controls_if = (block) => {
  let code = `if (${cpp.valueToCode(block, 'IF0', cpp.ORDER_NONE)}) {\n${cpp.statementToCode(block, 'DO0')}}`;
  if (block.getInput('ELSE')) code += ` else {\n${cpp.statementToCode(block, 'ELSE')}}`;
  return `${code}\n`;
};
cpp.forBlock.controls_repeat_ext = (block) => `for (int count = 0; count < ${cpp.valueToCode(block, 'TIMES', cpp.ORDER_NONE)}; ++count) {\n${cpp.statementToCode(block, 'DO')}}\n`;
cpp.forBlock.controls_whileUntil = (block) => {
  const condition = cpp.valueToCode(block, 'BOOL', cpp.ORDER_NONE);
  return `${block.getFieldValue('MODE') === 'UNTIL' ? `while (!(${condition}))` : `while (${condition})`} {\n${cpp.statementToCode(block, 'DO')}}\n`;
};
cpp.forBlock.controls_for = (block) => {
  const variable = block.getFieldValue('VAR');
  return `for (int ${variable} = ${cpp.valueToCode(block, 'FROM', cpp.ORDER_NONE)}; ${variable} <= ${cpp.valueToCode(block, 'TO', cpp.ORDER_NONE)}; ${variable} += ${cpp.valueToCode(block, 'BY', cpp.ORDER_NONE)}) {\n${cpp.statementToCode(block, 'DO')}}\n`;
};
cpp.forBlock.text_join = (block) => {
  const values = Array.from({ length: block.itemCount_ }, (_, i) => cpp.valueToCode(block, `ADD${i}`, cpp.ORDER_NONE));
  return values.some((value) => !value) ? ['', cpp.ORDER_ATOMIC] : [`(${values.join(' + ')})`, cpp.ORDER_ATOMIC];
};
cpp.forBlock.text_length = (block) => [`static_cast<int>((${cpp.valueToCode(block, 'VALUE', cpp.ORDER_NONE)}).length())`, cpp.ORDER_ATOMIC];
registerLegacyBlocks(cpp, Blockly);

  theme = Blockly.Theme.defineTheme('blocksmith', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#fff', toolboxBackgroundColour: '#fbfcfa', toolboxForegroundColour: '#405049',
      flyoutBackgroundColour: '#f7f9f5', flyoutForegroundColour: '#405049', flyoutOpacity: 1,
      scrollbarColour: '#ccd5cd', insertionMarkerColour: '#176b53', insertionMarkerOpacity: 0.25,
      markerColour: '#176b53', cursorColour: '#176b53',
    },
  });
  darkTheme = Blockly.Theme.defineTheme('blocksmith-dark', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#252a32', toolboxBackgroundColour: '#1a1e25', toolboxForegroundColour: '#d4d7df',
      flyoutBackgroundColour: '#20252d', flyoutForegroundColour: '#e9ebef', flyoutOpacity: 1,
      scrollbarColour: '#747b88', insertionMarkerColour: '#83c99c', insertionMarkerOpacity: 0.28,
      markerColour: '#83c99c', cursorColour: '#a4dcb5',
    },
  });
}

let blocklyCorePromise;
const loadBlocklyCore = () => {
  if (!blocklyCorePromise) {
    const startedAt = performance.now();
    if (import.meta.env.DEV) {
      performance.mark('blocksmith-core-import-start');
      const loadedBeforeCore = performance.getEntriesByType('resource')
        .filter((entry) => /\.(?:js|mjs)(?:\?|$)/i.test(entry.name))
        .reduce((total, entry) => total + (entry.transferSize || 0), 0);
      console.info('[blocksmith-perf] before-core-import ' + JSON.stringify({ loadedScriptTransferBytes: loadedBeforeCore }));
    }
    blocklyCorePromise = import('blockly/core').then((core) => {
      Blockly = core;
      configureBlockly(Blockly);
      if (import.meta.env.DEV) {
        performance.mark('blocksmith-core-import-ready');
        console.info('[blocksmith-perf] core-loaded ' + JSON.stringify({ durationMs: Math.round(performance.now() - startedAt) }));
      }
      return Blockly;
    }).catch((error) => {
      blocklyCorePromise = undefined;
      throw error;
    });
  }
  return blocklyCorePromise;
};

const toolboxStyle = `
  .blocklyToolboxDiv { background: var(--toolbox) !important; border-right: 1px solid var(--line) !important; }
  .blocklyTreeRow { border-radius: 7px !important; }
  .blocklyTreeLabel { color: var(--toolbox-text) !important; }
  .blocklyTreeSelected { background: var(--accent-soft) !important; }
  .blocklyFlyoutBackground { fill: var(--flyout, var(--toolbox)) !important; }
  .blocklyDarkMode .blocklyText { fill: #f2f5f3 !important; }
`;
const toolboxCategory = (name, contents, colour) => ({ kind: 'category', name, colour, contents });
const countToolboxCategories = (items = []) => items.reduce((count, item) => count + (item.kind === 'category' ? 1 : 0) + countToolboxCategories(item.contents), 0);
function measureToolboxBuildInternals(Blockly) {
  const metrics = new Map();
  const originals = [];
  const stack = [];
  const targets = [
    [Blockly.WorkspaceSvg?.prototype, 'createDom', 'workspace-svg-create-dom'],
    [Blockly.WorkspaceSvg?.prototype, 'setMetricsManager', 'workspace-metrics-manager'],
    [Blockly.WorkspaceSvg?.prototype, 'resize', 'workspace-resize'],
    [Blockly.WorkspaceSvg?.prototype, 'resizeContents', 'workspace-resize-contents'],
    [Blockly.Toolbox?.prototype, 'init', 'toolbox-init'],
    [Blockly.Toolbox?.prototype, 'render', 'toolbox-render'],
    [Blockly.Toolbox?.prototype, 'renderContents_', 'toolbox-render-contents'],
    [Blockly.Toolbox?.prototype, 'createDom_', 'toolbox-create-dom'],
    [Blockly.ToolboxCategory?.prototype, 'init', 'category-init'],
    [Blockly.ToolboxCategory?.prototype, 'parseContents_', 'category-parse-contents'],
    [Blockly.ToolboxCategory?.prototype, 'createDom_', 'category-create-dom'],
    [Blockly.CollapsibleToolboxCategory?.prototype, 'parseContents_', 'collapsible-parse-contents'],
    [Blockly.CollapsibleToolboxCategory?.prototype, 'createSubCategoriesDom_', 'category-create-child-dom'],
    [Blockly.Flyout?.prototype, 'createDom', 'flyout-create-dom'],
    [Blockly.Flyout?.prototype, 'init', 'flyout-init'],
    [Blockly.VerticalFlyout?.prototype, 'createDom', 'vertical-flyout-create-dom'],
    [Blockly.Trashcan?.prototype, 'createDom', 'trashcan-create-dom'],
    [Blockly.Trashcan?.prototype, 'init', 'trashcan-init'],
    [Blockly.ZoomControls?.prototype, 'createDom', 'zoom-controls-create-dom'],
    [Blockly.ZoomControls?.prototype, 'init', 'zoom-controls-init'],
    [Blockly.Grid, 'createDom', 'grid-create-dom'],
    [Blockly.zelos?.Renderer?.prototype, 'init', 'zelos-renderer-init'],
    [Blockly.zelos?.Renderer?.prototype, 'makeConstants_', 'zelos-renderer-make-constants'],
    [Blockly.zelos?.Renderer?.prototype, 'createDom', 'zelos-renderer-create-dom'],
    [Blockly.zelos?.ConstantProvider?.prototype, 'init', 'zelos-constants-init'],
    [Blockly.zelos?.ConstantProvider?.prototype, 'createDom', 'zelos-constants-create-dom'],
    [Blockly.ConnectionDB, 'init', 'connection-databases-init'],
    [Blockly.ScrollbarPair?.prototype, 'resize', 'scrollbar-pair-resize'],
    [Blockly.Options, 'parseMoveOptions', 'options-parse-move'],
    [Blockly.Options, 'parseZoomOptions', 'options-parse-zoom'],
    [Blockly.Options, 'parseGridOptions', 'options-parse-grid'],
    [Blockly.Options, 'parseThemeOptions', 'options-parse-theme'],
  ];
  for (const [prototype, method, name] of targets) {
    if (!prototype || typeof prototype[method] !== 'function') continue;
    const original = prototype[method];
    originals.push([prototype, method, original]);
    prototype[method] = function (...args) {
      const frame = { name, startedAt: performance.now(), childMs: 0 };
      stack.push(frame);
      try {
        return original.apply(this, args);
      } finally {
        const durationMs = performance.now() - frame.startedAt;
        const item = metrics.get(name) || { calls: 0, totalMs: 0, exclusiveMs: 0 };
        item.calls += 1;
        item.totalMs += durationMs;
        item.exclusiveMs += Math.max(0, durationMs - frame.childMs);
        metrics.set(name, item);
        stack.pop();
        if (stack.length) stack[stack.length - 1].childMs += durationMs;
      }
    };
  }
  return () => {
    for (const [prototype, method, original] of originals.reverse()) prototype[method] = original;
    return [...metrics.entries()].map(([name, item]) => ({
      name,
      calls: item.calls,
      totalMs: Math.round(item.totalMs * 10) / 10,
      exclusiveMs: Math.round(item.exclusiveMs * 10) / 10,
    }));
  };
}

function measureXmlRestoreInternals(Blockly, workspace) {
  const metrics = new Map();
  const originals = [];
  const stack = [];
  const targets = [
    [Blockly.BlockSvg?.prototype, 'initSvg', 'block-init-svg'],
    [Blockly.BlockSvg?.prototype, 'render', 'block-render'],
    [Blockly.zelos?.Renderer?.prototype, 'render', 'renderer-block-render'],
    [workspace, 'setResizesEnabled', 'workspace-set-resizes-enabled'],
    [workspace, 'resizeContents', 'workspace-resize-contents'],
    [workspace, 'resize', 'workspace-resize'],
    [Element.prototype, 'getBoundingClientRect', 'dom-get-bounding-client-rect'],
    [window.SVGGraphicsElement?.prototype, 'getBBox', 'svg-get-bbox'],
    [window.SVGElement?.prototype, 'getBBox', 'svg-element-get-bbox'],
  ];
  for (const [prototype, method, name] of targets) {
    if (!prototype || typeof prototype[method] !== 'function') continue;
    const original = prototype[method];
    originals.push([prototype, method, original]);
    prototype[method] = function (...args) {
      const frame = { startedAt: performance.now(), childMs: 0 };
      stack.push(frame);
      try {
        return original.apply(this, args);
      } finally {
        const durationMs = performance.now() - frame.startedAt;
        const item = metrics.get(name) || { calls: 0, totalMs: 0, exclusiveMs: 0 };
        item.calls += 1;
        item.totalMs += durationMs;
        item.exclusiveMs += Math.max(0, durationMs - frame.childMs);
        metrics.set(name, item);
        stack.pop();
        if (stack.length) stack[stack.length - 1].childMs += durationMs;
      }
    };
  }
  const getComputedStyle = window.getComputedStyle;
  if (typeof getComputedStyle === 'function') {
    window.getComputedStyle = function (...args) {
      const startedAt = performance.now();
      try {
        return getComputedStyle.apply(this, args);
      } finally {
        const durationMs = performance.now() - startedAt;
        const item = metrics.get('dom-get-computed-style') || { calls: 0, totalMs: 0, exclusiveMs: 0 };
        item.calls += 1;
        item.totalMs += durationMs;
        item.exclusiveMs += durationMs;
        metrics.set('dom-get-computed-style', item);
      }
    };
  }
  return () => {
    for (const [prototype, method, original] of originals.reverse()) prototype[method] = original;
    if (getComputedStyle) window.getComputedStyle = getComputedStyle;
    return [...metrics.entries()].map(([name, item]) => ({
      name,
      calls: item.calls,
      totalMs: Math.round(item.totalMs * 10) / 10,
      exclusiveMs: Math.round(item.exclusiveMs * 10) / 10,
    }));
  };
}

function reportWorkspaceCenterTiming(source, workspace, block, resize = true) {
  if (!import.meta.env.DEV) {
    if (resize) Blockly.svgResize(workspace);
    if (block) workspace.centerOnBlock(block.id, true);
    return;
  }
  const beforePosition = { x: workspace.scrollX, y: workspace.scrollY, scale: workspace.scale };
  const startedAt = performance.now();
  let resizeMs = 0;
  if (resize) {
    const resizeStartedAt = performance.now();
    Blockly.svgResize(workspace);
    resizeMs = performance.now() - resizeStartedAt;
  }
  const centerStartedAt = performance.now();
  if (block) workspace.centerOnBlock(block.id, true);
  const afterPosition = { x: workspace.scrollX, y: workspace.scrollY, scale: workspace.scale };
  console.info('[blocksmith-perf] workspace-center ' + JSON.stringify({
    source,
    resizeMs: Math.round(resizeMs * 10) / 10,
    centerMs: Math.round((performance.now() - centerStartedAt) * 10) / 10,
    totalMs: Math.round((performance.now() - startedAt) * 10) / 10,
    beforePosition,
    afterPosition,
    positionChanged: Math.abs(beforePosition.x - afterPosition.x) > 0.5 || Math.abs(beforePosition.y - afterPosition.y) > 0.5,
  }));
}
const legacyCategory = (name) => legacyToolbox.find((item) => item.name === name);
const stlCategories = legacyCategory('STL模組').contents;
const stlCategory = (name) => stlCategories.find((item) => item.name === name);
const stlContainers = ['Vector','Deque','Set函式庫','Map函式庫','Pair','Stack','Queue','Priority_queue','Bitset'];
const makeBlockCategory = (name, types, colour) => toolboxCategory(name, types.map((type) => ({ kind: 'block', type })), colour);
const textCategory = legacyCategory('文本');
const namedVariablesCategory = {
  ...legacyCategory('變數/指標/位置'),
  name: '變數宣告與操作',
  contents: [...legacyCategory('變數/指標/位置').contents, { kind: 'block', type: 'def_var' }],
};
const functionCategory = {
  ...legacyCategory('函式/結構/類別'),
  name: '函式與型別',
  contents: [...legacyCategory('函式/結構/類別').contents, { kind: 'block', type: 'define_function_void' }],
};
const streamTypes = new Set(['string_cin','string_cout']);
const advancedDefinitionTypes = new Set(['define_block','define_template','define_typename','define_using','using_namespace_std','define_namespace']);
const usefulTypes = legacyCategory('好用的東西').contents.map((item) => item.type).filter(Boolean);
const ioUsefulTypes = new Set(['boost_ios_sync','boost_cin_cout_tie','cin.eof','define_sstream','sstream_<<','sstream_>>']);
const libraryUsefulTypes = new Set(['setbase','setprecision','setw','setfill','llabs_block','sort_container','bind','placeholder']);
const advancedUsefulTypes = usefulTypes.filter((type) => !ioUsefulTypes.has(type) && !libraryUsefulTypes.has(type) && !['data_type','void','sizeof'].includes(type));
const functionalCategory = { ...stlCategory('functional'), contents: stlCategory('functional').contents.filter((item) => item.type !== 'sort_container') };
const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    toolboxCategory('程式結構', [
      toolboxCategory('標頭檔', [{ kind: 'block', type: 'cpp_include' }], 260),
      functionCategory,
    ], 260),
    toolboxCategory('宣告與型別', [
      legacyCategory('資料型態'), namedVariablesCategory,
    ], 260),
    toolboxCategory('輸入與輸出', [
      legacyCategory('操作'),
      makeBlockCategory('字串串流操作', [...streamTypes], 160),
      stlCategory('sstream'), stlCategory('basic_ios'),
    ], 160),
    toolboxCategory('文字與註解', [
      toolboxCategory('文字與註解', textCategory.contents.filter((item) => !streamTypes.has(item.type)), 25),
    ], 25),
    toolboxCategory('運算', [legacyCategory('運算')], 230),
    toolboxCategory('流程控制', [legacyCategory('判斷'), legacyCategory('迴圈')], 210),
    toolboxCategory('陣列與容器', [legacyCategory('陣列'), ...stlContainers.map(stlCategory)], 260),
    toolboxCategory('演算法', [toolboxCategory('algorithm', [...stlCategory('algorithm').contents, { kind: 'block', type: 'sort_container' }], 205)], 205),
    toolboxCategory('標準函式庫', [stlCategory('iomanip'), stlCategory('climits'), stlCategory('math'), stlCategory('cstdlib')], 160),
    toolboxCategory('進階 C++', [
      makeBlockCategory('進階宣告', [...advancedDefinitionTypes], 260),
      makeBlockCategory('進階工具', advancedUsefulTypes, 260), functionalCategory,
    ], 260),
  ],
};
const toolboxEnglishNames = {
  '程式結構':'Program Structure','標頭檔':'Headers','函式與型別':'Functions & Types','宣告與型別':'Declarations & Types','資料型態':'Data Types','變數宣告與操作':'Variables','變數/指標/位置':'Variables / Pointers','輸入與輸出':'Input & Output','操作':'Input / Output','字串串流操作':'String Streams','文字與註解':'Text & Comments','文本':'Text','運算':'Operators','流程控制':'Control Flow','判斷':'Conditions','迴圈':'Loops','陣列與容器':'Arrays & Containers','陣列':'Arrays','演算法':'Algorithms','標準函式庫':'Standard Library','進階 C++':'Advanced C++','進階宣告':'Advanced Declarations','進階工具':'Advanced Utilities','函式庫':'Libraries','函式/結構/類別':'Functions / Structs / Classes','好用的東西':'Utilities','定義':'Definitions','STL模組':'STL Modules','Set函式庫':'Set Library','Map函式庫':'Map Library','Pair':'Pair','Stack':'Stack','Queue':'Queue','Priority_queue':'Priority Queue','Vector':'Vector','Deque':'Deque','Bitset':'Bitset','數學函式':'Math Functions','數值界限':'Numeric Limits','新增陣列':'Add Array','新增變數':'Add Variable','新增函式、結構、類別':'Add Function, Struct, or Class','新增 Vector':'Add Vector','新增 Deque':'Add Deque','新增 Set':'Add Set','新增 Map':'Add Map','新增 Pair':'Add Pair','新增 Stack':'Add Stack','新增 Queue':'Add Queue','新增 Priority_queue':'Add Priority Queue','新增 Bitset':'Add Bitset','algorithm':'Algorithms','iomanip':'iomanip','climits':'climits','math':'Math','cstdlib':'cstdlib','basic_ios':'basic_ios','sstream':'stringstream','functional':'functional'
};
const blockEnglishLabels = {
    '字串':'String','文字':'Text','字元':'Character','換行':'New line','Tab（4 格）':'Tab (4 spaces)','數字':'Number','絕對值':'Absolute value','// 註解':'// Comment','註解':'Comment','初始值':'Initial value','條件':'Condition','更新':'Update','執行':'Run','逐一取出':'For each','自容器':'from container','當':'While','重複執行':'Repeat','成立時':'when true','否則':'else','變數運算':'Variable operation','比較':'Compare','比較值':'Compare values','否定':'NOT','輸入':'Input','輸出':'Output','引入標頭檔':'Include header','函式庫':'Libraries','主程式':'Main program','主程式　int main()':'Main program int main()','輸出文字':'Print text','讀取輸入到變數':'Read input into variable','真假值':'Boolean','不換行':'No newline','配置動態記憶體':'Allocate dynamic memory','釋放記憶體':'Free memory','定義巨集':'Define macro','宣告變數':'Declare variable','一般':'regular','整數':'integer','浮點數':'float','雙精度':'double','長整數':'long long','typedef':'typedef','Integer':'Integer','Alias':'Alias','using':'using','定義':'Define','定義函式':'Define function','定義 void 函式':'Define void function','定義運算子':'Define operator','定義陣列':'Define array','定義 vector':'Define vector','定義 set':'Define set','定義 map':'Define map','定義 pair':'Define pair','定義 stack':'Define stack','定義 queue':'Define queue','定義 deque':'Define deque','定義 priority_queue':'Define priority_queue','定義 bitset':'Define bitset','定義 struct':'Define struct','定義 class':'Define class','定義變數':'Define variable','定義指標':'Define pointer','定義參考':'Define reference','宣告變數一般':'Declare variable (regular)','資料型態':'Data types','變數宣告與操作':'Variables','輸入與輸出':'Input & Output','文字與註解':'Text & Comments','函式與型別':'Functions & Types','如果':'If','預設':'Default','切換分支數量':'Number of branches','case 分支':'Case branch','條件分支':'Conditional branches','否則如果':'else if','結束迴圈':'Break','跳至下一輪':'Continue','回傳':'Return','True':'True','False':'False','運算':'Operation','計算':'Calculate','平方根':'Square root','向上取整':'Ceiling','向下取整':'Floor','隨機數，小於':'Random number below','排序':'Sort','最大值':'Maximum','最小值':'Minimum','尋找':'Find','二分搜尋':'Binary search','第一個大於等於':'First greater than or equal to','第一個大於':'First greater than','反轉':'Reverse','內建陣列':'Built-in array','容器':'Container','輸出進位':'Output base','設定精度':'Set precision','有效位數':'Significant digits','小數位數':'Decimal places','輸出欄寬':'Output width','填補字元':'Fill character','停用輸入輸出同步':'Disable I/O synchronization','解除 cin/cout 綁定':'Untie cin/cout','cin 到達 EOF':'cin reached EOF','建立 stringstream':'Create stringstream','串流插入':'Stream insertion','串流讀取':'Stream extraction','資料型別':'Data type','void 型別':'void type','排序容器':'Sort container','函式佔位符':'Function placeholder','第 1 個':'Argument 1','第 2 個':'Argument 2','第 3 個':'Argument 3','多項數學運算':'Multi-input math','多項字串運算':'Multi-input string','多項位元運算':'Multi-input bitwise','多項加法':'Multi-input addition','多項乘法':'Multi-input multiplication','多項取餘數':'Multi-input modulo','多項除法':'Multi-input division','多項減法':'Multi-input subtraction','位元 AND':'Bitwise AND','位元 OR':'Bitwise OR','位元 XOR':'Bitwise XOR','位元左移':'Bitwise left shift','位元右移':'Bitwise right shift','字串串接':'Concatenate strings','以逗號組合':'Join with commas','字串串流讀取':'Read string stream','字串串流輸出':'Write string stream','位元 NOT':'Bitwise NOT','重複':'Repeat','次':'times','設定變數':'Set variable','為':'to','真':'True','假':'False'
};
Object.assign(blockEnglishLabels, {
  '初始值':'Initial value','更新':'Update','執行':'Do','條件':'Condition','成立時':'when true','否則':'else','且':'AND','或':'OR','整數除法':'Integer division','次方':'Power','單一值':'Single value','陣列':'Array','內建陣列':'Built-in array','模組陣列':'Container','二進位':'Binary','八進位':'Octal','十進位':'Decimal','十六進位':'Hexadecimal','有效位數':'Significant digits','小數位數':'Decimal places','輸入項目':'Input item','項目':'Item','字串運算輸入':'String operation inputs','字串項目':'String item','數學運算輸入':'Math operation inputs','數學項目':'Math item','位元運算輸入':'Bitwise operation inputs','位元項目':'Bitwise item','容器類型':'Container type','函式':'Function','自訂運算子':'Custom operator','字元':'Character','字串':'String','一般':'Regular','整數':'Integer','浮點數':'Float','雙精度':'Double','長整數':'Long long','指標':'Pointer','參考':'Reference','真':'True','假':'False','換行':'New line','不換行':'No newline','當條件成立時重複':'Repeat while condition is true','計數迴圈':'Count loop','初始值 條件 更新':'Initial value, condition, update','逐一取出 自容器':'For each item in container','條件 成立時 否則':'If condition, then, else','到達 EOF':'Reached EOF','結束':'End','long long 絕對值':'long long absolute value'
});
const blockEnglishLabelReverse = Object.fromEntries(Object.entries(blockEnglishLabels).map(([tw, en]) => [en, tw]));
const localizeBlocklyBlock = (block, language) => {
  if (!block) return;
  block.inputList?.forEach((input) => input.fieldRow?.forEach((field) => {
    if (field?.constructor?.name?.includes('Dropdown') && !field.__blocksmithOriginalMenuGenerator) {
      field.__blocksmithOriginalMenuGenerator = field.menuGenerator_;
    }
    if (field?.constructor?.name?.includes('Dropdown') && field.__blocksmithOriginalMenuGenerator) {
      const originalGenerator = field.__blocksmithOriginalMenuGenerator;
      field.menuGenerator_ = typeof originalGenerator === 'function'
        ? (...args) => originalGenerator.apply(field, args).map(([label, value]) => [language === 'en' ? blockEnglishLabels[label] || label : blockEnglishLabelReverse[label] || label, value])
        : originalGenerator.map(([label, value]) => [language === 'en' ? blockEnglishLabels[label] || label : blockEnglishLabelReverse[label] || label, value]);
      const currentValue = field.getValue?.();
      if (currentValue !== undefined) field.setValue(currentValue);
    }
    if (!field?.constructor?.name?.includes('Label')) return;
    const original = field.__blocksmithOriginalLabel ?? field.getValue?.() ?? field.getText?.();
    if (!field.__blocksmithOriginalLabel) field.__blocksmithOriginalLabel = blockEnglishLabelReverse[original] || original;
    const text = language === 'en' ? blockEnglishLabels[field.__blocksmithOriginalLabel] || field.__blocksmithOriginalLabel : field.__blocksmithOriginalLabel;
    if (text !== field.getValue?.()) field.setValue(text);
  }));
};
const localizeToolbox = (definition, language) => {
  const copy = JSON.parse(JSON.stringify(definition));
  if (language === 'en') {
    const visit = (item) => {
      if (!item || typeof item !== 'object') return;
      if (item.kind === 'category' && toolboxEnglishNames[item.name]) item.name = toolboxEnglishNames[item.name];
      if (item.kind === 'button' && toolboxEnglishNames[item.text]) item.text = toolboxEnglishNames[item.text];
      item.contents?.forEach(visit);
    };
    copy.contents?.forEach(visit);
  }
  return copy;
};

function findToolboxCategory(items, name) {
  for (const item of items || []) {
    if (item.kind === 'category' && item.name === name) return item;
    const nested = findToolboxCategory(item.contents, name);
    if (nested) return nested;
  }
  return null;
}

const isLibraryBlockType = (type) => type === 'cpp_include' || type === 'define_sstream' || legacyLibraryBlockTypes.includes(type) || type.startsWith('named_define_');
const dualScopeStatementTypes = new Set([
  'comment_block', 'define_block', 'typedef_block', 'define_using', 'using_namespace_std',
  'define_function', 'define_function_void', 'define_operator', 'define_struct', 'define_class',
  'def_var', 'define_variable', 'define_array', 'define_vector', 'define_set', 'define_map', 'define_pair',
  'define_stack', 'define_queue', 'define_deque', 'define_priority_queue', 'define_bitset',
  'define_pointer', 'define_reference', 'define_sstream',
]);
const getStatementPlacementChecks = (type) => dualScopeStatementTypes.has(type) || type.startsWith('named_define_')
  ? ['LIBRARY', 'STATEMENT']
  : [isLibraryBlockType(type) ? 'LIBRARY' : 'STATEMENT'];
const prefersLibraryPlacement = (type) => isLibraryBlockType(type)
  && !['comment_block', 'define_block', 'typedef_block', 'define_using', 'using_namespace_std', 'def_var', 'define_variable', 'define_array', 'define_vector', 'define_set', 'define_map', 'define_pair', 'define_stack', 'define_queue', 'define_deque', 'define_priority_queue', 'define_bitset', 'define_pointer', 'define_reference', 'define_sstream'].includes(type)
  && !type.startsWith('named_define_');

function getBackpackLabel(block) {
  const label = searchableByType.get(block.type)?.label
    || block.toString(50).replace(/\s+/g, ' ').trim()
    || block.type;
  return label.length > 56 ? `${label.slice(0, 53)}…` : label;
}

function getBackpackRoot(workspace, block) {
  if (!workspace || !block || typeof block.getParent !== 'function' || block.type === 'cpp_main' || workspace.getBlockById(block.id) !== block) return null;
  let root = block;
  while (root.getParent() && root.getParent().type !== 'cpp_main') root = root.getParent();
  return root.getParent()?.type === 'cpp_main' ? root : null;
}

function removeLegacyEntityCategory(toolboxModel, entity) {
  const contents = toolboxModel.contents;
  if (entity.kind === 'variable') {
    const parent = findToolboxCategory(contents, '變數宣告與操作');
    if (parent) parent.contents = parent.contents.filter((item) => item.name !== entity.name);
  } else if (entity.kind === 'array') {
    const parent = findToolboxCategory(contents, '陣列');
    if (parent) parent.contents = parent.contents.filter((item) => item.name !== entity.name);
  } else if (entity.kind === 'function') {
    const parent = findToolboxCategory(contents, '函式與型別');
    if (parent) parent.contents = parent.contents.filter((item) => item.name !== entity.name);
  } else if (entity.kind === 'container') {
    const root = findToolboxCategory(contents, '陣列與容器');
    const family = entity.family === 'Set' ? 'Set函式庫' : entity.family === 'Map' ? 'Map函式庫' : entity.family === 'Priority_Queue' ? 'Priority_queue' : entity.family;
    const parent = root?.contents?.find((item) => item.name === family);
    const group = ['Set','Map'].includes(entity.family) ? parent?.contents?.find((item) => item.name === entity.containerKind) : parent;
    if (group) group.contents = group.contents.filter((item) => item.name !== entity.name);
  }
}

function lockMainBlock(block) {
  block.setMovable(false);
  block.setDeletable(false);
  block.setEditable(false);
  block.contextMenu = false;
  block.getInput('LIBS')?.connection?.setCheck('LIBRARY');
  block.getInput('BODY')?.connection?.setCheck('STATEMENT');
  return block;
}

function ensureMainBlock(workspace, migrate = false) {
  let mainBlock = workspace.getAllBlocks(false).find((block) => block.type === 'cpp_main');
  const hadMainBlock = Boolean(mainBlock);
  if (!mainBlock) {
    mainBlock = workspace.newBlock('cpp_main');
    mainBlock.initSvg();
    mainBlock.render();
    mainBlock.moveBy(40, 35);
  }
  lockMainBlock(mainBlock);

  if (migrate && !hadMainBlock) {
    const topBlocks = workspace.getTopBlocks(true).filter((block) => block !== mainBlock);
    const roots = { LIBS: mainBlock.getInput('LIBS').connection, BODY: mainBlock.getInput('BODY').connection };
    for (const block of topBlocks) {
      if (!block.previousConnection) continue;
      const targetName = isLibraryBlockType(block.type) ? 'LIBS' : 'BODY';
      const connection = roots[targetName];
      if (!connection.targetBlock()) connection.connect(block.previousConnection);
      else {
        let tail = connection.targetBlock();
        while (tail.nextConnection?.targetBlock()) tail = tail.nextConnection.targetBlock();
        if (tail.nextConnection) tail.nextConnection.connect(block.previousConnection);
      }
    }
  }

  const allBlocks = workspace.getAllBlocks(false).filter((block) => block !== mainBlock);
  for (const block of allBlocks) {
    const checks = getStatementPlacementChecks(block.type);
    block.previousConnection?.setCheck(checks);
    block.nextConnection?.setCheck(checks);
  }
  return mainBlock;
}

function appendBlockToMain(workspace, type) {
  const root = ensureMainBlock(workspace);
  const block = workspace.newBlock(type);
  const libraryBlock = prefersLibraryPlacement(type);
  const checks = getStatementPlacementChecks(type);
  block.previousConnection?.setCheck(checks);
  block.nextConnection?.setCheck(checks);
  block.initSvg();
  block.render();
  if (!block.previousConnection) {
    const rootPosition = root.getRelativeToSurfaceXY();
    block.moveBy(rootPosition.x + 390, rootPosition.y + 50);
    return block;
  }
  const inputName = libraryBlock ? 'LIBS' : 'BODY';
  const inputConnection = root.getInput(inputName).connection;
  if (!inputConnection.targetBlock()) inputConnection.connect(block.previousConnection);
  else {
    let tail = inputConnection.targetBlock();
    while (tail.nextConnection?.targetBlock()) tail = tail.nextConnection.targetBlock();
    tail.nextConnection?.connect(block.previousConnection);
  }
  return block;
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderCode(code) {
  return code.split('\n').map((line, index) => {
    const tokens = line.split(/("(?:\\.|[^"\\])*"|\b(?:int|auto|return|for|if|else|while|true|false)\b|std::\w+|\b\d+\b)/g);
    const safeLine = tokens.map((token) => {
      let className = '';
      if (/^"/.test(token)) className = 'str';
      else if (/^std::/.test(token)) className = 'fn';
      else if (/^(int|auto|return|for|if|else|while|true|false)$/.test(token)) className = 'kw';
      else if (/^\d+$/.test(token)) className = 'num';
      return className ? `<span class="${className}">${escapeHtml(token)}</span>` : escapeHtml(token);
    }).join('');
    return `<span class="ln">${index + 1}</span><span class="code-line">${safeLine || ' '}</span>`;
  }).join('');
}

function generateCode(workspace) {
  ensureMainBlock(workspace);
  return cpp.workspaceToCode(workspace).trimEnd();
}

function getWorkspaceDiagnostics(workspace, reminderThreshold = 1) {
  if (!workspace) return [];
  const allBlocks = workspace.getAllBlocks(false);
  allBlocks.forEach((block) => {
    const root = block.getSvgRoot();
    root?.classList.remove('blocksmith-error-block', 'blocksmith-warning-block');
    root?.querySelectorAll('.blocksmith-diagnostic-marker').forEach((marker) => marker.remove());
  });
  const issues = [];
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const addBlockMarker = (block, severity, message) => {
    const root = block?.getSvgRoot();
    if (!root) return;
    let marker = root.querySelector('.blocksmith-diagnostic-marker');
    if (!marker) {
      marker = document.createElementNS(svgNamespace, 'g');
      marker.setAttribute('class', 'blocksmith-diagnostic-marker');
      marker.setAttribute('aria-hidden', 'true');
      marker.style.pointerEvents = 'none';
      const circle = document.createElementNS(svgNamespace, 'circle');
      circle.setAttribute('r', '9');
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '2');
      const symbol = document.createElementNS(svgNamespace, 'text');
      symbol.setAttribute('text-anchor', 'middle');
      symbol.setAttribute('dominant-baseline', 'central');
      symbol.setAttribute('font-family', 'sans-serif');
      symbol.setAttribute('font-size', '13');
      symbol.setAttribute('font-weight', '900');
      symbol.setAttribute('fill', '#fff');
      symbol.textContent = '!';
      const title = document.createElementNS(svgNamespace, 'title');
      marker.append(circle, symbol, title);
      root.appendChild(marker);
    }
    const bounds = root.getBBox();
    marker.setAttribute('transform', `translate(${Math.max(10, bounds.width - 2)}, ${Math.min(-9, bounds.y + 5)})`);
    marker.setAttribute('class', `blocksmith-diagnostic-marker blocksmith-diagnostic-marker-${severity}`);
    marker.querySelector('circle').setAttribute('fill', severity === 'error' ? '#dc2626' : '#eab308');
    marker.querySelector('text').setAttribute('fill', severity === 'error' ? '#fff' : '#422006');
    marker.querySelector('title').textContent = `${severity === 'error' ? '錯誤' : '警告'}：${message}`;
  };
  const addIssue = (severity, message, block, weight = severity === 'error' ? 3 : 1) => {
    if (weight < reminderThreshold) return;
    issues.push({ severity, message, blockId: block?.id, weight });
    block?.getSvgRoot()?.classList.add(severity === 'error' ? 'blocksmith-error-block' : 'blocksmith-warning-block');
    addBlockMarker(block, severity, message);
  };
  const requiredInputs = {
    text_print: ['TEXT'], controls_if: ['IF0'], controls_repeat_ext: ['TIMES'],
    logic_compare: ['A', 'B'], logic_operation: ['A', 'B'], math_arithmetic: ['A', 'B'], math_modulo: ['DIVIDEND', 'DIVISOR'],
    text_length: ['VALUE'], controls_whileUntil: ['BOOL'], controls_for: ['FROM', 'TO', 'BY'],
    math_calculate: ['A', 'B'], compare_block: ['A', 'B'], logic_operators: ['A', 'B'], or_and_xor: ['A', 'B'],
    logic_not: ['A'], var_cal: ['A', 'B'], var_calculate: ['A', 'B'], if_else: ['CONDITION', 'r1', 'r2'],
    abs_block: ['value'], llabs_block: ['value'], math_sqrt: ['X'], math_abs: ['A'], math_sine: ['ANGLE'], math_cosine: ['ANGLE'], math_tangent: ['ANGLE'], math_ceil: ['X'], math_floor: ['X'],
    math_random: ['RANGE'], for_block: ['init', 'condition', 'iter'], for_range_block: ['VAR', 'container'], while_block: ['CONDITION'], if_block: ['IF_VALUE'],
    switch_block: ['SWITCH_VALUE'], cin_block: ['VARIABLES'], define_array: ['VALUE'], define_template: ['var'], define_typename: ['var'], define_using: ['var'],
  };
  const optionalInputs = { define_variable: ['VALUE'], def_var: ['value'], return_block: ['RETURN_VALUE'] };
  const inputLabels = { A: '左側', B: '右側', TEXT: '輸出值', TIMES: '重複次數', IF0: '判斷條件', BOOL: '判斷條件', FROM: '起始值', TO: '結束值', BY: '遞增值', VALUE: '輸入值', DIVIDEND: '被除數', DIVISOR: '除數' };
  const mainBlock = workspace.getAllBlocks(false).find((block) => block.type === 'cpp_main');
  const globalOnlyTypes = new Set(['cpp_include', 'define_block', 'typedef_block', 'define_template', 'define_using', 'using_namespace_std', 'define_namespace', 'define_sstream']);
  const variableDeclarationTypes = new Set(['def_var', 'define_variable', 'define_array', 'define_pointer', 'define_reference', 'define_vector', 'define_set', 'define_map', 'define_pair', 'define_stack', 'define_queue', 'define_deque', 'define_priority_queue', 'define_bitset']);
  const internalOnlyTypes = new Set(['if_mutator_container', 'if_elseif_mutator', 'if_else_mutator', 'switch_mutator', 'case_mutator', 'switch_default_mutator', 'math_generic_container', 'math_generic_item', 'string_generic_container', 'string_generic_item', 'bitwise_generic_container', 'bitwise_generic_item']);
  const functionDefinitions = new Map();
  const misplacedRoots = new Set();
  allBlocks.forEach((block) => {
    if (block.type === 'cpp_main' && block !== mainBlock) {
      addIssue('error', '專案只能有一個主程式 int main()；請移除多出的主程式框。', block, 3);
    }
    if (internalOnlyTypes.has(block.type)) {
      addIssue('error', '這是方塊編輯器內部使用的分支／項目方塊，不能直接放進程式；請使用對應的條件、switch 或多項運算方塊。', block, 3);
    }
    if (block.type === 'controls_flow_statements') {
      const flow = block.getFieldValue('FLOW');
      let ancestor = block.getParent();
      let inLoop = false;
      let inBreakable = false;
      while (ancestor && ancestor !== mainBlock) {
        if (['for_block', 'for_range_block', 'controls_for', 'controls_forEach', 'while_block', 'controls_repeat_ext', 'controls_whileUntil'].includes(ancestor.type)) inLoop = true;
        if (inLoop || ancestor.type === 'switch_block') inBreakable = true;
        ancestor = ancestor.getParent();
      }
      if (flow === 'CONTINUE' && !inLoop) addIssue('error', 'continue 必須放在迴圈內。', block, 3);
      else if (flow === 'BREAK' && !inBreakable) addIssue('error', 'break 必須放在迴圈或 switch 分支內。', block, 3);
    }
    if (block.type === 'cpp_cin' && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(block.getFieldValue('VAR') || '')) {
      addIssue('warning', '輸入變數名稱不符合 C++ 命名習慣，請使用英文字母、數字與底線，且不要以數字開頭。', block);
    }
    if (['define_function', 'define_function_void'].includes(block.type) && mainBlock && block.getRootBlock() === mainBlock) {
      const name = (block.getFieldValue('name') || '').trim();
      if (name) {
        if (functionDefinitions.has(name)) addIssue('error', `函式「${name}」重複定義；請保留一個定義，或改用不同名稱。`, block);
        else functionDefinitions.set(name, block);
      }
    }
    const variadic = block.type.endsWith('_generic') || /^(math|bitwise|string)_(plus|multiply|percent|divide|subtract|and|or|xor|left|right|commas)$/.test(block.type);
    const isInProgram = Boolean(mainBlock && block.getRootBlock() === mainBlock);
    const rootBlock = block.getRootBlock();
    if (mainBlock && rootBlock !== mainBlock && !misplacedRoots.has(rootBlock.id)) {
      misplacedRoots.add(rootBlock.id);
      if (rootBlock.previousConnection && variableDeclarationTypes.has(rootBlock.type)) {
        addIssue('warning', '變數宣告可以放在主程式內。這個方塊目前游離在主程式外，會作為全域變數輸出；若要在 main() 內使用，請把它接到「主程式」的流程插槽。', rootBlock, 1);
      } else if (rootBlock.previousConnection && (isLibraryBlockType(rootBlock.type) || rootBlock.type.startsWith('named_define_'))) {
        addIssue('warning', '這個宣告目前游離在程式框外，會輸出在 main() 外的全域範圍；建議接到上方「函式庫」插槽，讓程式結構更清楚。', rootBlock, 1);
      } else if (rootBlock.previousConnection) {
        addIssue('error', '這個流程方塊目前位於 main() 與函式之外，會被輸出在無效的全域位置；請接到「主程式」或函式的流程插槽。', rootBlock, 3);
      } else if (rootBlock.outputConnection) {
        addIssue('warning', '這個值方塊沒有接到任何值插槽，因此不會形成有效的程式運算；請接到相容方塊的輸入插槽。', rootBlock, 2);
      } else {
        addIssue('error', '這個方塊沒有接入有效的程式結構；請使用對應的主程式方塊或流程插槽。', rootBlock, 3);
      }
    }
    if (mainBlock && rootBlock === mainBlock && block !== mainBlock) {
      let directChild = block;
      while (directChild.getParent() && directChild.getParent() !== mainBlock) directChild = directChild.getParent();
      if (directChild.getParent() === mainBlock) {
        const topInput = mainBlock.getInputWithBlock(directChild)?.name;
        if (topInput === 'LIBS' && !isLibraryBlockType(directChild.type) && !directChild.type.startsWith('named_define_')) {
          addIssue('warning', '這個方塊放在主程式上方的函式庫區域；該區域應放標頭檔、巨集、型別或全域定義。請移到主程式區或相容插槽。', directChild, 2);
        } else if (topInput === 'BODY' && globalOnlyTypes.has(directChild.type)) {
          addIssue('warning', '這是全域宣告或標頭設定，建議放在主程式上方的函式庫區域。', directChild, 1);
        } else if (topInput === 'BODY' && ['define_function', 'define_function_void', 'define_operator', 'define_struct', 'define_class'].includes(directChild.type)) {
          addIssue('warning', '函式或複合型別定義建議放在主程式上方的函式庫區域，方便閱讀與重用。', directChild, 1);
        }
      }
      if (block !== directChild && ['define_function', 'define_function_void', 'define_operator', 'define_struct', 'define_class'].includes(block.type)) {
        addIssue('error', '函式或複合型別不能巢狀定義在其他方塊內；請直接接到主程式上方的函式庫區域。', block, 3);
      }
      if (block.type === 'break_block' || block.type === 'continue_block') {
        let ancestor = block.getParent();
        let validControl = false;
        while (ancestor && ancestor !== mainBlock) {
          if (['for_block', 'for_range_block', 'controls_for', 'controls_forEach', 'while_block', 'controls_repeat_ext', 'controls_whileUntil'].includes(ancestor.type) || (block.type === 'break_block' && ancestor.type === 'switch_block')) { validControl = true; break; }
          ancestor = ancestor.getParent();
        }
        if (!validControl) addIssue('error', block.type === 'break_block' ? 'break 必須放在迴圈或 switch 分支內。' : 'continue 必須放在迴圈內。', block, 3);
      }
      if (block.type === 'return_block') {
        let ancestor = block.getParent();
        let inFunction = false;
        while (ancestor && ancestor !== mainBlock) {
          if (['define_function', 'define_function_void', 'define_operator'].includes(ancestor.type)) { inFunction = true; break; }
          ancestor = ancestor.getParent();
        }
        if (ancestor === mainBlock) inFunction = true;
        if (!inFunction) addIssue('error', 'return 必須放在主程式或函式內容中。', block, 3);
      }
    }
    const allValueInputsRequired = variadic || block.type === 'text_join' || block.type === 'variables_set';
    const dynamicRequiredInputs = block.type === 'switch_block'
      ? block.inputList.filter((input) => input.name.startsWith('CASE_VALUE')).map((input) => input.name)
      : block.type === 'if_block'
        ? block.inputList.filter((input) => input.name.startsWith('ELSEIF_VALUE')).map((input) => input.name)
        : [];
    const required = new Set([...(requiredInputs[block.type] || []), ...dynamicRequiredInputs, ...(allValueInputsRequired ? block.inputList.filter((input) => input.type === Blockly.INPUT_VALUE).map((input) => input.name) : [])]);
    (block.inputList || []).forEach((input) => {
      if (input.type !== Blockly.INPUT_VALUE || block.getInputTargetBlock(input.name)) return;
      if (optionalInputs[block.type]?.includes(input.name)) return;
      const severity = required.has(input.name) && isInProgram ? 'error' : 'warning';
      const label = inputLabels[input.name] || input.name;
      const suffix = severity === 'error' ? '產生的 C++ 會無法編譯。' : '接上內容後才會完成這個方塊。';
      addIssue(severity, `「${block.type}」的${label}尚未接上值。${suffix}`, block);
    });
    if (block.type === 'cpp_main' && !block.getInputTargetBlock('BODY')) addIssue('warning', '主程式目前是空的；這個架構可以編譯，但執行時不會做任何事。', block);
  });
  return [...new Map(issues.map((issue) => [`${issue.severity}:${issue.message}`, issue])).values()].slice(0, 6);
}

function normalizeFilename(value) {
  const stem = value.trim().replace(/[\\/:*?"<>|]/g, '_').replace(/\.cpp$/i, '') || 'main';
  return `${stem}.cpp`;
}

function persistProject(workspace, filename, savedAt = Date.now()) {
  if (!workspace) return;
  const snapshot = JSON.stringify({ version: 2, savedAt, filename, xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) });
  try {
    localStorage.setItem(STORAGE_KEY, snapshot);
    localStorage.setItem(BACKUP_KEY, snapshot);
    localStorage.setItem('blocksmith-filename', filename);
    return true;
  } catch {
    return false;
  }
}

function applyWorkspaceFieldTheme(workspace, isDark) {
  if (!workspace) return;
  workspace.getInjectionDiv().classList.toggle('blocklyDarkMode', isDark);
  workspace.getAllBlocks(false).forEach((block) => {
    const svgRoot = block.getSvgRoot();
    if (block.type === 'text') {
      svgRoot?.classList.add('blocklyLiteralText');
      svgRoot?.querySelectorAll('.blocklyEditableField text').forEach((fieldText) => {
        fieldText.style.setProperty('fill', '#17202a', 'important');
      });
      svgRoot?.querySelectorAll('.blocklyEditableField rect').forEach((fieldRect) => {
        fieldRect.style.setProperty('fill', '#ffffff', 'important');
      });
    }
  });
}

function registerNamedAccessBlocks(name, kind, generator) {
  const slug = `${kind}_${name}`.replace(/\W/g, '_');
  const getType = `named_get_${slug}`;
  const setType = `named_set_${slug}`;
  if (!Blockly.Blocks[getType]) {
    Blockly.Blocks[getType] = { init() { this.appendDummyInput().appendField(name); this.setOutput(true); this.setColour(260); } };
    generator.forBlock[getType] = () => [kind === 'PTR' ? `*${name}` : kind === 'REF' ? name : name, generator.ORDER_ATOMIC];
  }
  if (!Blockly.Blocks[setType]) {
    Blockly.Blocks[setType] = { init() { this.appendValueInput('VALUE').appendField(`${name} 設為`); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(260); } };
    generator.forBlock[setType] = (block) => `${name} = ${generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0'};\n`;
  }
  if (kind === 'PTR') {
    const addressType = `named_address_${slug}`;
    if (!Blockly.Blocks[addressType]) {
      Blockly.Blocks[addressType] = { init() { this.appendDummyInput().appendField(`&${name}`); this.setOutput(true); this.setColour(260); } };
      generator.forBlock[addressType] = () => [`&${name}`, generator.ORDER_ATOMIC];
    }
  }
  return [getType, setType, ...(kind === 'PTR' ? [`named_address_${slug}`] : [])];
}

function registerNamedContainerBlocks(name, family, generator) {
  const slug = `${family}_${name}`.replace(/\W/g, '_');
  const common = family === 'Array'
    ? ['array_name','array_content','operate[]']
    : family === 'Vector' || family === 'Deque'
    ? ['push_back','emplace_back','push_range','pop_back','insert','insert_range','erase','swap','assign','assign_range','resize','capacity','reserve','operate[]','front','back','clear','size','empty','max_size','iter', ...(family === 'Deque' ? ['push_front','emplace_front','prepend_range','pop_front'] : [])]
    : family === 'Stack' || family === 'Queue' || family === 'Priority_Queue'
      ? ['push','emplace','push_range','pop','swap','size','empty', family === 'Queue' ? 'front' : 'top']
      : family === 'Pair' ? ['first','second','make_Pair']
        : family === 'Bitset' ? ['operate[]','size','set','count','test','true']
          : ['insert','erase','extract','merge','swap','clear','size','empty','max_size','find','find_index','iter', ...(family.includes('Map') || family === 'Map' || family === 'Multimap' ? ['make_Map'] : [])];
  return common.map((operation) => {
    const type = `named_${slug}_${operation}`;
    const returnsValue = ['size','empty','front','back','top','first','second','count','test','find','find_index','capacity','max_size','iter','operate[]','array_name','array_content','true','make_Pair','make_Map'].includes(operation);
    const takesValue = ['push','push_back','emplace','emplace_back','push_range','prepend_range','insert','insert_range','erase','set','test','find','find_index','assign','assign_range','resize','reserve','operate[]','extract','merge','swap'].includes(operation);
    if (!Blockly.Blocks[type]) {
      Blockly.Blocks[type] = { init() {
        if (takesValue) this.appendValueInput('VALUE').appendField(`${name}.${operation}`);
        else this.appendDummyInput().appendField(`${name}.${operation}()`);
        if (returnsValue) this.setOutput(true); else { this.setPreviousStatement(true); this.setNextStatement(true); }
        this.setColour(260);
      } };
      generator.forBlock[type] = (block) => {
        const argument = takesValue ? generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0' : '';
        let expression = `${name}.${operation}(${argument})`;
        if (operation === 'operate[]') expression = `${name}[${argument}]`;
        else if (operation === 'array_name') expression = name;
        else if (operation === 'array_content') expression = `{}`;
        else if (operation === 'iter') expression = `${name}.begin() + ${argument || '0'}`;
        else if (operation === 'find_index') expression = `std::distance(${name}.begin(), ${name}.find(${argument || '0'}))`;
        else if (operation === 'true') expression = `${name}.all()`;
        else if (operation === 'make_Pair') expression = `std::make_pair(${argument || '0'}, ${argument || '0'})`;
        else if (operation === 'make_Map') expression = `std::make_pair(${argument || '0'}, ${argument || '0'})`;
        return returnsValue ? [expression, generator.ORDER_ATOMIC] : `${expression};\n`;
      };
    }
    return { kind: 'block', type };
  });
}

function registerNamedContainerDeclaration(name, family, generator) {
  const type = `named_define_${family}_${name}`.replace(/\W/g, '_');
  if (!Blockly.Blocks[type]) {
    Blockly.Blocks[type] = { init() {
      if (family === 'Bitset') this.appendDummyInput().appendField(`定義 ${family}`).appendField(new Blockly.FieldNumber(8, 1, 4096, 1), 'SIZE').appendField(name);
      else this.appendDummyInput().appendField(`定義 ${family}`).appendField(new Blockly.FieldDropdown([['int','int'],['long long','long long'],['float','float'],['double','double'],['char','char'],['string','std::string']]), 'TYPE').appendField(name);
      this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(260);
    } };
    generator.forBlock[type] = (block) => {
      const valueType = block.getFieldValue('TYPE') || 'int';
      const declarations = {
        Vector: `std::vector<${valueType}> ${name};`, Deque: `std::deque<${valueType}> ${name};`,
        Set: `std::set<${valueType}> ${name};`, Unordered_set: `std::unordered_set<${valueType}> ${name};`, Multiset: `std::multiset<${valueType}> ${name};`, Flat_set: `std::set<${valueType}> ${name};`,
        Map: `std::map<${valueType}, ${valueType}> ${name};`, Unordered_map: `std::unordered_map<${valueType}, ${valueType}> ${name};`, Multimap: `std::multimap<${valueType}, ${valueType}> ${name};`,
        Pair: `std::pair<${valueType}, ${valueType}> ${name};`, Stack: `std::stack<${valueType}> ${name};`, Queue: `std::queue<${valueType}> ${name};`, Priority_Queue: `std::priority_queue<${valueType}> ${name};`, Bitset: `std::bitset<${block.getFieldValue('SIZE') || 8}> ${name};`,
      };
      return `${declarations[family] || `${valueType} ${name};`}\n`;
    };
  }
  return type;
}

function installLegacyEntity(workspace, toolboxModel, creator, onManage = () => {}) {
  const name = creator.name;
  const top = toolboxModel.contents;
  const blockItem = (type, fields = {}) => ({ kind: 'block', type, ...(Object.keys(fields).length ? { fields } : {}) });
  const appendNamed = (target, type, fieldName = 'name') => target?.contents?.push(blockItem(type, { [fieldName]: name }));
  const namedGroup = (target) => {
    const group = { kind: 'category', name, colour: 260, contents: [] };
    target?.contents?.push(group);
    return group;
  };
  const addManageButtons = (target) => {
    const key = `${creator.kind}-${safeIdentifier(name)}`;
    const editKey = `legacy-edit-${key}`;
    const deleteKey = `legacy-delete-${key}`;
    workspace.registerButtonCallback(editKey, () => onManage('edit', creator));
    workspace.registerButtonCallback(deleteKey, () => onManage('delete', creator));
    target?.contents?.push(
      { kind: 'button', text: '編輯名稱與定義', callbackKey: editKey },
      { kind: 'button', text: '刪除工具列定義', callbackKey: deleteKey },
    );
  };
  let destination = null;
  if (creator.kind === 'variable') {
    const variableKind = creator.variableKind || 'VAR';
    const declarationType = variableKind === 'PTR' ? 'define_pointer' : variableKind === 'REF' ? 'define_reference' : 'def_var';
    destination = findToolboxCategory(top, '變數宣告與操作');
    if (!destination?.contents) throw new Error('工具列中找不到「變數宣告與操作」分類，請重新載入工作區後再試。');
    const variableCategory = { kind: 'category', name, colour: 260, contents: [] };
    destination.contents.push(variableCategory);
    destination = variableCategory;
    appendNamed(destination, declarationType, declarationType === 'def_var' ? 'var_name' : 'name');
    const accessTypes = registerNamedAccessBlocks(name, variableKind, cpp);
    destination?.contents?.push({ kind: 'label', text: `${name} 操作` }, ...accessTypes.map((type) => blockItem(type)));
    addManageButtons(destination);
  } else if (creator.kind === 'array') {
    destination = namedGroup(findToolboxCategory(top, '陣列'));
    appendNamed(destination, 'define_array');
    const items = registerNamedContainerBlocks(name, 'Array', cpp);
    destination?.contents?.push({ kind: 'label', text: `${name} 操作` }, ...items);
    addManageButtons(destination);
  } else if (creator.kind === 'container') {
    const stl = findToolboxCategory(top, '陣列與容器');
    const familyName = creator.family === 'Set' ? 'Set函式庫' : creator.family === 'Map' ? 'Map函式庫' : creator.family === 'Priority_Queue' ? 'Priority_queue' : creator.family;
    const parent = stl?.contents?.find((item) => item.name === familyName);
    const containerType = creator.containerKind || creator.family;
    if (['Set','Map'].includes(creator.family)) {
      destination = parent?.contents?.find((item) => item.name === containerType);
      if (!destination) {
        destination = { kind: 'category', name: containerType, colour: 260, contents: [] };
        parent?.contents?.push(destination);
      }
    } else destination = parent;
    destination = namedGroup(destination);
    const declarationType = registerNamedContainerDeclaration(name, containerType, cpp);
    destination?.contents?.push({ kind: 'block', type: declarationType });
    const items = registerNamedContainerBlocks(name, containerType, cpp);
    destination?.contents?.push({ kind: 'label', text: `${name} 操作` }, ...items);
    addManageButtons(destination);
  } else if (creator.kind === 'function') {
    const functionDestination = findToolboxCategory(top, '函式與型別');
    if (!functionDestination?.contents) throw new Error('工具列中找不到「函式與型別」分類，請重新載入工作區後再試。');
    destination = namedGroup(functionDestination);
    const typeMap = { Function: 'define_function', Lambda: 'define_function', Struct: 'define_struct', Class: 'define_class', Operation: 'define_operator' };
    appendNamed(destination, typeMap[creator.functionKind] || 'define_function');
    if (creator.functionKind === 'Function') {
      const type = `named_call_${name}`.replace(/\W/g, '_');
      if (!Blockly.Blocks[type]) {
        Blockly.Blocks[type] = { init() { this.appendDummyInput().appendField(`${name}()`); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(260); } };
        cpp.forBlock[type] = () => `${name}();\n`;
      }
      destination?.contents?.push({ kind: 'label', text: `${name} 使用` }, blockItem(type));
    }
    addManageButtons(destination);
  }
  return toolboxModel;
}

export default function App() {
  const blocklyHost = useRef(null);
  const workspaceRef = useRef(null);
  const filenameRef = useRef('main.cpp');
  const activeProjectIdRef = useRef(localStorage.getItem(ACTIVE_PROJECT_TAB_KEY) || 'current');
  const switchingProjectRef = useRef(false);
  const compilerWorkerRef = useRef(null);
  const compilerRequestRef = useRef(0);
  const compilerBusyRef = useRef(false);
  const runningProjectNameRef = useRef('');
  const [code, setCode] = useState('#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}');
  const [blockCount, setBlockCount] = useState(0);
  const [runOutput, setRunOutput] = useState('按下「編譯並執行」查看實際程式輸出');
  const [diagnostics, setDiagnostics] = useState([]);
  const [reminderThreshold, setReminderThreshold] = useState(() => { const saved = Number(localStorage.getItem('blocksmith-reminder-threshold')); return [1, 2, 3].includes(saved) ? saved : 1; });
  const [hoveredBlockInfo, setHoveredBlockInfo] = useState(null);
  const hoveredBlockInfoRef = useRef(null);
  const [runState, setRunState] = useState('等待執行');
  const [lastExecutionTiming, setLastExecutionTiming] = useState(null);
  const [projectBusyNotice, setProjectBusyNotice] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [stdinValue, setStdinValue] = useState('');
  const [stdinHistory, setStdinHistory] = useState(() => { try { return JSON.parse(localStorage.getItem('blocksmith-stdin-history') || '[]'); } catch { return []; } });
  useEffect(() => () => compilerWorkerRef.current?.terminate(), []);
  const [minimapBlocks, setMinimapBlocks] = useState([]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialEnabled, setTutorialEnabled] = useState(() => localStorage.getItem('blocksmith-tutorial-enabled') !== 'false');
  const [blockTutorial, setBlockTutorial] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectCreateOpen, setProjectCreateOpen] = useState(false);
  const [projectNameDraft, setProjectNameDraft] = useState('');
  const [projectCloneXml, setProjectCloneXml] = useState('');
  const [toastLevel, setToastLevel] = useState(() => localStorage.getItem('blocksmith-minecraft-toast-level') || 'occasional');
  const toastLevelRef = useRef(toastLevel);
  toastLevelRef.current = toastLevel;
  const [autoSaveInterval, setAutoSaveInterval] = useState(() => { const saved = Number(localStorage.getItem('blocksmith-autosave-interval')); return [1, 3, 5, 10, 15, 30].includes(saved) ? saved : saved === 60 ? 30 : 5; });
  const [minecraftToast, setMinecraftToast] = useState(null);
  const [dragHint, setDragHint] = useState('');
  const toastTimerRef = useRef(null);
  const dragHintRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState('已自動儲存');
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [savePulseId, setSavePulseId] = useState(0);
  const saveFeedbackTimerRef = useRef(null);
  const forceSaveRef = useRef(null);
  const [lastSavedAt, setLastSavedAt] = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')?.savedAt || null; } catch { return null; } });
  const [historyState, setHistoryState] = useState({ undo: false, redo: false });
  const [fileName, setFileName] = useState(() => localStorage.getItem('blocksmith-filename') || 'main.cpp');
  const [editingFileName, setEditingFileName] = useState(false);
  const [fileNameDraft, setFileNameDraft] = useState(() => localStorage.getItem('blocksmith-filename') || 'main.cpp');
  const [renameHighlight, setRenameHighlight] = useState(false);
  const [projectTabs, setProjectTabs] = useState(() => {
    try {
      const tabs = JSON.parse(localStorage.getItem(PROJECT_TABS_KEY) || '[]');
      if (Array.isArray(tabs) && tabs.length) return tabs;
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return [{ id: 'current', filename: localStorage.getItem('blocksmith-filename') || 'main.cpp', xml: saved?.xml || '' }];
    } catch { return [{ id: 'current', filename: 'main.cpp', xml: '' }]; }
  });
  const [activeProjectId, setActiveProjectId] = useState(() => localStorage.getItem(ACTIVE_PROJECT_TAB_KEY) || 'current');
  const [layoutMode, setLayoutMode] = useState(() => {
    const ratio = Number(localStorage.getItem('blocksmith-layout-ratio'));
    return ratio >= 50 && ratio <= 55 ? 'balanced' : 'workspace';
  });
  const [layoutRatio, setLayoutRatio] = useState(() => {
    const saved = Number(localStorage.getItem('blocksmith-layout-ratio'));
    if (saved >= 50 && saved <= 70) return saved;
    return 70;
  });
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [layoutSaveChecked, setLayoutSaveChecked] = useState(false);
  const [layoutPresetName, setLayoutPresetName] = useState('');
  const [layoutNotice, setLayoutNotice] = useState(null);
  const layoutNoticeTimerRef = useRef(null);
  const layoutPickerRef = useRef(null);
  const [minimapOpen, setMinimapOpen] = useState(() => localStorage.getItem(MINIMAP_VISIBLE_KEY) === 'true');
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [backpack, setBackpack] = useState(() => { try { return JSON.parse(localStorage.getItem('blocksmith-backpack') || '[]'); } catch { return []; } });
  const [selectedBackpackBlock, setSelectedBackpackBlock] = useState(null);
  const [panelSizes, setPanelSizes] = useState(() => { try { const saved = JSON.parse(localStorage.getItem('blocksmith-panel-sizes') || 'null'); return saved?.code === 0 && saved?.input === 0 && saved?.output === 100 ? normalizePanelSizes(null) : normalizePanelSizes(saved); } catch { return normalizePanelSizes(null); } });
  const [panelResizeEnabled, setPanelResizeEnabled] = useState(() => localStorage.getItem('blocksmith-panel-resize-enabled') === 'true');
  const [layoutPresets, setLayoutPresets] = useState(() => { try { const saved = JSON.parse(localStorage.getItem(LAYOUT_PRESETS_KEY) || '[]'); return Array.isArray(saved) ? saved.slice(-5) : []; } catch { return []; } });
  const [activeLayoutPresetId, setActiveLayoutPresetId] = useState(() => localStorage.getItem('blocksmith-active-layout-preset') || '');
  const [favoriteBlockTypes, setFavoriteBlockTypes] = useState(() => { try { return JSON.parse(localStorage.getItem(FAVORITE_BLOCKS_KEY) || '[]'); } catch { return []; } });
  const [recentBlockTypes, setRecentBlockTypes] = useState(() => { try { return JSON.parse(localStorage.getItem(RECENT_BLOCK_TYPES_KEY) || '[]'); } catch { return []; } });
  const [projectVersions, setProjectVersions] = useState(() => { try { return JSON.parse(localStorage.getItem(PROJECT_VERSIONS_KEY) || '[]'); } catch { return []; } });
  const [searchOpen, setSearchOpen] = useState(false);
  const [bilingualSearch, setBilingualSearch] = useState(() => localStorage.getItem('blocksmith-bilingual-search') === 'true');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResponseSamples, setSearchResponseSamples] = useState([]);
  const searchMeasureRef = useRef(null);
  const searchMeasureIdRef = useRef(0);
  const recordedSearchMeasureIdRef = useRef(0);
  const [searchGroup, setSearchGroup] = useState('');
  const [searchActiveIndex, setSearchActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => { try { return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]'); } catch { return []; } });
  const [frequentBlocks, setFrequentBlocks] = useState(() => { try { return JSON.parse(localStorage.getItem(FREQUENT_BLOCKS_KEY) || '{}'); } catch { return {}; } });
  const [searchInsights, setSearchInsights] = useState(() => { try { return JSON.parse(localStorage.getItem(SEARCH_INSIGHTS_KEY) || '{"queries":{}}'); } catch { return { queries: {} }; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuMode = 'B';
  const [menuTab, setMenuTab] = useState('workspace');
  const [language, setLanguage] = useState(() => localStorage.getItem('blocksmith-language') === 'en' ? 'en' : 'tw');
  const languageRef = useRef(language);
  languageRef.current = language;
  const [legacyCreator, setLegacyCreator] = useState(null);
  const [backpackNotice, setBackpackNotice] = useState('');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('blocksmith-theme') === 'dark' ? 'dark' : 'light');
  const [copiedAccent, setCopiedAccent] = useState('');
  const [accent, setAccent] = useState(() => {
    const savedTheme = localStorage.getItem('blocksmith-theme') === 'dark' ? 'dark' : 'light';
    const savedAccent = localStorage.getItem('blocksmith-accent');
    if (isHexColor(savedAccent)) return savedAccent.toLowerCase();
    const compatibleAccent = savedTheme === 'dark' && savedAccent === 'orange' ? 'white' : savedTheme === 'light' && savedAccent === 'white' ? 'orange' : savedAccent;
    return savedTheme === 'dark' ? (['green', 'blue', 'white'].includes(compatibleAccent) ? compatibleAccent : 'green') : (['green', 'orange', 'blue'].includes(compatibleAccent) ? compatibleAccent : 'green');
  });
  const accentHex = accentHexForTheme(accent, themeMode);
  const accentInk = readableInkForAccent(accentHex);
  const accentReadable = (() => {
    const rgb = accentHex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
    const luminance = rgb.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const surfaceLuminance = themeMode === 'dark' ? 0.012 : 1;
    const contrast = (Math.max(luminance, surfaceLuminance) + 0.05) / (Math.min(luminance, surfaceLuminance) + 0.05);
    return contrast >= 3 ? accentHex : themeMode === 'dark' ? '#e9ebef' : '#17202a';
  })();
  const accentRgb = Number.parseInt(accentHex.slice(1), 16);
  const nearWhiteAccent = accentRgb >= 0xf4f4f4;
  const nearBlackAccent = accentRgb <= 0x0b0b0b;
  const accentSoft = (themeMode === 'light' && nearWhiteAccent)
    ? '#e7ece9'
    : (themeMode === 'dark' && nearBlackAccent)
      ? '#343840'
      : `color-mix(in srgb, ${accentHex} 16%, var(--surface))`;
  const accentCustomStyle = {
    '--accent-ink': accentInk,
    '--accent-readable': accentReadable,
    '--button-ink': accentInk,
    '--accent-outline': `color-mix(in srgb, ${accentInk} 34%, var(--line))`,
    ...(isHexColor(accent) ? {
      '--accent': accentHex,
      '--accent-hover': `color-mix(in srgb, ${accentHex} 82%, ${themeMode === 'dark' ? '#fff' : '#000'})`,
      '--accent-soft': accentSoft,
    } : {}),
  };
  const copyAccentHex = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex.toLowerCase());
      setCopiedAccent(hex.toLowerCase());
      window.setTimeout(() => setCopiedAccent(''), 1500);
    } catch {
      setCopiedAccent('');
    }
  };
  const rightRef = useRef(null);
  const activeSearchResultRef = useRef(null);
  const hoverHideTimerRef = useRef(null);
  const resizeCleanupRef = useRef(null);
  const backpackFileRef = useRef(null);
  const projectFileRef = useRef(null);
  const commandInputRef = useRef(null);
  const renameHighlightTimerRef = useRef(null);
  const selectedBackpackRef = useRef(null);
  const frequentBlocksRef = useRef(frequentBlocks);
  const searchInsightsRef = useRef(searchInsights);
  const restorePointDirtyRef = useRef(false);
  const legacyToolboxRef = useRef(JSON.parse(JSON.stringify(toolbox)));

  useEffect(() => {
    localStorage.setItem('blocksmith-theme', themeMode);
    localStorage.setItem('blocksmith-accent', accent);
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.dataset.accent = accent;
  }, [themeMode, accent]);

  useEffect(() => {
    if (tutorialEnabled && localStorage.getItem('blocksmith-tutorial-completed') !== 'true') {
      setTutorialStep(0);
      setTutorialOpen(true);
    }
  }, [tutorialEnabled]);

  const finishTutorial = () => {
    localStorage.setItem('blocksmith-tutorial-completed', 'true');
    setTutorialOpen(false);
  };
  const replayTutorial = () => {
    setTutorialStep(0);
    setTutorialOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('blocksmith-menu-mode-v2', 'B');
    localStorage.setItem('blocksmith-language', language);
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant-TW';
    if (Blockly) loadBlocklyLocale(language).catch((error) => console.warn('Blockly locale could not be changed', error));
    if (workspaceRef.current && legacyToolboxRef.current) {
      workspaceRef.current.updateToolbox(localizeToolbox(legacyToolboxRef.current, language));
      const workspaceSvg = workspaceRef.current.getInjectionDiv?.()?.querySelector('.blocklyWorkspace');
      workspaceSvg?.setAttribute('aria-label', language === 'en' ? 'Blockly workspace' : 'Blockly工作區');
      Blockly?.Events.disable();
      try { workspaceRef.current.getAllBlocks(false).forEach((block) => localizeBlocklyBlock(block, language)); }
      finally { Blockly?.Events.enable(); }
    }
  }, [menuMode, language]);

  const menuText = (tw, en) => language === 'en' ? en : tw;
  const translateDiagnostic = (text) => ({
    '變數宣告可以放在主程式內。這個方塊目前游離在主程式外，會作為全域變數輸出；若要在 main() 內使用，請把它接到「主程式」的流程插槽。': 'A variable can be declared inside main(). This block is currently outside main() and will be emitted as a global variable. To use it inside main(), connect it to the main program statement input.',
    '這個宣告目前游離在程式框外，會輸出在 main() 外的全域範圍；建議接到上方「函式庫」插槽，讓程式結構更清楚。': 'This declaration is outside the program structure and will be emitted at global scope, outside main(). Connect it to the Library section above for a clearer structure.',
    '這個流程方塊目前位於 main() 與函式之外，會被輸出在無效的全域位置；請接到「主程式」或函式的流程插槽。': 'This statement block is outside main() and all functions, so it would be emitted at an invalid global location. Connect it to the Main Program or a function statement input.',
    '這個值方塊沒有接到任何值插槽，因此不會形成有效的程式運算；請接到相容方塊的輸入插槽。': 'This value block is not connected to a value input, so it does not form a valid expression. Connect it to a compatible input.',
    '這個方塊沒有接入有效的程式結構；請使用對應的主程式方塊或流程插槽。': 'This block is not connected to a valid program structure. Connect it to the appropriate Main Program or statement input.',
    '這個方塊放在主程式上方的函式庫區域；該區域應放標頭檔、巨集、型別或全域定義。請移到主程式區或相容插槽。': 'This block is in the Library section above main(), which is intended for headers, macros, types, and global declarations. Move it into the Main Program or a compatible input.',
    '這是全域宣告或標頭設定，建議放在主程式上方的函式庫區域。': 'This is a global declaration or header setting. Place it in the Library section above the Main Program.',
    '函式或複合型別定義建議放在主程式上方的函式庫區域，方便閱讀與重用。': 'Function and compound type definitions belong in the Library section above the Main Program for readability and reuse.',
    '函式或複合型別不能巢狀定義在其他方塊內；請直接接到主程式上方的函式庫區域。': 'Functions and compound types cannot be defined inside other blocks. Connect this directly to the Library section above the Main Program.',
    'break 必須放在迴圈或 switch 分支內。': 'break must be inside a loop or switch branch.',
    'continue 必須放在迴圈內。': 'continue must be inside a loop.',
  })[text] || text;
  const translateOutput = (text) => ({
    '按下「編譯並執行」查看實際程式輸出': 'Select “Compile & Run” to see the program output.',
    '積木結構檢查完成。按「編譯並執行」即可使用瀏覽器內的 Clang 編譯並執行 C++。': 'Block structure check complete. Select “Compile & Run” to compile and run C++ with the Clang compiler in your browser.',
    '程式碼會在瀏覽器本機編譯執行；首次使用將下載約 28 MB 的編譯器資源。': 'Code is compiled and run locally in your browser. The compiler assets (about 28 MB) are downloaded on first use.',
    '請先在「程式輸入」欄填入資料，再執行程式。': 'Enter the required data in Program Input before running the program.',
    'C++ 編譯失敗。': 'C++ compilation failed.',
    '程式執行完成，沒有輸出。': 'The program finished without producing output.',
    '編譯器無法完成這次操作。': 'The compiler could not complete this operation.',
    'C++ 編譯工作程序無法啟動。': 'The C++ compiler worker could not be started.',
  })[text] || (language === 'en' && text.startsWith('錯誤：') ? `Error: ${translateDiagnostic(text.slice(3))}` : language === 'en' && text.startsWith('程式結束碼：') ? `Program exited with code: ${text.slice('程式結束碼：'.length)}` : language === 'en' && text.startsWith('編譯或執行超過') ? text.replace('編譯或執行超過', 'Compilation or execution exceeded').replace('秒，已停止工作程序。若程式包含大量範本或無窮迴圈，請簡化程式後再試。', ' seconds; the worker was stopped. If the program contains heavy templates or an infinite loop, simplify it and try again.') : text);
  const translateStatus = (text) => {
    if (language !== 'en') return text;
    const exact = { '等待執行': 'Ready to run', '編譯中…': 'Compiling…', '執行完成': 'Completed', '編譯失敗': 'Compilation failed', '執行失敗': 'Execution failed' };
    if (exact[text]) return exact[text];
    if (text.startsWith('執行完成')) return text.replace('執行完成', 'Completed');
    if (text.startsWith('編譯失敗')) return text.replace('編譯失敗', 'Compilation failed');
    if (text.startsWith('編譯器錯誤')) return text.replace('編譯器錯誤', 'Compiler error');
    if (text.startsWith('位置檢查發現')) return text.replace('位置檢查發現', 'Placement check found');
    if (text.startsWith('積木檢查發現')) return text.replace('積木檢查發現', 'Block check found');
    if (text.startsWith('正在編譯並執行 C++')) return 'Compiling and running C++…';
    if (text.startsWith('下載編譯器資源')) return text.replace('下載編譯器資源', 'Downloading compiler assets');
    return text;
  };
  const translateSaveState = (text) => language === 'en' ? ({ '已自動儲存':'Saved','已儲存':'Saved','儲存失敗':'Save failed','儲存中…':'Saving…','已還原版本':'Version restored','分頁空間不足':'Tab storage is full' })[text] || text : text;
  const translateBackpackNotice = (text) => language !== 'en' ? text : ({
    '請先點選一個方塊，再收納方塊組。':'Select a block before saving a group.',
    '正在載入舊版方塊相容資源…':'Loading legacy block compatibility assets…',
    '背包已匯出為 JSON 檔。':'Backpack exported as a JSON file.',
    '背包已清空。':'Backpack cleared.',
    '這組方塊無法放回目前工作區，請移除舊項目或重新收納。':'This block group cannot be restored to the current workspace. Remove the outdated item or save it again.',
    '無法讀取此背包檔，請選擇 Blocksmith 匯出的 JSON。':'Could not read this backpack file. Select a JSON file exported by Blocksmith.',
  })[text] || text.replace(/^已收納「(.+)」方塊組。$/, 'Saved “$1” to the backpack.').replace(/^已將「(.+)」放回工作區。$/, 'Restored “$1” to the workspace.').replace(/^已匯入 (\d+) 組方塊。$/, 'Imported $1 block groups.');
  const translateCreatorError = (text) => language !== 'en' ? text : ({
    '名稱請以英文字母或底線開頭，只使用英文字母、數字與底線。':'Names must start with a letter or underscore and contain only letters, numbers, and underscores.',
    '這個名稱已經使用，請換一個名稱。':'This name is already in use. Choose another name.',
  })[text] || text.replace('無法更新工具列：', 'Could not update the toolbox: ').replace('請稍後再試', 'Please try again later.');
  const translateLayoutNotice = (text) => {
    if (language !== 'en') return text;
    const exact = {
      '請輸入配置名稱後再建立。':'Enter a layout name before creating it.',
      '最多儲存五組自訂配置，請先刪除一組。':'You can save up to five custom layouts. Delete one first.',
      '配置未能儲存，請確認瀏覽器本機儲存空間。':'Could not save the layout. Check this browser’s local storage.',
      '此配置的版面比例資料有誤，無法套用。':'This layout has an invalid panel ratio and cannot be applied.',
    };
    if (exact[text]) return exact[text];
    return text.replace(/^已更新「(.+)」配置。$/, 'Updated layout “$1”.').replace(/^已建立「(.+)」配置。$/, 'Created layout “$1”.');
  };
  const translateSearchText = (text, forceEnglish = false) => {
    if ((language !== 'en' && !forceEnglish) || !text) return text;
    const descriptions = {
      '加入 iostream、string、vector 等 C++ 標頭檔':'Add C++ headers such as iostream, string, and vector',
      '引入 C++ 標準函式庫':'Include a C++ standard library header',
      '從使用者讀取資料；變數名稱只能包含英文字母、數字與底線，且不可用數字開頭。':'Read input from the user. Variable names may contain letters, numbers, and underscores, but cannot start with a number.',
      '固定程式框架：上方放函式庫，下方放主程式方塊':'Fixed program structure: place libraries above and Main Program blocks below.',
      'C++ for 迴圈':'C++ for loop','範圍 for 迴圈':'Range-based for loop',
      '從輸入資料讀取變數':'Read a variable from the input stream',
      '將文字或運算結果輸出至主控台':'Print text or an expression result to the console',
      '建立字串內容':'Create a string value','數值常數':'Numeric literal','建立 true 或 false':'Create a true or false value',
      '重複執行指定次數':'Repeat a sequence a specified number of times','使用條件控制迴圈':'Repeat a loop while a condition is met',
      '設定初值、終值與遞增值':'Set the initial value, final value, and increment','將值指定給變數':'Assign a value to a variable',
      '選擇要引入的標頭檔':'Choose a header to include','選擇接收輸入的變數':'Choose the variable that receives input',
      '接上要輸出的文字或運算結果':'Connect the text or expression to print','編輯文字內容':'Edit the text value','輸入數值':'Enter a number',
      '選擇 true 或 false':'Choose true or false','設定重複次數並接上要執行的方塊':'Set the repeat count and connect the blocks to run',
      '設定條件並接上迴圈內容':'Set the condition and connect the loop body','設定變數、起始值、終止值與遞增值':'Set the variable, start, end, and increment',
      '選擇變數並接上要指定的值':'Choose a variable and connect the value to assign',
      '建立字串':'Create a string value','建立字元':'Create a character value','輸出換行符號':'Output a newline character',
    };
    if (descriptions[text] || blockEnglishLabels[text] || toolboxEnglishNames[text]) return descriptions[text] || blockEnglishLabels[text] || toolboxEnglishNames[text];
    if (text.endsWith(' 方塊')) {
      const blockType = text.slice(0, -3);
      const label = SEARCHABLE_BLOCKS.find((item) => item.type === blockType)?.label;
      return `${(label && translateSearchText(label, forceEnglish)) || blockType.replaceAll('_', ' ')} block`;
    }
    const localizedParts = Object.keys(blockEnglishLabels).sort((left, right) => right.length - left.length).reduce((result, source) => result.replaceAll(source, blockEnglishLabels[source]), text);
    if (localizedParts !== text) return localizedParts;
    return text;
  };
  const renderSearchText = (text, renderPrimary = (value) => value) => {
    const primary = translateSearchText(text);
    if (!bilingualSearch) return renderPrimary(primary);
    const secondary = language === 'en' ? text : translateSearchText(text, true);
    return secondary && secondary !== primary ? <span className="search-bilingual-text"><span>{renderPrimary(primary)}</span><small>{secondary}</small></span> : renderPrimary(primary);
  };
  const flashSavedState = () => {
    setSavePulseId((id) => id + 1);
    setSaveFeedback(true);
    window.clearTimeout(saveFeedbackTimerRef.current);
    saveFeedbackTimerRef.current = window.setTimeout(() => setSaveFeedback(false), 3000);
  };
  forceSaveRef.current = () => {
    const workspace = workspaceRef.current;
    if (!workspace || switchingProjectRef.current || compilerBusyRef.current) return;
    const savedAt = Date.now();
    const filename = normalizeFilename(filenameRef.current);
    let xml;
    try { xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)); } catch { xml = ''; }
    if (!xml || !persistProject(workspace, filename, savedAt)) { setSaveState('儲存失敗'); return; }
    try {
      const current = JSON.parse(localStorage.getItem(PROJECT_VERSIONS_KEY) || '[]');
      const projectId = activeProjectIdRef.current;
      const versions = Array.isArray(current) ? current : [];
      const latest = versions.find((item) => item.projectId === projectId);
      const version = latest?.xml === xml
        ? { ...latest, filename, savedAt }
        : { id: `${savedAt}-${Math.random().toString(36).slice(2, 7)}`, projectId, filename, savedAt, xml };
      const next = [version, ...versions.filter((item) => item.id !== version.id)].slice(0, 30);
      localStorage.setItem(PROJECT_VERSIONS_KEY, JSON.stringify(next));
      setProjectVersions(next);
      setProjectTabs((tabs) => tabs.map((tab) => tab.id === projectId ? { ...tab, filename, xml, savedAt } : tab));
      setSaveState('已儲存');
      setLastSavedAt(savedAt);
      flashSavedState();
    } catch {
      setSaveState('儲存失敗');
      showMinecraftToast(menuText('專案已儲存，但無法新增還原版本；請確認瀏覽器儲存空間。','Project saved, but a restore point could not be added. Check browser storage space.'));
    }
  };

  useEffect(() => {
    filenameRef.current = fileName;
    document.title = normalizeFilename(fileName);
    localStorage.setItem('blocksmith-filename', fileName);
    const savedAt = Date.now();
    if (workspaceRef.current && persistProject(workspaceRef.current, normalizeFilename(fileName), savedAt)) { setSaveState('已自動儲存'); setLastSavedAt(savedAt); flashSavedState(); }
    setProjectTabs((current) => current.map((item) => item.id === activeProjectIdRef.current ? { ...item, filename: normalizeFilename(fileName) } : item));
  }, [fileName]);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
    localStorage.setItem(ACTIVE_PROJECT_TAB_KEY, activeProjectId);
  }, [activeProjectId]);
  useEffect(() => { try { localStorage.setItem(PROJECT_TABS_KEY, JSON.stringify(projectTabs.slice(-8))); } catch { setSaveState('分頁空間不足'); } }, [projectTabs]);
  useEffect(() => {
    localStorage.setItem('blocksmith-autosave-interval', String(autoSaveInterval));
    const interval = window.setInterval(() => {
      const workspace = workspaceRef.current;
      if (!workspace || switchingProjectRef.current || !restorePointDirtyRef.current) return;
      let xml;
      try { xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)); } catch { return; }
      restorePointDirtyRef.current = false;
      const version = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, projectId: activeProjectIdRef.current, filename: normalizeFilename(filenameRef.current), savedAt: Date.now(), xml };
      setProjectVersions((current) => {
        const previous = current.find((item) => item.projectId === version.projectId);
        if (previous?.xml === version.xml) return current;
        const next = [version, ...current].slice(0, 30);
        try { localStorage.setItem(PROJECT_VERSIONS_KEY, JSON.stringify(next)); } catch { /* Immediate workspace saves remain available. */ }
        return next;
      });
    }, autoSaveInterval * 60_000);
    return () => window.clearInterval(interval);
  }, [autoSaveInterval]);

  useEffect(() => localStorage.setItem('blocksmith-layout', layoutMode), [layoutMode]);
  useEffect(() => localStorage.setItem('blocksmith-layout-ratio', String(layoutRatio)), [layoutRatio]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  useEffect(() => {
    const onShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setCommandOpen((open) => !open); setCommandQuery(''); setCommandIndex(0);
      } else if (event.key === 'F11') {
        event.preventDefault(); runProgram();
      } else if (event.key === 'F10') {
        event.preventDefault(); compileProgram();
      } else if (event.key === 'F8') {
        event.preventDefault();
        setMinimapOpen((open) => { localStorage.setItem(MINIMAP_VISIBLE_KEY, String(!open)); return !open; });
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault(); forceSaveRef.current?.();
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z' && !(event.target instanceof HTMLElement && event.target.closest('input,textarea,[contenteditable="true"]'))) {
        event.preventDefault(); undo(event.shiftKey);
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);
  useEffect(() => { if (commandOpen) window.requestAnimationFrame(() => commandInputRef.current?.focus()); }, [commandOpen]);
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const centerMain = () => {
      const root = workspace.getAllBlocks(false).find((block) => block.type === 'cpp_main');
      reportWorkspaceCenterTiming('layout-mode-center', workspace, root);
    };
    reportWorkspaceCenterTiming('layout-mode-immediate-resize', workspace, null);
    const frame = window.requestAnimationFrame(centerMain);
    const timer = window.setTimeout(centerMain, 280);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [layoutRatio]);
  useEffect(() => localStorage.setItem('blocksmith-panel-sizes', JSON.stringify(panelSizes)), [panelSizes]);
  useEffect(() => { try { localStorage.setItem(LAYOUT_PRESETS_KEY, JSON.stringify(layoutPresets)); } catch { /* Storage may be unavailable in private or quota-limited contexts. */ } }, [layoutPresets]);
  useEffect(() => {
    if (!layoutOpen) return undefined;
    const onPointerDown = (event) => { if (!layoutPickerRef.current?.contains(event.target)) setLayoutOpen(false); };
    const onKeyDown = (event) => { if (event.key === 'Escape') setLayoutOpen(false); };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); window.removeEventListener('keydown', onKeyDown); };
  }, [layoutOpen]);
  useEffect(() => localStorage.setItem(FAVORITE_BLOCKS_KEY, JSON.stringify(favoriteBlockTypes)), [favoriteBlockTypes]);
  useEffect(() => localStorage.setItem(RECENT_BLOCK_TYPES_KEY, JSON.stringify(recentBlockTypes)), [recentBlockTypes]);
  useEffect(() => localStorage.setItem('blocksmith-backpack', JSON.stringify(backpack)), [backpack]);
  useEffect(() => () => { resizeCleanupRef.current?.(); window.clearTimeout(layoutNoticeTimerRef.current); window.clearTimeout(saveFeedbackTimerRef.current); }, []);
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return undefined;
    const centerMain = () => {
      const root = workspace.getAllBlocks(false).find((block) => block.type === 'cpp_main');
      reportWorkspaceCenterTiming('layout-mode-center-only', workspace, root, false);
    };
    const frame = window.requestAnimationFrame(centerMain);
    const timer = window.setTimeout(centerMain, 250);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [layoutRatio]);

  useEffect(() => {
    let cancelled = false;
    let cleanup;
    const initializeWorkspace = async () => {
      if (cancelled) return;
      const startupStartedAt = performance.now();
      const startupPhases = [];
      const recordStartupPhase = (name, startedAt, details = {}) => {
        startupPhases.push({ name, durationMs: Math.round((performance.now() - startedAt) * 10) / 10, ...details });
      };
      let phaseStartedAt = performance.now();
      await loadBlocklyCore();
      await loadBlocklyLocale(language);
      if (cancelled) return;
      recordStartupPhase('core-load', phaseStartedAt);
      phaseStartedAt = performance.now();
      registerMinimalBuiltinBlocks(Blockly);
      recordStartupPhase('builtin-register', phaseStartedAt);
    if (!blocklyHost.current || workspaceRef.current) return undefined;
    phaseStartedAt = performance.now();
    legacyToolboxRef.current = JSON.parse(JSON.stringify(toolbox));
    recordStartupPhase('toolbox-clone', phaseStartedAt);
    phaseStartedAt = performance.now();
    const restoreToolboxBuildMeasure = import.meta.env.DEV ? measureToolboxBuildInternals(Blockly) : null;
    let workspace;
    let toolboxBuildPhases = [];
    try {
      workspace = Blockly.inject(blocklyHost.current, {
        toolbox: localizeToolbox(legacyToolboxRef.current, language),
        renderer: 'zelos',
        grid: { spacing: 24, length: 2, colour: '#e7ece6', snap: true },
        zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.5, minScale: 0.5, scaleSpeed: 1.08 },
        move: { scrollbars: true, drag: true, wheel: true },
        theme,
      });
    } finally {
      if (restoreToolboxBuildMeasure) toolboxBuildPhases = restoreToolboxBuildMeasure();
    }
    const blocklyInjectDurationMs = performance.now() - phaseStartedAt;
    const measuredExclusiveMs = toolboxBuildPhases.reduce((total, item) => total + item.exclusiveMs, 0);
    recordStartupPhase('blockly-inject', phaseStartedAt, {
      toolboxCategories: countToolboxCategories(legacyToolboxRef.current.contents),
      unmeasuredBlocklyMs: Math.round(Math.max(0, blocklyInjectDurationMs - measuredExclusiveMs) * 10) / 10,
      toolboxBuildPhases,
      includesBlocklyToolboxBuild: true,
    });
    workspaceRef.current = workspace;
    const startupLanguage = localStorage.getItem('blocksmith-language') === 'en' ? 'en' : 'tw';
    workspace.getInjectionDiv?.()?.querySelector('.blocklyWorkspace')?.setAttribute('aria-label', startupLanguage === 'en' ? 'Blockly workspace' : 'Blockly工作區');
    Blockly.Events.disable();
    try { workspace.getAllBlocks(false).forEach((block) => localizeBlocklyBlock(block, startupLanguage)); }
    finally { Blockly.Events.enable(); }
    const hostElement = blocklyHost.current;
    const panelElement = hostElement?.closest('.workspace-panel');
    const findBlockFromEvent = (event) => {
      const element = event.target instanceof Element ? event.target : null;
      const blockRoot = element?.closest('.blocklyDraggable');
      const visibleBlocks = [workspace, workspace.getFlyout?.()?.getWorkspace?.()]
        .filter(Boolean)
        .flatMap((visibleWorkspace) => visibleWorkspace.getAllBlocks(false));
      const block = blockRoot
        ? visibleBlocks.find((candidate) => candidate.getSvgRoot() === blockRoot)
        : visibleBlocks.find((candidate) => candidate.getSvgRoot()?.contains(element));
      return block && !block.isInsertionMarker() ? block : null;
    };
    const showBlockInfo = (block) => {
      const bounds = block.getSvgRoot()?.getBoundingClientRect();
      const panelBounds = panelElement?.getBoundingClientRect();
      if (!bounds || !panelBounds) return;
      window.clearTimeout(hoverHideTimerRef.current);
      const info = searchableByType.get(block.type);
      const outputTypes = block.outputConnection?.getCheck()?.join('、');
      const inputTypes = [...new Set(block.inputList.flatMap((input) => input.connection?.getCheck?.() || []))].join('、');
      const maxLeft = Math.max(12, panelBounds.width - 304);
      const left = Math.max(12, Math.min(maxLeft, bounds.left - panelBounds.left));
      const maxTop = Math.max(12, panelBounds.height - 190);
      const below = bounds.bottom - panelBounds.top + 8;
      const top = below < maxTop ? below : Math.max(12, bounds.top - panelBounds.top - 150);
      const nextInfo = {
        id: block.id,
        left,
        top,
        label: info?.label || block.type,
        type: block.type,
        description: info?.description || block.getTooltip?.() || 'Blockly 方塊',
        output: outputTypes ? `輸出：${outputTypes}` : block.outputConnection ? '輸出：值' : block.previousConnection ? '流程方塊' : '',
        input: inputTypes ? `接收：${inputTypes}` : info?.inputSummary || '',
        example: info?.example || '',
      };
      hoveredBlockInfoRef.current = nextInfo;
      setHoveredBlockInfo(nextInfo);
    };
    const onBlockPointerOver = (event) => {
      const block = findBlockFromEvent(event);
      if (block && hoveredBlockInfoRef.current?.id === block.id) window.clearTimeout(hoverHideTimerRef.current);
    };
    const onBlockClick = (event) => {
      const block = findBlockFromEvent(event);
      if (block) showBlockInfo(block);
    };
    const onBlockPointerOut = (event) => {
      const fromBlock = event.target instanceof Element ? event.target.closest('.blocklyDraggable') : null;
      const toBlock = event.relatedTarget instanceof Element ? event.relatedTarget.closest('.blocklyDraggable') : null;
      const toTooltip = event.relatedTarget instanceof Element ? event.relatedTarget.closest('.blocksmith-hover-card') : null;
      if (toTooltip && fromBlock?.dataset.id === hoveredBlockInfoRef.current?.id) return;
      if (fromBlock && fromBlock === toBlock) return;
      window.clearTimeout(hoverHideTimerRef.current);
      if (!hoveredBlockInfoRef.current) return;
      hoverHideTimerRef.current = window.setTimeout(() => {
        hoverHideTimerRef.current = null;
        hoveredBlockInfoRef.current = null;
        setHoveredBlockInfo(null);
      }, 1000);
    };
    hostElement?.addEventListener('pointerover', onBlockPointerOver);
    hostElement?.addEventListener('pointerout', onBlockPointerOut);
    hostElement?.addEventListener('click', onBlockClick, true);
    const creatorButtons = {
      'legacy-create-array': { kind: 'array', title: '新增陣列' },
      'legacy-create-variable': { kind: 'variable', title: '新增變數' },
      'legacy-create-function': { kind: 'function', title: '新增函式／結構／類別' },
      'legacy-create-Vector': { kind: 'container', family: 'Vector', title: '新增 Vector' },
      'legacy-create-Deque': { kind: 'container', family: 'Deque', title: '新增 Deque' },
      'legacy-create-Set': { kind: 'container', family: 'Set', containerKind: 'Set', title: '新增 Set' },
      'legacy-create-Map': { kind: 'container', family: 'Map', containerKind: 'Map', title: '新增 Map' },
      'legacy-create-Pair': { kind: 'container', family: 'Pair', title: '新增 Pair' },
      'legacy-create-Stack': { kind: 'container', family: 'Stack', title: '新增 Stack' },
      'legacy-create-Queue': { kind: 'container', family: 'Queue', title: '新增 Queue' },
      'legacy-create-Priority_Queue': { kind: 'container', family: 'Priority_Queue', title: '新增 Priority_queue' },
      'legacy-create-Bitset': { kind: 'container', family: 'Bitset', title: '新增 Bitset' },
    };
    Object.entries(creatorButtons).forEach(([key, config]) => workspace.registerButtonCallback(key, () => setLegacyCreator({ ...config, name: '', variableKind: 'VAR', functionKind: 'Function' })));
    phaseStartedAt = performance.now();
    try {
      const savedEntities = JSON.parse(localStorage.getItem('blocksmith-legacy-library-entities-v2') || '[]');
      savedEntities.forEach((entity) => installLegacyEntity(workspace, legacyToolboxRef.current, entity, onManageEntity));
      if (savedEntities.length) workspace.updateToolbox(localizeToolbox(legacyToolboxRef.current, language));
    } catch { localStorage.removeItem('blocksmith-legacy-library-entities-v2'); }
    recordStartupPhase('legacy-toolbox-entities', phaseStartedAt);

    phaseStartedAt = performance.now();
    let savedXml = null;
    for (const key of [STORAGE_KEY, BACKUP_KEY]) {
      const snapshot = localStorage.getItem(key);
      if (!snapshot) continue;
      try {
        const project = JSON.parse(snapshot);
        savedXml = project.xml;
        if (project.filename) setFileName(project.filename);
        if (savedXml) break;
      } catch {
        savedXml = snapshot;
        break;
      }
    }
    if (!savedXml) savedXml = localStorage.getItem(LEGACY_STORAGE_KEY);
    recordStartupPhase('project-read', phaseStartedAt, { hasSavedProject: Boolean(savedXml) });
    let hadMainBlock = false;
    if (savedXml) {
      try {
        phaseStartedAt = performance.now();
        const xml = Blockly.utils.xml.textToDom(savedXml);
        recordStartupPhase('xml-parse', phaseStartedAt, { xmlLength: savedXml.length });
        phaseStartedAt = performance.now();
        const needsFullBuiltinPack = xmlNeedsFullBuiltinPack(xml, Blockly);
        recordStartupPhase('legacy-builtin-scan', phaseStartedAt, { needsFullPack: needsFullBuiltinPack });
        if (needsFullBuiltinPack) {
          phaseStartedAt = performance.now();
          await loadFullBuiltinPack();
          recordStartupPhase('full-builtin-load', phaseStartedAt);
        }
        phaseStartedAt = performance.now();
        hadMainBlock = Boolean(xml.querySelector('block[type="cpp_main"]'));
        const stopRestoreMeasure = import.meta.env.DEV ? measureXmlRestoreInternals(Blockly, workspace) : null;
        let xmlRestorePhases = [];
        try {
          Blockly.Xml.domToWorkspace(xml, workspace);
        } finally {
          if (stopRestoreMeasure) xmlRestorePhases = stopRestoreMeasure();
        }
        recordStartupPhase('xml-restore', phaseStartedAt, {
          restoredBlocks: workspace.getAllBlocks(false).length,
          xmlRestorePhases,
        });
      } catch (error) {
        console.error('已儲存的 Blockly 專案無法還原', error);
        // Keep the original XML recoverable if the current Blockly build
        // cannot yet parse a legacy mutator shape.
        if (savedXml) localStorage.setItem(BACKUP_KEY, JSON.stringify({ filename: filenameRef.current, xml: savedXml }));
        localStorage.removeItem(STORAGE_KEY);
        savedXml = null;
      }
    }
    phaseStartedAt = performance.now();
    if (!savedXml) {
      const mainBlock = workspace.newBlock('cpp_main');
      mainBlock.initSvg();
      mainBlock.render();
      mainBlock.moveBy(40, 35);
    }
    let mainBlock = ensureMainBlock(workspace, !hadMainBlock);
    // Do not run the historical one-time "legacy block re-import" cleanup
    // here. It deleted every saved non-main block at startup and broke the
    // promised restoration path for existing projects.
    const centerAtStart = () => {
      reportWorkspaceCenterTiming('restore-center', workspace, mainBlock);
    };
    window.requestAnimationFrame(centerAtStart);
    if (!savedXml) {
      const include = workspace.newBlock('cpp_include');
      include.setFieldValue('iostream', 'LIB');
      include.initSvg(); include.render();
      mainBlock.getInput('LIBS').connection.connect(include.previousConnection);
      const print = workspace.newBlock('text_print');
      const text = workspace.newBlock('text');
      text.setFieldValue('Hello, C++!', 'TEXT');
      print.initSvg(); print.render(); text.initSvg(); text.render();
      print.getInput('TEXT').connection.connect(text.outputConnection);
      mainBlock.getInput('BODY').connection.connect(print.previousConnection);
    }
    ensureMainBlock(workspace);
    Blockly.Events.disable();
    try { workspace.getAllBlocks(false).forEach((block) => localizeBlocklyBlock(block, startupLanguage)); }
    finally { Blockly.Events.enable(); }
    recordStartupPhase('default-blocks', phaseStartedAt, { blockCount: workspace.getAllBlocks(false).length });
    workspace.clearUndo();

    let removingDefaultShadows = false;
    const removeDefaultShadows = (event) => {
      if (removingDefaultShadows || event?.type !== Blockly.Events.BLOCK_CREATE) return;
      const ids = [...new Set([...(event.ids || []), event.blockId].filter(Boolean))];
      const shadows = ids.map((id) => workspace.getBlockById(id)).filter((block) => block?.isShadow());
      if (!shadows.length) return;
      removingDefaultShadows = true;
      shadows.forEach((shadow) => {
        const parentConnection = shadow.outputConnection?.targetConnection || shadow.previousConnection?.targetConnection;
        parentConnection?.setShadowDom(null);
        shadow.dispose(false);
      });
      removingDefaultShadows = false;
    };
    const update = (event) => {
      removeDefaultShadows(event);
      if ([Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_DELETE, Blockly.Events.BLOCK_CHANGE, Blockly.Events.BLOCK_MOVE].includes(event?.type)) restorePointDirtyRef.current = true;
      if (event?.type === Blockly.Events.BLOCK_CREATE) {
        const blockIds = [...new Set([...(event.ids || []), event.blockId].filter(Boolean))];
        blockIds.forEach((id) => localizeBlocklyBlock(workspace.getBlockById(id), languageRef.current));
      }
      if (event?.type === Blockly.Events.BLOCK_CREATE) {
        const createdTypes = (event.ids || [event.blockId]).map((id) => workspace.getBlockById(id)?.type).filter((type) => searchableByType.has(type));
        if (createdTypes.length && toastLevelRef.current === 'frequent') showMinecraftToast(languageRef.current === 'en' ? 'Block placed! Keep building your program.' : '方塊放置成功！繼續搭建你的程式。');
        if (createdTypes.length) {
          const nextFrequent = { ...frequentBlocksRef.current };
          createdTypes.forEach((type) => { nextFrequent[type] = (nextFrequent[type] || 0) + 1; });
          frequentBlocksRef.current = nextFrequent;
          setFrequentBlocks(nextFrequent);
          localStorage.setItem(FREQUENT_BLOCKS_KEY, JSON.stringify(nextFrequent));
          setRecentBlockTypes((current) => {
            const next = [...new Set([...createdTypes.reverse(), ...current])].slice(0, 12);
            localStorage.setItem(RECENT_BLOCK_TYPES_KEY, JSON.stringify(next));
            return next;
          });
        }
      }
      applyWorkspaceFieldTheme(workspace, themeMode === 'dark');
      const nextCode = generateCode(workspace);
      setCode(nextCode);
      setBlockCount(workspace.getAllBlocks(false).length);
      setMinimapBlocks(workspace.getAllBlocks(false).map((block) => {
        const point = block.getRelativeToSurfaceXY();
        const size = block.getHeightWidth?.() || { width: 36, height: 22 };
        return { id: block.id, x: point.x, y: point.y, width: Math.max(28, size.width), height: Math.max(16, size.height), color: block.getColour?.() || '#678' };
      }));
      setDiagnostics(getWorkspaceDiagnostics(workspace, reminderThreshold));
      ensureMainBlock(workspace);
      setHistoryState({ undo: workspace.getUndoStack().length > 0, redo: workspace.getRedoStack().length > 0 });
      const savedAt = Date.now();
      const saved = persistProject(workspace, normalizeFilename(filenameRef.current), savedAt);
      setSaveState(saved ? '已自動儲存' : '儲存失敗');
      if (saved) { setLastSavedAt(savedAt); flashSavedState(); }
      if (!switchingProjectRef.current) {
        const xmlSnapshot = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        setProjectTabs((current) => {
          const next = current.some((item) => item.id === activeProjectIdRef.current)
            ? current.map((item) => item.id === activeProjectIdRef.current ? { ...item, filename: normalizeFilename(filenameRef.current), xml: xmlSnapshot, savedAt } : item)
            : [...current, { id: activeProjectIdRef.current, filename: normalizeFilename(filenameRef.current), xml: xmlSnapshot, savedAt }];
          try { localStorage.setItem(PROJECT_TABS_KEY, JSON.stringify(next.slice(-8))); } catch { /* Workspace autosave remains the recovery source. */ }
          return next.slice(-8);
        });
      }
      if (event?.type === Blockly.Events.BLOCK_DRAG) {
        if (event.isStart) {
          dragHintRef.current = event.blockId;
          setDragHint(languageRef.current === 'en' ? 'Dragging: compatible sockets light up. If no socket is highlighted, release leaves the block where it started.' : '拖曳中：相容插槽會亮起；若沒有插槽亮起，放開後方塊會留在原位。');
        } else {
          dragHintRef.current = null;
          setDragHint('');
        }
      }
    };
    workspace.addChangeListener(update);
    const flyoutWorkspace = workspace.getFlyout?.()?.getWorkspace?.();
    const removeFlyoutDefaultShadows = (event) => {
      if (event?.type !== Blockly.Events.BLOCK_CREATE) return;
      const ids = [...new Set([...(event.ids || []), event.blockId].filter(Boolean))];
      ids.forEach((id) => localizeBlocklyBlock(flyoutWorkspace?.getBlockById(id), languageRef.current));
      ids.map((id) => flyoutWorkspace?.getBlockById(id)).filter((block) => block?.isShadow()).forEach((shadow) => {
        const parentConnection = shadow.outputConnection?.targetConnection || shadow.previousConnection?.targetConnection;
        parentConnection?.setShadowDom(null);
        shadow.dispose(false);
      });
    };
    flyoutWorkspace?.addChangeListener(removeFlyoutDefaultShadows);
    const updateBackpackSelection = (event) => {
      if (event.type !== Blockly.Events.SELECTED) return;
      const selected = event.newElementId ? workspace.getBlockById(event.newElementId) : null;
      // Blockly deselects a block when focus moves to the backpack controls.
      // Keep the last valid block until a different block is selected.
      if (!selected) return;
      const root = getBackpackRoot(workspace, selected);
      selectedBackpackRef.current = root;
      setSelectedBackpackBlock(root ? { id: root.id, label: getBackpackLabel(root) } : null);
    };
    workspace.addChangeListener(updateBackpackSelection);
    phaseStartedAt = performance.now();
    update();
    recordStartupPhase('initial-update', phaseStartedAt);
    let firstFrameRecorded = false;
    const reportFirstFrame = () => {
      if (firstFrameRecorded) return;
      firstFrameRecorded = true;
      if (!import.meta.env.DEV) return;
      startupPhases.push({
        name: 'first-frame',
        durationMs: Math.round((performance.now() - firstFrameWaitStartedAt) * 10) / 10,
        sinceWorkspaceInitMs: Math.round((performance.now() - startupStartedAt) * 10) / 10,
      });
      const appStartedAt = performance.getEntriesByName('blocksmith-app-load-start').at(-1)?.startTime;
      console.info('[blocksmith-perf] editor-ready ' + JSON.stringify({
        durationMs: Math.round(performance.now() - startupStartedAt),
        appStartToFirstFrameMs: appStartedAt === undefined ? null : Math.round(performance.now() - appStartedAt),
        builtinMode: fullBuiltinPackLoaded ? 'full-compatibility' : 'minimal',
        phases: startupPhases,
      }));
    };
    const resize = () => Blockly.svgResize(workspace);
    window.addEventListener('resize', resize);
    const onToolboxCategoryClick = (event) => {
      const row = event.target.closest?.('[role="treeitem"]');
      const labelId = row?.getAttribute('aria-labelledby')?.split(/\s+/)[0];
      const name = labelId ? document.getElementById(labelId)?.textContent?.trim() : '';
      if (!name) return;
      const clickedAt = performance.now();
      window.requestAnimationFrame(() => {
        if (import.meta.env.DEV) console.info('[blocksmith-perf] toolbox-category-first-frame ' + JSON.stringify({ name, durationMs: Math.round((performance.now() - clickedAt) * 10) / 10 }));
      });
    };
    const toolboxDiv = document.querySelector('.blocklyToolbox');
    toolboxDiv?.addEventListener('click', onToolboxCategoryClick, true);
    const firstFrameWaitStartedAt = performance.now();
    window.requestAnimationFrame(reportFirstFrame);
    cleanup = () => {
      window.removeEventListener('resize', resize);
      toolboxDiv?.removeEventListener('click', onToolboxCategoryClick, true);
      flyoutWorkspace?.removeChangeListener(removeFlyoutDefaultShadows);
      hostElement?.removeEventListener('pointerover', onBlockPointerOver);
      hostElement?.removeEventListener('pointerout', onBlockPointerOut);
      hostElement?.removeEventListener('click', onBlockClick, true);
      workspace.dispose();
      workspaceRef.current = null;
    };
    };
    initializeWorkspace().catch((error) => console.error('Blockly 工作區初始化失敗', error));
    return () => {
      window.clearTimeout(hoverHideTimerRef.current);
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    workspaceRef.current?.setTheme(themeMode === 'dark' ? darkTheme : theme);
    applyWorkspaceFieldTheme(workspaceRef.current, themeMode === 'dark');
  }, [themeMode]);

  const showMinecraftToast = (message) => {
    setMinecraftToast({ id: Date.now(), message });
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setMinecraftToast(null), 3800);
  };
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  };
  const downloadCode = () => {
    const url = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = normalizeFilename(fileName);
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const exportProject = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const project = { format: 'blocksmith-project', version: 1, filename: normalizeFilename(fileName), exportedAt: new Date().toISOString(), xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)), libraryEntities: JSON.parse(localStorage.getItem('blocksmith-legacy-library-entities-v2') || '[]') };
    const url = URL.createObjectURL(new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = normalizeFilename(fileName).replace(/\.cpp$/i, '.blocksmith.json'); anchor.click(); URL.revokeObjectURL(url);
  };
  const importProject = async (file) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.format !== 'blocksmith-project' || typeof data.xml !== 'string') throw new Error('invalid project');
      const xml = Blockly.utils.xml.textToDom(data.xml);
      if (xml.tagName.toLowerCase() !== 'xml') throw new Error('invalid XML');
      const workspace = workspaceRef.current;
      if (!workspace) throw new Error('workspace unavailable');
      if (await ensureBuiltinDefinitionsForXml(xml, Blockly, loadFullBuiltinPack)) setBackpackNotice('正在載入舊版方塊相容資源…');
      const entities = Array.isArray(data.libraryEntities) ? data.libraryEntities : [];
      const importedBlockCount = xml.querySelectorAll('block[type], shadow[type]').length;
      if (blockCount && !window.confirm(menuText(`匯入檢查完成：${importedBlockCount} 個方塊、${entities.length} 組自訂工具箱項目。檔案「${file.name}」匯入後會取代目前工作區，是否繼續？`,`Import validation found ${importedBlockCount} blocks and ${entities.length} custom toolbox groups. Importing “${file.name}” will replace the current workspace. Continue?`))) return;
      entities.forEach((entity) => installLegacyEntity(workspace, legacyToolboxRef.current, entity, onManageEntity));
      const unknown = [...new Set([...xml.querySelectorAll('block[type], shadow[type]')].map((node) => node.getAttribute('type')).filter((type) => !Blockly.Blocks[type]))];
      if (unknown.length) throw new Error(`unknown block types: ${unknown.join(', ')}`);
      const previousXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      try {
        workspace.clear();
        Blockly.Xml.domToWorkspace(xml, workspace);
        ensureMainBlock(workspace, true);
        if (entities.length) {
          localStorage.setItem('blocksmith-legacy-library-entities-v2', JSON.stringify(entities));
          workspace.updateToolbox(localizeToolbox(legacyToolboxRef.current, language));
        }
        if (data.filename) setFileName(normalizeFilename(data.filename));
        workspace.clearUndo();
        const savedAt = Date.now();
        const saved = persistProject(workspace, normalizeFilename(data.filename || fileName), savedAt);
        if (saved) { setLastSavedAt(savedAt); flashSavedState(); }
        setSaveState('已匯入並儲存');
      } catch (error) {
        workspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(previousXml), workspace);
        throw error;
      }
    } catch (error) {
      console.error('專案匯入檢查失敗', error);
      window.alert(menuText(`無法匯入這份專案：${error.message || '檔案格式錯誤'}。原工作區已保留。`,`Could not import this project: ${error.message || 'Invalid file format'}. The current workspace was kept.`));
    } finally {
      if (projectFileRef.current) projectFileRef.current.value = '';
    }
  };
  const loadExampleProject = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    if (blockCount > 3 && !window.confirm(menuText('載入範例會取代目前工作區。是否繼續？','Loading an example will replace the current workspace. Continue?'))) return;
    workspace.clear();
    const main = workspace.newBlock('cpp_main');
    const include = workspace.newBlock('cpp_include'); include.setFieldValue('iostream', 'LIB');
    const print = workspace.newBlock('text_print');
    const message = workspace.newBlock('text'); message.setFieldValue('Hello, C++!', 'TEXT');
    [main, include, print, message].forEach((block) => { block.initSvg(); block.render(); });
    main.getInput('LIBS').connection.connect(include.previousConnection);
    print.getInput('TEXT').connection.connect(message.outputConnection);
    main.getInput('BODY').connection.connect(print.previousConnection);
    main.moveBy(40, 35);
    workspace.clearUndo();
    setFileName('hello-world.cpp');
    setTutorialOpen(true); setTutorialStep(0); setCommandOpen(false);
    requestAnimationFrame(() => workspace.centerOnBlock(main.id, true));
  };
  const focusBlock = (blockId) => {
    const workspace = workspaceRef.current;
    const block = blockId && workspace?.getBlockById(blockId);
    if (!block) return;
    block.select(); workspace.centerOnBlock(block.id, true);
    const root = block.getSvgRoot(); root?.classList.add('blocksmith-focus-block');
    window.setTimeout(() => root?.classList.remove('blocksmith-focus-block'), 1800);
  };
  const openBlockTutorial = (source) => {
    const block = source?.type && source?.getInput ? source : null;
    const type = source?.type || '';
    const catalog = searchableByType.get(type) || source || {};
    const inputs = block ? block.inputList.map((input) => {
      const kind = input.type === Blockly.INPUT_VALUE ? '值輸入' : input.type === Blockly.NEXT_STATEMENT ? '流程內容' : '欄位';
      const checks = input.connection?.getCheck?.()?.join('、');
      return `${input.name || '一般'}：${kind}${checks ? `（${checks}）` : ''}`;
    }) : [];
    const outputType = block?.outputConnection?.getCheck?.()?.join('、');
    setBlockTutorial({
      type,
      blockId: block?.id || source?.id,
      title: catalog.label || source?.label || type || '方塊教學',
      description: catalog.description || block?.getTooltip?.() || '此方塊用於建立程式中的一個操作。',
      inputSummary: catalog.inputSummary || source?.input || inputs.join('；') || '此方塊沒有額外輸入欄位。',
      connectionSummary: outputType ? `輸出資料：${outputType}` : source?.output || (block?.previousConnection ? '流程方塊：接在主程式或其他流程方塊中。' : '依所在方塊類別決定連接方式。'),
      fields: block?.inputList.flatMap((input) => input.fieldRow.map((field) => field.getText?.()).filter(Boolean)).filter(Boolean) || [],
      example: catalog.example || '',
    });
  };
  const focusMainBlock = () => {
    const main = workspaceRef.current?.getAllBlocks(false).find((block) => block.type === 'cpp_main');
    if (main) focusBlock(main.id);
  };
  const refreshWorkspaceState = (workspace) => {
    const blocks = workspace.getAllBlocks(false);
    setCode(generateCode(workspace));
    setBlockCount(blocks.length);
    setMinimapBlocks(blocks.map((block) => {
      const point = block.getRelativeToSurfaceXY();
      const size = block.getHeightWidth?.() || { width: 36, height: 22 };
      return { id: block.id, x: point.x, y: point.y, width: Math.max(28, size.width), height: Math.max(16, size.height), color: block.getColour?.() || '#678' };
    }));
    setDiagnostics(getWorkspaceDiagnostics(workspace, reminderThreshold));
    applyWorkspaceFieldTheme(workspace, themeMode === 'dark');
    setHistoryState({ undo: workspace.getUndoStack().length > 0, redo: workspace.getRedoStack().length > 0 });
  };
  const saveActiveTabSnapshot = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    setProjectTabs((current) => current.map((item) => item.id === activeProjectIdRef.current ? { ...item, filename: normalizeFilename(filenameRef.current), xml, savedAt: Date.now() } : item));
  };
  const switchProjectTab = async (tab) => {
    if (compilerBusyRef.current) {
      setProjectBusyNotice(`「${runningProjectNameRef.current || '目前專案'}」分頁正在編譯或執行作業，請稍後再切換。`);
      window.setTimeout(() => setProjectBusyNotice(''), 4500);
      return;
    }
    if (!tab || tab.id === activeProjectIdRef.current || !workspaceRef.current) return;
    saveActiveTabSnapshot();
    switchingProjectRef.current = true;
    try {
      const workspace = workspaceRef.current;
      const xml = tab.xml ? Blockly.utils.xml.textToDom(tab.xml) : null;
      if (xml && await ensureBuiltinDefinitionsForXml(xml, Blockly, loadFullBuiltinPack)) setBackpackNotice('正在載入舊版方塊相容資源…');
      Blockly.Events.disable();
      try {
        workspace.clear();
        if (xml) Blockly.Xml.domToWorkspace(xml, workspace);
        ensureMainBlock(workspace, true);
        workspace.clearUndo();
      } finally { Blockly.Events.enable(); }
      activeProjectIdRef.current = tab.id;
      setActiveProjectId(tab.id);
      setFileName(normalizeFilename(tab.filename));
      setLastSavedAt(tab.savedAt || Date.now());
      refreshWorkspaceState(workspace);
    } catch (error) {
      window.alert(menuText(`無法切換專案分頁：${error.message || '專案資料格式錯誤'}`,`Could not switch project tabs: ${error.message || 'Invalid project data'}`));
    } finally { switchingProjectRef.current = false; }
  };
  const addProjectTab = () => {
    if (compilerBusyRef.current) {
      setProjectBusyNotice(`「${runningProjectNameRef.current || '目前專案'}」分頁正在編譯或執行作業，請稍後再新增分頁。`);
      window.setTimeout(() => setProjectBusyNotice(''), 4500);
      return;
    }
    if (projectTabs.length >= 8) { window.alert(menuText('目前最多同時開啟 8 個專案，請先關閉一個分頁。','You can have up to 8 projects open. Close a tab first.')); return; }
    setProjectNameDraft('');
    setProjectCloneXml('');
    setMenuOpen(false);
    setProjectCreateOpen(true);
  };
  const createProjectTab = (requestedName = '') => {
    const workspace = workspaceRef.current;
    if (!workspace || projectTabs.length >= 8) return;
    saveActiveTabSnapshot();
    const id = `project-${Date.now()}`;
    const existingNumbers = projectTabs.map((item) => Number(item.filename.match(/^(?:untitled-)?(\d+)\.cpp$/i)?.[1] || 0));
    const number = Math.max(0, ...existingNumbers) + 1;
    const filename = normalizeFilename(requestedName.trim() || `untitled-${number}`);
    const tab = { id, filename, xml: projectCloneXml, savedAt: Date.now() };
    switchingProjectRef.current = true;
    activeProjectIdRef.current = id;
    setActiveProjectId(id);
    setProjectTabs((current) => [...current, tab]);
    setFileName(tab.filename);
    Blockly.Events.disable();
    try {
      workspace.clear();
      if (projectCloneXml) Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(projectCloneXml), workspace);
      ensureMainBlock(workspace, true);
      workspace.clearUndo();
    }
    finally { Blockly.Events.enable(); }
    switchingProjectRef.current = false;
    refreshWorkspaceState(workspace);
    setProjectCreateOpen(false);
    setProjectNameDraft('');
    setProjectCloneXml('');
  };
  const duplicateProjectTab = () => {
    const active = projectTabs.find((item) => item.id === activeProjectIdRef.current);
    if (!active || projectTabs.length >= 8) { window.alert(menuText('目前最多同時開啟 8 個專案，請先關閉一個分頁。','You can have up to 8 projects open. Close a tab first.')); return; }
    const copyName = active.filename.replace(/\.cpp$/i, '') + ' copy';
    setProjectCloneXml(workspaceRef.current ? Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspaceRef.current)) : active.xml || '');
    setProjectNameDraft(copyName);
    setMenuOpen(false);
    setProjectCreateOpen(true);
    window.requestAnimationFrame(() => document.getElementById('project-name-draft')?.focus());
  };
  const deleteActiveProject = async () => {
    const activeId = activeProjectIdRef.current;
    const active = projectTabs.find((item) => item.id === activeId);
    if (!active || compilerBusyRef.current) return;
    if (!window.confirm(menuText(`確定刪除專案「${active.filename}」？此分頁和它的自動儲存版本會一併移除。`,`Delete “${active.filename}”? Its project tab and autosaved restore points will be removed.`))) return;
    const remaining = projectTabs.filter((item) => item.id !== activeId);
    setProjectVersions((current) => {
      const next = current.filter((item) => item.projectId !== activeId);
      try { localStorage.setItem(PROJECT_VERSIONS_KEY, JSON.stringify(next)); } catch { /* Keep in-memory history consistent. */ }
      return next;
    });
    setProjectTabs(remaining);
    if (remaining.length) {
      await switchProjectTab(remaining[Math.max(0, projectTabs.findIndex((item) => item.id === activeId) - 1)]);
    } else {
      const nextId = `project-${Date.now()}`;
      const nextTab = { id: nextId, filename: 'main.cpp', xml: '', savedAt: Date.now() };
      switchingProjectRef.current = true;
      activeProjectIdRef.current = nextId;
      setActiveProjectId(nextId);
      setProjectTabs([nextTab]);
      setFileName(nextTab.filename);
      const workspace = workspaceRef.current;
      Blockly.Events.disable();
      try { workspace.clear(); ensureMainBlock(workspace, true); workspace.clearUndo(); }
      finally { Blockly.Events.enable(); }
      switchingProjectRef.current = false;
      refreshWorkspaceState(workspace);
    }
    setMenuOpen(false);
  };
  const closeProjectTab = async (tab, event) => {
    event.stopPropagation();
    if (compilerBusyRef.current) {
      setProjectBusyNotice(`「${runningProjectNameRef.current || '目前專案'}」分頁正在編譯或執行作業，請稍後再關閉分頁。`);
      window.setTimeout(() => setProjectBusyNotice(''), 4500);
      return;
    }
    if (projectTabs.length <= 1) return;
    if (tab.id === activeProjectIdRef.current && blockCount > 1 && !window.confirm(menuText(`關閉「${tab.filename}」分頁？內容已自動保存。`,`Close the “${tab.filename}” tab? Its contents have been saved.`))) return;
    const remaining = projectTabs.filter((item) => item.id !== tab.id);
    if (tab.id === activeProjectIdRef.current) await switchProjectTab(remaining[Math.max(0, projectTabs.findIndex((item) => item.id === tab.id) - 1)]);
    setProjectTabs(remaining);
  };
  const resetWorkspace = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const deletableCount = workspace.getAllBlocks(false).filter((block) => block.type !== 'cpp_main' && block.isDeletable()).length;
    if (!deletableCount) return;
    if (!window.confirm(menuText(`即將清除目前工作區的 ${deletableCount} 個方塊，是否繼續？`,`This will remove ${deletableCount} blocks from the current workspace. Continue?`))) return;
    if (!window.confirm(menuText('再次確認：清除後無法用「上一步」復原這些方塊。確定要重設工作區？','Confirm again: these blocks cannot be restored with Undo. Reset the workspace?'))) return;
    workspace?.getAllBlocks(false).forEach((block) => {
      if (block.type !== 'cpp_main' && block.isDeletable()) block.dispose(false);
    });
    setRunOutput('按下「編譯並執行」查看實際程式輸出');
    setRunState('等待執行');
  };
  const runProgram = async () => {
    if (compilerBusyRef.current) return;
    const workspace = workspaceRef.current;
    const issues = getWorkspaceDiagnostics(workspace, reminderThreshold);
    setDiagnostics(issues);
    const errors = issues.filter((issue) => issue.severity === 'error');
    if (errors.length) {
      setRunOutput(menuText(`檢查發現 ${errors.length} 個錯誤；詳細訊息與定位操作列在此輸出區上方。`,`Found ${errors.length} errors. Details and block links are listed above in this output panel.`));
      setRunState(`位置檢查發現 ${errors.length} 個錯誤`);
      return;
    }
    const blocks = workspace?.getAllBlocks(false) ?? [];
    if (blocks.some((block) => block.type === 'cpp_cin') && !stdinValue.trim()) {
      setRunOutput('請先在「程式輸入」欄填入資料，再執行程式。');
      setRunState('等待輸入');
      return;
    }
    if (stdinValue.trim()) {
      const nextHistory = [stdinValue, ...stdinHistory.filter((value) => value !== stdinValue)].slice(0, 8);
      setStdinHistory(nextHistory);
      try { localStorage.setItem('blocksmith-stdin-history', JSON.stringify(nextHistory)); } catch { /* Keep the current session usable when storage is full. */ }
    }
    const operationStartedAt = performance.now();
    compilerBusyRef.current = true;
    runningProjectNameRef.current = normalizeFilename(fileName);
    setIsRunning(true);
    setRunOutput('程式碼會在瀏覽器本機編譯執行；首次使用將下載約 28 MB 的編譯器資源。');
    setRunState('準備 C++ 編譯器…');

    try {
      let worker = compilerWorkerRef.current;
      if (!worker) {
        worker = new Worker(new URL('./cppCompiler.worker.js', import.meta.url), { type: 'module' });
        compilerWorkerRef.current = worker;
      }
      const requestId = ++compilerRequestRef.current;
      const result = await new Promise((resolve) => {
        let settled = false;
        const finish = (value) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeoutId);
          worker.removeEventListener('message', onMessage);
          worker.removeEventListener('error', onError);
          resolve(value);
        };
        const onMessage = ({ data }) => {
          if (data?.type === 'progress') {
            const percent = Math.round((data.progress || 0) * 100);
            setRunState(percent < 100 ? `下載編譯器資源… ${percent}%` : '正在編譯並執行 C++…');
            return;
          }
          if (data?.requestId !== requestId) return;
          finish(data);
        };
        const onError = (event) => finish({ type: 'error', message: event.message || 'C++ 編譯工作程序無法啟動。' });
        const timeoutId = window.setTimeout(() => {
          worker.terminate();
          compilerWorkerRef.current = null;
          finish({ type: 'timeout' });
        }, 120000);
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        worker.postMessage({ type: 'run', requestId, code, stdin: stdinValue });
      });
      setLastExecutionTiming({ totalMs: performance.now() - operationStartedAt, compileMs: result.compileMs, runMs: result.runMs });
      if (result.type === 'timeout') {
        setRunOutput('編譯或執行超過 120 秒，已停止工作程序。若程式包含大量範本或無窮迴圈，請簡化程式後再試。');
        setRunState('已逾時');
      } else if (result.type === 'error') {
        setRunOutput(result.message || '編譯器無法完成這次操作。');
        setRunState('編譯器錯誤');
      } else if (result.errors?.length || result.exitCode === null) {
        setRunOutput(result.errors?.join('\n') || result.stderr || 'C++ 編譯失敗。');
        setRunState('編譯失敗');
      } else if (result.exitCode !== 0) {
        setRunOutput(result.output || result.stderr || `程式結束碼：${result.exitCode}`);
        setRunState(`執行失敗 · 結束碼 ${result.exitCode}`);
      } else {
        setRunOutput(result.output || '程式執行完成，沒有輸出。');
        setRunState(`執行完成 · 編譯 ${(result.compileMs / 1000).toFixed(2)} 秒 · 執行 ${((result.runMs || 0) / 1000).toFixed(2)} 秒`);
        if (toastLevel !== 'off') showMinecraftToast(menuText('執行成功！冒險又前進一步。','Success! Your coding adventure moves forward.'));
      }
    } catch (error) {
      setLastExecutionTiming({ totalMs: performance.now() - operationStartedAt, compileMs: null, runMs: null });
      compilerWorkerRef.current?.terminate();
      compilerWorkerRef.current = null;
      setRunOutput(error?.message || 'C++ 編譯工作程序無法啟動。');
      setRunState('編譯器錯誤');
    } finally {
      compilerBusyRef.current = false;
      runningProjectNameRef.current = '';
      setIsRunning(false);
    }
  };
  const compileProgram = () => {
    const workspace = workspaceRef.current;
    const issues = getWorkspaceDiagnostics(workspace, reminderThreshold);
    setDiagnostics(issues);
    const errors = issues.filter((issue) => issue.severity === 'error');
    if (errors.length) {
      setRunOutput(menuText(`檢查發現 ${errors.length} 個錯誤；詳細訊息與定位操作列在此輸出區上方。`,`Found ${errors.length} errors. Details and block links are listed above in this output panel.`));
      setRunState(`積木檢查發現 ${errors.length} 個錯誤`);
      return;
    }
    setRunOutput('積木結構檢查完成。按「編譯並執行」即可使用瀏覽器內的 Clang 編譯並執行 C++。');
    setRunState('積木檢查完成');
  };

  const undo = (redo = false) => workspaceRef.current?.undo(redo);
  const normalizedSearchQuery = normalizeSearchText(searchTerm);
  const searchResults = useMemo(() => {
    const startedAt = performance.now();
    const results = searchBlocks(searchTerm, searchInsights.queries?.[normalizedSearchQuery]);
    if (normalizedSearchQuery) searchMeasureRef.current = { id: ++searchMeasureIdRef.current, query: normalizedSearchQuery, startedAt };
    return results;
  }, [searchTerm, searchInsights, normalizedSearchQuery]);
  useLayoutEffect(() => {
    if (!searchOpen || !normalizedSearchQuery) return;
    const measurement = searchMeasureRef.current;
    if (!measurement || measurement.query !== normalizedSearchQuery || measurement.id === recordedSearchMeasureIdRef.current) return;
    recordedSearchMeasureIdRef.current = measurement.id;
    setSearchResponseSamples((samples) => [...samples, performance.now() - measurement.startedAt].slice(-30));
  }, [searchOpen, normalizedSearchQuery, searchResults]);
  const searchResponseSummary = searchResponseSamples.length
    ? (() => {
        const sorted = [...searchResponseSamples].sort((a, b) => a - b);
        const p50 = sorted[Math.floor((sorted.length - 1) * 0.5)];
        const p95 = sorted[Math.ceil(sorted.length * 0.95) - 1];
        return `${menuText('最近','Recent')} ${sorted.length} ${menuText('次 · 中位數','queries · p50')} ${p50.toFixed(2)} ms · p95 ${p95.toFixed(2)} ms`;
      })()
    : menuText('搜尋後顯示本次工作階段數據','Shown after searching in this session');
  const executionTimingSummary = lastExecutionTiming
    ? `${menuText('總計','total')} ${(lastExecutionTiming.totalMs / 1000).toFixed(2)} s · ${menuText('編譯','compile')} ${typeof lastExecutionTiming.compileMs === 'number' ? (lastExecutionTiming.compileMs / 1000).toFixed(2) : '—'} s · ${menuText('執行','run')} ${typeof lastExecutionTiming.runMs === 'number' ? (lastExecutionTiming.runMs / 1000).toFixed(2) : '—'} s`
    : menuText('執行程式後顯示','Shown after running a program');
  const groupedSearchResults = useMemo(() => {
    const groups = new Map();
    for (const item of searchResults) {
      if (!groups.has(item.group)) groups.set(item.group, []);
      groups.get(item.group).push(item);
    }
    return [...groups].map(([name, items]) => ({ name, items }));
  }, [searchResults]);
  const visibleSearchGroups = searchGroup
    ? groupedSearchResults.filter((group) => group.name === searchGroup)
    : groupedSearchResults;
  const visibleSearchResults = visibleSearchGroups.flatMap((group) => group.items);
  const activeSearchResultType = visibleSearchResults[searchActiveIndex]?.type;
  const activeSearchResult = visibleSearchResults[searchActiveIndex];
  const commitSearchInsights = (mutate) => {
    const current = searchInsightsRef.current || { queries: {} };
    const next = { ...current, ...mutate(current) };
    searchInsightsRef.current = next;
    setSearchInsights(next);
    try { localStorage.setItem(SEARCH_INSIGHTS_KEY, JSON.stringify(next)); } catch { /* Local storage may be unavailable or full. */ }
  };
  const ensureInsightQuery = (state, query) => {
    const queries = { ...(state.queries || {}) };
    const record = queries[query] || { ratings: {}, lastSeen: 0 };
    return { queries, record: { ...record, ratings: record.ratings || {}, selections: record.selections || {}, lastSeen: Date.now() } };
  };
  const currentSearchRating = normalizedSearchQuery && activeSearchResultType
    ? searchInsights.queries?.[normalizedSearchQuery]?.ratings?.[activeSearchResultType] || ''
    : '';
  const submitSearchRating = (rating) => {
    if (!normalizedSearchQuery || !activeSearchResultType) return;
    commitSearchInsights((state) => {
      const { queries, record } = ensureInsightQuery(state, normalizedSearchQuery, searchTerm.trim());
      const ratings = { ...(record.ratings || {}) };
      ratings[activeSearchResultType] = ratings[activeSearchResultType] === rating ? '' : rating;
      record.ratings = ratings;
      queries[normalizedSearchQuery] = record;
      return { queries: Object.fromEntries(Object.entries(queries).sort((a, b) => (b[1].lastSeen || 0) - (a[1].lastSeen || 0)).slice(0, MAX_TRACKED_SEARCH_QUERIES)) };
    });
  };
  const frequentBlockItems = useMemo(() => Object.entries(frequentBlocks)
    .map(([type, count]) => ({ item: searchableByType.get(type), count }))
    .filter(({ item }) => item)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4), [frequentBlocks]);
  const favoriteBlockItems = favoriteBlockTypes.map((type) => searchableByType.get(type)).filter(Boolean);
  const recentBlockItems = recentBlockTypes.map((type) => searchableByType.get(type)).filter(Boolean);
  const toggleFavoriteBlock = (type) => setFavoriteBlockTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [type, ...current].slice(0, 40));
  useEffect(() => {
    activeSearchResultRef.current?.scrollIntoView({ block: 'nearest' });
  }, [searchActiveIndex, searchOpen, searchGroup, searchTerm]);
  const addSearchResult = (type) => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    appendBlockToMain(workspace, type);
    const query = searchTerm.trim();
    if (query) {
      const normalizedQuery = normalizeSearchText(query);
      commitSearchInsights((state) => {
        const { queries, record } = ensureInsightQuery(state, normalizedQuery);
        const selections = { ...(record.selections || {}) };
        selections[type] = (selections[type] || 0) + 1;
        record.selections = selections;
        queries[normalizedQuery] = record;
        return { queries: Object.fromEntries(Object.entries(queries).sort((a, b) => (b[1].lastSeen || 0) - (a[1].lastSeen || 0)).slice(0, MAX_TRACKED_SEARCH_QUERIES)) };
      });
      const nextRecent = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 6);
      setRecentSearches(nextRecent);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent));
    }
    setSearchOpen(false);
    setSearchTerm('');
    setSearchGroup('');
    setSearchActiveIndex(0);
  };
  const onManageEntity = (mode, entity) => setLegacyCreator({
    ...entity,
    mode,
    originalName: entity.name,
    title: `${mode === 'edit' ? '編輯' : '刪除'}${entity.kind === 'variable' ? '變數' : entity.kind === 'array' ? '陣列' : entity.kind === 'container' ? '容器' : '函式定義'}`,
  });
  const createLegacyEntity = (event) => {
    event.preventDefault();
    const creator = legacyCreator;
    const name = creator?.name?.trim();
    if (!creator || !name) return;
    if (creator.mode === 'delete') {
      const saved = JSON.parse(localStorage.getItem('blocksmith-legacy-library-entities-v2') || '[]').filter((entity) => !(entity.kind === creator.kind && entity.name === creator.originalName));
      removeLegacyEntityCategory(legacyToolboxRef.current, { ...creator, name: creator.originalName });
      localStorage.setItem('blocksmith-legacy-library-entities-v2', JSON.stringify(saved));
      workspaceRef.current?.updateToolbox(localizeToolbox(legacyToolboxRef.current, language));
      setLegacyCreator(null);
      return;
    }
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      setLegacyCreator({ ...creator, error: '名稱請以英文字母或底線開頭，只使用英文字母、數字與底線。' });
      return;
    }
    let savedEntities;
    try { savedEntities = JSON.parse(localStorage.getItem('blocksmith-legacy-library-entities-v2') || '[]'); } catch { savedEntities = []; }
    if (!Array.isArray(savedEntities)) savedEntities = [];
    if (savedEntities.some((entity) => entity.name === name && entity.name !== creator.originalName)) {
      setLegacyCreator({ ...creator, error: '這個名稱已經使用，請換一個名稱。' });
      return;
    }
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const current = legacyToolboxRef.current;
    const toolboxBackup = JSON.parse(JSON.stringify(current));
    try {
      if (creator.mode === 'edit') {
        removeLegacyEntityCategory(current, { ...creator, name: creator.originalName });
        const index = savedEntities.findIndex((entity) => entity.kind === creator.kind && entity.name === creator.originalName);
        const updated = { ...creator, name };
        delete updated.mode; delete updated.originalName; delete updated.title;
        if (index >= 0) savedEntities[index] = updated;
        installLegacyEntity(workspace, current, updated, onManageEntity);
      } else {
        installLegacyEntity(workspace, current, { ...creator, name }, onManageEntity);
        savedEntities.push({ ...creator, name });
      }
      workspace.updateToolbox(localizeToolbox(current, language));
      localStorage.setItem('blocksmith-legacy-library-entities-v2', JSON.stringify(savedEntities));
      setLegacyCreator(null);
    } catch (error) {
      legacyToolboxRef.current = toolboxBackup;
      try { workspace.updateToolbox(localizeToolbox(toolboxBackup, language)); } catch { /* Keep the prior toolbox if Blockly rejects the update. */ }
      setLegacyCreator({ ...creator, error: `無法更新工具列：${error.message || '請稍後再試'}` });
    }
  };
  const saveSelectedBlock = () => {
    const workspace = workspaceRef.current;
    const selected = getBackpackRoot(workspace, Blockly.common.getSelected()) || getBackpackRoot(workspace, selectedBackpackRef.current);
    if (!selected) {
      selectedBackpackRef.current = null;
      setSelectedBackpackBlock(null);
      setBackpackNotice('請先點選一個方塊，再收納方塊組。');
      return;
    }
    const label = getBackpackLabel(selected);
    const entry = { id: crypto.randomUUID(), label, type: selected.type, savedAt: Date.now(), xml: Blockly.Xml.domToText(Blockly.Xml.blockToDom(selected)) };
    setBackpack((items) => [entry, ...items].slice(0, 30));
    setBackpackNotice(`已收納「${label}」方塊組。`);
  };
  const toggleBackpack = () => {
    if (!backpackOpen) {
      setSearchOpen(false);
      setSearchTerm('');
      setSearchGroup('');
    }
    const workspace = workspaceRef.current;
    const root = getBackpackRoot(workspace, Blockly.common.getSelected()) || getBackpackRoot(workspace, selectedBackpackRef.current);
    selectedBackpackRef.current = root;
    setSelectedBackpackBlock(root ? { id: root.id, label: getBackpackLabel(root) } : null);
    setBackpackNotice('');
    setBackpackOpen((open) => !open);
  };
  const restoreBackpackItem = async (item) => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    try {
      const xml = Blockly.utils.xml.textToDom(item.xml);
      if (await ensureBuiltinDefinitionsForXml(xml, Blockly, loadFullBuiltinPack)) {
        setBackpackNotice('正在載入舊版方塊相容資源…');
      }
      const block = Blockly.Xml.domToBlock(xml, workspace);
      const root = ensureMainBlock(workspace);
      const libraryBlock = prefersLibraryPlacement(item.type);
      const inputName = libraryBlock ? 'LIBS' : 'BODY';
      const connection = root.getInput(inputName).connection;
      const checks = getStatementPlacementChecks(item.type);
      block.previousConnection?.setCheck(checks);
      block.nextConnection?.setCheck(checks);
      if (block.previousConnection) {
        if (!connection.targetBlock()) connection.connect(block.previousConnection);
        else {
          let tail = connection.targetBlock();
          while (tail.nextConnection?.targetBlock()) tail = tail.nextConnection.targetBlock();
          tail.nextConnection?.connect(block.previousConnection);
        }
      } else {
        const point = root.getRelativeToSurfaceXY();
        block.moveBy(point.x + 360, point.y + 90);
      }
      setBackpack((items) => items.filter((candidate) => candidate.id !== item.id));
      setBackpackNotice(`已將「${item.label}」放回工作區。`);
    } catch { setBackpackNotice('這組方塊無法放回目前工作區，請移除舊項目或重新收納。'); }
  };
  const exportBackpack = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 1, items: backpack }, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'blocksmith-backpack.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setBackpackNotice('背包已匯出為 JSON 檔。');
  };
  const importBackpack = async (file) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const items = Array.isArray(data) ? data : data.items;
      if (!Array.isArray(items)) throw new Error('invalid backpack');
      const validItems = items.filter((item) => item && typeof item.xml === 'string' && typeof item.type === 'string').map((item) => ({ ...item, id: crypto.randomUUID() }));
      setBackpack((current) => [...validItems, ...current].slice(0, 30));
      setBackpackNotice(`已匯入 ${validItems.length} 組方塊。`);
    } catch { setBackpackNotice('無法讀取此背包檔，請選擇 Blocksmith 匯出的 JSON。'); }
    if (backpackFileRef.current) backpackFileRef.current.value = '';
  };
  const beginPanelResize = (index, event) => {
    if (!panelResizeEnabled) return;
    event.preventDefault();
    resizeCleanupRef.current?.();
    const startY = event.clientY;
    const height = rightRef.current?.clientHeight || 1;
    const initial = panelSizes;
    const onMove = (moveEvent) => {
      const delta = ((moveEvent.clientY - startY) / height) * 100;
      setPanelSizes(() => {
        if (index === 0) {
          const pair = initial.code + initial.input;
          const code = Math.max(24, Math.min(pair - 13, initial.code + delta));
          return { ...initial, code, input: pair - code };
        }
        const pair = initial.input + initial.output;
        const input = Math.max(13, Math.min(pair - 17, initial.input + delta));
        return { ...initial, input, output: pair - input };
      });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      resizeCleanupRef.current = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    resizeCleanupRef.current = onUp;
  };
  const setLayoutRatioOption = (value) => {
    const ratio = Number(value);
    if (!Number.isFinite(ratio) || ratio < 50 || ratio > 70) return;
    setLayoutRatio(ratio);
    setLayoutMode(ratio <= 55 ? 'balanced' : 'workspace');
  };
  const renderLayoutSlider = (id) => <div className="layout-slider-wrap">
    <label htmlFor={id}>{menuText('工作區／右側面板比例','Workspace / side panel ratio')}</label>
    <output htmlFor={id}>{layoutRatio}/{100 - layoutRatio}</output>
    <input id={id} type="range" min="50" max="70" step="1" value={layoutRatio} onChange={(event) => setLayoutRatioOption(event.target.value)} aria-label={menuText('版面比例','Layout ratio')} />
    <div className="layout-slider-options" aria-hidden="true"><span>50/50</span><span>60/40</span><span>70/30</span></div>
  </div>;
  const showLayoutNotice = (message, type = 'success') => {
    setLayoutNotice({ message, type });
    window.clearTimeout(layoutNoticeTimerRef.current);
    layoutNoticeTimerRef.current = window.setTimeout(() => setLayoutNotice(null), 3200);
  };
  const saveLayoutPreset = (value) => {
    const name = value?.trim().slice(0, 24);
    if (!name) { showLayoutNotice('請輸入配置名稱後再建立。', 'error'); return false; }
    const existing = layoutPresets.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (!existing && layoutPresets.length >= 5) { showLayoutNotice('最多儲存五組自訂配置，請先刪除一組。', 'error'); return false; }
    const preset = { id: existing?.id || `${Date.now()}`, name, ratio: layoutRatio, panelSizes: normalizePanelSizes(panelSizes) };
    const nextPresets = [...layoutPresets.filter((item) => item.id !== preset.id), preset].slice(-5);
    try {
      localStorage.setItem(LAYOUT_PRESETS_KEY, JSON.stringify(nextPresets));
      localStorage.setItem('blocksmith-active-layout-preset', preset.id);
    } catch {
      showLayoutNotice('配置未能儲存，請確認瀏覽器本機儲存空間。', 'error');
      return false;
    }
    setLayoutPresets(nextPresets);
    setActiveLayoutPresetId(preset.id);
    showLayoutNotice(existing ? `已更新「${name}」配置。` : `已建立「${name}」配置。`);
    return true;
  };
  const beginSaveLayoutPreset = () => { setLayoutSaveChecked(true); setLayoutPresetName(''); };
  const cancelSaveLayoutPreset = () => { setLayoutSaveChecked(false); setLayoutPresetName(''); };
  const confirmSaveLayoutPreset = () => {
    if (saveLayoutPreset(layoutPresetName)) { setLayoutSaveChecked(false); setLayoutPresetName(''); }
  };
  const removeLayoutPreset = (preset) => {
    setLayoutPresets((current) => current.filter((item) => item.id !== preset.id));
    if (activeLayoutPresetId === preset.id) {
      setActiveLayoutPresetId('');
      localStorage.removeItem('blocksmith-active-layout-preset');
    }
  };
  const applyDefaultLayout = () => {
    setLayoutRatioOption(70);
    setPanelSizes({ code: 50, input: 20, output: 30 });
    setActiveLayoutPresetId('');
    try { localStorage.removeItem('blocksmith-active-layout-preset'); } catch { /* The in-memory layout still applies. */ }
    setLayoutOpen(false);
  };
  const renderLayoutPresetList = (className = '') => {
    const isSidebar = className.includes('sidebar');
    return <div className={`layout-preset-list ${className}`}>
      {(!isSidebar || layoutPresets.length === 0) && <button type="button" className="layout-preset-default" aria-label={menuText('套用預設配置 70/30','Apply default layout 70/30')} title={menuText('套用預設配置','Apply default layout')} onClick={applyDefaultLayout}><span><strong>{menuText('預設配置','Default layout')}</strong><small>{menuText('標準工作區配置','Standard workspace layout')}</small></span><b>70/30</b></button>}
      {layoutPresets.map((preset) => <div className="layout-preset-row" key={preset.id}><label title={preset.name}><input type="radio" name={`active-layout-preset-${className || 'menu'}`} checked={activeLayoutPresetId === preset.id} onChange={() => applyLayoutPreset(preset)} /><span title={preset.name}>{preset.name}</span><small>{preset.ratio}/{100 - preset.ratio}</small></label><button type="button" aria-label={`刪除配置 ${preset.name}`} title={`刪除「${preset.name}」`} onClick={() => removeLayoutPreset(preset)}>×</button></div>)}
      {!isSidebar && (layoutPresets.length >= 5 ? <small className="layout-preset-limit">{menuText('已達五組自訂配置上限；預設配置不計入。','Maximum of five custom layouts reached; the default is not counted.')}</small> : <button type="button" className="layout-preset-save-trigger" onClick={beginSaveLayoutPreset}>＋ {menuText('儲存目前配置','Save current layout')}</button>)}
    </div>;
  };
  const renderMenuChoiceBar = (label, value, options, onChange) => <div className="menu-segmented-setting">
    <span className="sidebar-label">{label}</span>
    <div className="menu-choice-bar" role="group" aria-label={label}>
      {options.map((option) => <button type="button" key={option.value} title={option.title || option.label} aria-label={option.ariaLabel || option.label} className={String(value) === String(option.value) ? 'active' : ''} aria-pressed={String(value) === String(option.value)} onClick={() => onChange(option.value)}>{option.label}</button>)}
    </div>
  </div>;
  const renderCustomAccentPicker = (placement = 'toolbar') => <input type="color" className={`custom-accent-picker ${placement}${isHexColor(accent) ? ' selected' : ''}`} value={accentHex} onChange={(event) => setAccent(event.target.value.toLowerCase())} aria-label={menuText('自訂配色','Custom accent color')} title={menuText('自訂配色','Custom accent color')} />;
  const applyLayoutPreset = (preset) => {
    const ratio = Number(preset.ratio);
    if (!Number.isFinite(ratio) || ratio < 50 || ratio > 70) { showLayoutNotice('此配置的版面比例資料有誤，無法套用。', 'error'); return; }
    setLayoutRatioOption(ratio);
    setPanelSizes(normalizePanelSizes(preset.panelSizes));
    setActiveLayoutPresetId(preset.id);
    try { localStorage.setItem('blocksmith-active-layout-preset', preset.id); } catch { /* The in-memory selection still applies. */ }
    setLayoutOpen(false);
  };
  const restoreProjectVersion = (version) => {
    const workspace = workspaceRef.current;
    if (!workspace || !version?.xml || !window.confirm(menuText(`還原 ${new Date(version.savedAt).toLocaleString()} 的自動儲存版本？目前內容會先自動保存。`,`Restore the autosaved version from ${new Date(version.savedAt).toLocaleString(language === 'en' ? 'en-US' : 'zh-TW')}? The current content will be saved first.`))) return;
    const before = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    try {
      Blockly.Events.disable();
      try { workspace.clear(); Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(version.xml), workspace); ensureMainBlock(workspace, true); workspace.clearUndo(); }
      finally { Blockly.Events.enable(); }
      refreshWorkspaceState(workspace);
      const savedAt = Date.now();
      const saved = persistProject(workspace, normalizeFilename(fileName), savedAt);
      if (saved) { setLastSavedAt(savedAt); flashSavedState(); }
      setSaveState('已還原版本');
    }
    catch (error) { workspace.clear(); Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(before), workspace); window.alert(menuText(`無法還原此版本：${error.message || '資料格式錯誤'}`,`Could not restore this version: ${error.message || 'Invalid data format'}`)); }
  };
  const deleteProjectVersion = (version) => {
    if (!version?.id || !window.confirm(menuText(`確定刪除 ${new Date(version.savedAt).toLocaleString()} 的自動儲存版本？此操作無法復原。`,`Delete the autosaved version from ${new Date(version.savedAt).toLocaleString()}? This cannot be undone.`))) return;
    setProjectVersions((current) => {
      const next = current.filter((item) => item.id !== version.id);
      try { localStorage.setItem(PROJECT_VERSIONS_KEY, JSON.stringify(next)); } catch { showMinecraftToast(menuText('版本清單無法寫入本機儲存空間。','Could not update saved versions in browser storage.')); }
      return next;
    });
  };
  const startRenameFromMenu = () => {
    setFileNameDraft(normalizeFilename(fileName));
    setEditingFileName(true);
    setMenuOpen(false);
    window.setTimeout(() => {
      const input = document.querySelector('.project-name');
      input?.focus();
      input?.select();
      setRenameHighlight(true);
      window.clearTimeout(renameHighlightTimerRef.current);
      renameHighlightTimerRef.current = window.setTimeout(() => setRenameHighlight(false), 1450);
    }, 280);
  };
  const switchTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    if (accent === 'orange') setAccent('white');
    else if (accent === 'white') setAccent('orange');
  };
  const commandItems = [
    { label: menuText('立即儲存專案','Save project now'), shortcut: 'Ctrl/⌘+S', hint: menuText('將目前工作區強制儲存到此瀏覽器','Force-save the current workspace in this browser'), run: () => { setCommandOpen(false); forceSaveRef.current?.(); } },
    { label: menuText('積木檢查','Check blocks'), shortcut: 'F10', hint: menuText('檢查積木連接與必填值','Check block connections and required values'), run: () => { setCommandOpen(false); compileProgram(); } },
    { label: menuText('編譯並執行','Compile & Run'), shortcut: 'F11', hint: menuText('使用瀏覽器內的 C++ 編譯器','Compile C++ in your browser'), run: () => { setCommandOpen(false); runProgram(); } },
    { label: menuText('搜尋方塊','Search blocks'), hint: menuText('在工具箱中尋找方塊','Find blocks in the toolbox'), run: () => { setBackpackOpen(false); setSearchOpen(true); setCommandOpen(false); } },
    { label: menuText('開啟方塊背包','Open block backpack'), hint: menuText('收納與還原方塊組','Store and restore block groups'), run: () => { setCommandOpen(false); toggleBackpack(); } },
    { label: menuText('定位主程式','Locate main program'), hint: menuText('快速回到 main','Jump to main'), run: () => { setCommandOpen(false); focusMainBlock(); } },
    { label: menuText('工作區縮放至內容','Fit workspace to blocks'), hint: menuText('顯示所有方塊','Show all blocks'), run: () => { setCommandOpen(false); workspaceRef.current?.zoomToFit(); } },
    { label: menuText('匯出專案','Export project'), hint: menuText('分享 Blockly 專案 JSON','Share a Blockly project JSON'), run: () => { setCommandOpen(false); exportProject(); } },
    { label: menuText('匯入／檢查專案','Import / validate project'), hint: menuText('預先檢查方塊與 XML','Validate blocks and XML before importing'), run: () => { setCommandOpen(false); projectFileRef.current?.click(); } },
    { label: menuText('載入範例並開始教學','Load example and start tutorial'), hint: menuText('Hello C++ 入門流程','Hello C++ getting started'), run: () => { setCommandOpen(false); loadExampleProject(); } },
    { label: menuText('聚焦程式輸入','Focus program input'), hint: menuText('移至程式輸入欄','Focus the program input field'), run: () => { setCommandOpen(false); document.getElementById('stdinValue')?.focus(); } },
    { label: menuText('切換工作區小地圖','Toggle workspace minimap'), shortcut: 'F8', hint: minimapOpen ? menuText('隱藏快速定位地圖','Hide the minimap') : menuText('顯示快速定位地圖','Show the minimap'), run: () => { setCommandOpen(false); setMinimapOpen((open) => { localStorage.setItem(MINIMAP_VISIBLE_KEY, String(!open)); return !open; }); } },
    { label: menuText('復原上一個操作','Undo last action'), hint: menuText('復原最近一次工作區變更','Undo the latest workspace change'), run: () => { setCommandOpen(false); undo(false); } },
    { label: menuText('重做上一個操作','Redo last action'), hint: menuText('重做已復原的工作區變更','Redo an undone workspace change'), run: () => { setCommandOpen(false); undo(true); } },
    { label: menuText('開啟主選單','Open main menu'), hint: menuText('專案、版面配置與偏好設定','Projects, layout, and preferences'), run: () => { setCommandOpen(false); setMenuOpen(true); } },
    { label: themeMode === 'light' ? menuText('切換深色模式','Switch to dark mode') : menuText('切換淺色模式','Switch to light mode'), hint: menuText('變更介面外觀','Change the appearance'), run: () => { setCommandOpen(false); switchTheme(); } },
  ];
  const visibleCommands = commandItems.filter((item) => `${item.label} ${item.shortcut || ''} ${item.hint}`.toLocaleLowerCase().includes(commandQuery.trim().toLocaleLowerCase()));
  useEffect(() => {
    if (commandOpen) document.querySelector('.command-list > .active')?.scrollIntoView({ block: 'nearest' });
  }, [commandOpen, commandIndex]);
  const tutorialContent = [
    { title: menuText('認識主程式','Meet the main program'), body: menuText('程式從「主程式 int main()」開始。把指令方塊放進主程式的插槽，右側會同步顯示 C++。','A C++ program starts at main(). Place statement blocks in its slot and see the generated C++ on the right.') },
    { title: menuText('加入標頭檔','Add a header'), body: menuText('需要輸出文字時，先加入 iostream。可從左側「程式結構」分類拖入，也可用搜尋快速找到方塊。','To print text, add iostream first. Find the include block in Program Structure or use block search.') },
    { title: menuText('輸出並執行','Print and run'), body: menuText('將「輸出文字」接到主程式，範例使用 Hello, C++!。按「編譯並執行」查看實際結果；懸停方塊可查看用途與資料型態。','Connect a print block to main() and enter Hello, C++!. Select Compile & Run to see the result. Hover over blocks to learn what they do and which values they accept.') },
  ];
  const minimapBounds = minimapBlocks.reduce((bounds, block) => ({
    minX: Math.min(bounds.minX, block.x), minY: Math.min(bounds.minY, block.y),
    maxX: Math.max(bounds.maxX, block.x + block.width), maxY: Math.max(bounds.maxY, block.y + block.height),
  }), { minX: 0, minY: 0, maxX: 1, maxY: 1 });
  const minimapScale = Math.min(190 / Math.max(1, minimapBounds.maxX - minimapBounds.minX), 104 / Math.max(1, minimapBounds.maxY - minimapBounds.minY));

  return (
    <div className="app" data-theme={themeMode} data-accent={isHexColor(accent) ? 'custom' : accent} style={accentCustomStyle}>
      <input ref={projectFileRef} type="file" accept="application/json,.json" hidden onChange={(event) => importProject(event.target.files?.[0])} />
      {minecraftToast && <div className="minecraft-toast" role="status" key={minecraftToast.id}><span aria-hidden="true">✦</span>{minecraftToast.message}</div>}
      {projectCreateOpen && <div className="project-create-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProjectCreateOpen(false); }}><form className="project-create-dialog" role="dialog" aria-modal="true" aria-labelledby="project-create-title" onSubmit={(event) => { event.preventDefault(); createProjectTab(projectNameDraft); }}><header><div><small>{menuText('專案管理','Project management')}</small><h2 id="project-create-title">{menuText('新增專案','New project')}</h2></div><button type="button" aria-label={menuText('關閉視窗','Close dialog')} onClick={() => setProjectCreateOpen(false)}>×</button></header><label htmlFor="project-name-draft">{menuText('專案名稱（可略過）','Project name (optional)')}</label><input id="project-name-draft" autoFocus value={projectNameDraft} onChange={(event) => setProjectNameDraft(event.target.value.replace(/[\\/:*?"<>|]/g, '_'))} onKeyDown={(event) => { if (event.key === 'Escape') setProjectCreateOpen(false); }} placeholder={menuText('例如：猜數字','e.g. Guessing game')} maxLength={48} /><small>{menuText('略過時會自動命名為 untitled-N.cpp。','If skipped, the project is named untitled-N.cpp.')}</small><footer><button type="button" className="project-create-cancel" onClick={() => createProjectTab('')}>{menuText('略過','Skip')}</button><button type="submit" className="project-create-confirm">{menuText('建立專案','Create project')}</button></footer></form></div>}
      {layoutSaveChecked && <div className="layout-save-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) cancelSaveLayoutPreset(); }}><form className="layout-save-dialog" role="dialog" aria-modal="true" aria-labelledby="layout-save-title" onSubmit={(event) => { event.preventDefault(); confirmSaveLayoutPreset(); }}><header><div><small>{menuText('工作區配置','Workspace layout')}</small><h2 id="layout-save-title">{menuText('儲存目前配置','Save current layout')}</h2></div><button type="button" aria-label={menuText('關閉視窗','Close dialog')} onClick={cancelSaveLayoutPreset}>×</button></header><label htmlFor="layout-preset-name">{menuText('配置名稱','Layout name')}</label><input id="layout-preset-name" autoFocus value={layoutPresetName} onChange={(event) => setLayoutPresetName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') cancelSaveLayoutPreset(); }} placeholder={menuText('例如：專注編輯','e.g. Focused editing')} maxLength={24} /><footer><button type="button" className="layout-save-cancel" onClick={cancelSaveLayoutPreset}>{menuText('取消','Cancel')}</button><button type="submit" className="layout-save-confirm" disabled={!layoutPresetName.trim()}>{menuText('建立配置','Create layout')}</button></footer></form></div>}
      {layoutNotice && <div className={`layout-save-notice ${layoutNotice.type}`} role={layoutNotice.type === 'error' ? 'alert' : 'status'}>{translateLayoutNotice(layoutNotice.message)}</div>}
      {commandOpen && <div className="command-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCommandOpen(false); }}><section className="command-palette" role="dialog" aria-modal="true" aria-label={menuText('操作與快捷鍵','Commands and shortcuts')}><div className="command-input-row"><span aria-hidden="true">⌕</span><input ref={commandInputRef} value={commandQuery} onChange={(event) => { setCommandQuery(event.target.value); setCommandIndex(0); }} placeholder={menuText('搜尋操作或快捷鍵…','Search commands or shortcuts…')} aria-label={menuText('搜尋操作或快捷鍵','Search commands or shortcuts')} aria-controls="command-results" aria-activedescendant={visibleCommands[commandIndex] ? `command-option-${commandIndex}` : undefined} onKeyDown={(event) => { if (event.key === 'Escape') setCommandOpen(false); if (event.key === 'ArrowDown') { event.preventDefault(); setCommandIndex((index) => visibleCommands.length ? (index + 1) % visibleCommands.length : 0); } if (event.key === 'ArrowUp') { event.preventDefault(); setCommandIndex((index) => visibleCommands.length ? (index - 1 + visibleCommands.length) % visibleCommands.length : 0); } if (event.key === 'Home' && visibleCommands.length) { event.preventDefault(); setCommandIndex(0); } if (event.key === 'End' && visibleCommands.length) { event.preventDefault(); setCommandIndex(visibleCommands.length - 1); } if (event.key === 'Enter') visibleCommands[commandIndex]?.run(); }} /><kbd>ESC</kbd></div><div className="command-list" id="command-results" role="listbox">{visibleCommands.length ? visibleCommands.map((item, index) => <button id={`command-option-${index}`} key={item.label} role="option" aria-selected={index === commandIndex} className={index === commandIndex ? 'active' : ''} onMouseEnter={() => setCommandIndex(index)} onClick={item.run}><span>{item.label}<small>{item.hint}</small></span><kbd className={item.shortcut ? 'command-shortcut' : 'command-enter'}>{item.shortcut || 'Enter'}</kbd></button>) : <p>{menuText('找不到符合的操作或快捷鍵','No matching commands or shortcuts')}</p>}</div><footer>{menuText('↑↓ 選擇　·　Home／End 跳至首尾　·　Enter 執行　·　Esc 關閉','↑↓ Navigate · Home/End first/last · Enter Run · Esc Close')}</footer></section></div>}
      {tutorialOpen && <div className="command-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) finishTutorial(); }}><section className="tutorial-card" role="dialog" aria-modal="true" aria-labelledby="tutorial-title"><header><span>{menuText('範例專案 · 入門教學','Example project · Getting started')}</span><button onClick={finishTutorial} aria-label={menuText('關閉教學','Close tutorial')}>×</button></header><div className="tutorial-progress"><span style={{ width: `${((tutorialStep + 1) / tutorialContent.length) * 100}%` }} /></div><small>{menuText('步驟','Step')} {tutorialStep + 1} / {tutorialContent.length}</small><h2 id="tutorial-title">{tutorialContent[tutorialStep].title}</h2><p>{tutorialContent[tutorialStep].body}</p><div className="tutorial-actions"><button onClick={loadExampleProject}>{menuText('重新載入範例','Reload example')}</button><span /><button disabled={!tutorialStep} onClick={() => setTutorialStep((step) => step - 1)}>{menuText('上一步','Previous')}</button>{tutorialStep < tutorialContent.length - 1 ? <button className="primary" onClick={() => setTutorialStep((step) => step + 1)}>{menuText('下一步','Next')}</button> : <button className="primary" onClick={finishTutorial}>{menuText('完成','Done')}</button>}</div></section></div>}
      {blockTutorial && <div className="command-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBlockTutorial(null); }}><article className="block-tutorial-card" role="dialog" aria-modal="true" aria-labelledby="block-tutorial-title"><header><div><small>{menuText('方塊使用指南','Block guide')}</small><h2 id="block-tutorial-title">{translateSearchText(blockTutorial.title)}</h2></div><button onClick={() => setBlockTutorial(null)} aria-label={menuText('關閉方塊教學','Close block guide')}>×</button></header><code className="block-tutorial-type">{blockTutorial.type}</code><section><h3>{menuText('用途','Description')}</h3><p>{translateSearchText(blockTutorial.description)}</p></section><section><h3>{menuText('輸入與連接','Inputs and connections')}</h3><p>{translateSearchText(blockTutorial.inputSummary)}</p><p>{translateSearchText(blockTutorial.connectionSummary)}</p>{blockTutorial.fields.length > 0 && <small>{menuText('可編輯欄位：','Editable fields: ')}{[...new Set(blockTutorial.fields.map(translateSearchText))].join(' · ')}</small>}</section><section><h3>{menuText('建議操作','Suggested steps')}</h3><ol><li>{menuText('從工具箱拖入方塊，或在搜尋結果選取它。','Drag a block from the toolbox or select it from search results.')}</li><li>{menuText('依輸入欄位提示填入值，並接到相同資料型態的插槽。','Fill in the inputs and connect values to sockets with matching data types.')}</li><li>{menuText('把流程方塊放入主程式或相容的流程插槽，再查看右側 C++。','Place statement blocks inside main() or a compatible statement socket, then review the C++ on the right.')}</li></ol></section>{blockTutorial.example && <section><h3>{menuText('程式範例','Code example')}</h3><pre>{blockTutorial.example}</pre></section>}<footer><button onClick={() => { setBlockTutorial(null); setSearchOpen(true); setSearchTerm(blockTutorial.type); setSearchGroup(''); }}>{menuText('搜尋此方塊','Search this block')}</button>{blockTutorial.blockId && <button onClick={() => { focusBlock(blockTutorial.blockId); setBlockTutorial(null); }}>{menuText('定位工作區中的方塊','Locate block in workspace')}</button>}</footer></article></div>}
      {aboutOpen && <div className="command-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAboutOpen(false); }}><section className="about-card" role="dialog" aria-modal="true" aria-labelledby="about-title"><header><div className="about-brand"><div className="logo">⌘</div><span>BLOCKSMITH <small>C++ STUDIO</small></span></div><button onClick={() => setAboutOpen(false)} aria-label={menuText('關閉關於我們','Close About')}>×</button></header><div className="about-intro"><span className="about-eyebrow">{menuText('方塊式 C++ 學習工作室','A visual C++ learning studio')}</span><h2 id="about-title">{menuText('讓程式邏輯看得見','Make program logic visible')}</h2><p>{menuText('用方塊搭建程式，並即時對照產生的 C++，循序理解程式結構與語法。','Build programs with blocks and compare them with generated C++ to learn program structure and syntax step by step.')}</p></div><div className="about-feature-grid"><article><b>▦</b><strong>{menuText('視覺化編程','Visual programming')}</strong><span>{menuText('以分類方塊建立主程式、流程、變數與函式。','Build programs, flows, variables, and functions with categorized blocks.')}</span></article><article><b>⌘</b><strong>{menuText('即時 C++ 對照','Live C++ preview')}</strong><span>{menuText('編輯工作區時同步產生可閱讀的 C++ 程式碼。','Readable C++ is generated as you edit the workspace.')}</span></article><article><b>◷</b><strong>{menuText('本機專案管理','Local project management')}</strong><span>{menuText('支援多專案分頁、自動儲存、版本還原與匯出。','Manage project tabs with autosave, restore points, and export.')}</span></article><article><b>⌕</b><strong>{menuText('搜尋與教學','Search and tutorials')}</strong><span>{menuText('搜尋方塊用途、查看範例，透過教學熟悉操作。','Find block descriptions, explore examples, and learn with tutorials.')}</span></article></div><section className="about-info"><h3>{menuText('資料與執行方式','Data and execution')}</h3><p>{menuText('工作區與偏好設定保存在目前瀏覽器的本機儲存空間。程式碼可以匯出成 C++ 檔案；輸出面板顯示由瀏覽器內 Clang 編譯並執行的程式結果。程式碼不會傳送至外部編譯服務。','Your workspace and preferences are stored in this browser. Export code as a C++ file, or compile and run it with Clang in the browser. Your code is not sent to an external compilation service.')}</p></section><footer><div><span>{menuText('使用技術','Built with')}</span><small>React　·　Blockly　·　Vite</small><small>{menuText('版本','Version')} 0.1.0</small></div><button className="primary" onClick={() => setAboutOpen(false)}>{menuText('完成','Done')}</button></footer></section></div>}
      {legacyCreator && <div className="legacy-create-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLegacyCreator(null); }}>
        <form className="legacy-create-dialog" role="dialog" aria-modal="true" aria-labelledby="legacy-create-title" onSubmit={createLegacyEntity}>
          <div className="legacy-create-head"><div><span className="legacy-create-eyebrow">BLOCK LIBRARY</span><h2 id="legacy-create-title">{translateSearchText(legacyCreator.title)}</h2></div><button type="button" onClick={() => setLegacyCreator(null)} aria-label={menuText('關閉視窗','Close dialog')}>×</button></div>
          {legacyCreator.mode === 'delete' ? <p>{menuText('確定從工具列移除','Remove')} “{legacyCreator.originalName}”? {menuText('工作區上已放置的方塊會保留。','Blocks already placed in the workspace will remain.')}</p> : <label className="legacy-create-field"><span>{menuText(legacyCreator.kind === 'function' ? '函式／型別名稱' : legacyCreator.kind === 'container' ? '容器名稱' : legacyCreator.kind === 'array' ? '陣列名稱' : '變數名稱', legacyCreator.kind === 'function' ? 'Function / type name' : legacyCreator.kind === 'container' ? 'Container name' : legacyCreator.kind === 'array' ? 'Array name' : 'Variable name')}</span><input autoFocus value={legacyCreator.name} onChange={(event) => setLegacyCreator({ ...legacyCreator, name: event.target.value, error: '' })} placeholder={menuText('例如：scores','e.g. scores')} /></label>}
          {legacyCreator.kind === 'variable' && legacyCreator.mode !== 'delete' && <label className="legacy-create-field"><span>{menuText('資料類型','Data type')}</span><select value={legacyCreator.variableKind} onChange={(event) => setLegacyCreator({ ...legacyCreator, variableKind: event.target.value })}><option value="VAR">{menuText('一般變數','Variable')}</option><option value="PTR">{menuText('指標','Pointer')}</option><option value="REF">{menuText('參考','Reference')}</option></select></label>}
          {legacyCreator.kind === 'container' && legacyCreator.mode !== 'delete' && ['Set','Map'].includes(legacyCreator.family) && <label className="legacy-create-field"><span>{menuText('容器類型','Container type')}</span><select value={legacyCreator.containerKind} onChange={(event) => setLegacyCreator({ ...legacyCreator, containerKind: event.target.value })}>{(legacyCreator.family === 'Set' ? [['Set','Set'],['Unordered_set','Unordered_set'],['Multiset','Multiset'],['Flat_set','Flat_set']] : [['Map','Map'],['Unordered_map','Unordered_map'],['Multimap','Multimap']]).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
          {legacyCreator.kind === 'function' && legacyCreator.mode !== 'delete' && <label className="legacy-create-field"><span>{menuText('建立類型','Create type')}</span><select value={legacyCreator.functionKind} onChange={(event) => setLegacyCreator({ ...legacyCreator, functionKind: event.target.value })}><option value="Function">{menuText('函式','Function')}</option><option value="Lambda">Lambda</option><option value="Struct">Struct</option><option value="Class">Class</option><option value="Operation">{menuText('自訂運算子','Custom operator')}</option></select></label>}
          {legacyCreator.error && <p className="legacy-create-error" role="alert">{translateCreatorError(legacyCreator.error)}</p>}
          <div className="legacy-create-actions"><button type="button" className="legacy-create-cancel" onClick={() => setLegacyCreator(null)}>{menuText('取消','Cancel')}</button><button type="submit" className="legacy-create-submit">{menuText(legacyCreator.mode === 'delete' ? '確認刪除' : legacyCreator.mode === 'edit' ? '儲存變更' : '建立方塊組', legacyCreator.mode === 'delete' ? 'Confirm delete' : legacyCreator.mode === 'edit' ? 'Save changes' : 'Create block group')}</button></div>
        </form>
      </div>}
      <header className="topbar">
        <div className="brand-group"><button type="button" className="brand brand-button" onClick={() => setMenuOpen(true)} aria-label={menuText('開啟主選單','Open main menu')} aria-expanded={menuOpen}><span className="logo">⌘</span><span>blocksmith<small>CPP STUDIO</small></span></button></div>
        <div className="project"><span className={`dot ${saveState === '儲存失敗' ? 'save-error' : saveFeedback ? 'save-success' : 'save-idle'}`} />{editingFileName ? <input className={`project-name${renameHighlight ? ' rename-highlight' : ''}`} aria-label={menuText('編輯專案檔名','Edit project filename')} autoFocus value={fileNameDraft} onChange={(event) => setFileNameDraft(event.target.value)} onBlur={() => { setEditingFileName(false); setFileName(normalizeFilename(fileNameDraft)); }} onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); if (event.key === 'Escape') { setFileNameDraft(fileName); setEditingFileName(false); } }} /> : <button type="button" className="project-name-label" aria-label={menuText('修改專案檔名','Rename project')} title={menuText('點擊修改檔名','Click to rename')} onClick={() => { setFileNameDraft(fileName); setEditingFileName(true); }}>{normalizeFilename(fileName)}</button>}<span key={savePulseId} className={`saved-label ${saveState === '儲存失敗' ? 'save-error' : saveFeedback ? 'save-success' : 'save-idle'}`} aria-live="polite" title={translateSaveState(saveState)}>{saveState === '儲存失敗' ? menuText('儲存失敗','Save failed') : lastSavedAt ? `${menuText('上次儲存','Last saved')} ${new Date(lastSavedAt).toLocaleTimeString(language === 'en' ? 'en-US' : 'zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : translateSaveState(saveState)}</span></div>
        <div className="actions">
          <div className="appearance-controls" aria-label={menuText('外觀設定','Appearance settings')}>
            <button className="appearance-toggle" onClick={switchTheme} aria-label={themeMode === 'light' ? menuText('切換深色模式','Switch to dark mode') : menuText('切換淺色模式','Switch to light mode')} title={themeMode === 'light' ? menuText('深色模式','Dark mode') : menuText('淺色模式','Light mode')}>
              <span aria-hidden="true">{themeMode === 'light' ? '☾' : '☀'}</span><span className="appearance-label">{themeMode === 'light' ? menuText('淺色','Light') : menuText('深色','Dark')}</span>
            </button>
            <div className="accent-picker" role="group" aria-label={menuText('自訂配色','Custom accent color')}>
              {renderCustomAccentPicker()}<code className="accent-value-short">{accentHex.toLowerCase()}</code>
            </div>
          </div>
          <button className="btn icon-btn" onClick={() => undo(false)} disabled={!historyState.undo} aria-label={menuText('上一步','Undo')} title={menuText('上一步','Undo')}>↶</button>
          <button className="btn icon-btn" onClick={() => undo(true)} disabled={!historyState.redo} aria-label={menuText('下一步','Redo')} title={menuText('下一步','Redo')}>↷</button>
          <div className="layout-picker" ref={layoutPickerRef}>
            <button className="btn layout-trigger" onClick={() => setLayoutOpen(!layoutOpen)} aria-expanded={layoutOpen} aria-label={menuText('版面配置','Layout')} title={menuText('選擇版面','Choose layout')}>▣<span>{menuText('版面','Layout')}</span>⌄</button>
            {layoutOpen && <div className="layout-menu" role="menu" aria-label={menuText('選擇版面配置','Choose layout')}>
              {renderLayoutSlider('layout-menu-ratio-slider')}
              {renderLayoutPresetList('layout-picker-presets')}
            </div>}
          </div>
          <button className="btn" onClick={resetWorkspace}><span className="icon">↺</span>{menuText('重設','Reset')}</button>
          <button className="btn" onClick={downloadCode}><span className="icon">↓</span>{menuText('匯出 .cpp','Export .cpp')}</button>
          <button className="btn primary" onClick={runProgram} disabled={isRunning}><span className="icon">{isRunning ? '…' : '▶'}</span>{isRunning ? menuText('編譯中…','Compiling…') : menuText('編譯並執行','Compile & Run')}</button>
        </div>
      </header>
      <div className={`menu-scrim ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
        <aside className={`app-sidebar menu-mode-${menuMode.toLowerCase()}`} data-menu-tab={menuTab} role="dialog" aria-modal="true" aria-label={menuText('主選單','Main menu')} onClick={(event) => event.stopPropagation()}>
          <div className="sidebar-head"><div className="brand"><div className="logo">⌘</div><div>blocksmith<small>CPP STUDIO</small></div></div><button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label={menuText('關閉主選單','Close main menu')}>×</button></div>
          <div className="sidebar-project"><span className="dot"/><div className="sidebar-project-summary"><strong>{normalizeFilename(fileName)}</strong><small>{translateSaveState(saveState)} · {blockCount} {menuText('個方塊','blocks')}</small></div><div className="sidebar-project-accent"><span className="sidebar-color-chip" style={{backgroundColor:accentHex}} aria-hidden="true"/><code>{accentHex.toLowerCase()}</code><button type="button" className="accent-copy-button" onClick={() => copyAccentHex(accentHex)} aria-label={`${menuText('複製色碼','Copy color')} ${accentHex.toLowerCase()}`} title={copiedAccent === accentHex.toLowerCase() ? menuText('已複製','Copied') : menuText('複製 HEX 色碼','Copy HEX color')}>{copiedAccent === accentHex.toLowerCase() ? '✓' : '⧉'}</button></div></div>
          <nav className="menu-mode-tabs" aria-label={menuText('選單分頁','Menu sections')}><button className={menuTab==='workspace'?'active':''} onClick={()=>setMenuTab('workspace')}>{menuText('工作區','Workspace')}</button><button className={menuTab==='projects'?'active':''} onClick={()=>setMenuTab('projects')}>{menuText('專案','Projects')}</button><button className={menuTab==='preferences'?'active':''} onClick={()=>setMenuTab('preferences')}>{menuText('偏好設定','Preferences')}</button></nav>
          <div className="sidebar-section sidebar-layout-summary" data-menu-group="workspace"><span className="sidebar-label">{menuText('版面比例','Layout ratio')}</span><div className="sidebar-ratio-current"><span>{menuText('工作區／右側面板','Workspace / side panel')}</span><strong>{layoutRatio}/{100-layoutRatio}</strong></div></div>
          <div className="sidebar-section" data-menu-group="workspace"><span className="sidebar-label">{menuText('檢視','View')}</span><label className="sidebar-check sidebar-toggle"><span>{menuText('顯示工作區小地圖','Show workspace minimap')}</span><input type="checkbox" role="switch" aria-label={menuText('顯示工作區小地圖','Show workspace minimap')} checked={minimapOpen} onChange={(event) => { setMinimapOpen(event.target.checked); localStorage.setItem(MINIMAP_VISIBLE_KEY, String(event.target.checked)); }} /><span className="sidebar-toggle-track" aria-hidden="true" /></label>{renderMenuChoiceBar(menuText('方塊提醒程度','Block warning level'), reminderThreshold, [{ value: 1, label: menuText('全部提醒','All') }, { value: 2, label: menuText('重要提醒','Important') }, { value: 3, label: menuText('僅錯誤','Errors') }], (value) => { const threshold = Number(value); setReminderThreshold(threshold); localStorage.setItem('blocksmith-reminder-threshold', String(threshold)); const currentWorkspace = workspaceRef.current; if (currentWorkspace) setDiagnostics(getWorkspaceDiagnostics(currentWorkspace, threshold)); })}<small className="reminder-threshold-hint">{menuText('錯誤始終顯示；提高門檻會隱藏較輕微的警告。','Errors are always shown. A higher threshold hides minor warnings.')}</small></div>
          <div className="sidebar-section panel-resize-setting" data-menu-group="workspace"><label className="sidebar-check sidebar-toggle"><span>{menuText('允許調整右側面板高度','Allow resizing side panel heights')}</span><input type="checkbox" role="switch" aria-label={menuText('允許調整右側面板高度','Allow resizing side panel heights')} checked={panelResizeEnabled} onChange={(event) => { const enabled = event.target.checked; setPanelResizeEnabled(enabled); if (!enabled) setPanelSizes({ code: 50, input: 20, output: 30 }); localStorage.setItem('blocksmith-panel-resize-enabled', String(enabled)); }} /><span className="sidebar-toggle-track" aria-hidden="true" /></label><small className="reminder-threshold-hint">{panelResizeEnabled ? menuText('開啟時可拖曳分隔線；關閉後會依預設比例自動配置三個面板。','Drag the dividers while enabled. When off, the three panels return to their automatic default proportions.') : menuText('目前依預設比例自動配置程式碼、輸入與輸出高度。','Code, input, and output heights currently follow their automatic default proportions.')}</small></div>
          <div className="sidebar-section project-management-section" data-menu-group="projects"><span className="sidebar-label">{menuText('專案管理','Project management')}</span><span className="project-action-group-label">{menuText('建立專案','Create project')}</span><button className="sidebar-choice" onClick={addProjectTab}>{menuText('新增專案','New project')}</button><span className="project-action-group-label">{menuText('目前專案','Current project')}</span><button className="sidebar-choice" onClick={startRenameFromMenu}>{menuText('修改專案名稱','Rename project')}</button><button className="sidebar-choice" onClick={duplicateProjectTab}>{menuText('複製目前專案','Duplicate current project')}</button><button className="sidebar-choice danger-choice" onClick={deleteActiveProject}>{menuText('刪除目前專案','Delete current project')}</button><span className="project-action-group-label">{menuText('匯入與分享','Import and share')}</span><button className="sidebar-choice" onClick={() => { setMenuOpen(false); projectFileRef.current?.click(); }}>{menuText('匯入並檢查專案','Import and validate project')}</button><button className="sidebar-choice" onClick={() => { setMenuOpen(false); exportProject(); }}>{menuText('分享／匯出專案','Share / export project')}</button><button className="sidebar-choice" onClick={() => { setMenuOpen(false); loadExampleProject(); }}>{menuText('載入範例專案','Load example project')}</button></div>
          <div className="sidebar-section" data-menu-group="preferences"><span className="sidebar-label">{menuText('外觀','Appearance')}</span><button className={`sidebar-choice theme-mode-choice ${themeMode}`} onClick={()=>{switchTheme();setMenuOpen(false);}}><span className="theme-mode-icon" aria-hidden="true">{themeMode==='dark'?'☀':'☾'}</span><span>{themeMode==='dark'?menuText('切換淺色模式','Switch to light mode'):menuText('切換深色模式','Switch to dark mode')}</span><span className="theme-mode-current">{themeMode==='dark'?menuText('深色','Dark'):menuText('淺色','Light')}</span></button><details className="accent-copy-presets"><summary className="accent-copy-heading"><span>{menuText('強調色','Accent color')}</span><small>{menuText('選擇預設色票','Choose a preset')}</small></summary><div className="accent-copy-grid">{ACCENT_COPY_PRESETS.map((preset) => { const selected = accentHex.toLowerCase() === preset.hex; return <button type="button" className={`accent-copy-preset${selected ? ' selected' : ''}`} key={preset.hex} onClick={() => setAccent(preset.hex)} title={`${menuText('套用','Apply')} ${preset.hex}`} aria-label={`${menuText('套用','Apply')} ${language === 'en' ? preset.nameEn : preset.nameTw} ${preset.hex}`} aria-pressed={selected}><span className="sidebar-color-chip" style={{backgroundColor:preset.hex}} aria-hidden="true"/><span className="accent-preset-name">{language === 'en' ? preset.nameEn : preset.nameTw}</span><code>{preset.hex}</code>{selected && <span className="accent-preset-selected" aria-hidden="true">✓</span>}</button>; })}</div></details></div>
          <div className="sidebar-section" data-menu-group="preferences"><span className="sidebar-label">{menuText('提醒與儲存','Notifications and saving')}</span>{renderMenuChoiceBar(menuText('操作通知','Notifications'), toastLevel, [{ value: 'off', label: menuText('關閉','Off') }, { value: 'occasional', label: menuText('適中','Some') }, { value: 'frequent', label: menuText('較多','More') }], (value) => { setToastLevel(value); localStorage.setItem('blocksmith-minecraft-toast-level', value); })}<label className="sidebar-label autosave-label" htmlFor="autosave-interval">{menuText('自動儲存版本間隔','Autosaved version interval')}</label><div className="autosave-control"><input id="autosave-interval" type="range" min="0" max="5" step="1" value={[1,3,5,10,15,30].indexOf(autoSaveInterval)} onChange={(event) => setAutoSaveInterval([1,3,5,10,15,30][Number(event.target.value)])} aria-label={menuText('自動儲存時間','Autosave interval')} /><output>{autoSaveInterval} {menuText('分鐘','min')}</output><div><span>1</span><span>3</span><span>5</span><span>10</span><span>15</span><span>30</span></div></div><small className="reminder-threshold-hint">{menuText('編輯內容仍會即時保存；此間隔控制可還原版本的建立頻率。','Edits remain saved immediately; this controls how often restore points are created.')}</small></div>
          <div className="sidebar-section" data-menu-group="preferences"><span className="sidebar-label">{menuText('入門教學','Getting started')}</span>{renderMenuChoiceBar(menuText('教學提示','Tutorial prompts'), tutorialEnabled, [{ value: true, label: menuText('啟用教學提示','Enable tutorial prompts') }, { value: false, label: menuText('關閉教學提示','Disable tutorial prompts') }], (value) => { const enabled = value === true || value === 'true'; setTutorialEnabled(enabled); localStorage.setItem('blocksmith-tutorial-enabled', String(enabled)); })}<button className="sidebar-choice" onClick={replayTutorial}>{menuText('重看入門教學','Replay getting started tutorial')}</button><button className="sidebar-choice upcoming-choice" type="button" disabled title={menuText('網頁導覽即將推出','Page tour coming soon')}>{menuText('網頁導覽','Page tour')} <small>{menuText('即將推出','Coming soon')}</small></button></div>
          <div className="sidebar-section menu-shortcut-hint" data-menu-group="workspace"><small><kbd>Ctrl/⌘ + K</kbd> {menuText('開啟命令搜尋','Open command search')}</small></div>
          <div className="sidebar-section" data-menu-group="projects"><div className="version-history-section"><span className="sidebar-label">{menuText('自動儲存版本','Saved versions')}</span><div className="version-history-list">{(() => { const versions = projectVersions.filter((item) => item.projectId ? item.projectId === activeProjectId : item.filename === normalizeFilename(fileName)).slice(0, 8); return versions.length ? <table><thead><tr><th>{menuText('來源分頁','Project')}</th><th>{menuText('儲存時間','Saved')}</th><th>{menuText('操作','Actions')}</th></tr></thead><tbody>{versions.map((version) => <tr key={version.id}><td title={version.filename || '未命名分頁'}>{version.filename || '未命名分頁'}</td><td>{new Date(version.savedAt).toLocaleString()}</td><td><div className="version-actions"><button type="button" onClick={() => restoreProjectVersion(version)}>{menuText('還原','Restore')}</button><button type="button" className="version-delete" aria-label={`${menuText('刪除此版本','Delete this version')} ${new Date(version.savedAt).toLocaleString()}`} title={menuText('刪除此版本','Delete this version')} onClick={() => deleteProjectVersion(version)}>×</button></div></td></tr>)}</tbody></table> : <small>{menuText('編輯後會自動保留近期版本','Recent versions are saved automatically as you edit.')}</small>; })()}</div></div></div>
          <div className="sidebar-section" data-menu-group="preferences">{renderMenuChoiceBar(menuText('介面語言','Language'), language, [{ value: 'tw', label: menuText('繁中','Traditional Chinese'), title: menuText('繁體中文（台灣）','Traditional Chinese (Taiwan)') }, { value: 'en', label: 'English' }], setLanguage)}</div>
          <details className="sidebar-section about-menu-section workspace-help-section" data-menu-group="workspace">
            <summary className="sidebar-label">{menuText('技術資訊與回饋','Technical info and feedback')}</summary>
            <article className="technical-info-card">
              <strong>React 19 · Blockly 12 · Vite 6</strong>
              <p>{menuText('React 負責介面與偏好設定；Blockly 管理方塊工作區、連接檢查與 C++ 產生；Vite 負責本機開發與建置。','React drives the interface and preferences; Blockly manages the workspace, connection checks, and C++ generation; Vite powers local development and builds.')}</p>
              <dl>
                <div><dt>{menuText('介面','Interface')}</dt><dd>React 19.1 · Vite 6.4</dd></div>
                <div><dt>{menuText('應用程式版本','App version')}</dt><dd>0.1.0</dd></div>
                <div><dt>{menuText('方塊引擎','Block engine')}</dt><dd>Blockly 12.3</dd></div>
                <div><dt>{menuText('支援語言','Languages')}</dt><dd>{menuText('繁體中文 · English','Traditional Chinese · English')}</dd></div>
                <div><dt>{menuText('C++ 標準','C++ standard')}</dt><dd>GNU++20</dd></div>
                <div><dt>{menuText('編譯器','Compiler')}</dt><dd>Clang / LLVM 22.1.8 · WebAssembly</dd></div>
                <div><dt>{menuText('編譯目標','Compile target')}</dt><dd>wasm32-wasi · WASI Preview 1</dd></div>
                <div><dt>{menuText('執行方式','Execution')}</dt><dd>{menuText('背景工作程序 · 最長 120 秒','Web Worker · 120-second limit')}</dd></div>
                <div><dt>{menuText('編譯器資源','Compiler assets')}</dt><dd>{menuText('首次約 28 MB 壓縮／84 MB 解壓','About 28 MB compressed / 84 MB unpacked')}</dd></div>
                <div><dt>{menuText('自動儲存','Autosave')}</dt><dd>{menuText('即時保存 · 版本間隔 1／3／5／10／15／30 分鐘（預設 5）','Immediate project save · version interval 1/3/5/10/15/30 min (default 5)')}</dd></div>
                <div><dt>{menuText('專案分頁上限','Project tab limit')}</dt><dd>8</dd></div>
                <div><dt>{menuText('保留版本上限','Restore point limit')}</dt><dd>{menuText('所有專案合計 30','30 across all projects')}</dd></div>
                <div><dt>{menuText('可搜尋方塊','Searchable blocks')}</dt><dd>{SEARCHABLE_BLOCKS.length}</dd></div>
                <div><dt>{menuText('搜尋演算法','Search algorithm')}</dt><dd>{menuText('1–3 字元 n-gram 倒排索引＋別名索引＋單次編輯距離模糊比對，再以加權分數排序','1–3 character n-gram inverted index + alias index + one-edit fuzzy matching, ranked by weighted score')}</dd></div>
                <div><dt>{menuText('搜尋索引建置','Search index build')}</dt><dd>{searchEngine.getStats().buildDurationMs.toFixed(2)} ms</dd></div>
                <div><dt>{menuText('搜尋響應時間','Search response')}</dt><dd>{searchResponseSummary}</dd></div>
                <div><dt>{menuText('最近編譯／執行','Latest compile/run')}</dt><dd>{executionTimingSummary}</dd></div>
                <div><dt>{menuText('啟動與工具箱響應','Startup/toolbox timing')}</dt><dd>{menuText('核心載入、工作區建立、分類首幀於開發模式分段量測','Core load, workspace setup, and category first frame are measured separately in development')}</dd></div>
                <div><dt>{menuText('搜尋紀錄上限','Search history limit')}</dt><dd>100</dd></div>
                <div><dt>{menuText('方塊背包上限','Block backpack limit')}</dt><dd>30</dd></div>
                <div><dt>{menuText('自訂版面上限','Custom layout limit')}</dt><dd>5</dd></div>
                <div><dt>{menuText('預設版面比例','Default layout ratios')}</dt><dd>{menuText('工作區／右側 70/30 · 程式碼／輸入／輸出 50/20/30','Workspace/side 70/30 · code/input/output 50/20/30')}</dd></div>
                <div><dt>{menuText('方塊資源','Block assets')}</dt><dd>{menuText('核心與完整方塊依需要載入','Core and full block pack loaded on demand')}</dd></div>
                <div><dt>{menuText('資料保存','Storage')}</dt><dd>{menuText('目前瀏覽器的本機儲存空間','This browser’s local storage')}</dd></div>
                <div><dt>{menuText('專案匯出格式','Project export')}</dt><dd>Blocksmith JSON（Blockly XML）· C++</dd></div>
              </dl>
              <strong>{menuText('本機優先','Local-first')}</strong>
              <p>{menuText('專案與自動儲存版本保存在目前瀏覽器。程式由瀏覽器內的 Clang 編譯執行，不會送到外部編譯服務。編譯器只在首次使用時載入，之後由瀏覽器快取重用。','Projects and restore points stay in this browser. C++ is compiled with Clang in the browser and is not sent to an external compilation service. Compiler assets load on first use and are then reused from the browser cache.')}</p>
            </article>
          </details>
          <div className="about-menu-actions" data-menu-group="workspace"><button className="sidebar-choice" onClick={() => { setMenuOpen(false); setAboutOpen(true); }}>{menuText('關於我們','About Blocksmith')}</button><a className="sidebar-choice feedback-link" href="https://forms.gle/ZMgeypDGpTS3CzwG8" target="_blank" rel="noopener noreferrer">{menuText('提供回饋','Send feedback')}</a></div>
          <div className="sidebar-spacer"/>
          <div className="sidebar-footer"><span>{menuText('Blockly 引擎 · C++ 生成器','Blockly engine · C++ generator')}</span><small>Blocksmith CPP Studio</small></div>
        </aside>
      </div>
      <main className={`layout layout-${layoutMode}`} style={{ '--workspace-share': `${layoutRatio}fr`, '--right-share': `${100 - layoutRatio}fr` }}>
        <section className="left">
          <div className="panel workspace-panel" onMouseDown={(event) => { if (!event.target.closest('.block-search, .workspace-tools, .backpack-popover')) { if (searchOpen) { setSearchOpen(false); setSearchTerm(''); setSearchGroup(''); } if (backpackOpen) setBackpackOpen(false); } }}>
            <div className="panel-head"><div className="title"><span>{menuText('方塊工作區','Block Workspace')}</span></div><div className={`workspace-tools${searchOpen ? ' search-open' : ''}`}>
              {searchOpen ? <div className="search-trigger-expanded"><span aria-hidden="true">⌕</span><input autoFocus value={searchTerm} onChange={(event) => { const value = event.target.value; setSearchTerm(value); setSearchGroup(''); setSearchActiveIndex(0); }} onKeyDown={(event) => {
                if (event.key === 'Escape') { setSearchOpen(false); setSearchTerm(''); setSearchGroup(''); return; }
                if (event.key === 'ArrowDown' && visibleSearchResults.length) { event.preventDefault(); setSearchActiveIndex((index) => Math.min(index + 1, visibleSearchResults.length - 1)); }
                if (event.key === 'ArrowUp' && visibleSearchResults.length) { event.preventDefault(); setSearchActiveIndex((index) => Math.max(index - 1, 0)); }
                if (event.key === 'Enter' && visibleSearchResults[searchActiveIndex]) { event.preventDefault(); addSearchResult(visibleSearchResults[searchActiveIndex].type); }
              }} placeholder={menuText('搜尋名稱、類別、用途或方塊代碼…','Search block names, categories, uses, or codes…')} aria-label={menuText('搜尋方塊名稱','Search blocks')} aria-activedescendant={activeSearchResultType ? `search-result-${activeSearchResultType}` : undefined} /><button type="button" className={`search-bilingual-toggle${bilingualSearch ? ' active' : ''}`} aria-pressed={bilingualSearch} title={bilingualSearch ? menuText('關閉中英對照','Turn off bilingual labels') : menuText('顯示中英對照','Show Chinese and English labels')} onClick={() => { const enabled = !bilingualSearch; setBilingualSearch(enabled); localStorage.setItem('blocksmith-bilingual-search', String(enabled)); }}>中+英</button><button className="btn tool-btn search-close" onClick={() => { setSearchOpen(false); setSearchTerm(''); setSearchGroup(''); setSearchActiveIndex(0); }} aria-label={menuText('關閉搜尋','Close search')}>×</button></div> : <button className="btn tool-btn" onClick={() => { setBackpackOpen(false); setSearchOpen(true); setSearchTerm(''); setSearchGroup(''); setSearchActiveIndex(0); }} aria-expanded={searchOpen} aria-label={menuText('搜尋方塊','Search blocks')} title={menuText('搜尋方塊','Search blocks')}>⌕<span>{menuText('搜尋方塊','Search blocks')}</span></button>}
              <button className="btn tool-btn" onClick={toggleBackpack} aria-expanded={backpackOpen} aria-label={menuText('背包','Backpack')} title={menuText('背包','Backpack')}>▣<span>{menuText('背包','Backpack')}{backpack.length ? ` ${backpack.length}` : ''}</span></button></div></div>
            <div className="project-tab-strip" role="tablist" aria-label={menuText('專案分頁','Project tabs')}>{projectTabs.map((tab) => <button key={tab.id} role="tab" aria-selected={tab.id === activeProjectId} className={tab.id === activeProjectId ? 'active' : ''} onClick={() => switchProjectTab(tab)} title={tab.filename}><span>{tab.filename}</span><small>{compilerBusyRef.current && tab.id === activeProjectId ? menuText('編譯／執行中','Compiling / running') : translateSaveState(tab.id === activeProjectId ? saveState : '已自動儲存')}</small>{projectTabs.length > 1 && <i role="button" aria-label={`${menuText('關閉','Close')} ${tab.filename}`} onClick={(event) => closeProjectTab(tab, event)}>×</i>}</button>)}<button className="project-tab-add" onClick={addProjectTab} aria-label={menuText('新增專案分頁','Add project tab')} title={menuText('新增專案分頁','Add project tab')}>＋</button></div>
            {projectBusyNotice && <div className="project-busy-notice" role="status">{language === 'en' ? projectBusyNotice.replace('分頁正在編譯或執行作業，請稍後再切換。', 'is compiling or running. Please wait before switching tabs.') : projectBusyNotice}</div>}
            {backpackOpen && <div className="backpack-popover"><div className="backpack-head"><strong>{menuText('方塊背包','Block Backpack')} <small>{menuText('保存在此瀏覽器','Saved in this browser')}</small></strong><button onClick={() => setBackpackOpen(false)} aria-label={menuText('關閉背包','Close backpack')}>×</button></div><button className="backpack-save" onClick={saveSelectedBlock}>＋ {menuText('收納所選方塊組','Save selected block group')}</button><div className="backpack-guide"><strong>{menuText('收納步驟','How to save a group')}</strong><ol><li>{menuText('在主程式或函式庫中點選方塊；點選子方塊也可以。','Select a block in the Main Program or Library. You can also select a nested block.')}</li><li>{menuText('按上方「收納所選方塊組」。','Select “Save selected block group” above.')}</li></ol><small>{menuText('會收納該方塊所屬的整組程式；固定的「函式庫／主程式」框不能收納。','The entire connected program group is saved. The fixed Library and Main Program frames cannot be saved.')}</small></div>{selectedBackpackBlock && <p className="backpack-selected">{menuText('目前選取：','Selected: ')}<strong>{translateSearchText(selectedBackpackBlock.label)}</strong></p>}<div className="backpack-tools"><button onClick={exportBackpack} disabled={!backpack.length}>{menuText('匯出背包','Export backpack')}</button><button onClick={() => backpackFileRef.current?.click()}>{menuText('匯入 JSON','Import JSON')}</button><button onClick={() => { if (backpack.length && window.confirm(menuText('清空所有背包方塊？','Remove all saved blocks?'))) { setBackpack([]); setBackpackNotice(menuText('背包已清空。','Backpack cleared.')); } }} disabled={!backpack.length}>{menuText('清空','Clear')}</button><input ref={backpackFileRef} type="file" accept="application/json,.json" hidden onChange={(event) => importBackpack(event.target.files?.[0])} /></div>{backpackNotice && <div className="backpack-notice" role="status">{translateBackpackNotice(backpackNotice)}</div>}{backpack.length ? backpack.map((item) => <div className="backpack-item" key={item.id}><span><strong>{translateSearchText(item.label)}</strong><small>{new Date(item.savedAt || Date.now()).toLocaleString(language === 'en' ? 'en-US' : 'zh-TW')}</small></span><button onClick={() => restoreBackpackItem(item)}>{menuText('放回','Restore')}</button><button onClick={() => setBackpack((items) => items.filter((entry) => entry.id !== item.id))} aria-label={`${menuText('移除','Remove')} ${translateSearchText(item.label)}`}>×</button></div>) : <div className="backpack-empty">{menuText('背包目前是空的。','Your backpack is empty.')}</div>}</div>}
            <div className={`block-search${searchOpen ? ' is-open' : ''}${searchTerm.trim() ? ' has-query' : ''}`} aria-hidden={!searchOpen} inert={!searchOpen}>
              {!searchTerm.trim() && (recentSearches.length > 0 || frequentBlockItems.length > 0 || favoriteBlockItems.length > 0 || recentBlockItems.length > 0) && <div className="search-quick-access">
                {recentSearches.length > 0 && <div><strong>{menuText('最近搜尋','Recent searches')}</strong><div className="search-quick-chips">{recentSearches.map((query) => <button key={query} onClick={() => { setSearchTerm(query); setSearchGroup(''); setSearchActiveIndex(0); }}>{query}</button>)}</div></div>}
                {favoriteBlockItems.length > 0 && <div><strong>{menuText('收藏方塊','Favorites')}</strong><div className="search-quick-chips">{favoriteBlockItems.map((item) => <button key={item.type} onClick={() => addSearchResult(item.type)}>{renderSearchText(item.label)}</button>)}</div></div>}
                {recentBlockItems.length > 0 && <div><strong>{menuText('最近使用','Recently used')}</strong><div className="search-quick-chips">{recentBlockItems.map((item) => <button key={item.type} onClick={() => addSearchResult(item.type)}>{renderSearchText(item.label)}</button>)}</div></div>}
                {frequentBlockItems.length > 0 && <div><strong>{menuText('常用方塊','Frequent blocks')}</strong><div className="search-quick-chips">{frequentBlockItems.map(({ item, count }) => <button key={item.type} title={menuText(`已加入 ${count} 次`,`Added ${count} times`)} onClick={() => addSearchResult(item.type)}>{renderSearchText(item.label)}</button>)}</div></div>}
              </div>}
              <div className="search-body">{searchResults.length > 0 && <div className="search-filters" aria-label={menuText('依類別篩選搜尋結果','Filter results by category')}>
                <button className={!searchGroup ? 'active' : ''} onClick={() => { setSearchGroup(''); setSearchActiveIndex(0); }}>{menuText('全部','All')} <span>{searchResults.length}</span></button>
                {groupedSearchResults.map(({ name, items }) => <button key={name} className={searchGroup === name ? 'active' : ''} onClick={() => { setSearchGroup(name); setSearchActiveIndex(0); }}>{renderSearchText(name)} <span>{items.length}</span></button>)}
              </div>}<div className="search-result-pane"><div className="search-results">{visibleSearchGroups.length ? visibleSearchGroups.map(({ name, items }) => <section className="search-result-group" key={name}><h4>{renderSearchText(name)}<span>{items.length}</span></h4>{items.map((item) => <button key={item.type} id={`search-result-${item.type}`} ref={item.type === activeSearchResultType ? activeSearchResultRef : null} className={item.type === activeSearchResultType ? 'active' : ''} aria-current={item.type === activeSearchResultType ? 'true' : undefined} onMouseEnter={() => setSearchActiveIndex(visibleSearchResults.findIndex((result) => result.type === item.type))} onClick={() => addSearchResult(item.type)}><span className="search-result-title"><span>{renderSearchText(item.label, (value) => highlightSearchText(value, searchTerm, item.highlightTerms))}</span>{item.matchReason && <small className="search-match-reason">{item.correction ? <>{item.matchReason} → <mark className="search-hit">{item.correction}</mark></> : item.matchReason}</small>}</span><span className="search-result-desc">{renderSearchText(item.description, (value) => highlightSearchText(value, searchTerm, item.highlightTerms))}</span></button>)}</section>) : <p>{menuText('找不到符合的方塊','No matching blocks found')}</p>}</div>
              {searchTerm.trim() && activeSearchResult && <aside className="search-preview" aria-live="polite"><div className="search-preview-head"><strong>{translateSearchText(activeSearchResult.label)}</strong><code>{activeSearchResult.type}</code></div><p><b>{menuText('用途','Description')}</b>　{translateSearchText(activeSearchResult.description)}</p><div className="search-preview-inputs"><strong>{menuText('需要輸入','Inputs')}</strong><span>{translateSearchText(activeSearchResult.inputSummary) || menuText('此方塊沒有額外輸入欄位。','This block has no additional inputs.')}</span></div>{activeSearchResult.example && <div className="search-preview-example"><strong>{menuText('範例','Example')}</strong><pre><code>{activeSearchResult.example}</code></pre></div>}<div className="search-vote-tools"><button className="search-guide-button" onClick={() => openBlockTutorial(activeSearchResult)}>{menuText('閱讀詳細教學','Read the guide')}</button><span>{menuText('這筆結果相關嗎？','Was this result relevant?')}</span><button className={currentSearchRating === 'helpful' ? 'active' : ''} aria-pressed={currentSearchRating === 'helpful'} onClick={() => submitSearchRating('helpful')}>👍 {menuText('有幫助','Helpful')}</button><button className={currentSearchRating === 'unhelpful' ? 'active' : ''} aria-pressed={currentSearchRating === 'unhelpful'} onClick={() => submitSearchRating('unhelpful')}>👎 {menuText('不相關','Not relevant')}</button></div></aside>}</div></div>
            </div>
            <div className="blockly-host" ref={blocklyHost} />
            {dragHint && <div className="workspace-drag-hint" role="status" aria-live="polite"><span>✦</span>{dragHint}</div>}
            {hoveredBlockInfo && <aside className="blocksmith-hover-card" role="tooltip" style={{ left: hoveredBlockInfo.left, top: hoveredBlockInfo.top }} onPointerEnter={() => window.clearTimeout(hoverHideTimerRef.current)} onPointerLeave={(event) => {
              const target = event.relatedTarget instanceof Element ? event.relatedTarget : null;
              const targetBlock = target?.closest('.blocklyDraggable');
              if (targetBlock?.dataset.id === hoveredBlockInfo.id || target?.closest('.blocksmith-hover-card')) return;
              window.clearTimeout(hoverHideTimerRef.current);
              hoverHideTimerRef.current = window.setTimeout(() => {
                hoverHideTimerRef.current = null;
                hoveredBlockInfoRef.current = null;
                setHoveredBlockInfo(null);
              }, 1000);
            }}>
              <div className="blocksmith-tooltip-header"><strong>{language === 'en' ? blockEnglishLabels[hoveredBlockInfo.label] || hoveredBlockInfo.label : hoveredBlockInfo.label}</strong><code>{hoveredBlockInfo.type}</code></div>
              <p>{translateSearchText(hoveredBlockInfo.description)}</p>
              {(hoveredBlockInfo.output || hoveredBlockInfo.input) && <div className="blocksmith-tooltip-details">{hoveredBlockInfo.output && <span>{translateSearchText(hoveredBlockInfo.output)}</span>}{hoveredBlockInfo.input && <span>{translateSearchText(hoveredBlockInfo.input)}</span>}</div>}
              {hoveredBlockInfo.example && <pre>{hoveredBlockInfo.example}</pre>}
              {searchableByType.has(hoveredBlockInfo.type) && <button className="tooltip-favorite-button" aria-pressed={favoriteBlockTypes.includes(hoveredBlockInfo.type)} onClick={() => toggleFavoriteBlock(hoveredBlockInfo.type)}>{favoriteBlockTypes.includes(hoveredBlockInfo.type) ? `★ ${menuText('已收藏','Favorited')}` : `☆ ${menuText('收藏方塊','Add to favorites')}`}</button>}
              <button className="tooltip-guide-button" onClick={() => openBlockTutorial(workspaceRef.current?.getBlockById(hoveredBlockInfo.id) || hoveredBlockInfo)}>{menuText('查看詳細教學','View detailed guide')}</button>
            </aside>}
            {minimapOpen && <div className="workspace-minimap" aria-label={menuText('工作區小地圖','Workspace minimap')}><div className="workspace-minimap-head"><strong>{menuText('快速定位','Quick navigation')}</strong><button onClick={focusMainBlock} title={menuText('定位主程式','Locate main program')}>⌖ {menuText('主程式','Main')}</button></div><svg viewBox="0 0 210 122" role="img" aria-label={menuText('點選方塊位置即可定位','Select a block to navigate to it')}>{minimapBlocks.map((block) => <rect key={block.id} data-block-id={block.id} x={8 + (block.x - minimapBounds.minX) * minimapScale} y={8 + (block.y - minimapBounds.minY) * minimapScale} width={Math.max(4, block.width * minimapScale)} height={Math.max(3, block.height * minimapScale)} rx="2" fill={block.color} onClick={() => focusBlock(block.id)} />)}</svg><small>{menuText('點地圖上的方塊即可移至該處','Select a block on the map to jump to it')}</small></div>}
            <div className="workspace-foot"><span><span className="key">{menuText('滾輪','Scroll')}</span> {menuText('縮放　·　拖曳空白處移動　·　工具箱點擊分類','to zoom · Drag empty space to pan · Select toolbox categories')}　·　<kbd>Ctrl/⌘ + K</kbd> {menuText('開啟命令搜尋','opens command search')}</span><span>{blockCount} {menuText('個方塊','blocks')}</span></div>
          </div>
        </section>
        <section className={`right${panelResizeEnabled ? ' panel-resize-enabled' : ' panel-resize-disabled'}`} ref={rightRef} style={{ '--code-share': `${panelSizes.code}fr`, '--input-share': `${panelSizes.input}fr`, '--output-share': `${panelSizes.output}fr` }}>
          <div className="panel code-panel">
            <div className="panel-head code-head"><div className="title"><span>{menuText('生成的 C++','Generated C++')}</span><span className="badge">{menuText('即時同步','Live')}</span></div><div className="code-tools"><span className="tab active">{normalizeFilename(fileName)}</span><button className="copy" onClick={copyCode}>{copied ? menuText('已複製 ✓','Copied ✓') : menuText('複製程式碼','Copy code')}</button></div></div>
            <div className="code-wrap"><div className="code" dangerouslySetInnerHTML={{ __html: renderCode(code) }} /></div>
          </div>
          <div className="panel-resizer" role="separator" aria-disabled={!panelResizeEnabled} aria-label={menuText('調整程式碼與輸入區高度','Resize code and input panels')} onPointerDown={(event) => beginPanelResize(0, event)}><span /></div>
          <div className="panel console-input-panel"><div className="panel-head console-head"><div className="title"><span>{menuText('程式輸入','Program Input')}</span></div><span className="sub">{menuText('執行前提供資料','Input before running')}</span></div><div className="stdin-actions"><button onClick={() => setStdinValue('Alice\n18')}>{menuText('載入範例資料','Load sample')}</button><button onClick={() => setStdinValue('')}>{menuText('清空','Clear')}</button><details><summary>{menuText('最近輸入','Recent input')} {stdinHistory.length ? `· ${stdinHistory.length}` : ''}</summary><div>{stdinHistory.length ? stdinHistory.map((value, index) => <button key={`${index}-${value}`} onClick={() => setStdinValue(value)}>{value.replace(/\n/g, ' ↵ ').slice(0, 52)}</button>) : <small>{menuText('執行時輸入的資料會保存在此瀏覽器','Input history is saved in this browser.')}</small>}</div></details></div><div className="console-input-row"><textarea id="stdinValue" value={stdinValue} onChange={(event) => setStdinValue(event.target.value)} placeholder={menuText('在此輸入程式需要讀取的文字或多行資料…','Enter text or multiple lines for your program to read…')} /></div></div>
          <div className="panel-resizer" role="separator" aria-disabled={!panelResizeEnabled} aria-label={menuText('調整輸入與輸出區高度','Resize input and output panels')} onPointerDown={(event) => beginPanelResize(1, event)}><span /></div>
          <div className="panel console-output-panel"><div className="panel-head console-head"><div className="title"><span>{menuText('程式輸出與檢查','Program Output & Checks')}</span></div><span className="sub">{translateStatus(runState)}</span></div><div className="console-body" role="log" aria-live="polite">{diagnostics.map(({ severity, message, blockId }, index) => <div className={`diagnostic-line diagnostic-${severity}`} key={`diagnostic-${severity}-${index}`}><b>{severity === 'error' ? menuText('錯誤','Error') : menuText('警告','Warning')}</b><span>{language === 'en' ? translateDiagnostic(message) : message}</span>{blockId && <button onClick={() => focusBlock(blockId)}>{menuText('定位 ↗','Locate ↗')}</button>}</div>)}{runOutput.split('\n').map((line, index) => <div className={runState.startsWith('執行完成') ? 'console-line' : /^(積木檢查發現|位置檢查發現|編譯失敗|編譯器錯誤|執行失敗|已逾時)/.test(runState) ? 'console-error' : 'console-hint'} key={`${line}-${index}`}>{runState.startsWith('執行完成') ? `› ${line}` : language === 'en' ? translateOutput(line) : line}</div>)}</div></div>
        </section>
      </main>
    </div>
  );
}
