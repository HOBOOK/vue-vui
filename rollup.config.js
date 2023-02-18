import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';

export default defineConfig({
  input: 'src/deploy.js',
  output: {
    format: 'esm',
    file: 'dist/vue-vazil-ui.esm.js',
  },
  plugins: [
    vue(),
  ],
  external: [
    'vue',
  ],
});