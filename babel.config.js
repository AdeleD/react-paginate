module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
  ],
};
