
var APP_ID = 'D1CB1742-A4A3-44B9-9E7F-126D14BAB34B';
var USER_ID = 'test1';
var TOKEN = 'f22ab76e171974de6b87166a43a0e6d6e5899e2a';
var ENTRYPOINT = 'https://api-D1CB1742-A4A3-44B9-9E7F-126D14BAB34B.sendbird.com/v3/bots';

var sb;

class UI {
    drawBotList(bots) {
        const li = document.createElement('li');
        for (const item of bots) {
            li.className = 'list-group-item';
            li.innerHTML = item;    
        };
        if (bots.length === 0) {
            li.className = 'list-group-item';
            li.innerHTML = 'You have no bots';    
        }
        document.getElementById('botList').appendChild(li);
    }
}

var ui = new UI();

function init() {
    sb = new SendBird({appId: APP_ID});
    sb.connect(USER_ID, function(user, error) {
        if (error) {
            console.log('Error connecting to sendbird'); 
            console.dir(error);
            return;
        } else {
            console.log('You are connected now');
            getBotList();
        }
    });
}

async function getBotList() {
    const response = await axios.get(ENTRYPOINT, {
        headers: { 
            "Api-Token": TOKEN,
            'Content-Type': 'application/json'
        }
    });
    const data = response.data
    console.dir(data);
    ui.drawBotList(data.bots);
}


init();
