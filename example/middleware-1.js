module.exports = async (ctx, next) => {
  global.console.log('Middleware 1');
  await next();
};
