import Component from 'flarum/Component';
import sortTags from 'flarum/tags/utils/sortTags';
import ChildTagView from '../components/ChildTagView';

export default class PrimaryTagView extends Component {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.parent() == this.props.tag));
    }

    toggleView() {
        let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
        let child = parent.querySelectorAll('.Category--Children')[0];

        if (child) {
            if (child.style.display == 'none') {
                this.classList.remove('fa-angle-left');
                this.classList.add('fa-angle-down');
            } else {
                this.classList.remove('fa-angle-down');
                this.classList.add('fa-angle-left');
            }

            child.style.display = child.style.display == 'none' ? 'block' : 'none';
        }
    }

    view() {
        const tag = this.props.tag;
        const tagView = app.forum.attribute('kosekiTagsView');

        return (
            <div class="container">
                <div class="Category TagTile">
                    {tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 ? (
                        <div class="row">
                            <div class="row TagTile-info">
                                <div class="col-xs-8 col-lg-7">
                                    <a href={app.route('tag', { tags: tag.slug() })}>{tag.name()}</a>
                                </div>
                                {tagView == 'compact' ? (
                                    <div>
                                        <div class="col-xs-2 col-lg-2">
                                            <span class="TagTile-posts">{app.translator.trans('reflar-koseki.forum.statistics')}</span>
                                        </div>
                                    </div>) : (
                                        <div>
                                            <div class="col-xs-2 col-lg-1">
                                                <span class="TagTile-topics">{app.translator.trans('reflar-koseki.forum.topics_title')}</span>
                                            </div>
                                            <div class="col-xs-2 col-lg-1">
                                                <span class="TagTile-posts">{app.translator.trans('reflar-koseki.forum.posts_title')}</span>
                                            </div>
                                        </div>
                                    )
                                }
                                <div class="col-xs-2 col-lg-2 visible-lg">
                                    <span class="TagTile-last">{app.translator.trans('reflar-koseki.forum.last_post')}</span>
                                </div>
                                <div class="visible-lg col-lg-1">
                                    <div class="TagTile-toggle"><i class="icon fa fa-angle-down" onclick={this.toggleView}></i></div>
                                </div>
                            </div>
                        </div>
                    ) : ''}
                    <div class="Category--Children">
                        {tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 && tag.description() != '' ? (<p class="TagTile-description">{tag.description()}</p>) : ''}
                        {this.tags.map(tag => ChildTagView.component({ tag }))}
                    </div>
                </div>
            </div>
        );
    }
}
