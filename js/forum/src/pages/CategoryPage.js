import Page from 'flarum/components/Page';
import PrimaryTagView from 'reflar/koseki/components/PrimaryTagView';
import sortTags from 'flarum/tags/utils/sortTags';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';

export default class CategoryPage extends Page {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.isPrimary()));
    }

    view() {
        return (
            <div className="KosekiPage">
                { IndexPage.prototype.hero() }
                <div className="container">
                    <nav className="KosekiPage-nav IndexPage-nav sideNav" config={ IndexPage.prototype.affixSidebar }>
                        <ul>{ listItems(IndexPage.prototype.sidebarItems().toArray()) }</ul>
                    </nav>

                    <div className="KosekiPage-content">
                        <div className="KosekiPage--categories TagTiles">
                            { this.tags.map(tag => PrimaryTagView.component({tag})) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
