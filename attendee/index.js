  'use strict';
    const AccessToken = require('twilio').jwt.AccessToken;
    const eventID = "EVENT_ID_Room_Name";
    const VideoGrant = AccessToken.VideoGrant;

    const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
        
    const pageHeader = document.getElementById("page-header");
    const joinButton = document.getElementById("btn-start");
    const leaveButton = document.getElementById("btn-end");
    const modalCtrl = document.querySelector(".ctrl")
    const headerVideo = document.getElementById("hdr");
    const modalVideo = document.querySelector(".modal");
    const modalAtt = document.querySelector(".att");

    const Twilio = require('twilio-video');
    const identity = "marc@gmail.com";
    let tokenReturn;

    let localStream = null;
    
    // Create Video Grant and Access Token
    const videoGrant = new VideoGrant({
           room: eventID,
    });
  
    const token = new AccessToken (
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
        {identity: identity}
    );
  
    token.addGrant(videoGrant);
    tokenReturn = token.toJwt();

    headerVideo.innerText = "Preview";
    pageHeader.innerText = "Host";

    // preview screen
        createLocalVideoTrack({
          audio : true,
          video : 640,
          width: 160,
          height: 120
        }).then(videoTrack => {
          modalVideo.appendChild(videoTrack.attach());
        });  

    joinButton.disabled = false;
      console.log("before join")


      joinButton.onclick = () => {
      console.log("join clicked");  
      connect(tokenReturn, { 
            audio: true,
            name: eventID,
            video: { width: 640 }
        }).then(room => {
                  console.log(`Successfully joined a Room: ${room.name}`);
                const localParticipant = room.localParticipant;
                  console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);
//                videoRoom = room;
                  console.log("participant connected");
                joinButton.disabled = true;
                leaveButton.disabled = false;
//                videoTrack = { width : 640, height: 480 };
//console.log("before app.get");
//app.get('/', (req, res) => {
//    res.send(`<h1>hello world</h1>`);
//  res.send(`<h1>${req.params.eventID}</h1>`);
//});
//console.log("after app.get");

});
    }
    leaveButton.onclick = () => {
        modalVideo.style.display = "none";
          console.log('leave room');
          modalCtrl.style.display = "none";
          modalAtt.style.display = "block";
          pageHeader.innerText = "Attendee";        
//        leaveRoomButton.disabled = true;
  //      joinButtonProp.style.displayed = "none";
    //    leaveButtonProp.style.displayed = "none";
    }
    //          room.on("participantDisconnected", participantDisconnected);
//                room.once("disconnected", (error) => {
 //                   room.participants.forEach(participantDisconnected)}
    //        });
  //              joinRoomButton.disabled = true;
    //            leaveRoomButton.disabled = false;
      //          leaveRoomButton.onclick = () => {
        //            videoRoom.disconnect();
          //          console.log(`Disconnected from Room ${videoRoom.name}`);
            //        joinRoomButton.disabled = false;
              //      leaveRoomButton.disabled = true;
 //               }; 
      //     });

//        console.log("after join");
//
//const participantConnected = (participant) => {
//        console.log(`Participant ${participant.identity} connected'`);
//
//        const div = document.createElement('div');
  //      div.id = participant.sid;
    //
      //  console.log('here in connected');
//
  //      participant.on('trackSubscribed', track => trackSubscribed(div, track));
    //    participant.on('trackUnsubscribed', trackUnsubscribed);
  //
    //    participant.tracks.forEach(publication => {
      //      if (publication.isSubscribed) {
        //        trackSubscribed(div, publication.track);
    //        };
      //  });
//    document.body.appendChild(div);
//};
//
//const participantDisconnected = (participant) => {
//        console.log(`Participant ${participant.identity} disconnected.`);
//        document.getElementById(participant.sid).remove();
//};
//
//const trackSubscribed = (div, track) => {
//        div.appendChild(track.attach());
//};
//
//const trackUnsubscribed = (track) => {
//        track.detach().forEach(element => element.remove());