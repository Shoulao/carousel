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
        constructor(data, rootElement, objectStyles) {
            this.data = data;
            this.root = rootElement;
            this.imageIndex = 0;
            this.count = data.length;
            this.prefix = rootElement.slice(1,rootElement.length);
            this.parent = document.getElementById(this.prefix);
            this.showPagination = objectStyles.showPagination;
            this.showArrows = objectStyles.showArrows;
            this.interval;
            this.autoMode = objectStyles.autoMode;
        }
        generateDOMImages() {
            return `
                <div class="carousel_container">
                    ${this.data.map((element, index) => `<img src=${element.src} id=${element.id} class="carousel_item" />`).join("")}
                </div>
            `;
        }

        generateDOMPagination() {
            return `
                <div class="pagination_container">
                    ${this.data.map((dot, index) => `<span style=${!this.showPagination ? "" : "display: none" } class="pagination_item" data-index=${index}></span>`).join("")}
                </div> `
        }

        generateDOMCarousel() {
            return (
                `
                    <div class="container_main">
                        ${this.generateDOMImages()}

                        <div class="arrows_container" style="${this.showArrows ? "" : "display: none"}">
                            <div class="arrow_item arrow_left">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div class="arrow_item arrow_right">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        ${this.generateDOMPagination()}
                    </div>
                `
            )
        }

        bindingFunction() {
            const leftArrow = this.parent.querySelector(".arrow_left");
            const rightArrow = this.parent.querySelector(".arrow_right");
            const dots = this.parent.querySelectorAll(".pagination_item");

            leftArrow.addEventListener("click", this.handleArrowAction.bind(this, false))
            rightArrow.addEventListener("click", this.handleArrowAction.bind(this, true))

            dots.forEach((dot, dotIndex) => {
                dot.addEventListener("click", this.handleDotAction.bind(this, dotIndex))
            })
        }

        handleDotBehavior() {
            const dots = this.parent.querySelectorAll(".pagination_item");
            dots.map(d => d.classList.remove("pagi-active"))
            this.handleSlideSelect.bind(this, dotIndex);

        }

        handleDotAction(slideIndex) {
            const slides = this.parent.querySelectorAll(".carousel_item");
            const dots = this.parent.querySelectorAll(".pagination_item");
            dots.forEach(dot => dot.classList.remove("pagi-active"));
            slides.forEach(slide => slide.classList.remove("active"));

            slides[slideIndex].classList.add("active");
            dots[slideIndex].classList.add("pagi-active");
        }


        handleArrowAction(condition) {
           const slides = this.parent.querySelectorAll(".carousel_item");
           const dots = this.parent.querySelectorAll(".pagination_item");

            slides[this.imageIndex].classList.remove("active");
            dots[this.imageIndex].classList.remove("pagi-active");

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

            dots[this.imageIndex].classList.add("pagi-active");
            slides[this.imageIndex].classList.add("active");
            
            this.handleAutoChange()
        }

        handleAutoChange() {
            clearInterval(this.interval)
            this.interval = setInterval(this.handleArrowAction.bind(this, true), 3000)
        }
    };


    const testSlider = new Slider(data, "#root", {showPagination: true, showArrows: true, autoMode: false})
    const testSlider2 = new Slider(data2, "#root-2", {showPagination: false, showArrows: false, autoMode: true});
    const testSlider3 = new Slider(data, "#root-3", {showPagination: false, showArrows: true, autoMode: true});

    const root1 = document.getElementById("root");
    const root2 = document.getElementById("root-2");
    const root3 = document.getElementById("root-3");

    root1.innerHTML = testSlider.generateDOMCarousel();
    root2.innerHTML = testSlider2.generateDOMCarousel();
    root3.innerHTML = testSlider3.generateDOMCarousel();

    testSlider.bindingFunction();
    testSlider2.bindingFunction();
    testSlider3.bindingFunction();
})()

