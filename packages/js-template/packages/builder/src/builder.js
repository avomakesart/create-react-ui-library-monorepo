#!/usr/bin/env node
const rollup = require('rollup').rollup
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const typescript = require('@rollup/plugin-typescript')
const path = require('path')
const dts = require('rollup-plugin-dts').default
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const postcss = require('rollup-plugin-postcss')
const babel = require('@rollup/plugin-babel').default
const currentWorkingPath = process.cwd()
const { main, name, source } = require(path.join(
  currentWorkingPath,
  'package.json',
))

const inputPath = path.join(currentWorkingPath, source)

const fileName = name.replace('@my-react-ui-library/', '')

const inputOptions = {
  input: inputPath,
  external: [/\.css$/, 'react'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    typescript(),
    postcss({ modules: true }),
    dts(),
  ],
}

const outputOptions = [
  {
    file: `dist/cjs/${fileName}.cjs.js`,
    format: 'cjs',
    sourcemap: true,
  },
  {
    file: `dist/esm/${fileName}.esm.js`,
    format: 'esm',
    sourcemap: true,
  },
  { file: `dist/esm/types/index.d.ts`, format: 'esm' },
  { file: `dist/cjs/types/index.d.ts`, format: 'cjs' },
  { file: 'dist/index.d.ts', format: 'esm' },
]

async function build() {
  const bundle = await rollup(inputOptions)
  console.log(bundle)
  outputOptions.forEach(async options => {
    return await bundle.write(options)
  })
}

build()
