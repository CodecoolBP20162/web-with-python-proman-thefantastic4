$(document).ready(function(){

    var status_checker = function(all_cards) {
        var empty_card = $('#1.1');
        var empty_title = $('#1.1 .title-input');
        var empty_description = $('#1 .task');
        var append_value = $('.sortable');
        //$('.sortable').html('');
        for (card in all_cards) {
            if (all_cards[card].status==='new') {
                alert(all_cards[card].description)
                empty_title.val(all_cards[card].title);
                empty_description.val(all_cards[card].description);
                //empty_card.clone().appendTo('.row');
                var empty_clone = empty_card.clone()
                empty_clone.appendTo(append_value);


            //     fill_with_cards(all_cards,$('#new-cards > #card > .card-description'),$('#new-cards'));
            // } else if (all_cards[card].status=='in-progress') {
            //     fill_with_cards(all_cards,$('#in-progress-cards > .card > .card-description'),$('#in-progress-cards'));
            // } else if (all_cards[card].status=='review') {
            //     fill_with_cards(all_cards,$('#review-cards > .card > .card-description'),$('#review-cards'));
            // } else if (all_cards[card].status=='done') {
            //     fill_with_cards(all_cards,$('#done-cards > .card > .card-description'),$('#done-cards'));
            };
        };
    };

    // var fill_with_cards = function(all_cards) {
    //     //var empty_card = $('#new-cards > #card ');
    //     // var empty_title = $('#review-cards> .card-title');
    //     var empty_card = $('#empty_card');
    //     var empty_title = $('.title');

    //     var empty_description = card_desc;
    //     $('.sortable').html(''); //OK

    //     for (card in all_cards) {

    //     };
    // };
    // var fill_with_cards = function(all_cards) {
    //     var empty_card = $('#empty_card');
    //     var empty_title = $('.title-input');
    //     var empty_task = $('.task');
    //     //$('.row').html('');
    //     for (card in all_cards) {
    //         empty_title.text(all_cards[card].title);
    //         empty_task.text(all_cards[card].description);
    //         empty_card.clone().appendTo('.row');
    //     };
    // };

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
