import { Product } from './models/Product';
console.log(document.location.href);

const url = new URL(document.location.href);

const cat: string | null = url.searchParams.get('category');

let productsFromCategory: Array<Product>;
const fetchCategoryProducts = async (): Promise<any> => {
    const responce = await fetch(`https://fakestoreapi.com/products/category/${cat}`);
    const data: Array<Product> = await responce.json();
    console.log(data)
    productsFromCategory = data;
}


const filterSort = () => {

  const landing = document.getElementsByClassName("landing_top")[0];
  const sort_div = document.createElement("div");
  const sort_str = `<div class="dropdown">
  <a class="btn  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    sort by
  </a>

  <ul class="dropdown-menu sortdropdown-menu">
    <li><a class="dropdown-item sortdropdown-item" href="#">price(low to high)</a></li>
    <li><a class="dropdown-item sortdropdown-item" href="#">rating(high to low)</a></li>
    <li><a class="dropdown-item sortdropdown-item" href="#">popularity</a></li>
    <li><a class="dropdown-item sortdropdown-item" href="#">clear</a></li>
  </ul>
  </div>`

  sort_div.innerHTML = sort_str;
  landing?.appendChild(sort_div);

  const dropdownButton = document.querySelector(".dropdown .btn");
  const dropdownMenu = document.querySelectorAll(".sortdropdown-menu .sortdropdown-item");

  dropdownMenu.forEach((item, index) => {
    item.addEventListener('click', () => {
      const selectedValue = item.textContent;
      console.log(selectedValue);

      if (selectedValue === 'price(low to high)') {
        productsFromCategory.sort((a, b) => a.price - b.price);

        setProductList(productsFromCategory)
      }

      else if (selectedValue === 'rating(high to low)') {
        productsFromCategory.sort((a, b) => b.rating.rate - a.rating.rate)
        setProductList(productsFromCategory)
      }

      else if (selectedValue === 'popularity') {
        productsFromCategory.sort((a, b) => b.rating.count - a.rating.count)
        setProductList(productsFromCategory)
      }

      else if (selectedValue === 'clear') {
        productsFromCategory.sort((a, b) => a.id - b.id)
        setProductList(productsFromCategory);
      }

    })
  })


}


const filterByRating = () => {
  const landing = document.getElementsByClassName("landing_top")[0];
  const filter_div = document.createElement("div");
  const filterBy_str = `<div class="dropdown">
  <a class="btn  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    filter by
  </a>

  <ul class="dropdown-menu filterdropdown-menu">
    <li><a class="dropdown-item filterdropdown-item" href="#">> 4<i class="bi bi-star"></i> </a></li>
    <li><a class="dropdown-item filterdropdown-item" href="#">> 3<i class="bi bi-star"></i> </a></li>
    <li><a class="dropdown-item filterdropdown-item" href="#">> 2<i class="bi bi-star"></i></a></li>
  </ul>
  </div>`

  filter_div.innerHTML = filterBy_str;
  landing?.appendChild(filter_div);

  const dropdownButton = document.querySelector(".dropdown .btn");
  const dropdownMenu = document.querySelectorAll(".filterdropdown-menu .filterdropdown-item");

  dropdownMenu.forEach((item, index) => {
    item.addEventListener('click', () => {
      const selectedValue: string | null = item.textContent;
      console.log(selectedValue![2]);

      const filter_ProductList: Array<Product> = productsFromCategory.filter((item) => item.rating.rate >= parseInt(selectedValue![2]));

      console.log(filter_ProductList)
      setProductList(filter_ProductList)
    })
  })
}



