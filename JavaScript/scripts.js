// ACCORDION INTERACTIVITY
const accordions = document.querySelectorAll(".accordion-btn");

accordions.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // Close other accordions
    document.querySelectorAll(".accordion-content").forEach(item => {
      if (item !== content) {
        item.style.maxHeight = null;
      }
    });

    // Toggle the selected accordion
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// LIGHTBOX GALLERY
const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

if (lightbox && closeBtn && galleryImages.length > 0) {
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// DYNAMIC SERVICES DATA
const servicesData = [
  { name: "Cornrows", price: "R80", image: "_images/Wig lines.png" },
  { name: "Tribal Braids", price: "R250", image: "_images/Long Tribals.png" },
  { name: "Knotless Braids", price: "R300–R360", image: "_images/Small Knotless.png" },
  { name: "Boho Braids", price: "R470", image: "_images/Boho Braids.png" },
  { name: "Island Twists", price: "R400–R450", image: "_images/Island Twists.png" },
  { name: "Boho Locs", price: "R350", image: "_images/Boho Locs.png" }
];

const serviceList = document.getElementById("serviceList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// Helper function
function extractMinPrice(priceStr) {
  const numbers = priceStr.match(/\d+/g);
  return numbers ? parseInt(numbers[0]) : 0;
}

// Display services dynamically
function displayServices(list) {
  if (!serviceList) return;
  serviceList.innerHTML = "";
  list.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <img src="${service.image}" alt="${service.name}">
      <h3>${service.name}</h3>
      <p>${service.price}</p>
    `;
    serviceList.appendChild(card);
  });
}

// Initial load
if (serviceList) displayServices(servicesData);

// Search functionality
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = servicesData.filter(service =>
      service.name.toLowerCase().includes(term)
    );
    displayServices(filtered);
  });
}

// Sort functionality
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    let sorted = [...servicesData];

    if (sortSelect.value === "low-high") {
      sorted.sort((a, b) => extractMinPrice(a.price) - extractMinPrice(b.price));
    } else if (sortSelect.value === "high-low") {
      sorted.sort((a, b) => extractMinPrice(b.price) - extractMinPrice(a.price));
    }

    //if search box is empty, show all services (don’t filter)
    if (!searchInput || !searchInput.value.trim()) {
      displayServices(sorted);
      return;
    }

    // Otherwise, filter based on search input
    const term = searchInput.value.toLowerCase();
    const filtered = sorted.filter(service =>
      service.name.toLowerCase().includes(term)
    );
    displayServices(filtered);
  });
}


// BOOKING FORM VALIDATION
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const hairstyle = document.getElementById("hairstyle");
    const date = document.getElementById("date");

  
   // Validate required fields (special request is optional)
  if (!name.value.trim() || !email.value.trim() || hairstyle.value === "" || !date.value) {
  alert("Please fill in all required fields before submitting (Name, Email, Hairstyle, and Date).");
  return;
  }


    // Email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Redirect to confirmation page
    window.location.href = "booking-confirmation.html";
  });
}

// ENQUIRY FORM VALIDATION
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const type = document.getElementById("messageType");
    const message = document.getElementById("message");

    let isValid = true;

    // Helper function to show error message
    function showError(input, message) {
      const error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.fontSize = "0.9em";
      error.textContent = message;
      input.insertAdjacentElement("afterend", error);
      isValid = false;
    }

    // Validate full name
    if (!name.value.trim()) {
      showError(name, "Please enter your full name.");
    }

    // Validate email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.value.trim()) {
      showError(email, "Please enter your email address.");
    } else if (!emailPattern.test(email.value)) {
      showError(email, "Please enter a valid email address.");
    }

    // Validate message type
    if (!type.value) {
      showError(type, "Please select a message type.");
    }

    // Validate message content
    if (!message.value.trim()) {
      showError(message, "Please enter your enquiry.");
    }

    // If valid, show success and reset
    if (isValid) {
      document.getElementById("contactResponse").textContent =
        "Thank you! Your message has been sent successfully.";
      document.getElementById("contactResponse").style.color = "green";
      contactForm.reset();
    }
  
    // Redirect to enquiry confirmation page
    window.location.href = "enquiry-confirmation.html";
  });
}
