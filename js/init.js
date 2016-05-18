var DEMO = {
    class_name: function (prefix, messy) {
        // Name collisions are still a posibility, but good enough for this data set.
        return prefix + '_' + messy.replace(/</g, 'lt').replace(/>/g, 'gt').replace(/\W+/g, '-');
    },
    type_set: {},
    chromosome_set: {},
    row_html: function (mutation) {
        // Might be better to template the HTML, rather than building it like this?
        DEMO.type_set[mutation.type] = true;
        DEMO.chromosome_set[mutation.chromosome] = true;
        var $tr = $('<tr>')
                .addClass(DEMO.class_name('chromosome', mutation.chromosome))
                .addClass(DEMO.class_name('type', mutation.type));
        $('<td>').text(mutation.id).appendTo($tr);
        $('<td>').text(mutation.mutation).appendTo($tr);
        $('<td>').text(mutation.type).appendTo($tr);
        $('<td>').text(mutation.chromosome).appendTo($tr);
        $('<td>').text(mutation.start).appendTo($tr);
        $('<td>').text(mutation.end).appendTo($tr);
        return $tr;
    },
    table_html: function (mutations) {
        var $table = $('<table>');
        for (var i = 0; i < mutations.length; i++) {
            DEMO.row_html(mutations[i]).appendTo($table);
        }
        return $table;
    },
    controls_html: function (x_prefix, x_values, y_prefix, y_values) {
        var $table = $('<table>');
        var $header = $('<tr>').append('<td>');
        for (var i = 0; i < x_values.length; i++) {
            var value = x_values[i];
            $('<td>').text(value)
                    .addClass(DEMO.class_name(x_prefix,value))
                    .appendTo($header);
        }
        $header.appendTo($table);
        for (var i = 0; i < y_values.length; i++) {
            var y_value = y_values[i];
            var $tr = $('<tr>');
            $('<td>').text(y_value)
                    .addClass(DEMO.class_name(y_prefix,y_value))
                    .appendTo($tr);
            for (var j = 0; j < x_values.length; j++) {
                var x_value = x_values[j];
                $('<td>').addClass(DEMO.class_name(x_prefix,x_value))
                        .addClass(DEMO.class_name(y_prefix,y_value))
                        .appendTo($tr);
            }
            $tr.appendTo($table);
        }
        return $table;
    }
};
