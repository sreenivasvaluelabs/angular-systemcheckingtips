export function RunSystemCheck() {
  var result = {};
  var succeededResult = [];
  var failedResult = [];


  /* Test #001 : Video Element */
  var videoCheck = false;
  var element = document.createElement('video');

  if (!!element.canPlayType === true)
    videoCheck = true;
  else
    videoCheck = false;

  /* Test #002 : /* h.264 codec */
  var vid = document.createElement('video');
  var vidType = 'video/mp4';
  var codType = 'avc1.42E01E, mp4a.40.2';
  if (vid.canPlayType) {
    var isSupp = vid.canPlayType(vidType + ';codecs="' + codType + '"');
    /*isSupp should be probably or maybe means the browser will support*/
    
    if (isSupp != '')
      videoCheck = true;
    else
      videoCheck = false;
  }
  /* Test #003 : Video Subtitles */
  var videoSubtitles = document.createElement('track');
  if ('track' in videoSubtitles)
    videoCheck = true;
  else
    videoCheck = false;

  if (videoCheck === true)
    succeededResult.push('Video');
  else
    failedResult.push('Video');






  /* Test #007 : Device Orientation */
  if (!!window.DeviceOrientationEvent)
    succeededResult.push('Device Orientation');
  else
    failedResult.push('Device Orientation');

  /* Test #007 : Access the webcam */
  if (!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia ? true : !!navigator.getUserMedia ? true : !!navigator.webkitGetUserMedia || !!navigator.mozGetUserMedia || !!navigator.msGetUserMedia || !!navigator.oGetUserMedia ? true : false)
    succeededResult.push('Access the webcam');
  else
    failedResult.push('Access the webcam');




  /* Test #1 : Audio Element */
  var element = document.createElement('audio');
  var audioCheck = !!element.canPlayType;

  if (audioCheck === true)
    succeededResult.push('Audio');

  else
    failedResult.push('Audio');




  /* Test #2 : Web Audio*/
  var webAudioCheck = 'AudioContext' in window ? 'YES' : 'webkitAudioContext' in window || 'mozAudioContext' in window || 'oAudioContext' in window || 'msAudioContext' in window ? 'YES' || 'PREFIX' : 'NO';
  if (webAudioCheck === 'YES')
    succeededResult.push('WebAudio');
  else
    failedResult.push('WebAudio');



  /* Test #3 : Audio MP3 Codec */
  var mp3Check = false;
  if (element.canPlayType) {
    var t = element.canPlayType('audio/mpeg');
    if (t === 'maybe') {
      // We need to check if the browser really supports playing MP3s by loading one and seeing if the
      // loadedmetadata event is triggered... but for now assume it does support it...
      mp3Check = true;
    } else if (t === 'probably') {
      mp3Check = true;
    }
  }
  if (mp3Check === true)
    succeededResult.push('Mp3');

  else
    failedResult.push('Mp3');



  /* Test #4 : FullScreen */


  /* Test #8 : Web Animation API */
  // var webAnimationAPICheck = 'animate' in document.createElement('div');
  var webAnimationAPICheck = checkAnimationAPI();
  if (webAnimationAPICheck)
    succeededResult.push('Web Animation API');
  else
    failedResult.push('Web Animation API');



  /* Test #5 : Input Type Image */
  var element = createInput('image');
  element.style.display = 'inline-block';
  document.body.appendChild(element);

  var supportsWidth = 'width' in element;
  var supportsHeight = 'height' in element;

  element.setAttribute('width', '100');
  element.setAttribute('height', '100');

  // #Image, it's Width and Height
  var image = element.type === 'image';
  var imageWidth = supportsWidth && element.offsetWidth === 100;
  var imageHeight = supportsHeight && element.offsetHeight === 100

  if (image === true && imageWidth === true && imageHeight === true)
    succeededResult.push('Image');
  else
    failedResult.push('Image');

  document.body.removeChild(element);

  /* Test #6 : Picture Element */
  var pictureCheck = 'HTMLPictureElement' in window

  if (pictureCheck)
    succeededResult.push('Picture');
  else
    failedResult.push('Picture');




  /* Test #7 : Request Animation Frame */
  var requestAnimationFrameCheck = (!!window.webkitRequestAnimationFrame ? 'YES' : !!window.mozRequestAnimationFrame) || (!!window.msRequestAnimationFrame || !!window.oRequestAnimationFrame ? 'YES' : 'NO');
  // (!!document.documentElement.webkitRequestFullScreen ? 'YES' : !!document.documentElement.mozRequestFullScreen) || (!!document.documentElement.msRequestFullscreen ? 'YES' : 'NO');
  if (requestAnimationFrameCheck)
    succeededResult.push('Request animation frame');
  else
    failedResult.push('Request animation frame');


  /* Test #9 : Async Script */
  var asyncScriptCheck = 'async' in document.createElement('script');

  if (asyncScriptCheck)
    succeededResult.push('Async Script');
  else
    failedResult.push('Async Script');


  /* Test #10 : ES6 Module */
  var ES6Check = true;



  /* Test #11 : ES6 Classes */
  var es6ClassesCheck = true;

  try {
    eval('class Something {}');
  } catch (e) {
    es6ClassesCheck = false;
  }

  if (!es6ClassesCheck)
    ES6Check = false;

  /* Test #12 : ES6 Arrow Functions */
  var es6ArrowFunctionCheck = true;

  try {
    eval('()=>{}');
  } catch (e) {
    es6ArrowFunctionCheck = false;
  }

  if (!es6ArrowFunctionCheck)
    ES6Check = false;

  /* Test #13 : ES6 Promises */
  var es6PromisesCheck = 'Promise' in window ? true : false;

  if ('Promise' in window &&
    'resolve' in window.Promise &&
    'reject' in window.Promise &&
    'all' in window.Promise &&
    'race' in window.Promise &&
    (function () {
      var resolve;
      new window.Promise(function (r) { resolve = r; });
      return typeof resolve === 'function';
    }())) {
    es6PromisesCheck = true;
  }

  if (!es6PromisesCheck)
    ES6Check = false;

  /* Test #14 : ES6 Template String */
  var es6TemplateStringCheck = true;

  try {
    eval('var a = `a`');
  } catch (e) {
    es6TemplateStringCheck = false;
  }

  if (!es6TemplateStringCheck)
    ES6Check = false;                                             /* Test #16 : ES6 Typed Arrays */

  /* Datatype */
  var arrayBufferCheck = typeof ArrayBuffer != 'undefined';
  var int8ArrayCheck = typeof Int8Array != 'undefined';
  var uint8ArrayCheck = typeof Uint8Array != 'undefined';
  var uint8ClampedArrayCheck = typeof Uint8ClampedArray != 'undefined';
  var int16ArrayCheck = typeof Int16Array != 'undefined';
  var uint16ArrayCheck = typeof Uint16Array != 'undefined';
  var int32ArrayCheck = typeof Int32Array != 'undefined';
  var uint32ArrayCheck = typeof Uint32Array != 'undefined';
  var float32ArrayCheck = typeof Float32Array != 'undefined';
  var float64ArrayCheck = typeof Float64Array != 'undefined';
  var dataViewCheck = typeof DataView != 'undefined';

  var es6TypedArrayCheck = typeof arrayBufferCheck != 'undefined' &&
    typeof int8ArrayCheck != 'undefined' &&
    typeof uint8ArrayCheck != 'undefined' &&
    typeof uint8ClampedArrayCheck != 'undefined' &&
    typeof int16ArrayCheck != 'undefined' &&
    typeof uint16ArrayCheck != 'undefined' &&
    typeof int32ArrayCheck != 'undefined' &&
    typeof uint32ArrayCheck != 'undefined' &&
    typeof float32ArrayCheck != 'undefined' &&
    typeof float64ArrayCheck != 'undefined' &&
    typeof dataViewCheck != 'undefined';

  if (!es6TypedArrayCheck)
    ES6Check = false;

  /* Test #15 : ES6 Internationalization */
  var es6InternationalizationCheck = 'Intl' in window ? true : false;

  if (!es6InternationalizationCheck)
    ES6Check = false;

  // if (!ES6Check)
  //         failedResult.push('ES6');
  // else
  //         succeededResult.push('ES6');



  /*HTML5 (If any of these HTML5 Support is marked is missing, not all the detail)*/
  var chkSVGDOMSRC = false;
  /* Test #004 : Parsing inline SVG */
  var element = document.createElement('div');
  element.innerHTML = '<svg></svg>';
  var passed = element.firstChild && "namespaceURI" in element.firstChild && element.firstChild.namespaceURI == 'http://www.w3.org/2000/svg';

  if (passed)
    chkSVGDOMSRC = true;

  /* Test #005 : Shadow DOM */
  var element = document.createElement('div');
  if ('attachShadow' in element ? true : 'createShadowRoot' in element || 'webkitCreateShadowRoot' in element ? true : false)

    chkSVGDOMSRC = true;


  /* Test #006 : srcset attribute */
  var element = document.createElement('img');
  if ('srcset' in element)
    chkSVGDOMSRC = true;



  if (ES6Check && chkSVGDOMSRC)
    succeededResult.push('HTML5');
  else
    failedResult.push('HTML5');



  /* Test #16 : ECMA Script 7 */
  var passed = 'YES';

  try {
    eval('async function a() { return await Promise.resolve() }');
  } catch (e) {
    passed = 'NO';
  }

  if (passed === 'YES')
    succeededResult.push('ECMA Script 7');
  else
    failedResult.push('ECMA Script 7');



  /* Test #17 : Application Cache */
  var appCache = !!window.applicationCache;

  if (appCache)
    succeededResult.push('Application Cache');
  else
    failedResult.push('Application Cache');



  /* Test #18 : Session Storage */
  var sessionStorage = 'sessionStorage' in window && window.sessionStorage != null;

  if (sessionStorage)
    succeededResult.push('Session Storage');
  else
    failedResult.push('Session Storage');



  /* Test #19 : Reading Files*/
  var readingFilesCheck = 'FileReader' in window;

  if (readingFilesCheck)
    succeededResult.push('Reading Files');
  else
    failedResult.push('Reading Files');



  // // var isFail = result.indexOf("Failed");

  result["success"] = succeededResult;
  result["failure"] = failedResult;

  return result;
  // if (isFail > 0)
  //     alert(result);
  //     window.location = 'http://localhost:81/'
  // else
  //     window.location = 'http://localhost:81/'
}

var createInput = function (type) {
  var field = document.createElement('input');

  try {
    field.setAttribute('type', type);
  } catch (e) {
  }

  return field;
};

function checkAnimationAPI() {
  var testresult;
  if (!!document.documentElement.webkitRequestFullScreen === true && navigator.userAgent.indexOf('Edge') > 0 && (navigator.platform === 'Win32' || navigator.platform === 'Win64') && navigator.product === 'Gecko') {
    testresult = 'animate' in document.createElement('div');
    return testresult;
  }
  else
    return 'animate' in document.createElement('div');
};
