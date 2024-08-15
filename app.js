const products = [{
        "image": {
            "thumbnail": "/images/image-waffle-thumbnail.jpg",
            "orginal": "/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "image": {
            "thumbnail": "/images/image-creme-brulee-thumbnail.jpg",
            "orginal": "/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "image": {
            "thumbnail": "/images/image-macaron-thumbnail.jpg",
            "orginal": "/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "image": {
            "thumbnail": "/images/image-tiramisu-thumbnail.jpg",
            "orginal": "/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "image": {
            "thumbnail": "/images/image-baklava-thumbnail.jpg",
            "orginal": "/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "image": {
            "thumbnail": "/images/image-meringue-thumbnail.jpg",
            "orginal": "/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "image": {
            "thumbnail": "/images/image-cake-thumbnail.jpg",
            "orginal": "/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "/images/image-brownie-thumbnail.jpg",
            "orginal": "/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "/images/image-panna-cotta-thumbnail.jpg",
            "orginal": "/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
]
const deserts = document.getElementById('deserts')
const basket = document.getElementById('basket')
const basket2 = document.getElementById('basket2')
const basctn = document.getElementById('basctn')
const contentjs = document.getElementById('content-js')
const submitOrder = document.getElementById('submit-order')
let basProducts = []
let order = 0
let boos = 0
show()

function show() {
    for (let i = 0; i < products.length; i++) {
        let element = products[i];
        deserts.innerHTML += `
         <div  class="des">
                    <img id="b${i}" class="des-img" src=".${element.image.orginal}" alt="">
                    <div class="bos">
                        <div id="o${i}" onclick="push(${i})" class="addto">
                            <img src="./images/icon-add-to-cart.svg" alt="">
                            <span>Add to card</span>
                        </div>
                        <div id="j${i}"  style="background-color: #ca3a0f;" class="addto ds-n">
                            <button onclick="increase('${element.category}',-1,${i})"><img src="./images/icon-decrement-quantity.svg" alt=""></button>
                            <span id="q${i}" style="color: #fff;">1</span>
                            <button  onclick="increase('${element.category}',1,${i})"><img src="./images/icon-increment-quantity.svg" alt=""></button>
                        </div>
                    </div>
                    <div class="des-text">
                        <p class="e-category">${element.category}</p>
                        <h5 class="e-name">${element.name}</h5>
                        <p class="e-price">$${element.price.toFixed(2)}</p>
                    </div>
                </div>
        `
        let a = document.getElementById("j" + i).style.display = "none"
        let b = document.getElementById("o" + i).style.display = "flex"
         let x = document.getElementById('b' + i).style.border = `none`
    }
}

function showBasket() {
    basket2.innerHTML = `<h2>Your cart (<span id="your">0</span>)</h2>`
    if (basProducts == "") {
        basket.style.display = "block"
        basket2.style.display = "none"
    } else {
        basket.style.display = "none"
        basket2.style.display = "block"
    }
    for (let i = 0; i < basProducts.length; i++) {
        let element = basProducts[i];
        boos += element.quantity
        order += element.quantity * element.price
        basket2.innerHTML += `
          <div id="basctn1">
                  <div class="box12">
                    <div class="box1">
                        <p class="name-b">${element.name}</p>
                        <p class="qiymet"><span class="say-b">${element.quantity}x</span><span class="price-b">@ $${element.price}</span><span class="total-b">$${element.quantity*element.price}         </span></p>
                       </div>
                      <div class="box2">
                        <button onclick="del(${i},${element.id})"class="remove-btn"><img src="./images/icon-remove-item.svg" alt="" /></button>
                      </div>
                  </div>
                  <hr class="line"> 
                </div>
        `

    }
    let order2=order.toFixed(2)
    basket2.innerHTML += `<p class="order-t"><span> Order Total</span><span class="order-bold">$${order2}</span></p><div class="carbon-bg"><img src="./images/icon-carbon-neutral.svg" alt="">
<span class="carbon-text">This is a <b>carbon-neutral</b> delivery</span></div><button onclick="showOrder(${order2})" class="confirim-btn">Confirim Order</button>`
    const your = document.getElementById('your')
    your.innerHTML = boos
    boos = 0
    order = 0
}

function push(i) {
    let x = document.getElementById('b' + i).style.border = `3px solid #ca3a0f`
    displaychange("flex", "none", i)
    basProducts.push({
        ...products[i],
        quantity: 1,
        id: i
    })
    showBasket()
}

function increase(cate, x, id) {

    for (let i = 0; i < basProducts.length; i++) {
        let element = basProducts[i];
        if (element.category == cate) {
            basProducts[i].quantity += x
            let q = document.getElementById('q' + id)
            q.innerHTML = +q.innerHTML + x
            if (basProducts[i].quantity <= 0) {
                displaychange("none", "flex", id)
                let x = document.getElementById('b' + id).style.border = `none`
                basProducts.splice(i, 1);
                q.innerHTML = 1
            }
            break;
        }
    }
    showBasket()

}

function displaychange(flex, none, i) {
    let a = document.getElementById("j" + i).style.display = flex
    let b = document.getElementById("o" + i).style.display = none
}

function del(i,id) {
    displaychange("none", "flex", basProducts[i].id)
    let x = document.getElementById('b' + id).style.border = `none`
    basProducts.splice(i, 1);
    showBasket()
}

function showOrder() {
    submitOrder.style.display="block"
    contentjs.innerHTML=""
    for (let i = 0; i < basProducts.length; i++) {
        let element=basProducts[i]
        contentjs.innerHTML+=`
         <div class="qutu">
                <img src=".${element.image.thumbnail}" alt="">
                <div class="text-content">
                    <h6>${element.name}</h6>
                    <p><span style="color:#c73a0f; font-size:.875rem;">${element.quantity}x</span>@ $${element.price}</p>
                </div>
                <p>$${element.quantity*element.price}</p>
            </div>
        `
        
    }
   
}
function sfirla(){
basProducts=[]
submitOrder.style.display="none"
showBasket()
show()
}
