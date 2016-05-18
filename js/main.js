$(function () {
    $.get(
            'https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc',
            function (response) {
                mutations = new Mutations(response.hits);
                console.log(mutations.type_counts);
                console.log(mutations.chromo_counts);
            }
    );
});
