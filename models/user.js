module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        field: "id",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        field: "user_name",
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email",
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(2024),
        field: "password",
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        field: "date_of_birth",
        allowNull: true
      },
      phoneNumber: {
        type: DataTypes.STRING(50),
        field: "phone_number",
        allowNull: true
      },
    },
    {
      schema: "unit-test-demo",
      tableName: "user",
      timestamps: false
    }
  );

  return User;
};
