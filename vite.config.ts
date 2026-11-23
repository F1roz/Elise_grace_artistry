import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build: everything (JS, CSS, fonts) is inlined into dist/index.html.
// Remove viteSingleFile() if you deploy to a normal host and prefer split assets.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 100_000_000, cssCodeSplit: false },
});
