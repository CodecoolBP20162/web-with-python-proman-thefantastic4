$(document).ready(function(){
    var fill_with_cards = function(all_cards) {
        var empty_card = $('#empty_card'); 
        var empty_title = $('#card-title');
        var empty_description = $('#card-description');
        $('.row').html('');
        for (card in all_cards) { 
            empty_title.val(all_cards[card].title);
            empty_description.text(all_cards[card].description);
            empty_card.clone().appendTo('.row');
        };
    };
    
    $('.board').click(function(){
        //var data_loader = new DataLoader("localstorage");
        var board_html_id = $(this).attr('id');

        var board = data_loader.get_board(board_html_id);
        board = JSON.parse(board);
        var board_title = board.title;
 
        $('.board-title').html(board_title);
        $('title').html(board_title);

        var all_cards = data_loader.get_all_cards(board.id);
        all_cards = JSON.parse(all_cards);
        
        fill_with_cards(all_cards);

    });
});
