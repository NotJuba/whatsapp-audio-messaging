#!/usr/bin/node

const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');


const SESSION_FILE_PATH = './session.json';


const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});



client.on('authenticated', () => {
    console.log('AUTHENTICATED');
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    })
});


client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('READY');
    try {
        sendAudio();
        console.log("audio was sent succefully")
        
    } catch (error) {
        
    }


});





async function sendAudio() {
    try {
        const recipientNumber = "212638278510@c.us";
//        const voice = await MessageMedia.fromFilePath('audio.ogg');
        const voice = MessageMedia.fromFilePath('audio.ogg');
        await client.sendMessage(recipientNumber, voice, { sendAudioAsVoice: true });
    } catch (error) {
        console.error("Error sending audio:", error);
        console.log("\n\n\n")
    }
}



