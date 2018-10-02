const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const path = require('path');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
const price = document.querySelector('h1');
const targetPrice = document.getElementById('targetPrice');
let targetPriceVal;
const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
};

getBTC = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {            
            const cryptos = res.data.BTC.USD;
            //console.log('axios promise: ' + cryptos.toLocaleString('en'));
            price.innerHTML = '$' + cryptos.toLocaleString('en');

            if (targetPrice.innerHTML !== '' && targetPriceVal < cryptos) {
                // const myNotification = new Notification(notification.title, notification);
                alert(`${notification.body}`);
            }
        });        
}

getBTC();
setInterval(getBTC, 10000);

notifyBtn.addEventListener('click', (event) => {
    let win = new BrowserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        width: 400,
        height: 200
    });
    win.on('close', () => {
        win = null;
    })
    win.loadFile('src/add.html');
    win.show();
});

ipc.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});