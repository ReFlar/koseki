import { extend } from 'flarum/extend';
import CategoryPage from "./pages/CategoryPage";

app.initializers.add('flagrow-koseki', app => {
    app.routes['flagrow-koseki'] = {
        path: '/koseki',
        component: CategoryPage.component()
    };
});
