var DEMO = {
    class_name: function (prefix, messy) {
        // Name collisions are still a posibility, but good enough for this data set.
        return prefix + '_' + messy.replace(/</g, 'lt').replace(/>/g, 'gt').replace(/\W+/g, '-');
    },
    row_html: function (mutation) {
        // Might be better to template the HTML, rather than building it like this.
        var $tr = $('<tr>');
        $('<td>').text(mutation.id).appendTo($tr);
        $('<td>').text(mutation.mutation).appendTo($tr);
        $('<td>').text(mutation.type).appendTo($tr);
        $('<td>').text(mutation.chromosome).appendTo($tr);
        $('<td>').text(mutation.start).appendTo($tr);
        $('<td>').text(mutation.end).appendTo($tr);
        $tr.addClass(DEMO.class_name('chromosome', mutation.chromosome))
                .addClass(DEMO.class_name('type', mutation.type));
        return $tr;
    },
    table_html: function (mutations) {
        var $table = $('<table>');
        for (var i = 0; i < mutations.length; i++) {
            DEMO.row_html(mutations[i]).appendTo($table);
        }
        return $table;
    }
};
