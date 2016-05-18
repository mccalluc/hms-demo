$(function () {
    $.get(
            'https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc',
            function (response) {
                $('#table').append(DEMO.table_html(response.hits));
                $('#controls').append(DEMO.controls_html(
                        'type', Object.keys(DEMO.type_set),
                        'chromosome', Object.keys(DEMO.chromosome_set)));
            }
    );
    $('#controls').on('click','.head',function(e){
        $(this).toggleClass('on');
    });
});
