module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      FullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      RoleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "RoleId",
        },
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Users",
      timestamps: false,
      chaset: "utf8mb4",
    }
  );
  return User;
};
