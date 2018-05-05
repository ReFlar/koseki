import Component from 'flarum/Component';
import sortTags from 'flarum/tags/utils/sortTags';
import ChildTagView from 'reflar/koseki/components/ChildTagView';

export default class PrimaryTagView extends Component {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.parent() == this.props.tag));
    }

    view() {
        const tag = this.props.tag;

        return (
           <div className="Category TagTile">
                <a href={app.route('tag', {tags: tag.slug()})} className="TagTile-name TagTile-category">{tag.name()}</a>
                <p>{tag.description()}</p>

                <div className="TagTile-info">
                    <div class="TagTile-title">Forum</div>
                    <div class="TagTile-stats">Statistics</div>
                    <div class="TagTile-last">Last Post</div>
                </div>

                <div className="Category--Children TagTile-childview">
                    { this.tags.map(tag => ChildTagView.component({tag})) }
                </div>
           </div>
        );
    }
}
