const { BrowserWindow, app } = require("electron").remote;
const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const fs = require("fs");

const directory = app.getPath("userData") + "/";
const file = "update.asar";

const store = new Store();

const LAUNCHER_VERSION = 1;

if (!store.get("channel")) {
    store.set("channel", "STABLE");
}

store.set("launcher_version", LAUNCHER_VERSION);

function splashText(text) {
    anime({
        targets: ".splash-message",
        easing: "linear",
        opacity: 0,
        duration: 500
    }).finished.then(() => {
        if (text !== null) {
            document.querySelector(".splash-message").innerHTML = text;

            anime({
                targets: ".splash-message",
                easing: "linear",
                opacity: 1,
                duration: 500
            });
        }
    });
}

function fileExists(file) {
    try {
        return fs.existsSync(file);
    } catch (e) {
        console.error(e);
        return false;
    }
}

function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

async function update() {
    splashText("Checking for updates.");

    try {
        const updates = await (await fetch("https://api.casterlabs.co/v1/caffeinated/updates")).json();
        const launcher = updates["launcher-" + LAUNCHER_VERSION];
        const channel = launcher[store.get("channel")];

        console.log(launcher);

        if ((store.get("protocol_version") < channel.protocol_version) || !fileExists(directory + file)) {
            splashText("Update found! Downloading update");

            console.log("Downloading update to " + directory + file);

            ipcRenderer.send("download-update", {
                url: channel.asar_url,
                directory: directory,
                target: file
            });
        } else {
            splashText("You're up-to-date! 😄");
            await sleep(2000);
            splashText(null);
            await sleep(1000);
            ipcRenderer.send("load", {
                directory: directory,
                target: file
            });
        }
    } catch (e) {
        let left = 5;

        console.log(e);

        setTimeout(update, 6500);

        while (left > 0) {
            splashText(`Update failed, retrying in ${left} seconds.`);

            left--;

            await sleep(1000);
        }

        splashText(null);
    }
}
