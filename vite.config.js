import { defineConfig } from 'vite';

export default defineConfig({
  worker: {
    format: 'es',
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const modulePath = id.replaceAll('\\', '/');
          if (modulePath.includes('/node_modules/blockly/msg/')) return 'blockly-locale';
          if (modulePath.includes('/node_modules/blockly/blocks')) return 'blockly-blocks';
          if (modulePath.includes('/node_modules/blockly/')) return 'blockly-core';
          if (/\/node_modules\/(?:react|react-dom|scheduler)\//.test(modulePath)) return 'react-vendor';
        },
      },
    },
  },
});
