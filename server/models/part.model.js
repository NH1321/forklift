module.exports = (sequelize, DataTypes) => {
  const Part = sequelize.define(
    "Part",
    {
      PartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PartName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      BrandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "BrandId",
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "CategoryId",
        },
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          INTEGER: true,
        },
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          INTEGER: true,
        },
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Parts",
      timestamps: false,
      chaset: "utf8mb4",
    }
  );

  return Part;
};
