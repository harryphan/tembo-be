import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db-config';
import {User} from './index';

interface MessageAttributes {
    id: number;
    message: string;
    fromUserId: number;
    toUserId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface MessageInput extends Optional<MessageAttributes, 'id'> {}

export interface MessageOutput extends Required<MessageAttributes> {}

class Message extends Model<MessageAttributes, MessageInput> implements MessageAttributes {
    public id!: number
    public message!: string
    public fromUserId!: number
    public toUserId!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    toUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection,
    tableName: 'message'
})

Message.belongsTo(User, {foreignKey: 'fromUserId', as:'FromUserId'});
Message.belongsTo(User, {foreignKey: 'toUserId', as:'ToUserId'});

export default Message;
