// Login Function
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    // Simulating form submission with validation
    if (username === '' || password === '') {
      alert('Please fill in all fields.');
    } else {
      alert('Login successful!');
      // Implement your login logic here (e.g., server authentication)
    }
  }
  
  // Signup Function
  function signup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    // Simulating form submission with validation
    if (username === '' || email === '' || password === '') {
      alert('Please fill in all fields.');
    } else {
      alert('Signup successful!');
      // Implement your signup logic here (e.g., server-side user registration)
    }
  }
  

  // Sample products in the cart
// Array to store cart items in local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart
function addToCart(name, price, image) {
  const product = {
    name: name,
    price: price,
    image: image
  };

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
  alert(`${name} has been added to your cart!`);
}

// Function to get cart items from local storage
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to render cart items on the cart page
// Function to render cart items on the cart page
function renderCartItems() {
  const cartItemsContainer = document.querySelector("#cartItems");
  const itemCount = document.getElementById("cartItemCount");
  const totalPrice = document.getElementById("cartTotalPrice");
  const emptyCartMsg = document.getElementById("emptyCartMsg");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartItemsContainer.innerHTML = ""; // Clear previous items

  const cart = getCartItems();

  if (cart.length === 0) {
    emptyCartMsg.style.display = "block";
    itemCount.textContent = "0";
    totalPrice.textContent = "0.00";
    checkoutBtn.disabled = true;
  } else {
    emptyCartMsg.style.display = "none";
    let total = 0;
    cart.forEach((item) => {
      total += item.price;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="card mb-3">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Price: ₹${item.price}</p>
            <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    itemCount.textContent = cart.length;
    totalPrice.textContent = total.toFixed(2);
    checkoutBtn.disabled = false;
  }
}

// Remove item function
function removeFromCart(productName) {
  let cart = getCartItems();
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems(); // Re-render the cart after removal
}


// Function to remove item from the cart
function removeFromCart(name) {
  let cart = getCartItems();
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems(); // Re-render cart items
}

// Initialize the cart page on load
document.addEventListener("DOMContentLoaded", renderCartItems);


// Function to add items to cart
function addToCart(productId, productName, price) {
  fetch('add_to_cart.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `product_id=${productId}&product_name=${productName}&price=${price}`
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          alert(data.message);
      } else {
          alert('Failed to add product to cart.');
      }
  })
  .catch(error => console.error('Error:', error));
}

function addToCart(productName, productPrice, productImage) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "add_to_cart.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          alert('Item added to cart!');
      }
  };

  xhr.send(`product_name=${productName}&product_price=${productPrice}&product_image=${productImage}`);
}
