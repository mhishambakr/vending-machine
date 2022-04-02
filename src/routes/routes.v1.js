const userRoutes = require('./User.routes');
const productRoutes = require('./Product.routes');

module.exports = (app,base) => {
    app.use(`${base}/user`, userRoutes);
    app.use(`${base}/product`, productRoutes);
}
