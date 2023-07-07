"use strict"

const searchInputElement = document.querySelector("#coffee-search");

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'lightsaber'},
    {id: 2, name: 'Half City', roast: 'lightsaber'},
    {id: 3, name: 'Cinnamon', roast: 'lightsaber'},
    {id: 4, name: 'City', roast: 'mediumfalcon'},
    {id: 5, name: 'American', roast: 'mediumfalcon'},
    {id: 6, name: 'Breakfast', roast: 'mediumfalcon'},
    {id: 7, name: 'High', roast: 'darkvader'},
    {id: 8, name: 'Continental', roast: 'darkvader'},
    {id: 9, name: 'New Orleans', roast: 'darkvader'},
    {id: 10, name: 'European', roast: 'darkvader'},
    {id: 11, name: 'Espresso', roast: 'darkvader'},
    {id: 12, name: 'Viennese', roast: 'darkvader'},
    {id: 13, name: 'Italian', roast: 'darkvader'},
    {id: 14, name: 'French', roast: 'darkvader'},
];

(() => {
    let localStorageItem = localStorage.getItem("storedCoffee");
    if(localStorageItem){
        coffees.push(JSON.parse(localStorageItem));
    }
})()

function renderCoffee(coffee) {
    let coffeeImage = coffee.image ? coffee.image : "http://via.placeholder.com/150";
    let html = `
        <div class="col-6 coffee py-3">
            <div class="coffee-card d-flex gap-3">
                <h3>${coffee.name}</h3>
                <p>${coffee.roast} $4.99</p>
                <span class="top"></span>
                <span class="right"></span>
                <span class="bottom"></span>
                <span class="left"></span>
            </div>
        </div>
    `;
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = coffees;
    if (selectedRoast !== 'all') {
        filteredCoffees = filteredCoffees.filter(function (coffee){
            return coffee.roast.toLowerCase() === selectedRoast.toLowerCase();
        });
    }
    // search logic here
    tbody.innerHTML = renderCoffees(filteredCoffees);

}

function searchCoffees(input) {
    const dropdownValue = dropdown.value;
    const searchValue = searchInputElement.value;
    const coffeeSearchArray = [];
    coffees.forEach(function(coffee){
        if(coffee.name.toLowerCase().includes(searchValue) && dropdownValue === "all"){
            coffeeSearchArray.push(coffee);
        } else if (coffee.name.toLowerCase().includes(searchValue) && (coffee.roast.toLowerCase().includes(dropdownValue)))  {
            coffeeSearchArray.push(coffee);
        }
    })
    tbody.innerHTML = renderCoffees(coffeeSearchArray);

}

function addCoffees(e) {
    e.preventDefault();
    const userDropdownAddition = dropdownAddition.value;
    const userSearchAddition = document.querySelector('#coffee-addition').value.toLowerCase();


    let coffee = {
        id: identifier,
        name: userSearchAddition,
        roast: userDropdownAddition,
    }

    identifier++;
    coffees.push(coffee);
    let coffeeJSON = JSON.stringify(coffee);
    localStorage.setItem('storedCoffee', coffeeJSON);
    tbody.innerHTML = renderCoffees(coffees);

    // let restoredCoffee = localStorage.getItem(storedCoffee);
    // let coffeeObject = JSON.parse(restoredCoffee);
    // document.getElementById(coffeeObject).innerHTML = coffeeObject.name;
}

let tbody = document.querySelector('#coffees');
let dropdown = document.querySelector('#roast-selection');
let roastSelection = document.querySelector('#roast-selection');
let dropdownAddition = document.querySelector('#roast-addition');

let identifier = coffees.length + 1;

let submitButton = document.querySelector('#addition-submit');

submitButton.addEventListener('click', addCoffees);

searchInputElement.addEventListener('keyup', searchCoffees);

tbody.innerHTML = renderCoffees(coffees);

dropdown.addEventListener('change', updateCoffees);