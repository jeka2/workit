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

let searchBarResults = document.querySelector('.search-results');
let foodResultContainer = document.querySelector('.result-container');
let nutritionDate = document.getElementById('nutrition-date');
let nutritionMessage = document.querySelector('.nutrition-message');

let imageContainer = document.querySelector('.food-image-container');
let nutritionInfoContainer = document.querySelector('.nutrition-info-container');

const foodsOfDay = document.querySelector('.foods-of-day-container');
let daysItemsUl = document.querySelector('.day-items');


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
    if (searchBarResults.innerHTML !== '') searchBarResults.innerHTML = '';
});

function init() {
    let observer = new IntersectionObserver(Food.loadInitialContent.bind(Food));
    observer.observe(nutritionSection);
}

class Food {
    constructor(name, cal, pro, chol, sod, sug, carb, fat, serv_qty, serv_unit, photo, thumb, id) {
        this.name = name;
        this.calories = cal;
        this.protein = pro;
        this.cholesterol = chol;
        this.sodium = sod;
        this.sugar = sug;
        this.carbs = carb;
        this.fat = fat;
        this.serv_qty = serv_qty;
        this.serv_unit = serv_unit;
        this.photo = photo;
        this.thumb = thumb;
        this.id = id;
    }


    displayInfo(e) {
        nutritionMessage.classList.add('hidden');
        if (e?.target.classList.contains('remove-button')) return;
        const foodImage = document.createElement('img');
        foodImage.src = this.photo;
        foodImage.alt = this.name + ' photo';

        imageContainer.innerHTML = "";
        imageContainer.appendChild(foodImage);

        this.buildDomInfo(nutritionInfoContainer)
    }

    buildDomInfo(container) {
        container.innerHTML = "";
        let node;
        let nodeText;

        Object.getOwnPropertyNames(this).forEach(key => {
            if (key === 'photo' || key === 'thumb' || key === 'id') return
            else if (key === 'serv_qty') nodeText = `Serving Quantity: ${this[key]}`;
            else if (key === 'serv_unit') nodeText = `Serving Unit: ${this[key]}`;
            else if (key === 'name') nodeText = this[key].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            else nodeText = key.charAt(0).toUpperCase() + key.slice(1) + `: ${this[key]}`;

            node = document.createElement(key === 'name' ? 'h3' : 'h4');
            node.innerText = nodeText;

            container.appendChild(node);
        });

        const addButton = document.createElement('button');
        addButton.classList.add('add-to-list');
        addButton.innerText = "Add To List"
        addButton.addEventListener('click', this.addToNutrition.bind(this));

        container.appendChild(addButton);
    }

    addToNutrition(e) {
        e.preventDefault();

        const isDuplicate = Utilities.checkDuplicate(this.constructor.todaysNutrition, this, 'id');
        let method;
        if (isDuplicate) method = 'PATCH';
        else method = 'POST';

        this.makePostApiRequest(method)
    }

    removeFromNutrition() {
        const position = this.closest('.day-item').getAttribute('data-element');
        const foodToRemove = Food.todaysNutrition.splice([Food.todaysNutrition.length - position - 1], 1)[0];
        console.log(foodToRemove)
        foodToRemove.makePostApiRequest('DELETE');
    }

    makePostApiRequest(method) {
        const idParam = method.toLowerCase() === 'post' ? '' : this.id;
        const url = new URL(`http://localhost:3000/foods/${idParam}`);

        const options = {};

        if (method.toLowerCase() !== 'delete') {
            options['day'] = this.constructor.selectedDate;
            options['foods'] = this;
            url.searchParams.append("data", JSON.stringify(options));
        }
        fetch(url, { method })
            .then(res => res.json())
            .then(res => Utilities.displayFlash(res.message, res.type))
            .then(status => this.constructor.populateUIOfDay(this.constructor.selectedDate))
            .catch(err => console.log(err))
    }

