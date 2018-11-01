import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';

export default class KosekiPage extends Page {
    init() {
        super.init();
        this.loading = false;

        this.tagsView = m.prop(app.data.settings['koseki.tags_view']);
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
                            <div className="KosekiPage-viewBar">Topics</div>
                            <div className="KosekiPage-viewBar">Posts</div>
                            <div className="KosekiPage-viewBar">Last post</div>
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
            'koseki.tags_view': this.tagsView()
        };

        saveSettings(settings)
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
