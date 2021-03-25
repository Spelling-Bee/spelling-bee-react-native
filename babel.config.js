module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          SpellingBee: './src/SpellingBee',
          screens: './src/screens',
          hoc: './src/hoc',
          helpers: './src/helpers',
          components: './src/components',
          'spelling-be-redux': './src/spelling-bee-redux',
        },
      },
    ],
  ],
};
