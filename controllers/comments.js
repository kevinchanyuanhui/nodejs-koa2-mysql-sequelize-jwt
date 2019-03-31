const CommentsModel = require('../models/comments')

class commentsController {
    /**
     * 创建评论
     * @param ctx name            评论人名字
     * @param ctx email           评论人邮箱
     * @param ctx parent_id       评论父ID
     * @param ctx is_del          是否隐藏
     *
     * @returns  成功创建评论返回评论详情数据，失败返回错误信息
     */
    static async create(ctx) {
        // 接收参数
        let params = {name, email, parent_id, is_del = 0} = ctx.request.body;

        // 检测参数是否存在为空
        let errors = [];
        for (let item in params) {
            if (params[item] === undefined) {
                let index = errors.length + 1;
                errors.push("错误" + index + ": 参数: " + item + "不能为空")
            }
        }

        if (errors.length > 0) {
            ctx.response.status = 422;
            ctx.body = {
                code: 422,
                message: errors
            }

            return false;
        }

        try {

            // 创建评论
            const {id} = await CommentsModel.createComments(params);
            // 查询评论
            const data = await CommentsModel.getCommentsDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `创建评论成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `创建评论失败`,
                data: err
            }
        }

    }

    /**
     * 获取评论列表
     * @param ctx
     *
     * @returns 评论列表数据
     */
    static async list(ctx) {
        let params = ctx.query;
        try {
            const data = await CommentsModel.getCommentsList(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询评论列表成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询评论列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询评论详情
     * @param ctx id  评论ID
     *
     * @returns 评论的详情
     */
    static async detail(ctx) {
        // 评论ID
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `评论ID为空，请传入查询的评论ID`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的评论ID`
            }

            return false;
        }

        try {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询评论成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询评论失败`,
                data: err
            }
        }

    }


    /**
     * 软删除评论数据（隐藏数据）
     * @param ctx id 评论ID
     * @param ctx is_del 是否软删除
     * @returns {Promise<boolean>}
     */
    static async hidden(ctx) {
        let {id} = ctx.params;
        let {is_del} = ctx.request.body;


        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        try {
            await CommentsModel.hiddenComments(id, {is_del});

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `删除评论成功`
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `删除评论失败`,
                data: err
            }
        }

    }

    /**
     * 更新导航条数据
     * @param ctx name            评论人名字
     * @param ctx email           评论人邮箱
     * @param ctx parent_id       评论父ID
     * @param ctx is_del          是否隐藏
     *
     * @returns 更新成功则返回更新后的评论数据，失败返回更新失败的原因
     */
    static async update(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        // 接收参数
        let params = {name, email, parent_id, is_del = 0} = ctx.request.body;

        try {
            await CommentsModel.updateComments(id, params);
            let data = await CommentsModel.getCommentsDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `更新评论成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新评论失败`,
                data: err
            }
        }
    }
}

module.exports = commentsController
