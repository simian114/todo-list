// NOTE: 타입스크립트 설정 해야한다.
// NOTE: 1. npm i -D react-docgen-typescript-loader 설치
// NOTE: 2. 이후에는 아래의 typescript 설정 넣기
// NOTE: typescript 저 설정은 아래의 링크에서 확인가능
// LINK: https://storybook.js.org/docs/react/configure/typescript#overriding-the-configuration-to-infer-additional-props

// NOTE: storybook-react 공식 듀토리얼
// LINK: https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started/

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};
