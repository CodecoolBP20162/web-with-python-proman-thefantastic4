$(document).ready(function () {

    data_loader.set_active_board(0);

    $('body').on('click', '.remove-card', function () {
        var card_id = $(this).closest('li').attr("id").slice(2);
        $(this).closest('li').remove();
        data_loader.remove_card(card_id);

    });


    var status_checker = function (all_cards) {
        var empty_card = $('#empty-card-final');
        var empty_title = $('#empty-card-final .title-input');
        var empty_description = $('#empty-card-final .task');

        $('.sortable').html('');
        for (card in all_cards) {
            if (all_cards[card].status === 'new') {
                var where = '#new-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);
            } else if (all_cards[card].status === 'in-progress') {
                var where = '#in-progress-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);
            } else if (all_cards[card].status === 'review') {
                var where = '#review-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);
            } else if (all_cards[card].status === 'done') {
                var where = '#done-cards .sortable';
                fill_with_cards(all_cards, empty_card, empty_title, empty_description, where);
            };
        };
    };

    var fill_with_cards = function (all_cards, empty_card, empty_title, empty_description, where) {
        empty_title.html(all_cards[card].title);
        empty_description.html(all_cards[card].description);
        empty_card.clone().appendTo(where).removeAttr("style").attr("id", "li" + all_cards[card].id);
        $("#li" + all_cards[card].id + " .title-input").attr("onfocusout", "modcard(" + all_cards[card].id + ")").attr("id", "cardtitle" + all_cards[card].id);
        $("#li" + all_cards[card].id + " .task").attr("onfocusout", "modcard(" + all_cards[card].id + ")").attr("id", "cardtask" + all_cards[card].id);
    }

    $('.menu-link').click(function () {
        //var data_loader = new DataLoader("localstorage");
        var board_html_id = $(this).attr('id');

        var board = data_loader.get_board(board_html_id);
        board = JSON.parse(board);
        var board_title = board.title;

        $('#navbar-title-input').val(board_title);
        $('#delete-button').attr("value", board_html_id);

        var all_cards = data_loader.get_all_cards(board.id);
        all_cards = JSON.parse(all_cards);

        data_loader.set_active_board(board.id);
        var active_board = data_loader.get_active_board();

        //fill_with_cards(all_cards);
        status_checker(all_cards);
    });

    $("#trash-icon").click(function () {
        current_id = data_loader.get_active_board().trim();
        data_loader.remove_board(current_id);
        location.reload();
    });

    $('#add-button').click(function () {
        var new_card = data_loader.create_card(data_loader.get_active_board());
        var empty_card = $('#empty-card-final');
        empty_card.clone().appendTo('#new-cards .sortable').removeAttr("style").attr("id", "li" + new_card);

        $("#li" + new_card + " .title-input").attr("onfocusout", "modcard(" + new_card + ")").attr("id", "cardtitle" + new_card);
        $("#li" + new_card + " .task").attr("onfocusout", "modcard(" + new_card + ")").attr("id", "cardtask" + new_card);
        $("#li" + new_card + " .title-input").html("");
        $("#li" + new_card + " .task").html("");

    });

    $('#add-board').click(function () {
        var board_name = document.getElementById('add-board-name').value;
        if (board_name.trim() != "") {
            var board_id = data_loader.create_board();
            data_loader.modify_board(board_id, board_name);
            $('<a href="javascript:void(0)" class="menu-link" id="' + board_id + '">' + board_name + '</a>').insertBefore('#add-board');

            $('.menu-link').click(function () {
                //var data_loader = new DataLoader("localstorage");
                var board_html_id = $(this).attr('id');

                var board = data_loader.get_board(board_html_id);
                board = JSON.parse(board);
                var board_title = board.title;

                $('.board-title').html(board_title);
                $('title').html(board_title);

                var all_cards = data_loader.get_all_cards(board.id);
                all_cards = JSON.parse(all_cards);

                data_loader.set_active_board(board.id);
                var active_board = data_loader.get_active_board();

                //fill_with_cards(all_cards);
                status_checker(all_cards);
            });

        }       
    });

    $("#navbar-title-input").blur(function() {
        var active_board = data_loader.get_active_board();
        if (active_board != 0) {
            data_loader.modify_board(active_board, $("#navbar-title-input").val());
        }
    });
});


var modcard = function (card_id) {
    var title = $("#cardtitle" + card_id).val();
    var desc = $("#cardtask" + card_id).val();
    data_loader.modify_card(card_id, title, desc);
};


