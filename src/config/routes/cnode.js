import ArticleList from '../../components/cnode/Content/ArticleList.vue'
import Article from '../../components/cnode/Content/Article.vue'
import User from '../../components/cnode/User/User.vue'


export default [{
    path: '/',
    component: ArticleList
}, {
    path: '/article/:id',
    component: Article
}, {
    path: '/user/:name?',
    component: User
}]
