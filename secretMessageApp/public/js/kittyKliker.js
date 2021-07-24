console.log(sessionStorage.getItem("username"));
const username = sessionStorage.getItem("username");
const klikyPik = document.querySelector("#klikyPik");
const scoreArea = document.getElementById("scoreplace");
let userObject;
let score = 0;

if (!sessionStorage.getItem("username")) {
    window.location.href("kittyKlikerLogin.html");
}

function getUserScore() {
    const messagesRef = firebase.database().ref()
    messagesRef.on('value', (snapshot) => {
        const users = snapshot.val();
        for (user in users) {
            if (users[user].message === username) {userObject = users[user]}
        }
    });
    if (userObject.score) {
        return userObject.score;
    } else {
        return 0;
    }
}

function updateUserScore(score) {
    const messagesRef = firebase.database().ref()
    let tempPass, userKey;
    messagesRef.on('value', (snapshot) => {
        const users = snapshot.val();
        for (user in users) {
            if (users[user].message === username) {
                userKey = user;
                tempPass = users[user].passcode;
            }
        }
    });
    messagesRef.child(userKey).set({
        'message': username,
        'passcode': tempPass,
        'score': score
    });
}

function addToScore() {
    let score = getUserScore(username);
    score++;
    scoreArea.innerHTML = `<p class="is-3">Score: ${score}</p>`;
    console.log(score);
    if (score >= 30) {
        klikyPik.src = "https://cdn.glitch.com/62ef8055-b4cd-42ce-8785-d3f468f93f4d%2Fsproutcap.png?v=1627084296013";
    } else if (score >= 15) {
        klikyPik.src = "https://cdn.glitch.com/62ef8055-b4cd-42ce-8785-d3f468f93f4d%2Fsproutfrog.png?v=1627084291549";
    }
    updateUserScore(score);
}

klikyPik.addEventListener("click", e => {
    addToScore();
})

// function leaderboardUpdate(){
//     let messagesRef = firebase.database().ref()
//     let userScores = {};
//     messagesRef.on('value', (snapshot) => {
//         const users = snapshot.val();
//         for (user in users) {
//             if (users[user].score) {
//                 userScores[users[user].message] = users[user].score;
//             }
//         }
//     });
//     messagesRef.child("leaderboard").set({
//         userScores
//     });
//     console.log(userScores);
//     for (user in userScores) {
//         document.getElementById("column2").innerHTML += `<li id="1st"> <strong>${score}</strong> &emsp; with score of ${userScores[user]}</li>`;        
//     }
//     setTimeout(leaderboardUpdate, 5000);
// }

// leaderboardUpdate();

{/* document.getElementById("column2") += `<ol>
            <li id="1st"> <strong>${username}</strong> &emsp; with score of ${score}</li>
            <li id="2st"> <strong>${username}</strong> &emsp; with score of ${score}</li>
            <li id="3rd"><strong>${username}</strong> &emsp; with score of ${score}</li>
            <li id="4th"><strong>${username}</strong> &emsp; with score of ${score}</li>
            <li id="5th"><strong>${username}</strong> &emsp; with score of ${score}</li> */}