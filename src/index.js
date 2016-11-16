/**
 * Created by chiji on 2016/11/15.
 */

require('./modules/style/common.scss');
require('./modules/style/index.css');
var content = require('./modules/content.js');

$('#app').text("hello "+content);

console.log("success");
