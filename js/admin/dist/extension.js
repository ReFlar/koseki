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

System.register('reflar/koseki/main', ['flarum/extend', 'flarum/Model', 'reflar/koseki/addHomepageOption', 'flarum/tags/components/EditTagModal', 'flarum/tags/models/Tag'], function (_export, _context) {
    "use strict";

    var extend, Model, addHomepageOption, EditTagModal, Tag;
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
        }],
        execute: function () {

            app.initializers.add('reflar-koseki', function (app) {
                addHomepageOption();

                Tag.prototype.icon = Model.attribute('icon');

                extend(EditTagModal.prototype, 'content', function (content) {
                    this.icon = m.prop(this.tag.icon() || '');
                    // Add new input
                    var newInput = document.createElement('div');
                    newInput.classList += 'Form-group';
                    newInput.innerHTML = '<label>Icon</label> <input class="FormControl" value="' + this.icon() + '">';

                    if (this.element) {
                        var formGroups = this.element.getElementsByClassName('Form-group');

                        // Add input before input 4
                        formGroups[4].before(newInput);
                    }
                });

                extend(EditTagModal.prototype, 'submitData', function (data) {
                    data.icon = this.icon();
                });
            });
        }
    };
});