function LocalStorageState() {

    this.get_all_boards = function() {
        if (localStorage.getItem("boards") === null) {
            return false;
        }
        return localStorage.getItem("boards");
    };

    this.get_board = function(id) {
        return true;
    };

    this.get_all_cards = function() {
        return true;
    };

    this.get_card = function(id) {
        return true;
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

    this.get_all_cards = function() {
        return this.state.get_all_cards();
    };

    this.get_card = function(id) {
        return this.state.get_card(id);
    };

    this.state = state;
    this.instantiate_state();
}

var data_loader = new DataLoader("localstorage");
console.log(data_loader.get_all_boards());