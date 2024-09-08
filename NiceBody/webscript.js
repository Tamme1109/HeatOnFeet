const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

  let products = [];
        let currentIndex = 0;
        const itemsPerPage = 4;

        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                initCarousel();
            })
            .catch(error => console.error('Error fetching the products:', error));

        function initCarousel() {
            const listProductHTML = document.querySelector('.listProduct');

            // Add product elements to the carousel
            products.forEach(product => listProductHTML.appendChild(createProductElement(product)));

            updatePointers();
        }

        function createProductElement(product) {
            let newProduct = document.createElement('a');
            newProduct.href = '/detail.html?id=' + product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
            `;
            return newProduct;
        }

        function nextPage() {
            const listProductHTML = document.querySelector('.listProduct');
            currentIndex += itemsPerPage;
            if (currentIndex >= products.length) {
                currentIndex = 0;
            }
            listProductHTML.style.transition = 'transform 0.5s ease-in-out';
            listProductHTML.style.transform = `translateX(-${currentIndex * (100 / itemsPerPage)}%)`;
        }

        function prevPage() {
            const listProductHTML = document.querySelector('.listProduct');
            currentIndex -= itemsPerPage;
            if (currentIndex < 0) {
                currentIndex = products.length - 4;
            }
            listProductHTML.style.transition = 'transform 0.5s ease-in-out';
            listProductHTML.style.transform = `translateX(-${currentIndex * (100 / itemsPerPage)}%)`;
        }

        function updatePointers() {
            const prevPointer = document.getElementById('prev-pointer');
            const nextPointer = document.getElementById('next-pointer');
            prevPointer.style.display = products.length <= itemsPerPage ? 'none' : 'inline';
            nextPointer.style.display = products.length <= itemsPerPage ? 'none' : 'inline';

            prevPointer.addEventListener('click', prevPage);
            nextPointer.addEventListener('click', nextPage);
        }


