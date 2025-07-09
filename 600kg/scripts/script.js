/* placing items logic */
fetch('./data/products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("items-container");

    data.items.forEach(item => {
      const itemLink = document.createElement("a");
      itemLink.href = `/product.html?id=${item.id}`;
      itemLink.innerHTML = `
        <div class="item" data-category="${item.category}" data-brand="${item.brand}">
          <img src="${item.img}" alt="${item.brand}">
          <h2>${item.description}</h2>
          <h3>${item.price}</h3>
        </div>
      `;
      container.appendChild(itemLink);
    });

/* filtering logic */
    function applyFilters() {
      const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value.toLowerCase());
      const selectedBrands = Array.from(document.querySelectorAll('.filter-brand:checked')).map(cb => cb.value.toLowerCase());
      const searchTerm = searchInput.value.toLowerCase();
      const allItems = document.querySelectorAll('.item');

      allItems.forEach(item => {
        const category = item.dataset.category.toLowerCase();
        const brand = item.dataset.brand.toLowerCase();
        const textContent = item.textContent.toLowerCase();

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
        const matchesSearch = searchTerm === '' || textContent.includes(searchTerm);

        if (matchesCategory && matchesBrand && matchesSearch) {
          item.parentElement.style.display = "";
        } else {
          item.parentElement.style.display = "none";
        }
      });
    }

    document.querySelectorAll('.filter-category, .filter-brand').forEach(cb => {
      cb.addEventListener('change', applyFilters);
    });

    searchInput.addEventListener('input', applyFilters);
  })
  .catch(err => console.error("Error loading products:", err));


const searchInput = document.getElementById('search-input');

/* fixed header */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.style.position = "fixed";
  } else {
    header.style.position = "static";
  }
});

/* burger menu */
const burger = document.querySelector('.burger-menu');
const mobileNav = document.getElementById('mobile-navigation');

burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});