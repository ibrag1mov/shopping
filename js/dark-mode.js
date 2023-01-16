// theme dark-mode

const darkMode = document.querySelector('.js-dark-mode');

let theme=false;

darkMode.addEventListener('click', (evt)=>{
    theme = !theme;
    const bg = theme ? 'dark' : 'light';
    window.localStorage.setItem('theme', bg);
    changeTheme()
})

function changeTheme(){
   if(window.localStorage.getItem('theme')==='dark'){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    darkMode.innerHTML=`<i class="bi bi-sun"></i>`;
   }else{
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    darkMode.innerHTML=`<i class="bi bi-moon"></i>`;
   }
}

changeTheme();