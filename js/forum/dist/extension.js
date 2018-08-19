'use strict';

System.register('reflar/koseki/components/ChildTagView', ['flarum/Component', 'reflar/koseki/components/LastDiscussionView'], function (_export, _context) {
    "use strict";

    var Component, LastDiscussionView, ChildTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
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
                        var tagView = app.forum.attribute('kosekiTagsView');

                        return m(
                            'div',
                            { 'class': 'row TagChild-row' },
                            m(
                                'div',
                                { 'class': 'col-xs-8 col-lg-7' },
                                m(
                                    'div',
                                    { 'class': 'row' },
                                    m(
                                        'div',
                                        { 'class': 'col-xs-2' },
                                        tag.icon() ? m(
                                            'div',
                                            { className: 'TagChild-image' },
                                            m('i', { 'class': tag.icon() + ' icon' })
                                        ) : ''
                                    ),
                                    m(
                                        'div',
                                        { 'class': 'col-xs-9' },
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
                                )
                            ),
                            tagView == 'compact' ? m(
                                'div',
                                null,
                                m(
                                    'div',
                                    { 'class': 'col-xs-2 col-lg-2' },
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
                                )
                            ) : m(
                                'div',
                                null,
                                m(
                                    'div',
                                    { 'class': 'col-xs-2 col-lg-1' },
                                    m(
                                        'span',
                                        { 'class': 'TagChild-topics' },
                                        tag.discussionsCount()
                                    )
                                ),
                                m(
                                    'div',
                                    { 'class': 'col-xs-2 col-lg-1' },
                                    m(
                                        'span',
                                        { 'class': 'TagChild-posts' },
                                        tag.commentsCount()
                                    )
                                )
                            ),
                            m(
                                'div',
                                { 'class': 'visible-lg col-lg-2' },
                                LastDiscussionView.component({ tag: tag })
                            )
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
                                    { className: 'TagChild-lastmeta' },
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
                                        username(user)
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
                        var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
                        var child = parent.querySelectorAll('.Category--Children')[0];

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
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;
                        var tagView = app.forum.attribute('kosekiTagsView');

                        return m(
                            'div',
                            { 'class': 'container' },
                            m(
                                'div',
                                { 'class': 'Category TagTile' },
                                tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 ? m(
                                    'div',
                                    { 'class': 'row' },
                                    m(
                                        'div',
                                        { 'class': 'row TagTile-info' },
                                        m(
                                            'div',
                                            { 'class': 'col-xs-8 col-lg-7' },
                                            m(
                                                'a',
                                                { href: app.route('tag', { tags: tag.slug() }) },
                                                tag.name()
                                            )
                                        ),
                                        tagView == 'compact' ? m(
                                            'div',
                                            null,
                                            m(
                                                'div',
                                                { 'class': 'col-xs-2 col-lg-2' },
                                                m(
                                                    'span',
                                                    { 'class': 'TagTile-posts' },
                                                    app.translator.trans('reflar-koseki.forum.statistics')
                                                )
                                            )
                                        ) : m(
                                            'div',
                                            null,
                                            m(
                                                'div',
                                                { 'class': 'col-xs-2 col-lg-1' },
                                                m(
                                                    'span',
                                                    { 'class': 'TagTile-topics' },
                                                    app.translator.trans('reflar-koseki.forum.topics_title')
                                                )
                                            ),
                                            m(
                                                'div',
                                                { 'class': 'col-xs-2 col-lg-1' },
                                                m(
                                                    'span',
                                                    { 'class': 'TagTile-posts' },
                                                    app.translator.trans('reflar-koseki.forum.posts_title')
                                                )
                                            )
                                        ),
                                        m(
                                            'div',
                                            { 'class': 'col-xs-2 col-lg-2 visible-lg' },
                                            m(
                                                'span',
                                                { 'class': 'TagTile-last' },
                                                app.translator.trans('reflar-koseki.forum.last_post')
                                            )
                                        ),
                                        m(
                                            'div',
                                            { 'class': 'visible-lg col-lg-1' },
                                            m(
                                                'div',
                                                { 'class': 'TagTile-toggle' },
                                                m('i', { 'class': 'icon fa fa-angle-down', onclick: this.toggleView })
                                            )
                                        )
                                    )
                                ) : '',
                                m(
                                    'div',
                                    { 'class': 'Category--Children' },
                                    tag.isPrimary() && tag.isChild() == false && this.tags.length >= 1 && tag.description() != '' ? m(
                                        'p',
                                        { 'class': 'TagTile-description' },
                                        tag.description()
                                    ) : '',
                                    this.tags.map(function (tag) {
                                        return ChildTagView.component({ tag: tag });
                                    })
                                )
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

System.register('reflar/koseki/components/StatisticsWidget', ['flarum/Component', 'flarum/helpers/username'], function (_export, _context) {
    "use strict";

    var Component, username, StatisticsWidget;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }],
        execute: function () {
            StatisticsWidget = function (_Component) {
                babelHelpers.inherits(StatisticsWidget, _Component);

                function StatisticsWidget() {
                    babelHelpers.classCallCheck(this, StatisticsWidget);
                    return babelHelpers.possibleConstructorReturn(this, (StatisticsWidget.__proto__ || Object.getPrototypeOf(StatisticsWidget)).apply(this, arguments));
                }

                babelHelpers.createClass(StatisticsWidget, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(StatisticsWidget.prototype.__proto__ || Object.getPrototypeOf(StatisticsWidget.prototype), 'init', this).call(this);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var user = {
                            username: m.prop(app.forum.attribute('lastUser'))
                        };

                        return m(
                            'div',
                            null,
                            m(
                                'div',
                                { 'class': 'TagTile-info row' },
                                m(
                                    'div',
                                    { 'class': 'col-xs-8 col-lg-7' },
                                    app.translator.trans('reflar-koseki.forum.whats_on')
                                )
                            ),
                            m(
                                'div',
                                { 'class': 'row' },
                                m(
                                    'div',
                                    { 'class': 'col-xs-3 col-lg-1' },
                                    m('i', { 'class': 'fa fa-bar-chart icon TagStatsIcon' })
                                ),
                                m(
                                    'div',
                                    { 'class': 'col-xs-9 col-lg-10 TagTile' },
                                    m(
                                        'p',
                                        { 'class': 'TagTile-description' },
                                        m(
                                            'h4',
                                            null,
                                            app.translator.trans('reflar-koseki.forum.forum_stats')
                                        ),
                                        app.translator.trans('reflar-koseki.forum.topics_title'),
                                        ': ',
                                        m(
                                            'strong',
                                            null,
                                            app.forum.attribute('discussionsCount')
                                        ),
                                        ' /  \xA0',
                                        app.translator.trans('reflar-koseki.forum.posts_title'),
                                        ':  ',
                                        m(
                                            'strong',
                                            null,
                                            app.forum.attribute('postsCount')
                                        ),
                                        ' /  \xA0',
                                        app.translator.trans('reflar-koseki.forum.members'),
                                        ':  ',
                                        m(
                                            'strong',
                                            null,
                                            app.forum.attribute('usersCount')
                                        ),
                                        m('br', null),
                                        app.translator.trans('reflar-koseki.forum.welcome_members'),
                                        ': \xA0',
                                        m(
                                            'a',
                                            { href: app.route.user(user), config: m.route },
                                            m(
                                                'strong',
                                                null,
                                                username(user)
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    }
                }]);
                return StatisticsWidget;
            }(Component);

            _export('default', StatisticsWidget);
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
                Tag.prototype.icon = Model.attribute('icon');
            });
        }
    };
});;
'use strict';

System.register('reflar/koseki/pages/CategoryPage', ['flarum/components/Page', 'flarum/tags/utils/sortTags', 'flarum/components/IndexPage', 'flarum/helpers/listItems', 'reflar/koseki/components/PrimaryTagView', 'reflar/koseki/components/ChildTagView', 'reflar/koseki/components/StatisticsWidget'], function (_export, _context) {
    "use strict";

    var Page, sortTags, IndexPage, listItems, PrimaryTagView, ChildTagView, StatisticsWidget, CategoryPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_reflarKosekiComponentsPrimaryTagView) {
            PrimaryTagView = _reflarKosekiComponentsPrimaryTagView.default;
        }, function (_reflarKosekiComponentsChildTagView) {
            ChildTagView = _reflarKosekiComponentsChildTagView.default;
        }, function (_reflarKosekiComponentsStatisticsWidget) {
            StatisticsWidget = _reflarKosekiComponentsStatisticsWidget.default;
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
                    key: 'toggleView',
                    value: function toggleView() {
                        var parent = this.parentNode.parentNode.parentNode.parentNode;
                        var child = parent.querySelectorAll('.Category--Children')[0];

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
                }, {
                    key: 'view',
                    value: function view() {
                        var tagView = app.forum.attribute('kosekiTagsView');

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
                                            { 'class': 'row' },
                                            m(
                                                'div',
                                                { 'class': 'row TagTile-info' },
                                                m(
                                                    'div',
                                                    { 'class': 'col-xs-8 col-lg-7' },
                                                    app.translator.trans('reflar-koseki.forum.forums')
                                                ),
                                                tagView == 'compact' ? m(
                                                    'div',
                                                    null,
                                                    m(
                                                        'div',
                                                        { 'class': 'col-xs-2 col-lg-2' },
                                                        m(
                                                            'span',
                                                            { 'class': 'TagTile-posts' },
                                                            app.translator.trans('reflar-koseki.forum.statistics')
                                                        )
                                                    )
                                                ) : m(
                                                    'div',
                                                    null,
                                                    m(
                                                        'div',
                                                        { 'class': 'col-xs-2 col-lg-1' },
                                                        m(
                                                            'span',
                                                            { 'class': 'TagTile-topics' },
                                                            app.translator.trans('reflar-koseki.forum.topics_title')
                                                        )
                                                    ),
                                                    m(
                                                        'div',
                                                        { 'class': 'col-xs-2 col-lg-1' },
                                                        m(
                                                            'span',
                                                            { 'class': 'TagTile-posts' },
                                                            app.translator.trans('reflar-koseki.forum.posts_title')
                                                        )
                                                    )
                                                ),
                                                m(
                                                    'div',
                                                    { 'class': 'col-xs-2 col-lg-2 visible-lg' },
                                                    m(
                                                        'span',
                                                        { 'class': 'TagTile-last' },
                                                        app.translator.trans('reflar-koseki.forum.last_post')
                                                    )
                                                ),
                                                m(
                                                    'div',
                                                    { 'class': 'visible-lg col-lg-1' },
                                                    m(
                                                        'div',
                                                        { 'class': 'TagTile-toggle' },
                                                        m('i', { 'class': 'icon fa fa-angle-down', onclick: this.toggleView })
                                                    )
                                                )
                                            ),
                                            m(
                                                'div',
                                                { 'class': 'Category--Children TagTile' },
                                                this.secondary.map(function (tag) {
                                                    return ChildTagView.component({ tag: tag });
                                                })
                                            )
                                        ) : ''
                                    ),
                                    StatisticsWidget.component()
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