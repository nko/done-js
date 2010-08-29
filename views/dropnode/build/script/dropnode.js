(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"dropnode.Application","qx.theme":"dropnode.theme.Theme","qx.version":"1.2"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"dropnode":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.2"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["__out__:dropnode.js"]],
  urisBefore : [],
  packageHashes : {"0":"ad9338d343db"},
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : false,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){return;});
  }
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['ad9338d343db']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}},"resources":{"dropnode/test.png":[32,32,"png","dropnode"],"qx/decoration/Classic/arrows-combined.gif":[124,7,"gif","qx"],"qx/decoration/Classic/arrows/down-invert.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-38,0],"qx/decoration/Classic/arrows/down-small-invert.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-87,0],"qx/decoration/Classic/arrows/down-small.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-53,0],"qx/decoration/Classic/arrows/down.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-113,0],"qx/decoration/Classic/arrows/forward-invert.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-30,0],"qx/decoration/Classic/arrows/forward.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-18,0],"qx/decoration/Classic/arrows/left-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-92,0],"qx/decoration/Classic/arrows/left-small-invert.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-58,0],"qx/decoration/Classic/arrows/left-small.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-15,0],"qx/decoration/Classic/arrows/left.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-120,0],"qx/decoration/Classic/arrows/next-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-80,0],"qx/decoration/Classic/arrows/next.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-109,0],"qx/decoration/Classic/arrows/previous-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-69,0],"qx/decoration/Classic/arrows/previous.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-65,0],"qx/decoration/Classic/arrows/rewind-invert.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-45,0],"qx/decoration/Classic/arrows/rewind.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-101,0],"qx/decoration/Classic/arrows/right-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-61,0],"qx/decoration/Classic/arrows/right-small-invert.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",0,0],"qx/decoration/Classic/arrows/right-small.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-84,0],"qx/decoration/Classic/arrows/right.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-26,0],"qx/decoration/Classic/arrows/up-invert.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-73,0],"qx/decoration/Classic/arrows/up-small-invert.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-96,0],"qx/decoration/Classic/arrows/up-small.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-3,0],"qx/decoration/Classic/arrows/up.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-8,0],"qx/decoration/Classic/checkbox-radiobutton-combined.png":[504,14,"png","qx"],"qx/decoration/Classic/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Classic/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Classic/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Classic/colorselector-combined.gif",-11,0],"qx/decoration/Classic/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Classic/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Classic/colorselector-combined.gif",0,0],"qx/decoration/Classic/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Classic/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-52,0],"qx/decoration/Classic/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-20,0],"qx/decoration/Classic/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-39,0],"qx/decoration/Classic/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Classic/cursors-combined.gif",0,0],"qx/decoration/Classic/datechooser/last-month-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-month.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-year-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-year.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-month-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-month.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-year-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-year.png":[16,16,"png","qx"],"qx/decoration/Classic/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-336,0],"qx/decoration/Classic/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-28,0],"qx/decoration/Classic/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-462,0],"qx/decoration/Classic/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-112,0],"qx/decoration/Classic/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-140,0],"qx/decoration/Classic/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-98,0],"qx/decoration/Classic/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-308,0],"qx/decoration/Classic/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",0,0],"qx/decoration/Classic/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-266,0],"qx/decoration/Classic/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-84,0],"qx/decoration/Classic/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-476,0],"qx/decoration/Classic/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-392,0],"qx/decoration/Classic/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-196,0],"qx/decoration/Classic/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-154,0],"qx/decoration/Classic/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-350,0],"qx/decoration/Classic/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-448,0],"qx/decoration/Classic/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-70,0],"qx/decoration/Classic/form/checkbox.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-490,0],"qx/decoration/Classic/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-210,0],"qx/decoration/Classic/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-406,0],"qx/decoration/Classic/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-378,0],"qx/decoration/Classic/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-252,0],"qx/decoration/Classic/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-182,0],"qx/decoration/Classic/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-294,0],"qx/decoration/Classic/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-420,0],"qx/decoration/Classic/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-56,0],"qx/decoration/Classic/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-322,0],"qx/decoration/Classic/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-364,0],"qx/decoration/Classic/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-434,0],"qx/decoration/Classic/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-168,0],"qx/decoration/Classic/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-126,0],"qx/decoration/Classic/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-42,0],"qx/decoration/Classic/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-280,0],"qx/decoration/Classic/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-238,0],"qx/decoration/Classic/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-14,0],"qx/decoration/Classic/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-224,0],"qx/decoration/Classic/menu-combined.gif":[64,7,"gif","qx"],"qx/decoration/Classic/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Classic/menu-combined.gif",-16,0],"qx/decoration/Classic/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Classic/menu-combined.gif",-32,0],"qx/decoration/Classic/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Classic/menu-combined.gif",0,0],"qx/decoration/Classic/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Classic/menu-combined.gif",-48,0],"qx/decoration/Classic/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Classic/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Classic/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Classic/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Classic/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-30],"qx/decoration/Classic/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-60],"qx/decoration/Classic/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Classic/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Classic/shadow-lr-combined.png",-15,0],"qx/decoration/Classic/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Classic/shadow-lr-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-25],"qx/decoration/Classic/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-20],"qx/decoration/Classic/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Classic/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Classic/shadow-small-lr-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Classic/shadow-small-lr-combined.png",-5,0],"qx/decoration/Classic/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-5],"qx/decoration/Classic/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-15],"qx/decoration/Classic/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-10],"qx/decoration/Classic/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Classic/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-75],"qx/decoration/Classic/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-45],"qx/decoration/Classic/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-15],"qx/decoration/Classic/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Classic/splitpane/knob-horizontal.png":[4,15,"png","qx"],"qx/decoration/Classic/splitpane/knob-vertical.png":[15,4,"png","qx"],"qx/decoration/Classic/table-combined.png":[72,11,"png","qx"],"qx/decoration/Classic/table/ascending-invert.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-62,0],"qx/decoration/Classic/table/ascending.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-52,0],"qx/decoration/Classic/table/boolean-false.png":[11,11,"png","qx","qx/decoration/Classic/table-combined.png",-31,0],"qx/decoration/Classic/table/boolean-true.png":[11,11,"png","qx","qx/decoration/Classic/table-combined.png",-10,0],"qx/decoration/Classic/table/descending-invert.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-42,0],"qx/decoration/Classic/table/descending.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",0,0],"qx/decoration/Classic/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Classic/table-combined.png",-21,0],"qx/decoration/Classic/tree/minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/tree/plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/line.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/only_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/only_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/window-captionbar-buttons-combined.gif":[36,9,"gif","qx"],"qx/decoration/Classic/window/close.gif":[10,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",0,0],"qx/decoration/Classic/window/maximize.gif":[9,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-10,0],"qx/decoration/Classic/window/minimize.gif":[9,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-19,0],"qx/decoration/Classic/window/restore.gif":[8,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-28,0],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Oxygen/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/mimetypes/text-plain.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{"C":{},"en":{}}};
(function(){var t="toString",s=".",r="default",q="Object",p='"',o="Array",n="()",m="String",k="Function",j=".prototype",S="function",R="Boolean",Q="Error",P="constructor",O="warn",N="hasOwnProperty",M="string",L="toLocaleString",K="RegExp",J='\", "',A="info",B="BROKEN_IE",y="isPrototypeOf",z="Date",w="",x="qx.Bootstrap",u="]",v="Class",C="error",D="[Class ",F="valueOf",E="Number",H="count",G="debug",I="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return D+this.classname+u;
},createNamespace:function(name,bC){var bE=name.split(s);
var parent=window;
var bD=bE[0];

for(var i=0,bF=bE.length-1;i<bF;i++,bD=bE[i]){if(!parent[bD]){parent=parent[bD]={};
}else{parent=parent[bD];
}}parent[bD]=bC;
return bD;
},setDisplayName:function(bj,bk,name){bj.displayName=bk+s+name+n;
},setDisplayNames:function(ci,cj){for(var name in ci){var ck=ci[name];

if(ck instanceof Function){ck.displayName=cj+s+name+n;
}}},define:function(name,bR){if(!bR){var bR={statics:{}};
}var bW;
var bU=null;
qx.Bootstrap.setDisplayNames(bR.statics,name);

if(bR.members||bR.extend){qx.Bootstrap.setDisplayNames(bR.members,name+j);
bW=bR.construct||new Function;

if(bR.extend){this.extendClass(bW,bW,bR.extend,name,bV);
}var bS=bR.statics||{};
for(var i=0,bX=qx.Bootstrap.getKeys(bS),l=bX.length;i<l;i++){var bY=bX[i];
bW[bY]=bS[bY];
}bU=bW.prototype;
var bT=bR.members||{};
for(var i=0,bX=qx.Bootstrap.getKeys(bT),l=bX.length;i<l;i++){var bY=bX[i];
bU[bY]=bT[bY];
}}else{bW=bR.statics||{};
}var bV=this.createNamespace(name,bW);
bW.name=bW.classname=name;
bW.basename=bV;
bW.$$type=v;
if(!bW.hasOwnProperty(t)){bW.toString=this.genericToString;
}if(bR.defer){bR.defer(bW,bU);
}qx.Bootstrap.$$registry[name]=bR.statics;
return bW;
}};
qx.Bootstrap.define(x,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(cb,cc,cd,name,ce){var ch=cd.prototype;
var cg=new Function;
cg.prototype=ch;
var cf=new cg;
cb.prototype=cf;
cf.name=cf.classname=name;
cf.basename=ce;
cc.base=cb.superclass=cd;
cc.self=cb.constructor=cf.constructor=cb;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bh){return bh.__count__;
},"default":function(V){var length=0;

for(var W in V){length++;
}return length;
}})[(({}).__count__==0)?H:r],objectMergeWith:function(br,bs,bt){if(bt===undefined){bt=true;
}
for(var bu in bs){if(bt||br[bu]===undefined){br[bu]=bs[bu];
}}return br;
},__a:[y,N,L,t,F,P],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(d){var e=[];
var g=Object.prototype.hasOwnProperty;

for(var h in d){if(g.call(d,h)){e.push(h);
}}var f=qx.Bootstrap.__a;

for(var i=0,a=f,l=a.length;i<l;i++){if(g.call(d,a[i])){e.push(a[i]);
}}return e;
},"default":function(bw){var bx=[];
var by=Object.prototype.hasOwnProperty;

for(var bz in bw){if(by.call(bw,bz)){bx.push(bz);
}}return bx;
}})[typeof (Object.keys)==
S?I:
(function(){for(var bf in {toString:1}){return bf;
}})()!==t?B:r],getKeysAsString:function(T){var U=qx.Bootstrap.getKeys(T);

if(U.length==0){return w;
}return p+U.join(J)+p;
},__b:{"[object String]":m,"[object Array]":o,"[object Object]":q,"[object RegExp]":K,"[object Number]":E,"[object Boolean]":R,"[object Date]":z,"[object Function]":k,"[object Error]":Q},bind:function(bN,self,bO){var bP=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var ca=Array.prototype.slice.call(arguments,0,arguments.length);
return bN.apply(self,bP.concat(ca));
};
},firstUp:function(bA){return bA.charAt(0).toUpperCase()+bA.substr(1);
},firstLow:function(b){return b.charAt(0).toLowerCase()+b.substr(1);
},getClass:function(bL){var bM=Object.prototype.toString.call(bL);
return (qx.Bootstrap.__b[bM]||bM.slice(8,-1));
},isString:function(c){return (c!==null&&(typeof c===M||qx.Bootstrap.getClass(c)==m||c instanceof String||(!!c&&!!c.$$isString)));
},isArray:function(bQ){return (bQ!==null&&(bQ instanceof Array||(bQ&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bQ.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bQ)==o||(!!bQ&&!!bQ.$$isArray)));
},isObject:function(bi){return (bi!==undefined&&bi!==null&&qx.Bootstrap.getClass(bi)==q);
},isFunction:function(be){return qx.Bootstrap.getClass(be)==k;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bg,name){while(bg){if(bg.$$properties&&bg.$$properties[name]){return bg.$$properties[name];
}bg=bg.superclass;
}return null;
},hasProperty:function(bK,name){return !!qx.Bootstrap.getPropertyDefinition(bK,name);
},getEventType:function(bv,name){var bv=bv.constructor;

while(bv.superclass){if(bv.$$events&&bv.$$events[name]!==undefined){return bv.$$events[name];
}bv=bv.superclass;
}return null;
},supportsEvent:function(bB,name){return !!qx.Bootstrap.getEventType(bB,name);
},getByInterface:function(bn,bo){var bp,i,l;

while(bn){if(bn.$$implements){bp=bn.$$flatImplements;

for(i=0,l=bp.length;i<l;i++){if(bp[i]===bo){return bn;
}}}bn=bn.superclass;
}return null;
},hasInterface:function(bc,bd){return !!qx.Bootstrap.getByInterface(bc,bd);
},getMixins:function(bI){var bJ=[];

while(bI){if(bI.$$includes){bJ.push.apply(bJ,bI.$$flatIncludes);
}bI=bI.superclass;
}return bJ;
},$$logs:[],debug:function(X,Y){qx.Bootstrap.$$logs.push([G,arguments]);
},info:function(ba,bb){qx.Bootstrap.$$logs.push([A,arguments]);
},warn:function(bG,bH){qx.Bootstrap.$$logs.push([O,arguments]);
},error:function(bl,bm){qx.Bootstrap.$$logs.push([C,arguments]);
},trace:function(bq){}}});
})();
(function(){var n="qx.allowUrlSettings",m="&",l="qx.core.Setting",k="qx.allowUrlVariants",j="qx.propertyDebugLevel",h="qxsetting",g=":",f=".";
qx.Bootstrap.define(l,{statics:{__c:{},define:function(q,r){if(r===undefined){throw new Error('Default value of setting "'+q+'" must be defined!');
}
if(!this.__c[q]){this.__c[q]={};
}else if(this.__c[q].defaultValue!==undefined){throw new Error('Setting "'+q+'" is already defined!');
}this.__c[q].defaultValue=r;
},get:function(o){var p=this.__c[o];

if(p===undefined){throw new Error('Setting "'+o+'" is not defined.');
}
if(p.value!==undefined){return p.value;
}return p.defaultValue;
},set:function(d,e){if((d.split(f)).length<2){throw new Error('Malformed settings key "'+d+'". Must be following the schema "namespace.key".');
}
if(!this.__c[d]){this.__c[d]={};
}this.__c[d].value=e;
},__d:function(){if(window.qxsettings){for(var s in window.qxsettings){this.set(s,window.qxsettings[s]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(t){}this.__e();
}},__e:function(){if(this.get(n)!=true){return;
}var c=document.location.search.slice(1).split(m);

for(var i=0;i<c.length;i++){var b=c[i].split(g);

if(b.length!=3||b[0]!=h){continue;
}this.set(b[1],decodeURIComponent(b[2]));
}}},defer:function(a){a.define(n,false);
a.define(k,false);
a.define(j,0);
a.__d();
}});
})();
(function(){var t="function",s="Boolean",r="qx.Interface",q="]",p="toggle",o="Interface",n="is",m="[Interface ";
qx.Bootstrap.define(r,{statics:{define:function(name,a){if(a){if(a.extend&&!(a.extend instanceof Array)){a.extend=[a.extend];
}{};
var b=a.statics?a.statics:{};
if(a.extend){b.$$extends=a.extend;
}
if(a.properties){b.$$properties=a.properties;
}
if(a.members){b.$$members=a.members;
}
if(a.events){b.$$events=a.events;
}}else{var b={};
}b.$$type=o;
b.name=name;
b.toString=this.genericToString;
b.basename=qx.Bootstrap.createNamespace(name,b);
qx.Interface.$$registry[name]=b;
return b;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(j){if(!j){return [];
}var k=j.concat();

for(var i=0,l=j.length;i<l;i++){if(j[i].$$extends){k.push.apply(k,this.flatten(j[i].$$extends));
}}return k;
},__f:function(B,C,D,E){var I=D.$$members;

if(I){for(var H in I){if(qx.Bootstrap.isFunction(I[H])){var G=this.__g(C,H);
var F=G||qx.Bootstrap.isFunction(B[H]);

if(!F){throw new Error('Implementation of method "'+H+'" is missing in class "'+C.classname+'" required by interface "'+D.name+'"');
}var J=E===true&&!G&&!qx.Bootstrap.hasInterface(C,D);

if(J){B[H]=this.__j(D,B[H],H,I[H]);
}}else{if(typeof B[H]===undefined){if(typeof B[H]!==t){throw new Error('Implementation of member "'+H+'" is missing in class "'+C.classname+'" required by interface "'+D.name+'"');
}}}}}},__g:function(c,d){var h=d.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!h){return false;
}var e=qx.Bootstrap.firstLow(h[2]);
var f=qx.Bootstrap.getPropertyDefinition(c,e);

if(!f){return false;
}var g=h[0]==n||h[0]==p;

if(g){return qx.Bootstrap.getPropertyDefinition(c,e).check==s;
}return true;
},__h:function(u,v){if(v.$$properties){for(var w in v.$$properties){if(!qx.Bootstrap.getPropertyDefinition(u,w)){throw new Error('The property "'+w+'" is not supported by Class "'+u.classname+'"!');
}}}},__i:function(O,P){if(P.$$events){for(var Q in P.$$events){if(!qx.Bootstrap.supportsEvent(O,Q)){throw new Error('The event "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},assertObject:function(x,y){var A=x.constructor;
this.__f(x,A,y,false);
this.__h(A,y);
this.__i(A,y);
var z=y.$$extends;

if(z){for(var i=0,l=z.length;i<l;i++){this.assertObject(x,z[i]);
}}},assert:function(K,L,M){this.__f(K.prototype,K,L,M);
this.__h(K,L);
this.__i(K,L);
var N=L.$$extends;

if(N){for(var i=0,l=N.length;i<l;i++){this.assert(K,N[i],M);
}}},genericToString:function(){return m+this.name+q;
},$$registry:{},__j:function(){},__k:null,__l:function(){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,h){if(h){if(h.include&&!(h.include instanceof Array)){h.include=[h.include];
}{};
var k=h.statics?h.statics:{};
qx.Bootstrap.setDisplayNames(k,name);

for(var j in k){if(k[j] instanceof Function){k[j].$$mixin=k;
}}if(h.construct){k.$$constructor=h.construct;
qx.Bootstrap.setDisplayName(h.construct,name,e);
}
if(h.include){k.$$includes=h.include;
}
if(h.properties){k.$$properties=h.properties;
}
if(h.members){k.$$members=h.members;
qx.Bootstrap.setDisplayNames(h.members,name+f);
}
for(var j in k.$$members){if(k.$$members[j] instanceof Function){k.$$members[j].$$mixin=k;
}}
if(h.events){k.$$events=h.events;
}
if(h.destruct){k.$$destructor=h.destruct;
qx.Bootstrap.setDisplayName(h.destruct,name,b);
}}else{var k={};
}k.$$type=a;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
this.$$registry[name]=k;
return k;
},checkCompatibility:function(o){var r=this.flatten(o);
var s=r.length;

if(s<2){return true;
}var v={};
var u={};
var t={};
var q;

for(var i=0;i<s;i++){q=r[i];

for(var p in q.events){if(t[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+t[p]+'" in member "'+p+'"!');
}t[p]=q.name;
}
for(var p in q.properties){if(v[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+v[p]+'" in property "'+p+'"!');
}v[p]=q.name;
}
for(var p in q.members){if(u[p]){throw new Error('Conflict between mixin "'+q.name+'" and "'+u[p]+'" in member "'+p+'"!');
}u[p]=q.name;
}}return true;
},isCompatible:function(w,x){var y=qx.Bootstrap.getMixins(x);
y.push(w);
return qx.Mixin.checkCompatibility(y);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(m){if(!m){return [];
}var n=m.concat();

for(var i=0,l=m.length;i<l;i++){if(m[i].$$includes){n.push.apply(n,this.flatten(m[i].$$includes));
}}return n;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__m:null,__n:function(){}}});
})();
(function(){var cf=';',ce='return this.',cd="string",cc="boolean",cb="",ca="setThemed",bY='!==undefined)',bX="this.",bW="set",bV="resetThemed",bK="setRuntime",bJ="init",bI='else if(this.',bH="resetRuntime",bG="reset",bF="();",bE='else ',bD='if(this.',bC="return this.",bB="get",cm=";",cn="(a[",ck=' of an instance of ',cl="refresh",ci=' is not (yet) ready!");',cj="]);",cg='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',ch='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',co='value !== null && value.nodeType === 9 && value.documentElement',cp='value !== null && value.$$type === "Mixin"',bO='return init;',bN='var init=this.',bQ='value !== null && value.nodeType === 1 && value.attributes',bP="var parent = this.getLayoutParent();",bS="Error in property ",bR="property",bU='qx.core.Assert.assertInstance(value, Date, msg) || true',bT="if (!parent) return;",bM=" in method ",bL='qx.core.Assert.assertInstance(value, Error, msg) || true',B='Undefined value is not allowed!',C="inherit",D='Is invalid!',E="MSIE 6.0",F="': ",G=" of class ",H='value !== null && value.nodeType !== undefined',I='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',J='qx.core.Assert.assertPositiveInteger(value, msg) || true',K='if(init==qx.core.Property.$$inherit)init=null;',ct='value !== null && value.$$type === "Interface"',cs='var inherit=prop.$$inherit;',cr="var value = parent.",cq="$$useinit_",cx="(value);",cw=".",cv="$$runtime_",cu='Requires exactly one argument!',cz="$$user_",cy='qx.core.Assert.assertArray(value, msg) || true',bk='qx.core.Assert.assertPositiveNumber(value, msg) || true',bl=".prototype",bi="Boolean",bj='return value;',bo='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bp='Does not allow any arguments!',bm="()",bn="var a=arguments[0] instanceof Array?arguments[0]:arguments;",bg='value !== null && value.$$type === "Theme"',bh="())",S='return null;',R='qx.core.Assert.assertObject(value, msg) || true',U='qx.core.Assert.assertString(value, msg) || true',T="if (value===undefined) value = parent.",O='value !== null && value.$$type === "Class"',N='qx.core.Assert.assertFunction(value, msg) || true',Q="on",P="object",M="$$init_",L="$$theme_",bu='qx.core.Assert.assertMap(value, msg) || true',bv="qx.aspects",bw='qx.core.Assert.assertNumber(value, msg) || true',bx='Null value is not allowed!',bq='qx.core.Assert.assertInteger(value, msg) || true',br="value",bs="rv:1.8.1",bt="shorthand",by='qx.core.Assert.assertInstance(value, RegExp, msg) || true',bz='value !== null && value.type !== undefined',bd='value !== null && value.document',bc='throw new Error("Property ',bb="(!this.",ba='qx.core.Assert.assertBoolean(value, msg) || true',Y="toggle",X="$$inherit_",W=" with incoming value '",V="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",bf="qx.core.Property",be="is",bA='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(bf,{statics:{__o:{"Boolean":ba,"String":U,"Number":bw,"Integer":bq,"PositiveNumber":bk,"PositiveInteger":J,"Error":bL,"RegExp":by,"Object":R,"Array":cy,"Map":bu,"Function":N,"Date":bU,"Node":H,"Element":bQ,"Document":co,"Window":bd,"Event":bz,"Class":O,"Mixin":cp,"Interface":ct,"Theme":bg,"Color":cg,"Decorator":I,"Font":ch},__p:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:C,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:cd,dereference:cc,inheritable:cc,nullable:cc,themeable:cc,refine:cc,init:null,apply:cd,event:cd,check:null,transform:cd,deferredInit:cc,validate:null},$$allowedGroupKeys:{name:cd,group:P,mode:cd,themeable:cc},$$inheritable:{},__q:function(dI){var dJ=this.__r(dI);

if(!dJ.length){var dK=qx.lang.Function.empty;
}else{dK=this.__s(dJ);
}dI.prototype.$$refreshInheritables=dK;
},__r:function(cN){var cP=[];

while(cN){var cO=cN.$$properties;

if(cO){for(var name in this.$$inheritable){if(cO[name]&&cO[name].inheritable){cP.push(name);
}}}cN=cN.superclass;
}return cP;
},__s:function(dh){var dl=this.$$store.inherit;
var dk=this.$$store.init;
var dj=this.$$method.refresh;
var di=[bP,bT];

for(var i=0,l=dh.length;i<l;i++){var name=dh[i];
di.push(cr,dl[name],cm,T,dk[name],cm,bX,dj[name],cx);
}return new Function(di.join(cb));
},attachRefreshInheritables:function(dg){dg.prototype.$$refreshInheritables=function(){qx.core.Property.__q(dg);
return this.$$refreshInheritables();
};
},attachMethods:function(de,name,df){df.group?this.__t(de,df,name):this.__u(de,df,name);
},__t:function(cR,cS,name){var da=qx.Bootstrap.firstUp(name);
var cY=cR.prototype;
var db=cS.themeable===true;
{};
var dc=[];
var cV=[];

if(db){var cT=[];
var cX=[];
}var cW=bn;
dc.push(cW);

if(db){cT.push(cW);
}
if(cS.mode==bt){var cU=V;
dc.push(cU);

if(db){cT.push(cU);
}}
for(var i=0,a=cS.group,l=a.length;i<l;i++){{};
dc.push(bX,this.$$method.set[a[i]],cn,i,cj);
cV.push(bX,this.$$method.reset[a[i]],bF);

if(db){{};
cT.push(bX,this.$$method.setThemed[a[i]],cn,i,cj);
cX.push(bX,this.$$method.resetThemed[a[i]],bF);
}}this.$$method.set[name]=bW+da;
cY[this.$$method.set[name]]=new Function(dc.join(cb));
this.$$method.reset[name]=bG+da;
cY[this.$$method.reset[name]]=new Function(cV.join(cb));

if(db){this.$$method.setThemed[name]=ca+da;
cY[this.$$method.setThemed[name]]=new Function(cT.join(cb));
this.$$method.resetThemed[name]=bV+da;
cY[this.$$method.resetThemed[name]]=new Function(cX.join(cb));
}},__u:function(dL,dM,name){var dO=qx.Bootstrap.firstUp(name);
var dQ=dL.prototype;
{};
if(dM.dereference===undefined&&typeof dM.check===cd){dM.dereference=this.__v(dM.check);
}var dP=this.$$method;
var dN=this.$$store;
dN.runtime[name]=cv+name;
dN.user[name]=cz+name;
dN.theme[name]=L+name;
dN.init[name]=M+name;
dN.inherit[name]=X+name;
dN.useinit[name]=cq+name;
dP.get[name]=bB+dO;
dQ[dP.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,dL,name,bB);
};
dP.set[name]=bW+dO;
dQ[dP.set[name]]=function(cB){return qx.core.Property.executeOptimizedSetter(this,dL,name,bW,arguments);
};
dP.reset[name]=bG+dO;
dQ[dP.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,dL,name,bG);
};

if(dM.inheritable||dM.apply||dM.event||dM.deferredInit){dP.init[name]=bJ+dO;
dQ[dP.init[name]]=function(dd){return qx.core.Property.executeOptimizedSetter(this,dL,name,bJ,arguments);
};
}
if(dM.inheritable){dP.refresh[name]=cl+dO;
dQ[dP.refresh[name]]=function(A){return qx.core.Property.executeOptimizedSetter(this,dL,name,cl,arguments);
};
}dP.setRuntime[name]=bK+dO;
dQ[dP.setRuntime[name]]=function(cA){return qx.core.Property.executeOptimizedSetter(this,dL,name,bK,arguments);
};
dP.resetRuntime[name]=bH+dO;
dQ[dP.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,dL,name,bH);
};

if(dM.themeable){dP.setThemed[name]=ca+dO;
dQ[dP.setThemed[name]]=function(cC){return qx.core.Property.executeOptimizedSetter(this,dL,name,ca,arguments);
};
dP.resetThemed[name]=bV+dO;
dQ[dP.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,dL,name,bV);
};
}
if(dM.check===bi){dQ[Y+dO]=new Function(bC+dP.set[name]+bb+dP.get[name]+bh);
dQ[be+dO]=new Function(bC+dP.get[name]+bm);
}},__v:function(o){return !!this.__p[o];
},__w:function(j){return this.__p[j]||qx.Bootstrap.classIsDefined(j)||(qx.Interface&&qx.Interface.isDefined(j));
},__x:{0:bA,1:cu,2:B,3:bp,4:bx,5:D},error:function(b,c,d,e,f){var g=b.constructor.classname;
var h=bS+d+G+g+bM+this.$$method[e][d]+W+f+F;
throw new Error(h+(this.__x[c]||"Unknown reason: "+c));
},__y:function(dR,dS,name,dT,dU,dV){var dW=this.$$method[dT][name];
{dS[dW]=new Function(br,dU.join(cb));
};
if(qx.core.Variant.isSet(bv,Q)){dS[dW]=qx.core.Aspect.wrap(dR.classname+cw+dW,dS[dW],bR);
}qx.Bootstrap.setDisplayName(dS[dW],dR.classname+bl,dW);
if(dV===undefined){return dR[dW]();
}else{return dR[dW](dV[0]);
}},executeOptimizedGetter:function(dp,dq,name,dr){var dt=dq.$$properties[name];
var dv=dq.prototype;
var ds=[];
var du=this.$$store;
ds.push(bD,du.runtime[name],bY);
ds.push(ce,du.runtime[name],cf);

if(dt.inheritable){ds.push(bI,du.inherit[name],bY);
ds.push(ce,du.inherit[name],cf);
ds.push(bE);
}ds.push(bD,du.user[name],bY);
ds.push(ce,du.user[name],cf);

if(dt.themeable){ds.push(bI,du.theme[name],bY);
ds.push(ce,du.theme[name],cf);
}
if(dt.deferredInit&&dt.init===undefined){ds.push(bI,du.init[name],bY);
ds.push(ce,du.init[name],cf);
}ds.push(bE);

if(dt.init!==undefined){if(dt.inheritable){ds.push(bN,du.init[name],cf);

if(dt.nullable){ds.push(K);
}else if(dt.init!==undefined){ds.push(ce,du.init[name],cf);
}else{ds.push(bo,name,ck,dq.classname,ci);
}ds.push(bO);
}else{ds.push(ce,du.init[name],cf);
}}else if(dt.inheritable||dt.nullable){ds.push(S);
}else{ds.push(bc,name,ck,dq.classname,ci);
}return this.__y(dp,dv,name,dr,ds);
},executeOptimizedSetter:function(dw,dx,name,dy,dz){var dE=dx.$$properties[name];
var dD=dx.prototype;
var dB=[];
var dA=dy===bW||dy===ca||dy===bK||(dy===bJ&&dE.init===undefined);
var dC=dE.apply||dE.event||dE.inheritable;
var dF=this.__z(dy,name);
this.__A(dB,dE,name,dy,dA);

if(dA){this.__B(dB,dx,dE,name);
}
if(dC){this.__C(dB,dA,dF,dy);
}
if(dE.inheritable){dB.push(cs);
}{};

if(!dC){this.__E(dB,name,dy,dA);
}else{this.__F(dB,dE,name,dy,dA);
}
if(dE.inheritable){this.__G(dB,dE,name,dy);
}else if(dC){this.__H(dB,dE,name,dy);
}
if(dC){this.__I(dB,dE,name);
if(dE.inheritable&&dD._getChildren){this.__J(dB,name);
}}if(dA){dB.push(bj);
}return this.__y(dw,dD,name,dy,dB,dz);
},__z:function(dG,name){if(dG===bK||dG===bH){var dH=this.$$store.runtime[name];
}else if(dG===ca||dG===bV){dH=this.$$store.theme[name];
}else if(dG===bJ){dH=this.$$store.init[name];
}else{dH=this.$$store.user[name];
}return dH;
},__A:function(dX,dY,name,ea,eb){{if(!dY.nullable||dY.check||dY.inheritable){dX.push('var prop=qx.core.Property;');
}if(ea==="set"){dX.push('if(value===undefined)prop.error(this,2,"',name,'","',ea,'",value);');
}};
},__B:function(cH,cI,cJ,name){if(cJ.transform){cH.push('value=this.',cJ.transform,'(value);');
}if(cJ.validate){if(typeof cJ.validate==="string"){cH.push('this.',cJ.validate,'(value);');
}else if(cJ.validate instanceof Function){cH.push(cI.classname,'.$$properties.',name);
cH.push('.validate.call(this, value);');
}}},__C:function(s,t,u,v){var w=(v==="reset"||v==="resetThemed"||v==="resetRuntime");

if(t){s.push('if(this.',u,'===value)return value;');
}else if(w){s.push('if(this.',u,'===undefined)return;');
}},__D:undefined,__E:function(x,name,y,z){if(y==="setRuntime"){x.push('this.',this.$$store.runtime[name],'=value;');
}else if(y==="resetRuntime"){x.push('if(this.',this.$$store.runtime[name],'!==undefined)');
x.push('delete this.',this.$$store.runtime[name],';');
}else if(y==="set"){x.push('this.',this.$$store.user[name],'=value;');
}else if(y==="reset"){x.push('if(this.',this.$$store.user[name],'!==undefined)');
x.push('delete this.',this.$$store.user[name],';');
}else if(y==="setThemed"){x.push('this.',this.$$store.theme[name],'=value;');
}else if(y==="resetThemed"){x.push('if(this.',this.$$store.theme[name],'!==undefined)');
x.push('delete this.',this.$$store.theme[name],';');
}else if(y==="init"&&z){x.push('this.',this.$$store.init[name],'=value;');
}},__F:function(cD,cE,name,cF,cG){if(cE.inheritable){cD.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{cD.push('var computed, old;');
}cD.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(cF==="setRuntime"){cD.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cF==="resetRuntime"){cD.push('delete this.',this.$$store.runtime[name],';');
cD.push('if(this.',this.$$store.user[name],'!==undefined)');
cD.push('computed=this.',this.$$store.user[name],';');
cD.push('else if(this.',this.$$store.theme[name],'!==undefined)');
cD.push('computed=this.',this.$$store.theme[name],';');
cD.push('else if(this.',this.$$store.init[name],'!==undefined){');
cD.push('computed=this.',this.$$store.init[name],';');
cD.push('this.',this.$$store.useinit[name],'=true;');
cD.push('}');
}else{cD.push('old=computed=this.',this.$$store.runtime[name],';');
if(cF==="set"){cD.push('this.',this.$$store.user[name],'=value;');
}else if(cF==="reset"){cD.push('delete this.',this.$$store.user[name],';');
}else if(cF==="setThemed"){cD.push('this.',this.$$store.theme[name],'=value;');
}else if(cF==="resetThemed"){cD.push('delete this.',this.$$store.theme[name],';');
}else if(cF==="init"&&cG){cD.push('this.',this.$$store.init[name],'=value;');
}}cD.push('}');
cD.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(cF==="set"){if(!cE.inheritable){cD.push('old=this.',this.$$store.user[name],';');
}cD.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cF==="reset"){if(!cE.inheritable){cD.push('old=this.',this.$$store.user[name],';');
}cD.push('delete this.',this.$$store.user[name],';');
cD.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cD.push('computed=this.',this.$$store.runtime[name],';');
cD.push('if(this.',this.$$store.theme[name],'!==undefined)');
cD.push('computed=this.',this.$$store.theme[name],';');
cD.push('else if(this.',this.$$store.init[name],'!==undefined){');
cD.push('computed=this.',this.$$store.init[name],';');
cD.push('this.',this.$$store.useinit[name],'=true;');
cD.push('}');
}else{if(cF==="setRuntime"){cD.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cE.inheritable){cD.push('computed=this.',this.$$store.user[name],';');
}else{cD.push('old=computed=this.',this.$$store.user[name],';');
}if(cF==="setThemed"){cD.push('this.',this.$$store.theme[name],'=value;');
}else if(cF==="resetThemed"){cD.push('delete this.',this.$$store.theme[name],';');
}else if(cF==="init"&&cG){cD.push('this.',this.$$store.init[name],'=value;');
}}cD.push('}');
if(cE.themeable){cD.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!cE.inheritable){cD.push('old=this.',this.$$store.theme[name],';');
}
if(cF==="setRuntime"){cD.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cF==="set"){cD.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cF==="setThemed"){cD.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cF==="resetThemed"){cD.push('delete this.',this.$$store.theme[name],';');
cD.push('if(this.',this.$$store.init[name],'!==undefined){');
cD.push('computed=this.',this.$$store.init[name],';');
cD.push('this.',this.$$store.useinit[name],'=true;');
cD.push('}');
}else if(cF==="init"){if(cG){cD.push('this.',this.$$store.init[name],'=value;');
}cD.push('computed=this.',this.$$store.theme[name],';');
}else if(cF==="refresh"){cD.push('computed=this.',this.$$store.theme[name],';');
}cD.push('}');
}cD.push('else if(this.',this.$$store.useinit[name],'){');

if(!cE.inheritable){cD.push('old=this.',this.$$store.init[name],';');
}
if(cF==="init"){if(cG){cD.push('computed=this.',this.$$store.init[name],'=value;');
}else{cD.push('computed=this.',this.$$store.init[name],';');
}}else if(cF==="set"||cF==="setRuntime"||cF==="setThemed"||cF==="refresh"){cD.push('delete this.',this.$$store.useinit[name],';');

if(cF==="setRuntime"){cD.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cF==="set"){cD.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cF==="setThemed"){cD.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cF==="refresh"){cD.push('computed=this.',this.$$store.init[name],';');
}}cD.push('}');
if(cF==="set"||cF==="setRuntime"||cF==="setThemed"||cF==="init"){cD.push('else{');

if(cF==="setRuntime"){cD.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cF==="set"){cD.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cF==="setThemed"){cD.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cF==="init"){if(cG){cD.push('computed=this.',this.$$store.init[name],'=value;');
}else{cD.push('computed=this.',this.$$store.init[name],';');
}cD.push('this.',this.$$store.useinit[name],'=true;');
}cD.push('}');
}},__G:function(p,q,name,r){p.push('if(computed===undefined||computed===inherit){');

if(r==="refresh"){p.push('computed=value;');
}else{p.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}p.push('if((computed===undefined||computed===inherit)&&');
p.push('this.',this.$$store.init[name],'!==undefined&&');
p.push('this.',this.$$store.init[name],'!==inherit){');
p.push('computed=this.',this.$$store.init[name],';');
p.push('this.',this.$$store.useinit[name],'=true;');
p.push('}else{');
p.push('delete this.',this.$$store.useinit[name],';}');
p.push('}');
p.push('if(old===computed)return value;');
p.push('if(computed===inherit){');
p.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
p.push('}');
p.push('else if(computed===undefined)');
p.push('delete this.',this.$$store.inherit[name],';');
p.push('else this.',this.$$store.inherit[name],'=computed;');
p.push('var backup=computed;');
if(q.init!==undefined&&r!=="init"){p.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{p.push('if(old===undefined)old=null;');
}p.push('if(computed===undefined||computed==inherit)computed=null;');
},__H:function(cK,cL,name,cM){if(cM!=="set"&&cM!=="setRuntime"&&cM!=="setThemed"){cK.push('if(computed===undefined)computed=null;');
}cK.push('if(old===computed)return value;');
if(cL.init!==undefined&&cM!=="init"){cK.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{cK.push('if(old===undefined)old=null;');
}},__I:function(dm,dn,name){if(dn.apply){dm.push('this.',dn.apply,'(computed, old, "',name,'");');
}if(dn.event){dm.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dn.event,"')){","reg.fireEvent(this, '",dn.event,"', qx.event.type.Data, [computed, old]",")}");
}},__J:function(cQ,name){cQ.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
cQ.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
cQ.push('}');
}},defer:function(k){var n=navigator.userAgent.indexOf(E)!=-1;
var m=navigator.userAgent.indexOf(bs)!=-1;
if(n||m){k.__v=k.__w;
}}});
})();
(function(){var m="emulated",k="native",j='"',h="qx.lang.Core",g="\\\\",f="\\\"",e="[object Error]";
qx.Bootstrap.define(h,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==e)?m:k],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(p,q){if(q==null){q=0;
}else if(q<0){q=Math.max(0,this.length+q);
}
for(var i=q;i<this.length;i++){if(this[i]===p){return i;
}}return -1;
}}[Array.prototype.indexOf?k:m],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(n,o){if(o==null){o=this.length-1;
}else if(o<0){o=Math.max(0,this.length+o);
}
for(var i=o;i>=0;i--){if(this[i]===n){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?k:m],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){B.call(C||window,D,i,this);
}}}}[Array.prototype.forEach?k:m],arrayFilter:{"native":Array.prototype.filter,"emulated":function(r,s){var t=[];
var l=this.length;

for(var i=0;i<l;i++){var u=this[i];

if(u!==undefined){if(r.call(s||window,u,i,this)){t.push(this[i]);
}}}return t;
}}[Array.prototype.filter?k:m],arrayMap:{"native":Array.prototype.map,"emulated":function(a,b){var c=[];
var l=this.length;

for(var i=0;i<l;i++){var d=this[i];

if(d!==undefined){c[i]=a.call(b||window,d,i,this);
}}return c;
}}[Array.prototype.map?k:m],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?k:m],arrayEvery:{"native":Array.prototype.every,"emulated":function(v,w){var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){if(!v.call(w||window,x,i,this)){return false;
}}}return true;
}}[Array.prototype.every?k:m],stringQuote:{"native":String.prototype.quote,"emulated":function(){return j+this.replace(/\\/g,g).replace(/\"/g,f)+j;
}}[String.prototype.quote?k:m]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__K:function(){var b="unknown";
var f="0.0.0";
var e=window.navigator.userAgent;
var h=false;
var d=false;

if(window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]"){b="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(e)){f=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){f+="."+RegExp.$3;
}}else{d=true;
f="9.6.0";
}}else if(window.navigator.userAgent.indexOf("AppleWebKit/")!=-1){b="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(e)){f=RegExp.$1;
var g=RegExp("[^\\.0-9]").exec(f);

if(g){f=f.slice(0,g.index);
}}else{d=true;
f="525.26";
}}else if(window.controllers&&window.navigator.product==="Gecko"){b="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(e)){f=RegExp.$1;
}else{d=true;
f="1.9.0.0";
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(e)){b="mshtml";
f=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(f<8&&/Trident\/([^\);]+)(\)|;)/.test(e)){if(RegExp.$1==="4.0"){f="8.0";
}}this.MSHTML=true;
}else{var c=window.qxFail;

if(c&&typeof c==="function"){var b=c();

if(b.NAME&&b.FULLVERSION){b=b.NAME;
this[b.toUpperCase()]=true;
f=b.FULLVERSION;
}}else{h=true;
d=true;
f="1.9.0.0";
b="gecko";
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+e+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=h;
this.UNKNOWN_VERSION=d;
this.NAME=b;
this.FULLVERSION=f;
this.VERSION=parseFloat(f);
}},defer:function(i){i.__K();
}});
})();
(function(){var s="on",r="off",q="|",p="default",o="gecko",n="qx.aspects",m="$",k="qx.debug",j="qx.dynlocale",h="webkit",e="opera",g="qx.client",f="qx.core.Variant",d="mshtml";
qx.Bootstrap.define(f,{statics:{__L:{},__M:{},compilerIsSet:function(){return true;
},define:function(a,b,c){{};

if(!this.__L[a]){this.__L[a]={};
}else{}this.__L[a].allowedValues=b;
this.__L[a].defaultValue=c;
},get:function(t){var u=this.__L[t];
{};

if(u.value!==undefined){return u.value;
}return u.defaultValue;
},__N:function(){if(window.qxvariants){for(var K in qxvariants){{};

if(!this.__L[K]){this.__L[K]={};
}this.__L[K].value=qxvariants[K];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(z){}this.__O(this.__L);
}},__O:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var w=document.location.search.slice(1).split("&");

for(var i=0;i<w.length;i++){var x=w[i].split(":");

if(x.length!=3||x[0]!="qxvariant"){continue;
}var y=x[1];

if(!this.__L[y]){this.__L[y]={};
}this.__L[y].value=decodeURIComponent(x[2]);
}},select:function(H,I){{};

for(var J in I){if(this.isSet(H,J)){return I[J];
}}
if(I[p]!==undefined){return I[p];
}{};
},isSet:function(A,B){var C=A+m+B;

if(this.__M[C]!==undefined){return this.__M[C];
}var E=false;
if(B.indexOf(q)<0){E=this.get(A)===B;
}else{var D=B.split(q);

for(var i=0,l=D.length;i<l;i++){if(this.get(A)===D[i]){E=true;
break;
}}}this.__M[C]=E;
return E;
},__P:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},__Q:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},__R:function(F,G){for(var i=0,l=F.length;i<l;i++){if(F[i]==G){return true;
}}return false;
}},defer:function(L){L.define(g,[o,d,e,h],qx.bom.client.Engine.NAME);
L.define(k,[s,r],s);
L.define(n,[s,r],r);
L.define(j,[s,r],s);
L.__N();
}});
})();
(function(){var e="qx.core.Aspect",d="before",c="*",b="static";
qx.Bootstrap.define(e,{statics:{__S:[],wrap:function(f,g,h){var n=[];
var j=[];
var m=this.__S;
var l;

for(var i=0;i<m.length;i++){l=m[i];

if((l.type==null||h==l.type||l.type==c)&&(l.name==null||f.match(l.name))){l.pos==-1?n.push(l.fcn):j.push(l.fcn);
}}
if(n.length===0&&j.length===0){return g;
}var k=function(){for(var i=0;i<n.length;i++){n[i].call(this,f,g,h,arguments);
}var a=g.apply(this,arguments);

for(var i=0;i<j.length;i++){j[i].call(this,f,g,h,arguments,a);
}return a;
};

if(h!==b){k.self=g.self;
k.base=g.base;
}g.wrapper=k;
k.original=g;
return k;
},addAdvice:function(o,p,q,name){this.__S.push({fcn:o,pos:p===d?-1:1,type:q,name:name});
}}});
})();
(function(){var s="qx.aspects",r="on",q=".",p="static",o="[Class ",n="]",m="$$init_",k="constructor",j="member",h=".prototype",e="extend",g="qx.Class",f="qx.event.type.Data";
qx.Bootstrap.define(g,{statics:{define:function(name,cf){if(!cf){var cf={};
}if(cf.include&&!(cf.include instanceof Array)){cf.include=[cf.include];
}if(cf.implement&&!(cf.implement instanceof Array)){cf.implement=[cf.implement];
}var cg=false;

if(!cf.hasOwnProperty(e)&&!cf.type){cf.type=p;
cg=true;
}{};
var ch=this.__X(name,cf.type,cf.extend,cf.statics,cf.construct,cf.destruct,cf.include);
if(cf.extend){if(cf.properties){this.__ba(ch,cf.properties,true);
}if(cf.members){this.__bc(ch,cf.members,true,true,false);
}if(cf.events){this.__Y(ch,cf.events,true);
}if(cf.include){for(var i=0,l=cf.include.length;i<l;i++){this.__bg(ch,cf.include[i],false);
}}}if(cf.settings){for(var ci in cf.settings){qx.core.Setting.define(ci,cf.settings[ci]);
}}if(cf.variants){for(var ci in cf.variants){qx.core.Variant.define(ci,cf.variants[ci].allowedValues,cf.variants[ci].defaultValue);
}}if(cf.implement){for(var i=0,l=cf.implement.length;i<l;i++){this.__be(ch,cf.implement[i]);
}}{};
if(cf.defer){cf.defer.self=ch;
cf.defer(ch,ch.prototype,{add:function(name,bv){var bw={};
bw[name]=bv;
qx.Class.__ba(ch,bw,true);
}});
}return ch;
},undefine:function(name){delete this.$$registry[name];
var E=name.split(q);
var G=[window];

for(var i=0;i<E.length;i++){G.push(G[i][E[i]]);
}for(var i=G.length-1;i>=1;i--){var F=G[i];
var parent=G[i-1];

if(qx.Bootstrap.isFunction(F)||qx.Bootstrap.objectGetLength(F)===0){delete parent[E[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(bJ,bK){{};
qx.Class.__bg(bJ,bK,false);
},patch:function(C,D){{};
qx.Class.__bg(C,D,true);
},isSubClassOf:function(z,A){if(!z){return false;
}
if(z==A){return true;
}
if(z.prototype instanceof A){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(K){var L=[];

while(K){if(K.$$properties){L.push.apply(L,qx.Bootstrap.getKeys(K.$$properties));
}K=K.superclass;
}return L;
},getByProperty:function(M,name){while(M){if(M.$$properties&&M.$$properties[name]){return M;
}M=M.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(bl,bm){return bl.$$includes&&bl.$$includes.indexOf(bm)!==-1;
},getByMixin:function(N,O){var P,i,l;

while(N){if(N.$$includes){P=N.$$flatIncludes;

for(i=0,l=P.length;i<l;i++){if(P[i]===O){return N;
}}}N=N.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(Q,R){return !!this.getByMixin(Q,R);
},hasOwnInterface:function(bY,ca){return bY.$$implements&&bY.$$implements.indexOf(ca)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(T){var U=[];

while(T){if(T.$$implements){U.push.apply(U,T.$$flatImplements);
}T=T.superclass;
}return U;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(b,c){var d=b.constructor;

if(this.hasInterface(d,c)){return true;
}
try{qx.Interface.assertObject(b,c);
return true;
}catch(S){}
try{qx.Interface.assert(d,c,false);
return true;
}catch(B){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return o+this.classname+n;
},$$registry:qx.Bootstrap.$$registry,__T:null,__U:null,__V:function(){},__W:function(){},__X:function(name,V,W,X,Y,ba,bb){var be;

if(!W&&qx.core.Variant.isSet("qx.aspects","off")){be=X||{};
qx.Bootstrap.setDisplayNames(be,name);
}else{var be={};

if(W){if(!Y){Y=this.__bh();
}
if(this.__bj(W,bb)){be=this.__bk(Y,name,V);
}else{be=Y;
}if(V==="singleton"){be.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(Y,name,"constructor");
}if(X){qx.Bootstrap.setDisplayNames(X,name);
var bf;

for(var i=0,a=qx.Bootstrap.getKeys(X),l=a.length;i<l;i++){bf=a[i];
var bc=X[bf];

if(qx.core.Variant.isSet("qx.aspects","on")){if(bc instanceof Function){bc=qx.core.Aspect.wrap(name+"."+bf,bc,"static");
}be[bf]=bc;
}else{be[bf]=bc;
}}}}var bd=qx.Bootstrap.createNamespace(name,be);
be.name=be.classname=name;
be.basename=bd;
be.$$type="Class";

if(V){be.$$classtype=V;
}if(!be.hasOwnProperty("toString")){be.toString=this.genericToString;
}
if(W){qx.Bootstrap.extendClass(be,Y,W,name,bd);
if(ba){if(qx.core.Variant.isSet("qx.aspects","on")){ba=qx.core.Aspect.wrap(name,ba,"destructor");
}be.$$destructor=ba;
qx.Bootstrap.setDisplayName(ba,name,"destruct");
}}this.$$registry[name]=be;
return be;
},__Y:function(bR,bS,bT){var bU,bU;
{};

if(bR.$$events){for(var bU in bS){bR.$$events[bU]=bS[bU];
}}else{bR.$$events=bS;
}},__ba:function(bg,bh,bi){var bj;

if(bi===undefined){bi=false;
}var bk=bg.prototype;

for(var name in bh){bj=bh[name];
{};
bj.name=name;
if(!bj.refine){if(bg.$$properties===undefined){bg.$$properties={};
}bg.$$properties[name]=bj;
}if(bj.init!==undefined){bg.prototype[m+name]=bj.init;
}if(bj.event!==undefined){var event={};
event[bj.event]=f;
this.__Y(bg,event,bi);
}if(bj.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bk.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bg);
}}
if(!bj.refine){qx.core.Property.attachMethods(bg,name,bj);
}}},__bb:null,__bc:function(bx,by,bz,bA,bB){var bC=bx.prototype;
var bE,bD;
qx.Bootstrap.setDisplayNames(by,bx.classname+h);

for(var i=0,a=qx.Bootstrap.getKeys(by),l=a.length;i<l;i++){bE=a[i];
bD=by[bE];
{};
if(bA!==false&&bD instanceof Function&&bD.$$type==null){if(bB==true){bD=this.__bd(bD,bC[bE]);
}else{if(bC[bE]){bD.base=bC[bE];
}bD.self=bx;
}
if(qx.core.Variant.isSet(s,r)){bD=qx.core.Aspect.wrap(bx.classname+q+bE,bD,j);
}}bC[bE]=bD;
}},__bd:function(I,J){if(J){return function(){var bu=I.base;
I.base=J;
var bt=I.apply(this,arguments);
I.base=bu;
return bt;
};
}else{return I;
}},__be:function(bV,bW){{};
var bX=qx.Interface.flatten([bW]);

if(bV.$$implements){bV.$$implements.push(bW);
bV.$$flatImplements.push.apply(bV.$$flatImplements,bX);
}else{bV.$$implements=[bW];
bV.$$flatImplements=bX;
}},__bf:function(t){var name=t.classname;
var u=this.__bk(t,name,t.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(t),l=a.length;i<l;i++){v=a[i];
u[v]=t[v];
}u.prototype=t.prototype;
var x=t.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(x),l=a.length;i<l;i++){v=a[i];
var y=x[v];
if(y&&y.self==t){y.self=u;
}}for(var v in this.$$registry){var w=this.$$registry[v];

if(!w){continue;
}
if(w.base==t){w.base=u;
}
if(w.superclass==t){w.superclass=u;
}
if(w.$$original){if(w.$$original.base==t){w.$$original.base=u;
}
if(w.$$original.superclass==t){w.$$original.superclass=u;
}}}qx.Bootstrap.createNamespace(name,u);
this.$$registry[name]=u;
return u;
},__bg:function(bn,bo,bp){{};

if(this.hasMixin(bn,bo)){return;
}var bs=bn.$$original;

if(bo.$$constructor&&!bs){bn=this.__bf(bn);
}var br=qx.Mixin.flatten([bo]);
var bq;

for(var i=0,l=br.length;i<l;i++){bq=br[i];
if(bq.$$events){this.__Y(bn,bq.$$events,bp);
}if(bq.$$properties){this.__ba(bn,bq.$$properties,bp);
}if(bq.$$members){this.__bc(bn,bq.$$members,bp,bp,bp);
}}if(bn.$$includes){bn.$$includes.push(bo);
bn.$$flatIncludes.push.apply(bn.$$flatIncludes,br);
}else{bn.$$includes=[bo];
bn.$$flatIncludes=br;
}},__bh:function(){function H(){H.base.apply(this,arguments);
}return H;
},__bi:function(){return function(){};
},__bj:function(bF,bG){{};
if(bF&&bF.$$includes){var bH=bF.$$flatIncludes;

for(var i=0,l=bH.length;i<l;i++){if(bH[i].$$constructor){return true;
}}}if(bG){var bI=qx.Mixin.flatten(bG);

for(var i=0,l=bI.length;i<l;i++){if(bI[i].$$constructor){return true;
}}}return false;
},__bk:function(cb,name,cc){var ce=function(){var bQ=ce;
{};
var bP=bQ.$$original.apply(this,arguments);
if(bQ.$$includes){var bO=bQ.$$flatIncludes;

for(var i=0,l=bO.length;i<l;i++){if(bO[i].$$constructor){bO[i].$$constructor.apply(this,arguments);
}}}{};
return bP;
};

if(qx.core.Variant.isSet(s,r)){var cd=qx.core.Aspect.wrap(name,ce,k);
ce.$$original=cb;
ce.constructor=cd;
ce=cd;
}ce.$$original=cb;
cb.wrapper=ce;
return ce;
}},defer:function(){if(qx.core.Variant.isSet(s,r)){for(var bL in qx.Bootstrap.$$registry){var bM=qx.Bootstrap.$$registry[bL];

for(var bN in bM){if(bM[bN] instanceof Function){bM[bN]=qx.core.Aspect.wrap(bL+q+bN,bM[bN],p);
}}}}}});
})();
(function(){var k="qx.client",j="on",i="function",h="mousedown",g="qx.bom.Event",f="return;",d="mouseover",c="HTMLEvents";
qx.Class.define(g,{statics:{addNativeListener:qx.core.Variant.select(k,{"mshtml":function(v,w,x){v.attachEvent(j+w,x);
},"default":function(l,m,n){l.addEventListener(m,n,false);
}}),removeNativeListener:qx.core.Variant.select(k,{"mshtml":function(o,p,q){try{o.detachEvent(j+p,q);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(y,z,A){y.removeEventListener(z,A,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(k,{"mshtml":function(e){if(e.type===d){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(k,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==h&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(a){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(b){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(D,E){if(document.createEventObject){var F=document.createEventObject();
return D.fireEvent(j+E,F);
}else{var F=document.createEvent(c);
F.initEvent(E,true,true);
return !D.dispatchEvent(F);
}},supportsEvent:qx.core.Variant.select(k,{"webkit":function(B,C){return B.hasOwnProperty(j+C);
},"default":function(r,s){var t=j+s;
var u=(t in r);

if(!u){u=typeof r[t]==i;

if(!u&&r.setAttribute){r.setAttribute(t,f);
u=typeof r[t]==i;
r.removeAttribute(t);
}}return u;
}})}});
})();
(function(){var X="|bubble",W="|capture",V="|",U="",T="_",S="unload",R="UNKNOWN_",Q="__bq",P="c",O="DOM_",L="WIN_",N="__bp",M="capture",K="qx.event.Manager",J="QX_";
qx.Class.define(K,{extend:Object,construct:function(n,o){this.__bl=n;
this.__bm=qx.core.ObjectRegistry.toHashCode(n);
this.__bn=o;
if(n.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(n,S,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(n,S,arguments.callee);
self.dispose();
}));
}this.__bo={};
this.__bp={};
this.__bq={};
this.__br={};
},statics:{__bs:0,getNextUniqueId:function(){return (this.__bs++)+U;
}},members:{__bn:null,__bo:null,__bq:null,__bt:null,__bp:null,__br:null,__bl:null,__bm:null,getWindow:function(){return this.__bl;
},getWindowId:function(){return this.__bm;
},getHandler:function(H){var I=this.__bp[H.classname];

if(I){return I;
}return this.__bp[H.classname]=new H(this);
},getDispatcher:function(F){var G=this.__bq[F.classname];

if(G){return G;
}return this.__bq[F.classname]=new F(this,this.__bn);
},getListeners:function(cv,cw,cx){var cy=cv.$$hash||qx.core.ObjectRegistry.toHashCode(cv);
var cA=this.__bo[cy];

if(!cA){return null;
}var cB=cw+(cx?W:X);
var cz=cA[cB];
return cz?cz.concat():null;
},serializeListeners:function(bP){var bW=bP.$$hash||qx.core.ObjectRegistry.toHashCode(bP);
var bY=this.__bo[bW];
var bU=[];

if(bY){var bS,bX,bQ,bT,bV;

for(var bR in bY){bS=bR.indexOf(V);
bX=bR.substring(0,bS);
bQ=bR.charAt(bS+1)==P;
bT=bY[bR];

for(var i=0,l=bT.length;i<l;i++){bV=bT[i];
bU.push({self:bV.context,handler:bV.handler,type:bX,capture:bQ});
}}}return bU;
},toggleAttachedEvents:function(w,x){var C=w.$$hash||qx.core.ObjectRegistry.toHashCode(w);
var E=this.__bo[C];

if(E){var z,D,y,A;

for(var B in E){z=B.indexOf(V);
D=B.substring(0,z);
y=B.charCodeAt(z+1)===99;
A=E[B];

if(x){this.__bu(w,D,y);
}else{this.__bv(w,D,y);
}}}},hasListener:function(bx,by,bz){{};
var bA=bx.$$hash||qx.core.ObjectRegistry.toHashCode(bx);
var bC=this.__bo[bA];

if(!bC){return false;
}var bD=by+(bz?W:X);
var bB=bC[bD];
return bB&&bB.length>0;
},importListeners:function(cm,cn){{};
var ct=cm.$$hash||qx.core.ObjectRegistry.toHashCode(cm);
var cu=this.__bo[ct]={};
var cq=qx.event.Manager;

for(var co in cn){var cr=cn[co];
var cs=cr.type+(cr.capture?W:X);
var cp=cu[cs];

if(!cp){cp=cu[cs]=[];
this.__bu(cm,cr.type,cr.capture);
}cp.push({handler:cr.listener,context:cr.self,unique:cr.unique||(cq.__bs++)+U});
}},addListener:function(Y,ba,bb,self,bc){var bg;
{};
var bh=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);
var bj=this.__bo[bh];

if(!bj){bj=this.__bo[bh]={};
}var bf=ba+(bc?W:X);
var be=bj[bf];

if(!be){be=bj[bf]=[];
}if(be.length===0){this.__bu(Y,ba,bc);
}var bi=(qx.event.Manager.__bs++)+U;
var bd={handler:bb,context:self,unique:bi};
be.push(bd);
return bf+V+bi;
},findHandler:function(bk,bl){var bv=false,bo=false,bw=false;
var bu;

if(bk.nodeType===1){bv=true;
bu=O+bk.tagName.toLowerCase()+T+bl;
}else if(bk==this.__bl){bo=true;
bu=L+bl;
}else if(bk.classname){bw=true;
bu=J+bk.classname+T+bl;
}else{bu=R+bk+T+bl;
}var bq=this.__br;

if(bq[bu]){return bq[bu];
}var bt=this.__bn.getHandlers();
var bp=qx.event.IEventHandler;
var br,bs,bn,bm;

for(var i=0,l=bt.length;i<l;i++){br=bt[i];
bn=br.SUPPORTED_TYPES;

if(bn&&!bn[bl]){continue;
}bm=br.TARGET_CHECK;

if(bm){if(!bv&&bm===bp.TARGET_DOMNODE){continue;
}else if(!bo&&bm===bp.TARGET_WINDOW){continue;
}else if(!bw&&bm===bp.TARGET_OBJECT){continue;
}}bs=this.getHandler(bt[i]);

if(br.IGNORE_CAN_HANDLE||bs.canHandleEvent(bk,bl)){bq[bu]=bs;
return bs;
}}return null;
},__bu:function(cC,cD,cE){var cF=this.findHandler(cC,cD);

if(cF){cF.registerEvent(cC,cD,cE);
return;
}{};
},removeListener:function(bE,bF,bG,self,bH){var bL;
{};
var bM=bE.$$hash||qx.core.ObjectRegistry.toHashCode(bE);
var bN=this.__bo[bM];

if(!bN){return false;
}var bI=bF+(bH?W:X);
var bJ=bN[bI];

if(!bJ){return false;
}var bK;

for(var i=0,l=bJ.length;i<l;i++){bK=bJ[i];

if(bK.handler===bG&&bK.context===self){qx.lang.Array.removeAt(bJ,i);

if(bJ.length==0){this.__bv(bE,bF,bH);
}return true;
}}return false;
},removeListenerById:function(ca,cb){var ch;
{};
var cf=cb.split(V);
var ck=cf[0];
var cc=cf[1].charCodeAt(0)==99;
var cj=cf[2];
var ci=ca.$$hash||qx.core.ObjectRegistry.toHashCode(ca);
var cl=this.__bo[ci];

if(!cl){return false;
}var cg=ck+(cc?W:X);
var ce=cl[cg];

if(!ce){return false;
}var cd;

for(var i=0,l=ce.length;i<l;i++){cd=ce[i];

if(cd.unique===cj){qx.lang.Array.removeAt(ce,i);

if(ce.length==0){this.__bv(ca,ck,cc);
}return true;
}}return false;
},removeAllListeners:function(e){var j=e.$$hash||qx.core.ObjectRegistry.toHashCode(e);
var m=this.__bo[j];

if(!m){return false;
}var g,k,f;

for(var h in m){if(m[h].length>0){g=h.split(V);
k=g[0];
f=g[1]===M;
this.__bv(e,k,f);
}}delete this.__bo[j];
return true;
},deleteAllListeners:function(bO){delete this.__bo[bO];
},__bv:function(a,b,c){var d=this.findHandler(a,b);

if(d){d.unregisterEvent(a,b,c);
return;
}{};
},dispatchEvent:function(p,event){var u;
{};
var v=event.getType();

if(!event.getBubbles()&&!this.hasListener(p,v)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(p);
}var t=this.__bn.getDispatchers();
var s;
var r=false;

for(var i=0,l=t.length;i<l;i++){s=this.getDispatcher(t[i]);
if(s.canDispatchEvent(p,event,v)){s.dispatchEvent(p,event,v);
r=true;
break;
}}
if(!r){{};
return true;
}var q=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !q;
},dispose:function(){this.__bn.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,N);
qx.util.DisposeUtil.disposeMap(this,Q);
this.__bo=this.__bl=this.__bt=null;
this.__bn=this.__br=null;
}}});
})();
(function(){var k="qx.dom.Node",j="qx.client",h="";
qx.Class.define(k,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(f){return f.nodeType===
this.DOCUMENT?f:
f.ownerDocument||f.document;
},getWindow:qx.core.Variant.select(j,{"mshtml":function(o){if(o.nodeType==null){return o;
}if(o.nodeType!==this.DOCUMENT){o=o.ownerDocument;
}return o.parentWindow;
},"default":function(r){if(r.nodeType==null){return r;
}if(r.nodeType!==this.DOCUMENT){r=r.ownerDocument;
}return r.defaultView;
}}),getDocumentElement:function(d){return this.getDocument(d).documentElement;
},getBodyElement:function(g){return this.getDocument(g).body;
},isNode:function(e){return !!(e&&e.nodeType!=null);
},isElement:function(l){return !!(l&&l.nodeType===this.ELEMENT);
},isDocument:function(m){return !!(m&&m.nodeType===this.DOCUMENT);
},isText:function(c){return !!(c&&c.nodeType===this.TEXT);
},isWindow:function(n){return !!(n&&n.history&&n.location&&n.document);
},isNodeName:function(s,t){if(!t||!s||!s.nodeName){return false;
}return t.toLowerCase()==qx.dom.Node.getName(s);
},getName:function(b){if(!b||!b.nodeName){return null;
}return b.nodeName.toLowerCase();
},getText:function(p){if(!p||!p.nodeType){return null;
}
switch(p.nodeType){case 1:var i,a=[],q=p.childNodes,length=q.length;

for(i=0;i<length;i++){a[i]=this.getText(q[i]);
}return a.join(h);
case 2:return p.nodeValue;
break;
case 3:return p.nodeValue;
break;
}return null;
}}});
})();
(function(){var C="mshtml",B="qx.client",A="[object Array]",z="qx.lang.Array",y="qx",x="number",w="string";
qx.Class.define(z,{statics:{toArray:function(bd,be){return this.cast(bd,Array,be);
},cast:function(bh,bi,bj){if(bh.constructor===bi){return bh;
}
if(qx.Class.hasInterface(bh,qx.data.IListData)){var bh=bh.toArray();
}var bk=new bi;
if(qx.core.Variant.isSet(B,C)){if(bh.item){for(var i=bj||0,l=bh.length;i<l;i++){bk.push(bh[i]);
}return bk;
}}if(Object.prototype.toString.call(bh)===A&&bj==null){bk.push.apply(bk,bh);
}else{bk.push.apply(bk,Array.prototype.slice.call(bh,bj||0));
}return bk;
},fromArguments:function(n,o){return Array.prototype.slice.call(n,o||0);
},fromCollection:function(k){if(qx.core.Variant.isSet(B,C)){if(k.item){var m=[];

for(var i=0,l=k.length;i<l;i++){m[i]=k[i];
}return m;
}}return Array.prototype.slice.call(k,0);
},fromShortHand:function(bl){var bn=bl.length;
var bm=qx.lang.Array.clone(bl);
switch(bn){case 1:bm[1]=bm[2]=bm[3]=bm[0];
break;
case 2:bm[2]=bm[0];
case 3:bm[3]=bm[1];
}return bm;
},clone:function(V){return V.concat();
},insertAt:function(f,g,i){f.splice(i,0,g);
return f;
},insertBefore:function(ba,bb,bc){var i=ba.indexOf(bc);

if(i==-1){ba.push(bb);
}else{ba.splice(i,0,bb);
}return ba;
},insertAfter:function(W,X,Y){var i=W.indexOf(Y);

if(i==-1||i==(W.length-1)){W.push(X);
}else{W.splice(i+1,0,X);
}return W;
},removeAt:function(u,i){return u.splice(i,1)[0];
},removeAll:function(v){v.length=0;
return this;
},append:function(bp,bq){{};
Array.prototype.push.apply(bp,bq);
return bp;
},exclude:function(R,S){{};

for(var i=0,U=S.length,T;i<U;i++){T=R.indexOf(S[i]);

if(T!=-1){R.splice(T,1);
}}return R;
},remove:function(h,j){var i=h.indexOf(j);

if(i!=-1){h.splice(i,1);
return j;
}},contains:function(d,e){return d.indexOf(e)!==-1;
},equals:function(s,t){var length=s.length;

if(length!==t.length){return false;
}
for(var i=0;i<length;i++){if(s[i]!==t[i]){return false;
}}return true;
},sum:function(bf){var bg=0;

for(var i=0,l=bf.length;i<l;i++){bg+=bf[i];
}return bg;
},max:function(p){{};
var i,r=p.length,q=p[0];

for(i=1;i<r;i++){if(p[i]>q){q=p[i];
}}return q===undefined?null:q;
},min:function(a){{};
var i,c=a.length,b=a[0];

for(i=1;i<c;i++){if(a[i]<b){b=a[i];
}}return b===undefined?null:b;
},unique:function(E){var O=[],G={},J={},L={};
var K,F=0;
var P=y+qx.lang.Date.now();
var H=false,N=false,Q=false;
for(var i=0,M=E.length;i<M;i++){K=E[i];
if(K===null){if(!H){H=true;
O.push(K);
}}else if(K===undefined){}else if(K===false){if(!N){N=true;
O.push(K);
}}else if(K===true){if(!Q){Q=true;
O.push(K);
}}else if(typeof K===w){if(!G[K]){G[K]=1;
O.push(K);
}}else if(typeof K===x){if(!J[K]){J[K]=1;
O.push(K);
}}else{I=K[P];

if(I==null){I=K[P]=F++;
}
if(!L[I]){L[I]=K;
O.push(K);
}}}for(var I in L){try{delete L[I][P];
}catch(D){try{L[I][P]=null;
}catch(bo){throw new Error("Cannot clean-up map entry doneObjects["+I+"]["+P+"]");
}}}return O;
}}});
})();
(function(){var i="()",h=".",g=".prototype.",f='anonymous()',e="qx.lang.Function",d=".constructor()";
qx.Class.define(e,{statics:{getCaller:function(w){return w.caller?w.caller.callee:w.callee.caller;
},getName:function(D){if(D.displayName){return D.displayName;
}
if(D.$$original||D.wrapper||D.classname){return D.classname+d;
}
if(D.$$mixin){for(var F in D.$$mixin.$$members){if(D.$$mixin.$$members[F]==D){return D.$$mixin.name+g+F+i;
}}for(var F in D.$$mixin){if(D.$$mixin[F]==D){return D.$$mixin.name+h+F+i;
}}}
if(D.self){var G=D.self.constructor;

if(G){for(var F in G.prototype){if(G.prototype[F]==D){return G.classname+g+F+i;
}}for(var F in G){if(G[F]==D){return G.classname+h+F+i;
}}}}var E=D.toString().match(/function\s*(\w*)\s*\(.*/);

if(E&&E.length>=1&&E[1]){return E[1]+i;
}return f;
},globalEval:function(t){if(window.execScript){return window.execScript(t);
}else{return eval.call(window,t);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(u,v){{};
if(!v){return u;
}if(!(v.self||v.args||v.delay!=null||v.periodical!=null||v.attempt)){return u;
}return function(event){{};
var y=qx.lang.Array.fromArguments(arguments);
if(v.args){y=v.args.concat(y);
}
if(v.delay||v.periodical){var x=qx.event.GlobalError.observeMethod(function(){return u.apply(v.self||this,y);
});

if(v.delay){return window.setTimeout(x,v.delay);
}
if(v.periodical){return window.setInterval(x,v.periodical);
}}else if(v.attempt){var z=false;

try{z=u.apply(v.self||this,y);
}catch(H){}return z;
}else{return u.apply(v.self||this,y);
}};
},bind:function(j,self,k){return this.create(j,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(l,m){return this.create(l,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(q,self,r){if(arguments.length<3){return function(event){return q.call(self||this,event||window.event);
};
}else{var s=qx.lang.Array.fromArguments(arguments,2);
return function(event){var a=[event||window.event];
a.push.apply(a,s);
q.apply(self||this,a);
};
}},attempt:function(b,self,c){return this.create(b,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(n,o,self,p){return this.create(n,{delay:o,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(A,B,self,C){return this.create(A,{periodical:B,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var t="qx.event.Registration";
qx.Class.define(t,{statics:{__bw:{},getManager:function(z){if(z==null){{};
z=window;
}else if(z.nodeType){z=qx.dom.Node.getWindow(z);
}else if(!qx.dom.Node.isWindow(z)){z=window;
}var B=z.$$hash||qx.core.ObjectRegistry.toHashCode(z);
var A=this.__bw[B];

if(!A){A=new qx.event.Manager(z,this);
this.__bw[B]=A;
}return A;
},removeManager:function(C){var D=C.getWindowId();
delete this.__bw[D];
},addListener:function(F,G,H,self,I){return this.getManager(F).addListener(F,G,H,self,I);
},removeListener:function(u,v,w,self,x){return this.getManager(u).removeListener(u,v,w,self,x);
},removeListenerById:function(J,K){return this.getManager(J).removeListenerById(J,K);
},removeAllListeners:function(e){return this.getManager(e).removeAllListeners(e);
},deleteAllListeners:function(L){var M=L.$$hash;

if(M){this.getManager(L).deleteAllListeners(M);
}},hasListener:function(p,q,r){return this.getManager(p).hasListener(p,q,r);
},serializeListeners:function(E){return this.getManager(E).serializeListeners(E);
},createEvent:function(f,g,h){{};
if(g==null){g=qx.event.type.Event;
}var i=qx.event.Pool.getInstance().getObject(g);
h?i.init.apply(i,h):i.init();
if(f){i.setType(f);
}return i;
},dispatchEvent:function(y,event){return this.getManager(y).dispatchEvent(y,event);
},fireEvent:function(j,k,l,m){var n;
{};
var o=this.createEvent(k,l||null,m);
return this.getManager(j).dispatchEvent(j,o);
},fireNonBubblingEvent:function(N,O,P,Q){{};
var R=this.getManager(N);

if(!R.hasListener(N,O,false)){return true;
}var S=this.createEvent(O,P||null,Q);
return R.dispatchEvent(N,S);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bx:[],addHandler:function(s){{};
this.__bx.push(s);
this.__bx.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bx;
},__by:[],addDispatcher:function(c,d){{};
this.__by.push(c);
this.__by.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__by;
}}});
})();
(function(){var o="$$hash",n="",m="qx.core.ObjectRegistry";
qx.Class.define(m,{statics:{inShutDown:false,__bz:{},__bA:0,__bB:[],register:function(u){var x=this.__bz;

if(!x){return;
}var w=u.$$hash;

if(w==null){var v=this.__bB;

if(v.length>0){w=v.pop();
}else{w=(this.__bA++)+n;
}u.$$hash=w;
}{};
x[w]=u;
},unregister:function(g){var h=g.$$hash;

if(h==null){return;
}var j=this.__bz;

if(j&&j[h]){delete j[h];
this.__bB.push(h);
}try{delete g.$$hash;
}catch(k){if(g.removeAttribute){g.removeAttribute(o);
}}},toHashCode:function(c){{};
var e=c.$$hash;

if(e!=null){return e;
}var d=this.__bB;

if(d.length>0){e=d.pop();
}else{e=(this.__bA++)+n;
}return c.$$hash=e;
},clearHashCode:function(y){{};
var z=y.$$hash;

if(z!=null){this.__bB.push(z);
try{delete y.$$hash;
}catch(A){if(y.removeAttribute){y.removeAttribute(o);
}}}},fromHashCode:function(t){return this.__bz[t]||null;
},shutdown:function(){this.inShutDown=true;
var q=this.__bz;
var s=[];

for(var r in q){s.push(r);
}s.sort(function(a,b){return parseInt(b)-parseInt(a);
});
var p,i=0,l=s.length;

while(true){try{for(;i<l;i++){r=s[i];
p=q[r];

if(p&&p.dispose){p.dispose();
}}}catch(f){qx.Bootstrap.error(this,"Could not dispose object "+p.toString()+": "+f);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bz;
},getRegistry:function(){return this.__bz;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(c,d,e,f){return qx.data.SingleValueBinding.bind(this,c,d,e,f);
},removeBinding:function(b){qx.data.SingleValueBinding.removeBindingFromObject(this,b);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var D=":",C="qx.client",B="anonymous",A="...",z="qx.dev.StackTrace",y="",x="\n",w="/source/class/",v=".";
qx.Class.define(z,{statics:{getStackTrace:qx.core.Variant.select(C,{"gecko":function(){try{throw new Error();
}catch(bc){var p=this.getStackTraceFromError(bc);
qx.lang.Array.removeAt(p,0);
var n=this.getStackTraceFromCaller(arguments);
var l=n.length>p.length?n:p;

for(var i=0;i<Math.min(n.length,p.length);i++){var m=n[i];

if(m.indexOf(B)>=0){continue;
}var t=m.split(D);

if(t.length!=2){continue;
}var r=t[0];
var k=t[1];
var j=p[i];
var u=j.split(D);
var q=u[0];
var h=u[1];

if(qx.Class.getByName(q)){var o=q;
}else{o=r;
}var s=o+D;

if(k){s+=k+D;
}s+=h;
l[i]=s;
}return l;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var L;

try{L.bar();
}catch(c){var M=this.getStackTraceFromError(c);
qx.lang.Array.removeAt(M,0);
return M;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(C,{"opera":function(b){return [];
},"default":function(N){var S=[];
var R=qx.lang.Function.getCaller(N);
var O={};

while(R){var P=qx.lang.Function.getName(R);
S.push(P);

try{R=R.caller;
}catch(a){break;
}
if(!R){break;
}var Q=qx.core.ObjectRegistry.toHashCode(R);

if(O[Q]){S.push(A);
break;
}O[Q]=R;
}return S;
}}),getStackTraceFromError:qx.core.Variant.select(C,{"gecko":function(E){if(!E.stack){return [];
}var K=/@(.+):(\d+)$/gm;
var F;
var G=[];

while((F=K.exec(E.stack))!=null){var H=F[1];
var J=F[2];
var I=this.__bC(H);
G.push(I+D+J);
}return G;
},"webkit":function(T){if(T.sourceURL&&T.line){return [this.__bC(T.sourceURL)+D+T.line];
}else{return [];
}},"opera":function(U){if(U.message.indexOf("Backtrace:")<0){return [];
}var W=[];
var X=qx.lang.String.trim(U.message.split("Backtrace:")[1]);
var Y=X.split(x);

for(var i=0;i<Y.length;i++){var V=Y[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(V&&V.length>=2){var bb=V[1];
var ba=this.__bC(V[2]);
W.push(ba+D+bb);
}}return W;
},"default":function(){return [];
}}),__bC:function(d){var g=w;
var e=d.indexOf(g);
var f=(e==-1)?d:d.substring(e+g.length).replace(/\//g,v).replace(/\.js$/,y);
return f;
}}});
})();
(function(){var b="qx.lang.RingBuffer";
qx.Class.define(b,{extend:Object,construct:function(a){this.setMaxEntries(a||50);
},members:{__bD:0,__bE:0,__bF:false,__bG:0,__bH:null,__bI:null,setMaxEntries:function(c){this.__bI=c;
this.clear();
},getMaxEntries:function(){return this.__bI;
},addEntry:function(d){this.__bH[this.__bD]=d;
this.__bD=this.__bJ(this.__bD,1);
var e=this.getMaxEntries();

if(this.__bE<e){this.__bE++;
}if(this.__bF&&(this.__bG<e)){this.__bG++;
}},mark:function(){this.__bF=true;
this.__bG=0;
},clearMark:function(){this.__bF=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__bE){f=this.__bE;
}if(g&&this.__bF&&(f>this.__bG)){f=this.__bG;
}
if(f>0){var i=this.__bJ(this.__bD,-1);
var h=this.__bJ(i,-f+1);
var j;

if(h<=i){j=this.__bH.slice(h,i+1);
}else{j=this.__bH.slice(h,this.__bE).concat(this.__bH.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__bH=new Array(this.getMaxEntries());
this.__bE=0;
this.__bG=0;
this.__bD=0;
},__bJ:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var d="qx.log.appender.RingBuffer";
qx.Class.define(d,{extend:qx.lang.RingBuffer,construct:function(f){this.setMaxMessages(f||50);
},members:{setMaxMessages:function(a){this.setMaxEntries(a);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(e){this.addEntry(e);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(b,c){return this.getEntries(b,c);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var k="node",j="error",h="...(+",g="array",f=")",e="info",d="instance",c="string",b="null",a="class",G="number",F="stringify",E="]",D="unknown",C="function",B="boolean",A="debug",z="map",y="undefined",x="qx.log.Logger",s=")}",t="#",q="warn",r="document",o="{...(",p="[",m="text[",n="[...(",u="\n",v=")]",w="object";
qx.Class.define(x,{statics:{__bK:A,setLevel:function(bw){this.__bK=bw;
},getLevel:function(){return this.__bK;
},setTreshold:function(bh){this.__bN.setMaxMessages(bh);
},getTreshold:function(){return this.__bN.getMaxMessages();
},__bL:{},__bM:0,register:function(bc){if(bc.$$id){return;
}var bd=this.__bM++;
this.__bL[bd]=bc;
bc.$$id=bd;
var be=this.__bN.getAllLogEvents();

for(var i=0,l=be.length;i<l;i++){bc.process(be[i]);
}},unregister:function(X){var Y=X.$$id;

if(Y==null){return;
}delete this.__bL[Y];
delete X.$$id;
},debug:function(bl,bm){qx.log.Logger.__bP(A,arguments);
},info:function(bf,bg){qx.log.Logger.__bP(e,arguments);
},warn:function(bx,by){qx.log.Logger.__bP(q,arguments);
},error:function(V,W){qx.log.Logger.__bP(j,arguments);
},trace:function(bq){qx.log.Logger.__bP(e,[bq,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(bz,bA){var bB;
{};
},deprecatedClassWarning:function(bi,bj){var bk;
{};
},deprecatedEventWarning:function(bE,event,bF){var bG;
{};
},deprecatedMixinWarning:function(bn,bo){var bp;
{};
},deprecatedConstantWarning:function(R,S,T){var self,U;
{};
},deprecateMethodOverriding:function(br,bs,bt,bu){var bv;
{};
},clear:function(){this.__bN.clearHistory();
},__bN:new qx.log.appender.RingBuffer(50),__bO:{debug:0,info:1,warn:2,error:3},__bP:function(H,I){var N=this.__bO;

if(N[H]<N[this.__bK]){return;
}var K=I.length<2?null:I[0];
var M=K?1:0;
var J=[];

for(var i=M,l=I.length;i<l;i++){J.push(this.__bR(I[i],true));
}var O=new Date;
var P={time:O,offset:O-qx.Bootstrap.LOADSTART,level:H,items:J,win:window};
if(K){if(K instanceof qx.core.Object){P.object=K.$$hash;
}else if(K.$$type){P.clazz=K;
}}this.__bN.process(P);
var Q=this.__bL;

for(var L in Q){Q[L].process(P);
}},__bQ:function(ba){if(ba===undefined){return y;
}else if(ba===null){return b;
}
if(ba.$$type){return a;
}var bb=typeof ba;

if(bb===C||bb==c||bb===G||bb===B){return bb;
}else if(bb===w){if(ba.nodeType){return k;
}else if(ba.classname){return d;
}else if(ba instanceof Array){return g;
}else if(ba instanceof Error){return j;
}else{return z;
}}
if(ba.toString){return F;
}return D;
},__bR:function(bH,bI){var bP=this.__bQ(bH);
var bL=D;
var bK=[];

switch(bP){case b:case y:bL=bP;
break;
case c:case G:case B:bL=bH;
break;
case k:if(bH.nodeType===9){bL=r;
}else if(bH.nodeType===3){bL=m+bH.nodeValue+E;
}else if(bH.nodeType===1){bL=bH.nodeName.toLowerCase();

if(bH.id){bL+=t+bH.id;
}}else{bL=k;
}break;
case C:bL=qx.lang.Function.getName(bH)||bP;
break;
case d:bL=bH.basename+p+bH.$$hash+E;
break;
case a:case F:bL=bH.toString();
break;
case j:bK=qx.dev.StackTrace.getStackTraceFromError(bH);
bL=bH.toString();
break;
case g:if(bI){bL=[];

for(var i=0,l=bH.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bL.push(this.__bR(bH[i],false));
}}else{bL=n+bH.length+v;
}break;
case z:if(bI){var bJ;
var bO=[];

for(var bN in bH){bO.push(bN);
}bO.sort();
bL=[];

for(var i=0,l=bO.length;i<l;i++){if(bL.length>20){bL.push(h+(l-i)+f);
break;
}bN=bO[i];
bJ=this.__bR(bH[bN],false);
bJ.key=bN;
bL.push(bJ);
}}else{var bM=0;

for(var bN in bH){bM++;
}bL=o+bM+s;
}break;
}return {type:bP,text:bL,trace:bK};
}},defer:function(bC){var bD=qx.Bootstrap.$$logs;

for(var i=0;i<bD.length;i++){bC.__bP(bD[i][0],bD[i][1]);
}qx.Bootstrap.debug=bC.debug;
qx.Bootstrap.info=bC.info;
qx.Bootstrap.warn=bC.warn;
qx.Bootstrap.error=bC.error;
qx.Bootstrap.trace=bC.trace;
}});
})();
(function(){var bu="set",bt="get",bs="reset",br="MSIE 6.0",bq="qx.core.Object",bp="]",bo="rv:1.8.1",bn="[",bm="$$user_",bl="Object";
qx.Class.define(bq,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:bl},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+bn+this.$$hash+bp;
},base:function(bc,bd){{};

if(arguments.length===1){return bc.callee.base.call(this);
}else{return bc.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(bF){return bF.callee.self;
},clone:function(){var q=this.constructor;
var p=new q;
var s=qx.Class.getProperties(q);
var r=qx.core.Property.$$store.user;
var t=qx.core.Property.$$method.set;
var name;
for(var i=0,l=s.length;i<l;i++){name=s[i];

if(this.hasOwnProperty(r[name])){p[t[name]](this[r[name]]);
}}return p;
},set:function(C,D){var F=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(C)){if(!this[F[C]]){if(this[bu+qx.Bootstrap.firstUp(C)]!=undefined){this[bu+qx.Bootstrap.firstUp(C)](D);
return this;
}{};
}return this[F[C]](D);
}else{for(var E in C){if(!this[F[E]]){if(this[bu+qx.Bootstrap.firstUp(E)]!=undefined){this[bu+qx.Bootstrap.firstUp(E)](C[E]);
continue;
}{};
}this[F[E]](C[E]);
}return this;
}},get:function(g){var h=qx.core.Property.$$method.get;

if(!this[h[g]]){if(this[bt+qx.Bootstrap.firstUp(g)]!=undefined){return this[bt+qx.Bootstrap.firstUp(g)]();
}{};
}return this[h[g]]();
},reset:function(R){var S=qx.core.Property.$$method.reset;

if(!this[S[R]]){if(this[bs+qx.Bootstrap.firstUp(R)]!=undefined){this[bs+qx.Bootstrap.firstUp(R)]();
return;
}{};
}this[S[R]]();
},__bS:qx.event.Registration,addListener:function(G,H,self,I){if(!this.$$disposed){return this.__bS.addListener(this,G,H,self,I);
}return null;
},addListenerOnce:function(W,X,self,Y){var ba=function(e){X.call(self||this,e);
this.removeListener(W,ba,this,Y);
};
return this.addListener(W,ba,this,Y);
},removeListener:function(be,bf,self,bg){if(!this.$$disposed){return this.__bS.removeListener(this,be,bf,self,bg);
}return false;
},removeListenerById:function(bG){if(!this.$$disposed){return this.__bS.removeListenerById(this,bG);
}return false;
},hasListener:function(bj,bk){return this.__bS.hasListener(this,bj,bk);
},dispatchEvent:function(bb){if(!this.$$disposed){return this.__bS.dispatchEvent(this,bb);
}return true;
},fireEvent:function(v,w,x){if(!this.$$disposed){return this.__bS.fireEvent(this,v,w,x);
}return true;
},fireNonBubblingEvent:function(z,A,B){if(!this.$$disposed){return this.__bS.fireNonBubblingEvent(this,z,A,B);
}return true;
},fireDataEvent:function(b,c,d,f){if(!this.$$disposed){if(d===undefined){d=null;
}return this.__bS.fireNonBubblingEvent(this,b,qx.event.type.Data,[c,d,!!f]);
}return true;
},__bT:null,setUserData:function(U,V){if(!this.__bT){this.__bT={};
}this.__bT[U]=V;
},getUserData:function(bh){if(!this.__bT){return null;
}var bi=this.__bT[bh];
return bi===undefined?null:bi;
},__bU:qx.log.Logger,debug:function(y){this.__bU.debug(this,y);
},info:function(bv){this.__bU.info(this,bv);
},warn:function(bE){this.__bU.warn(this,bE);
},error:function(Q){this.__bU.error(this,Q);
},trace:function(){this.__bU.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var N,L,K,O;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var M=this.constructor;
var J;

while(M.superclass){if(M.$$destructor){M.$$destructor.call(this);
}if(M.$$includes){J=M.$$flatIncludes;

for(var i=0,l=J.length;i<l;i++){if(J[i].$$destructor){J[i].$$destructor.call(this);
}}}M=M.superclass;
}if(this.__bV){this.__bV();
}{};
},__bV:null,__bW:function(){var a=qx.Class.getProperties(this.constructor);

for(var i=0,l=a.length;i<l;i++){delete this[bm+a[i]];
}},_disposeObjects:function(j){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(T){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(u){qx.util.DisposeUtil.disposeArray(this,u);
},_disposeMap:function(P){qx.util.DisposeUtil.disposeMap(this,P);
}},settings:{"qx.disposerDebugLevel":0},defer:function(k,m){{};
var o=navigator.userAgent.indexOf(br)!=-1;
var n=navigator.userAgent.indexOf(bo)!=-1;
if(o||n){m.__bV=m.__bW;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__bT=null;
var by=this.constructor;
var bC;
var bD=qx.core.Property.$$store;
var bA=bD.user;
var bB=bD.theme;
var bw=bD.inherit;
var bz=bD.useinit;
var bx=bD.init;

while(by){bC=by.$$properties;

if(bC){for(var name in bC){if(bC[name].dereference){this[bA[name]]=this[bB[name]]=this[bw[name]]=this[bz[name]]=this[bx[name]]=undefined;
}}}by=by.superclass;
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(b,c){},registerEvent:function(g,h,i){},unregisterEvent:function(d,e,f){}}});
})();
(function(){var i="qx.globalErrorHandling",h="on",g="qx.event.GlobalError";
qx.Bootstrap.define(g,{statics:{setErrorHandler:function(l,m){this.__bX=l||null;
this.__bY=m||window;

if(qx.core.Setting.get(i)===h){if(l&&window.onerror){var n=qx.Bootstrap.bind(this.__cb,this);

if(this.__ca==null){this.__ca=window.onerror;
}var self=this;
window.onerror=function(e){self.__ca(e);
n(e);
};
}
if(l&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__cb,this);
}if(this.__bX==null){if(this.__ca!=null){window.onerror=this.__ca;
this.__ca=null;
}else{window.onerror=null;
}}}},__cb:function(b,c,d){if(this.__bX){this.handleError(new qx.core.WindowError(b,c,d));
return true;
}},observeMethod:function(j){if(qx.core.Setting.get(i)===h){var self=this;
return function(){if(!self.__bX){return j.apply(this,arguments);
}
try{return j.apply(this,arguments);
}catch(k){self.handleError(new qx.core.GlobalError(k,arguments));
}};
}else{return j;
}},handleError:function(f){if(this.__bX){this.__bX.call(this.__bY,f);
}}},defer:function(a){qx.core.Setting.define(i,h);
a.setErrorHandler(null,null);
}});
})();
(function(){var o="ready",n="qx.client",m="mshtml",l="load",k="unload",j="qx.event.handler.Application",i="complete",h="qx.application",g="gecko|opera|webkit",f="left",c="DOMContentLoaded",d="shutdown";
qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(A){qx.core.Object.call(this);
this._window=A.getWindow();
this.__cc=false;
this.__cd=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var y=qx.event.handler.Application.$$instance;

if(y){y.__cg();
}}},members:{canHandleEvent:function(s,t){},registerEvent:function(p,q,r){},unregisterEvent:function(v,w,x){},__ce:null,__cc:null,__cd:null,__cf:null,__cg:function(){if(!this.__ce&&this.__cc&&qx.$$loader.scriptLoaded){try{var b=qx.core.Setting.get(h);

if(!qx.Class.getByName(b)){return;
}}catch(e){}if(qx.core.Variant.isSet(n,m)){if(qx.event.Registration.hasListener(this._window,o)){this.__ce=true;
qx.event.Registration.fireEvent(this._window,o);
}}else{this.__ce=true;
qx.event.Registration.fireEvent(this._window,o);
}}},isApplicationReady:function(){return this.__ce;
},_initObserver:function(){if(qx.$$domReady||document.readyState==i||document.readyState==o){this.__cc=true;
this.__cg();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(n,g)){qx.bom.Event.addNativeListener(this._window,c,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(n,m)){var self=this;
var u=function(){try{document.documentElement.doScroll(f);

if(document.body){self._onNativeLoadWrapped();
}}catch(a){window.setTimeout(u,100);
}};
u();
}qx.bom.Event.addNativeListener(this._window,l,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,k,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,l,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,k,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cc=true;
this.__cg();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cf){this.__cf=true;

try{qx.event.Registration.fireEvent(this._window,d);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(z){qx.event.Registration.addHandler(z);
}});
})();
(function(){var d="qx.event.handler.Window";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);
this._manager=u;
this._window=u.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(f,g){},registerEvent:function(h,i,j){},unregisterEvent:function(r,s,t){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var l=qx.event.handler.Window.SUPPORTED_TYPES;

for(var k in l){qx.bom.Event.addNativeListener(this._window,k,this._onNativeWrapper);
}},_stopWindowObserver:function(){var b=qx.event.handler.Window.SUPPORTED_TYPES;

for(var a in b){qx.bom.Event.removeNativeListener(this._window,a,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var n=this._window;

try{var q=n.document;
}catch(e){return ;
}var o=q.documentElement;
var m=e.target||e.srcElement;

if(m==null||m===n||m===q||m===o){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,n]);
qx.event.Registration.dispatchEvent(n,event);
var p=event.getReturnValue();

if(p!=null){e.returnValue=p;
return p;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(c){qx.event.Registration.addHandler(c);
}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var b="qx.event.dispatch.Direct";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(a){this._manager=a;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(d,event,e){return !event.getBubbles();
},dispatchEvent:function(f,event,g){var k,h;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var m=this._manager.getListeners(f,g,false);

if(m){for(var i=0,l=m.length;i<l;i++){var j=m[i].context||f;
m[i].handler.call(j,event);
}}}},defer:function(c){qx.event.Registration.addDispatcher(c);
}});
})();
(function(){var g="ready",f="qx.application",d="beforeunload",c="qx.core.Init",b="shutdown";
qx.Class.define(c,{statics:{getApplication:function(){return this.__ch||null;
},ready:function(){if(this.__ch){return;
}
if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var j=qx.core.Setting.get(f);
var k=qx.Class.getByName(j);

if(k){this.__ch=new k;
var i=new Date;
this.__ch.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-i)+"ms");
var i=new Date;
this.__ch.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-i)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+j);
}},__ci:function(e){var h=this.__ch;

if(h){e.setReturnValue(h.close());
}},__cj:function(){var a=this.__ch;

if(a){a.terminate();
}}},defer:function(l){qx.event.Registration.addListener(window,g,l.ready,l);
qx.event.Registration.addListener(window,b,l.__cj,l);
qx.event.Registration.addListener(window,d,l.__ci,l);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var h="qx.locale.MTranslation";
qx.Mixin.define(h,{members:{tr:function(i,j){var k=qx.locale.Manager;

if(k){return k.tr.apply(k,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(c,d,e,f){var g=qx.locale.Manager;

if(g){return g.trn.apply(g,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(l,m,n){var o=qx.locale.Manager;

if(o){return o.trc.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(a){var b=qx.locale.Manager;

if(b){return b.marktr.apply(b,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var c="abstract",b="qx.application.AbstractGui";
qx.Class.define(b,{type:c,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__ck:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__ck;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__ck=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(a){},terminate:function(){}},destruct:function(){this.__ck=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var a="dropnode.Application";
qx.Class.define(a,{extend:qx.application.Standalone,members:{main:function(){qx.application.Standalone.prototype.main.call(this);
this.event_bus=qx.event.message.Bus;
this.baseUIController=dropnode.BaseUIController;
this.baseUIController.getInstance().initialize(this.event_bus,new dropnode.BaseUI);
this.getRoot().add(this.baseUIController.getInstance().getUi().base_container,{edge:0});
this.fileDashboardController=dropnode.FileDashboardController;
this.fileDashboardController.getInstance().initialize(this.event_bus,new dropnode.FileDashboardUI);
this.baseUIController.getInstance().add(this.fileDashboardController.getInstance());
this.fileTreeController=dropnode.FileTreeController;
this.fileTreeController.getInstance().initialize(this.event_bus,new dropnode.FileTreeUI);
this.fileDashboardController.getInstance().add(this.fileTreeController.getInstance());
this.recipientDisplayController=dropnode.RecipientDisplayController;
this.recipientDisplayController.getInstance().initialize(this.event_bus,new dropnode.RecipientDisplayUI);
this.fileDashboardController.getInstance().add(this.recipientDisplayController.getInstance());
}}});
})();
(function(){var c="qx.event.type.Event";
qx.Class.define(c,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(j,k){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!j;
this._cancelable=!!k;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(g){if(g){var h=g;
}else{var h=qx.event.Pool.getInstance().getObject(this.constructor);
}h._type=this._type;
h._target=this._target;
h._currentTarget=this._currentTarget;
h._relatedTarget=this._relatedTarget;
h._originalTarget=this._originalTarget;
h._stopPropagation=this._stopPropagation;
h._bubbles=this._bubbles;
h._preventDefault=this._preventDefault;
h._cancelable=this._cancelable;
return h;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(e){this._type=e;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(m){this._eventPhase=m;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(d){this._target=d;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(f){this._currentTarget=f;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(a){this._relatedTarget=a;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(l){this._originalTarget=l;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(i){this._bubbles=i;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(b){this._cancelable=b;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var d="qx.event.type.Data";
qx.Class.define(d,{extend:qx.event.type.Event,members:{__cl:null,__cm:null,init:function(a,b,c){qx.event.type.Event.prototype.init.call(this,false,c);
this.__cl=a;
this.__cm=b;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cl=this.__cl;
f.__cm=this.__cm;
return f;
},getData:function(){return this.__cl;
},getOldData:function(){return this.__cm;
}},destruct:function(){this.__cl=this.__cm=null;
}});
})();
(function(){var J="get",I="",H="[",G="last",F="change",E="]",D=".",C="Number",B="String",A="set",Y="deepBinding",X="item",W="reset",V="' (",U="Boolean",T=").",S=") to the object '",R="Integer",Q="qx.data.SingleValueBinding",P="No event could be found for the property",N="PositiveNumber",O="Binding from '",L="PositiveInteger",M="Binding does not exist!",K="Date";
qx.Class.define(Q,{statics:{DEBUG_ON:false,__cn:{},bind:function(bq,br,bs,bt,bu){var bE=this.__cp(bq,br,bs,bt,bu);
var bz=br.split(D);
var bw=this.__cw(bz);
var bD=[];
var bA=[];
var bB=[];
var bx=[];
var by=bq;
for(var i=0;i<bz.length;i++){if(bw[i]!==I){bx.push(F);
}else{bx.push(this.__cr(by,bz[i]));
}bD[i]=by;
if(i==bz.length-1){if(bw[i]!==I){var bH=bw[i]===G?by.length-1:bw[i];
var bv=by.getItem(bH);
this.__cv(bv,bs,bt,bu,bq);
bB[i]=this.__cx(by,bx[i],bs,bt,bu,bw[i]);
}else{if(bz[i]!=null&&by[J+qx.lang.String.firstUp(bz[i])]!=null){var bv=by[J+qx.lang.String.firstUp(bz[i])]();
this.__cv(bv,bs,bt,bu,bq);
}bB[i]=this.__cx(by,bx[i],bs,bt,bu);
}}else{var bF={index:i,propertyNames:bz,sources:bD,listenerIds:bB,arrayIndexValues:bw,targetObject:bs,targetPropertyChain:bt,options:bu,listeners:bA};
var bC=qx.lang.Function.bind(this.__co,this,bF);
bA.push(bC);
bB[i]=by.addListener(bx[i],bC);
}if(by[J+qx.lang.String.firstUp(bz[i])]==null){by=null;
}else if(bw[i]!==I){by=by[J+qx.lang.String.firstUp(bz[i])](bw[i]);
}else{by=by[J+qx.lang.String.firstUp(bz[i])]();
}
if(!by){break;
}}var bG={type:Y,listenerIds:bB,sources:bD,targetListenerIds:bE.listenerIds,targets:bE.targets};
this.__cy(bG,bq,br,bs,bt);
return bG;
},__co:function(bk){if(bk.options&&bk.options.onUpdate){bk.options.onUpdate(bk.sources[bk.index],bk.targetObject);
}for(var j=bk.index+1;j<bk.propertyNames.length;j++){var bo=bk.sources[j];
bk.sources[j]=null;

if(!bo){continue;
}bo.removeListenerById(bk.listenerIds[j]);
}var bo=bk.sources[bk.index];
for(var j=bk.index+1;j<bk.propertyNames.length;j++){if(bk.arrayIndexValues[j-1]!==I){bo=bo[J+qx.lang.String.firstUp(bk.propertyNames[j-1])](bk.arrayIndexValues[j-1]);
}else{bo=bo[J+qx.lang.String.firstUp(bk.propertyNames[j-1])]();
}bk.sources[j]=bo;
if(!bo){this.__cs(bk.targetObject,bk.targetPropertyChain);
break;
}if(j==bk.propertyNames.length-1){if(qx.Class.implementsInterface(bo,qx.data.IListData)){var bp=bk.arrayIndexValues[j]===G?bo.length-1:bk.arrayIndexValues[j];
var bm=bo.getItem(bp);
this.__cv(bm,bk.targetObject,bk.targetPropertyChain,bk.options,bk.sources[bk.index]);
bk.listenerIds[j]=this.__cx(bo,F,bk.targetObject,bk.targetPropertyChain,bk.options,bk.arrayIndexValues[j]);
}else{if(bk.propertyNames[j]!=null&&bo[J+qx.lang.String.firstUp(bk.propertyNames[j])]!=null){var bm=bo[J+qx.lang.String.firstUp(bk.propertyNames[j])]();
this.__cv(bm,bk.targetObject,bk.targetPropertyChain,bk.options,bk.sources[bk.index]);
}var bn=this.__cr(bo,bk.propertyNames[j]);
bk.listenerIds[j]=this.__cx(bo,bn,bk.targetObject,bk.targetPropertyChain,bk.options);
}}else{if(bk.listeners[j]==null){var bl=qx.lang.Function.bind(this.__co,this,bk);
bk.listeners.push(bl);
}if(qx.Class.implementsInterface(bo,qx.data.IListData)){var bn=F;
}else{var bn=this.__cr(bo,bk.propertyNames[j]);
}bk.listenerIds[j]=bo.addListener(bn,bk.listeners[j]);
}}},__cp:function(h,k,l,m,n){var r=m.split(D);
var p=this.__cw(r);
var w=[];
var v=[];
var t=[];
var s=[];
var q=l;
for(var i=0;i<r.length-1;i++){if(p[i]!==I){s.push(F);
}else{try{s.push(this.__cr(q,r[i]));
}catch(e){break;
}}w[i]=q;
var u=function(){for(var j=i+1;j<r.length-1;j++){var cI=w[j];
w[j]=null;

if(!cI){continue;
}cI.removeListenerById(t[j]);
}var cI=w[i];
for(var j=i+1;j<r.length-1;j++){var cG=qx.lang.String.firstUp(r[j-1]);
if(p[j-1]!==I){var cJ=p[j-1]===G?cI.getLength()-1:p[j-1];
cI=cI[J+cG](cJ);
}else{cI=cI[J+cG]();
}w[j]=cI;
if(v[j]==null){v.push(u);
}if(qx.Class.implementsInterface(cI,qx.data.IListData)){var cH=F;
}else{try{var cH=qx.data.SingleValueBinding.__cr(cI,r[j]);
}catch(e){break;
}}t[j]=cI.addListener(cH,v[j]);
}qx.data.SingleValueBinding.__cq(h,k,l,m,n);
};
v.push(u);
t[i]=q.addListener(s[i],u);
var o=qx.lang.String.firstUp(r[i]);
if(q[J+o]==null){q=null;
}else if(p[i]!==I){q=q[J+o](p[i]);
}else{q=q[J+o]();
}
if(!q){break;
}}return {listenerIds:t,targets:w};
},__cq:function(cg,ch,ci,cj,ck){var co=this.__cu(cg,ch);

if(co!=null){var cq=ch.substring(ch.lastIndexOf(D)+1,ch.length);
if(cq.charAt(cq.length-1)==E){var cl=cq.substring(cq.lastIndexOf(H)+1,cq.length-1);
var cn=cq.substring(0,cq.lastIndexOf(H));
var cp=co[J+qx.lang.String.firstUp(cn)]();

if(cl==G){cl=cp.length-1;
}
if(cp!=null){var cm=cp.getItem(cl);
}}else{var cm=co[J+qx.lang.String.firstUp(cq)]();
}}cm=qx.data.SingleValueBinding.__cz(cm,ci,cj,ck);
this.__ct(ci,cj,cm);
},__cr:function(d,f){var g=this.__cA(d,f);
if(g==null){if(qx.Class.supportsEvent(d.constructor,f)){g=f;
}else if(qx.Class.supportsEvent(d.constructor,F+qx.lang.String.firstUp(f))){g=F+qx.lang.String.firstUp(f);
}else{throw new qx.core.AssertionError(P,f);
}}return g;
},__cs:function(db,dc){var dd=this.__cu(db,dc);

if(dd!=null){var de=dc.substring(dc.lastIndexOf(D)+1,dc.length);
if(de.charAt(de.length-1)==E){this.__ct(db,dc,null);
return;
}if(dd[W+qx.lang.String.firstUp(de)]!=undefined){dd[W+qx.lang.String.firstUp(de)]();
}else{dd[A+qx.lang.String.firstUp(de)](null);
}}},__ct:function(bQ,bR,bS){var bW=this.__cu(bQ,bR);

if(bW!=null){var bX=bR.substring(bR.lastIndexOf(D)+1,bR.length);
if(bX.charAt(bX.length-1)==E){var bT=bX.substring(bX.lastIndexOf(H)+1,bX.length-1);
var bV=bX.substring(0,bX.lastIndexOf(H));
var bU=bW[J+qx.lang.String.firstUp(bV)]();

if(bT==G){bT=bU.length-1;
}
if(bU!=null){bU.setItem(bT,bS);
}}else{bW[A+qx.lang.String.firstUp(bX)](bS);
}}},__cu:function(bK,bL){var bO=bL.split(D);
var bP=bK;
for(var i=0;i<bO.length-1;i++){try{var bN=bO[i];
if(bN.indexOf(E)==bN.length-1){var bM=bN.substring(bN.indexOf(H)+1,bN.length-1);
bN=bN.substring(0,bN.indexOf(H));
}bP=bP[J+qx.lang.String.firstUp(bN)]();

if(bM!=null){if(bM==G){bM=bP.length-1;
}bP=bP.getItem(bM);
bM=null;
}}catch(x){return null;
}}return bP;
},__cv:function(ba,bb,bc,bd,be){ba=this.__cz(ba,bb,bc,bd);
if(ba==null){this.__cs(bb,bc);
}if(ba!=undefined){try{this.__ct(bb,bc,ba);
if(bd&&bd.onUpdate){bd.onUpdate(be,bb,ba);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(bd&&bd.onSetFail){bd.onSetFail(e);
}else{this.warn("Failed so set value "+ba+" on "+bb+". Error message: "+e);
}}}},__cw:function(cA){var cB=[];
for(var i=0;i<cA.length;i++){var name=cA[i];
if(qx.lang.String.endsWith(name,E)){var cC=name.substring(name.indexOf(H)+1,name.indexOf(E));
if(name.indexOf(E)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cC!==G){if(cC==I||isNaN(parseInt(cC))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(H)!=0){cA[i]=name.substring(0,name.indexOf(H));
cB[i]=I;
cB[i+1]=cC;
cA.splice(i+1,0,X);
i++;
}else{cB[i]=cC;
cA.splice(i,1,X);
}}else{cB[i]=I;
}}return cB;
},__cx:function(cN,cO,cP,cQ,cR,cS){var cT;
{};
var cV=function(bf,e){if(bf!==I){if(bf===G){bf=cN.length-1;
}var bi=cN.getItem(bf);
if(bi==undefined){qx.data.SingleValueBinding.__cs(cP,cQ);
}var bg=e.getData().start;
var bh=e.getData().end;

if(bf<bg||bf>bh){return;
}}else{var bi=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+cN+" by "+cO+" to "+cP+" ("+cQ+")");
qx.log.Logger.debug("Data before conversion: "+bi);
}bi=qx.data.SingleValueBinding.__cz(bi,cP,cQ,cR);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+bi);
}try{if(bi!=undefined){qx.data.SingleValueBinding.__ct(cP,cQ,bi);
}else{qx.data.SingleValueBinding.__cs(cP,cQ);
}if(cR&&cR.onUpdate){cR.onUpdate(cN,cP,bi);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cR&&cR.onSetFail){cR.onSetFail(e);
}else{this.warn("Failed so set value "+bi+" on "+cP+". Error message: "+e);
}}};
if(!cS){cS=I;
}cV=qx.lang.Function.bind(cV,cN,cS);
var cU=cN.addListener(cO,cV);
return cU;
},__cy:function(bY,ca,cb,cc,cd){if(this.__cn[ca.toHashCode()]===undefined){this.__cn[ca.toHashCode()]=[];
}this.__cn[ca.toHashCode()].push([bY,ca,cb,cc,cd]);
},__cz:function(cr,cs,ct,cu){if(cu&&cu.converter){var cw;

if(cs.getModel){cw=cs.getModel();
}return cu.converter(cr,cw);
}else{var cy=this.__cu(cs,ct);
var cz=ct.substring(ct.lastIndexOf(D)+1,ct.length);
if(cy==null){return cr;
}var cx=qx.Class.getPropertyDefinition(cy.constructor,cz);
var cv=cx==null?I:cx.check;
return this.__cB(cr,cv);
}},__cA:function(cK,cL){var cM=qx.Class.getPropertyDefinition(cK.constructor,cL);

if(cM==null){return null;
}return cM.event;
},__cB:function(a,b){var c=qx.lang.Type.getClass(a);
if((c==C||c==B)&&(b==R||b==L)){a=parseInt(a);
}if((c==U||c==C||c==K)&&b==B){a=a+I;
}if((c==C||c==B)&&(b==C||b==N)){a=parseFloat(a);
}return a;
},removeBindingFromObject:function(cD,cE){if(cE.type==Y){for(var i=0;i<cE.sources.length;i++){if(cE.sources[i]){cE.sources[i].removeListenerById(cE.listenerIds[i]);
}}for(var i=0;i<cE.targets.length;i++){if(cE.targets[i]){cE.targets[i].removeListenerById(cE.targetListenerIds[i]);
}}}else{cD.removeListenerById(cE);
}var cF=this.__cn[cD.toHashCode()];
if(cF!=undefined){for(var i=0;i<cF.length;i++){if(cF[i][0]==cE){qx.lang.Array.remove(cF,cF[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(bI){{};
var bJ=this.__cn[bI.toHashCode()];

if(bJ!=undefined){for(var i=bJ.length-1;i>=0;i--){this.removeBindingFromObject(bI,bJ[i][0]);
}}},getAllBindingsForObject:function(bj){if(this.__cn[bj.toHashCode()]===undefined){this.__cn[bj.toHashCode()]=[];
}return this.__cn[bj.toHashCode()];
},removeAllBindings:function(){for(var cf in this.__cn){var ce=qx.core.ObjectRegistry.fromHashCode(cf);
if(ce==null){delete this.__cn[cf];
continue;
}this.removeAllBindingsForObject(ce);
}this.__cn={};
},getAllBindings:function(){return this.__cn;
},showBindingInLog:function(cW,cX){var da;
for(var i=0;i<this.__cn[cW.toHashCode()].length;i++){if(this.__cn[cW.toHashCode()][i][0]==cX){da=this.__cn[cW.toHashCode()][i];
break;
}}
if(da===undefined){var cY=M;
}else{var cY=O+da[1]+V+da[2]+S+da[3]+V+da[4]+T;
}qx.log.Logger.debug(cY);
},showAllBindingsInLog:function(){for(var z in this.__cn){var y=qx.core.ObjectRegistry.fromHashCode(z);

for(var i=0;i<this.__cn[z].length;i++){this.showBindingInLog(y,this.__cn[z][i][0]);
}}}}});
})();
(function(){var A="",z="g",y="0",x='\\$1',w="%",v='-',u="qx.lang.String",t=' ',s='\n',r="undefined";
qx.Class.define(u,{statics:{camelCase:function(j){return j.replace(/\-([a-z])/g,function(n,o){return o.toUpperCase();
});
},hyphenate:function(H){return H.replace(/[A-Z]/g,function(J){return (v+J.charAt(0).toLowerCase());
});
},capitalize:function(a){return a.replace(/\b[a-z]/g,function(Q){return Q.toUpperCase();
});
},clean:function(I){return this.trim(I.replace(/\s+/g,t));
},trimLeft:function(M){return M.replace(/^\s+/,A);
},trimRight:function(E){return E.replace(/\s+$/,A);
},trim:function(N){return N.replace(/^\s+|\s+$/g,A);
},startsWith:function(k,l){return k.indexOf(l)===0;
},endsWith:function(F,G){return F.substring(F.length-G.length,F.length)===G;
},repeat:function(K,L){return K.length>0?new Array(L+1).join(K):A;
},pad:function(B,length,C){var D=length-B.length;

if(D>0){if(typeof C===r){C=y;
}return this.repeat(C,D)+B;
}else{return B;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(O,P){return O.indexOf(P)!=-1;
},format:function(b,c){var d=b;

for(var i=0;i<c.length;i++){d=d.replace(new RegExp(w+(i+1),z),c[i]+A);
}return d;
},escapeRegexpChars:function(p){return p.replace(/([.*+?^${}()|[\]\/\\])/g,x);
},toArray:function(m){return m.split(/\B|\b/g);
},stripTags:function(q){return q.replace(/<\/?[^>]+>/gi,A);
},stripScripts:function(e,f){var h=A;
var g=e.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){h+=arguments[1]+s;
return A;
});

if(f===true){qx.lang.Function.globalEval(h);
}return g;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(e){},setItem:function(i,j){},splice:function(f,g,h){},contains:function(d){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__cC=c;
this.__cD=d||b;
this.__cE=e===undefined?-1:e;
},members:{__cC:null,__cD:null,__cE:null,toString:function(){return this.__cC;
},getUri:function(){return this.__cD;
},getLineNumber:function(){return this.__cE;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){{};
this.__cF=b+(c&&c.message?c.message:c);
Error.call(this,this.__cF);
this.__cG=d;
this.__cH=c;
},members:{__cH:null,__cG:null,__cF:null,toString:function(){return this.__cF;
},getArguments:function(){return this.__cG;
},getSourceException:function(){return this.__cH;
}},destruct:function(){this.__cH=null;
this.__cG=null;
this.__cF=null;
}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cI=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cI:null,message:null,getComment:function(){return this.__cI;
},toString:function(){return this.__cI+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cJ=qx.dev.StackTrace.getStackTrace();
},members:{__cJ:null,getStackTrace:function(){return this.__cJ;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var h="qx.lang.Type",g="Error",f="RegExp",e="Date",d="Number",c="Boolean";
qx.Class.define(h,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(j){return this.getClass(j)==f;
},isNumber:function(a){return (a!==null&&(this.getClass(a)==d||a instanceof Number));
},isBoolean:function(b){return (b!==null&&(this.getClass(b)==c||b instanceof Boolean));
},isDate:function(i){return (i!==null&&(this.getClass(i)==e||i instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==g||k instanceof Error));
}}});
})();
(function(){var h="qx.util.ObjectPool",g="Integer";
qx.Class.define(h,{extend:qx.core.Object,construct:function(n){qx.core.Object.call(this);
this.__cK={};

if(n!=null){this.setSize(n);
}},properties:{size:{check:g,init:Infinity}},members:{__cK:null,getObject:function(j){if(this.$$disposed){return new j;
}
if(!j){throw new Error("Class needs to be defined!");
}var k=null;
var m=this.__cK[j.classname];

if(m){k=m.pop();
}
if(k){k.$$pooled=false;
}else{k=new j;
}return k;
},poolObject:function(d){if(!this.__cK){return;
}var e=d.classname;
var f=this.__cK[e];

if(d.$$pooled){throw new Error("Object is already pooled: "+d);
}
if(!f){this.__cK[e]=f=[];
}if(f.length>this.getSize()){if(d.destroy){d.destroy();
}else{d.dispose();
}return;
}d.$$pooled=true;
f.push(d);
}},destruct:function(){var c=this.__cK;
var a,b,i,l;

for(a in c){b=c[a];

for(i=0,l=b.length;i<l;i++){b[i].dispose();
}}delete this.__cK;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var h="qx.util.DisposeUtil";
qx.Class.define(h,{statics:{disposeObjects:function(j,k,m){var name;

for(var i=0,l=k.length;i<l;i++){name=k[i];

if(j[name]==null||!j.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(j[name].dispose){if(!m&&j[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{j[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}j[name]=null;
}},disposeArray:function(p,q){var s=p[q];

if(!s){return;
}if(qx.core.ObjectRegistry.inShutDown){p[q]=null;
return;
}try{var r;

for(var i=s.length-1;i>=0;i--){r=s[i];

if(r){r.dispose();
}}}catch(n){throw new Error("The array field: "+q+" of object: "+p+" has non disposable entries: "+n);
}s.length=0;
p[q]=null;
},disposeMap:function(a,b){var c=a[b];

if(!c){return;
}if(qx.core.ObjectRegistry.inShutDown){a[b]=null;
return;
}try{for(var d in c){if(c.hasOwnProperty(d)){c[d].dispose();
}}}catch(o){throw new Error("The map field: "+b+" of object: "+a+" has non disposable entries: "+o);
}a[b]=null;
},disposeTriggeredBy:function(e,f){var g=f.dispose;
f.dispose=function(){g.call(f);
e.dispose();
};
}}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(h,i,j){},unregisterEvent:function(d,e,f){}},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var t="indexOf",r="lastIndexOf",q="slice",p="concat",o="join",n="toLocaleUpperCase",m="shift",k="substr",j="filter",h="unshift",P="match",O="quote",N="qx.lang.Generics",M="localeCompare",L="sort",K="some",J="charAt",I="split",H="substring",G="pop",A="toUpperCase",B="replace",y="push",z="charCodeAt",w="every",x="reverse",u="search",v="forEach",C="map",D="toLowerCase",F="splice",E="toLocaleLowerCase";
qx.Class.define(N,{statics:{__cL:{"Array":[o,x,L,y,G,m,h,F,p,q,t,r,v,C,j,K,w],"String":[O,H,D,A,J,z,t,r,E,n,M,P,u,B,I,k,p,q]},__cM:function(f,g){return function(s){return f.prototype[g].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cN:function(){var a=qx.lang.Generics.__cL;

for(var e in a){var c=window[e];
var b=a[e];

for(var i=0,l=b.length;i<l;i++){var d=b[i];

if(!c[d]){c[d]=qx.lang.Generics.__cM(c,d);
}}}}},defer:function(Q){Q.__cN();
}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(g,h,i,j,k){qx.event.type.Event.prototype.init.call(this,j,k);
this._target=h||qx.bom.Event.getTarget(g);
this._relatedTarget=i||qx.bom.Event.getRelatedTarget(g);

if(g.timeStamp){this._timeStamp=g.timeStamp;
}this._native=g;
this._returnValue=null;
return this;
},clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
var f={};
e._native=this._cloneNativeEvent(this._native,f);
e._returnValue=this._returnValue;
return e;
},_cloneNativeEvent:function(b,c){c.preventDefault=qx.lang.Function.empty;
return c;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(l){this._returnValue=l;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var o="iPod",n="Win32",m="",l="Win64",k="Linux",j="BSD",i="Macintosh",h="iPhone",g="Windows",f="qx.bom.client.Platform",c="iPad",e="X11",d="MacIntel",b="MacPPC";
qx.Class.define(f,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__cO:function(){var a=navigator.platform;
if(a==null||a===m){a=navigator.userAgent;
}
if(a.indexOf(g)!=-1||a.indexOf(n)!=-1||a.indexOf(l)!=-1){this.WIN=true;
this.NAME="win";
}else if(a.indexOf(i)!=-1||a.indexOf(b)!=-1||a.indexOf(d)!=-1||a.indexOf(o)!=-1||a.indexOf(h)!=-1||a.indexOf(c)!=-1){this.MAC=true;
this.NAME="mac";
}else if(a.indexOf(e)!=-1||a.indexOf(k)!=-1||a.indexOf(j)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(p){p.__cO();
}});
})();
(function(){var k="win98",j="osx2",i="osx0",h="osx4",g="win95",f="win2000",e="osx1",d="osx5",c="osx3",b="Windows NT 5.01",I=")",H="winxp",G="freebsd",F="sunos",E="SV1",D="|",C="nintendods",B="winnt4",A="wince",z="winme",r="os9",s="\.",p="osx",q="linux",n="netbsd",o="winvista",l="openbsd",m="(",t="win2003",u="symbian",w="win7",v="g",y="qx.bom.client.System",x=" Mobile/";
qx.Class.define(y,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__cP:{"Windows NT 6.1":w,"Windows NT 6.0":o,"Windows NT 5.2":t,"Windows NT 5.1":H,"Windows NT 5.0":f,"Windows 2000":f,"Windows NT 4.0":B,"Win 9x 4.90":z,"Windows CE":A,"Windows 98":k,"Win98":k,"Windows 95":g,"Win95":g,"Linux":q,"FreeBSD":G,"NetBSD":n,"OpenBSD":l,"SunOS":F,"Symbian System":u,"Nitro":C,"PSP":"sonypsp","Mac OS X 10_5":d,"Mac OS X 10.5":d,"Mac OS X 10_4":h,"Mac OS X 10.4":h,"Mac OS X 10_3":c,"Mac OS X 10.3":c,"Mac OS X 10_2":j,"Mac OS X 10.2":j,"Mac OS X 10_1":e,"Mac OS X 10.1":e,"Mac OS X 10_0":i,"Mac OS X 10.0":i,"Mac OS X":p,"Mac OS 9":r},__cQ:function(){var L=navigator.userAgent;
var K=[];

for(var J in this.__cP){K.push(J);
}var M=new RegExp(m+K.join(D).replace(/\./g,s)+I,v);

if(!M.test(L)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(x).test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__cP[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(L.indexOf(b)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&L.indexOf(E)!==-1){this.SP2=true;
}}}}},defer:function(a){a.__cQ();
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(j,k){var n=null;
var q=null;
var t=null;
var u=null;
var p=null;

if(j){n=j.meta.color||null;
q=j.meta.decoration||null;
t=j.meta.font||null;
u=j.meta.icon||null;
p=j.meta.appearance||null;
}var r=qx.theme.manager.Color.getInstance();
var s=qx.theme.manager.Decoration.getInstance();
var l=qx.theme.manager.Font.getInstance();
var o=qx.theme.manager.Icon.getInstance();
var m=qx.theme.manager.Appearance.getInstance();
r.setTheme(n);
s.setTheme(q);
l.setTheme(t);
o.setTheme(u);
m.setTheme(p);
},initialize:function(){var h=qx.core.Setting;
var g,i;
g=h.get(e);

if(g){i=qx.Theme.getByName(g);

if(!i){throw new Error("The theme to use is not available: "+g);
}this.setTheme(i);
}}},settings:{"qx.theme":c}});
})();
(function(){var d="qx.util.ValueManager",c="abstract";
qx.Class.define(d,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(f){return this._dynamic[f];
},isDynamic:function(b){return !!this._dynamic[b];
},resolve:function(a){if(a&&this._dynamic[a]){return this._dynamic[a];
}return a;
},_setDynamic:function(e){this._dynamic=e;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(g){var h={};

if(g){var i=g.colors;
var j=qx.util.ColorUtil;
var k;

for(var l in i){k=i[l];

if(typeof k===b){if(!j.isCssString(k)){throw new Error("Could not parse color: "+k);
}}else if(k instanceof Array){k=j.rgbToRgbString(k);
}else{throw new Error("Could not parse color: "+k);
}h[l]=k;
}}this._setDynamic(h);
},resolve:function(m){var p=this._dynamic;
var n=p[m];

if(n){return n;
}var o=this.getTheme();

if(o!==null&&o.colors[m]){return p[m]=o.colors[m];
}return m;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&(r.colors[q]!==undefined)){s[q]=r.colors[q];
return true;
}return false;
}}});
})();
(function(){var G=",",F="rgb(",E=")",D="qx.theme.manager.Color",C="qx.util.ColorUtil";
qx.Class.define(C,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(bb){return this.NAMED[bb]!==undefined;
},isSystemColor:function(bg){return this.SYSTEM[bg]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(D);
},isThemedColor:function(N){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(N);
},stringToRgb:function(H){if(this.supportsThemes()&&this.isThemedColor(H)){var H=qx.theme.manager.Color.getInstance().resolveDynamic(H);
}
if(this.isNamedColor(H)){return this.NAMED[H];
}else if(this.isSystemColor(H)){throw new Error("Could not convert system colors to RGB: "+H);
}else if(this.isRgbString(H)){return this.__cR();
}else if(this.isHex3String(H)){return this.__cT();
}else if(this.isHex6String(H)){return this.__cU();
}throw new Error("Could not parse color: "+H);
},cssStringToRgb:function(B){if(this.isNamedColor(B)){return this.NAMED[B];
}else if(this.isSystemColor(B)){throw new Error("Could not convert system colors to RGB: "+B);
}else if(this.isRgbString(B)){return this.__cR();
}else if(this.isRgbaString(B)){return this.__cS();
}else if(this.isHex3String(B)){return this.__cT();
}else if(this.isHex6String(B)){return this.__cU();
}throw new Error("Could not parse color: "+B);
},stringToRgbString:function(bh){return this.rgbToRgbString(this.stringToRgb(bh));
},rgbToRgbString:function(bc){return F+bc[0]+G+bc[1]+G+bc[2]+E;
},rgbToHexString:function(bi){return (qx.lang.String.pad(bi[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(bi[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(bi[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(m){return this.isThemedColor(m)||this.isNamedColor(m)||this.isHex3String(m)||this.isHex6String(m)||this.isRgbString(m);
},isCssString:function(u){return this.isSystemColor(u)||this.isNamedColor(u)||this.isHex3String(u)||this.isHex6String(u)||this.isRgbString(u);
},isHex3String:function(k){return this.REGEXP.hex3.test(k);
},isHex6String:function(l){return this.REGEXP.hex6.test(l);
},isRgbString:function(M){return this.REGEXP.rgb.test(M);
},isRgbaString:function(I){return this.REGEXP.rgba.test(I);
},__cR:function(){var s=parseInt(RegExp.$1,10);
var o=parseInt(RegExp.$2,10);
var n=parseInt(RegExp.$3,10);
return [s,o,n];
},__cS:function(){var L=parseInt(RegExp.$1,10);
var K=parseInt(RegExp.$2,10);
var J=parseInt(RegExp.$3,10);
return [L,K,J];
},__cT:function(){var d=parseInt(RegExp.$1,16)*17;
var c=parseInt(RegExp.$2,16)*17;
var a=parseInt(RegExp.$3,16)*17;
return [d,c,a];
},__cU:function(){var j=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var h=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var e=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [j,h,e];
},hex3StringToRgb:function(be){if(this.isHex3String(be)){return this.__cT(be);
}throw new Error("Invalid hex3 value: "+be);
},hex6StringToRgb:function(bf){if(this.isHex6String(bf)){return this.__cU(bf);
}throw new Error("Invalid hex6 value: "+bf);
},hexStringToRgb:function(bd){if(this.isHex3String(bd)){return this.__cT(bd);
}
if(this.isHex6String(bd)){return this.__cU(bd);
}throw new Error("Invalid hex value: "+bd);
},rgbToHsb:function(O){var Q,R,T;
var ba=O[0];
var W=O[1];
var P=O[2];
var Y=(ba>W)?ba:W;

if(P>Y){Y=P;
}var S=(ba<W)?ba:W;

if(P<S){S=P;
}T=Y/255.0;

if(Y!=0){R=(Y-S)/Y;
}else{R=0;
}
if(R==0){Q=0;
}else{var V=(Y-ba)/(Y-S);
var X=(Y-W)/(Y-S);
var U=(Y-P)/(Y-S);

if(ba==Y){Q=U-X;
}else if(W==Y){Q=2.0+V-U;
}else{Q=4.0+X-V;
}Q=Q/6.0;

if(Q<0){Q=Q+1.0;
}}return [Math.round(Q*360),Math.round(R*100),Math.round(T*100)];
},hsbToRgb:function(v){var i,f,p,q,t;
var w=v[0]/360;
var x=v[1]/100;
var y=v[2]/100;

if(w>=1.0){w%=1.0;
}
if(x>1.0){x=1.0;
}
if(y>1.0){y=1.0;
}var z=Math.floor(255*y);
var A={};

if(x==0.0){A.red=A.green=A.blue=z;
}else{w*=6.0;
i=Math.floor(w);
f=w-i;
p=Math.floor(z*(1.0-x));
q=Math.floor(z*(1.0-(x*f)));
t=Math.floor(z*(1.0-(x*(1.0-f))));

switch(i){case 0:A.red=z;
A.green=t;
A.blue=p;
break;
case 1:A.red=q;
A.green=z;
A.blue=p;
break;
case 2:A.red=p;
A.green=z;
A.blue=t;
break;
case 3:A.red=p;
A.green=q;
A.blue=z;
break;
case 4:A.red=t;
A.green=p;
A.blue=z;
break;
case 5:A.red=z;
A.green=p;
A.blue=q;
break;
}}return [A.red,A.green,A.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var p="object",o="_applyTheme",n="qx.theme.manager.Decoration",m="__cV",l="Theme",k="changeTheme",j="string",i="singleton";
qx.Class.define(n,{type:i,extend:qx.core.Object,properties:{theme:{check:l,nullable:true,apply:o,event:k}},members:{__cV:null,resolve:function(c){if(!c){return null;
}
if(typeof c===p){return c;
}var f=this.getTheme();

if(!f){return null;
}var f=this.getTheme();

if(!f){return null;
}var g=this.__cV;

if(!g){g=this.__cV={};
}var d=g[c];

if(d){return d;
}var e=f.decorations[c];

if(!e){return null;
}var h=e.decorator;

if(h==null){throw new Error("Missing definition of which decorator to use in entry: "+c+"!");
}return g[c]=(new h).set(e.style);
},isValidPropertyValue:function(a){if(typeof a===j){return this.isDynamic(a);
}else if(typeof a===p){var b=a.constructor;
return qx.Class.hasInterface(b,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(q){if(!q){return false;
}var r=this.getTheme();

if(!r){return false;
}return !!r.decorations[q];
},_applyTheme:function(s,t){var v=qx.util.AliasManager.getInstance();

if(t){for(var u in t.aliases){v.remove(u);
}}
if(s){for(var u in s.aliases){v.add(u,s.aliases[u]);
}}
if(!s){this.__cV={};
}}},destruct:function(){this._disposeMap(m);
}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(d,e,f){},tint:function(b,c){},getInsets:function(){}}});
})();
(function(){var o="/",n="0",m="qx/static",l="http://",k="https://",j="file://",i="qx.util.AliasManager",h="singleton",g=".",f="static";
qx.Class.define(i,{type:h,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);
this.__cW={};
this.add(f,m);
},members:{__cW:null,_preprocess:function(p){var s=this._getDynamic();

if(s[p]===false){return p;
}else if(s[p]===undefined){if(p.charAt(0)===o||p.charAt(0)===g||p.indexOf(l)===0||p.indexOf(k)===n||p.indexOf(j)===0){s[p]=false;
return p;
}
if(this.__cW[p]){return this.__cW[p];
}var r=p.substring(0,p.indexOf(o));
var q=this.__cW[r];

if(q!==undefined){s[p]=q+p.substring(r.length);
}}return p;
},add:function(a,b){this.__cW[a]=b;
var d=this._getDynamic();
for(var c in d){if(c.substring(0,c.indexOf(o))===a){d[c]=b+c.substring(a.length);
}}},remove:function(e){delete this.__cW[e];
},resolve:function(t){var u=this._getDynamic();

if(t!=null){t=this._preprocess(t);
}return u[t]||t;
}},destruct:function(){this.__cW=null;
}});
})();
(function(){var i="qx.theme.manager.Font",h="Theme",g="changeTheme",f="_applyTheme",e="singleton";
qx.Class.define(i,{type:e,extend:qx.util.ValueManager,properties:{theme:{check:h,nullable:true,apply:f,event:g}},members:{resolveDynamic:function(r){var s=this._dynamic;
return r instanceof qx.bom.Font?r:s[r];
},resolve:function(a){var d=this._dynamic;
var b=d[a];

if(b){return b;
}var c=this.getTheme();

if(c!==null&&c.fonts[a]){return d[a]=(new qx.bom.Font).set(c.fonts[a]);
}return a;
},isDynamic:function(t){var v=this._dynamic;

if(t&&(t instanceof qx.bom.Font||v[t]!==undefined)){return true;
}var u=this.getTheme();

if(u!==null&&t&&u.fonts[t]){v[t]=(new qx.bom.Font).set(u.fonts[t]);
return true;
}return false;
},__cX:function(j,k){if(j[k].include){var l=j[j[k].include];
j[k].include=null;
delete j[k].include;
j[k]=qx.lang.Object.mergeWith(j[k],l,false);
this.__cX(j,k);
}},_applyTheme:function(m){var n=this._getDynamic();

for(var q in n){if(n[q].themed){n[q].dispose();
delete n[q];
}}
if(m){var o=m.fonts;
var p=qx.bom.Font;

for(var q in o){if(o[q].include&&o[o[q].include]){this.__cX(o,q);
}n[q]=(new p).set(o[q]);
n[q].themed=true;
}}this._setDynamic(n);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(A,B){qx.core.Object.call(this);

if(A!==undefined){this.setSize(A);
}
if(B!==undefined){this.setFamily(B);
}},statics:{fromString:function(L){var P=new qx.bom.Font();
var N=L.split(/\s+/);
var name=[];
var O;

for(var i=0;i<N.length;i++){switch(O=N[i]){case c:P.setBold(true);
break;
case e:P.setItalic(true);
break;
case j:P.setDecoration(j);
break;
default:var M=parseInt(O,10);

if(M==O||qx.lang.String.contains(O,g)){P.setSize(M);
}else{name.push(O);
}break;
}}
if(name.length>0){P.setFamily(name);
}return P;
},fromConfig:function(E){var F=new qx.bom.Font;
F.set(E);
return F;
},__cY:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__cY;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__da:null,__db:null,__dc:null,__dd:null,__de:null,__df:null,_applySize:function(G,H){this.__da=G===null?null:G+g;
},_applyLineHeight:function(y,z){this.__df=y===null?null:y;
},_applyFamily:function(I,J){var K=k;

for(var i=0,l=I.length;i<l;i++){if(I[i].indexOf(o)>0){K+=f+I[i]+f;
}else{K+=I[i];
}
if(i!==l-1){K+=n;
}}this.__db=K;
},_applyBold:function(C,D){this.__dc=C===null?null:C?c:d;
},_applyItalic:function(S,T){this.__dd=S===null?null:S?e:d;
},_applyDecoration:function(Q,R){this.__de=Q===null?null:Q;
},getStyles:function(){return {fontFamily:this.__db,fontSize:this.__da,fontWeight:this.__dc,fontStyle:this.__dd,textDecoration:this.__de,lineHeight:this.__df};
}}});
})();
(function(){var c="CSS1Compat",b="qx.bom.client.Feature";
qx.Class.define(b,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:"pointerEvents" in document.documentElement.style,HTML5_CLASSLIST:(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)==="DOMTokenList"),__dg:function(){this.QUIRKS_MODE=this.__dh();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;
},__dh:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==c;
}}},defer:function(a){a.__dg();
}});
})();
(function(){var n="qx.lang.Object";
qx.Class.define(n,{statics:{empty:function(x){{};

for(var y in x){if(x.hasOwnProperty(y)){delete x[y];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(o){{};
return o.__count__===0;
}:
function(I){{};

for(var J in I){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(c,d){{};
return c.__count__>=d;
}:
function(e,f){{};

if(f<=0){return true;
}var length=0;

for(var g in e){if((++length)>=f){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(s){{};
var u=[];
var t=this.getKeys(s);

for(var i=0,l=t.length;i<l;i++){u.push(s[t[i]]);
}return u;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(h,j){{};
return qx.lang.Object.mergeWith(h,j,false);
},merge:function(z,A){{};
var B=arguments.length;

for(var i=1;i<B;i++){qx.lang.Object.mergeWith(z,arguments[i]);
}return z;
},clone:function(p){{};
var q={};

for(var r in p){q[r]=p[r];
}return q;
},invert:function(F){{};
var G={};

for(var H in F){G[F[H].toString()]=H;
}return G;
},getKeyFromValue:function(C,D){{};

for(var E in C){if(C.hasOwnProperty(E)&&C[E]===D){return E;
}}return null;
},contains:function(v,w){{};
return this.getKeyFromValue(v,w)!==null;
},select:function(a,b){{};
return b[a];
},fromArray:function(k){{};
var m={};

for(var i=0,l=k.length;i<l;i++){{};
m[k[i].toString()]=true;
}return m;
}}});
})();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();

if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var j="string",i="_applyTheme",h="qx.theme.manager.Appearance",g=":",f="Theme",e="changeTheme",d="/",c="singleton";
qx.Class.define(h,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__di={};
this.__dj={};
},properties:{theme:{check:f,nullable:true,event:e,apply:i}},members:{__dk:{},__di:null,__dj:null,_applyTheme:function(a,b){this.__dj={};
this.__di={};
},__dl:function(k,l,m){var q=l.appearances;
var t=q[k];

if(!t){var u=d;
var n=[];
var s=k.split(u);
var r;

while(!t&&s.length>0){n.unshift(s.pop());
var o=s.join(u);
t=q[o];

if(t){r=t.alias||t;

if(typeof r===j){var p=r+u+n.join(u);
return this.__dl(p,l,m);
}}}if(m!=null){return this.__dl(m,l);
}return null;
}else if(typeof t===j){return this.__dl(t,l,m);
}else if(t.include&&!t.style){return this.__dl(t.include,l,m);
}return k;
},styleFrom:function(v,w,x,y){if(!x){x=this.getTheme();
}var E=this.__dj;
var z=E[v];

if(!z){z=E[v]=this.__dl(v,x,y);
}var J=x.appearances[z];

if(!J){this.warn("Missing appearance: "+v);
return null;
}if(!J.style){return null;
}var K=z;

if(w){var L=J.$$bits;

if(!L){L=J.$$bits={};
J.$$length=0;
}var C=0;

for(var F in w){if(!w[F]){continue;
}
if(L[F]==null){L[F]=1<<J.$$length++;
}C+=L[F];
}if(C>0){K+=g+C;
}}var D=this.__di;

if(D[K]!==undefined){return D[K];
}if(!w){w=this.__dk;
}var H;
if(J.include||J.base){var B=J.style(w);
var A;

if(J.include){A=this.styleFrom(J.include,w,x,y);
}H={};
if(J.base){var G=this.styleFrom(z,w,J.base,y);

if(J.include){for(var I in G){if(!A.hasOwnProperty(I)&&!B.hasOwnProperty(I)){H[I]=G[I];
}}}else{for(var I in G){if(!B.hasOwnProperty(I)){H[I]=G[I];
}}}}if(J.include){for(var I in A){if(!B.hasOwnProperty(I)){H[I]=A[I];
}}}for(var I in B){H[I]=B[I];
}}else{H=J.style(w);
}return D[K]=H||null;
}},destruct:function(){this.__di=this.__dj=null;
}});
})();
(function(){var D="other",C="widgets",B="fonts",A="appearances",z="qx.Theme",y="]",x="[Theme ",w="colors",v="decorations",u="Theme",r="meta",t="borders",s="icons";
qx.Bootstrap.define(z,{statics:{define:function(name,E){if(!E){var E={};
}E.include=this.__dm(E.include);
E.patch=this.__dm(E.patch);
{};
var F={$$type:u,name:name,title:E.title,toString:this.genericToString};
if(E.extend){F.supertheme=E.extend;
}F.basename=qx.Bootstrap.createNamespace(name,F);
this.__dp(F,E);
this.__dn(F,E);
this.$$registry[name]=F;
for(var i=0,a=E.include,l=a.length;i<l;i++){this.include(F,a[i]);
}
for(var i=0,a=E.patch,l=a.length;i<l;i++){this.patch(F,a[i]);
}},__dm:function(G){if(!G){return [];
}
if(qx.Bootstrap.isArray(G)){return G;
}else{return [G];
}},__dn:function(O,P){var Q=P.aliases||{};

if(P.extend&&P.extend.aliases){qx.Bootstrap.objectMergeWith(Q,P.extend.aliases,false);
}O.aliases=Q;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return x+this.name+y;
},__do:function(b){for(var i=0,c=this.__dq,l=c.length;i<l;i++){if(b[c[i]]){return c[i];
}}},__dp:function(H,I){var L=this.__do(I);
if(I.extend&&!L){L=I.extend.type;
}H.type=L||D;
if(!L){return;
}var N=function(){};
if(I.extend){N.prototype=new I.extend.$$clazz;
}var M=N.prototype;
var K=I[L];
for(var J in K){M[J]=K[J];
if(M[J].base){{};
M[J].base=I.extend;
}}H.$$clazz=N;
H[L]=new N;
},$$registry:{},__dq:[w,t,v,B,s,C,A,r],__dr:null,__ds:null,__dt:function(){},patch:function(k,m){var o=this.__do(m);

if(o!==this.__do(k)){throw new Error("The mixins '"+k.name+"' are not compatible '"+m.name+"'!");
}var n=m[o];
var p=k.$$clazz.prototype;

for(var q in n){p[q]=n[q];
}},include:function(d,e){var g=e.type;

if(g!==d.type){throw new Error("The mixins '"+d.name+"' are not compatible '"+e.name+"'!");
}var f=e[g];
var h=d.$$clazz.prototype;

for(var j in f){if(h[j]!==undefined){continue;
}h[j]=f[j];
}}}});
})();
(function(){var H="Boolean",G="focusout",F="interval",E="mouseover",D="mouseout",C="mousemove",B="widget",A="Use isShowInvalidToolTips() instead.",z="__dv",y="qx.ui.tooltip.ToolTip",r="Use setShowInvalidToolTips() instead.",x="Use initShowInvalidToolTips() instead.",u="Use resetShowInvalidToolTips() instead.",p="_applyCurrent",o="__du",t="qx.ui.tooltip.Manager",s="__dx",v="tooltip-error",n="Use toggleShowInvalidToolTips() instead.",w="singleton",q="Use getShowInvalidToolTips() instead.";
qx.Class.define(t,{type:w,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
qx.event.Registration.addListener(document.body,E,this.__dE,this,true);
this.__du=new qx.event.Timer();
this.__du.addListener(F,this.__dB,this);
this.__dv=new qx.event.Timer();
this.__dv.addListener(F,this.__dC,this);
this.__dw={left:0,top:0};
},properties:{current:{check:y,nullable:true,apply:p},showInvalidToolTips:{check:H,init:true},showToolTips:{check:H,init:true}},members:{__dw:null,__dv:null,__du:null,__dx:null,__dy:null,__dz:function(){if(!this.__dx){this.__dx=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dx;
},__dA:function(){if(!this.__dy){this.__dy=new qx.ui.tooltip.ToolTip().set({appearance:v});
this.__dy.syncAppearance();
}return this.__dy;
},_applyCurrent:function(j,k){if(k&&qx.ui.core.Widget.contains(k,j)){return;
}if(k){if(!k.isDisposed()){k.exclude();
}this.__du.stop();
this.__dv.stop();
}var m=qx.event.Registration;
var l=document.body;
if(j){this.__du.startWith(j.getShowTimeout());
m.addListener(l,D,this.__dF,this,true);
m.addListener(l,G,this.__dG,this,true);
m.addListener(l,C,this.__dD,this,true);
}else{m.removeListener(l,D,this.__dF,this,true);
m.removeListener(l,G,this.__dG,this,true);
m.removeListener(l,C,this.__dD,this,true);
}},__dB:function(e){var i=this.getCurrent();

if(i&&!i.isDisposed()){this.__dv.startWith(i.getHideTimeout());

if(i.getPlaceMethod()==B){i.placeToWidget(i.getOpener());
}else{i.placeToPoint(this.__dw);
}i.show();
}this.__du.stop();
},__dC:function(e){var I=this.getCurrent();

if(I&&!I.isDisposed()){I.exclude();
}this.__dv.stop();
this.resetCurrent();
},__dD:function(e){var K=this.__dw;
K.left=e.getDocumentLeft();
K.top=e.getDocumentTop();
},__dE:function(e){var f=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!f){return;
}var g,h,d,c;
while(f!=null){g=f.getToolTip();
h=f.getToolTipText()||null;
d=f.getToolTipIcon()||null;

if(qx.Class.hasInterface(f.constructor,qx.ui.form.IForm)&&!f.isValid()){c=f.getInvalidMessage();
}
if(g||h||d||c){break;
}f=f.getLayoutParent();
}if(!f||
!f.getEnabled()||
f.isBlockToolTip()||
(!c&&!this.getShowToolTips())||(c&&!this.getShowInvalidToolTips())){return;
}
if(c){g=this.__dA().set({label:c});
}
if(!g){g=this.__dz().set({label:h,icon:d});
}this.setCurrent(g);
g.setOpener(f);
},__dF:function(e){var L=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!L){return;
}var M=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!M){return;
}var N=this.getCurrent();
if(N&&(M==N||qx.ui.core.Widget.contains(N,M))){return;
}if(M&&L&&qx.ui.core.Widget.contains(L,M)){return;
}if(N&&!M){this.setCurrent(null);
}else{this.resetCurrent();
}},__dG:function(e){var a=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!a){return;
}var b=this.getCurrent();
if(b&&b==a.getToolTip()){this.setCurrent(null);
}},setShowInvalidTooltips:function(J){qx.log.Logger.deprecatedMethodWarning(arguments.callee,r);
return this.setShowInvalidToolTips(J);
},getShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,q);
return this.getShowInvalidToolTips();
},resetShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
return this.resetShowInvalidToolTips();
},isShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
return this.isShowInvalidToolTips();
},toggleShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);
return this.toggleShowInvalidToolTips();
},initShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,x);
return this.initShowInvalidToolTips();
}},destruct:function(){qx.event.Registration.removeListener(document.body,E,this.__dE,this,true);
this._disposeObjects(o,z,s);
this.__dw=null;
}});
})();
(function(){var m="interval",l="qx.event.Timer",k="_applyInterval",j="_applyEnabled",i="Boolean",h="qx.event.type.Event",g="Integer";
qx.Class.define(l,{extend:qx.core.Object,construct:function(f){qx.core.Object.call(this);
this.setEnabled(false);

if(f!=null){this.setInterval(f);
}var self=this;
this.__dH=function(){self._oninterval.call(self);
};
},events:{"interval":h},statics:{once:function(a,b,c){var d=new qx.event.Timer(c);
d.__dI=a;
d.addListener(m,function(e){d.stop();
a.call(b,e);
d.dispose();
b=null;
},b);
d.start();
return d;
}},properties:{enabled:{init:true,check:i,apply:j},interval:{check:g,init:1000,apply:k}},members:{__dJ:null,__dH:null,_applyInterval:function(q,r){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(n,o){if(o){window.clearInterval(this.__dJ);
this.__dJ=null;
}else if(n){this.__dJ=window.setInterval(this.__dH,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(s){this.setInterval(s);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(p){this.stop();
this.startWith(p);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(m);
}})},destruct:function(){if(this.__dJ){window.clearInterval(this.__dJ);
}this.__dJ=this.__dH=null;
}});
})();
(function(){var d="qx.ui.core.MChildrenHandling";
qx.Mixin.define(d,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(m){return this._indexOf(m);
},add:function(b,c){this._add(b,c);
},addAt:function(g,h,i){this._addAt(g,h,i);
},addBefore:function(j,k,l){this._addBefore(j,k,l);
},addAfter:function(n,o,p){this._addAfter(n,o,p);
},remove:function(e){this._remove(e);
},removeAt:function(a){return this._removeAt(a);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(f){f.getChildren=f._getChildren;
f.hasChildren=f._hasChildren;
f.indexOf=f._indexOf;
f.add=f._add;
f.addAt=f._addAt;
f.addBefore=f._addBefore;
f.addAfter=f._addAfter;
f.remove=f._remove;
f.removeAt=f._removeAt;
f.removeAll=f._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var O="Integer",N="_applyDimension",M="Boolean",L="_applyStretching",K="_applyMargin",J="shorthand",I="_applyAlign",H="allowShrinkY",G="bottom",F="baseline",bd="marginBottom",bc="qx.ui.core.LayoutItem",bb="center",ba="marginTop",Y="allowGrowX",X="middle",W="marginLeft",V="allowShrinkX",U="top",T="right",R="marginRight",S="abstract",P="allowGrowY",Q="left";
qx.Class.define(bc,{type:S,extend:qx.core.Object,properties:{minWidth:{check:O,nullable:true,apply:N,init:null,themeable:true},width:{check:O,nullable:true,apply:N,init:null,themeable:true},maxWidth:{check:O,nullable:true,apply:N,init:null,themeable:true},minHeight:{check:O,nullable:true,apply:N,init:null,themeable:true},height:{check:O,nullable:true,apply:N,init:null,themeable:true},maxHeight:{check:O,nullable:true,apply:N,init:null,themeable:true},allowGrowX:{check:M,apply:L,init:true,themeable:true},allowShrinkX:{check:M,apply:L,init:true,themeable:true},allowGrowY:{check:M,apply:L,init:true,themeable:true},allowShrinkY:{check:M,apply:L,init:true,themeable:true},allowStretchX:{group:[Y,V],mode:J,themeable:true},allowStretchY:{group:[P,H],mode:J,themeable:true},marginTop:{check:O,init:0,apply:K,themeable:true},marginRight:{check:O,init:0,apply:K,themeable:true},marginBottom:{check:O,init:0,apply:K,themeable:true},marginLeft:{check:O,init:0,apply:K,themeable:true},margin:{group:[ba,R,bd,W],mode:J,themeable:true},alignX:{check:[Q,bb,T],nullable:true,apply:I,themeable:true},alignY:{check:[U,X,G,F],nullable:true,apply:I,themeable:true}},members:{__dK:null,__dL:null,__dM:null,__dN:null,__dO:null,__dP:null,__dQ:null,getBounds:function(){return this.__dP||this.__dL||null;
},clearSeparators:function(){},renderSeparator:function(a,b){},renderLayout:function(w,top,x,y){var z;
{};
var A=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var A=this._getHeightForWidth(x);
}
if(A!=null&&A!==this.__dK){this.__dK=A;
qx.ui.core.queue.Layout.add(this);
return null;
}var C=this.__dL;

if(!C){C=this.__dL={};
}var B={};

if(w!==C.left||top!==C.top){B.position=true;
C.left=w;
C.top=top;
}
if(x!==C.width||y!==C.height){B.size=true;
C.width=x;
C.height=y;
}if(this.__dM){B.local=true;
delete this.__dM;
}
if(this.__dO){B.margin=true;
delete this.__dO;
}return B;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dM;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dM=true;
this.__dN=null;
},getSizeHint:function(o){var p=this.__dN;

if(p){return p;
}
if(o===false){return null;
}p=this.__dN=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dK&&this.getHeight()==null){p.height=this.__dK;
}if(p.minWidth>p.width){p.width=p.minWidth;
}
if(p.maxWidth<p.width){p.width=p.maxWidth;
}
if(!this.getAllowGrowX()){p.maxWidth=p.width;
}
if(!this.getAllowShrinkX()){p.minWidth=p.width;
}if(p.minHeight>p.height){p.height=p.minHeight;
}
if(p.maxHeight<p.height){p.height=p.maxHeight;
}
if(!this.getAllowGrowY()){p.maxHeight=p.height;
}
if(!this.getAllowShrinkY()){p.minHeight=p.height;
}return p;
},_computeSizeHint:function(){var g=this.getMinWidth()||0;
var d=this.getMinHeight()||0;
var h=this.getWidth()||g;
var f=this.getHeight()||d;
var c=this.getMaxWidth()||Infinity;
var e=this.getMaxHeight()||Infinity;
return {minWidth:g,width:h,maxWidth:c,minHeight:d,height:f,maxHeight:e};
},_hasHeightForWidth:function(){var q=this._getLayout();

if(q){return q.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(D){var E=this._getLayout();

if(E&&E.hasHeightForWidth()){return E.getHeightForWidth(D);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__dO=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__dP;
},setUserBounds:function(t,top,u,v){this.__dP={left:t,top:top,width:u,height:v};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__dP;
qx.ui.core.queue.Layout.add(this);
},__dR:{},setLayoutProperties:function(l){if(l==null){return;
}var m=this.__dQ;

if(!m){m=this.__dQ={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(l);
}for(var n in l){if(l[n]==null){delete m[n];
}else{m[n]=l[n];
}}},getLayoutProperties:function(){return this.__dQ||this.__dR;
},clearLayoutProperties:function(){delete this.__dQ;
},updateLayoutProperties:function(i){var j=this._getLayout();

if(j){var k;
{};
j.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var r=qx.core.Object.prototype.clone.call(this);
var s=this.__dQ;

if(s){r.__dQ=qx.lang.Object.clone(s);
}return r;
}},destruct:function(){this.$$parent=this.$$subparent=this.__dQ=this.__dL=this.__dP=this.__dN=null;
}});
})();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__dS={};
},statics:{MAX_SIZE:15,__dT:a},members:{__dS:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(c)){var f=c;
var e=qx.theme.manager.Decoration.getInstance().resolve(c);
}else{var f=h.__dT;
e=c;
}var g=this.__dS;

if(g[f]&&g[f].length>0){var d=g[f].pop();
}else{var d=this._createDecoratorElement(e,f);
}d.$$pooled=false;
return d;
},poolDecorator:function(k){if(!k||k.$$pooled||k.isDisposed()){return;
}var n=qx.ui.core.DecoratorFactory;
var l=k.getId();

if(l==n.__dT){k.dispose();
return;
}var m=this.__dS;

if(!m[l]){m[l]=[];
}
if(m[l].length>n.MAX_SIZE){k.dispose();
}else{k.$$pooled=true;
m[l].push(k);
}},_createDecoratorElement:function(o,p){var q=new qx.html.Decorator(o,p);
{};
return q;
},toString:function(){return qx.core.Object.prototype.toString.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var j=this.__dS;

for(var i in j){qx.util.DisposeUtil.disposeArray(j,i);
}}this.__dS=null;
}});
})();
(function(){var eT="px",eS="Boolean",eR="qx.event.type.Mouse",eQ="qx.event.type.Drag",eP="visible",eO="qx.event.type.Focus",eN="on",eM="Integer",eL="excluded",eK="qx.event.type.Data",ew="_applyPadding",ev="qx.event.type.Event",eu="hidden",et="contextmenu",es="String",er="tabIndex",eq="backgroundColor",ep="focused",eo="changeVisibility",en="mshtml",fb="hovered",fc="qx.event.type.KeySequence",eY="qx.client",fa="absolute",eW="drag",eX="div",eU="disabled",eV="move",fd="dragstart",fe="qx.dynlocale",eD="dragchange",eC="dragend",eF="resize",eE="Decorator",eH="zIndex",eG="opacity",eJ="default",eI="Color",eB="changeToolTipText",eA="beforeContextmenuOpen",dc="_applyNativeContextMenu",dd="_applyBackgroundColor",de="_applyFocusable",df="changeShadow",dg="qx.event.type.KeyInput",dh="createChildControl",di="__eb",dj="Font",dk="_applyShadow",dl="__ei",fi="_applyEnabled",fh="_applySelectable",fg="Number",ff="_applyKeepActive",fm="__dY",fl="__ea",fk="_applyVisibility",fj="__eg",fo="repeat",fn="qxDraggable",dL="syncAppearance",dM="paddingLeft",dJ="_applyDroppable",dK="#",dP="qx.event.type.MouseWheel",dQ="_applyCursor",dN="_applyDraggable",dO="changeTextColor",dH="$$widget",dI="changeContextMenu",du="paddingTop",dt="changeSelectable",dw="hideFocus",dv="none",dq="outline",dp="_applyAppearance",ds="_applyOpacity",dr="url(",dn=")",dm="qx.ui.core.Widget",dV="_applyFont",dW="cursor",dX="qxDroppable",dY="changeZIndex",dR="changeEnabled",dS="changeFont",dT="__ee",dU="__dU",ea="_applyDecorator",eb="_applyZIndex",dE="_applyTextColor",dD="qx.ui.menu.Menu",dC="_applyToolTipText",dB="true",dA="widget",dz="changeDecorator",dy="__dV",dx="_applyTabIndex",dG="changeAppearance",dF="shorthand",ec="/",ed="",ee="_applyContextMenu",ef="paddingBottom",eg="changeNativeContextMenu",eh="qx.ui.tooltip.ToolTip",ei="qxKeepActive",ej="_applyKeepFocus",ek="paddingRight",em="changeBackgroundColor",ez="changeLocale",ey="qxKeepFocus",ex="qx/static/blank.gif";
qx.Class.define(dm,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);
this.__dU=this._createContainerElement();
this.__dV=this.__eh();
this.__dU.add(this.__dV);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:ev,disappear:ev,createChildControl:eK,resize:eK,move:eK,syncAppearance:eK,mousemove:eR,mouseover:eR,mouseout:eR,mousedown:eR,mouseup:eR,click:eR,dblclick:eR,contextmenu:eR,beforeContextmenuOpen:eR,mousewheel:dP,keyup:fc,keydown:fc,keypress:fc,keyinput:dg,focus:eO,blur:eO,focusin:eO,focusout:eO,activate:eO,deactivate:eO,capture:ev,losecapture:ev,drop:eQ,dragleave:eQ,dragover:eQ,drag:eQ,dragstart:eQ,dragend:eQ,dragchange:eQ,droprequest:eQ},properties:{paddingTop:{check:eM,init:0,apply:ew,themeable:true},paddingRight:{check:eM,init:0,apply:ew,themeable:true},paddingBottom:{check:eM,init:0,apply:ew,themeable:true},paddingLeft:{check:eM,init:0,apply:ew,themeable:true},padding:{group:[du,ek,ef,dM],mode:dF,themeable:true},zIndex:{nullable:true,init:null,apply:eb,event:dY,check:eM,themeable:true},decorator:{nullable:true,init:null,apply:ea,event:dz,check:eE,themeable:true},shadow:{nullable:true,init:null,apply:dk,event:df,check:eE,themeable:true},backgroundColor:{nullable:true,check:eI,apply:dd,event:em,themeable:true},textColor:{nullable:true,check:eI,apply:dE,event:dO,themeable:true,inheritable:true},font:{nullable:true,apply:dV,check:dj,event:dS,themeable:true,inheritable:true,dereference:true},opacity:{check:fg,apply:ds,themeable:true,nullable:true,init:null},cursor:{check:es,apply:dQ,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:eh,nullable:true},toolTipText:{check:es,nullable:true,event:eB,apply:dC},toolTipIcon:{check:es,nullable:true,event:eB},blockToolTip:{check:eS,init:false},visibility:{check:[eP,eu,eL],init:eP,apply:fk,event:eo},enabled:{init:true,check:eS,inheritable:true,apply:fi,event:dR},anonymous:{init:false,check:eS},tabIndex:{check:eM,nullable:true,apply:dx},focusable:{check:eS,init:false,apply:de},keepFocus:{check:eS,init:false,apply:ej},keepActive:{check:eS,init:false,apply:ff},draggable:{check:eS,init:false,apply:dN},droppable:{check:eS,init:false,apply:dJ},selectable:{check:eS,init:false,event:dt,apply:fh},contextMenu:{check:dD,apply:ee,nullable:true,event:dI},nativeContextMenu:{check:eS,init:false,themeable:true,event:eg,apply:dc},appearance:{check:es,init:dA,apply:dp,event:dG}},statics:{DEBUG:false,getWidgetByElement:function(o){while(o){var p=o.$$widget;
if(p!=null){return qx.core.ObjectRegistry.fromHashCode(p);
}try{o=o.parentNode;
}catch(e){return null;
}}return null;
},contains:function(parent,gu){while(gu){if(parent==gu){return true;
}gu=gu.getLayoutParent();
}return false;
},__dW:new qx.ui.core.DecoratorFactory(),__dX:new qx.ui.core.DecoratorFactory()},members:{__dU:null,__dV:null,__dY:null,__ea:null,__eb:null,__ec:null,__ed:null,__ee:null,_getLayout:function(){return this.__ee;
},_setLayout:function(S){{};

if(this.__ee){this.__ee.connectToWidget(null);
}
if(S){S.connectToWidget(this);
}this.__ee=S;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var q=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(q);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(q);
}this.$$refreshInheritables();
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__ef:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var bz=qx.theme.manager.Decoration.getInstance();
var bB=bz.resolve(a).getInsets();
var bA=bz.resolve(b).getInsets();

if(bB.top!=bA.top||bB.right!=bA.right||bB.bottom!=bA.bottom||bB.left!=bA.left){return true;
}return false;
},renderLayout:function(fT,top,fU,fV){var gf=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,fT,top,fU,fV);
if(!gf){return;
}var fX=this.getContainerElement();
var content=this.getContentElement();
var gc=gf.size||this._updateInsets;
var gg=eT;
var gd={};
if(gf.position){gd.left=fT+gg;
gd.top=top+gg;
}if(gf.size){gd.width=fU+gg;
gd.height=fV+gg;
}
if(gf.position||gf.size){fX.setStyles(gd);
}
if(gc||gf.local||gf.margin){var fW=this.getInsets();
var innerWidth=fU-fW.left-fW.right;
var innerHeight=fV-fW.top-fW.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var ga={};

if(this._updateInsets){ga.left=fW.left+gg;
ga.top=fW.top+gg;
}
if(gc){ga.width=innerWidth+gg;
ga.height=innerHeight+gg;
}
if(gc||this._updateInsets){content.setStyles(ga);
}
if(gf.size){var ge=this.__eb;

if(ge){ge.setStyles({width:fU+eT,height:fV+eT});
}}
if(gf.size||this._updateInsets){if(this.__dY){this.__dY.resize(fU,fV);
}}
if(gf.size){if(this.__ea){var fW=this.__ea.getInsets();
var gb=fU+fW.left+fW.right;
var fY=fV+fW.top+fW.bottom;
this.__ea.resize(gb,fY);
}}
if(gc||gf.local||gf.margin){if(this.__ee&&this.hasLayoutChildren()){this.__ee.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(gf.position&&this.hasListener(eV)){this.fireDataEvent(eV,this.getBounds());
}
if(gf.size&&this.hasListener(eF)){this.fireDataEvent(eF,this.getBounds());
}delete this._updateInsets;
return gf;
},__eg:null,clearSeparators:function(){var bY=this.__eg;

if(!bY){return;
}var ca=qx.ui.core.Widget.__dW;
var content=this.getContentElement();
var bX;

for(var i=0,l=bY.length;i<l;i++){bX=bY[i];
ca.poolDecorator(bX);
content.remove(bX);
}bY.length=0;
},renderSeparator:function(f,g){var h=qx.ui.core.Widget.__dW.getDecoratorElement(f);
this.getContentElement().add(h);
h.resize(g.width,g.height);
h.setStyles({left:g.left+eT,top:g.top+eT});
if(!this.__eg){this.__eg=[h];
}else{this.__eg.push(h);
}},_computeSizeHint:function(){var bS=this.getWidth();
var bR=this.getMinWidth();
var bN=this.getMaxWidth();
var bQ=this.getHeight();
var bO=this.getMinHeight();
var bP=this.getMaxHeight();
{};
var bT=this._getContentHint();
var bM=this.getInsets();
var bV=bM.left+bM.right;
var bU=bM.top+bM.bottom;

if(bS==null){bS=bT.width+bV;
}
if(bQ==null){bQ=bT.height+bU;
}
if(bR==null){bR=bV;

if(bT.minWidth!=null){bR+=bT.minWidth;
}}
if(bO==null){bO=bU;

if(bT.minHeight!=null){bO+=bT.minHeight;
}}
if(bN==null){if(bT.maxWidth==null){bN=Infinity;
}else{bN=bT.maxWidth+bV;
}}
if(bP==null){if(bT.maxHeight==null){bP=Infinity;
}else{bP=bT.maxHeight+bU;
}}return {width:bS,minWidth:bR,maxWidth:bN,height:bQ,minHeight:bO,maxHeight:bP};
},invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);

if(this.__ee){this.__ee.invalidateLayoutCache();
}},_getContentHint:function(){var co=this.__ee;

if(co){if(this.hasLayoutChildren()){var cn;
var cp=co.getSizeHint();
{};
return cp;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(A){var E=this.getInsets();
var H=E.left+E.right;
var G=E.top+E.bottom;
var F=A-H;
var C=this._getLayout();

if(C&&C.hasHeightForWidth()){var B=C.getHeightForWidth(A);
}else{B=this._getContentHeightForWidth(F);
}var D=B+G;
return D;
},_getContentHeightForWidth:function(bW){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var k=this.getPaddingRight();
var n=this.getPaddingBottom();
var m=this.getPaddingLeft();

if(this.__dY){var j=this.__dY.getInsets();
{};
top+=j.top;
k+=j.right;
n+=j.bottom;
m+=j.left;
}return {"top":top,"right":k,"bottom":n,"left":m};
},getInnerSize:function(){var gC=this.getBounds();

if(!gC){return null;
}var gB=this.getInsets();
return {width:gC.width-gB.left-gB.right,height:gC.height-gB.top-gB.bottom};
},show:function(){this.setVisibility(eP);
},hide:function(){this.setVisibility(eu);
},exclude:function(){this.setVisibility(eL);
},isVisible:function(){return this.getVisibility()===eP;
},isHidden:function(){return this.getVisibility()!==eP;
},isExcluded:function(){return this.getVisibility()===eL;
},isSeeable:function(){var fv=this.getContainerElement().getDomElement();

if(fv){return fv.offsetWidth>0;
}var fu=this;

do{if(!fu.isVisible()){return false;
}
if(fu.isRootWidget()){return true;
}fu=fu.getLayoutParent();
}while(fu);
return false;
},_createContainerElement:function(){var db={"$$widget":this.toHashCode()};
{};
var da={zIndex:0,position:fa};
return new qx.html.Element(eX,da,db);
},__eh:function(){var cb=this._createContentElement();
{};
cb.setStyles({"position":fa,"zIndex":10});
return cb;
},_createContentElement:function(){return new qx.html.Element(eX,{overflowX:eu,overflowY:eu});
},getContainerElement:function(){return this.__dU;
},getContentElement:function(){return this.__dV;
},getDecoratorElement:function(){return this.__dY||null;
},getShadowElement:function(){return this.__ea||null;
},__ei:null,getLayoutChildren:function(){var fx=this.__ei;

if(!fx){return this.__ej;
}var fy;

for(var i=0,l=fx.length;i<l;i++){var fw=fx[i];

if(fw.hasUserBounds()||fw.isExcluded()){if(fy==null){fy=fx.concat();
}qx.lang.Array.remove(fy,fw);
}}return fy||fx;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var gx=this.__ee;

if(gx){gx.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var cQ=this.__ei;

if(!cQ){return false;
}var cR;

for(var i=0,l=cQ.length;i<l;i++){cR=cQ[i];

if(!cR.hasUserBounds()&&!cR.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__ej:[],_getChildren:function(){return this.__ei||this.__ej;
},_indexOf:function(cG){var cH=this.__ei;

if(!cH){return -1;
}return cH.indexOf(cG);
},_hasChildren:function(){var T=this.__ei;
return T!=null&&(!!T[0]);
},addChildrenToQueue:function(fK){var fL=this.__ei;

if(!fL){return;
}var fM;

for(var i=0,l=fL.length;i<l;i++){fM=fL[i];
fK[fM.$$hash]=fM;
fM.addChildrenToQueue(fK);
}},_add:function(cI,cJ){if(cI.getLayoutParent()==this){qx.lang.Array.remove(this.__ei,cI);
}
if(this.__ei){this.__ei.push(cI);
}else{this.__ei=[cI];
}this.__ek(cI,cJ);
},_addAt:function(cS,cT,cU){if(!this.__ei){this.__ei=[];
}if(cS.getLayoutParent()==this){qx.lang.Array.remove(this.__ei,cS);
}var cV=this.__ei[cT];

if(cV===cS){return cS.setLayoutProperties(cU);
}
if(cV){qx.lang.Array.insertBefore(this.__ei,cS,cV);
}else{this.__ei.push(cS);
}this.__ek(cS,cU);
},_addBefore:function(gk,gl,gm){{};

if(gk==gl){return;
}
if(!this.__ei){this.__ei=[];
}if(gk.getLayoutParent()==this){qx.lang.Array.remove(this.__ei,gk);
}qx.lang.Array.insertBefore(this.__ei,gk,gl);
this.__ek(gk,gm);
},_addAfter:function(gP,gQ,gR){{};

if(gP==gQ){return;
}
if(!this.__ei){this.__ei=[];
}if(gP.getLayoutParent()==this){qx.lang.Array.remove(this.__ei,gP);
}qx.lang.Array.insertAfter(this.__ei,gP,gQ);
this.__ek(gP,gR);
},_remove:function(gY){if(!this.__ei){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__ei,gY);
this.__el(gY);
},_removeAt:function(ck){if(!this.__ei){throw new Error("This widget has no children!");
}var cl=this.__ei[ck];
qx.lang.Array.removeAt(this.__ei,ck);
this.__el(cl);
return cl;
},_removeAll:function(){if(!this.__ei){return;
}var gG=this.__ei.concat();
this.__ei.length=0;

for(var i=gG.length-1;i>=0;i--){this.__el(gG[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ek:function(O,P){{};
var parent=O.getLayoutParent();

if(parent&&parent!=this){parent._remove(O);
}O.setLayoutParent(this);
if(P){O.setLayoutProperties(P);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(O);
}},__el:function(cW){{};

if(cW.getLayoutParent()!==this){throw new Error("Remove Error: "+cW+" is not a child of this widget!");
}cW.setLayoutParent(null);
if(this.__ee){this.__ee.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(cW);
}},capture:function(M){this.getContainerElement().capture(M);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(cE,cF,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__eb){return;
}var cq=this.__eb=new qx.html.Element;
{};
cq.setStyles({position:fa,top:0,left:0,zIndex:7});
var cr=this.getBounds();

if(cr){this.__eb.setStyles({width:cr.width+eT,height:cr.height+eT});
}if(qx.core.Variant.isSet(eY,en)){cq.setStyles({backgroundImage:dr+qx.util.ResourceManager.getInstance().toUri(ex)+dn,backgroundRepeat:fo});
}this.getContainerElement().add(cq);
},_applyDecorator:function(bj,bk){{};
var bo=qx.ui.core.Widget.__dW;
var bm=this.getContainerElement();
if(!this.__eb&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(bk){bm.remove(this.__dY);
bo.poolDecorator(this.__dY);
}if(bj){var bn=this.__dY=bo.getDecoratorElement(bj);
bn.setStyle(eH,5);
var bl=this.getBackgroundColor();
bn.tint(bl);
bm.add(bn);
}else{delete this.__dY;
this._applyBackgroundColor(this.getBackgroundColor());
}if(bj&&!bk&&bl){this.getContainerElement().setStyle(eq,null);
}if(this.__ef(bk,bj)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(bj){var bp=this.getBounds();

if(bp){bn.resize(bp.width,bp.height);
this.__eb&&
this.__eb.setStyles({width:bp.width+eT,height:bp.height+eT});
}}},_applyShadow:function(bq,br){var by=qx.ui.core.Widget.__dX;
var bt=this.getContainerElement();
if(br){bt.remove(this.__ea);
by.poolDecorator(this.__ea);
}if(bq){var bv=this.__ea=by.getDecoratorElement(bq);
bt.add(bv);
var bx=bv.getInsets();
bv.setStyles({left:(-bx.left)+eT,top:(-bx.top)+eT});
var bw=this.getBounds();

if(bw){var bu=bw.width+bx.left+bx.right;
var bs=bw.height+bx.top+bx.bottom;
bv.resize(bu,bs);
}bv.tint(null);
}else{delete this.__ea;
}},_applyToolTipText:function(cB,cC){if(qx.core.Variant.isSet(fe,eN)){if(this.__ed){return;
}var cD=qx.locale.Manager.getInstance();
this.__ed=cD.addListener(ez,function(){if(cB&&cB.translate){this.setToolTipText(cB.translate());
}},this);
}},_applyTextColor:function(cO,cP){},_applyZIndex:function(bE,bF){this.getContainerElement().setStyle(eH,bE==null?0:bE);
},_applyVisibility:function(bG,bH){var bI=this.getContainerElement();

if(bG===eP){bI.show();
}else{bI.hide();
}var parent=this.$$parent;

if(parent&&(bH==null||bG==null||bH===eL||bG===eL)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(bJ,bK){this.getContainerElement().setStyle(eG,bJ==1?null:bJ);
if(qx.core.Variant.isSet(eY,en)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var bL=(bJ==1||bJ==null)?null:0.99;
this.getContentElement().setStyle(eG,bL);
}}},_applyCursor:function(fB,fC){if(fB==null&&!this.isSelectable()){fB=eJ;
}this.getContainerElement().setStyle(dW,fB,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(fp,fq){var fr=this.getBackgroundColor();
var ft=this.getContainerElement();

if(this.__dY){this.__dY.tint(fr);
ft.setStyle(eq,null);
}else{var fs=qx.theme.manager.Color.getInstance().resolve(fr);
ft.setStyle(eq,fs);
}},_applyFont:function(ci,cj){},__em:null,$$stateChanges:null,_forwardStates:null,hasState:function(fP){var fQ=this.__em;
return !!fQ&&!!fQ[fP];
},addState:function(gS){var gT=this.__em;

if(!gT){gT=this.__em={};
}
if(gT[gS]){return;
}this.__em[gS]=true;
if(gS===fb){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var gW=this.__ep;

if(forward&&forward[gS]&&gW){var gU;

for(var gV in gW){gU=gW[gV];

if(gU instanceof qx.ui.core.Widget){gW[gV].addState(gS);
}}}},removeState:function(gH){var gI=this.__em;

if(!gI||!gI[gH]){return;
}delete this.__em[gH];
if(gH===fb){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var gL=this.__ep;

if(forward&&forward[gH]&&gL){for(var gK in gL){var gJ=gL[gK];

if(gJ instanceof qx.ui.core.Widget){gJ.removeState(gH);
}}}},replaceState:function(cc,cd){var ce=this.__em;

if(!ce){ce=this.__em={};
}
if(!ce[cd]){ce[cd]=true;
}
if(ce[cc]){delete ce[cc];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var ch=this.__ep;

if(forward&&forward[cd]&&ch){for(var cg in ch){var cf=ch[cg];

if(cf instanceof qx.ui.core.Widget){cf.replaceState(cc,cd);
}}}},__en:null,__eo:null,syncAppearance:function(){var Y=this.__em;
var X=this.__en;
var ba=qx.theme.manager.Appearance.getInstance();
var V=qx.core.Property.$$method.setThemed;
var be=qx.core.Property.$$method.resetThemed;
if(this.__eo){delete this.__eo;
if(X){var U=ba.styleFrom(X,Y,null,this.getAppearance());
if(U){X=null;
}}}if(!X){var W=this;
var bd=[];

do{bd.push(W.$$subcontrol||W.getAppearance());
}while(W=W.$$subparent);
X=this.__en=bd.reverse().join(ec).replace(/#[0-9]+/g,ed);
}var bb=ba.styleFrom(X,Y,null,this.getAppearance());

if(bb){var bc;

if(U){for(var bc in U){if(bb[bc]===undefined){this[be[bc]]();
}}}{};
for(var bc in bb){bb[bc]===undefined?this[be[bc]]():this[V[bc]](bb[bc]);
}}else if(U){for(var bc in U){this[be[bc]]();
}}this.fireDataEvent(dL,this.__em);
},_applyAppearance:function(I,J){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__ec){qx.ui.core.queue.Appearance.add(this);
this.__ec=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__eo=true;
qx.ui.core.queue.Appearance.add(this);
var gF=this.__ep;

if(gF){var gD;

for(var gE in gF){gD=gF[gE];

if(gD instanceof qx.ui.core.Widget){gD.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var cm=this;

while(cm.getAnonymous()){cm=cm.getLayoutParent();

if(!cm){return null;
}}return cm;
},getFocusTarget:function(){var N=this;

if(!N.getEnabled()){return null;
}
while(N.getAnonymous()||!N.getFocusable()){N=N.getLayoutParent();

if(!N||!N.getEnabled()){return null;
}}return N;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(cK,cL){var cM=this.getFocusElement();
if(cK){var cN=this.getTabIndex();

if(cN==null){cN=1;
}cM.setAttribute(er,cN);
if(qx.core.Variant.isSet(eY,en)){cM.setAttribute(dw,dB);
}else{cM.setStyle(dq,dv);
}}else{if(cM.isNativelyFocusable()){cM.setAttribute(er,-1);
}else if(cL){cM.setAttribute(er,null);
}}},_applyKeepFocus:function(bh){var bi=this.getFocusElement();
bi.setAttribute(ey,bh?eN:null);
},_applyKeepActive:function(cX){var cY=this.getContainerElement();
cY.setAttribute(ei,cX?eN:null);
},_applyTabIndex:function(gj){if(gj==null){gj=1;
}else if(gj<1||gj>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gj!=null){this.getFocusElement().setAttribute(er,gj);
}},_applySelectable:function(gv,gw){if(gw!==null){this._applyCursor(this.getCursor());
}this.getContainerElement().setSelectable(gv);
this.getContentElement().setSelectable(gv);
},_applyEnabled:function(c,d){if(c===false){this.addState(eU);
this.removeState(fb);
if(this.isFocusable()){this.removeState(ep);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(eU);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(cz,cA,name){},_applyContextMenu:function(gy,gz){if(gz){gz.removeState(et);

if(gz.getOpener()==this){gz.resetOpener();
}
if(!gy){this.removeListener(et,this._onContextMenuOpen);
gz.removeListener(eo,this._onBeforeContextMenuOpen,this);
}}
if(gy){gy.setOpener(this);
gy.addState(et);

if(!gz){this.addListener(et,this._onContextMenuOpen);
gy.addListener(eo,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==eP&&this.hasListener(eA)){this.fireDataEvent(eA,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(fD,fE){if(!this.isEnabled()&&fD===true){fD=false;
}qx.ui.core.DragDropCursor.getInstance();
if(fD){this.addListener(fd,this._onDragStart);
this.addListener(eW,this._onDrag);
this.addListener(eC,this._onDragEnd);
this.addListener(eD,this._onDragChange);
}else{this.removeListener(fd,this._onDragStart);
this.removeListener(eW,this._onDrag);
this.removeListener(eC,this._onDragEnd);
this.removeListener(eD,this._onDragChange);
}this.getContainerElement().setAttribute(fn,fD?eN:null);
},_applyDroppable:function(Q,R){if(!this.isEnabled()&&Q===true){Q=false;
}this.getContainerElement().setAttribute(dX,Q?eN:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(eJ);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var fz=qx.ui.core.DragDropCursor.getInstance();
var fA=e.getCurrentAction();
fA?fz.setAction(fA):fz.resetAction();
},visualizeFocus:function(){this.addState(ep);
},visualizeBlur:function(){this.removeState(ep);
},scrollChildIntoView:function(cs,ct,cu,cv){this.scrollChildIntoViewX(cs,ct,cv);
this.scrollChildIntoViewY(cs,cu,cv);
},scrollChildIntoViewX:function(gn,go,gp){this.getContentElement().scrollChildIntoViewX(gn.getContainerElement(),go,gp);
},scrollChildIntoViewY:function(cw,cx,cy){this.getContentElement().scrollChildIntoViewY(cw.getContainerElement(),cx,cy);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(fH){if(!this.__ep){return false;
}return !!this.__ep[fH];
},__ep:null,_getCreatedChildControls:function(){return this.__ep;
},getChildControl:function(gM,gN){if(!this.__ep){if(gN){return null;
}this.__ep={};
}var gO=this.__ep[gM];

if(gO){return gO;
}
if(gN===true){return null;
}return this._createChildControl(gM);
},_showChildControl:function(gs){var gt=this.getChildControl(gs);
gt.show();
return gt;
},_excludeChildControl:function(bf){var bg=this.getChildControl(bf,true);

if(bg){bg.exclude();
}},_isChildControlVisible:function(bC){var bD=this.getChildControl(bC,true);

if(bD){return bD.isVisible();
}return false;
},_createChildControl:function(r){if(!this.__ep){this.__ep={};
}else if(this.__ep[r]){throw new Error("Child control '"+r+"' already created!");
}var v=r.indexOf(dK);

if(v==-1){var s=this._createChildControlImpl(r);
}else{var s=this._createChildControlImpl(r.substring(0,v));
}
if(!s){throw new Error("Unsupported control: "+r);
}s.$$subcontrol=r;
s.$$subparent=this;
var t=this.__em;
var forward=this._forwardStates;

if(t&&forward&&s instanceof qx.ui.core.Widget){for(var u in t){if(forward[u]){s.addState(u);
}}}this.fireDataEvent(dh,s);
return this.__ep[r]=s;
},_createChildControlImpl:function(gA){return null;
},_disposeChildControls:function(){var z=this.__ep;

if(!z){return;
}var x=qx.ui.core.Widget;

for(var y in z){var w=z[y];

if(!x.contains(this,w)){w.destroy();
}else{w.dispose();
}}delete this.__ep;
},_findTopControl:function(){var gX=this;

while(gX){if(!gX.$$subparent){return gX;
}gX=gX.$$subparent;
}return null;
},getContainerLocation:function(fI){var fJ=this.getContainerElement().getDomElement();
return fJ?qx.bom.element.Location.get(fJ,fI):null;
},getContentLocation:function(fN){var fO=this.getContentElement().getDomElement();
return fO?qx.bom.element.Location.get(fO,fN):null;
},setDomLeft:function(K){var L=this.getContainerElement().getDomElement();

if(L){L.style.left=K+eT;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(gq){var gr=this.getContainerElement().getDomElement();

if(gr){gr.style.top=gq+eT;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(gh,top){var gi=this.getContainerElement().getDomElement();

if(gi){gi.style.left=gh+eT;
gi.style.top=top+eT;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var fF=qx.ui.core.LayoutItem.prototype.clone.call(this);

if(this.getChildren){var fG=this.getChildren();

for(var i=0,l=fG.length;i<l;i++){fF.add(fG[i].clone());
}}return fF;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(fe,eN)){if(this.__ed){qx.locale.Manager.getInstance().removeListenerById(this.__ed);
}}this.getContainerElement().setAttribute(dH,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var fS=qx.ui.core.Widget;
var fR=this.getContainerElement();

if(this.__dY){fR.remove(this.__dY);
fS.__dW.poolDecorator(this.__dY);
}
if(this.__ea){fR.remove(this.__ea);
fS.__dX.poolDecorator(this.__ea);
}this.clearSeparators();
this.__dY=this.__ea=this.__eg=null;
}else{this._disposeArray(fj);
this._disposeObjects(fm,fl);
}this._disposeArray(dl);
this.__em=this.__ep=null;
this._disposeObjects(dT,dU,dy,di);
}});
})();
(function(){var g="qx.event.type.Data",f="qx.ui.container.Composite",e="addChildWidget",d="removeChildWidget";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(a){qx.ui.core.Widget.call(this);

if(a!=null){this._setLayout(a);
}},events:{addChildWidget:g,removeChildWidget:g},members:{_afterAddChild:function(i){this.fireNonBubblingEvent(e,qx.event.type.Data,[i]);
},_afterRemoveChild:function(h){this.fireNonBubblingEvent(d,qx.event.type.Data,[h]);
}},defer:function(b,c){qx.ui.core.MChildrenHandling.remap(c);
qx.ui.core.MLayoutHandling.remap(c);
}});
})();
(function(){var m="Integer",l="interval",k="keep-align",j="disappear",i="best-fit",h="mouse",g="bottom-left",f="direct",e="Boolean",d="bottom-right",A="widget",z="qx.ui.core.MPlacement",y="left-top",x="offsetRight",w="shorthand",v="offsetLeft",u="top-left",t="appear",s="offsetBottom",r="top-right",p="offsetTop",q="right-bottom",n="right-top",o="left-bottom";
qx.Mixin.define(z,{properties:{position:{check:[u,r,g,d,y,o,n,q],init:g,themeable:true},placeMethod:{check:[A,h],init:h,themeable:true},domMove:{check:e,init:false},placementModeX:{check:[f,k,i],init:k,themeable:true},placementModeY:{check:[f,k,i],init:k,themeable:true},offsetLeft:{check:m,init:0,themeable:true},offsetTop:{check:m,init:0,themeable:true},offsetRight:{check:m,init:0,themeable:true},offsetBottom:{check:m,init:0,themeable:true},offset:{group:[p,x,s,v],mode:w,themeable:true}},members:{__eq:null,__er:null,__es:null,getLayoutLocation:function(H){var K,J,L,top;
J=H.getBounds();
L=J.left;
top=J.top;
var M=J;
H=H.getLayoutParent();

while(H&&!H.isRootWidget()){J=H.getBounds();
L+=J.left;
top+=J.top;
K=H.getInsets();
L+=K.left;
top+=K.top;
H=H.getLayoutParent();
}if(H.isRootWidget()){var I=H.getContainerLocation();

if(I){L+=I.left;
top+=I.top;
}}return {left:L,top:top,right:L+M.width,bottom:top+M.height};
},moveTo:function(B,top){if(this.getDomMove()){this.setDomPosition(B,top);
}else{this.setLayoutProperties({left:B,top:top});
}},placeToWidget:function(P,Q){if(Q){this.__et();
this.__eq=qx.lang.Function.bind(this.placeToWidget,this,P,false);
qx.event.Idle.getInstance().addListener(l,this.__eq);
this.__es=function(){this.__et();
};
this.addListener(j,this.__es,this);
}var R=P.getContainerLocation()||this.getLayoutLocation(P);
this.__ev(R);
},__et:function(){if(this.__eq){qx.event.Idle.getInstance().removeListener(l,this.__eq);
this.__eq=null;
}
if(this.__es){this.removeListener(j,this.__es,this);
this.__es=null;
}},placeToMouse:function(event){var D=event.getDocumentLeft();
var top=event.getDocumentTop();
var C={left:D,top:top,right:D,bottom:top};
this.__ev(C);
},placeToElement:function(E,F){var location=qx.bom.element.Location.get(E);
var G={left:location.left,top:location.top,right:location.left+E.offsetWidth,bottom:location.top+E.offsetHeight};
if(F){this.__eq=qx.lang.Function.bind(this.placeToElement,this,E,false);
qx.event.Idle.getInstance().addListener(l,this.__eq);
this.addListener(j,function(){if(this.__eq){qx.event.Idle.getInstance().removeListener(l,this.__eq);
this.__eq=null;
}},this);
}this.__ev(G);
},placeToPoint:function(a){var b={left:a.left,top:a.top,right:a.left,bottom:a.top};
this.__ev(b);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__eu:function(S){var T=null;

if(this._computePlacementSize){var T=this._computePlacementSize();
}else if(this.isVisible()){var T=this.getBounds();
}
if(T==null){this.addListenerOnce(t,function(){this.__eu(S);
},this);
}else{S.call(this,T);
}},__ev:function(c){this.__eu(function(N){var O=qx.util.placement.Placement.compute(N,this.getLayoutParent().getBounds(),c,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(O.left,O.top);
});
}},destruct:function(){this.__et();
}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(i){qx.ui.container.Composite.call(this,i);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(f,g){qx.ui.container.Composite.prototype._applyVisibility.call(this,f,g);
var h=qx.ui.popup.Manager.getInstance();
f===d?h.add(this):h.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var u="atom",t="Integer",s="String",r="_applyRich",q="qx.ui.tooltip.ToolTip",p="_applyIcon",o="tooltip",n="qx.ui.core.Widget",m="mouseover",l="Boolean",k="_applyLabel";
qx.Class.define(q,{extend:qx.ui.popup.Popup,construct:function(x,y){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(u);
if(x!=null){this.setLabel(x);
}
if(y!=null){this.setIcon(y);
}this.addListener(m,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:o},showTimeout:{check:t,init:700,themeable:true},hideTimeout:{check:t,init:4000,themeable:true},label:{check:s,nullable:true,apply:k},icon:{check:s,nullable:true,apply:p,themeable:true},rich:{check:l,init:false,apply:r},opener:{check:n,nullable:true}},members:{_createChildControlImpl:function(v){var w;

switch(v){case u:w=new qx.ui.basic.Atom;
this._add(w);
break;
}return w||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,v);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(h,i){var j=this.getChildControl(u);
h==null?j.resetIcon():j.setIcon(h);
},_applyLabel:function(d,f){var g=this.getChildControl(u);
d==null?g.resetLabel():g.setLabel(d);
},_applyRich:function(a,b){var c=this.getChildControl(u);
c.setRich(a);
}}});
})();
(function(){var f="qx.ui.core.queue.Layout",e="layout";
qx.Class.define(f,{statics:{__ew:{},remove:function(w){delete this.__ew[w.$$hash];
},add:function(g){this.__ew[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(e);
},flush:function(){var x=this.__ez();
for(var i=x.length-1;i>=0;i--){var y=x[i];
if(y.hasValidLayout()){continue;
}if(y.isRootWidget()&&!y.hasUserBounds()){var A=y.getSizeHint();
y.renderLayout(0,0,A.width,A.height);
}else{var z=y.getBounds();
y.renderLayout(z.left,z.top,z.width,z.height);
}}},getNestingLevel:function(a){var b=this.__ey;
var d=0;
var parent=a;
while(true){if(b[parent.$$hash]!=null){d+=b[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
d+=1;
}var c=d;

while(a&&a!==parent){b[a.$$hash]=c--;
a=a.$$parent;
}return d;
},__ex:function(){var n=qx.ui.core.queue.Visibility;
this.__ey={};
var m=[];
var l=this.__ew;
var h,k;

for(var j in l){h=l[j];

if(n.isVisible(h)){k=this.getNestingLevel(h);
if(!m[k]){m[k]={};
}m[k][j]=h;
delete l[j];
}}return m;
},__ez:function(){var r=[];
var t=this.__ex();

for(var q=t.length-1;q>=0;q--){if(!t[q]){continue;
}
for(var p in t[q]){var o=t[q][p];
if(q==0||o.isRootWidget()||o.hasUserBounds()){r.push(o);
o.invalidateLayoutCache();
continue;
}var v=o.getSizeHint(false);

if(v){o.invalidateLayoutCache();
var s=o.getSizeHint();
var u=(!o.getBounds()||v.minWidth!==s.minWidth||v.width!==s.width||v.maxWidth!==s.maxWidth||v.minHeight!==s.minHeight||v.height!==s.height||v.maxHeight!==s.maxHeight);
}else{u=true;
}
if(u){var parent=o.getLayoutParent();

if(!t[q-1]){t[q-1]={};
}t[q-1][parent.$$hash]=parent;
}else{r.push(o);
}}}return r;
}}});
})();
(function(){var d="qx.event.handler.UserAction";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(k){qx.core.Object.call(this);
this.__eA=k;
this.__eB=k.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eA:null,__eB:null,canHandleEvent:function(b,c){},registerEvent:function(h,i,j){},unregisterEvent:function(e,f,g){}},destruct:function(){this.__eA=this.__eB=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var f="qx.util.DeferredCallManager",e="singleton";
qx.Class.define(f,{extend:qx.core.Object,type:e,construct:function(){this.__eC={};
this.__eD=qx.lang.Function.bind(this.__eH,this);
this.__eE=false;
},members:{__eF:null,__eG:null,__eC:null,__eE:null,__eD:null,schedule:function(c){if(this.__eF==null){this.__eF=window.setTimeout(this.__eD,0);
}var d=c.toHashCode();
if(this.__eG&&this.__eG[d]){return;
}this.__eC[d]=c;
this.__eE=true;
},cancel:function(a){var b=a.toHashCode();
if(this.__eG&&this.__eG[b]){this.__eG[b]=null;
return;
}delete this.__eC[b];
if(qx.lang.Object.isEmpty(this.__eC)&&this.__eF!=null){window.clearTimeout(this.__eF);
this.__eF=null;
}},__eH:qx.event.GlobalError.observeMethod(function(){this.__eF=null;
while(this.__eE){this.__eG=qx.lang.Object.clone(this.__eC);
this.__eC={};
this.__eE=false;

for(var h in this.__eG){var g=this.__eG[h];

if(g){this.__eG[h]=null;
g.call();
}}}this.__eG=null;
})},destruct:function(){if(this.__eF!=null){window.clearTimeout(this.__eF);
}this.__eD=this.__eC=null;
}});
})();
(function(){var c="qx.util.DeferredCall";
qx.Class.define(c,{extend:qx.core.Object,construct:function(d,e){qx.core.Object.call(this);
this.__eI=d;
this.__eJ=e||null;
this.__eK=qx.util.DeferredCallManager.getInstance();
},members:{__eI:null,__eJ:null,__eK:null,cancel:function(){this.__eK.cancel(this);
},schedule:function(){this.__eK.schedule(this);
},call:function(){this.__eJ?this.__eI.apply(this.__eJ):this.__eI();
}},destruct:function(a,b){this.cancel();
this.__eJ=this.__eI=this.__eK=null;
}});
})();
(function(){var bL="element",bK="qx.client",bJ="qxSelectable",bI="off",bH="on",bG="div",bF="",bE="mshtml",bD="none",bC="scroll",ce="text",cd="qx.html.Element",cc="|capture|",cb="activate",ca="blur",bY="deactivate",bX="capture",bW="userSelect",bV="-moz-none",bU="visible",bS="releaseCapture",bT="|bubble|",bQ="tabIndex",bR="focus",bO="MozUserSelect",bP="normal",bM="__fi",bN="hidden";
qx.Class.define(cd,{extend:qx.core.Object,construct:function(de,df,dg){qx.core.Object.call(this);
this.__eL=de||bG;
this.__eM=df||null;
this.__eN=dg||null;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eO:{},_scheduleFlush:function(cf){qx.html.Element.__ft.schedule();
},flush:function(){var dS;
{};
var dK=this.__eP();
var dJ=dK.getFocus();

if(dJ&&this.__eT(dJ)){dK.blur(dJ);
}var ea=dK.getActive();

if(ea&&this.__eT(ea)){qx.bom.Element.deactivate(ea);
}var dN=this.__eR();

if(dN&&this.__eT(dN)){qx.bom.Element.releaseCapture(dN);
}var dT=[];
var dU=this._modified;

for(var dR in dU){dS=dU[dR];
if(dS.__fm()){if(dS.__eU&&qx.dom.Hierarchy.isRendered(dS.__eU)){dT.push(dS);
}else{{};
dS.__fl();
}delete dU[dR];
}}
for(var i=0,l=dT.length;i<l;i++){dS=dT[i];
{};
dS.__fl();
}var dP=this._visibility;

for(var dR in dP){dS=dP[dR];
var dV=dS.__eU;

if(!dV){delete dP[dR];
continue;
}{};
if(!dS.$$disposed){dV.style.display=dS.__eX?bF:bD;
if(qx.core.Variant.isSet(bK,bE)){if(!(document.documentMode>=8)){dV.style.visibility=dS.__eX?bU:bN;
}}}delete dP[dR];
}var scroll=this._scroll;

for(var dR in scroll){dS=scroll[dR];
var eb=dS.__eU;

if(eb&&eb.offsetWidth){var dM=true;
if(dS.__fb!=null){dS.__eU.scrollLeft=dS.__fb;
delete dS.__fb;
}if(dS.__fc!=null){dS.__eU.scrollTop=dS.__fc;
delete dS.__fc;
}var dW=dS.__eY;

if(dW!=null){var dQ=dW.element.getDomElement();

if(dQ&&dQ.offsetWidth){qx.bom.element.Scroll.intoViewX(dQ,eb,dW.align);
delete dS.__eY;
}else{dM=false;
}}var dX=dS.__fa;

if(dX!=null){var dQ=dX.element.getDomElement();

if(dQ&&dQ.offsetWidth){qx.bom.element.Scroll.intoViewY(dQ,eb,dX.align);
delete dS.__fa;
}else{dM=false;
}}if(dM){delete scroll[dR];
}}}var dL={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var dY=this._actions[i];
var dV=dY.element.__eU;

if(!dV||!dL[dY.type]&&!dY.element.__fm()){continue;
}var dO=dY.args;
dO.unshift(dV);
qx.bom.Element[dY.type].apply(qx.bom.Element,dO);
}this._actions=[];
for(var dR in this.__eO){var dI=this.__eO[dR];
var eb=dI.element.__eU;

if(eb){qx.bom.Selection.set(eb,dI.start,dI.end);
delete this.__eO[dR];
}}qx.event.handler.Appear.refresh();
},__eP:function(){if(!this.__eQ){var bb=qx.event.Registration.getManager(window);
this.__eQ=bb.getHandler(qx.event.handler.Focus);
}return this.__eQ;
},__eR:function(){if(!this.__eS){var br=qx.event.Registration.getManager(window);
this.__eS=br.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eS.getCaptureElement();
},__eT:function(cK){var cL=qx.core.ObjectRegistry.fromHashCode(cK.$$element);
return cL&&!cL.__fm();
}},members:{__eL:null,__eU:null,__eV:false,__eW:true,__eX:true,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,__fe:null,__ff:null,__eM:null,__eN:null,__fg:null,__fh:null,__fi:null,__fj:null,__fk:null,_scheduleChildrenUpdate:function(){if(this.__fj){return;
}this.__fj=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
},_createDomElement:function(){return qx.bom.Element.create(this.__eL);
},__fl:function(){{};
var bo=this.__fi;

if(bo){var length=bo.length;
var bp;

for(var i=0;i<length;i++){bp=bo[i];

if(bp.__eX&&bp.__eW&&!bp.__eU){bp.__fl();
}}}
if(!this.__eU){this.__eU=this._createDomElement();
this.__eU.$$element=this.$$hash;
this._copyData(false);

if(bo&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fj){this._syncChildren();
}}delete this.__fj;
},_insertChildren:function(){var u=this.__fi;
var length=u.length;
var w;

if(length>2){var v=document.createDocumentFragment();

for(var i=0;i<length;i++){w=u[i];

if(w.__eU&&w.__eW){v.appendChild(w.__eU);
}}this.__eU.appendChild(v);
}else{var v=this.__eU;

for(var i=0;i<length;i++){w=u[i];

if(w.__eU&&w.__eW){v.appendChild(w.__eU);
}}}},_syncChildren:function(){var o;
var t=qx.core.ObjectRegistry;
var j=this.__fi;
var r=j.length;
var k;
var p;
var n=this.__eU;
var q=n.childNodes;
var m=0;
var s;
{};
for(var i=q.length-1;i>=0;i--){s=q[i];
p=t.fromHashCode(s.$$element);

if(!p||!p.__eW||p.__fk!==this){n.removeChild(s);
{};
}}for(var i=0;i<r;i++){k=j[i];
if(k.__eW){p=k.__eU;
s=q[m];

if(!p){continue;
}if(p!=s){if(s){n.insertBefore(p,s);
}else{n.appendChild(p);
}{};
}m++;
}}{};
},_copyData:function(du){var dy=this.__eU;
var dx=this.__eN;

if(dx){var dv=qx.bom.element.Attribute;

for(var dz in dx){dv.set(dy,dz,dx[dz]);
}}var dx=this.__eM;

if(dx){var dw=qx.bom.element.Style;

if(du){dw.setStyles(dy,dx);
}else{dw.setCss(dy,dw.compile(dx));
}}var dx=this.__fg;

if(dx){for(var dz in dx){this._applyProperty(dz,dx[dz]);
}}var dx=this.__fh;

if(dx){qx.event.Registration.getManager(dy).importListeners(dy,dx);
delete this.__fh;
}},_syncData:function(){var F=this.__eU;
var E=qx.bom.element.Attribute;
var C=qx.bom.element.Style;
var D=this.__fe;

if(D){var I=this.__eN;

if(I){var G;

for(var H in D){G=I[H];

if(G!==undefined){E.set(F,H,G);
}else{E.reset(F,H);
}}}this.__fe=null;
}var D=this.__fd;

if(D){var I=this.__eM;

if(I){var B={};

for(var H in D){B[H]=I[H];
}C.setStyles(F,B);
}this.__fd=null;
}var D=this.__ff;

if(D){var I=this.__fg;

if(I){var G;

for(var H in D){this._applyProperty(H,I[H]);
}}this.__ff=null;
}},__fm:function(){var bc=this;
while(bc){if(bc.__eV){return true;
}
if(!bc.__eW||!bc.__eX){return false;
}bc=bc.__fk;
}return false;
},__fn:function(h){if(h.__fk===this){throw new Error("Child is already in: "+h);
}
if(h.__eV){throw new Error("Root elements could not be inserted into other ones.");
}if(h.__fk){h.__fk.remove(h);
}h.__fk=this;
if(!this.__fi){this.__fi=[];
}if(this.__eU){this._scheduleChildrenUpdate();
}},__fo:function(ds){if(ds.__fk!==this){throw new Error("Has no child: "+ds);
}if(this.__eU){this._scheduleChildrenUpdate();
}delete ds.__fk;
},__fp:function(cm){if(cm.__fk!==this){throw new Error("Has no child: "+cm);
}if(this.__eU){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fi||null;
},getChild:function(bd){var be=this.__fi;
return be&&be[bd]||null;
},hasChildren:function(){var ch=this.__fi;
return ch&&ch[0]!==undefined;
},indexOf:function(dh){var di=this.__fi;
return di?di.indexOf(dh):-1;
},hasChild:function(dk){var dl=this.__fi;
return dl&&dl.indexOf(dk)!==-1;
},add:function(bq){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fn(arguments[i]);
}this.__fi.push.apply(this.__fi,arguments);
}else{this.__fn(bq);
this.__fi.push(bq);
}return this;
},addAt:function(bs,bt){this.__fn(bs);
qx.lang.Array.insertAt(this.__fi,bs,bt);
return this;
},remove:function(dm){var dn=this.__fi;

if(!dn){return;
}
if(arguments[1]){var dp;

for(var i=0,l=arguments.length;i<l;i++){dp=arguments[i];
this.__fo(dp);
qx.lang.Array.remove(dn,dp);
}}else{this.__fo(dm);
qx.lang.Array.remove(dn,dm);
}return this;
},removeAt:function(dB){var dC=this.__fi;

if(!dC){throw new Error("Has no children!");
}var dD=dC[dB];

if(!dD){throw new Error("Has no child at this position!");
}this.__fo(dD);
qx.lang.Array.removeAt(this.__fi,dB);
return this;
},removeAll:function(){var cl=this.__fi;

if(cl){for(var i=0,l=cl.length;i<l;i++){this.__fo(cl[i]);
}cl.length=0;
}return this;
},getParent:function(){return this.__fk||null;
},insertInto:function(parent,A){parent.__fn(this);

if(A==null){parent.__fi.push(this);
}else{qx.lang.Array.insertAt(this.__fi,this,A);
}return this;
},insertBefore:function(bu){var parent=bu.__fk;
parent.__fn(this);
qx.lang.Array.insertBefore(parent.__fi,this,bu);
return this;
},insertAfter:function(S){var parent=S.__fk;
parent.__fn(this);
qx.lang.Array.insertAfter(parent.__fi,this,S);
return this;
},moveTo:function(dq){var parent=this.__fk;
parent.__fp(this);
var dr=parent.__fi.indexOf(this);

if(dr===dq){throw new Error("Could not move to same index!");
}else if(dr<dq){dq--;
}qx.lang.Array.removeAt(parent.__fi,dr);
qx.lang.Array.insertAt(parent.__fi,this,dq);
return this;
},moveBefore:function(cv){var parent=this.__fk;
return this.moveTo(parent.__fi.indexOf(cv));
},moveAfter:function(J){var parent=this.__fk;
return this.moveTo(parent.__fi.indexOf(J)+1);
},free:function(){var parent=this.__fk;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fi){return;
}parent.__fo(this);
qx.lang.Array.remove(parent.__fi,this);
return this;
},getDomElement:function(){return this.__eU||null;
},getNodeName:function(){return this.__eL;
},setNodeName:function(name){this.__eL=name;
},setRoot:function(cg){this.__eV=cg;
},useMarkup:function(Q){if(this.__eU){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(bK,bE)){var R=document.createElement(bG);
}else{var R=qx.bom.Element.getHelperElement();
}R.innerHTML=Q;
this.useElement(R.firstChild);
return this.__eU;
},useElement:function(bj){if(this.__eU){throw new Error("Could not overwrite existing element!");
}this.__eU=bj;
this.__eU.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var bw=this.getAttribute(bQ);

if(bw>=1){return true;
}var bv=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bw>=0&&bv[this.__eL]){return true;
}return false;
},setSelectable:qx.core.Variant.select(bK,{"webkit":function(dj){this.setAttribute(bJ,dj?bH:bI);
this.setStyle(bW,dj?bP:bD);
},"gecko":function(z){this.setAttribute(bJ,z?bH:bI);
this.setStyle(bO,z?ce:bV);
},"default":function(bf){this.setAttribute(bJ,bf?bH:bI);
}}),isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eL];
},include:function(){if(this.__eW){return;
}delete this.__eW;

if(this.__fk){this.__fk._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__eW){return;
}this.__eW=false;

if(this.__fk){this.__fk._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__eW===true;
},show:function(){if(this.__eX){return;
}
if(this.__eU){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}if(this.__fk){this.__fk._scheduleChildrenUpdate();
}delete this.__eX;
},hide:function(){if(!this.__eX){return;
}
if(this.__eU){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}this.__eX=false;
},isVisible:function(){return this.__eX===true;
},scrollChildIntoViewX:function(cp,cq,cr){var cs=this.__eU;
var ct=cp.getDomElement();

if(cr!==false&&cs&&cs.offsetWidth&&ct&&ct.offsetWidth){qx.bom.element.Scroll.intoViewX(ct,cs,cq);
}else{this.__eY={element:cp,align:cq};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}delete this.__fb;
},scrollChildIntoViewY:function(K,L,M){var N=this.__eU;
var O=K.getDomElement();

if(M!==false&&N&&N.offsetWidth&&O&&O.offsetWidth){qx.bom.element.Scroll.intoViewY(O,N,L);
}else{this.__fa={element:K,align:L};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}delete this.__fc;
},scrollToX:function(x,f){var g=this.__eU;

if(f!==true&&g&&g.offsetWidth){g.scrollLeft=x;
}else{this.__fb=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}delete this.__eY;
},getScrollX:function(){var cw=this.__eU;

if(cw){return cw.scrollLeft;
}return this.__fb||0;
},scrollToY:function(y,Y){var ba=this.__eU;

if(Y!==true&&ba&&ba.offsetWidth){ba.scrollTop=y;
}else{this.__fc=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}delete this.__fa;
},getScrollY:function(){var cP=this.__eU;

if(cP){return cP.scrollTop;
}return this.__fc||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(bC,this.__fr,this);
},enableScrolling:function(){this.removeListener(bC,this.__fr,this);
},__fq:null,__fr:function(e){if(!this.__fq){this.__fq=true;
this.__eU.scrollTop=0;
this.__eU.scrollLeft=0;
delete this.__fq;
}},getTextSelection:function(){var bB=this.__eU;

if(bB){return qx.bom.Selection.get(bB);
}return null;
},getTextSelectionLength:function(){var dd=this.__eU;

if(dd){return qx.bom.Selection.getLength(dd);
}return null;
},getTextSelectionStart:function(){var cx=this.__eU;

if(cx){return qx.bom.Selection.getStart(cx);
}return null;
},getTextSelectionEnd:function(){var P=this.__eU;

if(P){return qx.bom.Selection.getEnd(P);
}return null;
},setTextSelection:function(cQ,cR){var cS=this.__eU;

if(cS){qx.bom.Selection.set(cS,cQ,cR);
return;
}qx.html.Element.__eO[this.toHashCode()]={element:this,start:cQ,end:cR};
qx.html.Element._scheduleFlush(bL);
},clearTextSelection:function(){var dA=this.__eU;

if(dA){qx.bom.Selection.clear(dA);
}delete qx.html.Element.__eO[this.toHashCode()];
},__fs:function(bl,bm){var bn=qx.html.Element._actions;
bn.push({type:bl,element:this,args:bm||[]});
qx.html.Element._scheduleFlush(bL);
},focus:function(){this.__fs(bR);
},blur:function(){this.__fs(ca);
},activate:function(){this.__fs(cb);
},deactivate:function(){this.__fs(bY);
},capture:function(bg){this.__fs(bX,[bg!==false]);
},releaseCapture:function(){this.__fs(bS);
},setStyle:function(by,bz,bA){if(!this.__eM){this.__eM={};
}
if(this.__eM[by]==bz){return;
}
if(bz==null){delete this.__eM[by];
}else{this.__eM[by]=bz;
}if(this.__eU){if(bA){qx.bom.element.Style.set(this.__eU,by,bz);
return this;
}if(!this.__fd){this.__fd={};
}this.__fd[by]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}return this;
},setStyles:function(T,U){var V=qx.bom.element.Style;

if(!this.__eM){this.__eM={};
}
if(this.__eU){if(!this.__fd){this.__fd={};
}
for(var X in T){var W=T[X];

if(this.__eM[X]==W){continue;
}
if(W==null){delete this.__eM[X];
}else{this.__eM[X]=W;
}if(U){V.set(this.__eU,X,W);
continue;
}this.__fd[X]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}else{for(var X in T){var W=T[X];

if(this.__eM[X]==W){continue;
}
if(W==null){delete this.__eM[X];
}else{this.__eM[X]=W;
}}}return this;
},removeStyle:function(cT,cU){this.setStyle(cT,null,cU);
},getStyle:function(bx){return this.__eM?this.__eM[bx]:null;
},getAllStyles:function(){return this.__eM||null;
},setAttribute:function(cM,cN,cO){if(!this.__eN){this.__eN={};
}
if(this.__eN[cM]==cN){return;
}
if(cN==null){delete this.__eN[cM];
}else{this.__eN[cM]=cN;
}if(this.__eU){if(cO){qx.bom.element.Attribute.set(this.__eU,cM,cN);
return this;
}if(!this.__fe){this.__fe={};
}this.__fe[cM]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}return this;
},setAttributes:function(dE,dF){for(var dG in dE){this.setAttribute(dG,dE[dG],dF);
}return this;
},removeAttribute:function(bh,bi){this.setAttribute(bh,null,bi);
},getAttribute:function(bk){return this.__eN?this.__eN[bk]:null;
},_applyProperty:function(name,d){},_setProperty:function(ci,cj,ck){if(!this.__fg){this.__fg={};
}
if(this.__fg[ci]==cj){return;
}
if(cj==null){delete this.__fg[ci];
}else{this.__fg[ci]=cj;
}if(this.__eU){if(ck){this._applyProperty(ci,cj);
return this;
}if(!this.__ff){this.__ff={};
}this.__ff[ci]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(bL);
}return this;
},_removeProperty:function(cn,co){this._setProperty(cn,null,co);
},_getProperty:function(a){var b=this.__fg;

if(!b){return null;
}var c=b[a];
return c==null?null:c;
},addListener:function(cV,cW,self,cX){var cY;

if(this.$$disposed){return null;
}{};

if(this.__eU){return qx.event.Registration.addListener(this.__eU,cV,cW,self,cX);
}
if(!this.__fh){this.__fh={};
}
if(cX==null){cX=false;
}var da=qx.event.Manager.getNextUniqueId();
var dc=cV+(cX?cc:bT)+da;
this.__fh[dc]={type:cV,listener:cW,self:self,capture:cX,unique:da};
return dc;
},removeListener:function(cD,cE,self,cF){var cG;

if(this.$$disposed){return null;
}{};

if(this.__eU){qx.event.Registration.removeListener(this.__eU,cD,cE,self,cF);
}else{var cI=this.__fh;
var cH;

if(cF==null){cF=false;
}
for(var cJ in cI){cH=cI[cJ];
if(cH.listener===cE&&cH.self===self&&cH.capture===cF&&cH.type===cD){delete cI[cJ];
break;
}}}return this;
},removeListenerById:function(dH){if(this.$$disposed){return null;
}
if(this.__eU){qx.event.Registration.removeListenerById(this.__eU,dH);
}else{delete this.__fh[dH];
}return this;
},hasListener:function(cy,cz){if(this.$$disposed){return false;
}
if(this.__eU){return qx.event.Registration.hasListener(this.__eU,cy,cz);
}var cB=this.__fh;
var cA;

if(cz==null){cz=false;
}
for(var cC in cB){cA=cB[cC];
if(cA.capture===cz&&cA.type===cy){return true;
}}return false;
}},defer:function(dt){dt.__ft=new qx.util.DeferredCall(dt.flush,dt);
},destruct:function(){var cu=this.__eU;

if(cu){qx.event.Registration.getManager(cu).removeAllListeners(cu);
cu.$$element=bF;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fk;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(bM);
this.__eN=this.__eM=this.__fh=this.__fg=this.__fe=this.__fd=this.__ff=this.__eU=this.__fk=this.__eY=this.__fa=null;
}});
})();
(function(){var f="qx.ui.core.queue.Manager",d="useraction";
qx.Class.define(f,{statics:{__fu:false,__fv:{},__fw:0,MAX_RETRIES:10,scheduleFlush:function(g){var self=qx.ui.core.queue.Manager;
self.__fv[g]=true;

if(!self.__fu){self.__fz.schedule();
self.__fu=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fx){return;
}self.__fx=true;
self.__fz.cancel();
var h=self.__fv;
self.__fy(function(){while(h.visibility||h.widget||h.appearance||h.layout||h.element){if(h.widget){delete h.widget;
qx.ui.core.queue.Widget.flush();
}
if(h.visibility){delete h.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(h.appearance){delete h.appearance;
qx.ui.core.queue.Appearance.flush();
}if(h.widget||h.visibility||h.appearance){continue;
}
if(h.layout){delete h.layout;
qx.ui.core.queue.Layout.flush();
}if(h.widget||h.visibility||h.appearance||h.layout){continue;
}
if(h.element){delete h.element;
qx.html.Element.flush();
}}},function(){self.__fu=false;
});
self.__fy(function(){if(h.dispose){delete h.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fx=false;
});
self.__fw=0;
},__fy:function(b,c){var self=qx.ui.core.queue.Manager;

try{b();
}catch(e){{};
self.__fu=false;
self.__fx=false;
self.__fw+=1;

if(self.__fw<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__fw-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{c();
}}},defer:function(a){a.__fz=new qx.util.DeferredCall(a.flush);
qx.html.Element._scheduleFlush=a.scheduleFlush;
qx.event.Registration.addListener(window,d,a.flush);
}});
})();
(function(){var c="abstract",b="qx.event.dispatch.AbstractBubbling";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:c,construct:function(a){this._manager=a;
},members:{_getParent:function(d){throw new Error("Missing implementation");
},canDispatchEvent:function(w,event,x){return event.getBubbles();
},dispatchEvent:function(e,event,f){var parent=e;
var q=this._manager;
var n,u;
var l;
var p,s;
var r;
var t=[];
n=q.getListeners(e,f,true);
u=q.getListeners(e,f,false);

if(n){t.push(n);
}
if(u){t.push(u);
}var parent=this._getParent(e);
var h=[];
var g=[];
var k=[];
var o=[];
while(parent!=null){n=q.getListeners(parent,f,true);

if(n){k.push(n);
o.push(parent);
}u=q.getListeners(parent,f,false);

if(u){h.push(u);
g.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=k.length-1;i>=0;i--){r=o[i];
event.setCurrentTarget(r);
l=k[i];

for(var j=0,m=l.length;j<m;j++){p=l[j];
s=p.context||r;
p.handler.call(s,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(e);

for(var i=0,v=t.length;i<v;i++){l=t[i];

for(var j=0,m=l.length;j<m;j++){p=l[j];
s=p.context||e;
p.handler.call(s,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,v=h.length;i<v;i++){r=g[i];
event.setCurrentTarget(r);
l=h[i];

for(var j=0,m=l.length;j<m;j++){p=l[j];
s=p.context||r;
p.handler.call(s,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var c="qx.event.dispatch.DomBubbling";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(d){return d.parentNode;
},canDispatchEvent:function(a,event,b){return a.nodeType!==undefined&&event.getBubbles();
}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var bs="keydown",br="qx.client",bq="keypress",bp="NumLock",bo="keyup",bn="Enter",bm="0",bl="9",bk="-",bj="PageUp",cA="+",cz="PrintScreen",cy="gecko",cx="A",cw="Z",cv="Left",cu="F5",ct="Down",cs="Up",cr="F11",bz="F6",bA="useraction",bx="F3",by="keyinput",bv="Insert",bw="F8",bt="End",bu="/",bH="Delete",bI="*",bU="cmd",bQ="F1",cd="F4",bX="Home",cn="F2",ci="F12",bM="PageDown",cq="F7",cp="Win",co="F9",bL="F10",bO="Right",bP="text",bS="Escape",bV="webkit",bY="5",cf="3",ck="Meta",bB="7",bC="CapsLock",bN="input",cc="Control",cb="Space",ca="Tab",ch="Shift",cg="Pause",bW="Unidentified",ce="qx.event.handler.Keyboard",bg="mshtml|webkit",cj="6",bD="off",bE="Apps",bR="4",bh="Alt",bi="mshtml",bK="2",bF="Scroll",bG="1",bJ="8",bT="autoComplete",cm=",",cl="Backspace";
qx.Class.define(ce,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(l){qx.core.Object.call(this);
this.__fA=l;
this.__fB=l.getWindow();
if(qx.core.Variant.isSet(br,cy)){this.__fC=this.__fB;
}else{this.__fC=this.__fB.document.documentElement;
}this.__fD={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(m){if(this._identifierToKeyCodeMap[m]){return true;
}
if(m.length!=1){return false;
}
if(m>=bm&&m<=bl){return true;
}
if(m>=cx&&m<=cw){return true;
}
switch(m){case cA:case bk:case bI:case bu:return true;
default:return false;
}}},members:{__fE:null,__fA:null,__fB:null,__fC:null,__fD:null,__fF:null,__fG:null,__fH:null,canHandleEvent:function(i,j){},registerEvent:function(S,T,U){},unregisterEvent:function(F,G,H){},_fireInputEvent:function(cB,cC){var cD=this.__fI();
if(cD&&cD.offsetWidth!=0){var event=qx.event.Registration.createEvent(by,qx.event.type.KeyInput,[cB,cD,cC]);
this.__fA.dispatchEvent(cD,event);
}if(this.__fB){qx.event.Registration.fireEvent(this.__fB,bA,qx.event.type.Data,[by]);
}},_fireSequenceEvent:function(N,O,P){var Q=this.__fI();
var R=N.keyCode;
var event=qx.event.Registration.createEvent(O,qx.event.type.KeySequence,[N,Q,P]);
this.__fA.dispatchEvent(Q,event);
if(qx.core.Variant.isSet(br,bg)){if(O==bs&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(R)&&!this._emulateKeyPress[R]){this._fireSequenceEvent(N,bq,P);
}}}if(this.__fB){qx.event.Registration.fireEvent(this.__fB,bA,qx.event.type.Data,[O]);
}},__fI:function(){var g=this.__fA.getHandler(qx.event.handler.Focus);
var h=g.getActive();
if(!h||h.offsetWidth==0){h=g.getFocus();
}if(!h||h.offsetWidth==0){h=this.__fA.getWindow().document.body;
}return h;
},_initKeyObserver:function(){this.__fE=qx.lang.Function.listener(this.__fJ,this);
this.__fH=qx.lang.Function.listener(this.__fL,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fC,bo,this.__fE);
Event.addNativeListener(this.__fC,bs,this.__fE);
Event.addNativeListener(this.__fC,bq,this.__fH);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fC,bo,this.__fE);
Event.removeNativeListener(this.__fC,bs,this.__fE);
Event.removeNativeListener(this.__fC,bq,this.__fH);

for(var c in (this.__fG||{})){var b=this.__fG[c];
Event.removeNativeListener(b.target,bq,b.callback);
}delete (this.__fG);
},__fJ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(br,{"mshtml":function(cG){cG=window.event||cG;
var cJ=cG.keyCode;
var cH=0;
var cI=cG.type;
if(!(this.__fD[cJ]==bs&&cI==bs)){this._idealKeyHandler(cJ,cH,cI,cG);
}if(cI==bs){if(this._isNonPrintableKeyCode(cJ)||this._emulateKeyPress[cJ]){this._idealKeyHandler(cJ,cH,bq,cG);
}}this.__fD[cJ]=cI;
},"gecko":function(I){var M=this._keyCodeFix[I.keyCode]||I.keyCode;
var K=0;
var L=I.type;
if(qx.bom.client.Platform.WIN){var J=M?this._keyCodeToIdentifier(M):this._charCodeToIdentifier(K);

if(!(this.__fD[J]==bs&&L==bs)){this._idealKeyHandler(M,K,L,I);
}this.__fD[J]=L;
}else{this._idealKeyHandler(M,K,L,I);
}this.__fK(I.target,L,M);
},"webkit":function(w){var z=0;
var x=0;
var y=w.type;
if(qx.bom.client.Engine.VERSION<525.13){if(y==bo||y==bs){z=this._charCode2KeyCode[w.charCode]||w.keyCode;
}else{if(this._charCode2KeyCode[w.charCode]){z=this._charCode2KeyCode[w.charCode];
}else{x=w.charCode;
}}this._idealKeyHandler(z,x,y,w);
}else{z=w.keyCode;
this._idealKeyHandler(z,x,y,w);
if(y==bs){if(this._isNonPrintableKeyCode(z)||this._emulateKeyPress[z]){this._idealKeyHandler(z,x,bq,w);
}}this.__fD[z]=y;
}},"opera":function(cE){this.__fF=cE.keyCode;
this._idealKeyHandler(cE.keyCode,0,cE.type,cE);
}})),__fK:qx.core.Variant.select(br,{"gecko":function(bb,bc,bd){if(bc===bs&&(bd==33||bd==34||bd==38||bd==40)&&bb.type==bP&&bb.tagName.toLowerCase()===bN&&bb.getAttribute(bT)!==bD){if(!this.__fG){this.__fG={};
}var bf=qx.core.ObjectRegistry.toHashCode(bb);

if(this.__fG[bf]){return;
}var self=this;
this.__fG[bf]={target:bb,callback:function(k){qx.bom.Event.stopPropagation(k);
self.__fL(k);
}};
var be=qx.event.GlobalError.observeMethod(this.__fG[bf].callback);
qx.bom.Event.addNativeListener(bb,bq,be);
}},"default":null}),__fL:qx.event.GlobalError.observeMethod(qx.core.Variant.select(br,{"mshtml":function(cK){cK=window.event||cK;

if(this._charCode2KeyCode[cK.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cK.keyCode],0,cK.type,cK);
}else{this._idealKeyHandler(0,cK.keyCode,cK.type,cK);
}},"gecko":function(n){var q=this._keyCodeFix[n.keyCode]||n.keyCode;
var o=n.charCode;
var p=n.type;
this._idealKeyHandler(q,o,p,n);
},"webkit":function(V){if(qx.bom.client.Engine.VERSION<525.13){var Y=0;
var W=0;
var X=V.type;

if(X==bo||X==bs){Y=this._charCode2KeyCode[V.charCode]||V.keyCode;
}else{if(this._charCode2KeyCode[V.charCode]){Y=this._charCode2KeyCode[V.charCode];
}else{W=V.charCode;
}}this._idealKeyHandler(Y,W,X,V);
}else{if(this._charCode2KeyCode[V.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[V.keyCode],0,V.type,V);
}else{this._idealKeyHandler(0,V.keyCode,V.type,V);
}}},"opera":function(d){var f=d.keyCode;
var e=d.type;
if(f!=this.__fF){this._idealKeyHandler(0,this.__fF,e,d);
}else{if(this._keyCodeToIdentifierMap[d.keyCode]){this._idealKeyHandler(d.keyCode,0,d.type,d);
}else{this._idealKeyHandler(0,d.keyCode,d.type,d);
}}}})),_idealKeyHandler:function(r,s,t,u){var v;
if(r||(!r&&!s)){v=this._keyCodeToIdentifier(r);
this._fireSequenceEvent(u,t,v);
}else{v=this._charCodeToIdentifier(s);
this._fireSequenceEvent(u,bq,v);
this._fireInputEvent(u,s);
}},_specialCharCodeMap:{8:cl,9:ca,13:bn,27:bS,32:cb},_emulateKeyPress:qx.core.Variant.select(br,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:ch,17:cc,18:bh,20:bC,224:ck,37:cv,38:cs,39:bO,40:ct,33:bj,34:bM,35:bt,36:bX,45:bv,46:bH,112:bQ,113:cn,114:bx,115:cd,116:cu,117:bz,118:cq,119:bw,120:co,121:bL,122:cr,123:ci,144:bp,44:cz,145:bF,19:cg,91:qx.bom.client.Platform.MAC?bU:cp,92:cp,93:qx.bom.client.Platform.MAC?bU:bE},_numpadToCharCode:{96:bm.charCodeAt(0),97:bG.charCodeAt(0),98:bK.charCodeAt(0),99:cf.charCodeAt(0),100:bR.charCodeAt(0),101:bY.charCodeAt(0),102:cj.charCodeAt(0),103:bB.charCodeAt(0),104:bJ.charCodeAt(0),105:bl.charCodeAt(0),106:bI.charCodeAt(0),107:cA.charCodeAt(0),109:bk.charCodeAt(0),110:cm.charCodeAt(0),111:bu.charCodeAt(0)},_charCodeA:cx.charCodeAt(0),_charCodeZ:cw.charCodeAt(0),_charCode0:bm.charCodeAt(0),_charCode9:bl.charCodeAt(0),_isNonPrintableKeyCode:function(cF){return this._keyCodeToIdentifierMap[cF]?true:false;
},_isIdentifiableKeyCode:function(ba){if(ba>=this._charCodeA&&ba<=this._charCodeZ){return true;
}if(ba>=this._charCode0&&ba<=this._charCode9){return true;
}if(this._specialCharCodeMap[ba]){return true;
}if(this._numpadToCharCode[ba]){return true;
}if(this._isNonPrintableKeyCode(ba)){return true;
}return false;
},_keyCodeToIdentifier:function(D){if(this._isIdentifiableKeyCode(D)){var E=this._numpadToCharCode[D];

if(E){return String.fromCharCode(E);
}return (this._keyCodeToIdentifierMap[D]||this._specialCharCodeMap[D]||String.fromCharCode(D));
}else{return bW;
}},_charCodeToIdentifier:function(cL){return this._specialCharCodeMap[cL]||String.fromCharCode(cL).toUpperCase();
},_identifierToKeyCode:function(a){return qx.event.handler.Keyboard._identifierToKeyCodeMap[a]||a.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__fF=this.__fA=this.__fB=this.__fC=this.__fD=null;
},defer:function(A,B){qx.event.Registration.addHandler(A);
if(!A._identifierToKeyCodeMap){A._identifierToKeyCodeMap={};

for(var C in B._keyCodeToIdentifierMap){A._identifierToKeyCodeMap[B._keyCodeToIdentifierMap[C]]=parseInt(C,10);
}
for(var C in B._specialCharCodeMap){A._identifierToKeyCodeMap[B._specialCharCodeMap[C]]=parseInt(C,10);
}}
if(qx.core.Variant.isSet(br,bi)){B._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(br,cy)){B._keyCodeFix={12:B._identifierToKeyCode(bp)};
}else if(qx.core.Variant.isSet(br,bV)){if(qx.bom.client.Engine.VERSION<525.13){B._charCode2KeyCode={63289:B._identifierToKeyCode(bp),63276:B._identifierToKeyCode(bj),63277:B._identifierToKeyCode(bM),63275:B._identifierToKeyCode(bt),63273:B._identifierToKeyCode(bX),63234:B._identifierToKeyCode(cv),63232:B._identifierToKeyCode(cs),63235:B._identifierToKeyCode(bO),63233:B._identifierToKeyCode(ct),63272:B._identifierToKeyCode(bH),63302:B._identifierToKeyCode(bv),63236:B._identifierToKeyCode(bQ),63237:B._identifierToKeyCode(cn),63238:B._identifierToKeyCode(bx),63239:B._identifierToKeyCode(cd),63240:B._identifierToKeyCode(cu),63241:B._identifierToKeyCode(bz),63242:B._identifierToKeyCode(cq),63243:B._identifierToKeyCode(bw),63244:B._identifierToKeyCode(co),63245:B._identifierToKeyCode(bL),63246:B._identifierToKeyCode(cr),63247:B._identifierToKeyCode(ci),63248:B._identifierToKeyCode(cz),3:B._identifierToKeyCode(bn),12:B._identifierToKeyCode(bp),13:B._identifierToKeyCode(bn)};
}else{B._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var O="qx.client",N="mouseup",M="click",L="mousedown",K="contextmenu",J="mousewheel",I="dblclick",H="mshtml",G="mouseover",F="mouseout",A="DOMMouseScroll",E="mousemove",D="on",z="mshtml|webkit|opera",y="useraction",C="gecko|webkit",B="qx.event.handler.Mouse";
qx.Class.define(B,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(v){qx.core.Object.call(this);
this.__fM=v;
this.__fN=v.getWindow();
this.__fO=this.__fN.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fP:null,__fQ:null,__fR:null,__fS:null,__fT:null,__fM:null,__fN:null,__fO:null,canHandleEvent:function(r,s){},registerEvent:qx.bom.client.System.IPHONE?
function(n,o,p){n[D+o]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(P,Q,R){P[D+Q]=undefined;
}:qx.lang.Function.returnNull,__fU:function(a,b,c){if(!c){c=a.target||a.srcElement;
}if(c&&c.nodeType){qx.event.Registration.fireEvent(c,b||a.type,b==J?qx.event.type.MouseWheel:qx.event.type.Mouse,[a,c,null,true,true]);
}qx.event.Registration.fireEvent(this.__fN,y,qx.event.type.Data,[b||a.type]);
},_initButtonObserver:function(){this.__fP=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fO,L,this.__fP);
Event.addNativeListener(this.__fO,N,this.__fP);
Event.addNativeListener(this.__fO,M,this.__fP);
Event.addNativeListener(this.__fO,I,this.__fP);
Event.addNativeListener(this.__fO,K,this.__fP);
},_initMoveObserver:function(){this.__fQ=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fO,E,this.__fQ);
Event.addNativeListener(this.__fO,G,this.__fQ);
Event.addNativeListener(this.__fO,F,this.__fQ);
},_initWheelObserver:function(){this.__fR=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var t=qx.core.Variant.isSet(O,z)?J:A;
var u=qx.core.Variant.isSet(O,H)?this.__fO:this.__fN;
Event.addNativeListener(u,t,this.__fR);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fO,L,this.__fP);
Event.removeNativeListener(this.__fO,N,this.__fP);
Event.removeNativeListener(this.__fO,M,this.__fP);
Event.removeNativeListener(this.__fO,I,this.__fP);
Event.removeNativeListener(this.__fO,K,this.__fP);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fO,E,this.__fQ);
Event.removeNativeListener(this.__fO,G,this.__fQ);
Event.removeNativeListener(this.__fO,F,this.__fQ);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var w=qx.core.Variant.isSet(O,z)?J:A;
var x=qx.core.Variant.isSet(O,H)?this.__fO:this.__fN;
Event.removeNativeListener(x,w,this.__fR);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(m){this.__fU(m);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(d){var e=d.type;
var f=d.target||d.srcElement;
if(qx.core.Variant.isSet(O,C)){if(f&&f.nodeType==3){f=f.parentNode;
}}
if(this.__fV){this.__fV(d,e,f);
}
if(this.__fX){this.__fX(d,e,f);
}this.__fU(d,e,f);

if(this.__fW){this.__fW(d,e,f);
}
if(this.__fY){this.__fY(d,e,f);
}this.__fS=e;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(V){this.__fU(V,J);
}),__fV:qx.core.Variant.select(O,{"webkit":function(j,k,l){if(qx.bom.client.Engine.VERSION<530){if(k==K){this.__fU(j,N,l);
}}},"default":null}),__fW:qx.core.Variant.select(O,{"opera":function(S,T,U){if(T==N&&S.button==2){this.__fU(S,K,U);
}},"default":null}),__fX:qx.core.Variant.select(O,{"mshtml":function(g,h,i){if(h==N&&this.__fS==M){this.__fU(g,L,i);
}else if(h==I){this.__fU(g,M,i);
}},"default":null}),__fY:qx.core.Variant.select(O,{"mshtml":null,"default":function(W,X,Y){switch(X){case L:this.__fT=Y;
break;
case N:if(Y!==this.__fT){var ba=qx.dom.Hierarchy.getCommonParent(Y,this.__fT);
this.__fU(W,M,ba);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__fM=this.__fN=this.__fO=this.__fT=null;
},defer:function(q){qx.event.Registration.addHandler(q);
}});
})();
(function(){var d="qx.event.handler.Capture";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(i,j){},registerEvent:function(a,b,c){},unregisterEvent:function(f,g,h){}},defer:function(e){qx.event.Registration.addHandler(e);
}});
})();
(function(){var N="alias",M="copy",L="blur",K="mouseout",J="keydown",I="Ctrl",H="Shift",G="mousemove",F="move",E="mouseover",be="Alt",bd="keyup",bc="mouseup",bb="dragend",ba="on",Y="mousedown",X="qxDraggable",W="drag",V="drop",U="qxDroppable",S="qx.event.handler.DragDrop",T="droprequest",Q="dragstart",R="dragchange",O="dragleave",P="dragover";
qx.Class.define(S,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);
this.__ga=q;
this.__gb=q.getWindow().document.documentElement;
this.__ga.addListener(this.__gb,Y,this._onMouseDown,this);
this.__gn();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__ga:null,__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,__gg:null,__gh:null,__gi:null,__gj:null,__gk:false,__gl:0,__gm:0,canHandleEvent:function(u,v){},registerEvent:function(n,o,p){},unregisterEvent:function(a,b,c){},addType:function(m){this.__ge[m]=true;
},addAction:function(bm){this.__gf[bm]=true;
},supportsType:function(C){return !!this.__ge[C];
},supportsAction:function(z){return !!this.__gf[z];
},getData:function(w){if(!this.__gu||!this.__gc){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__ge[w]){throw new Error("Unsupported data type: "+w+"!");
}
if(!this.__gh[w]){this.__gi=w;
this.__gp(T,this.__gd,this.__gc,false);
}
if(!this.__gh[w]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gh[w]||null;
},getCurrentAction:function(){return this.__gj;
},addData:function(A,B){this.__gh[A]=B;
},getCurrentType:function(){return this.__gi;
},isSessionActive:function(){return this.__gk;
},__gn:function(){this.__ge={};
this.__gf={};
this.__gg={};
this.__gh={};
},__go:function(){if(this.__gd==null){return;
}var bi=this.__gf;
var bg=this.__gg;
var bh=null;

if(this.__gu){if(bg.Shift&&bg.Ctrl&&bi.alias){bh=N;
}else if(bg.Shift&&bg.Alt&&bi.copy){bh=M;
}else if(bg.Shift&&bi.move){bh=F;
}else if(bg.Alt&&bi.alias){bh=N;
}else if(bg.Ctrl&&bi.copy){bh=M;
}else if(bi.move){bh=F;
}else if(bi.copy){bh=M;
}else if(bi.alias){bh=N;
}}
if(bh!=this.__gj){this.__gj=bh;
this.__gp(R,this.__gd,this.__gc,false);
}},__gp:function(f,g,h,i,j){var l=qx.event.Registration;
var k=l.createEvent(f,qx.event.type.Drag,[i,j]);

if(g!==h){k.setRelatedTarget(h);
}return l.dispatchEvent(g,k);
},__gq:function(d){while(d&&d.nodeType==1){if(d.getAttribute(X)==ba){return d;
}d=d.parentNode;
}return null;
},__gr:function(D){while(D&&D.nodeType==1){if(D.getAttribute(U)==ba){return D;
}D=D.parentNode;
}return null;
},__gs:function(){this.__gd=null;
this.__ga.removeListener(this.__gb,G,this._onMouseMove,this,true);
this.__ga.removeListener(this.__gb,bc,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,L,this._onWindowBlur,this);
this.__gn();
},__gt:function(){if(this.__gk){this.__ga.removeListener(this.__gb,E,this._onMouseOver,this,true);
this.__ga.removeListener(this.__gb,K,this._onMouseOut,this,true);
this.__ga.removeListener(this.__gb,J,this._onKeyDown,this,true);
this.__ga.removeListener(this.__gb,bd,this._onKeyUp,this,true);
this.__gp(bb,this.__gd,this.__gc,false);
this.__gk=false;
}this.__gu=false;
this.__gc=null;
this.__gs();
},__gu:false,_onWindowBlur:function(e){this.__gt();
},_onKeyDown:function(e){var t=e.getKeyIdentifier();

switch(t){case be:case I:case H:if(!this.__gg[t]){this.__gg[t]=true;
this.__go();
}}},_onKeyUp:function(e){var bj=e.getKeyIdentifier();

switch(bj){case be:case I:case H:if(this.__gg[bj]){this.__gg[bj]=false;
this.__go();
}}},_onMouseDown:function(e){if(this.__gk){return;
}var bk=this.__gq(e.getTarget());

if(bk){this.__gl=e.getDocumentLeft();
this.__gm=e.getDocumentTop();
this.__gd=bk;
this.__ga.addListener(this.__gb,G,this._onMouseMove,this,true);
this.__ga.addListener(this.__gb,bc,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,L,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gu){this.__gp(V,this.__gc,this.__gd,false,e);
}if(this.__gk){e.stopPropagation();
}this.__gt();
},_onMouseMove:function(e){if(this.__gk){if(!this.__gp(W,this.__gd,this.__gc,true,e)){this.__gt();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gl)>3||Math.abs(e.getDocumentTop()-this.__gm)>3){if(this.__gp(Q,this.__gd,this.__gc,true,e)){this.__gk=true;
this.__ga.addListener(this.__gb,E,this._onMouseOver,this,true);
this.__ga.addListener(this.__gb,K,this._onMouseOut,this,true);
this.__ga.addListener(this.__gb,J,this._onKeyDown,this,true);
this.__ga.addListener(this.__gb,bd,this._onKeyUp,this,true);
var bl=this.__gg;
bl.Ctrl=e.isCtrlPressed();
bl.Shift=e.isShiftPressed();
bl.Alt=e.isAltPressed();
this.__go();
}else{this.__gp(bb,this.__gd,this.__gc,false);
this.__gs();
}}}},_onMouseOver:function(e){var r=e.getTarget();
var s=this.__gr(r);

if(s&&s!=this.__gc){this.__gu=this.__gp(P,s,this.__gd,true,e);
this.__gc=s;
this.__go();
}},_onMouseOut:function(e){var y=this.__gr(e.getTarget());
var x=this.__gr(e.getRelatedTarget());

if(y&&y!==x&&y==this.__gc){this.__gp(O,this.__gc,x,false,e);
this.__gc=null;
this.__gu=false;
qx.event.Timer.once(this.__go,this,0);
}}},destruct:function(){this.__gd=this.__gc=this.__ga=this.__gb=this.__ge=this.__gf=this.__gg=this.__gh=null;
},defer:function(bf){qx.event.Registration.addHandler(bf);
}});
})();
(function(){var h="-",g="qx.event.handler.Element";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);
this._manager=e;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(i,j){},registerEvent:function(k,l,m){var p=qx.core.ObjectRegistry.toHashCode(k);
var n=p+h+l;
var o=qx.lang.Function.listener(this._onNative,this,n);
qx.bom.Event.addNativeListener(k,l,o);
this._registeredEvents[n]={element:k,type:l,listener:o};
},unregisterEvent:function(t,u,v){var y=this._registeredEvents;

if(!y){return;
}var z=qx.core.ObjectRegistry.toHashCode(t);
var w=z+h+u;
var x=this._registeredEvents[w];

if(x){qx.bom.Event.removeNativeListener(t,u,x.listener);
}delete this._registeredEvents[w];
},_onNative:qx.event.GlobalError.observeMethod(function(a,b){var d=this._registeredEvents;

if(!d){return;
}var c=d[b];
qx.event.Registration.fireNonBubblingEvent(c.element,c.type,qx.event.type.Native,[a]);
})},destruct:function(){var q;
var r=this._registeredEvents;

for(var s in r){q=r[s];
qx.bom.Event.removeNativeListener(q.element,q.type,q.listener);
}this._manager=this._registeredEvents=null;
},defer:function(f){qx.event.Registration.addHandler(f);
}});
})();
(function(){var l="qx.event.handler.Appear",k="disappear",j="appear";
qx.Class.define(l,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__gv=d;
this.__gw={};
qx.event.handler.Appear.__gx[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gx:{},refresh:function(){var r=this.__gx;

for(var s in r){r[s].refresh();
}}},members:{__gv:null,__gw:null,canHandleEvent:function(a,b){},registerEvent:function(m,n,o){var p=qx.core.ObjectRegistry.toHashCode(m)+n;
var q=this.__gw;

if(q&&!q[p]){q[p]=m;
m.$$displayed=m.offsetWidth>0;
}},unregisterEvent:function(t,u,v){var w=qx.core.ObjectRegistry.toHashCode(t)+u;
var x=this.__gw;

if(!x){return;
}
if(x[w]){delete x[w];
}},refresh:function(){var h=this.__gw;
var i;

for(var g in h){i=h[g];
var e=i.offsetWidth>0;

if((!!i.$$displayed)!==e){i.$$displayed=e;
var f=qx.event.Registration.createEvent(e?j:k);
this.__gv.dispatchEvent(i,f);
}}}},destruct:function(){this.__gv=this.__gw=null;
delete qx.event.handler.Appear.__gx[this.$$hash];
},defer:function(c){qx.event.Registration.addHandler(c);
}});
})();
(function(){var v="mshtml",u="",t="qx.client",s=">",r=" ",q="<",p="='",o="none",n="qx.bom.Element",m="' ",h="div",k="></";
qx.Class.define(n,{statics:{__gy:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__gz:{},getHelperElement:function(N){if(!N){N=window;
}var P=N.location.href;

if(!qx.bom.Element.__gz[P]){var O=qx.bom.Element.__gz[P]=N.document.createElement(h);
if(qx.bom.client.Engine.WEBKIT){O.style.display=o;
N.document.body.appendChild(O);
}}return qx.bom.Element.__gz[P];
},create:function(name,S,T){if(!T){T=window;
}
if(!name){throw new Error("The tag name is missing!");
}var V=this.__gy;
var U=u;

for(var X in S){if(V[X]){U+=X+p+S[X]+m;
}}var Y;
if(U!=u){if(qx.bom.client.Engine.MSHTML){Y=T.document.createElement(q+name+r+U+s);
}else{var W=qx.bom.Element.getHelperElement(T);
W.innerHTML=q+name+r+U+k+name+s;
Y=W.firstChild;
}}else{Y=T.document.createElement(name);
}
for(var X in S){if(!V[X]){qx.bom.element.Attribute.set(Y,X,S[X]);
}}return Y;
},empty:function(w){return w.innerHTML=u;
},addListener:function(bb,bc,bd,self,be){return qx.event.Registration.addListener(bb,bc,bd,self,be);
},removeListener:function(a,b,c,self,d){return qx.event.Registration.removeListener(a,b,c,self,d);
},removeListenerById:function(bf,bg){return qx.event.Registration.removeListenerById(bf,bg);
},hasListener:function(y,z,A){return qx.event.Registration.hasListener(y,z,A);
},focus:function(e){qx.event.Registration.getManager(e).getHandler(qx.event.handler.Focus).focus(e);
},blur:function(x){qx.event.Registration.getManager(x).getHandler(qx.event.handler.Focus).blur(x);
},activate:function(ba){qx.event.Registration.getManager(ba).getHandler(qx.event.handler.Focus).activate(ba);
},deactivate:function(f){qx.event.Registration.getManager(f).getHandler(qx.event.handler.Focus).deactivate(f);
},capture:function(Q,R){qx.event.Registration.getManager(Q).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(Q,R);
},releaseCapture:function(g){qx.event.Registration.getManager(g).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(g);
},clone:function(B,C){var F;

if(C||(qx.core.Variant.isSet(t,v)&&!qx.xml.Document.isXmlDocument(B))){var J=qx.event.Registration.getManager(B);
var D=qx.dom.Hierarchy.getDescendants(B);
D.push(B);
}if(qx.core.Variant.isSet(t,v)){for(var i=0,l=D.length;i<l;i++){J.toggleAttachedEvents(D[i],false);
}}var F=B.cloneNode(true);
if(qx.core.Variant.isSet(t,v)){for(var i=0,l=D.length;i<l;i++){J.toggleAttachedEvents(D[i],true);
}}if(C===true){var M=qx.dom.Hierarchy.getDescendants(F);
M.push(F);
var E,H,L,G;

for(var i=0,K=D.length;i<K;i++){L=D[i];
E=J.serializeListeners(L);

if(E.length>0){H=M[i];

for(var j=0,I=E.length;j<I;j++){G=E[j];
J.addListener(H,G.type,G.handler,G.self,G.capture);
}}}}return F;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Native.prototype._cloneNativeEvent.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._charCode=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._charCode=this._charCode;
return f;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){qx.event.type.Dom.prototype.init.call(this,d,e,null,true,true);
this._identifier=f;
return this;
},clone:function(b){var c=qx.event.type.Dom.prototype.clone.call(this,b);
c._identifier=this._identifier;
return c;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var K="qx.client",J="blur",I="focus",H="mousedown",G="on",F="mouseup",E="DOMFocusOut",D="DOMFocusIn",C="selectstart",B="onmousedown",bf="onfocusout",be="onfocusin",bd="onmouseup",bc="onselectstart",bb="draggesture",ba="qx.event.handler.Focus",Y="_applyFocus",X="deactivate",W="textarea",V="_applyActive",R="input",S="focusin",P="qxSelectable",Q="tabIndex",N="off",O="activate",L="mshtml",M="focusout",T="qxKeepFocus",U="qxKeepActive";
qx.Class.define(ba,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bw){qx.core.Object.call(this);
this._manager=bw;
this._window=bw.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:V,nullable:true},focus:{apply:Y,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gA:null,__gB:null,__gC:null,__gD:null,__gE:null,__gF:null,__gG:null,__gH:null,__gI:null,__gJ:null,canHandleEvent:function(bK,bL){},registerEvent:function(f,g,h){},unregisterEvent:function(bA,bB,bC){},focus:function(bo){if(qx.core.Variant.isSet(K,L)){window.setTimeout(function(){try{bo.focus();
}catch(i){}},0);
}else{try{bo.focus();
}catch(bF){}}this.setFocus(bo);
this.setActive(bo);
},activate:function(w){this.setActive(w);
},blur:function(bl){try{bl.blur();
}catch(v){}
if(this.getActive()===bl){this.resetActive();
}
if(this.getFocus()===bl){this.resetFocus();
}},deactivate:function(bv){if(this.getActive()===bv){this.resetActive();
}},tryActivate:function(z){var A=this.__gY(z);

if(A){this.setActive(A);
}},__gK:function(j,k,l,m){var o=qx.event.Registration;
var n=o.createEvent(l,qx.event.type.Focus,[j,k,m]);
o.dispatchEvent(j,n);
},_windowFocused:true,__gL:function(){if(this._windowFocused){this._windowFocused=false;
this.__gK(this._window,null,J,false);
}},__gM:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gK(this._window,null,I,false);
}},_initObserver:qx.core.Variant.select(K,{"gecko":function(){this.__gA=qx.lang.Function.listener(this.__gS,this);
this.__gB=qx.lang.Function.listener(this.__gT,this);
this.__gC=qx.lang.Function.listener(this.__gR,this);
this.__gD=qx.lang.Function.listener(this.__gQ,this);
this.__gE=qx.lang.Function.listener(this.__gN,this);
this._document.addEventListener(H,this.__gA,true);
this._document.addEventListener(F,this.__gB,true);
this._window.addEventListener(I,this.__gC,true);
this._window.addEventListener(J,this.__gD,true);
this._window.addEventListener(bb,this.__gE,true);
},"mshtml":function(){this.__gA=qx.lang.Function.listener(this.__gS,this);
this.__gB=qx.lang.Function.listener(this.__gT,this);
this.__gG=qx.lang.Function.listener(this.__gO,this);
this.__gH=qx.lang.Function.listener(this.__gP,this);
this.__gF=qx.lang.Function.listener(this.__gV,this);
this._document.attachEvent(B,this.__gA);
this._document.attachEvent(bd,this.__gB);
this._document.attachEvent(be,this.__gG);
this._document.attachEvent(bf,this.__gH);
this._document.attachEvent(bc,this.__gF);
},"webkit":function(){this.__gA=qx.lang.Function.listener(this.__gS,this);
this.__gB=qx.lang.Function.listener(this.__gT,this);
this.__gH=qx.lang.Function.listener(this.__gP,this);
this.__gC=qx.lang.Function.listener(this.__gR,this);
this.__gD=qx.lang.Function.listener(this.__gQ,this);
this.__gF=qx.lang.Function.listener(this.__gV,this);
this._document.addEventListener(H,this.__gA,true);
this._document.addEventListener(F,this.__gB,true);
this._document.addEventListener(C,this.__gF,false);
this._window.addEventListener(E,this.__gH,true);
this._window.addEventListener(I,this.__gC,true);
this._window.addEventListener(J,this.__gD,true);
},"opera":function(){this.__gA=qx.lang.Function.listener(this.__gS,this);
this.__gB=qx.lang.Function.listener(this.__gT,this);
this.__gG=qx.lang.Function.listener(this.__gO,this);
this.__gH=qx.lang.Function.listener(this.__gP,this);
this._document.addEventListener(H,this.__gA,true);
this._document.addEventListener(F,this.__gB,true);
this._window.addEventListener(D,this.__gG,true);
this._window.addEventListener(E,this.__gH,true);
}}),_stopObserver:qx.core.Variant.select(K,{"gecko":function(){this._document.removeEventListener(H,this.__gA,true);
this._document.removeEventListener(F,this.__gB,true);
this._window.removeEventListener(I,this.__gC,true);
this._window.removeEventListener(J,this.__gD,true);
this._window.removeEventListener(bb,this.__gE,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,B,this.__gA);
qx.bom.Event.removeNativeListener(this._document,bd,this.__gB);
qx.bom.Event.removeNativeListener(this._document,be,this.__gG);
qx.bom.Event.removeNativeListener(this._document,bf,this.__gH);
qx.bom.Event.removeNativeListener(this._document,bc,this.__gF);
},"webkit":function(){this._document.removeEventListener(H,this.__gA,true);
this._document.removeEventListener(C,this.__gF,false);
this._window.removeEventListener(D,this.__gG,true);
this._window.removeEventListener(E,this.__gH,true);
this._window.removeEventListener(I,this.__gC,true);
this._window.removeEventListener(J,this.__gD,true);
},"opera":function(){this._document.removeEventListener(H,this.__gA,true);
this._window.removeEventListener(D,this.__gG,true);
this._window.removeEventListener(E,this.__gH,true);
this._window.removeEventListener(I,this.__gC,true);
this._window.removeEventListener(J,this.__gD,true);
}}),__gN:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"gecko":function(e){if(!this.__ha(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"mshtml":function(e){this.__gM();
var bu=e.srcElement;
var bt=this.__gX(bu);

if(bt){this.setFocus(bt);
}this.tryActivate(bu);
},"opera":function(e){var b=e.target;

if(b==this._document||b==this._window){this.__gM();

if(this.__gI){this.setFocus(this.__gI);
delete this.__gI;
}
if(this.__gJ){this.setActive(this.__gJ);
delete this.__gJ;
}}else{this.setFocus(b);
this.tryActivate(b);
if(!this.__ha(b)){b.selectionStart=0;
b.selectionEnd=0;
}}},"default":null})),__gP:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"mshtml":function(e){if(!e.toElement){this.__gL();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bE=e.target;

if(bE===this.getFocus()){this.resetFocus();
}
if(bE===this.getActive()){this.resetActive();
}},"opera":function(e){var bq=e.target;

if(bq==this._document){this.__gL();
this.__gI=this.getFocus();
this.__gJ=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bq===this.getFocus()){this.resetFocus();
}
if(bq===this.getActive()){this.resetActive();
}}},"default":null})),__gQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gL();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gL();
this.__gI=this.getFocus();
this.__gJ=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gR:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"gecko":function(e){var bN=e.target;

if(bN===this._window||bN===this._document){this.__gM();
bN=this._body;
}this.setFocus(bN);
this.tryActivate(bN);
},"webkit":function(e){var bD=e.target;

if(bD===this._window||bD===this._document){this.__gM();

if(this.__gI){this.setFocus(this.__gI);
delete this.__gI;
}
if(this.__gJ){this.setActive(this.__gJ);
delete this.__gJ;
}}else{this.setFocus(bD);
this.tryActivate(bD);
}},"default":null})),__gS:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"gecko":function(e){var x=this.__gX(e.target);

if(!x){qx.bom.Event.preventDefault(e);
}else if(x===this._body){this.setFocus(x);
}},"mshtml":function(e){var d=e.srcElement;
var c=this.__gX(d);

if(c){if(!this.__ha(d)){d.unselectable=G;
try{document.selection.empty();
}catch(e){}try{c.focus();
}catch(e){}}}else{qx.bom.Event.preventDefault(e);
if(!this.__ha(d)){d.unselectable=G;
}}},"webkit":function(e){var bn=e.target;
var bm=this.__gX(bn);

if(bm){this.setFocus(bm);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var bi=e.target;
var bg=this.__gX(bi);

if(!this.__ha(bi)){qx.bom.Event.preventDefault(e);
if(bg){var bh=this.getFocus();

if(bh&&bh.selectionEnd){bh.selectionStart=0;
bh.selectionEnd=0;
bh.blur();
}if(bg){this.setFocus(bg);
}}}else if(bg){this.setFocus(bg);
}},"default":null})),__gT:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"mshtml":function(e){var bp=e.srcElement;

if(bp.unselectable){bp.unselectable=N;
}this.tryActivate(this.__gU(bp));
},"gecko":function(e){var bM=e.target;

while(bM&&bM.offsetWidth===undefined){bM=bM.parentNode;
}
if(bM){this.tryActivate(bM);
}},"webkit|opera":function(e){this.tryActivate(this.__gU(e.target));
},"default":null})),__gU:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"mshtml|webkit":function(br){var bs=this.getFocus();

if(bs&&br!=bs&&(bs.nodeName.toLowerCase()===R||bs.nodeName.toLowerCase()===W)){br=bs;
}return br;
},"default":function(y){return y;
}})),__gV:qx.event.GlobalError.observeMethod(qx.core.Variant.select(K,{"mshtml|webkit":function(e){var a=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__ha(a)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gW:function(bx){var by=qx.bom.element.Attribute.get(bx,Q);

if(by>=1){return true;
}var bz=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(by>=0&&bz[bx.tagName]){return true;
}return false;
},__gX:function(r){while(r&&r.nodeType===1){if(r.getAttribute(T)==G){return null;
}
if(this.__gW(r)){return r;
}r=r.parentNode;
}return this._body;
},__gY:function(bI){var bJ=bI;

while(bI&&bI.nodeType===1){if(bI.getAttribute(U)==G){return null;
}bI=bI.parentNode;
}return bJ;
},__ha:function(p){while(p&&p.nodeType===1){var q=p.getAttribute(P);

if(q!=null){return q===G;
}p=p.parentNode;
}return true;
},_applyActive:function(bj,bk){if(bk){this.__gK(bk,bj,X,true);
}
if(bj){this.__gK(bj,bk,O,true);
}},_applyFocus:function(bG,bH){if(bH){this.__gK(bH,bG,M,true);
}
if(bG){this.__gK(bG,bH,S,true);
}if(bH){this.__gK(bH,bG,J,false);
}
if(bG){this.__gK(bG,bH,I,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__hb=null;
},defer:function(s){qx.event.Registration.addHandler(s);
var t=s.FOCUSABLE_ELEMENTS;

for(var u in t){t[u.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var t="",s="undefined",r="qx.client",q="readOnly",p="accessKey",o="qx.bom.element.Attribute",n="rowSpan",m="vAlign",l="className",k="textContent",I="'",H="htmlFor",G="longDesc",F="cellSpacing",E="frameBorder",D="='",C="useMap",B="innerText",A="innerHTML",z="tabIndex",x="dateTime",y="maxLength",v="mshtml",w="cellPadding",u="colSpan";
qx.Class.define(o,{statics:{__hc:{names:{"class":l,"for":H,html:A,text:qx.core.Variant.isSet(r,v)?B:k,colspan:u,rowspan:n,valign:m,datetime:x,accesskey:p,tabindex:z,maxlength:y,readonly:q,longdesc:G,cellpadding:w,cellspacing:F,frameborder:E,usemap:C},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:t,className:t,innerHTML:t,innerText:t,textContent:t,htmlFor:t,tabIndex:0,maxLength:qx.core.Variant.select(r,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(J){var K=[];
var M=this.__hc.runtime;

for(var L in J){if(!M[L]){K.push(L,D,J[L],I);
}}return K.join(t);
},get:qx.core.Variant.select(r,{"mshtml":function(d,name){var f=this.__hc;
var e;
name=f.names[name]||name;
if(f.original[name]){e=d.getAttribute(name,2);
}else if(f.property[name]){e=d[name];

if(typeof f.propertyDefault[name]!==s&&e==f.propertyDefault[name]){if(typeof f.bools[name]===s){return null;
}else{return e;
}}}else{e=d.getAttribute(name);
}if(f.bools[name]){return !!e;
}return e;
},"default":function(h,name){var j=this.__hc;
var i;
name=j.names[name]||name;
if(j.property[name]){i=h[name];

if(typeof j.propertyDefault[name]!==s&&i==j.propertyDefault[name]){if(typeof j.bools[name]===s){return null;
}else{return i;
}}}else{i=h.getAttribute(name);
}if(j.bools[name]){return !!i;
}return i;
}}),set:function(a,name,b){var c=this.__hc;
name=c.names[name]||name;
if(c.bools[name]){b=!!b;
}if(c.property[name]&&(!(a[name]===undefined)||c.qxProperties[name])){if(b==null){if(c.removeableProperties[name]){a.removeAttribute(name);
return;
}else if(typeof c.propertyDefault[name]!==s){b=c.propertyDefault[name];
}}a[name]=b;
}else{if(b===true){a.setAttribute(name,name);
}else if(b===false||b===null){a.removeAttribute(name);
}else{a.setAttribute(name,b);
}}},reset:function(g,name){this.set(g,name,null);
}}});
})();
(function(){var j="left",i="right",h="middle",g="qx.client",f="dblclick",e="click",d="none",c="contextmenu",b="qx.event.type.Mouse";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{init:function(m,n,o,p,q){qx.event.type.Dom.prototype.init.call(this,m,n,o,p,q);

if(!o){this._relatedTarget=qx.bom.Event.getRelatedTarget(m);
}return this;
},_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);
l.button=k.button;
l.clientX=k.clientX;
l.clientY=k.clientY;
l.pageX=k.pageX;
l.pageY=k.pageY;
l.screenX=k.screenX;
l.screenY=k.screenY;
l.wheelDelta=k.wheelDelta;
l.detail=k.detail;
l.srcElement=k.srcElement;
return l;
},__hd:qx.core.Variant.select(g,{"mshtml":{1:j,2:i,4:h},"default":{0:j,2:i,1:h}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case e:case f:return j;
case c:return i;
default:return this.__hd[this._native.button]||d;
}},isLeftPressed:function(){return this.getButton()===j;
},isMiddlePressed:function(){return this.getButton()===h;
},isRightPressed:function(){return this.getButton()===i;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(g,{"mshtml":function(){var r=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(r);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(g,{"mshtml":function(){var a=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(a);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){if(qx.bom.client.Platform.MAC){return -(this._native.wheelDelta/1200);
}else{return -(this._native.wheelDelta/120);
}}else{if(qx.bom.client.Platform.WIN){var d=120;
if(qx.bom.client.Engine.VERSION==533.16){d=1200;
}}else{d=40;
if(qx.bom.client.Engine.VERSION==533.16||qx.bom.client.Engine.VERSION==533.17){d=1200;
}}return -(this._native.wheelDelta/d);
}}})}});
})();
(function(){var l="qx.client",k="qx.bom.Viewport";
qx.Class.define(k,{statics:{getWidth:qx.core.Variant.select(l,{"opera":function(o){if(qx.bom.client.Engine.VERSION<9.5){return (o||window).document.body.clientWidth;
}else{var p=(o||window).document;
return qx.bom.Document.isStandardMode(o)?p.documentElement.clientWidth:p.body.clientWidth;
}},"webkit":function(m){if(qx.bom.client.Engine.VERSION<523.15){return (m||window).innerWidth;
}else{var n=(m||window).document;
return qx.bom.Document.isStandardMode(m)?n.documentElement.clientWidth:n.body.clientWidth;
}},"default":function(g){var h=(g||window).document;
return qx.bom.Document.isStandardMode(g)?h.documentElement.clientWidth:h.body.clientWidth;
}}),getHeight:qx.core.Variant.select(l,{"opera":function(i){if(qx.bom.client.Engine.VERSION<9.5){return (i||window).document.body.clientHeight;
}else{var j=(i||window).document;
return qx.bom.Document.isStandardMode(i)?j.documentElement.clientHeight:j.body.clientHeight;
}},"webkit":function(s){if(qx.bom.client.Engine.VERSION<523.15){return (s||window).innerHeight;
}else{var t=(s||window).document;
return qx.bom.Document.isStandardMode(s)?t.documentElement.clientHeight:t.body.clientHeight;
}},"default":function(a){var b=(a||window).document;
return qx.bom.Document.isStandardMode(a)?b.documentElement.clientHeight:b.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(l,{"mshtml":function(q){var r=(q||window).document;
return r.documentElement.scrollLeft||r.body.scrollLeft;
},"default":function(f){return (f||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(l,{"mshtml":function(c){var d=(c||window).document;
return d.documentElement.scrollTop||d.body.scrollTop;
},"default":function(e){return (e||window).pageYOffset;
}})}});
})();
(function(){var k="CSS1Compat",j="position:absolute;width:0;height:0;width:1",i="qx.bom.Document",h="1px",g="qx.client",f="div";
qx.Class.define(i,{statics:{isQuirksMode:qx.core.Variant.select(g,{"mshtml":function(l){if(qx.bom.client.Engine.VERSION>=8){return (l||window).document.documentMode===5;
}else{return (l||window).document.compatMode!==k;
}},"webkit":function(p){if(document.compatMode===undefined){var q=(p||window).document.createElement(f);
q.style.cssText=j;
return q.style.width===h?true:false;
}else{return (p||window).document.compatMode!==k;
}},"default":function(a){return (a||window).document.compatMode!==k;
}}),isStandardMode:function(e){return !this.isQuirksMode(e);
},getWidth:function(b){var c=(b||window).document;
var d=qx.bom.Viewport.getWidth(b);
var scroll=this.isStandardMode(b)?c.documentElement.scrollWidth:c.body.scrollWidth;
return Math.max(scroll,d);
},getHeight:function(m){var n=(m||window).document;
var o=qx.bom.Viewport.getHeight(m);
var scroll=this.isStandardMode(m)?n.documentElement.scrollHeight:n.body.scrollHeight;
return Math.max(scroll,o);
}}});
})();
(function(){var k="qx.client",j="ie",i="msie",h="android",g="operamini",f="mobile chrome",e=")(/| )([0-9]+\.[0-9])",d="iemobile",c="opera mobi",b="Mobile Safari",y="operamobile",x="mobile safari",w="IEMobile|Maxthon|MSIE",v="qx.bom.client.Browser",u="opera mini",t="(",s="opera",r="mshtml",q="Opera Mini|Opera Mobi|Opera",p="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",n="webkit",o="5.0",l="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",m="Mobile/";
qx.Bootstrap.define(v,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__he:function(C){var D=navigator.userAgent;
var F=new RegExp(t+C+e);
var G=D.match(F);

if(!G){return;
}var name=G[1].toLowerCase();
var E=G[3];
if(D.match(/Version(\/| )([0-9]+\.[0-9])/)){E=RegExp.$2;
}
if(qx.core.Variant.isSet(k,n)){if(name===h){name=f;
}else if(D.indexOf(b)!==-1||D.indexOf(m)!==-1){name=x;
}}else if(qx.core.Variant.isSet(k,r)){if(name===i){name=j;
if(qx.bom.client.System.WINCE&&name===j){name=d;
E=o;
}}}else if(qx.core.Variant.isSet(k,s)){if(name===c){name=y;
}else if(name===u){name=g;
}}this.NAME=name;
this.FULLVERSION=E;
this.VERSION=parseFloat(E,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(k,{"webkit":function(a){a.__he(p);
},"gecko":function(B){B.__he(l);
},"mshtml":function(A){A.__he(w);
},"opera":function(z){z.__he(q);
}})});
})();
(function(){var A="qx.client",z="qx.dom.Hierarchy",y="previousSibling",x="*",w="nextSibling",v="parentNode";
qx.Class.define(z,{statics:{getNodeIndex:function(t){var u=0;

while(t&&(t=t.previousSibling)){u++;
}return u;
},getElementIndex:function(I){var J=0;
var K=qx.dom.Node.ELEMENT;

while(I&&(I=I.previousSibling)){if(I.nodeType==K){J++;
}}return J;
},getNextElementSibling:function(g){while(g&&(g=g.nextSibling)&&!qx.dom.Node.isElement(g)){continue;
}return g||null;
},getPreviousElementSibling:function(E){while(E&&(E=E.previousSibling)&&!qx.dom.Node.isElement(E)){continue;
}return E||null;
},contains:qx.core.Variant.select(A,{"webkit|mshtml|opera":function(B,C){if(qx.dom.Node.isDocument(B)){var D=qx.dom.Node.getDocument(C);
return B&&D==B;
}else if(qx.dom.Node.isDocument(C)){return false;
}else{return B.contains(C);
}},"gecko":function(p,q){return !!(p.compareDocumentPosition(q)&16);
},"default":function(a,b){while(b){if(a==b){return true;
}b=b.parentNode;
}return false;
}}),isRendered:function(e){if(!e.parentNode||!e.offsetParent){return false;
}var f=e.ownerDocument||e.document;
if(f.body.contains){return f.body.contains(e);
}if(f.compareDocumentPosition){return !!(f.compareDocumentPosition(e)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(F,G){return this.contains(G,F);
},getCommonParent:qx.core.Variant.select(A,{"mshtml|opera":function(r,s){if(r===s){return r;
}
while(r&&qx.dom.Node.isElement(r)){if(r.contains(s)){return r;
}r=r.parentNode;
}return null;
},"default":function(L,M){if(L===M){return L;
}var N={};
var Q=qx.core.ObjectRegistry;
var P,O;

while(L||M){if(L){P=Q.toHashCode(L);

if(N[P]){return N[P];
}N[P]=L;
L=L.parentNode;
}
if(M){O=Q.toHashCode(M);

if(N[O]){return N[O];
}N[O]=M;
M=M.parentNode;
}}return null;
}}),getAncestors:function(V){return this._recursivelyCollect(V,v);
},getChildElements:function(m){m=m.firstChild;

if(!m){return [];
}var n=this.getNextSiblings(m);

if(m.nodeType===1){n.unshift(m);
}return n;
},getDescendants:function(o){return qx.lang.Array.fromCollection(o.getElementsByTagName(x));
},getFirstDescendant:function(R){R=R.firstChild;

while(R&&R.nodeType!=1){R=R.nextSibling;
}return R;
},getLastDescendant:function(i){i=i.lastChild;

while(i&&i.nodeType!=1){i=i.previousSibling;
}return i;
},getPreviousSiblings:function(c){return this._recursivelyCollect(c,y);
},getNextSiblings:function(H){return this._recursivelyCollect(H,w);
},_recursivelyCollect:function(S,T){var U=[];

while(S=S[T]){if(S.nodeType==1){U.push(S);
}}return U;
},getSiblings:function(d){return this.getPreviousSiblings(d).reverse().concat(this.getNextSiblings(d));
},isEmpty:function(h){h=h.firstChild;

while(h){if(h.nodeType===qx.dom.Node.ELEMENT||h.nodeType===qx.dom.Node.TEXT){return false;
}h=h.nextSibling;
}return true;
},cleanWhitespace:function(j){var k=j.firstChild;

while(k){var l=k.nextSibling;

if(k.nodeType==3&&!/\S/.test(k.nodeValue)){j.removeChild(k);
}k=l;
}}}});
})();
(function(){var h="qx.client",g="qx.event.type.Drag";
qx.Class.define(g,{extend:qx.event.type.Event,members:{init:function(n,o){qx.event.type.Event.prototype.init.call(this,true,n);

if(o){this._native=o.getNativeEvent()||null;
this._originalTarget=o.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e._native=this._native;
return e;
},getDocumentLeft:qx.core.Variant.select(h,{"mshtml":function(){if(this._native==null){return 0;
}var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(l);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(h,{"mshtml":function(){if(this._native==null){return 0;
}var a=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(a);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(b){this.getManager().addType(b);
},addAction:function(c){this.getManager().addAction(c);
},supportsType:function(i){return this.getManager().supportsType(i);
},supportsAction:function(m){return this.getManager().supportsAction(m);
},addData:function(j,k){this.getManager().addData(j,k);
},getData:function(f){return this.getManager().getData(f);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var j="losecapture",i="qx.client",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll";
qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(l,m){qx.event.dispatch.AbstractBubbling.call(this,l);
this.__hf=l.getWindow();
this.__hg=m;
l.addListener(this.__hf,h,this.releaseCapture,this);
l.addListener(this.__hf,g,this.releaseCapture,this);
l.addListener(this.__hf,c,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__hg:null,__hh:null,__hi:true,__hf:null,_getParent:function(k){return k.parentNode;
},canDispatchEvent:function(n,event,o){return (this.__hh&&this.__hj[o]);
},dispatchEvent:function(q,event,r){if(r==f){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__hi||!qx.dom.Hierarchy.contains(this.__hh,q)){q=this.__hh;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,q,event,r);
},__hj:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(t,u){var u=u!==false;

if(this.__hh===t&&this.__hi==u){return;
}
if(this.__hh){this.releaseCapture();
}this.nativeSetCapture(t,u);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(t,j,function(){qx.bom.Event.removeNativeListener(t,j,arguments.callee);
self.releaseCapture();
});
}this.__hi=u;
this.__hh=t;
this.__hg.fireEvent(t,d,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__hh;
},releaseCapture:function(){var v=this.__hh;

if(!v){return;
}this.__hh=null;
this.__hg.fireEvent(v,j,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(v);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(i,{"mshtml":function(a,b){a.setCapture(b!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(i,{"mshtml":function(s){s.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__hh=this.__hf=this.__hg=null;
},defer:function(p){qx.event.Registration.addDispatcher(p);
}});
})();
(function(){var v="qx.client",u="",t="mshtml",s="'",r="SelectionLanguage",q="qx.xml.Document",p=" />",o="MSXML2.DOMDocument.3.0",n='<\?xml version="1.0" encoding="utf-8"?>\n<',m="MSXML2.XMLHTTP.3.0",g="MSXML2.XMLHTTP.6.0",k=" xmlns='",j="text/xml",f="XPath",e="MSXML2.DOMDocument.6.0",h="HTML";
qx.Class.define(q,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(b){if(b.nodeType===9){return b.documentElement.nodeName!==h;
}else if(b.ownerDocument){return this.isXmlDocument(b.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(v,{"mshtml":function(B,C){var D=new ActiveXObject(this.DOMDOC);
D.setProperty(r,f);

if(C){var E=n;
E+=C;

if(B){E+=k+B+s;
}E+=p;
D.loadXML(E);
}return D;
},"default":function(c,d){return document.implementation.createDocument(c||u,d||u,null);
}}),fromString:qx.core.Variant.select(v,{"mshtml":function(F){var G=qx.xml.Document.create();
G.loadXML(F);
return G;
},"default":function(z){var A=new DOMParser();
return A.parseFromString(z,j);
}})},defer:function(w){if(qx.core.Variant.isSet(v,t)){var x=[e,o];
var y=[g,m];

for(var i=0,l=x.length;i<l;i++){try{new ActiveXObject(x[i]);
new ActiveXObject(y[i]);
}catch(a){continue;
}w.DOMDOC=x[i];
w.XMLHTTP=y[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(K,stop,L){var parent=K.parentNode;
var Q=qx.dom.Node.getDocument(K);
var M=Q.body;
var Y,W,T;
var bb,R,bc;
var U,bd,bg;
var be,O,X,N;
var S,bf,V;
var P=L===g;
var ba=L===c;
stop=stop?stop.parentNode:Q;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===M||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===M){W=parent.scrollLeft;
T=W+qx.bom.Viewport.getWidth();
bb=qx.bom.Viewport.getWidth();
R=parent.clientWidth;
bc=parent.scrollWidth;
U=0;
bd=0;
bg=0;
}else{Y=qx.bom.element.Location.get(parent);
W=Y.left;
T=Y.right;
bb=parent.offsetWidth;
R=parent.clientWidth;
bc=parent.scrollWidth;
U=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
bd=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
bg=bb-R-U-bd;
}be=qx.bom.element.Location.get(K);
O=be.left;
X=be.right;
N=K.offsetWidth;
S=O-W-U;
bf=X-T+bd;
V=0;
if(P){V=S;
}else if(ba){V=bf+bg;
}else if(S<0||N>R){V=S;
}else if(bf>0){V=bf+bg;
}parent.scrollLeft+=V;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===M){break;
}parent=parent.parentNode;
}},intoViewY:function(o,stop,p){var parent=o.parentNode;
var v=qx.dom.Node.getDocument(o);
var q=v.body;
var D,r,z;
var F,C,x;
var t,u,s;
var H,I,E,y;
var B,w,J;
var G=p===d;
var A=p===e;
stop=stop?stop.parentNode:v;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===q||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===q){r=parent.scrollTop;
z=r+qx.bom.Viewport.getHeight();
F=qx.bom.Viewport.getHeight();
C=parent.clientHeight;
x=parent.scrollHeight;
t=0;
u=0;
s=0;
}else{D=qx.bom.element.Location.get(parent);
r=D.top;
z=D.bottom;
F=parent.offsetHeight;
C=parent.clientHeight;
x=parent.scrollHeight;
t=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
u=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
s=F-C-t-u;
}H=qx.bom.element.Location.get(o);
I=H.top;
E=H.bottom;
y=o.offsetHeight;
B=I-r-t;
w=E-z+u;
J=0;
if(G){J=B;
}else if(A){J=w+s;
}else if(B<0||y>C){J=B;
}else if(w>0){J=w+s;
}parent.scrollTop+=J;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===q){break;
}parent=parent.parentNode;
}},intoView:function(l,stop,m,n){this.intoViewX(l,stop,m);
this.intoViewY(l,stop,n);
}}});
})();
(function(){var q="",p="qx.client",o="hidden",n="-moz-scrollbars-none",m="overflow",l=";",k="overflowY",j=":",i="overflowX",h="overflow:",E="none",D="scroll",C="borderLeftStyle",B="borderRightStyle",A="div",z="borderRightWidth",y="overflow-y",x="borderLeftWidth",w="-moz-scrollbars-vertical",v="100px",r="qx.bom.element.Overflow",u="overflow-x";
qx.Class.define(r,{statics:{__hk:null,getScrollbarWidth:function(){if(this.__hk!==null){return this.__hk;
}var bb=qx.bom.element.Style;
var bd=function(bF,bG){return parseInt(bb.get(bF,bG))||0;
};
var be=function(g){return (bb.get(g,B)==E?0:bd(g,z));
};
var bc=function(J){return (bb.get(J,C)==E?0:bd(J,x));
};
var bg=qx.core.Variant.select(p,{"mshtml":function(S){if(bb.get(S,k)==o||S.clientWidth==0){return be(S);
}return Math.max(0,S.offsetWidth-S.clientLeft-S.clientWidth);
},"default":function(bh){if(bh.clientWidth==0){var bi=bb.get(bh,m);
var bj=(bi==D||bi==w?16:0);
return Math.max(0,be(bh)+bj);
}return Math.max(0,(bh.offsetWidth-bh.clientWidth-bc(bh)));
}});
var bf=function(X){return bg(X)-be(X);
};
var t=document.createElement(A);
var s=t.style;
s.height=s.width=v;
s.overflow=D;
document.body.appendChild(t);
var c=bf(t);
this.__hk=c?c:16;
document.body.removeChild(t);
return this.__hk;
},_compile:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(br,bs){if(bs==o){bs=n;
}return h+bs+l;
}:
function(ce,cf){return ce+j+cf+l;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(K,L){return h+L+l;
}:
function(bK,bL){return bK+j+bL+l;
},"default":function(Y,ba){return Y+j+ba+l;
}}),compileX:function(bE){return this._compile(u,bE);
},compileY:function(f){return this._compile(y,f);
},getX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bt,bu){var bv=qx.bom.element.Style.get(bt,m,bu,false);

if(bv===n){bv=o;
}return bv;
}:
function(cc,cd){return qx.bom.element.Style.get(cc,i,cd,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bT,bU){return qx.bom.element.Style.get(bT,m,bU,false);
}:
function(bH,bI){return qx.bom.element.Style.get(bH,i,bI,false);
},"default":function(bA,bB){return qx.bom.element.Style.get(bA,i,bB,false);
}}),setX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bX,bY){if(bY==o){bY=n;
}bX.style.overflow=bY;
}:
function(T,U){T.style.overflowX=U;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bP,bQ){bP.style.overflow=bQ;
}:
function(bk,bl){bk.style.overflowX=bl;
},"default":function(bC,bD){bC.style.overflowX=bD;
}}),resetX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(P){P.style.overflow=q;
}:
function(bV){bV.style.overflowX=q;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(H,I){H.style.overflow=q;
}:
function(bN,bO){bN.style.overflowX=q;
},"default":function(bM){bM.style.overflowX=q;
}}),getY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bm,bn){var bo=qx.bom.element.Style.get(bm,m,bn,false);

if(bo===n){bo=o;
}return bo;
}:
function(a,b){return qx.bom.element.Style.get(a,k,b,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(by,bz){return qx.bom.element.Style.get(by,m,bz,false);
}:
function(bp,bq){return qx.bom.element.Style.get(bp,k,bq,false);
},"default":function(V,W){return qx.bom.element.Style.get(V,k,W,false);
}}),setY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(N,O){if(O===o){O=n;
}N.style.overflow=O;
}:
function(Q,R){Q.style.overflowY=R;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bR,bS){bR.style.overflow=bS;
}:
function(ca,cb){ca.style.overflowY=cb;
},"default":function(F,G){F.style.overflowY=G;
}}),resetY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(M){M.style.overflow=q;
}:
function(bJ){bJ.style.overflowY=q;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(d,e){d.style.overflow=q;
}:
function(bw,bx){bw.style.overflowY=q;
},"default":function(bW){bW.style.overflowY=q;
}})}});
})();
(function(){var E="auto",D="px",C=",",B="clip:auto;",A="rect(",z=");",y="",x=")",w="qx.bom.element.Clip",v="string",s="rect(auto)",u="clip:rect(",t="clip",r="rect(auto,auto,auto,auto)";
qx.Class.define(w,{statics:{compile:function(F){if(!F){return B;
}var K=F.left;
var top=F.top;
var J=F.width;
var I=F.height;
var G,H;

if(K==null){G=(J==null?E:J+D);
K=E;
}else{G=(J==null?E:K+J+D);
K=K+D;
}
if(top==null){H=(I==null?E:I+D);
top=E;
}else{H=(I==null?E:top+I+D);
top=top+D;
}return u+top+C+G+C+H+C+K+z;
},get:function(i,j){var l=qx.bom.element.Style.get(i,t,j,false);
var q,top,o,n;
var k,m;

if(typeof l===v&&l!==E&&l!==y){l=qx.lang.String.trim(l);
if(/\((.*)\)/.test(l)){var p=RegExp.$1.split(C);
top=qx.lang.String.trim(p[0]);
k=qx.lang.String.trim(p[1]);
m=qx.lang.String.trim(p[2]);
q=qx.lang.String.trim(p[3]);
if(q===E){q=null;
}
if(top===E){top=null;
}
if(k===E){k=null;
}
if(m===E){m=null;
}if(top!=null){top=parseInt(top,10);
}
if(k!=null){k=parseInt(k,10);
}
if(m!=null){m=parseInt(m,10);
}
if(q!=null){q=parseInt(q,10);
}if(k!=null&&q!=null){o=k-q;
}else if(k!=null){o=k;
}
if(m!=null&&top!=null){n=m-top;
}else if(m!=null){n=m;
}}else{throw new Error("Could not parse clip string: "+l);
}}return {left:q||null,top:top||null,width:o||null,height:n||null};
},set:function(a,b){if(!b){a.style.clip=r;
return;
}var g=b.left;
var top=b.top;
var f=b.width;
var e=b.height;
var c,d;

if(g==null){c=(f==null?E:f+D);
g=E;
}else{c=(f==null?E:g+f+D);
g=g+D;
}
if(top==null){d=(e==null?E:e+D);
top=E;
}else{d=(e==null?E:top+e+D);
top=top+D;
}a.style.clip=A+top+C+c+C+d+C+g+x;
},reset:function(h){h.style.clip=qx.bom.client.Engine.MSHTML?s:E;
}}});
})();
(function(){var m="n-resize",l="e-resize",k="nw-resize",j="ne-resize",i="",h="cursor:",g="qx.client",f=";",e="qx.bom.element.Cursor",d="cursor",c="hand";
qx.Class.define(e,{statics:{__hl:qx.core.Variant.select(g,{"mshtml":{"cursor":c,"ew-resize":l,"ns-resize":m,"nesw-resize":j,"nwse-resize":k},"opera":{"col-resize":l,"row-resize":m,"ew-resize":l,"ns-resize":m,"nesw-resize":j,"nwse-resize":k},"default":{}}),compile:function(q){return h+(this.__hl[q]||q)+f;
},get:function(a,b){return qx.bom.element.Style.get(a,d,b,false);
},set:function(o,p){o.style.cursor=this.__hl[p]||p;
},reset:function(n){n.style.cursor=i;
}}});
})();
(function(){var x="",w="qx.client",v=";",u="filter",t="opacity:",s="opacity",r="MozOpacity",q=");",p=")",o="zoom:1;filter:alpha(opacity=",l="qx.bom.element.Opacity",n="alpha(opacity=",m="-moz-opacity:";
qx.Class.define(l,{statics:{compile:qx.core.Variant.select(w,{"mshtml":function(i){if(i>=1){return x;
}
if(i<0.00001){i=0;
}return o+(i*100)+q;
},"gecko":function(h){if(h==1){h=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return m+h+v;
}else{return t+h+v;
}},"default":function(C){if(C==1){return x;
}return t+C+v;
}}),set:qx.core.Variant.select(w,{"mshtml":function(D,E){var F=qx.bom.element.Style.get(D,u,qx.bom.element.Style.COMPUTED_MODE,false);
if(E>=1){D.style.filter=F.replace(/alpha\([^\)]*\)/gi,x);
return;
}
if(E<0.00001){E=0;
}if(!D.currentStyle||!D.currentStyle.hasLayout){D.style.zoom=1;
}D.style.filter=F.replace(/alpha\([^\)]*\)/gi,x)+n+E*100+p;
},"gecko":function(y,z){if(z==1){z=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){y.style.MozOpacity=z;
}else{y.style.opacity=z;
}},"default":function(J,K){if(K==1){K=x;
}J.style.opacity=K;
}}),reset:qx.core.Variant.select(w,{"mshtml":function(j){var k=qx.bom.element.Style.get(j,u,qx.bom.element.Style.COMPUTED_MODE,false);
j.style.filter=k.replace(/alpha\([^\)]*\)/gi,x);
},"gecko":function(A){if(qx.bom.client.Engine.VERSION<1.7){A.style.MozOpacity=x;
}else{A.style.opacity=x;
}},"default":function(B){B.style.opacity=x;
}}),get:qx.core.Variant.select(w,{"mshtml":function(d,e){var f=qx.bom.element.Style.get(d,u,e,false);

if(f){var g=f.match(/alpha\(opacity=(.*)\)/);

if(g&&g[1]){return parseFloat(g[1])/100;
}}return 1.0;
},"gecko":function(G,H){var I=qx.bom.element.Style.get(G,qx.bom.client.Engine.VERSION<1.7?r:s,H,false);

if(I==0.999999){I=1.0;
}
if(I!=null){return parseFloat(I);
}return 1.0;
},"default":function(a,b){var c=qx.bom.element.Style.get(a,s,b,false);

if(c!=null){return parseFloat(c);
}return 1.0;
}})}});
})();
(function(){var x="qx.client",w="",v="boxSizing",u="box-sizing",t=":",s="border-box",r="qx.bom.element.BoxSizing",q="KhtmlBoxSizing",p="-moz-box-sizing",o="WebkitBoxSizing",k=";",n="-khtml-box-sizing",m="content-box",j="-webkit-box-sizing",h="MozBoxSizing";
qx.Class.define(r,{statics:{__hm:qx.core.Variant.select(x,{"mshtml":null,"webkit":[v,q,o],"gecko":[h],"opera":[v]}),__hn:qx.core.Variant.select(x,{"mshtml":null,"webkit":[u,n,j],"gecko":[p],"opera":[u]}),__ho:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__hp:function(F){var G=this.__ho;
return G.tags[F.tagName.toLowerCase()]||G.types[F.type];
},compile:qx.core.Variant.select(x,{"mshtml":function(y){{};
},"default":function(a){var c=this.__hn;
var b=w;

if(c){for(var i=0,l=c.length;i<l;i++){b+=c[i]+t+a+k;
}}return b;
}}),get:qx.core.Variant.select(x,{"mshtml":function(B){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(B))){if(!this.__hp(B)){return m;
}}return s;
},"default":function(d){var f=this.__hm;
var e;

if(f){for(var i=0,l=f.length;i<l;i++){e=qx.bom.element.Style.get(d,f[i],null,false);

if(e!=null&&e!==w){return e;
}}}return w;
}}),set:qx.core.Variant.select(x,{"mshtml":function(z,A){{};
},"default":function(C,D){var E=this.__hm;

if(E){for(var i=0,l=E.length;i<l;i++){C.style[E[i]]=D;
}}}}),reset:function(g){this.set(g,w);
}}});
})();
(function(){var D="",C="qx.client",B="userSelect",A="style",z="MozUserModify",y="px",x="float",w="borderImage",v="styleFloat",u="appearance",W="pixelHeight",V='Ms',U=":",T="cssFloat",S="pixelTop",R="pixelLeft",Q='O',P="qx.bom.element.Style",O='Khtml',N='string',K="pixelRight",L='Moz',I="pixelWidth",J="pixelBottom",G=";",H="textOverflow",E="userModify",F='Webkit',M="WebkitUserModify";
qx.Class.define(P,{statics:{__hq:function(){var b=[u,B,H,w];
var f={};
var c=document.documentElement.style;
var g=[L,F,O,Q,V];

for(var i=0,l=b.length;i<l;i++){var h=b[i];
var d=h;

if(c[h]){f[d]=h;
continue;
}h=qx.lang.String.firstUp(h);

for(var j=0,k=g.length;j<k;j++){var e=g[j]+h;

if(typeof c[e]==N){f[d]=e;
break;
}}}this.__hr=f;
this.__hr[E]=qx.core.Variant.select(C,{"gecko":z,"webkit":M,"default":B});
this.__hs={};

for(var d in f){this.__hs[d]=this.__hw(f[d]);
}this.__hr[x]=qx.core.Variant.select(C,{"mshtml":v,"default":T});
},__ht:{width:I,height:W,left:R,right:K,top:S,bottom:J},__hu:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(X){var ba=[];
var bc=this.__hu;
var bb=this.__hs;
var name,Y;

for(name in X){Y=X[name];

if(Y==null){continue;
}name=bb[name]||name;
if(bc[name]){ba.push(bc[name].compile(Y));
}else{ba.push(this.__hw(name),U,Y,G);
}}return ba.join(D);
},__hv:{},__hw:function(bB){var bC=this.__hv;
var bD=bC[bB];

if(!bD){bD=bC[bB]=qx.lang.String.hyphenate(bB);
}return bD;
},setCss:qx.core.Variant.select(C,{"mshtml":function(by,bz){by.style.cssText=bz;
},"default":function(bn,bo){bn.setAttribute(A,bo);
}}),getCss:qx.core.Variant.select(C,{"mshtml":function(a){return a.style.cssText.toLowerCase();
},"default":function(t){return t.getAttribute(A);
}}),isPropertySupported:function(bx){return (this.__hu[bx]||this.__hr[bx]||bx in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bd,name,be,bf){{};
name=this.__hr[name]||name;
if(bf!==false&&this.__hu[name]){return this.__hu[name].set(bd,be);
}else{bd.style[name]=be!==null?be:D;
}},setStyles:function(bp,bq,br){{};
var bu=this.__hr;
var bw=this.__hu;
var bs=bp.style;

for(var bv in bq){var bt=bq[bv];
var name=bu[bv]||bv;

if(bt===undefined){if(br!==false&&bw[name]){bw[name].reset(bp);
}else{bs[name]=D;
}}else{if(br!==false&&bw[name]){bw[name].set(bp,bt);
}else{bs[name]=bt!==null?bt:D;
}}}},reset:function(m,name,n){name=this.__hr[name]||name;
if(n!==false&&this.__hu[name]){return this.__hu[name].reset(m);
}else{m.style[name]=D;
}},get:qx.core.Variant.select(C,{"mshtml":function(bg,name,bh,bi){name=this.__hr[name]||name;
if(bi!==false&&this.__hu[name]){return this.__hu[name].get(bg,bh);
}if(!bg.currentStyle){return bg.style[name]||D;
}switch(bh){case this.LOCAL_MODE:return bg.style[name]||D;
case this.CASCADED_MODE:return bg.currentStyle[name]||D;
default:var bm=bg.currentStyle[name]||D;
if(/^-?[\.\d]+(px)?$/i.test(bm)){return bm;
}var bl=this.__ht[name];

if(bl){var bj=bg.style[name];
bg.style[name]=bm||0;
var bk=bg.style[bl]+y;
bg.style[name]=bj;
return bk;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bm)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bm;
}},"default":function(o,name,p,q){name=this.__hr[name]||name;
if(q!==false&&this.__hu[name]){return this.__hu[name].get(o,p);
}switch(p){case this.LOCAL_MODE:return o.style[name]||D;
case this.CASCADED_MODE:if(o.currentStyle){return o.currentStyle[name]||D;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var r=qx.dom.Node.getDocument(o);
var s=r.defaultView.getComputedStyle(o,null);
return s?s[name]:D;
}}})},defer:function(bA){bA.__hq();
}});
})();
(function(){var E="borderTopWidth",D="borderLeftWidth",C="marginTop",B="marginLeft",A="scroll",z="qx.client",y="border-box",x="borderBottomWidth",w="borderRightWidth",v="auto",T="padding",S="qx.bom.element.Location",R="paddingLeft",Q="static",P="marginBottom",O="visible",N="BODY",M="paddingBottom",L="paddingTop",K="marginRight",I="position",J="margin",G="overflow",H="paddingRight",F="border";
qx.Class.define(S,{statics:{__hx:function(bI,bJ){return qx.bom.element.Style.get(bI,bJ,qx.bom.element.Style.COMPUTED_MODE,false);
},__hy:function(bd,be){return parseInt(qx.bom.element.Style.get(bd,be,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hz:function(l){var o=0,top=0;
if(l.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var n=qx.dom.Node.getWindow(l);
o-=qx.bom.Viewport.getScrollLeft(n);
top-=qx.bom.Viewport.getScrollTop(n);
}else{var m=qx.dom.Node.getDocument(l).body;
l=l.parentNode;
while(l&&l!=m){o+=l.scrollLeft;
top+=l.scrollTop;
l=l.parentNode;
}}return {left:o,top:top};
},__hA:qx.core.Variant.select(z,{"mshtml":function(bj){var bl=qx.dom.Node.getDocument(bj);
var bk=bl.body;
var bm=0;
var top=0;
bm-=bk.clientLeft+bl.documentElement.clientLeft;
top-=bk.clientTop+bl.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){bm+=this.__hy(bk,D);
top+=this.__hy(bk,E);
}return {left:bm,top:top};
},"webkit":function(bf){var bh=qx.dom.Node.getDocument(bf);
var bg=bh.body;
var bi=bg.offsetLeft;
var top=bg.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){bi+=this.__hy(bg,D);
top+=this.__hy(bg,E);
}return {left:bi,top:top};
},"gecko":function(bD){var bE=qx.dom.Node.getDocument(bD).body;
var bF=bE.offsetLeft;
var top=bE.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bF+=this.__hy(bE,B);
top+=this.__hy(bE,C);
}if(qx.bom.element.BoxSizing.get(bE)!==y){bF+=this.__hy(bE,D);
top+=this.__hy(bE,E);
}return {left:bF,top:top};
},"default":function(bK){var bL=qx.dom.Node.getDocument(bK).body;
var bM=bL.offsetLeft;
var top=bL.offsetTop;
return {left:bM,top:top};
}}),__hB:qx.core.Variant.select(z,{"mshtml|webkit":function(bp){var br=qx.dom.Node.getDocument(bp);
if(bp.getBoundingClientRect){var bs=bp.getBoundingClientRect();
var bt=bs.left;
var top=bs.top;
}else{var bt=bp.offsetLeft;
var top=bp.offsetTop;
bp=bp.offsetParent;
var bq=br.body;
while(bp&&bp!=bq){bt+=bp.offsetLeft;
top+=bp.offsetTop;
bt+=this.__hy(bp,D);
top+=this.__hy(bp,E);
bp=bp.offsetParent;
}}return {left:bt,top:top};
},"gecko":function(U){if(U.getBoundingClientRect){var X=U.getBoundingClientRect();
var Y=Math.round(X.left);
var top=Math.round(X.top);
}else{var Y=0;
var top=0;
var V=qx.dom.Node.getDocument(U).body;
var W=qx.bom.element.BoxSizing;

if(W.get(U)!==y){Y-=this.__hy(U,D);
top-=this.__hy(U,E);
}
while(U&&U!==V){Y+=U.offsetLeft;
top+=U.offsetTop;
if(W.get(U)!==y){Y+=this.__hy(U,D);
top+=this.__hy(U,E);
}if(U.parentNode&&this.__hx(U.parentNode,G)!=O){Y+=this.__hy(U.parentNode,D);
top+=this.__hy(U.parentNode,E);
}U=U.offsetParent;
}}return {left:Y,top:top};
},"default":function(bA){var bC=0;
var top=0;
var bB=qx.dom.Node.getDocument(bA).body;
while(bA&&bA!==bB){bC+=bA.offsetLeft;
top+=bA.offsetTop;
bA=bA.offsetParent;
}return {left:bC,top:top};
}}),get:function(a,b){if(a.tagName==N){var location=this.__hC(a);
var i=location.left;
var top=location.top;
}else{var c=this.__hA(a);
var h=this.__hB(a);
var scroll=this.__hz(a);
var i=h.left+c.left-scroll.left;
var top=h.top+c.top-scroll.top;
}var d=i+a.offsetWidth;
var e=top+a.offsetHeight;

if(b){if(b==T||b==A){var f=qx.bom.element.Overflow.getX(a);

if(f==A||f==v){d+=a.scrollWidth-a.offsetWidth+this.__hy(a,D)+this.__hy(a,w);
}var g=qx.bom.element.Overflow.getY(a);

if(g==A||g==v){e+=a.scrollHeight-a.offsetHeight+this.__hy(a,E)+this.__hy(a,x);
}}
switch(b){case T:i+=this.__hy(a,R);
top+=this.__hy(a,L);
d-=this.__hy(a,H);
e-=this.__hy(a,M);
case A:i-=a.scrollLeft;
top-=a.scrollTop;
d-=a.scrollLeft;
e-=a.scrollTop;
case F:i+=this.__hy(a,D);
top+=this.__hy(a,E);
d-=this.__hy(a,w);
e-=this.__hy(a,x);
break;
case J:i-=this.__hy(a,B);
top-=this.__hy(a,C);
d+=this.__hy(a,K);
e+=this.__hy(a,P);
break;
}}return {left:i,top:top,right:d,bottom:e};
},__hC:qx.core.Variant.select(z,{"default":function(t){var top=t.offsetTop+this.__hy(t,C);
var u=t.offsetLeft+this.__hy(t,B);
return {left:u,top:top};
},"mshtml":function(p){var top=p.offsetTop;
var q=p.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__hy(p,C);
q+=this.__hy(p,B);
}return {left:q,top:top};
},"gecko":function(bN){var top=bN.offsetTop+this.__hy(bN,C)+this.__hy(bN,D);
var bO=bN.offsetLeft+this.__hy(bN,B)+this.__hy(bN,E);
return {left:bO,top:top};
}}),getLeft:function(j,k){return this.get(j,k).left;
},getTop:function(r,s){return this.get(r,s).top;
},getRight:function(bn,bo){return this.get(bn,bo).right;
},getBottom:function(bG,bH){return this.get(bG,bH).bottom;
},getRelative:function(bu,bv,bw,bx){var bz=this.get(bu,bw);
var by=this.get(bv,bx);
return {left:bz.left-by.left,top:bz.top-by.top,right:bz.right-by.right,bottom:bz.bottom-by.bottom};
},getPosition:function(bP){return this.getRelative(bP,this.getOffsetParent(bP));
},getOffsetParent:function(ba){var bc=ba.offsetParent||document.body;
var bb=qx.bom.element.Style;

while(bc&&(!/^body|html$/i.test(bc.tagName)&&bb.get(bc,I)===Q)){bc=bc.offsetParent;
}return bc;
}}});
})();
(function(){var D="qx.client",C="character",B="EndToEnd",A="input",z="textarea",y="StartToStart",x='character',w="qx.bom.Selection",v="button",u="#text",t="body";
qx.Class.define(w,{statics:{getSelectionObject:qx.core.Variant.select(D,{"mshtml":function(bl){return bl.selection;
},"default":function(E){return qx.dom.Node.getWindow(E).getSelection();
}}),get:qx.core.Variant.select(D,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));
return o.text;
},"default":function(p){if(this.__hD(p)){return p.value.substring(p.selectionStart,p.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();
}}}),getLength:qx.core.Variant.select(D,{"mshtml":function(G){var I=this.get(G);
var H=qx.util.StringSplit.split(I,/\r\n/);
return I.length-(H.length-1);
},"opera":function(X){var bd,bb,Y;

if(this.__hD(X)){var bc=X.selectionStart;
var ba=X.selectionEnd;
bd=X.value.substring(bc,ba);
bb=ba-bc;
}else{bd=qx.bom.Selection.get(X);
bb=bd.length;
}Y=qx.util.StringSplit.split(bd,/\r\n/);
return bb-(Y.length-1);
},"default":function(J){if(this.__hD(J)){return J.selectionEnd-J.selectionStart;
}else{return this.get(J).length;
}}}),getStart:qx.core.Variant.select(D,{"mshtml":function(bq){if(this.__hD(bq)){var bv=qx.bom.Range.get();
if(!bq.contains(bv.parentElement())){return -1;
}var bw=qx.bom.Range.get(bq);
var bu=bq.value.length;
bw.moveToBookmark(bv.getBookmark());
bw.moveEnd(x,bu);
return bu-bw.text.length;
}else{var bw=qx.bom.Range.get(bq);
var bs=bw.parentElement();
var bx=qx.bom.Range.get();
bx.moveToElementText(bs);
var br=qx.bom.Range.get(qx.dom.Node.getBodyElement(bq));
br.setEndPoint(y,bw);
br.setEndPoint(B,bx);
if(bx.compareEndPoints(y,br)==0){return 0;
}var bt;
var by=0;

while(true){bt=br.moveStart(C,-1);
if(bx.compareEndPoints(y,br)==0){break;
}if(bt==0){break;
}else{by++;
}}return ++by;
}},"gecko|webkit":function(q){if(this.__hD(q)){return q.selectionStart;
}else{var s=qx.dom.Node.getDocument(q);
var r=this.getSelectionObject(s);
if(r.anchorOffset<r.focusOffset){return r.anchorOffset;
}else{return r.focusOffset;
}}},"default":function(Q){if(this.__hD(Q)){return Q.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(Q)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(D,{"mshtml":function(d){if(this.__hD(d)){var i=qx.bom.Range.get();
if(!d.contains(i.parentElement())){return -1;
}var j=qx.bom.Range.get(d);
var h=d.value.length;
j.moveToBookmark(i.getBookmark());
j.moveStart(x,-h);
return j.text.length;
}else{var j=qx.bom.Range.get(d);
var f=j.parentElement();
var k=qx.bom.Range.get();
k.moveToElementText(f);
var h=k.text.length;
var e=qx.bom.Range.get(qx.dom.Node.getBodyElement(d));
e.setEndPoint(B,j);
e.setEndPoint(y,k);
if(k.compareEndPoints(B,e)==0){return h-1;
}var g;
var l=0;

while(true){g=e.moveEnd(C,1);
if(k.compareEndPoints(B,e)==0){break;
}if(g==0){break;
}else{l++;
}}return h-(++l);
}},"gecko|webkit":function(a){if(this.__hD(a)){return a.selectionEnd;
}else{var c=qx.dom.Node.getDocument(a);
var b=this.getSelectionObject(c);
if(b.focusOffset>b.anchorOffset){return b.focusOffset;
}else{return b.anchorOffset;
}}},"default":function(F){if(this.__hD(F)){return F.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(F)).focusOffset;
}}}),__hD:function(m){return qx.dom.Node.isElement(m)&&(m.nodeName.toLowerCase()==A||m.nodeName.toLowerCase()==z);
},set:qx.core.Variant.select(D,{"mshtml":function(R,S,T){var U;
if(qx.dom.Node.isDocument(R)){R=R.body;
}
if(qx.dom.Node.isElement(R)||qx.dom.Node.isText(R)){switch(R.nodeName.toLowerCase()){case A:case z:case v:if(T===undefined){T=R.value.length;
}
if(S>=0&&S<=R.value.length&&T>=0&&T<=R.value.length){U=qx.bom.Range.get(R);
U.collapse(true);
U.moveStart(C,S);
U.moveEnd(C,T-S);
U.select();
return true;
}break;
case u:if(T===undefined){T=R.nodeValue.length;
}
if(S>=0&&S<=R.nodeValue.length&&T>=0&&T<=R.nodeValue.length){U=qx.bom.Range.get(qx.dom.Node.getBodyElement(R));
U.moveToElementText(R.parentNode);
U.collapse(true);
U.moveStart(C,S);
U.moveEnd(C,T-S);
U.select();
return true;
}break;
default:if(T===undefined){T=R.childNodes.length-1;
}if(R.childNodes[S]&&R.childNodes[T]){U=qx.bom.Range.get(qx.dom.Node.getBodyElement(R));
U.moveToElementText(R.childNodes[S]);
U.collapse(true);
var V=qx.bom.Range.get(qx.dom.Node.getBodyElement(R));
V.moveToElementText(R.childNodes[T]);
U.setEndPoint(B,V);
U.select();
return true;
}}}return false;
},"default":function(be,bf,bg){var bk=be.nodeName.toLowerCase();

if(qx.dom.Node.isElement(be)&&(bk==A||bk==z)){if(bg===undefined){bg=be.value.length;
}if(bf>=0&&bf<=be.value.length&&bg>=0&&bg<=be.value.length){be.focus();
be.select();
be.setSelectionRange(bf,bg);
return true;
}}else{var bi=false;
var bj=qx.dom.Node.getWindow(be).getSelection();
var bh=qx.bom.Range.get(be);
if(qx.dom.Node.isText(be)){if(bg===undefined){bg=be.length;
}
if(bf>=0&&bf<be.length&&bg>=0&&bg<=be.length){bi=true;
}}else if(qx.dom.Node.isElement(be)){if(bg===undefined){bg=be.childNodes.length-1;
}
if(bf>=0&&be.childNodes[bf]&&bg>=0&&be.childNodes[bg]){bi=true;
}}else if(qx.dom.Node.isDocument(be)){be=be.body;

if(bg===undefined){bg=be.childNodes.length-1;
}
if(bf>=0&&be.childNodes[bf]&&bg>=0&&be.childNodes[bg]){bi=true;
}}
if(bi){if(!bj.isCollapsed){bj.collapseToStart();
}bh.setStart(be,bf);
if(qx.dom.Node.isText(be)){bh.setEnd(be,bg);
}else{bh.setEndAfter(be.childNodes[bg]);
}if(bj.rangeCount>0){bj.removeAllRanges();
}bj.addRange(bh);
return true;
}}return false;
}}),setAll:function(W){return qx.bom.Selection.set(W,0);
},clear:qx.core.Variant.select(D,{"mshtml":function(bm){var bn=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bm));
var bo=qx.bom.Range.get(bm);
var parent=bo.parentElement();
var bp=qx.bom.Range.get(qx.dom.Node.getDocument(bm));
if(parent==bp.parentElement()&&parent==bm){bn.empty();
}},"default":function(K){var M=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(K));
var O=K.nodeName.toLowerCase();
if(qx.dom.Node.isElement(K)&&(O==A||O==z)){K.setSelectionRange(0,0);
qx.bom.Element.blur(K);
}else if(qx.dom.Node.isDocument(K)||O==t){M.collapse(K.body?K.body:K,0);
}else{var N=qx.bom.Range.get(K);

if(!N.collapsed){var P;
var L=N.commonAncestorContainer;
if(qx.dom.Node.isElement(K)&&qx.dom.Node.isText(L)){P=L.parentNode;
}else{P=L;
}
if(P==K){M.collapse(K,0);
}}}}})}});
})();
(function(){var o="button",n="qx.bom.Range",m="text",l="password",k="file",j="submit",i="reset",h="textarea",g="input",f="hidden",d="qx.client",e="body";
qx.Class.define(n,{statics:{get:qx.core.Variant.select(d,{"mshtml":function(p){if(qx.dom.Node.isElement(p)){switch(p.nodeName.toLowerCase()){case g:switch(p.type){case m:case l:case f:case o:case i:case k:case j:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}break;
case h:case e:case o:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}}else{if(p==null){p=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}},"default":function(a){var b=qx.dom.Node.getDocument(a);
var c=qx.bom.Selection.getSelectionObject(b);

if(c.rangeCount>0){return c.getRangeAt(0);
}else{return b.createRange();
}}})}});
})();
(function(){var u="",t="m",s="g",r="^",q="qx.util.StringSplit",p="i",o="$(?!\\s)",n="[object RegExp]",m="y";
qx.Class.define(q,{statics:{split:function(a,b,c){if(Object.prototype.toString.call(b)!==n){return String.prototype.split.call(a,b,c);
}var k=[],d=0,h=(b.ignoreCase?p:u)+(b.multiline?t:u)+(b.sticky?m:u),b=RegExp(b.source,h+s),g,l,e,f,j=/()??/.exec(u)[1]===undefined;
a=a+u;

if(!j){g=RegExp(r+b.source+o,h);
}if(c===undefined||+c<0){c=Infinity;
}else{c=Math.floor(+c);

if(!c){return [];
}}
while(l=b.exec(a)){e=l.index+l[0].length;

if(e>d){k.push(a.slice(d,l.index));
if(!j&&l.length>1){l[0].replace(g,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){l[i]=undefined;
}}});
}
if(l.length>1&&l.index<a.length){Array.prototype.push.apply(k,l.slice(1));
}f=l[0].length;
d=e;

if(k.length>=c){break;
}}
if(b.lastIndex===l.index){b.lastIndex++;
}}
if(d===a.length){if(f||!b.test(u)){k.push(u);
}}else{k.push(a.slice(d));
}return k.length>c?k.slice(0,c):k;
}}});
})();
(function(){var d="qx.ui.core.queue.Widget",c="widget";
qx.Class.define(d,{statics:{__hE:{},remove:function(e){delete this.__hE[e.$$hash];
},add:function(a){var b=this.__hE;

if(b[a.$$hash]){return;
}b[a.$$hash]=a;
qx.ui.core.queue.Manager.scheduleFlush(c);
},flush:function(){var f=this.__hE;
var h;

for(var g in f){h=f[g];
delete f[g];
h.syncWidget();
}for(var g in f){return;
}this.__hE={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__hF:{},__hG:{},remove:function(i){var j=i.$$hash;
delete this.__hG[j];
delete this.__hF[j];
},isVisible:function(k){return this.__hG[k.$$hash]||false;
},__hH:function(c){var e=this.__hG;
var d=c.$$hash;
var f;
if(c.isExcluded()){f=false;
}else{var parent=c.$$parent;

if(parent){f=this.__hH(parent);
}else{f=c.isRootWidget();
}}return e[d]=f;
},add:function(g){var h=this.__hF;

if(h[g.$$hash]){return;
}h[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var l=this.__hF;
var p=this.__hG;
for(var m in l){if(p[m]!=null){l[m].addChildrenToQueue(l);
}}var o={};

for(var m in l){o[m]=p[m];
p[m]=null;
}for(var m in l){var n=l[m];
delete l[m];
if(p[m]==null){this.__hH(n);
}if(p[m]&&p[m]!=o[m]){n.checkAppearanceNeeds();
}}this.__hF={};
}}});
})();
(function(){var d="appearance",c="qx.ui.core.queue.Appearance";
qx.Class.define(c,{statics:{__hI:{},remove:function(a){delete this.__hI[a.$$hash];
},add:function(e){var f=this.__hI;

if(f[e.$$hash]){return;
}f[e.$$hash]=e;
qx.ui.core.queue.Manager.scheduleFlush(d);
},has:function(b){return !!this.__hI[b.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__hI;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__hJ:{},add:function(c){var d=this.__hJ;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__hJ;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__hJ={};
}}});
})();
(function(){var d="none",c="qx.html.Decorator",b="absolute";
qx.Class.define(c,{extend:qx.html.Element,construct:function(g,h){var i={position:b,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){i.pointerEvents=d;
}qx.html.Element.call(this,null,i);
this.__hK=g;
this.__hL=h||g.toHashCode();
this.useMarkup(g.getMarkup());
},members:{__hL:null,__hK:null,getId:function(){return this.__hL;
},getDecorator:function(){return this.__hK;
},resize:function(e,f){this.__hK.resize(this.getDomElement(),e,f);
},tint:function(a){this.__hK.tint(this.getDomElement(),a);
},getInsets:function(){return this.__hK.getInsets();
}},destruct:function(){this.__hK=null;
}});
})();
(function(){var w="blur",v="focus",u="input",t="load",s="qx.ui.core.EventHandler",r="activate";
qx.Class.define(s,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__hM=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hM:null,__hN:{focusin:1,focusout:1,focus:1,blur:1},__hO:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(G,H){return G instanceof qx.ui.core.Widget;
},_dispatchEvent:function(a){var f=a.getTarget();
var e=qx.ui.core.Widget.getWidgetByElement(f);
var g=false;

while(e&&e.isAnonymous()){var g=true;
e=e.getLayoutParent();
}if(e&&g&&a.getType()==r){e.getContainerElement().activate();
}if(this.__hN[a.getType()]){e=e&&e.getFocusTarget();
if(!e){return;
}}if(a.getRelatedTarget){var p=a.getRelatedTarget();
var o=qx.ui.core.Widget.getWidgetByElement(p);

while(o&&o.isAnonymous()){o=o.getLayoutParent();
}
if(o){if(this.__hN[a.getType()]){o=o.getFocusTarget();
}if(o===e){return;
}}}var j=a.getCurrentTarget();
var m=qx.ui.core.Widget.getWidgetByElement(j);

if(!m||m.isAnonymous()){return;
}if(this.__hN[a.getType()]){m=m.getFocusTarget();
}var n=a.getType();

if(!m||!(m.isEnabled()||this.__hO[n])){return;
}var b=a.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var h=this.__hM.getListeners(m,n,b);

if(!h||h.length===0){return;
}var c=qx.event.Pool.getInstance().getObject(a.constructor);
a.clone(c);
c.setTarget(e);
c.setRelatedTarget(o||null);
c.setCurrentTarget(m);
var q=a.getOriginalTarget();

if(q){var d=qx.ui.core.Widget.getWidgetByElement(q);

while(d&&d.isAnonymous()){d=d.getLayoutParent();
}c.setOriginalTarget(d);
}else{c.setOriginalTarget(f);
}for(var i=0,l=h.length;i<l;i++){var k=h[i].context||m;
h[i].handler.call(k,c);
}if(c.getPropagationStopped()){a.stopPropagation();
}
if(c.getDefaultPrevented()){a.preventDefault();
}qx.event.Pool.getInstance().poolObject(c);
},registerEvent:function(x,y,z){var A;

if(y===v||y===w){A=x.getFocusElement();
}else if(y===t||y===u){A=x.getContentElement();
}else{A=x.getContainerElement();
}
if(A){A.addListener(y,this._dispatchEvent,this,z);
}},unregisterEvent:function(B,C,D){var E;

if(C===v||C===w){E=B.getFocusElement();
}else if(C===t||C===u){E=B.getContentElement();
}else{E=B.getContainerElement();
}
if(E){E.removeListener(C,this._dispatchEvent,this,D);
}}},destruct:function(){this.__hM=null;
},defer:function(F){qx.event.Registration.addHandler(F);
}});
})();
(function(){var m="/",l="mshtml",k="",j="qx.client",i="?",h="string",g="qx.util.ResourceManager",f="singleton";
qx.Class.define(g,{extend:qx.core.Object,type:f,statics:{__hP:qx.$$resources||{},__hQ:{}},members:{has:function(n){return !!this.self(arguments).__hP[n];
},getData:function(a){return this.self(arguments).__hP[a]||null;
},getImageWidth:function(y){var z=this.self(arguments).__hP[y];
return z?z[0]:null;
},getImageHeight:function(u){var v=this.self(arguments).__hP[u];
return v?v[1]:null;
},getImageFormat:function(A){var B=this.self(arguments).__hP[A];
return B?B[2]:null;
},isClippedImage:function(w){var x=this.self(arguments).__hP[w];
return x&&x.length>4;
},toUri:function(b){if(b==null){return b;
}var c=this.self(arguments).__hP[b];

if(!c){return b;
}
if(typeof c===h){var e=c;
}else{var e=c[3];
if(!e){return b;
}}var d=k;

if(qx.core.Variant.isSet(j,l)&&qx.bom.client.Feature.SSL){d=this.self(arguments).__hQ[e];
}return d+qx.$$libraries[e].resourceUri+m+b;
}},defer:function(o){if(qx.core.Variant.isSet(j,l)){if(qx.bom.client.Feature.SSL){for(var s in qx.$$libraries){var q;

if(qx.$$libraries[s].resourceUri){q=qx.$$libraries[s].resourceUri;
}else{o.__hQ[s]=k;
continue;
}if(q.match(/^\/\//)!=null){o.__hQ[s]=window.location.protocol;
}else if(q.match(/^\.\//)!=null){var p=document.URL;
o.__hQ[s]=p.substring(0,p.lastIndexOf(m)+1);
}else if(q.match(/^http/)!=null){}else{var t=window.location.href.indexOf(i);
var r;

if(t==-1){r=window.location.href;
}else{r=window.location.href.substring(0,t);
}o.__hQ[s]=r.substring(0,r.lastIndexOf(m)+1);
}}}}}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__hR:function(){var d=(navigator.userLanguage||navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__hR();
}});
})();
(function(){var u="",t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o='match',n='toLocaleUpperCase',m='search',k='replace',d='toLowerCase',j='charCodeAt',g='split',c='substring',b='lastIndexOf',f='substr',e='toUpperCase',h='charAt';
qx.Class.define(p,{extend:Object,construct:function(a){var a=a||u;
this.__hS=a;
this.length=a.length;
},members:{$$isString:true,length:0,__hS:null,toString:function(){return this.__hS;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(v,w){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(x,y){{};
var z=[h,j,r,t,b,o,k,m,s,g,f,c,d,e,q,n];
y.valueOf=y.toString;

if(new x(u).valueOf()==null){delete y.valueOf;
}
for(var i=0,l=z.length;i<l;i++){y[z[i]]=String.prototype[z[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);
this.__hT=c;
this.__hU=d;
},members:{__hT:null,__hU:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hT,this.__hU);
}}});
})();
(function(){var F="_",E="",D="_applyLocale",C="changeLocale",B="C",A="qx.dynlocale",z="on",y="qx.locale.Manager",x="String",w="singleton";
qx.Class.define(y,{type:w,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__hV=qx.$$translations||{};
this.__hW=qx.$$locales||{};
var N=qx.bom.client.Locale;
var L=N.LOCALE;
var M=N.VARIANT;

if(M!==E){L+=F+M;
}this.setLocale(L||this.__hX);
},statics:{tr:function(Y,ba){var bb=qx.lang.Array.fromArguments(arguments);
bb.splice(0,1);
return qx.locale.Manager.getInstance().translate(Y,bb);
},trn:function(G,H,I,J){var K=qx.lang.Array.fromArguments(arguments);
K.splice(0,3);
if(I!=1){return qx.locale.Manager.getInstance().translate(H,K);
}else{return qx.locale.Manager.getInstance().translate(G,K);
}},trc:function(s,t,u){var v=qx.lang.Array.fromArguments(arguments);
v.splice(0,2);
return qx.locale.Manager.getInstance().translate(t,v);
},marktr:function(bg){return bg;
}},properties:{locale:{check:x,nullable:true,apply:D,event:C}},members:{__hX:B,__hY:null,__ia:null,__hV:null,__hW:null,getLanguage:function(){return this.__ia;
},getTerritory:function(){return this.getLocale().split(F)[1]||E;
},getAvailableLocales:function(){var k=[];

for(var j in this.__hW){if(j!=this.__hX){k.push(j);
}}return k;
},__ib:function(p){var r;
var q=p.indexOf(F);

if(q==-1){r=p;
}else{r=p.substring(0,q);
}return r;
},_applyLocale:function(W,X){this.__hY=W;
this.__ia=this.__ib(W);
},addTranslation:function(S,T){var U=this.__hV;

if(U[S]){for(var V in T){U[S][V]=T[V];
}}else{U[S]=T;
}},addLocale:function(bc,bd){var be=this.__hW;

if(be[bc]){for(var bf in bd){be[bc][bf]=bd[bf];
}}else{be[bc]=bd;
}},translate:function(l,m,n){var o=this.__hV;
return this.__ic(o,l,m,n);
},localize:function(O,P,Q){var R=this.__hW;
return this.__ic(R,O,P,Q);
},__ic:function(a,b,c,d){var e;

if(!a){return b;
}
if(d){var g=this.__ib(d);
}else{d=this.__hY;
g=this.__ia;
}if(!e&&a[d]){e=a[d][b];
}if(!e&&a[g]){e=a[g][b];
}if(!e&&a[this.__hX]){e=a[this.__hX][b];
}
if(!e){e=b;
}
if(c.length>0){var f=[];

for(var i=0;i<c.length;i++){var h=c[i];

if(h&&h.translate){f[i]=h.translate();
}else{f[i]=h;
}}e=qx.lang.String.format(e,f);
}
if(qx.core.Variant.isSet(A,z)){e=new qx.locale.LocalizedString(e,b,c);
}return e;
}},destruct:function(){this.__hV=this.__hW=null;
}});
})();
(function(){var Q="px",P="qx.client",O="div",N="img",M="",L="no-repeat",K="scale-x",J="mshtml",I="scale",H="scale-y",bo="qx/icon",bn="repeat",bm=".png",bl="crop",bk="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",bj='<div style="',bi="repeat-y",bh='<img src="',bf="qx.bom.element.Decoration",be="', sizingMethod='",X="png",Y="')",V='"></div>',W='"/>',T='" style="',U="none",R="webkit",S=" ",ba="repeat-x",bb="DXImageTransform.Microsoft.AlphaImageLoader",bd="qx/static/blank.gif",bc="absolute";
qx.Class.define(bf,{statics:{DEBUG:false,__id:{},__ie:qx.core.Variant.isSet(P,J),__if:qx.core.Variant.select(P,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__ig:{"scale-x":N,"scale-y":N,"scale":N,"repeat":O,"no-repeat":O,"repeat-x":O,"repeat-y":O},update:function(n,o,p,q){var s=this.getTagName(p,o);

if(s!=n.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var t=this.getAttributes(o,p,q);

if(s===N){n.src=t.src||qx.util.ResourceManager.getInstance().toUri(bd);
}if(n.style.backgroundPosition!=M&&t.style.backgroundPosition===undefined){t.style.backgroundPosition=null;
}if(n.style.clip!=M&&t.style.clip===undefined){t.style.clip=null;
}var r=qx.bom.element.Style;
r.setStyles(n,t.style);
if(this.__ie){try{n.filters[bb].apply();
}catch(e){}}},create:function(B,C,D){var E=this.getTagName(C,B);
var G=this.getAttributes(B,C,D);
var F=qx.bom.element.Style.compile(G.style);

if(E===N){return bh+G.src+T+F+W;
}else{return bj+F+V;
}},getTagName:function(bp,bq){if(qx.core.Variant.isSet(P,J)){if(bq&&this.__ie&&this.__if[bp]&&qx.lang.String.endsWith(bq,bm)){return O;
}}return this.__ig[bp];
},getAttributes:function(bv,bw,bx){if(!bx){bx={};
}
if(!bx.position){bx.position=bc;
}
if(qx.core.Variant.isSet(P,J)){bx.fontSize=0;
bx.lineHeight=0;
}else if(qx.core.Variant.isSet(P,R)){bx.WebkitUserDrag=U;
}var bz=qx.util.ResourceManager.getInstance().getImageFormat(bv)||qx.io.ImageLoader.getFormat(bv);
{};
var by;
if(this.__ie&&this.__if[bw]&&bz===X){by=this.__ij(bx,bw,bv);
}else{if(bw===I){by=this.__ik(bx,bw,bv);
}else if(bw===K||bw===H){by=this.__il(bx,bw,bv);
}else{by=this.__io(bx,bw,bv);
}}return by;
},__ih:function(a,b,c){if(a.width==null&&b!=null){a.width=b+Q;
}
if(a.height==null&&c!=null){a.height=c+Q;
}return a;
},__ii:function(bG){var bH=qx.util.ResourceManager.getInstance().getImageWidth(bG)||qx.io.ImageLoader.getWidth(bG);
var bI=qx.util.ResourceManager.getInstance().getImageHeight(bG)||qx.io.ImageLoader.getHeight(bG);
return {width:bH,height:bI};
},__ij:function(bA,bB,bC){var bF=this.__ii(bC);
bA=this.__ih(bA,bF.width,bF.height);
var bE=bB==L?bl:I;
var bD=bk+qx.util.ResourceManager.getInstance().toUri(bC)+be+bE+Y;
bA.filter=bD;
bA.backgroundImage=bA.backgroundRepeat=M;
return {style:bA};
},__ik:function(d,f,g){var h=qx.util.ResourceManager.getInstance().toUri(g);
var i=this.__ii(g);
d=this.__ih(d,i.width,i.height);
return {src:h,style:d};
},__il:function(bS,bT,bU){var bY=qx.util.ResourceManager.getInstance();
var bX=bY.isClippedImage(bU);
var ca=this.__ii(bU);

if(bX){var bW=bY.getData(bU);
var bV=bY.toUri(bW[4]);

if(bT===K){bS=this.__im(bS,bW,ca.height);
}else{bS=this.__in(bS,bW,ca.width);
}return {src:bV,style:bS};
}else{{};

if(bT==K){bS.height=ca.height==null?null:ca.height+Q;
}else if(bT==H){bS.width=ca.width==null?null:ca.width+Q;
}var bV=bY.toUri(bU);
return {src:bV,style:bS};
}},__im:function(br,bs,bt){var bu=qx.util.ResourceManager.getInstance().getImageHeight(bs[4]);
br.clip={top:-bs[6],height:bt};
br.height=bu+Q;
if(br.top!=null){br.top=(parseInt(br.top,10)+bs[6])+Q;
}else if(br.bottom!=null){br.bottom=(parseInt(br.bottom,10)+bt-bu-bs[6])+Q;
}return br;
},__in:function(j,k,l){var m=qx.util.ResourceManager.getInstance().getImageWidth(k[4]);
j.clip={left:-k[5],width:l};
j.width=m+Q;
if(j.left!=null){j.left=(parseInt(j.left,10)+k[5])+Q;
}else if(j.right!=null){j.right=(parseInt(j.right,10)+l-m-k[5])+Q;
}return j;
},__io:function(bK,bL,bM){var bR=qx.util.ResourceManager.getInstance().isClippedImage(bM);
var bQ=this.__ii(bM);
if(bR&&bL!==bn){var bP=qx.util.ResourceManager.getInstance().getData(bM);
var bO=qx.bom.element.Background.getStyles(bP[4],bL,bP[5],bP[6]);

for(var bN in bO){bK[bN]=bO[bN];
}
if(bQ.width!=null&&bK.width==null&&(bL==bi||bL===L)){bK.width=bQ.width+Q;
}
if(bQ.height!=null&&bK.height==null&&(bL==ba||bL===L)){bK.height=bQ.height+Q;
}return {style:bK};
}else{{};
bK=this.__ih(bK,bQ.width,bQ.height);
bK=this.__ip(bK,bM,bL);
return {style:bK};
}},__ip:function(u,v,w){var top=null;
var A=null;

if(u.backgroundPosition){var x=u.backgroundPosition.split(S);
A=parseInt(x[0]);

if(isNaN(A)){A=x[0];
}top=parseInt(x[1]);

if(isNaN(top)){top=x[1];
}}var z=qx.bom.element.Background.getStyles(v,w,A,top);

for(var y in z){u[y]=z[y];
}if(u.filter){u.filter=M;
}return u;
},__iq:function(bJ){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(bJ)&&bJ.indexOf(bo)==-1){if(!this.__id[bJ]){qx.log.Logger.debug("Potential clipped image candidate: "+bJ);
this.__id[bJ]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(P,{"mshtml":function(){return qx.bom.element.Decoration.__ie;
},"default":function(){return false;
}})}});
})();
(function(){var q="qx.client",p="load",o="qx.io.ImageLoader";
qx.Bootstrap.define(o,{statics:{__ir:{},__is:{width:null,height:null},__it:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(E){var F=this.__ir[E];
return !!(F&&F.loaded);
},isFailed:function(k){var m=this.__ir[k];
return !!(m&&m.failed);
},isLoading:function(G){var H=this.__ir[G];
return !!(H&&H.loading);
},getFormat:function(x){var y=this.__ir[x];
return y?y.format:null;
},getSize:function(B){var C=this.__ir[B];
return C?
{width:C.width,height:C.height}:this.__is;
},getWidth:function(c){var d=this.__ir[c];
return d?d.width:null;
},getHeight:function(a){var b=this.__ir[a];
return b?b.height:null;
},load:function(r,s,t){var u=this.__ir[r];

if(!u){u=this.__ir[r]={};
}if(s&&!t){t=window;
}if(u.loaded||u.loading||u.failed){if(s){if(u.loading){u.callbacks.push(s,t);
}else{s.call(t,r,u);
}}}else{u.loading=true;
u.callbacks=[];

if(s){u.callbacks.push(s,t);
}var w=new Image();
var v=qx.lang.Function.listener(this.__iu,this,w,r);
w.onload=v;
w.onerror=v;
w.src=r;
}},__iu:qx.event.GlobalError.observeMethod(function(event,e,f){var g=this.__ir[f];
if(event.type===p){g.loaded=true;
g.width=this.__iv(e);
g.height=this.__iw(e);
var h=this.__it.exec(f);

if(h!=null){g.format=h[1];
}}else{g.failed=true;
}e.onload=e.onerror=null;
var j=g.callbacks;
delete g.loading;
delete g.callbacks;
for(var i=0,l=j.length;i<l;i+=2){j[i].call(j[i+1],f,g);
}}),__iv:qx.core.Variant.select(q,{"gecko":function(A){return A.naturalWidth;
},"default":function(n){return n.width;
}}),__iw:qx.core.Variant.select(q,{"gecko":function(z){return z.naturalHeight;
},"default":function(D){return D.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__ix:[i,null,h,b,null,j,e,null,j],__iy:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__iz:function(t,top){var u=qx.bom.client.Engine;

if(u.GECKO&&u.VERSION<1.9&&t==top&&typeof t==m){top+=0.01;
}
if(t){var v=(typeof t==m)?t+k:t;
}else{v=l;
}
if(top){var w=(typeof top==m)?top+k:top;
}else{w=l;
}return v+d+w;
},compile:function(D,E,F,top){var G=this.__iz(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I=this.__ix;
I[1]=H;
I[4]=G;
I[7]=E;
return I.join(g);
},getStyles:function(x,y,z,top){if(!x){return this.__iy;
}var A=this.__iz(z,top);
var B=qx.util.ResourceManager.getInstance().toUri(x);
var C={backgroundPosition:A,backgroundImage:c+B+f};

if(y!=null){C.backgroundRepeat=y;
}return C;
},set:function(n,o,p,q,top){var r=this.getStyles(o,p,q,top);

for(var s in r){n.style[s]=r[s];
}}}});
})();
(function(){var s="source",r="scale",q="no-repeat",p="qx.client",o="mshtml",n="webkit",m="backgroundImage",l="div",k="qx.html.Image",j="qx/static/blank.gif";
qx.Class.define(k,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,a){qx.html.Element.prototype._applyProperty.call(this,name,a);

if(name===s){var e=this.getDomElement();
var b=this.getAllStyles();

if(this.getNodeName()==l&&this.getStyle(m)){b.backgroundPosition=null;
b.backgroundRepeat=null;
}var c=this._getProperty(s);
var d=this._getProperty(r);
var f=d?r:q;
if(c!=null){qx.bom.element.Decoration.update(e,c,f,b);
}}},_createDomElement:function(){var h=this._getProperty(r);
var i=h?r:q;

if(qx.core.Variant.isSet(p,o)){var g=this._getProperty(s);

if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(i,g));
}}else{this.setNodeName(qx.bom.element.Decoration.getTagName(i));
}return qx.html.Element.prototype._createDomElement.call(this);
},_copyData:function(u){return qx.html.Element.prototype._copyData.call(this,true);
},setSource:function(t){this._setProperty(s,t);
return this;
},getSource:function(){return this._getProperty(s);
},resetSource:function(){if(qx.core.Variant.isSet(p,n)){this._setProperty(s,qx.util.ResourceManager.getInstance().toUri(j));
}else{this._removeProperty(s,true);
}return this;
},setScale:function(v){this._setProperty(r,v);
return this;
},getScale:function(){return this._getProperty(r);
}}});
})();
(function(){var N="nonScaled",M="scaled",L="alphaScaled",K=".png",J="qx.client",I="div",H="replacement",G="qx.event.type.Event",F="hidden",E="Boolean",bd="px",bc="scale",bb="changeSource",ba="qx.ui.basic.Image",Y="loaded",X="-disabled.$1",W="loadingFailed",V="String",U="__iA",T="_applySource",R="img",S="image",P="mshtml",Q="_applyScale",O="no-repeat";
qx.Class.define(ba,{extend:qx.ui.core.Widget,construct:function(g){this.__iA={};
qx.ui.core.Widget.call(this);

if(g){this.setSource(g);
}},properties:{source:{check:V,init:null,nullable:true,event:bb,apply:T,themeable:true},scale:{check:E,init:false,themeable:true,apply:Q},appearance:{refine:true,init:S},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:G,loaded:G},members:{__iB:null,__iC:null,__iD:null,__iA:null,getContentElement:function(){return this.__iH();
},_createContentElement:function(){return this.__iH();
},_getContentHint:function(){return {width:this.__iB||0,height:this.__iC||0};
},_applyEnabled:function(bg,bh){qx.ui.core.Widget.prototype._applyEnabled.call(this,bg,bh);

if(this.getSource()){this._styleSource();
}},_applySource:function(bi){this._styleSource();
},_applyScale:function(bj){this._styleSource();
},__iE:function(bp){this.__iD=bp;
},__iF:function(){if(this.__iD==null){var c=this.getSource();
var b=false;

if(c!=null){b=qx.lang.String.endsWith(c,K);
}
if(this.getScale()&&b&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__iD=L;
}else if(this.getScale()){this.__iD=M;
}else{this.__iD=N;
}}return this.__iD;
},__iG:function(q){var r;
var s;

if(q==L){r=true;
s=I;
}else if(q==N){r=false;
s=I;
}else{r=true;
s=R;
}var t=new qx.html.Image(s);
t.setScale(r);
t.setStyles({"overflowX":F,"overflowY":F});
return t;
},__iH:function(){var a=this.__iF();

if(this.__iA[a]==null){this.__iA[a]=this.__iG(a);
}return this.__iA[a];
},_styleSource:function(){var d=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!d){this.getContentElement().resetSource();
return;
}this.__iI(d);

if(qx.core.Variant.isSet(J,P)){var e=this.getScale()?bc:O;
this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(e,d);
}if(qx.util.ResourceManager.getInstance().has(d)){this.__iK(this.getContentElement(),d);
}else if(qx.io.ImageLoader.isLoaded(d)){this.__iL(this.getContentElement(),d);
}else{this.__iM(this.getContentElement(),d);
}},__iI:qx.core.Variant.select(J,{"mshtml":function(u){var w=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var v=qx.lang.String.endsWith(u,K);

if(w&&v){if(this.getScale()&&this.__iF()!=L){this.__iE(L);
}else if(!this.getScale()&&this.__iF()!=N){this.__iE(N);
}}else{if(this.getScale()&&this.__iF()!=M){this.__iE(M);
}else if(!this.getScale()&&this.__iF()!=N){this.__iE(N);
}}this.__iJ(this.__iH());
},"default":function(f){if(this.getScale()&&this.__iF()!=M){this.__iE(M);
}else if(!this.getScale()&&this.__iF(N)){this.__iE(N);
}this.__iJ(this.__iH());
}}),__iJ:function(h){var k=this.getContainerElement();
var l=k.getChild(0);

if(l!=h){if(l!=null){var n=bd;
var i={};
var j=this.getInnerSize();

if(j!=null){i.width=j.width+n;
i.height=j.height+n;
}var m=this.getInsets();
i.left=m.left+n;
i.top=m.top+n;
i.zIndex=10;
h.setStyles(i,true);
h.setSelectable(this.getSelectable());
}k.removeAt(0);
k.addAt(h,0);
}},__iK:function(A,B){var D=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var C=B.replace(/\.([a-z]+)$/,X);

if(D.has(C)){B=C;
this.addState(H);
}else{this.removeState(H);
}}if(A.getSource()===B){return;
}A.setSource(B);
this.__iO(D.getImageWidth(B),D.getImageHeight(B));
},__iL:function(bk,bl){var bn=qx.io.ImageLoader;
bk.setSource(bl);
var bm=bn.getWidth(bl);
var bo=bn.getHeight(bl);
this.__iO(bm,bo);
},__iM:function(x,y){var self;
var z=qx.io.ImageLoader;
{};
if(!z.isFailed(y)){z.load(y,this.__iN,this);
}else{if(x!=null){x.resetSource();
}}},__iN:function(o,p){if(this.$$disposed===true){return;
}if(o!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(p.failed){this.warn("Image could not be loaded: "+o);
this.fireEvent(W);
}else{this.fireEvent(Y);
}this._styleSource();
},__iO:function(be,bf){if(be!==this.__iB||bf!==this.__iC){this.__iB=be;
this.__iC=bf;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(U);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var j=this.getApplicationRoot();
j.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(h,i){if(i){this.removeState(i);
}
if(h){this.addState(h);
}}}});
})();
(function(){var g="interval",f="Number",e="_applyTimeoutInterval",d="qx.event.type.Event",c="qx.event.Idle",b="singleton";
qx.Class.define(c,{extend:qx.core.Object,type:b,construct:function(){qx.core.Object.call(this);
var a=new qx.event.Timer(this.getTimeoutInterval());
a.addListener(g,this._onInterval,this);
a.start();
this.__iP=a;
},events:{"interval":d},properties:{timeoutInterval:{check:f,init:100,apply:e}},members:{__iP:null,_applyTimeoutInterval:function(h){this.__iP.setInterval(h);
},_onInterval:function(){this.fireEvent(g);
}},destruct:function(){if(this.__iP){this.__iP.stop();
}this.__iP=null;
}});
})();
(function(){var v="top",u="right",t="bottom",s="left",r="align-start",q="qx.util.placement.AbstractAxis",p="edge-start",o="align-end",n="edge-end",m="-",j="best-fit",l="qx.util.placement.Placement",k='__iQ',i="keep-align",h="direct";
qx.Class.define(l,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__iQ=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:q},axisY:{check:q},edge:{check:[v,u,t,s],init:v},align:{check:[v,u,t,s],init:u}},statics:{__iR:null,compute:function(B,C,D,E,F,G,H){this.__iR=this.__iR||new qx.util.placement.Placement();
var K=F.split(m);
var J=K[0];
var I=K[1];
this.__iR.set({axisX:this.__iV(G),axisY:this.__iV(H),edge:J,align:I});
return this.__iR.compute(B,C,D,E);
},__iS:null,__iT:null,__iU:null,__iV:function(w){switch(w){case h:this.__iS=this.__iS||new qx.util.placement.DirectAxis();
return this.__iS;
case i:this.__iT=this.__iT||new qx.util.placement.KeepAlignAxis();
return this.__iT;
case j:this.__iU=this.__iU||new qx.util.placement.BestFitAxis();
return this.__iU;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__iQ:null,compute:function(a,b,c,d){{};
var e=this.getAxisX()||this.__iQ;
var g=e.computeStart(a.width,{start:c.left,end:c.right},{start:d.left,end:d.right},b.width,this.__iW());
var f=this.getAxisY()||this.__iQ;
var top=f.computeStart(a.height,{start:c.top,end:c.bottom},{start:d.top,end:d.bottom},b.height,this.__iX());
return {left:g,top:top};
},__iW:function(){var y=this.getEdge();
var x=this.getAlign();

if(y==s){return p;
}else if(y==u){return n;
}else if(x==s){return r;
}else if(x==u){return o;
}},__iX:function(){var A=this.getEdge();
var z=this.getAlign();

if(A==v){return p;
}else if(A==t){return n;
}else if(z==v){return r;
}else if(z==t){return o;
}}},destruct:function(){this._disposeObjects(k);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(n,o,p,q){switch(q){case e:return o.start-p.end-n;
case b:return o.end+p.start;
case d:return o.start+p.start;
case c:return o.end-p.end-n;
}},_isInRange:function(k,l,m){return k>=0&&k+l<=m;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var j="mousedown",i="blur",h="__iY",g="singleton",f="qx.ui.popup.Manager";
qx.Class.define(f,{type:g,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__iY={};
qx.event.Registration.addListener(document.documentElement,j,this.__jb,this,true);
qx.bom.Element.addListener(window,i,this.hideAll,this);
},members:{__iY:null,add:function(r){{};
this.__iY[r.$$hash]=r;
this.__ja();
},remove:function(k){{};
var l=this.__iY;

if(l){delete l[k.$$hash];
this.__ja();
}},hideAll:function(){var n=this.__iY;

if(n){for(var m in n){n[m].exclude();
}}},__ja:function(){var q=1e7;
var p=this.__iY;

for(var o in p){p[o].setZIndex(q++);
}},__jb:function(e){var c=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var d=this.__iY;

for(var b in d){var a=d[b];

if(!a.getAutoHide()||c==a||qx.ui.core.Widget.contains(a,c)){continue;
}a.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,j,this.__jb,this,true);
this._disposeMap(h);
}});
})();
(function(){var h="abstract",g="qx.ui.layout.Abstract";
qx.Class.define(g,{type:h,extend:qx.core.Object,members:{__jc:null,_invalidChildrenCache:null,__jd:null,invalidateLayoutCache:function(){this.__jc=null;
},renderLayout:function(e,f){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__jc){return this.__jc;
}return this.__jc=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(a){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var d=this.__jd;

if(d instanceof qx.ui.core.LayoutItem){d.clearSeparators();
}},_renderSeparator:function(b,c){this.__jd.renderSeparator(b,c);
},connectToWidget:function(i){if(i&&this.__jd){throw new Error("It is not possible to manually set the connected widget.");
}this.__jd=i;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__jd;
},_applyLayoutChange:function(){if(this.__jd){this.__jd.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__jd.getLayoutChildren();
}},destruct:function(){this.__jd=this.__jc=null;
}});
})();
(function(){var a="qx.ui.layout.Grow";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(b,c){var g=this._getLayoutChildren();
var f,h,e,d;
for(var i=0,l=g.length;i<l;i++){f=g[i];
h=f.getSizeHint();
e=b;

if(e<h.minWidth){e=h.minWidth;
}else if(e>h.maxWidth){e=h.maxWidth;
}d=c;

if(d<h.minHeight){d=h.minHeight;
}else if(d>h.maxHeight){d=h.maxHeight;
}f.renderLayout(0,0,e,d);
}},_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,s;
var r=0,p=0;
var n=0,k=0;
var j=Infinity,m=Infinity;
for(var i=0,l=q.length;i<l;i++){o=q[i];
s=o.getSizeHint();
r=Math.max(r,s.width);
p=Math.max(p,s.height);
n=Math.max(n,s.minWidth);
k=Math.max(k,s.minHeight);
j=Math.min(j,s.maxWidth);
m=Math.min(m,s.maxHeight);
}return {width:r,height:p,minWidth:n,minHeight:k,maxWidth:j,maxHeight:m};
}}});
})();
(function(){var r="label",q="icon",p="Boolean",o="both",n="String",m="left",l="changeGap",k="changeShow",j="bottom",i="_applyCenter",E="changeIcon",D="qx.ui.basic.Atom",C="changeLabel",B="Integer",A="_applyIconPosition",z="top",y="right",x="_applyRich",w="_applyIcon",v="_applyShow",t="_applyLabel",u="_applyGap",s="atom";
qx.Class.define(D,{extend:qx.ui.core.Widget,construct:function(H,I){{};
qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(H!=null){this.setLabel(H);
}
if(I!=null){this.setIcon(I);
}},properties:{appearance:{refine:true,init:s},label:{apply:t,nullable:true,check:n,event:C},rich:{check:p,init:false,apply:x},icon:{check:n,apply:w,nullable:true,themeable:true,event:E},gap:{check:B,nullable:false,event:l,apply:u,themeable:true,init:4},show:{init:o,check:[o,r,q],themeable:true,inheritable:true,apply:v,event:k},iconPosition:{init:m,check:[z,y,j,m],themeable:true,apply:A},center:{init:false,check:p,themeable:true,apply:i}},members:{_createChildControlImpl:function(g){var h;

switch(g){case r:h=new qx.ui.basic.Label(this.getLabel());
h.setAnonymous(true);
h.setRich(this.getRich());
this._add(h);

if(this.getLabel()==null||this.getShow()===q){h.exclude();
}break;
case q:h=new qx.ui.basic.Image(this.getIcon());
h.setAnonymous(true);
this._addAt(h,0);

if(this.getIcon()==null||this.getShow()===r){h.exclude();
}break;
}return h||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,g);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===q){this._excludeChildControl(r);
}else{this._showChildControl(r);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===r){this._excludeChildControl(q);
}else{this._showChildControl(q);
}},_applyLabel:function(L,M){var N=this.getChildControl(r,true);

if(N){N.setValue(L);
}this._handleLabel();
},_applyRich:function(a,b){var c=this.getChildControl(r,true);

if(c){c.setRich(a);
}},_applyIcon:function(d,e){var f=this.getChildControl(q,true);

if(f){f.setSource(d);
}this._handleIcon();
},_applyGap:function(Q,R){this._getLayout().setGap(Q);
},_applyShow:function(J,K){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(F,G){this._getLayout().setIconPosition(F);
},_applyCenter:function(O,P){this._getLayout().setCenter(O);
}}});
})();
(function(){var k="bottom",j="_applyLayoutChange",h="top",g="left",f="right",e="middle",d="center",c="qx.ui.layout.Atom",b="Integer",a="Boolean";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,properties:{gap:{check:b,init:4,apply:j},iconPosition:{check:[g,h,f,k],init:g,apply:j},center:{check:a,init:false,apply:j}},members:{verifyLayoutProperty:null,renderLayout:function(w,x){var G=qx.ui.layout.Util;
var z=this.getIconPosition();
var C=this._getLayoutChildren();
var length=C.length;
var Q,top,P,A;
var L,F;
var J=this.getGap();
var O=this.getCenter();
if(z===k||z===f){var H=length-1;
var D=-1;
var B=-1;
}else{var H=0;
var D=length;
var B=1;
}if(z==h||z==k){if(O){var K=0;

for(var i=H;i!=D;i+=B){A=C[i].getSizeHint().height;

if(A>0){K+=A;

if(i!=H){K+=J;
}}}top=Math.round((x-K)/2);
}else{top=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
P=Math.min(F.maxWidth,Math.max(w,F.minWidth));
A=F.height;
Q=G.computeHorizontalAlignOffset(d,P,w);
L.renderLayout(Q,top,P,A);
if(A>0){top+=A+J;
}}}else{var E=w;
var y=null;
var N=0;

for(var i=H;i!=D;i+=B){L=C[i];
P=L.getSizeHint().width;

if(P>0){if(!y&&L instanceof qx.ui.basic.Label){y=L;
}else{E-=P;
}N++;
}}
if(N>1){var M=(N-1)*J;
E-=M;
}
if(y){var F=y.getSizeHint();
var I=Math.max(F.minWidth,Math.min(E,F.maxWidth));
E-=I;
}
if(O&&E>0){Q=Math.round(E/2);
}else{Q=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
A=Math.min(F.maxHeight,Math.max(x,F.minHeight));

if(L===y){P=I;
}else{P=F.width;
}top=G.computeVerticalAlignOffset(e,F.height,x);
L.renderLayout(Q,top,P,A);
if(P>0){Q+=P+J;
}}}},_computeSizeHint:function(){var v=this._getLayoutChildren();
var length=v.length;
var n,t;
if(length===1){var n=v[0].getSizeHint();
t={width:n.width,height:n.height,minWidth:n.minWidth,minHeight:n.minHeight};
}else{var r=0,s=0;
var o=0,q=0;
var p=this.getIconPosition();
var u=this.getGap();

if(p===h||p===k){var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
s=Math.max(s,n.width);
r=Math.max(r,n.minWidth);
if(n.height>0){q+=n.height;
o+=n.minHeight;
l++;
}}
if(l>1){var m=(l-1)*u;
q+=m;
o+=m;
}}else{var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
q=Math.max(q,n.height);
o=Math.max(o,n.minHeight);
if(n.width>0){s+=n.width;
r+=n.minWidth;
l++;
}}
if(l>1){var m=(l-1)*u;
s+=m;
r+=m;
}}t={minWidth:r,width:s,minHeight:o,height:q};
}return t;
}}});
})();
(function(){var G="middle",F="qx.ui.layout.Util",E="left",D="center",C="top",B="bottom",A="right";
qx.Class.define(F,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(be,bf,bg){var bi,bm,bh,bn;
var bj=bf>bg;
var bo=Math.abs(bf-bg);
var bp,bk;
var bl={};

for(bm in be){bi=be[bm];
bl[bm]={potential:bj?bi.max-bi.value:bi.value-bi.min,flex:bj?bi.flex:1/bi.flex,offset:0};
}while(bo!=0){bn=Infinity;
bh=0;

for(bm in bl){bi=bl[bm];

if(bi.potential>0){bh+=bi.flex;
bn=Math.min(bn,bi.potential/bi.flex);
}}if(bh==0){break;
}bn=Math.min(bo,bn*bh)/bh;
bp=0;

for(bm in bl){bi=bl[bm];

if(bi.potential>0){bk=Math.min(bo,bi.potential,Math.ceil(bn*bi.flex));
bp+=bk-bn*bi.flex;

if(bp>=1){bp-=1;
bk-=1;
}bi.potential-=bk;

if(bj){bi.offset+=bk;
}else{bi.offset-=bk;
}bo-=bk;
}}}return bl;
},computeHorizontalAlignOffset:function(H,I,J,K,L){if(K==null){K=0;
}
if(L==null){L=0;
}var M=0;

switch(H){case E:M=K;
break;
case A:M=J-I-L;
break;
case D:M=Math.round((J-I)/2);
if(M<K){M=K;
}else if(M<L){M=Math.max(K,J-I-L);
}break;
}return M;
},computeVerticalAlignOffset:function(a,b,c,d,e){if(d==null){d=0;
}
if(e==null){e=0;
}var f=0;

switch(a){case C:f=d;
break;
case B:f=c-b-e;
break;
case G:f=Math.round((c-b)/2);
if(f<d){f=d;
}else if(f<e){f=Math.max(d,c-b-e);
}break;
}return f;
},collapseMargins:function(o){var p=0,r=0;

for(var i=0,l=arguments.length;i<l;i++){var q=arguments[i];

if(q<0){r=Math.min(r,q);
}else if(q>0){p=Math.max(p,q);
}}return p+r;
},computeHorizontalGaps:function(V,W,X){if(W==null){W=0;
}var Y=0;

if(X){Y+=V[0].getMarginLeft();

for(var i=1,l=V.length;i<l;i+=1){Y+=this.collapseMargins(W,V[i-1].getMarginRight(),V[i].getMarginLeft());
}Y+=V[l-1].getMarginRight();
}else{for(var i=1,l=V.length;i<l;i+=1){Y+=V[i].getMarginLeft()+V[i].getMarginRight();
}Y+=(W*(l-1));
}return Y;
},computeVerticalGaps:function(ba,bb,bc){if(bb==null){bb=0;
}var bd=0;

if(bc){bd+=ba[0].getMarginTop();

for(var i=1,l=ba.length;i<l;i+=1){bd+=this.collapseMargins(bb,ba[i-1].getMarginBottom(),ba[i].getMarginTop());
}bd+=ba[l-1].getMarginBottom();
}else{for(var i=1,l=ba.length;i<l;i+=1){bd+=ba[i].getMarginTop()+ba[i].getMarginBottom();
}bd+=(bb*(l-1));
}return bd;
},computeHorizontalSeparatorGaps:function(s,t,u){var x=qx.theme.manager.Decoration.getInstance().resolve(u);
var w=x.getInsets();
var v=w.left+w.right;
var y=0;

for(var i=0,l=s.length;i<l;i++){var z=s[i];
y+=z.getMarginLeft()+z.getMarginRight();
}y+=(t+v+t)*(l-1);
return y;
},computeVerticalSeparatorGaps:function(N,O,P){var S=qx.theme.manager.Decoration.getInstance().resolve(P);
var R=S.getInsets();
var Q=R.top+R.bottom;
var T=0;

for(var i=0,l=N.length;i<l;i++){var U=N[i];
T+=U.getMarginTop()+U.getMarginBottom();
}T+=(O+Q+O)*(l-1);
return T;
},arrangeIdeals:function(g,h,j,k,m,n){if(h<g||m<k){if(h<g&&m<k){h=g;
m=k;
}else if(h<g){m-=(g-h);
h=g;
if(m<k){m=k;
}}else if(m<k){h-=(k-m);
m=k;
if(h<g){h=g;
}}}
if(h>j||m>n){if(h>j&&m>n){h=j;
m=n;
}else if(h>j){m+=(h-j);
h=j;
if(m>n){m=n;
}}else if(m>n){h+=(m-n);
m=n;
if(h>j){h=j;
}}}return {begin:h,end:m};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var o="qx.dynlocale",n="text",m="Boolean",l="qx.client",k="color",j="userSelect",i="changeLocale",h="enabled",g="none",f="on",M="_applyTextAlign",L="qx.ui.core.Widget",K="nowrap",J="gecko",I="changeTextAlign",H="_applyWrap",G="changeValue",F="changeContent",E="qx.ui.basic.Label",D="A",v="whiteSpace",w="_applyValue",t="center",u="_applyBuddy",r="String",s="textAlign",p="right",q="changeRich",x="normal",y="_applyRich",A="click",z="label",C="webkit",B="left";
qx.Class.define(E,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(b){qx.ui.core.Widget.call(this);

if(b!=null){this.setValue(b);
}
if(qx.core.Variant.isSet(o,f)){qx.locale.Manager.getInstance().addListener(i,this._onChangeLocale,this);
}},properties:{rich:{check:m,init:false,event:q,apply:y},wrap:{check:m,init:true,apply:H},value:{check:r,apply:w,event:G,nullable:true},buddy:{check:L,apply:u,nullable:true,init:null,dereference:true},textAlign:{check:[B,t,p],nullable:true,themeable:true,apply:M,event:I},appearance:{refine:true,init:z},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__je:null,__jf:null,__jg:null,__jh:null,_getContentHint:function(){if(this.__jf){this.__ji=this.__jj();
delete this.__jf;
}return {width:this.__ji.width,height:this.__ji.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(a){if(qx.core.Variant.isSet(l,J)){if(a&&!this.isRich()){{};
return;
}}qx.ui.core.Widget.prototype._applySelectable.call(this,a);
if(qx.core.Variant.isSet(l,C)){this.getContainerElement().setStyle(j,a?n:g);
this.getContentElement().setStyle(j,a?n:g);
}},_getContentHeightForWidth:function(bh){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__jj(bh).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(bf,bg){this.getContentElement().setStyle(s,bf);
},_applyTextColor:function(bd,be){if(bd){this.getContentElement().setStyle(k,qx.theme.manager.Color.getInstance().resolve(bd));
}else{this.getContentElement().removeStyle(k);
}},__ji:{width:0,height:0},_applyFont:function(P,Q){var R;

if(P){this.__je=qx.theme.manager.Font.getInstance().resolve(P);
R=this.__je.getStyles();
}else{this.__je=null;
R=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(R);
this.__jf=true;
qx.ui.core.queue.Layout.add(this);
},__jj:function(X){var bc=qx.bom.Label;
var ba=this.getFont();
var Y=ba?this.__je.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||D;
var bb=this.getRich();
return bb?bc.getHtmlSize(content,Y,X):bc.getTextSize(content,Y);
},_applyBuddy:function(V,W){if(W!=null){W.removeBinding(this.__jg);
this.__jg=null;
this.removeListenerById(this.__jh);
this.__jh=null;
}
if(V!=null){this.__jg=V.bind(h,this,h);
this.__jh=this.addListener(A,function(){if(V.isFocusable()){V.focus.apply(V);
}},this);
}},_applyRich:function(c){this.getContentElement().setRich(c);
this.__jf=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(S,T){if(S&&!this.isRich()){{};
}
if(this.isRich()){var U=S?x:K;
this.getContentElement().setStyle(v,U);
}},_onChangeLocale:qx.core.Variant.select(o,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(N,O){this.getContentElement().setValue(N);
this.__jf=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(F,N,O);
}},destruct:function(){if(qx.core.Variant.isSet(o,f)){qx.locale.Manager.getInstance().removeListener(i,this._onChangeLocale,this);
}if(this.__jg!=null){var d=this.getBuddy();

if(d!=null&&!d.isDisposed()){d.removeBinding(this.__jg);
}}this.__je=this.__jg=null;
}});
})();
(function(){var d="value",c="qx.html.Label";
qx.Class.define(c,{extend:qx.html.Element,members:{__jk:null,_applyProperty:function(name,g){qx.html.Element.prototype._applyProperty.call(this,name,g);

if(name==d){var h=this.getDomElement();
qx.bom.Label.setValue(h,g);
}},_createDomElement:function(){var f=this.__jk;
var e=qx.bom.Label.create(this._content,f);
return e;
},_copyData:function(i){return qx.html.Element.prototype._copyData.call(this,true);
},setRich:function(a){var b=this.getDomElement();

if(b){throw new Error("The label mode cannot be modified after initial creation");
}a=!!a;

if(this.__jk==a){return;
}this.__jk=a;
return this;
},setValue:function(j){this._setProperty(d,j);
return this;
},getValue:function(){return this._getProperty(d);
}}});
})();
(function(){var z="qx.client",y="gecko",x="div",w="inherit",v="text",u="value",t="",s="hidden",r="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",q="nowrap",P="auto",O="0",N="ellipsis",M="normal",L="label",K="px",J="crop",I="end",H="100%",G="visible",E="qx.bom.Label",F="opera",C="block",D="none",A="-1000px",B="absolute";
qx.Class.define(E,{statics:{__jl:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__jm:function(){var p=this.__jo(false);
document.body.insertBefore(p,document.body.firstChild);
return this._textElement=p;
},__jn:function(){var bb=this.__jo(true);
document.body.insertBefore(bb,document.body.firstChild);
return this._htmlElement=bb;
},__jo:function(k){var l=qx.bom.Element.create(x);
var m=l.style;
m.width=m.height=P;
m.left=m.top=A;
m.visibility=s;
m.position=B;
m.overflow=G;

if(k){m.whiteSpace=M;
}else{m.whiteSpace=q;

if(qx.core.Variant.isSet(z,y)){var n=document.createElementNS(r,L);
var m=n.style;
m.padding=O;

for(var o in this.__jl){m[o]=w;
}l.appendChild(n);
}}return l;
},__jp:function(bc){var bd={};

if(bc){bd.whiteSpace=M;
}else if(qx.core.Variant.isSet(z,y)){bd.display=C;
}else{bd.overflow=s;
bd.whiteSpace=q;
bd.textOverflow=N;
bd.userSelect=D;
if(qx.core.Variant.isSet(z,F)){bd.OTextOverflow=N;
}}return bd;
},create:function(content,a,b){if(!b){b=window;
}
if(a){var c=b.document.createElement(x);
c.useHtml=true;
}else if(qx.core.Variant.isSet(z,y)){var c=b.document.createElement(x);
var e=b.document.createElementNS(r,L);
var d=e.style;
d.cursor=w;
d.color=w;
d.overflow=s;
d.maxWidth=H;
d.padding=O;
for(var f in this.__jl){e.style[f]=w;
}e.setAttribute(J,I);
c.appendChild(e);
}else{var c=b.document.createElement(x);
qx.bom.element.Style.setStyles(c,this.__jp(a));
}
if(content){this.setValue(c,content);
}return c;
},setValue:function(Y,ba){ba=ba||t;

if(Y.useHtml){Y.innerHTML=ba;
}else if(qx.core.Variant.isSet(z,y)){Y.firstChild.setAttribute(u,ba);
}else{qx.bom.element.Attribute.set(Y,v,ba);
}},getValue:function(j){if(j.useHtml){return j.innerHTML;
}else if(qx.core.Variant.isSet(z,y)){return j.firstChild.getAttribute(u)||t;
}else{return qx.bom.element.Attribute.get(j,v);
}},getHtmlSize:function(content,g,h){var i=this._htmlElement||this.__jn();
i.style.width=h!==undefined?h+K:P;
i.innerHTML=content;
return this.__jq(i,g);
},getTextSize:function(V,W){var X=this._textElement||this.__jm();

if(qx.core.Variant.isSet(z,y)){X.firstChild.setAttribute(u,V);
}else{qx.bom.element.Attribute.set(X,v,V);
}return this.__jq(X,W);
},__jq:function(Q,R){var S=this.__jl;

if(!R){R={};
}
for(var T in S){Q.style[T]=R[T]||t;
}var U=qx.bom.element.Dimension.getSize(Q);

if(qx.core.Variant.isSet(z,y)){if(!qx.bom.client.Platform.WIN){U.width++;
}}return U;
}}});
})();
(function(){var q="0px",p="mshtml",o="qx.client",n="qx.bom.element.Dimension",m="paddingRight",l="paddingLeft",k="paddingTop",j="paddingBottom";
qx.Class.define(n,{statics:{getWidth:qx.core.Variant.select(o,{"gecko":function(h){if(h.getBoundingClientRect){var i=h.getBoundingClientRect();
return Math.round(i.right)-Math.round(i.left);
}else{return h.offsetWidth;
}},"default":function(u){return u.offsetWidth;
}}),getHeight:qx.core.Variant.select(o,{"gecko":function(r){if(r.getBoundingClientRect){var s=r.getBoundingClientRect();
return Math.round(s.bottom)-Math.round(s.top);
}else{return r.offsetHeight;
}},"default":function(t){return t.offsetHeight;
}}),getSize:function(v){return {width:this.getWidth(v),height:this.getHeight(v)};
},__jr:{visible:true,hidden:true},getContentWidth:function(w){var y=qx.bom.element.Style;
var z=qx.bom.element.Overflow.getX(w);
var A=parseInt(y.get(w,l)||q,10);
var C=parseInt(y.get(w,m)||q,10);

if(this.__jr[z]){return w.clientWidth-A-C;
}else{if(w.clientWidth>=w.scrollWidth){return Math.max(w.clientWidth,w.scrollWidth)-A-C;
}else{var B=w.scrollWidth-A;
var x=qx.bom.client.Engine;

if(x.NAME===p&&x.VERSION==6){B-=C;
}return B;
}}},getContentHeight:function(a){var c=qx.bom.element.Style;
var e=qx.bom.element.Overflow.getY(a);
var f=parseInt(c.get(a,k)||q,10);
var d=parseInt(c.get(a,j)||q,10);

if(this.__jr[e]){return a.clientHeight-f-d;
}else{if(a.clientHeight>=a.scrollHeight){return Math.max(a.clientHeight,a.scrollHeight)-f-d;
}else{var g=a.scrollHeight-f;
var b=qx.bom.client.Engine;

if(b.NAME===p&&b.VERSION==6){g-=d;
}return g;
}}},getContentSize:function(D){return {width:this.getContentWidth(D),height:this.getContentHeight(D)};
}}});
})();
(function(){var e="qx.event.type.Data",d="qx.ui.form.IForm";
qx.Interface.define(d,{events:{"changeEnabled":e,"changeValid":e,"changeInvalidMessage":e,"changeRequired":e},members:{setEnabled:function(c){return arguments.length==1;
},getEnabled:function(){},setRequired:function(g){return arguments.length==1;
},getRequired:function(){},setValid:function(a){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){},setRequiredInvalidMessage:function(b){return arguments.length==1;
},getRequiredInvalidMessage:function(){}}});
})();
(function(){var f="_applyBlockerColor",e="Number",d="__js",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__js=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__js:null,_applyBlockerColor:function(g,h){this.__js.setColor(g);
},_applyBlockerOpacity:function(i,j){this.__js.setOpacity(i);
},block:function(){this.__js.block();
},isBlocked:function(){return this.__js.isBlocked();
},unblock:function(){this.__js.unblock();
},forceUnblock:function(){this.__js.forceUnblock();
},blockContent:function(k){this.__js.blockContent(k);
},isContentBlocked:function(){return this.__js.isContentBlocked();
},unblockContent:function(){this.__js.unblockContent();
},forceUnblockContent:function(){this.__js.forceUnblockContent();
},getBlocker:function(){return this.__js;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var k="qx.ui.window.Window",j="changeModal",i="changeVisibility",h="changeActive",g="_applyActiveWindow",f="__jt",d="__ju",c="qx.ui.window.MDesktop";
qx.Mixin.define(c,{properties:{activeWindow:{check:k,apply:g,init:null,nullable:true}},members:{__jt:null,__ju:null,getWindowManager:function(){if(!this.__ju){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__ju;
},supportsMaximize:function(){return true;
},setWindowManager:function(l){if(this.__ju){this.__ju.setDesktop(null);
}l.setDesktop(this);
this.__ju=l;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(o,p){this.getWindowManager().changeActiveWindow(o,p);
},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(n){if(qx.Class.isDefined(k)&&n instanceof qx.ui.window.Window){this._addWindow(n);
}},_addWindow:function(b){if(!qx.lang.Array.contains(this.getWindows(),b)){this.getWindows().push(b);
b.addListener(h,this._onChangeActive,this);
b.addListener(j,this._onChangeModal,this);
b.addListener(i,this._onChangeVisibility,this);
}
if(b.getActive()){this.setActiveWindow(b);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(a){if(qx.Class.isDefined(k)&&a instanceof qx.ui.window.Window){this._removeWindow(a);
}},_removeWindow:function(m){qx.lang.Array.remove(this.getWindows(),m);
m.removeListener(h,this._onChangeActive,this);
m.removeListener(j,this._onChangeModal,this);
m.removeListener(i,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__jt){this.__jt=[];
}return this.__jt;
}},destruct:function(){this._disposeArray(f);
this._disposeObjects(d);
}});
})();
(function(){var t="contextmenu",s="help",r="qx.client",q="changeGlobalCursor",p="abstract",o="Boolean",n="root",m="",l=" !important",k="_applyGlobalCursor",h="_applyNativeHelp",j=";",i="qx.ui.root.Abstract",g="String",f="*";
qx.Class.define(i,{type:p,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:n},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:g,nullable:true,themeable:true,apply:k,event:q},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:o,init:false,apply:h}},members:{__jv:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(r,{"mshtml":function(A,B){},"default":function(a,b){var c=qx.bom.Stylesheet;
var d=this.__jv;

if(!d){this.__jv=d=c.createElement();
}c.removeAllRules(d);

if(a){c.addRule(d,f,qx.bom.element.Cursor.compile(a).replace(j,m)+l);
}}}),_applyNativeContextMenu:function(w,x){if(w){this.removeListener(t,this._onNativeContextMenu,this,true);
}else{this.addListener(t,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(r,{"mshtml":function(y,z){if(z===false){qx.bom.Event.removeNativeListener(document,s,qx.lang.Function.returnFalse);
}
if(y===false){qx.bom.Event.addNativeListener(document,s,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__jv=null;
},defer:function(u,v){qx.ui.core.MChildrenHandling.remap(v);
}});
})();
(function(){var o="resize",n="position",m="0px",l="webkit",k="paddingLeft",j="$$widget",i="qx.ui.root.Application",h="hidden",g="qx.client",f="div",b="paddingTop",d="100%",c="absolute";
qx.Class.define(i,{extend:qx.ui.root.Abstract,construct:function(a){this.__jw=qx.dom.Node.getWindow(a);
this.__jx=a;
qx.ui.root.Abstract.call(this);
qx.event.Registration.addListener(this.__jw,o,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__jw:null,__jx:null,_createContainerElement:function(){var w=this.__jx;
if(qx.core.Variant.isSet(g,l)){if(!w.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var A=w.documentElement.style;
var x=w.body.style;
A.overflow=x.overflow=h;
A.padding=A.margin=x.padding=x.margin=m;
A.width=A.height=x.width=x.height=d;
var z=w.createElement(f);
w.body.appendChild(z);
var y=new qx.html.Root(z);
y.setStyle(n,c);
y.setAttribute(j,this.toHashCode());
return y;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var p=qx.bom.Viewport.getWidth(this.__jw);
var q=qx.bom.Viewport.getHeight(this.__jw);
return {minWidth:p,width:p,maxWidth:p,minHeight:q,height:q,maxHeight:q};
},_applyPadding:function(r,s,name){if(r&&(name==b||name==k)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}qx.ui.root.Abstract.prototype._applyPadding.call(this,r,s,name);
},_applyDecorator:function(t,u){qx.ui.root.Abstract.prototype._applyDecorator.call(this,t,u);

if(!t){return;
}var v=this.getDecoratorElement().getInsets();

if(v.left||v.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__jw=this.__jx=null;
}});
})();
(function(){var F="zIndex",E="px",D="keydown",C="deactivate",B="resize",A="keyup",z="keypress",y="backgroundColor",x="_applyOpacity",w="Boolean",R="opacity",Q="interval",P="Tab",O="Color",N="qx.ui.root.Page",M="__jB",L="__jF",K="__jD",J="Number",I="qx.ui.core.Blocker",G="qx.ui.root.Application",H="_applyColor";
qx.Class.define(I,{extend:qx.core.Object,construct:function(S){qx.core.Object.call(this);
this._widget=S;
this._isPageRoot=(qx.Class.isDefined(N)&&S instanceof qx.ui.root.Page);

if(this._isPageRoot){S.addListener(B,this.__jG,this);
}
if(qx.Class.isDefined(G)&&S instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);
}this.__jy=[];
this.__jz=[];
this.__jA=[];
},properties:{color:{check:O,init:null,nullable:true,apply:H,themeable:true},opacity:{check:J,init:1,apply:x,themeable:true},keepBlockerActive:{check:w,init:false}},members:{__jB:null,__jC:0,__jD:null,__jA:null,__jy:null,__jz:null,__jE:null,__jF:null,_isPageRoot:false,_widget:null,__jG:function(e){var n=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:n.width,height:n.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:n.width,height:n.height});
}},_applyColor:function(f,g){var h=qx.theme.manager.Color.getInstance().resolve(f);
this.__jH(y,h);
},_applyOpacity:function(T,U){this.__jH(R,T);
},__jH:function(k,l){var m=[];
this.__jB&&m.push(this.__jB);
this.__jD&&m.push(this.__jD);

for(var i=0;i<m.length;i++){m[i].setStyle(k,l);
}},_backupActiveWidget:function(){var r=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__jy.push(r.getActive());
this.__jz.push(r.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var v=this.__jy.length;

if(v>0){var u=this.__jy[v-1];

if(u){qx.bom.Element.activate(u);
}this.__jy.pop();
}var t=this.__jz.length;

if(t>0){var u=this.__jz[t-1];

if(u){qx.bom.Element.focus(this.__jz[t-1]);
}this.__jz.pop();
}},__jI:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},getBlockerElement:function(){if(!this.__jB){this.__jB=this.__jI();
this.__jB.setStyle(F,15);
this._widget.getContainerElement().add(this.__jB);
this.__jB.exclude();
}return this.__jB;
},block:function(){this.__jC++;

if(this.__jC<2){this._backupActiveWidget();
var o=this.getBlockerElement();
o.include();
o.activate();
o.addListener(C,this.__jN,this);
o.addListener(z,this.__jM,this);
o.addListener(D,this.__jM,this);
o.addListener(A,this.__jM,this);
}},isBlocked:function(){return this.__jC>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__jC--;

if(this.__jC<1){this.__jJ();
this.__jC=0;
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__jC=0;
this.__jJ();
},__jJ:function(){this._restoreActiveWidget();
var j=this.getBlockerElement();
j.removeListener(C,this.__jN,this);
j.removeListener(z,this.__jM,this);
j.removeListener(D,this.__jM,this);
j.removeListener(A,this.__jM,this);
j.exclude();
},getContentBlockerElement:function(){if(!this.__jD){this.__jD=this.__jI();
this._widget.getContentElement().add(this.__jD);
this.__jD.exclude();
}return this.__jD;
},blockContent:function(p){var q=this.getContentBlockerElement();
q.setStyle(F,p);
this.__jA.push(p);

if(this.__jA.length<2){q.include();

if(this._isPageRoot){if(!this.__jF){this.__jF=new qx.event.Timer(300);
this.__jF.addListener(Q,this.__jL,this);
}this.__jF.start();
this.__jL();
}}},isContentBlocked:function(){return this.__jA.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jA.pop();
var a=this.__jA[this.__jA.length-1];
var b=this.getContentBlockerElement();
b.setStyle(F,a);

if(this.__jA.length<1){this.__jK();
this.__jA=[];
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jA=[];
var s=this.getContentBlockerElement();
s.setStyle(F,null);
this.__jK();
},__jK:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__jF.stop();
}},__jL:function(){var c=this._widget.getContainerElement().getDomElement();
var d=qx.dom.Node.getDocument(c);
this.getContentBlockerElement().setStyles({height:d.documentElement.scrollHeight+E,width:d.documentElement.scrollWidth+E});
},__jM:function(e){if(e.getKeyIdentifier()==P){e.stop();
}},__jN:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();
}}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(B,this.__jG,this);
}this._disposeObjects(K,M,L);
this.__jE=this.__jy=this.__jz=this._widget=this.__jA=null;
}});
})();
(function(){var n="cursor",m="100%",l="repeat",k="mousedown",j="url(",i=")",h="mouseout",g="qx.client",f="div",d="dblclick",z="mousewheel",y="qx.html.Blocker",x="mousemove",w="mouseover",v="appear",u="click",t="mshtml",s="mouseup",r="contextmenu",q="disappear",o="qx/static/blank.gif",p="absolute";
qx.Class.define(y,{extend:qx.html.Element,construct:function(a,b){var a=a?qx.theme.manager.Color.getInstance().resolve(a):null;
var c={position:p,width:m,height:m,opacity:b||0,backgroundColor:a};
if(qx.core.Variant.isSet(g,t)){c.backgroundImage=j+qx.util.ResourceManager.getInstance().toUri(o)+i;
c.backgroundRepeat=l;
}qx.html.Element.call(this,f,c);
this.addListener(k,this._stopPropagation,this);
this.addListener(s,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(d,this._stopPropagation,this);
this.addListener(x,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);
this.addListener(h,this._stopPropagation,this);
this.addListener(z,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(v,this.__jO,this);
this.addListener(q,this.__jO,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__jO:function(){var A=this.getStyle(n);
this.setStyle(n,null,true);
this.setStyle(n,A,true);
}}});
})();
(function(){var k="keypress",j="focusout",h="__jP",g="activate",f="Tab",d="singleton",c="deactivate",b="focusin",a="qx.ui.core.FocusHandler";
qx.Class.define(a,{extend:qx.core.Object,type:d,construct:function(){qx.core.Object.call(this);
this.__jP={};
},members:{__jP:null,__jQ:null,__jR:null,__jS:null,connectTo:function(m){m.addListener(k,this.__jT,this);
m.addListener(b,this._onFocusIn,this,true);
m.addListener(j,this._onFocusOut,this,true);
m.addListener(g,this._onActivate,this,true);
m.addListener(c,this._onDeactivate,this,true);
},addRoot:function(M){this.__jP[M.$$hash]=M;
},removeRoot:function(A){delete this.__jP[A.$$hash];
},getActiveWidget:function(){return this.__jQ;
},isActive:function(K){return this.__jQ==K;
},getFocusedWidget:function(){return this.__jR;
},isFocused:function(n){return this.__jR==n;
},isFocusRoot:function(F){return !!this.__jP[F.$$hash];
},_onActivate:function(e){var v=e.getTarget();
this.__jQ=v;
var u=this.__jU(v);

if(u!=this.__jS){this.__jS=u;
}},_onDeactivate:function(e){var w=e.getTarget();

if(this.__jQ==w){this.__jQ=null;
}},_onFocusIn:function(e){var L=e.getTarget();

if(L!=this.__jR){this.__jR=L;
L.visualizeFocus();
}},_onFocusOut:function(e){var J=e.getTarget();

if(J==this.__jR){this.__jR=null;
J.visualizeBlur();
}},__jT:function(e){if(e.getKeyIdentifier()!=f){return;
}
if(!this.__jS){return;
}e.stopPropagation();
e.preventDefault();
var R=this.__jR;

if(!e.isShiftPressed()){var S=R?this.__jY(R):this.__jW();
}else{var S=R?this.__ka(R):this.__jX();
}if(S){S.tabFocus();
}},__jU:function(o){var p=this.__jP;

while(o){if(p[o.$$hash]){return o;
}o=o.getLayoutParent();
}return null;
},__jV:function(X,Y){if(X===Y){return 0;
}var bb=X.getTabIndex()||0;
var ba=Y.getTabIndex()||0;

if(bb!=ba){return bb-ba;
}var bg=X.getContainerElement().getDomElement();
var bf=Y.getContainerElement().getDomElement();
var be=qx.bom.element.Location;
var bd=be.get(bg);
var bc=be.get(bf);
if(bd.top!=bc.top){return bd.top-bc.top;
}if(bd.left!=bc.left){return bd.left-bc.left;
}var bh=X.getZIndex();
var bi=Y.getZIndex();

if(bh!=bi){return bh-bi;
}return 0;
},__jW:function(){return this.__kd(this.__jS,null);
},__jX:function(){return this.__ke(this.__jS,null);
},__jY:function(B){var C=this.__jS;

if(C==B){return this.__jW();
}
while(B&&B.getAnonymous()){B=B.getLayoutParent();
}
if(B==null){return [];
}var D=[];
this.__kb(C,B,D);
D.sort(this.__jV);
var E=D.length;
return E>0?D[0]:this.__jW();
},__ka:function(N){var O=this.__jS;

if(O==N){return this.__jX();
}
while(N&&N.getAnonymous()){N=N.getLayoutParent();
}
if(N==null){return [];
}var P=[];
this.__kc(O,N,P);
P.sort(this.__jV);
var Q=P.length;
return Q>0?P[Q-1]:this.__jX();
},__kb:function(parent,T,U){var V=parent.getLayoutChildren();
var W;

for(var i=0,l=V.length;i<l;i++){W=V[i];
if(!(W instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(W)&&W.isEnabled()&&W.isVisible()){if(W.isTabable()&&this.__jV(T,W)<0){U.push(W);
}this.__kb(W,T,U);
}}},__kc:function(parent,q,r){var s=parent.getLayoutChildren();
var t;

for(var i=0,l=s.length;i<l;i++){t=s[i];
if(!(t instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(t)&&t.isEnabled()&&t.isVisible()){if(t.isTabable()&&this.__jV(q,t)>0){r.push(t);
}this.__kc(t,q,r);
}}},__kd:function(parent,G){var H=parent.getLayoutChildren();
var I;

for(var i=0,l=H.length;i<l;i++){I=H[i];
if(!(I instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(I)&&I.isEnabled()&&I.isVisible()){if(I.isTabable()){if(G==null||this.__jV(I,G)<0){G=I;
}}G=this.__kd(I,G);
}}return G;
},__ke:function(parent,x){var y=parent.getLayoutChildren();
var z;

for(var i=0,l=y.length;i<l;i++){z=y[i];
if(!(z instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(z)&&z.isEnabled()&&z.isVisible()){if(z.isTabable()){if(x==null||this.__jV(z,x)>0){x=z;
}}x=this.__ke(z,x);
}}return x;
}},destruct:function(){this._disposeMap(h);
this.__jR=this.__jQ=this.__jS=null;
}});
})();
(function(){var H="qx.client",G="head",F="text/css",E="stylesheet",D="}",C='@import "',B="{",A='";',z="qx.bom.Stylesheet",y="link",x="style";
qx.Class.define(z,{statics:{includeFile:function(j,k){if(!k){k=document;
}var l=k.createElement(y);
l.type=F;
l.rel=E;
l.href=qx.util.ResourceManager.getInstance().toUri(j);
var m=k.getElementsByTagName(G)[0];
m.appendChild(l);
},createElement:qx.core.Variant.select(H,{"mshtml":function(O){var P=document.createStyleSheet();

if(O){P.cssText=O;
}return P;
},"default":function(M){var N=document.createElement(x);
N.type=F;

if(M){N.appendChild(document.createTextNode(M));
}document.getElementsByTagName(G)[0].appendChild(N);
return N.sheet;
}}),addRule:qx.core.Variant.select(H,{"mshtml":function(bb,bc,bd){bb.addRule(bc,bd);
},"default":function(u,v,w){u.insertRule(v+B+w+D,u.cssRules.length);
}}),removeRule:qx.core.Variant.select(H,{"mshtml":function(a,b){var c=a.rules;
var d=c.length;

for(var i=d-1;i>=0;--i){if(c[i].selectorText==b){a.removeRule(i);
}}},"default":function(e,f){var g=e.cssRules;
var h=g.length;

for(var i=h-1;i>=0;--i){if(g[i].selectorText==f){e.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(H,{"mshtml":function(X){var Y=X.rules;
var ba=Y.length;

for(var i=ba-1;i>=0;i--){X.removeRule(i);
}},"default":function(S){var T=S.cssRules;
var U=T.length;

for(var i=U-1;i>=0;i--){S.deleteRule(i);
}}}),addImport:qx.core.Variant.select(H,{"mshtml":function(V,W){V.addImport(W);
},"default":function(Q,R){Q.insertRule(C+R+A,Q.cssRules.length);
}}),removeImport:qx.core.Variant.select(H,{"mshtml":function(I,J){var K=I.imports;
var L=K.length;

for(var i=L-1;i>=0;i--){if(K[i].href==J){I.removeImport(i);
}}},"default":function(q,r){var s=q.cssRules;
var t=s.length;

for(var i=t-1;i>=0;i--){if(s[i].href==r){q.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(H,{"mshtml":function(n){var o=n.imports;
var p=o.length;

for(var i=p-1;i>=0;i--){n.removeImport(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){if(bf[i].type==bf[i].IMPORT_RULE){be.deleteRule(i);
}}}})}});
})();
(function(){var b="number",a="qx.ui.layout.Canvas";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(c,d){var q=this._getLayoutChildren();
var g,p,n;
var s,top,e,f,j,h;
var o,m,r,k;

for(var i=0,l=q.length;i<l;i++){g=q[i];
p=g.getSizeHint();
n=g.getLayoutProperties();
o=g.getMarginTop();
m=g.getMarginRight();
r=g.getMarginBottom();
k=g.getMarginLeft();
s=n.left!=null?n.left:n.edge;

if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*c/100);
}e=n.right!=null?n.right:n.edge;

if(qx.lang.Type.isString(e)){e=Math.round(parseFloat(e)*c/100);
}top=n.top!=null?n.top:n.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*d/100);
}f=n.bottom!=null?n.bottom:n.edge;

if(qx.lang.Type.isString(f)){f=Math.round(parseFloat(f)*d/100);
}if(s!=null&&e!=null){j=c-s-e-k-m;
if(j<p.minWidth){j=p.minWidth;
}else if(j>p.maxWidth){j=p.maxWidth;
}s+=k;
}else{j=n.width;

if(j==null){j=p.width;
}else{j=Math.round(parseFloat(j)*c/100);
if(j<p.minWidth){j=p.minWidth;
}else if(j>p.maxWidth){j=p.maxWidth;
}}
if(e!=null){s=c-j-e-m-k;
}else if(s==null){s=k;
}else{s+=k;
}}if(top!=null&&f!=null){h=d-top-f-o-r;
if(h<p.minHeight){h=p.minHeight;
}else if(h>p.maxHeight){h=p.maxHeight;
}top+=o;
}else{h=n.height;

if(h==null){h=p.height;
}else{h=Math.round(parseFloat(h)*d/100);
if(h<p.minHeight){h=p.minHeight;
}else if(h>p.maxHeight){h=p.maxHeight;
}}
if(f!=null){top=d-h-f-r-o;
}else if(top==null){top=o;
}else{top+=o;
}}g.renderLayout(s,top,j,h);
}},_computeSizeHint:function(){var I=0,H=0;
var F=0,D=0;
var B,A;
var z,x;
var t=this._getLayoutChildren();
var w,G,v;
var J,top,u,y;

for(var i=0,l=t.length;i<l;i++){w=t[i];
G=w.getLayoutProperties();
v=w.getSizeHint();
var E=w.getMarginLeft()+w.getMarginRight();
var C=w.getMarginTop()+w.getMarginBottom();
B=v.width+E;
A=v.minWidth+E;
J=G.left!=null?G.left:G.edge;

if(J&&typeof J===b){B+=J;
A+=J;
}u=G.right!=null?G.right:G.edge;

if(u&&typeof u===b){B+=u;
A+=u;
}I=Math.max(I,B);
H=Math.max(H,A);
z=v.height+C;
x=v.minHeight+C;
top=G.top!=null?G.top:G.edge;

if(top&&typeof top===b){z+=top;
x+=top;
}y=G.bottom!=null?G.bottom:G.edge;

if(y&&typeof y===b){z+=y;
x+=y;
}F=Math.max(F,z);
D=Math.max(D,x);
}return {width:I,minWidth:H,height:F,minHeight:D};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(c){qx.html.Element.call(this);

if(c!=null){this.useElement(c);
}},members:{useElement:function(b){qx.html.Element.prototype.useElement.call(this,b);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var f="function",e="qx.event.message.Bus",d="*",c="undefined",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,statics:{getSubscriptions:function(){return this.getInstance().getSubscriptions();
},subscribe:function(l,m,n){return this.getInstance().subscribe(l,m,n);
},checkSubscription:function(L,M,N){return this.getInstance().checkSubscription(L,M,N);
},unsubscribe:function(B,C,D){return this.getInstance().unsubscribe(B,C,D);
},dispatch:function(S){return this.getInstance().dispatch.apply(this.getInstance(),arguments);
},dispatchByName:function(name,K){return this.getInstance().dispatchByName.apply(this.getInstance(),arguments);
}},construct:function(){this.__ku={};
},members:{__ku:null,getSubscriptions:function(){return this.__ku;
},subscribe:function(O,P,Q){if(!O||typeof P!=f){this.error("Invalid parameters! "+[O,P,Q]);
return false;
}var R=this.getSubscriptions();

if(this.checkSubscription(O)){if(this.checkSubscription(O,P,Q)){this.warn("Object method already subscribed to "+O);
return false;
}R[O].push({subscriber:P,context:Q||null});
return true;
}else{R[O]=[{subscriber:P,context:Q||null}];
return true;
}},checkSubscription:function(E,F,G){var H=this.getSubscriptions();

if(!H[E]||H[E].length===0){return false;
}
if(F){for(var i=0;i<H[E].length;i++){if(H[E][i].subscriber===F&&H[E][i].context===(G||null)){return true;
}}return false;
}return true;
},unsubscribe:function(v,w,x){var z=this.getSubscriptions();
var y=z[v];

if(y){if(!x){x=null;
}var i=y.length;
var A;

do{A=y[--i];

if(A.subscriber===w&&A.context===x){y.splice(i,1);

if(y.length===0){z[v]=null;
delete z[v];
}return true;
}}while(i);
}return false;
},dispatch:function(o){if(typeof o==b){{};
var t=typeof arguments[1]!=c?arguments[1]:true;
o=new qx.event.message.Message(o,t);
}var p=this.getSubscriptions();
var q=o.getName();
var r=false;

for(var u in p){var s=u.indexOf(d);

if(s>-1){if(s===0||u.substr(0,s)===q.substr(0,s)){this.__kv(p[u],o);
r=true;
}}else{if(u===q){this.__kv(p[q],o);
r=true;
}}}return r;
},dispatchByName:function(name,I){var J=new qx.event.message.Message(name,I);
return this.dispatch(J);
},__kv:function(g,h){for(var i=0;i<g.length;i++){var j=g[i].subscriber;
var k=g[i].context;
if(k&&k.isDisposed){if(k.isDisposed()){g.splice(i,1);
i--;
}else{j.call(k,h);
}}else{j.call(k,h);
}}}}});
})();
(function(){var d="Object",c="qx.event.message.Message",b="String";
qx.Class.define(c,{extend:qx.core.Object,construct:function(name,a){qx.core.Object.call(this);

if(name!=null){this.setName(name);
}
if(a!=null){this.setData(a);
}},properties:{name:{check:b},data:{init:null,nullable:true},sender:{check:d}}});
})();
(function(){var a="dropnode.Controller";
qx.Class.define(a,{extend:qx.core.Object,properties:{ui:{},event_bus:{},type:{},message:{},parent:{},children:{init:new Array()}},members:{initialize:function(e,f){this.setEvent_bus(e);
this.setUi(f);
this.setChildren(new qx.data.Array());
this.getUi().initialize(this.getEvent_bus());
this.getUi().init_gui();
this._addReactors();
this._addListeners();
this._addBindings();
},error:function(d){this.getUi().error(d);
},add:function(i){this.getUi().add(i.getUi().getBase_container());
i.setParent(this);
var j=this.getChildren();
j.push(i);
this.setChildren(j);
},_dispatch:function(g,h){this.getEvent_bus.getInstance().dispatch(new qx.event.message.Message(g,h));
},_subscribe:function(k,l,m){this.getEvent_bus().subscribe(k,function(b){var c=dropnode.Utilites.makeCallback(l,m);
c(b.getData());
},m);
},_processMessage:function(){this.debug("Controller's message : "+this.getMessage());
},_addListeners:function(){},_addReactors:function(){},_addBindings:function(){}}});
})();
(function(){var b="dropnode.BaseUIController",a='singleton';
qx.Class.define(b,{type:a,extend:dropnode.Controller});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(m,n,name){this.fireDataEvent(c,{value:m,name:name,old:n});
this._registerEventChaining(m,n,name);
},_registerEventChaining:function(i,j,name){if((i instanceof qx.core.Object)&&qx.Class.hasMixin(i.constructor,qx.data.marshal.MEventBubbling)){var k=qx.lang.Function.bind(this.__kw,this,name);
var l=i.addListener(c,k,this);
i.setUserData(d,l);
}if(j!=null&&j.getUserData&&j.getUserData(d)!=null){j.removeListenerById(j.getUserData(d));
}},__kw:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var q="change",p="add",o="remove",n="order",m="qx.event.type.Data",l="",k="qx.data.Array",j="?",h="changeBubble",g="number",f="changeLength";
qx.Class.define(k,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(H){qx.core.Object.call(this);
if(H==undefined){this.__kx=[];
}else if(arguments.length>1){this.__kx=[];

for(var i=0;i<arguments.length;i++){this.__kx.push(arguments[i]);
}}else if(typeof H==g){this.__kx=new Array(H);
}else if(H instanceof Array){this.__kx=qx.lang.Array.clone(H);
}else{this.__kx=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__kx.length;i++){this._applyEventPropagation(this.__kx[i],null,i);
}this.__ky();
},events:{"change":m,"changeLength":m},members:{__kx:null,concat:function(bd){if(bd){var be=this.__kx.concat(bd);
}else{var be=this.__kx.concat();
}return new qx.data.Array(be);
},join:function(I){return this.__kx.join(I);
},pop:function(){var w=this.__kx.pop();
this.__ky();
this._applyEventPropagation(null,w,this.length-1);
this.fireDataEvent(q,{start:this.length-1,end:this.length-1,type:o,items:[w]},null);
return w;
},push:function(b){for(var i=0;i<arguments.length;i++){this.__kx.push(arguments[i]);
this.__ky();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(q,{start:this.length-1,end:this.length-1,type:p,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__kx.reverse();
this.fireDataEvent(q,{start:0,end:this.length-1,type:n,items:null},null);
},shift:function(){var v=this.__kx.shift();
this.__ky();
this._applyEventPropagation(null,v,this.length-1);
this.fireDataEvent(q,{start:0,end:this.length-1,type:o,items:[v]},null);
return v;
},slice:function(W,X){return new qx.data.Array(this.__kx.slice(W,X));
},splice:function(K,L,M){var S=this.__kx.length;
var P=this.__kx.splice.apply(this.__kx,arguments);
if(this.__kx.length!=S){this.__ky();
}var Q=L>0;
var N=arguments.length>2;
var O=null;

if(Q||N){if(this.__kx.length>S){var R=p;
}else if(this.__kx.length<S){var R=o;
O=P;
}else{var R=n;
}this.fireDataEvent(q,{start:K,end:this.length-1,type:R,items:O},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,K+i);
}this.fireDataEvent(h,{value:this,name:j,old:P});
for(var i=0;i<P.length;i++){this._applyEventPropagation(null,P[i],i);
}return (new qx.data.Array(P));
},sort:function(B){this.__kx.sort.apply(this.__kx,arguments);
this.fireDataEvent(q,{start:0,end:this.length-1,type:n,items:null},null);
},unshift:function(bc){for(var i=arguments.length-1;i>=0;i--){this.__kx.unshift(arguments[i]);
this.__ky();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(q,{start:0,end:this.length-1,type:p,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__kx;
},getItem:function(d){return this.__kx[d];
},setItem:function(r,s){var t=this.__kx[r];
this.__kx[r]=s;
this._applyEventPropagation(s,t,r);
if(this.length!=this.__kx.length){this.__ky();
}this.fireDataEvent(q,{start:r,end:r,type:p,items:[s]},null);
},getLength:function(){return this.length;
},indexOf:function(u){return this.__kx.indexOf(u);
},toString:function(){if(this.__kx!=null){return this.__kx.toString();
}return l;
},contains:function(J){return this.__kx.indexOf(J)!==-1;
},copy:function(){return this.concat();
},insertAt:function(bf,bg){this.splice(bf,0,bg);
},insertBefore:function(C,D){var E=this.indexOf(C);

if(E==-1){this.push(D);
}else{this.splice(E,0,D);
}},insertAfter:function(Y,ba){var bb=this.indexOf(Y);

if(bb==-1||bb==(this.length-1)){this.push(ba);
}else{this.splice(bb+1,0,ba);
}},removeAt:function(a){return this.splice(a,1)[0];
},removeAll:function(){for(var i=0;i<this.__kx.length;i++){this._applyEventPropagation(null,this.__kx[i],i);
}var z=this.getLength();
var y=this.__kx.concat();
this.__kx.length=0;
this.__ky();
this.fireDataEvent(q,{start:0,end:z-1,type:o,items:y},null);
},append:function(bh){if(bh instanceof qx.data.Array){bh=bh.toArray();
}{};
for(var i=0;i<bh.length;i++){this._applyEventPropagation(bh[i],null,this.__kx.length+i);
}Array.prototype.push.apply(this.__kx,bh);
var bi=this.length;
this.__ky();
this.fireDataEvent(q,{start:bi,end:this.length-1,type:p,items:bh},null);
},remove:function(F){var G=this.indexOf(F);

if(G!=-1){this.splice(G,1);
return F;
}},equals:function(e){if(this.length!==e.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==e.getItem(i)){return false;
}}return true;
},sum:function(){var A=0;

for(var i=0;i<this.length;i++){A+=this.getItem(i);
}return A;
},max:function(){var c=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>c){c=this.getItem(i);
}}return c===undefined?null:c;
},min:function(){var T=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<T){T=this.getItem(i);
}}return T===undefined?null:T;
},forEach:function(U,V){for(var i=0;i<this.__kx.length;i++){U.call(V,this.__kx[i]);
}},__ky:function(){var x=this.length;
this.length=this.__kx.length;
this.fireDataEvent(f,this.length,x);
}},destruct:function(){for(var i=0;i<this.__kx.length;i++){this._applyEventPropagation(null,this.__kx[i],i);
}this.__kx=null;
}});
})();
(function(){var e="Sharer Dashboard",d="app-header",c="DropNode 0.1",b="dropnode.BaseUI";
qx.Class.define(b,{extend:qx.core.Object,properties:{event_bus:{nullable:true},base_container:{nullable:true},app_container:{nullable:true}},members:{initialize:function(f){this.setEvent_bus(f);
},init_gui:function(){this.base_container=new qx.ui.container.Composite(new qx.ui.layout.VBox());
this.base_container.add(this.main_header());
this.app_container=new qx.ui.container.Composite(new qx.ui.layout.VBox());
this.base_container.add(this.app_container);
},main_header:function(){var i=new qx.ui.layout.HBox();
var g=new qx.ui.container.Composite(i);
g.setAppearance(d);
var j=new qx.ui.basic.Label(e);
var h=new qx.ui.basic.Label(c);
g.add(j);
g.add(new qx.ui.core.Spacer,{flex:1});
g.add(h);
return g;
},add:function(a){this.app_container.add(a);
},error:function(){}}});
})();
(function(){var R="_applyLayoutChange",Q="top",P="left",O="middle",N="Decorator",M="center",L="_applyReversed",K="bottom",J="qx.ui.layout.VBox",I="Integer",G="right",H="Boolean";
qx.Class.define(J,{extend:qx.ui.layout.Abstract,construct:function(S,T,U){qx.ui.layout.Abstract.call(this);

if(S){this.setSpacing(S);
}
if(T){this.setAlignY(T);
}
if(U){this.setSeparator(U);
}},properties:{alignY:{check:[Q,O,K],init:Q,apply:R},alignX:{check:[P,M,G],init:P,apply:R},spacing:{check:I,init:0,apply:R},separator:{check:N,nullable:true,apply:R},reversed:{check:H,init:false,apply:L}},members:{__kz:null,__kA:null,__kB:null,__kC:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__kD:function(){var F=this._getLayoutChildren();
var length=F.length;
var B=false;
var A=this.__kz&&this.__kz.length!=length&&this.__kA&&this.__kz;
var D;
var C=A?this.__kz:new Array(length);
var E=A?this.__kA:new Array(length);
if(this.getReversed()){F=F.concat().reverse();
}for(var i=0;i<length;i++){D=F[i].getLayoutProperties();

if(D.height!=null){C[i]=parseFloat(D.height)/100;
}
if(D.flex!=null){E[i]=D.flex;
B=true;
}else{E[i]=0;
}}if(!A){this.__kz=C;
this.__kA=E;
}this.__kB=B;
this.__kC=F;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(a,b){if(this._invalidChildrenCache){this.__kD();
}var j=this.__kC;
var length=j.length;
var u=qx.ui.layout.Util;
var t=this.getSpacing();
var x=this.getSeparator();

if(x){var f=u.computeVerticalSeparatorGaps(j,t,x);
}else{var f=u.computeVerticalGaps(j,t,true);
}var i,d,e,o;
var p=[];
var v=f;

for(i=0;i<length;i+=1){o=this.__kz[i];
e=o!=null?Math.floor((b-f)*o):j[i].getSizeHint().height;
p.push(e);
v+=e;
}if(this.__kB&&v!=b){var m={};
var s,w;

for(i=0;i<length;i+=1){s=this.__kA[i];

if(s>0){k=j[i].getSizeHint();
m[i]={min:k.minHeight,value:p[i],max:k.maxHeight,flex:s};
}}var g=u.computeFlexOffsets(m,b,v);

for(i in g){w=g[i].offset;
p[i]+=w;
v+=w;
}}var top=j[0].getMarginTop();
if(v<b&&this.getAlignY()!=Q){top=b-v;

if(this.getAlignY()===O){top=Math.round(top/2);
}}var k,z,q,e,n,r,h;
this._clearSeparators();
if(x){var y=qx.theme.manager.Decoration.getInstance().resolve(x).getInsets();
var c=y.top+y.bottom;
}for(i=0;i<length;i+=1){d=j[i];
e=p[i];
k=d.getSizeHint();
r=d.getMarginLeft();
h=d.getMarginRight();
q=Math.max(k.minWidth,Math.min(a-r-h,k.maxWidth));
z=u.computeHorizontalAlignOffset(d.getAlignX()||this.getAlignX(),q,a,r,h);
if(i>0){if(x){top+=n+t;
this._renderSeparator(x,{top:top,left:0,height:c,width:a});
top+=c+t+d.getMarginTop();
}else{top+=u.collapseMargins(t,n,d.getMarginTop());
}}d.renderLayout(z,top,q,e);
top+=e;
n=d.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kD();
}var bc=qx.ui.layout.Util;
var bk=this.__kC;
var X=0,bb=0,ba=0;
var V=0,bd=0;
var bh,W,bj;
for(var i=0,l=bk.length;i<l;i+=1){bh=bk[i];
W=bh.getSizeHint();
bb+=W.height;
var bg=this.__kA[i];
var Y=this.__kz[i];

if(bg){X+=W.minHeight;
}else if(Y){ba=Math.max(ba,Math.round(W.minHeight/Y));
}else{X+=W.height;
}bj=bh.getMarginLeft()+bh.getMarginRight();
if((W.width+bj)>bd){bd=W.width+bj;
}if((W.minWidth+bj)>V){V=W.minWidth+bj;
}}X+=ba;
var bf=this.getSpacing();
var bi=this.getSeparator();

if(bi){var be=bc.computeVerticalSeparatorGaps(bk,bf,bi);
}else{var be=bc.computeVerticalGaps(bk,bf,true);
}return {minHeight:X+be,height:bb+be,minWidth:V,width:bd};
}},destruct:function(){this.__kz=this.__kA=this.__kC=null;
}});
})();
(function(){var n="_applyLayoutChange",m="left",k="center",j="top",h="Decorator",g="middle",f="_applyReversed",e="bottom",d="Boolean",c="right",a="Integer",b="qx.ui.layout.HBox";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,construct:function(u,v,w){qx.ui.layout.Abstract.call(this);

if(u){this.setSpacing(u);
}
if(v){this.setAlignX(v);
}
if(w){this.setSeparator(w);
}},properties:{alignX:{check:[m,k,c],init:m,apply:n},alignY:{check:[j,g,e],init:j,apply:n},spacing:{check:a,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:d,init:false,apply:f}},members:{__kE:null,__kF:null,__kG:null,__kH:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__kI:function(){var t=this._getLayoutChildren();
var length=t.length;
var q=false;
var o=this.__kE&&this.__kE.length!=length&&this.__kF&&this.__kE;
var r;
var p=o?this.__kE:new Array(length);
var s=o?this.__kF:new Array(length);
if(this.getReversed()){t=t.concat().reverse();
}for(var i=0;i<length;i++){r=t[i].getLayoutProperties();

if(r.width!=null){p[i]=parseFloat(r.width)/100;
}
if(r.flex!=null){s[i]=r.flex;
q=true;
}else{s[i]=0;
}}if(!o){this.__kE=p;
this.__kF=s;
}this.__kG=q;
this.__kH=t;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(M,N){if(this._invalidChildrenCache){this.__kI();
}var T=this.__kH;
var length=T.length;
var bd=qx.ui.layout.Util;
var bc=this.getSpacing();
var bg=this.getSeparator();

if(bg){var Q=bd.computeHorizontalSeparatorGaps(T,bc,bg);
}else{var Q=bd.computeHorizontalGaps(T,bc,true);
}var i,O,ba,Y;
var bf=[];
var U=Q;

for(i=0;i<length;i+=1){Y=this.__kE[i];
ba=Y!=null?Math.floor((M-Q)*Y):T[i].getSizeHint().width;
bf.push(ba);
U+=ba;
}if(this.__kG&&U!=M){var W={};
var bb,be;

for(i=0;i<length;i+=1){bb=this.__kF[i];

if(bb>0){V=T[i].getSizeHint();
W[i]={min:V.minWidth,value:bf[i],max:V.maxWidth,flex:bb};
}}var R=bd.computeFlexOffsets(W,M,U);

for(i in R){be=R[i].offset;
bf[i]+=be;
U+=be;
}}var bk=T[0].getMarginLeft();
if(U<M&&this.getAlignX()!=m){bk=M-U;

if(this.getAlignX()===k){bk=Math.round(bk/2);
}}var V,top,P,ba,S,bi,X;
var bc=this.getSpacing();
this._clearSeparators();
if(bg){var bh=qx.theme.manager.Decoration.getInstance().resolve(bg).getInsets();
var bj=bh.left+bh.right;
}for(i=0;i<length;i+=1){O=T[i];
ba=bf[i];
V=O.getSizeHint();
bi=O.getMarginTop();
X=O.getMarginBottom();
P=Math.max(V.minHeight,Math.min(N-bi-X,V.maxHeight));
top=bd.computeVerticalAlignOffset(O.getAlignY()||this.getAlignY(),P,N,bi,X);
if(i>0){if(bg){bk+=S+bc;
this._renderSeparator(bg,{left:bk,top:0,width:bj,height:N});
bk+=bj+bc+O.getMarginLeft();
}else{bk+=bd.collapseMargins(bc,S,O.getMarginLeft());
}}O.renderLayout(bk,top,ba,P);
bk+=ba;
S=O.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kI();
}var D=qx.ui.layout.Util;
var L=this.__kH;
var x=0,E=0,B=0;
var A=0,C=0;
var I,y,K;
for(var i=0,l=L.length;i<l;i+=1){I=L[i];
y=I.getSizeHint();
E+=y.width;
var H=this.__kF[i];
var z=this.__kE[i];

if(H){x+=y.minWidth;
}else if(z){B=Math.max(B,Math.round(y.minWidth/z));
}else{x+=y.width;
}K=I.getMarginTop()+I.getMarginBottom();
if((y.height+K)>C){C=y.height+K;
}if((y.minHeight+K)>A){A=y.minHeight+K;
}}x+=B;
var G=this.getSpacing();
var J=this.getSeparator();

if(J){var F=D.computeHorizontalSeparatorGaps(L,G,J);
}else{var F=D.computeHorizontalGaps(L,G,true);
}return {minWidth:x+F,width:E+F,minHeight:A,height:C};
}},destruct:function(){this.__kE=this.__kF=this.__kH=null;
}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(c,d){qx.ui.core.LayoutItem.call(this);
this.setWidth(c!=null?c:0);
this.setHeight(d!=null?d:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(b){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var b="dropnode.FileDashboardController",a='singleton';
qx.Class.define(b,{extend:dropnode.Controller,type:a,members:{_processMessage:function(){this.debug("File Dashboard Controller "+this.getMessage());
},error:function(c){this.getParent().error(c);
}}});
})();
(function(){var d="horizontal",c="changeMessage",b="dropnode.FileDashboardUI";
qx.Class.define(b,{extend:qx.core.Object,properties:{message:{nullable:true,event:c},base_container:{nullable:true},event_bus:{nullable:true}},members:{initialize:function(e){this.setEvent_bus(e);
},init_gui:function(){this.setBase_container(new qx.ui.splitpane.Pane(d).set({width:350,height:300}));
},add:function(a){if(this.getBase_container().getChildren().length==0){this.getBase_container().add(a,3);
}else{this.getBase_container().add(a,5);
}}}});
})();
(function(){var bh="splitter",bg="slider",bf="mousedown",be="mouseout",bd="mousemove",bc="mouseup",bb="losecapture",ba="active",Y="horizontal",X="vertical",bx="knob",bw="Integer",bv="height",bu="row-resize",bt="move",bs="maxHeight",br="width",bq="_applyOrientation",bp="mouseover",bo="splitpane",bm="qx.ui.splitpane.Pane",bn="_applyOffset",bk="minHeight",bl="minWidth",bi="col-resize",bj="maxWidth";
qx.Class.define(bm,{extend:qx.ui.core.Widget,construct:function(P){qx.ui.core.Widget.call(this);
this.__kJ=[];
if(P){this.setOrientation(P);
}else{this.initOrientation();
}this.addListener(bf,this._onMouseDown);
this.addListener(bc,this._onMouseUp);
this.addListener(bd,this._onMouseMove);
this.addListener(be,this._onMouseOut);
this.addListener(bb,this._onMouseUp);
},properties:{appearance:{refine:true,init:bo},offset:{check:bw,init:6,apply:bn},orientation:{init:Y,check:[Y,X],apply:bq}},members:{__kK:null,__kL:false,__kM:null,__kN:null,__kO:null,__kP:null,__kQ:null,__kJ:null,_createChildControlImpl:function(bA){var bB;

switch(bA){case bg:bB=new qx.ui.splitpane.Slider(this);
bB.exclude();
this._add(bB,{type:bA});
break;
case bh:bB=new qx.ui.splitpane.Splitter(this);
this._add(bB,{type:bA});
bB.addListener(bt,this._onSplitterMove,this);
if(qx.bom.client.Engine.OPERA){bB.addListener(bp,this._onSplitterMouseOver,bB);
}break;
}return bB||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bA);
},_applyOrientation:function(G,H){var I=this.getChildControl(bg);
var L=this.getChildControl(bh);
this.__kO=G===Y;
var K=this._getLayout();

if(K){K.dispose();
}var J=G===X?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(J);
L.removeState(H);
L.addState(G);
L.getChildControl(bx).removeState(H);
L.getChildControl(bx).addState(G);
I.removeState(H);
I.addState(G);
},_applyOffset:function(D,E){var F=this.getChildControl(bh);

if(E===0){F.removeListener(bf,this._onMouseDown,this);
F.removeListener(bd,this._onMouseMove,this);
F.removeListener(be,this._onMouseOut,this);
F.removeListener(bc,this._onMouseUp,this);
F.removeListener(bb,this._onMouseUp,this);
this.addListener(bf,this._onMouseDown);
this.addListener(bc,this._onMouseUp);
this.addListener(bd,this._onMouseMove);
this.addListener(be,this._onMouseOut);
this.addListener(bb,this._onMouseUp);
}
if(D===0){this.removeListener(bf,this._onMouseDown);
this.removeListener(bc,this._onMouseUp);
this.removeListener(bd,this._onMouseMove);
this.removeListener(be,this._onMouseOut);
this.removeListener(bb,this._onMouseUp);
F.addListener(bf,this._onMouseDown,this);
F.addListener(bd,this._onMouseMove,this);
F.addListener(be,this._onMouseOut,this);
F.addListener(bc,this._onMouseUp,this);
F.addListener(bb,this._onMouseUp,this);
}},add:function(B,C){if(C==null){this._add(B);
}else{this._add(B,{flex:C});
}this.__kJ.push(B);
},remove:function(r){this._remove(r);
qx.lang.Array.remove(this.__kJ,r);
},getChildren:function(){return this.__kJ;
},_onMouseDown:function(e){if(!e.isLeftPressed()||!this._isNear()){return;
}var a=this.getChildControl(bh);
var c=a.getContainerLocation();
var b=this.getContentLocation();
this.__kK=this.__kO?e.getDocumentLeft()-c.left+b.left:e.getDocumentTop()-c.top+b.top;
var f=this.getChildControl(bg);
var d=a.getBounds();
f.setUserBounds(d.left,d.top,d.width,d.height);
f.setZIndex(a.getZIndex()+1);
f.show();
this.__kL=true;
e.getCurrentTarget().capture();
e.stop();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__kL){this.__kS();
var by=this.getChildControl(bg);
var bz=this.__kP;

if(this.__kO){by.setDomLeft(bz);
}else{by.setDomTop(bz);
}e.stop();
}else{this.__kR();
}},_onMouseOut:function(e){this._setLastMousePosition(-100,-100);
this.__kR();
},_onMouseUp:function(e){if(!this.__kL){return;
}this._finalizeSizes();
var g=this.getChildControl(bg);
g.exclude();
this.__kL=false;
this.releaseCapture();
this.__kR();
e.stop();
},_onSplitterMove:function(){this.__kR();
},_onSplitterMouseOver:function(){this.addState(ba);
},_finalizeSizes:function(){var T=this.__kP;
var Q=this.__kQ;

if(T==null){return;
}var V=this._getChildren();
var U=V[2];
var R=V[3];
var S=U.getLayoutProperties().flex;
var W=R.getLayoutProperties().flex;
if((S!=0)&&(W!=0)){U.setLayoutProperties({flex:T});
R.setLayoutProperties({flex:Q});
}else{if(this.__kO){U.setWidth(T);
R.setWidth(Q);
}else{U.setHeight(T);
R.setHeight(Q);
}}},_isNear:function(){var s=this.getChildControl(bh);
var u=s.getBounds();
var w=s.getContainerLocation();
var t=this.getOffset();
if(!w){return;
}var z=this.__kM;
var A=u.width;
var v=w.left;

if(A<t){v-=Math.floor((t-A)/2);
A=t;
}
if(z<v||z>(v+A)){return false;
}var z=this.__kN;
var A=u.height;
var v=w.top;

if(A<t){v-=Math.floor((t-A)/2);
A=t;
}
if(z<v||z>(v+A)){return false;
}return true;
},__kR:function(){var N=this.getChildControl(bh);
var O=this.getApplicationRoot();
if(this.__kL||this._isNear()){var M=this.__kO?bi:bu;
this.setCursor(M);
O.setGlobalCursor(M);
N.addState(ba);
}else if(N.hasState(ba)){this.resetCursor();
O.resetGlobalCursor();
N.removeState(ba);
}},__kS:function(){if(this.__kO){var j=bl,q=br,k=bj,o=this.__kM;
}else{var j=bk,q=bv,k=bs,o=this.__kN;
}var p=this._getChildren();
var h=p[2].getSizeHint();
var m=p[3].getSizeHint();
var n=p[2].getBounds()[q]+p[3].getBounds()[q];
var l=o-this.__kK;
var i=n-l;
if(l<h[j]){i-=h[j]-l;
l=h[j];
}else if(i<m[j]){l-=m[j]-i;
i=m[j];
}if(l>h[k]){i+=l-h[k];
l=h[k];
}else if(i>m[k]){l+=i-m[k];
i=m[k];
}this.__kP=l;
this.__kQ=i;
},_isActiveDragSession:function(){return this.__kL;
},_setLastMousePosition:function(x,y){this.__kM=x;
this.__kN=y;
}},destruct:function(){this.__kJ=null;
}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var f="center",e="knob",d="middle",c="qx.ui.splitpane.Splitter",b="vertical";
qx.Class.define(c,{extend:qx.ui.core.Widget,construct:function(a){qx.ui.core.Widget.call(this);
if(a.getOrientation()==b){this._setLayout(new qx.ui.layout.HBox(0,f));
this._getLayout().setAlignY(d);
}else{this._setLayout(new qx.ui.layout.VBox(0,d));
this._getLayout().setAlignX(f);
}this._createChildControl(e);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(g){var h;

switch(g){case e:h=new qx.ui.basic.Image;
this._add(h);
break;
}return h||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var c="slider",b="splitter",a="qx.ui.splitpane.VLayout";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(o,p){var F=this._getLayoutChildren();
var length=F.length;
var B,E;
var r,q,z,s;

for(var i=0;i<length;i++){B=F[i];
E=B.getLayoutProperties().type;

if(E===b){q=B;
}else if(E===c){z=B;
}else if(!r){r=B;
}else{s=B;
}}
if(r&&s){var H=r.getLayoutProperties().flex;
var u=s.getLayoutProperties().flex;

if(H==null){H=1;
}
if(u==null){u=1;
}var G=r.getSizeHint();
var x=q.getSizeHint();
var y=s.getSizeHint();
var t=G.height;
var C=x.height;
var D=y.height;

if(H>0&&u>0){var v=H+u;
var w=p-C;
var t=Math.round((w/v)*H);
var D=w-t;
var A=qx.ui.layout.Util.arrangeIdeals(G.minHeight,t,G.maxHeight,y.minHeight,D,y.maxHeight);
t=A.begin;
D=A.end;
}else if(H>0){t=p-C-D;

if(t<G.minHeight){t=G.minHeight;
}
if(t>G.maxHeight){t=G.maxHeight;
}}else if(u>0){D=p-t-C;

if(D<y.minHeight){D=y.minHeight;
}
if(D>y.maxHeight){D=y.maxHeight;
}}r.renderLayout(0,0,o,t);
q.renderLayout(0,t,o,C);
s.renderLayout(0,t+C,o,D);
}else{q.renderLayout(0,0,0,0);
if(r){r.renderLayout(0,0,o,p);
}else if(s){s.renderLayout(0,0,o,p);
}}},_computeSizeHint:function(){var n=this._getLayoutChildren();
var length=n.length;
var f,e,m;
var g=0,j=0,h=0;
var k=0,l=0,d=0;

for(var i=0;i<length;i++){f=n[i];
m=f.getLayoutProperties();
if(m.type===c){continue;
}e=f.getSizeHint();
g+=e.minHeight;
j+=e.height;
h+=e.maxHeight;

if(e.minWidth>k){k=e.minWidth;
}
if(e.width>l){l=e.width;
}
if(e.maxWidth>d){d=e.maxWidth;
}}return {minHeight:g,height:j,maxHeight:h,minWidth:k,width:l,maxWidth:d};
}}});
})();
(function(){var x="slider",w="splitter",v="qx.ui.splitpane.HLayout";
qx.Class.define(v,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(a,b){var s=this._getLayoutChildren();
var length=s.length;
var p,r;
var d,c,m,e;

for(var i=0;i<length;i++){p=s[i];
r=p.getLayoutProperties().type;

if(r===w){c=p;
}else if(r===x){m=p;
}else if(!d){d=p;
}else{e=p;
}}
if(d&&e){var u=d.getLayoutProperties().flex;
var f=e.getLayoutProperties().flex;

if(u==null){u=1;
}
if(f==null){f=1;
}var t=d.getSizeHint();
var j=c.getSizeHint();
var l=e.getSizeHint();
var q=t.width;
var o=j.width;
var n=l.width;

if(u>0&&f>0){var g=u+f;
var h=a-o;
var q=Math.round((h/g)*u);
var n=h-q;
var k=qx.ui.layout.Util.arrangeIdeals(t.minWidth,q,t.maxWidth,l.minWidth,n,l.maxWidth);
q=k.begin;
n=k.end;
}else if(u>0){q=a-o-n;

if(q<t.minWidth){q=t.minWidth;
}
if(q>t.maxWidth){q=t.maxWidth;
}}else if(f>0){n=a-q-o;

if(n<l.minWidth){n=l.minWidth;
}
if(n>l.maxWidth){n=l.maxWidth;
}}d.renderLayout(0,0,q,b);
c.renderLayout(q,0,o,b);
e.renderLayout(q+o,0,n,b);
}else{c.renderLayout(0,0,0,0);
if(d){d.renderLayout(0,0,a,b);
}else if(e){e.renderLayout(0,0,a,b);
}}},_computeSizeHint:function(){var H=this._getLayoutChildren();
var length=H.length;
var A,z,G;
var E=0,F=0,y=0;
var B=0,D=0,C=0;

for(var i=0;i<length;i++){A=H[i];
G=A.getLayoutProperties();
if(G.type===x){continue;
}z=A.getSizeHint();
E+=z.minWidth;
F+=z.width;
y+=z.maxWidth;

if(z.minHeight>B){B=z.minHeight;
}
if(z.height>D){D=z.height;
}
if(z.maxHeight>C){C=z.maxHeight;
}}return {minWidth:E,width:F,maxWidth:y,minHeight:B,height:D,maxHeight:C};
}}});
})();
(function(){var c="allfiles",b="dropnode.FileTreeController",a='singleton';
qx.Class.define(b,{type:a,extend:dropnode.Controller,properties:{currentSelection:{nullable:true},name:{nullable:true},fileId:{nullable:true},nodeId:{nullable:true},fileMap:{nullable:true}},members:{initialize:function(x){arguments.callee.base.apply(this,arguments);
this.setFileMap(new Array());
dropnode.Utilities.withMockReq({"service":c},dropnode.Utilities.makeCallback(this._create_data_model,this),dropnode.Utilities.makeCallback(this.error,this),dropnode.TestUsers.shared_files);
},error:function(m){this.getParent().error(m);
},_create_data_model:function(d){var g=this.getUi().getFile_tree().getDataModel();
var f=d.length;

for(var i=0;i<f;i++){var k=d[i].encodedName;
var e=d[i].recipients;
var l=g.addBranch(null,d[i].name,false);
g.setColumnData(l,1,d[i].url);
g.setColumnData(l,2,d[i].recipients.length);
this.getFileMap()[k]=d[i];

for(var j=0;j<e.length;j++){var h=g.addLeaf(l,d[i].recipients[j].progress);
}}g.setData();
}}});
})();
(function(){var i="null",h="dropnode.Utilities",g="JSONParseError",f="completed",d="GET",c="localhost";
qx.Class.define(h,{statics:{server:c,makeCallback:function(j,k){return qx.lang.Function.bind(j,k);
},makeReq:function(a){var b=new qx.io.remote.Request(dropnode.Utilites.server,d);
},withReq:function(l,m,n){var p=dropnode.Utilites.makeReq(l);
var o=m;
var q=this;
p.addListener(f,function(e){var r=new qx.util.Json.parseQx(e.getContent());
var s={name:r.error,message:r.error};

if(s.name!=null){n(s);
}else{try{m(qx.util.Json.parseQx(r.result));
}catch(x){n({name:g,message:r.result});
}}});
},withMockReq:function(t,u,v,w){var y={name:w.error,message:w.error};

if(y.name!=i){u(w);
}else{v(w.error);
}}}});
})();
(function(){var H="Boolean",G="qx.event.type.Event",F="queued",E="String",D="sending",C="receiving",B="aborted",A="failed",z="nocache",y="completed",bm="qx.io.remote.Response",bl="POST",bk="configured",bj="timeout",bi="GET",bh="Pragma",bg="no-url-params-on-post",bf="PUT",be="no-cache",bd="Cache-Control",O="Content-Type",P="text/plain",M="application/xml",N="application/json",K="text/html",L="application/x-www-form-urlencoded",I="qx.io.remote.Exchange",J="Integer",Q="X-Qooxdoo-Response-Type",R="HEAD",U="qx.io.remote.Request",T="_applyResponseType",W="_applyState",V="text/javascript",Y="changeState",X="_applyProhibitCaching",S="",bc="_applyMethod",bb="DELETE",ba="boolean";
qx.Class.define(U,{extend:qx.core.Object,construct:function(n,o,p){qx.core.Object.call(this);
this.__kT={};
this.__kU={};
this.__kV={};
this.__kW={};

if(n!==undefined){this.setUrl(n);
}
if(o!==undefined){this.setMethod(o);
}
if(p!==undefined){this.setResponseType(p);
}this.setProhibitCaching(true);
this.__kX=++qx.io.remote.Request.__kX;
},events:{"created":G,"configured":G,"sending":G,"receiving":G,"completed":bm,"aborted":G,"failed":bm,"timeout":bm},statics:{__kX:0,methodAllowsRequestBody:function(q){return (q==bl)||(q==bf);
}},properties:{url:{check:E,init:S},method:{check:[bi,bl,bf,R,bb],apply:bc,init:bi},asynchronous:{check:H,init:true},data:{check:E,nullable:true},username:{check:E,nullable:true},password:{check:E,nullable:true},state:{check:[bk,F,D,C,y,B,bj,A],init:bk,apply:W,event:Y},responseType:{check:[P,V,N,M,K],init:P,apply:T},timeout:{check:J,nullable:true},prohibitCaching:{check:function(v){return typeof v==ba||v===bg;
},init:true,apply:X},crossDomain:{check:H,init:false},fileUpload:{check:H,init:false},transport:{check:I,nullable:true},useBasicHttpAuth:{check:H,init:false},parseJson:{check:H,init:true}},members:{__kT:null,__kU:null,__kV:null,__kW:null,__kX:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case D:case C:this.error("Aborting already sent request!");
case F:this.abort();
break;
}},isConfigured:function(){return this.getState()===bk;
},isQueued:function(){return this.getState()===F;
},isSending:function(){return this.getState()===D;
},isReceiving:function(){return this.getState()===C;
},isCompleted:function(){return this.getState()===y;
},isAborted:function(){return this.getState()===B;
},isTimeout:function(){return this.getState()===bj;
},isFailed:function(){return this.getState()===A;
},__kY:function(e){var m=e.clone();
m.setTarget(this);
this.dispatchEvent(m);
},_onqueued:function(e){this.setState(F);
this.__kY(e);
},_onsending:function(e){this.setState(D);
this.__kY(e);
},_onreceiving:function(e){this.setState(C);
this.__kY(e);
},_oncompleted:function(e){this.setState(y);
this.__kY(e);
this.dispose();
},_onaborted:function(e){this.setState(B);
this.__kY(e);
this.dispose();
},_ontimeout:function(e){this.setState(bj);
this.__kY(e);
this.dispose();
},_onfailed:function(e){this.setState(A);
this.__kY(e);
this.dispose();
},_applyState:function(g,h){{};
},_applyProhibitCaching:function(bn,bo){if(!bn){this.removeParameter(z);
this.removeRequestHeader(bh);
this.removeRequestHeader(bd);
return;
}if(bn!==bg||this.getMethod()!=bl){this.setParameter(z,new Date().valueOf());
}else{this.removeParameter(z);
}this.setRequestHeader(bh,be);
this.setRequestHeader(bd,be);
},_applyMethod:function(j,k){if(qx.io.remote.Request.methodAllowsRequestBody(j)){this.setRequestHeader(O,L);
}else{this.removeRequestHeader(O);
}var l=this.getProhibitCaching();
this._applyProhibitCaching(l,l);
},_applyResponseType:function(d,f){this.setRequestHeader(Q,d);
},setRequestHeader:function(r,s){this.__kT[r]=s;
},removeRequestHeader:function(a){delete this.__kT[a];
},getRequestHeader:function(b){return this.__kT[b]||null;
},getRequestHeaders:function(){return this.__kT;
},setParameter:function(t,u,w){if(w){this.__kV[t]=u;
}else{this.__kU[t]=u;
}},removeParameter:function(bp,bq){if(bq){delete this.__kV[bp];
}else{delete this.__kU[bp];
}},getParameter:function(br,bs){if(bs){return this.__kV[br]||null;
}else{return this.__kU[br]||null;
}},getParameters:function(x){return (x?this.__kV:this.__kU);
},setFormField:function(bt,bu){this.__kW[bt]=bu;
},removeFormField:function(c){delete this.__kW[c];
},getFormField:function(i){return this.__kW[i]||null;
},getFormFields:function(){return this.__kW;
},getSequenceNumber:function(){return this.__kX;
}},destruct:function(){this.setTransport(null);
this.__kT=this.__kU=this.__kV=this.__kW=null;
}});
})();
(function(){var b=".",a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var h;
var c=qx.bom.client.Engine;
var g=c.FULLVERSION.split(b);
var e=0;
var d=0;
var f=0;
if(g[0]){e=g[0];
}if(g[1]){d=g[1];
}if(g[2]){f=g[2];
}if(window.maxConnectionsPerServer){h=window.maxConnectionsPerServer;
}else if(c.OPERA){h=8;
}else if(c.WEBKIT){h=4;
}else if(c.GECKO&&((e>1)||((e==1)&&(d>9))||((e==1)&&(d==9)&&(f>=1)))){h=6;
}else{h=2;
}return h;
}}});
})();
(function(){var D="Integer",C="aborted",B="_onaborted",A="_on",z="_applyEnabled",y="Boolean",x="sending",w="interval",v="__lb",u="failed",p="qx.io.remote.RequestQueue",t="timeout",s="completed",o="queued",n="__ld",r="receiving",q="singleton";
qx.Class.define(p,{type:q,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__la=[];
this.__lb=[];
this.__lc=0;
this.__ld=new qx.event.Timer(500);
this.__ld.addListener(w,this._oninterval,this);
},properties:{enabled:{init:true,check:y,apply:z},maxTotalRequests:{check:D,nullable:true},maxConcurrentRequests:{check:D,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:D,init:5000}},members:{__la:null,__lb:null,__lc:null,__ld:null,getRequestQueue:function(){return this.__la;
},getActiveQueue:function(){return this.__lb;
},_debug:function(){var a;
{};
},_check:function(){this._debug();
if(this.__lb.length==0&&this.__la.length==0){this.__ld.stop();
}if(!this.getEnabled()){return;
}if(this.__la.length==0||(this.__la[0].isAsynchronous()&&this.__lb.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__lc>=this.getMaxTotalRequests()){return;
}var E=this.__la.shift();
var F=new qx.io.remote.Exchange(E);
this.__lc++;
this.__lb.push(F);
this._debug();
F.addListener(x,this._onsending,this);
F.addListener(r,this._onreceiving,this);
F.addListener(s,this._oncompleted,this);
F.addListener(C,this._oncompleted,this);
F.addListener(t,this._oncompleted,this);
F.addListener(u,this._oncompleted,this);
F._start=(new Date).valueOf();
F.send();
if(this.__la.length>0){this._check();
}},_remove:function(N){qx.lang.Array.remove(this.__lb,N);
N.dispose();
this._check();
},__le:0,_onsending:function(e){{};
e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){{};
var d=e.getTarget().getRequest();
var c=A+e.getType();
try{if(d[c]){d[c](e);
}}catch(J){var b=qx.dev.StackTrace.getStackTraceFromError(J);
this.error("Request "+d+" handler "+c+" threw an error: "+J+"\nStack Trace:\n"+b);
try{if(d[B]){var event=qx.event.Registration.createEvent(C,qx.event.type.Event);
d[B](event);
}}catch(G){}}finally{this._remove(e.getTarget());
}},_oninterval:function(e){var m=this.__lb;

if(m.length==0){this.__ld.stop();
return;
}var g=(new Date).valueOf();
var k;
var h;
var l=this.getDefaultTimeout();
var j;
var f;

for(var i=m.length-1;i>=0;i--){k=m[i];
h=k.getRequest();

if(h.isAsynchronous()){j=h.getTimeout();
if(j==0){continue;
}
if(j==null){j=l;
}f=g-k._start;

if(f>j){this.warn("Timeout: transport "+k.toHashCode());
this.warn(f+"ms > "+j+"ms");
k.timeout();
}}}},_applyEnabled:function(L,M){if(L){this._check();
}this.__ld.setEnabled(L);
},add:function(K){K.setState(o);

if(K.isAsynchronous()){this.__la.push(K);
}else{this.__la.unshift(K);
}this._check();

if(this.getEnabled()){this.__ld.start();
}},abort:function(H){var I=H.getTransport();

if(I){I.abort();
}else if(qx.lang.Array.contains(this.__la,H)){qx.lang.Array.remove(this.__la,H);
}}},destruct:function(){this._disposeArray(v);
this._disposeObjects(n);
this.__la=null;
}});
})();
(function(){var v="failed",u="sending",t="completed",s="receiving",r="aborted",q="timeout",p="qx.event.type.Event",o="Connection dropped",n="qx.io.remote.Response",m="configured",bw="Unknown status code. ",bv="=",bu="qx.io.remote.transport.XmlHttp",bt="qx.io.remote.transport.Abstract",bs="Request-URL too large",br="MSHTML-specific HTTP status code",bq="Not available",bp="Precondition failed",bo="Server error",bn="Moved temporarily",C="&",D="qx.io.remote.Exchange",A="Possibly due to a cross-domain request?",B="Bad gateway",y="Gone",z="See other",w="Partial content",x="Server timeout",I="qx.io.remote.transport.Script",J="HTTP version not supported",S="Unauthorized",P="Possibly due to application URL using 'file:' protocol?",bb="Multiple choices",V="Payment required",bj="Not implemented",bg="Proxy authentication required",L="Length required",bm="_applyState",bl="changeState",bk="Not modified",K="qx.io.remote.Request",N="Connection closed by server",O="Moved permanently",R="_applyImplementation",T="Method not allowed",W="Forbidden",bd="Use proxy",bi="Ok",E="Conflict",F="Not found",M="Not acceptable",ba="Request time-out",Y="Bad request",X="No content",bf="file:",be="qx.io.remote.transport.Iframe",U="Request entity too large",bc="Unknown status code",k="Unsupported media type",bh="Gateway time-out",G="created",H="Out of resources",Q="undefined";
qx.Class.define(D,{extend:qx.core.Object,construct:function(d){qx.core.Object.call(this);
this.setRequest(d);
d.setTransport(this);
},events:{"sending":p,"receiving":p,"completed":n,"aborted":p,"failed":n,"timeout":n},statics:{typesOrder:[bu,be,I],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(bD,bE){qx.io.remote.Exchange.typesAvailable[bE]=bD;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var bS in qx.io.remote.Exchange.typesAvailable){var bR=qx.io.remote.Exchange.typesAvailable[bS];

if(bR.isSupported()){qx.io.remote.Exchange.typesSupported[bS]=bR;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(f,g,h){if(!qx.lang.Array.contains(f.handles.responseTypes,h)){return false;
}
for(var j in g){if(!f.handles[j]){return false;
}}return true;
},_nativeMap:{0:G,1:m,2:u,3:s,4:t},wasSuccessful:function(a,b,c){if(c){switch(a){case null:case 0:return true;
case -1:return b<4;
default:return typeof a===Q;
}}else{switch(a){case -1:{};
return b<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:{};
return b!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:{};
return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:{};
return false;
default:if(a>206&&a<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+a+" ("+b+")");
return false;
}}},statusCodeToString:function(bO){switch(bO){case -1:return bq;
case 0:var bP=window.location.href;
if(qx.lang.String.startsWith(bP.toLowerCase(),bf)){return (bw+P);
}else{return (bw+A);
}break;
case 200:return bi;
case 304:return bk;
case 206:return w;
case 204:return X;
case 300:return bb;
case 301:return O;
case 302:return bn;
case 303:return z;
case 305:return bd;
case 400:return Y;
case 401:return S;
case 402:return V;
case 403:return W;
case 404:return F;
case 405:return T;
case 406:return M;
case 407:return bg;
case 408:return ba;
case 409:return E;
case 410:return y;
case 411:return L;
case 412:return bp;
case 413:return U;
case 414:return bs;
case 415:return k;
case 500:return bo;
case 501:return bj;
case 502:return B;
case 503:return H;
case 504:return bh;
case 505:return J;
case 12002:return x;
case 12029:return o;
case 12030:return o;
case 12031:return o;
case 12152:return N;
case 13030:return br;
default:return bc;
}}},properties:{request:{check:K,nullable:true},implementation:{check:bt,nullable:true,apply:R},state:{check:[m,u,s,t,r,q,v],init:m,event:bl,apply:bm}},members:{send:function(){var bI=this.getRequest();

if(!bI){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var bG=qx.io.remote.Exchange.typesOrder;
var bF=qx.io.remote.Exchange.typesSupported;
var bK=bI.getResponseType();
var bL={};

if(bI.getAsynchronous()){bL.asynchronous=true;
}else{bL.synchronous=true;
}
if(bI.getCrossDomain()){bL.crossDomain=true;
}
if(bI.getFileUpload()){bL.fileUpload=true;
}for(var bJ in bI.getFormFields()){bL.programaticFormFields=true;
break;
}var bM,bH;

for(var i=0,l=bG.length;i<l;i++){bM=bF[bG[i]];

if(bM){if(!qx.io.remote.Exchange.canHandle(bM,bL,bK)){continue;
}
try{{};
bH=new bM;
this.setImplementation(bH);
bH.setUseBasicHttpAuth(bI.getUseBasicHttpAuth());
bH.send();
return true;
}catch(bQ){this.error("Request handler throws error");
this.error(bQ);
return;
}}}this.error("There is no transport implementation available to handle this request: "+bI);
},abort:function(){var bN=this.getImplementation();

if(bN){{};
bN.abort();
}else{{};
this.setState(r);
}},timeout:function(){var bT=this.getImplementation();

if(bT){this.warn("Timeout: implementation "+bT.toHashCode());
bT.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(q);
}this.__lf();
},__lf:function(){var bC=this.getRequest();

if(bC){bC.setTimeout(0);
}},_onsending:function(e){this.setState(u);
},_onreceiving:function(e){this.setState(s);
},_oncompleted:function(e){this.setState(t);
},_onabort:function(e){this.setState(r);
},_onfailed:function(e){this.setState(v);
},_ontimeout:function(e){this.setState(q);
},_applyImplementation:function(bV,bW){if(bW){bW.removeListener(u,this._onsending,this);
bW.removeListener(s,this._onreceiving,this);
bW.removeListener(t,this._oncompleted,this);
bW.removeListener(r,this._onabort,this);
bW.removeListener(q,this._ontimeout,this);
bW.removeListener(v,this._onfailed,this);
}
if(bV){var bY=this.getRequest();
bV.setUrl(bY.getUrl());
bV.setMethod(bY.getMethod());
bV.setAsynchronous(bY.getAsynchronous());
bV.setUsername(bY.getUsername());
bV.setPassword(bY.getPassword());
bV.setParameters(bY.getParameters(false));
bV.setFormFields(bY.getFormFields());
bV.setRequestHeaders(bY.getRequestHeaders());
if(bV instanceof qx.io.remote.transport.XmlHttp){bV.setParseJson(bY.getParseJson());
}var cc=bY.getData();

if(cc===null){var cd=bY.getParameters(true);
var cb=[];

for(var bX in cd){var ca=cd[bX];

if(ca instanceof Array){for(var i=0;i<ca.length;i++){cb.push(encodeURIComponent(bX)+bv+encodeURIComponent(ca[i]));
}}else{cb.push(encodeURIComponent(bX)+bv+encodeURIComponent(ca));
}}
if(cb.length>0){bV.setData(cb.join(C));
}}else{bV.setData(cc);
}bV.setResponseType(bY.getResponseType());
bV.addListener(u,this._onsending,this);
bV.addListener(s,this._onreceiving,this);
bV.addListener(t,this._oncompleted,this);
bV.addListener(r,this._onabort,this);
bV.addListener(q,this._ontimeout,this);
bV.addListener(v,this._onfailed,this);
}},_applyState:function(bx,by){{};

switch(bx){case u:this.fireEvent(u);
break;
case s:this.fireEvent(s);
break;
case t:case r:case q:case v:var bA=this.getImplementation();

if(!bA){break;
}this.__lf();

if(this.hasListener(bx)){var bB=qx.event.Registration.createEvent(bx,qx.io.remote.Response);

if(bx==t){var bz=bA.getResponseContent();
bB.setContent(bz);
if(bz===null){{};
bx=v;
}}else if(bx==v){bB.setContent(bA.getResponseContent());
}bB.setStatusCode(bA.getStatusCode());
bB.setResponseHeaders(bA.getResponseHeaders());
this.dispatchEvent(bB);
}this.setImplementation(null);
bA.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var bU=this.getImplementation();

if(bU){this.setImplementation(null);
bU.dispose();
}this.setRequest(null);
}});
})();
(function(){var q="qx.event.type.Event",p="String",o="failed",n="timeout",m="created",l="aborted",k="sending",j="configured",i="receiving",h="completed",c="Object",g="Boolean",f="abstract",b="_applyState",a="GET",e="changeState",d="qx.io.remote.transport.Abstract";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":q,"configured":q,"sending":q,"receiving":q,"completed":q,"aborted":q,"failed":q,"timeout":q},properties:{url:{check:p,nullable:true},method:{check:p,nullable:true,init:a},asynchronous:{check:g,nullable:true,init:true},data:{check:p,nullable:true},username:{check:p,nullable:true},password:{check:p,nullable:true},state:{check:[m,j,k,i,h,l,n,o],init:m,event:e,apply:b},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:p,nullable:true},useBasicHttpAuth:{check:g,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){{};
this.setState(l);
},timeout:function(){{};
this.setState(n);
},failed:function(){{};
this.setState(o);
},setRequestHeader:function(r,s){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(t){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(u,v){{};

switch(u){case m:this.fireEvent(m);
break;
case j:this.fireEvent(j);
break;
case k:this.fireEvent(k);
break;
case i:this.fireEvent(i);
break;
case h:this.fireEvent(h);
break;
case l:this.fireEvent(l);
break;
case o:this.fireEvent(o);
break;
case n:this.fireEvent(n);
break;
}return true;
}},destruct:function(){this.setRequestHeaders(null);
this.setParameters(null);
this.setFormFields(null);
}});
})();
(function(){var x="=",w="&",v="application/xml",u="application/json",t="text/html",s="qx.client",r="textarea",q="none",p="text/plain",o="text/javascript",R="",Q="completed",P="?",O="qx.io.remote.transport.Iframe",N="gecko",M="frame_",L="aborted",K="_data_",J="pre",I="javascript:void(0)",E="sending",F="form",C="failed",D='<iframe name="',A="mshtml",B="form_",y='"></iframe>',z="iframe",G="timeout",H="qx/static/blank.gif";
qx.Class.define(O,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var U=(new Date).valueOf();
var V=M+U;
var W=B+U;
if(qx.core.Variant.isSet(s,A)){this.__lg=document.createElement(D+V+y);
}else{this.__lg=document.createElement(z);
}this.__lg.src=I;
this.__lg.id=this.__lg.name=V;
this.__lg.onload=qx.lang.Function.bind(this._onload,this);
this.__lg.style.display=q;
document.body.appendChild(this.__lg);
this.__lh=document.createElement(F);
this.__lh.target=V;
this.__lh.id=this.__lh.name=W;
this.__lh.style.display=q;
document.body.appendChild(this.__lh);
this.__li=document.createElement(r);
this.__li.id=this.__li.name=K;
this.__lh.appendChild(this.__li);
this.__lg.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[p,o,u,v,t]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__li:null,__lj:0,__lh:null,__lg:null,send:function(){var b=this.getMethod();
var d=this.getUrl();
var j=this.getParameters(false);
var h=[];

for(var c in j){var f=j[c];

if(f instanceof Array){for(var i=0;i<f.length;i++){h.push(encodeURIComponent(c)+x+encodeURIComponent(f[i]));
}}else{h.push(encodeURIComponent(c)+x+encodeURIComponent(f));
}}
if(h.length>0){d+=(d.indexOf(P)>=0?w:P)+h.join(w);
}if(this.getData()===null){var j=this.getParameters(true);
var h=[];

for(var c in j){var f=j[c];

if(f instanceof Array){for(var i=0;i<f.length;i++){h.push(encodeURIComponent(c)+x+encodeURIComponent(f[i]));
}}else{h.push(encodeURIComponent(c)+x+encodeURIComponent(f));
}}
if(h.length>0){this.setData(h.join(w));
}}var a=this.getFormFields();

for(var c in a){var g=document.createElement(r);
g.name=c;
g.appendChild(document.createTextNode(a[c]));
this.__lh.appendChild(g);
}this.__lh.action=d;
this.__lh.method=b;
this.__li.appendChild(document.createTextNode(this.getData()));
this.__lh.submit();
this.setState(E);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(this.__lh.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__lg.readyState]);
}),_switchReadyState:function(n){switch(this.getState()){case Q:case L:case C:case G:this.warn("Ignore Ready State Change");
return;
}while(this.__lj<n){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lj]);
}},setRequestHeader:function(X,Y){},getResponseHeader:function(ba){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return R;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__lg);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__lg);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__lg);
},getIframeTextContent:function(){var m=this.getIframeBody();

if(!m){return null;
}
if(!m.firstChild){return R;
}if(m.firstChild.tagName&&m.firstChild.tagName.toLowerCase()==J){return m.firstChild.innerHTML;
}else{return m.innerHTML;
}},getIframeHtmlContent:function(){var k=this.getIframeBody();
return k?k.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==Q){{};
return null;
}{};
var l=this.getIframeTextContent();

switch(this.getResponseType()){case p:{};
return l;
break;
case t:l=this.getIframeHtmlContent();
{};
return l;
break;
case u:l=this.getIframeHtmlContent();
{};

try{return l&&l.length>0?qx.util.Json.parse(l,false):null;
}catch(T){return this.error("Could not execute json: ("+l+")",T);
}case o:l=this.getIframeHtmlContent();
{};

try{return l&&l.length>0?window.eval(l):null;
}catch(S){return this.error("Could not execute javascript: ("+l+")",S);
}case v:l=this.getIframeDocument();
{};
return l;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,O);
},destruct:function(){if(this.__lg){this.__lg.onload=null;
this.__lg.onreadystatechange=null;
if(qx.core.Variant.isSet(s,N)){this.__lg.src=qx.util.ResourceManager.getInstance().toUri(H);
}document.body.removeChild(this.__lg);
}
if(this.__lh){document.body.removeChild(this.__lh);
}this.__lg=this.__lh=this.__li=null;
}});
})();
(function(){var i="qx.event.handler.Iframe",h="load",g="iframe";
qx.Class.define(i,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(j){qx.event.Registration.fireEvent(j,h);
})},members:{canHandleEvent:function(k,l){return k.tagName.toLowerCase()===g;
},registerEvent:function(a,b,c){},unregisterEvent:function(d,e,f){}},defer:function(m){qx.event.Registration.addHandler(m);
}});
})();
(function(){var i="qx.client",h="webkit",g="body",f="iframe",e="qx.bom.Iframe";
qx.Class.define(e,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(j,k){var j=j?qx.lang.Object.clone(j):{};
var l=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var m in l){if(j[m]==null){j[m]=l[m];
}}return qx.bom.Element.create(f,j,k);
},getWindow:qx.core.Variant.select(i,{"mshtml|gecko":function(C){try{return C.contentWindow;
}catch(n){return null;
}},"default":function(A){try{var B=this.getDocument(A);
return B?B.defaultView:null;
}catch(r){return null;
}}}),getDocument:qx.core.Variant.select(i,{"mshtml":function(c){try{var d=this.getWindow(c);
return d?d.document:null;
}catch(s){return null;
}},"default":function(q){try{return q.contentDocument;
}catch(D){return null;
}}}),getBody:function(o){try{var p=this.getDocument(o);
return p?p.getElementsByTagName(g)[0]:null;
}catch(b){return null;
}},setSource:function(u,v){try{if(this.getWindow(u)&&qx.dom.Hierarchy.isRendered(u)){try{if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Platform.MAC){var w=this.getContentWindow();

if(w){w.stop();
}}this.getWindow(u).location.replace(v);
}catch(x){u.src=v;
}}else{u.src=v;
}}catch(t){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(y){var z=this.getDocument(y);

try{if(z&&z.location){return z.location.href;
}}catch(a){}return null;
}}});
})();
(function(){var P=",",O="",N="string",M="null",L="new Date(Date.UTC(",K='"',J="))",I=':',H="qx.jsonDebugging",G='-',br='\\u00',bq="__lw",bp='\\\\',bo='\\f',bn="__ln",bm='\\"',bl='Z',bk='T',bj="}",bi='(',W='.',X="{",U='\\r',V=":",S="__lp",T='\\t',Q="The default returned parsed date format will change. Use the CONVERT_DATES flag to change the behavior.",R="]",Y="__lm",ba="[",bd="__lo",bc="__lx",bf="qx.jsonEncodeUndefined",be='\\b',bh="qx.util.Json",bg=')',bb='\\n';
qx.Class.define(bh,{statics:{__lk:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",CONVERT_DATES:null,__ll:{"function":Y,"boolean":bn,"number":bd,"string":S,"object":bq,"undefined":bc},__lm:function(bs,bt){return String(bs);
},__ln:function(bx,by){return String(bx);
},__lo:function(C,D){return isFinite(C)?String(C):M;
},__lp:function(e,f){var g;

if(/["\\\x00-\x1f]/.test(e)){g=e.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__lr);
}else{g=e;
}return K+g+K;
},__lq:{'\b':be,'\t':T,'\n':bb,'\f':bo,'\r':U,'"':bm,'\\':bp},__lr:function(a,b){var bD=qx.util.Json.__lq[b];

if(bD){return bD;
}bD=b.charCodeAt();
return br+Math.floor(bD/16).toString(16)+(bD%16).toString(16);
},__ls:function(v,w){var y=[],B=true,A,x;
var z=qx.util.Json.__lz;
y.push(ba);

if(z){qx.util.Json.__lt+=qx.util.Json.BEAUTIFYING_INDENT;
y.push(qx.util.Json.__lt);
}
for(var i=0,l=v.length;i<l;i++){x=v[i];
A=this.__ll[typeof x];

if(A){x=this[A](x,i+O);

if(typeof x==N){if(!B){y.push(P);

if(z){y.push(qx.util.Json.__lt);
}}y.push(x);
B=false;
}}}
if(z){qx.util.Json.__lt=qx.util.Json.__lt.substring(0,qx.util.Json.__lt.length-qx.util.Json.BEAUTIFYING_INDENT.length);
y.push(qx.util.Json.__lt);
}y.push(R);
return y.join(O);
},__lu:function(q,r){if(qx.util.Json.CONVERT_DATES===null){qx.log.Logger.deprecatedMethodWarning(arguments.callee,Q);
var t=q.getUTCFullYear()+P+q.getUTCMonth()+P+q.getUTCDate()+P+q.getUTCHours()+P+q.getUTCMinutes()+P+q.getUTCSeconds()+P+q.getUTCMilliseconds();
return L+t+J;
}else if(!qx.util.Json.CONVERT_DATES){if(q.toJSON){return q.toJSON();
}var s=qx.util.format.NumberFormat.getInstance();
s.setMinimumIntegerDigits(2);
var u=q.getUTCFullYear()+G+s.format(q.getUTCMonth()+1)+G+s.format(q.getUTCDate())+bk+s.format(q.getUTCHours())+I+s.format(q.getUTCMinutes())+I+s.format(q.getUTCSeconds())+W;
s.setMinimumIntegerDigits(3);
return u+s.format(q.getUTCMilliseconds())+bl;
}else{var t=q.getUTCFullYear()+P+q.getUTCMonth()+P+q.getUTCDate()+P+q.getUTCHours()+P+q.getUTCMinutes()+P+q.getUTCSeconds()+P+q.getUTCMilliseconds();
return L+t+J;
}},__lv:function(h,j){var n=[],p=true,m,k;
var o=qx.util.Json.__lz;
n.push(X);

if(o){qx.util.Json.__lt+=qx.util.Json.BEAUTIFYING_INDENT;
n.push(qx.util.Json.__lt);
}
for(var j in h){k=h[j];
m=this.__ll[typeof k];

if(m){k=this[m](k,j);

if(typeof k==N){if(!p){n.push(P);

if(o){n.push(qx.util.Json.__lt);
}}n.push(this.__lp(j),V,k);
p=false;
}}}
if(o){qx.util.Json.__lt=qx.util.Json.__lt.substring(0,qx.util.Json.__lt.length-qx.util.Json.BEAUTIFYING_INDENT.length);
n.push(qx.util.Json.__lt);
}n.push(bj);
return n.join(O);
},__lw:function(E,F){if(E){if(qx.lang.Type.isFunction(E.toJSON)&&E.toJSON!==this.__lk){return this.__ly(E.toJSON(F),F);
}else if(qx.lang.Type.isDate(E)){return this.__lu(E,F);
}else if(qx.lang.Type.isArray(E)){return this.__ls(E,F);
}else if(qx.lang.Type.isObject(E)){return this.__lv(E,F);
}return O;
}return M;
},__lx:function(c,d){if(qx.core.Setting.get(bf)){return M;
}},__ly:function(bA,bB){return this[this.__ll[typeof bA]](bA,bB);
},stringify:function(bE,bF){this.__lz=bF;
this.__lt=this.BEAUTIFYING_LINE_END;
var bG=this.__ly(bE,O);

if(typeof bG!=N){bG=null;
}if(qx.core.Setting.get(H)){qx.log.Logger.debug(this,"JSON request: "+bG);
}return bG;
},parse:function(bu,bv){if(bv===undefined){bv=true;
}
if(qx.core.Setting.get(H)){qx.log.Logger.debug(this,"JSON response: "+bu);
}
if(bv){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(bu.replace(/"(\\.|[^"\\])*"/g,O))){throw new Error("Could not parse JSON string!");
}}
try{var bw=(bu&&bu.length>0)?eval(bi+bu+bg):null;
return bw;
}catch(bz){throw new Error("Could not evaluate JSON string: "+bz.message);
}}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(bC){bC.__lk=Date.prototype.toJSON;
}});
})();
(function(){var b="qx.util.format.IFormat";
qx.Interface.define(b,{members:{format:function(c){},parse:function(a){}}});
})();
(function(){var E="",D="Number",C="-",B="0",A="String",z="changeNumberFormat",y='(',x="g",w="Boolean",v="$",o="NaN",u='([0-9]{1,3}(?:',r='{0,1}[0-9]{3}){0,})',n='\\d+){0,1}',m="qx.util.format.NumberFormat",q="Infinity",p="^",s=".",l="-Infinity",t='([-+]){0,1}';
qx.Class.define(m,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(k){qx.core.Object.call(this);
this.__lA=k;
},statics:{getIntegerInstance:function(){var a=qx.util.format.NumberFormat;

if(a._integerInstance==null){a._integerInstance=new a();
a._integerInstance.setMaximumFractionDigits(0);
}return a._integerInstance;
},getInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
}},properties:{minimumIntegerDigits:{check:D,init:0},maximumIntegerDigits:{check:D,nullable:true},minimumFractionDigits:{check:D,init:0},maximumFractionDigits:{check:D,nullable:true},groupingUsed:{check:w,init:true},prefix:{check:A,init:E,event:z},postfix:{check:A,init:E,event:z}},members:{__lA:null,format:function(F){switch(F){case Infinity:return q;
case -Infinity:return l;
case NaN:return o;
}var J=(F<0);

if(J){F=-F;
}
if(this.getMaximumFractionDigits()!=null){var Q=Math.pow(10,this.getMaximumFractionDigits());
F=Math.round(F*Q)/Q;
}var P=String(Math.floor(F)).length;
var G=E+F;
var M=G.substring(0,P);

while(M.length<this.getMinimumIntegerDigits()){M=B+M;
}
if(this.getMaximumIntegerDigits()!=null&&M.length>this.getMaximumIntegerDigits()){M=M.substring(M.length-this.getMaximumIntegerDigits());
}var L=G.substring(P+1);

while(L.length<this.getMinimumFractionDigits()){L+=B;
}
if(this.getMaximumFractionDigits()!=null&&L.length>this.getMaximumFractionDigits()){L=L.substring(0,this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var I=M;
M=E;
var O;

for(O=I.length;O>3;O-=3){M=E+qx.locale.Number.getGroupSeparator(this.__lA)+I.substring(O-3,O)+M;
}M=I.substring(0,O)+M;
}var K=this.getPrefix()?this.getPrefix():E;
var H=this.getPostfix()?this.getPostfix():E;
var N=K+(J?C:E)+M;

if(L.length>0){N+=E+qx.locale.Number.getDecimalSeparator(this.__lA)+L;
}N+=H;
return N;
},parse:function(b){var g=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.__lA)+E);
var e=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.__lA)+E);
var c=new RegExp(p+qx.lang.String.escapeRegexpChars(this.getPrefix())+t+u+g+r+y+e+n+qx.lang.String.escapeRegexpChars(this.getPostfix())+v);
var f=c.exec(b);

if(f==null){throw new Error("Number string '"+b+"' does not match the number format");
}var h=(f[1]==C);
var j=f[2];
var i=f[3];
j=j.replace(new RegExp(g,x),E);
var d=(h?C:E)+j;

if(i!=null&&i.length!=0){i=i.replace(new RegExp(e),E);
d+=s+i;
}return parseFloat(d);
}}});
})();
(function(){var d="cldr_number_decimal_separator",c="cldr_number_percent_format",b="qx.locale.Number",a="cldr_number_group_separator";
qx.Class.define(b,{statics:{getDecimalSeparator:function(f){return qx.locale.Manager.getInstance().localize(d,[],f);
},getGroupSeparator:function(e){return qx.locale.Manager.getInstance().localize(a,[],e);
},getPercentFormat:function(g){return qx.locale.Manager.getInstance().localize(c,[],g);
}}});
})();
(function(){var A="&",z="=",y="?",x="application/json",w="completed",v="text/plain",u="text/javascript",t="qx.io.remote.transport.Script",s="",r="_ScriptTransport_data",m="script",q="timeout",p="_ScriptTransport_",l="_ScriptTransport_id",k="aborted",o="utf-8",n="failed";
qx.Class.define(t,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var B=++qx.io.remote.transport.Script.__lB;

if(B>=2000000000){qx.io.remote.transport.Script.__lB=B=1;
}this.__lC=null;
this.__lB=B;
},statics:{__lB:0,_instanceRegistry:{},ScriptTransport_PREFIX:p,ScriptTransport_ID_PARAM:l,ScriptTransport_DATA_PARAM:r,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[v,u,x]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(C,content){var D=qx.io.remote.transport.Script._instanceRegistry[C];

if(D==null){{};
}else{D._responseContent=content;
D._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__lD:0,__lC:null,__lB:null,send:function(){var e=this.getUrl();
e+=(e.indexOf(y)>=0?A:y)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+z+this.__lB;
var h=this.getParameters();
var g=[];

for(var d in h){if(d.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var f=h[d];

if(f instanceof Array){for(var i=0;i<f.length;i++){g.push(encodeURIComponent(d)+z+encodeURIComponent(f[i]));
}}else{g.push(encodeURIComponent(d)+z+encodeURIComponent(f));
}}
if(g.length>0){e+=A+g.join(A);
}var c=this.getData();

if(c!=null){e+=A+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+z+encodeURIComponent(c);
}qx.io.remote.transport.Script._instanceRegistry[this.__lB]=this;
this.__lC=document.createElement(m);
this.__lC.charset=o;
this.__lC.src=e;
{};
document.body.appendChild(this.__lC);
},_switchReadyState:function(b){switch(this.getState()){case w:case k:case n:case q:this.warn("Ignore Ready State Change");
return;
}while(this.__lD<b){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lD]);
}},setRequestHeader:function(E,F){},getResponseHeader:function(a){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return s;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==w){{};
return null;
}{};

switch(this.getResponseType()){case v:case x:case u:{};
var j=this._responseContent;
return (j===0?0:(j||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,t);
},destruct:function(){if(this.__lC){delete qx.io.remote.transport.Script._instanceRegistry[this.__lB];
document.body.removeChild(this.__lC);
}this.__lC=this._responseContent=null;
}});
})();
(function(){var M="failed",L="completed",K="=",J="aborted",I="",H="sending",G="&",F="configured",E="timeout",D="application/xml",bj="qx.io.remote.transport.XmlHttp",bi="application/json",bh="text/html",bg="qx.client",bf="receiving",be="text/plain",bd="text/javascript",bc="?",bb="created",ba="Boolean",T='Referer',U='Basic ',R="\n</pre>",S="string",P='Authorization',Q="<pre>Could not execute json: \n",N="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",O=':',V="parseerror",W="file:",Y="webkit",X="object";
qx.Class.define(bj,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[be,bd,bi,D,bh]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(bg,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},properties:{parseJson:{check:ba,init:true}},members:{__lE:false,__lF:0,__lG:null,getRequest:function(){if(this.__lG===null){this.__lG=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__lG.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__lG;
},send:function(){this.__lF=0;
var bE=this.getRequest();
var bA=this.getMethod();
var bH=this.getAsynchronous();
var bG=this.getUrl();
var bC=(window.location.protocol===W&&!(/^http(s){0,1}\:/.test(bG)));
this.__lE=bC;
var bK=this.getParameters(false);
var bI=[];

for(var bB in bK){var bF=bK[bB];

if(bF instanceof Array){for(var i=0;i<bF.length;i++){bI.push(encodeURIComponent(bB)+K+encodeURIComponent(bF[i]));
}}else{bI.push(encodeURIComponent(bB)+K+encodeURIComponent(bF));
}}
if(bI.length>0){bG+=(bG.indexOf(bc)>=0?G:bc)+bI.join(G);
}if(this.getData()===null){var bK=this.getParameters(true);
var bI=[];

for(var bB in bK){var bF=bK[bB];

if(bF instanceof Array){for(var i=0;i<bF.length;i++){bI.push(encodeURIComponent(bB)+K+encodeURIComponent(bF[i]));
}}else{bI.push(encodeURIComponent(bB)+K+encodeURIComponent(bF));
}}
if(bI.length>0){this.setData(bI.join(G));
}}var bJ=function(j){var p=N;
var u=I;
var n,m,k;
var q,r,t,o;
var i=0;

do{n=j.charCodeAt(i++);
m=j.charCodeAt(i++);
k=j.charCodeAt(i++);
q=n>>2;
r=((n&3)<<4)|(m>>4);
t=((m&15)<<2)|(k>>6);
o=k&63;

if(isNaN(m)){t=o=64;
}else if(isNaN(k)){o=64;
}u+=p.charAt(q)+p.charAt(r)+p.charAt(t)+p.charAt(o);
}while(i<j.length);
return u;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){bE.open(bA,bG,bH);
bE.setRequestHeader(P,U+bJ(this.getUsername()+O+this.getPassword()));
}else{bE.open(bA,bG,bH,this.getUsername(),this.getPassword());
}}else{bE.open(bA,bG,bH);
}}catch(z){this.error("Failed with exception: "+z);
this.failed();
return;
}if(!qx.core.Variant.isSet(bg,Y)){bE.setRequestHeader(T,window.location.href);
}var bD=this.getRequestHeaders();

for(var bB in bD){bE.setRequestHeader(bB,bD[bB]);
}try{{};
bE.send(this.getData());
}catch(A){if(bC){this.failedLocally();
}else{this.error("Failed to send data: "+A,"send");
this.failed();
}return;
}if(!bH){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===M){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case L:case J:case M:case E:{};
return;
}var f=this.getReadyState();

if(f==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),f,this.__lE)){if(this.getState()===F){this.setState(H);
}this.failed();
return;
}}while(this.__lF<f){this.setState(qx.io.remote.Exchange._nativeMap[++this.__lF]);
}}),getReadyState:function(){var bk=null;

try{bk=this.getRequest().readyState;
}catch(bm){}return bk;
},setRequestHeader:function(bO,bP){this.getRequestHeaders()[bO]=bP;
},getResponseHeader:function(bn){var bo=null;

try{bo=this.getRequest().getResponseHeader(bn)||null;
}catch(bu){}return bo;
},getStringResponseHeaders:function(){var by=null;

try{var bx=this.getRequest().getAllResponseHeaders();

if(bx){by=bx;
}}catch(bl){}return by;
},getResponseHeaders:function(){var x=this.getStringResponseHeaders();
var y={};

if(x){var v=x.split(/[\r\n]+/g);

for(var i=0,l=v.length;i<l;i++){var w=v[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(w){y[w[1]]=w[2];
}}}return y;
},getStatusCode:function(){var b=-1;

try{b=this.getRequest().status;
}catch(bw){}return b;
},getStatusText:function(){var a=I;

try{a=this.getRequest().statusText;
}catch(c){}return a;
},getResponseText:function(){var B=null;

try{B=this.getRequest().responseText;
}catch(bq){B=null;
}return B;
},getResponseXml:function(){var bN=null;
var bL=this.getStatusCode();
var bM=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(bL,bM,this.__lE)){try{bN=this.getRequest().responseXML;
}catch(bp){}}if(typeof bN==X&&bN!=null){if(!bN.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,I);
bN.loadXML(s);
}if(!bN.documentElement){throw new Error("Missing Document Element!");
}
if(bN.documentElement.tagName==V){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return bN;
},getFetchedLength:function(){var C=this.getResponseText();
return typeof C==S?C.length:0;
},getResponseContent:function(){var br=this.getState();

if(br!==L&&br!=M){{};
return null;
}{};
var bt=this.getResponseText();

if(br==M){{};
return bt;
}
switch(this.getResponseType()){case be:case bh:{};
return bt;
case bi:{};

try{if(bt&&bt.length>0){var bs;

if(this.getParseJson()){bs=qx.util.Json.parse(bt,false);
bs=(bs===0?0:(bs||null));
}else{bs=bt;
}return bs;
}else{return null;
}}catch(bv){this.error("Could not execute json: ["+bt+"]",bv);
return Q+bt+R;
}case bd:{};

try{if(bt&&bt.length>0){var bs=window.eval(bt);
return (bs===0?0:(bs||null));
}else{return null;
}}catch(bz){this.error("Could not execute javascript: ["+bt+"]",bz);
return null;
}case D:bt=this.getResponseXml();
{};
return (bt===0?0:(bt||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(g,h){{};

switch(g){case bb:this.fireEvent(bb);
break;
case F:this.fireEvent(F);
break;
case H:this.fireEvent(H);
break;
case bf:this.fireEvent(bf);
break;
case L:this.fireEvent(L);
break;
case M:this.fireEvent(M);
break;
case J:this.getRequest().abort();
this.fireEvent(J);
break;
case E:this.getRequest().abort();
this.fireEvent(E);
break;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,bj);
},destruct:function(){var d=this.getRequest();

if(d){d.onreadystatechange=qx.lang.Function.empty;
switch(d.readyState){case 1:case 2:case 3:d.abort();
}}this.__lG=null;
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);
g.setType(this.getType());
g.setState(this.getState());
g.setStatusCode(this.getStatusCode());
g.setContent(this.getContent());
g.setResponseHeaders(this.getResponseHeaders());
return g;
},getResponseHeader:function(d){var e=this.getResponseHeaders();

if(e){return e[d]||null;
}return null;
}}});
})();
(function(){var g="1.com",f="2.com",e="abcdef",d="dropnode.TestUsers",c="ghijkl",b="TestFile2.jpeg",a="TestFile.jpeg";
qx.Class.define(d,{extend:qx.core.Object,statics:{shared_files:[{name:a,encodedName:e,url:g,recipients:[{progress:10},{progress:50},{progress:0}]},{name:b,encodedName:c,url:f,recipients:[{progress:15},{progress:100}]}]}});
})();
(function(){var k="dropnode.FileTreeUI",j="URL",i="Empty row count in tree",h="changeMessage",g="File Name",f="Negative row index",e="Downloads";
qx.Class.define(k,{extend:qx.core.Object,properties:{message:{nullable:true,event:h},file_tree:{nullable:true},base_container:{nullable:true},event_bus:{nullable:true}},members:{initialize:function(l){this.setEvent_bus(l);
},init_gui:function(){this.setBase_container(new qx.ui.container.Composite(new qx.ui.layout.VBox()));
this.setFile_tree(new qx.ui.treevirtual.TreeVirtual([g,j,e]));
this.getFile_tree().setFocusCellOnMouseMove(false);
this.getBase_container().add(this.getFile_tree());
},goToFocusedRow:function(){this.goToRow(this.getFile_tree().getFocusedRow());
},goToRow:function(a){var d=this;
var b=function(r){if(r>=0){if(d.getFile_tree().getDataModel().getRowCount()>0){if(r<=(d.getFile_tree().getDataModel().getRowCount()-1)){return true;
}else return false;
}else throw i;
}else throw f;
};

if(b(a)){var c=this.getFile_tree().getDataModel().getNodeFromRow(a);
this.getFile_tree().getSelectionModel().setSelectionInterval(a,a);
}else{this.goToRow(a-1);
}}}});
})();
(function(){var bw="Boolean",bv="column-button",bu="Function",bt="qx.event.type.Data",bs="statusbar",br="qx.ui.table.pane.CellEvent",bq="function",bp="__lR",bo="PageUp",bn="dataChanged",cM='"',cL="changeLocale",cK="changeSelection",cJ="qx.dynlocale",cI="Enter",cH="metaDataChanged",cG="on",cF="_applyStatusBarVisible",cE="columnVisibilityMenuCreateStart",cD="blur",bD="qx.ui.table.Table",bE="columnVisibilityMenuCreateEnd",bB="changeVisible",bC="_applyResetSelectionOnHeaderClick",bz="_applyMetaColumnCounts",bA="focus",bx="changeDataRowRenderer",by="changeHeaderCellHeight",bL="Escape",bM="A",cf="changeSelectionModel",cb="Left",cn="Down",ci="Integer",cz="_applyHeaderCellHeight",ct="visibilityChanged",bT="qx.ui.table.ITableModel",cC="orderChanged",cB="_applySelectionModel",cA="menu-button",bR="menu",bW="_applyAdditionalStatusBarText",bY="_applyFocusCellOnMouseMove",cd="table",cg="_applyColumnVisibilityButtonVisible",cj="changeTableModel",cp="qx.event.type.Event",cv="tableWidthChanged",bF="_applyHeaderCellsVisible",bG="Object",bV="_applyShowCellFocusIndicator",cm="resize",cl="verticalScrollBarChanged",ck="changeScrollY",cr="_applyTableModel",cq="End",ch="_applyKeepFirstVisibleRowComplete",co="widthChanged",bk="one of one row",cu="Home",bH="_applyRowHeight",bI="F2",cc="appear",bl="Up",bm="%1 rows",bQ="qx.ui.table.selection.Model",bJ="one row",bK="__lP",bP="PageDown",ce="%1 of %2 rows",cx="keypress",cw="changeRowHeight",bX="__lQ",cy="Number",bS="__lH",cs="header",bN="__lI",bO="qx.ui.table.IRowRenderer",bU="Right",ca="Space";
qx.Class.define(bD,{extend:qx.ui.core.Widget,construct:function(eM,eN){qx.ui.core.Widget.call(this);
if(!eN){eN={};
}
if(eN.selectionManager){this.setNewSelectionManager(eN.selectionManager);
}
if(eN.selectionModel){this.setNewSelectionModel(eN.selectionModel);
}
if(eN.tableColumnModel){this.setNewTableColumnModel(eN.tableColumnModel);
}
if(eN.tablePane){this.setNewTablePane(eN.tablePane);
}
if(eN.tablePaneHeader){this.setNewTablePaneHeader(eN.tablePaneHeader);
}
if(eN.tablePaneScroller){this.setNewTablePaneScroller(eN.tablePaneScroller);
}
if(eN.tablePaneModel){this.setNewTablePaneModel(eN.tablePaneModel);
}
if(eN.columnMenu){this.setNewColumnMenu(eN.columnMenu);
}this._setLayout(new qx.ui.layout.VBox());
this.__lH=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(this.__lH,{flex:1});
this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this));
this.__lI=this.getNewSelectionManager()(this);
this.setSelectionModel(this.getNewSelectionModel()(this));
this.setTableModel(eM||this.getEmptyTableModel());
this.setMetaColumnCounts([-1]);
this.setTabIndex(1);
this.addListener(cx,this._onKeyPress);
this.addListener(bA,this._onFocusChanged);
this.addListener(cD,this._onFocusChanged);
var eO=new qx.ui.core.Widget().set({height:0});
this._add(eO);
eO.addListener(cm,this._onResize,this);
this.__lJ=null;
this.__lK=null;
if(qx.core.Variant.isSet(cJ,cG)){qx.locale.Manager.getInstance().addListener(cL,this._onChangeLocale,this);
}this.initStatusBarVisible();
eM=this.getTableModel();

if(eM.init&&typeof (eM.init)==bq){eM.init(this);
}},events:{"columnVisibilityMenuCreateStart":bt,"columnVisibilityMenuCreateEnd":bt,"tableWidthChanged":cp,"verticalScrollBarChanged":bt,"cellClick":br,"cellDblclick":br,"cellContextmenu":br,"dataEdited":bt},statics:{__lL:{cellClick:1,cellDblclick:1,cellContextmenu:1}},properties:{appearance:{refine:true,init:cd},focusable:{refine:true,init:true},minWidth:{refine:true,init:50},selectable:{refine:true,init:false},selectionModel:{check:bQ,apply:cB,event:cf},tableModel:{check:bT,apply:cr,event:cj},rowHeight:{check:cy,init:20,apply:bH,event:cw},forceLineHeight:{check:bw,init:true},headerCellsVisible:{check:bw,init:true,apply:bF},headerCellHeight:{check:ci,init:16,apply:cz,event:by,nullable:true},statusBarVisible:{check:bw,init:true,apply:cF},additionalStatusBarText:{nullable:true,init:null,apply:bW},columnVisibilityButtonVisible:{check:bw,init:true,apply:cg},metaColumnCounts:{check:bG,apply:bz},focusCellOnMouseMove:{check:bw,init:false,apply:bY},rowFocusChangeModifiesSelection:{check:bw,init:true},showCellFocusIndicator:{check:bw,init:true,apply:bV},keepFirstVisibleRowComplete:{check:bw,init:true,apply:ch},alwaysUpdateCells:{check:bw,init:false},resetSelectionOnHeaderClick:{check:bw,init:true,apply:bC},dataRowRenderer:{check:bO,init:null,nullable:true,event:bx},modalCellEditorPreOpenFunction:{check:bu,init:null,nullable:true},newColumnMenu:{check:bu,init:function(){return new qx.ui.table.columnmenu.Button();
}},newSelectionManager:{check:bu,init:function(eX){return new qx.ui.table.selection.Manager(eX);
}},newSelectionModel:{check:bu,init:function(dj){return new qx.ui.table.selection.Model(dj);
}},newTableColumnModel:{check:bu,init:function(D){return new qx.ui.table.columnmodel.Basic(D);
}},newTablePane:{check:bu,init:function(cN){return new qx.ui.table.pane.Pane(cN);
}},newTablePaneHeader:{check:bu,init:function(p){return new qx.ui.table.pane.Header(p);
}},newTablePaneScroller:{check:bu,init:function(eY){return new qx.ui.table.pane.Scroller(eY);
}},newTablePaneModel:{check:bu,init:function(P){return new qx.ui.table.pane.Model(P);
}}},members:{__lJ:null,__lK:null,__lH:null,__lI:null,__lM:null,__lN:null,__lO:null,__lP:null,__lQ:null,__lR:null,_createChildControlImpl:function(cW){var cX;

switch(cW){case bs:cX=new qx.ui.basic.Label();
cX.set({allowGrowX:true});
this._add(cX);
break;
case bv:cX=this.getNewColumnMenu()();
cX.set({focusable:false});
var cY=cX.factory(bR,{table:this});
cY.addListener(cc,this._initColumnMenu,this);
break;
}return cX||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,cW);
},_applySelectionModel:function(ep,eq){this.__lI.setSelectionModel(ep);

if(eq!=null){eq.removeListener(cK,this._onSelectionChanged,this);
}ep.addListener(cK,this._onSelectionChanged,this);
},_applyRowHeight:function(dN,dO){var dP=this._getPaneScrollerArr();

for(var i=0;i<dP.length;i++){dP[i].updateVerScrollBarMaximum();
}},_applyHeaderCellsVisible:function(dQ,dR){var dS=this._getPaneScrollerArr();

for(var i=0;i<dS.length;i++){dS[i]._excludeChildControl(cs);
}},_applyHeaderCellHeight:function(eD,eE){var eF=this._getPaneScrollerArr();

for(var i=0;i<eF.length;i++){eF[i].getHeader().setHeight(eD);
}},getEmptyTableModel:function(){if(!this.__lR){this.__lR=new qx.ui.table.model.Simple();
this.__lR.setColumns([]);
this.__lR.setData([]);
}return this.__lR;
},_applyTableModel:function(em,en){this.getTableColumnModel().init(em.getColumnCount(),this);

if(en!=null){en.removeListener(cH,this._onTableModelMetaDataChanged,this);
en.removeListener(bn,this._onTableModelDataChanged,this);
}em.addListener(cH,this._onTableModelMetaDataChanged,this);
em.addListener(bn,this._onTableModelDataChanged,this);
this._updateStatusBar();
this._updateTableData(0,em.getRowCount(),0,em.getColumnCount());
this._onTableModelMetaDataChanged();
if(en&&em.init&&typeof (em.init)==bq){em.init(this);
}},getTableColumnModel:function(){if(!this.__lQ){var k=this.__lQ=this.getNewTableColumnModel()(this);
k.addListener(ct,this._onColVisibilityChanged,this);
k.addListener(co,this._onColWidthChanged,this);
k.addListener(cC,this._onColOrderChanged,this);
var j=this.getTableModel();
k.init(j.getColumnCount(),this);
var g=this._getPaneScrollerArr();

for(var i=0;i<g.length;i++){var h=g[i];
var m=h.getTablePaneModel();
m.setTableColumnModel(k);
}}return this.__lQ;
},_applyStatusBarVisible:function(E,F){if(E){this._showChildControl(bs);
}else{this._excludeChildControl(bs);
}
if(E){this._updateStatusBar();
}},_applyAdditionalStatusBarText:function(bb,bc){this.__lM=bb;
this._updateStatusBar();
},_applyColumnVisibilityButtonVisible:function(n,o){if(n){this._showChildControl(bv);
}else{this._excludeChildControl(bv);
}},_applyMetaColumnCounts:function(du,dv){var dC=du;
var dw=this._getPaneScrollerArr();
var dA={};

if(du>dv){var dE=qx.event.Registration.getManager(dw[0]);

for(var dF in qx.ui.table.Table.__lL){dA[dF]={};
dA[dF].capture=dE.getListeners(dw[0],dF,true);
dA[dF].bubble=dE.getListeners(dw[0],dF,false);
}}this._cleanUpMetaColumns(dC.length);
var dB=0;

for(var i=0;i<dw.length;i++){var dG=dw[i];
var dD=dG.getTablePaneModel();
dD.setFirstColumnX(dB);
dD.setMaxColumnCount(dC[i]);
dB+=dC[i];
}if(dC.length>dw.length){var dz=this.getTableColumnModel();

for(var i=dw.length;i<dC.length;i++){var dD=this.getNewTablePaneModel()(dz);
dD.setFirstColumnX(dB);
dD.setMaxColumnCount(dC[i]);
dB+=dC[i];
var dG=this.getNewTablePaneScroller()(this);
dG.setTablePaneModel(dD);
dG.addListener(ck,this._onScrollY,this);
for(dF in qx.ui.table.Table.__lL){if(!dA[dF]){break;
}
if(dA[dF].capture&&dA[dF].capture.length>0){var dx=dA[dF].capture;

for(var i=0;i<dx.length;i++){var dy=dx[i].context;

if(!dy){dy=this;
}else if(dy==dw[0]){dy=dG;
}dG.addListener(dF,dx[i].handler,dy,true);
}}
if(dA[dF].bubble&&dA[dF].bubble.length>0){var dI=dA[dF].bubble;

for(var i=0;i<dI.length;i++){var dy=dI[i].context;

if(!dy){dy=this;
}else if(dy==dw[0]){dy=dG;
}dG.addListener(dF,dI[i].handler,dy,false);
}}}var dH=(i==dC.length-1)?1:0;
this.__lH.add(dG,{flex:dH});
dw=this._getPaneScrollerArr();
}}for(var i=0;i<dw.length;i++){var dG=dw[i];
var dJ=(i==(dw.length-1));
dG.getHeader().setHeight(this.getHeaderCellHeight());
dG.setTopRightWidget(dJ?this.getChildControl(bv):null);
}
if(!this.isColumnVisibilityButtonVisible()){this._excludeChildControl(bv);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_applyFocusCellOnMouseMove:function(eR,eS){var eT=this._getPaneScrollerArr();

for(var i=0;i<eT.length;i++){eT[i].setFocusCellOnMouseMove(eR);
}},_applyShowCellFocusIndicator:function(ed,ee){var ef=this._getPaneScrollerArr();

for(var i=0;i<ef.length;i++){ef[i].setShowCellFocusIndicator(ed);
}},_applyKeepFirstVisibleRowComplete:function(eU,eV){var eW=this._getPaneScrollerArr();

for(var i=0;i<eW.length;i++){eW[i].onKeepFirstVisibleRowCompleteChanged();
}},_applyResetSelectionOnHeaderClick:function(y,z){var A=this._getPaneScrollerArr();

for(var i=0;i<A.length;i++){A[i].setResetSelectionOnHeaderClick(y);
}},getSelectionManager:function(){return this.__lI;
},_getPaneScrollerArr:function(){return this.__lH.getChildren();
},getPaneScroller:function(ex){return this._getPaneScrollerArr()[ex];
},_cleanUpMetaColumns:function(ev){var ew=this._getPaneScrollerArr();

if(ew!=null){for(var i=ew.length-1;i>=ev;i--){ew[i].destroy();
}}},_onChangeLocale:function(e){this.updateContent();
this._updateStatusBar();
},_onSelectionChanged:function(bg){var bh=this._getPaneScrollerArr();

for(var i=0;i<bh.length;i++){bh[i].onSelectionChanged();
}this._updateStatusBar();
},_onTableModelMetaDataChanged:function(dL){var dM=this._getPaneScrollerArr();

for(var i=0;i<dM.length;i++){dM[i].onTableModelMetaDataChanged();
}this._updateStatusBar();
},_onTableModelDataChanged:function(eK){var eL=eK.getData();
this._updateTableData(eL.firstRow,eL.lastRow,eL.firstColumn,eL.lastColumn,eL.removeStart,eL.removeCount);
},_updateTableData:function(cO,cP,cQ,cR,cS,cT){var cU=this._getPaneScrollerArr();
if(cT){this.getSelectionModel().removeSelectionInterval(cS,cS+cT);
}
for(var i=0;i<cU.length;i++){cU[i].onTableModelDataChanged(cO,cP,cQ,cR);
}var cV=this.getTableModel().getRowCount();

if(cV!=this.__lN){this.__lN=cV;
this._updateScrollBarVisibility();
this._updateStatusBar();
}},_onScrollY:function(fj){if(!this.__lO){this.__lO=true;
var fk=this._getPaneScrollerArr();

for(var i=0;i<fk.length;i++){fk[i].setScrollY(fj.getData());
}this.__lO=false;
}},_onKeyPress:function(dk){if(!this.getEnabled()){return;
}var ds=this.__lK;
var dp=true;
var dt=dk.getKeyIdentifier();

if(this.isEditing()){if(dk.getModifiers()==0){switch(dt){case cI:this.stopEditing();
var ds=this.__lK;
this.moveFocusedCell(0,1);

if(this.__lK!=ds){dp=this.startEditing();
}break;
case bL:this.cancelEditing();
this.focus();
break;
default:dp=false;
break;
}}}else{if(dk.isCtrlPressed()){dp=true;

switch(dt){case bM:var dq=this.getTableModel().getRowCount();

if(dq>0){this.getSelectionModel().setSelectionInterval(0,dq-1);
}break;
default:dp=false;
break;
}}else{switch(dt){case ca:this.__lI.handleSelectKeyDown(this.__lK,dk);
break;
case bI:case cI:this.startEditing();
dp=true;
break;
case cu:this.setFocusedCell(this.__lJ,0,true);
break;
case cq:var dq=this.getTableModel().getRowCount();
this.setFocusedCell(this.__lJ,dq-1,true);
break;
case cb:this.moveFocusedCell(-1,0);
break;
case bU:this.moveFocusedCell(1,0);
break;
case bl:this.moveFocusedCell(0,-1);
break;
case cn:this.moveFocusedCell(0,1);
break;
case bo:case bP:var dn=this.getPaneScroller(0);
var dr=dn.getTablePane();
var dm=this.getRowHeight();
var dl=(dt==bo)?-1:1;
dq=dr.getVisibleRowCount()-1;
dn.setScrollY(dn.getScrollY()+dl*dq*dm);
this.moveFocusedCell(0,dl*dq);
break;
default:dp=false;
}}}
if(ds!=this.__lK&&this.getRowFocusChangeModifiesSelection()){this.__lI.handleMoveKeyDown(this.__lK,dk);
}
if(dp){dk.preventDefault();
dk.stopPropagation();
}},_onFocusChanged:function(eg){var eh=this._getPaneScrollerArr();

for(var i=0;i<eh.length;i++){eh[i].onFocusChanged();
}},_onColVisibilityChanged:function(ey){var ez=this._getPaneScrollerArr();

for(var i=0;i<ez.length;i++){ez[i].onColVisibilityChanged();
}var eA=ey.getData();

if(this.__lP!=null&&eA.col!=null&&eA.visible!=null){this.__lP[eA.col].setVisible(eA.visible);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColWidthChanged:function(fg){var fh=this._getPaneScrollerArr();

for(var i=0;i<fh.length;i++){var fi=fg.getData();
fh[i].setColumnWidth(fi.col,fi.newWidth);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColOrderChanged:function(B){var C=this._getPaneScrollerArr();

for(var i=0;i<C.length;i++){C[i].onColOrderChanged();
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},getTablePaneScrollerAtPageX:function(eP){var eQ=this._getMetaColumnAtPageX(eP);
return (eQ!=-1)?this.getPaneScroller(eQ):null;
},setFocusedCell:function(a,b,c){if(!this.isEditing()&&(a!=this.__lJ||b!=this.__lK)){if(a===null){a=0;
}this.__lJ=a;
this.__lK=b;
var d=this._getPaneScrollerArr();

for(var i=0;i<d.length;i++){d[i].setFocusedCell(a,b);
}
if(a!==null&&c){this.scrollCellVisible(a,b);
}}},resetSelection:function(){this.getSelectionModel().resetSelection();
},resetCellFocus:function(){this.setFocusedCell(null,null,false);
},getFocusedColumn:function(){return this.__lJ;
},getFocusedRow:function(){return this.__lK;
},highlightFocusedRow:function(de){this.getDataRowRenderer().setHighlightFocusRow(de);
},clearFocusedRowHighlight:function(bd){if(bd){var bf=bd.getRelatedTarget();

if(bf instanceof qx.ui.table.pane.Pane||bf instanceof qx.ui.table.pane.FocusIndicator){return;
}}this.resetCellFocus();
var be=this._getPaneScrollerArr();

for(var i=0;i<be.length;i++){be[i].onFocusChanged();
}},moveFocusedCell:function(I,J){var N=this.__lJ;
var O=this.__lK;

if(N===null||O===null){return;
}
if(I!=0){var M=this.getTableColumnModel();
var x=M.getVisibleX(N);
var L=M.getVisibleColumnCount();
x=qx.lang.Number.limit(x+I,0,L-1);
N=M.getVisibleColumnAtX(x);
}
if(J!=0){var K=this.getTableModel();
O=qx.lang.Number.limit(O+J,0,K.getRowCount()-1);
}this.setFocusedCell(N,O,true);
},scrollCellVisible:function(ei,ej){var ek=this.getTableColumnModel();
var x=ek.getVisibleX(ei);
var el=this._getMetaColumnAtColumnX(x);

if(el!=-1){this.getPaneScroller(el).scrollCellVisible(ei,ej);
}},isEditing:function(){if(this.__lJ!=null){var x=this.getTableColumnModel().getVisibleX(this.__lJ);
var T=this._getMetaColumnAtColumnX(x);
return this.getPaneScroller(T).isEditing();
}return false;
},startEditing:function(){if(this.__lJ!=null){var x=this.getTableColumnModel().getVisibleX(this.__lJ);
var bj=this._getMetaColumnAtColumnX(x);
var bi=this.getPaneScroller(bj).startEditing();
return bi;
}return false;
},stopEditing:function(){if(this.__lJ!=null){var x=this.getTableColumnModel().getVisibleX(this.__lJ);
var eo=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(eo).stopEditing();
}},cancelEditing:function(){if(this.__lJ!=null){var x=this.getTableColumnModel().getVisibleX(this.__lJ);
var dT=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(dT).cancelEditing();
}},updateContent:function(){var U=this._getPaneScrollerArr();

for(var i=0;i<U.length;i++){U[i].getTablePane().updateContent(true);
}},blockHeaderElements:function(){var ff=this._getPaneScrollerArr();

for(var i=0;i<ff.length;i++){ff[i].getHeader().getBlocker().blockContent(20);
}this.getChildControl(bv).getBlocker().blockContent(20);
},unblockHeaderElements:function(){var f=this._getPaneScrollerArr();

for(var i=0;i<f.length;i++){f[i].getHeader().getBlocker().unblockContent();
}this.getChildControl(bv).getBlocker().unblockContent();
},_getMetaColumnAtPageX:function(Q){var R=this._getPaneScrollerArr();

for(var i=0;i<R.length;i++){var S=R[i].getContainerLocation();

if(Q>=S.left&&Q<=S.right){return i;
}}return -1;
},_getMetaColumnAtColumnX:function(da){var dc=this.getMetaColumnCounts();
var dd=0;

for(var i=0;i<dc.length;i++){var db=dc[i];
dd+=db;

if(db==-1||da<dd){return i;
}}return -1;
},_updateStatusBar:function(){var eG=this.getTableModel();

if(this.getStatusBarVisible()){var eH=this.getSelectionModel().getSelectedCount();
var eJ=eG.getRowCount();
var eI;

if(eJ>=0){if(eH==0){eI=this.trn(bJ,bm,eJ,eJ);
}else{eI=this.trn(bk,ce,eJ,eH,eJ);
}}
if(this.__lM){if(eI){eI+=this.__lM;
}else{eI=this.__lM;
}}
if(eI){this.getChildControl(bs).setValue(eI);
}}},_updateScrollerWidths:function(){var er=this._getPaneScrollerArr();

for(var i=0;i<er.length;i++){var et=(i==(er.length-1));
var eu=er[i].getTablePaneModel().getTotalWidth();
er[i].setPaneWidth(eu);
var es=et?1:0;
er[i].setLayoutProperties({flex:es});
}},_updateScrollBarVisibility:function(){if(!this.getBounds()){return;
}var dX=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var eb=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
var dU=this._getPaneScrollerArr();
var dW=false;
var ea=false;

for(var i=0;i<dU.length;i++){var ec=(i==(dU.length-1));
var dV=dU[i].getNeededScrollBars(dW,!ec);

if(dV&dX){dW=true;
}
if(ec&&(dV&eb)){ea=true;
}}for(var i=0;i<dU.length;i++){var ec=(i==(dU.length-1));
var dY;
dU[i].setHorizontalScrollBarVisible(dW);
if(ec){dY=dU[i].getVerticalScrollBarVisible();
}dU[i].setVerticalScrollBarVisible(ec&&ea);
if(ec&&ea!=dY){this.fireDataEvent(cl,ea);
}}},_initColumnMenu:function(){var s=this.getTableModel();
var t=this.getTableColumnModel();
var u=this.getChildControl(bv);
u.empty();
var r=u.getMenu();
var v={table:this,menu:r,columnButton:u};
this.fireDataEvent(cE,v);
this.__lP={};

for(var w=0,l=s.getColumnCount();w<l;w++){var q=u.factory(cA,{text:s.getColumnName(w),column:w,bVisible:t.isColumnVisible(w)});
qx.core.Assert.assertInterface(q,qx.ui.table.IColumnMenuItem);
q.addListener(bB,this._createColumnVisibilityCheckBoxHandler(w),this);
this.__lP[w]=q;
}var v={table:this,menu:r,columnButton:u};
this.fireDataEvent(bE,v);
},_createColumnVisibilityCheckBoxHandler:function(dK){return function(G){var H=this.getTableColumnModel();
H.setColumnVisible(dK,G.getData());
};
},setColumnWidth:function(eB,eC){this.getTableColumnModel().setColumnWidth(eB,eC);
},_onResize:function(){this.fireEvent(cv);
this._updateScrollerWidths();
this._updateScrollBarVisibility();
},addListener:function(V,W,self,X){if(this.self(arguments).__lL[V]){var ba=[V];

for(var i=0,Y=this._getPaneScrollerArr();i<Y.length;i++){ba.push(Y[i].addListener.apply(Y[i],arguments));
}return ba.join(cM);
}else{return qx.ui.core.Widget.prototype.addListener.call(this,V,W,self,X);
}},removeListener:function(df,dg,self,dh){if(this.self(arguments).__lL[df]){for(var i=0,di=this._getPaneScrollerArr();i<di.length;i++){di[i].removeListener.apply(di[i],arguments);
}}else{qx.ui.core.Widget.prototype.removeListener.call(this,df,dg,self,dh);
}},removeListenerById:function(fa){var fe=fa.split(cM);
var fd=fe.shift();

if(this.self(arguments).__lL[fd]){var fc=true;

for(var i=0,fb=this._getPaneScrollerArr();i<fb.length;i++){fc=fb[i].removeListenerById.call(fb[i],fe[i])&&fc;
}return fc;
}else{return qx.ui.core.Widget.prototype.removeListenerById.call(this,fa);
}},destroy:function(){this.getChildControl(bv).getMenu().destroy();
qx.ui.core.Widget.prototype.destroy.call(this);
}},destruct:function(){if(qx.core.Variant.isSet(cJ,cG)){qx.locale.Manager.getInstance().removeListener(cL,this._onChangeLocale,this);
}var fm=this.getSelectionModel();

if(fm){fm.dispose();
}var fl=this.getDataRowRenderer();

if(fl){fl.dispose();
}this._cleanUpMetaColumns(0);
this.getTableColumnModel().dispose();
this._disposeObjects(bN,bS,bp,bp,bX);
this._disposeMap(bK);
}});
})();
(function(){var p="..",o="changeSelection",n="_applySelectionMode",m="]",l="qx.event.type.Event",k="Ranges:",h="qx.ui.table.selection.Model",g=" [";
qx.Class.define(h,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__lS=[];
this.__lT=-1;
this.__lU=-1;
this.hasBatchModeRefCount=0;
this.__lV=false;
},events:{"changeSelection":l},statics:{NO_SELECTION:1,SINGLE_SELECTION:2,SINGLE_INTERVAL_SELECTION:3,MULTIPLE_INTERVAL_SELECTION:4,MULTIPLE_INTERVAL_SELECTION_TOGGLE:5},properties:{selectionMode:{init:2,check:[1,2,3,4,5],apply:n}},members:{__lV:null,__lT:null,__lU:null,__lS:null,_applySelectionMode:function(x){this.resetSelection();
},setBatchMode:function(a){if(a){this.hasBatchModeRefCount+=1;
}else{if(this.hasBatchModeRefCount==0){throw new Error("Try to turn off batch mode althoug it was not turned on.");
}this.hasBatchModeRefCount-=1;

if(this.__lV){this.__lV=false;
this._fireChangeSelection();
}}return this.hasBatchMode();
},hasBatchMode:function(){return this.hasBatchModeRefCount>0;
},getAnchorSelectionIndex:function(){return this.__lT;
},_setAnchorSelectionIndex:function(f){this.__lT=f;
},getLeadSelectionIndex:function(){return this.__lU;
},_setLeadSelectionIndex:function(C){this.__lU=C;
},_getSelectedRangeArr:function(){return this.__lS;
},resetSelection:function(){if(!this.isSelectionEmpty()){this._resetSelection();
this._fireChangeSelection();
}},isSelectionEmpty:function(){return this.__lS.length==0;
},getSelectedCount:function(){var K=0;

for(var i=0;i<this.__lS.length;i++){var J=this.__lS[i];
K+=J.maxIndex-J.minIndex+1;
}return K;
},isSelectedIndex:function(D){for(var i=0;i<this.__lS.length;i++){var E=this.__lS[i];

if(D>=E.minIndex&&D<=E.maxIndex){return true;
}}return false;
},getSelectedRanges:function(){var B=[];

for(var i=0;i<this.__lS.length;i++){B.push({minIndex:this.__lS[i].minIndex,maxIndex:this.__lS[i].maxIndex});
}return B;
},iterateSelection:function(H,I){for(var i=0;i<this.__lS.length;i++){for(var j=this.__lS[i].minIndex;j<=this.__lS[i].maxIndex;j++){H.call(I,j);
}}},setSelectionInterval:function(b,c){var d=this.self(arguments);

switch(this.getSelectionMode()){case d.NO_SELECTION:return;
case d.SINGLE_SELECTION:if(this.isSelectedIndex(c)){return;
}b=c;
break;
case d.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this.setBatchMode(true);

try{for(var i=b;i<=c;i++){if(!this.isSelectedIndex(i)){this._addSelectionInterval(i,i);
}else{this.removeSelectionInterval(i,i);
}}}catch(e){throw e;
}finally{this.setBatchMode(false);
}this._fireChangeSelection();
return;
}this._resetSelection();
this._addSelectionInterval(b,c);
this._fireChangeSelection();
},addSelectionInterval:function(y,z){var A=qx.ui.table.selection.Model;

switch(this.getSelectionMode()){case A.NO_SELECTION:return;
case A.MULTIPLE_INTERVAL_SELECTION:case A.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this._addSelectionInterval(y,z);
this._fireChangeSelection();
break;
default:this.setSelectionInterval(y,z);
break;
}},removeSelectionInterval:function(L,M){this.__lT=L;
this.__lU=M;
var N=Math.min(L,M);
var P=Math.max(L,M);
for(var i=0;i<this.__lS.length;i++){var R=this.__lS[i];

if(R.minIndex>P){break;
}else if(R.maxIndex>=N){var S=(R.minIndex>=N)&&(R.minIndex<=P);
var Q=(R.maxIndex>=N)&&(R.maxIndex<=P);

if(S&&Q){this.__lS.splice(i,1);
i--;
}else if(S){R.minIndex=P+1;
}else if(Q){R.maxIndex=N-1;
}else{var O={minIndex:P+1,maxIndex:R.maxIndex};
this.__lS.splice(i+1,0,O);
R.maxIndex=N-1;
break;
}}}this._fireChangeSelection();
},_resetSelection:function(){this.__lS=[];
this.__lT=-1;
this.__lU=-1;
},_addSelectionInterval:function(q,r){this.__lT=q;
this.__lU=r;
var s=Math.min(q,r);
var u=Math.max(q,r);
var t=0;

for(;t<this.__lS.length;t++){var v=this.__lS[t];

if(v.minIndex>s){break;
}}this.__lS.splice(t,0,{minIndex:s,maxIndex:u});
var w=this.__lS[0];

for(var i=1;i<this.__lS.length;i++){var v=this.__lS[i];

if(w.maxIndex+1>=v.minIndex){w.maxIndex=Math.max(w.maxIndex,v.maxIndex);
this.__lS.splice(i,1);
i--;
}else{w=v;
}}},_dumpRanges:function(){var F=k;

for(var i=0;i<this.__lS.length;i++){var G=this.__lS[i];
F+=g+G.minIndex+p+G.maxIndex+m;
}this.debug(F);
},_fireChangeSelection:function(){if(this.hasBatchMode()){this.__lV=true;
}else{this.fireEvent(o);
}}},destruct:function(){this.__lS=null;
}});
})();
(function(){var bh="dataChanged",bg="qx.event.type.Data",bf="Left",be="Right",bd="hidden",bc="Boolean",bb="Enter",ba="number",Y="changeSelection",X="dataEdited",U="object",W="qx.ui.treevirtual.TreeVirtual",V="string",T="treevirtual";
qx.Class.define(W,{extend:qx.ui.table.Table,construct:function(m,n){if(!n){n={};
}
if(!n.dataModel){n.dataModel=new qx.ui.treevirtual.SimpleTreeDataModel();
}
if(n.treeColumn===undefined){n.treeColumn=0;
n.dataModel.setTreeColumn(n.treeColumn);
}
if(!n.treeDataCellRenderer){n.treeDataCellRenderer=new qx.ui.treevirtual.SimpleTreeDataCellRenderer();
}
if(!n.defaultDataCellRenderer){n.defaultDataCellRenderer=new qx.ui.treevirtual.DefaultDataCellRenderer();
}
if(!n.dataRowRenderer){n.dataRowRenderer=new qx.ui.treevirtual.SimpleTreeDataRowRenderer();
}
if(!n.selectionManager){n.selectionManager=function(bo){return new qx.ui.treevirtual.SelectionManager(bo);
};
}
if(!n.tableColumnModel){n.tableColumnModel=function(w){return new qx.ui.table.columnmodel.Resize(w);
};
}if(typeof (m)==V){m=[m];
}n.dataModel.setColumns(m);
n.dataModel.setTreeColumn(n.treeColumn);
n.dataModel.setTree(this);
qx.ui.table.Table.call(this,n.dataModel,n);
this.addListener(X,function(e){this.getDataModel().setData();
},this);
this.setColumnVisibilityButtonVisible(m.length>1);
this.setRowHeight(16);
this.setMetaColumnCounts(m.length>1?[1,-1]:[1]);
this.setOverflow(bd);
var p=n.treeDataCellRenderer;
var o=n.defaultDataCellRenderer;
var t=this.getTableColumnModel();
var r=this.getDataModel().getTreeColumn();

for(var i=0;i<m.length;i++){t.setDataCellRenderer(i,i==r?p:o);
}this.setDataRowRenderer(n.dataRowRenderer);
this.setFocusCellOnMouseMove(true);
this.setShowCellFocusIndicator(false);
var q=this._getPaneScrollerArr();
for(var i=0;i<q.length;i++){q[i].setSelectBeforeFocus(true);
}},events:{"treeOpenWithContent":bg,"treeOpenWhileEmpty":bg,"treeClose":bg,"changeSelection":bg},statics:{SelectionMode:{NONE:qx.ui.table.selection.Model.NO_SELECTION,SINGLE:qx.ui.table.selection.Model.SINGLE_SELECTION,SINGLE_INTERVAL:qx.ui.table.selection.Model.SINGLE_INTERVAL_SELECTION,MULTIPLE_INTERVAL:qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION,MULTIPLE_INTERVAL_TOGGLE:qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE}},properties:{openCloseClickSelectsRow:{check:bc,init:false},appearance:{refine:true,init:T}},members:{getDataModel:function(){return this.getTableModel();
},setUseTreeLines:function(b){var R=this.getDataModel();
var P=R.getTreeColumn();
var Q=this.getTableColumnModel().getDataCellRenderer(P);
Q.setUseTreeLines(b);
if(R.hasListener(bh)){var S={firstRow:0,lastRow:R.getRowCount()-1,firstColumn:0,lastColumn:R.getColumnCount()-1};
R.fireDataEvent(bh,S);
}},getUseTreeLines:function(){var B=this.getDataModel().getTreeColumn();
var C=this.getTableColumnModel().getDataCellRenderer(B);
return C.getUseTreeLines();
},setAlwaysShowOpenCloseSymbol:function(b){var k=this.getDataModel();
var g=k.getTreeColumn();
var h=this.getTableColumnModel().getDataCellRenderer(g);
h.setAlwaysShowOpenCloseSymbol(b);
if(k.hasListener(bh)){var l={firstRow:0,lastRow:k.getRowCount()-1,firstColumn:0,lastColumn:k.getColumnCount()-1};
k.fireDataEvent(bh,l);
}},setExcludeFirstLevelTreeLines:function(b){var d=this.getDataModel();
var a=d.getTreeColumn();
var c=this.getTableColumnModel().getDataCellRenderer(a);
c.setExcludeFirstLevelTreeLines(b);
if(d.hasListener(bh)){var f={firstRow:0,lastRow:d.getRowCount()-1,firstColumn:0,lastColumn:d.getColumnCount()-1};
d.fireDataEvent(bh,f);
}},getExcludeFirstLevelTreeLines:function(){var u=this.getDataModel().getTreeColumn();
var v=this.getTableColumnModel().getDataCellRenderer(u);
return v.getExcludeFirstLevelTreeLines();
},getAlwaysShowOpenCloseSymbol:function(){var x=this.getDataModel().getTreeColumn();
var y=this.getTableColumnModel().getDataCellRenderer(x);
return y.getAlwaysShowOpenCloseSymbol();
},setSelectionMode:function(bt){this.getSelectionModel().setSelectionMode(bt);
},getSelectionMode:function(){return this.getSelectionModel().getSelectionMode();
},getHierarchy:function(bi){var bm=this;
var bl=[];
var bj;
var bn;

if(typeof (bi)==U){bj=bi;
bn=bj.nodeId;
}else if(typeof (bi)==ba){bn=bi;
}else{throw new Error("Expected node object or node id");
}function bk(z){if(!z){return ;
}var A=bm.getDataModel().getData()[z];
bl.unshift(A.label);
bk(A.parentNodeId);
}bk(bn);
return bl;
},getSelectedNodes:function(){return this.getDataModel().getSelectedNodes();
},_onKeyPress:function(D){if(!this.getEnabled()){return;
}var M=D.getKeyIdentifier();
var I=false;
var K=D.getModifiers();

if(K==0){switch(M){case bb:var F=this.getDataModel();
var G=this.getFocusedColumn();
var J=F.getTreeColumn();

if(G==J){var L=this.getFocusedRow();
var E=F.getNode(L);

if(!E.bHideOpenClose){F.setState(E,{bOpened:!E.bOpened});
}I=true;
}break;
case bf:this.moveFocusedCell(-1,0);
break;
case be:this.moveFocusedCell(1,0);
break;
}}else if(K==qx.event.type.Dom.CTRL_MASK){switch(M){case bf:var F=this.getDataModel();
var L=this.getFocusedRow();
var J=F.getTreeColumn();
var E=F.getNode(L);
if((E.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!E.bHideOpenClose&&E.bOpened){F.setState(E,{bOpened:!E.bOpened});
}this.setFocusedCell(J,L,true);
I=true;
break;
case be:var F=this.getDataModel();
L=this.getFocusedRow();
J=F.getTreeColumn();
E=F.getNode(L);
if((E.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!E.bHideOpenClose&&!E.bOpened){F.setState(E,{bOpened:!E.bOpened});
}this.setFocusedCell(J,L,true);
I=true;
break;
}}else if(K==qx.event.type.Dom.SHIFT_MASK){switch(M){case bf:var F=this.getDataModel();
var L=this.getFocusedRow();
var J=F.getTreeColumn();
var E=F.getNode(L);
if(E.parentNodeId){var H=F.getRowFromNodeId(E.parentNodeId);
this.setFocusedCell(this._focusedCol,H,true);
}I=true;
break;
case be:var F=this.getDataModel();
L=this.getFocusedRow();
J=F.getTreeColumn();
E=F.getNode(L);
if((E.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!E.bHideOpenClose){if(!E.bOpened){F.setState(E,{bOpened:!E.bOpened});
}if(E.children.length>0){this.moveFocusedCell(0,1);
}}I=true;
break;
}}if(I){D.preventDefault();
D.stopPropagation();
}else{qx.ui.table.Table.prototype._onKeyPress.call(this,D);
}},_onSelectionChanged:function(N){this.getDataModel()._clearSelections();
if(this.getSelectionMode()!=qx.ui.treevirtual.TreeVirtual.SelectionMode.NONE){var O=this._calculateSelectedNodes();
this.fireDataEvent(Y,O);
}qx.ui.table.Table.prototype._onSelectionChanged.call(this,N);
},_calculateSelectedNodes:function(){var bs=this.getDataModel();
var bq=this.getSelectionModel().getSelectedRanges();
var br=[];
var bp;

for(var i=0;i<bq.length;i++){for(var j=bq[i].minIndex;j<=bq[i].maxIndex;j++){bp=bs.getNode(j);
bs.setState(bp,{bSelected:true});
br.push(bp);
}}return br;
},setOverflow:function(s){if(s!=bd){throw new Error("Tree overflow must be hidden.  "+"The internal elements of it will scroll.");
}}}});
})();
(function(){var a="qx.ui.table.IRowRenderer";
qx.Interface.define(a,{members:{updateDataRowElement:function(e,f){},getRowHeightStyle:function(c){},createRowStyle:function(b){},getRowClass:function(d){}}});
})();
(function(){var x="",w="table-row-background-even",v="table-row-background-selected",u="table-row",t="background-color:",s="table-row-background-focused",r=';border-bottom: 1px solid ',q=';color:',p="table-row-selected",o="table-row-background-odd",h="default",n="table-row-background-focused-selected",k="qx.ui.table.rowrenderer.Default",g="table-row-line",f="'",j="height:",i=";",l="px;",e="1px solid ",m="Boolean";
qx.Class.define(k,{extend:qx.core.Object,implement:qx.ui.table.IRowRenderer,construct:function(){qx.core.Object.call(this);
this.__lW=x;
this.__lW={};
this.__lX={};
this._renderFont(qx.theme.manager.Font.getInstance().resolve(h));
var b=qx.theme.manager.Color.getInstance();
this.__lX.bgcolFocusedSelected=b.resolve(n);
this.__lX.bgcolFocused=b.resolve(s);
this.__lX.bgcolSelected=b.resolve(v);
this.__lX.bgcolEven=b.resolve(w);
this.__lX.bgcolOdd=b.resolve(o);
this.__lX.colSelected=b.resolve(p);
this.__lX.colNormal=b.resolve(u);
this.__lX.horLine=b.resolve(g);
},properties:{highlightFocusRow:{check:m,init:true}},members:{__lX:null,__lY:null,__lW:null,_insetY:1,_renderFont:function(c){if(c){this.__lY=c.getStyles();
this.__lW=qx.bom.element.Style.compile(this.__lY);
this.__lW=this.__lW.replace(/"/g,f);
}else{this.__lW=x;
this.__lY=qx.bom.Font.getDefaultStyles();
}},updateDataRowElement:function(B,C){var E=this.__lY;
var D=C.style;
qx.bom.element.Style.setStyles(C,E);

if(B.focusedRow&&this.getHighlightFocusRow()){D.backgroundColor=B.selected?this.__lX.bgcolFocusedSelected:this.__lX.bgcolFocused;
}else{if(B.selected){D.backgroundColor=this.__lX.bgcolSelected;
}else{D.backgroundColor=(B.row%2==0)?this.__lX.bgcolEven:this.__lX.bgcolOdd;
}}D.color=B.selected?this.__lX.colSelected:this.__lX.colNormal;
D.borderBottom=e+this.__lX.horLine;
},getRowHeightStyle:function(y){if(qx.bom.client.Feature.CONTENT_BOX){y-=this._insetY;
}return j+y+l;
},createRowStyle:function(z){var A=[];
A.push(i);
A.push(this.__lW);
A.push(t);

if(z.focusedRow&&this.getHighlightFocusRow()){A.push(z.selected?this.__lX.bgcolFocusedSelected:this.__lX.bgcolFocused);
}else{if(z.selected){A.push(this.__lX.bgcolSelected);
}else{A.push((z.row%2==0)?this.__lX.bgcolEven:this.__lX.bgcolOdd);
}}A.push(q);
A.push(z.selected?this.__lX.colSelected:this.__lX.colNormal);
A.push(r,this.__lX.horLine);
return A.join(x);
},getRowClass:function(d){return x;
},getRowAttributes:function(a){return x;
}},destruct:function(){this.__lX=this.__lY=this.__lW=null;
}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__kf:null,__kg:false,__kh:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var o=this.getCommand();

if(o){if(this.__kg){this.__kg=false;
}else{this.__kg=true;
o.execute(this);
}}this.fireEvent(n);
},__ki:function(e){if(this.__kg){this.__kg=false;
return;
}this.__kg=true;
this.execute();
},_applyCommand:function(p,q){if(q!=null){q.removeListenerById(this.__kh);
}
if(p!=null){this.__kh=p.addListener(n,this.__ki,this);
}var t=this.__kf;

if(t==null){this.__kf=t={};
}
for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){q.removeBinding(t[s]);
t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){var u=this.get(s);
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this.__kf=null;
}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(r,s,t){qx.ui.basic.Atom.call(this,r,s);

if(t!=null){this.setCommand(t);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var p=this.hasState(o);
var q=this.hasState(n);

if(p){this.removeState(o);
}
if(q){this.removeState(n);
}else{this.addState(m);

if(p){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var m="pressed",l="hovered",k="changeVisibility",j="qx.ui.menu.Menu",i="submenu",h="Enter",g="contextmenu",f="changeMenu",d="qx.ui.form.MenuButton",c="abandoned",b="_applyMenu";
qx.Class.define(d,{extend:qx.ui.form.Button,construct:function(u,v,w){qx.ui.form.Button.call(this,u,v);
if(w!=null){this.setMenu(w);
}},properties:{menu:{check:j,nullable:true,apply:b,event:f}},members:{_applyMenu:function(r,s){if(s){s.removeListener(k,this._onMenuChange,this);
s.resetOpener();
}
if(r){r.addListener(k,this._onMenuChange,this);
r.setOpener(this);
r.removeState(i);
r.removeState(g);
}},open:function(n){var o=this.getMenu();

if(o){qx.ui.menu.Manager.getInstance().hideAll();
o.setOpener(this);
o.open();
if(n){var p=o.getSelectables()[0];

if(p){o.setSelectedButton(p);
}}}},_onMenuChange:function(e){var a=this.getMenu();

if(a.isVisible()){this.addState(m);
}else{this.removeState(m);
}},_onMouseDown:function(e){var q=this.getMenu();

if(q){if(!q.isVisible()){this.open();
}else{q.exclude();
}e.stopPropagation();
}},_onMouseUp:function(e){qx.ui.form.Button.prototype._onMouseUp.call(this,e);
e.stopPropagation();
},_onMouseOver:function(e){this.addState(l);
},_onMouseOut:function(e){this.removeState(l);
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case h:this.removeState(c);
this.addState(m);
var t=this.getMenu();

if(t){if(!t.isVisible()){this.open();
}else{t.exclude();
}}e.stopPropagation();
}},_onKeyUp:function(e){}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var a="qx.ui.table.IColumnMenuButton";
qx.Interface.define(a,{properties:{menu:{}},members:{factory:function(b,c){return true;
},empty:function(){return true;
}}});
})();
(function(){var f="menu-button",e="table-column-reset-button",d="separator",c="user-button",b="qx.ui.table.columnmenu.Button",a="menu";
qx.Class.define(b,{extend:qx.ui.form.MenuButton,implement:qx.ui.table.IColumnMenuButton,construct:function(){qx.ui.form.MenuButton.call(this);
this.__ma=new qx.ui.core.Blocker(this);
},members:{__mb:null,__ma:null,factory:function(g,h){switch(g){case a:var j=new qx.ui.menu.Menu();
this.setMenu(j);
return j;
case f:var m=new qx.ui.table.columnmenu.MenuItem(h.text);
m.setVisible(h.bVisible);
this.getMenu().add(m);
return m;
case c:var k=new qx.ui.menu.Button(h.text);
k.set({appearance:e});
return k;
case d:return new qx.ui.menu.Separator();
default:throw new Error("Unrecognized factory request: "+g);
}},getBlocker:function(){return this.__ma;
},empty:function(){var n=this.getMenu();
var o=n.getChildren();

for(var i=0,l=o.length;i<l;i++){o[0].destroy();
}}},destruct:function(){this.__ma.dispose();
}});
})();
(function(){var bp="keypress",bo="interval",bn="keydown",bm="mousedown",bl="keyup",bk="__md",bj="blur",bi="Enter",bh="__me",bg="Up",ba="Escape",bf="__mc",bd="qx.ui.menu.Manager",Y="Left",X="Down",bc="Right",bb="singleton",be="Space";
qx.Class.define(bd,{type:bb,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__mc=[];
var o=document.body;
var p=qx.event.Registration;
p.addListener(window.document.documentElement,bm,this._onMouseDown,this,true);
p.addListener(o,bn,this._onKeyUpDown,this,true);
p.addListener(o,bl,this._onKeyUpDown,this,true);
p.addListener(o,bp,this._onKeyPress,this,true);
qx.bom.Element.addListener(window,bj,this.hideAll,this);
this.__md=new qx.event.Timer;
this.__md.addListener(bo,this._onOpenInterval,this);
this.__me=new qx.event.Timer;
this.__me.addListener(bo,this._onCloseInterval,this);
},members:{__mf:null,__mg:null,__md:null,__me:null,__mc:null,_getChild:function(Q,R,S,T){var U=Q.getChildren();
var length=U.length;
var V;

for(var i=R;i<length&&i>=0;i+=S){V=U[i];

if(V.isEnabled()&&!V.isAnonymous()){return V;
}}
if(T){i=i==length?0:length-1;

for(;i!=R;i+=S){V=U[i];

if(V.isEnabled()&&!V.isAnonymous()){return V;
}}}return null;
},_isInMenu:function(z){while(z){if(z instanceof qx.ui.menu.Menu){return true;
}z=z.getLayoutParent();
}return false;
},_getMenuButton:function(b){while(b){if(b instanceof qx.ui.menu.AbstractButton){return b;
}b=b.getLayoutParent();
}return null;
},add:function(O){{};
var P=this.__mc;
P.push(O);
O.setZIndex(1e6+P.length);
},remove:function(m){{};
var n=this.__mc;

if(n){qx.lang.Array.remove(n,m);
}},hideAll:function(){var E=this.__mc;

if(E){for(var i=E.length-1;i>=0;i--){E[i].exclude();
}}},getActiveMenu:function(){var bz=this.__mc;
return bz.length>0?bz[bz.length-1]:null;
},scheduleOpen:function(x){this.cancelClose(x);
if(x.isVisible()){if(this.__mf){this.cancelOpen(this.__mf);
}}else if(this.__mf!=x){this.__mf=x;
this.__md.restartWith(x.getOpenInterval());
}},scheduleClose:function(bD){this.cancelOpen(bD);
if(!bD.isVisible()){if(this.__mg){this.cancelClose(this.__mg);
}}else if(this.__mg!=bD){this.__mg=bD;
this.__me.restartWith(bD.getCloseInterval());
}},cancelOpen:function(W){if(this.__mf==W){this.__md.stop();
this.__mf=null;
}},cancelClose:function(a){if(this.__mg==a){this.__me.stop();
this.__mg=null;
}},_onOpenInterval:function(e){this.__md.stop();
this.__mf.open();
this.__mf=null;
},_onCloseInterval:function(e){this.__me.stop();
this.__mg.exclude();
this.__mg=null;
},_onMouseDown:function(e){var y=e.getTarget();
y=qx.ui.core.Widget.getWidgetByElement(y);
if(y==null){this.hideAll();
return;
}if(y.getMenu&&y.getMenu()&&y.getMenu().isVisible()){return;
}if(this.__mc.length>0&&!this._isInMenu(y)){this.hideAll();
}},__mh:{"Enter":1,"Space":1},__mi:{"Escape":1,"Up":1,"Down":1,"Left":1,"Right":1},_onKeyUpDown:function(e){var M=this.getActiveMenu();

if(!M){return;
}var N=e.getKeyIdentifier();

if(this.__mi[N]||(this.__mh[N]&&M.getSelectedButton())){e.stopPropagation();
}},_onKeyPress:function(e){var g=this.getActiveMenu();

if(!g){return;
}var h=e.getKeyIdentifier();
var k=this.__mi[h];
var j=this.__mh[h];

if(k){switch(h){case bg:this._onKeyPressUp(g);
break;
case X:this._onKeyPressDown(g);
break;
case Y:this._onKeyPressLeft(g);
break;
case bc:this._onKeyPressRight(g);
break;
case ba:this.hideAll();
break;
}e.stopPropagation();
e.preventDefault();
}else if(j){var l=g.getSelectedButton();

if(l){switch(h){case bi:this._onKeyPressEnter(g,l,e);
break;
case be:this._onKeyPressSpace(g,l,e);
break;
}e.stopPropagation();
e.preventDefault();
}}},_onKeyPressUp:function(q){var r=q.getSelectedButton();
var s=q.getChildren();
var u=r?q.indexOf(r)-1:s.length-1;
var t=this._getChild(q,u,-1,true);
if(t){q.setSelectedButton(t);
}else{q.resetSelectedButton();
}},_onKeyPressDown:function(A){var B=A.getSelectedButton();
var D=B?A.indexOf(B)+1:0;
var C=this._getChild(A,D,1,true);
if(C){A.setSelectedButton(C);
}else{A.resetSelectedButton();
}},_onKeyPressLeft:function(F){var K=F.getOpener();

if(!K){return;
}if(K instanceof qx.ui.menu.Button){var H=K.getLayoutParent();
H.resetOpenedButton();
H.setSelectedButton(K);
}else if(K instanceof qx.ui.menubar.Button){var J=K.getMenuBar().getMenuButtons();
var G=J.indexOf(K);
if(G===-1){return;
}var L=null;
var length=J.length;

for(var i=1;i<=length;i++){var I=J[(G-i+length)%length];

if(I.isEnabled()){L=I;
break;
}}
if(L&&L!=K){L.open(true);
}}},_onKeyPressRight:function(bq){var bs=bq.getSelectedButton();
if(bs){var br=bs.getMenu();

if(br){bq.setOpenedButton(bs);
var by=this._getChild(br,0,1);

if(by){br.setSelectedButton(by);
}return;
}}else if(!bq.getOpenedButton()){var by=this._getChild(bq,0,1);

if(by){bq.setSelectedButton(by);

if(by.getMenu()){bq.setOpenedButton(by);
}return;
}}var bw=bq.getOpener();
if(bw instanceof qx.ui.menu.Button&&bs){while(bw){bw=bw.getLayoutParent();

if(bw instanceof qx.ui.menu.Menu){bw=bw.getOpener();

if(bw instanceof qx.ui.menubar.Button){break;
}}else{break;
}}
if(!bw){return;
}}if(bw instanceof qx.ui.menubar.Button){var bv=bw.getMenuBar().getMenuButtons();
var bt=bv.indexOf(bw);
if(bt===-1){return;
}var bx=null;
var length=bv.length;

for(var i=1;i<=length;i++){var bu=bv[(bt+i)%length];

if(bu.isEnabled()){bx=bu;
break;
}}
if(bx&&bx!=bw){bx.open(true);
}}},_onKeyPressEnter:function(c,d,e){if(d.hasListener(bp)){var f=e.clone();
f.setBubbles(false);
f.setTarget(d);
d.dispatchEvent(f);
}this.hideAll();
},_onKeyPressSpace:function(bA,bB,e){if(bB.hasListener(bp)){var bC=e.clone();
bC.setBubbles(false);
bC.setTarget(bB);
bB.dispatchEvent(bC);
}}},destruct:function(){var w=qx.event.Registration;
var v=document.body;
w.removeListener(window.document.documentElement,bm,this._onMouseDown,this,true);
w.removeListener(v,bn,this._onKeyUpDown,this,true);
w.removeListener(v,bl,this._onKeyUpDown,this,true);
w.removeListener(v,bp,this._onKeyPress,this,true);
this._disposeObjects(bk,bh);
this._disposeArray(bf);
}});
})();
(function(){var o="indexOf",n="addAfter",m="add",l="addBefore",k="_",j="addAt",i="hasChildren",h="removeAt",g="removeAll",f="getChildren",d="remove",e="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(e,{members:{__mj:function(w,x,y,z){var A=this.getChildrenContainer();

if(A===this){w=k+w;
}return (A[w])(x,y,z);
},getChildren:function(){return this.__mj(f);
},hasChildren:function(){return this.__mj(i);
},add:function(q,r){return this.__mj(m,q,r);
},remove:function(p){return this.__mj(d,p);
},removeAll:function(){return this.__mj(g);
},indexOf:function(B){return this.__mj(o,B);
},addAt:function(C,D,E){this.__mj(j,C,D,E);
},addBefore:function(s,t,u){this.__mj(l,s,t,u);
},addAfter:function(a,b,c){this.__mj(n,a,b,c);
},removeAt:function(v){this.__mj(h,v);
}}});
})();
(function(){var F="slidebar",E="Integer",D="resize",C="qx.ui.core.Widget",B="selected",A="visible",z="Boolean",y="mouseout",x="excluded",w="menu",U="_applySelectedButton",T="_applySpacingY",S="_blocker",R="_applyCloseInterval",Q="_applyBlockerColor",P="_applyIconColumnWidth",O="mouseover",N="_applyArrowColumnWidth",M="qx.ui.menu.Menu",L="Color",J="Number",K="_applyOpenInterval",H="_applySpacingX",I="_applyBlockerOpacity",G="_applyOpenedButton";
qx.Class.define(M,{extend:qx.ui.core.Widget,include:[qx.ui.core.MPlacement,qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.Layout);
var a=this.getApplicationRoot();
a.add(this);
this.addListener(O,this._onMouseOver);
this.addListener(y,this._onMouseOut);
this.addListener(D,this._onResize,this);
a.addListener(D,this._onResize,this);
this._blocker=new qx.ui.core.Blocker(a);
this.initVisibility();
this.initKeepFocus();
this.initKeepActive();
},properties:{appearance:{refine:true,init:w},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},visibility:{refine:true,init:x},keepFocus:{refine:true,init:true},keepActive:{refine:true,init:true},spacingX:{check:E,apply:H,init:0,themeable:true},spacingY:{check:E,apply:T,init:0,themeable:true},iconColumnWidth:{check:E,init:0,themeable:true,apply:P},arrowColumnWidth:{check:E,init:0,themeable:true,apply:N},blockerColor:{check:L,init:null,nullable:true,apply:Q,themeable:true},blockerOpacity:{check:J,init:1,apply:I,themeable:true},selectedButton:{check:C,nullable:true,apply:U},openedButton:{check:C,nullable:true,apply:G},opener:{check:C,nullable:true},openInterval:{check:E,themeable:true,init:250,apply:K},closeInterval:{check:E,themeable:true,init:250,apply:R},blockBackground:{check:z,themeable:true,init:false}},members:{__mk:null,__ml:null,_blocker:null,open:function(){if(this.getOpener()!=null){this.placeToWidget(this.getOpener());
this.__mn();
this.show();
this._placementTarget=this.getOpener();
}else{this.warn("The menu instance needs a configured 'opener' widget!");
}},openAtMouse:function(e){this.placeToMouse(e);
this.__mn();
this.show();
this._placementTarget={left:e.getDocumentLeft(),top:e.getDocumentTop()};
},openAtPoint:function(r){this.placeToPoint(r);
this.__mn();
this.show();
this._placementTarget=r;
},addSeparator:function(){this.add(new qx.ui.menu.Separator);
},getColumnSizes:function(){return this._getMenuLayout().getColumnSizes();
},getSelectables:function(){var bo=[];
var bp=this.getChildren();

for(var i=0;i<bp.length;i++){if(bp[i].isEnabled()){bo.push(bp[i]);
}}return bo;
},_applyIconColumnWidth:function(bb,bc){this._getMenuLayout().setIconColumnWidth(bb);
},_applyArrowColumnWidth:function(bg,bh){this._getMenuLayout().setArrowColumnWidth(bg);
},_applySpacingX:function(bm,bn){this._getMenuLayout().setColumnSpacing(bm);
},_applySpacingY:function(j,k){this._getMenuLayout().setSpacing(j);
},_applyVisibility:function(bi,bj){qx.ui.core.Widget.prototype._applyVisibility.call(this,bi,bj);
var bk=qx.ui.menu.Manager.getInstance();

if(bi===A){bk.add(this);
var bl=this.getParentMenu();

if(bl){bl.setOpenedButton(this.getOpener());
}}else if(bj===A){bk.remove(this);
var bl=this.getParentMenu();

if(bl&&bl.getOpenedButton()==this.getOpener()){bl.resetOpenedButton();
}this.resetOpenedButton();
this.resetSelectedButton();
}this.__mm();
},__mm:function(){if(this.isVisible()){if(this.getBlockBackground()){var p=this.getZIndex();
this._blocker.blockContent(p-1);
}}else{if(this._blocker.isContentBlocked()){this._blocker.unblockContent();
}}},getParentMenu:function(){var bd=this.getOpener();

if(!bd||!(bd instanceof qx.ui.menu.AbstractButton)){return null;
}
while(bd&&!(bd instanceof qx.ui.menu.Menu)){bd=bd.getLayoutParent();
}return bd;
},_applySelectedButton:function(d,f){if(f){f.removeState(B);
}
if(d){d.addState(B);
}},_applyOpenedButton:function(g,h){if(h){h.getMenu().exclude();
}
if(g){g.getMenu().open();
}},_applyBlockerColor:function(b,c){this._blocker.setColor(b);
},_applyBlockerOpacity:function(be,bf){this._blocker.setOpacity(be);
},getChildrenContainer:function(){return this.getChildControl(F,true)||this;
},_createChildControlImpl:function(V){var W;

switch(V){case F:var W=new qx.ui.menu.MenuSlideBar();
var Y=this._getLayout();
this._setLayout(new qx.ui.layout.Grow());
var X=W.getLayout();
W.setLayout(Y);
X.dispose();
var ba=qx.lang.Array.clone(this.getChildren());

for(var i=0;i<ba.length;i++){W.add(ba[i]);
}this.removeListener(D,this._onResize,this);
W.getChildrenContainer().addListener(D,this._onResize,this);
this._add(W);
break;
}return W||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,V);
},_getMenuLayout:function(){if(this.hasChildControl(F)){return this.getChildControl(F).getChildrenContainer().getLayout();
}else{return this._getLayout();
}},_getMenuBounds:function(){if(this.hasChildControl(F)){return this.getChildControl(F).getChildrenContainer().getBounds();
}else{return this.getBounds();
}},_computePlacementSize:function(){return this._getMenuBounds();
},__mn:function(){var u=this._getMenuBounds();

if(!u){this.addListenerOnce(D,this.__mn,this);
return;
}var t=this.getLayoutParent().getBounds().height;
var top=this.getLayoutProperties().top;
var v=this.getLayoutProperties().left;
if(top<0){this._assertSlideBar(function(){this.setHeight(u.height+top);
this.moveTo(v,0);
});
}else if(top+u.height>t){this._assertSlideBar(function(){this.setHeight(t-top);
});
}else{this.setHeight(null);
}},_assertSlideBar:function(s){if(this.hasChildControl(F)){return s.call(this);
}this.__ml=s;
qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.getChildControl(F);

if(this.__ml){this.__ml.call(this);
delete this.__ml;
}},_onResize:function(){if(this.isVisible()){var q=this._placementTarget;

if(!q){return;
}else if(q instanceof qx.ui.core.Widget){this.placeToWidget(q);
}else if(q.top!==undefined){this.placeToPoint(q);
}else{throw new Error("Unknown target: "+q);
}this.__mn();
}},_onMouseOver:function(e){var m=qx.ui.menu.Manager.getInstance();
m.cancelClose(this);
var n=e.getTarget();

if(n.isEnabled()&&n instanceof qx.ui.menu.AbstractButton){this.setSelectedButton(n);
var l=n.getMenu&&n.getMenu();

if(l){l.setOpener(n);
m.scheduleOpen(l);
this.__mk=l;
}else{var o=this.getOpenedButton();

if(o){m.scheduleClose(o.getMenu());
}
if(this.__mk){m.cancelOpen(this.__mk);
this.__mk=null;
}}}else if(!this.getOpenedButton()){this.resetSelectedButton();
}},_onMouseOut:function(e){var bq=qx.ui.menu.Manager.getInstance();
if(!qx.ui.core.Widget.contains(this,e.getRelatedTarget())){var br=this.getOpenedButton();
br?this.setSelectedButton(br):this.resetSelectedButton();
if(br){bq.cancelClose(br.getMenu());
}if(this.__mk){bq.cancelOpen(this.__mk);
}}}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.ui.menu.Manager.getInstance().remove(this);
}this.getApplicationRoot().removeListener(D,this._onResize,this);
this._placementTarget=null;
this._disposeObjects(S);
}});
})();
(function(){var c="Integer",b="_applyLayoutChange",a="qx.ui.menu.Layout";
qx.Class.define(a,{extend:qx.ui.layout.VBox,properties:{columnSpacing:{check:c,init:0,apply:b},spanColumn:{check:c,init:1,nullable:true,apply:b},iconColumnWidth:{check:c,init:0,themeable:true,apply:b},arrowColumnWidth:{check:c,init:0,themeable:true,apply:b}},members:{__mo:null,_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,g,j;
var e=this.getSpanColumn();
var h=this.__mo=[0,0,0,0];
var m=this.getColumnSpacing();
var k=0;
var f=0;
for(var i=0,l=q.length;i<l;i++){o=q[i];

if(o.isAnonymous()){continue;
}g=o.getChildrenSizes();

for(var n=0;n<g.length;n++){if(e!=null&&n==e&&g[e+1]==0){k=Math.max(k,g[n]);
}else{h[n]=Math.max(h[n],g[n]);
}}var d=q[i].getInsets();
f=Math.max(f,d.left+d.right);
}if(e!=null&&h[e]+m+h[e+1]<k){h[e]=k-h[e+1]-m;
}if(k==0){j=m*2;
}else{j=m*3;
}if(h[0]==0){h[0]=this.getIconColumnWidth();
}if(h[3]==0){h[3]=this.getArrowColumnWidth();
}var p=qx.ui.layout.VBox.prototype._computeSizeHint.call(this).height;
return {minHeight:p,height:p,width:qx.lang.Array.sum(h)+f+j};
},getColumnSizes:function(){return this.__mo||null;
}},destruct:function(){this.__mo=null;
}});
})();
(function(){var b="menu-separator",a="qx.ui.menu.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true}}});
})();
(function(){var w="icon",v="label",u="arrow",t="shortcut",s="changeLocale",r="qx.dynlocale",q="submenu",p="on",o="String",n="qx.ui.menu.Menu",h="qx.ui.menu.AbstractButton",m="keypress",k="",g="_applyIcon",f="mouseup",j="abstract",i="_applyLabel",l="_applyMenu",d="changeCommand";
qx.Class.define(h,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],type:j,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.ButtonLayout);
this.addListener(f,this._onMouseUp);
this.addListener(m,this._onKeyPress);
this.addListener(d,this._onChangeCommand,this);
},properties:{blockToolTip:{refine:true,init:true},label:{check:o,apply:i,nullable:true},menu:{check:n,apply:l,nullable:true},icon:{check:o,apply:g,themeable:true,nullable:true}},members:{_createChildControlImpl:function(x){var y;

switch(x){case w:y=new qx.ui.basic.Image;
y.setAnonymous(true);
this._add(y,{column:0});
break;
case v:y=new qx.ui.basic.Label;
y.setAnonymous(true);
this._add(y,{column:1});
break;
case t:y=new qx.ui.basic.Label;
y.setAnonymous(true);
this._add(y,{column:2});
break;
case u:y=new qx.ui.basic.Image;
y.setAnonymous(true);
this._add(y,{column:3});
break;
}return y||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,x);
},_forwardStates:{selected:1},getChildrenSizes:function(){var G=0,H=0,I=0,M=0;

if(this._isChildControlVisible(w)){var N=this.getChildControl(w);
G=N.getMarginLeft()+N.getSizeHint().width+N.getMarginRight();
}
if(this._isChildControlVisible(v)){var K=this.getChildControl(v);
H=K.getMarginLeft()+K.getSizeHint().width+K.getMarginRight();
}
if(this._isChildControlVisible(t)){var J=this.getChildControl(t);
I=J.getMarginLeft()+J.getSizeHint().width+J.getMarginRight();
}
if(this._isChildControlVisible(u)){var L=this.getChildControl(u);
M=L.getMarginLeft()+L.getSizeHint().width+L.getMarginRight();
}return [G,H,I,M];
},_onMouseUp:function(e){},_onKeyPress:function(e){},_onChangeCommand:function(e){var B=e.getData();

if(qx.core.Variant.isSet(r,p)){var z=e.getOldData();

if(!z){qx.locale.Manager.getInstance().addListener(s,this._onChangeLocale,this);
}
if(!B){qx.locale.Manager.getInstance().removeListener(s,this._onChangeLocale,this);
}}var A=B!=null?B.toString():k;
this.getChildControl(t).setValue(A);
},_onChangeLocale:qx.core.Variant.select(r,{"on":function(e){var c=this.getCommand();

if(c!=null){this.getChildControl(t).setValue(c.toString());
}},"off":null}),_applyIcon:function(E,F){if(E){this._showChildControl(w).setSource(E);
}else{this._excludeChildControl(w);
}},_applyLabel:function(a,b){if(a){this._showChildControl(v).setValue(a);
}else{this._excludeChildControl(v);
}},_applyMenu:function(C,D){if(D){D.resetOpener();
D.removeState(q);
}
if(C){this._showChildControl(u);
C.setOpener(this);
C.addState(q);
}else{this._excludeChildControl(u);
}}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}
if(qx.core.Variant.isSet(r,p)){qx.locale.Manager.getInstance().removeListener(s,this._onChangeLocale,this);
}}});
})();
(function(){var g="middle",f="qx.ui.menu.ButtonLayout",e="left";
qx.Class.define(f,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(j,k){var v=this._getLayoutChildren();
var u;
var n;
var o=[];

for(var i=0,l=v.length;i<l;i++){u=v[i];
n=u.getLayoutProperties().column;
o[n]=u;
}var t=this.__mp(v[0]);
var w=t.getColumnSizes();
var q=t.getSpacingX();
var p=qx.lang.Array.sum(w)+q*(w.length-1);

if(p<j){w[1]+=j-p;
}var x=0,top=0;
var r=qx.ui.layout.Util;

for(var i=0,l=w.length;i<l;i++){u=o[i];

if(u){var m=u.getSizeHint();
var top=r.computeVerticalAlignOffset(u.getAlignY()||g,m.height,k,0,0);
var s=r.computeHorizontalAlignOffset(u.getAlignX()||e,m.width,w[i],u.getMarginLeft(),u.getMarginRight());
u.renderLayout(x+s,top,m.width,m.height);
}x+=w[i]+q;
}},__mp:function(h){while(!(h instanceof qx.ui.menu.Menu)){h=h.getLayoutParent();
}return h;
},_computeSizeHint:function(){var c=this._getLayoutChildren();
var b=0;
var d=0;

for(var i=0,l=c.length;i<l;i++){var a=c[i].getSizeHint();
d+=a.width;
b=Math.max(b,a.height);
}return {width:d,height:b};
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var A="horizontal",z="scrollpane",y="vertical",x="button-backward",w="button-forward",v="content",u="execute",t="qx.ui.container.SlideBar",s="scrollY",r="removeChildWidget",n="scrollX",q="_applyOrientation",p="mousewheel",m="Integer",l="slidebar",o="update";
qx.Class.define(t,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(I){qx.ui.core.Widget.call(this);
var J=this.getChildControl(z);
this._add(J,{flex:1});

if(I!=null){this.setOrientation(I);
}else{this.initOrientation();
}this.addListener(p,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:l},orientation:{check:[A,y],init:A,apply:q},scrollStep:{check:m,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(v);
},_createChildControlImpl:function(j){var k;

switch(j){case w:k=new qx.ui.form.RepeatButton;
k.addListener(u,this._onExecuteForward,this);
k.setFocusable(false);
this._addAt(k,2);
break;
case x:k=new qx.ui.form.RepeatButton;
k.addListener(u,this._onExecuteBackward,this);
k.setFocusable(false);
this._addAt(k,0);
break;
case v:k=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){k.addListener(r,this._onRemoveChild,this);
}this.getChildControl(z).add(k);
break;
case z:k=new qx.ui.core.scroll.ScrollPane();
k.addListener(o,this._onResize,this);
k.addListener(n,this._onScroll,this);
k.addListener(s,this._onScroll,this);
break;
}return k||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,j);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(E){var F=this.getChildControl(z);

if(this.getOrientation()===A){F.scrollByX(E);
}else{F.scrollByY(E);
}},scrollTo:function(G){var H=this.getChildControl(z);

if(this.getOrientation()===A){H.scrollToX(G);
}else{H.scrollToY(G);
}},_applyOrientation:function(d,f){var i=[this.getLayout(),this._getLayout()];
var h=this.getChildControl(w);
var g=this.getChildControl(x);
if(f==y){h.removeState(y);
g.removeState(y);
h.addState(A);
g.addState(A);
}else if(f==A){h.removeState(A);
g.removeState(A);
h.addState(y);
g.addState(y);
}
if(d==A){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(i[0]){i[0].dispose();
}
if(i[1]){i[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(z).getChildren()[0];

if(!content){return;
}var B=this.getInnerSize();
var D=content.getBounds();
var C=(this.getOrientation()===A)?D.width>B.width:D.height>B.height;

if(C){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(z).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var b=this.getChildControl(z);

if(this.getOrientation()===A){var a=b.getScrollX();
var c=b.getScrollMaxX();
}else{var a=b.getScrollY();
var c=b.getScrollMaxY();
}this.getChildControl(x).setEnabled(a>0);
this.getChildControl(w).setEnabled(a<c);
},_showArrows:function(){this._showChildControl(w);
this._showChildControl(x);
},_hideArrows:function(){this._excludeChildControl(w);
this._excludeChildControl(x);
this.scrollTo(0);
}}});
})();
(function(){var f="execute",e="button-backward",d="vertical",c="button-forward",b="menu-slidebar",a="qx.ui.menu.MenuSlideBar";
qx.Class.define(a,{extend:qx.ui.container.SlideBar,construct:function(){qx.ui.container.SlideBar.call(this,d);
},properties:{appearance:{refine:true,init:b}},members:{_createChildControlImpl:function(g){var h;

switch(g){case c:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteForward,this);
this._addAt(h,2);
break;
case e:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteBackward,this);
this._addAt(h,0);
break;
}return h||qx.ui.container.SlideBar.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var o="pressed",n="abandoned",m="Integer",l="hovered",k="qx.event.type.Event",j="Enter",i="Space",h="press",g="qx.ui.form.RepeatButton",f="release",b="interval",d="__mq",c="execute";
qx.Class.define(g,{extend:qx.ui.form.Button,construct:function(p,q){qx.ui.form.Button.call(this,p,q);
this.__mq=new qx.event.AcceleratingTimer();
this.__mq.addListener(b,this._onInterval,this);
},events:{"execute":k,"press":k,"release":k},properties:{interval:{check:m,init:100},firstInterval:{check:m,init:500},minTimer:{check:m,init:20},timerDecrease:{check:m,init:2}},members:{__mr:null,__mq:null,press:function(){if(this.isEnabled()){if(!this.hasState(o)){this.__ms();
}this.removeState(n);
this.addState(o);
}},release:function(a){if(!this.isEnabled()){return;
}if(this.hasState(o)){if(!this.__mr){this.execute();
}}this.removeState(o);
this.removeState(n);
this.__mt();
},_applyEnabled:function(r,s){qx.ui.form.Button.prototype._applyEnabled.call(this,r,s);

if(!r){this.removeState(o);
this.removeState(n);
this.__mt();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
this.__mq.start();
}this.addState(l);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(l);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
this.__mq.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__ms();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(n)){this.addState(l);

if(this.hasState(o)&&!this.__mr){this.execute();
}}this.__mt();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case j:case i:if(this.hasState(o)){if(!this.__mr){this.execute();
}this.removeState(o);
this.removeState(n);
e.stopPropagation();
this.__mt();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case j:case i:this.removeState(n);
this.addState(o);
e.stopPropagation();
this.__ms();
}},_onInterval:function(e){this.__mr=true;
this.fireEvent(c);
},__ms:function(){this.fireEvent(h);
this.__mr=false;
this.__mq.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(n);
this.addState(o);
},__mt:function(){this.fireEvent(f);
this.__mq.stop();
this.removeState(n);
this.removeState(o);
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="__mu",a="qx.event.AcceleratingTimer";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__mu=new qx.event.Timer(this.getInterval());
this.__mu.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__mu:null,__mv:null,start:function(){this.__mu.setInterval(this.getFirstInterval());
this.__mu.start();
},stop:function(){this.__mu.stop();
this.__mv=null;
},_onInterval:function(){this.__mu.stop();

if(this.__mv==null){this.__mv=this.getInterval();
}this.__mv=Math.max(this.getMinimum(),this.__mv-this.getDecrease());
this.__mu.setInterval(this.__mv);
this.__mu.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var F="resize",E="scrollY",D="update",C="scrollX",B="_applyScrollX",A="_applyScrollY",z="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",w="appear",v="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",u="qx.event.type.Event",s="qx.ui.core.scroll.ScrollPane",t="scroll";
qx.Class.define(s,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(F,this._onUpdate);
var k=this.getContentElement();
k.addListener(t,this._onScroll,this);
k.addListener(w,this._onAppear,this);
},events:{update:u},properties:{scrollX:{check:z,apply:B,event:C,init:0},scrollY:{check:v,apply:A,event:E,init:0}},members:{add:function(M){var N=this._getChildren()[0];

if(N){this._remove(N);
N.removeListener(F,this._onUpdate,this);
}
if(M){this._add(M);
M.addListener(F,this._onUpdate,this);
}},remove:function(j){if(j){this._remove(j);
j.removeListener(F,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(D);
},_onScroll:function(e){var n=this.getContentElement();
this.setScrollX(n.getScrollX());
this.setScrollY(n.getScrollY());
},_onAppear:function(e){var J=this.getContentElement();
var G=this.getScrollX();
var H=J.getScrollX();

if(G!=H){J.scrollToX(G);
}var K=this.getScrollY();
var I=J.getScrollY();

if(K!=I){J.scrollToY(K);
}},getItemTop:function(L){var top=0;

do{top+=L.getBounds().top;
L=L.getLayoutParent();
}while(L&&L!==this);
return top;
},getItemBottom:function(a){return this.getItemTop(a)+a.getBounds().height;
},getItemLeft:function(p){var q=0;
var parent;

do{q+=p.getBounds().left;
parent=p.getLayoutParent();

if(parent){q+=parent.getInsets().left;
}p=parent;
}while(p&&p!==this);
return q;
},getItemRight:function(r){return this.getItemLeft(r)+r.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var m=this.getInnerSize();
var l=this.getScrollSize();

if(m&&l){return Math.max(0,l.width-m.width);
}return 0;
},getScrollMaxY:function(){var d=this.getInnerSize();
var c=this.getScrollSize();

if(d&&c){return Math.max(0,c.height-d.height);
}return 0;
},scrollToX:function(f){var g=this.getScrollMaxX();

if(f<0){f=0;
}else if(f>g){f=g;
}this.setScrollX(f);
},scrollToY:function(h){var i=this.getScrollMaxY();

if(h<0){h=0;
}else if(h>i){h=i;
}this.setScrollY(h);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(b){this.getContentElement().scrollToX(b);
},_applyScrollY:function(o){this.getContentElement().scrollToY(o);
}}});
})();
(function(){var k="Integer",j="hovered",i="hover-button",h="__mw",g="interval",f="mouseover",d="mouseout",c="qx.ui.form.HoverButton";
qx.Class.define(c,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(a,b){qx.ui.basic.Atom.call(this,a,b);
this.addListener(f,this._onMouseOver,this);
this.addListener(d,this._onMouseOut,this);
this.__mw=new qx.event.AcceleratingTimer();
this.__mw.addListener(g,this._onInterval,this);
},properties:{appearance:{refine:true,init:i},interval:{check:k,init:80},firstInterval:{check:k,init:200},minTimer:{check:k,init:20},timerDecrease:{check:k,init:2}},members:{__mw:null,_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.__mw.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.addState(j);
},_onMouseOut:function(e){this.__mw.stop();
this.removeState(j);

if(!this.isEnabled()||e.getTarget()!==this){return;
}},_onInterval:function(){if(this.isEnabled()){this.execute();
}else{this.__mw.stop();
}}},destruct:function(){this._disposeObjects(h);
}});
})();
(function(){var b="qx.ui.menu.Button",a="menu-button";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,construct:function(c,d,f,g){qx.ui.menu.AbstractButton.call(this);
if(c!=null){this.setLabel(c);
}
if(d!=null){this.setIcon(d);
}
if(f!=null){this.setCommand(f);
}
if(g!=null){this.setMenu(g);
}},properties:{appearance:{refine:true,init:a}},members:{_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
if(this.getMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var k="pressed",j="hovered",i="inherit",h="qx.ui.menubar.Button",g="keydown",f="menubar-button",d="keyup";
qx.Class.define(h,{extend:qx.ui.form.MenuButton,construct:function(a,b,c){qx.ui.form.MenuButton.call(this,a,b,c);
this.removeListener(g,this._onKeyDown);
this.removeListener(d,this._onKeyUp);
},properties:{appearance:{refine:true,init:f},show:{refine:true,init:i},focusable:{refine:true,init:false}},members:{getMenuBar:function(){var parent=this;

while(parent){if(parent instanceof qx.ui.toolbar.ToolBar){return parent;
}parent=parent.getLayoutParent();
}return null;
},open:function(n){qx.ui.form.MenuButton.prototype.open.call(this,n);
var menubar=this.getMenuBar();
menubar._setAllowMenuOpenHover(true);
},_onMenuChange:function(e){var l=this.getMenu();
var menubar=this.getMenuBar();

if(l.isVisible()){this.addState(k);
if(menubar){menubar.setOpenMenu(l);
}}else{this.removeState(k);
if(menubar&&menubar.getOpenMenu()==l){menubar.resetOpenMenu();
menubar._setAllowMenuOpenHover(false);
}}},_onMouseUp:function(e){qx.ui.form.MenuButton.prototype._onMouseUp.call(this,e);
var m=this.getMenu();

if(m&&m.isVisible()&&!this.hasState(k)){this.addState(k);
}},_onMouseOver:function(e){this.addState(j);
if(this.getMenu()){var menubar=this.getMenuBar();

if(menubar._isAllowMenuOpenHover()){qx.ui.menu.Manager.getInstance().hideAll();
menubar._setAllowMenuOpenHover(true);
if(this.isEnabled()){this.open();
}}}}}});
})();
(function(){var o="both",n="qx.ui.menu.Menu",m="_applySpacing",k="icon",j="label",h="changeShow",g="Integer",f="qx.ui.toolbar.ToolBar",e="toolbar",d="changeOpenMenu";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:qx.ui.core.MChildrenHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
},properties:{appearance:{refine:true,init:e},openMenu:{check:n,event:d,nullable:true},show:{init:o,check:[o,j,k],inheritable:true,event:h},spacing:{nullable:true,check:g,themeable:true,apply:m}},members:{__mx:false,_setAllowMenuOpenHover:function(p){this.__mx=p;
},_isAllowMenuOpenHover:function(){return this.__mx;
},_applySpacing:function(q,r){var s=this._getLayout();
q==null?s.resetSpacing():s.setSpacing(q);
},addSpacer:function(){var t=new qx.ui.core.Spacer;
this._add(t,{flex:1});
return t;
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var b=this.getChildren();
var a=[];
var c;

for(var i=0,l=b.length;i<l;i++){c=b[i];

if(c instanceof qx.ui.menubar.Button){a.push(c);
}else if(c instanceof qx.ui.toolbar.Part){a.push.apply(a,c.getMenuButtons());
}}return a;
}}});
})();
(function(){var b="toolbar-separator",a="qx.ui.toolbar.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true},width:{refine:true,init:0},height:{refine:true,init:0}}});
})();
(function(){var s="container",r="handle",q="both",p="Integer",o="middle",n="qx.ui.toolbar.Part",m="icon",k="label",j="changeShow",h="_applySpacing",g="toolbar/part";
qx.Class.define(n,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox);
this._createChildControl(r);
},properties:{appearance:{refine:true,init:g},show:{init:q,check:[q,k,m],inheritable:true,event:j},spacing:{nullable:true,check:p,themeable:true,apply:h}},members:{_createChildControlImpl:function(t){var u;

switch(t){case r:u=new qx.ui.basic.Image();
u.setAlignY(o);
this._add(u);
break;
case s:u=new qx.ui.toolbar.PartContainer;
this._add(u);
break;
}return u||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,t);
},getChildrenContainer:function(){return this.getChildControl(s);
},_applySpacing:function(a,b){var c=this.getChildControl(s).getLayout();
a==null?c.resetSpacing():c.setSpacing(a);
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var e=this.getChildren();
var d=[];
var f;

for(var i=0,l=e.length;i<l;i++){f=e[i];

if(f instanceof qx.ui.menubar.Button){d.push(f);
}}return d;
}}});
})();
(function(){var f="both",e="toolbar/part/container",d="icon",c="changeShow",b="qx.ui.toolbar.PartContainer",a="label";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
this._setLayout(new qx.ui.layout.HBox);
},properties:{appearance:{refine:true,init:e},show:{init:f,check:[f,a,d],inheritable:true,event:c}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var h="checked",g="menu-checkbox",f="Boolean",d="_applyValue",c="changeValue",b="qx.ui.menu.CheckBox",a="execute";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,implement:[qx.ui.form.IBooleanForm],construct:function(k,l){qx.ui.menu.AbstractButton.call(this);
if(k!=null){if(k.translate){this.setLabel(k.translate());
}else{this.setLabel(k);
}}
if(l!=null){this.setMenu(l);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:f,init:false,apply:d,event:c,nullable:true}},members:{_applyValue:function(i,j){i?this.addState(h):this.removeState(h);
},_onExecute:function(e){this.toggleValue();
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var b="qx.ui.table.IColumnMenuItem",a="qx.event.type.Data";
qx.Interface.define(b,{properties:{visible:{}},events:{changeVisible:a}});
})();
(function(){var g="changeVisible",f="qx.ui.table.columnmenu.MenuItem",d="_applyVisible",c="Boolean",b="changeValue";
qx.Class.define(f,{extend:qx.ui.menu.CheckBox,implement:qx.ui.table.IColumnMenuItem,properties:{visible:{check:c,init:true,apply:d,event:g}},construct:function(a){qx.ui.menu.CheckBox.call(this,a);
this.addListener(b,function(e){this.bInListener=true;
this.setVisible(e.getData());
this.bInListener=false;
});
},members:{__my:false,_applyVisible:function(h,i){if(!this.bInListener){this.setValue(h);
}}}});
})();
(function(){var i="qx.ui.table.selection.Model",h="qx.ui.table.selection.Manager";
qx.Class.define(h,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
},properties:{selectionModel:{check:i}},members:{__mz:null,handleMouseDown:function(a,b){if(b.isLeftPressed()){var c=this.getSelectionModel();

if(!c.isSelectedIndex(a)){this._handleSelectEvent(a,b);
this.__mz=true;
}else{this.__mz=false;
}}else if(b.isRightPressed()&&b.getModifiers()==0){var c=this.getSelectionModel();

if(!c.isSelectedIndex(a)){c.setSelectionInterval(a,a);
}}},handleMouseUp:function(l,m){if(m.isLeftPressed()&&!this.__mz){this._handleSelectEvent(l,m);
}},handleClick:function(j,k){},handleSelectKeyDown:function(n,o){this._handleSelectEvent(n,o);
},handleMoveKeyDown:function(d,e){var g=this.getSelectionModel();

switch(e.getModifiers()){case 0:g.setSelectionInterval(d,d);
break;
case qx.event.type.Dom.SHIFT_MASK:var f=g.getAnchorSelectionIndex();

if(f==-1){g.setSelectionInterval(d,d);
}else{g.setSelectionInterval(f,d);
}break;
}},_handleSelectEvent:function(p,q){var t=this.getSelectionModel();
var r=t.getLeadSelectionIndex();
var s=t.getAnchorSelectionIndex();

if(q.isShiftPressed()){if(p!=r||t.isSelectionEmpty()){if(s==-1){s=p;
}
if(q.isCtrlOrCommandPressed()){t.addSelectionInterval(s,p);
}else{t.setSelectionInterval(s,p);
}}}else if(q.isCtrlOrCommandPressed()){if(t.isSelectedIndex(p)){t.removeSelectionInterval(p,p);
}else{t.addSelectionInterval(p,p);
}}else{t.setSelectionInterval(p,p);
}}}});
})();
(function(){var c="qx.ui.table.IHeaderRenderer";
qx.Interface.define(c,{members:{createHeaderCell:function(d){return true;
},updateHeaderCell:function(a,b){return true;
}}});
})();
(function(){var b="qx.ui.table.headerrenderer.Default",a="String";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.table.IHeaderRenderer,statics:{STATE_SORTED:"sorted",STATE_SORTED_ASCENDING:"sortedAscending"},properties:{toolTip:{check:a,init:null,nullable:true}},members:{createHeaderCell:function(c){var d=new qx.ui.table.headerrenderer.HeaderCell();
this.updateHeaderCell(c,d);
return d;
},updateHeaderCell:function(e,f){var g=qx.ui.table.headerrenderer.Default;
if(e.name&&e.name.translate){f.setLabel(e.name.translate());
}else{f.setLabel(e.name);
}var h=f.getToolTip();

if(this.getToolTip()!=null){if(h==null){h=new qx.ui.tooltip.ToolTip(this.getToolTip());
f.setToolTip(h);
qx.util.DisposeUtil.disposeTriggeredBy(h,f);
}else{h.setLabel(this.getToolTip());
}}e.sorted?f.addState(g.STATE_SORTED):f.removeState(g.STATE_SORTED);
e.sortedAscending?f.addState(g.STATE_SORTED_ASCENDING):f.removeState(g.STATE_SORTED_ASCENDING);
}}});
})();
(function(){var a="qx.ui.table.ICellRenderer";
qx.Interface.define(a,{members:{createDataCellHtml:function(b,c){return true;
}}});
})();
(function(){var v="",u="px;",t=".qooxdoo-table-cell {",s="qooxdoo-table-cell",r='" ',q="nowrap",p="default",o="qx.client",n="}",m="width:",T=".qooxdoo-table-cell-right { text-align:right } ",S="0px 6px",R='<div class="',Q="0px",P="height:",O="1px solid ",N=".qooxdoo-table-cell-bold { font-weight:bold } ",M="table-row-line",L="String",K='>',C="mshtml",D='</div>',A="ellipsis",B="content-box",y='left:',z="qx.ui.table.cellrenderer.Abstract",w='" style="',x="abstract",E="none",F="hidden",H="} ",G='px;',J=".qooxdoo-table-cell-italic { font-style:italic} ",I="absolute";
qx.Class.define(z,{type:x,implement:qx.ui.table.ICellRenderer,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
var i=qx.ui.table.cellrenderer.Abstract;

if(!i.__mA){var k=qx.theme.manager.Color.getInstance();
i.__mA=this.self(arguments);
var j=t+
qx.bom.element.Style.compile({position:I,top:Q,overflow:F,whiteSpace:q,borderRight:O+k.resolve(M),padding:S,cursor:p,textOverflow:A,userSelect:E})+H+T+J+N;

if(!qx.core.Variant.isSet(o,C)){j+=t+qx.bom.element.BoxSizing.compile(B)+n;
}i.__mA.stylesheet=qx.bom.Stylesheet.createElement(j);
}},properties:{defaultCellStyle:{init:null,check:L,nullable:true}},members:{_insetX:6+6+1,_insetY:0,_getCellClass:function(U){return s;
},_getCellStyle:function(l){return l.style||v;
},_getCellAttributes:function(V){return v;
},_getContentHtml:function(a){return a.value||v;
},_getCellSizeStyle:function(b,c,d,e){var f=v;

if(qx.bom.client.Feature.CONTENT_BOX){b-=d;
c-=e;
}f+=m+Math.max(b,0)+u;
f+=P+Math.max(c,0)+u;
return f;
},createDataCellHtml:function(g,h){h.push(R,this._getCellClass(g),w,y,g.styleLeft,G,this._getCellSizeStyle(g.styleWidth,g.styleHeight,this._insetX,this._insetY),this._getCellStyle(g),r,this._getCellAttributes(g),K+this._getContentHtml(g),D);
}}});
})();
(function(){var h="",g="number",f="Boolean",e="qx.ui.table.cellrenderer.Default",d=" qooxdoo-table-cell-bold",c=" qooxdoo-table-cell-right",b=" qooxdoo-table-cell-italic",a="string";
qx.Class.define(e,{extend:qx.ui.table.cellrenderer.Abstract,statics:{STYLEFLAG_ALIGN_RIGHT:1,STYLEFLAG_BOLD:2,STYLEFLAG_ITALIC:4,_numberFormat:null},properties:{useAutoAlign:{check:f,init:true}},members:{_getStyleFlags:function(o){if(this.getUseAutoAlign()){if(typeof o.value==g){return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
}}return 0;
},_getCellClass:function(l){var m=qx.ui.table.cellrenderer.Abstract.prototype._getCellClass.call(this,l);

if(!m){return h;
}var n=this._getStyleFlags(l);

if(n&qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT){m+=c;
}
if(n&qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD){m+=d;
}
if(n&qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC){m+=b;
}return m;
},_getContentHtml:function(p){return qx.bom.String.escape(this._formatValue(p));
},_formatValue:function(i){var k=i.value;
var j;

if(k==null){return h;
}
if(typeof k==a){return k;
}else if(typeof k==g){if(!qx.ui.table.cellrenderer.Default._numberFormat){qx.ui.table.cellrenderer.Default._numberFormat=new qx.util.format.NumberFormat();
qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
}var j=qx.ui.table.cellrenderer.Default._numberFormat.format(k);
}else if(k instanceof Date){j=qx.util.format.DateFormat.getDateInstance().format(k);
}else{j=k;
}return j;
}}});
})();
(function(){var a="qx.ui.table.ICellEditorFactory";
qx.Interface.define(a,{members:{createCellEditor:function(b){return true;
},getCellEditorValue:function(c){return true;
}}});
})();
(function(){var h="",g="Function",f="abstract",e="number",d="appear",c="qx.ui.table.celleditor.AbstractField";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.ui.table.ICellEditorFactory,type:f,properties:{validationFunction:{check:g,nullable:true,init:null}},members:{_createEditor:function(){throw new Error("Abstract method call!");
},createCellEditor:function(a){var b=this._createEditor();
b.originalValue=a.value;

if(a.value===null||a.value===undefined){a.value=h;
}b.setValue(h+a.value);
b.addListener(d,function(){b.selectAllText();
});
return b;
},getCellEditorValue:function(i){var k=i.getValue();
var j=this.getValidationFunction();

if(j){k=j(k,i.originalValue);
}
if(typeof i.originalValue==e){k=parseFloat(k);
}return k;
}}});
})();
(function(){var d="number",c="qx.ui.table.celleditor.TextField",b="table-editor-textfield";
qx.Class.define(c,{extend:qx.ui.table.celleditor.AbstractField,members:{getCellEditorValue:function(e){var g=e.getValue();
var f=this.getValidationFunction();

if(f){g=f(g,e.originalValue);
}
if(typeof e.originalValue==d){if(g!=null){g=parseFloat(g);
}}return g;
},_createEditor:function(){var a=new qx.ui.form.TextField();
a.setAppearance(b);
return a;
}}});
})();
(function(){var C="qx.event.type.Data",B="visibilityChanged",A="orderChanged",z="visibilityChangedPre",y="widthChanged",w="qx.ui.table.columnmodel.Basic",v="__mH",u="__mG",t="__mI";
qx.Class.define(w,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__mB=[];
this.__mC=[];
},events:{"widthChanged":C,"visibilityChangedPre":C,"visibilityChanged":C,"orderChanged":C},statics:{DEFAULT_WIDTH:100,DEFAULT_HEADER_RENDERER:qx.ui.table.headerrenderer.Default,DEFAULT_DATA_RENDERER:qx.ui.table.cellrenderer.Default,DEFAULT_EDITOR_FACTORY:qx.ui.table.celleditor.TextField},members:{__mD:null,__mE:null,__mC:null,__mB:null,__mF:null,__mG:null,__mH:null,__mI:null,init:function(W){{};
this.__mF=[];
var ba=qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
var bb=this.__mG||(this.__mG=new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
var Y=this.__mH||(this.__mH=new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
var X=this.__mI||(this.__mI=new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
this.__mB=[];
this.__mC=[];

for(var bd=0;bd<W;bd++){this.__mF[bd]={width:ba,headerRenderer:bb,dataRenderer:Y,editorFactory:X};
this.__mB[bd]=bd;
this.__mC[bd]=bd;
}this.__mE=null;

for(var bd=0;bd<W;bd++){var bc={col:bd,visible:true};
this.fireDataEvent(z,bc);
this.fireDataEvent(B,bc);
}},getVisibleColumns:function(){return this.__mC!=null?this.__mC:[];
},setColumnWidth:function(Q,R){{};
var T=this.__mF[Q].width;

if(T!=R){this.__mF[Q].width=R;
var S={col:Q,newWidth:R,oldWidth:T};
this.fireDataEvent(y,S);
}},getColumnWidth:function(bj){{};
return this.__mF[bj].width;
},setHeaderCellRenderer:function(E,F){{};
var G=this.__mF[E].headerRenderer;

if(G!==this.__mG){G.dispose();
}this.__mF[E].headerRenderer=F;
},getHeaderCellRenderer:function(V){{};
return this.__mF[V].headerRenderer;
},setDataCellRenderer:function(a,b){{};
var c=this.__mF[a].dataRenderer;

if(c!==this.__mH){c.dispose();
}this.__mF[a].dataRenderer=b;
},getDataCellRenderer:function(bf){{};
return this.__mF[bf].dataRenderer;
},setCellEditorFactory:function(m,n){{};
var o=this.__mF[m].headerRenderer;

if(o!==this.__mI){o.dispose();
}this.__mF[m].editorFactory=n;
},getCellEditorFactory:function(D){{};
return this.__mF[D].editorFactory;
},_getColToXPosMap:function(){if(this.__mE==null){this.__mE={};

for(var bi=0;bi<this.__mB.length;bi++){var bh=this.__mB[bi];
this.__mE[bh]={overX:bi};
}
for(var bg=0;bg<this.__mC.length;bg++){var bh=this.__mC[bg];
this.__mE[bh].visX=bg;
}}return this.__mE;
},getVisibleColumnCount:function(){return this.__mC!=null?this.__mC.length:0;
},getVisibleColumnAtX:function(U){{};
return this.__mC[U];
},getVisibleX:function(e){{};
return this._getColToXPosMap()[e].visX;
},getOverallColumnCount:function(){return this.__mB.length;
},getOverallColumnAtX:function(f){{};
return this.__mB[f];
},getOverallX:function(be){{};
return this._getColToXPosMap()[be].overX;
},isColumnVisible:function(d){{};
return (this._getColToXPosMap()[d].visX!=null);
},setColumnVisible:function(H,I){{};

if(I!=this.isColumnVisible(H)){if(I){var O=this._getColToXPosMap();
var L=O[H].overX;

if(L==null){throw new Error("Showing column failed: "+H+". The column is not added to this TablePaneModel.");
}var M;

for(var x=L+1;x<this.__mB.length;x++){var N=this.__mB[x];
var J=O[N].visX;

if(J!=null){M=J;
break;
}}if(M==null){M=this.__mC.length;
}this.__mC.splice(M,0,H);
}else{var K=this.getVisibleX(H);
this.__mC.splice(K,1);
}this.__mE=null;
if(!this.__mD){var P={col:H,visible:I};
this.fireDataEvent(z,P);
this.fireDataEvent(B,P);
}}},moveColumn:function(g,h){{};
this.__mD=true;
var l=this.__mB[g];
var j=this.isColumnVisible(l);

if(j){this.setColumnVisible(l,false);
}this.__mB.splice(g,1);
this.__mB.splice(h,0,l);
this.__mE=null;

if(j){this.setColumnVisible(l,true);
}this.__mD=false;
var k={col:l,fromOverXPos:g,toOverXPos:h};
this.fireDataEvent(A,k);
},setColumnsOrder:function(p){{};

if(p.length==this.__mB.length){this.__mD=true;
var s=new Array(p.length);

for(var q=0;q<this.__mB.length;q++){var r=this.isColumnVisible(q);
s[q]=r;

if(r){this.setColumnVisible(q,false);
}}this.__mB=qx.lang.Array.clone(p);
this.__mE=null;
for(var q=0;q<this.__mB.length;q++){if(s[q]){this.setColumnVisible(q,true);
}}this.__mD=false;
this.fireDataEvent(A);
}else{throw new Error("setColumnsOrder: Invalid number of column positions given, expected "+this.__mB.length+", got "+p.length);
}}},destruct:function(){for(var i=0;i<this.__mF.length;i++){this.__mF[i].headerRenderer.dispose();
this.__mF[i].dataRenderer.dispose();
this.__mF[i].editorFactory.dispose();
}this.__mB=this.__mC=this.__mF=this.__mE=null;
this._disposeObjects(u,v,t);
}});
})();
(function(){var k="icon",j="label",i="String",h="sort-icon",g="_applySortIcon",f="_applyIcon",e="table-header-cell",d="qx.ui.table.headerrenderer.HeaderCell",c="_applyLabel";
qx.Class.define(d,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
var r=new qx.ui.layout.Grid();
r.setRowFlex(0,1);
r.setColumnFlex(1,1);
r.setColumnFlex(2,1);
this.setLayout(r);
},properties:{appearance:{refine:true,init:e},label:{check:i,init:null,nullable:true,apply:c},sortIcon:{check:i,init:null,nullable:true,apply:g,themeable:true},icon:{check:i,init:null,nullable:true,apply:f}},members:{_applyLabel:function(n,o){if(n){this._showChildControl(j).setValue(n);
}else{this._excludeChildControl(j);
}},_applySortIcon:function(l,m){if(l){this._showChildControl(h).setSource(l);
}else{this._excludeChildControl(h);
}},_applyIcon:function(a,b){if(a){this._showChildControl(k).setSource(a);
}else{this._excludeChildControl(k);
}},_createChildControlImpl:function(p){var q;

switch(p){case j:q=new qx.ui.basic.Label(this.getLabel()).set({anonymous:true,allowShrinkX:true});
this._add(q,{row:0,column:1});
break;
case h:q=new qx.ui.basic.Image(this.getSortIcon());
q.setAnonymous(true);
this._add(q,{row:0,column:2});
break;
case k:q=new qx.ui.basic.Image(this.getIcon()).set({anonymous:true,allowShrinkX:true});
this._add(q,{row:0,column:0});
break;
}return q||qx.ui.container.Composite.prototype._createChildControlImpl.call(this,p);
}}});
})();
(function(){var cK="left",cJ="top",cI="_applyLayoutChange",cH="hAlign",cG="flex",cF="vAlign",cE="Integer",cD="minWidth",cC="width",cB="minHeight",cy="qx.ui.layout.Grid",cA="height",cz="maxHeight",cx="maxWidth";
qx.Class.define(cy,{extend:qx.ui.layout.Abstract,construct:function(cY,da){qx.ui.layout.Abstract.call(this);
this.__mJ=[];
this.__mK=[];

if(cY){this.setSpacingX(cY);
}
if(da){this.setSpacingY(da);
}},properties:{spacingX:{check:cE,init:0,apply:cI},spacingY:{check:cE,init:0,apply:cI}},members:{__mL:null,__mJ:null,__mK:null,__mM:null,__mN:null,__mO:null,__mP:null,__mQ:null,__mR:null,verifyLayoutProperty:null,__mS:function(){var E=[];
var D=[];
var F=[];
var B=-1;
var A=-1;
var H=this._getLayoutChildren();

for(var i=0,l=H.length;i<l;i++){var C=H[i];
var G=C.getLayoutProperties();
var I=G.row;
var z=G.column;
G.colSpan=G.colSpan||1;
G.rowSpan=G.rowSpan||1;
if(I==null||z==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+C+"' must be defined!");
}
if(E[I]&&E[I][z]){throw new Error("Cannot add widget '"+C+"'!. "+"There is already a widget '"+E[I][z]+"' in this cell ("+I+", "+z+")");
}
for(var x=z;x<z+G.colSpan;x++){for(var y=I;y<I+G.rowSpan;y++){if(E[y]==undefined){E[y]=[];
}E[y][x]=C;
A=Math.max(A,x);
B=Math.max(B,y);
}}
if(G.rowSpan>1){F.push(C);
}
if(G.colSpan>1){D.push(C);
}}for(var y=0;y<=B;y++){if(E[y]==undefined){E[y]=[];
}}this.__mL=E;
this.__mM=D;
this.__mN=F;
this.__mO=B;
this.__mP=A;
this.__mQ=null;
this.__mR=null;
delete this._invalidChildrenCache;
},_setRowData:function(ce,cf,cg){var ch=this.__mJ[ce];

if(!ch){this.__mJ[ce]={};
this.__mJ[ce][cf]=cg;
}else{ch[cf]=cg;
}},_setColumnData:function(ci,cj,ck){var cl=this.__mK[ci];

if(!cl){this.__mK[ci]={};
this.__mK[ci][cj]=ck;
}else{cl[cj]=ck;
}},setSpacing:function(cN){this.setSpacingY(cN);
this.setSpacingX(cN);
return this;
},setColumnAlign:function(cm,cn,co){{};
this._setColumnData(cm,cH,cn);
this._setColumnData(cm,cF,co);
this._applyLayoutChange();
return this;
},getColumnAlign:function(cL){var cM=this.__mK[cL]||{};
return {vAlign:cM.vAlign||cJ,hAlign:cM.hAlign||cK};
},setRowAlign:function(cu,cv,cw){{};
this._setRowData(cu,cH,cv);
this._setRowData(cu,cF,cw);
this._applyLayoutChange();
return this;
},getRowAlign:function(bP){var bQ=this.__mJ[bP]||{};
return {vAlign:bQ.vAlign||cJ,hAlign:bQ.hAlign||cK};
},getCellWidget:function(bs,bt){if(this._invalidChildrenCache){this.__mS();
}var bs=this.__mL[bs]||{};
return bs[bt]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__mS();
}return this.__mO+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__mS();
}return this.__mP+1;
},getCellAlign:function(cO,cP){var cV=cJ;
var cT=cK;
var cU=this.__mJ[cO];
var cR=this.__mK[cP];
var cQ=this.__mL[cO][cP];

if(cQ){var cS={vAlign:cQ.getAlignY(),hAlign:cQ.getAlignX()};
}else{cS={};
}if(cS.vAlign){cV=cS.vAlign;
}else if(cU&&cU.vAlign){cV=cU.vAlign;
}else if(cR&&cR.vAlign){cV=cR.vAlign;
}if(cS.hAlign){cT=cS.hAlign;
}else if(cR&&cR.hAlign){cT=cR.hAlign;
}else if(cU&&cU.hAlign){cT=cU.hAlign;
}return {vAlign:cV,hAlign:cT};
},setColumnFlex:function(dU,dV){this._setColumnData(dU,cG,dV);
this._applyLayoutChange();
return this;
},getColumnFlex:function(bu){var bv=this.__mK[bu]||{};
return bv.flex!==undefined?bv.flex:0;
},setRowFlex:function(cs,ct){this._setRowData(cs,cG,ct);
this._applyLayoutChange();
return this;
},getRowFlex:function(cp){var cq=this.__mJ[cp]||{};
var cr=cq.flex!==undefined?cq.flex:0;
return cr;
},setColumnMaxWidth:function(dY,ea){this._setColumnData(dY,cx,ea);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(e){var f=this.__mK[e]||{};
return f.maxWidth!==undefined?f.maxWidth:Infinity;
},setColumnWidth:function(bA,bB){this._setColumnData(bA,cC,bB);
this._applyLayoutChange();
return this;
},getColumnWidth:function(by){var bz=this.__mK[by]||{};
return bz.width!==undefined?bz.width:null;
},setColumnMinWidth:function(db,dc){this._setColumnData(db,cD,dc);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(c){var d=this.__mK[c]||{};
return d.minWidth||0;
},setRowMaxHeight:function(a,b){this._setRowData(a,cz,b);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(bq){var br=this.__mJ[bq]||{};
return br.maxHeight||Infinity;
},setRowHeight:function(cW,cX){this._setRowData(cW,cA,cX);
this._applyLayoutChange();
return this;
},getRowHeight:function(dW){var dX=this.__mJ[dW]||{};
return dX.height!==undefined?dX.height:null;
},setRowMinHeight:function(bC,bD){this._setRowData(bC,cB,bD);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(bw){var bx=this.__mJ[bw]||{};
return bx.minHeight||0;
},__mT:function(bR){var bV=bR.getSizeHint();
var bU=bR.getMarginLeft()+bR.getMarginRight();
var bT=bR.getMarginTop()+bR.getMarginBottom();
var bS={height:bV.height+bT,width:bV.width+bU,minHeight:bV.minHeight+bT,minWidth:bV.minWidth+bU,maxHeight:bV.maxHeight+bT,maxWidth:bV.maxWidth+bU};
return bS;
},_fixHeightsRowSpan:function(bc){var bn=this.getSpacingY();

for(var i=0,l=this.__mN.length;i<l;i++){var bf=this.__mN[i];
var bh=this.__mT(bf);
var bi=bf.getLayoutProperties();
var be=bi.row;
var bl=bn*(bi.rowSpan-1);
var bd=bl;
var bk={};

for(var j=0;j<bi.rowSpan;j++){var bp=bi.row+j;
var bg=bc[bp];
var bo=this.getRowFlex(bp);

if(bo>0){bk[bp]={min:bg.minHeight,value:bg.height,max:bg.maxHeight,flex:bo};
}bl+=bg.height;
bd+=bg.minHeight;
}if(bl<bh.height){var bm=qx.ui.layout.Util.computeFlexOffsets(bk,bh.height,bl);

for(var j=0;j<bi.rowSpan;j++){var bj=bm[be+j]?bm[be+j].offset:0;
bc[be+j].height+=bj;
}}if(bd<bh.minHeight){var bm=qx.ui.layout.Util.computeFlexOffsets(bk,bh.minHeight,bd);

for(var j=0;j<bi.rowSpan;j++){var bj=bm[be+j]?bm[be+j].offset:0;
bc[be+j].minHeight+=bj;
}}}},_fixWidthsColSpan:function(g){var n=this.getSpacingX();

for(var i=0,l=this.__mM.length;i<l;i++){var h=this.__mM[i];
var m=this.__mT(h);
var p=h.getLayoutProperties();
var k=p.column;
var v=n*(p.colSpan-1);
var o=v;
var q={};
var s;

for(var j=0;j<p.colSpan;j++){var w=p.column+j;
var u=g[w];
var t=this.getColumnFlex(w);
if(t>0){q[w]={min:u.minWidth,value:u.width,max:u.maxWidth,flex:t};
}v+=u.width;
o+=u.minWidth;
}if(v<m.width){var r=qx.ui.layout.Util.computeFlexOffsets(q,m.width,v);

for(var j=0;j<p.colSpan;j++){s=r[k+j]?r[k+j].offset:0;
g[k+j].width+=s;
}}if(o<m.minWidth){var r=qx.ui.layout.Util.computeFlexOffsets(q,m.minWidth,o);

for(var j=0;j<p.colSpan;j++){s=r[k+j]?r[k+j].offset:0;
g[k+j].minWidth+=s;
}}}},_getRowHeights:function(){if(this.__mQ!=null){return this.__mQ;
}var bN=[];
var bG=this.__mO;
var bF=this.__mP;

for(var bO=0;bO<=bG;bO++){var bH=0;
var bJ=0;
var bI=0;

for(var bM=0;bM<=bF;bM++){var bE=this.__mL[bO][bM];

if(!bE){continue;
}var bK=bE.getLayoutProperties().rowSpan||0;

if(bK>1){continue;
}var bL=this.__mT(bE);

if(this.getRowFlex(bO)>0){bH=Math.max(bH,bL.minHeight);
}else{bH=Math.max(bH,bL.height);
}bJ=Math.max(bJ,bL.height);
}var bH=Math.max(bH,this.getRowMinHeight(bO));
var bI=this.getRowMaxHeight(bO);

if(this.getRowHeight(bO)!==null){var bJ=this.getRowHeight(bO);
}else{var bJ=Math.max(bH,Math.min(bJ,bI));
}bN[bO]={minHeight:bH,height:bJ,maxHeight:bI};
}
if(this.__mN.length>0){this._fixHeightsRowSpan(bN);
}this.__mQ=bN;
return bN;
},_getColWidths:function(){if(this.__mR!=null){return this.__mR;
}var dh=[];
var de=this.__mP;
var dg=this.__mO;

for(var dm=0;dm<=de;dm++){var dk=0;
var dj=0;
var df=Infinity;

for(var dn=0;dn<=dg;dn++){var dd=this.__mL[dn][dm];

if(!dd){continue;
}var di=dd.getLayoutProperties().colSpan||0;

if(di>1){continue;
}var dl=this.__mT(dd);

if(this.getColumnFlex(dm)>0){dj=Math.max(dj,dl.minWidth);
}else{dj=Math.max(dj,dl.width);
}dk=Math.max(dk,dl.width);
}var dj=Math.max(dj,this.getColumnMinWidth(dm));
var df=this.getColumnMaxWidth(dm);

if(this.getColumnWidth(dm)!==null){var dk=this.getColumnWidth(dm);
}else{var dk=Math.max(dj,Math.min(dk,df));
}dh[dm]={minWidth:dj,width:dk,maxWidth:df};
}
if(this.__mM.length>0){this._fixWidthsColSpan(dh);
}this.__mR=dh;
return dh;
},_getColumnFlexOffsets:function(U){var V=this.getSizeHint();
var ba=U-V.width;

if(ba==0){return {};
}var X=this._getColWidths();
var W={};

for(var i=0,l=X.length;i<l;i++){var bb=X[i];
var Y=this.getColumnFlex(i);

if((Y<=0)||(bb.width==bb.maxWidth&&ba>0)||(bb.width==bb.minWidth&&ba<0)){continue;
}W[i]={min:bb.minWidth,value:bb.width,max:bb.maxWidth,flex:Y};
}return qx.ui.layout.Util.computeFlexOffsets(W,U,V.width);
},_getRowFlexOffsets:function(bW){var bX=this.getSizeHint();
var cb=bW-bX.height;

if(cb==0){return {};
}var cc=this._getRowHeights();
var bY={};

for(var i=0,l=cc.length;i<l;i++){var cd=cc[i];
var ca=this.getRowFlex(i);

if((ca<=0)||(cd.height==cd.maxHeight&&cb>0)||(cd.height==cd.minHeight&&cb<0)){continue;
}bY[i]={min:cd.minHeight,value:cd.height,max:cd.maxHeight,flex:ca};
}return qx.ui.layout.Util.computeFlexOffsets(bY,bW,bX.height);
},renderLayout:function(dp,dq){if(this._invalidChildrenCache){this.__mS();
}var dE=qx.ui.layout.Util;
var ds=this.getSpacingX();
var dy=this.getSpacingY();
var dJ=this._getColWidths();
var dI=this._getColumnFlexOffsets(dp);
var dt=[];
var dL=this.__mP;
var dr=this.__mO;
var dK;

for(var dM=0;dM<=dL;dM++){dK=dI[dM]?dI[dM].offset:0;
dt[dM]=dJ[dM].width+dK;
}var dB=this._getRowHeights();
var dD=this._getRowFlexOffsets(dq);
var dS=[];

for(var dz=0;dz<=dr;dz++){dK=dD[dz]?dD[dz].offset:0;
dS[dz]=dB[dz].height+dK;
}var dT=0;

for(var dM=0;dM<=dL;dM++){var top=0;

for(var dz=0;dz<=dr;dz++){var dG=this.__mL[dz][dM];
if(!dG){top+=dS[dz]+dy;
continue;
}var du=dG.getLayoutProperties();
if(du.row!==dz||du.column!==dM){top+=dS[dz]+dy;
continue;
}var dR=ds*(du.colSpan-1);

for(var i=0;i<du.colSpan;i++){dR+=dt[dM+i];
}var dH=dy*(du.rowSpan-1);

for(var i=0;i<du.rowSpan;i++){dH+=dS[dz+i];
}var dv=dG.getSizeHint();
var dP=dG.getMarginTop();
var dF=dG.getMarginLeft();
var dC=dG.getMarginBottom();
var dx=dG.getMarginRight();
var dA=Math.max(dv.minWidth,Math.min(dR-dF-dx,dv.maxWidth));
var dQ=Math.max(dv.minHeight,Math.min(dH-dP-dC,dv.maxHeight));
var dN=this.getCellAlign(dz,dM);
var dO=dT+dE.computeHorizontalAlignOffset(dN.hAlign,dA,dR,dF,dx);
var dw=top+dE.computeVerticalAlignOffset(dN.vAlign,dQ,dH,dP,dC);
dG.renderLayout(dO,dw,dA,dQ);
top+=dS[dz]+dy;
}dT+=dt[dM]+ds;
}},invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);
this.__mR=null;
this.__mQ=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__mS();
}var N=this._getColWidths();
var P=0,Q=0;

for(var i=0,l=N.length;i<l;i++){var R=N[i];

if(this.getColumnFlex(i)>0){P+=R.minWidth;
}else{P+=R.width;
}Q+=R.width;
}var S=this._getRowHeights();
var L=0,O=0;

for(var i=0,l=S.length;i<l;i++){var T=S[i];

if(this.getRowFlex(i)>0){L+=T.minHeight;
}else{L+=T.height;
}O+=T.height;
}var K=this.getSpacingX()*(N.length-1);
var J=this.getSpacingY()*(S.length-1);
var M={minWidth:P+K,width:Q+K,minHeight:L+J,height:O+J};
return M;
}},destruct:function(){this.__mL=this.__mJ=this.__mK=this.__mM=this.__mN=this.__mR=this.__mQ=null;
}});
})();
(function(){var i="",h="<br",g=" &nbsp;",f="<br>",e=" ",d="\n",c="qx.bom.String";
qx.Class.define(c,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(b){return qx.util.StringEscape.escape(b,qx.bom.String.FROM_CHARCODE);
},unescape:function(a){return qx.util.StringEscape.unescape(a,qx.bom.String.TO_CHARCODE);
},fromText:function(o){return qx.bom.String.escape(o).replace(/(  |\n)/g,function(k){var l={"  ":g,"\n":f};
return l[k]||k;
});
},toText:function(n){return qx.bom.String.unescape(n.replace(/\s+|<([^>])+>/gi,function(j){if(j.indexOf(h)===0){return d;
}else if(j.length>0&&j.replace(/^\s*/,i).replace(/\s*$/,i)==i){return e;
}else{return i;
}}));
}},defer:function(m){m.FROM_CHARCODE=qx.lang.Object.invert(m.TO_CHARCODE);
}});
})();
(function(){var k=";",j="&",h='X',g="",f='#',e="&#",d="qx.util.StringEscape";
qx.Class.define(d,{statics:{escape:function(o,p){var r,t=g;

for(var i=0,l=o.length;i<l;i++){var s=o.charAt(i);
var q=s.charCodeAt(0);

if(p[q]){r=j+p[q]+k;
}else{if(q>0x7F){r=e+q+k;
}else{r=s;
}}t+=r;
}return t;
},unescape:function(m,n){return m.replace(/&[#\w]+;/gi,function(a){var b=a;
var a=a.substring(1,a.length-1);
var c=n[a];

if(c){b=String.fromCharCode(c);
}else{if(a.charAt(0)==f){if(a.charAt(1).toUpperCase()==h){c=a.substring(2);
if(c.match(/^[0-9A-Fa-f]+$/gi)){b=String.fromCharCode(parseInt(c,16));
}}else{c=a.substring(1);
if(c.match(/^\d+$/gi)){b=String.fromCharCode(parseInt(c,10));
}}}}return b;
});
}}});
})();
(function(){var cf="(\\d\\d?)",ce="format",cd="",cc="abbreviated",cb="wide",ca="(",bY=")",bX="|",bW="stand-alone",bV="wildcard",bK="default",bJ="literal",bI="'",bH="hour",bG="(\\d\\d?\\d?)",bF="ms",bE="narrow",bD="-",bC="quoted_literal",bB='a',cm="HH:mm:ss",cn="+",ck="HHmmss",cl="long",ci='z',cj="0",cg="sec",ch="day",co='Z',cp=" ",bO="min",bN="mm",bQ="(\\d+)",bP="h",bS="KK",bR='L',bU="Z",bT="(\\d\\d+)",bM="EEEE",bL="^",C=":",D='y',E="K",F="a",G="([\\+\\-]\\d\\d:?\\d\\d)",H="GMT",I="dd",J="qx.util.format.DateFormat",K="yyy",L="H",ct="YYYY",cs="y",cr="HH",cq="EE",cx='h',cw="S",cv='s',cu='A',cz="yyyyyy",cy="kk",bl="ss",bm='H',bj='S',bk="MMMM",bp='c',bq="d",bn="([a-zA-Z]+)",bo='k',bh="m",bi='Y',T='D',S="yyyyy",V='K',U="hh",P="SSS",O="MM",R="yy",Q="(\\d\\d\\d\\d\\d\\d+)",N="yyyy-MM-dd HH:mm:ss",M="(\\d\\d\\d\\d\\d+)",bv="short",bw='d',bx="unkown",by='m',br="(\\d\\d\\d\\d)",bs="(\\d\\d\\d+)",bt="k",bu='M',bz="(\\d\\d\\d\\d+)",bA="SS",be="MMM",bd="s",bc="M",bb='w',ba="EEE",Y="$",X="?",W='E',bg="z",bf="yyyy";
qx.Class.define(J,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(c,d){qx.core.Object.call(this);

if(!d){this.__mU=qx.locale.Manager.getInstance().getLocale();
}else{this.__mU=d;
}
if(c!=null){this.__mV=c.toString();
}else{this.__mV=qx.locale.Date.getDateFormat(cl,this.__mU)+cp+qx.locale.Date.getDateTimeFormat(ck,cm,this.__mU);
}},statics:{getDateTimeInstance:function(){var p=qx.util.format.DateFormat;
var o=qx.locale.Date.getDateFormat(cl)+cp+qx.locale.Date.getDateTimeFormat(ck,cm);

if(p._dateInstance==null||p._dateInstance.__mV!=o){p._dateTimeInstance=new p();
}return p._dateTimeInstance;
},getDateInstance:function(){var f=qx.util.format.DateFormat;
var e=qx.locale.Date.getDateFormat(bv)+cd;

if(f._dateInstance==null||f._dateInstance.__mV!=e){f._dateInstance=new f(e);
}return f._dateInstance;
},ASSUME_YEAR_2000_THRESHOLD:30,LOGGING_DATE_TIME__format:N,AM_MARKER:"am",PM_MARKER:"pm",MEDIUM_TIMEZONE_NAMES:["GMT"],FULL_TIMEZONE_NAMES:["Greenwich Mean Time"]},members:{__mU:null,__mV:null,__mW:null,__mX:null,__mY:null,__na:function(de,df){var dg=cd+de;

while(dg.length<df){dg=cj+dg;
}return dg;
},__nb:function(q){var r=new Date(q.getTime());
var s=r.getDate();

while(r.getMonth()!=0){r.setDate(-1);
s+=r.getDate()+1;
}return s;
},__nc:function(j){return new Date(j.getTime()+(3-((j.getDay()+6)%7))*86400000);
},__nd:function(cY){var db=this.__nc(cY);
var dc=db.getFullYear();
var da=this.__nc(new Date(dc,0,4));
return Math.floor(1.5+(db.getTime()-da.getTime())/86400000/7);
},format:function(cA){if(cA==null){return null;
}var cG=qx.util.format.DateFormat;
var cH=this.__mU;
var cR=cA.getFullYear();
var cL=cA.getMonth();
var cT=cA.getDate();
var cB=cA.getDay();
var cM=cA.getHours();
var cI=cA.getMinutes();
var cN=cA.getSeconds();
var cP=cA.getMilliseconds();
var cS=cA.getTimezoneOffset();
var cE=cS>0?1:-1;
var cC=Math.floor(Math.abs(cS)/60);
var cJ=Math.abs(cS)%60;
this.__ne();
var cQ=cd;

for(var i=0;i<this.__mY.length;i++){var cO=this.__mY[i];

if(cO.type==bJ){cQ+=cO.text;
}else{var cF=cO.character;
var cK=cO.size;
var cD=X;

switch(cF){case D:case bi:if(cK==2){cD=this.__na(cR%100,2);
}else{cD=cR+cd;

if(cK>cD.length){for(var i=cD.length;i<cK;i++){cD=cj+cD;
}}}break;
case T:cD=this.__na(this.__nb(cA),cK);
break;
case bw:cD=this.__na(cT,cK);
break;
case bb:cD=this.__na(this.__nd(cA),cK);
break;
case W:if(cK==2){cD=qx.locale.Date.getDayName(bE,cB,cH,ce);
}else if(cK==3){cD=qx.locale.Date.getDayName(cc,cB,cH,ce);
}else if(cK==4){cD=qx.locale.Date.getDayName(cb,cB,cH,ce);
}break;
case bp:if(cK==2){cD=qx.locale.Date.getDayName(bE,cB,cH,bW);
}else if(cK==3){cD=qx.locale.Date.getDayName(cc,cB,cH,bW);
}else if(cK==4){cD=qx.locale.Date.getDayName(cb,cB,cH,bW);
}break;
case bu:if(cK==1||cK==2){cD=this.__na(cL+1,cK);
}else if(cK==3){cD=qx.locale.Date.getMonthName(cc,cL,cH,ce);
}else if(cK==4){cD=qx.locale.Date.getMonthName(cb,cL,cH,ce);
}break;
case bR:if(cK==1||cK==2){cD=this.__na(cL+1,cK);
}else if(cK==3){cD=qx.locale.Date.getMonthName(cc,cL,cH,bW);
}else if(cK==4){cD=qx.locale.Date.getMonthName(cb,cL,cH,bW);
}break;
case bB:cD=(cM<12)?qx.locale.Date.getAmMarker(cH):qx.locale.Date.getPmMarker(cH);
break;
case bm:cD=this.__na(cM,cK);
break;
case bo:cD=this.__na((cM==0)?24:cM,cK);
break;
case V:cD=this.__na(cM%12,cK);
break;
case cx:cD=this.__na(((cM%12)==0)?12:(cM%12),cK);
break;
case by:cD=this.__na(cI,cK);
break;
case cv:cD=this.__na(cN,cK);
break;
case bj:cD=this.__na(cP,cK);
break;
case ci:if(cK==1){cD=H+((cE>0)?bD:cn)+this.__na(Math.abs(cC))+C+this.__na(cJ,2);
}else if(cK==2){cD=cG.MEDIUM_TIMEZONE_NAMES[cC];
}else if(cK==3){cD=cG.FULL_TIMEZONE_NAMES[cC];
}break;
case co:cD=((cE>0)?bD:cn)+this.__na(Math.abs(cC),2)+this.__na(cJ,2);
break;
}cQ+=cD;
}}return cQ;
},parse:function(v){this.__nf();
var B=this.__mW.regex.exec(v);

if(B==null){throw new Error("Date string '"+v+"' does not match the date format: "+this.__mV);
}var w={year:1970,month:0,day:1,hour:0,ispm:false,min:0,sec:0,ms:0};
var x=1;

for(var i=0;i<this.__mW.usedRules.length;i++){var z=this.__mW.usedRules[i];
var y=B[x];

if(z.field!=null){w[z.field]=parseInt(y,10);
}else{z.manipulator(w,y);
}x+=(z.groups==null)?1:z.groups;
}var A=new Date(w.year,w.month,w.day,(w.ispm)?(w.hour+12):w.hour,w.min,w.sec,w.ms);

if(w.month!=A.getMonth()||w.year!=A.getFullYear()){throw new Error("Error parsing date '"+v+"': the value for day or month is too large");
}return A;
},__ne:function(){if(this.__mY!=null){return;
}this.__mY=[];
var dF;
var dD=0;
var dH=cd;
var dB=this.__mV;
var dE=bK;
var i=0;

while(i<dB.length){var dG=dB.charAt(i);

switch(dE){case bC:if(dG==bI){if(i+1>=dB.length){i++;
break;
}var dC=dB.charAt(i+1);

if(dC==bI){dH+=dG;
i++;
}else{i++;
dE=bx;
}}else{dH+=dG;
i++;
}break;
case bV:if(dG==dF){dD++;
i++;
}else{this.__mY.push({type:bV,character:dF,size:dD});
dF=null;
dD=0;
dE=bK;
}break;
default:if((dG>=bB&&dG<=ci)||(dG>=cu&&dG<=co)){dF=dG;
dE=bV;
}else if(dG==bI){if(i+1>=dB.length){dH+=dG;
i++;
break;
}var dC=dB.charAt(i+1);

if(dC==bI){dH+=dG;
i++;
}i++;
dE=bC;
}else{dE=bK;
}
if(dE!=bK){if(dH.length>0){this.__mY.push({type:bJ,text:dH});
dH=cd;
}}else{dH+=dG;
i++;
}break;
}}if(dF!=null){this.__mY.push({type:bV,character:dF,size:dD});
}else if(dH.length>0){this.__mY.push({type:bJ,text:dH});
}},__nf:function(){if(this.__mW!=null){return ;
}var dP=this.__mV;
this.__ng();
this.__ne();
var dV=[];
var dR=bL;

for(var dN=0;dN<this.__mY.length;dN++){var dW=this.__mY[dN];

if(dW.type==bJ){dR+=qx.lang.String.escapeRegexpChars(dW.text);
}else{var dO=dW.character;
var dS=dW.size;
var dQ;

for(var dX=0;dX<this.__mX.length;dX++){var dT=this.__mX[dX];

if(dO==dT.pattern.charAt(0)&&dS==dT.pattern.length){dQ=dT;
break;
}}if(dQ==null){var dU=cd;

for(var i=0;i<dS;i++){dU+=dO;
}throw new Error("Malformed date format: "+dP+". Wildcard "+dU+" is not supported");
}else{dV.push(dQ);
dR+=dQ.regex;
}}}dR+=Y;
var dM;

try{dM=new RegExp(dR);
}catch(dd){throw new Error("Malformed date format: "+dP);
}this.__mW={regex:dM,"usedRules":dV,pattern:dR};
},__ng:function(){var dm=qx.util.format.DateFormat;
var dt=qx.lang.String;

if(this.__mX!=null){return ;
}var dn=this.__mX=[];
var dA=function(t,u){u=parseInt(u,10);

if(u<dm.ASSUME_YEAR_2000_THRESHOLD){u+=2000;
}else if(u<100){u+=1900;
}t.year=u;
};
var du=function(a,b){a.month=parseInt(b,10)-1;
};
var dr=function(cW,cX){cW.ispm=(cX==dm.PM_MARKER);
};
var dq=function(dI,dJ){dI.hour=parseInt(dJ,10)%24;
};
var dp=function(cU,cV){cU.hour=parseInt(cV,10)%12;
};
var dx=function(eb,ec){return;
};
var dv=qx.locale.Date.getMonthNames(cc,this.__mU,ce);

for(var i=0;i<dv.length;i++){dv[i]=dt.escapeRegexpChars(dv[i].toString());
}var dw=function(dK,dL){dL=dt.escapeRegexpChars(dL);
dK.month=dv.indexOf(dL);
};
var dj=qx.locale.Date.getMonthNames(cb,this.__mU,ce);

for(var i=0;i<dj.length;i++){dj[i]=dt.escapeRegexpChars(dj[i].toString());
}var di=function(m,n){n=dt.escapeRegexpChars(n);
m.month=dj.indexOf(n);
};
var dl=qx.locale.Date.getDayNames(bE,this.__mU,ce);

for(var i=0;i<dl.length;i++){dl[i]=dt.escapeRegexpChars(dl[i].toString());
}var dh=function(g,h){h=dt.escapeRegexpChars(h);
g.month=dl.indexOf(h);
};
var dy=qx.locale.Date.getDayNames(cc,this.__mU,ce);

for(var i=0;i<dy.length;i++){dy[i]=dt.escapeRegexpChars(dy[i].toString());
}var ds=function(k,l){l=dt.escapeRegexpChars(l);
k.month=dy.indexOf(l);
};
var dz=qx.locale.Date.getDayNames(cb,this.__mU,ce);

for(var i=0;i<dz.length;i++){dz[i]=dt.escapeRegexpChars(dz[i].toString());
}var dk=function(dY,ea){ea=dt.escapeRegexpChars(ea);
dY.month=dz.indexOf(ea);
};
dn.push({pattern:ct,regex:br,manipulator:dA});
dn.push({pattern:cs,regex:bQ,manipulator:dA});
dn.push({pattern:R,regex:bT,manipulator:dA});
dn.push({pattern:K,regex:bs,manipulator:dA});
dn.push({pattern:bf,regex:bz,manipulator:dA});
dn.push({pattern:S,regex:M,manipulator:dA});
dn.push({pattern:cz,regex:Q,manipulator:dA});
dn.push({pattern:bc,regex:cf,manipulator:du});
dn.push({pattern:O,regex:cf,manipulator:du});
dn.push({pattern:be,regex:ca+dv.join(bX)+bY,manipulator:dw});
dn.push({pattern:bk,regex:ca+dj.join(bX)+bY,manipulator:di});
dn.push({pattern:I,regex:cf,field:ch});
dn.push({pattern:bq,regex:cf,field:ch});
dn.push({pattern:cq,regex:ca+dl.join(bX)+bY,manipulator:dh});
dn.push({pattern:ba,regex:ca+dy.join(bX)+bY,manipulator:ds});
dn.push({pattern:bM,regex:ca+dz.join(bX)+bY,manipulator:dk});
dn.push({pattern:F,regex:ca+dm.AM_MARKER+bX+dm.PM_MARKER+bY,manipulator:dr});
dn.push({pattern:cr,regex:cf,field:bH});
dn.push({pattern:L,regex:cf,field:bH});
dn.push({pattern:cy,regex:cf,manipulator:dq});
dn.push({pattern:bt,regex:cf,manipulator:dq});
dn.push({pattern:bS,regex:cf,field:bH});
dn.push({pattern:E,regex:cf,field:bH});
dn.push({pattern:U,regex:cf,manipulator:dp});
dn.push({pattern:bP,regex:cf,manipulator:dp});
dn.push({pattern:bN,regex:cf,field:bO});
dn.push({pattern:bh,regex:cf,field:bO});
dn.push({pattern:bl,regex:cf,field:cg});
dn.push({pattern:bd,regex:cf,field:cg});
dn.push({pattern:P,regex:bG,field:bF});
dn.push({pattern:bA,regex:bG,field:bF});
dn.push({pattern:cw,regex:bG,field:bF});
dn.push({pattern:bU,regex:G,manipulator:dx});
dn.push({pattern:bg,regex:bn,manipulator:dx});
}},destruct:function(){this.__mY=this.__mW=this.__mX=null;
}});
})();
(function(){var G="_",F="format",E="thu",D="sat",C="cldr_day_",B="cldr_month_",A="wed",z="fri",y="tue",x="mon",X="sun",W="short",V="HH:mm",U="HHmmsszz",T="HHmm",S="HHmmss",R="cldr_date_format_",Q="HH:mm:ss zz",P="full",O="cldr_pm",M="long",N="medium",K="cldr_am",L="qx.locale.Date",I="cldr_date_time_format_",J="cldr_time_format_",H="HH:mm:ss";
qx.Class.define(L,{statics:{__nh:qx.locale.Manager.getInstance(),getAmMarker:function(Y){return this.__nh.localize(K,[],Y);
},getPmMarker:function(bn){return this.__nh.localize(O,[],bn);
},getDayNames:function(length,bo,bp){var bp=bp?bp:F;
{};
var br=[X,x,y,A,E,z,D];
var bs=[];

for(var i=0;i<br.length;i++){var bq=C+bp+G+length+G+br[i];
bs.push(this.__nh.localize(bq,[],bo));
}return bs;
},getDayName:function(length,d,e,f){var f=f?f:F;
{};
var h=[X,x,y,A,E,z,D];
var g=C+f+G+length+G+h[d];
return this.__nh.localize(g,[],e);
},getMonthNames:function(length,be,bf){var bf=bf?bf:F;
{};
var bh=[];

for(var i=0;i<12;i++){var bg=B+bf+G+length+G+(i+1);
bh.push(this.__nh.localize(bg,[],be));
}return bh;
},getMonthName:function(length,j,k,l){var l=l?l:F;
{};
var m=B+l+G+length+G+(j+1);
return this.__nh.localize(m,[],k);
},getDateFormat:function(u,v){{};
var w=R+u;
return this.__nh.localize(w,[],v);
},getDateTimeFormat:function(bt,bu,bv){var bx=I+bt;
var bw=this.__nh.localize(bx,[],bv);

if(bw==bx){bw=bu;
}return bw;
},getTimeFormat:function(ba,bb){{};
var bd=J+ba;
var bc=this.__nh.localize(bd,[],bb);

if(bc!=bd){return bc;
}
switch(ba){case W:case N:return qx.locale.Date.getDateTimeFormat(T,V);
case M:return qx.locale.Date.getDateTimeFormat(S,H);
case P:return qx.locale.Date.getDateTimeFormat(U,Q);
default:throw new Error("This case should never happen.");
}},getWeekStart:function(r){var s={"MV":5,"AE":6,"AF":6,"BH":6,"DJ":6,"DZ":6,"EG":6,"ER":6,"ET":6,"IQ":6,"IR":6,"JO":6,"KE":6,"KW":6,"LB":6,"LY":6,"MA":6,"OM":6,"QA":6,"SA":6,"SD":6,"SO":6,"TN":6,"YE":6,"AS":0,"AU":0,"AZ":0,"BW":0,"CA":0,"CN":0,"FO":0,"GE":0,"GL":0,"GU":0,"HK":0,"IE":0,"IL":0,"IS":0,"JM":0,"JP":0,"KG":0,"KR":0,"LA":0,"MH":0,"MN":0,"MO":0,"MP":0,"MT":0,"NZ":0,"PH":0,"PK":0,"SG":0,"TH":0,"TT":0,"TW":0,"UM":0,"US":0,"UZ":0,"VI":0,"ZA":0,"ZW":0,"MW":0,"NG":0,"TJ":0};
var t=qx.locale.Date._getTerritory(r);
return s[t]!=null?s[t]:1;
},getWeekendStart:function(bi){var bk={"EG":5,"IL":5,"SY":5,"IN":0,"AE":4,"BH":4,"DZ":4,"IQ":4,"JO":4,"KW":4,"LB":4,"LY":4,"MA":4,"OM":4,"QA":4,"SA":4,"SD":4,"TN":4,"YE":4};
var bj=qx.locale.Date._getTerritory(bi);
return bk[bj]!=null?bk[bj]:6;
},getWeekendEnd:function(a){var b={"AE":5,"BH":5,"DZ":5,"IQ":5,"JO":5,"KW":5,"LB":5,"LY":5,"MA":5,"OM":5,"QA":5,"SA":5,"SD":5,"TN":5,"YE":5,"AF":5,"IR":5,"EG":6,"IL":6,"SY":6};
var c=qx.locale.Date._getTerritory(a);
return b[c]!=null?b[c]:0;
},isWeekend:function(n,o){var q=qx.locale.Date.getWeekendStart(o);
var p=qx.locale.Date.getWeekendEnd(o);

if(p>q){return ((n>=q)&&(n<=p));
}else{return ((n>=q)||(n<=p));
}},_getTerritory:function(bl){if(bl){var bm=bl.split(G)[1]||bl;
}else{bm=this.__nh.getTerritory()||this.__nh.getLanguage();
}return bm.toUpperCase();
}}});
})();
(function(){var i="Boolean",h="changeInvalidMessage",g="String",f="invalid",e="qx.ui.form.MForm",d="_applyValid",c="",b="changeRequired",a="changeValid";
qx.Mixin.define(e,{properties:{valid:{check:i,init:true,apply:d,event:a},required:{check:i,init:false,event:b},invalidMessage:{check:g,init:c,event:h},requiredInvalidMessage:{check:g,nullable:true,event:h}},members:{_applyValid:function(j,k){j?this.removeState(f):this.addState(f);
}}});
})();
(function(){var p="showingPlaceholder",o="color",n="",m="none",l="qx.dynlocale",k="Boolean",j="qx.client",i="qx.event.type.Data",h="readonly",g="input",be="focusin",bd="visibility",bc="focusout",bb="changeLocale",ba="hidden",Y="on",X="absolute",W="readOnly",V="text",U="_applyTextAlign",w="px",x="RegExp",u=")",v="syncAppearance",s="changeValue",t="A",q="change",r="textAlign",A="focused",B="center",I="visible",G="disabled",M="url(",K="off",Q="String",O="resize",D="qx.ui.form.AbstractField",T="transparent",S="spellcheck",R="false",C="right",E="PositiveInteger",F="mshtml",H="abstract",J="block",L="webkit",N="_applyReadOnly",P="_applyPlaceholder",y="left",z="qx/static/blank.gif";
qx.Class.define(D,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:H,construct:function(bB){qx.ui.core.Widget.call(this);

if(bB!=null){this.setValue(bB);
}this.getContentElement().addListener(q,this._onChangeContent,this);
this.addListener(v,this._syncPlaceholder,this);
if(qx.core.Variant.isSet(l,Y)){qx.locale.Manager.getInstance().addListener(bb,this._onChangeLocale,this);
}},events:{"input":i,"changeValue":i},properties:{textAlign:{check:[y,B,C],nullable:true,themeable:true,apply:U},readOnly:{check:k,apply:N,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:E,init:Infinity},liveUpdate:{check:k,init:false},placeholder:{check:Q,nullable:true,apply:P},filter:{check:x,nullable:true,init:null}},members:{__ni:true,__nj:null,__nk:null,__nl:null,getFocusElement:function(){var bj=this.getContentElement();

if(bj){return bj;
}},_createInputElement:function(){return new qx.html.Input(V);
},renderLayout:function(bH,top,bI,bJ){var bK=this._updateInsets;
var bO=qx.ui.core.Widget.prototype.renderLayout.call(this,bH,top,bI,bJ);
if(!bO){return;
}var bM=bO.size||bK;
var bP=w;

if(bM||bO.local||bO.margin){var bL=this.getInsets();
var innerWidth=bI-bL.left-bL.right;
var innerHeight=bJ-bL.top-bL.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var bN=this.getContentElement();

if(bK){this.__no().setStyles({"left":bL.left+bP,"top":bL.top+bP});
}
if(bM){this.__no().setStyles({"width":innerWidth+bP,"height":innerHeight+bP});
bN.setStyles({"width":innerWidth+bP,"height":innerHeight+bP});
}},_createContentElement:function(){var bC=this._createInputElement();
bC.setStyles({"border":m,"padding":0,"margin":0,"display":J,"background":T,"outline":m,"appearance":m,"position":X,"autoComplete":K});
bC.setSelectable(this.getSelectable());
bC.setEnabled(this.getEnabled());
bC.addListener(g,this._onHtmlInput,this);
bC.setAttribute(S,R);
if(qx.core.Variant.isSet(j,L)){bC.setStyle(O,m);
}if(qx.core.Variant.isSet(j,F)){bC.setStyles({backgroundImage:M+qx.util.ResourceManager.getInstance().toUri(z)+u});
}return bC;
},_applyEnabled:function(by,bz){qx.ui.core.Widget.prototype._applyEnabled.call(this,by,bz);
this.getContentElement().setEnabled(by);

if(by){this._showPlaceholder();
}else{this._removePlaceholder();
}},__nm:{width:16,height:16},_getContentHint:function(){return {width:this.__nm.width*10,height:this.__nm.height||16};
},_applyFont:function(bu,bv){var bw;

if(bu){var bx=qx.theme.manager.Font.getInstance().resolve(bu);
bw=bx.getStyles();
}else{bw=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bw);
this.__no().setStyles(bw);
if(bu){this.__nm=qx.bom.Label.getTextSize(t,bw);
}else{delete this.__nm;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(d,f){if(d){this.getContentElement().setStyle(o,qx.theme.manager.Color.getInstance().resolve(d));
this.__no().setStyle(o,qx.theme.manager.Color.getInstance().resolve(d));
}else{this.getContentElement().removeStyle(o);
this.__no().removeStyle(o);
}},tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__nm;
},_onHtmlInput:function(e){var bs=e.getData();
var br=true;
this.__ni=false;
if(this.getFilter()!=null){var bt=n;
var bp=bs.search(this.getFilter());
var bq=bs;

while(bp>=0){bt=bt+(bq.charAt(bp));
bq=bq.substring(bp+1,bq.length);
bp=bq.search(this.getFilter());
}
if(bt!=bs){br=false;
bs=bt;
this.getContentElement().setValue(bs);
}}if(bs.length>this.getMaxLength()){var br=false;
this.getContentElement().setValue(bs.substr(0,this.getMaxLength()));
}if(br){this.fireDataEvent(g,bs,this.__nl);
this.__nl=bs;
if(this.getLiveUpdate()){this.__nn(bs);
}}},__nn:function(bA){if(this.__nk!=bA){this.fireNonBubblingEvent(s,qx.event.type.Data,[bA,this.__nk]);
this.__nk=bA;
}},setValue:function(bD){if(bD===null){if(this.__ni){return bD;
}bD=n;
this.__ni=true;
}else{this.__ni=false;
this._removePlaceholder();
}
if(qx.lang.Type.isString(bD)){var bF=this.getContentElement();

if(bD.length>this.getMaxLength()){bD=bD.substr(0,this.getMaxLength());
}
if(bF.getValue()!=bD){var bG=bF.getValue();
bF.setValue(bD);
var bE=this.__ni?null:bD;
this.__nk=bG;
this.__nn(bE);
}this._showPlaceholder();
return bD;
}throw new Error("Invalid value type: "+bD);
},getValue:function(){var bk=this.getContentElement().getValue();
return this.__ni?null:bk;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__ni=e.getData()===null;
this.__nn(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(bh,bi){this.getContentElement().setTextSelection(bh,bi);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var bg=this.getValue()||n;
var bf=this.getPlaceholder();

if(bf!=null&&bg==n&&!this.hasState(A)&&!this.hasState(G)){if(this.hasState(p)){this._syncPlaceholder();
}else{this.addState(p);
}}},_removePlaceholder:function(){if(this.hasState(p)){this.__no().setStyle(bd,ba);
this.removeState(p);
}},_syncPlaceholder:function(){if(this.hasState(p)){this.__no().setStyle(bd,I);
}},__no:function(){if(this.__nj==null){this.__nj=new qx.html.Label();
this.__nj.setStyles({"visibility":ba,"zIndex":6,"position":X});
this.getContainerElement().add(this.__nj);
}return this.__nj;
},_onChangeLocale:qx.core.Variant.select(l,{"on":function(e){var content=this.getPlaceholder();

if(content&&content.translate){this.setPlaceholder(content.translate());
}},"off":null}),_applyPlaceholder:function(bn,bo){this.__no().setValue(bn);

if(bn!=null){this.addListener(be,this._removePlaceholder,this);
this.addListener(bc,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(be,this._removePlaceholder,this);
this.removeListener(bc,this._showPlaceholder,this);
this._removePlaceholder();
}},_applyTextAlign:function(bl,bm){this.getContentElement().setStyle(r,bl);
},_applyReadOnly:function(a,b){var c=this.getContentElement();
c.setAttribute(W,a);

if(a){this.addState(h);
this.setFocusable(false);
}else{this.removeState(h);
this.setFocusable(true);
}}},destruct:function(){this.__nj=null;

if(qx.core.Variant.isSet(l,Y)){qx.locale.Manager.getInstance().removeListener(bb,this._onChangeLocale,this);
}}});
})();
(function(){var b="qx.ui.form.TextField",a="textfield";
qx.Class.define(b,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var t="none",s="wrap",r="value",q="qx.client",p="textarea",o="off",n="on",m="qxSelectable",l="",k="webkit",g="input",j="qx.html.Input",i="select",f="disabled",e="read-only",h="userSelect";
qx.Class.define(j,{extend:qx.html.Element,construct:function(z,A,B){if(z===i||z===p){var C=z;
}else{C=g;
}qx.html.Element.call(this,C,A,B);
this.__np=z;
},members:{__np:null,__nq:null,__nr:null,_createDomElement:function(){return qx.bom.Input.create(this.__np);
},_applyProperty:function(name,D){qx.html.Element.prototype._applyProperty.call(this,name,D);
var E=this.getDomElement();

if(name===r){qx.bom.Input.setValue(E,D);
}else if(name===s){qx.bom.Input.setWrap(E,D);
}},setEnabled:qx.core.Variant.select(q,{"webkit":function(d){this.__nr=d;

if(!d){this.setStyles({"userModify":e,"userSelect":t});
}else{this.setStyles({"userModify":null,"userSelect":this.__nq?null:t});
}},"default":function(c){this.setAttribute(f,c===false);
}}),setSelectable:qx.core.Variant.select(q,{"webkit":function(x){this.__nq=x;
this.setAttribute(m,x?n:o);
if(qx.core.Variant.isSet(q,k)){var y=this.__nr?x?null:t:t;
this.setStyle(h,y);
}},"default":function(b){this.setAttribute(m,b?n:o);
}}),setValue:function(v){var w=this.getDomElement();

if(w){if(w.value!=v){qx.bom.Input.setValue(w,v);
}}else{this._setProperty(r,v);
}return this;
},getValue:function(){var u=this.getDomElement();

if(u){return qx.bom.Input.getValue(u);
}return this._getProperty(r)||l;
},setWrap:function(a){if(this.__np===p){this._setProperty(s,a);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__np===p){return this._getProperty(s);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var F="change",E="input",D="qx.client",C="text",B="password",A="checkbox",z="radio",y="textarea",x="keypress",w="opera",q="propertychange",v="blur",t="keydown",p="keyup",n="select-multiple",s="checked",r="value",u="select",m="qx.event.handler.Input";
qx.Class.define(m,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(D,w)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__ns:false,__nt:null,__nu:null,canHandleEvent:function(I,J){var K=I.tagName.toLowerCase();

if(J===E&&(K===E||K===y)){return true;
}
if(J===F&&(K===E||K===y||K===u)){return true;
}return false;
},registerEvent:qx.core.Variant.select(D,{"mshtml":function(P,Q,R){if(!P.__nv){var S=P.tagName.toLowerCase();
var T=P.type;

if(T===C||T===B||S===y||T===A||T===z){qx.bom.Event.addNativeListener(P,q,this._onPropertyWrapper);
}
if(T!==A&&T!==z){qx.bom.Event.addNativeListener(P,F,this._onChangeValueWrapper);
}
if(T===C||T===B){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,P);
qx.bom.Event.addNativeListener(P,x,this._onKeyPressWrapped);
}P.__nv=true;
}},"default":function(b,c,d){if(c===E){this.__nw(b);
}else if(c===F){if(b.type===z||b.type===A){qx.bom.Event.addNativeListener(b,F,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(b,F,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(D,w)){if(b.type===C||b.type===B){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,b);
qx.bom.Event.addNativeListener(b,x,this._onKeyPressWrapped);
}}}}}),__nw:qx.core.Variant.select(D,{"mshtml":null,"webkit":function(j){var k=j.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&k==y){qx.bom.Event.addNativeListener(j,x,this._onInputWrapper);
}qx.bom.Event.addNativeListener(j,E,this._onInputWrapper);
},"opera":function(V){qx.bom.Event.addNativeListener(V,p,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(V,t,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(V,v,this._onBlurWrapper);
qx.bom.Event.addNativeListener(V,E,this._onInputWrapper);
},"default":function(U){qx.bom.Event.addNativeListener(U,E,this._onInputWrapper);
}}),unregisterEvent:qx.core.Variant.select(D,{"mshtml":function(bb,bc){if(bb.__nv){var bd=bb.tagName.toLowerCase();
var be=bb.type;

if(be===C||be===B||bd===y||be===A||be===z){qx.bom.Event.removeNativeListener(bb,q,this._onPropertyWrapper);
}
if(be!==A&&be!==z){qx.bom.Event.removeNativeListener(bb,F,this._onChangeValueWrapper);
}
if(be===C||be===B){qx.bom.Event.removeNativeListener(bb,x,this._onKeyPressWrapped);
}
try{delete bb.__nv;
}catch(f){bb.__nv=null;
}}},"default":function(g,h){if(h===E){this.__nw(g);
}else if(h===F){if(g.type===z||g.type===A){qx.bom.Event.removeNativeListener(g,F,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(g,F,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(D,w)){if(g.type===C||g.type===B){qx.bom.Event.removeNativeListener(g,x,this._onKeyPressWrapped);
}}}}),__nx:qx.core.Variant.select(D,{"mshtml":null,"webkit":function(G){var H=G.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&H==y){qx.bom.Event.removeNativeListener(G,x,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(G,E,this._onInputWrapper);
},"opera":function(Y){qx.bom.Event.removeNativeListener(Y,p,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(Y,t,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(Y,v,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(Y,E,this._onInputWrapper);
},"default":function(N){qx.bom.Event.removeNativeListener(N,E,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(D,{"mshtml|opera":function(e,ba){if(e.keyCode===13){if(ba.value!==this.__nu){this.__nu=ba.value;
qx.event.Registration.fireEvent(ba,F,qx.event.type.Data,[ba.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(D,{"opera":function(e){if(e.keyCode===13){this.__ns=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(D,{"opera":function(e){if(e.keyCode===13){this.__ns=false;
}},"default":null}),_onBlur:qx.core.Variant.select(D,{"opera":function(e){if(this.__nt){window.clearTimeout(this.__nt);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var O=e.target;
if(!this.__ns){if(qx.core.Variant.isSet(D,w)){this.__nt=window.setTimeout(function(){qx.event.Registration.fireEvent(O,E,qx.event.type.Data,[O.value]);
},0);
}else{qx.event.Registration.fireEvent(O,E,qx.event.type.Data,[O.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var X=e.target||e.srcElement;
var W=X.value;

if(X.type===n){var W=[];

for(var i=0,o=X.options,l=o.length;i<l;i++){if(o[i].selected){W.push(o[i].value);
}}}qx.event.Registration.fireEvent(X,F,qx.event.type.Data,[W]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var a=e.target;

if(a.type===z){if(a.checked){qx.event.Registration.fireEvent(a,F,qx.event.type.Data,[a.value]);
}}else{qx.event.Registration.fireEvent(a,F,qx.event.type.Data,[a.checked]);
}}),_onProperty:qx.core.Variant.select(D,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var L=e.target||e.srcElement;
var M=e.propertyName;

if(M===r&&(L.type===C||L.type===B||L.tagName.toLowerCase()===y)){if(!L.$$inValueSet){qx.event.Registration.fireEvent(L,E,qx.event.type.Data,[L.value]);
}}else if(M===s){if(L.type===A){qx.event.Registration.fireEvent(L,F,qx.event.type.Data,[L.checked]);
}else if(L.checked){qx.event.Registration.fireEvent(L,F,qx.event.type.Data,[L.value]);
}}}),"default":function(){}})},defer:function(bf){qx.event.Registration.addHandler(bf);
}});
})();
(function(){var z="",y="select",x="soft",w="off",v="qx.client",u="wrap",t="text",s="mshtml",r="number",q="checkbox",h="select-one",p="input",m="option",g="value",f="radio",k="qx.bom.Input",j="nowrap",n="textarea",e="auto",o="normal";
qx.Class.define(k,{statics:{__ny:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(A,B,C){{};
var B=B?qx.lang.Object.clone(B):{};
var D;

if(A===n||A===y){D=A;
}else{D=p;
B.type=A;
}return qx.bom.Element.create(D,B,C);
},setValue:function(E,F){var K=E.nodeName.toLowerCase();
var H=E.type;
var Array=qx.lang.Array;
var L=qx.lang.Type;

if(typeof F===r){F+=z;
}
if((H===q||H===f)){if(L.isArray(F)){E.checked=Array.contains(F,E.value);
}else{E.checked=E.value==F;
}}else if(K===y){var G=L.isArray(F);
var M=E.options;
var I,J;

for(var i=0,l=M.length;i<l;i++){I=M[i];
J=I.getAttribute(g);

if(J==null){J=I.text;
}I.selected=G?Array.contains(F,J):F==J;
}
if(G&&F.length==0){E.selectedIndex=-1;
}}else if(H===t&&qx.core.Variant.isSet(v,s)){E.$$inValueSet=true;
E.value=F;
E.$$inValueSet=null;
}else{E.value=F;
}},getValue:function(R){var X=R.nodeName.toLowerCase();

if(X===m){return (R.attributes.value||{}).specified?R.value:R.text;
}
if(X===y){var S=R.selectedIndex;
if(S<0){return null;
}var Y=[];
var bb=R.options;
var ba=R.type==h;
var W=qx.bom.Input;
var V;
for(var i=ba?S:0,U=ba?S+1:bb.length;i<U;i++){var T=bb[i];

if(T.selected){V=W.getValue(T);
if(ba){return V;
}Y.push(V);
}}return Y;
}else{return (R.value||z).replace(/\r/g,z);
}},setWrap:qx.core.Variant.select(v,{"mshtml":function(N,O){N.wrap=O?x:w;
},"gecko|webkit":function(a,b){var d=b?x:w;
var c=b?z:e;
a.setAttribute(u,d);
a.style.overflow=c;
},"default":function(P,Q){P.style.whiteSpace=Q?o:j;
}})}});
})();
(function(){var ca="",bY="Number",bX='</div>',bW='" ',bV="paneUpdated",bU='<div>',bT="</div>",bS="overflow: hidden;",bR="qx.event.type.Data",bQ="paneReloadsData",cs="div",cr='style="',cq="_applyMaxCacheLines",cp="qx.ui.table.pane.Pane",co="width: 100%;",cn="qx.event.type.Event",cm="_applyVisibleRowCount",cl='>',ck="line-height: ",cj="appear",ch='class="',ci="width:100%;",cf="px;",cg='<div ',cd="'>",ce="_applyFirstVisibleRow",cb="<div style='",cc=";position:relative;";
qx.Class.define(cp,{extend:qx.ui.core.Widget,construct:function(bP){qx.ui.core.Widget.call(this);
this.__nz=bP;
this.__nA=0;
this.__nB=0;
this.__nC=[];
},events:{"paneReloadsData":bR,"paneUpdated":cn},properties:{firstVisibleRow:{check:bY,init:0,apply:ce},visibleRowCount:{check:bY,init:0,apply:cm},maxCacheLines:{check:bY,init:1000,apply:cq},allowShrinkX:{refine:true,init:false}},members:{__nB:null,__nA:null,__nz:null,__nD:null,__nE:null,__nF:null,__nC:null,__nG:0,_applyFirstVisibleRow:function(bw,bx){this.updateContent(false,bw-bx);
},_applyVisibleRowCount:function(a,b){this.updateContent(true);
},_getContentHint:function(){return {width:this.getPaneScroller().getTablePaneModel().getTotalWidth(),height:400};
},getPaneScroller:function(){return this.__nz;
},getTable:function(){return this.__nz.getTable();
},setFocusedCell:function(bJ,bK,bL){if(bJ!=this.__nF||bK!=this.__nE){var bM=this.__nE;
this.__nF=bJ;
this.__nE=bK;
if(bK!=bM&&!bL){if(bM!==null){this.updateContent(false,null,bM,true);
}
if(bK!==null){this.updateContent(false,null,bK,true);
}}}},onSelectionChanged:function(){this.updateContent(false,null,null,true);
},onFocusChanged:function(){this.updateContent(false,null,null,true);
},setColumnWidth:function(bN,bO){this.updateContent(true);
},onColOrderChanged:function(){this.updateContent(true);
},onPaneModelChanged:function(){this.updateContent(true);
},onTableModelDataChanged:function(bp,bq,br,bs){this.__nH();
var bu=this.getFirstVisibleRow();
var bt=this.getVisibleRowCount();

if(bq==-1||bq>=bu&&bp<bu+bt){this.updateContent();
}},onTableModelMetaDataChanged:function(){this.updateContent(true);
},_applyMaxCacheLines:function(bn,bo){if(this.__nG>=bn&&bn!==-1){this.__nH();
}},__nH:function(){this.__nC=[];
this.__nG=0;
},__nI:function(cy,cz,cA){if(!cz&&!cA&&this.__nC[cy]){return this.__nC[cy];
}else{return null;
}},__nJ:function(ct,cu,cv,cw){var cx=this.getMaxCacheLines();

if(!cv&&!cw&&!this.__nC[ct]&&cx>0){this._applyMaxCacheLines(cx);
this.__nC[ct]=cu;
this.__nG+=1;
}},updateContent:function(c,d,e,f){if(c){this.__nH();
}if(d&&Math.abs(d)<=Math.min(10,this.getVisibleRowCount())){this._scrollContent(d);
}else if(f&&!this.getTable().getAlwaysUpdateCells()){this._updateRowStyles(e);
}else{this._updateAllRows();
}},_updateRowStyles:function(by){var bC=this.getContentElement().getDomElement();

if(!bC||!bC.firstChild){this._updateAllRows();
return;
}var bG=this.getTable();
var bA=bG.getSelectionModel();
var bD=bG.getTableModel();
var bH=bG.getDataRowRenderer();
var bB=bC.firstChild.childNodes;
var bF={table:bG};
var bI=this.getFirstVisibleRow();
var y=0;
var bz=bB.length;

if(by!=null){var bE=by-bI;

if(bE>=0&&bE<bz){bI=by;
y=bE;
bz=bE+1;
}else{return;
}}
for(;y<bz;y++,bI++){bF.row=bI;
bF.selected=bA.isSelectedIndex(bI);
bF.focusedRow=(this.__nE==bI);
bF.rowData=bD.getRowData(bI);
bH.updateDataRowElement(bF,bB[y]);
}},_getRowsHtml:function(I,J){var P=this.getTable();
var S=P.getSelectionModel();
var M=P.getTableModel();
var N=P.getTableColumnModel();
var bi=this.getPaneScroller().getTablePaneModel();
var X=P.getDataRowRenderer();
M.prefetchRows(I,I+J-1);
var bf=P.getRowHeight();
var bh=bi.getColumnCount();
var O=0;
var L=[];
for(var x=0;x<bh;x++){var bl=bi.getColumnAtX(x);
var R=N.getColumnWidth(bl);
L.push({col:bl,xPos:x,editable:M.isColumnEditable(bl),focusedCol:this.__nF==bl,styleLeft:O,styleWidth:R});
O+=R;
}var bk=[];
var bm=false;

for(var Q=I;Q<I+J;Q++){var T=S.isSelectedIndex(Q);
var W=(this.__nE==Q);
var bc=this.__nI(Q,T,W);

if(bc){bk.push(bc);
continue;
}var K=[];
var be={table:P};
be.styleHeight=bf;
be.row=Q;
be.selected=T;
be.focusedRow=W;
be.rowData=M.getRowData(Q);

if(!be.rowData){bm=true;
}K.push(cg);
var bb=X.getRowAttributes(be);

if(bb){K.push(bb);
}var ba=X.getRowClass(be);

if(ba){K.push(ch,ba,bW);
}var Y=X.createRowStyle(be);
Y+=cc+X.getRowHeightStyle(bf)+ci;

if(Y){K.push(cr,Y,bW);
}K.push(cl);
var bj=false;

for(x=0;x<bh&&!bj;x++){var U=L[x];

for(var bg in U){be[bg]=U[bg];
}var bl=be.col;
be.value=M.getValue(bl,Q);
var V=N.getDataCellRenderer(bl);
be.style=V.getDefaultCellStyle();
bj=V.createDataCellHtml(be,K)||false;
}K.push(bX);
var bd=K.join(ca);
this.__nJ(Q,bd,T,W);
bk.push(bd);
}this.fireDataEvent(bQ,bm);
return bk.join(ca);
},_scrollContent:function(t){var u=this.getContentElement().getDomElement();

if(!(u&&u.firstChild)){this._updateAllRows();
return;
}var F=u.firstChild;
var v=F.childNodes;
var D=this.getVisibleRowCount();
var C=this.getFirstVisibleRow();
var A=this.getTable().getTableModel();
var G=0;
G=A.getRowCount();
if(C+D>G){this._updateAllRows();
return;
}var H=t<0?D+t:0;
var w=t<0?0:D-t;

for(i=Math.abs(t)-1;i>=0;i--){var B=v[H];

try{F.removeChild(B);
}catch(bv){break;
}}if(!this.__nD){this.__nD=document.createElement(cs);
}var E=bU;
E+=this._getRowsHtml(C+w,Math.abs(t));
E+=bX;
this.__nD.innerHTML=E;
var z=this.__nD.firstChild.childNodes;
if(t>0){for(var i=z.length-1;i>=0;i--){var B=z[0];
F.appendChild(B);
}}else{for(var i=z.length-1;i>=0;i--){var B=z[z.length-1];
F.insertBefore(B,F.firstChild);
}}if(this.__nE!==null){this._updateRowStyles(this.__nE-t);
this._updateRowStyles(this.__nE);
}this.fireEvent(bV);
},_updateAllRows:function(){var k=this.getContentElement().getDomElement();

if(!k){this.addListenerOnce(cj,arguments.callee,this);
return;
}var q=this.getTable();
var n=q.getTableModel();
var p=this.getPaneScroller().getTablePaneModel();
var o=p.getColumnCount();
var g=q.getRowHeight();
var l=this.getFirstVisibleRow();
var h=this.getVisibleRowCount();
var r=n.getRowCount();

if(l+h>r){h=Math.max(0,r-l);
}var j=p.getTotalWidth();
var m;
if(h>0){m=[cb,co,(q.getForceLineHeight()?ck+g+cf:ca),bS,cd,this._getRowsHtml(l,h),bT];
}else{m=[];
}var s=m.join(ca);
k.innerHTML=s;
this.setWidth(j);
this.__nA=o;
this.__nB=h;
this.fireEvent(bV);
}},destruct:function(){this.__nD=this.__nz=this.__nC=null;
}});
})();
(function(){var s="hovered",r="__nL",q="qx.ui.table.pane.Header";
qx.Class.define(q,{extend:qx.ui.core.Widget,construct:function(n){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
this.__nK=new qx.ui.core.Blocker(this);
this.__nL=n;
},members:{__nL:null,__nM:null,__nN:null,__nK:null,getPaneScroller:function(){return this.__nL;
},getTable:function(){return this.__nL.getTable();
},getBlocker:function(){return this.__nK;
},onColOrderChanged:function(){this._updateContent(true);
},onPaneModelChanged:function(){this._updateContent(true);
},onTableModelMetaDataChanged:function(){this._updateContent();
},setColumnWidth:function(J,K){var L=this.getHeaderWidgetAtColumn(J);

if(L!=null){L.setWidth(K);
}},setMouseOverColumn:function(t){if(t!=this.__nN){if(this.__nN!=null){var u=this.getHeaderWidgetAtColumn(this.__nN);

if(u!=null){u.removeState(s);
}}
if(t!=null){this.getHeaderWidgetAtColumn(t).addState(s);
}this.__nN=t;
}},getHeaderWidgetAtColumn:function(l){var m=this.getPaneScroller().getTablePaneModel().getX(l);
return this._getChildren()[m];
},showColumnMoveFeedback:function(a,x){var e=this.getContainerLocation();

if(this.__nM==null){var j=this.getTable();
var b=this.getPaneScroller().getTablePaneModel().getX(a);
var d=this._getChildren()[b];
var f=j.getTableModel();
var h=j.getTableColumnModel();
var i={xPos:b,col:a,name:f.getColumnName(a),table:j};
var g=h.getHeaderCellRenderer(a);
var c=g.createHeaderCell(i);
var k=d.getBounds();
c.setWidth(k.width);
c.setHeight(k.height);
c.setZIndex(1000000);
c.setOpacity(0.8);
c.setLayoutProperties({top:e.top});
this.getApplicationRoot().add(c);
this.__nM=c;
}this.__nM.setLayoutProperties({left:e.left+x});
this.__nM.show();
},hideColumnMoveFeedback:function(){if(this.__nM!=null){this.__nM.destroy();
this.__nM=null;
}},isShowingColumnMoveFeedback:function(){return this.__nM!=null;
},_updateContent:function(v){var G=this.getTable();
var A=G.getTableModel();
var D=G.getTableColumnModel();
var F=this.getPaneScroller().getTablePaneModel();
var I=this._getChildren();
var B=F.getColumnCount();
var E=A.getSortColumnIndex();
if(v){this._cleanUpCells();
}var w={};
w.sortedAscending=A.isSortAscending();

for(var x=0;x<B;x++){var z=F.getColumnAtX(x);

if(z===undefined){continue;
}var H=D.getColumnWidth(z);
var C=D.getHeaderCellRenderer(z);
w.xPos=x;
w.col=z;
w.name=A.getColumnName(z);
w.editable=A.isColumnEditable(z);
w.sorted=(z==E);
w.table=G;
var y=I[x];
if(y==null){y=C.createHeaderCell(w);
y.set({width:H});
this._add(y);
}else{C.updateHeaderCell(w,y);
}}},_cleanUpCells:function(){var p=this._getChildren();

for(var x=p.length-1;x>=0;x--){var o=p[x];
o.destroy();
}}},destruct:function(){this.__nK.dispose();
this._disposeObjects(r);
}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var bP="Boolean",bO="resize-line",bN="mousedown",bM="qx.event.type.Data",bL="mouseup",bK="qx.ui.table.pane.CellEvent",bJ="scroll",bI="focus-indicator",bH="excluded",bG="scrollbar-y",cO="table-scroller-focus-indicator",cN="visible",cM="mousemove",cL="header",cK="editing",cJ="click",cI="modelChanged",cH="scrollbar-x",cG="cellClick",cF="pane",bW="__nS",bX="__nX",bU="mouseout",bV="changeHorizontalScrollBarVisible",bS="bottom",bT="_applyScrollTimeout",bQ="changeScrollX",bR="_applyTablePaneModel",cc="Integer",cd="dblclick",cl="__nT",cj="__nV",ct="dataEdited",co="__nQ",cB="__nR",cy="mousewheel",cf="interval",cE="__nU",cD="qx.ui.table.pane.Scroller",cC="__nP",ce="_applyShowCellFocusIndicator",ch="resize",ci="vertical",ck="changeScrollY",cm="appear",cp="table-scroller",cv="beforeSort",cA="cellDblclick",bY="horizontal",ca="losecapture",cg="contextmenu",cs="__nW",cr="col-resize",cq="disappear",cx="_applyVerticalScrollBarVisible",cw="_applyHorizontalScrollBarVisible",cn="cellContextmenu",cu="close",bF="changeTablePaneModel",cz="qx.ui.table.pane.Model",cb="changeVerticalScrollBarVisible";
qx.Class.define(cD,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,construct:function(en){qx.ui.core.Widget.call(this);
this.__nO=en;
var eo=new qx.ui.layout.Grid();
eo.setColumnFlex(0,1);
eo.setRowFlex(1,1);
this._setLayout(eo);
this.__nP=this._showChildControl(cH);
this.__nQ=this._showChildControl(bG);
this.__nR=this._showChildControl(cL);
this.__nS=this._showChildControl(cF);
this.__nT=new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({minWidth:0});
this._add(this.__nT,{row:0,column:0,colSpan:2});
this.__nU=new qx.ui.table.pane.Clipper();
this.__nU.add(this.__nR);
this.__nU.addListener(ca,this._onChangeCaptureHeader,this);
this.__nU.addListener(cM,this._onMousemoveHeader,this);
this.__nU.addListener(bN,this._onMousedownHeader,this);
this.__nU.addListener(bL,this._onMouseupHeader,this);
this.__nU.addListener(cJ,this._onClickHeader,this);
this.__nT.add(this.__nU,{flex:1});
this.__nV=new qx.ui.table.pane.Clipper();
this.__nV.add(this.__nS);
this.__nV.addListener(cy,this._onMousewheel,this);
this.__nV.addListener(cM,this._onMousemovePane,this);
this.__nV.addListener(bN,this._onMousedownPane,this);
this.__nV.addListener(bL,this._onMouseupPane,this);
this.__nV.addListener(cJ,this._onClickPane,this);
this.__nV.addListener(cg,this._onContextMenu,this);
this.__nV.addListener(cd,this._onDblclickPane,this);
this.__nV.addListener(ch,this._onResizePane,this);
this._add(this.__nV,{row:1,column:0});
this.__nW=this.getChildControl(bI);
this.getChildControl(bO).hide();
this.addListener(bU,this._onMouseout,this);
this.addListener(cm,this._onAppear,this);
this.addListener(cq,this._onDisappear,this);
this.__nX=new qx.event.Timer();
this.__nX.addListener(cf,this._oninterval,this);
this.initScrollTimeout();
},statics:{MIN_COLUMN_WIDTH:10,RESIZE_REGION_RADIUS:5,CLICK_TOLERANCE:5,HORIZONTAL_SCROLLBAR:1,VERTICAL_SCROLLBAR:2},events:{"changeScrollY":bM,"changeScrollX":bM,"cellClick":bK,"cellDblclick":bK,"cellContextmenu":bK,"beforeSort":bM},properties:{horizontalScrollBarVisible:{check:bP,init:true,apply:cw,event:bV},verticalScrollBarVisible:{check:bP,init:true,apply:cx,event:cb},tablePaneModel:{check:cz,apply:bR,event:bF},liveResize:{check:bP,init:false},focusCellOnMouseMove:{check:bP,init:false},selectBeforeFocus:{check:bP,init:false},showCellFocusIndicator:{check:bP,init:true,apply:ce},resetSelectionOnHeaderClick:{check:bP,init:true},scrollTimeout:{check:cc,init:100,apply:bT},appearance:{refine:true,init:cp}},members:{__nY:null,__nO:null,__oa:null,__ob:null,__oc:null,__od:null,__oe:null,__of:null,__og:null,__oh:null,__oi:null,__oj:null,__ok:null,__ol:null,__om:false,__on:null,__oo:null,__op:null,__oq:null,__or:null,__os:null,__ot:null,__ou:null,__nP:null,__nQ:null,__nR:null,__nU:null,__nS:null,__nV:null,__nW:null,__nT:null,__nX:null,getPaneInsetRight:function(){var dS=this.getTopRightWidget();
var dT=dS&&dS.isVisible()&&dS.getBounds()?dS.getBounds().width:0;
var dR=this.getVerticalScrollBarVisible()?this.getVerticalScrollBarWidth():0;
return Math.max(dT,dR);
},setPaneWidth:function(bu){if(this.isVerticalScrollBarVisible()){bu+=this.getPaneInsetRight();
}this.setWidth(bu);
},_createChildControlImpl:function(I){var J;

switch(I){case cL:J=(this.getTable().getNewTablePaneHeader())(this);
break;
case cF:J=(this.getTable().getNewTablePane())(this);
break;
case bI:J=new qx.ui.table.pane.FocusIndicator(this);
J.setUserBounds(0,0,0,0);
J.setZIndex(1000);
J.addListener(bL,this._onMouseupFocusIndicator,this);
this.__nV.add(J);
J.show();
J.setDecorator(null);
break;
case bO:J=new qx.ui.core.Widget();
J.setUserBounds(0,0,0,0);
J.setZIndex(1000);
this.__nV.add(J);
break;
case cH:J=this._createScrollBar(bY).set({minWidth:0,alignY:bS});
J.addListener(bJ,this._onScrollX,this);
this._add(J,{row:2,column:0});
break;
case bG:J=this._createScrollBar(ci);
J.addListener(bJ,this._onScrollY,this);
this._add(J,{row:1,column:1});
break;
}return J||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,I);
},_applyHorizontalScrollBarVisible:function(ew,ex){this.__nP.setVisibility(ew?cN:bH);
},_applyVerticalScrollBarVisible:function(dU,dV){this.__nQ.setVisibility(dU?cN:bH);
},_applyTablePaneModel:function(l,m){if(m!=null){m.removeListener(cI,this._onPaneModelChanged,this);
}l.addListener(cI,this._onPaneModelChanged,this);
},_applyShowCellFocusIndicator:function(eu,ev){if(eu){this.__nW.setDecorator(cO);
this._updateFocusIndicator();
}else{if(this.__nW){this.__nW.setDecorator(null);
}}},getScrollY:function(){return this.__nQ.getPosition();
},setScrollY:function(scrollY,di){this.__nQ.scrollTo(scrollY);

if(di){this._updateContent();
}},getScrollX:function(){return this.__nP.getPosition();
},setScrollX:function(scrollX){this.__nP.scrollTo(scrollX);
},getTable:function(){return this.__nO;
},onColVisibilityChanged:function(){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
},setColumnWidth:function(ey,ez){this.__nR.setColumnWidth(ey,ez);
this.__nS.setColumnWidth(ey,ez);
var eA=this.getTablePaneModel();
var x=eA.getX(ey);

if(x!=-1){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
}},onColOrderChanged:function(){this.__nR.onColOrderChanged();
this.__nS.onColOrderChanged();
this.updateHorScrollBarMaximum();
},onTableModelDataChanged:function(X,Y,ba,bb){this.__nS.onTableModelDataChanged(X,Y,ba,bb);
var bc=this.getTable().getTableModel().getRowCount();

if(bc!=this.__nY){this.updateVerScrollBarMaximum();

if(this.getFocusedRow()>=bc){if(bc==0){this.setFocusedCell(null,null);
}else{this.setFocusedCell(this.getFocusedColumn(),bc-1);
}}this.__nY=bc;
}},onSelectionChanged:function(){this.__nS.onSelectionChanged();
},onFocusChanged:function(){this.__nS.onFocusChanged();
},onTableModelMetaDataChanged:function(){this.__nR.onTableModelMetaDataChanged();
this.__nS.onTableModelMetaDataChanged();
},_onPaneModelChanged:function(){this.__nR.onPaneModelChanged();
this.__nS.onPaneModelChanged();
},_onResizePane:function(){this.updateHorScrollBarMaximum();
this.updateVerScrollBarMaximum();
this._updateContent();
this.__nR._updateContent();
this.__nO._updateScrollBarVisibility();
},updateHorScrollBarMaximum:function(){var A=this.__nV.getInnerSize();

if(!A){return ;
}var y=this.getTablePaneModel().getTotalWidth();
var z=this.__nP;

if(A.width<y){var w=Math.max(0,y-A.width);
z.setMaximum(w);
z.setKnobFactor(A.width/y);
var B=z.getPosition();
z.setPosition(Math.min(B,w));
}else{z.setMaximum(0);
z.setKnobFactor(1);
z.setPosition(0);
}},updateVerScrollBarMaximum:function(){var ff=this.__nV.getInnerSize();

if(!ff){return ;
}var fd=this.getTable().getTableModel();
var eY=fd.getRowCount();

if(this.getTable().getKeepFirstVisibleRowComplete()){eY+=1;
}var eX=this.getTable().getRowHeight();
var fb=eY*eX;
var fe=this.__nQ;

if(ff.height<fb){var fa=Math.max(0,fb-ff.height);
fe.setMaximum(fa);
fe.setKnobFactor(ff.height/fb);
var fc=fe.getPosition();
fe.setPosition(Math.min(fc,fa));
}else{fe.setMaximum(0);
fe.setKnobFactor(1);
fe.setPosition(0);
}},onKeepFirstVisibleRowCompleteChanged:function(){this.updateVerScrollBarMaximum();
this._updateContent();
},_onAppear:function(){this._startInterval(this.getScrollTimeout());
},_onDisappear:function(){this._stopInterval();
},_onScrollX:function(e){var ep=e.getData();
this.fireDataEvent(bQ,ep,e.getOldData());
this.__nU.scrollToX(ep);
this.__nV.scrollToX(ep);
},_onScrollY:function(e){this.fireDataEvent(ck,e.getData(),e.getOldData());
this._postponedUpdateContent();
},_onMousewheel:function(e){var dj=this.getTable();

if(!dj.getEnabled()){return;
}var dl=qx.bom.client.Engine.GECKO?1:3;
var dk=this.__nQ.getPosition()+((e.getWheelDelta()*dl)*dj.getRowHeight());
this.__nQ.scrollTo(dk);
if(this.__oo&&this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(this.__oo,this.__op);
}e.stop();
},__ov:function(dK){var dP=this.getTable();
var dQ=this.__nR.getHeaderWidgetAtColumn(this.__oi);
var dL=dQ.getSizeHint().minWidth;
var dN=Math.max(dL,this.__ok+dK-this.__oj);

if(this.getLiveResize()){var dM=dP.getTableColumnModel();
dM.setColumnWidth(this.__oi,dN);
}else{this.__nR.setColumnWidth(this.__oi,dN);
var dO=this.getTablePaneModel();
this._showResizeLine(dO.getColumnLeft(this.__oi)+dN);
}this.__oj+=dN-this.__ok;
this.__ok=dN;
},__ow:function(br){var bs=qx.ui.table.pane.Scroller.CLICK_TOLERANCE;

if(this.__nR.isShowingColumnMoveFeedback()||br>this.__oh+bs||br<this.__oh-bs){this.__oe+=br-this.__oh;
this.__nR.showColumnMoveFeedback(this.__od,this.__oe);
var bt=this.__nO.getTablePaneScrollerAtPageX(br);

if(this.__og&&this.__og!=bt){this.__og.hideColumnMoveFeedback();
}
if(bt!=null){this.__of=bt.showColumnMoveFeedback(br);
}else{this.__of=null;
}this.__og=bt;
this.__oh=br;
}},_onMousemoveHeader:function(e){var ek=this.getTable();

if(!ek.getEnabled()){return;
}var el=false;
var ee=null;
var ei=e.getDocumentLeft();
var ej=e.getDocumentTop();
this.__oo=ei;
this.__op=ej;

if(this.__oi!=null){this.__ov(ei);
el=true;
e.stopPropagation();
}else if(this.__od!=null){this.__ow(ei);
e.stopPropagation();
}else{var ef=this._getResizeColumnForPageX(ei);

if(ef!=-1){el=true;
}else{var eh=ek.getTableModel();
var em=this._getColumnForPageX(ei);

if(em!=null&&eh.isColumnSortable(em)){ee=em;
}}}var eg=el?cr:null;
this.getApplicationRoot().setGlobalCursor(eg);
this.setCursor(eg);
this.__nR.setMouseOverColumn(ee);
},_onMousemovePane:function(e){var dG=this.getTable();

if(!dG.getEnabled()){return;
}var dI=e.getDocumentLeft();
var dJ=e.getDocumentTop();
this.__oo=dI;
this.__op=dJ;
var dH=this._getRowForPagePos(dI,dJ);

if(dH!=null&&this._getColumnForPageX(dI)!=null){if(this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(dI,dJ);
}}this.__nR.setMouseOverColumn(null);
},_onMousedownHeader:function(e){if(!this.getTable().getEnabled()){return;
}var er=e.getDocumentLeft();
var es=this._getResizeColumnForPageX(er);

if(es!=-1){this._startResizeHeader(es,er);
e.stop();
}else{var eq=this._getColumnForPageX(er);

if(eq!=null){this._startMoveHeader(eq,er);
e.stop();
}}},_startResizeHeader:function(F,G){var H=this.getTable().getTableColumnModel();
this.__oi=F;
this.__oj=G;
this.__ok=H.getColumnWidth(this.__oi);
this.__nU.capture();
},_startMoveHeader:function(fw,fx){this.__od=fw;
this.__oh=fx;
this.__oe=this.getTablePaneModel().getColumnLeft(fw);
this.__nU.capture();
},_onMousedownPane:function(e){var fj=this.getTable();

if(!fj.getEnabled()){return;
}
if(fj.isEditing()){fj.stopEditing();
}var fg=e.getDocumentLeft();
var fi=e.getDocumentTop();
var fl=this._getRowForPagePos(fg,fi);
var fk=this._getColumnForPageX(fg);

if(fl!==null){this.__ol={row:fl,col:fk};
this.__om=false;
var fh=this.getSelectBeforeFocus();

if(fh){fj.getSelectionManager().handleMouseDown(fl,e);
}if(!this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(fg,fi);
}
if(!fh){fj.getSelectionManager().handleMouseDown(fl,e);
}}},_onMouseupFocusIndicator:function(e){if(this.__ol&&!this.__om&&!this.isEditing()&&this.__nW.getRow()==this.__ol.row&&this.__nW.getColumn()==this.__ol.col){this.fireEvent(cG,qx.ui.table.pane.CellEvent,[this,e,this.__ol.row,this.__ol.col],true);
this.__om=true;
}},_onChangeCaptureHeader:function(e){if(this.__oi!=null){this._stopResizeHeader();
}
if(this.__od!=null){this._stopMoveHeader();
}},_stopResizeHeader:function(){var eQ=this.getTable().getTableColumnModel();
if(!this.getLiveResize()){this._hideResizeLine();
eQ.setColumnWidth(this.__oi,this.__ok);
}this.__oi=null;
this.__nU.releaseCapture();
this.getApplicationRoot().setGlobalCursor(null);
this.setCursor(null);
if(this.isEditing()){var eR=this.__os.getBounds().height;
this.__os.setUserBounds(0,0,this.__ok,eR);
}},_stopMoveHeader:function(){var bz=this.getTable().getTableColumnModel();
var bA=this.getTablePaneModel();
this.__nR.hideColumnMoveFeedback();

if(this.__og){this.__og.hideColumnMoveFeedback();
}
if(this.__of!=null){var bC=bA.getFirstColumnX()+bA.getX(this.__od);
var by=this.__of;

if(by!=bC&&by!=bC+1){var bB=bz.getVisibleColumnAtX(bC);
var bx=bz.getVisibleColumnAtX(by);
var bw=bz.getOverallX(bB);
var bv=(bx!=null)?bz.getOverallX(bx):bz.getOverallColumnCount();

if(bv>bw){bv--;
}bz.moveColumn(bw,bv);
this._updateFocusIndicator();
}}this.__od=null;
this.__of=null;
this.__nU.releaseCapture();
},_onMouseupPane:function(e){var D=this.getTable();

if(!D.getEnabled()){return;
}var E=this._getRowForPagePos(e.getDocumentLeft(),e.getDocumentTop());

if(E!=-1&&E!=null&&this._getColumnForPageX(e.getDocumentLeft())!=null){D.getSelectionManager().handleMouseUp(E,e);
}},_onMouseupHeader:function(e){var et=this.getTable();

if(!et.getEnabled()){return;
}
if(this.__oi!=null){this._stopResizeHeader();
this.__on=true;
e.stop();
}else if(this.__od!=null){this._stopMoveHeader();
e.stop();
}},_onClickHeader:function(e){if(this.__on){this.__on=false;
return;
}var g=this.getTable();

if(!g.getEnabled()){return;
}var c=g.getTableModel();
var d=e.getDocumentLeft();
var b=this._getResizeColumnForPageX(d);

if(b==-1){var j=this._getColumnForPageX(d);

if(j!=null&&c.isColumnSortable(j)){var a=c.getSortColumnIndex();
var h=(j!=a)?true:!c.isSortAscending();
var i={column:j,ascending:h,clickEvent:e};

if(this.fireDataEvent(cv,i,null,true)){c.sortByColumn(j,h);

if(this.getResetSelectionOnHeaderClick()){g.getSelectionModel().resetSelection();
}}}}e.stop();
},_onClickPane:function(e){var eS=this.getTable();

if(!eS.getEnabled()){return;
}var eV=e.getDocumentLeft();
var eW=e.getDocumentTop();
var eT=this._getRowForPagePos(eV,eW);
var eU=this._getColumnForPageX(eV);

if(eT!=null&&eU!=null){eS.getSelectionManager().handleClick(eT,e);

if(this.__nW.isHidden()||(this.__ol&&!this.__om&&!this.isEditing()&&eT==this.__ol.row&&eU==this.__ol.col)){this.fireEvent(cG,qx.ui.table.pane.CellEvent,[this,e,eT,eU],true);
this.__om=true;
}}},_onContextMenu:function(e){var ea=e.getDocumentLeft();
var eb=e.getDocumentTop();
var dX=this._getRowForPagePos(ea,eb);
var dY=this._getColumnForPageX(ea);

if(this.__nW.isHidden()||(this.__ol&&dX==this.__ol.row&&dY==this.__ol.col)){this.fireEvent(cn,qx.ui.table.pane.CellEvent,[this,e,dX,dY],true);
var dW=this.getTable().getContextMenu();

if(dW){if(dW.getChildren().length>0){dW.openAtMouse(e);
}else{dW.exclude();
}e.preventDefault();
}}},_onContextMenuOpen:function(e){},_onDblclickPane:function(e){var dg=e.getDocumentLeft();
var dh=e.getDocumentTop();
this._focusCellAtPagePos(dg,dh);
this.startEditing();
var df=this._getRowForPagePos(dg,dh);

if(df!=-1&&df!=null){this.fireEvent(cA,qx.ui.table.pane.CellEvent,[this,e,df],true);
}},_onMouseout:function(e){var C=this.getTable();

if(!C.getEnabled()){return;
}if(this.__oi==null){this.setCursor(null);
this.getApplicationRoot().setGlobalCursor(null);
}this.__nR.setMouseOverColumn(null);
},_showResizeLine:function(x){var eO=this._showChildControl(bO);
var eN=eO.getWidth();
var eP=this.__nV.getBounds();
eO.setUserBounds(x-Math.round(eN/2),0,eN,eP.height);
},_hideResizeLine:function(){this._excludeChildControl(bO);
},showColumnMoveFeedback:function(K){var T=this.getTablePaneModel();
var S=this.getTable().getTableColumnModel();
var N=this.__nS.getContainerLocation().left;
var R=T.getColumnCount();
var O=0;
var M=0;
var W=N;

for(var L=0;L<R;L++){var P=T.getColumnAtX(L);
var U=S.getColumnWidth(P);

if(K<W+U/2){break;
}W+=U;
O=L+1;
M=W-N;
}var Q=this.__nV.getContainerLocation().left;
var V=this.__nV.getBounds().width;
var scrollX=Q-N;
M=qx.lang.Number.limit(M,scrollX+2,scrollX+V-1);
this._showResizeLine(M);
return T.getFirstColumnX()+O;
},hideColumnMoveFeedback:function(){this._hideResizeLine();
},_focusCellAtPagePos:function(eJ,eK){var eM=this._getRowForPagePos(eJ,eK);

if(eM!=-1&&eM!=null){var eL=this._getColumnForPageX(eJ);
this.__nO.setFocusedCell(eL,eM);
}},setFocusedCell:function(n,o){if(!this.isEditing()){this.__nS.setFocusedCell(n,o,this.__ob);
this.__oq=n;
this.__or=o;
this._updateFocusIndicator();
}},getFocusedColumn:function(){return this.__oq;
},getFocusedRow:function(){return this.__or;
},scrollCellVisible:function(bd,be){var bo=this.getTablePaneModel();
var bf=bo.getX(bd);

if(bf!=-1){var bl=this.__nV.getInnerSize();

if(!bl){return;
}var bm=this.getTable().getTableColumnModel();
var bi=bo.getColumnLeft(bd);
var bp=bm.getColumnWidth(bd);
var bg=this.getTable().getRowHeight();
var bq=be*bg;
var scrollX=this.getScrollX();
var scrollY=this.getScrollY();
var bn=Math.min(bi,bi+bp-bl.width);
var bk=bi;
this.setScrollX(Math.max(bn,Math.min(bk,scrollX)));
var bh=bq+bg-bl.height;

if(this.getTable().getKeepFirstVisibleRowComplete()){bh+=bg;
}var bj=bq;
this.setScrollY(Math.max(bh,Math.min(bj,scrollY)),true);
}},isEditing:function(){return this.__os!=null;
},startEditing:function(){var eF=this.getTable();
var eD=eF.getTableModel();
var eH=this.__oq;

if(!this.isEditing()&&(eH!=null)&&eD.isColumnEditable(eH)){var eI=this.__or;
var eB=this.getTablePaneModel().getX(eH);
var eC=eD.getValue(eH,eI);
this.__ot=eF.getTableColumnModel().getCellEditorFactory(eH);
var eE={col:eH,row:eI,xPos:eB,value:eC,table:eF};
this.__os=this.__ot.createCellEditor(eE);
if(this.__os===null){return false;
}else if(this.__os instanceof qx.ui.window.Window){this.__os.setModal(true);
this.__os.setShowClose(false);
this.__os.addListener(cu,this._onCellEditorModalWindowClose,this);
var f=eF.getModalCellEditorPreOpenFunction();

if(f!=null){f(this.__os,eE);
}this.__os.open();
}else{var eG=this.__nW.getInnerSize();
this.__os.setUserBounds(0,0,eG.width,eG.height);
this.__nW.addListener(bN,function(e){this.__ol={row:this.__or,col:this.__oq};
e.stopPropagation();
},this);
this.__nW.add(this.__os);
this.__nW.addState(cK);
this.__nW.setKeepActive(false);
this.__nW.setDecorator(cO);
this.__os.focus();
this.__os.activate();
}return true;
}return false;
},stopEditing:function(){if(!this.getShowCellFocusIndicator()){this.__nW.setDecorator(null);
}this.flushEditor();
this.cancelEditing();
},flushEditor:function(){if(this.isEditing()){var bE=this.__ot.getCellEditorValue(this.__os);
var bD=this.getTable().getTableModel().getValue(this.__oq,this.__or);
this.getTable().getTableModel().setValue(this.__oq,this.__or,bE);
this.__nO.focus();
this.__nO.fireDataEvent(ct,{row:this.__or,col:this.__oq,oldValue:bD,value:bE});
}},cancelEditing:function(){if(this.isEditing()&&!this.__os.pendingDispose){if(this._cellEditorIsModalWindow){this.__os.destroy();
this.__os=null;
this.__ot=null;
this.__os.pendingDispose=true;
}else{this.__nW.removeState(cK);
this.__nW.setKeepActive(true);
this.__os.destroy();
this.__os=null;
this.__ot=null;
}}},_onCellEditorModalWindowClose:function(e){this.stopEditing();
},_getColumnForPageX:function(p){var s=this.getTable().getTableColumnModel();
var t=this.getTablePaneModel();
var r=t.getColumnCount();
var v=this.__nR.getContainerLocation().left;

for(var x=0;x<r;x++){var q=t.getColumnAtX(x);
var u=s.getColumnWidth(q);
v+=u;

if(p<v){return q;
}}return null;
},_getResizeColumnForPageX:function(dm){var dr=this.getTable().getTableColumnModel();
var ds=this.getTablePaneModel();
var dq=ds.getColumnCount();
var du=this.__nR.getContainerLocation().left;
var dn=qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;

for(var x=0;x<dq;x++){var dp=ds.getColumnAtX(x);
var dt=dr.getColumnWidth(dp);
du+=dt;

if(dm>=(du-dn)&&dm<=(du+dn)){return dp;
}}return -1;
},_getRowForPagePos:function(fn,fo){var fp=this.__nS.getContentLocation();

if(fn<fp.left||fn>fp.right){return null;
}
if(fo>=fp.top&&fo<=fp.bottom){var fq=this.getTable().getRowHeight();
var scrollY=this.__nQ.getPosition();

if(this.getTable().getKeepFirstVisibleRowComplete()){scrollY=Math.floor(scrollY/fq)*fq;
}var ft=scrollY+fo-fp.top;
var fv=Math.floor(ft/fq);
var fu=this.getTable().getTableModel();
var fr=fu.getRowCount();
return (fv<fr)?fv:null;
}var fs=this.__nR.getContainerLocation();

if(fo>=fs.top&&fo<=fs.bottom&&fn<=fs.right){return -1;
}return null;
},setTopRightWidget:function(dv){var dw=this.__ou;

if(dw!=null){this.__nT.remove(dw);
}
if(dv!=null){this.__nT.add(dv);
}this.__ou=dv;
},getTopRightWidget:function(){return this.__ou;
},getHeader:function(){return this.__nR;
},getTablePane:function(){return this.__nS;
},getVerticalScrollBarWidth:function(){var fm=this.__nQ;
return fm.isVisible()?(fm.getSizeHint().width||0):0;
},getNeededScrollBars:function(cP,cQ){var cW=this.__nQ.getSizeHint().width;
var cX=this.__nV.getInnerSize();
var cR=cX?cX.width:0;

if(this.getVerticalScrollBarVisible()){cR+=cW;
}var db=cX?cX.height:0;

if(this.getHorizontalScrollBarVisible()){db+=cW;
}var cU=this.getTable().getTableModel();
var cY=cU.getRowCount();
var dc=this.getTablePaneModel().getTotalWidth();
var da=this.getTable().getRowHeight()*cY;
var cT=false;
var dd=false;

if(dc>cR){cT=true;

if(da>db-cW){dd=true;
}}else if(da>db){dd=true;

if(!cQ&&(dc>cR-cW)){cT=true;
}}var cV=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var cS=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
return ((cP||cT)?cV:0)|((cQ||!dd)?0:cS);
},getPaneClipper:function(){return this.__nV;
},_applyScrollTimeout:function(ec,ed){this._startInterval(ec);
},_startInterval:function(k){this.__nX.setInterval(k);
this.__nX.start();
},_stopInterval:function(){this.__nX.stop();
},_postponedUpdateContent:function(){this._updateContent();
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.__ob&&!this.__nS._layoutPending){this.__ob=false;
this._updateContent();
}}),_updateContent:function(){var dB=this.__nV.getInnerSize();

if(!dB){return;
}var dE=dB.height;
var scrollX=this.__nP.getPosition();
var scrollY=this.__nQ.getPosition();
var dy=this.getTable().getRowHeight();
var dz=Math.floor(scrollY/dy);
var dD=this.__nS.getFirstVisibleRow();
this.__nS.setFirstVisibleRow(dz);
var dA=Math.ceil(dE/dy);
var dx=0;
var dC=this.getTable().getKeepFirstVisibleRowComplete();

if(!dC){dA++;
dx=scrollY%dy;
}this.__nS.setVisibleRowCount(dA);

if(dz!=dD){this._updateFocusIndicator();
}this.__nV.scrollToX(scrollX);
if(!dC){this.__nV.scrollToY(dx);
}},_updateFocusIndicator:function(){var de=this.getTable();

if(!de.getEnabled()){return;
}this.__nW.moveToCell(this.__oq,this.__or);
}},destruct:function(){this._stopInterval();
var dF=this.getTablePaneModel();

if(dF){dF.dispose();
}this.__ol=this.__ou=this.__nO=null;
this._disposeObjects(cC,co,cE,cj,cs,cB,bW,cl,bX);
}});
})();
(function(){var b="qx.ui.core.scroll.IScrollBar",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"scroll":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(c){this.assertNumber(c);
},scrollBy:function(e){this.assertNumber(e);
},scrollBySteps:function(d){this.assertNumber(d);
}}});
})();
(function(){var r="horizontal",q="px",p="scroll",o="vertical",n="-1px",m="qx.client",l="0",k="hidden",j="mousedown",i="qx.ui.core.scroll.NativeScrollBar",G="PositiveNumber",F="__oy",E="Integer",D="mousemove",C="_applyMaximum",B="_applyOrientation",A="appear",z="opera",y="PositiveInteger",x="mshtml",v="mouseup",w="Number",t="_applyPosition",u="scrollbar",s="native";
qx.Class.define(i,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(H){qx.ui.core.Widget.call(this);
this.addState(s);
this.getContentElement().addListener(p,this._onScroll,this);
this.addListener(j,this._stopPropagation,this);
this.addListener(v,this._stopPropagation,this);
this.addListener(D,this._stopPropagation,this);

if(qx.core.Variant.isSet(m,z)){this.addListener(A,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(H!=null){this.setOrientation(H);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:u},orientation:{check:[r,o],init:r,apply:B},maximum:{check:y,apply:C,init:100},position:{check:w,init:0,apply:t,event:p},singleStep:{check:E,init:20},knobFactor:{check:G,nullable:true}},members:{__ox:null,__oy:null,_getScrollPaneElement:function(){if(!this.__oy){this.__oy=new qx.html.Element();
}return this.__oy;
},renderLayout:function(d,top,f,g){var h=qx.ui.core.Widget.prototype.renderLayout.call(this,d,top,f,g);
this._updateScrollBar();
return h;
},_getContentHint:function(){var P=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__ox?100:P,maxWidth:this.__ox?null:P,minWidth:this.__ox?null:P,height:this.__ox?P:100,maxHeight:this.__ox?P:null,minHeight:this.__ox?P:null};
},_applyEnabled:function(a,b){qx.ui.core.Widget.prototype._applyEnabled.call(this,a,b);
this._updateScrollBar();
},_applyMaximum:function(O){this._updateScrollBar();
},_applyPosition:function(Q){var content=this.getContentElement();

if(this.__ox){content.scrollToX(Q);
}else{content.scrollToY(Q);
}},_applyOrientation:function(J,K){var L=this.__ox=J===r;
this.set({allowGrowX:L,allowShrinkX:L,allowGrowY:!L,allowShrinkY:!L});

if(L){this.replaceState(o,r);
}else{this.replaceState(r,o);
}this.getContentElement().setStyles({overflowX:L?p:k,overflowY:L?k:p});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var S=this.__ox;
var T=this.getBounds();

if(!T){return;
}
if(this.isEnabled()){var U=S?T.width:T.height;
var R=this.getMaximum()+U;
}else{R=0;
}if(qx.core.Variant.isSet(m,x)){var T=this.getBounds();
this.getContentElement().setStyles({left:S?l:n,top:S?n:l,width:(S?T.width:T.width+1)+q,height:(S?T.height+1:T.height)+q});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(S?R:1)+q,height:(S?1:R)+q});
this.scrollTo(this.getPosition());
},scrollTo:function(I){this.setPosition(Math.max(0,Math.min(this.getMaximum(),I)));
},scrollBy:function(c){this.scrollTo(this.getPosition()+c);
},scrollBySteps:function(V){var W=this.getSingleStep();
this.scrollBy(V*W);
},_onScroll:function(e){var N=this.getContentElement();
var M=this.__ox?N.getScrollX():N.getScrollY();
this.setPosition(M);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(F);
}});
})();
(function(){var s="slider",r="horizontal",q="button-begin",p="vertical",o="button-end",n="Integer",m="execute",l="right",k="left",j="down",H="up",G="PositiveNumber",F="changeValue",E="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",D="_applyKnobFactor",C="knob",B="qx.ui.core.scroll.ScrollBar",A="resize",z="_applyOrientation",y="_applyPageStep",w="PositiveInteger",x="scroll",u="_applyPosition",v="scrollbar",t="_applyMaximum";
qx.Class.define(B,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(N){qx.ui.core.Widget.call(this);
this._createChildControl(q);
this._createChildControl(s).addListener(A,this._onResizeSlider,this);
this._createChildControl(o);
if(N!=null){this.setOrientation(N);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:v},orientation:{check:[r,p],init:r,apply:z},maximum:{check:w,apply:t,init:100},position:{check:E,init:0,apply:u,event:x},singleStep:{check:n,init:20},pageStep:{check:n,init:10,apply:y},knobFactor:{check:G,apply:D,nullable:true}},members:{__oz:2,_createChildControlImpl:function(f){var g;

switch(f){case s:g=new qx.ui.core.scroll.ScrollSlider();
g.setPageStep(100);
g.setFocusable(false);
g.addListener(F,this._onChangeSliderValue,this);
this._add(g,{flex:1});
break;
case q:g=new qx.ui.form.RepeatButton();
g.setFocusable(false);
g.addListener(m,this._onExecuteBegin,this);
this._add(g);
break;
case o:g=new qx.ui.form.RepeatButton();
g.setFocusable(false);
g.addListener(m,this._onExecuteEnd,this);
this._add(g);
break;
}return g||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,f);
},_applyMaximum:function(Q){this.getChildControl(s).setMaximum(Q);
},_applyPosition:function(R){this.getChildControl(s).setValue(R);
},_applyKnobFactor:function(a){this.getChildControl(s).setKnobFactor(a);
},_applyPageStep:function(P){this.getChildControl(s).setPageStep(P);
},_applyOrientation:function(b,c){var d=this._getLayout();

if(d){d.dispose();
}if(b===r){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(p,r);
this.getChildControl(q).replaceState(H,k);
this.getChildControl(o).replaceState(j,l);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(r,p);
this.getChildControl(q).replaceState(k,H);
this.getChildControl(o).replaceState(l,j);
}this.getChildControl(s).setOrientation(b);
},scrollTo:function(M){this.getChildControl(s).slideTo(M);
},scrollBy:function(O){this.getChildControl(s).slideBy(O);
},scrollBySteps:function(h){var i=this.getSingleStep();
this.getChildControl(s).slideBy(h*i);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var I=this.getChildControl(s).getChildControl(C);
var L=I.getSizeHint();
var J=false;
var K=this.getChildControl(s).getInnerSize();

if(this.getOrientation()==p){if(K.height<L.minHeight+this.__oz){J=true;
}}else{if(K.width<L.minWidth+this.__oz){J=true;
}}
if(J){I.exclude();
}else{I.show();
}}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.IRange";
qx.Interface.define(b,{members:{setMinimum:function(c){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(e){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(d){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(a){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var S="knob",R="horizontal",Q="vertical",P="Integer",O="hovered",N="left",M="top",L="mouseup",K="pressed",J="px",bE="changeValue",bD="interval",bC="mousemove",bB="resize",bA="slider",bz="mousedown",by="PageUp",bx="mouseout",bw='qx.event.type.Data',bv="Left",ba="Down",bb="Up",X="dblclick",Y="qx.ui.form.Slider",V="PageDown",W="mousewheel",T="_applyValue",U="_applyKnobFactor",bc="End",bd="height",bk="Right",bi="width",bo="_applyOrientation",bm="Home",br="mouseover",bq="floor",bf="_applyMinimum",bu="click",bt="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",bs="keypress",be="ceil",bg="losecapture",bh="contextmenu",bj="_applyMaximum",bl="Number",bn="changeMaximum",bp="changeMinimum";
qx.Class.define(Y,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(c){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(bs,this._onKeyPress);
this.addListener(W,this._onMouseWheel);
this.addListener(bz,this._onMouseDown);
this.addListener(L,this._onMouseUp);
this.addListener(bg,this._onMouseUp);
this.addListener(bB,this._onUpdate);
this.addListener(bh,this._onStopEvent);
this.addListener(bu,this._onStopEvent);
this.addListener(X,this._onStopEvent);
if(c!=null){this.setOrientation(c);
}else{this.initOrientation();
}},events:{changeValue:bw},properties:{appearance:{refine:true,init:bA},focusable:{refine:true,init:true},orientation:{check:[R,Q],init:R,apply:bo},value:{check:bt,init:0,apply:T,nullable:true},minimum:{check:P,init:0,apply:bf,event:bp},maximum:{check:P,init:100,apply:bj,event:bn},singleStep:{check:P,init:1},pageStep:{check:P,init:10},knobFactor:{check:bl,apply:U,nullable:true}},members:{__oA:null,__oB:null,__oC:null,__oD:null,__oE:null,__oF:null,__oG:null,__oH:null,__oI:null,__oJ:null,__oK:null,__oL:null,_forwardStates:{invalid:true},_createChildControlImpl:function(E){var F;

switch(E){case S:F=new qx.ui.core.Widget();
F.addListener(bB,this._onUpdate,this);
F.addListener(br,this._onMouseOver);
F.addListener(bx,this._onMouseOut);
this._add(F);
break;
}return F||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,E);
},_onMouseOver:function(e){this.addState(O);
},_onMouseOut:function(e){this.removeState(O);
},_onMouseWheel:function(e){var d=e.getWheelDelta()>0?1:-1;
this.slideBy(d*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var j=this.getOrientation()===R;
var i=j?bv:bb;
var forward=j?bk:ba;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case i:this.slideBack();
break;
case V:this.slidePageForward();
break;
case by:this.slidePageBack();
break;
case bm:this.slideToBegin();
break;
case bc:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__oD){return;
}var s=this.__oN;
var q=this.getChildControl(S);
var r=s?N:M;
var u=s?e.getDocumentLeft():e.getDocumentTop();
var v=this.__oA=qx.bom.element.Location.get(this.getContentElement().getDomElement())[r];
var t=this.__oB=qx.bom.element.Location.get(q.getContainerElement().getDomElement())[r];

if(e.getTarget()===q){this.__oD=true;

if(!this.__oJ){this.__oJ=new qx.event.Timer(100);
this.__oJ.addListener(bD,this._fireValue,this);
}this.__oJ.start();
this.__oE=u+v-t;
q.addState(K);
}else{this.__oF=true;
this.__oG=u<=t?-1:1;
this.__oO(e);
this._onInterval();
if(!this.__oI){this.__oI=new qx.event.Timer(100);
this.__oI.addListener(bD,this._onInterval,this);
}this.__oI.start();
}this.addListener(bC,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__oD){this.releaseCapture();
delete this.__oD;
this.__oJ.stop();
this._fireValue();
delete this.__oE;
this.getChildControl(S).removeState(K);
if(e.getType()===L){var C;
var D;
var B;

if(this.__oN){C=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__oA);
B=qx.bom.element.Location.get(this.getContentElement().getDomElement())[M];
D=e.getDocumentTop()-(B+this.getChildControl(S).getBounds().top);
}else{C=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__oA);
B=qx.bom.element.Location.get(this.getContentElement().getDomElement())[N];
D=e.getDocumentLeft()-(B+this.getChildControl(S).getBounds().left);
}
if(D<0||D>this.__oC||C<0||C>this.__oC){this.getChildControl(S).removeState(O);
}}}else if(this.__oF){this.__oI.stop();
this.releaseCapture();
delete this.__oF;
delete this.__oG;
delete this.__oH;
}this.removeListener(bC,this._onMouseMove);
if(e.getType()===L){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__oD){var bL=this.__oN?e.getDocumentLeft():e.getDocumentTop();
var bK=bL-this.__oE;
this.slideTo(this._positionToValue(bK));
}else if(this.__oF){this.__oO(e);
}e.stopPropagation();
},_onInterval:function(e){var k=this.getValue()+(this.__oG*this.getPageStep());
if(k<this.getMinimum()){k=this.getMinimum();
}else if(k>this.getMaximum()){k=this.getMaximum();
}var l=this.__oG==-1;

if((l&&k<=this.__oH)||(!l&&k>=this.__oH)){k=this.__oH;
}this.slideTo(k);
},_onUpdate:function(e){var H=this.getInnerSize();
var I=this.getChildControl(S).getBounds();
var G=this.__oN?bi:bd;
this._updateKnobSize();
this.__oM=H[G]-I[G];
this.__oC=I[G];
this._updateKnobPosition();
},__oN:false,__oM:0,__oO:function(e){var bQ=this.__oN;
var bX=bQ?e.getDocumentLeft():e.getDocumentTop();
var ca=this.__oA;
var bR=this.__oB;
var cc=this.__oC;
var bY=bX-ca;

if(bX>=bR){bY-=cc;
}var bV=this._positionToValue(bY);
var bS=this.getMinimum();
var bT=this.getMaximum();

if(bV<bS){bV=bS;
}else if(bV>bT){bV=bT;
}else{var bW=this.getValue();
var bU=this.getPageStep();
var cb=this.__oG<0?bq:be;
bV=bW+(Math[cb]((bV-bW)/bU)*bU);
}if(this.__oH==null||(this.__oG==-1&&bV<=this.__oH)||(this.__oG==1&&bV>=this.__oH)){this.__oH=bV;
}},_positionToValue:function(m){var n=this.__oM;
if(n==null||n==0){return 0;
}var p=m/n;

if(p<0){p=0;
}else if(p>1){p=1;
}var o=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(o*p);
},_valueToPosition:function(bF){var bG=this.__oM;

if(bG==null){return 0;
}var bH=this.getMaximum()-this.getMinimum();
if(bH==0){return 0;
}var bF=bF-this.getMinimum();
var bI=bF/bH;

if(bI<0){bI=0;
}else if(bI>1){bI=1;
}return Math.round(bG*bI);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(w){var x=this.getChildControl(S).getContainerElement();

if(this.__oN){x.setStyle(N,w+J,true);
}else{x.setStyle(M,w+J,true);
}},_updateKnobSize:function(){var bP=this.getKnobFactor();

if(bP==null){return;
}var bO=this.getInnerSize();

if(bO==null){return;
}if(this.__oN){this.getChildControl(S).setWidth(Math.round(bP*bO.width));
}else{this.getChildControl(S).setHeight(Math.round(bP*bO.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(cf){this.slideTo(this.getValue()+cf);
},slideTo:function(bJ){if(bJ<this.getMinimum()){bJ=this.getMinimum();
}else if(bJ>this.getMaximum()){bJ=this.getMaximum();
}else{bJ=this.getMinimum()+Math.round((bJ-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(bJ);
},_applyOrientation:function(y,z){var A=this.getChildControl(S);
this.__oN=y===R;
if(this.__oN){this.removeState(Q);
A.removeState(Q);
this.addState(R);
A.addState(R);
A.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(R);
A.removeState(R);
this.addState(Q);
A.addState(Q);
A.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(bM,bN){if(bM!=null){this._updateKnobSize();
}else{if(this.__oN){this.getChildControl(S).resetWidth();
}else{this.getChildControl(S).resetHeight();
}}},_applyValue:function(cd,ce){if(cd!=null){this._updateKnobPosition();

if(this.__oD){this.__oL=[cd,ce];
}else{this.fireEvent(bE,qx.event.type.Data,[cd,ce]);
}}else{this.resetValue();
}},_fireValue:function(){if(!this.__oL){return;
}var f=this.__oL;
this.__oL=null;
this.fireEvent(bE,qx.event.type.Data,f);
},_applyMinimum:function(g,h){if(this.getValue()<g){this.setValue(g);
}this._updateKnobPosition();
},_applyMaximum:function(a,b){if(this.getValue()>a){this.setValue(a);
}this._updateKnobPosition();
}}});
})();
(function(){var d="horizontal",c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(e){qx.ui.form.Slider.call(this,e);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
},members:{getSizeHint:function(f){var g=qx.ui.form.Slider.prototype.getSizeHint.call(this);
if(this.getOrientation()===d){g.width=0;
}else{g.height=0;
}return g;
}}});
})();
(function(){var b="qx.ui.table.pane.Clipper";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this,new qx.ui.layout.Grow());
this.setMinWidth(0);
},members:{scrollToX:function(a){this.getContentElement().scrollToX(a,false);
},scrollToY:function(c){this.getContentElement().scrollToY(c,true);
}}});
})();
(function(){var h="Integer",g="Escape",f="keypress",d="Enter",c="excluded",b="qx.ui.table.pane.FocusIndicator";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(a){qx.ui.container.Composite.call(this);
this.__oP=a;
this.setKeepActive(true);
this.addListener(f,this._onKeyPress,this);
},properties:{visibility:{refine:true,init:c},row:{check:h,nullable:true},column:{check:h,nullable:true}},members:{__oP:null,_onKeyPress:function(e){var i=e.getKeyIdentifier();

if(i!==g&&i!==d){e.stopPropagation();
}},moveToCell:function(j,k){if(j==null){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var l=this.__oP.getTablePaneModel().getX(j);

if(l==-1){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var q=this.__oP.getTable();
var o=q.getTableColumnModel();
var p=this.__oP.getTablePaneModel();
var n=this.__oP.getTablePane().getFirstVisibleRow();
var m=q.getRowHeight();
this.setUserBounds(p.getColumnLeft(j)-2,(k-n)*m-2,o.getColumnWidth(j)+3,m+3);
this.show();
this.setRow(k);
this.setColumn(j);
}}}},destruct:function(){this.__oP=null;
}});
})();
(function(){var b="Integer",a="qx.ui.table.pane.CellEvent";
qx.Class.define(a,{extend:qx.event.type.Mouse,properties:{row:{check:b,nullable:true},column:{check:b,nullable:true}},members:{init:function(c,d,e,f){d.clone(this);
this.setBubbles(false);

if(e!=null){this.setRow(e);
}else{this.setRow(c._getRowForPagePos(this.getDocumentLeft(),this.getDocumentTop()));
}
if(f!=null){this.setColumn(f);
}else{this.setColumn(c._getColumnForPageX(this.getDocumentLeft()));
}},clone:function(g){var h=qx.event.type.Mouse.prototype.clone.call(this,g);
h.set({row:this.getRow(),column:this.getColumn()});
return h;
}}});
})();
(function(){var a="qx.lang.Number";
qx.Class.define(a,{statics:{isInRange:function(b,c,d){return b>=c&&b<=d;
},isBetweenRange:function(e,f,g){return e>f&&e<g;
},limit:function(h,i,j){if(j!=null&&h>j){return j;
}else if(i!=null&&h<i){return i;
}else{return h;
}}}});
})();
(function(){var A="Boolean",z="resize",y="mousedown",x="w-resize",w="sw-resize",v="n-resize",u="resizableRight",t="ne-resize",s="se-resize",r="Integer",P="e-resize",O="resizableLeft",N="mousemove",M="move",L="shorthand",K="maximized",J="nw-resize",I="mouseout",H="qx.ui.core.MResizable",G="mouseup",E="losecapture",F="resize-frame",C="resizableBottom",D="s-resize",B="resizableTop";
qx.Mixin.define(H,{construct:function(){this.addListener(y,this.__pd,this,true);
this.addListener(G,this.__pe,this);
this.addListener(N,this.__pg,this);
this.addListener(I,this.__ph,this);
this.addListener(E,this.__pf,this);
var l=this.getContainerElement().getDomElement();

if(l==null){l=window;
}this.__oQ=qx.event.Registration.getManager(l).getHandler(qx.event.handler.DragDrop);
},properties:{resizableTop:{check:A,init:true},resizableRight:{check:A,init:true},resizableBottom:{check:A,init:true},resizableLeft:{check:A,init:true},resizable:{group:[B,u,C,O],mode:L},resizeSensitivity:{check:r,init:5},useResizeFrame:{check:A,init:true}},members:{__oQ:null,__oR:null,__oS:null,__oT:null,__oU:null,__oV:null,__oW:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__oX:function(){var a=this.__oR;

if(!a){a=this.__oR=new qx.ui.core.Widget();
a.setAppearance(F);
a.exclude();
qx.core.Init.getApplication().getRoot().add(a);
}return a;
},__oY:function(){var R=this.__oV;
var Q=this.__oX();
Q.setUserBounds(R.left,R.top,R.width,R.height);
Q.show();
Q.setZIndex(this.getZIndex()+1);
},__pa:function(e){var T=this.__oS;
var U=this.getSizeHint();
var X=this.__oW;
var W=this.__oV;
var S=W.width;
var V=W.height;
var ba=W.left;
var top=W.top;
var Y;

if((T&this.RESIZE_TOP)||(T&this.RESIZE_BOTTOM)){Y=Math.max(X.top,Math.min(X.bottom,e.getDocumentTop()))-this.__oU;

if(T&this.RESIZE_TOP){V-=Y;
}else{V+=Y;
}
if(V<U.minHeight){V=U.minHeight;
}else if(V>U.maxHeight){V=U.maxHeight;
}
if(T&this.RESIZE_TOP){top+=W.height-V;
}}
if((T&this.RESIZE_LEFT)||(T&this.RESIZE_RIGHT)){Y=Math.max(X.left,Math.min(X.right,e.getDocumentLeft()))-this.__oT;

if(T&this.RESIZE_LEFT){S-=Y;
}else{S+=Y;
}
if(S<U.minWidth){S=U.minWidth;
}else if(S>U.maxWidth){S=U.maxWidth;
}
if(T&this.RESIZE_LEFT){ba+=W.width-S;
}}return {viewportLeft:ba,viewportTop:top,parentLeft:W.bounds.left+ba-W.left,parentTop:W.bounds.top+top-W.top,width:S,height:V};
},__pb:{1:v,2:D,4:x,8:P,5:J,6:w,9:t,10:s},__pc:function(e){var o=this.getContentLocation();
var m=this.getResizeSensitivity();
var q=e.getDocumentLeft();
var p=e.getDocumentTop();
var n=0;

if(this.getResizableTop()&&Math.abs(o.top-p)<m){n+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(o.bottom-p)<m){n+=this.RESIZE_BOTTOM;
}
if(this.getResizableLeft()&&Math.abs(o.left-q)<m){n+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(o.right-q)<m){n+=this.RESIZE_RIGHT;
}this.__oS=n;
},__pd:function(e){if(!this.__oS){return;
}this.addState(z);
this.__oT=e.getDocumentLeft();
this.__oU=e.getDocumentTop();
var location=this.getContainerLocation();
var k=this.getBounds();
this.__oV={top:location.top,left:location.left,width:k.width,height:k.height,bounds:qx.lang.Object.clone(k)};
var parent=this.getLayoutParent();
var i=parent.getContentLocation();
var j=parent.getBounds();
this.__oW={left:i.left,top:i.top,right:i.left+j.width,bottom:i.top+j.height};
if(this.getUseResizeFrame()){this.__oY();
}this.capture();
e.stop();
},__pe:function(e){if(!this.hasState(z)){return;
}if(this.getUseResizeFrame()){this.__oX().exclude();
}var h=this.__pa(e);
this.setWidth(h.width);
this.setHeight(h.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:h.parentLeft,top:h.parentTop});
}this.__oS=0;
this.removeState(z);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__pf:function(e){if(!this.__oS){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(M);
if(this.getUseResizeFrame()){this.__oX().exclude();
}},__pg:function(e){if(this.hasState(z)){var f=this.__pa(e);
if(this.getUseResizeFrame()){var c=this.__oX();
c.setUserBounds(f.viewportLeft,f.viewportTop,f.width,f.height);
}else{this.setWidth(f.width);
this.setHeight(f.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:f.parentLeft,top:f.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(K)&&!this.__oQ.isSessionActive()){this.__pc(e);
var g=this.__oS;
var d=this.getApplicationRoot();

if(g){var b=this.__pb[g];
this.setCursor(b);
d.setGlobalCursor(b);
}else if(this.getCursor()){this.resetCursor();
d.resetGlobalCursor();
}}},__ph:function(e){if(this.getCursor()&&!this.hasState(z)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__oR!=null&&!qx.core.ObjectRegistry.inShutDown){this.__oR.destroy();
this.__oR=null;
}this.__oQ=null;
}});
})();
(function(){var n="move",m="Boolean",l="mouseup",k="mousedown",j="losecapture",i="qx.ui.core.MMovable",h="__pj",g="__pi",f="mousemove",d="maximized",c="move-frame";
qx.Mixin.define(i,{properties:{movable:{check:m,init:true},useMoveFrame:{check:m,init:false}},members:{__pi:null,__pj:null,__pk:null,__pl:null,__pm:null,__pn:null,__po:null,__pp:false,__pq:null,__pr:0,_activateMoveHandle:function(p){if(this.__pi){throw new Error("The move handle could not be redefined!");
}this.__pi=p;
p.addListener(k,this._onMoveMouseDown,this);
p.addListener(l,this._onMoveMouseUp,this);
p.addListener(f,this._onMoveMouseMove,this);
p.addListener(j,this.__pv,this);
},__ps:function(){var o=this.__pj;

if(!o){o=this.__pj=new qx.ui.core.Widget();
o.setAppearance(c);
o.exclude();
qx.core.Init.getApplication().getRoot().add(o);
}return o;
},__pt:function(){var location=this.getContainerLocation();
var u=this.getBounds();
var t=this.__ps();
t.setUserBounds(location.left,location.top,u.width,u.height);
t.show();
t.setZIndex(this.getZIndex()+1);
},__pu:function(e){var w=this.__pk;
var z=Math.max(w.left,Math.min(w.right,e.getDocumentLeft()));
var y=Math.max(w.top,Math.min(w.bottom,e.getDocumentTop()));
var v=this.__pl+z;
var x=this.__pm+y;
return {viewportLeft:v,viewportTop:x,parentLeft:v-this.__pn,parentTop:x-this.__po};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(d)){return;
}var parent=this.getLayoutParent();
var r=parent.getContentLocation();
var s=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__pp=true;
this.__pq=parent.getBlockerColor();
this.__pr=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
}}this.__pk={left:r.left,top:r.top,right:r.left+s.width,bottom:r.top+s.height};
var q=this.getContainerLocation();
this.__pn=r.left;
this.__po=r.top;
this.__pl=q.left-e.getDocumentLeft();
this.__pm=q.top-e.getDocumentTop();
this.addState(n);
this.__pi.capture();
if(this.getUseMoveFrame()){this.__pt();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(n)){return;
}var a=this.__pu(e);

if(this.getUseMoveFrame()){this.__ps().setDomPosition(a.viewportLeft,a.viewportTop);
}else{this.setDomPosition(a.parentLeft,a.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(n)){return;
}this.removeState(n);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__pp){parent.unblockContent();
parent.setBlockerColor(this.__pq);
parent.setBlockerOpacity(this.__pr);
this.__pq=null;
this.__pr=0;
}}this.__pi.releaseCapture();
var b=this.__pu(e);
this.setLayoutProperties({left:b.parentLeft,top:b.parentTop});
if(this.getUseMoveFrame()){this.__ps().exclude();
}e.stopPropagation();
},__pv:function(e){if(!this.hasState(n)){return;
}this.removeState(n);
if(this.getUseMoveFrame()){this.__ps().exclude();
}}},destruct:function(){this._disposeObjects(h,g);
this.__pk=null;
}});
})();
(function(){var u="Integer",t="_applyContentPadding",s="resetPaddingRight",r="setPaddingBottom",q="resetPaddingTop",p="qx.ui.core.MContentPadding",o="resetPaddingLeft",n="setPaddingTop",m="setPaddingRight",l="resetPaddingBottom",h="contentPaddingLeft",k="setPaddingLeft",j="contentPaddingTop",g="shorthand",f="contentPaddingRight",i="contentPaddingBottom";
qx.Mixin.define(p,{properties:{contentPaddingTop:{check:u,init:0,apply:t,themeable:true},contentPaddingRight:{check:u,init:0,apply:t,themeable:true},contentPaddingBottom:{check:u,init:0,apply:t,themeable:true},contentPaddingLeft:{check:u,init:0,apply:t,themeable:true},contentPadding:{group:[j,f,i,h],mode:g,themeable:true}},members:{__pw:{contentPaddingTop:n,contentPaddingRight:m,contentPaddingBottom:r,contentPaddingLeft:k},__px:{contentPaddingTop:q,contentPaddingRight:s,contentPaddingBottom:l,contentPaddingLeft:o},_applyContentPadding:function(a,b,name){var c=this._getContentPaddingTarget();

if(a==null){var d=this.__px[name];
c[d]();
}else{var e=this.__pw[name];
c[e](a);
}}}});
})();
(function(){var c="qx.ui.window.IWindowManager";
qx.Interface.define(c,{members:{setDesktop:function(f){this.assertInterface(f,qx.ui.window.IDesktop);
},changeActiveWindow:function(a,b){},updateStack:function(){},bringToFront:function(d){this.assertInstance(d,qx.ui.window.Window);
},sendToBack:function(e){this.assertInstance(e,qx.ui.window.Window);
}}});
})();
(function(){var c="__py",b="qx.ui.window.Manager";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__py:null,setDesktop:function(a){this.__py=a;
this.updateStack();
},getDesktop:function(){return this.__py;
},changeActiveWindow:function(k,m){if(k){this.updateStack();
this.bringToFront(k);
k.setActive(true);
}
if(m){m.resetActive();
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__py.forceUnblockContent();
var n=this.__py.getWindows();
var p=this._minZIndex;
var s=p+n.length*2;
var q=p+n.length*4;
var r=null;

for(var i=0,l=n.length;i<l;i++){var o=n[i];
if(!o.isVisible()){continue;
}if(r==null){r=o;
}if(o.isModal()){o.setZIndex(q);
this.__py.blockContent(q-1);
q+=2;
}else if(o.isAlwaysOnTop()){o.setZIndex(s);
s+=2;
}else{o.setZIndex(p);
p+=2;
}if(o.isActive()){r=o;
}else{if(!r.isActive()){if(o.getZIndex()>r.getZIndex()){r=o;
}}}}
if(r){this.__py.setActiveWindow(r);
}},bringToFront:function(g){var h=this.__py.getWindows();
var j=qx.lang.Array.remove(h,g);

if(j){h.push(g);
this.updateStack();
}},sendToBack:function(d){var e=this.__py.getWindows();
var f=qx.lang.Array.remove(e,d);

if(f){e.unshift(d);
this.updateStack();
}}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var C="Boolean",B="qx.event.type.Event",A="captionbar",z="_applyCaptionBarChange",y="maximize-button",x="restore-button",w="minimize-button",v="close-button",u="maximized",t="execute",bj="pane",bi="title",bh="icon",bg="statusbar-text",bf="statusbar",be="String",bd="normal",bc="active",bb="beforeClose",ba="beforeMinimize",J="mousedown",K="changeStatus",H="changeIcon",I="excluded",F="dblclick",G="_applyActive",D="beforeRestore",E="minimize",L="changeModal",M="changeAlwaysOnTop",R="_applyShowStatusbar",Q="_applyStatus",T="qx.ui.window.Window",S="changeCaption",V="focusout",U="beforeMaximize",O="maximize",Y="restore",X="window",W="close",N="changeActive",P="minimized";
qx.Class.define(T,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(bk,bl){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(A);
this._createChildControl(bj);
if(bl!=null){this.setIcon(bl);
}
if(bk!=null){this.setCaption(bk);
}this._updateCaptionBar();
this.addListener(J,this._onWindowMouseDown,this,true);
this.addListener(V,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":B,"close":B,"beforeMinimize":B,"minimize":B,"beforeMaximize":B,"maximize":B,"beforeRestore":B,"restore":B},properties:{appearance:{refine:true,init:X},visibility:{refine:true,init:I},focusable:{refine:true,init:true},active:{check:C,init:false,apply:G,event:N},alwaysOnTop:{check:C,init:false,event:M},modal:{check:C,init:false,event:L},caption:{apply:z,event:S,nullable:true},icon:{check:be,nullable:true,apply:z,event:H,themeable:true},status:{check:be,nullable:true,apply:Q,event:K},showClose:{check:C,init:true,apply:z,themeable:true},showMaximize:{check:C,init:true,apply:z,themeable:true},showMinimize:{check:C,init:true,apply:z,themeable:true},allowClose:{check:C,init:true,apply:z},allowMaximize:{check:C,init:true,apply:z},allowMinimize:{check:C,init:true,apply:z},showStatusbar:{check:C,init:false,apply:R}},members:{__pz:null,__pA:null,getChildrenContainer:function(){return this.getChildControl(bj);
},_forwardStates:{active:true,maximized:true},setLayoutParent:function(parent){{};
qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);
},_createChildControlImpl:function(a){var b;

switch(a){case bf:b=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(b);
b.add(this.getChildControl(bg));
break;
case bg:b=new qx.ui.basic.Label();
b.setValue(this.getStatus());
break;
case bj:b=new qx.ui.container.Composite();
this._add(b,{flex:1});
break;
case A:var d=new qx.ui.layout.Grid();
d.setRowFlex(0,1);
d.setColumnFlex(1,1);
b=new qx.ui.container.Composite(d);
this._add(b);
b.addListener(F,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(b);
break;
case bh:b=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(A).add(b,{row:0,column:0});
break;
case bi:b=new qx.ui.basic.Label(this.getCaption());
b.setWidth(0);
b.setAllowGrowX(true);
var c=this.getChildControl(A);
c.add(b,{row:0,column:1});
break;
case w:b=new qx.ui.form.Button();
b.setFocusable(false);
b.addListener(t,this._onMinimizeButtonClick,this);
this.getChildControl(A).add(b,{row:0,column:2});
break;
case x:b=new qx.ui.form.Button();
b.setFocusable(false);
b.addListener(t,this._onRestoreButtonClick,this);
this.getChildControl(A).add(b,{row:0,column:3});
break;
case y:b=new qx.ui.form.Button();
b.setFocusable(false);
b.addListener(t,this._onMaximizeButtonClick,this);
this.getChildControl(A).add(b,{row:0,column:4});
break;
case v:b=new qx.ui.form.Button();
b.setFocusable(false);
b.addListener(t,this._onCloseButtonClick,this);
this.getChildControl(A).add(b,{row:0,column:6});
break;
}return b||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,a);
},_updateCaptionBar:function(){var g;
var h=this.getIcon();

if(h){this.getChildControl(bh).setSource(h);
this._showChildControl(bh);
}else{this._excludeChildControl(bh);
}var f=this.getCaption();

if(f){this.getChildControl(bi).setValue(f);
this._showChildControl(bi);
}else{this._excludeChildControl(bi);
}
if(this.getShowMinimize()){this._showChildControl(w);
g=this.getChildControl(w);
this.getAllowMinimize()?g.resetEnabled():g.setEnabled(false);
}else{this._excludeChildControl(w);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(x);
this._excludeChildControl(y);
}else{this._showChildControl(y);
this._excludeChildControl(x);
}g=this.getChildControl(y);
this.getAllowMaximize()?g.resetEnabled():g.setEnabled(false);
}else{this._excludeChildControl(y);
this._excludeChildControl(x);
}
if(this.getShowClose()){this._showChildControl(v);
g=this.getChildControl(v);
this.getAllowClose()?g.resetEnabled():g.setEnabled(false);
}else{this._excludeChildControl(v);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(bb,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(W);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var bn=parent.getBounds();

if(bn){var bo=this.getSizeHint();
var bm=Math.round((bn.width-bo.width)/2);
var top=Math.round((bn.height-bo.height)/2);

if(top<0){top=0;
}this.moveTo(bm,top);
return;
}}{};
},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(U,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var n=this.getLayoutProperties();
this.__pA=n.left===undefined?0:n.left;
this.__pz=n.top===undefined?0:n.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(u);
this._updateCaptionBar();
this.fireEvent(O);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(ba,qx.event.type.Event,[false,true])){var s=this.getLayoutProperties();
this.__pA=s.left===undefined?0:s.left;
this.__pz=s.top===undefined?0:s.top;
this.removeState(u);
this.hide();
this.fireEvent(E);
}},restore:function(){if(this.getMode()===bd){return;
}
if(this.fireNonBubblingEvent(D,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var r=this.__pA;
var top=this.__pz;
this.setLayoutProperties({edge:null,left:r,top:top});
this.removeState(u);
this._updateCaptionBar();
this.fireEvent(Y);
}},moveTo:function(bp,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:bp,top:top});
},isMaximized:function(){return this.hasState(u);
},getMode:function(){if(!this.isVisible()){return P;
}else{if(this.isMaximized()){return u;
}else{return bd;
}}},_applyActive:function(i,j){if(j){this.removeState(bc);
}else{this.addState(bc);
}},_getContentPaddingTarget:function(){return this.getChildControl(bj);
},_applyShowStatusbar:function(l,m){if(l){this._showChildControl(bf);
}else{this._excludeChildControl(bf);
}},_applyCaptionBarChange:function(bq,br){this._updateCaptionBar();
},_applyStatus:function(o,p){var q=this.getChildControl(bg,true);

if(q){q.setValue(o);
}},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var k=e.getRelatedTarget();

if(k!=null&&!qx.ui.core.Widget.contains(this,k)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(w).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(x).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(y).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(v).reset();
}}});
})();
(function(){var b="qx.ui.window.IDesktop";
qx.Interface.define(b,{members:{setWindowManager:function(a){this.assertInterface(a,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var p="Number",o="qx.event.type.Event",n="_applyFirstColumnX",m="Integer",l="qx.ui.table.pane.Model",k="_applyMaxColumnCount",j="visibilityChangedPre";
qx.Class.define(l,{extend:qx.core.Object,construct:function(s){qx.core.Object.call(this);
s.addListener(j,this._onColVisibilityChanged,this);
this.__pB=s;
},events:{"modelChanged":o},statics:{EVENT_TYPE_MODEL_CHANGED:"modelChanged"},properties:{firstColumnX:{check:m,init:0,apply:n},maxColumnCount:{check:p,init:-1,apply:k}},members:{__pC:null,__pB:null,_applyFirstColumnX:function(e,f){this.__pC=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},_applyMaxColumnCount:function(q,r){this.__pC=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},setTableColumnModel:function(a){this.__pB=a;
this.__pC=null;
},_onColVisibilityChanged:function(t){this.__pC=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},getColumnCount:function(){if(this.__pC==null){var b=this.getFirstColumnX();
var d=this.getMaxColumnCount();
var c=this.__pB.getVisibleColumnCount();

if(d==-1||(b+d)>c){this.__pC=c-b;
}else{this.__pC=d;
}}return this.__pC;
},getColumnAtX:function(u){var v=this.getFirstColumnX();
return this.__pB.getVisibleColumnAtX(v+u);
},getX:function(w){var y=this.getFirstColumnX();
var z=this.getMaxColumnCount();
var x=this.__pB.getVisibleX(w)-y;

if(x>=0&&(z==-1||x<z)){return x;
}else{return -1;
}},getColumnLeft:function(A){var D=0;
var C=this.getColumnCount();

for(var x=0;x<C;x++){var B=this.getColumnAtX(x);

if(B==A){return D;
}D+=this.__pB.getColumnWidth(B);
}return -1;
},getTotalWidth:function(){var g=0;
var h=this.getColumnCount();

for(var x=0;x<h;x++){var i=this.getColumnAtX(x);
g+=this.__pB.getColumnWidth(i);
}return g;
}},destruct:function(){this.__pB=null;
}});
})();
(function(){var i="qx.event.type.Data",h="qx.event.type.Event",g="qx.ui.table.ITableModel";
qx.Interface.define(g,{events:{"dataChanged":i,"metaDataChanged":h,"sorted":i},members:{getRowCount:function(){},getRowData:function(t){},getColumnCount:function(){},getColumnId:function(n){},getColumnIndexById:function(o){},getColumnName:function(p){},isColumnEditable:function(j){},isColumnSortable:function(m){},sortByColumn:function(e,f){},getSortColumnIndex:function(){},isSortAscending:function(){},prefetchRows:function(a,b){},getValue:function(c,d){},getValueById:function(k,l){},setValue:function(q,r,s){},setValueById:function(u,v,w){}}});
})();
(function(){var l="metaDataChanged",k="qx.event.type.Data",j="qx.event.type.Event",h="abstract",g="qx.ui.table.model.Abstract";
qx.Class.define(g,{type:h,extend:qx.core.Object,implement:qx.ui.table.ITableModel,events:{"dataChanged":k,"metaDataChanged":j,"sorted":k},construct:function(){qx.core.Object.call(this);
this.__pD=[];
this.__pE=[];
this.__pF={};
},members:{__pD:null,__pE:null,__pF:null,__pG:null,init:function(y){},getRowCount:function(){throw new Error("getRowCount is abstract");
},getRowData:function(u){return null;
},isColumnEditable:function(b){return false;
},isColumnSortable:function(s){return false;
},sortByColumn:function(c,d){},getSortColumnIndex:function(){return -1;
},isSortAscending:function(){return true;
},prefetchRows:function(F,G){},getValue:function(C,D){throw new Error("getValue is abstract");
},getValueById:function(m,n){return this.getValue(this.getColumnIndexById(m),n);
},setValue:function(v,w,x){throw new Error("setValue is abstract");
},setValueById:function(z,A,B){this.setValue(this.getColumnIndexById(z),A,B);
},getColumnCount:function(){return this.__pD.length;
},getColumnIndexById:function(r){return this.__pF[r];
},getColumnId:function(f){return this.__pD[f];
},getColumnName:function(t){return this.__pE[t];
},setColumnIds:function(e){this.__pD=e;
this.__pF={};

for(var i=0;i<e.length;i++){this.__pF[e[i]]=i;
}this.__pE=new Array(e.length);
if(!this.__pG){this.fireEvent(l);
}},setColumnNamesByIndex:function(E){if(this.__pD.length!=E.length){throw new Error("this.__columnIdArr and columnNameArr have different length: "+this.__pD.length+" != "+E.length);
}this.__pE=E;
this.fireEvent(l);
},setColumnNamesById:function(a){this.__pE=new Array(this.__pD.length);

for(var i=0;i<this.__pD.length;++i){this.__pE[i]=a[this.__pD[i]];
}},setColumns:function(o,p){var q=this.__pD.length==0||p;

if(p==null){if(this.__pD.length==0){p=o;
}else{p=this.__pD;
}}
if(p.length!=o.length){throw new Error("columnIdArr and columnNameArr have different length: "+p.length+" != "+o.length);
}
if(q){this.__pG=true;
this.setColumnIds(p);
this.__pG=false;
}this.setColumnNamesByIndex(o);
}},destruct:function(){this.__pD=this.__pE=this.__pF=null;
}});
})();
(function(){var q="dataChanged",p="metaDataChanged",o="qx.ui.table.model.Simple",n="Boolean",m="sorted";
qx.Class.define(o,{extend:qx.ui.table.model.Abstract,construct:function(){qx.ui.table.model.Abstract.call(this);
this.__pH=[];
this.__pI=-1;
this.__pJ=[];
this.__pK=null;
},properties:{caseSensitiveSorting:{check:n,init:true}},statics:{_defaultSortComparatorAscending:function(v,w){var x=v[arguments.callee.columnIndex];
var y=w[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(x)&&qx.lang.Type.isNumber(y)){var z=isNaN(x)?isNaN(y)?0:1:isNaN(y)?-1:null;

if(z!=null){return z;
}}return (x>y)?1:((x==y)?0:-1);
},_defaultSortComparatorInsensitiveAscending:function(br,bs){var bt=(br[arguments.callee.columnIndex].toLowerCase?br[arguments.callee.columnIndex].toLowerCase():br[arguments.callee.columnIndex]);
var bu=(bs[arguments.callee.columnIndex].toLowerCase?bs[arguments.callee.columnIndex].toLowerCase():bs[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(bt)&&qx.lang.Type.isNumber(bu)){var bv=isNaN(bt)?isNaN(bu)?0:1:isNaN(bu)?-1:null;

if(bv!=null){return bv;
}}return (bt>bu)?1:((bt==bu)?0:-1);
},_defaultSortComparatorDescending:function(bm,bn){var bo=bm[arguments.callee.columnIndex];
var bp=bn[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(bo)&&qx.lang.Type.isNumber(bp)){var bq=isNaN(bo)?isNaN(bp)?0:1:isNaN(bp)?-1:null;

if(bq!=null){return bq;
}}return (bo<bp)?1:((bo==bp)?0:-1);
},_defaultSortComparatorInsensitiveDescending:function(V,W){var X=(V[arguments.callee.columnIndex].toLowerCase?V[arguments.callee.columnIndex].toLowerCase():V[arguments.callee.columnIndex]);
var Y=(W[arguments.callee.columnIndex].toLowerCase?W[arguments.callee.columnIndex].toLowerCase():W[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(X)&&qx.lang.Type.isNumber(Y)){var ba=isNaN(X)?isNaN(Y)?0:1:isNaN(Y)?-1:null;

if(ba!=null){return ba;
}}return (X<Y)?1:((X==Y)?0:-1);
}},members:{__pH:null,__pK:null,__pL:null,__pJ:null,__pI:null,__pM:null,getRowData:function(bh){var bi=this.__pH[bh];

if(bi==null||bi.originalData==null){return bi;
}else{return bi.originalData;
}},getRowDataAsMap:function(r){var t=this.__pH[r];
var s={};

for(var u=0;u<this.getColumnCount();u++){s[this.getColumnId(u)]=t[u];
}return s;
},getDataAsMapArray:function(){var b=this.getRowCount();
var a=[];

for(var i=0;i<b;i++){a.push(this.getRowDataAsMap(i));
}return a;
},setEditable:function(bj){this.__pK=[];

for(var bk=0;bk<this.getColumnCount();bk++){this.__pK[bk]=bj;
}this.fireEvent(p);
},setColumnEditable:function(bf,bg){if(bg!=this.isColumnEditable(bf)){if(this.__pK==null){this.__pK=[];
}this.__pK[bf]=bg;
this.fireEvent(p);
}},isColumnEditable:function(bw){return this.__pK?(this.__pK[bw]==true):false;
},setColumnSortable:function(T,U){if(U!=this.isColumnSortable(T)){if(this.__pL==null){this.__pL=[];
}this.__pL[T]=U;
this.fireEvent(p);
}},isColumnSortable:function(bl){return (this.__pL?(this.__pL[bl]!==false):true);
},sortByColumn:function(bE,bF){var bI;
var bH=this.__pJ[bE];

if(bH){bI=(bF?bH.ascending:bH.descending);
}else{if(this.getCaseSensitiveSorting()){bI=(bF?qx.ui.table.model.Simple._defaultSortComparatorAscending:qx.ui.table.model.Simple._defaultSortComparatorDescending);
}else{bI=(bF?qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending:qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending);
}}bI.columnIndex=bE;
this.__pH.sort(bI);
this.__pI=bE;
this.__pM=bF;
var bG={columnIndex:bE,ascending:bF};
this.fireDataEvent(m,bG);
this.fireEvent(p);
},setSortMethods:function(bJ,bK){var bL;

if(qx.lang.Type.isFunction(bK)){bL={ascending:bK,descending:function(bM,bN){return bK(bN,bM);
}};
}else{bL=bK;
}this.__pJ[bJ]=bL;
},getSortMethods:function(bO){return this.__pJ[bO];
},clearSorting:function(){if(this.__pI!=-1){this.__pI=-1;
this.__pM=true;
this.fireEvent(p);
}},getSortColumnIndex:function(){return this.__pI;
},isSortAscending:function(){return this.__pM;
},getRowCount:function(){return this.__pH.length;
},getValue:function(E,F){if(F<0||F>=this.__pH.length){throw new Error("this.__rowArr out of bounds: "+F+" (0.."+this.__pH.length+")");
}return this.__pH[F][E];
},setValue:function(c,d,e){if(this.__pH[d][c]!=e){this.__pH[d][c]=e;
if(this.hasListener(q)){var f={firstRow:d,lastRow:d,firstColumn:c,lastColumn:c};
this.fireDataEvent(q,f);
}
if(c==this.__pI){this.clearSorting();
}}},setData:function(Q,R){this.__pH=Q;
if(this.hasListener(q)){var S={firstRow:0,lastRow:Q.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(q,S);
}
if(R!==false){this.clearSorting();
}},getData:function(){return this.__pH;
},setDataAsMapArray:function(bx,by,bz){this.setData(this._mapArray2RowArr(bx,by),bz);
},addRows:function(bA,bB,bC){if(bB==null){bB=this.__pH.length;
}bA.splice(0,0,bB,0);
Array.prototype.splice.apply(this.__pH,bA);
var bD={firstRow:bB,lastRow:this.__pH.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(q,bD);

if(bC!==false){this.clearSorting();
}},addRowsAsMapArray:function(A,B,C,D){this.addRows(this._mapArray2RowArr(A,C),B,D);
},setRows:function(bb,bc,bd){if(bc==null){bc=0;
}bb.splice(0,0,bc,bb.length);
Array.prototype.splice.apply(this.__pH,bb);
var be={firstRow:bc,lastRow:this.__pH.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(q,be);

if(bd!==false){this.clearSorting();
}},setRowsAsMapArray:function(M,N,O,P){this.setRows(this._mapArray2RowArr(M,O),N,P);
},removeRows:function(g,h,k){this.__pH.splice(g,h);
var l={firstRow:g,lastRow:this.__pH.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1,removeStart:g,removeCount:h};
this.fireDataEvent(q,l);

if(k!==false){this.clearSorting();
}},_mapArray2RowArr:function(G,H){var L=G.length;
var I=this.getColumnCount();
var K=new Array(L);
var J;

for(var i=0;i<L;++i){J=[];

if(H){J.originalData=G[i];
}
for(var j=0;j<I;++j){J[j]=G[i][this.getColumnId(j)];
}K[i]=J;
}return K;
}},destruct:function(){this.__pH=this.__pK=this.__pJ=this.__pL=null;
}});
})();
(function(){var cG="",cF="!",cE="'!",cD="'",cC="Expected '",cB="' (rgb(",cA=",",cz=")), but found value '",cy="Event (",cx="Expected value to be the CSS color '",dO="' but found ",dN="The value '",dM=" != ",dL="qx.core.Object",dK="Expected value to be an array but found ",dJ=") was fired.",dI="Expected value to be an integer >= 0 but found ",dH="' to be not equal with '",dG="' to '",dF="qx.ui.core.Widget",cN="Called assertTrue with '",cO="Expected value to be a map but found ",cL="The function did not raise an exception!",cM="Expected value to be undefined but found ",cJ="Expected value to be a DOM element but found  '",cK="Expected value to be a regular expression but found ",cH="' to implement the interface '",cI="Expected value to be null but found ",cV="Invalid argument 'type'",cW="Called assert with 'false'",dj="Assertion error! ",df="Expected value to be a string but found ",ds="null",dm="' but found '",dB="' must must be a key of the map '",dx="The String '",db="Expected value not to be undefined but found ",dE="qx.util.ColorUtil",dD=": ",dC="The raised exception does not have the expected type! ",da=") not fired.",dd="qx.core.Assert",de="Expected value to be typeof object but found ",dh="' (identical) but found '",dk="' must have any of the values defined in the array '",dn="Expected value to be a number but found ",du="Called assertFalse with '",dz="]",cP="Expected value to be a qooxdoo object but found ",cQ="' arguments.",dc="Expected value not to be null but found ",dr="Array[",dq="' does not match the regular expression '",dp="' to be not identical with '",dw="' arguments but found '",dv="', which cannot be converted to a CSS color!",dl="Expected object '",dt="qx.core.AssertionError",cu="Expected value to be a boolean but found ",dy="))!",cR="Expected value to be a qooxdoo widget but found ",cS="Expected value '%1' to be in the range '%2'..'%3'!",dg="Expected value to be typeof '",cv="Expected value to be typeof function but found ",cw="Expected value to be an integer but found ",cY="Called fail().",cT="The parameter 're' must be a string or a regular expression.",cU="Expected value to be a number >= 0 but found ",cX="Expected value to be instanceof '",di="Wrong number of arguments given. Expected '",dA="object";
qx.Class.define(dd,{statics:{__pN:true,__pO:function(bj,bk){var bl=cG;

for(var i=1,l=arguments.length;i<l;i++){bl=bl+this.__pP(arguments[i]);
}var bn=dj+bj+dD+bl;

if(this.__pN){qx.Bootstrap.error(bn);
}
if(qx.Class.isDefined(dt)){var bm=new qx.core.AssertionError(bj,bl);

if(this.__pN){qx.Bootstrap.error("Stack trace: \n"+bm.getStackTrace());
}throw bm;
}else{throw new Error(bn);
}},__pP:function(k){var m;

if(k===null){m=ds;
}else if(qx.lang.Type.isArray(k)&&k.length>10){m=dr+k.length+dz;
}else if((k instanceof Object)&&(k.toString==null)){m=qx.lang.Json.stringify(k,null,2);
}else{try{m=k.toString();
}catch(e){m=cG;
}}return m;
},assert:function(I,J){I==true||this.__pO(J||cG,cW);
},fail:function(bF){this.__pO(bF||cG,cY);
},assertTrue:function(bu,bv){(bu===true)||this.__pO(bv||cG,cN,bu,cD);
},assertFalse:function(bc,bd){(bc===false)||this.__pO(bd||cG,du,bc,cD);
},assertEquals:function(g,h,j){g==h||this.__pO(j||cG,cC,g,dm,h,cE);
},assertNotEquals:function(cp,cq,cr){cp!=cq||this.__pO(cr||cG,cC,cp,dH,cq,cE);
},assertIdentical:function(bC,bD,bE){bC===bD||this.__pO(bE||cG,cC,bC,dh,bD,cE);
},assertNotIdentical:function(dR,dS,dT){dR!==dS||this.__pO(dT||cG,cC,dR,dp,dS,cE);
},assertNotUndefined:function(cs,ct){cs!==undefined||this.__pO(ct||cG,db,cs,cF);
},assertUndefined:function(u,v){u===undefined||this.__pO(v||cG,cM,u,cF);
},assertNotNull:function(bI,bJ){bI!==null||this.__pO(bJ||cG,dc,bI,cF);
},assertNull:function(bR,bS){bR===null||this.__pO(bS||cG,cI,bR,cF);
},assertJsonEquals:function(bw,bx,by){this.assertEquals(qx.lang.Json.stringify(bw),qx.lang.Json.stringify(bx),by);
},assertMatch:function(bz,bA,bB){this.assertString(bz);
this.assert(qx.lang.Type.isRegExp(bA)||qx.lang.Type.isString(bA),cT);
bz.search(bA)>=0||this.__pO(bB||cG,dx,bz,dq,bA.toString(),cE);
},assertArgumentsCount:function(bK,bL,bM,bN){var bO=bK.length;
(bO>=bL&&bO<=bM)||this.__pO(bN||cG,di,bL,dG,bM,dw,arguments.length,cQ);
},assertEventFired:function(n,event,o,p,q){var s=false;
var r=function(e){if(p){p.call(n,e);
}s=true;
};
var t=n.addListener(event,r,n);
o.call();
s===true||this.__pO(q||cG,cy,event,da);
n.removeListenerById(t);
},assertEventNotFired:function(bW,event,bX,bY){var cb=false;
var ca=function(e){cb=true;
};
var cc=bW.addListener(event,ca,bW);
bX.call();
cb===false||this.__pO(bY||cG,cy,event,dJ);
bW.removeListenerById(cc);
},assertException:function(N,O,P,Q){var O=O||Error;
var R;

try{this.__pN=false;
N();
}catch(A){R=A;
}finally{this.__pN=true;
}
if(R==null){this.__pO(Q||cG,cL);
}R instanceof O||this.__pO(Q||cG,dC,O,dM,R);

if(P){this.assertMatch(R.toString(),P,Q);
}},assertInArray:function(dV,dW,dX){dW.indexOf(dV)!==-1||this.__pO(dX||cG,dN,dV,dk,dW,cD);
},assertArrayEquals:function(bg,bh,bi){this.assertArray(bg,bi);
this.assertArray(bh,bi);
this.assertEquals(bg.length,bh.length,bi);

for(var i=0;i<bg.length;i++){this.assertIdentical(bg[i],bh[i],bi);
}},assertKeyInMap:function(S,T,U){T[S]!==undefined||this.__pO(U||cG,dN,S,dB,T,cD);
},assertFunction:function(be,bf){qx.lang.Type.isFunction(be)||this.__pO(bf||cG,cv,be,cF);
},assertString:function(ba,bb){qx.lang.Type.isString(ba)||this.__pO(bb||cG,df,ba,cF);
},assertBoolean:function(a,b){qx.lang.Type.isBoolean(a)||this.__pO(b||cG,cu,a,cF);
},assertNumber:function(X,Y){(qx.lang.Type.isNumber(X)&&isFinite(X))||this.__pO(Y||cG,dn,X,cF);
},assertPositiveNumber:function(V,W){(qx.lang.Type.isNumber(V)&&isFinite(V)&&V>=0)||this.__pO(W||cG,cU,V,cF);
},assertInteger:function(bs,bt){(qx.lang.Type.isNumber(bs)&&isFinite(bs)&&bs%1===0)||this.__pO(bt||cG,cw,bs,cF);
},assertPositiveInteger:function(c,d){var f=(qx.lang.Type.isNumber(c)&&isFinite(c)&&c%1===0&&c>=0);
f||this.__pO(d||cG,dI,c,cF);
},assertInRange:function(E,F,G,H){(E>=F&&E<=G)||this.__pO(H||cG,qx.lang.String.format(cS,[E,F,G]));
},assertObject:function(K,L){var M=K!==null&&(qx.lang.Type.isObject(K)||typeof K===dA);
M||this.__pO(L||cG,de,(K),cF);
},assertArray:function(bq,br){qx.lang.Type.isArray(bq)||this.__pO(br||cG,dK,bq,cF);
},assertMap:function(bG,bH){qx.lang.Type.isObject(bG)||this.__pO(bH||cG,cO,bG,cF);
},assertRegExp:function(dP,dQ){qx.lang.Type.isRegExp(dP)||this.__pO(dQ||cG,cK,dP,cF);
},assertType:function(bT,bU,bV){this.assertString(bU,cV);
typeof (bT)===bU||this.__pO(bV||cG,dg,bU,dO,bT,cF);
},assertInstance:function(w,x,y){var z=x.classname||x+cG;
w instanceof x||this.__pO(y||cG,cX,z,dO,w,cF);
},assertInterface:function(cd,ce,cf){qx.Class.implementsInterface(cd,ce)||this.__pO(cf||cG,dl,cd,cH,ce,cE);
},assertCssColor:function(ci,cj,ck){var cl=qx.Class.getByName(dE);

if(!cl){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var cn=cl.stringToRgb(ci);

try{var cm=cl.stringToRgb(cj);
}catch(dU){this.__pO(ck||cG,cx,ci,cB,cn.join(cA),cz,cj,dv);
}var co=cn[0]==cm[0]&&cn[1]==cm[1]&&cn[2]==cm[2];
co||this.__pO(ck||cG,cx,cn,cB,cn.join(cA),cz,cj,cB,cm.join(cA),dy);
},assertElement:function(cg,ch){!!(cg&&cg.nodeType===1)||this.__pO(ch||cG,cJ,cg,cE);
},assertQxObject:function(bo,bp){this.__pQ(bo,dL)||this.__pO(bp||cG,cP,bo,cF);
},assertQxWidget:function(bP,bQ){this.__pQ(bP,dF)||this.__pO(bQ||cG,cR,bP,cF);
},__pQ:function(B,C){if(!B){return false;
}var D=B.constructor;

while(D){if(D.classname===C){return true;
}D=D.superclass;
}return false;
}}});
})();
(function(){var A='',z='"',y=':',x=']',w='null',u=': ',t='object',s='function',r=',',q='\n',bk='\\u',bj=',\n',bi='0000',bh='string',bg="Cannot stringify a recursive object.",bf='0',be='-',bd='}',bc='String',bb='Boolean',H='\\\\',I='\\f',F='\\t',G='{\n',D='[]',E="qx.lang.JsonImpl",B='Z',C='\\n',J='Object',K='{}',R='@',P='.',U='(',T='Array',W='T',V='\\r',M='{',ba='JSON.parse',Y=' ',X='[',L='Number',N=')',O='[\n',Q='\\"',S='\\b';
qx.Class.define(E,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__pR:null,__pS:null,__pT:null,__pU:null,stringify:function(m,o,p){this.__pR=A;
this.__pS=A;
this.__pU=[];

if(qx.lang.Type.isNumber(p)){var p=Math.min(10,Math.floor(p));

for(var i=0;i<p;i+=1){this.__pS+=Y;
}}else if(qx.lang.Type.isString(p)){if(p.length>10){p=p.slice(0,10);
}this.__pS=p;
}if(o&&(qx.lang.Type.isFunction(o)||qx.lang.Type.isArray(o))){this.__pT=o;
}else{this.__pT=null;
}return this.__pV(A,{'':m});
},__pV:function(b,d){var g=this.__pR,e,h=d[b];
if(h&&qx.lang.Type.isFunction(h.toJSON)){h=h.toJSON(b);
}else if(qx.lang.Type.isDate(h)){h=this.dateToJSON(h);
}if(typeof this.__pT===s){h=this.__pT.call(d,b,h);
}
if(h===null){return w;
}
if(h===undefined){return undefined;
}switch(qx.lang.Type.getClass(h)){case bc:return this.__pW(h);
case L:return isFinite(h)?String(h):w;
case bb:return String(h);
case T:this.__pR+=this.__pS;
e=[];

if(this.__pU.indexOf(h)!==-1){throw new TypeError(bg);
}this.__pU.push(h);
var length=h.length;

for(var i=0;i<length;i+=1){e[i]=this.__pV(i,h)||w;
}this.__pU.pop();
if(e.length===0){var f=D;
}else if(this.__pR){f=O+this.__pR+e.join(bj+this.__pR)+q+g+x;
}else{f=X+e.join(r)+x;
}this.__pR=g;
return f;
case J:this.__pR+=this.__pS;
e=[];

if(this.__pU.indexOf(h)!==-1){throw new TypeError(bg);
}this.__pU.push(h);
if(this.__pT&&typeof this.__pT===t){var length=this.__pT.length;

for(var i=0;i<length;i+=1){var k=this.__pT[i];

if(typeof k===bh){var v=this.__pV(k,h);

if(v){e.push(this.__pW(k)+(this.__pR?u:y)+v);
}}}}else{for(var k in h){if(Object.hasOwnProperty.call(h,k)){var v=this.__pV(k,h);

if(v){e.push(this.__pW(k)+(this.__pR?u:y)+v);
}}}}this.__pU.pop();
if(e.length===0){var f=K;
}else if(this.__pR){f=G+this.__pR+e.join(bj+this.__pR)+q+g+bd;
}else{f=M+e.join(r)+bd;
}this.__pR=g;
return f;
}},dateToJSON:function(bl){var bm=function(n){return n<10?bf+n:n;
};
var bn=function(n){var l=bm(n);
return n<100?bf+l:l;
};
return isFinite(bl.valueOf())?bl.getUTCFullYear()+be+bm(bl.getUTCMonth()+1)+be+bm(bl.getUTCDate())+W+bm(bl.getUTCHours())+y+bm(bl.getUTCMinutes())+y+bm(bl.getUTCSeconds())+P+bn(bl.getUTCMilliseconds())+B:null;
},__pW:function(bs){var bt={'\b':S,'\t':F,'\n':C,'\f':I,'\r':V,'"':Q,'\\':H};
var bu=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bu.lastIndex=0;

if(bu.test(bs)){return z+
bs.replace(bu,function(a){var c=bt[a];
return typeof c===bh?c:bk+(bi+a.charCodeAt(0).toString(16)).slice(-4);
})+z;
}else{return z+bs+z;
}},parse:function(bv,bw){var bx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bx.lastIndex=0;
if(bx.test(bv)){bv=bv.replace(bx,function(a){return bk+(bi+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(bv.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,R).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,x).replace(/(?:^|:|,)(?:\s*\[)+/g,A))){var j=eval(U+bv+N);
return typeof bw===s?this.__pX({'':j},A,bw):j;
}throw new SyntaxError(ba);
},__pX:function(bo,bp,bq){var br=bo[bp];

if(br&&typeof br===t){for(var k in br){if(Object.hasOwnProperty.call(br,k)){var v=this.__pX(br,k,bq);

if(v!==undefined){br[k]=v;
}else{delete br[k];
}}}}return bq.call(bo,bp,br);
}}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var b="qx.ui.treevirtual.MTreePrimitive",a="<virtual root>";
qx.Mixin.define(b,{statics:{Type:{LEAF:1,BRANCH:2},_addNode:function(c,d,e,f,g,h,i,j,k){var m;
if(d){m=c[d];

if(!m){throw new Error("Request to add a child to a non-existent parent");
}if(m.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){throw new Error("Sorry, a LEAF may not have children.");
}}else{m=c[0];
d=0;
}if(h==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){f=false;
g=false;
}if(k===undefined){k=c.length;
}var l={type:h,nodeId:k,parentNodeId:d,label:e,bSelected:false,bOpened:f,bHideOpenClose:g,icon:i,iconSelected:j,children:[],columnData:[]};
c[k]=l;
m.children.push(k);
return k;
},_getEmptyTree:function(){return {label:a,nodeId:0,bOpened:true,children:[]};
}}});
})();
(function(){var R="number",Q="dataChanged",P="object",O="metaDataChanged",N="treeOpenWhileEmpty",M="treeOpenWithContent",L="bSelected",K="qx.ui.treevirtual.SimpleTreeDataModel",J="bOpened",I="treeClose";
qx.Class.define(K,{extend:qx.ui.table.model.Abstract,include:qx.ui.treevirtual.MTreePrimitive,construct:function(){qx.ui.table.model.Abstract.call(this);
this._rowArr=[];
this._nodeArr=[];
this._nodeRowMap=[];
this._treeColumn=0;
this._selections={};
this._nodeArr.push(qx.ui.treevirtual.MTreePrimitive._getEmptyTree());
this.__pY=null;
},members:{__qa:null,__pY:null,_rowArr:null,_nodeArr:null,_nodeRowMap:null,_treeColumn:null,_selections:null,setTree:function(bH){this.__qa=bH;
},getTree:function(){return this.__qa;
},setEditable:function(T){this.__pY=[];

for(var U=0;U<this.getColumnCount();U++){this.__pY[U]=T;
}this.fireEvent(O);
},setColumnEditable:function(a,b){if(b!=this.isColumnEditable(a)){if(this.__pY==null){this.__pY=[];
}this.__pY[a]=b;
this.fireEvent(O);
}},isColumnEditable:function(X){if(X==this._treeColumn){return false;
}return (this.__pY?this.__pY[X]==true:false);
},isColumnSortable:function(V){return false;
},sortByColumn:function(bF,bG){throw new Error("Trees can not be sorted by column");
},getSortColumnIndex:function(){return -1;
},setTreeColumn:function(A){this._treeColumn=A;
},getTreeColumn:function(){return this._treeColumn;
},getRowCount:function(){return this._rowArr.length;
},getRowData:function(bu){return this._rowArr[bu];
},getValue:function(bz,bA){if(bA<0||bA>=this._rowArr.length){throw new Error("this._rowArr row "+"("+bA+") out of bounds: "+this._rowArr+" (0.."+(this._rowArr.length-1)+")");
}
if(bz<0||bz>=this._rowArr[bA].length){throw new Error("this._rowArr column "+"("+bz+") out of bounds: "+this._rowArr[bA]+" (0.."+(this._rowArr[bA].length-1)+")");
}return this._rowArr[bA][bz];
},setValue:function(o,p,q){if(o==this._treeColumn){return ;
}var r=this.getNodeFromRow(p);

if(r.columnData[o]!=q){r.columnData[o]=q;
this.setData();
if(this.hasListener(Q)){var s={firstRow:r.nodeId,lastRow:r.nodeId,firstColumn:o,lastColumn:o};
this.fireDataEvent(Q,s);
}}},getNode:function(H){if(H<0||H>=this._rowArr.length){throw new Error("this._rowArr row "+"("+H+") out of bounds: "+this._rowArr+" (0.."+(this._rowArr.length-1)+")");
}return this._rowArr[H][this._treeColumn];
},addBranch:function(B,C,D,E,F,G){return qx.ui.treevirtual.MTreePrimitive._addNode(this._nodeArr,B,C,D,E,qx.ui.treevirtual.MTreePrimitive.Type.BRANCH,F,G);
},addLeaf:function(t,u,v,w){return qx.ui.treevirtual.MTreePrimitive._addNode(this._nodeArr,t,u,false,false,qx.ui.treevirtual.MTreePrimitive.Type.LEAF,v,w);
},prune:function(bv,bw){var bx;
var by;

if(typeof (bv)==P){bx=bv;
by=bx.nodeId;
}else if(typeof (bv)==R){by=bv;
}else{throw new Error("Expected node object or node id");
}for(var i=this._nodeArr[by].children.length-1;i>=0;i--){this.prune(this._nodeArr[by].children[i],true);
}if(bw&&by!=0){bx=this._nodeArr[by];
qx.lang.Array.remove(this._nodeArr[bx.parentNodeId].children,by);
if(this._selections[by]){delete this._selections[by];
}this._nodeArr[by]=null;
}},move:function(bn,bo){var bt;
var bp;
var bs;
var bq;
bo=bo||0;

if(typeof (bn)==P){bt=bn;
bp=bt.nodeId;
}else if(typeof (bn)==R){bp=bn;
bt=this._nodeArr[bp];
}else{throw new Error("Expected move node object or node id");
}
if(typeof (bo)==P){bs=bo;
bq=bs.nodeId;
}else if(typeof (bo)==R){bq=bo;
bs=this._nodeArr[bq];
}else{throw new Error("Expected parent node object or node id");
}if(bs.type==qx.ui.treevirtual.MTreePrimitive.Type.LEAF){throw new Error("Sorry, a LEAF may not have children.");
}var br=this._nodeArr[bt.parentNodeId];
qx.lang.Array.remove(br.children,bp);
bs.children.push(bp);
this._nodeArr[bp].parentNodeId=bq;
},setData:function(bk){var bm=this;
function bl(){var bE=function(bd,be){var bi=null;
var bh;
var bf=bm._nodeArr[bd].children.length;

for(var i=0;i<bf;i++){bh=bm._nodeArr[bd].children[i];
bi=bm._nodeArr[bh];
if(bi==null){continue;
}bi.level=be;
bi.bFirstChild=(i==0);
bi.lastChild=[i==bf-1];
var parent=bm._nodeArr[bi.parentNodeId];
while(parent.nodeId){var bj=parent.lastChild[parent.lastChild.length-1];
bi.lastChild.unshift(bj);
parent=bm._nodeArr[parent.parentNodeId];
}if(!bi.columnData){bi.columnData=[];
}
if(bi.columnData.length<bm.getColumnCount()){bi.columnData[bm.getColumnCount()-1]=null;
}var bg=[];
if(bi.columnData){for(var j=0;j<bi.columnData.length;j++){if(j==bm._treeColumn){bg.push(bi);
}else{bg.push(bi.columnData[j]);
}}}else{bg.push(bi);
}if(bi.bSelected){bg.selected=true;
}bm._nodeRowMap[bi.nodeId]=bm._rowArr.length;
bm._rowArr.push(bg);
if(bi.bOpened){bE(bh,be+1);
}}};
bm._rowArr=[];
bm._nodeRowMap=[];
bE(0,1);
if(bm.hasListener(Q)){var bD={firstRow:0,lastRow:bm._rowArr.length-1,firstColumn:0,lastColumn:bm.getColumnCount()-1};
bm.fireDataEvent(Q,bD);
}}
if(bk instanceof Array){for(var i=0;i<bk.length;i++){if(bk[i].selected){this._selections[i]=true;
}}this._nodeArr=bk;
}else if(bk!==null&&bk!==undefined){throw new Error("Expected array of node objects or null/undefined; "+"got "+typeof (bk));
}bl();
},getData:function(){return this._nodeArr;
},clearData:function(){this._clearSelections();
this.setData([qx.ui.treevirtual.MTreePrimitive._getEmptyTree()]);
},setColumnData:function(x,y,z){this._nodeArr[x].columnData[y]=z;
},getColumnData:function(Y,ba){return this._nodeArr[Y].columnData[ba];
},setState:function(c,d){var e;
var l;

if(typeof (c)==P){e=c;
l=e.nodeId;
}else if(typeof (c)==R){l=c;
e=this._nodeArr[l];
}else{throw new Error("Expected node object or node id");
}
for(var h in d){switch(h){case L:var m=this.getRowFromNodeId(l);
var f=this.getTree().getSelectionModel();
var g=qx.ui.treevirtual.TreeVirtual;
var n=(typeof (m)===R&&this.getTree().getSelectionMode()!=g.SelectionMode.NONE);
if(d[h]){this._selections[l]=true;
if(n&&!f.isSelectedIndex(m)){f.setSelectionInterval(m,m);
}}else{delete this._selections[l];
if(n&&f.isSelectedIndex(m)){f.removeSelectionInterval(m,m);
}}break;
case J:if(d[h]==e.bOpened){break;
}var k=this.__qa;
if(e.bOpened){k.fireDataEvent(I,e);
}else{if(e.children.length>0){k.fireDataEvent(M,e);
}else{k.fireDataEvent(N,e);
}}if(!e.bHideOpenClose){e.bOpened=!e.bOpened;
k.getSelectionModel()._resetSelection();
}this.setData();
break;
default:break;
}e[h]=d[h];
}},getNodeRowMap:function(){return this._nodeRowMap;
},getRowFromNodeId:function(S){return this._nodeRowMap[S];
},getNodeFromRow:function(W){return this._nodeArr[this._rowArr[W][this._treeColumn].nodeId];
},_clearSelections:function(){for(var bc in this._selections){this._nodeArr[bc].bSelected=false;
}this._selections={};
},getSelectedNodes:function(){var bB=[];

for(var bC in this._selections){bB.push(this._nodeArr[bC]);
}return bB;
}},destruct:function(){this._rowArr=this._nodeArr=this._nodeRowMap=this._selections=this.__qa=null;
},defer:function(bb){bb.Type=qx.ui.treevirtual.MTreePrimitive.Type;
}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__kj:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__kj=null;
},getInsets:function(){if(this.__kj){return this.__kj;
}var j=this._getDefaultInsets();
return this.__kj={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__kj=null;
}},destruct:function(){this.__kj=null;
}});
})();
(function(){var w="_applyBackground",v="repeat",u="mshtml",t="backgroundPositionX",s="",r="backgroundPositionY",q="no-repeat",p="scale",o=" ",n="repeat-x",i="qx.client",m="repeat-y",l="hidden",h="qx.ui.decoration.MBackgroundImage",g="String",k='"></div>',j='<div style="';
qx.Mixin.define(h,{properties:{backgroundImage:{check:g,nullable:true,apply:w},backgroundRepeat:{check:[v,n,m,q,p],init:v,apply:w},backgroundPositionX:{nullable:true,apply:w},backgroundPositionY:{nullable:true,apply:w},backgroundPosition:{group:[r,t]}},members:{_generateBackgroundMarkup:function(a){var e=s;
var d=this.getBackgroundImage();
var c=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var f=this.getBackgroundPositionX();

if(f==null){f=0;
}a.backgroundPosition=f+o+top;
if(d){var b=qx.util.AliasManager.getInstance().resolve(d);
e=qx.bom.element.Decoration.create(b,c,a);
}else{if(a){if(qx.core.Variant.isSet(i,u)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){a.overflow=l;
}}e=j+qx.bom.element.Style.compile(a)+k;
}}return e;
},_applyBackground:function(){{};
}}});
})();
(function(){var A="_applyStyle",z="",y="Color",x="px",w="solid",v="dotted",u="double",t="dashed",s="_applyWidth",r="qx.ui.decoration.Uniform",o="px ",q=" ",p="scale",n="PositiveInteger",m="absolute";
qx.Class.define(r,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(B,C,D){qx.ui.decoration.Abstract.call(this);
if(B!=null){this.setWidth(B);
}
if(C!=null){this.setStyle(C);
}
if(D!=null){this.setColor(D);
}},properties:{width:{check:n,init:0,apply:s},style:{nullable:true,check:[w,v,t,u],init:w,apply:A},color:{nullable:true,check:y,apply:A},backgroundColor:{check:y,nullable:true,apply:A}},members:{__kk:null,_getDefaultInsets:function(){var E=this.getWidth();
return {top:E,right:E,bottom:E,left:E};
},_isInitialized:function(){return !!this.__kk;
},getMarkup:function(){if(this.__kk){return this.__kk;
}var d={position:m,top:0,left:0};
var e=this.getWidth();
{};
var g=qx.theme.manager.Color.getInstance();
d.border=e+o+this.getStyle()+q+(g.resolve(this.getColor())||z);
var f=this._generateBackgroundMarkup(d);
return this.__kk=f;
},resize:function(h,i,j){var l=this.getBackgroundImage()&&this.getBackgroundRepeat()==p;

if(l||qx.bom.client.Feature.CONTENT_BOX){var k=this.getWidth()*2;
i-=k;
j-=k;
if(i<0){i=0;
}
if(j<0){j=0;
}}h.style.width=i+x;
h.style.height=j+x;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||z;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__kk=null;
}});
})();
(function(){var h="px",g="qx.ui.decoration.Background",f="",e="_applyStyle",d="Color",c="absolute";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(o){qx.ui.decoration.Abstract.call(this);

if(o!=null){this.setBackgroundColor(o);
}},properties:{backgroundColor:{check:d,nullable:true,apply:e}},members:{__kl:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__kl;
},getMarkup:function(){if(this.__kl){return this.__kl;
}var a={position:c,top:0,left:0};
var b=this._generateBackgroundMarkup(a);
return this.__kl=b;
},resize:function(l,m,n){l.style.width=m+h;
l.style.height=n+h;
},tint:function(i,j){var k=qx.theme.manager.Color.getInstance();

if(j==null){j=this.getBackgroundColor();
}i.style.backgroundColor=k.resolve(j)||f;
},_applyStyle:function(){{};
}},destruct:function(){this.__kl=null;
}});
})();
(function(){var m="_applyStyle",l="solid",k="Color",j="",i="double",h="px ",g="dotted",f="_applyWidth",e="dashed",d="Number",I=" ",H="shorthand",G="px",F="widthTop",E="styleRight",D="styleLeft",C="widthLeft",B="widthBottom",A="styleTop",z="colorBottom",t="styleBottom",u="widthRight",r="colorLeft",s="colorRight",p="colorTop",q="scale",n="border-top",o="border-left",v="border-right",w="qx.ui.decoration.Single",y="border-bottom",x="absolute";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(a,b,c){qx.ui.decoration.Abstract.call(this);
if(a!=null){this.setWidth(a);
}
if(b!=null){this.setStyle(b);
}
if(c!=null){this.setColor(c);
}},properties:{widthTop:{check:d,init:0,apply:f},widthRight:{check:d,init:0,apply:f},widthBottom:{check:d,init:0,apply:f},widthLeft:{check:d,init:0,apply:f},styleTop:{nullable:true,check:[l,g,e,i],init:l,apply:m},styleRight:{nullable:true,check:[l,g,e,i],init:l,apply:m},styleBottom:{nullable:true,check:[l,g,e,i],init:l,apply:m},styleLeft:{nullable:true,check:[l,g,e,i],init:l,apply:m},colorTop:{nullable:true,check:k,apply:m},colorRight:{nullable:true,check:k,apply:m},colorBottom:{nullable:true,check:k,apply:m},colorLeft:{nullable:true,check:k,apply:m},backgroundColor:{check:k,nullable:true,apply:m},left:{group:[C,D,r]},right:{group:[u,E,s]},top:{group:[F,A,p]},bottom:{group:[B,t,z]},width:{group:[F,u,B,C],mode:H},style:{group:[A,E,t,D],mode:H},color:{group:[p,s,z,r],mode:H}},members:{__km:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__km;
},getMarkup:function(J){if(this.__km){return this.__km;
}var K=qx.theme.manager.Color.getInstance();
var L={};
var N=this.getWidthTop();

if(N>0){L[n]=N+h+this.getStyleTop()+I+(K.resolve(this.getColorTop())||j);
}var N=this.getWidthRight();

if(N>0){L[v]=N+h+this.getStyleRight()+I+(K.resolve(this.getColorRight())||j);
}var N=this.getWidthBottom();

if(N>0){L[y]=N+h+this.getStyleBottom()+I+(K.resolve(this.getColorBottom())||j);
}var N=this.getWidthLeft();

if(N>0){L[o]=N+h+this.getStyleLeft()+I+(K.resolve(this.getColorLeft())||j);
}{};
L.position=x;
L.top=0;
L.left=0;
var M=this._generateBackgroundMarkup(L);
return this.__km=M;
},resize:function(O,P,Q){var S=this.getBackgroundImage()&&this.getBackgroundRepeat()==q;

if(S||qx.bom.client.Feature.CONTENT_BOX){var R=this.getInsets();
P-=R.left+R.right;
Q-=R.top+R.bottom;
if(P<0){P=0;
}
if(Q<0){Q=0;
}}O.style.width=P+G;
O.style.height=Q+G;
},tint:function(T,U){var V=qx.theme.manager.Color.getInstance();

if(U==null){U=this.getBackgroundColor();
}T.style.backgroundColor=V.resolve(U)||j;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__km=null;
}});
})();
(function(){var t="Number",s="_applyInsets",r="-l",q="insetRight",p="insetTop",o="_applyBaseImage",n="insetBottom",m="set",l="shorthand",k="-t",h="insetLeft",j="String",i="qx.ui.decoration.Grid";
qx.Class.define(i,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(f,g){qx.core.Object.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__kn=new qx.ui.decoration.css3.BorderImage();

if(f){this.__ko(f);
}}else{this.__kn=new qx.ui.decoration.GridDiv(f);
}
if(g!=null){this.__kn.setInsets(g);
}},properties:{baseImage:{check:j,nullable:true,apply:o},insetLeft:{check:t,nullable:true,apply:s},insetRight:{check:t,nullable:true,apply:s},insetBottom:{check:t,nullable:true,apply:s},insetTop:{check:t,nullable:true,apply:s},insets:{group:[p,q,n,h],mode:l}},members:{__kn:null,getMarkup:function(){return this.__kn.getMarkup();
},resize:function(u,v,w){this.__kn.resize(u,v,w);
},tint:function(a,b){},getInsets:function(){return this.__kn.getInsets();
},_applyInsets:function(c,d,name){var e=m+qx.lang.String.firstUp(name);
this.__kn[e](c);
},_applyBaseImage:function(x,y){if(this.__kn instanceof qx.ui.decoration.GridDiv){this.__kn.setBaseImage(x);
}else{this.__ko(x);
}},__ko:function(z){this.__kn.setBorderImage(z);
var D=qx.util.AliasManager.getInstance().resolve(z);
var E=/(.*)(\.[a-z]+)$/.exec(D);
var B=E[1];
var C=E[2];
var A=qx.util.ResourceManager.getInstance();
var F=A.getImageHeight(B+k+C);
var G=A.getImageWidth(B+r+C);
this.__kn.setSlice([F,G]);
}},destruct:function(){this.__kn=null;
}});
})();
(function(){var x="_applyStyle",w='"></div>',v="Color",u="1px",t='<div style="',s='border:',r="1px solid ",q="",p=";",o="px",J='</div>',I="qx.ui.decoration.Beveled",H='<div style="position:absolute;top:1px;left:1px;',G='border-bottom:',F='border-right:',E='border-left:',D='border-top:',C="Number",B='<div style="position:absolute;top:1px;left:0px;',A='position:absolute;top:0px;left:1px;',y='<div style="overflow:hidden;font-size:0;line-height:0;">',z="absolute";
qx.Class.define(I,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(l,m,n){qx.ui.decoration.Abstract.call(this);
if(l!=null){this.setOuterColor(l);
}
if(m!=null){this.setInnerColor(m);
}
if(n!=null){this.setInnerOpacity(n);
}},properties:{innerColor:{check:v,nullable:true,apply:x},innerOpacity:{check:C,init:1,apply:x},outerColor:{check:v,nullable:true,apply:x},backgroundColor:{check:v,nullable:true,apply:x}},members:{__kp:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__kp;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__kp){return this.__kp;
}var K=qx.theme.manager.Color.getInstance();
var L=[];
var O=r+K.resolve(this.getOuterColor())+p;
var N=r+K.resolve(this.getInnerColor())+p;
L.push(y);
L.push(t);
L.push(s,O);
L.push(qx.bom.element.Opacity.compile(0.35));
L.push(w);
L.push(B);
L.push(E,O);
L.push(F,O);
L.push(w);
L.push(t);
L.push(A);
L.push(D,O);
L.push(G,O);
L.push(w);
var M={position:z,top:u,left:u};
L.push(this._generateBackgroundMarkup(M));
L.push(H);
L.push(s,N);
L.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
L.push(w);
L.push(J);
return this.__kp=L.join(q);
},resize:function(a,b,c){if(b<4){b=4;
}
if(c<4){c=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=b-2;
var outerHeight=c-2;
var i=outerWidth;
var h=outerHeight;
var innerWidth=b-4;
var innerHeight=c-4;
}else{var outerWidth=b;
var outerHeight=c;
var i=b-2;
var h=c-2;
var innerWidth=i;
var innerHeight=h;
}var k=o;
var g=a.childNodes[0].style;
g.width=outerWidth+k;
g.height=outerHeight+k;
var f=a.childNodes[1].style;
f.width=outerWidth+k;
f.height=h+k;
var e=a.childNodes[2].style;
e.width=i+k;
e.height=outerHeight+k;
var d=a.childNodes[3].style;
d.width=i+k;
d.height=h+k;
var j=a.childNodes[4].style;
j.width=innerWidth+k;
j.height=innerHeight+k;
},tint:function(P,Q){var R=qx.theme.manager.Color.getInstance();

if(Q==null){Q=this.getBackgroundColor();
}P.childNodes[3].style.backgroundColor=R.resolve(Q)||q;
}},destruct:function(){this.__kp=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",bj="decoration/selection.png",t="border-input",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/form/button-c.png",q="decoration/scrollbar/scrollbar-bg-vertical.png",n="decoration/form/button.png",o="decoration/form/button-checked.png",B="decoration/tabview/tab-button-left-inactive.png",C="decoration/groupbox/groupbox.png",O="#FAFAFA",K="decoration/pane/pane.png",W="dotted",R="decoration/toolbar/toolbar-part.gif",bf="decoration/tabview/tab-button-top-inactive.png",bc="decoration/menu/bar-background.png",G="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",bg="decoration/form/tooltip-error-arrow.png",F="decoration/window/captionbar-inactive.png",I="qx/decoration/Modern",J="decoration/menu/background.png",M="decoration/window/statusbar.png",P="border-focused",S="table-focus-indicator",Y="#F2F2F2",be="decoration/form/button-checked-c.png",v="decoration/scrollbar/scrollbar-bg-horizontal.png",w="qx.theme.modern.Decoration",H="#f4f4f4",V="decoration/shadow/shadow-small.png",U="decoration/app-header.png",T="decoration/tabview/tabview-pane.png",bb="decoration/form/tooltip-error.png",ba="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",a="decoration/tabview/tab-button-right-active.png",bd="decoration/form/button-pressed.png",x="no-repeat",y="decoration/window/captionbar-active.png",L="decoration/tabview/tab-button-left-active.png",b="background-splitpane",c="decoration/form/button-checked-focused.png",E="#C5C5C5",z="decoration/toolbar/toolbar-gradient.png",A="decoration/tabview/tab-button-right-inactive.png",D="#b8b8b8",N="decoration/shadow/shadow.png";
qx.Theme.define(w,{aliases:{decoration:I},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bj,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bj,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:K,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:W}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundPositionY:G,backgroundRepeat:x,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:V,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:v,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:q,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:n,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:c,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:P,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:z,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:p,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:be,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:D,colorRight:H,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:R,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:T,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:B}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:A}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:b,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:y}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:F}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:M}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:S,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:Y,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:J,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:E,widthBottom:1,colorBottom:O}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bc,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:U,backgroundRepeat:l}}}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var gs="button-frame",gr="atom",gq="widget",gp="main",go="button",gn="text-selected",gm="image",gl="bold",gk="middle",gj="background-light",eW="text-disabled",eV="groupbox",eU="decoration/arrows/down.png",eT="cell",eS="selected",eR="border-invalid",eQ="input",eP="input-disabled",eO="menu-button",eN="input-focused-invalid",gz="toolbar-button",gA="spinner",gx="input-focused",gy="popup",gv="tooltip",gw="label",gt="list",gu="white",gB="tree-item",gC="treevirtual-contract",fR="scrollbar",fQ="datechooser/nav-button",fT="text-hovered",fS="center",fV="treevirtual-expand",fU="textfield",fX="decoration/arrows/right.png",fW="background-application",fP="radiobutton",fO="invalid",cS="combobox",cT="right-top",cU="checkbox",cV="text-title",cW="qx/static/blank.gif",cX="scrollbar/button",cY="right",da="combobox/button",db="icon/16/places/folder.png",dc="text-label",gQ="decoration/tree/closed.png",gP="scrollbar-slider-horizontal",gO="decoration/arrows/left.png",gN="button-focused",gU="text-light",gT="menu-slidebar-button",gS="text-input",gR="slidebar/button-forward",gW="background-splitpane",gV=".png",dV="decoration/tree/open.png",dW="default",dT="decoration/arrows/down-small.png",dU="datechooser",ea="slidebar/button-backward",eb="selectbox",dX="treevirtual-folder",dY="shadow-popup",dR="icon/16/mimetypes/office-document.png",dS="background-medium",dx="table",dw="decoration/arrows/up.png",dz="decoration/form/",dy="",dt="-invalid",ds="icon/16/places/folder-open.png",dv="button-checked",du="decoration/window/maximize-active-hovered.png",dr="radiobutton-hovered",dq="keyboard-focus",eh="decoration/cursors/",ei="slidebar",ej="tooltip-error-arrow",ek="table-scroller-focus-indicator",ed="move-frame",ee="nodrop",ef="decoration/table/boolean-true.png",eg="table-header-cell",el="menu",em="app-header",dK="row-layer",dJ="text-inactive",dI="move",dH="radiobutton-checked-focused",dG="decoration/window/restore-active-hovered.png",dF="shadow-window",dE="table-column-button",dD="right.png",dO="tabview-page-button-bottom-inactive",dN="tooltip-error",en="window-statusbar",eo="button-hovered",ep="decoration/scrollbar/scrollbar-",eq="background-tip",er="scrollbar-slider-horizontal-disabled",es="table-scroller-header",et="button-pressed",eu="table-pane",ev="decoration/window/close-active.png",ew="native",ff="checkbox-hovered",fe="button-invalid-shadow",fd="checkbox-checked",fc="decoration/window/minimize-active-hovered.png",fj="menubar",fi="icon/16/actions/dialog-cancel.png",fh="tabview-page-button-top-inactive",fg="tabview-page-button-left-inactive",fn="menu-slidebar",fm="toolbar-button-checked",fK="decoration/tree/open-selected.png",fL="radiobutton-checked",fI="decoration/window/minimize-inactive.png",fJ="icon/16/apps/office-calendar.png",fG="group",fH="tabview-page-button-right-inactive",fE="decoration/window/minimize-active.png",fF="decoration/window/restore-inactive.png",fM="checkbox-checked-focused",fN="splitpane",gc="combobox/textfield",gb="button-preselected-focused",ge="decoration/window/close-active-hovered.png",gd="qx/icon/Tango/16/actions/window-close.png",gg="checkbox-pressed",gf="button-disabled",gi="selected-dragover",gh="border-separator",ga="decoration/window/maximize-inactive.png",fY="dragover",gJ="scrollarea",gK="scrollbar-vertical",gL="decoration/menu/checkbox-invert.gif",gM="decoration/toolbar/toolbar-handle-knob.gif",gF="icon/22/mimetypes/office-document.png",gG="button-preselected",gH="button-checked-focused",gI="up.png",gD="best-fit",gE="decoration/tree/closed-selected.png",cR="qx.theme.modern.Appearance",cQ="text-active",cP="toolbar-button-hovered",cO="progressive-table-header",cN="decoration/table/select-column-order.png",cM="decoration/menu/radiobutton.gif",cL="decoration/arrows/forward.png",cK="decoration/table/descending.png",cJ="window-captionbar-active",cI="checkbox-checked-hovered",df="scrollbar-slider-vertical",dg="toolbar",dd="alias",de="decoration/window/restore-active.png",dj="decoration/table/boolean-false.png",dk="checkbox-checked-disabled",dh="icon/32/mimetypes/office-document.png",di="radiobutton-checked-disabled",dm="tabview-pane",dn="decoration/arrows/rewind.png",fr="checkbox-focused",fl="top",fy="icon/16/actions/dialog-ok.png",fu="radiobutton-checked-hovered",fa="table-header-cell-hovered",eX="window",dB="text-gray",fb="decoration/menu/radiobutton-invert.gif",dM="text-placeholder",dL="slider",eF="keep-align",eG="down.png",eH="tabview-page-button-top-active",eI="icon/32/places/folder-open.png",eJ="icon/22/places/folder.png",eK="decoration/window/maximize-active.png",eL="checkbox-checked-pressed",eM="decoration/window/close-inactive.png",eD="tabview-page-button-left-active",eE="toolbar-part",eY="decoration/splitpane/knob-vertical.png",fx=".gif",fw="icon/22/places/folder-open.png",fv="radiobutton-checked-pressed",fC="table-statusbar",fB="radiobutton-pressed",fA="window-captionbar-inactive",fz="copy",ft="radiobutton-focused",fs="decoration/arrows/down-invert.png",dl="decoration/menu/checkbox.gif",dQ="decoration/splitpane/knob-horizontal.png",dP="icon/32/places/folder.png",fk="toolbar-separator",ec="tabview-page-button-bottom-active",fq="decoration/arrows/up-small.png",fp="decoration/table/ascending.png",fo="decoration/arrows/up-invert.png",dA="small",fD="tabview-page-button-right-active",dp="-disabled",dC="scrollbar-horizontal",ex="progressive-table-header-cell",ey="menu-separator",ez="pane",eA="decoration/arrows/right-invert.png",eB="left.png",eC="icon/16/actions/view-refresh.png";
qx.Theme.define(cR,{appearances:{"widget":{},"root":{style:function(bh){return {backgroundColor:fW,textColor:dc,font:dW};
}},"label":{style:function(cz){return {textColor:cz.disabled?eW:undefined};
}},"move-frame":{style:function(bE){return {decorator:gp};
}},"resize-frame":ed,"dragdrop-cursor":{style:function(cu){var cv=ee;

if(cu.copy){cv=fz;
}else if(cu.move){cv=dI;
}else if(cu.alias){cv=dd;
}return {source:eh+cv+fx,position:cT,offset:[2,16,2,6]};
}},"image":{style:function(by){return {opacity:!by.replacement&&by.disabled?0.3:1};
}},"atom":{},"atom/label":gw,"atom/icon":gm,"popup":{style:function(ha){return {decorator:gp,backgroundColor:gj,shadow:dY};
}},"button-frame":{alias:gr,style:function(bi){var bk,bj;

if(bi.checked&&bi.focused&&!bi.inner){bk=gH;
bj=undefined;
}else if(bi.disabled){bk=gf;
bj=undefined;
}else if(bi.pressed){bk=et;
bj=fT;
}else if(bi.checked){bk=dv;
bj=undefined;
}else if(bi.hovered){bk=eo;
bj=fT;
}else if(bi.preselected&&bi.focused&&!bi.inner){bk=gb;
bj=fT;
}else if(bi.preselected){bk=gG;
bj=fT;
}else if(bi.focused&&!bi.inner){bk=gN;
bj=undefined;
}else{bk=go;
bj=undefined;
}return {decorator:bk,textColor:bj,shadow:bi.invalid&&!bi.disabled?fe:undefined};
}},"button-frame/image":{style:function(cx){return {opacity:!cx.replacement&&cx.disabled?0.5:1};
}},"button":{alias:gs,include:gs,style:function(hy){return {padding:[2,8],center:true};
}},"hover-button":{alias:gr,include:gr,style:function(hL){return {decorator:hL.hovered?eS:undefined,textColor:hL.hovered?gn:undefined};
}},"splitbutton":{},"splitbutton/button":go,"splitbutton/arrow":{alias:go,include:go,style:function(gY){return {icon:eU,padding:2,marginLeft:1};
}},"checkbox":{alias:gr,style:function(cd){var cf;

if(cd.checked&&cd.focused){cf=fM;
}else if(cd.checked&&cd.disabled){cf=dk;
}else if(cd.checked&&cd.pressed){cf=eL;
}else if(cd.checked&&cd.hovered){cf=cI;
}else if(cd.checked){cf=fd;
}else if(cd.focused){cf=fr;
}else if(cd.pressed){cf=gg;
}else if(cd.hovered){cf=ff;
}else{cf=cU;
}var ce=cd.invalid&&!cd.disabled?dt:dy;
return {icon:dz+cf+ce+gV,gap:6};
}},"radiobutton":{alias:gr,style:function(l){var n;

if(l.checked&&l.focused){n=dH;
}else if(l.checked&&l.disabled){n=di;
}else if(l.checked&&l.pressed){n=fv;
}else if(l.checked&&l.hovered){n=fu;
}else if(l.checked){n=fL;
}else if(l.focused){n=ft;
}else if(l.pressed){n=fB;
}else if(l.hovered){n=dr;
}else{n=fP;
}var m=l.invalid&&!l.disabled?dt:dy;
return {icon:dz+n+m+gV,gap:6};
}},"textfield":{style:function(hO){var hT;
var hR=!!hO.focused;
var hS=!!hO.invalid;
var hP=!!hO.disabled;

if(hR&&hS&&!hP){hT=eN;
}else if(hR&&!hS&&!hP){hT=gx;
}else if(hP){hT=eP;
}else if(!hR&&hS&&!hP){hT=eR;
}else{hT=eQ;
}var hQ;

if(hO.disabled){hQ=eW;
}else if(hO.showingPlaceholder){hQ=dM;
}else{hQ=gS;
}return {decorator:hT,padding:[2,4,1],textColor:hQ};
}},"textarea":{include:fU,style:function(bO){return {padding:4};
}},"spinner":{style:function(F){var J;
var H=!!F.focused;
var I=!!F.invalid;
var G=!!F.disabled;

if(H&&I&&!G){J=eN;
}else if(H&&!I&&!G){J=gx;
}else if(G){J=eP;
}else if(!H&&I&&!G){J=eR;
}else{J=eQ;
}return {decorator:J};
}},"spinner/textfield":{style:function(hB){return {marginRight:2,padding:[2,4,1],textColor:hB.disabled?eW:gS};
}},"spinner/upbutton":{alias:gs,include:gs,style:function(M){return {icon:fq,padding:M.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:gs,include:gs,style:function(bI){return {icon:dT,padding:bI.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":cS,"datefield/button":{alias:da,include:da,style:function(cm){return {icon:fJ,padding:[0,3],decorator:undefined};
}},"datefield/textfield":gc,"datefield/list":{alias:dU,include:dU,style:function(u){return {decorator:undefined};
}},"groupbox":{style:function(U){return {legendPosition:fl};
}},"groupbox/legend":{alias:gr,style:function(C){return {padding:[1,0,1,4],textColor:C.invalid?fO:cV,font:gl};
}},"groupbox/frame":{style:function(cB){return {padding:12,decorator:fG};
}},"check-groupbox":eV,"check-groupbox/legend":{alias:cU,include:cU,style:function(y){return {padding:[1,0,1,4],textColor:y.invalid?fO:cV,font:gl};
}},"radio-groupbox":eV,"radio-groupbox/legend":{alias:fP,include:fP,style:function(x){return {padding:[1,0,1,4],textColor:x.invalid?fO:cV,font:gl};
}},"scrollarea":{style:function(ct){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(bW){return {backgroundColor:fW};
}},"scrollarea/pane":gq,"scrollarea/scrollbar-x":fR,"scrollarea/scrollbar-y":fR,"scrollbar":{style:function(D){if(D[ew]){return {};
}return {width:D.horizontal?undefined:16,height:D.horizontal?16:undefined,decorator:D.horizontal?dC:gK,padding:1};
}},"scrollbar/slider":{alias:dL,style:function(bU){return {padding:bU.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:gs,style:function(bM){var bN=bM.horizontal?gP:df;

if(bM.disabled){bN+=dp;
}return {decorator:bN,minHeight:bM.horizontal?undefined:9,minWidth:bM.horizontal?9:undefined};
}},"scrollbar/button":{alias:gs,include:gs,style:function(bY){var ca=ep;

if(bY.left){ca+=eB;
}else if(bY.right){ca+=dD;
}else if(bY.up){ca+=gI;
}else{ca+=eG;
}
if(bY.left||bY.right){return {padding:[0,0,0,bY.left?3:4],icon:ca,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:ca,width:14,height:15};
}}},"scrollbar/button-begin":cX,"scrollbar/button-end":cX,"slider":{style:function(a){var e;
var c=!!a.focused;
var d=!!a.invalid;
var b=!!a.disabled;

if(c&&d&&!b){e=eN;
}else if(c&&!d&&!b){e=gx;
}else if(b){e=eP;
}else if(!c&&d&&!b){e=eR;
}else{e=eQ;
}return {decorator:e};
}},"slider/knob":{include:gs,style:function(bK){return {decorator:bK.disabled?er:gP,shadow:undefined,height:14,width:14};
}},"list":{alias:gJ,style:function(bt){var bx;
var bv=!!bt.focused;
var bw=!!bt.invalid;
var bu=!!bt.disabled;

if(bv&&bw&&!bu){bx=eN;
}else if(bv&&!bw&&!bu){bx=gx;
}else if(bu){bx=eP;
}else if(!bv&&bw&&!bu){bx=eR;
}else{bx=eQ;
}return {backgroundColor:gj,decorator:bx};
}},"list/pane":gq,"listitem":{alias:gr,style:function(hF){var hG;

if(hF.dragover){hG=hF.selected?gi:fY;
}else{hG=hF.selected?eS:undefined;
}return {padding:hF.dragover?[4,4,2,4]:4,textColor:hF.selected?gn:undefined,decorator:hG};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:gs,include:gs,style:function(t){return {padding:5,center:true,icon:t.vertical?eU:fX};
}},"slidebar/button-backward":{alias:gs,include:gs,style:function(Q){return {padding:5,center:true,icon:Q.vertical?dw:gO};
}},"tabview":{style:function(P){return {contentPadding:16};
}},"tabview/bar":{alias:ei,style:function(hH){var hI={marginBottom:hH.barTop?-1:0,marginTop:hH.barBottom?-4:0,marginLeft:hH.barRight?-3:0,marginRight:hH.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(hH.barTop||hH.barBottom){hI.paddingLeft=5;
hI.paddingRight=7;
}else{hI.paddingTop=5;
hI.paddingBottom=7;
}return hI;
}},"tabview/bar/button-forward":{include:gR,alias:gR,style:function(hn){if(hn.barTop||hn.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:ea,alias:ea,style:function(bJ){if(bJ.barTop||bJ.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(bR){return {decorator:dm,minHeight:100,marginBottom:bR.barBottom?-1:0,marginTop:bR.barTop?-1:0,marginLeft:bR.barLeft?-1:0,marginRight:bR.barRight?-1:0};
}},"tabview-page":gq,"tabview-page/button":{alias:gr,style:function(hX){var ie,ia=0;
var id=0,hY=0,ib=0,ic=0;

if(hX.checked){if(hX.barTop){ie=eH;
ia=[6,14];
ib=hX.firstTab?0:-5;
ic=hX.lastTab?0:-5;
}else if(hX.barBottom){ie=ec;
ia=[6,14];
ib=hX.firstTab?0:-5;
ic=hX.lastTab?0:-5;
}else if(hX.barRight){ie=fD;
ia=[6,13];
id=hX.firstTab?0:-5;
hY=hX.lastTab?0:-5;
}else{ie=eD;
ia=[6,13];
id=hX.firstTab?0:-5;
hY=hX.lastTab?0:-5;
}}else{if(hX.barTop){ie=fh;
ia=[4,10];
id=4;
ib=hX.firstTab?5:1;
ic=1;
}else if(hX.barBottom){ie=dO;
ia=[4,10];
hY=4;
ib=hX.firstTab?5:1;
ic=1;
}else if(hX.barRight){ie=fH;
ia=[4,10];
ic=5;
id=hX.firstTab?5:1;
hY=1;
ib=1;
}else{ie=fg;
ia=[4,10];
ib=5;
id=hX.firstTab?5:1;
hY=1;
ic=1;
}}return {zIndex:hX.checked?10:5,decorator:ie,padding:ia,marginTop:id,marginBottom:hY,marginLeft:ib,marginRight:ic,textColor:hX.checked?cQ:dJ};
}},"tabview-page/button/label":{alias:gw,style:function(hD){return {padding:[0,1,0,1],margin:hD.focused?0:1,decorator:hD.focused?dq:undefined};
}},"tabview-page/button/close-button":{alias:gr,style:function(A){return {icon:gd};
}},"toolbar":{style:function(K){return {decorator:dg,spacing:2};
}},"toolbar/part":{style:function(bX){return {decorator:eE,spacing:2};
}},"toolbar/part/container":{style:function(p){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(f){return {source:gM,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:gr,style:function(hE){return {marginTop:2,marginBottom:2,padding:(hE.pressed||hE.checked||hE.hovered)&&!hE.disabled||(hE.disabled&&hE.checked)?3:5,decorator:hE.pressed||(hE.checked&&!hE.hovered)||(hE.checked&&hE.disabled)?fm:hE.hovered&&!hE.disabled?cP:undefined};
}},"toolbar-menubutton":{alias:gz,include:gz,style:function(cD){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:gm,include:gm,style:function(hu){return {source:dT};
}},"toolbar-splitbutton":{style:function(ck){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:gz,include:gz,style:function(gX){return {icon:eU,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:gz,include:gz,style:function(bB){return {padding:bB.pressed||bB.checked?1:bB.hovered?1:3,icon:eU,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(bC){return {decorator:fk,margin:7};
}},"tree":gt,"tree-item":{style:function(bQ){return {padding:[2,6],textColor:bQ.selected?gn:undefined,decorator:bQ.selected?eS:undefined};
}},"tree-item/icon":{include:gm,style:function(hK){return {paddingRight:5};
}},"tree-item/label":gw,"tree-item/open":{include:gm,style:function(bf){var bg;

if(bf.selected&&bf.opened){bg=fK;
}else if(bf.selected&&!bf.opened){bg=gE;
}else if(bf.opened){bg=dV;
}else{bg=gQ;
}return {padding:[0,5,0,2],source:bg};
}},"tree-folder":{include:gB,alias:gB,style:function(hM){var hN;

if(hM.small){hN=hM.opened?ds:db;
}else if(hM.large){hN=hM.opened?eI:dP;
}else{hN=hM.opened?fw:eJ;
}return {icon:hN};
}},"tree-file":{include:gB,alias:gB,style:function(ht){return {icon:ht.small?dR:ht.large?dh:gF};
}},"treevirtual":dx,"treevirtual-folder":{style:function(bF){return {icon:bF.opened?ds:db};
}},"treevirtual-file":{include:dX,alias:dX,style:function(w){return {icon:dR};
}},"treevirtual-line":{style:function(cA){return {icon:cW};
}},"treevirtual-contract":{style:function(br){return {icon:dV,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(hv){return {icon:gQ,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":gC,"treevirtual-only-expand":fV,"treevirtual-start-contract":gC,"treevirtual-start-expand":fV,"treevirtual-end-contract":gC,"treevirtual-end-expand":fV,"treevirtual-cross-contract":gC,"treevirtual-cross-expand":fV,"treevirtual-end":{style:function(bA){return {icon:cW};
}},"treevirtual-cross":{style:function(hk){return {icon:cW};
}},"tooltip":{include:gy,style:function(bs){return {backgroundColor:eq,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":gr,"tooltip-error":{include:gv,style:function(hW){return {textColor:gn,placeMethod:gq,offset:[0,0,0,14],marginTop:-2,position:cT,showTimeout:100,hideTimeout:10000,decorator:dN,shadow:ej,font:gl};
}},"tooltip-error/atom":gr,"window":{style:function(hq){return {shadow:dF,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(hV){return {decorator:eX};
}},"window/captionbar":{style:function(bo){return {decorator:bo.active?cJ:fA,textColor:bo.active?gu:dB,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(q){return {margin:[5,0,3,6]};
}},"window/title":{style:function(bb){return {alignY:gk,font:gl,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:gr,style:function(bP){return {icon:bP.active?bP.hovered?fc:fE:fI,margin:[4,8,2,0]};
}},"window/restore-button":{alias:gr,style:function(cg){return {icon:cg.active?cg.hovered?dG:de:fF,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:gr,style:function(cp){return {icon:cp.active?cp.hovered?du:eK:ga,margin:[4,8,2,0]};
}},"window/close-button":{alias:gr,style:function(cE){return {icon:cE.active?cE.hovered?ge:ev:eM,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(cn){return {padding:[2,6],decorator:en,minHeight:18};
}},"window/statusbar-text":{style:function(hp){return {font:dA};
}},"iframe":{style:function(co){return {decorator:gp};
}},"resizer":{style:function(hC){return {decorator:ez};
}},"splitpane":{style:function(hJ){return {decorator:fN};
}},"splitpane/splitter":{style:function(hA){return {width:hA.horizontal?3:undefined,height:hA.vertical?3:undefined,backgroundColor:gW};
}},"splitpane/splitter/knob":{style:function(cq){return {source:cq.horizontal?dQ:eY};
}},"splitpane/slider":{style:function(cF){return {width:cF.horizontal?3:undefined,height:cF.vertical?3:undefined,backgroundColor:gW};
}},"selectbox":{alias:gs,include:gs,style:function(bd){return {padding:[2,8]};
}},"selectbox/atom":gr,"selectbox/popup":gy,"selectbox/list":{alias:gt},"selectbox/arrow":{include:gm,style:function(hc){return {source:eU,paddingLeft:5};
}},"datechooser":{style:function(hf){var hj;
var hh=!!hf.focused;
var hi=!!hf.invalid;
var hg=!!hf.disabled;

if(hh&&hi&&!hg){hj=eN;
}else if(hh&&!hi&&!hg){hj=gx;
}else if(hg){hj=eP;
}else if(!hh&&hi&&!hg){hj=eR;
}else{hj=eQ;
}return {padding:2,decorator:hj,backgroundColor:gj};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:gs,alias:gs,style:function(hr){var hs={padding:[2,4],shadow:undefined};

if(hr.lastYear){hs.icon=dn;
hs.marginRight=1;
}else if(hr.lastMonth){hs.icon=gO;
}else if(hr.nextYear){hs.icon=cL;
hs.marginLeft=1;
}else if(hr.nextMonth){hs.icon=fX;
}return hs;
}},"datechooser/last-year-button-tooltip":gv,"datechooser/last-month-button-tooltip":gv,"datechooser/next-year-button-tooltip":gv,"datechooser/next-month-button-tooltip":gv,"datechooser/last-year-button":fQ,"datechooser/last-month-button":fQ,"datechooser/next-month-button":fQ,"datechooser/next-year-button":fQ,"datechooser/month-year-label":{style:function(bD){return {font:gl,textAlign:fS,textColor:bD.disabled?eW:undefined};
}},"datechooser/date-pane":{style:function(R){return {textColor:R.disabled?eW:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(bn){return {textColor:bn.disabled?eW:bn.weekend?gU:undefined,textAlign:fS,paddingTop:2,backgroundColor:dS};
}},"datechooser/week":{style:function(s){return {textAlign:fS,padding:[2,4],backgroundColor:dS};
}},"datechooser/day":{style:function(cb){return {textAlign:fS,decorator:cb.disabled?undefined:cb.selected?eS:undefined,textColor:cb.disabled?eW:cb.selected?gn:cb.otherMonth?gU:undefined,font:cb.today?gl:undefined,padding:[2,4]};
}},"combobox":{style:function(V){var ba;
var X=!!V.focused;
var Y=!!V.invalid;
var W=!!V.disabled;

if(X&&Y&&!W){ba=eN;
}else if(X&&!Y&&!W){ba=gx;
}else if(W){ba=eP;
}else if(!X&&Y&&!W){ba=eR;
}else{ba=eQ;
}return {decorator:ba};
}},"combobox/popup":gy,"combobox/list":{alias:gt},"combobox/button":{include:gs,alias:gs,style:function(bS){var bT={icon:eU,padding:2};

if(bS.selected){bT.decorator=gN;
}return bT;
}},"combobox/textfield":{include:fU,style:function(B){return {decorator:undefined};
}},"menu":{style:function(ci){var cj={decorator:el,shadow:dY,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:ci.submenu||ci.contextmenu?gD:eF};

if(ci.submenu){cj.position=cT;
cj.offset=[-2,-3];
}return cj;
}},"menu/slidebar":fn,"menu-slidebar":gq,"menu-slidebar-button":{style:function(bc){return {decorator:bc.hovered?eS:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:gT,style:function(hz){return {icon:hz.hovered?fo:dw};
}},"menu-slidebar/button-forward":{include:gT,style:function(ch){return {icon:ch.hovered?fs:eU};
}},"menu-separator":{style:function(T){return {height:0,decorator:ey,margin:[4,2]};
}},"menu-button":{alias:gr,style:function(cH){return {decorator:cH.selected?eS:undefined,textColor:cH.selected?gn:undefined,padding:[4,6]};
}},"menu-button/icon":{include:gm,style:function(cw){return {alignY:gk};
}},"menu-button/label":{include:gw,style:function(h){return {alignY:gk,padding:1};
}},"menu-button/shortcut":{include:gw,style:function(o){return {alignY:gk,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:gm,style:function(be){return {source:be.selected?eA:fX,alignY:gk};
}},"menu-checkbox":{alias:eO,include:eO,style:function(j){return {icon:!j.checked?undefined:j.selected?gL:dl};
}},"menu-radiobutton":{alias:eO,include:eO,style:function(cC){return {icon:!cC.checked?undefined:cC.selected?fb:cM};
}},"menubar":{style:function(ho){return {decorator:fj};
}},"menubar-button":{alias:gr,style:function(bz){return {decorator:bz.pressed||bz.hovered?eS:undefined,textColor:bz.pressed||bz.hovered?gn:undefined,padding:[3,8]};
}},"colorselector":gq,"colorselector/control-bar":gq,"colorselector/control-pane":gq,"colorselector/visual-pane":eV,"colorselector/preset-grid":gq,"colorselector/colorbucket":{style:function(hx){return {decorator:gp,width:16,height:16};
}},"colorselector/preset-field-set":eV,"colorselector/input-field-set":eV,"colorselector/preview-field-set":eV,"colorselector/hex-field-composite":gq,"colorselector/hex-field":fU,"colorselector/rgb-spinner-composite":gq,"colorselector/rgb-spinner-red":gA,"colorselector/rgb-spinner-green":gA,"colorselector/rgb-spinner-blue":gA,"colorselector/hsb-spinner-composite":gq,"colorselector/hsb-spinner-hue":gA,"colorselector/hsb-spinner-saturation":gA,"colorselector/hsb-spinner-brightness":gA,"colorselector/preview-content-old":{style:function(hw){return {decorator:gp,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(bl){return {decorator:gp,backgroundColor:gj,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(cl){return {decorator:gp,margin:5};
}},"colorselector/brightness-field":{style:function(cG){return {decorator:gp,margin:[5,7]};
}},"colorselector/hue-saturation-pane":gq,"colorselector/hue-saturation-handle":gq,"colorselector/brightness-pane":gq,"colorselector/brightness-handle":gq,"colorpopup":{alias:gy,include:gy,style:function(hl){return {padding:5,backgroundColor:fW};
}},"colorpopup/field":{style:function(L){return {decorator:gp,margin:2,width:14,height:14,backgroundColor:gj};
}},"colorpopup/selector-button":go,"colorpopup/auto-button":go,"colorpopup/preview-pane":eV,"colorpopup/current-preview":{style:function(z){return {height:20,padding:4,marginLeft:4,decorator:gp,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(hd){return {height:20,padding:4,marginRight:4,decorator:gp,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:go,include:go,style:function(k){return {icon:fy};
}},"colorpopup/colorselector-cancelbutton":{alias:go,include:go,style:function(i){return {icon:fi};
}},"table":{alias:gq,style:function(bm){return {decorator:dx};
}},"table-header":{},"table/statusbar":{style:function(r){return {decorator:fC,padding:[0,2]};
}},"table/column-button":{alias:gs,style:function(hm){return {decorator:dE,padding:3,icon:cN};
}},"table-column-reset-button":{include:eO,alias:eO,style:function(){return {icon:eC};
}},"table-scroller":gq,"table-scroller/scrollbar-x":fR,"table-scroller/scrollbar-y":fR,"table-scroller/header":{style:function(O){return {decorator:es};
}},"table-scroller/pane":{style:function(he){return {backgroundColor:eu};
}},"table-scroller/focus-indicator":{style:function(bH){return {decorator:ek};
}},"table-scroller/resize-line":{style:function(v){return {backgroundColor:gh,width:2};
}},"table-header-cell":{alias:gr,style:function(cr){return {minWidth:13,minHeight:20,padding:cr.hovered?[3,4,2,4]:[3,4],decorator:cr.hovered?fa:eg,sortIcon:cr.sorted?(cr.sortedAscending?fp:cK):undefined};
}},"table-header-cell/label":{style:function(hb){return {minWidth:0,alignY:gk,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(cy){return {alignY:gk,alignX:cY};
}},"table-header-cell/icon":{style:function(S){return {minWidth:0,alignY:gk,paddingRight:5};
}},"table-editor-textfield":{include:fU,style:function(E){return {decorator:undefined,padding:[2,2],backgroundColor:gj};
}},"table-editor-selectbox":{include:eb,alias:eb,style:function(bG){return {padding:[0,2],backgroundColor:gj};
}},"table-editor-combobox":{include:cS,alias:cS,style:function(bq){return {decorator:undefined,backgroundColor:gj};
}},"progressive-table-header":{alias:gq,style:function(N){return {decorator:cO};
}},"progressive-table-header-cell":{alias:gr,style:function(g){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:ex};
}},"app-header":{style:function(bp){return {font:gl,textColor:gn,padding:[8,12],decorator:em};
}},"virtual-list":gt,"virtual-list/row-layer":dK,"row-layer":{style:function(hU){return {colorEven:gu,colorOdd:gu};
}},"column-layer":gq,"cell":{style:function(bL){return {textColor:bL.selected?gn:dc,padding:[3,6],font:dW};
}},"cell-string":eT,"cell-number":{include:eT,style:function(bV){return {textAlign:cY};
}},"cell-image":eT,"cell-boolean":{include:eT,style:function(cc){return {iconTrue:ef,iconFalse:dj};
}},"cell-atom":eT,"cell-date":eT,"cell-html":eT,"htmlarea":{"include":gq,style:function(cs){return {backgroundColor:gu};
}}}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var b="qx.theme.Modern",a="Modern";
qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,appearance:qx.theme.modern.Appearance,icon:qx.theme.icon.Tango}});
})();
(function(){var j="white",i="black",h="#3E6CA8",g="#EBE9ED",f="#A7A6AA",e="#EEE",d="#F3F0F5",c="gray",b="#85878C",a="#888888",E="#3E5B97",D="#FFFFE1",C="#F3F8FD",B="#CBC8CD",A="#FFE0E0",z="#F4F4F4",y="#808080",x="#CCCCCC",w="#C82C2C",v="#DBEAF9",q="#BCCEE5",r="#A5BDDE",o="#7CA0CF",p="#F6F5F7",m="#FF9999",n="qx.theme.classic.Color",k="#990000",l="#F9F8E9",s="#DCDFE4",t="#FAFBFE",u="#AAAAAA";
qx.Theme.define(n,{colors:{"background":g,"background-light":d,"background-focused":C,"background-focused-inner":v,"background-disabled":z,"background-selected":h,"background-field":j,"background-pane":t,"background-invalid":A,"border-lead":a,"border-light":j,"border-light-shadow":s,"border-dark-shadow":f,"border-dark":b,"border-main":b,"border-focused-light":q,"border-focused-light-shadow":r,"border-focused-dark-shadow":o,"border-focused-dark":h,"border-separator":y,"invalid":k,"border-focused-invalid":m,"text":i,"text-disabled":f,"text-selected":j,"text-focused":E,"text-placeholder":B,"tooltip":D,"tooltip-text":i,"tooltip-invalid":w,"button":g,"button-hovered":p,"button-abandoned":l,"button-checked":d,"window-active-caption-text":[255,255,255],"window-inactive-caption-text":[255,255,255],"window-active-caption":[51,94,168],"window-inactive-caption":[111,161,217],"date-chooser":j,"date-chooser-title":[116,116,116],"date-chooser-selected":[52,52,52],"effect":[254,200,60],"table-pane":j,"table-header":[242,242,242],"table-header-border":[214,213,217],"table-header-cell":[235,234,219],"table-header-cell-hover":[255,255,255],"table-focus-indicator":[179,217,255],"table-row-background-focused-selected":[90,138,211],"table-row-background-focused":[221,238,255],"table-row-background-selected":[51,94,168],"table-row-background-even":[250,248,243],"table-row-background-odd":[255,255,255],"table-row-selected":[255,255,255],"table-row":[0,0,0],"table-row-line":e,"table-column-line":e,"progressive-table-header":u,"progressive-table-row-background-even":[250,248,243],"progressive-table-row-background-odd":[255,255,255],"progressive-progressbar-background":c,"progressive-progressbar-indicator-done":x,"progressive-progressbar-indicator-undone":j,"progressive-progressbar-percent-background":c,"progressive-progressbar-percent-text":j}});
})();
(function(){var j="px ",i=" ",h="Color",g="Number",f=";",e="px",d="shorthand",c="innerWidthRight",b="border-left:",a='<div style="position:absolute;top:0;left:0;',E="innerColorBottom",D='</div>',C='',B="scale",A="border-top",z="innerWidthTop",y="border-left",x="innerColorRight",w="innerColorTop",v="relative",q="border-top:",r="qx.ui.decoration.Double",o="border-right:",p='line-height:0;',m="innerColorLeft",n="border-bottom",k='">',l="innerWidthBottom",s="innerWidthLeft",t="border-bottom:",u="border-right";
qx.Class.define(r,{extend:qx.ui.decoration.Single,construct:function(F,G,H,innerWidth,I){qx.ui.decoration.Single.call(this,F,G,H,innerWidth,I);
if(innerWidth!=null){this.setInnerWidth(innerWidth);
}
if(I!=null){this.setInnerColor(I);
}},properties:{innerWidthTop:{check:g,init:0},innerWidthRight:{check:g,init:0},innerWidthBottom:{check:g,init:0},innerWidthLeft:{check:g,init:0},innerWidth:{group:[z,c,l,s],mode:d},innerColorTop:{nullable:true,check:h},innerColorRight:{nullable:true,check:h},innerColorBottom:{nullable:true,check:h},innerColorLeft:{nullable:true,check:h},innerColor:{group:[w,x,E,m],mode:d}},members:{__qb:null,_getDefaultInsets:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};
},_isInitialized:function(){return !!this.__qb;
},getMarkup:function(){if(this.__qb){return this.__qb;
}var J=qx.theme.manager.Color.getInstance();
var M={position:v};
var K=this.getInnerWidthTop();

if(K>0){M[A]=K+j+this.getStyleTop()+i+J.resolve(this.getInnerColorTop());
}var K=this.getInnerWidthRight();

if(K>0){M[u]=K+j+this.getStyleRight()+i+J.resolve(this.getInnerColorRight());
}var K=this.getInnerWidthBottom();

if(K>0){M[n]=K+j+this.getStyleBottom()+i+J.resolve(this.getInnerColorBottom());
}var K=this.getInnerWidthLeft();

if(K>0){M[y]=K+j+this.getStyleLeft()+i+J.resolve(this.getInnerColorLeft());
}{};
var N=this._generateBackgroundMarkup(M);
var L=p;
if((qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION<8)||(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.DOCUMENT_MODE<8)){L=C;
}var K=this.getWidthTop();

if(K>0){L+=q+K+j+this.getStyleTop()+i+J.resolve(this.getColorTop())+f;
}var K=this.getWidthRight();

if(K>0){L+=o+K+j+this.getStyleRight()+i+J.resolve(this.getColorRight())+f;
}var K=this.getWidthBottom();

if(K>0){L+=t+K+j+this.getStyleBottom()+i+J.resolve(this.getColorBottom())+f;
}var K=this.getWidthLeft();

if(K>0){L+=b+K+j+this.getStyleLeft()+i+J.resolve(this.getColorLeft())+f;
}{};
return this.__qb=a+L+k+N+D;
},resize:function(O,P,Q){var S=this.getBackgroundImage()&&this.getBackgroundRepeat()==B;

if(S||qx.bom.client.Feature.CONTENT_BOX){var R=this.getInsets();
var innerWidth=P-R.left-R.right;
var innerHeight=Q-R.top-R.bottom;
}else{var innerWidth=P-this.getWidthLeft()-this.getWidthRight();
var innerHeight=Q-this.getWidthTop()-this.getWidthBottom();
}if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}O.firstChild.style.width=innerWidth+e;
O.firstChild.style.height=innerHeight+e;
}},destruct:function(){this.__qb=null;
}});
})();
(function(){var j="border-dark-shadow",i="border-light",h="border-dark",g="border-light-shadow",f="solid",e="gray",d="border-focused-light",c="border-focused-dark",b="border-focused-light-shadow",a="border-focused-dark-shadow",y="table-header-border",x="dotted",w="border-separator",v="tooltip-text",u="invalid",t="white",s="decoration/shadow/shadow.png",r="black",q="effect",p="table-focus-indicator",n="border-focused-invalid",o="qx/decoration/Classic",l="border-lead",m="decoration/shadow/shadow-small.png",k="qx.theme.classic.Decoration";
qx.Theme.define(k,{aliases:{decoration:o},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:h}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:r,style:x}},"inset":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[j,i,i,j],innerColor:[h,g,g,h]}},"outset":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[g,h,h,g],innerColor:[i,j,j,i]}},"groove":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[j,i,i,j],innerColor:[i,j,j,i]}},"ridge":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[i,j,j,i],innerColor:[j,i,i,j]}},"inset-thin":{decorator:qx.ui.decoration.Single,style:{width:1,color:[j,i,i,j]}},"outset-thin":{decorator:qx.ui.decoration.Single,style:{width:1,color:[i,j,j,i]}},"focused-inset":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[a,d,d,a],innerColor:[c,b,b,c]}},"focused-outset":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[b,c,c,b],innerColor:[d,a,a,d]}},"border-invalid":{decorator:qx.ui.decoration.Double,style:{width:1,innerWidth:1,color:[j,i,i,j],innerColor:u}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:w}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:w}},"shadow":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:[4,8,8,4]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:[4,8,8,4]}},"shadow-small":{decorator:qx.ui.decoration.Grid,style:{baseImage:m,insets:[0,3,3,0]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:u,innerColor:n,insets:[0]}},"lead-item":{decorator:qx.ui.decoration.Uniform,style:{width:1,style:x,color:l}},"tooltip":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:v}},"tooltip-error":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:v}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:j}},"toolbar-part-handle":{decorator:qx.ui.decoration.Single,style:{width:1,style:f,colorTop:t,colorLeft:t,colorRight:j,colorBottom:j}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,widthBottom:1,colorTop:h,colorBottom:i}},"datechooser-date-pane":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:e,style:f}},"datechooser-weekday":{decorator:qx.ui.decoration.Single,style:{widthBottom:1,colorBottom:e,style:f}},"datechooser-week":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:e,style:f}},"datechooser-week-header":{decorator:qx.ui.decoration.Single,style:{widthBottom:1,colorBottom:e,widthRight:1,colorRight:e,style:f}},"tabview-page-button-top":{decorator:qx.ui.decoration.Double,style:{width:1,color:[g,h,h,g],innerWidth:1,innerColor:[i,j,j,i],widthBottom:0,innerWidthBottom:0}},"tabview-page-button-bottom":{decorator:qx.ui.decoration.Double,style:{width:1,color:[g,h,h,g],innerWidth:1,innerColor:[i,j,j,i],widthTop:0,innerWidthTop:0}},"tabview-page-button-left":{decorator:qx.ui.decoration.Double,style:{width:1,color:[g,h,h,g],innerWidth:1,innerColor:[i,j,j,i],widthRight:0,innerWidthRight:0}},"tabview-page-button-right":{decorator:qx.ui.decoration.Double,style:{width:1,color:[g,h,h,g],innerWidth:1,innerColor:[i,j,j,i],widthLeft:0,innerWidthLeft:0}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:j,styleTop:f}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{widthBottom:1,colorBottom:y,styleBottom:f}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:p,style:f}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:y,styleRight:f}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:y,styleRight:f,widthBottom:2,colorBottom:q,styleBottom:f}}}});
})();
(function(){var i="Liberation Sans",h="Verdana",g="Bitstream Vera Sans",f="Lucida Grande",e="Tahoma",d="monospace",c="qx.theme.classic.Font",b="Courier New",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:11,lineHeight:1.4,family:[f,e,h,g,i]},"bold":{size:11,lineHeight:1.4,family:[f,e,h,g,i],bold:true},"small":{size:10,lineHeight:1.4,family:[f,e,h,g,i]},"monospace":{size:11,lineHeight:1.4,family:[a,b,d]}}});
})();
(function(){var fP="button",fO="widget",fN="background",fM="atom",fL="inset-thin",fK="outset",fJ="text-disabled",fI="text-selected",fH="inset",fG="image",eJ="groupbox",eI="cell",eH="focused-inset",eG="tooltip",eF="menu-button",eE="middle",eD="decoration/arrows/down.gif",eC="spinner",eB="background-selected",eA="list",fW="button-hovered",fX="checkbox",fU="toolbar-button",fV="button-frame",fS="popup",fT="textfield",fQ="label",fR="background-invalid",fY="background-disabled",ga="bold",fp="white",fo="shadow-small",fr="invalid",fq="scrollbar",ft="center",fs="datechooser/button",fv="button-abandoned",fu="background-light",fn="main",fm="date-chooser",da="date-chooser-title",db="radiobutton",dc="default",dd="combobox",de="background-field",df="outset-thin",dg="menu-slidebar-button",dh="scrollbar/button",di="combobox/button",dj="table-header-cell",go="decoration/arrows/right.gif",gn="decoration/arrows/up.gif",gm="text",gl="decoration/arrows/down-small.gif",gs="icon/16/places/folder.png",gr="tree-folder",gq="slidebar/button-forward",gp="icon/16/mimetypes/text-plain.png",gu="right-top",gt="button-checked",dW=".png",dX="background-focused",dU="datechooser",dV="slidebar/button-backward",eb="selectbox",ec="treevirtual-folder",dY="decoration/form/",ea="decoration/tree/minus.gif",dS="",dT="decoration/tree/plus.gif",dC="-invalid",dB="decoration/arrows/left.gif",dE="icon/16/places/folder-open.png",dD="table-row-background-even",dy="decoration/treevirtual/cross_minus.gif",dx="radiobutton-hovered",dA="keyboard-focus",dz="decoration/treevirtual/start_plus.gif",dw="decoration/cursors/",dv="icon/16/actions/dialog-ok.png",eh="slidebar",ei="table-scroller-focus-indicator",ej="move-frame",ek="nodrop",ed="tabview-page-button-left",ee="decoration/arrows/up-small.gif",ef="move",eg="radiobutton-checked-focused",el="qx.theme.classic.Appearance",em="decoration/menu/checkbox.gif",dN="tooltip-error",dM="right",dL="decoration/arrows/rewind.gif",dK="table-scroller-header",dJ="table-pane",dI="focused-outset",dH="checkbox-hovered",dG="icon/16/actions/dialog-cancel.png",dR="menu-slidebar",dQ="datechooser-date-pane",en="background-pane",eo="decoration/treevirtual/cross_plus.gif",ep="qx/icon/Oxygen/16/actions/window-close.png",eq="datechooser-week",er="icon/16/apps/office-calendar.png",es="datechooser-weekday",et="table-header-border",eu="table-header-cell-hover",ev="window-active-caption-text",ew="window-active-caption",eQ="icon",eP="checkbox-checked-focused",eO="toolbar-separator",eN="groove",eU="checkbox-pressed",eT="tooltip-invalid",eS="decoration/window/restore.gif",eR="decoration/menu/checkbox-invert.gif",eX="scrollarea",eW="window-inactive-caption-text",fi="best-fit",fj="up.gif",fg="keep-align",fh="tabview-page-button-right",fe="tabview-page-button-top",ff="tabview-page-button-bottom",fc="row-layer",fd="decoration/menu/radiobutton.gif",fk="decoration/arrows/",fl="decoration/table/descending.png",fz="tooltip-text",fy="checkbox-checked-hovered",fB="left.gif",fA="decoration/arrows/up-invert.gif",fD="alias",fC="checkbox-checked-disabled",fF="decoration/arrows/right-invert.gif",fE="radiobutton-checked-disabled",fx="lead-item",fw="checkbox-focused",gh="border-dark",gi="decoration/treevirtual/end_plus.gif",gj="decoration/treevirtual/start_minus.gif",gk="radiobutton-checked-hovered",gd="decoration/window/minimize.gif",ge="checkbox-checked",gf="table-header-cell-hovered",gg="down.gif",gb="decoration/treevirtual/end.gif",gc="decoration/treevirtual/end_minus.gif",cY="window-inactive-caption",cX="decoration/menu/radiobutton-invert.gif",cW="text-placeholder",cV="slider",cU="decoration/table/select-column-order.png",cT="decoration/arrows/next.gif",cS="table-header",cR="decoration/treevirtual/only_minus.gif",cQ="datechooser-week-header",cP="decoration/window/maximize.gif",dm="decoration/treevirtual/only_plus.gif",dn="checkbox-checked-pressed",dk="decoration/arrows/down-invert.gif",dl="menu-separator",dr="decoration/splitpane/knob-vertical.png",ds=".gif",dp="decoration/arrows/forward.gif",dq="radiobutton-checked-pressed",dt="table-statusbar",du="radiobutton-pressed",eY="copy",eV="table-row-background-selected",fb="radiobutton-focused",fa="decoration/splitpane/knob-horizontal.png",eL="right.gif",eK="radiobutton-checked",dF="decoration/treevirtual/cross.gif",eM="decoration/table/ascending.png",dP="decoration/treevirtual/line.gif",dO="date-chooser-selected",ex="toolbar-part-handle",ey="decoration/window/close.gif",ez="icon/16/actions/view-refresh.png";
qx.Theme.define(el,{appearances:{"widget":{},"label":{style:function(bd){return {textColor:bd.disabled?fJ:undefined};
}},"image":{style:function(cF){return {opacity:!cF.replacement&&cF.disabled?0.3:undefined};
}},"atom":{},"atom/label":fQ,"atom/icon":fG,"root":{style:function(gW){return {backgroundColor:fN,textColor:gm,font:dc};
}},"popup":{style:function(bb){return {decorator:fn,backgroundColor:en,shadow:fo};
}},"tooltip":{include:fS,style:function(bq){return {backgroundColor:eG,textColor:fz,decorator:eG,shadow:fo,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":fM,"tooltip-error":{include:eG,style:function(J){return {textColor:fI,showTimeout:100,hideTimeout:10000,decorator:dN,font:ga,backgroundColor:eT};
}},"tooltip-error/atom":fM,"iframe":{style:function(bc){return {backgroundColor:fp,decorator:fH};
}},"move-frame":{style:function(ce){return {decorator:fn};
}},"resize-frame":ej,"dragdrop-cursor":{style:function(L){var M=ek;

if(L.copy){M=eY;
}else if(L.move){M=ef;
}else if(L.alias){M=fD;
}return {source:dw+M+ds,position:gu,offset:[2,16,2,6]};
}},"button-frame":{alias:fM,style:function(ha){if(ha.pressed||ha.abandoned||ha.checked){var hc=!ha.inner&&ha.focused?eH:fH;
var hb=[4,3,2,5];
}else{var hc=!ha.inner&&ha.focused?dI:fK;
var hb=[3,4];
}return {backgroundColor:ha.abandoned?fv:ha.hovered?fW:ha.checked?gt:fP,decorator:hc,padding:hb};
}},"button":{alias:fV,include:fV,style:function(co){return {center:true};
}},"hover-button":{alias:fM,include:fM,style:function(gw){return {backgroundColor:gw.hovered?eB:undefined,textColor:gw.hovered?fI:undefined};
}},"splitbutton":{},"splitbutton/button":fP,"splitbutton/arrow":{alias:fP,include:fP,style:function(gA){return {icon:eD};
}},"scrollarea/corner":{style:function(){return {backgroundColor:fN};
}},"scrollarea":fO,"scrollarea/pane":fO,"scrollarea/scrollbar-x":fq,"scrollarea/scrollbar-y":fq,"list":{alias:eX,style:function(R){var V;
var T=!!R.focused;
var U=!!R.invalid;
var S=!!R.disabled;

if(U&&!S){V=fR;
}else if(T&&!U&&!S){V=dX;
}else if(S){V=fY;
}else{V=fp;
}return {decorator:R.focused?eH:fH,backgroundColor:V};
}},"listitem":{alias:fM,style:function(bI){return {gap:4,padding:bI.lead?[2,4]:[3,5],backgroundColor:bI.selected?eB:undefined,textColor:bI.selected?fI:undefined,decorator:bI.lead?fx:undefined};
}},"textfield":{style:function(D){var I;
var G=!!D.focused;
var H=!!D.invalid;
var E=!!D.disabled;

if(H&&!E){I=fR;
}else if(G&&!H&&!E){I=dX;
}else if(E){I=fY;
}else{I=de;
}var F;

if(D.disabled){F=fJ;
}else if(D.showingPlaceholder){F=cW;
}else{F=undefined;
}return {decorator:D.focused?eH:fH,padding:[2,3],textColor:F,backgroundColor:I};
}},"textarea":fT,"checkbox":{alias:fM,style:function(bU){var bW;

if(bU.checked&&bU.focused){bW=eP;
}else if(bU.checked&&bU.disabled){bW=fC;
}else if(bU.checked&&bU.pressed){bW=dn;
}else if(bU.checked&&bU.hovered){bW=fy;
}else if(bU.checked){bW=ge;
}else if(bU.focused){bW=fw;
}else if(bU.pressed){bW=eU;
}else if(bU.hovered){bW=dH;
}else{bW=fX;
}var bV=bU.invalid&&!bU.disabled?dC:dS;
return {icon:dY+bW+bV+dW,gap:6};
}},"radiobutton":{alias:fX,include:fX,style:function(bm){var bo;

if(bm.checked&&bm.focused){bo=eg;
}else if(bm.checked&&bm.disabled){bo=fE;
}else if(bm.checked&&bm.pressed){bo=dq;
}else if(bm.checked&&bm.hovered){bo=gk;
}else if(bm.checked){bo=eK;
}else if(bm.focused){bo=fb;
}else if(bm.pressed){bo=du;
}else if(bm.hovered){bo=dx;
}else{bo=db;
}var bn=bm.invalid&&!bm.disabled?dC:dS;
return {icon:dY+bo+bn+dW,shadow:undefined};
}},"spinner":{style:function(P){return {decorator:P.focused?eH:fH,textColor:P.disabled?fJ:undefined};
}},"spinner/textfield":{include:fT,style:function(gE){return {decorator:undefined,padding:[2,3]};
}},"spinner/upbutton":{alias:fP,include:fP,style:function(K){return {icon:ee,padding:K.pressed?[2,2,0,4]:[1,3,1,3],backgroundColor:K.hovered?fW:fP};
}},"spinner/downbutton":{alias:fP,include:fP,style:function(bG){return {icon:gl,padding:bG.pressed?[2,2,0,4]:[1,3,1,3],backgroundColor:bG.hovered?fW:fP};
}},"datefield":dd,"datefield/button":{alias:di,include:di,style:function(cq){return {icon:er,padding:[0,3],backgroundColor:undefined,decorator:undefined};
}},"datefield/list":{alias:dU,include:dU,style:function(gM){return {decorator:gM.focused?eH:fH};
}},"groupbox":{style:function(gV){return {backgroundColor:fN};
}},"groupbox/legend":{alias:fM,style:function(bp){return {backgroundColor:fN,textColor:bp.invalid?fr:undefined,paddingRight:4,paddingLeft:4,marginRight:10,marginLeft:10};
}},"groupbox/frame":{style:function(gv){return {padding:[12,9],decorator:eN};
}},"check-groupbox":eJ,"check-groupbox/legend":{alias:fX,include:fX,style:function(b){return {backgroundColor:fN,textColor:b.invalid?fr:undefined,paddingRight:3,paddingLeft:3,marginRight:10,marginLeft:10};
}},"radio-groupbox":eJ,"radio-groupbox/legend":{alias:db,include:db,style:function(bH){return {backgroundColor:fN,textColor:bH.invalid?fr:undefined,paddingRight:3,paddingLeft:3,marginRight:10,marginLeft:10};
}},"toolbar":{style:function(bR){return {backgroundColor:fN};
}},"toolbar/part":{},"toolbar/part/container":{},"toolbar/part/handle":{style:function(bJ){return {decorator:ex,backgroundColor:fN,padding:[0,1],margin:[3,2],allowGrowY:true};
}},"toolbar-separator":{style:function(ck){return {margin:[3,2],decorator:eO};
}},"toolbar-button":{alias:fM,style:function(gF){if(gF.pressed||gF.checked||gF.abandoned){var gH=fL;
var gG=[3,2,1,4];
}else if(gF.hovered){var gH=df;
var gG=[2,3];
}else{var gH=undefined;
var gG=[3,4];
}return {cursor:dc,decorator:gH,padding:gG,backgroundColor:gF.abandoned?fv:gF.checked?fu:fP};
}},"toolbar-menubutton":{alias:fU,include:fU,style:function(cM){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:fG,include:fG,style:function(gC){return {source:gl};
}},"toolbar-splitbutton":{},"toolbar-splitbutton/button":fU,"toolbar-splitbutton/arrow":{alias:fU,include:fU,style:function(bK){return {icon:eD};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:fP,include:fP,style:function(bi){return {icon:bi.vertical?eD:cT};
}},"slidebar/button-backward":{alias:fP,include:fP,style:function(Y){return {icon:Y.vertical?gn:dB};
}},"tabview":{},"tabview/bar":{alias:eh,style:function(bw){var bx=0,bA=0,by=0,bz=0;

if(bw.barTop){by=-2;
}else if(bw.barBottom){bx=-2;
}else if(bw.barRight){bz=-2;
}else{bA=-2;
}return {marginBottom:by,marginTop:bx,marginLeft:bz,marginRight:bA};
}},"tabview/bar/button-forward":{include:gq,alias:gq,style:function(X){if(X.barTop||X.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:dV,alias:dV,style:function(cv){if(cv.barTop||cv.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/pane":{style:function(cI){return {backgroundColor:fN,decorator:fK,padding:10};
}},"tabview-page":fO,"tabview-page/button":{style:function(s){var B;
var z=0,x=0,u=0,w=0;

if(s.barTop||s.barBottom){var v=2,t=2,y=6,A=6;
}else{var v=6,t=6,y=6,A=6;
}
if(s.barTop){B=fe;
}else if(s.barRight){B=fh;
}else if(s.barBottom){B=ff;
}else{B=ed;
}
if(s.checked){if(s.barTop||s.barBottom){y+=2;
A+=2;
}else{v+=2;
t+=2;
}}else{if(s.barTop||s.barBottom){u+=2;
z+=2;
}else if(s.barLeft||s.barRight){x+=2;
w+=2;
}}
if(s.checked){if(!s.firstTab){if(s.barTop||s.barBottom){w=-4;
}else{z=-4;
}}
if(!s.lastTab){if(s.barTop||s.barBottom){x=-4;
}else{u=-4;
}}}return {zIndex:s.checked?10:5,decorator:B,backgroundColor:fN,padding:[v,A,t,y],margin:[z,x,u,w]};
}},"tabview-page/button/label":{alias:fQ,style:function(cl){return {padding:[0,1,0,1],margin:cl.focused?0:1,decorator:cl.focused?dA:undefined};
}},"tabview-page/button/icon":fG,"tabview-page/button/close-button":{alias:fM,style:function(cx){return {icon:ep};
}},"scrollbar":{},"scrollbar/slider":{alias:cV,style:function(m){return {backgroundColor:fu};
}},"scrollbar/slider/knob":{include:fV,style:function(bE){return {height:14,width:14,minHeight:bE.horizontal?undefined:9,minWidth:bE.horizontal?9:undefined};
}},"scrollbar/button":{alias:fP,include:fP,style:function(cB){var cC;

if(cB.up||cB.down){if(cB.pressed||cB.abandoned||cB.checked){cC=[5,2,3,4];
}else{cC=[4,3];
}}else{if(cB.pressed||cB.abandoned||cB.checked){cC=[4,3,2,5];
}else{cC=[3,4];
}}var cD=fk;

if(cB.left){cD+=fB;
}else if(cB.right){cD+=eL;
}else if(cB.up){cD+=fj;
}else{cD+=gg;
}return {padding:cC,icon:cD};
}},"scrollbar/button-begin":dh,"scrollbar/button-end":dh,"slider":{style:function(gQ){var gR;

if(gQ.disabled){gR=fY;
}else if(gQ.invalid){gR=fR;
}else if(gQ.focused){gR=fu;
}else{gR=de;
}return {backgroundColor:gR,decorator:gQ.focused?eH:fH};
}},"slider/knob":{include:fV,style:function(gK){return {width:14,height:14,decorator:fK};
}},"tree-folder/open":{style:function(gO){return {source:gO.opened?ea:dT};
}},"tree-folder":{style:function(bl){return {padding:[2,3,2,0],icon:bl.opened?dE:gs};
}},"tree-folder/icon":{style:function(gX){return {padding:[0,4,0,0]};
}},"tree-folder/label":{style:function(a){return {padding:[1,2],backgroundColor:a.selected?eB:undefined,textColor:a.selected?fI:undefined};
}},"tree-file":{include:gr,alias:gr,style:function(gy){return {icon:gp};
}},"tree":{include:eA,alias:eA,style:function(q){return {contentPadding:[4,4,4,4]};
}},"treevirtual":{style:function(bB){return {decorator:fn};
}},"treevirtual-folder":{style:function(bO){return {icon:(bO.opened?dE:gs)};
}},"treevirtual-file":{include:ec,alias:ec,style:function(k){return {icon:gp};
}},"treevirtual-line":{style:function(gx){return {icon:dP};
}},"treevirtual-contract":{style:function(bF){return {icon:ea};
}},"treevirtual-expand":{style:function(gS){return {icon:dT};
}},"treevirtual-only-contract":{style:function(bt){return {icon:cR};
}},"treevirtual-only-expand":{style:function(cs){return {icon:dm};
}},"treevirtual-start-contract":{style:function(gJ){return {icon:gj};
}},"treevirtual-start-expand":{style:function(C){return {icon:dz};
}},"treevirtual-end-contract":{style:function(bQ){return {icon:gc};
}},"treevirtual-end-expand":{style:function(cH){return {icon:gi};
}},"treevirtual-cross-contract":{style:function(bj){return {icon:dy};
}},"treevirtual-cross-expand":{style:function(gN){return {icon:eo};
}},"treevirtual-end":{style:function(c){return {icon:gb};
}},"treevirtual-cross":{style:function(gT){return {icon:dF};
}},"window":{style:function(ch){return {contentPadding:[10,10,10,10],backgroundColor:fN,decorator:ch.maximized?undefined:fK,shadow:ch.maximized?undefined:fo};
}},"window/pane":{},"window/captionbar":{style:function(bD){return {padding:1,backgroundColor:bD.active?ew:cY,textColor:bD.active?ev:eW};
}},"window/icon":{style:function(cj){return {marginRight:4};
}},"window/title":{style:function(gP){return {cursor:dc,font:ga,marginRight:20,alignY:eE};
}},"window/minimize-button":{include:fP,alias:fP,style:function(bf){return {icon:gd,padding:bf.pressed||bf.abandoned?[2,1,0,3]:[1,2]};
}},"window/restore-button":{include:fP,alias:fP,style:function(cJ){return {icon:eS,padding:cJ.pressed||cJ.abandoned?[2,1,0,3]:[1,2]};
}},"window/maximize-button":{include:fP,alias:fP,style:function(bv){return {icon:cP,padding:bv.pressed||bv.abandoned?[2,1,0,3]:[1,2]};
}},"window/close-button":{include:fP,alias:fP,style:function(cL){return {marginLeft:2,icon:ey,padding:cL.pressed||cL.abandoned?[2,1,0,3]:[1,2]};
}},"window/statusbar":{style:function(ba){return {decorator:fL,padding:[2,6]};
}},"window/statusbar-text":fQ,"resizer":{style:function(W){return {decorator:fK};
}},"splitpane":{},"splitpane/splitter":{style:function(bC){return {backgroundColor:fN};
}},"splitpane/splitter/knob":{style:function(cu){return {source:cu.horizontal?fa:dr,padding:2};
}},"splitpane/slider":{style:function(cf){return {backgroundColor:gh,opacity:0.3};
}},"selectbox":{include:fV,style:function(bS){var bT=fP;

if(bS.invalid&&!bS.disabled){bT=fR;
}else if(bS.abandoned){bT=fv;
}else if(!bS.abandoned&&bS.hovered){bT=fW;
}else if(!bS.abandoned&&!bS.hovered&&bS.checked){bT=gt;
}return {backgroundColor:bT};
}},"selectbox/atom":fM,"selectbox/popup":fS,"selectbox/list":eA,"selectbox/arrow":{include:fG,style:function(g){return {source:eD,paddingRight:4,paddingLeft:5};
}},"datechooser":{style:function(bY){return {decorator:fK};
}},"datechooser/navigation-bar":{style:function(bg){return {backgroundColor:fm,textColor:bg.disabled?fJ:bg.invalid?fr:undefined,padding:[2,10]};
}},"datechooser/last-year-button-tooltip":eG,"datechooser/last-month-button-tooltip":eG,"datechooser/next-year-button-tooltip":eG,"datechooser/next-month-button-tooltip":eG,"datechooser/last-year-button":fs,"datechooser/last-month-button":fs,"datechooser/next-year-button":fs,"datechooser/next-month-button":fs,"datechooser/button/icon":{},"datechooser/button":{style:function(bL){var bM={width:17,show:eQ};

if(bL.lastYear){bM.icon=dL;
}else if(bL.lastMonth){bM.icon=dB;
}else if(bL.nextYear){bM.icon=dp;
}else if(bL.nextMonth){bM.icon=go;
}
if(bL.pressed||bL.checked||bL.abandoned){bM.decorator=fL;
}else if(bL.hovered){bM.decorator=df;
}else{bM.decorator=undefined;
}
if(bL.pressed||bL.checked||bL.abandoned){bM.padding=[2,0,0,2];
}else if(bL.hovered){bM.padding=1;
}else{bM.padding=2;
}return bM;
}},"datechooser/month-year-label":{style:function(gB){return {font:ga,textAlign:ft};
}},"datechooser/date-pane":{style:function(hd){return {decorator:dQ,backgroundColor:fm};
}},"datechooser/weekday":{style:function(cb){return {decorator:es,font:ga,textAlign:ft,textColor:cb.disabled?fJ:cb.weekend?da:fm,backgroundColor:cb.weekend?fm:da};
}},"datechooser/day":{style:function(j){return {textAlign:ft,decorator:j.today?fn:undefined,textColor:j.disabled?fJ:j.selected?fI:j.otherMonth?fJ:undefined,backgroundColor:j.disabled?undefined:j.selected?dO:undefined,padding:[2,4]};
}},"datechooser/week":{style:function(o){return {textAlign:ft,textColor:da,padding:[2,4],decorator:o.header?cQ:eq};
}},"combobox":{style:function(N){var O;

if(N.disabled){O=fY;
}else if(N.invalid){O=fR;
}else if(N.focused){O=fu;
}else{O=de;
}return {decorator:N.focused?eH:fH,textColor:N.disabled?fJ:undefined,backgroundColor:O};
}},"combobox/button":{alias:fP,include:fP,style:function(p){return {icon:eD,backgroundColor:p.hovered?fW:fP};
}},"combobox/popup":fS,"combobox/list":eA,"combobox/textfield":{include:fT,style:function(bX){return {decorator:undefined,padding:[2,3],backgroundColor:undefined};
}},"menu":{style:function(cm){var cn={backgroundColor:fN,shadow:fo,decorator:fK,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,padding:1,placementModeY:cm.submenu||cm.contextmenu?fi:fg};

if(cm.submenu){cn.position=gu;
cn.offset=[-2,-3];
}
if(cm.contextmenu){cn.offset=4;
}return cn;
}},"menu/slidebar":dR,"menu-slidebar":fO,"menu-slidebar-button":{style:function(cc){return {backgroundColor:cc.hovered?eB:undefined,padding:6,center:true};
}},"menu-slidebar/button-backward":{include:dg,style:function(h){return {icon:h.hovered?fA:gn};
}},"menu-slidebar/button-forward":{include:dg,style:function(cK){return {icon:cK.hovered?dk:eD};
}},"menu-separator":{style:function(cN){return {height:0,decorator:dl,marginTop:4,marginBottom:4,marginLeft:2,marginRight:2};
}},"menu-button":{alias:fM,style:function(gL){return {backgroundColor:gL.selected?eB:undefined,textColor:gL.selected?fI:undefined,padding:[2,6]};
}},"menu-button/icon":{include:fG,style:function(gz){return {alignY:eE};
}},"menu-button/label":{include:fQ,style:function(i){return {alignY:eE,padding:1};
}},"menu-button/shortcut":{include:fQ,style:function(cp){return {alignY:eE,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:fG,style:function(gY){return {source:gY.selected?fF:go,alignY:eE};
}},"menu-checkbox":{alias:eF,include:eF,style:function(cw){return {icon:!cw.checked?undefined:cw.selected?eR:em};
}},"menu-radiobutton":{alias:eF,include:eF,style:function(Q){return {icon:!Q.checked?undefined:Q.selected?cX:fd};
}},"menubar":{style:function(ct){return {backgroundColor:fN,decorator:fK};
}},"menubar-button":{alias:fM,style:function(cO){return {padding:[2,6],backgroundColor:cO.pressed||cO.hovered?eB:undefined,textColor:cO.pressed||cO.hovered?fI:undefined};
}},"colorselector":fO,"colorselector/control-bar":fO,"colorselector/visual-pane":eJ,"colorselector/control-pane":fO,"colorselector/preset-grid":fO,"colorselector/colorbucket":{style:function(cG){return {decorator:fL,width:16,height:16};
}},"colorselector/preset-field-set":eJ,"colorselector/input-field-set":eJ,"colorselector/preview-field-set":eJ,"colorselector/hex-field-composite":fO,"colorselector/hex-field":fT,"colorselector/rgb-spinner-composite":fO,"colorselector/rgb-spinner-red":eC,"colorselector/rgb-spinner-green":eC,"colorselector/rgb-spinner-blue":eC,"colorselector/hsb-spinner-composite":fO,"colorselector/hsb-spinner-hue":eC,"colorselector/hsb-spinner-saturation":eC,"colorselector/hsb-spinner-brightness":eC,"colorselector/preview-content-old":{style:function(ca){return {decorator:fL,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(bk){return {decorator:fL,backgroundColor:fp,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(gD){return {decorator:fL,margin:5};
}},"colorselector/brightness-field":{style:function(cd){return {decorator:fL,margin:[5,7]};
}},"colorselector/hue-saturation-pane":fO,"colorselector/hue-saturation-handle":fO,"colorselector/brightness-pane":fO,"colorselector/brightness-handle":fO,"table":fO,"table/statusbar":{style:function(ci){return {decorator:dt,paddingLeft:2,paddingRight:2};
}},"table/column-button":{alias:fP,style:function(cy){var cA,cz;

if(cy.pressed||cy.checked||cy.abandoned){cA=fL;
cz=[3,2,1,4];
}else if(cy.hovered){cA=df;
cz=[2,3];
}else{cA=undefined;
cz=[3,4];
}return {decorator:cA,padding:cz,backgroundColor:cy.abandoned?fv:fP,icon:cU};
}},"table-column-reset-button":{extend:eF,alias:eF,style:function(){return {icon:ez};
}},"table-scroller/scrollbar-x":fq,"table-scroller/scrollbar-y":fq,"table-scroller":fO,"table-scroller/header":{style:function(d){return {decorator:dK,backgroundColor:cS};
}},"table-scroller/pane":{style:function(cr){return {backgroundColor:dJ};
}},"table-scroller/focus-indicator":{style:function(e){return {decorator:ei};
}},"table-scroller/resize-line":{style:function(l){return {backgroundColor:et,width:3};
}},"table-header-cell":{alias:fM,style:function(cE){return {minWidth:13,paddingLeft:2,paddingRight:2,paddingBottom:cE.hovered?0:2,decorator:cE.hovered?gf:dj,backgroundColor:cE.hovered?eu:dj,sortIcon:cE.sorted?(cE.sortedAscending?eM:fl):undefined};
}},"table-header-cell/sort-icon":{style:function(br){return {alignY:eE};
}},"table-editor-textfield":{include:fT,style:function(be){return {decorator:undefined,padding:[2,2]};
}},"table-editor-selectbox":{include:eb,alias:eb,style:function(gU){return {padding:[0,2]};
}},"table-editor-combobox":{include:dd,alias:dd,style:function(r){return {decorator:undefined};
}},"colorpopup":{alias:fS,include:fS,style:function(bs){return {decorator:fK,padding:5,backgroundColor:fN};
}},"colorpopup/field":{style:function(gI){return {decorator:fL,margin:2,width:14,height:14,backgroundColor:fN};
}},"colorpopup/selector-button":fP,"colorpopup/auto-button":fP,"colorpopup/preview-pane":eJ,"colorpopup/current-preview":{style:function(bP){return {height:20,padding:4,marginLeft:4,decorator:fL,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(bh){return {height:20,padding:4,marginRight:4,decorator:fL,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:fP,include:fP,style:function(n){return {icon:dv};
}},"colorpopup/colorselector-cancelbutton":{alias:fP,include:fP,style:function(f){return {icon:dG};
}},"virtual-list":eA,"virtual-list/row-layer":fc,"row-layer":fO,"column-layer":fO,"cell":{style:function(cg){return {backgroundColor:cg.selected?eV:dD,textColor:cg.selected?fI:gm,padding:[3,6]};
}},"cell-string":eI,"cell-number":{include:eI,style:function(bN){return {textAlign:dM};
}},"cell-image":eI,"cell-boolean":eI,"cell-atom":eI,"cell-date":eI,"cell-html":eI,"htmlarea":{"include":fO,style:function(bu){return {backgroundColor:fp};
}}}});
})();
(function(){var c="Oxygen",b="qx.theme.icon.Oxygen",a="qx/icon/Oxygen";
qx.Theme.define(b,{title:c,aliases:{"icon":a},icons:{}});
})();
(function(){var b="Classic Windows",a="qx.theme.Classic";
qx.Theme.define(a,{title:b,meta:{color:qx.theme.classic.Color,decoration:qx.theme.classic.Decoration,font:qx.theme.classic.Font,appearance:qx.theme.classic.Appearance,icon:qx.theme.icon.Oxygen}});
})();
(function(){var G='px;',F="",E="Boolean",D='',C='px',B='</div>',A='<div style="position:absolute;',z=";",y='left:',x='">',bt='</span>',bs='background-image:url(',br="treevirtual-start-contract",bq='">&nbsp;</div>',bp="treevirtual-file",bo="qx.ui.treevirtual.SimpleTreeDataCellRenderer",bn="qx.client",bm="treevirtual-only-expand",bl='style="',bk='top:0;',N='background-repeat:no-repeat;',O='>',L='right:',M='<div style="',J='" title="',K="treevirtual-end",H="treevirtual-cross",I=');',P='<span',Q="treevirtual-end-contract",X=';width:',V=';"',bc="treevirtual-end-expand",ba="treevirtual-only-contract",bg="treevirtual-contract",be='top:',S="content-box",bj='bottom:',bi="treevirtual-start-expand",bh="mshtml",R="treevirtual-cross-contract",T="treevirtual-folder",U='width:',W="treevirtual-expand",Y="treevirtual-cross-expand",bb="treevirtual-line",bd=';height:',bf='height:';
qx.Class.define(bo,{extend:qx.ui.table.cellrenderer.Abstract,construct:function(){var bR=qx.ui.treevirtual.SimpleTreeDataCellRenderer;
if(bR.__qc){bR.__qh();
bR.__qc=false;
}qx.ui.table.cellrenderer.Abstract.call(this);
this.__qd=qx.util.AliasManager.getInstance();
this.__qe=qx.util.ResourceManager.getInstance();
this.__qf=qx.theme.manager.Appearance.getInstance();
this.BLANK=this.__qe.toUri(this.__qd.resolve("static/blank.gif"));
},statics:{__qg:{},__qc:true,__qh:function(){qx.theme.manager.Meta.getInstance().initialize();
var bu=qx.ui.treevirtual.SimpleTreeDataCellRenderer;
var bx=qx.io.ImageLoader;
var bv=qx.util.AliasManager.getInstance();
var by=qx.util.ResourceManager.getInstance();
var bw=qx.theme.manager.Appearance.getInstance();
var bz=function(f){bx.load(by.toUri(bv.resolve(f)));
};
bu.__qg.line=bw.styleFrom(bb);
bz(bu.__qg.line.icon);
bu.__qg.contract=bw.styleFrom(bg);
bz(bu.__qg.contract.icon);
bu.__qg.expand=bw.styleFrom(W);
bz(bu.__qg.expand.icon);
bu.__qg.onlyContract=bw.styleFrom(ba);
bz(bu.__qg.onlyContract.icon);
bu.__qg.onlyExpand=bw.styleFrom(bm);
bz(bu.__qg.onlyExpand.icon);
bu.__qg.startContract=bw.styleFrom(br);
bz(bu.__qg.startContract.icon);
bu.__qg.startExpand=bw.styleFrom(bi);
bz(bu.__qg.startExpand.icon);
bu.__qg.endContract=bw.styleFrom(Q);
bz(bu.__qg.endContract.icon);
bu.__qg.endExpand=bw.styleFrom(bc);
bz(bu.__qg.endExpand.icon);
bu.__qg.crossContract=bw.styleFrom(R);
bz(bu.__qg.crossContract.icon);
bu.__qg.crossExpand=bw.styleFrom(Y);
bz(bu.__qg.crossExpand.icon);
bu.__qg.end=bw.styleFrom(K);
bz(bu.__qg.end.icon);
bu.__qg.cross=bw.styleFrom(H);
bz(bu.__qg.cross.icon);
}},properties:{useTreeLines:{check:E,init:true},excludeFirstLevelTreeLines:{check:E,init:false},alwaysShowOpenCloseSymbol:{check:E,init:false}},members:{__qd:null,__qf:null,__qe:null,_getCellStyle:function(bG){var bH=bG.value;
var bI=qx.ui.table.cellrenderer.Abstract.prototype._getCellStyle.call(this,bG)+(bH.cellStyle?bH.cellStyle+z:F);
return bI;
},_getContentHtml:function(bS){var bU=F;
var bV=0;
var bX=this._addExtraContentBeforeIndentation(bS,bV);
bU+=bX.html;
bV=bX.pos;
var bW=this._addIndentation(bS,bV);
bU+=bW.html;
bV=bW.pos;
bX=this._addExtraContentBeforeIcon(bS,bV);
bU+=bX.html;
bV=bX.pos;
var bT=this._addIcon(bS,bV);
bU+=bT.html;
bV=bT.pos;
bX=this._addExtraContentBeforeLabel(bS,bV);
bU+=bX.html;
bV=bX.pos;
bU+=this._addLabel(bS,bV);
return bU;
},_addImage:function(h){var k=[];
var j=this.__qe.toUri(this.__qd.resolve(h.url));
if(h.position){var l=h.position;
k.push(A);

if(!qx.core.Variant.isSet(bn,bh)){k.push(qx.bom.element.BoxSizing.compile(S));
}
if(l.top!==undefined){k.push(be+l.top+G);
}
if(l.right!==undefined){k.push(L+l.right+G);
}
if(l.bottom!==undefined){k.push(bj+l.bottom+G);
}
if(l.left!==undefined){k.push(y+l.left+G);
}
if(l.width!==undefined){k.push(U+l.width+G);
}
if(l.height!==undefined){k.push(bf+l.height+G);
}k.push(x);
}k.push(M);
k.push(bs+j+I);
k.push(N);

if(h.imageWidth&&h.imageHeight){k.push(X+h.imageWidth+C+bd+h.imageHeight+C);
}var m=h.tooltip;

if(m!=null){k.push(J+m);
}k.push(bq);

if(h.position){k.push(B);
}return k.join(F);
},_addIndentation:function(bJ,bK){var bL=bJ.value;
var bM;
var bN=F;
var bQ=this.getUseTreeLines();
var bO=this.getExcludeFirstLevelTreeLines();
var bP=this.getAlwaysShowOpenCloseSymbol();

for(var i=0;i<bL.level;i++){bM=this._getIndentSymbol(i,bL,bQ,bP,bO);
bN+=this._addImage({url:bM.icon,position:{top:0+(bM.paddingTop||0),left:bK+(bM.paddingLeft||0),width:19,height:16}});
bK+=19;
}return ({html:bN,pos:bK});
},_addIcon:function(bA,bB){var bC=bA.value;
var bE=(bC.bSelected?bC.iconSelected:bC.icon);

if(!bE){if(bC.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){var o=this.__qf.styleFrom(bp);
}else{var bD={opened:bC.bOpened};
var o=this.__qf.styleFrom(T,bD);
}bE=o.icon;
}var bF=this._addImage({url:bE,position:{top:0,left:bB,width:19,height:16}});
return ({html:bF,pos:bB+19});
},_addLabel:function(a,b){var c=a.value;
var d=A+y+b+G+bk+(c.labelStyle?c.labelStyle+z:F)+x+P+(a.labelSpanStyle?bl+a.labelSpanStyle+V:F)+O+c.label+bt+B;
return d;
},_addExtraContentBeforeIndentation:function(n,p){return {html:D,pos:p};
},_addExtraContentBeforeIcon:function(bY,ca){return {html:D,pos:ca};
},_addExtraContentBeforeLabel:function(e,g){return {html:D,pos:g};
},_getIndentSymbol:function(q,r,s,t,u){var v=qx.ui.treevirtual.SimpleTreeDataCellRenderer;
if(q==0&&u){s=false;
}if(q<r.level-1){return (s&&!r.lastChild[q]?v.__qg.line:{icon:this.BLANK});
}var w=r.lastChild[r.lastChild.length-1];
if(r.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH&&!r.bHideOpenClose){if(r.children.length>0||t){if(!s){return (r.bOpened?v.__qg.contract:v.__qg.expand);
}if(q==0&&r.bFirstChild){if(w){return (r.bOpened?v.__qg.onlyContract:v.__qg.onlyExpand);
}else{return (r.bOpened?v.__qg.startContract:v.__qg.startExpand);
}}if(w){return (r.bOpened?v.__qg.endContract:v.__qg.endExpand);
}return (r.bOpened?v.__qg.crossContract:v.__qg.crossExpand);
}}if(s){if(r.parentNodeId==0){if(w&&r.bFirstChild){return {icon:this.BLANK};
}if(w){return v.__qg.end;
}if(r.bFirstChild){return (r.bOpened?v.__qg.startContract:v.__qg.startExpand);
}}return (w?v.__qg.end:v.__qg.cross);
}return {icon:this.BLANK};
}},destruct:function(){this.__qd=this.__qe=this.__qf=null;
}});
})();
(function(){var l="_applyStyle",k="stretch",j="Integer",i="px",h=" ",g="repeat",f="round",e="shorthand",d="px ",c="sliceBottom",A=";'></div>",z="<div style='",y="sliceLeft",x="sliceRight",w="repeatX",v="String",u="qx.ui.decoration.css3.BorderImage",t="border-box",s="",r='") ',p="sliceTop",q='url("',n="hidden",o="repeatY",m="absolute";
qx.Class.define(u,{extend:qx.ui.decoration.Abstract,construct:function(a,b){qx.ui.decoration.Abstract.call(this);
if(a!=null){this.setBorderImage(a);
}
if(b!=null){this.setSlice(b);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:v,nullable:true,apply:l},sliceTop:{check:j,init:0,apply:l},sliceRight:{check:j,init:0,apply:l},sliceBottom:{check:j,init:0,apply:l},sliceLeft:{check:j,init:0,apply:l},slice:{group:[p,x,c,y],mode:e},repeatX:{check:[k,g,f],init:k,apply:l},repeatY:{check:[k,g,f],init:k,apply:l},repeat:{group:[w,o],mode:e}},members:{__kq:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__kq;
},getMarkup:function(){if(this.__kq){return this.__kq;
}var B=this._resolveImageUrl(this.getBorderImage());
var C=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var D=[this.getRepeatX(),this.getRepeatY()].join(h);
this.__kq=[z,qx.bom.element.Style.compile({"borderImage":q+B+r+C.join(h)+h+D,position:m,lineHeight:0,fontSize:0,overflow:n,boxSizing:t,borderWidth:C.join(d)+i}),A].join(s);
return this.__kq;
},resize:function(E,F,G){E.style.width=F+i;
E.style.height=G+i;
},tint:function(I,J){},_applyStyle:function(){{};
},_resolveImageUrl:function(H){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(H));
}},destruct:function(){this.__kq=null;
}});
})();
(function(){var w="px",v="0px",u="-1px",t="no-repeat",s="scale-x",r="scale-y",q="-tr",p="-l",o='</div>',n="scale",K="qx.client",J="-br",I="-t",H="-tl",G="-r",F='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',E="_applyBaseImage",D="-b",C="String",B="",z="-bl",A="qx.ui.decoration.GridDiv",x="-c",y="mshtml";
qx.Class.define(A,{extend:qx.ui.decoration.Abstract,construct:function(L,M){qx.ui.decoration.Abstract.call(this);
if(L!=null){this.setBaseImage(L);
}
if(M!=null){this.setInsets(M);
}},properties:{baseImage:{check:C,nullable:true,apply:E}},members:{__kr:null,__ks:null,__kt:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__kr;
},getMarkup:function(){if(this.__kr){return this.__kr;
}var j=qx.bom.element.Decoration;
var k=this.__ks;
var l=this.__kt;
var m=[];
m.push(F);
m.push(j.create(k.tl,t,{top:0,left:0}));
m.push(j.create(k.t,s,{top:0,left:l.left+w}));
m.push(j.create(k.tr,t,{top:0,right:0}));
m.push(j.create(k.bl,t,{bottom:0,left:0}));
m.push(j.create(k.b,s,{bottom:0,left:l.left+w}));
m.push(j.create(k.br,t,{bottom:0,right:0}));
m.push(j.create(k.l,r,{top:l.top+w,left:0}));
m.push(j.create(k.c,n,{top:l.top+w,left:l.left+w}));
m.push(j.create(k.r,r,{top:l.top+w,right:0}));
m.push(o);
return this.__kr=m.join(B);
},resize:function(Q,R,S){var T=this.__kt;
var innerWidth=R-T.left-T.right;
var innerHeight=S-T.top-T.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}Q.style.width=R+w;
Q.style.height=S+w;
Q.childNodes[1].style.width=innerWidth+w;
Q.childNodes[4].style.width=innerWidth+w;
Q.childNodes[7].style.width=innerWidth+w;
Q.childNodes[6].style.height=innerHeight+w;
Q.childNodes[7].style.height=innerHeight+w;
Q.childNodes[8].style.height=innerHeight+w;

if(qx.core.Variant.isSet(K,y)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(R%2==1){Q.childNodes[2].style.marginRight=u;
Q.childNodes[5].style.marginRight=u;
Q.childNodes[8].style.marginRight=u;
}else{Q.childNodes[2].style.marginRight=v;
Q.childNodes[5].style.marginRight=v;
Q.childNodes[8].style.marginRight=v;
}
if(S%2==1){Q.childNodes[3].style.marginBottom=u;
Q.childNodes[4].style.marginBottom=u;
Q.childNodes[5].style.marginBottom=u;
}else{Q.childNodes[3].style.marginBottom=v;
Q.childNodes[4].style.marginBottom=v;
Q.childNodes[5].style.marginBottom=v;
}}}},tint:function(h,i){},_applyBaseImage:function(a,b){{};

if(a){var f=this._resolveImageUrl(a);
var g=/(.*)(\.[a-z]+)$/.exec(f);
var e=g[1];
var d=g[2];
var c=this.__ks={tl:e+H+d,t:e+I+d,tr:e+q+d,bl:e+z+d,b:e+D+d,br:e+J+d,l:e+p+d,c:e+x+d,r:e+G+d};
this.__kt=this._computeEdgeSizes(c);
}},_resolveImageUrl:function(N){return qx.util.AliasManager.getInstance().resolve(N);
},_computeEdgeSizes:function(O){var P=qx.util.ResourceManager.getInstance();
return {top:P.getImageHeight(O.t),bottom:P.getImageHeight(O.b),left:P.getImageWidth(O.l),right:P.getImageWidth(O.r)};
}},destruct:function(){this.__kr=this.__ks=this.__kt=null;
}});
})();
(function(){var a="qx.ui.treevirtual.DefaultDataCellRenderer";
qx.Class.define(a,{extend:qx.ui.table.cellrenderer.Default,construct:function(){qx.ui.table.cellrenderer.Default.call(this);
},members:{_getCellStyle:function(b){var c=qx.ui.table.cellrenderer.Default.prototype._getCellStyle.call(this,b)+qx.ui.treevirtual.SimpleTreeDataCellRenderer.MAIN_DIV_STYLE;
return c;
}}});
})();
(function(){var a="qx.ui.treevirtual.SimpleTreeDataRowRenderer";
qx.Class.define(a,{extend:qx.ui.table.rowrenderer.Default,construct:function(){qx.ui.table.rowrenderer.Default.call(this);
},members:{updateDataRowElement:function(b,c){var f=b.table;
var h=b.rowData;
var g=f.getTableModel();
var e=g.getTreeColumn();
var d=h[e];
b.selected=d.bSelected;

if(d.bSelected){var i=b.row;
f.getSelectionModel()._addSelectionInterval(i,i);
}qx.ui.table.rowrenderer.Default.prototype.updateDataRowElement.call(this,b,c);
}}});
})();
(function(){var m="qx.ui.treevirtual.SelectionManager",l="Space",k="Enter";
qx.Class.define(m,{extend:qx.ui.table.selection.Manager,construct:function(C){qx.ui.table.selection.Manager.call(this);
this.__qi=C;
},members:{__qi:null,getTable:function(){return this.__qi;
},_handleSelectEvent:function(a,b){var e=this;
function c(n,o,p){var A=n.getDataModel();
var u=A.getTreeColumn();
var s=n.getFocusedColumn();
if(s!=u){return false;
}if(p instanceof qx.event.type.Mouse){if(!n.getFocusCellOnMouseMove()){var t=n._getPaneScrollerArr();

for(var i=0;i<t.length;i++){t[i]._focusCellAtPagePos(p.getViewportLeft(),p.getViewportTop());
}}}var q=A.getNode(n.getFocusedRow());

if(!q){return false;
}if(p instanceof qx.event.type.Mouse){var v=n.getTableColumnModel();
var y=v._getColToXPosMap();
var B=qx.bom.element.Location.getLeft(n.getContentElement().getDomElement());

for(var i=0;i<y[u].visX;i++){B+=v.getColumnWidth(y[i].visX);
}var x=p.getViewportLeft();
var w=2;
var r=B+(q.level-1)*19+2;

if(x>=r-w&&x<=r+19+w){A.setState(q,{bOpened:!q.bOpened});
return n.getOpenCloseClickSelectsRow()?false:true;
}else{return e._handleExtendedClick(n,p,q,B);
}}else{var z=p.getKeyIdentifier();

switch(z){case l:return false;
case k:if(!q.bHideOpenClose){A.setState(q,{bOpened:!q.bOpened});
}return n.getOpenCloseClickSelectsRow()?false:true;
default:return true;
}}}var d=c(this.__qi,a,b);
if(!d){qx.ui.table.selection.Manager.prototype._handleSelectEvent.call(this,a,b);
}},_handleExtendedClick:function(f,g,h,j){return false;
}},destruct:function(){this.__qi=null;
}});
})();
(function(){var n="appear",m="columnVisibilityMenuCreateEnd",l="tableWidthChanged",k="verticalScrollBarChanged",j="qx.ui.table.columnmodel.resizebehavior.Abstract",i="qx.ui.table.columnmodel.Resize",h="_applyBehavior",g="separator",f="visibilityChanged",e="Reset column widths",b="changeBehavior",d="user-button",c="widthChanged",a="execute";
qx.Class.define(i,{extend:qx.ui.table.columnmodel.Basic,include:qx.locale.MTranslation,construct:function(){qx.ui.table.columnmodel.Basic.call(this);
this.__qj=false;
this.__qk=false;
},properties:{behavior:{check:j,init:null,nullable:true,apply:h,event:b}},members:{__qk:null,__qj:null,__ql:null,_applyBehavior:function(p,q){if(q!=null){q.dispose();
q=null;
}p._setNumColumns(this.getOverallColumnCount());
p.setTableColumnModel(this);
},init:function(u,v){qx.ui.table.columnmodel.Basic.prototype.init.call(this,u);

if(this.__ql==null){this.__ql=v;
v.addListener(n,this._onappear,this);
v.addListener(l,this._onTableWidthChanged,this);
v.addListener(k,this._onverticalscrollbarchanged,this);
v.addListener(m,this._addResetColumnWidthButton,this);
this.addListener(c,this._oncolumnwidthchanged,this);
this.addListener(f,this._onvisibilitychanged,this);
}if(this.getBehavior()==null){this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
}this.getBehavior()._setNumColumns(u);
},getTable:function(){return this.__ql;
},_addResetColumnWidthButton:function(event){var t=event.getData();
var s=t.columnButton;
var r=t.menu;
var o;
o=s.factory(g);
r.add(o);
o=s.factory(d,{text:this.tr(e)});
r.add(o);
o.addListener(a,this._onappear,this);
},_onappear:function(event){if(this.__qj){return ;
}this.__qj=true;
{};
this.getBehavior().onAppear(event,event.getType()!==n);
this.__ql._updateScrollerWidths();
this.__ql._updateScrollBarVisibility();
this.__qj=false;
this.__qk=true;
},_onTableWidthChanged:function(event){if(this.__qj||!this.__qk){return ;
}this.__qj=true;
{};
this.getBehavior().onTableWidthChanged(event);
this.__qj=false;
},_onverticalscrollbarchanged:function(event){if(this.__qj||!this.__qk){return ;
}this.__qj=true;
{};
this.getBehavior().onVerticalScrollBarChanged(event);
qx.event.Timer.once(function(){if(this.__ql&&!this.__ql.isDisposed()){this.__ql._updateScrollerWidths();
this.__ql._updateScrollBarVisibility();
}},this,0);
this.__qj=false;
},_oncolumnwidthchanged:function(event){if(this.__qj||!this.__qk){return ;
}this.__qj=true;
{};
this.getBehavior().onColumnWidthChanged(event);
this.__qj=false;
},_onvisibilitychanged:function(event){if(this.__qj||!this.__qk){return ;
}this.__qj=true;
{};
this.getBehavior().onVisibilityChanged(event);
this.__qj=false;
}},destruct:function(){this.__ql=null;
}});
})();
(function(){var h="auto",g="string",f="number",e="*",d="qx.ui.core.ColumnData";
qx.Class.define(d,{extend:qx.ui.core.LayoutItem,construct:function(){qx.ui.core.LayoutItem.call(this);
this.setColumnWidth(h);
},members:{__qm:null,renderLayout:function(a,top,b,c){this.__qm=b;
},getComputedWidth:function(){return this.__qm;
},getFlex:function(){return this.getLayoutProperties().flex||0;
},setColumnWidth:function(i,j){var j=j||0;
var k=null;

if(typeof i==f){this.setWidth(i);
}else if(typeof i==g){if(i==h){j=1;
}else{var l=i.match(/^[0-9]+(?:\.[0-9]+)?([%\*])$/);

if(l){if(l[1]==e){j=parseFloat(i);
}else{k=i;
}}}}this.setLayoutProperties({flex:j,width:k});
}},settings:{"qx.tableResizeDebug":false}});
})();
(function(){var h="qx.ui.table.columnmodel.resizebehavior.Abstract",g="abstract";
qx.Class.define(h,{type:g,extend:qx.core.Object,members:{_setNumColumns:function(f){throw new Error("_setNumColumns is abstract");
},onAppear:function(event,i){throw new Error("onAppear is abstract");
},onTableWidthChanged:function(event){throw new Error("onTableWidthChanged is abstract");
},onVerticalScrollBarChanged:function(event){throw new Error("onVerticalScrollBarChanged is abstract");
},onColumnWidthChanged:function(event){throw new Error("onColumnWidthChanged is abstract");
},onVisibilityChanged:function(event){throw new Error("onVisibilityChanged is abstract");
},_getAvailableWidth:function(){var b=this.getTableColumnModel();
var e=b.getTable();
var a=e._getPaneScrollerArr();

if(!a[0]||!a[0].getLayoutParent().getBounds()){return null;
}var d=a[0].getLayoutParent().getBounds().width;
var c=a[a.length-1];
d-=c.getPaneInsetRight();
return d;
}}});
})();
(function(){var v="__qp",u="Function",t="Boolean",s="minWidth",r="width",q="__qo",p="qx.ui.table.columnmodel.Resize",o="qx.ui.table.columnmodel.resizebehavior.Default",n="maxWidth";
qx.Class.define(o,{extend:qx.ui.table.columnmodel.resizebehavior.Abstract,construct:function(){qx.ui.table.columnmodel.resizebehavior.Abstract.call(this);
this.__qn=[];
this.__qo=new qx.ui.layout.HBox();
this.__qo.connectToWidget(this);
this.__qp=new qx.util.DeferredCall(this._computeColumnsFlexWidth,this);
},properties:{newResizeBehaviorColumnData:{check:u,init:function(X){return new qx.ui.core.ColumnData();
}},initializeWidthsOnEveryAppear:{check:t,init:false},tableColumnModel:{check:p}},members:{__qo:null,__qq:null,__qn:null,__qp:null,__qr:false,setWidth:function(a,b,c){if(a>=this.__qn.length){throw new Error("Column number out of range");
}this.__qn[a].setColumnWidth(b,c);
this.__qp.schedule();
},setMinWidth:function(B,C){if(B>=this.__qn.length){throw new Error("Column number out of range");
}this.__qn[B].setMinWidth(C);
this.__qp.schedule();
},setMaxWidth:function(E,F){if(E>=this.__qn.length){throw new Error("Column number out of range");
}this.__qn[E].setMaxWidth(F);
this.__qp.schedule();
},set:function(x,y){for(var z in y){switch(z){case r:this.setWidth(x,y[z]);
break;
case s:this.setMinWidth(x,y[z]);
break;
case n:this.setMaxWidth(x,y[z]);
break;
default:throw new Error("Unknown property: "+z);
}}},onAppear:function(event,D){if(D===true||!this.__qr||this.getInitializeWidthsOnEveryAppear()){this._computeColumnsFlexWidth();
this.__qr=true;
}},onTableWidthChanged:function(event){this._computeColumnsFlexWidth();
},onVerticalScrollBarChanged:function(event){this._computeColumnsFlexWidth();
},onColumnWidthChanged:function(event){this._extendNextColumn(event);
},onVisibilityChanged:function(event){var A=event.getData();
if(A.visible){this._computeColumnsFlexWidth();
return;
}this._extendLastColumn(event);
},_setNumColumns:function(V){var W=this.__qn;
if(V<=W.length){W.splice(V,W.length);
return;
}for(var i=W.length;i<V;i++){W[i]=this.getNewResizeBehaviorColumnData()();
W[i].columnNumber=i;
}},getLayoutChildren:function(){return this.__qq;
},_computeColumnsFlexWidth:function(){this.__qp.cancel();
var S=this._getAvailableWidth();

if(S===null){return;
}var O=this.getTableColumnModel();
var Q=O.getVisibleColumns();
var R=Q.length;
var P=this.__qn;
var i,l;

if(R===0){return;
}var U=[];

for(i=0;i<R;i++){U.push(P[Q[i]]);
}this.__qq=U;
this.__qs();
this.__qo.renderLayout(S,100);
for(i=0,l=U.length;i<l;i++){var T=U[i].getComputedWidth();
O.setColumnWidth(Q[i],T);
}},__qs:function(){this.__qo.invalidateChildrenCache();
var w=this.__qq;

for(var i=0,l=w.length;i<l;i++){w[i].invalidateLayoutCache();
}},_extendNextColumn:function(event){var h=this.getTableColumnModel();
var m=event.getData();
var f=h.getVisibleColumns();
var e=this._getAvailableWidth();
var d=f.length;
if(m.newWidth>m.oldWidth){return ;
}var i;
var g;
var k=0;

for(i=0;i<d;i++){k+=h.getColumnWidth(f[i]);
}if(k<e){for(i=0;i<f.length;i++){if(f[i]==m.col){g=f[i+1];
break;
}}
if(g){var j=(e-(k-h.getColumnWidth(g)));
h.setColumnWidth(g,j);
}}},_extendLastColumn:function(event){var J=this.getTableColumnModel();
var N=event.getData();
if(N.visible){return;
}var I=J.getVisibleColumns();
if(I.length==0){return;
}var H=this._getAvailableWidth(J);
var G=I.length;
var i;
var L;
var M=0;

for(i=0;i<G;i++){M+=J.getColumnWidth(I[i]);
}if(M<H){L=I[I.length-1];
var K=(H-(M-J.getColumnWidth(L)));
J.setColumnWidth(L,K);
}},_getResizeColumnData:function(){return this.__qn;
}},destruct:function(){this.__qn=this.__qq=null;
this._disposeObjects(q,v);
}});
})();
(function(){var g="",f="file_tree.selectionChanged",e="LEAF",d="recipientDelete",c="dropnode.RecipientDisplayController",b="delete",a='singleton';
qx.Class.define(c,{extend:dropnode.Controller,type:a,properties:{file_name:{init:g},name:{init:g},file_id:{init:g},progress:{init:-1},url:{init:g}},members:{_processMessage:function(){if(this.getMessage()==b){this._dispatch(d,{name:this.getName()});
}},error:function(i){this.getParent().error(i);
},_addReactors:function(){this._subscribe(f,this._selectionChanged,this);
},_selectionChanged:function(h){if(h.type==e){this.setName(h.name);
this.setFile_name(h.file_name);
this.setFile_id(h.file_id);
this.setProgress(h.progress);
this.setUrl(h.url);
}}}});
})();
(function(){var i="",h="delete",g="Url :",f="dropnode.RecipientDisplayUI",d="Delete",c="Progress :",b="execute",a="Name :";
qx.Class.define(f,{extend:qx.core.Object,properties:{file_name:{nullable:true},name:{init:i},file_id:{nullable:true},progress:{nullable:true},recipient_view_container:{nullable:true},url:{nullable:true},event_bus:{nullable:true},base_container:{nullable:true},message:{nullable:true}},members:{initialize:function(m){this.setEvent_bus(m);
},init_gui:function(){this.setBase_container(new qx.ui.container.Composite(new qx.ui.layout.VBox()));
this.getBase_container().setPadding(4,4,4,4);
this.setRecipient_view_container(new qx.ui.container.Composite(new qx.ui.layout.VBox(2)));
var k=new qx.ui.container.Composite(new qx.ui.layout.Grid());
k.setPaddingLeft(6);
k.setBackgroundColor(qx.util.ColorUtil.rgbToRgbString([255,255,234]));
var l=new qx.ui.container.Composite(new qx.ui.layout.HBox());
l.setPaddingLeft(6);
l.setBackgroundColor(qx.util.ColorUtil.rgbToRgbString([255,255,234]));
var j=new qx.ui.form.Button(d);
j.addListener(b,function(e){this.setMessage(i);
this.setMessage(h);
},this);
l.add(new qx.ui.basic.Label(this.getName()));
l.add(new qx.ui.core.Spacer,{flex:1});
l.add(j);
k.add(new qx.ui.basic.Label(a),{row:0,column:0});
k.add(new qx.ui.basic.Label(this.getFile_name()),{row:0,column:1});
k.add(new qx.ui.basic.Label(g),{row:1,column:0});
k.add(new qx.ui.basic.Label(this.getUrl()),{row:1,column:1});
k.add(new qx.ui.basic.Label(c),{row:2,column:0});
k.add(new qx.ui.basic.Label(this.getProgress()),{row:2,column:1});
this.getRecipient_view_container().add(l);
this.getRecipient_view_container().add(k);
this.getBase_container().add(this.getRecipient_view_container());
}}});
})();
(function(){var a="dropnode.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var a="dropnode.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var a="dropnode.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var a="dropnode.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="dropnode.theme.Theme";
qx.Theme.define(a,{meta:{color:dropnode.theme.Color,decoration:dropnode.theme.Decoration,font:dropnode.theme.Font,icon:qx.theme.icon.Tango,appearance:dropnode.theme.Appearance}});
})();


qx.$$loader.init();

