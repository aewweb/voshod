function scrollToTable() {
    const section = document.getElementById("zayavka");
    section.scrollIntoView({ behavior: "smooth" });
  }

// При прокрутке определяем, какой блок активен
document.addEventListener("scroll", () => {
  const blocks = document.querySelectorAll(".square-block");
  const triggerOffset = window.innerHeight / 2;

  blocks.forEach((block, index) => {
    const rect = block.getBoundingClientRect();
    if (rect.top < triggerOffset && rect.bottom > triggerOffset) {
      block.classList.add("active");
    }
  });
});

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: -100,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 800,
    modifier: 1,
    slideShadows: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
});
