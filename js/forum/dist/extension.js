'use strict';

System.register('reflar/koseki/components/ChildTagView', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/humanTime'], function (_export, _context) {
    "use strict";

    var Component, avatar, username, humanTime, ChildTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }, function (_flarumHelpersHumanTime) {
            humanTime = _flarumHelpersHumanTime.default;
        }],
        execute: function () {
            ChildTagView = function (_Component) {
                babelHelpers.inherits(ChildTagView, _Component);

                function ChildTagView() {
                    babelHelpers.classCallCheck(this, ChildTagView);
                    return babelHelpers.possibleConstructorReturn(this, (ChildTagView.__proto__ || Object.getPrototypeOf(ChildTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(ChildTagView, [{
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;
                        var discussion = tag.lastDiscussion();
                        var user = app.store.getById('users', tag.lastUserId());
                        console.log(discussion);
                        return m(
                            'div',
                            { className: 'TagChild' },
                            m(
                                'div',
                                { className: 'TagChild-meta' },
                                m('div', { className: 'TagChild-image' }),
                                m(
                                    'div',
                                    { className: 'TagChild-info' },
                                    m(
                                        'a',
                                        { href: app.route('tag', { tags: tag.slug() }), className: 'TagChild-title' },
                                        tag.name()
                                    ),
                                    m(
                                        'p',
                                        null,
                                        tag.description()
                                    )
                                )
                            ),
                            m(
                                'div',
                                { className: 'TagChild-stats' },
                                m(
                                    'span',
                                    { className: 'TagChild-topics' },
                                    app.translator.transChoice('reflar-koseki.forum.topics', tag.discussionsCount(), { count: tag.discussionsCount() })
                                ),
                                m(
                                    'span',
                                    { className: 'TagChild-posts' },
                                    app.translator.transChoice('reflar-koseki.forum.posts', tag.discussionsCount(), { count: tag.discussionsCount() })
                                )
                            ),
                            discussion ? m(
                                'div',
                                { className: 'TagChild-last' },
                                m(
                                    'div',
                                    { className: 'TagChild-avatar' },
                                    avatar(user),
                                    ' ',
                                    ' '
                                ),
                                m(
                                    'div',
                                    { className: 'TagChild-post' },
                                    m(
                                        'a',
                                        { href: app.route.discussion(discussion, discussion.lastPostNumber()), className: 'TagChild-discussion' },
                                        discussion.title()
                                    ),
                                    app.translator.trans('reflar-koseki.forum.by'),
                                    '  ',
                                    username(user),
                                    ', ',
                                    humanTime(discussion.lastTime())
                                )
                            ) : ''
                        );
                    }
                }]);
                return ChildTagView;
            }(Component);

            _export('default', ChildTagView);
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
                                { href: app.route('tag', { tags: tag.slug() }), className: 'TagTile-name TagTile-category' },
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
                                    app.translator.trans('reflar-koseki.forum.forum')
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-stats' },
                                    app.translator.trans('reflar-koseki.forum.statistics')
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-last' },
                                    app.translator.trans('reflar-koseki.forum.last_post')
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
                Tag.prototype.lastUserId = Model.attribute('lastUserId');
            });
        }
    };
});;
'use strict';

System.register('reflar/koseki/pages/CategoryPage', ['flarum/components/Page', 'reflar/koseki/components/PrimaryTagView', 'flarum/tags/utils/sortTags', 'flarum/components/IndexPage', 'flarum/helpers/listItems'], function (_export, _context) {
    "use strict";

    var Page, PrimaryTagView, sortTags, IndexPage, listItems, CategoryPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_reflarKosekiComponentsPrimaryTagView) {
            PrimaryTagView = _reflarKosekiComponentsPrimaryTagView.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
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
                        return m(
                            'div',
                            { className: 'KosekiPage' },
                            IndexPage.prototype.hero(),
                            m(
                                'div',
                                { className: 'container' },
                                m(
                                    'nav',
                                    { className: 'KosekiPage-nav IndexPage-nav sideNav', config: IndexPage.prototype.affixSidebar },
                                    m(
                                        'ul',
                                        null,
                                        listItems(IndexPage.prototype.sidebarItems().toArray())
                                    )
                                ),
                                m(
                                    'div',
                                    { className: 'KosekiPage-content' },
                                    m(
                                        'div',
                                        { className: 'KosekiPage--categories TagTiles' },
                                        this.tags.map(function (tag) {
                                            return PrimaryTagView.component({ tag: tag });
                                        })
                                    )
                                )
                            )
                        );
                    }
                }]);
                return CategoryPage;
            }(Page);

            _export('default', CategoryPage);
        }
    };
});