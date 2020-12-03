const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const electronDl = require("electron-dl");

function createWindow() {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 700,
        defaultHeight: 500,
        file: "main-window.json"
    });

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        minWidth: 700,
        minHeight: 500,
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        transparent: false,
        resizable: true,
        backgroundColor: "#141414",
        icon: __dirname + "/media/app_icon.png",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    ipcMain.on("download-update", async (event, { directory, target, url }) => {
        console.log(`Downloading update from ${url} to ${directory}`);

        await electronDl.download(mainWindow, url, {
            directory: directory,
            filename: target
        });

        mainWindow.loadFile(directory + target + "/index.html");
    });

    // and load the updater/launcher
    mainWindow.loadFile(__dirname + "/index.html");

    mainWindowState.manage(mainWindow);
}

// Disable web cache.
app.commandLine.appendSwitch("disable-http-cache");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
})

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

app.disableHardwareAcceleration();