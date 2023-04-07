let basket = JSON.parse(localStorage.getItem("data")) || []; 

let lableEl  =document.getElementById("lable");
let shopingEl = document.getElementById("shoping-cart");



    console.log(shopItems)

let calulation = ()=>{
    let cartEl = document.getElementById("cart-amount");
    cartEl.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x + y,0);

    console.log(basket.map((x)=>x.item).reduce((x,y)=> x + y,0));
};
calulation();


let generateCartItem = ()=>{
    if (basket.length !== 0) {
        return (shopingEl.innerHTML = basket.map((x)=>{
            console.log(x);
            let{id,item} = x;
            let search  = shopItems.find((y)=>y.id === id) || [];
            return `
            <div class="cart-item">

            <img  width="100" src="${search.img}" alt="">

              
              <div class="details">

              <div class="title-price">
              <h4 class="title">
              <p>${search.name}</p>
              <p class="cart-price">$ ${search.price}</p>
              </h4>
              <i onclick="remove(${id})" class="bi bi-x-lg"></i>

         </div>
              <div class="btn">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <di id=${id} class="quantity"> ${item}</di>
              <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>


              <h3> $ ${item*search.price}</h3>
              

              </div>
              </div>
            `;
        }));
        
    } else {
        
        shopingEl.innerHTML = ``;
        lableEl.innerHTML = `<h2>cart is empty</h2>
        <a href="index.html">
            <button class="hbtn">Home</button>
        </a>`
        
        
        
    }
};

generateCartItem();


let increment = (id)=>{
    let seletedItem = id;
    let search = basket.find((x)=>x.id === seletedItem.id);
    if(search === undefined){
        basket.push({id:seletedItem.id,
            item:1})
    }
    else{
        search.item += 1;
    }
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
    update(seletedItem.id); 
    
};
let decrement = (id)=>{
    let seletedItem = id;
    let search = basket.find((x)=>x.id === seletedItem.id);
    if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(seletedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calulation();
    total();
};


let remove = (id)=>{ 

   let removeItem = id;
   basket = basket.filter((x) => x.id !== removeItem.id);
    generateCartItem();
    total();
    calulation();
    localStorage.setItem("data",JSON.stringify(basket));
    console.log("hi")
    
}

let clearCart = ()=>{
    basket = [];

    generateCartItem();
    calulation();

    localStorage.setItem("data",JSON.stringify(basket));
    }


let total = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let{item,id}  =x;
            let search  = shopItems.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        lableEl.innerHTML = `<h1>Bill: $ ${amount}</h1>
        <button class="checkOut">check out</button>
        <button onclick="clearCart()" class="removeAll">remove</button>
        `
    }else return;
}




total();