    addToDaysStackUI(index) {
        let name;
        let li;
        let thumb;
        let macroSection;
        let picked;
        let p;
        let mainSection;
        let removeButton;

        li = document.createElement('li');
        li.classList.add('day-item', `day-item-${index + 1}`);
        li.setAttribute('data-element', index);

        li.addEventListener('click', this.displayInfo.bind(this), false);

        name = document.createElement('h4');
        name.innerText = this.name;

        thumb = document.createElement('img');
        thumb.src = this.thumb;

        macroSection = document.createElement('div');
        macroSection.classList.add('macro-section');

        picked = (({ calories, protein, carbs, fat }) => ({ calories, protein, carbs, fat }))(this);

        Object.keys(picked).forEach(function (key) {
            p = document.createElement('p');
            p.innerText = key.charAt(0).toUpperCase() + key.slice(1) + `: ${picked[key]}`;

            macroSection.appendChild(p);
        })

        mainSection = document.createElement('div');
        mainSection.classList.add('main-section');

        removeButton = document.createElement('button');
        removeButton.innerText = 'X';
        removeButton.classList.add('remove-button');

        console.log(this)

        removeButton.addEventListener('click', this.removeFromNutrition);

        mainSection.appendChild(thumb);
        mainSection.appendChild(name);
        mainSection.appendChild(removeButton);

        li.appendChild(mainSection);
        li.appendChild(macroSection);

        daysItemsUl.appendChild(li);
    }

    updateDaysItemUI() {

    }

    static searchResults = []; // Search results from searchbar
    static currentlyViewed = null; // Currently selected item
    static todaysNutrition = [];
    static selectedDate = new Date();
    static contentLoaded = false;

    static clearUI() {
        imageContainer.innerHTML = '';
        nutritionInfoContainer.innerHTML = '';
        daysItemsUl.innerHTML = '';
    }

    static coerceToFoodObject(food) {
        return new Food(food.name, food.calories, food.protein, food.cholesterol, food.sodium, food.sugar, food.carbs, food.fat, food.serv_qty, food.serv_unit, food.photo, food.thumb, food.id)
    }

    static getItemsFromDay(date) {
        date = Utilities.getBeginningOfDay(new Date(date));
        const url = new URL('http://localhost:3000/foods');
        const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
        const params = {
            day: day,
            month: month,
            year: year,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url).then(data => data.json());
    }

    static createDayInstances(items) {
        console.log(items)
        this.todaysNutrition = [];
        let newInstance;
        items.forEach(food => {
            newInstance = new Food(food.name, food.calories, food.protein, food.cholesterol, food.sodium, food.sugar, food.carbs, food.fat, food.serv_qty, food.serv_unit, food.photo, food.thumb, food.id);

            this.todaysNutrition.push(newInstance);
        });

        return new Promise((res, rej) => {
            if (this.todaysNutrition.length === 0) {
                this.clearUI();
                rej(new Error('No Items For The Day Yet'));
            }
            else res(this.todaysNutrition)
        });
    }

    static appendItemsFromDay(foods) {
        this.clearUI();
        foods.slice().reverse().forEach((food, index) => { food.addToDaysStackUI(index); });
        return new Promise(res => res(this.todaysNutrition[this.todaysNutrition.length - 1]));
    }


