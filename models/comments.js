const db = require('../config/db');
const Sequelize = db.sequelize;
const Comments = Sequelize.import('../schema/comments');
const Article = Sequelize.import('../schema/article');

Comments.sync({force: false});

class CategoryModel {
    /**
     * 创建评论
     * @param data
     * @returns {Promise<*>}
     */
    static async createComments(data) {
        return await Comments.create(data)
    }

    /**
     * 更新评论数据
     * @param id  评论ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateComments(id, data) {
        await Comments.update(data, {
            where: {
                id
            },
            fields: ['parent_id', 'name', 'email', 'is_del']
        });
        return true
    }

    /**
     * 获取评论列表
     * @returns {Promise<*>}
     */
    static async getCommentsList(params) {
        let {exclude} = params;
        let isShowIsDel = exclude === 'is_del' ? 1 : 0

        return await Comments.findAndCountAll({
            'order': [
                ['createdAt', 'DESC']
            ],
            where: {
                is_del: isShowIsDel ? [0, 1] : [0]
            },
            attributes: {exclude}

        });
    }

    /**
     * 获取评论详情数据
     * @param id  评论ID
     * @returns {Promise<Model>}
     */
    static async getCommentsDetail(id) {
        return await Comments.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 软删除评论（隐藏评论）
     * @param id 文章ID
     * @param data 文章ID
     */
    static async hiddenComments(id, data) {
        return await Comments.update(data, {
            where: {
                id,
            },
            fields: ['is_del']
        })
    }

}

module.exports = CategoryModel
