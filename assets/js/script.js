'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
}

/**
 * toggle navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
  });
}





/**
 * header active when window scrolled down
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 50 ? header.classList.add("active")
    : header.classList.remove("active");
});

// 
// 

// Open the donation popup
function openDonationPopup() {
  document.getElementById('donationPopup').style.display = 'flex';
  document.getElementById('paymentMethod').value = 'crypto';
  updateCryptoDetails();
}

// Close the donation popup
function closeDonationPopup() {
  document.getElementById('donationPopup').style.display = 'none';
}

// Change payment method based on selection
function changePaymentMethod() {
  const method = document.getElementById('paymentMethod').value;
  document.getElementById('cryptoPayment').style.display = 'none';
  document.getElementById('paypalPayment').style.display = 'none';
  document.getElementById('cardPayment').style.display = 'none';

  if (method === 'crypto') {
    document.getElementById('cryptoPayment').style.display = 'block';
  } else if (method === 'paypal') {
    document.getElementById('paypalPayment').style.display = 'block';
  } else if (method === 'card') {
    document.getElementById('cardPayment').style.display = 'block';
  }
}

// Update crypto QR code and address when different crypto is selected
function updateCryptoDetails() {
  const crypto = document.getElementById('cryptoSelect').value;
  const qrImage = document.getElementById('cryptoQR');
  const addressText = document.getElementById('cryptoAddress');

  switch (crypto) {
    case 'bitcoin':
      qrImage.src = './assets/images/btc.jpg';
      addressText.textContent = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      break;
    case 'ethereum':
      qrImage.src = './assets/images/eth.jpg';
      addressText.textContent = '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe';
      break;
    case 'xrp':
      qrImage.src = './assets/images/xrp.jpg';
      addressText.textContent = 'rEXAMPLEADDRESSXRP';
      break;
    case 'bnb':
      qrImage.src = './assets/images/bnb.jpg';
      addressText.textContent = 'bnbEXAMPLEADDRESS';
      break;
    case 'usdt':
      qrImage.src = './assets/images/usdt.jpg';
      addressText.textContent = 'usdtEXAMPLEADDRESS';
      break;
  }
}

// Copy crypto address to clipboard
function copyCryptoAddress() {
  const address = document.getElementById('cryptoAddress').textContent;
  const copyButton = document.querySelector('.copy-btn');

  navigator.clipboard.writeText(address).then(() => {
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 2000); // Revert back to "Copy" after 2 seconds
  }).catch(() => {
    alert('Failed to copy address!');
  });
}

// Handle form submission with Formspree
document.getElementById('donationForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const submitButton = this.querySelector('.form-button');
  submitButton.textContent = 'Submitting...';
  submitButton.disabled = true; // Disable the button to prevent multiple submissions

  // Use Formspree's fetch API to submit the form
  const formData = new FormData(this);
  fetch(this.action, {
    method: this.method,
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        submitButton.textContent = 'Submitted!';
        setTimeout(() => {
          submitButton.textContent = 'Submit';
          submitButton.disabled = false; // Re-enable the button after 2 seconds
        }, 2000); // Revert back to "Submit" after 2 seconds
        this.reset(); // Clear the form fields
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      submitButton.textContent = 'Submit';
      submitButton.disabled = false; // Re-enable the button on error
      alert('Form submission failed. Please try again.');
    });
});

// Close donation popup
function closeDonationPopup() {
  document.getElementById('donationPopup').style.display = 'none';
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testi-card');
const dots = document.querySelectorAll('.testi-dots .dot');

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.style.transform = `translateX(${100 * (i - index)}%)`; // Move cards horizontally
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}

// Automatically slide testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initialize the first testimonial
showTestimonial(currentTestimonial);

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const submitButton = this.querySelector('.form-button');
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true; // Disable the button to prevent multiple submissions

  // Log form data for debugging
  const formData = new FormData(this);
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Use Formspree's fetch API to submit the form
  fetch(this.action, {
    method: this.method,
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        submitButton.textContent = 'Sent!';
        setTimeout(() => {
          submitButton.textContent = 'Send Message';
          submitButton.disabled = false; // Re-enable the button after 2 seconds
        }, 2000); // Revert back to "Send Message" after 2 seconds
        this.reset(); // Clear the form fields
      } else {
        // Log the response for debugging
        response.json().then((data) => {
          console.error('Formspree Error:', data);
          throw new Error('Form submission failed');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false; // Re-enable the button on error
      alert('Message sending failed. Please try again.');
    });
});