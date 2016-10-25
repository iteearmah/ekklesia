var loginPage = require('./pages/login.js');
var utils = require('./utils.js');
var PAGE_MARGIN = 16;
tabris.ui.set("background", "#E09A3C");
/*var page = new tabris.Page({
  title: 'Ekklesia',
  topLevel: true
});*/
var login_page = loginPage.createLogin(PAGE_MARGIN);
login_page.open();

