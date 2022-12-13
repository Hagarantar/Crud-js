//Variables
let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discount= document.getElementById("discount");
let total= document.getElementById("total");
let count= document.getElementById("count");
let category= document.getElementById("category");
let createBtn= document.getElementById("submit");
let tableBody =document.getElementById("tbody");
let deleteAllBtn = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mood ='create';
let tmpIndex;
// Get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background= "rgb(17, 99, 102)"
    }
    else{
        total.innerHTML= "";
        total.style.background= "rgb(20, 163, 168)"
    }
}

// create product
let addProduct;
    if(localStorage.getItem('products') != null){
        addProduct= JSON.parse(localStorage.getItem('products'));
}
    else{
        addProduct=[];
    }
createBtn.onclick = function(){
    let newProduct= {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count data
    if(title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for(let i =0 ; i< newProduct.count ; i++){
                    addProduct.push(newProduct);
                }
            }
            else{
                addProduct.push(newProduct);
            }
         
        }
        else{
            addProduct[tmpIndex] = newProduct;
            mood ='crearte';
            createBtn.innerHTML='Create';
            count.style.display='block'
        }
   clearData();

    }
    
    //save to localstorge
    localStorage.setItem('products',JSON.stringify(addProduct));
   readData()
}

// clear data
function clearData(){
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    category.value= '';
}

//Read Data
function readData(){
    getTotal();
    let table='';
    for (let i=0 ; i< addProduct.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${addProduct[i].title}</td>
        <td>${addProduct[i].price}</td>
        <td>${addProduct[i].taxes}</td>
        <td>${addProduct[i].ads}</td>
        <td>${addProduct[i].discount}</td>
        <td>${addProduct[i].total}</td>
        <td>${addProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    }
    tableBody.innerHTML=table;

    if(addProduct.length > 0){
        deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()">delete All ( ${addProduct.length} )</button>
           `
    }
    else{
        deleteAllBtn.innerHTML ='';
    }

}
readData();

//delete Data
function deleteData(index){
    addProduct.splice(index , 1);
     localStorage.setItem('products' ,JSON.stringify(addProduct));
    readData();
}

// delete all
function deleteAll(){
    localStorage.clear();
    addProduct.splice(0);
    readData();
}

//update Data
function updateData(index){
    title.value =addProduct[index].title;
    price.value =addProduct[index].price;
    taxes.value =addProduct[index].taxes;
    ads.value =addProduct[index].ads;
    discount.value =addProduct[index].discount;
    getTotal();
    count.style.display='none';
    category.value =addProduct[index].category;
    createBtn.innerHTML='Update Data'
    mood ='update';
    tmpIndex=index;
    scroll({
        top: 0,
        behavior:'smooth'
    })
}

//search in data
let searchMood = 'title';
function getSearchMood(id){
    search.placeholder = `Search By ${searchMood}`;

    if(id == 'searchTitle'){
        searchMood ='title';
    }
    else{
        searchMood='category';

    }
    search.focus();
    search.value = '';
    readData();
}

function searchData(value){
    let table = '';
    for(let i =0 ; i < addProduct.length ; i++){
    if(searchMood == 'title'){
        
            if(addProduct[i].title.startsWith(value.toLowerCase())){
                
        table += `
        <tr>
        <td>${i}</td>
        <td>${addProduct[i].title}</td>
        <td>${addProduct[i].price}</td>
        <td>${addProduct[i].taxes}</td>
        <td>${addProduct[i].ads}</td>
        <td>${addProduct[i].discount}</td>
        <td>${addProduct[i].total}</td>
        <td>${addProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    
            }
    }
    else{
        
            if(addProduct[i].category.startsWith(value.toLowerCase())){
                
        table += `
        <tr>
        <td>${i}</td>
        <td>${addProduct[i].title}</td>
        <td>${addProduct[i].price}</td>
        <td>${addProduct[i].taxes}</td>
        <td>${addProduct[i].ads}</td>
        <td>${addProduct[i].discount}</td>
        <td>${addProduct[i].total}</td>
        <td>${addProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    
            }
    }
    tableBody.innerHTML = table;
}
}