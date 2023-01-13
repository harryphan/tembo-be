import { DataTypes } from 'sequelize';
import type { Migration } from '../umzug';

const seedUsers = [
    { id: 1, username: 'Alice' },
    { id: 2, username: 'Bob' },
    { id: 3, username: 'Cindy' },
];

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('Users', {
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

    await sequelize.getQueryInterface().bulkInsert('Users', seedUsers);
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Users');
};
