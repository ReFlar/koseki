import Component from 'flarum/Component';
import username from 'flarum/helpers/username';

export default class StatisticsWidget extends Component {
    init() {
        super.init();
    }

    view() {
        let user = {
            displayName: m.prop(app.forum.attribute('lastUser')),
            username: m.prop(app.forum.attribute('lastUser')),
        };

        return (
            <div>
                <div class="TagTile-info row">
                    <div class="col-xs-8 col-lg-7">{app.translator.trans('reflar-koseki.forum.whats_on')}</div>
                </div>

                <div class="row">
                    <div class="col-xs-3 col-lg-1"><i class="fa fa-bar-chart icon TagStatsIcon"></i></div>
                    <div class="col-xs-9 col-lg-10 TagTile">
                        <p class="TagTile-description">
                            <h4>{app.translator.trans('reflar-koseki.forum.forum_stats')}</h4>

                            {app.translator.trans('reflar-koseki.forum.topics_title')}: <strong>{app.forum.attribute('discussionsCount')}</strong> /  &nbsp;{app.translator.trans('reflar-koseki.forum.posts_title')}:  <strong>{app.forum.attribute('postsCount')}</strong> /  &nbsp;{app.translator.trans('reflar-koseki.forum.members')}:  <strong>{app.forum.attribute('usersCount')}</strong><br></br>
                            {app.translator.trans('reflar-koseki.forum.welcome_members')}: &nbsp;
                            <a href={app.route.user(user)} config={m.route}>
                                <strong>{username(user)}</strong>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
