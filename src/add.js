const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', (event) => {
    const win = remote.getCurrentWindow();
    win.close();
});

const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', () => {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value);

    const win = remote.getCurrentWindow();
    win.close();
});