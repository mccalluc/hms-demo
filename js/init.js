var DEMO = {
    type_set: {},
    chromosome_set: {},
    type_chromosome_matrix: {},
    
    class_name: function (prefix, messy) {
        // Name collisions are still a posibility, but good enough for this data set.
        return prefix + '_' + messy.replace(/</g, 'lt').replace(/>/g, 'gt').replace(/\W+/g, '-');
    },
    row_html: function (mutation) {
        DEMO.type_set[mutation.type] = true;
        DEMO.chromosome_set[mutation.chromosome] = true;
        if (!DEMO.type_chromosome_matrix[mutation.type]) {
            DEMO.type_chromosome_matrix[mutation.type] = {};
        }
        if (!DEMO.type_chromosome_matrix[mutation.type][mutation.chromosome]) {
            DEMO.type_chromosome_matrix[mutation.type][mutation.chromosome] = 0;
        }
        DEMO.type_chromosome_matrix[mutation.type][mutation.chromosome]++;
        
        // Might be better to template the HTML, rather than building it like this?
        var $tr = $('<tr>')
                .addClass(DEMO.class_name('chromosome', mutation.chromosome))
                .addClass(DEMO.class_name('type', mutation.type));
        // TODO: loop over list
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
        var $header = $('<tr>');
        // TODO: loop over list
        $('<td>').text('id').appendTo($header).addClass('head');
        $('<td>').text('mutation').appendTo($header).addClass('head');
        $('<td>').text('type').appendTo($header).addClass('head');
        $('<td>').text('chromosome').appendTo($header).addClass('head');
        $('<td>').text('start').appendTo($header).addClass('head');
        $('<td>').text('end').appendTo($header).addClass('head');
        $header.appendTo($table);
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
                    .addClass('head')
                    .addClass('on')
                    .data('target','.'+DEMO.class_name(x_prefix,value))
                    .appendTo($header);
        }
        $header.appendTo($table);
        for (var i = 0; i < y_values.length; i++) {
            var y_value = y_values[i];
            var $tr = $('<tr>');
            $('<td>').text(y_value)
                    .addClass('head')
                    .addClass('on')
                    .data('target','.'+DEMO.class_name(y_prefix,y_value))
                    .appendTo($tr);
            for (var j = 0; j < x_values.length; j++) {
                var x_value = x_values[j];
                $('<td>').addClass(DEMO.class_name(x_prefix,x_value))
                        .addClass(DEMO.class_name(y_prefix,y_value))
                        .addClass('on')
                        .text(DEMO.type_chromosome_matrix[x_value][y_value])
                        .appendTo($tr);
            }
            $tr.appendTo($table);
        }
        return $table;
    },
    reset: function() {
        $('#table tr').show();
        $('#controls .head').not('.on').each(function(i,el) {
            $('#table tr'+$(el).data('target')).hide();
        });
    }
};
