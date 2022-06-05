// find out if there is a streamer being watched
function scrapeStatus() {
    return (
        // check if stream is live
        (document.querySelectorAll('svg[type="color-text-accessible-red"]').length === 1) &&
        // check if the audio is not disabled
        (document.querySelectorAll('[id^="player-volume-slider"]')[0].value > 0) &&
        // check if the stream is playing
        (document.getElementsByClassName("player-overlay-background--darkness-5").length == 0)
    )
}

// get streamer name and category name
function scrapeInfo() {
    const streamer = "streamer-" + document.title.split(") ")[document.title.split(") ").length - 1].split(" -")[0];
    const category = "category-" + document.getElementsByClassName("CoreText-sc-cpl358-0 deWlGg")[0].textContent;

    return [streamer, category]
}

// check if watching and act accordingly
async function check() {
    try {
        // if the requirements are met, update local storage
        if (scrapeStatus()) {
            const [streamer, category] = scrapeInfo();

            const secs = await browser.storage.local.get({ [streamer]: 0, [category]: 0 });
            browser.storage.local.set({ [streamer]: secs[streamer] + 5, [category]: secs[category] + 5 });
        }
    } catch {  }
}

(async function main() {
    setInterval(check, 5000);
})()
