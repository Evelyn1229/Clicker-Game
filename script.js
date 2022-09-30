let
    score = 0,
    clickScore = 1,
    idleScore = 1,
    upClickCost = 5,
    upIdleCost = 5,
    surpriseCount = 0,
    surpriseCost;
const
    ScoreColumn = document.getElementById("score"),
    ClickBtn = document.getElementById("click"),
    UpgradeClick = document.getElementById("up-click"),
    UpgradeIdle = document.getElementById("up-idle"),
    SurpriseBtn = document.getElementById("surprise-click"),
    StatusColumn = document.getElementById("status"),
    MessageColumn = document.querySelector(".msg-bars"),
    getSurpriseCost = () => (surpriseCount ? Math.round(Math.random() * 950) + 50 : Math.round(Math.random() * 50) + 50);

//
window.addEventListener("load", () => {
    surpriseCost = getSurpriseCost();

    updateScore();
    updateContents();
    setInterval(() => {
        score += idleScore;
        updateScore();
    }, 1000);
});

ClickBtn.onclick = () => {
    score += clickScore;
    updateScore();
};

UpgradeClick.onclick = () => {
    if (score < upClickCost) {
        return;
    }

    clickScore += 2;
    score -= upClickCost;
    upClickCost += 5;
    updateContents();
}

UpgradeIdle.onclick = () => {
    if (score < upIdleCost) {
        return;
    }

    idleScore += 2;
    score -= upIdleCost;
    upIdleCost += 5;
    updateContents();
}

SurpriseBtn.onclick = () => {
    if (score < surpriseCost) {
        return;
    }

    const surpriseFunction = Math.round(Math.random() * 4);

    surpriseCount++;
    score -= surpriseCost;
    surpriseCost = getSurpriseCost();
    surpriseEvent(surpriseFunction);
    updateContents();
    updateScore();
}

// Diff Functions Of Surprise
function surpriseEvent(num) {
    let content;

    switch (num) {
        case 0:
            score = 0; // Reset To 0 L
            content = "Reset Score."
            break;
        case 1:
            score = 0; // Reset To 0 L
            content = "Reset Score."
            break;
        case 2:
            score = Math.floor(Math.random() * 2501); // Score + 0 to 2500 Random
            content = `Set Score To ${score}.`
            break;
        case 3:
            upClickCost += Math.floor(Math.random() * 501); // upClickCost + 0 to 500 Random
            content = `Your Cost For Upgrade Per Click Was Increased To ${upClickCost}.`
            break;
        case 4:
            upIdleCost += Math.floor(Math.random() * 501); // upIdleCost + 0 to 500 Random
            content = `Your Cost For Upgrade Per Second Was Increased To ${upIdleCost}.`
            break;
        case 5:
            upClickCost -= Math.floor(Math.random() * 501); // upClickCost - 0 to 500 Random
            content = `Your Cost For Upgrade Per Click Was Decreased To ${upClickCost}.`
            break;
        case 6:
            upIdleCost -= Math.floor(Math.random() * 501); // upIdleCost - 0 to 500 Random
            content = `Your Cost For Upgrade Per Click Was Decreased To ${upIdleCost}.`
            break;
        case 7:
            upClickCost += 5000; // upClickCost + 5000 (Will Add On) 不用玩了
            content = `Your Cost For Upgrade Per Click Was Increased To ${upClickCost}.`
            break;
        case 8:
            upIdleCost += 5000; // upIdleCost + 5000 (Will Add On) 不用玩了
            content = `Your Cost For Upgrade Per Second Was Increased To ${upIdleCost}.`
            break;
        case 9:
            score -= Math.floor(Math.random() * 2501); // Score - 0 to 2500 Random
            content = `Your Score Was Decreased To ${score}`
            break;
        default: // Alan Told Me To Add A Default
            break;
    }
    updateContents();
    showMessageBar(content);
}

function updateScore() {
    ScoreColumn.innerHTML = score;
}

//
function updateContents() {
    StatusColumn.innerHTML = `Score per Click: ${clickScore}　|　Score per Second: ${idleScore} <br> Surprise Count: ${surpriseCount}`
    UpgradeClick.getElementsByTagName("text").item(0).innerHTML = `Cost: ${upClickCost}`;
    UpgradeIdle.getElementsByTagName("text").item(0).innerHTML = `Cost: ${upIdleCost}`;
    SurpriseBtn.getElementsByTagName("text").item(0).innerHTML = `Cost: ${surpriseCost}`;
}

// IMAGE SOURCE -> https://icons8.com/
// IMAGE SOURCE -> https://icons8.com/
// IMAGE SOURCE -> https://icons8.com/

// Show Surprise Message When Clicked -> It is kind of broken idk how to fix it I give up
function showMessageBar(content) {
    const message_div = document.createElement("div"); // Create
    const message_icon = document.createElement("img"); // Create
    const message_text = document.createElement("text"); // Create

    //setAttribute -> Set Value Of Attribute On Elements. Value Will Be Updated Of Element Already Exist.
    message_text.setAttribute("class", "msg-content"); // Assign
    message_text.innerHTML = content; // Surprise Content
    message_icon.setAttribute("class", "icon"); // Assign 
    message_icon.setAttribute("src", "./icon/exclamation-icon.png"); // Assign // IMAGE SOURCE -> https://icons8.com/
    message_div.setAttribute("class", "msg"); // Assign
    message_div.appendChild(message_icon);
    message_div.appendChild(message_text);
    MessageColumn.appendChild(message_div);
    message_div.classList.toggle("active"); // If

    //const timer = 3.5
    const timer = setTimeout(() => {
        MessageColumn.removeChild(message_div);
        clearTimeout(timer);
    }, 4000); // 4 second | 3.5 second
}
