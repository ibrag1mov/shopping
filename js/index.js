const elSignInBtn = document.querySelector('.shop-btn');
const elHero = document.querySelector('.hero');
const elLinks = document.querySelector('.nav-list');
const elProfilLogo = document.querySelector('.profil-item');
const elProfilDrapdown = document.querySelector('.profil-drapdown');
const elProductContent = document.querySelector('.product-content');
const elSignOut = document.querySelector('.js-sign-out');
const elProfil = document.querySelector('.profil-list');
const elProfilIcon = document.querySelector('.profil-icon');


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
})