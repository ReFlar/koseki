import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import humanTime from 'flarum/helpers/humanTime';
import stringToColor from 'flarum/utils/stringToColor';
import computed from 'flarum/utils/computed';
export default class LastDiscussionView extends Component {

    init() {
        super.init();
    }

    view() {
        let tag = this.props.tag;
        let discussion = tag.lastDiscussion();

        if (tag.lastUser() != null) {
            let user = {
                username: m.prop(tag.lastUser().username),
                avatarUrl:  tag.lastUser().avatar_path != null ? m.prop('assets/avatars/' + tag.lastUser().avatar_path) : m.prop(),
                color: computed('username', 'avatarUrl', 'avatarColor', function(username, avatarUrl, avatarColor) {
                    if (avatarColor) {
                      return 'rgb(' + avatarColor.join(', ') + ')';
                    } else if (avatarUrl) {
                      this.calculateAvatarColor();
                      return '';
                    }

                    return '#' + stringToColor(username);
                }),
            };

            return (
                <div className="TagChild-last">
                    <div className="TagChild-avatar">{ avatar(user) } {' '}</div>
                        <div className="TagChild-post">
                            <a href={ app.route.discussion(discussion, discussion.lastPostNumber()) } className="TagChild-discussion">{ discussion.title() }</a>

                            { app.translator.trans('reflar-koseki.forum.by') }&nbsp;
                            <a href={ app.route.user(user) } config={ m.route }>
                                { username(user) } <i class="fa fa-icon  fa-arrow-circle-right"></i>
                            </a><br/>
                        <small>{ humanTime(discussion.lastTime()) }</small>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}
