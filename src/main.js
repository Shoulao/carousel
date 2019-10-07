import { generateSlider } from "./slider";
import { data, data2 } from "./data";
import "./main.css";


const styleObject = {
    showPagination: false,
    showArrows: true,
    autoMode: true,
    timing: 3000,
    paginationClass: "",
    sliderContainerClass: "",
    arrowClass: "red",
    paginationClass: ""
}

const styleObject2 = {
    showPagination: true,
    showArrows: false,
    autoMode: false,
    timing: 5000,
    paginationClass: "",
    sliderContainerClass: "",
    arrowClass: "",
    paginationClass: ""
}


const root1 = document.getElementById("root");
const root2 = document.getElementById("root-2");

const testSlider = generateSlider(data, "#root", styleObject);
root1.innerHTML = testSlider.generateDOMCarousel()

const testSlider2 = generateSlider(data2, "#root-2", styleObject2);
root2.innerHTML = testSlider2.generateDOMCarousel()