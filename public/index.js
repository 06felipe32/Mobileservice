document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    const rowProduct = document.querySelector('.row-product');

    // Lista de todos los contenedores de productos
    const productsList = document.querySelector('.container-items');

    // Variable de arreglos de Productos
    let allProducts = [];

    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');

    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.closest('.item');
            const productTitle = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
            const productImage = product.querySelector('img').src;

            const infoProduct = {
                quantity: 1,
                title: productTitle,
                price: productPrice,
                image: productImage
            };

            const exists = allProducts.some(product => product.title === infoProduct.title);

            if (exists) {
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                allProducts = [...products];
            } else {
                allProducts = [...allProducts, infoProduct];
            }

            updateCartCounter(); // Actualizar el contador de productos en el carrito
            showHTML();
        }

        if (e.target.classList.contains('btn-toggle-details')) {
            const product = e.target.closest('.item');
            const details = product.querySelector('.product-details');
            details.classList.toggle('hidden');
            e.target.textContent = details.classList.contains('hidden') ? 'Mostrar detalles' : 'Ocultar detalles';
        }

        if (e.target.classList.contains('btn-buy')) {
            const confirmPurchase = confirm('¿Está seguro de que desea comprar este producto?');
            if (confirmPurchase) {
                window.location.href = 'gracias.html'; // Ajusta la URL a tu página de confirmación
            }
        }
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('icon-close')) {
            const product = e.target.closest('.cart-product');
            const title = product.querySelector('p').textContent;

            allProducts = allProducts.filter(product => product.title !== title);

            updateCartCounter(); // Actualizar el contador de productos en el carrito
            showHTML();
        }
    });

    // Funcion para mostrar HTML
    const showHTML = () => {
        if (!allProducts.length) {
            cartEmpty.classList.remove('hidden');
            rowProduct.classList.add('hidden');
            cartTotal.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }

        // Limpiar HTML
        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <img class="product-image" src="${product.image}" alt="Imagen del producto">
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">$${product.price.toFixed(2)}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            rowProduct.append(containerProduct);

            total += product.quantity * product.price;
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total.toFixed(2)}`;
        countProducts.innerText = totalOfProducts;
    };

    // Función para actualizar el contador de productos en el carrito
    const updateCartCounter = () => {
        const totalOfProducts = allProducts.reduce((acc, product) => acc + product.quantity, 0);
        countProducts.innerText = totalOfProducts;
    };
});
