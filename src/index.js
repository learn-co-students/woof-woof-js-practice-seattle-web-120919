document.addEventListener("DOMContentLoaded", function() {
    getPups();
})

function getPups() {
    fetch(" http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => console.log(dogs))
    .catch(err => console.log(err))
}