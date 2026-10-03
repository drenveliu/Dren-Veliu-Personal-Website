const slides = document.querySelectorAll('.slider li');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderContainer = document.querySelector('.slider-container');

let currentSlide = 0;
let slideInterval;
const slideDelay = 3000; // Time per slide in milliseconds (3 seconds)

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Start auto-play loop
function startAutoPlay() {
  slideInterval = setInterval(nextSlide, slideDelay);
}

// Stop auto-play loop
function stopAutoPlay() {
  clearInterval(slideInterval);
}

// Manual controls
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

// Reset timer when user manually interacts
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Pause slideshow on hover
sliderContainer.addEventListener('mouseenter', stopAutoPlay);
sliderContainer.addEventListener('mouseleave', startAutoPlay);

// Initialize slider loop on page load
startAutoPlay();