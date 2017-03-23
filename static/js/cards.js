$(document).ready(function(){

    var status_checker = function(all_cards) {
        var empty_card = $('#1');
        var empty_title = $('#1 .title-input'); 
        var empty_description = $('#1 .task');
        $('.sortable').html('');
        for (card in all_cards) {
            if (all_cards[card].status==='new') {
                var where = '#new-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);       
            } else if (all_cards[card].status==='in-progress') {
                var where = '#in-progress-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);  
            } else if (all_cards[card].status==='review') {
                var where = '#review-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);  
            } else if (all_cards[card].status==='done') {
                var where = '#done-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);
            };
        };
    };

    var fill_with_cards = function(all_cards, empty_card, empty_title, empty_description, where) {
        empty_title.html(all_cards[card].title);
        empty_description.html(all_cards[card].description);
        empty_card.clone().appendTo(where);
    }

    $('.board-title').click(function(){
        //var data_loader = new DataLoader("localstorage");
        var board_html_id = $(this).attr('id');

        var board = data_loader.get_board(board_html_id);
        board = JSON.parse(board);
        var board_title = board.title;
 
        $('.board-title').html(board_title);
        $('title').html(board_title);

        var all_cards = data_loader.get_all_cards(board.id);
        all_cards = JSON.parse(all_cards);
        
        //fill_with_cards(all_cards);
        status_checker(all_cards);
    });
});