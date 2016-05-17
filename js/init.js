$(function () {
    var vis = {}; // namespace
    $.get(
            'https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc',
            function (response) {
                vis.mutations = response.hits;
                console.log(vis.mutations);
            }
    );
});