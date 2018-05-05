import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import humanTime from 'flarum/helpers/humanTime';

export default class ChildTagView extends Component {
    view() {
        const tag = this.props.tag;
        const discussion = tag.lastDiscussion();
        const user = app.store.getById('users', tag.lastUserId())
console.log(discussion);
        return (
            <div className="TagChild">
                <div className="TagChild-meta">
                    <div className="TagChild-image"></div>

                    <div className="TagChild-info">
                        <a href={app.route('tag', {tags: tag.slug()})} className="TagChild-title">{tag.name()}</a>
                        <p>{tag.description()}</p>
                    </div>
                </div>

                <div className="TagChild-stats">

                    <span className="TagChild-topics">{app.translator.transChoice('reflar-koseki.forum.topics', tag.discussionsCount(), {count: tag.discussionsCount()})}</span>
                    <span className="TagChild-posts">{app.translator.transChoice('reflar-koseki.forum.posts', tag.discussionsCount(), {count: tag.discussionsCount()})}</span>
                </div>


                { discussion ?
                    (<div className="TagChild-last">
                        <div className="TagChild-avatar">{avatar(user)} {' '}</div>
                        <div className="TagChild-post">
                            <a href={app.route.discussion(discussion, discussion.lastPostNumber())} className="TagChild-discussion">{discussion.title()}</a>
                            {app.translator.trans('reflar-koseki.forum.by')}&nbsp;
                            <a href={app.route.user(user)} config={m.route}>
                             {username(user)}
                             </a>, {humanTime(discussion.lastTime())}
                        </div>
                </div>) : '' }
            </div>
        );
    }
}
