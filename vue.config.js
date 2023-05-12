const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// import path from "path";
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    // make global variables and mixins available in all Vue components:
    loaderOptions: {
      sass: {
        additionalData: `
        @use './src/styles/settings.scss' as v;
        @use './src/styles/mixins.scss' as m;
        @use './src/styles/functions.scss' as f;
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.scss'],
      alias: {
        '@UI': path.resolve(__dirname, 'src/components/UI/'),
        '@c': path.resolve(__dirname, 'src/components/Input/'),
        '@': path.resolve(__dirname, 'src/'),
        '~': path.resolve(__dirname),
      },
    },
  },
});
