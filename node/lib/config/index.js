module.exports = (env) => {
  const config = getConfig(env);
  return {
    'env': config.env,
  };
};

function getConfig(env) {
  switch (env) {
    case 'test':
      return require('./test');
    case 'prod':
      return require('./prod');
    case 'dev':
      /* falls through */
    default:
      return require('./dev');
  }
}
