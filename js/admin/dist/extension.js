'use strict';

System.register('reflar/koseki/addHomepageOption', ['flarum/extend', 'flarum/components/BasicsPage'], function (_export, _context) {
    "use strict";

    var extend, BasicsPage;

    _export('default', function () {
        extend(BasicsPage.prototype, 'homePageItems', function (items) {
            items.add('koseki', {
                path: '/koseki',
                label: 'Koseki'
            });
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsBasicsPage) {
            BasicsPage = _flarumComponentsBasicsPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('reflar/koseki/addNavItem', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', './components/KosekiPage'], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, KosekiPage;

    _export('default', function () {
        app.routes.koseki = { path: '/koseki', component: KosekiPage.component() };

        app.extensionSettings['flarum-koseki'] = function () {
            return m.route(app.route('koseki'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            items.add('koseki', AdminLinkButton.component({
                href: app.route('koseki'),
                icon: 'fas fa-list',
                children: 'Koseki',
                description: 'Manage your hierarchical layout.'
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_componentsKosekiPage) {
            KosekiPage = _componentsKosekiPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('reflar/koseki/components/KosekiPage', ['flarum/components/Page', 'flarum/components/Button', 'flarum/utils/saveSettings'], function (_export, _context) {
    "use strict";

    var Page, Button, saveSettings, KosekiPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }],
        execute: function () {
            KosekiPage = function (_Page) {
                babelHelpers.inherits(KosekiPage, _Page);

                function KosekiPage() {
                    babelHelpers.classCallCheck(this, KosekiPage);
                    return babelHelpers.possibleConstructorReturn(this, (KosekiPage.__proto__ || Object.getPrototypeOf(KosekiPage)).apply(this, arguments));
                }

                babelHelpers.createClass(KosekiPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(KosekiPage.prototype.__proto__ || Object.getPrototypeOf(KosekiPage.prototype), 'init', this).call(this);
                        this.loading = false;

                        this.tagsView = m.prop(app.data.settings['koseki.tags_view']);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'KosekiPage' },
                            m(
                                'div',
                                { className: 'KosekiPage-header' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    'Tidy up your flarum forum with a structured hierarchical layout.'
                                )
                            ),
                            m(
                                'div',
                                { className: 'container' },
                                m(
                                    'h3',
                                    null,
                                    'Hierarchical grid layout'
                                ),
                                'Choose a view grid which users will first see when they visit your forum.',
                                m('br', null),
                                m('br', null),
                                m(
                                    'form',
                                    { onsubmit: this.onsubmit.bind(this) },
                                    m(
                                        'div',
                                        { 'class': 'Form-group' },
                                        m('input', { type: 'radio', className: 'KosekiPage-radio', name: 'tagsView', value: 'compact', checked: this.tagsView() == 'compact' ? true : false, onclick: m.withAttr('value', this.tagsView) }),
                                        ' Compact',
                                        m('br', null),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Forum title'
                                        ),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Statistics'
                                        ),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Last post'
                                        )
                                    ),
                                    m(
                                        'div',
                                        { 'class': 'Form-group' },
                                        m('input', { type: 'radio', className: 'KosekiPage-radio', name: 'tagsView', value: 'default', checked: typeof this.tagsView() == 'undefined' || this.tagsView() == 'default' ? true : false, onclick: m.withAttr('value', this.tagsView) }),
                                        ' Default',
                                        m('br', null),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Forum title'
                                        ),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Topics'
                                        ),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Posts'
                                        ),
                                        m(
                                            'div',
                                            { className: 'KosekiPage-viewBar' },
                                            'Last post'
                                        )
                                    ),
                                    Button.component({
                                        type: 'submit',
                                        className: 'Button Button--primary',
                                        children: 'Submit',
                                        loading: this.loading
                                    })
                                )
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this2 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        var settings = {
                            'koseki.tags_view': this.tagsView()
                        };

                        saveSettings(settings).then(function () {
                            _this2.loading = false;
                            m.redraw();
                        });
                    }
                }]);
                return KosekiPage;
            }(Page);

            _export('default', KosekiPage);
        }
    };
});;
'use strict';

System.register('reflar/koseki/main', ['flarum/extend', 'flarum/Model', 'reflar/koseki/addHomepageOption', 'flarum/tags/components/EditTagModal', 'flarum/tags/models/Tag', './addNavItem'], function (_export, _context) {
    "use strict";

    var extend, Model, addHomepageOption, EditTagModal, Tag, addNavItem;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_reflarKosekiAddHomepageOption) {
            addHomepageOption = _reflarKosekiAddHomepageOption.default;
        }, function (_flarumTagsComponentsEditTagModal) {
            EditTagModal = _flarumTagsComponentsEditTagModal.default;
        }, function (_flarumTagsModelsTag) {
            Tag = _flarumTagsModelsTag.default;
        }, function (_addNavItem) {
            addNavItem = _addNavItem.default;
        }],
        execute: function () {

            app.initializers.add('reflar-koseki', function (app) {
                addNavItem();
                addHomepageOption();

                Tag.prototype.icon = Model.attribute('icon');

                extend(EditTagModal.prototype, 'init', function () {
                    this.icon = m.prop(this.tag.icon() || '');
                });

                var showInput = 0;

                extend(EditTagModal.prototype, 'content', function (content) {
                    if (showInput == 0) {
                        var self = this;

                        // Add new input
                        var newInput = document.createElement('div');
                        newInput.classList += 'Form-group';
                        newInput.innerHTML = '<label>Icon</label> <input class="FormControl" value="' + this.icon() + '">';

                        // Update input value
                        var formInput = newInput.querySelector('input');
                        formInput.oninput = function () {
                            self.icon = m.prop(formInput.value);
                        };

                        if (this.element) {
                            var formGroups = this.element.getElementsByClassName('Form-group');
                            formGroups[4].before(newInput); // Add input before 4th form group
                        }
                    } else {
                        showInput = 0; // Reset to 0 when new window is openend
                    }
                });

                extend(EditTagModal.prototype, 'submitData', function (data) {
                    data.icon = this.icon;
                    showInput = 1; // Hide input when pressing submit
                });
            });
        }
    };
});