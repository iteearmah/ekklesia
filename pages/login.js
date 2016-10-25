var utils = require('../utils.js');
var eventsPage = require('./events.js');
exports.createLogin = function (page_margin) {
    var pageTitle = 'Login';
    var page = new tabris.Page({
        title: pageTitle,
        topLevel: true
    });
    var scrollView = new tabris.ScrollView({
        layoutData: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        direction: "vertical"
    }).appendTo(page);

    new tabris.TextView({
        id: 'emaiLabel',
        alignment: 'left',
        text: 'Email:'
    }).appendTo(scrollView);

    new tabris.TextInput({
        id: 'emailInput',
        text:'pastordaisey@gmail.com',
        message: 'Email'
    }).appendTo(scrollView);

    new tabris.TextView({
        id: 'passphraseLabel',
        text: 'Passphrase:'
    }).appendTo(scrollView);

    new tabris.TextInput({
        id: 'passphraseInput',
        text:'123456',
        type: 'password',
        message: 'Password'
    }).appendTo(scrollView);
    new tabris.Button({
        id: 'loginButton',
        text: 'Login',
        background: '#114A59',
        textColor: 'white'
    }).on('select', function () {
          var email = scrollView.children('#emailInput');
          var password = scrollView.children('#passphraseInput');
        doLogin(email.get('text'),password.get('text'),page_margin);
    }).appendTo(scrollView);

    scrollView.apply({
        '#emaiLabel': {
            layoutData: {
                left: 10,
                top: 18,
                width: 120
            }
        },
        '#emailInput': {
            layoutData: {
                left: '#emaiLabel 10',
                right: 10,
                baseline: '#emaiLabel'
            }
        },
        '#passphraseLabel': {
            layoutData: {
                left: 10,
                top: '#emaiLabel 18',
                width: 120
            }
        },
        '#passphraseInput': {
            layoutData: {
                left: '#passphraseLabel 10',
                right: 10,
                baseline: '#passphraseLabel'
            }
        },
        '#loginButton': {
            layoutData: {
                left: 10,
                right: 10,
                top: '#passphraseInput 40'
            }
        }
    });
    return page;
}
var doLogin = function (email, password,page_margin) {
    utils.getJSON('access/login?email='+email+'&password='+password).then(function (json) {
        if(json.status=='error')
        {
            window.plugins.toast.showShortCenter(json.message);
        }
        else
        {
             localStorage.setItem('user',JSON.stringify(json.data));
             console.log('About to go to events');
            var events_page= eventsPage.createEventsPage(page_margin);
            events_page.open();
            eventsPage.getEvents(events_page);
        }
    });
}
