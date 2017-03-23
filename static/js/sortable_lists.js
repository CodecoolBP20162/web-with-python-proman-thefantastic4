/**
 * Created by petya on 2017.03.22..
 */
$(function() {
    var oldList, newList, item;
    $('.sortable').sortable({
        start: function(event, ui) {
            item = ui.item;
            newList = oldList = ui.item.parent().parent();
        },

        change: function(event, ui) {
            if(ui.sender) newList = ui.placeholder.parent().parent();
        },
        connectWith: ".sortable"
    }).disableSelection();
});