  'use strict';
  const userFile = require('./userFile.json');
  const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');
  const AccessToken = require('twilio').jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  function createToken( eventID, identity, account_Sid, api_Key, api_Secret ) {

    var eventID;
    var identity;
    var account_Sid;
    var api_Key;
    var api_Secret;
    let tokenID = "";
    
    const videoGrant = new VideoGrant({
      room: eventID
    });

    const token = new AccessToken (
        account_Sid,
        api_Key,
        api_Secret,
      {identity: identity}
    );

    token.addGrant(videoGrant);
    tokenID = token.toJwt();
    return tokenID;
  }
  
module.exports = { createToken };
