import { strict as assert } from 'node:assert';
import { performance } from 'node:perf_hooks';
import { SEARCHABLE_BLOCKS } from '../src/searchCatalog.js';
import { createSearchEngine } from '../src/searchEngine.js';

const scenarios = [
  { query: '數組', expected: 'define_array' },
  { query: '讀取', expected: 'cpp_cin' },
  { query: '排序', expected: 'sort' },
  { query: 'fucntion', expected: 'define_function' },
  { query: '陳列', expected: 'define_array' },
  { query: '資聊型態', expected: 'data_type' },
];

const catalogEngine = createSearchEngine(SEARCHABLE_BLOCKS);
const searchChecks = scenarios.map(({ query, expected }) => {
  const results = catalogEngine.search(query);
  const topTypes = results.slice(0, 5).map((result) => result.type);
  const passed = topTypes[0] === expected;
  console.log(`${passed ? 'PASS' : 'REVIEW'} ${JSON.stringify(query)} → ${topTypes.join(', ') || '(no results)'} (expected first: ${expected})`);
  return passed;
});
assert.ok(searchChecks.every(Boolean), 'A representative query did not rank its expected block first.');
assert.ok(catalogEngine.search('数组')[0]?.highlightTerms.includes('陣列'), 'Simplified alias should highlight its Traditional Chinese label equivalent.');
assert.equal(catalogEngine.search('fucntion')[0]?.correction, 'function', 'English misspelling should expose its corrected token.');
assert.equal(catalogEngine.search('陳列')[0]?.correction, '陣列', 'Chinese typo should expose its corrected token.');
assert.equal(catalogEngine.search('讀取', { ratings: { string_cin: 'helpful' } })[0]?.type, 'string_cin', 'A locally helpful result should rank first for the same query.');
assert.notEqual(catalogEngine.search('讀取', { ratings: { cpp_cin: 'unhelpful' } })[0]?.type, 'cpp_cin', 'A locally unhelpful result should be demoted for the same query.');
console.log('PASS local relevance calibration: helpful result promoted; unhelpful result demoted.');

const scale = 10;
const largeCatalog = Array.from({ length: scale }, (_, batch) => SEARCHABLE_BLOCKS.map((item) => ({
  ...item,
  type: `${item.type}_bench${batch}`,
})) ).flat();
globalThis.gc?.();
const heapBefore = process.memoryUsage().heapUsed;
const largeEngine = createSearchEngine(largeCatalog);
const heapAfter = process.memoryUsage().heapUsed;
const queries = ['輸入', 'for-loop', '排序', 'fucntion', '陳列'];
for (const query of queries) largeEngine.search(query);
const samples = [];
for (let i = 0; i < 250; i++) {
  const query = queries[i % queries.length];
  const started = performance.now();
  largeEngine.search(query);
  samples.push(performance.now() - started);
}
samples.sort((a, b) => a - b);
const stats = largeEngine.getStats();
console.log(`Large catalog: ${largeCatalog.length} entries; index keys grams/aliases/typos ${stats.gramKeys}/${stats.aliasKeys}/${stats.typoKeys}; postings ${stats.gramPostings}/${stats.typoPostings}; index build ${stats.buildDurationMs.toFixed(1)} ms; p50 ${samples[125].toFixed(2)} ms; p95 ${samples[237].toFixed(2)} ms; heap delta ${((heapAfter - heapBefore) / 1024 / 1024).toFixed(1)} MiB.`);