const setProductList = (allProductsList: Array<Product>) => {
    console.log(allProductsList);
    const product_details = document.getElementById("products");
    document.getElementsByClassName("category_name")[0].innerHTML = cat!;

    product_details!.innerHTML = "";

    for (let idx in allProductsList) {
        console.log(idx + allProductsList[idx].image);

        const div1 = document.createElement("div");

        const cardlink = document.createElement("a");
        cardlink.setAttribute("href", `./product.html?id=${allProductsList[idx].id}`);
        cardlink.setAttribute("class", "cardlink")
        cardlink.setAttribute("style", "text-decoration:none");
        cardlink.style.color = "black";

        div1.setAttribute("class", `product_box${idx}`);
        div1.setAttribute("class", "card shadow-lg mb-5 bg-white rounded ");
        div1.setAttribute("style","width: 16rem; height: 27rem;")

        const image = document.createElement("img");
        image.setAttribute("src", allProductsList[idx].image);
        image.setAttribute("class", "card-img-top");

        cardlink.appendChild(image);

        const div2 = document.createElement("div");
        div2.setAttribute("class", "card-body");

        const h5 = document.createElement("p");
        h5.setAttribute("class", "card-title");
        h5.innerText = allProductsList[idx].title;


        const price = document.createElement("p");
        price.setAttribute("class", "price");
        price.innerHTML = "$ " + allProductsList[idx].price;



        const cnt_button = document.createElement("div");
        cnt_button.setAttribute("class", "cnt_button");

        const rating = document.createElement("button");
        rating.setAttribute("type", "button");
        rating.disabled = true;
        rating.setAttribute("class", "btn btn-success btn-sm rating");
        rating.innerHTML = "" + allProductsList[idx].rating.rate;

        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-star");
        rating.appendChild(icon)

        const count = document.createElement("p");
        count.setAttribute("class", "count");
        count.innerHTML = "( " + allProductsList[idx].rating.count + " )";

        const cartbutton = document.createElement("button");
        cartbutton.setAttribute("type", "button");
        cartbutton.setAttribute("id", `addToCart${allProductsList[idx].id}`);
        cartbutton.setAttribute("class", "btn btn-dark addcartbutton");

        const isIncart = window.localStorage.getItem(`count${allProductsList[idx].id}`);
        if (isIncart == null)
            cartbutton.innerHTML = "Add to Cart";
        else {
            // const count = window.localStorage.getItem(`count${productList[idx].id}`)
            cartbutton.innerHTML = `
            <button type="button" class="minus btn btn-sm btn-success" onClick = "decCount(${allProductsList[idx].id},${allProductsList[idx].price})">-</button>
            <button type="button" class="countvalue btn btn-sm btn-dark "  id = "countval${allProductsList[idx].id}">${isIncart}</button>
            <button type= "button" class="plus btn btn-sm btn-success" onClick = "incCount(${allProductsList[idx].id},${allProductsList[idx].price})">+</button>`;
        }

        cartbutton.setAttribute("onClick", `addToCart(${allProductsList[idx].id},${allProductsList[idx].price})`)

        div2.appendChild(h5);
        div2.appendChild(price);
        cnt_button.appendChild(rating);
        cnt_button.appendChild(count);
        cnt_button.appendChild(cartbutton);
        div2.appendChild(cnt_button);
        div1.appendChild(cardlink);
        div1.appendChild(div2);
        product_details?.appendChild(div1);


    }

}

const addToCart = (id: number, price: number) => {

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
    const btn_updated = `
    <button type="button" class="minus btn btn-sm btn-success" onClick = "decCount(${id},${price})">-</button>
    <button type="button" class="countvalue btn btn-sm btn-dark"  id = "countval${id}">${count}</button>
    <button type= "button" class="plus btn btn-sm btn-success" onClick = "incCount(${id},${price})">+</button>`
    console.log(btn_updated);
  
    document.getElementById(`addToCart${id}`)!.innerHTML = btn_updated;
  }
  
const initUI = async (): Promise<any> => {

    await fetchCategoryProducts();
    filterSort();
  filterByRating();
    setProductList(productsFromCategory);
}

initUI();

const incCount = (id: number, itemprice: number) => {


    const val: any = document.getElementById(`countval${id}`);
    const num = parseInt(val.innerHTML) + 1;
  
  
    const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100)/100;
  
  
    window.localStorage.setItem(`count${id}`, String(num));
    window.localStorage.setItem(`price${id}`, String(totalPrice));
  
  
  
    const btn_updated = `
    <button type="button" class="minus btn btn-sm btn-success" onClick = "decCount(${id},${itemprice})">-</button>
    <button type="button" class="countvalue btn btn-sm btn-dark"  id = "countval${id}">${String(num)}</button>
    <button type= "button" class="plus btn btn-sm btn-success" onClick = "incCount(${id},${itemprice})">+</button>`
    console.log(btn_updated);
  
    document.getElementById(`addToCart${id}`)!.innerHTML = btn_updated;
  
  }
  
const decCount = (id: number, itemprice: number) => {
    const val: any = document.getElementById(`countval${id}`);
    if (parseInt(val.innerHTML) > 0) {
      const num = parseInt(val.innerHTML) - 1;
      val.innerHTML = String(num);
  
      const totalPrice = Math.floor(itemprice * parseFloat(String(num)) * 100)/100;
  
  
      window.localStorage.setItem(`count${id}`, String(num));
      window.localStorage.setItem(`price${id}`, String(totalPrice));
  
      if (num == 0) {
        window.localStorage.removeItem(`count${id}`);
      }
      const btn_updated = `
      <button type="button" class="minus btn btn-sm btn-success" onClick = "decCount(${id},${itemprice})">-</button>
      <button type="button" class="countvalue btn btn-sm btn-dark"  id = "countval${id}">${String(num)}</button>
      <button type= "button" class="plus btn btn-sm btn-success" onClick = "incCount(${id},${itemprice})">+</button>`
      console.log(btn_updated);
  
      document.getElementById(`addToCart${id}`)!.innerHTML = btn_updated;
    }
  }
  
