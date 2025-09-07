const loadCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}

const loadCards=(id)=>{
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
    <h2 class="card-title">
      ${detail.name}
      
    </h2>
    <p>${detail.description}</p>
    <div class="card-actions justify-between">
        <div class="badge  bg-[#CFF0DC] text-[#15803D]">${detail.category}</div>
       <div> <p>৳<span>${detail.price}</span></p></div>
      
    </div>
    <button class="bg-[#15803D] text-white rounded-3xl px-4 h-[38px] text-xs font-semibold ">Add to Cart</button>
  </div>
  
</div>
        `

        cardContainer.append(card);
    }
    
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
        
}

loadCategories()

