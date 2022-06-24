'use strict';
  require('dotenv').load();
  //const fs = require("fs");
  const userFile = require('./userFile.json');

  const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
  const AccessToken = require('twilio').jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const twilioAccountSid = "ACc69d00af99171ab03e90e5011747f9d5";
  const twilioApiKey = "SK9d565e42549d33f38c6636d237db14c6";
  const twilioApiSecret = "XU7Dk6ebqE6JIXGjXXUfce3DhxCohbW9";

  var eventID;
  var identity;
  
  let tokenID = "";

  function createToken( eventID, identity ) {
    const videoGrant = new VideoGrant({
      room: eventID
    });

    const token = new AccessToken (
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
      {identity: identity}
    );
    token.addGrant(videoGrant);
    tokenID = token.toJwt();
    return tokenID;
  }
  
module.exports = { createToken };
