module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define(
    "Specification",
    {
      SpecificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SpecificationName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      SpecificationValue: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      SpecificationUnit: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "Specifications",
      timestamps: false,
      charset: "utf8mb4",
    }
  );

  return Specification;
};
