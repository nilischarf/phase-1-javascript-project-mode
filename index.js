let allProducts = []
    document.addEventListener('DOMContentLoaded', () => {
        const cart = []
        const productList = document.getElementById('product-list')
        const cartItems = document.getElementById('cart-items')
        const totalSpan = document.getElementById('total')

        fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
            .then(response => response.json())
            .then(products => {
                allProducts = products
                displayProducts(allProducts)
            })
            .catch(error => {
                console.error("Error fetching products:", error)
            })
    
        function filterProductsByType(type) {
            if (type === 'all') {
                displayProducts(allProducts)
            } else {
                const filteredProducts = allProducts.filter(product => product.product_type === type)
                displayProducts(filteredProducts)
            }
        }

        document.getElementById('product-type').addEventListener('change', (e) => {
            const selectedType = e.target.value
            filterProductsByType(selectedType)
        })

        function searchProductsByType(type) {
            const query = document.getElementById('search-bar').value.toLowerCase()
            const filteredProducts = allProducts.filter(product => 
                    product.product_type && product.product_type.toLowerCase().includes(query))
                        displayProducts(filteredProducts)
            query.value = ''
        }

        document.getElementById('search-form').addEventListener('submit', (e) => {
            e.preventDefault()
            const chosenType = e.target.value
            searchProductsByType(chosenType)
        })
        
        function displayProducts(products) {
            productList.innerHTML = ''

            products.forEach(product => {
                const productDiv = document.createElement('div')
                productDiv.className = 'product'
                
                productDiv.innerHTML = `
                    <div class="image-container">
                        <img src="${product.image_link}" alt="${product.name}"> 
                        <div class="description-overlay">
                            <p>${product.description ? product.description : "No Description Available"}</p>
                        </div>
                    </div>
                    <span><strong>${product.name}</strong></span>
                    <span>$${product.price}</span>
                    <span>Rating: ${product.rating ? product.rating + "/5": "No Rating"}</span>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                `
                productList.appendChild(productDiv)
            })
        
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', e => {
                    const productId = e.target.getAttribute('data-id')
                    const productName = e.target.getAttribute('data-name')
                    const productPrice = parseFloat(e.target.getAttribute('data-price'))
                    addToCart(productId, productName, productPrice)
                })
            })
        }
        
        function addToCart(productId, productName, price) {
            const existingItem = cart.find(item => item.id === productId)
            if (existingItem) {
                existingItem.quantity++
            } else {
                cart.push({ id: productId, name: productName, price: price, quantity: 1 })
            }
            updateCart()
        }
    
        function updateCart() {
            cartItems.innerHTML = ""
            let total = 0

            cart.forEach(item => {
                total += item.price * item.quantity

                const cartItem = document.createElement('div')
                cartItem.className = 'cart-item'
                cartItem.innerHTML = `
                    <span>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                `
                cartItems.appendChild(cartItem) 
            })
            totalSpan.textContent = total.toFixed(2)

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', e => {
                    const productId = e.target.getAttribute('data-id')
                    removeFromCart(productId)
                })
            })
        }

        function removeFromCart(productId) {
            const itemIndex = cart.findIndex(item => item.id === productId)
            if (itemIndex > -1) {
                cart[itemIndex].quantity--
                if (cart[itemIndex].quantity === 0) {
                    cart.splice(itemIndex, 1)
                }
                updateCart()
            }
        }
})
