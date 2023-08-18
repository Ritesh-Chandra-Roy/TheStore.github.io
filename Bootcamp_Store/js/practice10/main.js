import * as backToTop from '../practice10/module/back_to_top.js'
import * as accordian from '../practice10/module/accordian.js'
import * as corousal from './module/carousel.js'
backToTop.createButton()
backToTop.topFunction()
window.onscroll = function () {backToTop.appear()} 
accordian.setAccordian()
corousal.getCarousel()