import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Obsidian Lovely Bases',
  brandImage: './logo.png',
  brandTarget: '_self',
  brandUrl: '/?path=/docs/getting-started--docs',


  colorPrimary: '#879A39',
  colorSecondary: '#D14D41',

  appBg: '#FFFCF0',
  appContentBg: '#FFFCF0',
  appHoverBg: '#e6e4d9',
  appPreviewBg: '#FFFCF0',
  appBorderColor: "#e6e4d9",

  textColor: '#282726',
  textInverseColor: '#FFFCF0',
  textMutedColor: '#575653',

  barTextColor: '#B7B5AC',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#F2F0E5',

  inputBg: '#F2F0E5',
  inputBorder: '#BEC97E',
  inputTextColor: '#282726',

  booleanBg: '#E6E4D9',
  booleanSelectedBg: '#BEC97E',

  buttonBg: '#e6e4d9',
});
