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

const localData = localStorage.getItem('token');
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
                newImg.src = `http://localhost:5000/${product.product_img}`;
                newTitle.textContent = product.product_name;
                newText.textContent ="Price:" + product.product_price + "$";
                newText_desc.textContent = product.product_desc;
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
    renderProduct(data, elList);
}

getProduct()

elForm.addEventListener('submit', (evt)=>{

   const formData = new FormData();

   let img = upLoadBtn.files[0];
  let desc = elDescInput.value.split('"').toString();


   
       formData.append("product_name",  elNameInput.value);
       formData.append('product_desc', desc);
       formData.append('product_img',  img);
       formData.append('product_price', elPriceInput.value);
       fetch("http://192.168.43.105:5000/product", {
           method: 'POST',
           headers: {
            //    'Content-Type': 'application/json',
               Authorization: localData
           },
           body: formData,
       }).then((res)=>res.json()).then((data)=>console.log(data)).catch((err)=>console.log(err))


    evt.preventDefault();
})


const deleteProduct= (id)=>{
    fetch(`http://192.168.43.105:5000/product/${id}`,{
        method: 'DELETE',
        headers:{
            Authorization: localData,
        },
    }).then((res)=>res.json()).then((data)=>{
        if(data){
            getProduct();
        }
    }).catch((err)=>console.log(err))
}

const editProduct= (id)=>{
    const name = prompt('User Name');
    const price = prompt('price');
    const desc = prompt('Description');


    fetch(`http://192.168.43.105:5000/product/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: localData,
        },
        body: {
            product_name: name,
            product_desc: desc,
            product_price: price,
        }
    }).then((res)=>res.json())
    .then((data)=>{

        if(data){
            getProduct();
        }
    })
    .catch((err)=>console.log(err))
}

elList.addEventListener('click', (evt)=>{
    if(evt.target.matches('.delete-btn')){
        const productId = evt.target.dataset.BtnId;
        deleteProduct(productId);   
    }
    else if(evt.target.matches('.edit-btn')){
        const productId = evt.target.dataset.BtnEditId;
        editProduct(productId);
        // elModal.classList.remove('d-none')
    }
})






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
    location.reload();
})

submitBtn.addEventListener('click', (evt)=>{
    if(elNameInput.value){
        elModal.classList.add('d-none')
    }
    // location.reload();
})

