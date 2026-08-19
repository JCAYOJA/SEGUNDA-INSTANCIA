import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js"; // Añadido el .js que requiere ESM

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active"
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: "projects",
    timestamps: true,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default Project; // Cambiado para que sea compatible con tus otros archivos
