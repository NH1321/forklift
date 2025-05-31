module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      NewsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ImageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "News",
      timestamps: false,
      charset: "utf8mb4",
    }
  );

  return News;
};
