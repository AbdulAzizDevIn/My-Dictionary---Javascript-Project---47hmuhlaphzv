
let button = document.getElementById("btn2");
let card = document.getElementById("card");
let saveItem = document.querySelector("#save-item");
let sound = document.getElementById("sound");

let searches = [];
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

    searches.push({Word:inputWord,meaning:data[0].meanings[0].definitions[0].definition})
    localStorage.setItem("search",JSON.stringify(searches))
  })
  .catch(()=>{
    card.innerHTML = "<h4>Couldn't Find The Word</h4>"
  })
})
function playSound(){
  sound.play();
}
new1 = document.getElementsByClassName("new")
localStorage.setItem("name2","aziz")
let his = localStorage.getItem("name2")
function renderSearch(){
  new1.innerHTML = "";
  his.forEach((searchTerm)=>{
    const li = document.createElement("li")
    li.innerHTML = searchTerm;
    new1.appendChild(li);
    console.log("hi")
  })
}
renderSearch();

