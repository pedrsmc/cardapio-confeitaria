const showCartBtn = document.getElementById("show-cart-btn")
const modal = document.getElementById("modal")
const closeCartBtn = document.getElementById("close-btn")
const itemCounter = document.getElementById("item-counter")
const cartItems = document.getElementById("cart-items")
const totalPrice = document.getElementById("total-price")
const addressInput = document.getElementById("address")
const checkoutBtn = document.getElementById("checkout-btn")
const warning = document.getElementById("warning")

let cart = []

showCartBtn.addEventListener('click', function () {
    updateCartModal()
    modal.style.display = "flex"
})

closeCartBtn.addEventListener('click', function () {
    modal.style.display = "none"

    addressInput.classList.remove("border-red-500")
    warning.classList.remove("flex")
    warning.classList.add("hidden")
})

menu.addEventListener('click', function (event) {
    let parentBtn = event.target.closest(".add-to-cart-btn")

    if (parentBtn) {
        const name = parentBtn.getAttribute("data-name")
        const price = parseFloat(parentBtn.getAttribute("data-price"))

        addToCart(name, price)
    }
})

function scrollBar() {
    if (cart.length > 4) {
        cartItems.classList.add("overflow-x-hidden")
        cartItems.classList.add("overflow-y-scroll")
        cartItems.classList.add("pr-2")
        cartItems.classList.add("md:pr-7")
    } else {
        cartItems.classList.remove("overflow-x-hidden")
        cartItems.classList.remove("overflow-y-scroll")
        cartItems.classList.remove("pr-2")
        cartItems.classList.remove("md:pr-7")
    }
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            name: name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

function updateCartModal() {
    if (cart.length === 0) {
        cartItems.innerHTML = "Nenhum produto foi adicionado ao carrinho..."
    } else {
        cartItems.innerHTML = ""
        scrollBar()
    }

    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")

        cartItemElement.innerHTML = `
            <div>
                <div class="flex justify-between items-center">
                     <div class="flex flex-col gap-2">
                        <p class="font-bold">${item.name}</p>
                        <p>Quantidade: ${item.quantity}</p>
                        <p class="font-bold">R$ ${item.price.toFixed(2)}</p>
                     </div>
                        
                    <div>
                        <button class="remove-item-btn" data-name="${item.name}">
                            Remover
                        </button>
                    </div>
                </div>
            </div>
        `
        cartItems.appendChild(cartItemElement)

        total += item.price * item.quantity
    })

    itemCounter.textContent = cart.length
    totalPrice.textContent = total.toLocaleString("pt-BR", {

        style: "currency",
        currency: "BRL"

    })

}

cartItems.addEventListener('click', function (event) {
    if (event.target.classList.contains("remove-item-btn")) {
        const name = event.target.getAttribute("data-name")

        removeFromCart(name)
    }
})

function removeFromCart(itemName) {
    const index = cart.findIndex(item => item.name === itemName);

    console.log(cart[index])

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener('input', function (event) {
    let inputValue = event.target.value

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        warning.classList.remove("flex")
        warning.classList.add("hidden")
    }
})

checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) return

    if (addressInput.value === "") {
        warning.classList.remove("hidden")
        warning.classList.add("flex")
        addressInput.classList.add("border-red-500")
        return
    }

    checkRestaurantOpen()
})

function checkRestaurantOpen() {
    const date = new Date()

    if (date.getHours() < 9 || date.getHours() > 17) {
        alert("Desculpe, o restaurante não está aberto este horário.")
    } else {
        alert("Pedido enviado a confeitaria. Obrigado!")
        cleanAll()
    }

}

function cleanAll() {
    while(cart.length != 0) {
        cart.pop();
    }

    updateCartModal()
}
