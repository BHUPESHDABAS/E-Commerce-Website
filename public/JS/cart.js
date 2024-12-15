let cartList = document.querySelector('.cart-list');
let cart = document.querySelector('.list-item');

function updateCart(cart, totalPrice) {
    cartList.innerText = "";
    cart.forEach((c) => {
        let li = document.createElement('li');
        li.classList.add('list-item');
        li.innerHTML = `
            <div>
                <img class="item-image" src=${c.id.imageUrl}$ alt="Product Image">
            </div>
            <div>
                <p>Name: ${c.id.Name}</p>
                <p>Price: ${c.id.Price}</p>
                <div>
                    Quantity: 
                    <a href="/shop/cart/increase/${c.id._id}">
                        <button class="increaseQuantity">➕</button>
                    </a> 
                    ${c.quantity} 
                    <a href="/shop/cart/decrease/${c.id._id}">
                        <button class="decreaseQuantity">➖</button> 
                    </a>

                    <div id=${c.id._id} > </div>
                </div>
            </div>
        `;
        cartList.appendChild(li);
    })
}

cartList.addEventListener('click', ev=>{
    ev.preventDefault();
    let item = ev.target;
    if(item.classList.contains('increaseQuantity'))
        {
            item = item.parentElement.parentElement;
            item = item.lastElementChild;

            let id = item.getAttribute('id');
            // console.log(id);

            axios.get(`/shop/cart/increase/${id}`).then(({data})=>{
                // console.log(data);
                cart = data;
                updateCart(cart.id);
                document.querySelector('.totalPrice').innerText = data.totalPrice;
            }).catch(err => {
                alert(err.message);
            })
        }
    else if (item.classList.contains('decreaseQuantity'))
        {
            item = item.parentElement.parentElement;
            item = item.lastElementChild;

            let id = item.getAttribute('id');
            console.log(id);

            axios.get(`/shop/cart/decrease/${id}`).then(({data})=>{
                // console.log(data);
                cart = data;
                updateCart(cart.id);
                document.querySelector('.totalPrice').innerText = data.totalPrice;
            }).catch(err => {
                alert(err.message);
            })
        }
})