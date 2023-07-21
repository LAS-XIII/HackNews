const url = "https://hacker-news.firebaseio.com/v0/";

let array = [];
let arrayofThings = [];
let testo = "";
let counter = 10;

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

async function callData() {
    const response = await fetch(url + "newstories.json?print=pretty");
    const data = await response.json();
    for (let i = 0; i<counter; i++) {
        const eachResponse = await fetch(url + "item/"+(data[i])+".json");
        const eachData = await eachResponse.json();
        arrayofThings.push(eachData);
    }    
    arrayofThings.forEach((data) => {
        let timestamp = data["time"];
        let formattedDate = formatTimestamp(timestamp * 1000);
        testo +=
        `
            <div class="card">
                <h2 class="title cardElement">${data["title"]}</h2>
                <p class="time cardElement">${formattedDate}</p>
                <a class="description cardElement" target="blank" ${data["url"]!=undefined ? 'href="'+data["url"]+"'" : ""} target="blank">${data["url"]!=undefined ? "Click the link for more information" : "link non disponibile"}</a>
            </div>
        `;
        array.shift()
    })
    const page = document.querySelector(".page");
    const news = document.createElement("div");
    news.classList.add("news");
    news.innerHTML = testo;
    page.append(news);   
    const loading = document.querySelector(".loading");
    loading.style.display = "none";
    const content = document.querySelector(".container");
    content.style.display = "block";
    document.querySelector(".loadMore").style.display = "none";
    document.querySelector(".doMore").style.display="flex";
}

callData()

function buttonClick() {
    testo= "";
    arrayofThings.length = 0;
    document.querySelector(".loadMore").style.display = "flex";
    callData();
}


window.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector(".doMore");
    button.addEventListener("click", ()=> {
        button.style.display="none";
        buttonClick();
    });

})
