'use strict';
    const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
    
    const { createToken } = require('./getAuth.js');
    const fs = require("fs");
    const fsPromises = fs.promises;

    const userFile = require('./userFile.json');
    const Twilio = require('twilio-video');
    
    const pageHeader = document.getElementById("page-header");
    const getStartedButton = document.getElementById("btn-start-sync");
    const joinButton = document.getElementById("btn-start");
    const leaveButton = document.getElementById("btn-end");
    const clearButton = document.getElementById("btn-att-end");
    const btnCtrl = document.querySelector(".ctrl");
    const subHeader = document.getElementById("sub-header");
    const displayIcon = document.getElementById("display-icon");
    const hostVideo = document.querySelector(".host");

    let eventID = "";
    let identity = "";
    let displayName = "";
    let userType = '';
    getStartedButton.style.display = "block";  

    getUser();

    getStartedButton.onclick = () => {
      getStartedButton.style.display = "none";
      joinButton.style.display = "block"; 
      leaveButton.style.display = "block";
      clearButton.style.display = "none";
      console.log ("userType", userType);
      if ( userType == "Host" ) {
       startRoom();
      } else {
        joinRoom();
      }
    }

function getUser() {
  fetch('./userFile.json')
    .then(response => response.json())
    .then(jsonResponse => {
        eventID = jsonResponse.eventID;
        identity = jsonResponse.identity;
        displayName = jsonResponse.displayName;
        userType = jsonResponse.userType;
    });
  }
  function joinRoom() {    
    pageHeader.innerText = "Attendee";
    subHeader.innerText = displayName;
  }

function startRoom() {
  let token = "";
  token = createToken( eventID, identity );
  
  pageHeader.innerText = "Host";
  subHeader.innerText = eventID;

// preview screen
  createLocalVideoTrack({
    audio : true,
    video : 640,
    width: 160,
    height: 120
  }).then(videoTrack => {
      hostVideo.appendChild(videoTrack.attach());
    });  

  joinButton.disabled = false;
  clearButton.disabled = false;

  joinButton.onclick = () => {  
      connect( token, { 
        audio: true,
        name: eventID,
        video: { width: 640 }
      }).then(room => {
          console.log(`Successfully joined a Room: ${room.name}`);
          const localParticipant = room.localParticipant;
          console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);
          joinButton.disabled = true;
        });
    }

  leaveButton.onclick = () => {
    hostVideo.style.display = "none";
    console.log('leave room');
    pageHeader.innerText = "Attendee";
    subHeader.innerText = displayName;
    joinButton.style.display = "none";
    leaveButton.style.display = "none";
    clearButton.style.display = "block";       
  }

  clearButton.onclick = () => {
    displayIcon.style.display = "block";
    clearButton.style.display = "none";  
    btnCtrl.style.display = "none";
  }          
}
