const $ = (r) => document.getElementById(r);

const observables = [
    Symbol("streamer"),
    Symbol("category")
]

let state = {
    observing: observables[0]
}

function changeObserving() {
    state.observing = observables[(observables.indexOf(state.observing) + 1) % observables.length];

}

async function queryStorage() {
    const table = $("table");
    const cat = state.observing.description;

    table.innerHTML = `
        <tr id="topRow">
            <th>${cat}</th>
            <th>[hh:mm:ss]</span></th>
        </tr>
    `;

    let storage = await (browser.storage.local.get());

    let storageArr = [];
    for (let entry in storage)
        if (entry.startsWith(cat))
            storageArr.push([entry.split(cat.slice(2) + "-")[1], storage[entry]]);

    storageArr.sort((a, b) => b[1] - a[1]);

    for (let row in storageArr) {
        let key = storageArr[row][0];
        let val = storageArr[row][1];

        let [hrs, mins, secs] = formatTime(val);

        table.innerHTML += `
            <tr>
                <td nowrap style="max-width:10em;overflow:hidden">${key}</td>
                <td style="text-align:right">${hrs}:${mins}:${secs}</td>
            </tr>
        `;
    }
}

function formatTime(val) {
    let hrs = Math.floor(val / 3600);
    let mins = Math.floor((val - hrs * 3600) / 60);
    let secs = val - hrs * 3600 - mins * 60;

    if (hrs < 10)
        hrs = "0" + hrs;

    if (mins < 10)
        mins = "0" + mins;

    if (secs < 10)
        secs = "0" + secs;

    return [hrs, mins, secs];
}

const btn = $("btn-switcher");
btn.onclick = () => {
    btn.innerText = "Switch to " + state.observing.description;
    changeObserving();
    queryStorage();
};

queryStorage();