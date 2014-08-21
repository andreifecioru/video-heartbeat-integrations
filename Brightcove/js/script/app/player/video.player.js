(function(ADB, Configuration, EventBus, brightcove) {
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
    PlayerEvent.SEEK_START = 'player:seek_start';
    PlayerEvent.SEEK_COMPLETE = 'player:seek_complete';

    function VideoPlayer(id) {
        // Some private iVars
        this._videoInfo = null;

        var bcExperience = brightcove.api.getExperience(id);
        this._player = {
            modVP : bcExperience.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER),
            modExp : bcExperience.getModule(brightcove.api.modules.APIModules.EXPERIENCE),
            modCon : bcExperience.getModule(brightcove.api.modules.APIModules.CONTENT)
        };


        this._player.modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onPlayerReady);

        // -------------[ Brightcove player event listeners ]----------------
        var self = this;
        function onPlayerReady(event) {
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onBegin);
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgress);
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.SEEK_NOTIFY, onSeekNotify);
            self._player.modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onComplete);
        }

        function onBegin(event) {
            // Populate the VideoInfo structure.
            self._videoInfo = new VideoInfo();
            self._videoInfo.id = event.media.id;
            self._videoInfo.playerName = Configuration.PLAYER.NAME;
            self._videoInfo.length = event.duration;
            self._videoInfo.streamType = ADB.va.ASSET_TYPE_VOD;
            self._videoInfo.playhead = event.position;

            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.VIDEO_LOAD));

            // For the initial play, the player does not call the onPlay() callback - It just calls onBegin().
            // So we trigger an the first PLAY event from here.
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.PLAY));
        }

        function onPlay(event) {
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.PLAY));
        }

        function onStop(event) {
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.PAUSE));
        }

        function onSeekNotify(event) {
            // Update the video playhead value.
            self._videoInfo.playhead = event.position;

            // The Brightcove player does not provide separate SEEK_START and SEEK_COMPLETE events.
            // It only provides a single seek notification when the seek operation is completed.
            // We deal with this by triggering both the SEEK_START and SEEK_COMPLETE events here.
            // The VHL will see this as a very quick seek operation (which in most of the cases is OK).
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.SEEK_START));
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.SEEK_COMPLETE));
        }

        function onProgress(event) {
            // Update the playhead.

            // NOTE: The Brightcove player does not provide an API which provides the playhead value directly.
            // Instead, it provides regular "progress updates" events with an updated playhead value.
            // We need to cache this value to make it available upon request.
            if (self._videoInfo) {
                self._videoInfo.playhead = event.position;
            }
        }

        function onComplete(event) {
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.COMPLETE));
            EventBus().notificationCenter.dispatchEvent(new PlayerEvent(PlayerEvent.VIDEO_UNLOAD));
        }

        function onError(event) {
            console.log("Error - code: " + event.data);
        }
    }

    VideoPlayer.prototype.getVideoInfo = function () {
        return this._videoInfo;
    };
    
    // Export symbols.
    window.PlayerEvent = PlayerEvent;
    window.VideoPlayer = VideoPlayer;
})(
    // module dependency list
    window.ADB,
    window.Configuration,
    window.EventBus,
    window.brightcove
);
