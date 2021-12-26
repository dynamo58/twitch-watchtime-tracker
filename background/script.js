const DEBUGGING = false;

async function check() {
    function scrapeStatus() {
        // check if stream is live
        // check if the audio is not disabled
        // check if the stream is playing
        return (
            (document.querySelectorAll('svg[type="color-text-accessible-red"]').length === 1) &&
            (document.querySelectorAll('[id^="player-volume-slider"]')[0].value > 0) &&
            (document.getElementsByClassName("player-overlay-background--darkness-5").length == 0)
        )
    }

    function scrapeInfo() {
        const streamer = "streamer-" + document.title.split(") ")[document.title.split(") ").length - 1].split(" -")[0];
        const category = "category-" + document.body.querySelector('[data-a-target="stream-game-link"]').href.split("/")[5].replaceAll("%20", " ").replaceAll("%26", "&").replaceAll("%3A", ":");

        return [streamer, category]
    }

    try {
        // if the requirements are met, update local storage
        if (scrapeStatus()) {
            const [streamer, category] = scrapeInfo();

            const secs = await browser.storage.local.get({ [streamer]: 0, [category]: 0 });
            browser.storage.local.set({ [streamer]: secs[streamer] + 5, [category]: secs[category] + 5 });
        }
    }
    catch (err) {
        console.log("[w-t] | error:\n", err);
    }
}

(async function main() {
    setInterval(check, 5000);
})()