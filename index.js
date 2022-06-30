'use strict';
  const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
  const { createToken } = require('./getAuth.js');
  const fs = require("fs");
  const fsPromises = fs.promises;

  const previewContainer = document.querySelector(".preview-container");
  const playContainer = document.querySelector(".play-container");
  const previewHeader = document.getElementById("preview-header");
  const playHeader = document.getElementById("play-header");
  const previewButton = document.getElementById("btn-preview");
  const joinButton = document.getElementById("btn-join");
  const endButton = document.getElementById("btn-end");
  const leaveButton = document.getElementById("btn-leave");
  const playButton = document.getElementById("btn-play");
  const clearButton = document.getElementById("btn-clear");
  const previewSubHeader = document.getElementById("preview-sub-header");
  const playSubHeader = document.getElementById("play-sub-header");
  const previewIcon = document.getElementById("preview-icon");
  const playIcon = document.getElementById("play-icon");
  const previewVideo = document.querySelector(".preview");
  const playVideo = document.querySelector(".play");

  let eventID = "";
  let identity = "";
  let displayName = "";
  let userType = "";
  let account_Sid = "";
  let api_Key = "";
  let api_Secret = "";
  const { isSupported } = require('twilio-video');

  if (isSupported) {
    } else {
      console.error('This browser is not supported by twilio-video.js.');
    }
  previewHeader.innerText = "GRANDSTAND";
  previewSubHeader.innerText = "Welcome" + displayName;

  getUser();

  previewButton.style.display = "block";
  previewIcon.style.display = "none";
    
  previewButton.onclick = () => {
    if ( userType == "Host" ) {
          startRoom( eventID, identity, account_Sid, api_Key, api_Secret );
          previewButton.style.display = "none";
          joinButton.style.display = "block"; 
       } else {
            previewContainer.style.display = "none";   
            joinStream();
         }   
    }

function getUser() {
    fetch('./userFile.json')
      .then(response => response.json())
      .then(jsonResponse => {
          eventID = jsonResponse.eventID;
          identity = jsonResponse.identity;
          displayName = jsonResponse.displayName;
          account_Sid = jsonResponse.account_Sid;
          api_Key = jsonResponse.api_Key;
          api_Secret = jsonResponse.api_Secret;
          userType = jsonResponse.userType;
      }); return eventID, identity, displayName, userType;
  }

  function joinStream() {
    const addLocalVideo = async () => {
      const track = await Twilio.Video.createLocalVideoTrack({
          audio : true,
          video : 320,
          width: 160,
          height: 120
        });
      const video = playVideo.firstElementChild;
      playVideo.appendChild(track.attach());
    };

    playContainer.style.display = "block";
    playHeader.innerText = "Attendee";
    playSubHeader.innerText = displayName + " - " + identity;
    playButton.style.display = "block";

    addLocalVideo();
  }
//        const connect = async ( displayName ) => {
//          const response = await fetch('/get_token', {
//            method: 'POST',
//            headers: {'Content-Type': 'application/json'},
//            body: JSON.stringify({'username': displayName}),
//          });
//          const data = await response.json();
//          room = await Twilio.Video.connect(data.token);
//          room.participants.forEach(participantConnected);
//          room.on('participantConnected', participantConnected);
//          room.on('participantDisconnected', participantDisconnected);
//          connected = true;
//          updateParticipantCount();
  //        console.log("connected now")
  //      };

function startRoom( eventID, identity, account_Sid, api_Key, api_Secret ) {
  previewHeader.innerText = "Host";
  previewSubHeader.innerText = eventID;
  joinButton.disabled = false;
  leaveButton.disabled = false;
  
// preview screen
  createLocalVideoTrack({
      audio : true,
      video : 640,
      width: 160,
      height: 120
    }).then(videoTrack => {
      previewVideo.appendChild(videoTrack.attach());
    });  
}

  joinButton.onclick = () => {  
    let token = "";
    token = createToken( eventID, identity, account_Sid, api_Key, api_Secret );
    connect( token, { 
      audio: true,
      name: eventID,
      video: { width: 640 }
    }).then(room => {
        console.log(`Successfully joined a Room: ${room.name}`);
        const localParticipant = room.localParticipant;
        console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);
        joinButton.disabled = true;
        joinButton.style.display = "none";
        endButton.style.display = "block";
      });
  }
  playButton.onclick = () => {
    playButton.style.display = "none";
    clearButton.style.display = "block";
  }

  clearButton.onclick = () => {
    playVideo.style.display = "none";
    clearButton.style.display = "none";
    playIcon.style.display = "block";
  }; 

  endButton.onclick = () => {
    previewVideo.style.display = "none";
    console.log('leave room');
    joinButton.style.display = "none";
    endButton.style.display = "none";
    leaveButton.style.display = "block";       
  }

  leaveButton.onclick = () => {
    leaveButton.style.display = "none";
    previewIcon.style.display = "block";
  }         
