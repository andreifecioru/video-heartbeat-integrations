/*
 * ************************************************************************
 *
 *  ADOBE CONFIDENTIAL
 *  ___________________
 *
 *   (c) Copyright 2014 Adobe Systems Incorporated
 *   All Rights Reserved.
 *
 *  NOTICE:  All information contained herein is, and remains
 *  the property of Adobe Systems Incorporated and its suppliers,
 *  if any.  The intellectual and technical concepts contained
 *  herein are proprietary to Adobe Systems Incorporated and its
 *  suppliers and may be covered by U.S. and Foreign Patents,
 *  patents in process, and are protected by trade secret or copyright law.
 *  Dissemination of this information or reproduction of this material
 *  is strictly forbidden unless prior written permission is obtained
 *  from Adobe Systems Incorporated.
 * ************************************************************************
 */

/*
 * video heartbeats - v1.2.0 - 2014-08-20
 * Copyright (c) 2014 Adobe Systems, Inc. All Rights Reserved.
 */
(function(global) {
if (typeof core === 'undefined') {
    var core = {};
}

if (typeof as_bridge === 'undefined') {
    var as_bridge = {};
}

(function(core) {
    'use strict';

    /**
     * Implements the "inheritance"-like functionality. Inspired by
     * by CoffeeScript-generated code.
     *
     * @param {Function} child Constructor function for the "child" class.
     *
     * @param {Function} parent Constructor function for the "parent" class.
     *
     * @returns {Function} Constructor function for the newly enhanced "child" class.
     */
    function extend(child, parent) {
        // Transfer all properties from the "parent" to the "child".
        for (var key in parent) {
            if (parent.hasOwnProperty(key)) child[key] = parent[key];
        }

        // Wrapper constructor function for the "child" class.
        function Constructor() {
            this.constructor = child;
        }

        // Make the proper connections.
        Constructor.prototype = parent.prototype;
        child.prototype = new Constructor();
        child.__super__ = parent.prototype;

        return child;
    }

    // Export symbols.
    core.extend = extend;
})(core);

(function(core) {
    'use strict';

    /**
     * Implements the "mixin"-like functionality (similar with Ruby's mixin).
     * Inspired by underscore.js implementation.
     *
     * @param {Object} to Destination object (where to mixin the methods).
     *
     * @param {Object} from Source object (where to take the mixin methods from).
     */
    function mixin(to, from) {
        // Scrape all functions
        var fnNames = [];
        for (var key in from) {
            if (from.hasOwnProperty(key) && (typeof from[key] === "function")) {
                fnNames.push(key);
            }
        }

        // Bind all scraped functions to the destination constructor function.
        for (var i = 0; i < fnNames.length; i++) {
            var fnName = fnNames[i];
            to.prototype[fnName] = from[fnName];
        }
    }

    // Export symbols.
    core.mixin = mixin;
})(core);

(function(core) {
    'use strict';

    core.deferrable = {
        executeDeferred: function() {
            if (this._deferred) {
                this._deferred.apply(this, arguments);
            }

            this._deferred = null;
        }
    };
})(core);

(function(core) {
    'use strict';

    core.LOGGING_ENABLED = false;

    core.logger = {
        enableLogging: function(label) {
            this._logEnabled = true;
            this._logTag = label;
        },

        disableLogging: function() {
            this._logEnabled = false;
        },

        log: function(msg) {
            if (!core.LOGGING_ENABLED || !this._logEnabled) return;

            if (window["console"] && window["console"]["log"]) {
                window["console"]["log"](this._logTag + msg);
            }
        },

        info: function(msg) {
            if (!core.LOGGING_ENABLED || !this._logEnabled) return;

            if (window["console"] && window["console"]["info"]) {
                window["console"]["info"](this._logTag + msg);
            }
        },

        warn: function(msg) {
            if (!core.LOGGING_ENABLED || !this._logEnabled) return;

            if (window["console"] && window["console"]["warn"]) {
                window["console"]["warn"](this._logTag + msg);
            }
        },

        error: function(msg) {
            if (!core.LOGGING_ENABLED || !this._logEnabled) return;

            if (window["console"] && window["console"]["error"]) {
                msg = this._logTag + msg;
                window["console"]["error"](msg);
                throw new Error(msg);
            }
        }
    };
})(core);

(function(core) {
    'use strict';

    /**
     * Generic event class. Each event is uniquely identified by
     * a "type" (a string value). An arbitrary object is attached to the event as a means
     * to pass data around between the event producer and the event consumer.
     *
     * @constructor
     *
     * @param {string} type Unique string value identifying the event.
     * @param {Object} data Arbitrary object attached to the event.
     */
    function Event(type, data) {
        this.type = type;
        this.data = data;
    }

    /**
     * Triggered when an async. operation completes successfully.
     *
     * @const
     */
    Event.SUCCESS = "success";

    /**
     * Triggered when an async. operation fails.
     *
     * @const
     */
    Event.ERROR = "error";

    // Export symbols.
    core.Event = Event;
})(core);

(function(core) {
    'use strict';

    /**
     * A generic event dispatcher. It emulates the functionality (and public API)
     * of the EventDispatcher class exposed by the Flash run-time.
     *
     * @constructor
     */
    function EventDispatcher() {
        this._events = {};
    }

    /**
     * Register an event-listener method to the event dispatcher.
     *
     * @param {string} type Unique string value identifying the event.
     *
     * @param {Function} listener Function that will be called when the event is dispatched.
     *
     * @param {Object} context Context in which the listener method is called.
     *
     */
    EventDispatcher.prototype.addEventListener = function(type, listener, context) {
        if (!type || !listener) return;
        context = context || window;

        this._events[type] = (this._events[type] || []);
        this._events[type].push({cb: listener, ctx: context});
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * Un-register an event-listener method to the event dispatcher.
     *
     * NOTE: for an event listener to be removed all the three coordinates must match
     * (type, method and context) with the values provided during registration.
     *
     * @param {string} type Unique string value identifying the event.
     *
     * @param {Function} listener Function that will be called when the event is dispatched.
     *
     * @param {Object} context Context in which the listener method is called.
     */
    EventDispatcher.prototype.removeEventListener = function(type, listener, context) {
        if (!type || !listener) return;
        context = context || window;

        // Check to see if the event type was registered with us.
        var i, key, isTypeRegistered = false;
        for (key in this._events) {
            if (type === key) {
                isTypeRegistered = true;
                break;
            }
        }

        // This event type was not registered with us. Just exit.
        if (!isTypeRegistered) return;

        // Search for the target event listener
        for (i = this._events[key].length - 1; i >= 0; i--) {
            var _listener = this._events[key][i];
            if (listener === _listener.cb && context === _listener.ctx) {
                this._events[key].splice(i, 1);
            }
        }

        // If we are left with an empty list of listeners for a particular
        // event type, we delete it.
        if (!this._events[key].length) delete this._events[key];
    };

    /**
     * Dispatch en event. It goes through the entire list of listener methods that are registered
     * for the target event and calls that function in the specified context.
     *
     * @param {core.Event} event Event instance.
     */
    EventDispatcher.prototype.dispatchEvent = function(event) {
        if (!event.type) return;

        var key, i;
        for (key in this._events) {
            if (this._events.hasOwnProperty(key) && (event.type === key)) {
                var listeners = this._events[key];
                for (i = 0; i < listeners.length; i++) {
                    listeners[i].cb.call(listeners[i].ctx, event);
                }
                break;
            }
        }
    };

    /**
     * Un-registers all listener methods.
     *
     * @param {Object} target The object for which all event listeners are to be removed.
     */
    EventDispatcher.prototype.removeAllListeners = function(target) {
        if (!target) {
            this._events = {};
        } else {
            var i, key;

            for (key in this._events) {
                if (this._events.hasOwnProperty(key)) {
                    for (i = this._events[key].length - 1; i >= 0; i--) {
                        var _listener = this._events[key][i];
                        if (_listener.ctx === target) {
                            this._events[key].splice(i, 1);
                        }
                    }

                    // If we are left with an empty list of listeners for a particular
                    // event type, we delete it.
                    if (!this._events[key].length) delete this._events[key];
                }
            }
        }
    };

    // Export symbols.
    core.EventDispatcher = EventDispatcher;
})(core);

(function(core) {
    'use strict';

    var Event = core.Event;
    var EventDispatcher = core.EventDispatcher;

    URLRequestMethod.GET = "GET";
    function URLRequestMethod() {
    }


    function URLRequest(url, method) {
        this.url = url || null;
        this.method = method;
        this._xmlhttp = null;
    }


    URLLoader.RESPONSE = "response";
    URLLoader.INSTANCE = "instance";

    core.extend(URLLoader, EventDispatcher);

    /**
     * Emulates the URLLoader exposed by Flash run-time.
     *
     * @extends {EventDispatcher}
     */
    function URLLoader() {
        URLLoader.__super__.constructor.call(this);

        this._connection = null;
    }

    //
    // -------------------[ Private helper methods ]-----------------------
    //

    URLLoader.prototype._createCORSRequest = function(req) {
        var xhr = null;

        // First, try to use XMLHTTPRequest2, which has CORS support
        if (typeof window["XMLHttpRequest"] !== "undefined") {
            var candidateXHR = new window["XMLHttpRequest"]();

            if ("withCredentials" in candidateXHR) {
                // The presence of this property indicates XMLHTTPRequest2,
                // (supported by most browsers and IE10+)
                xhr = candidateXHR;
                xhr.open(req.method, req.url, true);
            }
        }

        // If that didn't work, try to use XDomainRequest (IE8 and IE9)
        if (xhr == null) {
            if (typeof window["XDomainRequest"] !== "undefined") {
                xhr = new window["XDomainRequest"]();
                xhr.open(req.method, req.url);
            }
        }

        if (xhr) {
            // If CORS is supported, register the success & error callbacks
            var eventData = {};
            eventData[URLLoader.INSTANCE] = this;
            var self = this;

            xhr.onload = function() {
                if (xhr.status && parseInt(xhr.status, 10) >= 400) {
                    // This extra-check is needed because some browsers
                    // will call the 'onload' callback even if
                    // the request was unsuccessful.
                    return this.onerror();
                }
                eventData[URLLoader.RESPONSE] = xhr.responseText;
                self.dispatchEvent(new Event(Event.SUCCESS, eventData));
            };

            xhr.onerror = function() {
                self.dispatchEvent(new core.Event(Event.ERROR, eventData));
            };
        }

        return xhr;
    };

    URLLoader.prototype._loadImage = function(req) {
        if (!this._connection) {
            this._connection = new Image();
            this._connection.alt = "";
        }

        this._connection.src = req.url;

        // Image requests are assumed to be successful.
        var eventData = {};
        eventData[URLLoader.RESPONSE] = "";
        eventData[URLLoader.INSTANCE] = this;

        this.dispatchEvent(new core.Event(Event.SUCCESS, eventData));
    };

    //
    // -------------------[ Public methods ]-----------------------
    //
    URLLoader.prototype.close = function() {
        this.removeAllListeners();
    };

    URLLoader.prototype.load = function(req) {
        if (!req || !req.method || !req.url) {
            return;
        }

        req._xmlhttp = this._createCORSRequest(req);

        if (req._xmlhttp) {
            req._xmlhttp.send();
        } else {
            // No CORS support: fall-back to image request.
            this._loadImage(req);
        }
    };

    // Export symbols.
    core.URLRequestMethod = URLRequestMethod;
    core.URLRequest = URLRequest;
    core.URLLoader = URLLoader;
})(core);
(function(core) {
    'use strict';

    var mixin = core.mixin;
    var logger = core.logger;

    var VisitorAPI = window.Visitor;

    mixin(VisitorBridge, logger);

    function VisitorBridge() {
        this.enableLogging('[as-js-bridge::VisitorBridge] > ');

        this._getVisitorInstance = function(instance) {
            var visitor = VisitorBridge.instances[instance];
            if (!visitor) {
                this.error('Unable to find visitor for ' + instance + '.');
            }

            return visitor;
        };

        this.onCreate = function(instance, data) {
            this.log('(' + instance + ')' + 'Bridge created.');

            if (!VisitorBridge.instances[instance]) {
                this.log('(' + instance + ')' + 'Creating a Visitor instance.');
                VisitorBridge.instances[instance] = new Visitor(data["marketingCloudOrgId"], data["namespace"]);
            }
        };

        this.onSetTrackingServer = function(instance, data) {
            this.log('(' + instance + ')' + 'Setting tracking server.');
            var visitor = this._getVisitorInstance(instance);

            visitor.trackingServer = data["trackingServer"];
        };


        VisitorBridge.instances = {};
    }
    // Export symbols.
    as_bridge.VisitorBridge = VisitorBridge;
    as_bridge.visitorBridge = new VisitorBridge();
})(core);

(function(core) {
    'use strict';

    var mixin = core.mixin;
    var logger = core.logger;

    var AppMeasurement = window.AppMeasurement;
    var VisitorBridge = as_bridge.VisitorBridge;

    mixin(AppMeasurementBridge, logger);

    function AppMeasurementBridge() {
        this.enableLogging('[as-js-bridge::AppMeasurementBridge] > ');

        this._getAppMeasurementInstance = function(instance) {
            var appMeasurement = AppMeasurementBridge.instances[instance];
            if (!appMeasurement) {
                this.error('Unable to find app measurement for ' + instance + '.');
            }

            return appMeasurement;
        };

        this.onCreate = function(instance, data) {
            this.log('(' + instance + ')' + 'Bridge created.');

            if (!AppMeasurementBridge.instances[instance]) {
                this.log('(' + instance + ')' + 'Creating an AppMeasurement instance.');

                var visitor = VisitorBridge.instances[instance];
                if (!visitor) {
                    this.error('Unable to find visitor for ' + instance + '.');
                }

                var appMeasurement = AppMeasurement['getInstance'](data['account']);
                appMeasurement.visitor = visitor;

                AppMeasurementBridge.instances[instance] = appMeasurement;
            }
        };

        this.onSetTrackingServer = function(instance, data) {
            this.log('(' + instance + ')' + 'Set tracking server: ' + data['trackingServer']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.trackingServer = data['trackingServer'];
        };

        this.onSetPageName = function(instance, data) {
            this.log('(' + instance + ')' + 'Set page name: ' + data['pageName']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.pageName = data['pageName'];
        };

        this.onSetSSL = function(instance, data) {
            this.log('(' + instance + ')' + 'Set SSL: ' + data['ssl']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.ssl = data['ssl'];
        };

        this.onSetAccount = function(instance, data) {
            this.log('(' + instance + ')' + 'Set account: ' + data['account']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.account = data['account'];
        };

        this.onSetVisitorNamespace = function(instance, data) {
            this.log('(' + instance + ')' + 'Set visitorNamespace: ' + data['visitorNamespace']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.visitorNamespace = data['visitorNamespace'];
        };

        this.onSetCharSet = function(instance, data) {
            this.log('(' + instance + ')' + 'Set charSet: ' + data['charSet']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.charSet = data['charSet'];
        };

        this.onSetCurrencyCode = function(instance, data) {
            this.log('(' + instance + ')' + 'Set currencyCode: ' + data['currencyCode']);

            var appMeasurement = this._getAppMeasurementInstance(instance);
            appMeasurement.currencyCode = data['currencyCode'];
        };

        AppMeasurementBridge.instances = {};
    }
    // Export symbols.
    as_bridge.AppMeasurementBridge = AppMeasurementBridge;
    as_bridge.appMeasurementBridge = new AppMeasurementBridge();
})(core);

(function(core, as_bridge) {
    'use strict';

    var mixin = core.mixin;
    var logger = core.logger;

    mixin(PlayerDelegateAS, logger);
    /**
     * @implements {PlayerDelegateProtocol}
     *
     * @constructor
     */
    function PlayerDelegateAS(instance) {
        this.enableLogging('[as-js-bridge::PlayerDelegateAS] > ');

        this.log("(" + instance + ")" + "Creating player delegate.");

        this._getSWF = function(instance) {
            this.log("(" + instance + ")" + "Looking for SWF object.");
            var swfObj = document[instance] || document.getElementById(instance);

            (swfObj) ? this.log('Found PSDK player instance: ' + instance)
                     : this.error('Unable to find PSDK player instance: ' + instance);

            return swfObj;
        };

        this._swf = this._getSWF(instance);

        this.getVideoInfo = function() {
            var result;
            if (this._swf) {
                result  = this._swf.getVideoInfo();
                this.log('Video info: ' + JSON.stringify(result));
            }

            return result;
        };

        this.getAdBreakInfo = function() {
            var result;
            if (this._swf) {
                result  = this._swf.getAdBreakInfo();
                this.log('Ad-break info: ' + JSON.stringify(result));
            }

            return result;
        };

        this.getAdInfo = function() {
            var result;
            if (this._swf) {
                result  = this._swf.getAdInfo();
                this.log('Ad info: ' + JSON.stringify(result));
            }

            return result;
        };

        this.getChapterInfo = function() {
            var result;
            if (this._swf) {
                result  = this._swf.getChapterInfo();
                this.log('Chapter info: ' + JSON.stringify(result));
            }

            return result;
        };

        this.getQoSInfo = function() {
            var result;
            if (this._swf) {
                result  = this._swf.getQoSInfo();
                this.log('QoS info: ' + JSON.stringify(result));
            }

            return result;
        };

        this.onError = function(errorInfo) {
            this.log('Error info: ' + JSON.stringify(errorInfo));

            if (this._swf) {
                this._swf.onError(errorInfo);
            }
        };
    }

    mixin(PlayerDelegateBridge, logger);

    function PlayerDelegateBridge() {
        this.enableLogging('[PlayerDelegateBridge] > ');

        this.onCreate = function(instance) {
            this.log("(" + instance + ")" + "Bridge created.");
            PlayerDelegateBridge.instances[instance] = new PlayerDelegateAS(instance);
        };
    }

    PlayerDelegateBridge.instances = {};

    // Export symbols.
    as_bridge.PlayerDelegateBridge = PlayerDelegateBridge;
    as_bridge.playerDelegateBridge = new PlayerDelegateBridge();
})(core, as_bridge);

(function(core, va, as_bridge) {
    'use strict';

    var mixin = core.mixin;
    var logger = core.logger;

    var AppMeasurementBridge = as_bridge.AppMeasurementBridge;
    var PlayerDelegateBridge = as_bridge.PlayerDelegateBridge;
    var VideoHeartbeat = va.VideoHeartbeat;
    var ConfigData = va.ConfigData;

    mixin(VideoHeartbeatBridge, logger);

    // Enable logging for the AS-to-JS bridge.
    core.LOGGING_ENABLED = true;

    function VideoHeartbeatBridge() {
        this.enableLogging('[as-js-bridge::VideoHeartbeatBridge] > ');

        this._getVideoHeartbeatInstance = function(instance) {
            var videoHeartbeat = VideoHeartbeatBridge.instances[instance];
            if (!videoHeartbeat) {
                this.error('Unable to find video heartbeat for ' + instance + '.');
            }

            return videoHeartbeat;
        };

        this._removeVideoHeartbeatInstance = function(instance) {
            var videoHeartbeat = VideoHeartbeatBridge.instances[instance];
            if (!videoHeartbeat) {
                this.warn('Cannot remove video heartbeat for ' + instance + ', because it does not exist.');
                return;
            }

            delete VideoHeartbeatBridge.instances[instance];
        };

        this.onCreate = function(instance) {
            this.log('(' + instance + ')' + 'Bridge created.');

            if (!VideoHeartbeatBridge.instances[instance]) {
                this.log('(' + instance + ')' + 'Creating a VideoHeartbeat instance.');

                var appMeasurement = AppMeasurementBridge.instances[instance];
                if (!appMeasurement) {
                    this.error('Unable to find app measurement instance for ' + instance + '.');
                }

                var playerDelegate = PlayerDelegateBridge.instances[instance];
                if (!playerDelegate) {
                    this.error('Unable to find player delegate for ' + instance + '.');
                }

                VideoHeartbeatBridge.instances[instance] = new VideoHeartbeat(appMeasurement, playerDelegate);
            }
        };

        this.onConfigure = function(instance, data) {
            this.log('(' + instance + ')' + 'Configuring VideoHeartbeat.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            var configData = new ConfigData();
            configData.trackingServer = data['trackingServer'];
            configData.jobId          = data['jobId'];
            configData.publisher      = data['publisher'];
            configData.ovp            = data['ovp'];
            configData.sdk            = data['sdk'];
            configData.channel        = data['channel'];
            configData.debugLogging   = data['debugLogging'];
            configData.quietMode      = data['quietMode'];
            configData.__primetime    = data['__primetime'];
            configData.__psdkVersion  = data['__psdkVersion'];

            videoHeartbeat.configure(configData);
        };

        this.onDestroy = function(instance) {
            this.log('(' + instance + ')' + 'Tearing-down the VideoHeartbeat instance.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);
            videoHeartbeat.destroy();
            this._removeVideoHeartbeatInstance(instance);
        };

        this.onTrackVideoLoad = function(instance) {
            this.log('(' + instance + ')' + 'Track main video load.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackVideoLoad();
        };

        this.onTrackVideoUnload = function(instance) {
            this.log('(' + instance + ')' + 'Track main video close.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackVideoUnload();
        };

        this.onTrackPlay = function(instance) {
            this.log('(' + instance + ')' + 'Track play.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackPlay();
        };

        this.onTrackPause = function(instance) {
            this.log('(' + instance + ')' + 'Track stop.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackPause();
        };

        this.onTrackBufferStart = function(instance) {
            this.log('(' + instance + ')' + 'Track buffer start.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackBufferStart();
        };

        this.onTrackBufferComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track buffer complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackBufferComplete();
        };

        this.onTrackSeekStart = function(instance) {
            this.log('(' + instance + ')' + 'Track seek start.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackSeekStart();
        };

        this.onTrackSeekComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track seek complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackSeekComplete();
        };

        this.onTrackComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackComplete();
        };

        this.onTrackChapterStart = function(instance) {
            this.log('(' + instance + ')' + 'Track chapter start.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackChapterStart();
        };

        this.onTrackChapterComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track chapter complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackChapterComplete();
        };

        this.onTrackAdBreakStart = function(instance) {
            this.log('(' + instance + ')' + 'Track ad-break start.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackAdBreakStart();
        };

        this.onTrackAdBreakComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track ad-break complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackAdBreakComplete();
        };

        this.onTrackAdStart = function(instance) {
            this.log('(' + instance + ')' + 'Track ad start.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackAdStart();
        };

        this.onTrackAdComplete = function(instance) {
            this.log('(' + instance + ')' + 'Track ad complete.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackAdComplete();
        };

        this.onTrackBitrateChange = function(instance) {
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackBitrateChange();
        };

        this.onTrackVideoPlayerError = function(instance, data) {
            this.log('(' + instance + ')' + 'Track video-player error.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackVideoPlayerError(data['errorId']);
        };

        this.onTrackApplicationError = function(instance, data) {
            this.log('(' + instance + ')' + 'Track application error.');
            var videoHeartbeat = this._getVideoHeartbeatInstance(instance);

            videoHeartbeat.trackApplicationError(data['errorId']);
        };

        VideoHeartbeatBridge.instances = {};
    }
    // Export symbols.
    as_bridge.videoHeartbeatBridge = new VideoHeartbeatBridge();
})(core, window.ADB.va, as_bridge);


//Export symbols
global.ADB || (global.ADB = {});
global.ADB.as_bridge = as_bridge;

})(this);