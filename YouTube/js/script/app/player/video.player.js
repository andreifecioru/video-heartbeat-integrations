(function(ADB, Configuration, EventBus) {
    'use strict';

    var extend = ADB.core.extend;
    var Event = ADB.core.Event;
    var VideoInfo = ADB.va.VideoInfo;

    // Let's define some events that our player
    // is able to trigger.
    extend(PlayerEvent, Event);

    function PlayerEvent(type, data) {
        PlayerEvent.__super__.constructor.call(this, type, data);
    }

    PlayerEvent.VIDEO_LOAD = 'player:video_load';
    PlayerEvent.VIDEO_UNLOAD = 'player:video_unload';
    PlayerEvent.PLAY = 'player:play';
    PlayerEvent.PAUSE = 'player:pause';
    PlayerEvent.COMPLETE = 'player:complete';
    PlayerEvent.BUFFER_START = 'player:buffer_start';
    PlayerEvent.BUFFER_COMPLETE = 'player:buffer_complete';

    function VideoPlayer(id) {
        // Some private iVars
        this._isBuffering = false;
        this._videoInfo = null;

        // Note: by this time we know that the YT namespace has become available
        // because this code is executed *after* the onYouTubeIframeAPIReady()
        // callback is executed.
        this._player = new window.YT.Player("player", {
            events: {
                "onReady": onReady,
                "onStateChange": onStateChange,
                "onError": onError
            }
        });

        // -------------[ YouTube player event listeners ]----------------
        var self = this;
        function onReady(event) {
            // Populate the VideoInfo structure.
            self._videoInfo = new VideoInfo();
            self._videoInfo.id = Configuration.PLAYER.VIDEO_ID;
            self._videoInfo.playerName = Configuration.PLAYER.NAME;
            self._videoInfo.length = self._player.getDuration();
            self._videoInfo.streamType = ADB.va.ASSET_TYPE_VOD;
            self._videoInfo.playhead = self._player.getCurrentTime();

            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.VIDEO_LOAD));
        }

        function onStateChange(event) {
            var PlayerState = window.YT.PlayerState;
            switch (event.data) {
                case PlayerState.PLAYING:
                    if (self._isBuffering) { // the buffering has stopped.
                        EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.BUFFER_COMPLETE));
                    } else { // is is a regular playback-start operation
                        EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.PLAY));
                    }
                    break;
                case PlayerState.PAUSED:
                    EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.PAUSE));
                    break;
                case PlayerState.BUFFERING:
                    EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.BUFFER_START));
                    self._isBuffering = true;
                    break;
                case PlayerState.ENDED:
                    EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.COMPLETE));
                    EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.VIDEO_UNLOAD));
                    break;
            }
        }

        function onError(event) {
            console.log("Error - code: " + event.data);
        }
    }

    VideoPlayer.prototype.getVideoInfo = function () {
        // Refresh the playhead value.
        this._videoInfo.playhead = this._player.getCurrentTime();

        return this._videoInfo;
    };
    
    // Export symbols.
    window.PlayerEvent = PlayerEvent;
    window.VideoPlayer = VideoPlayer;
})(
    // module dependency list
    window.ADB,
    window.Configuration,
    window.EventBus
);
