module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      CartItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assuming you have a Users model
          key: "UserId",
        },
      },
      ProductType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [["forklift", "part"]],
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AddedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "CartItems",
      timestamps: false,
      charset: "utf8mb4",
    }
  );

  return CartItem;
};
