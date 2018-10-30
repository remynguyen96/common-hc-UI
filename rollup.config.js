import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import includePaths from 'rollup-plugin-includepaths';
import pkg from './package.json';

let includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js', '.json', '.html']
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      plugins: [
        require('postcss-easy-import')
      ]
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve(),
    commonjs(),
    includePaths(includePathOptions)
  ],
  external: ['lodash']
};
