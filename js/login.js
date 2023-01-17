const elEyeBtn = document.querySelector('.password-eye');
const elPasswordInput = document.querySelector('.js-password');
const elEmailInput = document.querySelector('.js-email');
const elForm = document.querySelector('.js-login-form');


elEyeBtn.addEventListener('click', (evt)=>{
    if(elEyeBtn.classList.contains('bi-eye')){
        elPasswordInput.type='text';
        elEyeBtn.setAttribute('class', 'bi password-eye bi-eye-slash');
    }
    else if(elEyeBtn.classList.contains('bi-eye-slash')){
        elPasswordInput.type='password';
        elEyeBtn.setAttribute('class', 'bi password-eye bi-eye');
    }
})


elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    fetch('http://10.10.0.247:5000/user/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                email: elEmailInput.value,
                password: elPasswordInput.value,
            }
        )
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.token){
            localStorage.setItem('token', data.token);
            location.replace('index.html');
        
        }
        else{
            elEmailInput.classList.add('input-error');
            elPasswordInput.classList.add('input-error');
            elEmailInput.value=''
            elPasswordInput.value=''
            alert('User not found')
        }
    }
    )
    .catch((err)=>console.log(err));
})  

elEmailInput.addEventListener('input', (evt)=>{
    elEmailInput.classList.remove('input-error');
})
elPasswordInput.addEventListener('input', (evt)=>{
    elPasswordInput.classList.remove('input-error');
})
