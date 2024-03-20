!function(){var e=void 0;!function t(n,r,i){function o(s,u){if(!r[s]){if(!n[s]){var c="function"==typeof e&&e;if(!u&&c)return c(s,!0);if(a)return a(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var d=r[s]={exports:{}};n[s][0].call(d.exports,function(e){var t=n[s][1][e];return o(t?t:e)},d,d.exports,t,n,r,i)}return r[s].exports}for(var a="function"==typeof e&&e,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(e,t,n){"use strict";function r(){var e=s(),t=u(),n=a(e+t.toString()),r=n.substr(0,4),o=n.substr(4);e=e.substr(0,19)+r+"-"+o;var c=i(),l=a(t.origin),d=[h.USERREPORT,c,l].join("."),g=a(e+d+p);return[f,g,e,d].join(".")}function i(){var e=(new Date).getTime()-new Date(2019,0,1).getTime(),t=Math.floor(e/864e5);return t}function o(){return Math.round((new Date).getTime()/1e3)}var a=e("./hash"),s=e("./uuid"),u=e("./location"),c="apr_dsu",l=c+"_ttl",d=31536e3,f="1",p="YicAu6ZpNG",h={USERREPORT:"1"};t.exports={generateDsu:r,getDsuNow:i,getDsuAge:function(){try{var e=window.localStorage.getItem(c),t=e.split("."),n=t[t.length-2];return+n}catch(e){return i()}},readOrCreateDsu:function(e){var t,n;try{t=window.localStorage.getItem(c),n=window.localStorage.getItem(l)}catch(e){return null}(!t||e&&n&&n<o())&&(t=r());try{window.localStorage.setItem(c,t),e&&window.localStorage.setItem(l,o()+d),t=window.localStorage.getItem(c)}catch(e){return null}return t}}},{"./hash":2,"./location":3,"./uuid":4}],2:[function(e,t,n){"use strict";var r=e("siphash"),i=[2251905623,1801168887,1769155591,711914637];t.exports=r.hash_hex.bind(null,i)},{siphash:7}],3:[function(e,t,n){"use strict";function r(e){var t=0!==e.indexOf("/")&&e.indexOf("/")!==-1&&(e.indexOf(":")===-1||e.indexOf(":")>e.indexOf("/")),n=o.exec(t?"noscheme://"+e:e),r={scheme:t?"":n[2]||"",host:n[4]||"",hostname:n[4]?n[4].split(":")[0]:"",pathname:n[5]||"",search:n[7]||"",hash:n[9]||"",toString:function(){return e}};return r.origin=r.scheme+"://"+r.host,r}function i(){var e=a||window.location.toString();if(e=e.replace(/\.demo\.audienceproject\.com\//,"/"),s.url===e)return s.parsed;var t=r(e);return s.url=e,s.parsed=t,t}var o=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"),a=null,s={};t.exports=i,t.exports.onLocationChange=function(e){var t=i().pathname,n=setInterval(function(){var n=i().pathname;n!==t&&(t=n,e(n))},100);return function(){clearInterval(n)}},t.exports.updateLocation=function(e){r(e),a=e},t.exports.parse=r},{}],4:[function(e,t,n){"use strict";function r(){var e=new Uint32Array(4);crypto.getRandomValues(e);var t=-1;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){t++;var r=e[t>>3]>>t%8*4&15,i="x"===n?r:3&r|8;return i.toString(16)})}function i(){var e=(new Date).getTime();return"undefined"!=typeof performance&&"function"==typeof performance.now&&(e+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)})}var o="function"==typeof Uint32Array&&"undefined"!=typeof crypto&&"undefined"!=typeof crypto.getRandomValues,a=o?r:i;t.exports=a},{}],5:[function(e,t,n){"use strict";var r=e("promise-polyfill");r.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},t.exports=r},{"promise-polyfill":6}],6:[function(e,t,n){!function(e){function n(){}function r(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function o(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void f(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?a:s)(t.promise,e._value);var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}a(t.promise,r)}))}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof i)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void l(r(n,t),e)}e._state=1,e._value=t,u(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&f(function(){e._handled||p(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}var d=setTimeout,f="function"==typeof setImmediate&&setImmediate||function(e){d(e,0)},p=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new c(e,t,r)),r},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,n){function r(o,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){r(o,e)},n)}t[o]=a,0===--i&&e(t)}catch(e){n(e)}}if(0===t.length)return e([]);for(var i=t.length,o=0;o<t.length;o++)r(o,t[o])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,i=e.length;r<i;r++)e[r].then(t,n)})},i._setImmediateFn=function(e){f=e},i._setUnhandledRejectionFn=function(e){p=e},"undefined"!=typeof t&&t.exports?t.exports=i:e.Promise||(e.Promise=i)}(this)},{}],7:[function(e,t,n){n=t.exports=e("./lib/siphash")},{"./lib/siphash":8}],8:[function(e,t,n){var r=function(){"use strict";function e(e,t){var n=e.l+t.l,r={h:e.h+t.h+(n/2>>>31)>>>0,l:n>>>0};e.h=r.h,e.l=r.l}function t(e,t){e.h^=t.h,e.h>>>=0,e.l^=t.l,e.l>>>=0}function n(e,t){var n={h:e.h<<t|e.l>>>32-t,l:e.l<<t|e.h>>>32-t};e.h=n.h,e.l=n.l}function r(e){var t=e.l;e.l=e.h,e.h=t}function i(i,o,a,s){e(i,o),e(a,s),n(o,13),n(s,16),t(o,i),t(s,a),r(i),e(a,o),e(i,s),n(o,17),n(s,21),t(o,a),t(s,i),r(a)}function o(e,t){return e.charCodeAt(t+3)<<24|e.charCodeAt(t+2)<<16|e.charCodeAt(t+1)<<8|e.charCodeAt(t)}function a(e,n){var r,a={h:e[1]>>>0,l:e[0]>>>0},s={h:e[3]>>>0,l:e[2]>>>0},u={h:a.h,l:a.l},c=a,l={h:s.h,l:s.l},d=s,f=0,p=n.length,h=p-7,g=new Uint8Array(new ArrayBuffer(8));for(t(u,{h:1936682341,l:1886610805}),t(l,{h:1685025377,l:1852075885}),t(c,{h:1819895653,l:1852142177}),t(d,{h:1952801890,l:2037671283});f<h;)r={h:o(n,f+4),l:o(n,f)},t(d,r),i(u,l,c,d),i(u,l,c,d),t(u,r),f+=8;g[7]=p;for(var m=0;f<p;)g[m++]=n.charCodeAt(f++);for(;m<7;)g[m++]=0;r={h:g[7]<<24|g[6]<<16|g[5]<<8|g[4],l:g[3]<<24|g[2]<<16|g[1]<<8|g[0]},t(d,r),i(u,l,c,d),i(u,l,c,d),t(u,r),t(c,{h:0,l:255}),i(u,l,c,d),i(u,l,c,d),i(u,l,c,d),i(u,l,c,d);var v=u;return t(v,l),t(v,c),t(v,d),v}function s(e){return[o(e,0),o(e,4),o(e,8),o(e,12)]}function u(e,t){var n=a(e,t);return("0000000"+n.h.toString(16)).substr(-8)+("0000000"+n.l.toString(16)).substr(-8)}function c(e,t){var n=a(e,t);return 4294967296*(2097151&n.h)+n.l}return{string16_to_key:s,hash:a,hash_hex:u,hash_uint:c}}(),t=t||{};t.exports=r},{}],9:[function(e,t,n){"use strict;";t.exports=Object.assign||function(){for(var e,t,n=Object.prototype.hasOwnProperty,r={},i=0,o=arguments.length;i<o;++i){t=arguments[i];for(e in t)n.call(t,e)&&(r[e]=t[e])}return r}},{}],10:[function(e,t,n){"use strict";t.exports={}},{}],11:[function(e,t,n){"use strict";var r=e("util-merge"),i=e("./lib/rnd"),o=e("./api"),a=JSON.parse('{"userreport-ak":{"trackingConfig":[{"trackingCode":"USRm-B-IeSeD4rkeHc5dpEF8LZQ","sectionId":null,"type":"Media","mediaId":"491ee207-f8e0-47ae-8773-9769105f0b65"}]},"userreport-core":{"networkLayout":[{"rules":[{"pattern":"*.imageresizer.com","operation":"DomainEquals"}],"id":"491ee207-f8e0-47ae-8773-9769105f0b65","color":"#6e98f4","sections":[]}],"companyId":"bf010c02-3a93-4a11-b73b-714adc5bf0fd"}}'),s=JSON.parse('["userreport-ak","userreport-core"]'),u=!!parseInt("0")||window.location.href.indexOf("__sak=debug")!==-1||"undefined"!=typeof window&&"true"===window.localStorage.getItem("__sak_debug"),c=window.location.href.indexOf("__sak=disable")!==-1||window.location.href.indexOf("__sak=disable")!==-1,l={customerId:"sider",customerConfig:a,debug:u,dnt:!1,consents:{tcStringV2:"",tcStringV1:"",storage:!0},disabled:c,plugins:s,revision:"37f0126",publishDate:"2022-07-20T15:08:50.144Z",sessionId:i()};o.setAnonymousTracking=function(e){l.dnt=e},o.setConsents=function(e){l.consents=r(l.consents,e)},t.exports=l},{"./api":10,"./lib/rnd":25,"util-merge":9}],12:[function(e,t,n){"use strict";function r(e){var t=e[0];return!("function"!=typeof l[t]||!(l[t].executeBeforePlugins||f.indexOf(t)>-1))}function i(e){if("object"==typeof e)for(var t=0,n=e.length;t<n;t++)window.audienceProjectLayer.push(e[t])}function o(){for(var e=window.location.href.split(/[?&]/),t="__audienceProjectLayer=",n=0,r=e.length;n<r;n++)if(0===e[n].indexOf(t)){var o=e[n].slice(t.length);try{o=JSON.parse(decodeURIComponent(o))}catch(e){return void c.warn("Unable to parse audienceProjectLayer queue from location")}i(o)}}function a(){window.audienceProjectLayer.filter(r).forEach(h),window._urq.filter(r).forEach(h)}function s(){if(window.audienceProjectLayer.push===Array.prototype.push){var e=window.audienceProjectLayer.push;window.audienceProjectLayer.push=function(t){e.apply(window.audienceProjectLayer,arguments),h(t)},window.audienceProjectLayer.filter(function(e){return!r(e)}).forEach(h);var t=window._urq.push;window._urq.push=function(e){t.apply(window._urq,arguments),h(e)},window._urq.filter(function(e){return!r(e)}).forEach(h)}}var u=e("@apr/promise-polyfill"),c=e("./lib/log"),l=e("./api"),d=e("./config");window.audienceProjectLayer=window.audienceProjectLayer||[],window._urq=window._urq||[];var f=["setAnonymousTracking","setConsents"],p=["tryToInvite","inhibitInvitation","initSite","integrateWithGTM","suppressCookieSync","setPrivacyPolicyChecked","setCustomTranslation","setGDPR","setGDPRConsent","forwardAnonymousTracking","forwardConsents"],h=function(e){var t=e[0],n=Array.prototype.slice.call(e,1);"function"==typeof t?t.apply(null,n):"function"==typeof l[t]?l[t].apply(null,n):p.indexOf(t)!==-1||c.error("Unable to find command %s",t)};window.addEventListener("message",function(e){if(e.data&&e.data.indexOf&&0===e.data.indexOf("audienceProjectLayer$$$")){var t=e.data.split("$$$",3),n=t[1],r=t[2];r&&(r=JSON.parse(r)),window.audienceProjectLayer.push([n,r])}},!1),t.exports=function(e,t,n,r){c.info("Customer config:",t),c.info("SAK config:",n),t.iabcmp&&t.iabcmp.tcStringV2?d.consents.tcStringV2=t.iabcmp.tcStringV2:t.iabcmp&&t.iabcmp.tcStringV1&&(d.consents.tcStringV1=t.iabcmp.tcStringV1);var i={config:t,sakConfig:n,isSpider:r};n.sakObject.starting.fire(i),r&&(e=e.filter(function(e){return e.executeForSpiders})),o(),c.info("API queue:",window.audienceProjectLayer,window._urq),a();var l=e.map(function(e){return new u(function(t){t(e(i))})}),f=u.all(l);return n.sakObject.started.fire(i),s(),f}},{"./api":10,"./config":11,"./lib/log":21,"@apr/promise-polyfill":5}],13:[function(e,t,n){"use strict";function r(){this._firedEvents=[],this._callbacks=[]}r.prototype.subscribe=function(e,t){if(t)for(var n=0;n<this._firedEvents.length;n++)e.apply(null,this._firedEvents[n]);return this._callbacks.push(e),function(){return this.unsubscribe(e)}.bind(this)},r.prototype.unsubscribe=function(e){var t=this._callbacks.indexOf(e);t!==-1&&this._callbacks.splice(t,1)},r.prototype.fire=function(){var e=Array.prototype.slice.call(arguments,0);this._firedEvents.push(e);for(var t=[],n=this._callbacks.slice(0),r=0,i=n.length;r<i;r++)try{n[r].apply(null,e)}catch(e){t.push(e)}if(0!==t.length){var o=t.map(function(e){return String(e.stack)||String(e)}).join("\n\n");throw new Error("Errors while calling subscribers\n"+o)}},t.exports=r},{}],14:[function(e,t,n){"use strict";t.exports=function(e,t){t=t||{},"async"in t==!1&&(t.async=!0);var n=document.createElement("script");if(n.type="text/javascript",n.src=e,t.id){if(document.getElementById(t.id))return;n.id=t.id}n.async=t.async;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)}},{}],15:[function(e,t,n){"use strict";var r=e("../../lib/location");t.exports=function(e,t){t||(t=r().hostname);for(var n=t.split(".").reverse(),i=e.split(".").reverse(),o=0;;o++){if(o>=n.length)return i.length===n.length||i.length-n.length===1&&"*"===i[i.length-1];if(o>=i.length){if("*"===i[i.length-1])continue;return!1}if("*"!==i[o]&&i[o].toLowerCase()!==n[o].toLowerCase())return!1}}},{"../../lib/location":20}],16:[function(e,t,n){"use strict";var r=e("../../lib/location");t.exports=function(e,t){if(t||(t=r().pathname),"/"===e)return"/"===t;e="/"+e.replace(/(^\/|\/$)/g,"");var n=t.slice(e.length*-1)===e,i=t.indexOf(e+"/")!==-1;return n||i}},{"../../lib/location":20}],17:[function(e,t,n){"use strict";var r=e("@apr/promise-polyfill"),i=e("../config");n.IDENTIFY=1,n.TARGET_ADS=3,n.TARGET_CONTENT=4,n.MEASURE=5,n.V2_USE_DEVICE=1,n.V2_CREATE_ADS_PROFILE=3,n.V2_SELECT_PERSONALIZED_CONTENT=6,n.V2_MEASURE_PERFORMANCE_CONTENT=8;var o={acquire:function(){return r.resolve(!0)},getForwardParams:function(){return r.resolve({})},getConsentData:function(){return r.resolve({})},hasTTL:function(){return!1}},a=o;n.enable=function(e){a=e},n.disable=function(){a=o},n.acquire=function(e){return a.acquire(e)},n.getForwardParams=function(){return a.getForwardParams()},n.getConsentData=function(){return a.getConsentData()},n.hasTTL=function(){return a.hasTTL()};var s=function(e,t){this.toString=this.valueOf=function(){return i.dnt?t:e}};s.prototype=String.prototype,n.DNTSelect=s},{"../config":11,"@apr/promise-polyfill":5}],18:[function(e,t,n){"use strict";var r=e("./map-obj"),i=e("./replace"),o=e("./log");t.exports=function(e,t,n,a){t=t||{},n=n||{},(a||"undefined"==typeof a)&&(n=r(n,function(e,t){return[e,encodeURIComponent(t)]})),e=i(e,n);var s=[];for(var u in t)t.hasOwnProperty(u)&&t[u]&&s.push(encodeURIComponent(u)+"="+encodeURIComponent(t[u]));0!==s.length&&(e+=e.indexOf("?")===-1?"?":"&",e+=s.join("&")),o.info("Firing pixel %s",e),(new window.Image).src=e}},{"./log":21,"./map-obj":22,"./replace":24}],19:[function(e,t,n){"use strict";var r=[/bot/i,/spider/i,/facebookexternalhit/i,/simplepie/i,/yahooseeker/i,/embedly/i,/quora link preview/i,/outbrain/i,/vkshare/i,/monit/i,/Pingability/i,/Monitoring/i,/WinHttpRequest/i,/Apache-HttpClient/i,/getprismatic.com/i,/python-requests/i,/Twurly/i,/yandex/i,/browserproxy/i,/crawler/i,/Qwantify/i,/Yahoo! Slurp/i,/pinterest/i,/Tumblr\/14.0.835.186/i,/Tumblr Agent 14.0/i];t.exports=function(e){return r.some(function(t){return t.test(e)})}},{}],20:[function(e,t,n){"use strict";function r(){var e=o||window.location.toString();if(e=e.replace(/\.demo\.audienceproject\.com\//,"/"),a.url===e)return a.parsed;var t=i(e);return a.url=e,a.parsed=t,t}var i=e("./parseUrl"),o=null,a={};t.exports=r,t.exports.onLocationChange=function(e){var t=r().pathname,n=setInterval(function(){var n=r().pathname;n!==t&&(t=n,e(n))},100);return function(){clearInterval(n)}},t.exports.updateLocation=function(e){i(e),o=e},t.exports.parse=i},{"./parseUrl":23}],21:[function(e,t,n){"use strict";var r=e("./Event"),i=new r;t.exports.subscribe=i.subscribe.bind(i),t.exports.unsubscribe=i.unsubscribe.bind(i),t.exports.log=i.fire.bind(i,"log"),t.exports.info=i.fire.bind(i,"info"),t.exports.warn=i.fire.bind(i,"warn"),t.exports.error=i.fire.bind(i,"error")},{"./Event":13}],22:[function(e,t,n){"use strict";t.exports=function(e,t){for(var n={},r=Object.keys(e),i=0;i<r.length;i++){var o=t(r[i],e[r[i]]);n[o[0]]=o[1]}return n}},{}],23:[function(e,t,n){"use strict";function r(e){var t=0!==e.indexOf("/")&&e.indexOf("/")!==-1&&(e.indexOf(":")===-1||e.indexOf(":")>e.indexOf("/")),n=i.exec(t?"noscheme://"+e:e),r={scheme:t?"":n[2]||"",host:n[4]||"",hostname:n[4]?n[4].split(":")[0]:"",pathname:n[5]||"",search:n[7]||"",hash:n[9]||"",toString:function(){return e}};return r.origin=r.scheme+"://"+r.host,r}var i=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");t.exports=r},{}],24:[function(e,t,n){"use strict";t.exports=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e=e.split("{"+n+"}").join(String(t[n])));return e}},{}],25:[function(e,t,n){"use strict";t.exports=function(e){e=e||10;for(var t="";t.length<e;)t+=Math.random().toString(36).slice(2,3);return t}},{}],26:[function(e,t,n){"use strict";t.exports=function(){var e=Array.prototype,t=Object.keys&&Date.now&&e.forEach&&e.map&&e.filter&&e.indexOf&&e.some;return!!t}},{}],27:[function(e,t,n){"use strict";var r=e("@apr/promise-polyfill"),i=e("util-merge"),o=e("../"),a=e("../lib/log"),s=e("../lib/Event"),u=e("./log-to-console"),c=e("./check-browser"),l=e("../config"),d=e("../lib/isSpider.js");r._setUnhandledRejectionFn&&r._setUnhandledRejectionFn(a.error);try{if(l.debug&&u(),l.sakObject=window.__sak=i({},{customers:[],loaded:new s,starting:new s,started:new s},window.__sak||{}),a.info("Revision: %s; Publish date: %s; Customer: %s",l.revision,l.publishDate&&new Date(l.publishDate).toGMTString(),l.customerId),l.disabled)return void a.info("Disabled");if(c()===!1)return void a.info("Browser not supported");var f=d(window.navigator.userAgent);f&&a.warn("User agent is a bot-like, will be executed only plugins that declare that they can be called for bot-environments using `executeForSpiders = true`");var p=!!l.customerId&&l.sakObject.customers.indexOf(l.customerId)!==-1;if(l.sakObject.loaded.fire(l),p===!1){l.customerId&&l.sakObject.customers.push(l.customerId);var h=l.plugins.map(function(t){return e("plugin:"+t)});o(h,l.customerConfig,l,f).catch(a.error)}}catch(e){a.error(e)}},{"../":12,"../config":11,"../lib/Event":13,"../lib/isSpider.js":19,"../lib/log":21,"./check-browser":26,"./log-to-console":28,"@apr/promise-polyfill":5,"util-merge":9}],28:[function(e,t,n){"use strict";function r(e){var t=Array.prototype.slice.call(arguments,1);"string"==typeof t[0]?t[0]="SAK :: "+t[0]:t.unshift("SAK:");try{console[e].apply(console,t)}catch(n){switch(t.length){case 1:console.log(e,t[0]);break;case 2:console.log(e,t[0],t[1]);break;case 3:console.log(e,t[0],t[1],t[2]);break;default:console.log(e,t)}}}var i=e("../lib/log");t.exports=function(){return i.subscribe(r)}},{"../lib/log":21}],"plugin:userreport-ak":[function(e,t,n){"use strict";function r(){var e={},t=/(?: |^)_usrp_lq=([^;]+)/.exec(document.cookie);t&&(e.lq_c=t[1]);var n=window.localStorage.getItem("_usrp_lq");return n&&(e.lq_ls=n),e}function i(){return l.getForwardParams().then(function(e){l.acquire({1:[l.IDENTIFY],2:[l.V2_USE_DEVICE]}).then(function(t){var n=t&&m.consents.storage&&!m.dnt?h.readOrCreateDsu(l.hasTTL()):"";f(v,s({t:a,d:w,rnd:p(),dsu:n,med:d().toString()},e,b,r())),x.forEach(function(t){f(v,s({t:t,d:w,rnd:p(),dsu:n,med:d().toString()},e,b,r()))})})})}var o,a,s=e("util-merge"),u=e("./userreport-core"),c=e("../lib/log"),l=e("../lib/consent"),d=e("../lib/location"),f=e("../lib/fire-pixel"),p=e("../lib/rnd"),h=e("@apr/dsu"),g=e("../api"),m=e("../config"),v=new l.DNTSelect("https://visitanalytics.userreport.com/hit","https://visitanalytics.dnt-userreport.com/hit"),w="",y={},b={},x=[];t.exports=function(e){var t=u.resolveCurrent(e),n=e.config["userreport-ak"].trackingConfig;if(e.isSpider&&(b={event:"bot"}),o=e.config["userreport-core"]&&e.config["userreport-core"].companyId,!t.mediaId)return o&&l.getForwardParams().then(function(e){l.acquire({1:[l.IDENTIFY],2:[l.V2_USE_DEVICE]}).then(function(t){var n=t&&m.consents.storage&&!m.dnt?h.readOrCreateDsu(l.hasTTL()):"";f(v,s({t:"USRur-core-nomedia",accountId:o,rnd:p(),dsu:n,med:d().toString()},e,b))})}),function(){};e.config["userreport-ak"].trackingConfig.forEach(function(e){"Section"===e.type&&e.mediaId===t.mediaId&&(y[e.sectionId]=e.trackingCode)});var r=n.filter(function(e){return"Media"===e.type&&e.mediaId===t.mediaId}).map(function(e){return e.trackingCode});return x=n.filter(function(e){return"Section"===e.type&&e.mediaId===t.mediaId&&t.sectionIds.indexOf(e.sectionId)!==-1}).map(function(e){return e.trackingCode}),0===r.length?(c.info("No media tracking matching"),null):r.length>1?(c.error("More than one media TP matching",r),null):(a=r[0],i().then(function(){return d.onLocationChange(function(){i()})}))},t.exports.executeForSpiders=!0,g.trackSectionPageView=function(e){if(!e)return void c.warn("Section ID is not passed");var t=y[e];return t?void l.getForwardParams().then(function(e){l.acquire({1:[l.IDENTIFY],2:[l.V2_USE_DEVICE]}).then(function(n){var i=n&&m.consents.storage&&!m.dnt?h.readOrCreateDsu(l.hasTTL()):"";f(v,s({t:t,d:w,rnd:p(),dsu:i,med:d().toString()},e,b,r()))})}):void c.warn("Section ID "+e+" does not belong to current media")},g.setMAID=function(e){w=e},g.trackPageview=function(e){var t=e||d().toString();l.getForwardParams().then(function(e){l.acquire({1:[l.IDENTIFY],2:[l.V2_USE_DEVICE]}).then(function(n){var i=n&&m.consents.storage&&!m.dnt?h.readOrCreateDsu(l.hasTTL()):"";a?f(v,s({t:a,d:w,rnd:p(),dsu:i,med:t},e,b,r())):f(v,s({t:"USRur-core-nomedia",accountId:o,rnd:p(),dsu:i,med:d().toString()},e,b))})})}},{"../api":10,"../config":11,"../lib/consent":17,"../lib/fire-pixel":18,"../lib/location":20,"../lib/log":21,"../lib/rnd":25,"./userreport-core":"plugin:userreport-core","@apr/dsu":1,"util-merge":9}],"plugin:userreport-core":[function(e,t,n){"use strict";function r(e){var t=w();return new RegExp(e).test(t.hostname+t.pathname)}function i(e,t){for(var n=window._urq||[],r=0;r<n.length;r++)if(n[r][0]===e&&n[r][1]===t)return!0;for(var i=window.audienceProjectLayer||[],o=0;o<i.length;o++)if(i[o][0]===e&&i[o][1]===t)return!0;return!1}function o(e){return!!i("setMediaId",e.id)&&(v.log("Media matched by _urq:",e.id),!0)}function a(e){return!!i("setSectionId",e.id)&&(v.log("Section matched by _urq:",e.id),!0)}function s(e,t){for(var n=window.document.getElementsByTagName("meta"),r=0;r<n.length;r++){var i=n[r].getAttribute("name"),o=n[r].getAttribute("value");if(i===e&&o===String(t))return!0}return!1}function u(e){return!!s("userreport:mediaId",e.id)&&(v.log("Media matched by meta:",e.id),!0)}function c(e){return!!s("userreport:sectionId",e.id)&&(v.log("Section matched by meta:",e.id),!0)}function l(e,t){if(!e.rules)return!1;for(var n=0;n<e.rules.length;n++){var r=e.rules[n],i=t[r.operation];if(i||v.error("Not supported rule",e.id,r.operation),i(r.pattern))return!0}return!1}function d(e){return!!l(e,O)&&(v.log("Media matched by rule:",e.id),!0)}function f(e){return!!l(e,C)&&(v.log("Section matched by rule:",e.id),!0)}function p(e){var t={companyId:null,mediaId:null,sectionIds:null},n=e.config["userreport-core"],r=n.networkLayout,i=r.filter(o);if(i.length||(i=r.filter(u)),i.length||(i=r.filter(d)),0===i.length)return v.error("Can’t resolve media"),t;if(i.length>1)return v.error("Resolved more than one media",i),t;var s=i[0],l=(s.sections||[]).filter(function(e){return a(e)||c(e)||f(e)});return t.companyId=n.companyId,t.mediaId=s.id,t.sectionIds=l.map(function(e){return e.id}),k=t.mediaId,v.info("Resolved media:",t.mediaId),v.info("Resolved sections:",t.sectionIds),t}function h(e){var t=e&&e.lastUpdated;if(!t)return!1;t.getTime&&(t=t.getTime());var n=6e4;return(new Date).getTime()-t<n}function g(e){var t=function(t){var n=t.data;if(n===T){var r={config:{mediaId:e.mediaId}};t.source.postMessage(JSON.stringify(r),t.origin)}};window.addEventListener("message",t,!1)}var m=e("../lib/consent"),v=e("../lib/log"),w=e("../lib/location"),y=e("../api"),b=e("../lib/add-script-tag"),x=e("../lib/check/domain"),_=e("../lib/check/section"),I=e("util-merge"),S=e("../config"),E="https://cdn.userreport.com/userreport.js",k=null,O={DomainEquals:x,StartsWith:function(e){var t=w(),n=t.hostname+t.pathname;return e.indexOf("?")!==-1&&(n+="?"+t.search),e.indexOf("#")!==-1&&(n+="#"+t.hash),0===n.indexOf(e)},Contains:function(e){return w().toString().indexOf(e)!==-1},RegEx:r},C={Section:_,Contains:function(e){return w().toString().indexOf(e)!==-1},StartsWith:function(e){var t=w(),n=t.pathname;return e.indexOf("?")!==-1&&(n+="?"+t.search),e.indexOf("#")!==-1&&(n+="#"+t.hash),0===n.indexOf(e)},UrlEquals:function(e){var t=w(),n=w.parse(e);if(n.host&&n.host!==n.hostname&&t.host!==n.host)return!1;if(n.hostname&&t.hostname!==n.hostname)return!1;if(n.pathname){var r="/"===n.pathname.slice(-1)[0]?n.pathname.slice(0,-1):n.pathname,i="/"===t.pathname.slice(-1)[0]?t.pathname.slice(0,-1):t.pathname;if(r!==i)return!1}return(!n.search||t.search===n.search)&&(!n.hash||t.hash===n.hash)},RegExp:r,RegEx:r,PathEquals:function(e){return w().pathname===e}},T="getSiteConfig";t.exports=function(e){return m.acquire({1:[m.IDENTIFY],2:[m.V2_USE_DEVICE,m.V2_MEASURE_PERFORMANCE_CONTENT]}).then(function(t){if(t===!1)return null;if(window.location.href.indexOf("__urp=suppress")!==-1)try{v.info("Invitation suppressed forever"),window.localStorage.setItem("_usrp_lq","20300101")}catch(e){}window._urq=window._urq||[],m.getForwardParams().then(function(e){(e.gdpr||e.gdpr_consent)&&(window._urq.push(["setGDPR",e.gdpr?"1":"0"]),window._urq.push(["setGDPRConsent",e.gdpr_consent]))}),S.dnt&&window._urq.push(["forwardAnonymousTracking",S.dnt]),S.consents.storage||window._urq.push(["forwardConsents",S.consents]);var n=p(e);if(g(n),n.mediaId){m.getConsentData().then(function(e){e.core&&h(e.core)&&(window._urq.push(["inhibitInvitation",!0]),setTimeout(function(){window._urq.push(["tryToInvite"])},6e4))}),window._urq.push(["initSite",n.mediaId]),v.info("Initalizing UserReport for media:",n.mediaId);var r=e.config["userreport-invitation-utils"]&&e.config["userreport-invitation-utils"].optimizeScriptLoading===!0;r||b(E,{id:"userreport-script"})}else{var i=/__(bpn|urp)=test_invite/i.test(window.location.href);i&&alert("Unable to identify media, domain is not configured or dublicated Media created. ")}return null})},t.exports.resolveCurrent=p,t.exports.checkAdsDomain=function(e){var t=p(e);return!!t&&null!==t.mediaId},y.embedSurvey=function(e,t){if("string"==typeof e&&(e=document.getElementById(e)||document.querySelector(e)),!e)throw new Error("Unable to find passed container");var n={ignoreLocalQuarantine:!1,mediaId:k,surveyUrl:"https://sak.userreport.com/_rt/vs/survey",onDoneCallback:function(){},customizations:{invitation:{headline:null,accept:null,decline:null},thankYou:{headline:null,close:null,powered:null},disabledQuestions:[]}};if(t=I({},n,t),!t.mediaId)throw new Error("Media is not defined. You need to pass mediaId in options or setup media matching rules");var r={};t.customizations.invitation&&(r.invitation={},t.customizations.invitation.headline&&(r.invitation.headline=t.customizations.invitation.headline),t.customizations.invitation.accept&&(r.invitation.accept=t.customizations.invitation.accept),t.customizations.invitation.decline&&(r.invitation.decline=t.customizations.invitation.decline)),t.customizations.thankYou&&(r.thankYou={},t.customizations.thankYou.headline&&(r.thankYou.headline=t.customizations.thankYou.headline),t.customizations.thankYou.close&&(r.thankYou.close=t.customizations.thankYou.close),t.customizations.thankYou.built&&(r.thankYou.built=t.customizations.thankYou.built)),t.customizations.disabledQuestions&&t.customizations.disabledQuestions.length>0&&(r.questionOverrides={},t.customizations.disabledQuestions.forEach(function(e){r.questionOverrides["q"+e]=null,23===e&&(r.questionOverrides.q100103=null,r.questionOverrides.q100104=null)}));var i=document.createElement("iframe");for(i.style.width="100%",i.style.height="100%",i.src=t.surveyUrl+"?mid="+t.mediaId+"#localization="+encodeURIComponent(JSON.stringify(r)),i.frameborder="no",i.style.border="none 0";e.firstChild;)e.removeChild(e.lastChild);e.appendChild(i),window.addEventListener("message",function(e){"userreport.surveyEnded"===e.data.name&&t.onDoneCallback&&t.onDoneCallback()})},y.setMediaId=function(){return null},y.setSectionId=function(){return null}},{"../api":10,"../config":11,"../lib/add-script-tag":14,"../lib/check/domain":15,"../lib/check/section":16,"../lib/consent":17,"../lib/location":20,"../lib/log":21,"util-merge":9}]},{},[27])}();