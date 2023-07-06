"use strict"

const searchInputElement = document.querySelector("#coffee-search");

function renderCoffee(coffee) {
    // let coffeeImage = coffee.image ? coffee.image : "http://via.placeholder.com/150";
    let html = `
        <div class="col-6 coffee py-3">
            <div class="coffee-card d-flex gap-3">
                <h3>${coffee.name}</h3>
                <p>${coffee.roast}</p>
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

    console.log(userDropdownAddition);

    let coffee = {
        id: identifier,
        name: userSearchAddition,
        roast: userDropdownAddition,
    }

    identifier++;
    console.log(coffee);

    coffees.push(coffee);
    tbody.innerHTML = renderCoffees(coffees);

}








// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light', },
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

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
