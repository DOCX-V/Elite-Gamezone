
        // Sample product data
        const products = [
            {
                id: 1,
                name: "PlayStation 5 Console",
                price: 499.99,
                category: "console",
                image: "🎮",
                description: "Next-gen gaming console with ultra-fast SSD and ray tracing"
            },
            {
                id: 2,
                name: "Xbox Series X",
                price: 499.99,
                category: "console",
                image: "🎮",
                description: "Most powerful Xbox ever with 4K gaming capabilities"
            },
            {
                id: 3,
                name: "Mechanical Gaming Keyboard",
                price: 129.99,
                category: "keyboard",
                image: "⌨️",
                description: "RGB backlit mechanical keyboard with Cherry MX switches"
            },
            {
                id: 4,
                name: "Wireless Gaming Controller",
                price: 69.99,
                category: "controller",
                image: "🎮",
                description: "Bluetooth wireless controller with haptic feedback"
            },
            {
                id: 5,
                name: "Gaming Headset Pro",
                price: 89.99,
                category: "accessory",
                image: "🎧",
                description: "7.1 surround sound gaming headset with noise cancellation"
            },
            {
                id: 6,
                name: "Gaming Mouse Precision",
                price: 79.99,
                category: "accessory",
                image: "🖱️",
                description: "High-precision gaming mouse with customizable DPI"
            },
            {
                id: 7,
                name: "Nintendo Switch OLED",
                price: 349.99,
                category: "console",
                image: "🎮",
                description: "Portable gaming console with vibrant OLED display"
            },
            {
                id: 8,
                name: "Gaming Chair Elite",
                price: 299.99,
                category: "accessory",
                image: "🪑",
                description: "Ergonomic gaming chair with lumbar support and RGB lighting"
            }
        ];

        // Application state
        let cart = [];
        let currentUser = null;
        let currentFilter = 'all';

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            updateCartCount();
        });

        // Product display functions
        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card fade-in';
                productCard.innerHTML = `
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">$${product.price}</div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn-wishlist" onclick="addToWishlist(${product.id})">♡</button>
                        </div>
                    </div>
                `;
                grid.appendChild(productCard);
            });
        }

        // Search functionality
        function searchProducts() {
            const searchTerm = event.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            
            if (currentFilter !== 'all') {
                const categoryFiltered = filteredProducts.filter(product => product.category === currentFilter);
                displayProducts(categoryFiltered);
            } else {
                displayProducts(filteredProducts);
            }
        }

        // Filter functionality
        function filterProducts(category) {
            currentFilter = category;
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            if (category === 'all') {
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        }

        // Cart functionality
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }

            updateCartCount();
            updateCartDisplay();
            showNotification('Product added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }

        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-count').textContent = count;
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#999;cursor:pointer;">×</button>
                `;
                cartItems.appendChild(cartItem);
                total += item.price * item.quantity;
            });

            cartTotal.textContent = total.toFixed(2);
        }

        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
            updateCartDisplay();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            if (!currentUser) {
                alert('Please login to checkout');
                showLogin();
                return;
            }

            alert('Checkout functionality would integrate with payment gateway here!');
        }

        // Wishlist functionality
        function addToWishlist(productId) {
            showNotification('Product added to wishlist!');
        }

        // User authentication
        function showLogin() {
            document.getElementById('loginModal').style.display = 'block';
        }

        function hideLogin() {
            document.getElementById('loginModal').style.display = 'none';
        }

        function showRegister() {
            document.getElementById('registerModal').style.display = 'block';
        }

        function hideRegister() {
            document.getElementById('registerModal').style.display = 'none';
        }

        function login(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simulate authentication
            if (email && password) {
                currentUser = {
                    name: 'John Doe',
                    email: email,
                    location: 'New York, USA'
                };
                
                updateUserInterface();
                hideLogin();
                showNotification('Login successful!');
            } else {
                alert('Please enter valid credentials');
            }
        }

        function register(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const location = document.getElementById('registerLocation').value;

            if (name && email && password && location) {
                currentUser = {
                    name: name,
                    email: email,
                    location: location
                };
                
                updateUserInterface();
                hideRegister();
                showNotification('Account created successfully!');
            } else {
                alert('Please fill in all fields');
            }
        }

        function logout() {
            currentUser = null;
            updateUserInterface();
            showNotification('Logged out successfully!');
        }

        function updateUserInterface() {
            const userActions = document.querySelector('.user-actions');
            
            if (currentUser) {
                userActions.innerHTML = `
                    <span>Welcome, ${currentUser.name}</span>
                    <button class="btn-secondary" onclick="showProfile()">Profile</button>
                    <button class="btn-secondary" onclick="logout()">Logout</button>
                    <div class="cart-icon" onclick="toggleCart()">
                        🛒
                        <span class="cart-count">0</span>
                    </div>
                `;
                
                // Update profile information
                document.getElementById('profileName').textContent = currentUser.name;
                document.getElementById('profileEmail').textContent = currentUser.email;
                document.getElementById('profileNameInput').value = currentUser.name;
                document.getElementById('profileEmailInput').value = currentUser.email;
                document.getElementById('profileLocationInput').value = currentUser.location;
            } else {
                userActions.innerHTML = `
                    <button class="btn-secondary" onclick="showLogin()">Login</button>
                    <button class="btn" onclick="showRegister()">Sign Up</button>
                    <div class="cart-icon" onclick="toggleCart()">
                        🛒
                        <span class="cart-count">0</span>
                    </div>
                `;
            }
            
            updateCartCount();
        }

        // Profile management
        function showProfile() {
            document.getElementById('userProfile').style.display = 'block';
            document.getElementById('home').style.display = 'none';
            document.getElementById('products').style.display = 'none';
        }

        function hideProfile() {
            document.getElementById('userProfile').style.display = 'none';
            document.getElementById('home').style.display = 'block';
            document.getElementById('products').style.display = 'block';
        }

        function updateProfile() {
            const name = document.getElementById('profileNameInput').value;
            const email = document.getElementById('profileEmailInput').value;
            const location = document.getElementById('profileLocationInput').value;

            if (currentUser) {
                currentUser.name = name;
                currentUser.email = email;
                currentUser.location = location;
                
                updateUserInterface();
                showNotification('Profile updated successfully!');
            }
        }

        // Utility functions
        function scrollToProducts() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }

        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #000000;
                color: #ffffff;
                padding: 1rem 2rem;
                border-radius: 6px;
                z-index: 3000;
                font-family: 'Afacad', sans-serif;
                font-weight: 600;
                animation: slideInRight 0.3s ease-out;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add animation styles for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            /* Mobile menu toggle */
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                cursor: pointer;
            }

            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: #000000;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 2rem;
                    transition: left 0.3s;
                }
                
                .nav-links.open {
                    left: 0;
                }
                
                .nav-links li {
                    margin: 1rem 0;
                }
                
                .user-actions {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .user-actions span {
                    font-size: 0.9rem;
                }
            }

            /* Enhanced hover effects */
            .product-card {
                position: relative;
                overflow: hidden;
            }
            
            .product-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s;
            }
            
            .product-card:hover::before {
                left: 100%;
            }

            /* Loading states */
            .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #000000;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Quantity controls in cart */
            .quantity-controls {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }

            .quantity-btn {
                background: #f0f0f0;
                border: 1px solid #ddd;
                width: 30px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }

            .quantity-btn:hover {
                background: #e0e0e0;
            }

            /* Enhanced form styling */
            .form-group input:focus {
                box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
            }

            /* Back to top button */
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #000000;
                color: #ffffff;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                z-index: 1000;
                transition: all 0.3s;
            }

            .back-to-top:hover {
                background: #333333;
                transform: translateY(-2px);
            }

            .back-to-top.show {
                display: flex;
            }
        `;
        document.head.appendChild(style);

        // Enhanced cart functionality with quantity controls
        function updateCartItemQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartCount();
                    updateCartDisplay();
                }
            }
        }

        // Enhanced cart display with quantity controls
        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align:center;color:#666;padding:2rem;">Your cart is empty</p>';
                cartTotal.textContent = '0.00';
                return;
            }

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#999;cursor:pointer;font-size:1.2rem;">×</button>
                `;
                cartItems.appendChild(cartItem);
                total += item.price * item.quantity;
            });

            cartTotal.textContent = total.toFixed(2);
        }

        // Mobile menu functionality
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('open');
        }

        // Back to top functionality
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            const backToTop = document.querySelector('.back-to-top');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // Add back to top button
        document.addEventListener('DOMContentLoaded', function() {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.onclick = scrollToTop;
            document.body.appendChild(backToTopBtn);
        });

        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            const loginModal = document.getElementById('loginModal');
            const registerModal = document.getElementById('registerModal');
            
            if (event.target === loginModal) {
                hideLogin();
            }
            if (event.target === registerModal) {
                hideRegister();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hideLogin();
                hideRegister();
                document.getElementById('cartSidebar').classList.remove('open');
            }
        });

        // Add mobile menu toggle to header
        document.addEventListener('DOMContentLoaded', function() {
            const headerContent = document.querySelector('.header-content');
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '☰';
            mobileToggle.onclick = toggleMobileMenu;
            
            // Insert before user actions
            headerContent.insertBefore(mobileToggle, document.querySelector('.user-actions'));
        });

        // Enhanced product sorting
        function sortProducts(sortBy) {
            let sortedProducts = [...products];
            
            switch(sortBy) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    sortedProducts = products;
            }
            
            if (currentFilter !== 'all') {
                sortedProducts = sortedProducts.filter(product => product.category === currentFilter);
            }
            
            displayProducts(sortedProducts);
        }

        // Add sort dropdown after filter buttons
        document.addEventListener('DOMContentLoaded', function() {
            const filterOptions = document.querySelector('.filter-options');
            const sortSelect = document.createElement('select');
            sortSelect.style.cssText = `
                padding: 0.7rem 1.2rem;
                border: 2px solid #e0e0e0;
                border-radius: 6px;
                font-family: 'Afacad', sans-serif;
                font-weight: 500;
                cursor: pointer;
                background: #ffffff;
            `;
            sortSelect.innerHTML = `
                <option value="default">Sort by</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
            `;
            sortSelect.onchange = function() {
                sortProducts(this.value);
            };
            filterOptions.appendChild(sortSelect);
        });

        console.log('Elite Gamezone - Website loaded successfully!');
