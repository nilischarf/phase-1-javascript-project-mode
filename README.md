Introduction
This project is a responsive e-commerce website for the Maybelline makeup company. It features data fetched from the Makeup API. The display of the website is a grid with photos, ratings, and descriptions. The user has the ability to filter by product type, search by product type, and add and remove products to and from their cart. This project is divided into three files: index.html which contains the structure of the website with attached links to the other two files. Style.css contains the code for the stylung of the website as it appears on the user's screen. It is responsible for the grid layout and display of the buttons and hover abilitie. The last file is index.js which contains all of the JavaScript code for the functionality of the website. 


In the index.js file, there are the following functions: 


Instructions
Firstly, the application starts with a DOMContentLoaded event listener to ensure that the application doesn't run until everything loads properly. Then, we fetch the data from the API so we can display it in the website. 

filterProductsByType() allows the user to select a type of makeup from the dropdown menu, and only products from that category will be displayed. If the user selects "all", which is also the default, all of the prodcuts will be displayed. The change event listener allows the products to change when the user changes their selection in the dropdown. 

searchProductsByType() allows the user to search for a type of makeup in te search bar. Only products from the queried category (or containing a word from the queried category) will be displayed. The submit event listener allows the products to change when the user submits their query in the search bar.

displayProducts() is responsible for displaying each item on the screen with the proper name, photo, price, rating, and descipriton in the overlay. It also gives the user the option to add an item to their cart.

addToCart() makes the product selected by the user appear in the cart if it is the first time the user selected that item with the proper name, price, and quantity of 1. If the user is adding a specific item to the cart and it is not the first time, the quantity of that item in the cart is updated. 

updateCart() adds or removes an item from the cart and updates the cart's total accordingly. 

removeFromCart() removes an item from the cart whether they are removing an item entirely or removing quantities of an item they will keep in their cart. 

Instructions
Clone the repository and open index.html in any browser to view the website. 

Resources
Makeup API - https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline