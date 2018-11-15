import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import addHomepageOption from './addHomepageOption';
import EditTagModal from 'flarum/components/EditTagModal';
import Tag from 'flarum/tags/models/Tag';
import addNavItem from './addNavItem';

app.initializers.add('reflar-koseki', app => {
    addNavItem();
    addHomepageOption();

    Tag.prototype.icon = Model.attribute('icon');

    extend(EditTagModal.prototype, 'init', function () {
        this.icon = m.prop(this.tag.icon() || '');
    });

    let showInput = 0;

    extend(EditTagModal.prototype, 'content', function (content) {
        if (showInput == 0) {
            let self = this;

            // Add new input
            let newInput = document.createElement('div');
            newInput.classList += 'Form-group';
            newInput.innerHTML = '<label>Icon</label> <input class="FormControl" value="' + this.icon() + '">';

            // Update input value
            var formInput = newInput.querySelector('input');
            formInput.oninput = function () {
                self.icon = m.prop(formInput.value);
            }

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
