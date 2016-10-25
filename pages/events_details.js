var utils = require('../utils.js');
exports.createEventsDetailsPage = function (event_item, page_margin) {
    var MARGIN = 12;
    var pageTitle = event_item.title;
    var page = new tabris.Page({
        title: pageTitle,
    });
    var scanQRButton = tabris.create("Button", {
        id: 'scanQRButton',
        text: 'Scan QR',
        background: '#114A59',
        layoutData: {
            centerX: 0,
            centerY: 0,
            width: 100,
            height: 100
        },
        textColor: 'white'
    }).appendTo(page);
    scanQRButton.on('select', function () {

        var callback = function (err, contents) {
            if (err) {
                navigator.notification.alert(err._message);
            } else {
                var user = JSON.parse(localStorage.getItem('user'));
                clockIn(event_item.id, 1, user.token);
                
            }

        };

        QRScanner.scan(callback);
    });
    return page;
}
var clockIn = function (event_id, member_id, token) {
    utils.getJSON('event/clock_in?id=' + event_id + '&member_id=' + member_id + '&token=' + token).then(function (json) {
        console.log(JSON.stringify(json));
        navigator.notification.alert(
            json.data.message, // message
            function () {
                 QRScanner.destroy(function (status) {});
            }, // callback
            "QR", // title
            "Done" // buttonName
        );
    });
}