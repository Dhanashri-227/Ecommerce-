document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

   // Show loading and disable button
  document.getElementById('loading').classList.remove('hidden');
  document.getElementsByClassName('submit').disabled = true;
  document.getElementById('message').classList.add('hidden');

   // your fetch code here
  const shopname = document.querySelector("#shopname").value;
  const ownername = document.querySelector("#ownername").value;
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value; // Add an age input in your HTML

 
if (shopname === "" || ownername === "" || password === "" || email === "") {
  alert("Please enter your name, email , age, and password");
} else {

  try {
  const response = await fetch('https://ecommerce-2-5boh.onrender.com/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      shopname : shopname,
      ownername : ownername ,
      password: password ,
      email: email
     
    })
    
  });
  const data = await response.json(); // If the response is JSON
  if (response.ok) {

          localStorage.setItem('authToken', data.token);

      // Show success message
      const message = document.getElementById('message');
      message.textContent = "Signup Successfull , New account has been created :)";
      message.className = 'message success';
      message.classList.remove('hidden');
  // Login successful, redirect to your main site
    window.location.href = "index.html"; // <-- CHANGE to your main site URL
    // alert("Form has been submitted :) ");
    document.querySelector('form').reset(); // <-- CHANGE to your main site URL
} else {
    // Show error message
      const message = document.getElementById('message');
      message.textContent = data.error || "Error occured while creating your account :( ";
      message.className = 'message error';
      message.classList.remove('hidden');
   
}
  }
  catch (error) {
    // Show error message
    const message = document.getElementById('message');
    message.textContent = "An error occurred. Please try again.";
    message.className = 'message error';
    message.classList.remove('hidden');
  } finally {
    // Hide loading and re-enable button
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('sub').disabled = false;
    // Hide message after 3 seconds
    setTimeout(() => {
      document.getElementById('message').classList.add('hidden');
    }, 3000);
  }
}
});