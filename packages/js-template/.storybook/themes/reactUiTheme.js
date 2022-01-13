import { create } from '@storybook/theming/create'
const myReactUiLib = require('../../packages/my-react-ui-library/package.json').version

export default create({
  base: 'light',
  
  colorPrimary: '#003087',
  colorSecondary: '#0070ba', 

  brandTitle: `<h1>v${myReactUiLib}</h1>`,
})
