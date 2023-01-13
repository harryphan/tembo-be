import { DataTypes } from 'sequelize';
import type { Migration } from '../umzug';

const seedUsers = [
    { id: 1, username: 'Alice' },
    { id: 2, username: 'Bob' },
    { id: 3, username: 'Cindy' },
];

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    await sequelize.getQueryInterface().createTable('message', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'user', key: 'id' }
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    await sequelize.getQueryInterface().bulkInsert('user', seedUsers);
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('message');
    await sequelize.getQueryInterface().dropTable('user');
};
