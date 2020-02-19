import Parse from 'parse'

Parse.initialize(process.env.VUE_APP_APP_ID);
Parse.serverURL = process.env.VUE_APP_SERVER_URL
Parse.liveQueryServerURL = 'ws://localhost:2337/';

Parse.LiveQuery.on('open', () => {
    console.log('socket connection established');
});
Parse.LiveQuery.on('close', () => {
    console.log('socket connection closed');
});
Parse.LiveQuery.on('error', (error) => {
    console.log(error);
});
console.log('[INFO] initated parse.com')