import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import scssVariable from 'rollup-plugin-sass-variables';

export default defineConfig({
  input: 'src/deploy.js',
  output: {
    format: 'esm',
    file: 'dist/vue-vazil-ui.esm.js',
    globals: {
        vue: 'Vue',
    }
  },
  plugins: [
    vue(),
    scssVariable(),
    scss(),
  ],
  
  external: [
    'vue',
  ],
});