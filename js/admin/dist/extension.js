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

System.register('reflar/koseki/main', ['reflar/koseki/addHomepageOption'], function (_export, _context) {
  "use strict";

  var addHomepageOption;
  return {
    setters: [function (_reflarKosekiAddHomepageOption) {
      addHomepageOption = _reflarKosekiAddHomepageOption.default;
    }],
    execute: function () {

      app.initializers.add('reflar-koseki', function (app) {
        addHomepageOption();
      });
    }
  };
});