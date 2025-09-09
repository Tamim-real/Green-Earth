const cartContainer = document.getElementById('cart-container')

const cartItems = [];


const loadAllPlants = ()=>{
  manageSpinner(true)
  fetch('https://openapi.programming-hero.com/api/plants')
  .then((res)=> res.json())
  .then(data=> displayAllPlants(data.plants))
  
}

const loadModalDetail= async (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    console.log(url);
    const res =  await fetch(url);

    const detail =  await res.json();
    displayModalDetail(detail.plants);

  
    
    
}

const manageSpinner=(status)=>{
    if(status==true){
      document.getElementById('spinner').classList.remove('hidden');
      document.getElementById('card-container').classList.add('hidden')
    }
    else{
      document.getElementById('card-container').classList.remove('hidden');
      document.getElementById('spinner').classList.add('hidden')
    }
}

const displayModalDetail=(word)=>{
    console.log(word);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="card bg-base-100 w-96 h-96 shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src="${word.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-start text-left">
    <h2 class="card-title">${word.name}</h2>
    <p><span class="font-bold">Category :</span> ${word.category}</p>
    <p> <span class="font-bold">Price :</span> ${word.price}</p>

    <p><span class="font-bold">Description :</span> ${word.description}</p>
    
  </div>
</div>
    `

    document.getElementById('my_modal_2').showModal();
}

const displayAllPlants =(allPlants)=>{
      const cardContainer = document.getElementById('card-container');
    
      for(const plants of allPlants){
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="card bg-base-100 w-80 h-96 shadow-sm  ">
  <figure>
    <img
      src="${plants.image}"
      alt="Shoes" class="mt-5" />
  </figure>
  <div class="card-body">
    <h2 class="card-title" onclick="loadModalDetail(${plants.id})">
      ${plants.name}
      
    </h2>
    <p>${plants.description}</p>
    <div class="card-actions justify-between">
        <div class="badge  bg-[#CFF0DC] text-[#15803D]">${plants.category}</div>
       <div><p class="item-price-minus">৳ ${plants.price}</p></div>
      
    </div>
    <button class="bg-[#15803D] text-white rounded-3xl px-4 h-[38px] text-xs font-semibold ">Add to Cart</button>
  </div>
  
</div>
        `

        cardContainer.append(card);

      }



manageSpinner(false)
}

document.getElementById('card-container').
addEventListener('click', (e)=>{
  if(e.target.innerText === 'Add to Cart'){
    handleCartItems(e)

    alert('This item has been added to cart')
    
   
    
    
  }
 
  
  
})

const handleCartItems=(e)=>{
 const title = e.target.parentNode.children[0].innerText;

    const price = e.target.parentNode.children[2].parentNode.children[2].children[1].children[0].innerText;

    cartItems.push({
      title : title,
      price : price
    })

    console.log(cartItems);

    showCartItems(cartItems)
}

const showCartItems=(cartItems)=>{
    cartContainer.innerHTML ='';
    cartItems.forEach(item =>{
      const cartDiv = document.createElement('div');
      

      cartDiv.innerHTML =`<div class="bg-[#CFF0DC] px-7 py-3 rounded-lg flex justify-between cart-item items-center gap-10 mb-5">
                        <div>
                            <h2>${item.title}</h2>
                        <p><span class="item-price" >${item.price}</span></p>
                        </div>
                        <div class="rmvBtn">&times;</div>
                    </div>
      
      `

      cartContainer.append(cartDiv)
    })
}



loadAllPlants()

const loadCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}

const loadCards=(id)=>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCards(data.plants))
    
}

const displayCards =(details)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    for(const detail of details){
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="card bg-base-100 w-80 h-96 shadow-sm">
  <figure>
    <img
      src="${detail.image}"
      alt="Shoes" class="mt-5" />
  </figure>
  <div class="card-body">
    <h2 class="card-title" onclick="loadModalDetail(${detail.id})">
      ${detail.name}
      
    </h2>
    <p>${detail.description}</p>
    <div class="card-actions justify-between">
        <div class="badge  bg-[#CFF0DC] text-[#15803D]">${detail.category}</div>
       <div> <p>৳<span>${detail.price}</span></p></div>
      
    </div>
    <button onclick="cartItem(${detail.id})" class="bg-[#15803D] text-white rounded-3xl px-4 h-[38px] text-xs font-semibold ">Add to Cart</button>
  </div>
  
</div>
        `

        cardContainer.append(card);
    }

   manageSpinner(false)
    
}


const displayCategories=(catagories)=>{
        const catergoryContainer = document.getElementById('category-container');
        catergoryContainer.innerHTML = '';

        for(let category of catagories){
            const btnDiv = document.createElement('div');

            btnDiv.innerHTML = `

            <button onclick="loadCards(${category.id})" class="hover:bg-[#15803D] hover:text-white pr-5 pl-2 py-1 rounded-lg">${category.category_name}</button>
            
            `
            catergoryContainer.append(btnDiv)
            
        }

         catergoryContainer.addEventListener('click', (e)=>{
            const allbtn = document.querySelectorAll('button');
            allbtn.forEach(btn =>{
              btn.classList.remove('bg-[#15803D]', "text-white")
            })


            if(e.target.localName === "button"){
              e.target.classList.add('bg-[#15803D]', "text-white")
            }
        
    })
        
}

let totalAmount = 0
let finalAmount = document.getElementById('final-amount');

document.getElementById('card-container').
addEventListener('click', (e)=>{
  let itemAmount = parseInt((e.target.previousElementSibling.children[1].innerText).replace(/[^\d.]/g, ""));
  totalAmount+= itemAmount

  

  finalAmount.innerText = totalAmount


  
  
})



  
  cartContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('rmvBtn') ){

      let minusPrice = parseInt(e.target.parentNode.children[0].lastElementChild.innerText.replace(/[^\d.]/g, ""));
      

      totalAmount -= minusPrice
    finalAmount.innerText = totalAmount
      

      

     
      e.target.parentNode.remove()
      
     cartItems.pop()
     
    
    

      
      
      
    }


    
})



loadCategories()

