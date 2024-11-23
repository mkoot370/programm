document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".btn-primary").addEventListener("click", () => {
    const address = document.querySelector(
      'input[placeholder="Street, building, apartment"]'
    ).value;
    const personName = document.querySelector(
      'input[placeholder="Name"]'
    ).value;
    const cardNumber = document.querySelector(
      'input[placeholder="1234 5678 435678"]'
    ).value;
    const expiry = document.querySelector('input[placeholder="MM/YYYY"]').value;
    const cvv = document.querySelector('input[placeholder="***"]').value;

    if (address && personName && cardNumber && expiry && cvv) {
      alert("Payment successful! Thank you for your payment.");
    } else {
      alert("Please fill in all fields before proceeding with the payment.");
    }
  });
});
