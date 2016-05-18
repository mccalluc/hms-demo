QUnit.test('class_name', function (assert) {
    assert.equal(DEMO.class_name('prefix', '1<2>=0 cat dog!'), 'prefix_1lt2gt-0-cat-dog-');
});

QUnit.test('row_html', function (assert) {
    assert.equal(DEMO.row_html({
        "id": "MU589117",
        "type": "single base substitution",
        "chromosome": "10",
        "start": 38654432,
        "end": 38654432,
        "mutation": "A>G"
    })[0].outerHTML,
            '<tr class=\"chromosome_10 type_single-base-substitution\">'
            + '<td>MU589117</td><td>A&gt;G</td><td>single base substitution</td>'
            + '<td>10</td><td>38654432</td><td>38654432</td></tr>');
});

QUnit.test('table_html', function (assert) {
    assert.equal(DEMO.table_html([{
        "id": "MU589117",
        "type": "single base substitution",
        "chromosome": "10",
        "start": 38654432,
        "end": 38654432,
        "mutation": "A>G"
    }])[0].outerHTML,
            '<table><tbody>'
            + '<tr class=\"chromosome_10 type_single-base-substitution\">'
            + '<td>MU589117</td><td>A&gt;G</td><td>single base substitution</td>'
            + '<td>10</td><td>38654432</td><td>38654432</td></tr>'
            + '</tbody></table>');
});
