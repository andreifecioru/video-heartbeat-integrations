(function(ADB, Configuration, VideoPlayer, PlayerEvent, VideoPlayerDelegate, EventBus) {
    'use strict';

    var VideoHeartbeat = ADB.va.VideoHeartbeat;
    var ConfigData = ADB.va.ConfigData;

    function VideoAnalyticsProvider(appMeasurement, player) {
        if (!appMeasurement) {
            throw new Error("Illegal argument. AppMeasurement reference cannot be null.")
        }

        if (!player) {
            throw new Error("Illegal argument. Player reference cannot be null.")
        }
        this._player = player;

        this._playerDelegate  = new VideoPlayerDelegate(this._player, this);
        this._videoHeartbeat = new VideoHeartbeat(appMeasurement, this._playerDelegate);

        this._setupVideoHeartbeat();
        this._installEventListeners();
    }

    VideoAnalyticsProvider.prototype.destroy = function() {
        if (this._player) {
            this._videoHeartbeat.destroy();
            this._videoHeartbeat = null;
            this._playerDelegate = null;

            EventBus().notificationCenter.removeAllListeners(this);
            this._player = null;
        }
    };

    // ------------[ Event handlers ]------------
    VideoAnalyticsProvider.prototype._onLoad = function(e) {
        console.log('Player event: VIDEO_LOAD');
        this._videoHeartbeat.trackVideoLoad();
    };

    VideoAnalyticsProvider.prototype._onUnload = function(e) {
        console.log('Player event: VIDEO_UNLOAD');
        this._videoHeartbeat.trackVideoUnload();
    };

    VideoAnalyticsProvider.prototype._onPlay = function(e) {
        console.log('Player event: PLAY');
        this._videoHeartbeat.trackPlay();
    };

    VideoAnalyticsProvider.prototype._onPause = function(e) {
        console.log('Player event: PAUSE');
        this._videoHeartbeat.trackPause();
    };

    VideoAnalyticsProvider.prototype._onSeekStart = function(e) {
        console.log('Player event: SEEK_START');
        this._videoHeartbeat.trackSeekStart();
    };

    VideoAnalyticsProvider.prototype._onSeekComplete = function(e) {
        console.log('Player event: SEEK_COMPLETE');
        this._videoHeartbeat.trackSeekComplete();
    };

    VideoAnalyticsProvider.prototype._onComplete = function(e) {
        console.log('Player event: COMPLETE');
        this._videoHeartbeat.trackComplete();
    };

    // ------------[ Private helper functions ]------------
    VideoAnalyticsProvider.prototype._setupVideoHeartbeat = function() {
        var configData = new ConfigData(Configuration.HEARTBEAT.TRACKING_SERVER,
                                        Configuration.HEARTBEAT.JOB_ID,
                                        Configuration.HEARTBEAT.PUBLISHER);

        configData.ovp = Configuration.HEARTBEAT.OVP;
        configData.sdk = Configuration.HEARTBEAT.SDK;
        configData.channel = Configuration.HEARTBEAT.CHANNEL;

        // Comment or explicitly set this to false for production sites.
        configData.debugLogging = true;

        this._videoHeartbeat.configure(configData);
    };

    VideoAnalyticsProvider.prototype._installEventListeners = function() {
        // We register as observers to various VideoPlayer events.
        EventBus().notificationCenter.addEventListener(PlayerEvent.VIDEO_LOAD, this._onLoad, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.VIDEO_UNLOAD, this._onUnload, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.PLAY, this._onPlay, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.PAUSE, this._onPause, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.SEEK_START, this._onSeekStart, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.SEEK_COMPLETE, this._onSeekComplete, this);
        EventBus().notificationCenter.addEventListener(PlayerEvent.COMPLETE, this._onComplete, this);
    };

    // Export symbols.
    window.VideoAnalyticsProvider = VideoAnalyticsProvider;
})(
    // module dependency list
    window.ADB,
    window.Configuration,
    window.VideoPlayer,
    window.PlayerEvent,
    window.VideoPlayerDelegate,
    window.EventBus
);