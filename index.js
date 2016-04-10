'use strict';
const electron = require('electron');
const Menu = require('menu');
const app = electron.app;


// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const template = [{
		label: 'Dimension Tool',
		submenu: [{
			label: 'About Dimension Tool',
			selector: 'orderFrontStandardAboutPanel:'
		}, {
			label: 'Quit',
			accelerator: 'Command+Q',
			selector: 'terminate:'
		}]
	}];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		minWidth: 250,
		minHeight: 100,
		titleBarStyle: 'hidden'
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
