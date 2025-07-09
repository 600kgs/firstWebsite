/* item logic */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const container = document.getElementById('product-container');

  if (!productId) {
    container.innerHTML = "<p>Product ID is missing in URL.</p>";
    return;
  }

  fetch('/data/products.json')
    .then(response => response.json())
    .then(data => {
      const product = data.items.find(p => p.id === productId);

      if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
      } else {
        container.innerHTML = `
          <img src="${product.img}">
          <h1>${product.brand}</h1>
          <p>Category: ${product.category}<p>
          <p>Price: ${product.price}</p>
          <p>Description: ${product.description}</p>
          <a href="/index.html">Back to home</a>
        `;
      }
    })
    .catch(err => {
      container.innerHTML = "<p>Error loading product data.</p>";
      console.error(err);
    });
});