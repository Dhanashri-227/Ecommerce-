document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading and disable button
  document.getElementById('loading').classList.remove('hidden');
  const submitBtn = document.getElementById('sub');
  submitBtn.disabled = true;
  document.getElementById('message').classList.add('hidden');

  const ownername = document.querySelector("#ownername").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (ownername === "" || password === "") {
    alert("Please enter your name and password");
    submitBtn.disabled = false;
    document.getElementById('loading').classList.add('hidden');
    return;
  }

  try {
    const response = await fetch('https://ecommerce-2-5boh.onrender.com/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownername, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', data.token);

      const message = document.getElementById('message');
      message.textContent = "Login successful 🙂";
      message.className = 'message success';
      message.classList.remove('hidden');

      setTimeout(() => {
        window.location.href = "ecommerce.html";
      }, 1000);

      document.querySelector('form').reset();
    } else {
      const message = document.getElementById('message');
      message.textContent = data.error || "Error occurred, please try again.";
      message.className = 'message error';
      message.classList.remove('hidden');
    }
  } catch (error) {
    const message = document.getElementById('message');
    message.textContent = "An error occurred. Please try again.";
    message.className = 'message error';
    message.classList.remove('hidden');
  } finally {
    document.getElementById('loading').classList.add('hidden');
    submitBtn.disabled = false;

    setTimeout(() => {
      document.getElementById('message').classList.add('hidden');
    }, 3000);
  }
});
