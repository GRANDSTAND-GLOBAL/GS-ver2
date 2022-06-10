  'use strict';
    const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
    
    const { createToken, tokenID } = require('./getAuth.js');

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

    const Twilio = require('twilio-video');

    const identity = "marc@gmail.com";
    const eventID = "EVENT_ID_Room_Name";
    const displayName = "Bob";

    let token = "";

    token = createToken( eventID, identity, displayName );
    //userIDs.push(userID)

    headerVideo.innerText = "Attendee";
    pageHeader.innerText = "Host";

    console.log ("++display name:", displayName);
    console.log ("++eventID:", eventID);
    console.log ("++identity:", identity);
    console.log ("++token:", token);

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
      
      connect(token, { 
            audio: true,
            name: eventID,
            video: { width: 640 }
        }).then(room => {
                console.log(`Successfully joined a Room: ${room.name}`);
                const localParticipant = room.localParticipant;
                console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);
//              videoRoom = room;
                console.log("participant connected");
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
