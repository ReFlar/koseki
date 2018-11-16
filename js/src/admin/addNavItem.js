import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import KosekiPage from './components/KosekiPage';

export default function () {
    app.routes.koseki = { path: '/koseki', component: KosekiPage.component() };

    app.extensionSettings['flarum-koseki'] = () => m.route(app.route('koseki'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('koseki', AdminLinkButton.component({
            href: app.route('koseki'),
            icon: 'fas fa-list',
            children: 'Koseki',
            description: 'Manage your hierarchical layout.'
        }));
    });
}
