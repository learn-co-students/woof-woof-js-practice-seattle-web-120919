document.addEventListener("DOMContentLoaded", function() {
    getPups();
    filter();
})
// let filter = false; if filter = true, only show good dogs!

//new
function getPups() {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => showDogs(dogs))
    .catch(err => console.log(err))
}
//index
function showDogs(dogs){
    dogs.forEach(dog => showDog(dog))
}
//show
function showDog(dog){
    const dogBar = document.getElementById("dog-bar")
    const li = document.createElement("span")
    li.innerHTML = dog.name
    li.addEventListener("click", () => dogCard(dog))

    dogBar.appendChild(li)
}
//create card
function dogCard(dog){
    const dogInfo = document.getElementById("dog-info")
    dogInfo.textContent = " "

    const img = document.createElement("img")
    img.src = dog.image

    const name = document.createElement("h2")
    name.textContent = dog.name

    //"Good Dog!" or "Bad Dog!" based on isGoodDog boolean. 
    const button = document.createElement("button")
    button.id = "toggle-btn"
    button.textContent = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    button.addEventListener("click", () => toggle(dog))

    dogInfo.appendChild(img)
    dogInfo.appendChild(name)
    dogInfo.appendChild(button)
}

// update: PATCH
// button text toggles between Good and Bad
// persist to API, pup object's updated isGoodDog value!
function toggle(dog){
    const button = document.getElementById("toggle-btn")
    dog.isGoodDog = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(updateDog => dogCard(updateDog))
    .catch(err => console.log(err))
}

// Button text toggles "Filter good dogs: OFF" to "Filter good dogs: ON"
// Filter "ON", only shows pups where isGoodDog = true. 
// Filter is "OFF", shows all pups (like normal).
function filterDog(dogs){
    const filterBtn = document.getElementById("good-dog-filter")
    filterBtn.addEventListener("click", () => {
        filterBtn.innerText === "Filter good dogs: OFF"? 
        filterBtn.innerText = "Filter good dogs: ON" : filterBtn.innerText = "Filter good dogs: OFF"
    })
}

// create array of ALL dogs (filter "OFF") to show when you Un-filter
