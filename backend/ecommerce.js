
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();
  // your fetch code here
  const company = document.querySelector("#company").value;
  const model = document.querySelector("#model").value;
  const details = document.querySelector("#details").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;

  const response = await fetch('https://ecommerce-bomr.onrender.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify({
      company : company ,
      model : model ,
      details : details ,
      price : price ,
      stock : stock
    })
  });
//   const data = await response.json();
  const data = await response.json(); // If the response is JSON
  console.log(data);
  console.log('Response:', data);  // If the response is JSON
 if(!response.ok){
    alert("problem occured");
 }
  if (response.ok) {
  // Login successful, redirect to your main site
    // window.location.href = "ecommerce.html";
    //console.log("product added successfully :) ");
    console.log(`${company} added successfuly :) `)
    document.querySelector('form').reset(); // <-- CHANGE to your main site URL
} else {
  // Success logic here
    alert(data.error || "product not added :(");
}
  
});