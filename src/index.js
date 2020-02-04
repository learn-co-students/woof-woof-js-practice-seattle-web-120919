document.addEventListener("DOMContentLoaded", function (){
    fetchPups()
    dogFilter()
})
const dogBar = document.getElementById("dog-bar")
const dogInfo = document.getElementById("dog-info")
const dogFilterButton = document.getElementById("good-dog-filter")
let filter = false

function dogFilter(){
  dogFilterButton.addEventListener("click", function(){
      filter = !filter
      if (filter == false){
        dogFilterButton.innerText = "Filter good dogs: OFF"
    } else (
        dogFilterButton.innerText = "Filter good dogs: ON"
    )
    fetchPups()
  })
}

function fetchPups(){
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(data => listPups(data))
}

function listPups(pups){
  while (dogBar.hasChildNodes()) {
      dogBar.removeChild(dogBar.firstChild)
  }
  if (filter == false) {
    pups.map(pup => {
        let span = document.createElement("span")
        span.innerText = pup.name
        span.addEventListener("click", function(){
          makePupCard(pup)
        })
        dogBar.appendChild(span)
    })
  } else {
    pups.filter(pup => pup.isGoodDog == true).map(pup => {
        let span = document.createElement("span")
        span.innerText = pup.name
        span.addEventListener("click", function(){
          makePupCard(pup)
        })
        dogBar.appendChild(span)
    })
  }


  function makePupCard(pup) {
    let div = document.createElement("div")
        div.className = "card"
        let img = document.createElement("img")
        img.src = pup.image
        let name = document.createElement("h2")
        name.innerText = pup.name
        let button = document.createElement("button")
        if (pup.isGoodDog) {
            button.innerText = "Good Dog!"
        } else {
            button.innerText = "Bad Dog!"
        }
        button.addEventListener("click", function(){
          toggleDoggo(pup)
        })

        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(button)
        dogInfo.replaceChild(div, dogInfo.firstChild)
  }

  function toggleDoggo(pup){
    pup.isGoodDog = !pup.isGoodDog
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(pup)
    })
    .then(res => res.json())
    .then(data => makePupCard(data))
  }
}

