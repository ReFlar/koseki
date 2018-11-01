<<<<<<< HEAD:js/src/forum/index.js
import CategoryPage from './pages/CategoryPage';
=======
import CategoryPage from 'reflar/koseki/pages/CategoryPage';
>>>>>>> ee988f192e5e24aab7ad6c7c01843e5b689a4f15:js/forum/src/main.js
import Model from 'flarum/Model';
import Tag from 'flarum/tags/models/Tag';

app.initializers.add('reflar-koseki', app => {
    app.routes.koseki = {path: '/koseki', component: CategoryPage.component()};

    Tag.prototype.commentsCount = Model.attribute('commentsCount');
    Tag.prototype.lastUser = Model.attribute('lastUser');
    Tag.prototype.hasChild = Model.attribute('hasChild');
    Tag.prototype.icon = Model.attribute('icon');
});
