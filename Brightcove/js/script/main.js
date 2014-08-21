(function(Visitor, AppMeasurement, Configuration, VideoPlayer, VideoAnalyticsProvider) {
    'use strict';

    window.onPlayerCreated = function(playerID) {
        // The Brightcove Smart API is now ready.

        // We can now setup the VideoPlayer object and
        // the associated tracking infrastructure.

        // Set-up the VisitorAPI component.
        var visitor = new Visitor(Configuration.VISITOR_API.MARKETING_CLOUD_ORG_ID, Configuration.VISITOR_API.NAMESPACE);
        visitor.trackingServer = Configuration.VISITOR_API.TRACKING_SERVER;

        // Set-up the AppMeasurement component.
        var appMeasurement = new AppMeasurement();
        appMeasurement.visitor = visitor;
        appMeasurement.visitorNamespace = Configuration.VISITOR_API.NAMESPACE;
        appMeasurement.trackingServer = Configuration.APP_MEASUREMENT.TRACKING_SERVER;
        appMeasurement.account = Configuration.APP_MEASUREMENT.RSID;

        // Setup the video-player object (a wrapper over the YouTube player).
        var videoPlayer = new VideoPlayer(playerID);

        // Setup the analytics provider component.
        // Internally, this instantiates and configured the VHL.
        var analyticsProvider = new VideoAnalyticsProvider(appMeasurement, videoPlayer);
    };

    // Load the YouTube iFrame API.
    (function createBrightcovePlayer() {
        // This will cause the Brightcove player defined in the index.html file to be created.
        window.brightcove.createExperiences();
    })();
})(
    // module dependency list
    window.Visitor,
    window.AppMeasurement,
    window.Configuration,
    window.VideoPlayer,
    window.VideoAnalyticsProvider
);
