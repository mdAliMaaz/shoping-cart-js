let shopEl  = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

// !-----------------------------------------------
let shopGenerator = ()=>{
    return( shopEl.innerHTML = shopItems.map((x)=>{
        let {id ,name,price,img,desc } = x;
        let search  = basket.find((x)=> x.id === id) || [];
        return `<div class="item" id=product-${id}>
        <img  width="220" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quanity">
                <h2>$ ${price}</h2>
                <div class="btn">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <di id=${id} class="quantity">${search.item === undefined? 0: search.item}</di>
                    <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`
    }).join(""))
}

shopGenerator();

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
    

    localStorage.setItem("data",JSON.stringify(basket));
};
let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calulation();
};

let calulation = ()=>{
    let cartEl = document.getElementById("cart-amount");
    cartEl.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x + y,0);

    console.log(basket.map((x)=>x.item).reduce((x,y)=> x + y,0));
};
calulation();
