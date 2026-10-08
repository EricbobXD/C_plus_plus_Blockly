export const normalizeSearchText = (value = '') => value
  .normalize('NFKC')
  .toLocaleLowerCase('zh-Hant')
  .replace(/[\p{P}\p{S}\s]+/gu, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const oneEditAway = (left, right) => {
  if (left === right || Math.abs(left.length - right.length) > 1) return left === right;
  let leftIndex = 0;
  let rightIndex = 0;
  let edits = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex++;
      rightIndex++;
      continue;
    }
    edits++;
    if (edits > 1) return false;
    if (left.length === right.length) {
      if (left[leftIndex + 1] === right[rightIndex] && left[leftIndex] === right[rightIndex + 1]) {
        leftIndex += 2;
        rightIndex += 2;
      } else {
        leftIndex++;
        rightIndex++;
      }
    } else if (left.length > right.length) leftIndex++;
    else rightIndex++;
  }
  if (leftIndex < left.length || rightIndex < right.length) edits++;
  return edits <= 1;
};

const deletionKeys = (word) => {
  const keys = new Set([word]);
  for (let i = 0; i < word.length; i++) keys.add(`${word.slice(0, i)}${word.slice(i + 1)}`);
  return keys;
};

const cjkRuns = (value) => value.match(/\p{Script=Han}+/gu) || [];
const makeTypoTokens = (item, aliases) => {
  const text = normalizeSearchText(`${item.label} ${item.type} ${aliases.join(' ')}`);
  const tokens = new Set(text.match(/[a-z0-9]+/g) || []);
  for (const run of cjkRuns(text)) {
    for (let size = 2; size <= Math.min(6, run.length); size++) {
      for (let i = 0; i <= run.length - size; i++) tokens.add(run.slice(i, i + size));
    }
  }
  return [...tokens];
};

const isFuzzyEligible = (word) => /^[a-z0-9]{4,}$/.test(word)
  || (/^\p{Script=Han}{2,6}$/u.test(word));

const getAliasLabelTerm = (entry, words) => {
  const matchedAliases = entry.aliases.filter((alias) => words.some((word) => alias.includes(word) || word.includes(alias)));
  let best = '';
  for (const alias of entry.aliases) {
    if (matchedAliases.includes(alias)) continue;
    for (const run of cjkRuns(alias)) {
      for (let size = Math.min(run.length, 8); size >= 2; size--) {
        for (let start = 0; start <= run.length - size; start++) {
          const candidate = run.slice(start, start + size);
          if (entry.label.includes(candidate) && candidate.length > best.length) best = candidate;
        }
      }
    }
  }
  return best;
};

const getMatchDetails = (entry, query, words) => {
  const { label, type, group, description, aliases, typoAliases, typoCorrections, typoTokens } = entry;
  const explicitTypo = typoAliases.find((typo) => typo === query);
  const correction = explicitTypo
    ? typoCorrections[explicitTypo] || getAliasLabelTerm(entry, words)
    : words.flatMap((word) => {
      if (!isFuzzyEligible(word)) return [];
      return typoTokens.filter((token) => token.length >= 2 && oneEditAway(word, token) && token !== word);
    })[0] || '';
  let matchReason = '相關內容';
  if (label === query) matchReason = '名稱完全符合';
  else if (type === query) matchReason = '代碼完全符合';
  else if (aliases.includes(query)) matchReason = '別名完全符合';
  else if (explicitTypo) matchReason = '常見誤寫';
  else if (label.includes(query) || words.every((word) => label.includes(word))) matchReason = '名稱相符';
  else if (type.includes(query) || words.every((word) => type.includes(word))) matchReason = '方塊代碼相符';
  else if (words.every((word) => aliases.some((alias) => alias.includes(word)))) matchReason = '別名相符';
  else if (correction) matchReason = /^[a-z0-9]+$/.test(correction) ? '近似拼字' : '近似輸入';
  else if (words.every((word) => group.includes(word))) matchReason = '類別相符';
  else if (words.every((word) => description.includes(word))) matchReason = '用途相符';

  const literalTerms = words.filter((word) => label.includes(word) || description.includes(word));
  const aliasEquivalent = literalTerms.length ? '' : getAliasLabelTerm(entry, words);
  return {
    matchReason,
    correction,
    highlightTerms: [...new Set([...literalTerms, ...(aliasEquivalent ? [aliasEquivalent] : []), ...(correction && label.includes(correction) ? [correction] : [])])],
  };
};

