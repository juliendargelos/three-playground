import autoExternal from 'rollup-plugin-auto-external'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleaner from 'rollup-plugin-cleaner'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import html from '@rollup/plugin-html'
import ts from 'rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'

import pkg from './package.json'
import tsconfig from './tsconfig.json'

const development = process.env.ROLLUP_WATCH
const production = !development

const demo = process.env.DEMO || development
const build = !demo

const config = {
  input: 'src/index.ts',
  output: { sourcemap: true },
  plugins: [
    alias({
      resolve: ['.ts'],
      entries: [
        {
          find: 'postprocessing',
          replacement: 'postprocessing/build/postprocessing.esm.js'
        },
        ...Object
          .entries(tsconfig.compilerOptions.paths)
          .map(([find, [replacement]]) => ({ find, replacement }))
      ]
    })
  ]
}

export default [
  build && {
    ...config,
    output: [
      { ...config.output, file: pkg.main, format: 'cjs' },
      { ...config.output, file: pkg.module, format: 'es' }
    ],
    plugins: [
      ...config.plugins,
      autoExternal(),
      eslint(),
      ts(),
      cleaner({ targets: [pkg.main.replace(/\/[^\/]+$/, '')] }),
    ],
    external: [
      'three/examples/jsm/loaders/OBJLoader.js',
      'three/examples/jsm/loaders/GLTFLoader.js',
      'three/examples/jsm/loaders/FBXLoader.js',
      'three/examples/jsm/loaders/DRACOLoader.js'
    ]
  },

  build && {
    ...config,
    output: {
      ...config.output,
      file: pkg.browser,
      format: 'umd',
      sourcemap: false,
      name: 'THREE',
      globals: {
        'three': 'THREE'
      }
    },
    external: [
      'three'
    ],
    plugins: [
      ...config.plugins,
      ts({
        transpileOnly: true,
        tsconfig: tsconfig => ({ ...tsconfig, target: 'es5' })
      }),
      nodeResolve({ extensions: ['.ts', '.js'] }),
      commonjs(),
      terser()
    ]
  },

  demo && {
    ...config,
    input: 'demo/index.ts',
    output: {
      ...config.output,
      file: 'demo-dist/index.js',
      format: 'iife',
      sourcemap: false
    },
    plugins: [
      ...config.plugins,
      ts({
        tsconfig: tsconfig => ({
          ...tsconfig,
          target: 'es5',
          declaration: false
        })
      }),
      cleaner({ targets: ['demo-dist'] }),
      nodeResolve({ extensions: ['.ts', '.js'] }),
      commonjs(),
      html({ title: `${pkg.name} demo` }),
      production && terser(),
      development && serve('demo-dist')
    ]
  }
].filter(Boolean)
