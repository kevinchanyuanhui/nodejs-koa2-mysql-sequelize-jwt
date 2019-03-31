const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 评论名字
        name: {
            type: DataTypes.STRING(50),
            field: 'name',
            allowNull: false
        },
        // 分类icon图标
        email: {
            type: DataTypes.STRING(100),
            field: 'icon',
            allowNull: false
        },
        // 父级ID
        parent_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'parent_id',
            allowNull: false
        },
        // 是否软删除
        is_del: {
            type: DataTypes.BOOLEAN,
            field: 'is_del',
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    }, {
        // 如果为 true 则表的名称和 models 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}
