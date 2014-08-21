(function(ADB) {
    'use strict';

    var extend = ADB.core.extend;
    var PlayerDelegate = ADB.va.PlayerDelegate;

    extend(VideoPlayerDelegate, PlayerDelegate);

    function VideoPlayerDelegate(player, provider) {
        VideoPlayerDelegate.__super__.constructor.call(this);

        // Some private iVars.
        this._player = player;
        this._provider = provider;
    }

    // With our basic player, we can only provide the VideoInfo.
    VideoPlayerDelegate.prototype.getVideoInfo = function() {
        return this._player.getVideoInfo();
    };

    VideoPlayerDelegate.prototype.onError = function(errorInfo) {
        console.log("VideoAnalytics error. Message: "+ errorInfo.message +
            ". Details: " + errorInfo.details + ".")
    };

    VideoPlayerDelegate.prototype.onVideoUnloaded = function() {
        // The VideoHeartbeat engine is done with tracking this video playback session.

        // However, the Brightcove player supports play-lists and we want to reuse the same
        // VHL instance for the next video. For this reason we will not destroy the VHL instance here.
        // this._provider.destroy();
    };

    // NOTE: because we extend the ADB.va.PlayerDelegate base abstract class,
    // there is no need to override any other methods in the PlayerDelegate.
    // The ADB.va.PlayerDelegate provides a suitable default implementation.

    // Export symbols.
    window.VideoPlayerDelegate = VideoPlayerDelegate;
})(window.ADB);