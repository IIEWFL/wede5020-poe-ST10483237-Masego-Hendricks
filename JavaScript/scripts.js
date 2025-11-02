// Accordion Interactivity with Smooth Animation
const accordions = document.querySelectorAll(".accordion-btn");

accordions.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // Close all other accordions smoothly
    document.querySelectorAll(".accordion-content").forEach(item => {
      if (item !== content) {
        item.style.maxHeight = null;
      }
    });

    // Toggle this accordion
    if (content.style.maxHeight) {
      content.style.maxHeight = null; // close
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // open
    }
  });
});

//  Lightbox Gallery 
const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

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

// Dynamic Services Data
const servicesData = [
  { name: "Cornrows", price: "R80", image: "_images/Wig lines.png" },
  { name: "Tribal Braids", price: "R250", image: "_images/Long Tribals.png" },
  { name: "Knotless Braids", price: "R300–R360", image: "_images/Small Knotless.png" },
  { name: "Boho Braids", price: "R470", image: "_images/Boho Braids.png" },
  { name: "Island Twists", price: "R400–R450", image: "_images/Island Twists.png" },
  { name: "Boho Locs", price: "R350", image: "_images/Boho Locs.png" }
];

// Dynamically Load Services 
const serviceList = document.getElementById("serviceList");

function displayServices(list) {
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
displayServices(servicesData);

// Search Functionality
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = servicesData.filter(service =>
    service.name.toLowerCase().includes(searchTerm)
  );
  displayServices(filtered);
});

// Sort Functionality
const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {
  let sorted = [...servicesData]; // copy the data

  if (sortSelect.value === "low-high") {
    sorted.sort((a, b) => extractMinPrice(a.price) - extractMinPrice(b.price));
  } else if (sortSelect.value === "high-low") {
    sorted.sort((a, b) => extractMinPrice(b.price) - extractMinPrice(a.price));
  }

  const searchTerm = searchInput.value.toLowerCase();
  const filtered = sorted.filter(service =>
    service.name.toLowerCase().includes(searchTerm)
  );

  displayServices(filtered);
});

// Helper function to extract lowest number from price string 
function extractMinPrice(priceStr) {
  const numbers = priceStr.match(/\d+/g);
  return numbers ? parseInt(numbers[0]) : 0;
}

// Booking Form Validation
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const hairstyle = document.getElementById("hairstyle");
    const date = document.getElementById("date");
    const requests = document.getElementById("requests");
    const bookingResponse = document.getElementById("bookingResponse");

    // Validate empty fields
    if (!name.value.trim() || !email.value.trim() || !hairstyle.value || !date.value || !requests.value.trim()) {
      bookingResponse.textContent = "Please fill in all fields before submitting.";
      bookingResponse.style.color = "#b30000"; // soft red
      return;
    }

    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      bookingResponse.textContent = "Please enter a valid email address.";
      bookingResponse.style.color = "#b30000";
      return;
    }

    // Success message
    bookingResponse.textContent = `Thank you, ${name.value}! Your ${hairstyle.value} appointment request for ${date.value} has been submitted.`;
    bookingResponse.style.color = "#d4af37"; 
    bookingForm.reset();
  });
}

//Contact/Enquiry Form Validation 
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const type = document.getElementById("messageType");
    const message = document.getElementById("message");
    const contactResponse = document.getElementById("contactResponse");

    // Validate required fields
    if (!name.value.trim() || !email.value.trim() || !type.value || !message.value.trim()) {
      contactResponse.textContent = "Please fill in all fields before sending your message.";
      contactResponse.style.color = "#b30000";
      return;
    }

    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      contactResponse.textContent = "Please enter a valid email address.";
      contactResponse.style.color = "#b30000";
      return;
    }

    // Success message
    contactResponse.textContent = `Thank you, ${name.value}! Your ${type.value.toLowerCase()} has been sent successfully.`;
    contactResponse.style.color = "#d4af37";
    contactForm.reset();
  });
}
