import Component from 'flarum/Component';
import LastDiscussionView from 'reflar/koseki/components/LastDiscussionView';

export default class ChildTagView extends Component {
    init() {
        super.init();
    }

    view() {
        const tag = this.props.tag;
        const tagView = app.forum.attribute('kosekiTagsView');

        return (
            <div class="row TagChild-row">
                <div class="col-xs-8 col-lg-7">
                    <div class="row">
                        <div class="col-xs-2">
                            {tag.icon() ? (<div className="TagChild-image"><i class={tag.icon() + ' icon'}></i></div>) : ''}
                        </div>
                        <div class="col-xs-9">
                            <a href={app.route('tag', { tags: tag.slug() })} className="TagChild-title">{tag.name()}</a>
                            <p>{tag.description()}</p>
                        </div>
                    </div>
                </div>
                {tagView == 'compact' ? (
                    <div>
                        <div class="col-xs-2 col-lg-2">
                            <span className="TagChild-topics">{tag.discussionsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.topics', tag.discussionsCount(), { count: tag.discussionsCount() })}</span>
                            <span className="TagChild-posts">{tag.commentsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.posts', tag.commentsCount() == 0 ? 0 : tag.commentsCount(), { count: tag.commentsCount() == 0 ? 0 : tag.commentsCount() })}</span>
                        </div>
                    </div>) : (
                        <div>
                            <div class="col-xs-2 col-lg-1">
                                <span class="TagChild-topics">{tag.discussionsCount()}</span>
                            </div>
                            <div class="col-xs-2 col-lg-1">
                                <span class="TagChild-posts">{tag.commentsCount()}</span>
                            </div>
                        </div>
                    )
                }

                <div class="visible-lg col-lg-2">
                    {LastDiscussionView.component({ tag })}
                </div>
            </div>
        );
    }
}
