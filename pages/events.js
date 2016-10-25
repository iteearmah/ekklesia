var utils = require('../utils.js');
exports.createEventsPage = function (page_margin) {
    var MARGIN = 12;
    var pageTitle = 'Events';
    var page = new tabris.Page({
        title: pageTitle,
        topLevel: true
    });


    // getEvents(collectionView_Events,page);


    return page;
}

exports.getEvents = function (page) {
    var user = JSON.parse(localStorage.getItem('user'));
    var collectionView_Events = tabris.create("CollectionView", {
        layoutData: {
            left: 0,
            right: 0,
            top: [page, 2]
        },
        refreshEnabled: false,
        itemHeight: 50,
        initializeCell: function (cell) {
            var eventName = tabris.create("TextView", {
                layoutData: {
                    top: 0,
                    left: 12,
                    right: 5,
                    top: 5
                },
                markupEnabled: true,
                font: "15px Arial, sans-serif",
                textColor: "#000",
            }).appendTo(cell);
            cell.on("change:item", function (widget, Items) {
                eventName.set("text", '<b>' + Items.title + '</b>');
            });
        }
    });
    collectionView_Events.on("select", function(target, value) {
       console.log(value.id + ' Selected');
       eventsDetails = require('../pages/events_details.js');
       eventsDetails.createEventsDetailsPage(value).open();
    });
    collectionView_Events.appendTo(page);


    utils.getJSON('event/recent?token=' + user.token).then(function (json) {
        //var eventItems = json.data;
        collectionView_Events.insert(json.data);
        // view.set({
        //     items: eventItems,
        //     refreshIndicator: true,
        //     refreshMessage: ""
        // });
    });

}