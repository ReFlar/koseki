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

    extend(IndexPage.prototype, 'view', function(vdom) {
        // vdom.children[1].children[0].remove();

        // if (typeof vdom.children[1].children[0] != 'undifined') {
        //     delete vdom.children[1].children[0];
        // }

        console.log(vdom.children[1].children[0]);
      });
});
