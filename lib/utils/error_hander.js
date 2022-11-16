export default async (ctx, func) => {
  try {
    await func();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 501;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
};
