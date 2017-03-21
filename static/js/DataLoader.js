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
            return chosen_board.id;
        }
    };

    this.get_card = function(id) {
        return true;
    };

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
    }
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

    this.state = state;
    this.instantiate_state();
}

var data_loader = new DataLoader("localstorage");
console.log(data_loader.get_all_boards());