const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const electronDl = require("electron-dl");
const fs = require("fs");
const DecompressZip = require("decompress-zip");

const directory = app.getPath("userData") + "/update/";
const file = "app.asar";

function createWindow() {
    const windowState = windowStateKeeper({
        defaultWidth: 700,
        defaultHeight: 500,
        file: "main-window.json"
    });

    function getAppArgs() {
        return {
            minWidth: 700,
            minHeight: 500,
            width: windowState.width,
            height: windowState.height,
            x: windowState.x,
            y: windowState.y,
            transparent: false,
            resizable: true,
            backgroundColor: "#141414",
            icon: __dirname + "/media/app_icon.png",
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                webSecurity: false
            }
        }
    }

    const mainWindow = new BrowserWindow(getAppArgs());

    function loadUpdatedFile() {
        const appWindow = new BrowserWindow(getAppArgs());

        if (mainWindow.webContents.isDevToolsOpened()) {
            appWindow.webContents.openDevTools();
        }

        mainWindow.destroy();

        console.log(`Loading ${directory}${file}`);

        appWindow.loadFile(`${directory}${file}/index.html`);
        windowState.manage(appWindow);
    }

    ipcMain.on("download-update", async (event, { url, deps }) => {
        console.log(`Downloading update from ${url} to ${directory}${file}`);

        try {
            fs.unlinkSync(directory);
        } catch (ignored) { }

        await electronDl.download(mainWindow, url, {
            directory: directory,
            filename: file
        });

        if (deps) {
            console.log(`Downloading dependencies from ${deps} to ${directory}deps.zip`);

            await electronDl.download(mainWindow, deps, {
                directory: directory,
                filename: "deps.zip"
            });

            const unzipper = new DecompressZip(directory + "deps.zip");

            unzipper.on("error", (e) => {
                console.error(e);
            });

            unzipper.on("extract", () => {
                loadUpdatedFile();
            });

            console.log(`Unzipping dependencies from ${directory}deps.zip to ${directory}`);

            unzipper.extract({
                path: directory,
                restrict: false
            });
        } else {
            loadUpdatedFile();
        }
    });

    ipcMain.on("download-file", async (event, { url, dir, filename }) => {
        console.log(`Downloading file from ${url} to ${dir}${filename}`);

        try {
            fs.unlinkSync(dir + filename);
        } catch (e) {
            console.error(e);
        }

        await electronDl.download(mainWindow, url, {
            directory: dir,
            filename: filename
        });
    });

    ipcMain.on("load-update", loadUpdatedFile);

    ipcMain.on("load-web", (event, { url }) => {
        const webWindow = new BrowserWindow(getAppArgs());

        if (mainWindow.webContents.isDevToolsOpened()) {
            webWindow.webContents.openDevTools();
        }

        mainWindow.destroy();

        console.log(`Loading ${url}`);

        webWindow.loadURL(url);
        windowState.manage(webWindow);
    });

    // and load the updater/launcher
    mainWindow.loadFile(__dirname + "/index.html");
    windowState.manage(mainWindow);
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
