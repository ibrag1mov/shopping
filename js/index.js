const elSignInBtn = document.querySelector('.shop-btn');
const elHero = document.querySelector('.hero');
const elLinks = document.querySelector('.nav-list');
const elProfilLogo = document.querySelector('.profil-item');
const elProfilDrapdown = document.querySelector('.profil-drapdown');
const elProductContent = document.querySelector('.product-content');
const elSignOut = document.querySelector('.js-sign-out');
const elProfil = document.querySelector('.profil-list');
const elProfilIcon = document.querySelector('.profil-icon');
const list = document.querySelector('.js-list')


elSignInBtn.addEventListener('click', (evt)=>{
    location.replace('login.html')
})

const localData = localStorage.getItem('token');
if(localData){
    elHero.classList.add('hidden','d-none');
    elLinks.classList.add('d-none','hidden');
    elProductContent.classList.remove('d-none')
    elProductContent.classList.add('d-block');
    elProfil.classList.remove('d-none','hidden');
    elProfilIcon.textContent = localStorage.getItem('user-name');

}
else{
    elProfil.classList.add('d-none','hidden');
}

elProfilLogo.addEventListener('click', (evt)=>{
    if(elProfilDrapdown.classList.contains('drapdown-right')){
        elProfilDrapdown.setAttribute('class','profil-drapdown drapdown-bottom');
    }
    else{
        elProfilDrapdown.setAttribute('class','profil-drapdown drapdown-right');
    }
})

elSignOut.addEventListener('click', (evt)=>{
    elHero.classList.remove('hidden','d-none');
    elLinks.classList.remove('d-none','hidden');
    elProductContent.classList.add('d-none')
    elProductContent.classList.remove('d-block');
    elProfil.classList.add('d-none','hidden');
    window.localStorage.clear();
    location.reload()
})


let id=0;
const renderProduct = (array, node)=>{
    node.innerHTML='';
    array.forEach((product) => {
       
        id++
        let newItem = document.createElement('li');
                let newImg = document.createElement('img');
                let newTitle = document.createElement('h2');
                let newText = document.createElement('p');
                let newText_desc = document.createElement('p');
        
                newItem.setAttribute('class', 'card-list');
                newImg.setAttribute('class', 'card-list-img');
                newTitle.setAttribute('class', 'card-list-title');
                newText.setAttribute('class', 'card-list-text');
                newText_desc.setAttribute('class', 'card-list-text-desc');

        
        
                newItem.id=id;
                newImg.src = `http://localhost:5000/${product.product_img}`;
                newTitle.textContent = product.product_name;
                newText.textContent ="Price:" + product.product_price + "$";
                newText_desc.textContent = product.product_desc;
        
                newItem.appendChild(newImg);
                newItem.appendChild(newTitle);
                newItem.appendChild(newText);
                newItem.appendChild(newText_desc);

    node.appendChild(newItem)
    });
}

async function getProduct(){
    const res = await fetch('http://192.168.43.105:5000/product',{
        headers: {
            Authorization: localData,
        },
    });
    const data = await res.json();
    renderProduct(data, list);
}

getProduct()