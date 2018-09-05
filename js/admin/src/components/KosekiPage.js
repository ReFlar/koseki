import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import saveSettings from 'flarum/utils/saveSettings';

export default class KosekiPage extends Page {
    init() {
        super.init();
        this.loading = false;

        this.tagsView = m.prop(app.data.settings['koseki.tags_view']);
        this.statisticsWidget = m.prop(app.data.settings['koseki.statistics_widget']);
    }
    view() {
        return (
            <div className="KosekiPage">
                <div className="KosekiPage-header">
                    <div className="container">
                        Tidy up your flarum forum with a structured hierarchical layout.
                    </div>
                </div>

                <div className="container">
                    <h3>Hierarchical grid layout</h3>
                    Choose a view grid which users will first see when they visit your forum.<br /><br />

                    <form onsubmit={this.onsubmit.bind(this)}>
                        <div class="Form-group">
                            <input type="radio" className="KosekiPage-radio" name="tagsView" value="compact" checked={this.tagsView() == 'compact' ? true : false} onclick={m.withAttr('value', this.tagsView)} /> Compact<br />
                            <div className="KosekiPage-viewBar">Forum title</div>
                            <div className="KosekiPage-viewBar">Statistics</div>
                            <div className="KosekiPage-viewBar">Last post</div>
                        </div>

                        <div class="Form-group">
                            <input type="radio" className="KosekiPage-radio" name="tagsView" value="default" checked={typeof this.tagsView() == 'undefined' || this.tagsView() == 'default' ? true : false} onclick={m.withAttr('value', this.tagsView)} /> Default<br />
                            <div className="KosekiPage-viewBar">Forum title</div>
                            <div className="KosekiPage-viewBar">Discussions</div>
                            <div className="KosekiPage-viewBar">Posts</div>
                            <div className="KosekiPage-viewBar">Last post</div>
                        </div>

                        <h3>Settings</h3>
                        <div class="Form-group">
                        {Switch.component({
                            state: this.statisticsWidget(),
                            children: 'Hide forum statistics',
                            onchange: this.statisticsWidget
                        })}
                        </div>

                        {Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: 'Submit',
                            loading: this.loading
                        })}
                    </form>
                </div>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        if (this.loading) return;

        this.loading = true;

        const settings = {
            'koseki.tags_view': this.tagsView(),
            'koseki.statistics_widget': this.statisticsWidget(),
        };

        saveSettings(settings)
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
