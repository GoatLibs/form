import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    target: 'node20',
    platform: 'neutral',
    plugins: [Vue({ isProduction: true })],
  },
])