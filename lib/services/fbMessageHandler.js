const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'EAAG3tUsE0ZA4BAIjSWESAOuahH9Yy6bsPakmsspK6d4R8QRP67FAY8FJKstEwdZCZBxCLq3IsaqV0YG6q33pZArbFZAh5cn5aC1wYONAWgDW28VHVhWWk61nWWaZC7PvDfsKYrdyZA55BJw9nHmq4ZAKkZAic1txMeEIFz4eGncsg3QZDZD';

  function handleMessage(sender_psid, received_message) {
    let response;
    
    // Checks if the message contains text
    if (received_message.text) {    
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
      }
    } else if (received_message.attachments) {
      // Get the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = getResponseTemplate();
      response.attachment.payload.elements[0].image_url = attachment_url;
    } 
    
    // Send the response message
    callSendAPI(sender_psid, response);    
  }
  
  function handlePostback(sender_psid, received_postback) {
     let response;
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
  }
  
  function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }

  function getResponseTemplate() {
    return {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": "",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
  }

  module.exports = {
    handleMessage,
    handlePostback
  }