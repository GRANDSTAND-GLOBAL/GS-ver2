  'use strict';
    const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
    
    const { createToken } = require('./getAuth.js');
    const fs = require("fs");
    const fsPromises = fs.promises;

    const userFile = require('./userFile.json');
    const Twilio = require('twilio-video');
    
    const pageHeader = document.getElementById("page-header");
    const joinButton = document.getElementById("btn-start");
    const leaveButton = document.getElementById("btn-end");
    const clearButton = document.getElementById("btn-att-end");
    const modalCtrl = document.querySelector(".ctrl")
    const headerVideo = document.getElementById("hdr-host");
    const headerVideoA = document.getElementById("hdr-attendee");
    const displayIcon = document.getElementById("att-icon");
    const modalVideo = document.querySelector(".modal");
    const modalAtt = document.querySelector(".att");

    let eventID = "";
    let identity = "";
    let displayName = "";
  
    getUser();
    joinButton.onclick = () => {
      startRoom();
    }

    function getUser() {
      fetch('./userFile.json')
      .then(response => response.json())
      .then(jsonResponse => {
          eventID = jsonResponse.eventID;
          identity = jsonResponse.identity;
          displayName = jsonResponse.displayName;
        });

      }

function startRoom() {
    let token = "";

    token = createToken( eventID, identity );
    
    headerVideo.innerText = eventID;
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
        modalVideo.style.display = "none";
          console.log('leave room');
          modalCtrl.style.display = "none";
          modalAtt.style.display = "block";
          headerVideoA.innerText = displayName;
          pageHeader.innerText = "Attendee";
          leaveButton.disabled = true;        
    }

    clearButton.onclick = () => {
        displayIcon.style.display = "block";
        }
      }
