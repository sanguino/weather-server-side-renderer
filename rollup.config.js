import merge from 'deepmerge';
import copy from 'rollup-plugin-copy'

import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  outputDir: 'public',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  sourceMaps: true,
  workbox: false,
});

export default merge(baseConfig, {
  input: './src/index.html',
  plugins: [
    copy({
      targets: [
        { src: 'src/characters.html', dest: 'public' },
        { src: 'src/css/**/*', dest: 'public/css' },
        { src: 'src/webfonts/**/*', dest: 'public/webfonts' },
        { src: 'src/imgs/**/*', dest: 'public/imgs' },
      ]
    })
  ],
});