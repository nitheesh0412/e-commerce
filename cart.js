const products = window.localStorage.getItem("productList");
const productList = JSON.parse(products);
console.log(productList);
function fetchCartItems() {
    const items = window.localStorage.getItem("cartId");
    let cartItems = JSON.parse(items);
    console.log("cart", cartItems);
    // let count = 1;
    let totalcartitemsprice = 0;
    if ((cartItems === null || cartItems === void 0 ? void 0 : cartItems.length) > 0) {
        const maindiv = document.getElementById("products");
        let tableString = `
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th class="w-50"></th>
                    <th class="w-25"></th>
                    <th class="w-25">Price</th>
                </tr >
            </thead>
            <tbody>`;
        for (let idx of cartItems) {
            const product = productList.find(obj => obj.id == parseInt(idx));
            console.log(product);
            const price = window.localStorage.getItem(`price${product === null || product === void 0 ? void 0 : product.id}`);
            const count = window.localStorage.getItem(`count${product === null || product === void 0 ? void 0 : product.id}`);
            if (count != null) {
                const productstring = `
                <tr>
                    <td >
                        <a href="./product.html?id=${product === null || product === void 0 ? void 0 : product.id}"><img src ="${product === null || product === void 0 ? void 0 : product.image}" class="cartproductimg"></a>
                    </td>
                    <td >${product === null || product === void 0 ? void 0 : product.title}</td>
                    <td >
                        <button type="button" class="minus btn btn-success" onClick = "decCount(${product === null || product === void 0 ? void 0 : product.id},${product === null || product === void 0 ? void 0 : product.price})">-</button>
                        <button type="button" class="countvalue btn btn-dark"  id = "countval${product === null || product === void 0 ? void 0 : product.id}">${count}</button>
                        <button type= "button" class="plus btn btn-success" onClick = "incCount(${product === null || product === void 0 ? void 0 : product.id},${product === null || product === void 0 ? void 0 : product.price})">+</button>
                    </td>
                    
                    <td id="totalPrice${product === null || product === void 0 ? void 0 : product.id}" class="w-25">${price}</td>
                </tr>`;
                tableString += productstring;
                totalcartitemsprice += parseFloat(price);
            }
        }
        tableString += `</tbody></table>`;
        maindiv.innerHTML = tableString;
        console.log(totalcartitemsprice);
        const totalPrice = document.getElementsByClassName("cartprice")[0];
        const totprice = `
        <h4>Total Price : Rs. ${totalcartitemsprice}</h4>
        <button type="button" class="btn btn-lg btn-info" onClick= "redirect()">checkout</button>`;
        totalPrice.innerHTML = totprice;
    }
    if (totalcartitemsprice === 0) {
        const maindiv = document.getElementById("products");
        const empty_str = `<h1 class="display-1 text-center">your cart is empty</h1>`;
        maindiv.innerHTML = empty_str;
    }
}
const redirect = () => {
    window.location.href = "http://127.0.0.1:5500/e-commerce/payment.html";
};
const incCount = (id, itemprice) => {
    const val = document.getElementById(`countval${id}`);
    const num = parseInt(val.innerHTML) + 1;
    val.innerHTML = String(num);
    const price = document.getElementById(`totalPrice${id}`);
    const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100) / 100;
    console.log(price.innerHTML);
    console.log(totalPrice);
    price.innerHTML = String(totalPrice);
    window.localStorage.setItem(`count${id}`, String(num));
    window.localStorage.setItem(`price${id}`, String(totalPrice));
    fetchCartItems();
};
const decCount = (id, itemprice) => {
    const val = document.getElementById(`countval${id}`);
    if (parseInt(val.innerHTML) > 0) {
        const num = parseInt(val.innerHTML) - 1;
        val.innerHTML = String(num);
        const price = document.getElementById(`totalPrice${id}`);
        const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100) / 100;
        price.innerHTML = String(totalPrice);
        window.localStorage.setItem(`count${id}`, String(num));
        window.localStorage.setItem(`price${id}`, String(totalPrice));
        if (num == 0) {
            window.localStorage.removeItem(`count${id}`);
        }
    }
    fetchCartItems();
};
fetchCartItems();
// export {};
