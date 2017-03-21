function LocalStorageState() {

    // COMMON METHODS
    this.get_all_boards = function() {
        if (localStorage.getItem("boards") === null) {
            return false;
        }

        return this.get_boards_from_localstorage();
    };

    this.get_board = function(board_id) {
        if (localStorage.getItem("board" + board_id) === null) {
            return false;
        }

        return localStorage.getItem("board" + board_id);
    };

    this.get_all_cards = function(board_id) {
        chosen_board = this.get_board(board_id);

        if (chosen_board !== null) {
            chosen_board = JSON.parse(chosen_board);
            console.log(chosen_board);
            card_ids = chosen_board.card_order.split(";");
            cards_json_string = "[";

            for (var i = 0; i < card_ids.length; i++) {
                tmp_real_json = JSON.parse(localStorage.getItem("card" + card_ids[i]));
                tmp_real_json.order = i;

                if (i == card_ids.length - 1) {
                    cards_json_string += JSON.stringify(tmp_real_json) + "]";
                    break
                }
                cards_json_string += JSON.stringify(tmp_real_json) + ", ";
            }

            return cards_json_string;
        }
        return false;
    };

    // BUGGY AS HELL! CARD OBJECT DOESNT HAVE ORDER ATTRIBUTE
    // this.get_card = function(card_id) {
    //     if (localStorage.getItem("card" + card_id) === null) {
    //         return false;
    //     }
    //     return localStorage.getItem("card" + card_id);
    // };

    // ADDITIONAL METHODS
    this.get_boards_from_localstorage = function() {
        board_ids = localStorage.getItem("boards").split(";");
        boards_list_string = "[";

        for (var current_board_index = 0; current_board_index < board_ids.length; current_board_index++) {
            if (current_board_index == board_ids.length - 1) {
                boards_list_string += localStorage.getItem("board" + board_ids[current_board_index]) + "]";
                break
            }
            boards_list_string += localStorage.getItem("board" + board_ids[current_board_index]) + ", ";
        }

        return boards_list_string;
    };

    this.create_card = function(board_id) {
        var id = Date.now();
        localStorage.setItem("card"+id, '{"id":'+id+', "description":"", "status":"new"}');

        var board_json = this.get_board(board_id);
        board_json = JSON.parse(board_json);
        board_json.card_order += ";"+id;
        board_json = JSON.stringify(board_json);
        
        localStorage.setItem("board"+board_id, board_json);

        return true;

    };

    this.create_board = function() {
        var id = Date.now();
        localStorage.setItem("board"+id, '{"id":'+id+', "title":"", "card_order":""}');
        return true;
    };

    this.modify_card = function(card_id, title, description) {
        var card_json = JSON.parse(localStorage.getItem("card"+card_id));
        card_json.title = title;
        card_json.description = description;
        localStorage.setItem("card"+card_id, JSON.stringify(card_json));
        return true;
    };

    this.modify_board = function(board_id, title) {
        var board_json = JSON.parse(localStorage.getItem("board"+board_id));
        board_json.title = title;
        localStorage.setItem("board"+board_id, JSON.stringify(board_json));
    };
}

function PsqlState() {
    this.get_all_boards = function() {
        return "NOT IMPLEMENTED ERROR";
    };

    this.get_board = function(id) {
        return "NOT IMPLEMENTED ERROR";
    };

    this.get_all_cards = function() {
        return "NOT IMPLEMENTED ERROR";
    };

    this.get_card = function(id) {
        return "NOT IMPLEMENTED ERROR";
    };

    this.create_card = function(board_id) {
        return "NOT IMPLEMENTED ERROR";
    };

    this.create_board = function() {
        return "NOT IMPLEMENTED ERROR";
    };

    this.modify_card = function(card_id, title, description) {
        return "NOT IMPLEMENTED ERROR";
    };

    this.modify_board = function(board_id, title) {
        return "NOT IMPLEMENTED ERROR";
    };
}


function DataLoader(state) {

    this.instantiate_state = function() {
        if (this.state == "localstorage") {
            this.state = new LocalStorageState();

        } else if (this.state == "psql") {
            this.state = new PsqlState();

        }
        return true;
    };

    this.get_all_boards = function() {
        return this.state.get_all_boards();
    };

    this.get_board = function(id) {
        return this.state.get_board(id);
    };

    this.get_all_cards = function(board_id) {
        return this.state.get_all_cards(board_id);
    };

    this.get_card = function(id) {
        return this.state.get_card(id);
    };

    this.create_card = function(board_id) {
        return this.state.create_card(board_id);
    };

    this.create_board = function() {
        return this.state.create_board();
    };

    this.modify_card = function(card_id, title, description) {
        return this.state.modify_card(card_id, title, description);
    };

    this.modify_board = function(board_id, title) {
        return this.state.modify_board(board_id, title);
    };

    this.state = state;
    this.instantiate_state();
}

var data_loader = new DataLoader("localstorage");
// console.log(data_loader.get_all_boards());