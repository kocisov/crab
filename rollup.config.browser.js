import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { minify } from 'uglify-js-harmony';

export default {
  moduleName: 'Crab',
  format: 'umd',
  entry: './src/browser.js',
  dest: './browser.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        ['env', {
          targets: {
            browsers: [
              'last 2 versions',
              'safari >= 7'
            ],
          },
          modules: false,
          exclude: [
            'transform-es2015-classes'
          ]
        }],
        'stage-0'
      ],
      plugins: [
        'external-helpers'
      ],
      exclude: [
        'node_modules',
        'polyfills/**'
      ]
    }),
    uglify({}, minify)
  ]
}
