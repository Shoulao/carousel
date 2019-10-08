import { generateSlider } from "./slider";
import { data, data2 } from "./data";
import "./main.css";

"use strict";


const styleObject = {
    showPagination: false, // true or false
    showArrows: true, // true or false
    autoMode: false, // true or false
    timing: 3000, // time in ms
    paginationClass: "", // creates a class with a given name (you can give additional styles)
    sliderContainerClass: "", // creates a class with a given name (you can give additional styles)
    arrowClass: "red", // creates a class with a given name (you can give additional styles)
    paginationClass: "" // creates a class with a given name (you can give additional styles)
}

const styleObject2 = {
    showPagination: true,
    showArrows: false,
    autoMode: true,
    timing: 1000,
    paginationClass: "",
    sliderContainerClass: "",
    arrowClass: "",
    paginationClass: ""
}

/* DOM container for our slider */
const root1 = document.getElementById("root");
const root2 = document.getElementById("root-2");
const root3 = document.getElementById("root-3");

/*
instance of a Slider Class with:
 - data - array of objects with src and id key
 - "#root" - id of and parent element - container
 - styleObject - params given via object */
const testSlider = generateSlider(data, "#root", styleObject);

/* generateDOMCarousel creates the slider and binds methods */
root1.insertAdjacentHTML("beforeend", testSlider.generateDOMCarousel());

const testSlider2 = generateSlider(data2, "#root-2", styleObject2);
root2.insertAdjacentHTML("beforeend", testSlider2.generateDOMCarousel());

const testSlider3 = generateSlider(data, "#root-3", styleObject);
root3.insertAdjacentHTML("beforeend", testSlider3.generateDOMCarousel());
