# 🦊 Basic reusable carousel - Vanilla JS

### Technology
  - HTML
  - CSS
  - JS
  
### How to use it?

<img width="300" src="https://user-images.githubusercontent.com/28606968/66317766-69811700-e91a-11e9-9044-a50816867bc3.png">

  #### imports
       - importing function that creates instance of a slider
       - importing main slider styles
       - importing sample data
       
<img width="300" src="https://user-images.githubusercontent.com/28606968/66317765-68e88080-e91a-11e9-8a9e-ad2ce1a31f46.png">
 
  #### styling
       - slider has a default css classes that forms given look
       - we can manipulate behavior of a slider with flags:
            - showPagination: true or false (we can hide pointers)
            - showArrows: true or false (we can hide arrows)
            - autoMode: true or false (we can turn auto-slide-switch with a false flag)
            - timing: time in ms (f.e 3000 => each slides will change after each 3s)
            - paginationClass, sliderContainerClass, arrowClass, paginationClass: these are additional classes we can give to                 each of these elements. We can give multiple additional classes and set personal styling in separate css file.
       
<img width="300" src="https://user-images.githubusercontent.com/28606968/66317764-68e88080-e91a-11e9-95e6-6741758697d8.png">

  #### rendering
       - assign variable to the certain DOM element, with document.getElementById()
       - create an instance of a Slider with generateSlider()
       - pass data: 
            - data is an array of objects that contain src and id
            - "root-3" is and id of a parent element
            - styleObject - flags/styles - optional
            
            - in the end fill the innerHTML of a parent element with generated slider.
            
            enjoy.


