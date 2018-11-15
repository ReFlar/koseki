import Page from 'flarum/components/Page';
import sortTags from 'flarum/tags/utils/sortTags';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import PrimaryTagView from '../components/PrimaryTagView';
import ChildTagView from '../components/ChildTagView';
import StatisticsWidget from '../components/StatisticsWidget';

export default class CategoryPage extends Page {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.isChild() == false));
        this.secondary = sortTags(app.store.all('tags').filter(tag => tag.hasChild() == false && tag.isChild() == false));
    }

    toggleView() {
        let parent = this.parentNode.parentNode.parentNode.parentNode;
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
        const tagView = app.forum.attribute('kosekiTagsView');
        const statisticsWidget = app.forum.attribute('kosekiStatistics');

        return (
            <div className="KosekiPage">
                {IndexPage.prototype.hero()}

                <div className="container">
                    <nav className="KosekiPage-nav IndexPage-nav sideNav" config={IndexPage.prototype.affixSidebar}>
                        <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                    </nav>

                    <div className="KosekiPage-content">
                        <div className="KosekiPage--categories TagTiles">
                            {this.tags.map(tag => PrimaryTagView.component({ tag }))}

                            {this.secondary.length >= 1 ? (
                                <div class="row">
                                    <div class="row TagTile-info">
                                        <div class="col-xs-8 col-lg-7">
                                            {app.translator.trans('reflar-koseki.forum.forums')}
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

                                    <div class="Category--Children TagTile">
                                        {this.secondary.map(tag => ChildTagView.component({ tag }))}
                                    </div>
                                </div>
                            ) : ''}
                        </div>

                        { statisticsWidget == null || statisticsWidget == 0 ?  StatisticsWidget.component() : '' }
                    </div>
                </div>
            </div>
        );

    }
}
