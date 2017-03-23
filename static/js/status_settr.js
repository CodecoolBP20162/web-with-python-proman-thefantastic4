/**
 * Created by petya on 2017.03.23..
 */
var status_settr = function (grandchild) {

    var grandparent = grandchild.parent().parent();

    return grandparent.attr('id').slice(0, -6);

};

var index_check = function (element) {

    var listItem = $( element );

    return $("#"+status_settr(element)+"-cards li" ).index( listItem );

};

