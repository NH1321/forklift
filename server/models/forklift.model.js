module.exports = (sequelize, DataTypes) => {
    const Forklift = sequelize.define('Forklift', {
        ForkliftId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        ForkliftName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        BrandId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'Brands',
                key: 'BrandId'
            }
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'Categories',
                key: 'CategoryId'
            }
        },
        Price: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                INTEGER: true
            }
        }, 
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                INTEGER: true
            }
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'Forklifts',
        timestamps: false,
        chaset: 'utf8mb4'
    }); 

    return Forklift;
}
