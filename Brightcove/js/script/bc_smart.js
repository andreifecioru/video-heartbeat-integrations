
var player;
var modVP;
var modExp;
var modCon;
var mediaFriendly;
var mediaName;
var mediaID=0;
var mediaLength;
var mediaOffset=0;
var mediaPlayerName="Brightcove Smart Player"; 
var mediaStreamType="vod";

function myTemplateLoaded(experienceID) {
    player = brightcove.api.getExperience(experienceID);
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
    modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);}

function onTemplateReady(evt) {
    modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onBegin);
    //modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
    modVP.addEventListener(brightcove.api.events.MediaEvent.SEEK_NOTIFY, onSeekStop);
    modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onComplete);
}

function onBegin(evt){
mediaID=(evt.media.id).toString();
mediaFriendly=evt.media.displayName;
mediaLength=(evt.duration).toString(); 
mediaOffset=Math.floor(evt.position);
console.log('trackVideoLoad');
console.log('trackPlay');
console.log('Player Name:' + mediaPlayerName);
console.log('Video ID:' + mediaID);
console.log('Video Friendly Name:' + mediaFriendly);
console.log('Video Length:' + mediaLength);
console.log('Playhead Position:' + mediaOffset);
console.log('Stream Type:' + mediaStreamType);
}

/*function onPlay(evt){ 
mediaOffset=(Math.floor(evt.position)).toString(); 
console.log('Video Play Not Start');  
console.log('Player Name:' + mediaPlayerName);
console.log('Video ID:' + mediaID);
console.log('Video Friendly Name:' + mediaFriendly);
console.log('Video Length:' + mediaLength);
console.log('Playhead Position:' + mediaOffset);
console.log('Stream Type:' + mediaStreamType);
}*/

function onSeekStop(evt){ 
mediaOffset=(Math.floor(evt.position)).toString(); 
console.log('trackSeekComplete');  
console.log('Player Name:' + mediaPlayerName);
console.log('Video ID:' + mediaID);
console.log('Video Friendly Name:' + mediaFriendly);
console.log('Video Length:' + mediaLength);
console.log('Playhead Position:' + mediaOffset);
console.log('Stream Type:' + mediaStreamType);
}

function onStop(evt){
mediaOffset=Math.floor(evt.position);  
console.log('trackPause OR trackSeekStart');
console.log('Player Name:' + mediaPlayerName);
console.log('Video ID:' + mediaID);
console.log('Video Friendly Name:' + mediaFriendly);
console.log('Video Length:' + mediaLength);
console.log('Playhead Position:' + mediaOffset);
console.log('Stream Type:' + mediaStreamType);
}

function onComplete(evt){
mediaOffset=Math.floor(evt.position);
console.log('trackComplete');
console.log('trackVideoUnload');
console.log('Player Name:' + mediaPlayerName);
console.log('Video ID:' + mediaID);
console.log('Video Friendly Name:' + mediaFriendly);
console.log('Video Length:' + mediaLength);
console.log('Playhead Position:' + mediaOffset);
console.log('Stream Type:' + mediaStreamType);
}



