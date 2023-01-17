const elEyeBtn = document.querySelector('.password-eye');
const elForm = document.querySelector('.js-registr-form')
const elUserInput = document.querySelector('.js-user');
const elPhoneInput = document.querySelector('.js-phone');
const elEmailInput = document.querySelector('.js-email');
const elPasswordInput = document.querySelector('.js-password');

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

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault()
    let userName = elUserInput.value.split('')[0].toUpperCase();
    console.log(userName);
    fetch('http://192.168.43.105:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            user_name: elUserInput.value,
            phone: elPhoneInput.value,
            email: elEmailInput.value,
            password: elPasswordInput.value,
        })
    }).then((res)=>res.json())
    .then((data)=>{
       
     console.log(data);
  if(data.token){
         localStorage.setItem('user-name', userName)
        localStorage.setItem('token', data.token);
        location.replace('index.html');
    }
    else{
        elEmailInput.classList.add('input-error');
        elEmailInput.value=''
        elPasswordInput.value=''
        alert('User not found')
    }
    })
    .catch((err)=>console.log(err))
})