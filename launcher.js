const { app } = require("electron").remote;
const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const fs = require("fs");

const store = new Store();

const LAUNCHER_VERSION = 1;

if (!store.get("channel")) {
    store.set("channel", "STABLE");
}

store.set("launcher_version", LAUNCHER_VERSION);

function splashText(text, flash = true) {
    if ((text !== null) && !flash) {
        document.querySelector(".splash-message").innerHTML = text;
    } else {
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
}

function fileExists() {
    const directory = app.getPath("userData") + "/";
    const file = "update.asar";

    try {
        return fs.existsSync(directory + file);
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

        if ((store.get("protocol_version") < channel.protocol_version) || !fileExists()) {
            splashText("Update found! Downloading update");

            ipcRenderer.send("download-update", {
                url: channel.asar_url
            });
        } else {
            splashText("You're up-to-date! 😄");
            await sleep(2000);
            splashText(null);
            await sleep(1000);
            ipcRenderer.send("load", {});
            console.log("Told renderer to load new file!");
        }
    } catch (e) {
        let left = 5;

        console.log(e);

        setTimeout(update, 6500);

        while (left > 0) {
            splashText(`Update failed, retrying in ${left} seconds.`, false);

            left--;

            await sleep(1000);
        }

        splashText(null);
    }
}
