const sectionContainer = document.querySelector('.section-navigation');
const sectionNavs = document.querySelectorAll('.nav');
const allSections = sectionContainer.children;

sectionNavs.forEach(section => {
    section.addEventListener('mouseover', blurNavbar);
    section.addEventListener('mouseout', unblurNavbar);
});


// document.addEventListener("DOMContentLoaded", init)

// function init() {
//     console.log("hi")
//     fetch("https://trackapi.nutritionix.com/v2/search/instant?query=chicken", {
//         method: "GET",
//         headers: {
//             "x-app-id": "377b6529",
//             "x-app-key": "3c3985db3d944fe1822c6a71c2b24f34",
//             "x-remote-user-id": 0
//         }
//     })
//         .then(r => r.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }

// function init() {
//     console.log("hi")
//     fetch("https://trackapi.nutritionix.com/v2/search/item?nix_item_id=56172a8a3f2ab4107b5c3593", {
//         method: "GET",
//         headers: {
//             "x-app-id": "377b6529",
//             "x-app-key": "3c3985db3d944fe1822c6a71c2b24f34",
//             "x-remote-user-id": 0
//         }
//     })
//         .then(r => r.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }

function blurNavbar(e) {
    console.log('hi')
    const section = e.target.closest('.nav');
    for (let i = 0; i < allSections.length; i++) {
        if (allSections[i] !== section) {
            allSections[i].classList.add('blurred');
        }
    }
}

function unblurNavbar(e) {
    for (let i = 0; i < allSections.length; i++) {
        if (allSections[i].classList.contains('blurred'))
            allSections[i].classList.remove('blurred');
    }
}