/**
 * Created by petya on 2017.03.23..
 */

$(document).ready(function() {

    var status_settr = function (grandchild) {

        var grandparent = grandchild.parent().parent();

        return grandparent.attr('id');

    };
        console.log('Ő ( ' + status_settr($('#1')) + ') a papám.')

        var index_check = function (element) {

            var listItem = $( element );

            return $( "li" ).index( listItem ) +1;


    };
        console.log('En az ' + index_check('#1') + '. gyerek vagyok.')

});

