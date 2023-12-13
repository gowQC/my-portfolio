//JS for cart
let cart = document.getElementById('cartSidebar');
let itemsList = document.getElementById('itemsList');
let displaySubTotal = document.getElementById('displaySubTotal');
let subTotal = 0.00;
let btnID = 0; // used to assign id's to newly made button elements

function cartVisible () {
    if(window.getComputedStyle(cart).visibility == "hidden") {
        cart.style.animationName = "slideLeft";
        cart.classList.add("showCart");
        //if invisible, turn visible
    }

    else {
        cart.style.animationName = "slideRight";

        setTimeout(() => {
            cart.classList.remove("showCart");
        },1000); //delay used to let animation play out
        //if visible, turn back to default which is invisible
    }
}

function addItem (id) {
    //remove starter message if added to cart
    if (itemsList.firstElementChild.innerHTML == "Your cart is empty... Change that!") {
        itemsList.removeChild(itemsList.firstElementChild);
    }
    
    let clickedBtn = document.getElementById(id); //gets id of button
    let quantity = parseFloat(clickedBtn.parentElement.childNodes[3].value); //gets respective option value 
    let price = parseFloat(clickedBtn.parentElement.childNodes[5].innerHTML.replace('$','')); //gets unique price
    let itemTotal = quantity * price; // unique quantity x price

    subTotal = subTotal + itemTotal; // checkout price

    let newItem = document.createElement('div'); //item to be added
    let newItemButton = document.createElement('button'); //the button to be added to the new div
    newItemButton.setAttribute("onclick", "removeItem(id)");//add onclick to new button
    newItemButton.setAttribute("value", itemTotal)
    newItemButton.setAttribute("id", btnID);
    btnID++; //not the best solution to giving buttons ids, will EVENTUALLY fail, but would take unrealistically long time
    newItemButton.innerHTML = '<i class="fa-solid fa-xmark fa-lg"></i>';//add icon the button
    newItem.innerHTML = quantity + "x " + clickedBtn.parentElement.parentElement.childNodes[1].innerHTML + " $" + itemTotal.toFixed(2);
    newItem.appendChild(newItemButton);
    itemsList.appendChild(newItem);
    displaySubTotal.innerHTML = "$" + subTotal.toFixed(2);

    //alert item added
    alert(quantity + "x " + clickedBtn.parentElement.parentElement.childNodes[1].innerHTML + " added to cart!");
}

//can try function(this) instead of id approach
//example: http://www.java2s.com/example/javascript/dom/remove-parent-element-with-elementparentnoderemove.html

function removeItem (id) { 
    //record button id + itemPrice, subtract it, refresh checkout total
    let clickedBtn = document.getElementById(id); //gets id of button
    let itemTotal = parseFloat(clickedBtn.value); //retains quantity x price as value, which is parsed to float
    subTotal = Math.abs(subTotal - itemTotal);
    displaySubTotal.innerHTML = "$" + subTotal.toFixed(2);

    //remove item
    clickedBtn.parentNode.remove();

    //add back starter message if nothings in cart
    if (itemsList.childElementCount == 0) {
        let starterDiv = document.createElement('div');
        starterDiv.innerHTML = "Your cart is empty... Change that!";
        itemsList.appendChild(starterDiv);
    }

    //alert item removal
    alert("Removed item from cart.");
}

function checkout(){
    //remove every element from itemsList
    while (itemsList.firstChild) {
        itemsList.removeChild(itemsList.lastChild);
    }

    //display alert message successful checkout
    alert("You have successfully checked out! Enjoy your food!")

    //reset subtotal
    subTotal = 0.00;
    displaySubTotal.innerHTML = "$0.00";

    //insert default message again
    if (itemsList.childElementCount == 0) {
        let starterDiv = document.createElement('div');
        starterDiv.innerHTML = "Your cart is empty... Change that!";
        itemsList.appendChild(starterDiv);
    }
}
//end of JS for cart

//JS for menu
const menuCategories = ["Cookies", "Brownies", "Drinks"];
let index = 0;
let mc = document.querySelector('#menuCategory');
mc.innerHTML = menuCategories[0]; //sets default menu when loading page to cookies menu

//variables for current menu visibility
let cookiesVis = document.querySelector('.cookiesMenu');
let browniesVis = document.querySelector('.browniesMenu');
let drinksVis = document.querySelector('.drinksMenu');

//apply animations to menus
cookiesVis.style.animationName = "fade-in";
browniesVis.style.animationName = "fade-in";
drinksVis.style.animationName = "fade-in";

//var to set default of indexIndicator on first category
let dotVis = document.querySelector('.indexIndicator');
dotVis.childNodes[1].classList.add("indexCurrent");

function changeMenuLeft() {
    index--;
    if(index == -1) { //lets it move from index 0 to 3
        index = 2;
    }
    //moves current menuCategory to left
    document.getElementById('menuCategory').innerHTML = menuCategories[index];
    changeMenuItems(index);
}

function changeMenuRight () {
    index++;
    if(index == 3){ //lets it move from index 3 to 0
        index = 0;
    }
    //moves current menuCategory to right
    document.getElementById('menuCategory').innerHTML = menuCategories[index];
    changeMenuItems(index);
}

function changeMenuItems(index) {
    if (index == 0) { 
        //only cookies menu visible, others not displayed
        cookiesVis.classList.remove("invisible");
        browniesVis.classList.add("invisible");
        drinksVis.classList.add("invisible");
        //updates indexIndicator to cookies
        dotVis.childNodes[1].classList.add("indexCurrent");
        dotVis.childNodes[3].classList.remove("indexCurrent");
        dotVis.childNodes[5].classList.remove("indexCurrent");
    }

    if (index == 1) { 
        //only brownies menu visible, others not displayed
        cookiesVis.classList.add("invisible");
        browniesVis.classList.remove("invisible");
        drinksVis.classList.add("invisible");
        //updates indexIndicator to brownies
        dotVis.childNodes[1].classList.remove("indexCurrent");
        dotVis.childNodes[3].classList.add("indexCurrent");
        dotVis.childNodes[5].classList.remove("indexCurrent");
    }

    if (index == 2) { 
        //only drinks menu visible, others not displayed
        cookiesVis.classList.add("invisible");
        browniesVis.classList.add("invisible");
        drinksVis.classList.remove("invisible");
        //updates indexIndicator to drinks
        dotVis.childNodes[1].classList.remove("indexCurrent");
        dotVis.childNodes[3].classList.remove("indexCurrent");
        dotVis.childNodes[5].classList.add("indexCurrent");
    }
}
//end of JS for menu

//JS for article container
const articleContainer = document.getElementById('articleContainer');
const articleButtonLeft = document.getElementById('articleBtnLeft');
const articleButtonRight = document.getElementById('articleBtnRight');
let myInterval;

//left button
articleButtonLeft.addEventListener("mousedown", function () {
    myInterval = setInterval(function () {
        articleContainer.scrollLeft -= 7;
    }, 11)
});

articleButtonLeft.addEventListener("mouseup", function () {
    clearInterval(myInterval);
})

//right button
articleButtonRight.addEventListener("mousedown", function () {
    myInterval = setInterval(function () {
        articleContainer.scrollLeft += 7;
    }, 11)
});

articleButtonRight.addEventListener("mouseup", function () {
    clearInterval(myInterval);
})