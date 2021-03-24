const sectionContainer = document.querySelector('.section-navigation');
const sectionNavs = document.querySelectorAll('.nav');
const allSections = sectionContainer.children;

const nutritionSection = document.getElementById('nutrition');
const exerciseSection = document.getElementById('exercise');
const waterSection = document.getElementById('water');

const nutritionLink = document.querySelector('.nutrition-link');
const exerciseLink = document.querySelector('.exercise-link');
const waterLink = document.querySelector('.water-link');

const loginModal = document.getElementById('login-modal');
const formContents = document.querySelector('.form-contents');

const userIcon = document.querySelector('.user-info');

const foodBar = document.querySelector('.food-searchbar');

document.addEventListener('DOMContentLoaded', init);

sectionNavs.forEach(section => {
    section.addEventListener('mouseover', blurNavbar);
    section.addEventListener('mouseout', unblurNavbar);
});


function blurNavbar(e) {
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

var trend = document.getElementById('trendChart');
var myLineChart = new Chart(trend, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
            {
                label: "Prime and Fibonacci",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx = document.getElementById('nutritionDaily');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Nutrition',
            data: [12, 19, 3, 5, 100, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

ctx.addEventListener('click', function (e) {
    const activePoints = myChart.getElementsAtEventForMode(e, 'point', myChart.options);
    const firstPoint = activePoints[0];
    const label = myChart.data.labels[firstPoint._index];
    const value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
    alert(label + ": " + value);
});

trend.addEventListener('click', function (evt) {
    var firstPoint = myLineChart.getElementAtEvent(evt)[0];
    myLineChart.data.labels.pop();
    myLineChart.update();
});

// Login

userIcon.addEventListener('click', function (e) {
    userIcon.classList.remove('hidden');
    userIcon.insertAdjacentElement('afterEnd', div)
});

document.addEventListener('click', function (e) {
    const modalShown = loginModal && !loginModal.classList.contains('hidden');
    if (modalShown && !e.target.closest('.form-contents')) {
        loginModal.classList.add('hidden');
    }
});

function init() {

}

class Food {
    constructor(name, calories, protein, carbs, fat, id) {

    }

    populateInfo() {

    }

    static get todaysItems() {
        const today = new Date();
        const todaysDay = today.getDate();
        const todaysMonth = today.getMonth() + 1;
        const todaysYear = today.getFullYear();

        this.getItemsFromDay(todaysDay, todaysMonth, todaysYear);
    }

    static searchResults = []; // Search results from searchbar

    static set results(items) {
        this.searchResults = [];
        items.forEach(item => {
            this.searchResults.push(item);
        })
    }

    static appendItemsToBar() {
        foodBar.appendChild()
    }

    static getItemsFromDay(day, month, year) {
        const url = new URL('http://localhost:3000/foods');
        const params = {
            day: day,
            month: month,
            year: year,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(data => data.json())
            .then(res => console.log(res))
    }

    static getSearchbarResults(query) {
        const url = new URL('http://localhost:3000/foods/search');
        const params = { query: query }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url).then(data => data.json())
    }
}

// Nutrition Section

let timeout;

const populateSearchbar = function (query) {
    Food.getSearchbarResults(query)
        .then(res => addToSearchResults(res))
        .then(res => appendResultsToSearchbar(res))

    function addToSearchResults(res) {
        Food.searchResults = [];
        const resultQuantity = 5;
        const commonItems = res.results.common; // Common as opposed to branded
        const results = commonItems.slice(0, resultQuantity);

        const resultPromise = new Promise(function (res, rej) {
            results.forEach(record => {
                let searchBarInfo = {
                    name: record.food_name,
                    thumbnail: record.photo.thumb
                }
                Food.searchResults.push(searchBarInfo);
            })
            res(Food.searchResults);
        })
        return resultPromise;
    }

    function appendResultsToSearchbar(res) {
        let ul = document.createElement('ul');
        ul.classList.add('search-results');
        let li;
        let thumbnail;
        let name;
        res.forEach((el, index) => {
            li = document.createElement('li');
            li.classList.add('search-result', `result-${index + 1}`);

            thumbnail = document.createElement('img');
            thumbnail.classList.add('search-thumb');
            thumbnail.src = el.thumbnail;

            name = document.createElement('p');
            name.innerText = el.name;

            li.appendChild(thumbnail);
            li.appendChild(name);

            ul.appendChild(li);
        });

        foodBar.insertAdjacentElement('afterEnd', ul);

    }
}

foodBar.addEventListener('keyup', function (e) {
    e.preventDefault();
    const query = e.target.value;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(populateSearchbar, 1000, query);
});