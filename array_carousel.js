(() => {

    "use strict";
    const paginationWrapper = document.querySelector(".pagination_container");
    const carouselWrapper = document.querySelector(".carousel_image");
    const carouselButtons = document.querySelectorAll(".arrow_item");
    let imageIndex = 0;
    const images = [
        "https://cdn.pixabay.com/photo/2017/04/22/00/14/universe-2250310_960_720.jpg",
        "https://i.cbc.ca/1.5281236.1568314132!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/galaxies-gravitational-lensing.jpg",
        "http://www.jonathan-quek.com/wp-content/uploads/2015/10/Universe-Collide_01.jpg",
        "https://www.nasa.gov/specials/60counting/img/birthofstars.jpg",
        "https://natgeo.imgix.net/factsheets/thumbnails/DeathOfAUniverseHeader.jpg?auto=compress,format&w=1024&h=560&fit=crop"
    ];

    const generateDOMElements = (arr) => {
        arr.forEach((slide, index) => {
            console.log(index)
            let img = document.createElement("img");
            img.className = index === 0 ? "carousel_item active" : "carousel_item";

            img.setAttribute("src", slide);
            console.log(img)
            carouselWrapper.insertAdjacentElement("beforeend", img);
        })
    };

    const generateDOMPagination = (arr) => {
        arr.forEach((el, index) => {
            let dot = document.createElement("span");
            dot.className = index === 0 ? "pagination_item pagi-active" : "pagination_item";
            dot.setAttribute("data-index", index);

            paginationWrapper.insertAdjacentElement("beforeend", dot);
        })
    }

    generateDOMElements(images)
    generateDOMPagination(images);

    const dots = document.querySelectorAll(".pagination_item");
    const carouselItemArray = document.querySelectorAll(".carousel_item");
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
