import { createCompiler } from '@live-codes/clang-wasm';

let compilerPromise;

async function getCompiler() {
  if (!compilerPromise) {
    const baseUrl = new URL(`${import.meta.env.BASE_URL}clang/`, self.location.origin);
    compilerPromise = createCompiler('cpp', {
      baseUrl,
      std: 'gnu++20',
      onProgress: (progress) => self.postMessage({ type: 'progress', progress }),
    }).catch((error) => {
      compilerPromise = undefined;
      throw error;
    });
  }
  return compilerPromise;
}

self.addEventListener('message', async ({ data }) => {
  if (data?.type !== 'run') return;
  const { requestId, code, stdin } = data;
  try {
    const compiler = await getCompiler();
    const result = await compiler.run(code, stdin, { fileName: 'main.cpp' });
    self.postMessage({ type: 'result', requestId, ...result });
  } catch (error) {
    self.postMessage({ type: 'error', requestId, message: error?.message || String(error) });
  }
});
