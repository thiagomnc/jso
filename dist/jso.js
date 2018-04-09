!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jso=t():e.jso=t()}(window,function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var o={epoch:function(){return Math.round((new Date).getTime()/1e3)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},getResponseFromURL:e=>-1!==e.indexOf("#")?o.parseQueryString(e.substring(e.indexOf("#")+1)):-1!==e.indexOf("?")?o.parseQueryString(e.substring(e.indexOf("?")+1)):{},parseQueryString:function(e){for(var t,r=/\+/g,o=/([^&;=]+)=?([^&;]*)/g,s=function(e){return decodeURIComponent(e.replace(r," "))},i=e,n={};t=o.exec(i);)n[s(t[1])]=s(t[2]);return n},scopeList:function(e){return o.uniqueList(e).join(" ")},uniqueList:function(e){for(var t={},r=[],o=0;o<e.length;o++)t[e[o]]=1;for(var s in t)t.hasOwnProperty(s)&&r.push(s);return r}};o.uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},o.log=function(e){console&&console.log&&(arguments.length>1?console.log("[JSO]",...arguments):console.log("[JSO]",e))},o.encodeURL=function(e,t){var r,o=e,s=0,i=-1===e.indexOf("?")?"?":"&";for(r in t)o+=(0==s++?i:"&")+encodeURIComponent(r)+"="+encodeURIComponent(t[r]);return o},o.epoch=function(){return Math.round((new Date).getTime()/1e3)};var s=o;var i=new class{constructor(){}saveState(e,t){localStorage.setItem("state-"+e,JSON.stringify(t))}getState(e){var t=JSON.parse(localStorage.getItem("state-"+e));return localStorage.removeItem("state-"+e),t}hasScope(e,t){var r;if(!e.scopes)return!1;for(r=0;r<e.scopes.length;r++)if(e.scopes[r]===t)return!0;return!1}filterTokens(e,t){var r,o,i,n=[],a=s.epoch();for(t||(t=[]),r=0;r<e.length;r++){for(i=!0,e[r].expires&&e[r].expires<a+1&&(i=!1),o=0;o<t.length;o++)store.hasScope(e[r],t[o])||(i=!1);i&&n.push(e[r])}return n}saveTokens(e,t){localStorage.setItem("tokens-"+e,JSON.stringify(t))}getTokens(e){var t=JSON.parse(localStorage.getItem("tokens-"+e));return t||(t=[]),s.log("Token found when loooking up provider "+e+" in store "+window.location.href,t),t}wipeTokens(e){localStorage.removeItem("tokens-"+e)}saveToken(e,t){var r=this.getTokens(e);(r=this.filterTokens(r)).push(t),this.saveTokens(e,r)}getToken(e,t){var r=this.getTokens(e);return(r=this.filterTokens(r,t)).length<1?null:r[0]}};class n{constructor(e){console.log("Initializing a loader with url "+e),this.url=e}execute(){}}class a extends n{execute(){var e=this;return new Promise(function(t,r){window.location=e.url})}}class c extends n{constructor(e){super(e),this.timeout=5e3,this.callback=null,this.isCompleted=!1,this.id="jso_passive_iframe_"+s.uuid();var t=window.addEventListener?"addEventListener":"attachEvent";window[t];this.iframe=document.createElement("iframe"),this.iframe.setAttribute("id",this.id),this.iframe.setAttribute("src",e),this.iframe.addEventListener("load",e=>{let t=null;try{if(this.iframe.contentWindow.location.hash){let e=this.iframe.contentWindow.location.hash.substring(1);t=s.parseQueryString(e)}else if(this.iframe.contentWindow.location.search){let e=this.iframe.contentWindow.location.search.substring(1);t=s.parseQueryString(e)}null!==t?this._completed(t):this._failed(new Error("Failed to obtain response value from iframe"))}catch(e){}})}execute(){return new Promise((e,t)=>{this.callback=e,this.errorCallback=t,document.getElementsByTagName("body")[0].appendChild(this.iframe),setTimeout(()=>{this._failed(new Error("Loading iframe timed out"))},this.timeout)})}_cleanup(){let e=document.getElementById(this.id);e.parentNode.removeChild(e)}_failed(e){this.isCompleted||(this.errorCallback&&"function"==typeof this.errorCallback&&this.errorCallback(e),this.isCompleted=!0,this._cleanup())}_completed(e){this.isCompleted||(this.callback&&"function"==typeof this.callback&&this.callback(e),this.isCompleted=!0,this._cleanup())}}class l extends n{execute(){return new Promise((e,t)=>{window.popupCompleted=function(){var t=r.location.href;e(t)};var r=window.open(this.url,"jso-popup-auth","height=600,width=800");if(null===r)throw new Error("Error loading popup window");window.focus&&r.focus()})}}class u extends Error{}class h{constructor(e){this.jso=e}_fetch(e,t){return fetch(e,t).then(e=>{if(401===e.status)throw new u;return e})}fetch(e,t,r){if((r=r||0)>2)throw new Error("Reccursion error. Expired tokens deleted and tried again multiple times.");let o={},s={mode:"cors"};return t&&(s=t,Object.assign(s,t)),t&&t.jso&&Object.assign(o,t.jso),this.jso.getToken(o).catch(e=>{console.error("Error fetching token to use ",e)}).then(o=>(console.log("I got the token: ",o.access_token),s.headers||(s.headers={}),s.headers.Authorization="Bearer "+o.access_token,this._fetch(e,s).catch(o=>{if(o instanceof u)return console.error("Token was expired. Deleting all tokens for this provider and get a new one",o),this.jso.wipeTokens(),this.fetch(e,t,r+1)})))}}class p{constructor(e){for(var t in e)this[t]=e[t]}set(e,t){return this[e]=t,this}}class d extends p{toString(){return"OAuthResponseError: ["+(this.error||"unknown")+"]: "+(this.error_description||"unknown")}}class f{constructor(){this.config={};for(var e=0;e<arguments.length;e++)Object.assign(this.config,arguments[e])}has(e){var t=this.config,r=e.split("."),o=0;for(o=0;o<r.length;o++){if(!t.hasOwnProperty(r[o]))return!1;t=t[r[o]]}return!0}getValue(e,t,r){r=r||!1;var o=this.config,s=e.split("."),i=0;for(i=0;i<s.length;i++){if(!o.hasOwnProperty(s[i])){o=void 0;break}o=o[s[i]]}if(void 0===o){if(r)throw new Error("Configuration option ["+s[i]+"] required but not provided.");return t}return o}}class g{on(e,t){this._callbacks||(this._callbacks={}),this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t)}emit(e){this._callbacks||(this._callbacks={}),this._callbacks[e]||(this._callbacks[e]=[]);for(var t=Array.prototype.slice.call(arguments,1),r=0;r<this._callbacks[e].length;r++)this._callbacks[e][r].apply(this,t)}}r.d(t,"JSO",function(){return x}),r.d(t,"BasicLoader",function(){return n}),r.d(t,"HTTPRedirect",function(){return a}),r.d(t,"Popup",function(){return l}),r.d(t,"IFramePassive",function(){return c}),r.d(t,"Fetcher",function(){return h});r(1);const w={lifetime:3600};class x extends g{constructor(e){super(),this.configure(e),this.providerID=this.getProviderID(),this.Loader=a,this.store=i,this.callbacks={}}configure(e){this.config=new f(w,e)}setStore(e){this.store=e}setLoader(e){if("function"!=typeof e)throw new Error("loader MUST be an instance of the JSO BasicLoader");this.Loader=e}getProviderID(){var e=this.config.getValue("providerID",null);if(null!==e)return e;var t=this.config.getValue("client_id",null,!0);return this.config.getValue("authorization",null,!0)+"|"+t}processTokenResponse(e){var t,r=s.epoch();if(!e.state)throw new Error("Could not get state from storage.");if(!(t=this.store.getState(e.state)))throw new Error("Could not retrieve state");if(!t.providerID)throw new Error("Could not get providerid from state");return s.log("processTokenResponse ",e,""),e.received=r,e.expires_in?(e.expires=r+parseInt(e.expires_in,10),e.expires_in=parseInt(e.expires_in,10)):!1===this.config.getValue("default_lifetime",null)?e.expires=null:this.config.has("permanent_scope")?this.store.hasScope(e,this.config.getValue("permanent_scope"))||(e.expires=null):this.config.has("default_lifetime")?e.expires=r+this.config.getValue("default_lifetime"):e.expires=r+3600,e.scope?(e.scopes=e.scope.split(" "),delete e.scope):t.scopes?e.scopes=t.scopes:e.scopes=[],s.log("processTokenResponse completed ",e,""),this.store.saveToken(t.providerID,e),t.restoreHash?window.location.hash=t.restoreHash:window.location.hash="",e}processAuthorizationCodeResponse(e){console.log(this),this.emit("authorizationCode",e)}processErrorResponse(e){var t;if(!e.state)throw new Error("Could not get [state] and no default providerid is provided.");if(!(t=this.store.getState(e.state)))throw new Error("Could not retrieve state");if(!t.providerID)throw new Error("Could not get providerid from state");return t.restoreHash?window.location.hash=t.restoreHash:window.location.hash="",new d(e)}callback(e){let t=null;if("object"==typeof e)t=e;else if("string"==typeof e)t=s.getResponseFromURL(e);else{if(void 0!==e)return;t=s.getResponseFromURL(window.location.href)}if(s.log("Receving response in callback",t),t.hasOwnProperty("access_token"))return this.processTokenResponse(t);if(t.hasOwnProperty("code"))return this.processAuthorizationCodeResponse(t);if(t.hasOwnProperty("error"))throw this.processErrorResponse(t)}dump(){var e=this.store.getTokens(this.providerID);return{providerID:this.providerID,tokens:e,config:this.config}}_getRequestScopes(e){var t,r=[];if(this.config.has("scopes.request")){let e=this.config.getValue("scopes.request");for(t=0;t<e.length;t++)r.push(e[t])}if(e&&e.scopes&&e.scopes.request)for(t=0;t<e.scopes.request.length;t++)r.push(e.scopes.request[t]);return s.uniqueList(r)}_getRequiredScopes(e){var t,r=[];if(this.config.has("scopes.require")){let e=this.config.getValue("scopes.require");for(t=0;t<e.length;t++)r.push(e[t])}if(e&&e.scopes&&e.scopes.require)for(t=0;t<e.scopes.require.length;t++)r.push(e.scopes.require[t]);return s.uniqueList(r)}getToken(e){return e=e||{},new Promise((t,r)=>{let o=this._getRequiredScopes(e),s=this.store.getToken(this.providerID,o);if(s)return t(s);if(e.hasOwnProperty("allowredir")&&!e.allowredir)throw new Error("Cannot obtain a token, when not allowed to redirect...");t(this._authorize(e))})}checkToken(e){var t=this._getRequiredScopes(e);return this.store.getToken(this.providerID,t)}_authorize(e){var t,r,o;return Promise.resolve().then(()=>{var i=this.config.getValue("authorization",null,!0),n=this.config.getValue("client_id",null,!0);s.log("About to send an authorization request to this entry:",i),s.log("Options",e),t={response_type:e.response_type||this.config.getValue("response_type","token"),state:s.uuid()},e.hasOwnProperty("allowia")&&!e.allowia&&(t.prompt="none"),this.config.has("redirect_uri")&&(t.redirect_uri=this.config.getValue("redirect_uri","")),e.redirect_uri&&(t.redirect_uri=e.redirect_uri),t.client_id=n,(o=this._getRequestScopes(e)).length>0&&(t.scope=s.scopeList(o)),s.log("DEBUG REQUEST"),s.log(t),r=s.encodeURL(i,t),window.location.hash&&(t.restoreHash=window.location.hash),t.providerID=this.providerID,o&&(t.scopes=o),s.log("Saving state ["+t.state+"]"),s.log(JSON.parse(JSON.stringify(t)));var a=this.Loader;return e.hasOwnProperty("loader")&&(a=e.loader),s.log("Looking for loader",e,a),this.store.saveState(t.state,t),this.gotoAuthorizeURL(r,a).then(e=>{if(!0!==e)return this.callback(e)})})}gotoAuthorizeURL(e,t){return new Promise(function(r,o){if(null!==t&&"function"==typeof t){var s=new t(e);if(!(s instanceof n))throw new Error("JSO selected Loader is not an instance of BasicLoader.");r(s.execute())}else o(new Error("Cannot redirect to authorization endpoint because of missing redirect handler"))})}wipeTokens(){this.store.wipeTokens(this.providerID)}}},function(e){e.exports={name:"jso",version:"4.0.0-rc.6",description:"OAuth 2.0 implementation in Javascript",main:"dist/jso.js",module:"src/JSO.js",scripts:{test:"true",preversion:"npm test",version:"npm run build && git add -A dist",postversion:"git push && git push --tags && npm publish",build:"webpack --mode production"},repository:{type:"git",url:"https://github.com/andreassolberg/jso.git"},keywords:["oauth","authentication","authorization","rest","api","ajax","jquery"],files:["src"],eslintConfig:{env:{es6:!0,browser:!0,node:!1}},devDependencies:{"babel-core":"^6.26.0","babel-preset-env":"^1.6.1","babel-loader":"^7.1.4","babel-preset-react":"^6.24.1",qunit:"^2.5.1",webpack:"^4.1.1"},author:"Andreas Åkre Solberg",license:"LGPL-2.1",bugs:{url:"https://github.com/andreassolberg/jso/issues"},homepage:"https://github.com/andreassolberg/jso",dependencies:{"webpack-cli":"^2.0.12"}}}])});