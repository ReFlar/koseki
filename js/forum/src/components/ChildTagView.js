import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import humanTime from 'flarum/helpers/humanTime';
import LastDiscussionView from 'reflar/koseki/components/LastDiscussionView';

export default class ChildTagView extends Component {
    init() {
        super.init();
    }

    view() {
        const tag = this.props.tag;

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

                {LastDiscussionView.component({tag})}
            </div>
        );

    }
}