    static getSearchbarResults(query) {
        const url = new URL('http://localhost:3000/foods/search');
        const params = { query: query }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url).then(data => data.json())
    }

    static getFullNutrition(name) {
        const formattedName = name.split(' ').join('_');
        const url = new URL(`http://localhost:3000/foods/${formattedName}`);
        return fetch(url).then(data => data.json())
    }

    static createInstanceFromApi(object) {
        const nutritionalData = object.results.foods[0];
        console.log(nutritionalData);
        const [name, cal, pro, chol, sod, sug, carb, fat, serv_qty, serv_unit, photo, thumb] = [nutritionalData['food_name'], nutritionalData['nf_calories'], nutritionalData['nf_protein'], nutritionalData['nf_cholesterol'], nutritionalData['nf_sodium'], nutritionalData['nf_sugars'], nutritionalData['nf_total_carbohydrate'], nutritionalData['nf_total_fat'],
        nutritionalData['serving_qty'], nutritionalData['serving_unit'], nutritionalData['photo']['highres'], nutritionalData['photo']['thumb']];

        const newItem = new Food(name, cal, pro, chol, sod, sug, carb, fat, serv_qty, serv_unit, photo, thumb);

        Food.currentlyViewed = newItem;

        return new Promise((res, rej) => res(newItem))
    }

    static loadInitialContent(e) {
        if (e[0].isIntersecting && !this.contentLoaded) {
            this.contentLoaded = true;
            this.populateUIOfDay(new Date());
            this.setDate(new Date());
        }
    }

    static populateUIOfDay(day) {
        this.getItemsFromDay(day)
            .then(items => this.createDayInstances(items.foods))
            .then(daysFoods => this.appendItemsFromDay(daysFoods))
            .then(lastItem => lastItem.displayInfo())
            .catch(err => {
                nutritionMessage.classList.remove('hidden');
                nutritionMessage.innerText = err.message;
            })
    }

    static setDate(date) {
        nutritionDate.valueAsDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);

        nutritionDate.addEventListener('change', (e) => {
            this.selectedDate = Utilities.getBeginningOfDay(e.target.value);
            this.populateUIOfDay(this.selectedDate);
        });
    }
}

const flash = document.querySelector('.flash');

class Utilities {
    static displayFlash(message, type) {
        flash.classList.remove('hidden');
        flash.innerText = message;

        setTimeout(this.hideFlash, 3000);

        return new Promise((res, rej) => {
            if (type === 'success') res(true)
            else rej(new Error(`${message}`));
        })
    }

    static hideFlash() {
        flash.innerText = "";
        flash.classList.add('hidden');
    }

    static checkDuplicate(objects, object, category) {
        let duplicate = false;
        objects.forEach(o => {
            if (o[category] === object[category]) { duplicate = true; }
        })
        return duplicate;
    }

    static getBeginningOfDay(date) {
        let timeZoneOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
        return new Date(Date.parse(date) + timeZoneOffset);
    }
}

// Nutrition Section

let timeout;

// On searchbar entry, autofil by query and fetch full nutritional info
const populateResultInfo = function (query) {
    if (query.replace(/\s+/g, '') == '') return
    Food.getSearchbarResults(query)
        .then(foodInfo => addToSearchResults(foodInfo))
        .then(results => appendResultsToSearchbar(results))
        .catch(err => Utilities.displayFlash(err.message, 'error'));

    function addToSearchResults(res) {
        Food.searchResults = [];
        const commonItems = res.results.common; // Common as opposed to branded
        const maxResultQuantity = 5;
        const resultQuantity = commonItems.length > maxResultQuantity ? maxResultQuantity : commonItems.length;
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
        searchBarResults.innerHTML = "";
        let li;
        let thumbnail;
        let name;
        res.forEach((el, index) => {
            li = document.createElement('li');
            li.classList.add('search-result', `result-${index + 1}`);
            li.setAttribute('data-element', index);

            thumbnail = document.createElement('img');
            thumbnail.classList.add('search-thumb');
            thumbnail.src = el.thumbnail;

            name = document.createElement('p');
            name.innerText = el.name;

            li.appendChild(thumbnail);
            li.appendChild(name);

            searchBarResults.appendChild(li);
        });
    }

}

foodBar.addEventListener('keyup', function (e) {
    e.preventDefault();
    const query = e.target.value;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(populateResultInfo, 1000, query);
});

searchBarResults.addEventListener('click', e => {
    const elementNumber = e.target.closest('.search-result').getAttribute('data-element');
    const queryName = Food.searchResults[elementNumber].name;
    Food.getFullNutrition(queryName)
        .then(res => Food.createInstanceFromApi(res))
        .then(foodInstance => foodInstance.displayInfo())
})