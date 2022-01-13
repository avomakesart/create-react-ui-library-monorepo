const path = require('path')
const fs = require('fs')
require('dotenv').config()

const IS_DEV = process.env.NODE_ENV === 'development'

const basicAddons = [
  '@storybook/addon-links',
  '@storybook/addon-a11y',
  { name: '@storybook/addon-docs', options: { configureJSX: true } },
  '@storybook/addon-controls',
  {
    name: '@storybook/addon-essentials',
    options: {
      actions: false,
    },
  },
]

const addons = IS_DEV
  ? basicAddons
  : [
      ...basicAddons,
      {
        name: 'storybook-addon-deps/preset-explorer',
        options: {
          //by default @storybook modules are also excluded
          exclude: /^(core-js|classnames)/,
          maxLevels: 10,
        },
      },
    ]

const allPackages = fs.readdirSync(path.join(__dirname, '../packages'))

function getStories(packages = []) {
  const stories = []

  for (let i = 0; i < packages.length; i++) {
    const name = packages[i]
    const excludedNames = ['.DS_Store']

    if (!excludedNames.includes(name)) {
      stories.push(`../packages/${name}/docs/${name}.stories.tsx`)
      stories.push(`../packages/${name}/docs/${name}.mdx`)

      if (IS_DEV) {
        stories.push(`../packages/${name}/docs/*.stories.tsx`)
        stories.push(`../packages/${name}/docs/*.story.mdx`)
        stories.push(`../packages/${name}/docs/${name}.stories.tsx`)
        stories.push(`../packages/${name}/docs/${name}.mdx`)
      }
    }
  }

  return stories
}

const css_regex = '/\\.css$/'

module.exports = {
  stories: getStories(allPackages),
  addons,
  typescript: {
    check: false,
    reactDocgen: IS_DEV ? false : 'react-docgen-typescript',
  },
  framework: '@storybook/react',
  webpackFinal(config = {}, options = {}) {
    const cssRule = config.module.rules.find(
      _ => _ && _.test && _.test.toString() === css_regex,
    )
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(
            _ => _ && _.test && _.test.toString() !== css_regex,
          ),
          {
            ...cssRule,
            exclude: /\.module\.css$/,
          },
          {
            ...cssRule,
            test: /\.module\.css$/,
            use: cssRule.use.map(_ => {
              if (_ && _.loader && _.loader.match(/[\/\\]css-loader/g)) {
                return {
                  ..._,
                  options: {
                    ..._.options,
                    modules: {
                      localIdentName: '[name]__[local]__[hash:base64:5]',
                    },
                  },
                }
              }

              return _
            }),
          },
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/, /public/],
            query: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    }
  },
}
