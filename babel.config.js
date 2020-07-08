function isBabelRegister(caller) {
  return !!(caller && caller.name === '@babel/register');
}

module.exports = api => {
  const isRegstry = api.caller(isBabelRegister);

  if (isRegstry) {
    return {
      presets: ['@babel/preset-env'],
    };
  }

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          style: true,
        },
      ],
    ],
  };
};
