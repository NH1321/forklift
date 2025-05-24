const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database.config.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        port: dbConfig.PORT,
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = require('./role.model')(sequelize, DataTypes);
db.User = require('./user.model')(sequelize, DataTypes);
db.Forklift = require('./forklift.model')(sequelize, DataTypes);
db.Part = require('./part.model')(sequelize, DataTypes);
db.Brand = require('./brand.model')(sequelize, DataTypes);
db.Category = require('./category.model')(sequelize, DataTypes);
db.CartItem = require('./cartItem.model')(sequelize, DataTypes);
db.Order = require('./order.model')(sequelize, DataTypes);
db.OrderDetail = require('./orderDetail.model')(sequelize, DataTypes);
db.Review = require('./review.model')(sequelize, DataTypes);
db.Image = require('./image.model')(sequelize, DataTypes);
db.Specification = require('./specification.model')(sequelize, DataTypes);
db.ForkliftSpecification = require('./forkliftSpecification.model')(sequelize, DataTypes);
db.News = require('./news.model')(sequelize, DataTypes);

module.exports = db;