export function createSearchEngine(items) {
  const buildStarted = performance.now();
  const entries = items.map((item, order) => {
    const aliases = (Array.isArray(item.aliases) ? item.aliases : (item.aliases || '').split(/\s+/))
      .map(normalizeSearchText)
      .filter(Boolean);
    const typoAliases = (item.typoAliases || []).map(normalizeSearchText).filter(Boolean);
    return {
      item,
      order,
      label: normalizeSearchText(item.label),
      group: normalizeSearchText(item.group),
      type: normalizeSearchText(item.type),
      description: normalizeSearchText(item.description),
      fields: normalizeSearchText(`${item.label} ${item.group} ${item.type} ${item.description}`),
      aliases,
      typoAliases,
      typoCorrections: Object.fromEntries(Object.entries(item.typoCorrections || {}).map(([typo, correction]) => [normalizeSearchText(typo), normalizeSearchText(correction)])),
      typoTokens: makeTypoTokens(item, aliases),
    };
  });
  const gramIndex = new Map();
  const aliasIndex = new Map();
  const typoIndex = new Map();
  const add = (index, key, value) => {
    if (!index.has(key)) index.set(key, new Set());
    index.get(key).add(value);
  };
  for (const entry of entries) {
    const text = `${entry.fields} ${entry.aliases.join(' ')} ${entry.typoAliases.join(' ')}`;
    const grams = new Set();
    for (let size = 1; size <= Math.min(3, text.length); size++) {
      for (let i = 0; i <= text.length - size; i++) grams.add(text.slice(i, i + size));
    }
    grams.forEach((gram) => add(gramIndex, gram, entry));
    entry.aliases.forEach((alias) => add(aliasIndex, alias, entry));
    entry.typoAliases.forEach((alias) => add(aliasIndex, alias, entry));
    entry.typoTokens.forEach((token) => {
      deletionKeys(token).forEach((key) => add(typoIndex, key, { entry, token }));
    });
  }
  const maxAliasLength = Math.max(1, ...[...aliasIndex.keys()].map((alias) => alias.length));
  const buildDurationMs = performance.now() - buildStarted;
  const stats = {
    entries: entries.length,
    gramKeys: gramIndex.size,
    aliasKeys: aliasIndex.size,
    typoKeys: typoIndex.size,
    gramPostings: [...gramIndex.values()].reduce((sum, set) => sum + set.size, 0),
    typoPostings: [...typoIndex.values()].reduce((sum, set) => sum + set.size, 0),
    buildDurationMs,
  };

  const search = (rawQuery, feedback = {}) => {
    const query = normalizeSearchText(rawQuery);
    const words = query.split(/\s+/).filter(Boolean);
    if (!words.length) return items.map((item) => ({ ...item, matchReason: '', correction: '', highlightTerms: [] }));
    const isShortEnglish = (word) => /^[a-z0-9]{1,3}$/.test(word);
    const matchesExactWord = (entry, word) => {
      if (isShortEnglish(word)) {
        const fieldTokens = entry.fields.match(/[a-z0-9_]+/g) || [];
        const aliasTokens = entry.aliases.flatMap((alias) => alias.match(/[a-z0-9]+/g) || []);
        return fieldTokens.includes(word) || aliasTokens.includes(word);
      }
      return entry.fields.includes(word)
        || entry.typoAliases.includes(word)
        || entry.aliases.some((alias) => word.includes(alias) || alias.includes(word));
    };
    let candidates = null;
    for (const word of words) {
      const grams = new Set();
      const size = Math.min(3, word.length);
      for (let i = 0; i <= word.length - size; i++) grams.add(word.slice(i, i + size));
      const orderedGrams = [...grams].sort((a, b) => (gramIndex.get(a)?.size ?? 0) - (gramIndex.get(b)?.size ?? 0));
      let fieldMatches = new Set(gramIndex.get(orderedGrams[0]) || []);
      for (const gram of orderedGrams.slice(1)) {
        const posting = gramIndex.get(gram);
        fieldMatches = new Set([...fieldMatches].filter((entry) => posting?.has(entry)));
        if (!fieldMatches.size) break;
      }
      const aliasMatches = new Set();
      for (let start = 0; start < word.length; start++) {
        for (let end = start + 1; end <= Math.min(word.length, start + maxAliasLength); end++) {
          aliasIndex.get(word.slice(start, end))?.forEach((entry) => aliasMatches.add(entry));
        }
      }
      const exactMatches = new Set([...fieldMatches, ...aliasMatches].filter((entry) => matchesExactWord(entry, word)));
      const wordMatches = exactMatches.size ? exactMatches : new Set();
      if (isFuzzyEligible(word)) {
        for (const key of deletionKeys(word)) {
          typoIndex.get(key)?.forEach(({ entry, token }) => {
            if (!exactMatches.size && oneEditAway(word, token)) wordMatches.add(entry);
          });
        }
      }
      candidates = candidates === null ? wordMatches : new Set([...candidates].filter((entry) => wordMatches.has(entry)));
      if (!candidates.size) return [];
    }

    const matchesWord = (entry, word) => {
      if (isShortEnglish(word)) {
        const fieldTokens = entry.fields.match(/[a-z0-9_]+/g) || [];
        const aliasTokens = entry.aliases.flatMap((alias) => alias.match(/[a-z0-9]+/g) || []);
        return fieldTokens.includes(word) || aliasTokens.includes(word);
      }
      return entry.fields.includes(word)
        || entry.typoAliases.includes(word)
        || entry.aliases.some((alias) => word.includes(alias) || alias.includes(word))
        || (isFuzzyEligible(word) && entry.typoTokens.some((token) => oneEditAway(word, token)));
    };
    const score = (entry) => {
      let value = 0;
      const labelTokens = entry.label.match(/[a-z0-9]+/g) || [];
      const typeTokens = entry.type.match(/[a-z0-9]+/g) || [];
      const aliasTokens = entry.aliases.flatMap((alias) => alias.match(/[a-z0-9]+/g) || []);
      if (entry.label === query) value += 1200;
      if (entry.type === query) value += 1150;
      if (entry.aliases.includes(query)) value += 1050 + Math.min(query.length, 16) * 8;
      if (entry.typoAliases.includes(query)) value += 1020 + Math.min(query.length, 16) * 8;
      if (!isShortEnglish(query) && entry.label.startsWith(query)) value += 850;
      if (!isShortEnglish(query) && entry.type.startsWith(query)) value += 800;
      if (!isShortEnglish(query) && entry.aliases.some((alias) => alias.startsWith(query))) value += 700;
      for (const word of words) {
        if (entry.label === word || (isShortEnglish(word) && labelTokens.includes(word))) value += 500;
        else if (!isShortEnglish(word) && entry.label.startsWith(word)) value += 360;
        else if (!isShortEnglish(word) && entry.label.includes(word)) value += 260;
        if (entry.type === word || (isShortEnglish(word) && typeTokens.includes(word))) value += 240;
        else if (!isShortEnglish(word) && entry.type.startsWith(word)) value += 200;
        else if (!isShortEnglish(word) && entry.type.includes(word)) value += 150;
        if (entry.aliases.includes(word)) value += 460 + Math.min(word.length, 12) * 6;
        else if (isShortEnglish(word) && aliasTokens.includes(word)) value += 300;
        else if (!isShortEnglish(word) && entry.aliases.some((alias) => alias.startsWith(word))) value += 340;
        else if (!isShortEnglish(word) && entry.aliases.some((alias) => alias.includes(word))) value += 250;
        else if (!isShortEnglish(word) && entry.aliases.some((alias) => word.includes(alias))) value += 80;
        if (isFuzzyEligible(word) && entry.typoTokens.some((token) => oneEditAway(word, token))) value += 180;
        if (entry.group.includes(word)) value += 100;
        if (entry.description.includes(word)) value += 50;
      }
      // Local, query-specific signals refine lexical relevance without requiring a server.
      const rating = feedback.ratings?.[entry.item.type];
      if (rating === 'helpful') value += 3000;
      else if (rating === 'unhelpful') value -= 3000;
      const selected = feedback.selections?.[entry.item.type] || 0;
      if (selected > 0) value += Math.min(120, Math.log2(selected + 1) * 40);
      return value;
    };
    return [...candidates]
      .filter((entry) => words.every((word) => matchesWord(entry, word)))
      .map((entry) => ({ entry, score: score(entry), ...getMatchDetails(entry, query, words) }))
      .sort((a, b) => b.score - a.score || a.entry.order - b.entry.order)
      .map(({ entry, matchReason, correction, highlightTerms }) => ({ ...entry.item, matchReason, correction, highlightTerms }));
  };

  return {
    search,
    getStats: () => ({ ...stats }),
  };
}
