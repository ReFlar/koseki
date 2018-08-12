import { extend } from 'flarum/extend';
import CategoryPage from 'reflar/koseki/pages/CategoryPage';
import IndexPage from 'flarum/components/IndexPage';
import Model from 'flarum/Model';
import Tag from 'flarum/tags/models/Tag';

app.initializers.add('reflar-koseki', app => {
    app.routes['reflar-koseki'] = {
        path: '/koseki',
        component: CategoryPage.component()
    };

    Tag.prototype.commentsCount = Model.attribute('commentsCount');
    Tag.prototype.lastUser = Model.attribute('lastUser');
    Tag.prototype.hasChild = Model.attribute('hasChild');
    Tag.prototype.icon = Model.attribute('icon');
});
