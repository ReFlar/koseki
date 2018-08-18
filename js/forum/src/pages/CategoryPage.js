import Page from 'flarum/components/Page';
import PrimaryTagView from 'reflar/koseki/components/PrimaryTagView';
import sortTags from 'flarum/tags/utils/sortTags';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import ChildTagView from 'reflar/koseki/components/ChildTagView';

export default class CategoryPage extends Page {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.isChild() == false));
        this.secondary = sortTags(app.store.all('tags').filter(tag => tag.hasChild() == false && tag.isChild() == false));
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
