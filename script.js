reader.onload = async function () {
  const base64 = reader.result.split(',')[1];

  const formBody = new URLSearchParams();
  formBody.append("name", name);
  formBody.append("phone", phone);
  formBody.append("email", email);
  formBody.append("college", college);
  formBody.append("screenshot", base64); // base64 string

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxTjPY4QCABqujgHNsuCrIp4_5fZ2H9FgqkJZ-hqmK54aNoAwZypdiNwW319vNnW-8j_A/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody.toString(),
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
