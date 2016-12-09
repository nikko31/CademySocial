var githubRep = 'raw.githubusercontent.com';
var visitedUrls = [];
$(document).ready(function () {
    $('.form-control').keypress(function (e) {
        if (e.which == 13) {
            var r = linkify.find($('.form-control').val());
            $.each(r, function (key, value) {
                $.each(value, function (key, value) {
                    if (key == 'href') {
                        if (value.contains('github.com')) {
                            value = value.replace('github.com', githubRep);
                            value = value.replace('/blob', '');
                            if ($.inArray(value, visitedUrls) < 0) {
                                visitedUrls.push(value);
                                $.ajax({
                                    type: 'GET',
                                    url: value,
                                    dataType: 'text',
                                    success: function (txt) {
                                        jQuery('<pre/>', {
                                            class: 'githubPre',
                                            id: 'visited' + $.inArray(value, visitedUrls)
                                        }).appendTo($('#post'));
                                        jQuery('<code/>', {
                                            class: 'githubText',
                                            title: 'github',
                                            rows: '8',
                                            cols: '30',
                                            style: '',
                                            text: txt
                                        }).appendTo($('#visited' + ($.inArray(value, visitedUrls))));
                                    }
                                });
                            }
                        }
                        if (value.contains('api.github.com/repos')) {
                            $.ajax({
                                type: 'GET',
                                url: value,
                                beforeSend: function (xhr) {
                                    if (xhr && xhr.overrideMimeType) {
                                        xhr.overrideMimeType('application/json;charset=utf-8');
                                    }
                                },
                                dataType: 'json',
                                success: function (data) {
                                    $.each(data, function (key, value) {
                                        if (key == 'download_url') {
                                            if ($.inArray(value, visitedUrls < 0)) {
                                                visitedUrls.push(value);
                                                $.ajax({
                                                    type: 'GET',
                                                    url: value,
                                                    beforeSend: function (xhr) {
                                                        if (xhr && xhr.overrideMimeType) {
                                                            xhr.overrideMimeType('application/json;charset=utf-8');
                                                        }
                                                    },
                                                    dataType: 'text',
                                                    success: function (txt) {
                                                        jQuery('<pre/>', {
                                                            class: 'githubPre',
                                                            id: 'visited' + $.inArray(value, visitedUrls)
                                                        }).appendTo($('#post'));
                                                        jQuery('<code/>', {
                                                            class: 'githubText',
                                                            title: 'github',
                                                            rows: '8',
                                                            cols: '30',
                                                            style: '',
                                                            text: txt
                                                        }).appendTo($('#visited' + ($.inArray(value, visitedUrls))));
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            })
                        }
                    }
                });
            })
        }
    });
    $('.btn-cancel-compose').click(function () {
        $('.githubPre').remove();
        visitedUrls = [];
    });
    $('.btn-compose').click(function () {
        $('.githubPre').remove();
        visitedUrls = [];
    });
});
