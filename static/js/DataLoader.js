function LocalStorageState() {

    this.get_all_boards = function() {
        return "[{id:1, title:'board1', card_order:'1;2;3'}, {id:2, title:'board2', card_order:'4;5;6'}]";
    };

    this.get_board = function(id) {
        return "{id:1, title:'board1', card_order:'1;2;3'}";
    };

    this.get_all_cards = function(table_id) {
        return "[{id:1, title:'task', description:'this is a good task men', status:'new', order:0}, {id:2, title:'task', description:'this is a good task men', status:'new', order:1}, {id:3, title:'task', description:'this is a good task men', status:'new', order:2}]";
    };

    this.get_card = function(id) {
        return "{id:1, title:'task', description:'this is a good task men', status:'new', order:0}";
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

    this.get_all_cards = function(table_id) {
        return this.state.get_all_cards(table_id);
    };

    this.get_card = function(id) {
        return this.state.get_card(id);
    };

    this.state = state;
    this.instantiate_state();
}

var data_loader = new DataLoader("localstorage");
// console.log(data_loader.get_all_boards());