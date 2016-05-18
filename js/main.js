$(function () {
    $.get(
            'https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc',
            function (response) {
                var $data = $('#data');
                var hits = response.hits;
                for (var i = 0; i < hits.length; i++) {
                    var $tr = $('<tr>');
                    $('<td>').text(hits[i].id).appendTo($tr);
                    $('<td>').text(hits[i].mutation).appendTo($tr);
                    $('<td>').text(hits[i].type).appendTo($tr);
                    $('<td>').text(hits[i].chromosome).appendTo($tr);
                    $('<td>').text(hits[i].start).appendTo($tr);
                    $('<td>').text(hits[i].end).appendTo($tr);
                    $tr.appendTo($data)
                       .addClass('chromosome_'+hits[i].chromosome)
                       .addClass('type_'+hits[i].type.replace(/</g, 'lt').replace(/>/g, 'gt').replace(/\W+/g, '-'));
                       // TODO: This could result in collisions for some values, but good enough for this data.
                }
            }
    );
});
