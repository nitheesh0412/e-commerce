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
const id = url.searchParams.get('id');
// console.log(id);
// const product_id = (id);
let product_details;
const fetchProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield fetch(`https://fakestoreapi.com/products/${id}`);
    const data = yield responce.json();
    // console.log(data)
    product_details = data;
});
const setProduct = (allProduct) => {
    console.log(product_details);
    const maindiv = document.getElementById("product");
    const product_img_div = document.createElement("div");
    product_img_div.setAttribute("class", "product_img");
    const product_img = document.createElement("img");
    product_img.setAttribute("src", `${product_details.image}`);
    product_img.setAttribute("class", "product-image");
    product_img_div.appendChild(product_img);
    maindiv === null || maindiv === void 0 ? void 0 : maindiv.appendChild(product_img_div);
    const product_details_div = document.createElement("div");
    product_details_div.setAttribute("class", "product_information");
    let product_info = `<h5 class="title">${product_details.title}</h5>
            <p class="description">${product_details.description}</p>
            <h6 class="price">$ ${product_details.price}</h6>
            <button type="button" class="btn btn-success rating">${product_details.rating.rate}<i class="fa fa-star"></i></button>
            <p class="count">( ${product_details.rating.count} )</p>`;
    let btn_str = "";
    // const cartbutton = document.getElementById(`addToCart${product_details.id}`)
    const isIncart = window.localStorage.getItem(`count${product_details.id}`);
    if (isIncart == null) {
        btn_str = `<button type="button" id = "addToCart${product_details.id}" class="btn btn-dark addtocart" onClick ="addToCart(${product_details.id},${product_details.price})">Add to cart</button>`;
    }
    else {
        // const count = window.localStorage.getItem(`count${productList[idx].id}`)
        btn_str = `<button type="button" class="minus btn btn-success" onClick = "decCount(${product_details.id},${product_details.price})">-</button>
              <button type="button" class="countvalue btn btn-dark"  id = "countval${product_details.id}">${isIncart}</button>
              <button type= "button" class="plus btn btn-success" onClick = "incCount(${product_details.id},${product_details.price})">+</button>`;
    }
    product_info += btn_str;
    product_details_div.innerHTML = product_info;
    maindiv === null || maindiv === void 0 ? void 0 : maindiv.appendChild(product_details_div);
};
const addToCart = (id, price) => {
    if (window.localStorage.getItem(`count${id}`) == null) {
        window.localStorage.setItem(`count${id}`, "1");
        window.localStorage.setItem(`price${id}`, String(price));
    }
    const count = window.localStorage.getItem(`count${id}`);
    const arr = window.localStorage.getItem("cartId") || "[]";
    const vars = JSON.parse(arr);
    const temp = vars.filter((item) => item == id);
    if (temp.length == 0) {
        vars.push(String(id));
        window.localStorage.setItem("cartId", JSON.stringify(vars));
    }
    const btn_updated = `<button type="button" class="minus btn btn-success" onClick = "decCount(${id},${price})">-</button>
  <button type="button" class="countvalue btn btn-dark"  id = "countval${id}">${count}</button>
  <button type= "button" class="plus btn btn-success" onClick = "incCount(${id},${price})">+</button>`;
    console.log(btn_updated);
    document.getElementById(`addToCart${id}`).innerHTML = btn_updated;
};
const initUI = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchProduct();
    setProduct(product_details);
});
initUI();
const incCount = (id, itemprice) => {
    const val = document.getElementById(`countval${id}`);
    const num = parseInt(val.innerHTML) + 1;
    const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100)/100;
    window.localStorage.setItem(`count${id}`, String(num));
    window.localStorage.setItem(`price${id}`, String(totalPrice));
    const btn_updated = `<button type="button" class="minus btn btn-success" onClick = "decCount(${id},${itemprice})">-</button>
  <button type="button" class="countvalue btn btn-dark"  id = "countval${id}">${String(num)}</button>
  <button type= "button" class="plus btn btn-success" onClick = "incCount(${id},${itemprice})">+</button>`;
    console.log(btn_updated);
    document.getElementById(`addToCart${id}`).innerHTML = btn_updated;
};
const decCount = (id, itemprice) => {
    const val = document.getElementById(`countval${id}`);
    if (parseInt(val.innerHTML) > 0) {
        const num = parseInt(val.innerHTML) - 1;
        val.innerHTML = String(num);
        const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100)/100;
        window.localStorage.setItem(`count${id}`, String(num));
        window.localStorage.setItem(`price${id}`, String(totalPrice));
        if (num == 0) {
            window.localStorage.removeItem(`count${id}`);
        }
        const btn_updated = `<button type="button" class="minus btn btn-success" onClick = "decCount(${id},${itemprice})">-</button>
  <button type="button" class="countvalue btn btn-dark"  id = "countval${id}">${String(num)}</button>
  <button type= "button" class="plus btn btn-success" onClick = "incCount(${id},${itemprice})">+</button>`;
        console.log(btn_updated);
        document.getElementById(`addToCart${id}`).innerHTML = btn_updated;
    }
};
// export {};
