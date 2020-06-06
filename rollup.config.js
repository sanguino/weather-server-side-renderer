import merge from 'deepmerge';

import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  outputDir: 'public',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  workbox: false,
});

export default merge(baseConfig, {
  input: './src/index.html',
});