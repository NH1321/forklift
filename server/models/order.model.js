module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assuming you have a Users model
                key: 'UserId'
            }
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        TotalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'Pending',
            validate: {
                isIn: [['Pending', 'Shipped', 'Delivered', 'Cancelled']]
            }
        },
        ShippingAddress: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        tableName: 'Orders',
        timestamps: false,
        charset: 'utf8mb4'
    });

    return Order;
}
