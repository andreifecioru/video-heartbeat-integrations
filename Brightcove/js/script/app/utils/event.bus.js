(function(core) {
    'use strict';

    var CommCenter = core.CommCenter;

    function EventBus() {
        // Provide a singleton CommCenter
        if (!EventBus.prototype._instance) {
            EventBus.prototype._instance = new CommCenter();
        }

        return EventBus.prototype._instance;
    }

    // Export symbols
    window.EventBus = EventBus;
})(window.ADB.core);