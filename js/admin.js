const upLoadBtn = document.querySelector('#upload-button');
const chosenImage = document.querySelector('#chosen-image');
const fileName = document.querySelector('#file-name');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.btn-reset');
const submitBtn = document.querySelector('.btn-submit');
const elModal = document.querySelector('.modal');
const elForm = document.querySelector('.js-form')
const elNameInput = document.querySelector('#product-name')
const elPriceInput = document.querySelector('#product-price')
const elDescInput = document.querySelector('#product-desc')
const elList = document.querySelector('.js-list');

// const elNameInput = document.querySelector('#product-name')
let card = []
let id=0;
const renderCard = (array, node)=>{
    node.innerHTML=""
    console.log(array);
    array.forEach((item) => {
       id++
        
        let newItem = document.createElement('li');
        let newImg = document.createElement('img');
        let newTitle = document.createElement('h2');
        let newText = document.createElement('p');
        let newText_desc = document.createElement('p');
        let newEditBtn =document.createElement('button');
        let newDeleteBtn =document.createElement('button');

        newItem.setAttribute('class', 'card-list');
        newImg.setAttribute('class', 'card-list-img');
        newTitle.setAttribute('class', 'card-list-title');
        newText.setAttribute('class', 'card-list-text');
        newText_desc.setAttribute('class', 'card-list-text-desc');
        newEditBtn.setAttribute('class', 'edit-btn');
        newDeleteBtn.setAttribute('class', 'delete-btn');


        newItem.id=id;
        newImg.src = item.product_img;
        newTitle.textContent = item.product_name;
        newText.textContent ="Price:" + item.product_price + "$";
        newText_desc.textContent = item.product_desc;
        newEditBtn.textContent = 'Edit';
        newDeleteBtn.textContent = 'Delete'
        newEditBtn.dataset.BtnEditId=id;
        newDeleteBtn.dataset.BtnId=id;

        newItem.appendChild(newImg);
        newItem.appendChild(newTitle);
        newItem.appendChild(newText);
        newItem.appendChild(newText_desc);
        newItem.appendChild(newEditBtn);
        newItem.appendChild(newDeleteBtn);

        node.appendChild(newItem);
    });
}


// renderCard(card, elList)



upLoadBtn.onchange = () =>{
    let reader = new FileReader();
    reader.readAsDataURL(upLoadBtn.files[0]);
    reader.onload = () =>{
        chosenImage.setAttribute('src', reader.result);
    }

    fileName.textContent = upLoadBtn.files[0].name;
    
    // let img_id =  upLoadBtn.files[0].lastModified;
    

}

addBtn.addEventListener('click', (evt)=>{
    elModal.classList.remove('d-none')
})

closeBtn.addEventListener('click', (evt)=>{
    elModal.classList.add('d-none')
})

submitBtn.addEventListener('click', (evt)=>{
    if(elNameInput.value){
        elModal.classList.add('d-none')
    }
})


// elForm.addEventListener('submit', (evt)=>{
//     console.log(reader.result);
//     evt.preventDefault()
//    //  console.log(upLoadBtn.files[0].name);
//     console.log(img_id);

//    fetch('http://10.10.0.247:5000/product', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify( {
//            product_name: elNameInput.value,
//            product_desc: elDescInput.value,
//            product_img: "https://picsum.photos/id/145/120/120/",
//            product_price: elPriceInput.value,
//        })
//    })
//    .then((res)=>res.json())
//    .then((data) =>console.log(data))
//    .catch((err)=>console.log(err))
// })


const form = document.querySelector('#form')


elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();

    // const formData = new FormData(form);

    
    let forma ={
        product_name: elNameInput.value,
        product_desc:  elDescInput.value,
        // product_img: reader.result,
        product_price: elPriceInput.value
    }

  
    card.push(forma);
    
    renderCard(card, elList)
    elNameInput.value='';
    elDescInput.value='';
    // reader.result = '';
    elPriceInput.value=""
// for (item of formData){
//     console.log(item[0], item[1]);
// }

// const formData = new FormData(form);

    // formData.append("product_name",  elNameInput.value);
    // formData.append('product_desc', elDescInput.value);
    // formData.append('product_img', upLoadBtn.files[0]);
    // formData.append('product_price', elDescInput.value)

    // console.log(formData);

    


fetch('http://192.168.43.105:5000/product', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        product_name: elNameInput.value,
        product_desc:  elDescInput.value,
        // product_img: reader.result,
        product_price: elPriceInput.value
   }),
}).then((res)=>res.json())
  .then((data) =>console.log(data))
  .catch((err)=>console.log(err))
})


