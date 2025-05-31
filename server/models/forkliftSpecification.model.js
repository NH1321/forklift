module.exports = (sequelize, DataTypes) => {
  const ForkliftSpecification = sequelize.define(
    "ForkliftSpecification",
    {
      ForkliftSpecificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ForkliftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Forklifts",
          key: "ForkliftId",
        },
      },
      SpecificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Specifications",
          key: "SpecificationId",
        },
      },
      Value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "ForkliftSpecifications",
      timestamps: false,
      charset: "utf8mb4",
    }
  );

  return ForkliftSpecification;
};
