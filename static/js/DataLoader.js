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
            card_ids = chosen_board.card_order.split(";");

            if (card_ids[0] == "") {
                return false
            }

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

    this.get_card = function(card_id) {
        if (localStorage.getItem("card" + card_id) === null) {
            return false;
        }
        return localStorage.getItem("card" + card_id);
    };

    this.create_card = function(board_id) {
        var new_card_id = Date.now();
        var new_card_position = this.get_last_position_in_new_cards(board_id);
        localStorage.setItem("card"+new_card_id, '{"id":'+new_card_id+', "title":"", "description":"", "status":"new", "order":'+ new_card_position +', "board_id":'+ board_id +'}');
        this.append_new_card_id_to_board(board_id, new_card_id);
    
        return new_card_id;

    };

    this.create_board = function() {
        var id = Date.now();
        localStorage.setItem("board"+id, '{"id":'+id+', "title":"new board", "card_order":""}');
        if (localStorage.getItem("boards") == null || localStorage.getItem("boards") == "") {
            localStorage.setItem("boards", id);
        } else {
            localStorage.setItem("boards", localStorage.getItem("boards") + ";" + id);
        }
        return id;
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
        return true;
    };

    this.remove_card = function(card_id) {
        card_object = JSON.parse(this.get_card(card_id));
        localStorage.removeItem("card" + card_id);
        this.remove_card_from_board(card_object.board_id, card_id);
        return true;
    }

    this.remove_board = function(board_id) {
        board_object = JSON.parse(this.get_board(board_id));
        tmp_card_list = board_object.card_order.split(";");

        // for (card_index in tmp_card_list) {
        //     this.remove_card(tmp_card_list[card_index]);
        // }

        this.remove_board_from_boards(board_id);
        localStorage.removeItem("board" + board_id);
        return true;
    };

    this.move_card = function(card_id, new_status, new_position) {
        card_object = JSON.parse(this.get_card(card_id));
        latest_status = card_object.status;
        this.reorder_board_cards_in_dragged_row(card_object.board_id, latest_status, card_object.id);

        card_object.status = new_status;
        card_object.order = new_position;
        this.reorder_board_cards_in_dropped_row(card_object.board_id, new_status, card_id, new_position);
        localStorage.setItem("card" + card_object.id, JSON.stringify(card_object));
        return true;

    }

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

    this.get_last_position_in_new_cards = function(board_id) {
        var all_cards = this.get_all_cards(board_id);
        
        if (all_cards != "") {
            all_cards = JSON.parse(all_cards);
        
            max_position_in_new = 0;
            for (card_index in all_cards) {
                if (all_cards[card_index].status == "new" && all_cards[card_index].order > max_position_in_new) {
                    max_position_in_new = all_cards[card_index].order;
                }
            }

            return ++max_position_in_new;
        } else {
            return 0;
        }
    };

    this.append_new_card_id_to_board = function(board_id, new_card_id) {
        var board_json = this.get_board(board_id);
        board_json = JSON.parse(board_json);

        if (board_json.card_order == "") {
            board_json.card_order += new_card_id;
        } else {
            board_json.card_order += ";"+new_card_id;
        }
        
        
        localStorage.setItem("board"+board_id, JSON.stringify(board_json));
        return true;
    };

    this.remove_card_from_board = function(board_id, card_id) {
        board_object = JSON.parse(this.get_board(board_id));
        tmp_card_list = board_object.card_order.split(";");

        new_unformatted_card_list = "";
        for (card_index in tmp_card_list) {
            if (tmp_card_list[card_index] != card_id) {
                new_unformatted_card_list += tmp_card_list[card_index] + ";";
            }
        }
        new_unformatted_card_list = new_unformatted_card_list.slice(0, -1);
        board_object.card_order = new_unformatted_card_list;

        localStorage.setItem("board" + board_id, JSON.stringify(board_object));
        return true;
    };

    this.remove_board_from_boards = function(board_id) {
        boards_list = localStorage.getItem("boards").split(";");

        new_boards_list = "";
        for (board_index in boards_list) {
            if (board_id != boards_list[board_index]) {
                new_boards_list += boards_list[board_index] + ";";
            }
        }
        new_boards_list = new_boards_list.slice(0, -1);
        localStorage.setItem("boards", new_boards_list);
        return true;
    };

    this.reorder_board_cards_in_dragged_row = function(board_id, status, without_this_card_id) {
        all_cards_in_list = JSON.parse(this.get_board(board_id)).card_order.split(";");

        new_current_order = 0;
        for (card_index in all_cards_in_list) {
            current_card_object = JSON.parse(this.get_card(all_cards_in_list[card_index]));

            if (current_card_object.status == status && current_card_object.id != without_this_card_id) {
                current_card_object.order = new_current_order;
                localStorage.setItem("card" + current_card_object.id, JSON.stringify(current_card_object));
                new_current_order++;
            }
        }
        
        return true;
    };

    this.reorder_board_cards_in_dropped_row = function(board_id, status, new_card_id, new_position) {
        var all_cards_in_list = JSON.parse(this.get_board(board_id)).card_order.split(";");


        var ordered_card_objects = {};
        for (card_index in all_cards_in_list) {
            current_card_object = JSON.parse(this.get_card(all_cards_in_list[card_index]));

            if (current_card_object.status == status) {
                ordered_card_objects[current_card_object.order] = current_card_object;
            }
        }

        new_current_order = 0;
        for (card_index in ordered_card_objects) {

            if (new_current_order == new_position) {
                new_current_order++;

            }

            ordered_card_objects[card_index].order = new_current_order;
            localStorage.setItem("card" + ordered_card_objects[card_index].id, JSON.stringify(ordered_card_objects[card_index]));
            new_current_order++;

        }

        return true;
    };


    this.set_active_board = function(board_id) {
        localStorage.setItem("active_board", board_id);
        return true;
    };

    this.get_active_board = function() {
        return localStorage.getItem("active_board");
    };

}

