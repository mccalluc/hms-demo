var DEMO = {
    type_set: {},
    chromosome_set: {},
    type_chromosome_matrix: {},
    count: function (class_name) {
        return $('#table .'+class_name+':visible').length;
    },
    
    // Or we could base it on the numbers in #control, though that gets more complicated:
    //    add: function (a, b) {
    //        return a + b;
    //    },
    //    sum: function (array) {
    //        return array.reduce(DEMO.add, 0);
    //    },
    //    count: function (class_name) {
    //        return DEMO.sum($('#controls td.on.' + class_name)
    //                .map(function (i, el) {
    //                    return parseInt(el.innerHTML) || 0;
    //                }).get());
    //    },
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
        var $header = $('<tr>').append('<td id="all">');
        for (var i = 0; i < x_values.length; i++) {
            var value = x_values[i];
            $('<td>').text(value)
                    .addClass('head')
                    .addClass('on')
                    .attr('data-target', DEMO.class_name(x_prefix, value)) // .data is not selectable
                    .appendTo($header);
        }
        $header.appendTo($table);
        for (var i = 0; i < y_values.length; i++) {
            var y_value = y_values[i];
            var $tr = $('<tr>');
            $('<td>').text(y_value)
                    .addClass('head')
                    .addClass('on')
                    .attr('data-target', DEMO.class_name(y_prefix, y_value)) // .data is not selectable
                    .appendTo($tr);
            for (var j = 0; j < x_values.length; j++) {
                var x_value = x_values[j];
                $('<td>').addClass(DEMO.class_name(x_prefix, x_value))
                        .addClass(DEMO.class_name(y_prefix, y_value))
                        .addClass('on')
                        .text(DEMO.type_chromosome_matrix[x_value][y_value])
                        .appendTo($tr);
            }
            $tr.appendTo($table);
        }
        return $table;
    },
    reset: function () {
        // Update UI to reflect current selections.
        $('#table tr').show();
        $('#controls td:not(.head)').addClass('on');

        $('#controls .head').not('.on').each(function (i, el) {
            $('#table tr.' + $(el).data('target')).hide();
            $('#controls td:not(.head).' + $(el).data('target')).removeClass('on');
        });
        
        $('#controls .head').each(function(i,el){
            var $el = $(el);
            var target = $el.data('target');
            var axis = target.split('_')[0];
            var width = 100 * DEMO.count(target) / DEMO.max_count[axis] + '%';
            $el.find('.bar').width(width);
        });
    }
};
