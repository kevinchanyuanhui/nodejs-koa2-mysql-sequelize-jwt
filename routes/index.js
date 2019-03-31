const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')
const CategoryController = require('../controllers/category')
const UploadTokenController = require('../controllers/upload')
const CommentsController = require('../controllers/comments')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/detail/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);

/**
 * 上传token
 */
router.get('/upload/token', UploadTokenController.getUploadToken)

/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArticleController.create);
// 获取文章详情
router.get('/article/detail/:id', ArticleController.detail);
// 隐藏文章
router.put('/article/hidden/:id', ArticleController.hidden);
// 更改文章
router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
router.get('/article/list', ArticleController.list);
// 搜索文章
router.get('/article/search', ArticleController.search)

/**
 * 分类接口
 */
// 创建分类
router.post('/category/create', CategoryController.create);
// 获取分类详情
router.get('/category/detail/:id', CategoryController.detail);
// 删除分类
router.delete('/category/delete/:id', CategoryController.delete);
// 更改分类
router.put('/category/update/:id', CategoryController.update);
// 获取分类列表
router.get('/category/list', CategoryController.list);
// 查询分类ID下的所有文章列表
router.get('/category/article/:id', CategoryController.getCategoryArticle);
/**


 /* *
 *评论
 */
// 创建评论
router.post('/comments/create', CommentsController.create);
// 获取评论详情
router.get('/comments/detail/:id', CommentsController.detail);
// 删除评论
router.delete('/comments/hidden/:id', CommentsController.hidden);
// 更改评论
router.put('/comments/update/:id', CommentsController.update);
// 获取评论列表
router.get('/comments/list', CommentsController.list);

module.exports = router
