"use strict";

System.register("reflar/koseki/components/ChildTagView", ["flarum/Component"], function (_export, _context) {
    "use strict";

    var Component, ChildTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            ChildTagView = function (_Component) {
                babelHelpers.inherits(ChildTagView, _Component);

                function ChildTagView() {
                    babelHelpers.classCallCheck(this, ChildTagView);
                    return babelHelpers.possibleConstructorReturn(this, (ChildTagView.__proto__ || Object.getPrototypeOf(ChildTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(ChildTagView, [{
                    key: "view",
                    value: function view() {
                        var tag = this.props.tag;
                        var discussion = tag.lastDiscussion();
                        console.log(tag);
                        return m(
                            "div",
                            { className: "TagChild" },
                            m(
                                "div",
                                { className: "TagChild-meta" },
                                m("div", { className: "TagChild-image" }),
                                m(
                                    "div",
                                    { className: "TagChild-info" },
                                    m(
                                        "a",
                                        { href: app.route('tag', { tags: tag.slug() }), className: "TagChild-title" },
                                        tag.name()
                                    ),
                                    m(
                                        "p",
                                        null,
                                        tag.description()
                                    )
                                )
                            ),
                            m(
                                "div",
                                { className: "TagChild-stats" },
                                m(
                                    "span",
                                    { className: "TagChild-topics" },
                                    tag.discussionsCount(),
                                    " ",
                                    tag.discussionsCount() == 1 ? 'topic' : 'topics',
                                    " "
                                ),
                                m(
                                    "span",
                                    { className: "TagChild-post" },
                                    tag.commentsCount(),
                                    "  ",
                                    tag.commentsCount() == 1 ? 'post' : 'posts',
                                    " "
                                )
                            ),
                            m(
                                "div",
                                { className: "TagChild-last" },
                                m(
                                    "div",
                                    { className: "TagChild-avatar" },
                                    m("img", { src: "http://4tabern.com/assets/avatars/jeybwwupsj9gmgstjpg" })
                                ),
                                m(
                                    "div",
                                    { className: "TagChild-post" },
                                    m("a", { href: "", className: "TagChild-discussion" }),
                                    "by Shahiem, 18 jan 09:05"
                                )
                            )
                        );
                    }
                }]);
                return ChildTagView;
            }(Component);

            _export("default", ChildTagView);
        }
    };
});;
'use strict';

System.register('reflar/koseki/components/PrimaryTagView', ['flarum/Component', 'flarum/tags/utils/sortTags', 'reflar/koseki/components/ChildTagView'], function (_export, _context) {
    "use strict";

    var Component, sortTags, ChildTagView, PrimaryTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }, function (_reflarKosekiComponentsChildTagView) {
            ChildTagView = _reflarKosekiComponentsChildTagView.default;
        }],
        execute: function () {
            PrimaryTagView = function (_Component) {
                babelHelpers.inherits(PrimaryTagView, _Component);

                function PrimaryTagView() {
                    babelHelpers.classCallCheck(this, PrimaryTagView);
                    return babelHelpers.possibleConstructorReturn(this, (PrimaryTagView.__proto__ || Object.getPrototypeOf(PrimaryTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(PrimaryTagView, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(PrimaryTagView.prototype.__proto__ || Object.getPrototypeOf(PrimaryTagView.prototype), 'init', this).call(this);

                        this.tags = sortTags(app.store.all('tags').filter(function (tag) {
                            return tag.parent() == _this2.props.tag;
                        }));
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;

                        return m(
                            'div',
                            { className: 'Category TagTile' },
                            m(
                                'a',
                                { 'class': 'TagTile-name TagTile-category' },
                                tag.name()
                            ),
                            m(
                                'p',
                                null,
                                tag.description()
                            ),
                            m(
                                'div',
                                { className: 'TagTile-info' },
                                m(
                                    'div',
                                    { 'class': 'TagTile-title' },
                                    'Forum'
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-stats' },
                                    'Statistics'
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-last' },
                                    'Last Post'
                                )
                            ),
                            m(
                                'div',
                                { className: 'Category--Children TagTile-childview' },
                                this.tags.map(function (tag) {
                                    return ChildTagView.component({ tag: tag });
                                })
                            )
                        );
                    }
                }]);
                return PrimaryTagView;
            }(Component);

            _export('default', PrimaryTagView);
        }
    };
});;
'use strict';

System.register('reflar/koseki/main', ['flarum/extend', 'reflar/koseki/pages/CategoryPage', 'flarum/Model', 'flarum/tags/models/Tag'], function (_export, _context) {
    "use strict";

    var extend, CategoryPage, Model, Tag;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_reflarKosekiPagesCategoryPage) {
            CategoryPage = _reflarKosekiPagesCategoryPage.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumTagsModelsTag) {
            Tag = _flarumTagsModelsTag.default;
        }],
        execute: function () {

            app.initializers.add('reflar-koseki', function (app) {
                app.routes['reflar-koseki'] = {
                    path: '/koseki',
                    component: CategoryPage.component()
                };

                Tag.prototype.commentsCount = Model.attribute('commentsCount');
            });
        }
    };
});;
'use strict';

System.register('reflar/koseki/pages/CategoryPage', ['flarum/components/Page', 'reflar/koseki/components/PrimaryTagView', 'flarum/tags/utils/sortTags'], function (_export, _context) {
    "use strict";

    var Page, PrimaryTagView, sortTags, CategoryPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_reflarKosekiComponentsPrimaryTagView) {
            PrimaryTagView = _reflarKosekiComponentsPrimaryTagView.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }],
        execute: function () {
            CategoryPage = function (_Page) {
                babelHelpers.inherits(CategoryPage, _Page);

                function CategoryPage() {
                    babelHelpers.classCallCheck(this, CategoryPage);
                    return babelHelpers.possibleConstructorReturn(this, (CategoryPage.__proto__ || Object.getPrototypeOf(CategoryPage)).apply(this, arguments));
                }

                babelHelpers.createClass(CategoryPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(CategoryPage.prototype.__proto__ || Object.getPrototypeOf(CategoryPage.prototype), 'init', this).call(this);

                        this.tags = sortTags(app.store.all('tags').filter(function (tag) {
                            return tag.isPrimary();
                        }));
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m('div', { className: 'TagsPage' }, m('div', { className: 'container' }, m('div', { className: 'TagsPage-content' }, m('div', { className: 'Koseki--Categories TagTiles' }, this.tags.map(function (tag) {
                            return PrimaryTagView.component({ tag: tag });
                        })))));
                    }
                }]);
                return CategoryPage;
            }(Page);

            _export('default', CategoryPage);
        }
    };
});