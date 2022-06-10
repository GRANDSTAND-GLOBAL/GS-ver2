  'use strict';
    const AccessToken = require('twilio').jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    const twilioAccountSid = "ACc69d00af99171ab03e90e5011747f9d5";
    const twilioApiKey = "SK9d565e42549d33f38c6636d237db14c6";
    const twilioApiSecret = "XU7Dk6ebqE6JIXGjXXUfce3DhxCohbW9";
    let tokenID = "";

    const userID = {
         identityID : "",
         eventID : "",
         tokenID : ""
       };

   // let userIDs = [ userID ];
  function createToken( eventID, identity, displayName ) {
    const videoGrant = new VideoGrant({
      room: eventID
    });

    console.log ("index - display name:", displayName);
    console.log ("index - eventID:", eventID);
    console.log ("index - identity:", identity);

    const token = new AccessToken (
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
      {identity: identity}
    );

    token.addGrant(videoGrant);
    tokenID = token.toJwt();
    
    let userID = {
     identityID : identity,
      eventID : eventID,
      tokenID : tokenID
    };

    return tokenID;
  }

module.exports = { createToken };    