function PsqlState() {

    this.get_all_boards = function() {
        var board_list = "";
        $.ajax({
            url: "/boards",
            type: "GET",
            async: false,
            success: 
                function (data) {
                    alert("all boards: "+data);
                    board_list = data;
                },
            error: 
                function () {
                    alert('Not OK')
                }
        });
        if (board_list.length != 0) { 
            return board_list;
        } else {
            return false;
        }
    };


    this.get_board = function(id) {
        var board = "";

        $.ajax({
            url: "/boards/"+board_id, //restapi-s
            type: "POST",
            data: {board_id: id},
            async: false,
            success:
                function (response_data) {
                    alert("board: "+response_data);
                    board = response_data;
            },
            error:
                function () {
                    return false;
            }
        });

        return board;

    };

    this.get_all_cards = function(board_id) {
        var cards = "";
        $.ajax({
            url: "/get-cards/" + board_id,
            type: "GET",
            async: false,
            data: {board_id: board_id},
            success: function (response_data) {
                alert("cards: " + response_data);
                cards = response_data;
            },
            error: function () {
                alert("Not OK")
            }
        });

        return cards;
    };

    this.get_card = function(id) {
        var card = "";
        $.ajax({
             url: "/card/"+id,
             type: "GET",
             async: true,
             data: {id:id},
             success: function(response_data){
                 alert("card: "+response_data);
                 card = response_data;
             },
             error: function(){
                 alert("Not OK")
             }
         });
        return card;
    };

    this.create_card = function(board_id) {
        var new_card = "";
        $.ajax({
            url: "/card",
            type: "POST",
            async: false,
            data: {board_id: board_id},
            success: 
                function (response_data) {
                    alert("card created: " + response_data);
                    new_card = response_data;
                },
            error: 
                function () {
                    alert('Not OK')
                }
        });
        return new_card;
    };

    this.create_board = function() {
        var new_board = "";
        $.ajax({
            url: "/board",
            type: "GET",
            async: false,
            data: {},
            success: 
                function (response_data) {
                    alert("board created: " + response_data);
                    new_board = response_data;
                },
            error: 
                function () {
                    alert('Not OK')
                }
        });
        return new_board;
        
    };

    this.modify_card = function(card_id, title, description) {

        var modified_card = "";
        $.ajax({
            url: "/card/"+card_id,
            type: "POST",
            async: false,
            data: {card_id:card_id,title:title,description:description,action:"modify"},
            success:
                function (response_data) {
                    alert("card modified: " + response_data);
                    modified_card = response_data;
                },
            error:
                function () {
                    alert('Not OK')
                }
        });
        return modified_card;
    };

    this.modify_board = function(board_id, title) {

        var modified_board = "";
        $.ajax({
            url: "/card/" + board_id,
            type: "POST",
            async: false,
            data: {board_id:board_id,title:title,command:"modify"},
            success:
                function (response_data) {
                    alert("board modified: " + response_data);
                    modified_board = response_data;
                },
            error:
                function () {
                    alert('Not OK')
                }
        });
        return modified_board;
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

    this.remove_card = function(card_id) {
        return this.state.remove_card(card_id);
    };

    this.remove_board = function(board_id) {
        return this.state.remove_board(board_id);
    };

    this.move_card = function(card_id, new_status, new_position) {
        return this.state.move_card(card_id, new_status, new_position);
    };

    this.set_active_board = function(board_id) {
        return this.state.set_active_board(board_id);

    };

    this.get_active_board = function() {
        return this.state.get_active_board();
    };

    this.state = state;
    this.instantiate_state();
}

var data_loader = new DataLoader("psql");