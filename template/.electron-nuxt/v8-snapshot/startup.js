var snapshotAuxiliaryData = {};;

function generateSnapshot() {
  const outerScope = this;

  let process = {};
  Object.defineProperties(process, {
    'platform': { value: 'win32', enumerable: false },
    'argv': { value: [], enumerable: false },
    'env': { value: { 'NODE_ENV': 'production' }, enumerable: false }
  });
  function get_process() {
    return process;
  }

  function createElement(_type) {
    return {
      innerHTML: '',
      style: {}
    };
  }

  let documentElement = {
    textContent: '',
    style: {
      cssFloat: ''
    }
  };
  let document = {};
  Object.defineProperties(document, {
    'createElement': { value: createElement, enumerable: false },
    'addEventListener': { value: function () {}, enumerable: false },
    'documentElement': { value: documentElement, enumerable: false },
    'oninput': { value: {}, enumerable: false },
    'onchange': { value: {}, enumerable: false }
  });
  function get_document() {
    return document;
  }

  let global = {};
  Object.defineProperties(global, {
    'document': { value: document, enumerable: false },
    'process': { value: process, enumerable: false },
    'WeakMap': { value: WeakMap, enumerable: false },
    'isGeneratingSnapshot': { value: true, enumerable: false }
  });
  function get_global() {
    return global;
  }

  // Globally visible function and constructor names that are available in an Electron renderer window, but not visible
  // during snapshot creation.
  // See test/samples/list-globals.js for the generation code.
  // - Manually remove "webkitURL" which is deprecated to avoid a warning on startup.
  const globalFunctionNames = ["USBOutTransferResult", "USBIsochronousOutTransferResult", "USBIsochronousOutTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousInTransferPacket", "USBInTransferResult", "USBInterface", "USBEndpoint", "USBDevice", "USBConnectionEvent", "USBConfiguration", "USBAlternateInterface", "USB", "NFC", "BluetoothUUID", "BluetoothRemoteGATTService", "BluetoothRemoteGATTServer", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTCharacteristic", "BluetoothDevice", "BluetoothCharacteristicProperties", "Bluetooth", "WebAuthentication", "PublicKeyCredential", "AuthenticatorResponse", "AuthenticatorAttestationResponse", "AuthenticatorAssertionResponse", "WebGLRenderingContext", "WebGL2RenderingContext", "Path2D", "CanvasPattern", "CanvasGradient", "TextDetector", "FaceDetector", "DetectedText", "DetectedFace", "DetectedBarcode", "BarcodeDetector", "NavigationPreloadManager", "SensorErrorEvent", "Sensor", "RelativeOrientationSensor", "OrientationSensor", "Magnetometer", "LinearAccelerationSensor", "Gyroscope", "AmbientLightSensor", "Accelerometer", "AbsoluteOrientationSensor", "webkitSpeechRecognitionEvent", "webkitSpeechRecognitionError", "webkitSpeechRecognition", "webkitSpeechGrammarList", "webkitSpeechGrammar", "SpeechSynthesisUtterance", "SpeechSynthesisEvent", "RemotePlayback", "RTCRtpSender", "PushSubscriptionOptions", "PushSubscription", "PushManager", "PresentationReceiver", "PresentationConnectionList", "PresentationRequest", "PresentationConnectionCloseEvent", "PresentationConnectionAvailableEvent", "PresentationConnection", "PresentationAvailability", "Presentation", "PermissionStatus", "Permissions", "PaymentResponse", "PaymentRequestUpdateEvent", "PaymentRequest", "PaymentAddress", "PaymentManager", "Notification", "VideoPlaybackQuality", "TrackDefaultList", "TrackDefault", "CanvasCaptureMediaStreamTrack", "PhotoCapabilities", "MediaSettingsRange", "ImageCapture", "IDBObserverChanges", "IDBObserver", "IDBObservation", "StorageManager", "CompositorWorker", "BudgetService", "BroadcastChannel", "SyncManager", "BackgroundFetchRegistration", "BackgroundFetchManager", "BackgroundFetchFetch", "AudioParamMap", "XSLTProcessor", "Worklet", "VTTRegion", "KeyframeEffectReadOnly", "KeyframeEffect", "DocumentTimeline", "AnimationTimeline", "AnimationPlaybackEvent", "AnimationEffectTimingReadOnly", "AnimationEffectTiming", "AnimationEffectReadOnly", "Animation", "VisualViewport", "SharedWorker", "PerformanceServerTiming", "SVGMPathElement", "SVGDiscardElement", "SVGAnimationElement", "ResizeObserverEntry", "ResizeObserver", "PerformancePaintTiming", "PerformanceObserverEntryList", "PerformanceObserver", "PerformanceNavigationTiming", "IntersectionObserverEntry", "IntersectionObserver", "StaticRange", "InputEvent", "DOMRectReadOnly", "DOMRect", "DOMQuad", "DOMPointReadOnly", "DOMPoint", "DOMMatrixReadOnly", "DOMMatrix", "ScrollTimeline", "StylePropertyMapReadonly", "StylePropertyMap", "CSSVariableReferenceValue", "CSSURLImageValue", "CSSUnparsedValue", "CSSUnitValue", "CSSTranslation", "CSSTransformValue", "CSSTransformComponent", "CSSStyleValue", "CSSSkew", "CSSScale", "CSSRotation", "CSSResourceValue", "CSSPositionValue", "CSSPerspective", "CSSNumericValue", "CSSMatrixComponent", "CSSKeywordValue", "CSSImageValue", "VideoTrackList", "VideoTrack", "AudioTrackList", "AudioTrack", "AccessibleNodeList", "AccessibleNode", "webkitRTCPeerConnection", "webkitMediaStream", "WebSocket", "WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync", "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo", "WaveShaperNode", "TextEncoder", "TextDecoder", "SubtleCrypto", "StorageEvent", "Storage", "StereoPannerNode", "SourceBufferList", "SourceBuffer", "ServiceWorkerRegistration", "ServiceWorkerContainer", "ServiceWorker", "ScriptProcessorNode", "ScreenOrientation", "Response", "Request", "RTCStatsReport", "RTCSessionDescription", "RTCRtpReceiver", "RTCRtpContributingSource", "RTCPeerConnectionIceEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCDataChannelEvent", "RTCDataChannel", "RTCCertificate", "Plugin", "PluginArray", "PeriodicWave", "PasswordCredential", "PannerNode", "OscillatorNode", "OfflineAudioContext", "OfflineAudioCompletionEvent", "NetworkInformation", "MimeType", "MimeTypeArray", "MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamEvent", "MediaStream", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode", "MediaSource", "MediaRecorder", "MediaKeys", "MediaKeySystemAccess", "MediaKeyStatusMap", "MediaKeySession", "MediaKeyMessageEvent", "MediaEncryptedEvent", "MediaElementAudioSourceNode", "MediaDevices", "MediaDeviceInfo", "MIDIPort", "MIDIOutputMap", "MIDIOutput", "MIDIMessageEvent", "MIDIInputMap", "MIDIInput", "MIDIConnectionEvent", "MIDIAccess", "ImageBitmapRenderingContext", "IIRFilterNode", "IDBVersionChangeEvent", "IDBTransaction", "IDBRequest", "IDBOpenDBRequest", "IDBObjectStore", "IDBKeyRange", "IDBIndex", "IDBFactory", "IDBDatabase", "IDBCursorWithValue", "IDBCursor", "Headers", "GamepadEvent", "Gamepad", "GamepadButton", "GainNode", "FederatedCredential", "EventSource", "DynamicsCompressorNode", "DeviceOrientationEvent", "DeviceMotionEvent", "DelayNode", "DOMError", "CryptoKey", "Crypto", "CredentialsContainer", "Credential", "ConvolverNode", "ConstantSourceNode", "CloseEvent", "ChannelSplitterNode", "ChannelMergerNode", "CanvasRenderingContext2D", "CacheStorage", "Cache", "BlobEvent", "BiquadFilterNode", "BeforeInstallPromptEvent", "BatteryManager", "BaseAudioContext", "AudioScheduledSourceNode", "AudioProcessingEvent", "AudioParam", "AudioNode", "AudioListener", "AudioDestinationNode", "AudioContext", "AudioBufferSourceNode", "AudioBuffer", "AppBannerPromptResult", "AnalyserNode", "postMessage", "blur", "focus", "close", "XPathResult", "XPathExpression", "XPathEvaluator", "XMLSerializer", "XMLHttpRequestUpload", "XMLHttpRequestEventTarget", "XMLHttpRequest", "XMLDocument", "Worker", "Window", "WheelEvent", "ValidityState", "VTTCue", "URLSearchParams", "URL", "UIEvent", "TreeWalker", "TransitionEvent", "TrackEvent", "TouchList", "TouchEvent", "Touch", "TimeRanges", "TextTrackList", "TextTrackCueList", "TextTrackCue", "TextTrack", "TextMetrics", "TextEvent", "Text", "TaskAttributionTiming", "StyleSheetList", "StyleSheet", "ShadowRoot", "Selection", "SecurityPolicyViolationEvent", "Screen", "SVGViewElement", "SVGUseElement", "SVGUnitTypes", "SVGTransformList", "SVGTransform", "SVGTitleElement", "SVGTextPositioningElement", "SVGTextPathElement", "SVGTextElement", "SVGTextContentElement", "SVGTSpanElement", "SVGSymbolElement", "SVGSwitchElement", "SVGStyleElement", "SVGStringList", "SVGStopElement", "SVGSetElement", "SVGScriptElement", "SVGSVGElement", "SVGRectElement", "SVGRect", "SVGRadialGradientElement", "SVGPreserveAspectRatio", "SVGPolylineElement", "SVGPolygonElement", "SVGPointList", "SVGPoint", "SVGPatternElement", "SVGPathElement", "SVGNumberList", "SVGNumber", "SVGMetadataElement", "SVGMatrix", "SVGMaskElement", "SVGMarkerElement", "SVGLinearGradientElement", "SVGLineElement", "SVGLengthList", "SVGLength", "SVGImageElement", "SVGGraphicsElement", "SVGGradientElement", "SVGGeometryElement", "SVGGElement", "SVGForeignObjectElement", "SVGFilterElement", "SVGFETurbulenceElement", "SVGFETileElement", "SVGFESpotLightElement", "SVGFESpecularLightingElement", "SVGFEPointLightElement", "SVGFEOffsetElement", "SVGFEMorphologyElement", "SVGFEMergeNodeElement", "SVGFEMergeElement", "SVGFEImageElement", "SVGFEGaussianBlurElement", "SVGFEFuncRElement", "SVGFEFuncGElement", "SVGFEFuncBElement", "SVGFEFuncAElement", "SVGFEFloodElement", "SVGFEDropShadowElement", "SVGFEDistantLightElement", "SVGFEDisplacementMapElement", "SVGFEDiffuseLightingElement", "SVGFEConvolveMatrixElement", "SVGFECompositeElement", "SVGFEComponentTransferElement", "SVGFEColorMatrixElement", "SVGFEBlendElement", "SVGEllipseElement", "SVGElement", "SVGDescElement", "SVGDefsElement", "SVGComponentTransferFunctionElement", "SVGClipPathElement", "SVGCircleElement", "SVGAnimatedTransformList", "SVGAnimatedString", "SVGAnimatedRect", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedNumberList", "SVGAnimatedNumber", "SVGAnimatedLengthList", "SVGAnimatedLength", "SVGAnimatedInteger", "SVGAnimatedEnumeration", "SVGAnimatedBoolean", "SVGAnimatedAngle", "SVGAnimateTransformElement", "SVGAnimateMotionElement", "SVGAnimateElement", "SVGAngle", "SVGAElement", "Range", "RadioNodeList", "PromiseRejectionEvent", "ProgressEvent", "ProcessingInstruction", "PopStateEvent", "PointerEvent", "PerformanceTiming", "PerformanceResourceTiming", "PerformanceNavigation", "PerformanceMeasure", "PerformanceMark", "PerformanceLongTaskTiming", "PerformanceEntry", "Performance", "PageTransitionEvent", "NodeList", "NodeIterator", "NodeFilter", "Node", "Navigator", "NamedNodeMap", "MutationRecord", "MutationObserver", "MutationEvent", "MouseEvent", "MessagePort", "MessageEvent", "MessageChannel", "MediaQueryListEvent", "MediaQueryList", "MediaList", "MediaError", "Location", "KeyboardEvent", "InputDeviceCapabilities", "ImageData", "ImageBitmap", "IdleDeadline", "History", "HashChangeEvent", "HTMLVideoElement", "HTMLUnknownElement", "HTMLUListElement", "HTMLTrackElement", "HTMLTitleElement", "HTMLTextAreaElement", "HTMLTemplateElement", "HTMLTableSectionElement", "HTMLTableRowElement", "HTMLTableElement", "HTMLTableColElement", "HTMLTableCellElement", "HTMLTableCaptionElement", "HTMLStyleElement", "HTMLSpanElement", "HTMLSourceElement", "HTMLSlotElement", "HTMLShadowElement", "HTMLSelectElement", "HTMLScriptElement", "HTMLQuoteElement", "HTMLProgressElement", "HTMLPreElement", "HTMLPictureElement", "HTMLParamElement", "HTMLParagraphElement", "HTMLOutputElement", "HTMLOptionsCollection", "Option", "HTMLOptionElement", "HTMLOptGroupElement", "HTMLObjectElement", "HTMLOListElement", "HTMLModElement", "HTMLMeterElement", "HTMLMetaElement", "HTMLMenuElement", "HTMLMediaElement", "HTMLMarqueeElement", "HTMLMapElement", "HTMLLinkElement", "HTMLLegendElement", "HTMLLabelElement", "HTMLLIElement", "HTMLInputElement", "Image", "HTMLImageElement", "HTMLIFrameElement", "HTMLHtmlElement", "HTMLHeadingElement", "HTMLHeadElement", "HTMLHRElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLFormElement", "HTMLFormControlsCollection", "HTMLFontElement", "HTMLFieldSetElement", "HTMLEmbedElement", "HTMLElement", "HTMLDocument", "HTMLDivElement", "HTMLDirectoryElement", "HTMLDialogElement", "HTMLDetailsElement", "HTMLDataListElement", "HTMLDListElement", "HTMLContentElement", "HTMLCollection", "HTMLCanvasElement", "HTMLButtonElement", "HTMLBodyElement", "HTMLBaseElement", "HTMLBRElement", "Audio", "HTMLAudioElement", "HTMLAreaElement", "HTMLAnchorElement", "HTMLAllCollection", "FormData", "FontFaceSetLoadEvent", "FontFace", "FocusEvent", "FileReader", "FileList", "File", "EventTarget", "Event", "ErrorEvent", "Element", "DragEvent", "DocumentType", "DocumentFragment", "Document", "DataTransferItemList", "DataTransferItem", "DataTransfer", "DOMTokenList", "DOMStringMap", "DOMStringList", "DOMParser", "DOMImplementation", "DOMException", "CustomEvent", "CustomElementRegistry", "CompositionEvent", "Comment", "ClipboardEvent", "Clipboard", "CharacterData", "CSSViewportRule", "CSSSupportsRule", "CSSStyleSheet", "CSSStyleRule", "CSSStyleDeclaration", "CSSRuleList", "CSSRule", "CSSPageRule", "CSSNamespaceRule", "CSSMediaRule", "CSSKeyframesRule", "CSSKeyframeRule", "CSSImportRule", "CSSGroupingRule", "CSSFontFaceRule", "CSS", "CSSConditionRule", "CDATASection", "Blob", "BeforeUnloadEvent", "BarProp", "Attr", "ApplicationCacheErrorEvent", "ApplicationCache", "AnimationEvent", "WebKitCSSMatrix", "WebKitMutationObserver", "WebKitAnimationEvent", "WebKitTransitionEvent", "onerror", "onload", "stop", "open", "alert", "confirm", "prompt", "print", "requestAnimationFrame", "cancelAnimationFrame", "requestIdleCallback", "cancelIdleCallback", "captureEvents", "releaseEvents", "getComputedStyle", "matchMedia", "moveTo", "moveBy", "resizeTo", "resizeBy", "getSelection", "find", "getMatchedCSSRules", "webkitRequestAnimationFrame", "webkitCancelAnimationFrame", "btoa", "atob", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "createImageBitmap", "scroll", "scrollTo", "scrollBy", "fetch", "getComputedStyleMap", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "openDatabase", "SharedArrayBuffer", "Buffer", "setImmediate", "clearImmediate", "require", "BudgetState", "WebView", "measure", "profile", "dir", "dirxml", "profileEnd", "clear", "table", "keys", "values", "debug", "undebug", "monitor", "unmonitor", "inspect", "copy", "getEventListeners", "monitorEvents", "unmonitorEvents", "$", "$$", "$x"];

  // During snapshot generation, this is null.
  // After snapshot load and setGlobals() is called, this is an object with global function names as keys and the real
  // global functions as values.
  let globalFunctionTrampoline = null;

  // Create a placeholder function to install as a global in place of a function that may be available after snapshot
  // load, at runtime. Uses the current state of globalFunctionTrampoline to either call the real function or throw
  // an appropriate error for improper use.
  function makeGlobalPlaceholder(globalFunctionName) {
    return function () {
      if (globalFunctionTrampoline === null) {
        throw new Error(`Attempt to call ${globalFunctionName} during snapshot generation or before snapshotResult.setGlobals()`);
      } else if (globalFunctionTrampoline[globalFunctionName] === undefined) {
        throw new ReferenceError(`Global method ${globalFunctionName} was still not defined after the snapshot was loaded`);
      } else if (new.target === undefined) {
        // Not called as a constructor
        return globalFunctionTrampoline[globalFunctionName](...arguments);
      } else {
        // Called as a constructor
        return new globalFunctionTrampoline[globalFunctionName](...arguments);
      }
    };
  }

  // Install a placeholder function for each global function we expect to have access to at runtime. Placeholder
  // functions are set as properties on our "global" stand-in and also in this function's scope, so bare references
  // will also capture the placeholder function (`var a = setTimeout` and `var a = global.setTimeout`).
  for (const globalFunctionName of globalFunctionNames) {
    if (outerScope[globalFunctionName] !== undefined) {
      // This happens when the snapshot script is eval'd in tests.
      continue;
    }
    const placeholder = makeGlobalPlaceholder(globalFunctionName);
    Object.defineProperties(global, {
      [globalFunctionName]: { value: placeholder, enumerable: false }
    });
    outerScope[globalFunctionName] = placeholder;
  }

  let window = {};
  Object.defineProperties(window, {
    'document': { value: document, enumerable: false },
    'location': { value: { href: '' }, enumerable: false },
    'addEventListener': { value: function () {}, enumerable: false },
    'screen': { value: {}, enumerable: false }
  });
  function get_window() {
    return window;
  }

  let console = {};
  function consoleNoop() {
    throw new Error('Cannot use `console` functions in the snapshot.');
  }
  Object.defineProperties(console, {
    'debug': { value: consoleNoop, enumerable: false },
    'error': { value: consoleNoop, enumerable: false },
    'info': { value: consoleNoop, enumerable: false },
    'log': { value: consoleNoop, enumerable: false },
    'warn': { value: consoleNoop, enumerable: false },
    'time': { value: consoleNoop, enumerable: false },
    'timeEnd': { value: consoleNoop, enumerable: false }
  });
  function get_console() {
    return console;
  }

  let require = moduleName => {
    throw new Error(`Cannot require module "${moduleName}".\n` + "To use Node's require you need to call `snapshotResult.setGlobals` first!");
  };

  function customRequire(modulePath) {
    let module = customRequire.cache[modulePath];
    if (!module) {
      module = { exports: {} };
      const dirname = modulePath.split('/').slice(0, -1).join('/');

      function define(callback) {
        callback(customRequire, module.exports, module);
      }

      if (customRequire.definitions.hasOwnProperty(modulePath)) {
        customRequire.cache[modulePath] = module;
        customRequire.definitions[modulePath].apply(module.exports, [module.exports, module, modulePath, dirname, customRequire, define]);
      } else {
        module.exports = require(modulePath);
        customRequire.cache[modulePath] = module;
      }
    }
    return module.exports;
  }
  customRequire.extensions = {};
  customRequire.cache = {};
  customRequire.definitions = {
    "./src/main/test.js": function (exports, module, __filename, __dirname, require, define) {
      let path;

      function get_path() {
        return path = path || require('path');
      }

      module.exports = function () {
        return get_path().join('a', 'b', 'c');
      }



    },

  };;
  customRequire.resolve = function (mod) {
    return require.resolve(mod);
  };

  customRequire("./src/main/test.js");
  return {
    customRequire,
    setGlobals: function (newGlobal, newProcess, newWindow, newDocument, newConsole, nodeRequire) {
      // Populate the global function trampoline with the real global functions defined on newGlobal.
      globalFunctionTrampoline = newGlobal;

      for (let key of Object.keys(global)) {
        newGlobal[key] = global[key];
      }
      global = newGlobal;

      for (let key of Object.keys(process)) {
        newProcess[key] = process[key];
      }
      process = newProcess;

      for (let key of Object.keys(window)) {
        newWindow[key] = window[key];
      }
      window = newWindow;

      for (let key of Object.keys(document)) {
        newDocument[key] = document[key];
      }
      document = newDocument;

      for (let key of Object.keys(console)) {
        newConsole[key] = console[key];
      }
      console = newConsole;

      require = nodeRequire;
    },
    translateSnapshotRow: function (row) {
      let low = 0;
      let high = snapshotAuxiliaryData.snapshotSections.length - 1;
      while (low <= high) {
        const mid = low + (high - low >> 1);
        const section = snapshotAuxiliaryData.snapshotSections[mid];
        if (row < section.startRow) {
          high = mid - 1;
        } else if (row >= section.endRow) {
          low = mid + 1;
        } else {
          return {
            relativePath: section.relativePath,
            row: row - section.startRow
          };
        }
      }

      return { relativePath: '<embedded>', row: row };
    }
  };
}

snapshotAuxiliaryData.snapshotSections = [{"relativePath":"./src/main/test.js","startRow":152,"endRow":164}];
var snapshotResult = generateSnapshot.call({});
// Delete the generateSnapshot function to prevent it from appearing in the
// global scope and causing slowdowns when the function is particularly big.
generateSnapshot = null;