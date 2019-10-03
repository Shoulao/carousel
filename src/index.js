import "./main.css";

(() => {
   // "use strict";

    const data = [
        { id: 1, src: "https://cdn.pixabay.com/photo/2017/04/22/00/14/universe-2250310_960_720.jpg" },
        { id: 2, src: "https://i.cbc.ca/1.5281236.1568314132!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/galaxies-gravitational-lensing.jpg" },
        { id: 3, src: "http://www.jonathan-quek.com/wp-content/uploads/2015/10/Universe-Collide_01.jpg" },
        { id: 4, src: "https://www.nasa.gov/specials/60counting/img/birthofstars.jpg" },
        { id: 5, src: "https://natgeo.imgix.net/factsheets/thumbnails/DeathOfAUniverseHeader.jpg?auto=compress,format&w=1024&h=560&fit=crop"}
    ]

    const data2 = [
        { id: 6, src: "https://cdn.pixabay.com/photo/2018/04/30/20/19/agriculture-3363932_960_720.jpg" },
        { id: 8, src: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" },
        { id: 9, src: "http://pureimg.com/public/uploads/large/241498311331oroskquhabinmdcyxukju9iyeiighi042ej1uermuhmtupzd5hwjktljnjxrdmzgfmeq0xx4pvfrotcfu5ilkx1dtktb1jq0fgrj.jpg" }
    ]

    class Slider {
        constructor(data, rootElement, classIndex) {
            this.data = data;
            this.root = rootElement;
            this.imageIndex = 0;
            this.count = data.length;
            this.selector = `carousel_item`;
            this.prefix = rootElement.slice(1,rootElement.length);
        }
        generateDOMImages() {
            return `
                <div class="carousel_container">
                    ${this.data.map((element, index) => `<img src=${element.src} data-select=${this.prefix} id=${element.id} class="carousel_item ${this.prefix}-carousel_item" />`).join("")}
                </div>
            `;
        }

        generateDOMPagination() {
            return `
                <div class="pagination_container">
                    ${this.data.map((dot, index) => `<span class="pagination_item" data-index=${index}></span>`).join("")}
                </div>
            `
        }

        generateDOMCarousel() {
            return (
                `
                    <div class="container_main">
                        ${this.generateDOMImages()}

                        <div class="arrows_container">
                            <div class="arrow_item arrow_left ${this.prefix}-arrow-left">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div class="arrow_item arrow_right ${this.prefix}-arrow-right">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        ${this.generateDOMPagination()}
                    </div>
                `
            )
        }
        bindingFunction() {
            const leftArrow = document.querySelector(`.${this.prefix}-arrow-left`);
            const rightArrow = document.querySelector(`.${this.prefix}-arrow-right`);

            leftArrow.addEventListener("click", this.handleSlideChange.bind(this, false))
            rightArrow.addEventListener("click", this.handleSlideChange.bind(this, true))

        }
        
        handleSlideChange(condition) {
           const slides = document.querySelectorAll(`[data-select=${this.prefix}]`);
            
           console.log(slides)
            slides[this.imageIndex].classList.remove("active");

            if(condition) {
                this.imageIndex = this.imageIndex + 1;
                if(this.imageIndex > this.count - 1) {
                    this.imageIndex = 0;
                }
            }

            if(!condition) {
                this.imageIndex = this.imageIndex - 1;
                if(this.imageIndex < 0) {
                    this.imageIndex = slides.length - 1;
                }
            }
            slides[this.imageIndex].classList.add("active");
        }
    };


    const testSlider = new Slider(data, "#root")
    const testSlider2 = new Slider(data2, "#root-2");
    const testSlider3 = new Slider(data, "#root-3");

    const root = document.getElementById("root");
    root.innerHTML = testSlider3.generateDOMCarousel();

    const root3 = document.getElementById("root-3");
    root3.innerHTML = testSlider.generateDOMCarousel();
    //console.log(testSlider.handleSlideChange())
    const root2 = document.getElementById("root-2");
    root2.innerHTML = testSlider2.generateDOMCarousel();
    testSlider2.bindingFunction();
    testSlider.bindingFunction();
    // console.log(testSlider2.handleSlideChange())


})()

