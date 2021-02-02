// DEFINE UI VARIABLES
const product = document.querySelector('#product-form');
const addBtn = document.querySelector('.add');
const clearBtn = document.querySelector('.clear');
const prodInput = document.querySelector('#product');
const prodList = document.querySelector('.collection');

// LOAD EVENT LISTENERS
loadEventListeners();
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getProducts);

  // Add product event
  addBtn.addEventListener('click', addProduct);

  // Remove product
  prodList.addEventListener('click', removeProduct);

  // Clear product
  clearBtn.addEventListener('click', clearProduct);
}

// Add Product
function addProduct(e) {
  if (prodInput.value !== '') {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(prodInput.value));

    // Create a link element
    const link = document.createElement('a');
    // Add class to link element
    link.className = 'delete-item';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);
    // Append li to ul
    prodList.appendChild(li);

    // STORE IN LS
    storeProductInLocalStorage(prodInput.value);

    // Clear input
    prodInput.value = '';

    e.preventDefault();
  }
}

// Remove Product
function removeProduct(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    // REMOVE FROM LS
    removeProductInLocalStorage(e.target.parentElement.parentElement);
  }
}

// Clear Product
function clearProduct(e) {
  while (prodList.firstChild) {
    prodList.removeChild(prodList.firstChild);

    // CLEAR FROM LS
    clearProductInLocalStorage();
  }
}

// LOCAL STORAGE FUNCTION
// Get Products from LS
function getProducts() {
  let products;
  if (localStorage.getItem('products') === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  products.forEach(function (products) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(products));

    // Create a link element
    const link = document.createElement('a');
    // Add class to link element
    link.className = 'delete-item';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);
    // Append li to ul
    prodList.appendChild(li);
  });
}

// Store Product in LS
function storeProductInLocalStorage(prod) {
  let products;
  if (localStorage.getItem('products') === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  products.push(prod);

  localStorage.setItem('products', JSON.stringify(products));
}

// Clear Product in LS
function clearProductInLocalStorage() {
  localStorage.clear();
}

// Remove Product in LS
function removeProductInLocalStorage(prod) {
  let products;
  if (localStorage.getItem('products') === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  products.forEach(function (prods, index) {
    if (prod.textContent === prods) {
      products.splice(index, 1);
    }
  });

  localStorage.setItem('products', JSON.stringify(products));
}
