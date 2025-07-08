let shareClicks = 0;
const maxShares = 5;

// Restore previous submission state
if (localStorage.getItem('submitted') === 'true') {
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('finalMsg').style.display = 'block';
}

// WhatsApp Sharing Logic
document.getElementById('shareBtn').addEventListener('click', () => {
  if (shareClicks < maxShares) {
    shareClicks++;
    document.getElementById('shareCount').textContent = `Click count: ${shareClicks}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    if (shareClicks === maxShares) {
      document.getElementById('shareComplete').style.display = 'block';
    }
  }
});

// Form Submission
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareClicks < maxShares) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const fileInput = document.getElementById('screenshot');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbztxdxbL6XlTifWiztJOHj0rlsu6nl0g8sE63py41BUShjvk2-B2PtAu95ulnFLMop--Q/exec", {

      method: "POST",
      body: formData,
    });

    if (response.ok) {
      document.getElementById('registrationForm').style.display = 'none';
      document.getElementById('finalMsg').style.display = 'block';
      localStorage.setItem('submitted', 'true');
    } else {
      alert("Failed to submit. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Error submitting the form.");
  }
});
