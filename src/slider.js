"use strict";

export class Slider {
    constructor(data, rootElement, objectStyles) {
        this.data = data;
        this.root = rootElement;
        this.imageIndex = 0;
        this.count = data.length;
        this.prefix = rootElement.slice(1, rootElement.length);
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
        this.titleAnimation = objectStyles.titleAnimation ? objectStyles.titleAnimation : undefined;
        this.slideSwitchTiming = objectStyles.timing;
        this.autoMode = objectStyles.autoMode ? this.handleAutoChange() : null;
        this.containerClass = objectStyles.containerClass ? objectStyles.containerClass : "";
        this.sliderContainerClass = objectStyles.sliderContainerClass ? objectStyles.sliderContainerClass : "";
        this.arrowClass = objectStyles.arrowClass ? objectStyles.arrowClass : "";
        this.carouselTitleClass = objectStyles.carouselTitleClass ? objectStyles.carouselTitleClass : "";
        this.paginationClass = objectStyles.paginationClass ? objectStyles.paginationClass : "";

    }

    generateDOMImages() {
        return `
            <div class="carousel_container ${this.sliderContainerClass}">
                ${this.data.map((element, index) => `<img src=${element.src} id=${element.id} class="${index === 0 ? 'carousel_item active' : 'carousel_item'}" />
                <h3 class="carousel_title">${element.title}</h3>`).join("")}
            </div>
        `;
    }

    generateSliderTitle() {
        return `
            <div class="carousel_title_container">
                ${this.data.map((element, index) => `<h1 class="${index === 0 ? 'carousel_title active red' : 'carousel_title'} ${this.carouselTitleClass}">${element.title}</h1>`).join("")}
            </div>
        `
    }

    generateDOMPagination() {
        return `
            <div class="pagination_container">
                ${this.data.map((dot, index) => `<span style=${!this.showPagination ? "" : "display: none"} class="pagination_item ${this.paginationClass}" data-index=${index}></span>`).join("")}
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
        this.titles = this.parent.querySelectorAll(".carousel_title");
    }

    bindingFunction() {
        this.asignValuesToVariables();
        const leftArrow = this.arrowLeft.selector;
        const rightArrow = this.arrowRight.selector;
        leftArrow.addEventListener("click", this.handleArrowAction.bind(this, false));
        rightArrow.addEventListener("click", this.handleArrowAction.bind(this, true));

        leftArrow.parentElement.addEventListener("mouseover", this.handleSwitchStop.bind(this));
        leftArrow.parentElement.addEventListener("mouseleave", this.handleAutoChange.bind(this));
        this.dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", this.handleDotAction.bind(this, dotIndex));
            dot.addEventListener("touchstart", this.handleDotAction.bind(this, dotIndex));
        });

        this.slides.forEach(slide => {
            slide.parentElement.addEventListener("mouseover", this.handleSwitchStop.bind(this));
            slide.addEventListener("mouseleave", this.handleAutoChange.bind(this));
        })
    }

    handleSwitchStop() {
        clearInterval(this.interval)
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
        this.handleTitleAnimation("basic", this.titles[this.imageIndex])
        if (this.dots[this.imageIndex]) this.dots[this.imageIndex].classList.remove("pagi-active");

        if (condition) {
            this.imageIndex = this.imageIndex + 1;
            if (this.imageIndex > this.count - 1) {
                this.imageIndex = 0;
            }
        }

        if (!condition) {
            this.imageIndex = this.imageIndex - 1;
            if (this.imageIndex < 0) {
                this.imageIndex = this.slides.length - 1;
            }
        }

        if (this.dots[this.imageIndex]) this.dots[this.imageIndex].classList.add("pagi-active");

        this.titleAnimation ?
            this.handleTitleAnimation(this.titleAnimation, this.titles[this.imageIndex])
            :
            this.handleTitleAnimation("classic", this.titles[this.imageIndex]);

        this.slides[this.imageIndex].classList.add("active");
    }

    handleTitleAnimation(animationType, element) {

        switch (animationType) {
            case "zoomIn":
                element.classList.add("zoomIn")
                break;
            case "fadeIn":
                element.classList.add("fadeIn")
                break;
            case "rollUp":
                element.classList.add("rollUp")
                break;
            case "basic":
                element.className = "carousel_title";
                break;
            case "classic":
                element.classList.add("active");
                break;
            default:
                return;
        }
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
