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
        menuclickevent(this);
    });

    $("#trash-icon").click(function () {
        current_id = data_loader.get_active_board().trim();
        data_loader.remove_board(current_id);
        location.reload();
    });

    $('#add-new-card').click(function () {
        var active_board = data_loader.get_active_board();

        if (active_board != 0) {
            var card_title = $("#new-card-title").val().trim();
            var card_desc = $("#new-card-desc").val().trim();
            $("#new-card-title").val("").removeAttr("style");
            $("#new-card-desc").val("").removeAttr("style");
            var new_card = data_loader.create_card(active_board);

            data_loader.modify_card(new_card, card_title, card_desc);
            var empty_card = $('#empty-card-final');
            empty_card.clone().appendTo('#new-cards .sortable').removeAttr("style").attr("id", "li" + new_card);

            $("#li" + new_card + " .title-input").attr("onfocusout", "modcard(" + new_card + ")").attr("id", "cardtitle" + new_card);
            $("#li" + new_card + " .task").attr("onfocusout", "modcard(" + new_card + ")").attr("id", "cardtask" + new_card);
            $("#li" + new_card + " .title-input").html(card_title);
            $("#li" + new_card + " .task").html(card_desc);
        }

    });

    $("#navbar-title-input").blur(function() {
        var active_board = data_loader.get_active_board();
        if (active_board != 0) {
            var new_title = $("#navbar-title-input").val();
            data_loader.modify_board(active_board, new_title);
            $("#"+active_board).html(new_title)
        }
    });

    $("#delete-button").click(function() {
        var active_board = data_loader.get_active_board()

        if (active_board != 0) {
            data_loader.remove_board(active_board);
            location.reload();
        }
    });

    $("#add-new-board").click(function() {
        var board_name = document.getElementById('new-title-input').value;
        console.log(board_name);

        if (board_name.trim() != "") {
            console.log("bejössz")
            var board_id = data_loader.create_board();
            data_loader.modify_board(board_id, board_name);
            $("#mySidenav").append('<a href="javascript:void(0)" class="menu-link" id="' + board_id + '">' + board_name + '</a>');

            $('.menu-link').click(function () {
                menuclickevent(this);
            });

        }
    });

    var menuclickevent = function(link_tag) {
        var board_html_id = $(link_tag).attr('id');

        var board = data_loader.get_board(board_html_id);
        board = JSON.parse(board);
        var board_title = board.title;

        $('#navbar-title-input').val(board_title);
        $('#delete-button').attr("value", board_html_id);

        var all_cards = data_loader.get_all_cards(board.id);
        all_cards = JSON.parse(all_cards);

        data_loader.set_active_board(board.id);
        var active_board = data_loader.get_active_board();

        status_checker(all_cards);
    };

    $(".logo").click(function() {
        event.preventDefault();
         $('html, body').animate({
            scrollTop: 0
        }, 200);
    });
});



var modcard = function (card_id) {
    var title = $("#cardtitle" + card_id).val();
    var desc = $("#cardtask" + card_id).val();
    data_loader.modify_card(card_id, title, desc);
};


