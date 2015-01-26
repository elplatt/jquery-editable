/*

jquery-editable v1.0.0 2015-01-26
Make any text element user-editable.
Copyright (c) 2015 Edward L. Platt <ed@elplatt.com>
Distributed under BSD 3-clause license.

Usage:

$('p').editable({
    "enable": true,
    "target": $('button')
});

Whenever the <button> is clicked, the <p> will become focused and editable. On
blur, enter, or tab, the <p> will again be uneditable. Listen for a blur
event to capture the value.

$('p').editable({"enable": flase});

Disable any previoulsy enabled editable behavior.
*/

(function () {
    var onKeyDown = function (e) {
        var code = e.keyCode || e.which;
        // Blur on return or tab
        if (code == 13 || code == 9) {
            e.preventDefault();
            $(this).blur();
        }
    };
    var onTriggerClick = function (el) {
        return function (e) {
            e.preventDefault();
            $(el).get(0).contentEditable = "true";
            $(el).on("focus", function () {
                console.log('focused');
                setTimeout(function () {
                    document.execCommand('selectAll');
                }, 0);
                $(el).on('keydown', onKeyDown);
            });
            console.log('focusing');
            console.log(el);
            $(el).focus();
        };
    };
    var onBlur = function () {
        this.contentEditable = "false";
        $(this).off('keydown', onKeyDown);
    }
    jQuery.fn.extend({
        editable: function (options) {
            console.log('editable');
            var el = this;
            var defaults = {
                "enable": true,
                "trigger": null
            }
            var enable = options.enable;
            var trigger = options.trigger;
            if (typeof(enable) === 'undefined') {
                enable = defaults.enable;
            }
            if (typeof(trigger) === 'undefined') {
                trigger = defaults.trigger;
            }
            $(this).get(0).onTriggerClick = onTriggerClick(el);
            if (enable) {
                console.log('enabling editable');
                console.log(this);
                $(trigger).on('click', $(this).get(0).onTriggerClick);
                $(el).on('blur', onBlur);
            } else {
                $(trigger).off('click', $(this).get(0).onTriggerClick);
                $(el).off('blur', onBlur);
            }
        }
    });
})();
