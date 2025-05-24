module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        OrderDetailId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'OrderId'
            }
        },
        ProductType: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: [['Forklift', 'Part']]
            }
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'OrderDetails',
        timestamps: false,
        charset: 'utf8mb4'
    });

    return OrderDetail;
}
