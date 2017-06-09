/*!
 * bootstrap-tokenfield 0.12.1
 * https://github.com/sliptree/bootstrap-tokenfield
 * Copyright 2013-2014 Sliptree and other contributors; Licensed MIT
 */

$(document).ready(function (a) {
    var b = new Bloodhound({
        local: [{value: 'Moscow'}, {value: 'Yaroslavl'}, {value: 'Amsterdam'} , {value: 'Rotterdam'}, {value: 'Berlin'}, {value: 'London'}, {value: 'Hamburg'}, {value: 'Bremen'}, {value: 'Munich'}],
        datumTokenizer: function (a) {
            return Bloodhound.tokenizers.whitespace(a.value)
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });
    b.initialize(), a("#tokenfield-typeahead").tokenfield({typeahead: [null, {source: b.ttAdapter()}]}), a("#tokenfield-2").on("tokenfield:createtoken", function (a) {
        var b = a.attrs.value.split("|");
        a.attrs.value = b[1] || b[0], a.attrs.label = b[1] ? b[0] + " (" + b[1] + ")" : b[0]
    }).on("tokenfield:createdtoken", function (b) {
        var c = /\S+@\S+\.\S+/, d = c.test(b.attrs.value);
        d || a(b.relatedTarget).addClass("invalid")
    }).on("tokenfield:edittoken", function (a) {
        if (a.attrs.label !== a.attrs.value) {
            var b = a.attrs.label.split(" (");
            a.attrs.value = b[0] + "|" + a.attrs.value
        }
    }).on("tokenfield:removedtoken", function (b) {
        if (b.attrs.length > 1) {
            var c = a.map(b.attrs, function (a) {
                return a.value
            });
            alert(b.attrs.length + " tokens removed! Token values were: " + c.join(", "))
        } else alert("Token removed! Token value was: " + b.attrs.value)
    }).tokenfield()


    var $resultsNegative = $('#negative-results'),
        $resultsPositive = $('#positive-results'),
        $buttonPositive = $('#to-calc-positive'),
        $buttonNegative = $('#to-calc-negative');

    $buttonPositive.click(function (e) {
        e.preventDefault();
        $resultsNegative.addClass('hidden');
        $resultsPositive.removeClass('hidden');
    })

    $buttonNegative.click(function (e) {
        e.preventDefault();
        $resultsNegative.removeClass('hidden');
        $resultsPositive.addClass('hidden');
    })
});