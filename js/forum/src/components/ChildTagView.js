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
                    <span className="TagChild-topics">{tag.discussionsCount()} {tag.discussionsCount() == 1 ? 'topic' : 'topics' } </span>
                    <span className="TagChild-post">{tag.commentsCount()}  {tag.commentsCount() == 1 ? 'post' : 'posts' } </span>
                </div>


                { discussion ?
                    (<div className="TagChild-last">
                        <div className="TagChild-avatar">{avatar(user)} {' '}</div>
                        <div className="TagChild-post">
                            <a href={app.route.discussion(discussion, discussion.lastPostNumber())} className="TagChild-discussion">{discussion.title()}</a>
                            by  {username(user)}, {humanTime(discussion.lastTime())}
                        </div>
                </div>) : '' }
            </div>
        );
    }
}
