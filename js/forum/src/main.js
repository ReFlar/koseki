import { extend } from 'flarum/extend';
import CategoryPage from 'reflar/koseki/pages/CategoryPage';

app.initializers.add('reflar-koseki', app => {
    app.routes['reflar-koseki'] = {
        path: '/koseki',
        component: CategoryPage.component()
    };
});
