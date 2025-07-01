
document.getElementById('products-container').addEventListener('click', function(event) {
      const card = event.target.closest('.product-card');
      const productId = card?.getAttribute('data-id');

  if (event.target.classList.contains('delete-btn')) {
    fetch(`https://ecommerce-2-5boh.onrender.com/products/${productId}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        card.remove(); // Remove card from DOM
      } else {
        alert('Failed to delete product.');
      }
    });
  }
});
