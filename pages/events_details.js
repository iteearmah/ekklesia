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
        layout:{ top: ['50%',0],left:['50%',10]},
        textColor: 'white'
    }).appendTo(page);

    return page;
}