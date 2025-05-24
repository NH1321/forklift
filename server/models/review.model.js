module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        ReviewId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProductType: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: [['Forklift', 'Part']]
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserId'
            }
        },
        Rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'Reviews',
        timestamps: false,
        charset: 'utf8mb4'
    });

    return Review;
}
