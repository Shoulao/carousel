import "./main.css";

(() => {
    "use strict";

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
            this.autoMode = objectStyles.autoMode ? this.handleAutoChange() : null;
            this.Arrow = (direction, parent = this.parent) => {
                return {
                    class: "arrow_item arrow_" + direction,
                    direction: direction,
                    selector: parent.querySelector(".arrow_" + direction)
                }
            };
            this.arrowLeft;
            this.arrowRight;
            this.arrowColor = objectStyles.arrowColor ? objectStyles.arrowColor : "#fff";
            this.arrowSize = objectStyles.arrowSize ? objectStyles.arrowSize : "1.4rem";
            this.arrowBg = objectStyles.arrowBg ? objectStyles.arrowBg : "rgba(0,0,0,0.4)";
            this.slides;
            this.slideSwitchTiming = objectStyles.timing ? objectStyles.timing : 3000; // tbc
            this.arrowBlurEffect = objectStyles.arrowBlurEffect;
        }

        generateDOMImages() {
            return `
                <div class="carousel_container">
                    ${this.data.map((element, index) => `<img src=${element.src} id=${element.id} class="${index === 0 ? 'carousel_item active' : 'carousel_item'}" />`).join("")}
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
                            <div class="arrow_item arrow_left" style="background:${this.arrowBg}; box-shadow:${this.arrowBlurEffect ? `22px 0px 25px 20px  ${this.arrowBg}` : ""};">
                                <i class="fas fa-chevron-left" style="color:${this.arrowColor}; font-size:${this.arrowSize};"></i>
                            </div>
                            <div class="arrow_item arrow_right" style="background:${this.arrowBg}; box-shadow:${this.arrowBlurEffect ? `-22px 0px 25px 20px  ${this.arrowBg}` : ""};">
                                <i class="fas fa-chevron-right" style="color:${this.arrowColor}; font-size:${this.arrowSize};"></i>
                            </div>
                        </div>
                        ${this.generateDOMPagination()}
                    </div>
                `
            )
        }

        asignValuesToVariables() {
            this.slides = this.parent.querySelectorAll(".carousel_item");
            this.dots = this.parent.querySelectorAll(".pagination_item");
            this.arrowLeft = new this.Arrow("left", this.parent);
            this.arrowRight = new this.Arrow("right", this.parent);
        }

        bindingFunction() {
            this.asignValuesToVariables();
            const leftArrow = this.arrowLeft.selector;
            const rightArrow = this.arrowRight.selector;
            

            leftArrow.addEventListener("click", this.handleArrowAction.bind(this, false))
            rightArrow.addEventListener("click", this.handleArrowAction.bind(this, true))

            this.dots.forEach((dot, dotIndex) => {
                dot.addEventListener("click", this.handleDotAction.bind(this, dotIndex))
            })
        }

        handleDotBehavior() {
            this.asignValuesToVariables();

            this.dots.map(d => d.classList.remove("pagi-active"))
            this.handleSlideSelect.bind(this, dotIndex);

        }

        handleDotAction(slideIndex) {
            this.dots.forEach(dot => dot.classList.remove("pagi-active"));
            this.slides.forEach(slide => slide.classList.remove("active"));
            this.slides[slideIndex].classList.add("active");
            this.dots[slideIndex].classList.add("pagi-active");
        }


        handleArrowAction(condition) {
            this.slides[this.imageIndex].classList.remove("active");

            if(this.dots[this.imageIndex]) this.dots[this.imageIndex].classList.remove("pagi-active");

            if(condition) {
                this.imageIndex = this.imageIndex + 1;
                if(this.imageIndex > this.count - 1) {
                    this.imageIndex = 0;
                }
            }

            if(!condition) {
                this.imageIndex = this.imageIndex - 1;
                if(this.imageIndex < 0) {
                    this.imageIndex = this.slides.length - 1;
                }
            }

            if(this.dots[this.imageIndex]) this.dots[this.imageIndex].classList.add("pagi-active");
            this.slides[this.imageIndex].classList.add("active");
           
        }

        handleAutoChange() {
            clearInterval(this.interval)

            const speed = (factor) => factor ? factor : 3000;
            this.interval = setInterval(this.handleArrowAction.bind(this, true), speed(this.slideSwitchTiming))
        }
    };

    const styleObject = {
        showPagination: false,
        showArrows: true,
        autoMode: true,
        timing: 500,
        arrowColor: "#fff",
        arrowSize: "1.4rem",
        arrowBg: false, // bool or rgba
        arrowBlurEffect: true
    }

    const styleObject2 = {
        showPagination: true,
        showArrows: true,
        autoMode: true,
        timing: 500,
        arrowColor: "#1ca1f3",
        arrowSize: "2.4rem",
        arrowBg: true, // bool or rgba
        arrowBlurEffect: true
    }

    const testSlider = new Slider(data, "#root", styleObject)
    const testSlider2 = new Slider(data2, "#root-2", styleObject2);

    const root1 = document.getElementById("root");
    const root2 = document.getElementById("root-2");

    root1.innerHTML = testSlider.generateDOMCarousel();
    root2.innerHTML = testSlider2.generateDOMCarousel();

    testSlider.bindingFunction();
    testSlider2.bindingFunction();
})()

