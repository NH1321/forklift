module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        ImageId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        ImageUrl: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        PartId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'Parts',
                key: 'PartId'
            }
        },
        ForkliftId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'Forklifts',
                key: 'ForkliftId'
            }
        },
        AltText: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'Images',
        timestamps: false,
        chaset: 'utf8mb4'
    });

    return Image;
}
