import Component from 'flarum/Component';
import sortTags from 'flarum/tags/utils/sortTags';
import ChildTagView from 'reflar/koseki/components/ChildTagView';

export default class PrimaryTagView extends Component {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.parent() == this.props.tag));
    }

    toggleView() {
        let parent = this.parentNode.parentNode.parentNode;
        let child = parent.querySelectorAll('.Category--Children')[0];

        if (child.style.display == 'none') {
            this.classList.remove('fa-angle-left');
            this.classList.add('fa-angle-down');

        } else {
            this.classList.remove('fa-angle-down');
            this.classList.add('fa-angle-left');
        }

        child.style.display = child.style.display == 'none' ? 'block' : 'none';
    }

    view() {
        const tag = this.props.tag;

        return (
           <div className="Category TagTile">
                { tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 ? (
                <div className="TagTile-info" style={tag.color() ? 'background: ' + tag.color() + ';' : ''}>
                    <div class="TagTile-title"><a href={ app.route('tag', { tags: tag.slug() }) }>{ tag.name() }</a></div>
                    <div class="TagTile-stats">{ app.translator.trans('reflar-koseki.forum.statistics') }</div>
                    <div class="TagTile-last">{ app.translator.trans('reflar-koseki.forum.last_post') }</div>
                    <div class="TagTile-toggle"><i class="icon fa fa-angle-down" onclick={this.toggleView}></i></div>
                </div>) : ''}

                <div className="Category--Children TagTile-childview">
                    { tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 && tag.description() != '' ? (<div class="TagTile-description">{ tag.description() }</div>) : ''}
                    { this.tags.map(tag => ChildTagView.component({tag})) }
                </div>
           </div>
        );
    }
}
