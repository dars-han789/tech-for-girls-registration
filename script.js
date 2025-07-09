let shareClicks = 0;
const maxShares = 5;

// Allow only numbers in phone input
document.getElementById('phone').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
});

// Check if already submitted
if (localStorage.getItem('submitted') === 'true') {
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('finalMsg').style.display = 'block';
}

// WhatsApp Share Button (only after form filled)
document.getElementById('shareBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();

  if (!name || !phone || !email || !college) {
    alert("Please fill out the form completely before sharing.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (shareClicks < maxShares) {
    shareClicks++;
    document.getElementById('shareCount').textContent = `Click count: ${shareClicks}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    window.open(`https://wa.me/?text=${message}`, '_blank');

    if (shareClicks === maxShares) {
      document.getElementById('shareComplete').style.display = 'block';
    }
  }
});

// Form submission logic
document.getElementById('registrationForm').addEventListener('submit', (e) => {
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

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function () {
    const base64 = reader.result.split(',')[1];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("screenshot", base64);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxTjPY4QCABqujgHNsuCrIp4_5fZ2H9FgqkJZ-hqmK54aNoAwZypdiNwW319vNnW-8j_A/exec", {
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
  };

  reader.readAsDataURL(file);
});
