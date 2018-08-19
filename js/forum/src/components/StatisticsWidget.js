import Component from 'flarum/Component';
import username from 'flarum/helpers/username';

export default class StatisticsWidget extends Component {
    init() {
        super.init();

    }

    view() {
        let user = {
            username: m.prop(app.forum.attribute('lastUser')),
        };

        return (
            <div>
                <div class="TagTile-info row">
                    <div class="col-xs-8 col-lg-7">What's Going On?</div>
                </div>

                <div class="row">
                    <div class="col-xs-3 col-lg-1"><i class="fa fa-bar-chart icon TagStatsIcon"></i></div>
                    <div class="col-xs-9 col-lg-10 TagTile">
                        <p class="TagTile-description">
                            <h4>Forum statistics</h4>

                            Topics: <strong>{app.forum.attribute('discussionsCount')}</strong> /  &nbsp;Posts:  <strong>{app.forum.attribute('postsCount')}</strong> /  &nbsp;Members:  <strong>{app.forum.attribute('usersCount')}</strong><br></br>
                            Welcome to our newest member: &nbsp;
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
