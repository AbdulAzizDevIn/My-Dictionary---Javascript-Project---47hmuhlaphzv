
let button = document.getElementById("btn2");
let card = document.getElementById("card");
let saveItem = document.querySelector("#save-item");
let sound = document.getElementById("sound");

button.addEventListener("click",()=>{
  let inputWord = document.getElementById("input-Word").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
  .then((response) => response.json())
  .then((data) => {
    card.innerHTML = `<div>Word : <span>${inputWord}</span></div>
    <div id="details">${data[0].meanings[0].partOfSpeech}</div>
    <button onclick="playSound()">
        <i id="play" class="fa-solid fa-volume-high"></i>
    </button>
    <div>Defination : <span>${data[0].meanings[0].definitions[0].definition}</span></div>
    `;
    sound.setAttribute("src", `${data[0].phonetics[0].audio}`);

    localStorage.setItem(`${inputWord}`,`${data[0].meanings[0].definitions[0].definition}`)
  })
  .catch(()=>{
    card.innerHTML = "<h4>Couldn't Find The Word</h4>"
  })
})

function playSound(){
  sound.play();
}

const historybtn = document.getElementById("historybtn");
const historyPage = document.querySelector(".historyPage");
const main = document.querySelector(".main")

historybtn.addEventListener("click",()=>{
  if(historybtn.innerText == "HISTORY"){
    document.querySelector(".search").style.display = "none";
    card.style.display = "none";
    historyPage.style.display = "flex";
    if(localStorage.length == 0){
      historyPage.innerHTML = "<div class = 'empty'><img src='https://cdn-icons-png.flaticon.com/512/1380/1380641.png' alt='image'><span>No Search Found</span></div>";

    }
    historybtn.innerHTML = "SEARCH";
    document.querySelector(".name").innerText = "My DICTIONARY App History";
    for(let i=0; i<localStorage.length; i++){
      if(localStorage.key(i) == "count"){
        continue;
      }
      let div = document.createElement("div");
      div.setAttribute("class","newDiv");
      div.innerHTML = `<span>Word: <span class="getdata">${localStorage.key(i)}</span></span>
      <br>
      <p>${localStorage.getItem(localStorage.key(i))}</p>
      <i onclick="deleteDiv(this)" id="dlt" class="fa-solid fa-trash"></i>`;
      historyPage.appendChild(div);
    }
  }
  else if(historybtn.innerText == "SEARCH"){
    document.querySelector(".name").innerText = "My DICTIONARY App";
    historyPage.innerHTML = "";
    historyPage.style.display = "none";
    document.querySelector(".search").style.display = "flex";

    card.style.display = "block";
    historybtn.innerText = "HISTORY";

  }
})

function deleteDiv(currentEl){
  let key = currentEl.parentElement.querySelector(".getdata").innerText;
  currentEl.parentElement.remove();

  localStorage.removeItem(key);
}


