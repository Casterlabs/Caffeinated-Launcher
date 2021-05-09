const { BrowserWindow, app } = require("electron").remote;
const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const fs = require("fs");

const store = new Store();

const LAUNCHER_VERSION = 4;

if (!store.get("channel")) {
    store.set("channel", "STABLE");
}

if (!store.get("protocol_version")) {
    store.set("protocol_version", -1);
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
    const file = app.getPath("userData") + "/update/app.asar";

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
        const launcher = updates["launcher-" + LAUNCHER_VERSION] || updates["launcher-1"];
        let channel = launcher[store.get("channel")];

        if (!channel) {
            console.warn("Invalid channel: " + store.get("channel"));
            store.set("channel", "STABLE");
            channel = launcher["STABLE"];
        }

        console.log(channel);

        if (channel.web_url) {
            ipcRenderer.send("load-web", {
                url: channel.web_url
            });
        } else if ((store.get("protocol_version") < channel.protocol_version) || !fileExists()) {
            splashText("Update found! Downloading update");

            ipcRenderer.send("download-update", {
                url: channel.asar_url,
                deps: channel.deps_url
            });
        } else {
            splashText("You're up-to-date! 😄");
            await sleep(2000);
            splashText(null);
            await sleep(1000);
            ipcRenderer.send("load-update", {});
            console.log("Told renderer to load new file!");
        }
    } catch (e) {
        let left = 15;

        console.log(e);

        splashText(`Update failed, retrying in ${left} seconds.`);

        setTimeout(update, (left * 1000) + 750);

        while (left > 0) {
            await sleep(1000);

            left--;

            splashText(`Update failed, retrying in ${left} seconds.`, false);
        }

        splashText(null);
    }
}
