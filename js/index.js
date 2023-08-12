//! select inputs
let productName = document.querySelector("#productName");
let productModel = document.querySelector("#productModel");
let productPrice = document.querySelector("#productPrice");
let productDesc = document.querySelector("#productDesc");

//!select buttons
let addProductBtn = document.querySelector("#addProductBtn");
let updateProductBtn = document.querySelector("#updateProductBtn");

// ! select msg
let invalidName = document.getElementById("invalidName");
let invalidPrice = document.getElementById("invalidPrice");
let invalidModel = document.getElementById("invalidModel");
let invalidDesc = document.getElementById("invalidDesc");
let requiredInputs = document.getElementById("requiredInputs");

let searchInput = document.getElementById("searchInput");
let productList;   // to store all the products

let updateIndex; // global variable to store the index of the updated product

addProductBtn.addEventListener("click", addProduct);
updateProductBtn.addEventListener("click", updateProduct);
searchInput.addEventListener("input", function () {
    searchData(this.value);
});
productName.addEventListener("input", validateName);
productPrice.addEventListener("input", validatePrice);
productModel.addEventListener("input", validateModel);
productDesc.addEventListener("input", validateDesc);

// check if the localStorage is empty or not
if (localStorage.getItem("productList") == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
    display();
}

// ADD PRODUCT IN THE ARRAY AND LOCALSTORAGE
function addProduct() {

    if (productName.value == '' || productModel.value == '' || productPrice.value == '' || productDesc.value == '') {
        requiredInputs.classList.replace("d-none", "d-block");
        return false;
    }

    if (validateName() == true && validateModel() == true && validatePrice() == true && validateDesc() == true) {

        //create object to store the properities of each product
        let product = {
            proName: productName.value,
            proModel: productModel.value,
            proPrice: productPrice.value,
            proDesc: productDesc.value
        };
        productList.push(product);  //set the object in the array

        //set the array in local storage
        localStorage.setItem("productList", JSON.stringify(productList));

        display();  //display the data after setting it in localstorage and the array

        resetInputs();  //to reset the inputs after display adding it in the array
    }
}

// DISPLAY ALL PRODUCTS IN THE TABLE
function display() {

    let table = ``;

    for (let i = 0; i < productList.length; i++) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${productList[i].proName}</td>
        <td>${productList[i].proModel}</td>
        <td>${productList[i].proPrice}</td>
        <td>${productList[i].proDesc}</td>
        <td><button id="updateBtn" onclick="getDataToUpdate(${i})" class="cstm-btn"><i class="fa-solid fa-pen mx-1"></i>Update</button></td>
        <td><button id="deleteBtn" onclick="(deleteProduct(${i}))" class="cstm-btn"><i class="fa-solid fa-trash mx-1"></i>Delete</button></td>
    </tr>`;
    }
    document.querySelector("#tBody").innerHTML = table;
    getAllNum();  //to display the number of all products
}

// TO DISPLAY THE TOTAL NUMBER OF ALL PRODUCTS IF EXIST
function getAllNum() {
    let allProducts = document.getElementById("allProducts");
    if (productList.length > 0) {
        allProducts.innerHTML = `All products (${productList.length})`;
        document.querySelector(".allProducts").classList.replace("d-none", "d-block");
    } else {
        allProducts.innerHTML = ``;
    }
}

// RESET THE INPUTS
function resetInputs() {
    productName.value = "";
    productModel.value = "";
    productPrice.value = "";
    productDesc.value = "";
    productName.classList.remove("is-valid");
    productModel.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
}

// DELETE PRODUCT FROM THE ARRAY AND LOCALSTPRAGE
function deleteProduct(i) {
    productList.splice(i, 1);  //delete from the array
    localStorage.product = JSON.stringify(productList); //set changes in localstorage
    display();
}

// PREPARE THE DATA TO UPDATE IT
function getDataToUpdate(i) {
    //display the values of the selected product to update
    productName.value = productList[i].proName;
    productModel.value = productList[i].proModel;
    productPrice.value = productList[i].proPrice;
    productDesc.value = productList[i].proDesc;
    // change buttons
    updateProductBtn.classList.replace("d-none", "d-block");
    addProductBtn.classList.replace("d-block", "d-none");
    scroll({
        top: 0,
        behavior: "smooth"
    });
    updateIndex = i;
}

// UPDATE PRODUCT AND SAVE IT IN THE ARRAY AND LOCALSTORAG
function updateProduct() {
    // save changes in the array
    productList[updateIndex].proName = productName.value;
    productList[updateIndex].proModel = productModel.value;
    productList[updateIndex].proPrice = productPrice.value;
    productList[updateIndex].proDesc = productDesc.value;

    // save the updated array in localStorage
    localStorage.setItem("productList", JSON.stringify(productList));
    display(); //display the data after changes
    // change buttons
    addProductBtn.classList.replace("d-none", "d-block");
    updateProductBtn.classList.replace("d-block", "d-none");
    resetInputs();
}

function searchData(value) {
    let foundedItems = 0;
    let table = ``;
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].proName.toLowerCase().includes(value.toLowerCase())) {
            foundedItems++;
            table += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].proName}</td>
        <td>${productList[i].proModel}</td>
        <td>${productList[i].proPrice}</td>
        <td>${productList[i].proDesc}</td>
        <td><button id="updateBtn" onclick="getDataToUpdate(${i})" class="cstm-btn"><i class="fa-solid fa-pen mx-1"></i>Update</button></td>
        <td><button id="deleteBtn" onclick="(deleteProduct(${i}))" class="cstm-btn"><i class="fa-solid fa-trash mx-1"></i>Delete</button></td>
        </tr> `
        };
    }
    document.querySelector("#tBody").innerHTML = table;
    document.getElementById("allProducts").innerHTML = `Founded items(${foundedItems})`;
}

// V A L I D A T I O N

function validateName() {
    let regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(productName.value) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        invalidName.classList.add("d-none");
        return true;
    } else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        invalidName.classList.remove("d-none");
        return false;
    }
}

function validateModel() {
    let regex = /^(tv|laptop|mobile)$/;

    if (regex.test(productModel.value.toLowerCase()) == true) {
        productModel.classList.add("is-valid");
        productModel.classList.remove("is-invalid");
        invalidModel.classList.add("d-none");
        return true;
    } else {
        productModel.classList.add("is-invalid");
        productModel.classList.remove("is-valid");
        invalidModel.classList.remove("d-none");
        return false;
    }
}

function validatePrice() {
    let regex = /^([1-9][0-9]{3}|10000)$/;

    if (regex.test(productPrice.value) == true) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        invalidPrice.classList.add("d-none");
        return true;
    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        invalidPrice.classList.remove("d-none");
        return false;
    }
}

function validateDesc() {
    let regex = /^([a-zA-Z]|\s){25,}$/gm;

    if (regex.test(productDesc.value) == true) {
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
        invalidDesc.classList.add("d-none");
        return true;
    } else {
        productDesc.classList.add("is-invalid");
        productDesc.classList.remove("is-valid");
        invalidDesc.classList.remove("d-none");
        return false;
    }
}