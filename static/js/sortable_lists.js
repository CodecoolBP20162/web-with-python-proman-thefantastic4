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

        stop: function(event, ui) {
            var new_status = status_settr(ui.item);
            var new_position = index_check(ui.item);
            var card_id = ui.item.attr("id").split("li")[1];
            data_loader.move_card(card_id, new_status, new_position);
        },
        connectWith: ".sortable"
    }).disableSelection();
});