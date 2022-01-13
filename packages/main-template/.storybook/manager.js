import { addons } from '@storybook/addons'
import myReactUiLib from './themes/reactUiTheme'

addons.setConfig({
  theme: myReactUiLib,
  showPanel: true,
  enableShortcuts: false,
})
