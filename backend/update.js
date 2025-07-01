document.getElementById('products-container').addEventListener('click', function(event) {
  const card = event.target.closest('.product-card');
  const productId = card?.getAttribute('data-id');

  if (event.target.classList.contains('update-btn')) {
    // Simple prompt-based update (for demo)
    const newPrice = prompt('Enter new price:', card.querySelector('p:nth-child(4)').textContent.replace(/\D/g, ''));
    const newStock = prompt('Enter new stock:', card.querySelector('p:nth-child(5)').textContent.replace(/\D/g, ''));

    if (newPrice && newStock) {
      fetch(`https://ecommerce-2-5boh.onrender.com/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: Number(newPrice), stock: Number(newStock) })
      })
      .then(res => res.json())
      .then(updatedProduct => {
        // Optionally, re-fetch products or update the card's content directly
        card.querySelector('p:nth-child(4)').innerHTML = `<strong>Price (in rupees):</strong> ${updatedProduct.price}`;
        card.querySelector('p:nth-child(5)').innerHTML = `<strong>Stock:</strong> ${updatedProduct.stock}`;
        card.querySelector('p:nth-child(6)').innerHTML = `<strong>Total Money Invested:</strong> ${updatedProduct.price * updatedProduct.stock}`;
      });
    }
  }
});