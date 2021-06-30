import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { config } from '../config.js';

const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
  host: config.db.host,
  username: config.db.user,
  database: config.db.database,
  password: config.db.password,
  dialect: 'mysql',
  // logging: (...msg) => console.log(msg),
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export const Tweets = sequelize.define('Tweets', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export const Users = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Users.hasOne(Tweets, { foreignKey: 'id' });
Tweets.belongsTo(Users, { foreignKey: 'userId' });

export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();
