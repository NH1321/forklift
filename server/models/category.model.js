module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        CategoryId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        CategoryName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        type: { 
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isIn: [['forklift', 'part']]
            }
        },
    }, {
        tableName: 'Categories',
        timestamps: false,
        chaset: 'utf8mb4'
    });
    return Category;
}
