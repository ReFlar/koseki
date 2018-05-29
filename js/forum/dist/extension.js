'use strict';

System.register('reflar/koseki/components/ChildTagView', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/humanTime', 'reflar/koseki/components/LastDiscussionView'], function (_export, _context) {
    "use strict";

    var Component, avatar, username, humanTime, LastDiscussionView, ChildTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }, function (_flarumHelpersHumanTime) {
            humanTime = _flarumHelpersHumanTime.default;
        }, function (_reflarKosekiComponentsLastDiscussionView) {
            LastDiscussionView = _reflarKosekiComponentsLastDiscussionView.default;
        }],
        execute: function () {
            ChildTagView = function (_Component) {
                babelHelpers.inherits(ChildTagView, _Component);

                function ChildTagView() {
                    babelHelpers.classCallCheck(this, ChildTagView);
                    return babelHelpers.possibleConstructorReturn(this, (ChildTagView.__proto__ || Object.getPrototypeOf(ChildTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(ChildTagView, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(ChildTagView.prototype.__proto__ || Object.getPrototypeOf(ChildTagView.prototype), 'init', this).call(this);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;

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
                                    tag.discussionsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.topics', tag.discussionsCount(), { count: tag.discussionsCount() })
                                ),
                                m(
                                    'span',
                                    { className: 'TagChild-posts' },
                                    tag.commentsCount() + ' ' + app.translator.transChoice('reflar-koseki.forum.posts', tag.commentsCount() == 0 ? 0 : tag.commentsCount(), { count: tag.commentsCount() == 0 ? 0 : tag.commentsCount() })
                                )
                            ),
                            LastDiscussionView.component({ tag: tag })
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

System.register('reflar/koseki/components/LastDiscussionView', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/humanTime', 'flarum/utils/stringToColor', 'flarum/utils/computed'], function (_export, _context) {
    "use strict";

    var Component, avatar, username, humanTime, stringToColor, computed, LastDiscussionView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }, function (_flarumHelpersHumanTime) {
            humanTime = _flarumHelpersHumanTime.default;
        }, function (_flarumUtilsStringToColor) {
            stringToColor = _flarumUtilsStringToColor.default;
        }, function (_flarumUtilsComputed) {
            computed = _flarumUtilsComputed.default;
        }],
        execute: function () {
            LastDiscussionView = function (_Component) {
                babelHelpers.inherits(LastDiscussionView, _Component);

                function LastDiscussionView() {
                    babelHelpers.classCallCheck(this, LastDiscussionView);
                    return babelHelpers.possibleConstructorReturn(this, (LastDiscussionView.__proto__ || Object.getPrototypeOf(LastDiscussionView)).apply(this, arguments));
                }

                babelHelpers.createClass(LastDiscussionView, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(LastDiscussionView.prototype.__proto__ || Object.getPrototypeOf(LastDiscussionView.prototype), 'init', this).call(this);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;
                        var discussion = tag.lastDiscussion();

                        if (tag.lastUser() != null) {
                            var user = {
                                username: m.prop(tag.lastUser().username),
                                avatarUrl: tag.lastUser().avatarUrl != null ? m.prop(tag.lastUser().avatarUrl) : m.prop(),
                                color: computed('username', 'avatarUrl', 'avatarColor', function (username, avatarUrl, avatarColor) {
                                    if (avatarColor) {
                                        return 'rgb(' + avatarColor.join(', ') + ')';
                                    } else if (avatarUrl) {
                                        this.calculateAvatarColor();
                                        return '';
                                    }

                                    return '#' + stringToColor(username);
                                })
                            };

                            return m(
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
                                    '\xA0',
                                    m(
                                        'a',
                                        { href: app.route.user(user), config: m.route },
                                        username(user),
                                        ' ',
                                        m('i', { 'class': 'fa fa-icon fa-arrow-circle-right' })
                                    ),
                                    m('br', null),
                                    m(
                                        'small',
                                        null,
                                        humanTime(discussion.lastTime())
                                    )
                                )
                            );
                        } else {
                            return m('div', null);
                        }
                    }
                }]);
                return LastDiscussionView;
            }(Component);

            _export('default', LastDiscussionView);
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
                    key: 'toggleView',
                    value: function toggleView() {
                        var parent = this.parentNode.parentNode.parentNode;
                        var child = parent.querySelectorAll('.Category--Children')[0];

                        child.style.display = child.style.display == 'none' ? 'block' : 'none';
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;

                        return m(
                            'div',
                            { className: 'Category TagTile' },
                            tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 ? m(
                                'div',
                                { className: 'TagTile-info', style: tag.color() ? 'background: ' + tag.color() + ';' : '' },
                                m(
                                    'div',
                                    { 'class': 'TagTile-title' },
                                    m(
                                        'a',
                                        { href: app.route('tag', { tags: tag.slug() }) },
                                        tag.name()
                                    )
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-stats' },
                                    app.translator.trans('reflar-koseki.forum.statistics')
                                ),
                                m(
                                    'div',
                                    { 'class': 'TagTile-last' },
                                    app.translator.trans('reflar-koseki.forum.last_post'),
                                    m('i', { 'class': 'icon fa fa-angle-down', onclick: this.toggleView })
                                )
                            ) : '',
                            m(
                                'div',
                                { className: 'Category--Children TagTile-childview' },
                                tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 && tag.description() != '' ? m(
                                    'div',
                                    { 'class': 'TagTile-description' },
                                    tag.description()
                                ) : '',
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

System.register('reflar/koseki/main', ['flarum/extend', 'reflar/koseki/pages/CategoryPage', 'flarum/components/IndexPage', 'flarum/Model', 'flarum/tags/models/Tag'], function (_export, _context) {
    "use strict";

    var extend, CategoryPage, IndexPage, Model, Tag;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_reflarKosekiPagesCategoryPage) {
            CategoryPage = _reflarKosekiPagesCategoryPage.default;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
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
                Tag.prototype.lastUser = Model.attribute('lastUser');
                Tag.prototype.hasChild = Model.attribute('hasChild');
            });
        }
    };
});;
'use strict';

System.register('reflar/koseki/pages/CategoryPage', ['flarum/components/Page', 'reflar/koseki/components/PrimaryTagView', 'flarum/tags/utils/sortTags', 'flarum/components/IndexPage', 'flarum/helpers/listItems', 'reflar/koseki/components/ChildTagView'], function (_export, _context) {
    "use strict";

    var Page, PrimaryTagView, sortTags, IndexPage, listItems, ChildTagView, CategoryPage;
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
        }, function (_reflarKosekiComponentsChildTagView) {
            ChildTagView = _reflarKosekiComponentsChildTagView.default;
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
                            return tag.isChild() == false;
                        }));
                        this.secondary = sortTags(app.store.all('tags').filter(function (tag) {
                            return tag.hasChild() == false && tag.isChild() == false;
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
                                        }),
                                        this.secondary.length >= 1 ? m(
                                            'div',
                                            { className: 'TagTile-info' },
                                            m(
                                                'div',
                                                { 'class': 'TagTile-title' },
                                                app.translator.trans('reflar-koseki.forum.forums')
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
                                        ) : '',
                                        this.secondary.map(function (tag) {
                                            return ChildTagView.component({ tag: tag });
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