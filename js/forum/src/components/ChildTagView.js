import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import humanTime from 'flarum/helpers/humanTime';

export default class ChildTagView extends Component {
    view() {
        const tag = this.props.tag;
        const discussion = tag.lastDiscussion();
        const user = app.store.getById('users', tag.lastUserId())

        return (
            <div className="TagChild">
                <div className="TagChild-meta">
                    <div className="TagChild-image"></div>

                    <div className="TagChild-info">
                        <a href={ app.route('tag', { tags: tag.slug() }) } className="TagChild-title">{tag.name()}</a>
                        <p>{tag.description()}</p>
                    </div>
                </div>

                <div className="TagChild-stats">
                    <span className="TagChild-topics">{ tag.discussionsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.topics', tag.discussionsCount(), {count: tag.discussionsCount()})}</span>
                    <span className="TagChild-posts">{ tag.commentsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.posts', tag.commentsCount() == 0 ? 0 : tag.commentsCount(), {count: tag.commentsCount() == 0 ? 0 : tag.commentsCount()})}</span>
                </div>

                { discussion ?
                    (<div className="TagChild-last">
                        <div className="TagChild-avatar">{ avatar(user) } {' '}</div>
                        <div className="TagChild-post">
                            <a href={ app.route.discussion(discussion, discussion.lastPostNumber()) } className="TagChild-discussion">{ discussion.title() }</a>
                            { app.translator.trans('reflar-koseki.forum.by') }&nbsp;
                            <a href={ app.route.user(user) } config={ m.route }>
                                { username(user) } <i class="fa fa-icon  fa-arrow-circle-right"></i>
                             </a><br/>
                            <small>{ humanTime(discussion.lastTime()) }</small>
                        </div>
                </div>) : '' }
            </div>
        );
    }
}
