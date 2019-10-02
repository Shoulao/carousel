

(() => {

    "use strict";

    const carouselItemArray = document.querySelectorAll(".carousel_item");
    const carouselButtons = document.querySelectorAll(".arrow_item");
    const dots = document.querySelectorAll(".pagination_item");
    let imageIndex = 0;
    let count = carouselItemArray.length;

    const handleSlide = (condition) => {
        carouselItemArray[imageIndex].classList.remove("active");
        dots[imageIndex].classList.remove("pagi-active");

        if(condition) {
            imageIndex = imageIndex + 1;
            if(imageIndex > count - 1) {
                imageIndex = 0;
            }
        }

        if(!condition) {
            imageIndex = imageIndex - 1;
            if(imageIndex < 0) {
                imageIndex = carouselItemArray.length - 1;
            }
        }

        dots[imageIndex].classList.add("pagi-active");
        carouselItemArray[imageIndex].classList.add("active");
    }

    dots.forEach(dot => {
        dot.addEventListener("click", function() {
            let index = dot.getAttribute("data-index");

            carouselItemArray.forEach(el => {
                el.classList.remove("active");
            })
            dots.forEach(el => {
                el.classList.remove("pagi-active");
            })

            imageIndex = index;
            dots[imageIndex].classList.add("pagi-active");
            carouselItemArray[imageIndex].classList.add("active");
        });
    })

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            if(button.getAttribute("data-direction") === "left") {
                handleSlide(false)
            } else if(button.getAttribute("data-direction") === "right") {
                handleSlide(true);
            }
        });
    })

})()


