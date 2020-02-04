document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded");

    fetchDogs();

});


function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        console.log(json);
        displayDogs(json)
    });

}


function displayDogs(dogs) {
    const dog_bar = document.getElementById("dog-bar");
    dogs.forEach(dog => {
        createDogCard(dog);
        
    });
}

function createDogCard(dog) {
    const dog_bar = document.getElementById("dog-bar");
    const dog_span = document.createElement("SPAN");
    dog_span.innerText = dog.name;
    dog_span.addEventListener("click", () => showDog(dog));
    dog_bar.appendChild(dog_span);

}

function showDog(dog) {
    console.log("Show Dog");
    const dog_info = document.getElementById("dog-info");
    dog_info.innerHTML = "";

    const img = document.createElement("img");
    img.src = dog.image;

    const h2 = document.createElement("h2");
    h2.innerText = dog.name;

    const button = document.createElement("button");

    let status = "";
    if(dog.isGoodDog == true) {
        console.log("isGood");
        status = "Good Dog!"
    } else {
        status = "Bad Dog!"
    }

    button.innerText = status;
    button.addEventListener("click", () => changeDogStatus(dog));

    dog_info.appendChild(img);
    dog_info.appendChild(h2);
    dog_info.appendChild(button);

}


function changeDogStatus(dog) {
    if(dog.isGoodDog == true) {
        dog.isGoodDog = false;
    } else {
        dog.isGoodDog = true;
    }
    
    console.log(`Clicked on ${dog.name}' status`);

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"

        },
        body: JSON.stringify(dog)  
    }).then((res) => {
        return res.json();
    })
    .then((dog) => showDog(dog))


}