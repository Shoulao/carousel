"use strict";

export class Slider {
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
        this.Arrow = (direction, parent = this.parent) => {
            return {
                class: "arrow_item arrow_" + direction,
                direction: direction,
                selector: parent.querySelector(".arrow_" + direction)
            }
        };
        this.arrowLeft;
        this.arrowRight;

        // STYLING OPTIONS
        this.slides;
        this.slideSwitchTiming = objectStyles.timing;
        this.autoMode = objectStyles.autoMode ? this.handleAutoChange() : null;
        this.containerClass = objectStyles.containerClass ? objectStyles.containerClass : "";
        this.sliderContainerClass = objectStyles.sliderContainerClass ? objectStyles.sliderContainerClass : "";
        this.arrowClass = objectStyles.arrowClass ? objectStyles.arrowClass : "";
        this.paginationClass = objectStyles.paginationClass ? objectStyles.paginationClass : "";

    }


    generateDOMImages() {
        return `
            <div class="carousel_container ${this.sliderContainerClass}">
                ${this.data.map((element, index) => `<img src=${element.src} id=${element.id} class="${index === 0 ? 'carousel_item active' : 'carousel_item'}" />`).join("")}
            </div>
        `;
    }

    generateDOMPagination() {
        return `
            <div class="pagination_container">
                ${this.data.map((dot, index) => `<span style=${!this.showPagination ? "" : "display: none" } class="pagination_item ${this.paginationClass}" data-index=${index}></span>`).join("")}
            </div> `
    }

    generateDOMCarousel() {
        setTimeout(() => this.bindingFunction(), 0)
        return (
            `
                <div class="container_main ${this.containerClass}"">
                    ${this.generateDOMImages()}

                    <div class="arrows_container" style="${this.showArrows ? "" : "display: none"}">
                        <div class="arrow_item arrow_left ${this.arrowClass}">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div class="arrow_item arrow_right ${this.arrowClass}">
                            <i class="fas fa-chevron-right"></i>
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

        leftArrow.addEventListener("touchstart", this.handleArrowAction.bind(this, false))
        rightArrow.addEventListener("touchstart", this.handleArrowAction.bind(this, true))

        this.dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", this.handleDotAction.bind(this, dotIndex))
            dot.addEventListener("touchstart", this.handleDotAction.bind(this, dotIndex))
        });

        this.slides.forEach(slide => {
            slide.addEventListener("mouseover", () => {
                clearInterval(this.interval)
            })

            slide.addEventListener("mouseleave", () => {
                this.handleAutoChange()
            })
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
        this.slides[this.imageIndex].classList.remove("active"); // left: 0

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

    handleStopSlider() {
        clearInterval(this.interval);
    }

    handleAutoChange() {
        clearInterval(this.interval)
        this.interval = setInterval(this.handleArrowAction.bind(this, true), this.slideSwitchTiming)
    }
};

export const generateSlider = (data, parent, styles) => {
    return new Slider(data, parent, styles)
}
