import Component from 'flarum/Component';

export default class ChildTagView extends Component {
    view() {
        const tag = this.props.tag;
        const discussion = tag.lastDiscussion();
        console.log(tag)
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
                    <span className="TagChild-post">22 posts</span>
                </div>

                <div className="TagChild-last">
                    <div className="TagChild-avatar"><img src="http://4tabern.com/assets/avatars/jeybwwupsj9gmgstjpg"/></div>
                    <div className="TagChild-post">
                        <a href="" className="TagChild-discussion"></a>
                        by Shahiem, 18 jan 09:05
                    </div>
                </div>
            </div>
        );
    }
}
