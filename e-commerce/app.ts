import { Product } from './models/Product';

let productList: Array<Product>;
const fetchProductList = async (): Promise<any> => {
  const responce = await fetch("https://fakestoreapi.com/products");
  const data: Array<Product> = await responce.json();
  productList = data;
  window.localStorage.setItem("productList", JSON.stringify(productList));
}

const setProductList = (allProductsList: Array<Product>) => {
  console.log(productList);
  let Productdetails: Product
  const product_details = document.getElementById("products");
  
  for (let idx in productList) {


    const div1 = document.createElement("div");

    const cardlink = document.createElement("a");
    cardlink.setAttribute("href", `./product.html?id=${productList[idx].id}`);
    cardlink.setAttribute("class", "cardlink")
    cardlink.setAttribute("style", "text-decoration:none");
    cardlink.style.color = "black";
    div1.setAttribute("class", `product_box${idx}`);
    div1.setAttribute("class", "card bg-info");
    const image = document.createElement("img");
    image.setAttribute("src", productList[idx].image);
    image.setAttribute("class", "card-img-top");

    cardlink.appendChild(image);

    const div2 = document.createElement("div");
    div2.setAttribute("class", "card-body");

    const h5 = document.createElement("p");
    h5.setAttribute("class", "card-title");
    h5.innerText = productList[idx].title;


    const price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerHTML = "$ " + productList[idx].price;



    const cnt_button = document.createElement("div");
    cnt_button.setAttribute("class", "cnt_button");

    const rating = document.createElement("button");
    rating.setAttribute("type", "button");
    rating.disabled = true;
    rating.setAttribute("class", "btn btn-success rating");
    rating.innerHTML = "" + productList[idx].rating.rate;

    const icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-star");
    rating.appendChild(icon)

    const count = document.createElement("p");
    count.setAttribute("class", "count");
    count.innerHTML = "( " + productList[idx].rating.count + " )";

    const cartbutton = document.createElement("button");
    cartbutton.setAttribute("type", "button");
    cartbutton.setAttribute("class", "btn btn-dark addcartbutton");
    cartbutton.setAttribute("id", `addToCart${productList[idx].id}`);
    const isIncart = window.localStorage.getItem(`count${productList[idx].id}`);
    if(isIncart == null)
      cartbutton.innerHTML = "Add to Cart";
    else

      cartbutton.innerHTML = "Added";
    cartbutton.setAttribute("onClick", `addToCart(${productList[idx].id},${productList[idx].price})`)


    div2.appendChild(h5);
    div2.appendChild(price);
    cnt_button.appendChild(rating);
    cnt_button.appendChild(count);
    cnt_button.appendChild(cartbutton);
    div2.appendChild(cnt_button);
    div1.appendChild(cardlink);
    div1.appendChild(div2);
    // cardlink.appendChild(div1);
    product_details?.appendChild(div1);


  }

}

let cartitems: string[];

const addToCart = (id: number,price : number) => {

  
  const arr = window.localStorage.getItem("cartId") || "[]";
  const vars = JSON.parse(arr);
  const temp = vars.filter((item) => item == id);
  if (temp.length == 0) {
    vars.push(String(id));
    window.localStorage.setItem("cartId", JSON.stringify(vars));
  }


  window.localStorage.setItem(`count${id}`,"1");
  window.localStorage.setItem(`price${id}`,String(price));
  document.getElementById(`addToCart${id}`)!.innerHTML = "Added";
}

// console.log(cartitems);


const initUI = async (): Promise<any> => {

  await fetchProductList();
  setProductList(productList);
}

initUI();
