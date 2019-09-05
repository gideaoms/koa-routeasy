module.exports = async (ctx, next) => {
  global.console.log('Middleware 2');
  await next();
};
