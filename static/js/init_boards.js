$(document).ready(function() {
    var boards = JSON.parse(data_loader.get_all_boards());
    for (board in boards) {
        $('<a href="javascript:void(0)" class="menu-link" id="'+boards[board].id+'">' + boards[board].title + '</a>').insertBefore('#add-board');
    }
});
