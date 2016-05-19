$(function () {
    $.get(
            'https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc',
            function (response) {
                $('#table').append(DEMO.table_html(response.hits));
                $('#controls').append(DEMO.controls_html(
                        'type', Object.keys(DEMO.type_set),
                        'chromosome', Object.keys(DEMO.chromosome_set)));
          //      $('#controls td').not('.head')
          //              .html('<svg viewBox="-1 -1 2 2" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="1"></circle></svg>');
            }
    );
    $('#controls').on('click','.head',function(e){
        var $this = $(this);
        $this.toggleClass('on');
        DEMO.reset();
    });
    $('#controls').on('click','td:not(.head):not(#all)',function(e){
        $('#controls .head').removeClass('on');
        var classes = $(this).attr('class').split(' ');
        for (var i = 0; i < classes.length; i++) {
            $('#controls .head[data-target='+classes[i]+']').addClass('on');
        }
        DEMO.reset();
    });
    $('#controls').on('click','#all',function(e){
        $('#controls .head').addClass('on');
        DEMO.reset();
    });
});
