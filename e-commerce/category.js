var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log(document.location.href);
const url = new URL(document.location.href);
const cat = url.searchParams.get('category');
let productsFromCategory;
const fetchCategoryProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield fetch(`https://fakestoreapi.com/products/category/${cat}`);
    const data = yield responce.json();
    console.log(data);
    productsFromCategory = data;
});
const setProductList = (allProductsList) => {
    console.log(productsFromCategory);
    const product_details = document.getElementById("products");
    for (let idx in productsFromCategory) {
        console.log(idx + productsFromCategory[idx].image);
        const div1 = document.createElement("div");
        const cardlink = document.createElement("a");
        cardlink.setAttribute("href", `./product.html?id=${productsFromCategory[idx].id}`);
        cardlink.setAttribute("class", "cardlink");
        cardlink.setAttribute("style", "text-decoration:none");
        cardlink.style.color = "black";
        div1.setAttribute("class", `product_box${idx}`);
        div1.setAttribute("class", "card");
        // div1.setAttribute("onclick", `productdetails(${productsFromCategory[idx].id})`)
        const image = document.createElement("img");
        image.setAttribute("src", productsFromCategory[idx].image);
        image.setAttribute("class", "card-img-top");
        cardlink.appendChild(image);
        const div2 = document.createElement("div");
        div2.setAttribute("class", "card-body");
        const h5 = document.createElement("p");
        h5.setAttribute("class", "card-title");
        h5.innerText = productsFromCategory[idx].title;
        const price = document.createElement("p");
        price.setAttribute("class", "price");
        price.innerHTML = "$ " + productsFromCategory[idx].price;
        const cnt_button = document.createElement("div");
        cnt_button.setAttribute("class", "cnt_button");
        const rating = document.createElement("button");
        rating.setAttribute("type", "button");
        rating.disabled = true;
        rating.setAttribute("class", "btn btn-success rating");
        rating.innerHTML = "" + productsFromCategory[idx].rating.rate;
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-star");
        rating.appendChild(icon);
        const count = document.createElement("p");
        count.setAttribute("class", "count");
        count.innerHTML = "( " + productsFromCategory[idx].rating.count + " )";
        const cartbutton = document.createElement("button");
        cartbutton.setAttribute("type", "button");
        cartbutton.setAttribute("id", `addToCart${productsFromCategory[idx].id}`);
        cartbutton.setAttribute("class", "btn btn-dark addcartbutton");
        const isIncart = window.localStorage.getItem(`count${productsFromCategory[idx].id}`);
        if (isIncart == null)
            cartbutton.innerHTML = "Add to Cart";
        else
            cartbutton.innerHTML = "Added";
        cartbutton.setAttribute("onClick", `addToCart(${productsFromCategory[idx].id},${productsFromCategory[idx].price})`);
        div2.appendChild(h5);
        div2.appendChild(price);
        cnt_button.appendChild(rating);
        cnt_button.appendChild(count);
        cnt_button.appendChild(cartbutton);
        div2.appendChild(cnt_button);
        div1.appendChild(cardlink);
        div1.appendChild(div2);
        // cardlink.appendChild(div1);
        product_details === null || product_details === void 0 ? void 0 : product_details.appendChild(div1);
    }
};
const addToCart = (id, price) => {
    const arr = window.localStorage.getItem("cartId") || "[]";
    const vars = JSON.parse(arr);
    const temp = vars.filter((item) => item == id);
    if (temp.length == 0) {
        vars.push(String(id));
        window.localStorage.setItem("cartId", JSON.stringify(vars));
    }
    window.localStorage.setItem(`count${id}`, "1");
    window.localStorage.setItem(`price${id}`, String(price));
    document.getElementById(`addToCart${id}`).innerHTML = "Added";
};
const initUI = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchCategoryProducts();
    setProductList(productsFromCategory);
});
initUI();
// export {};
