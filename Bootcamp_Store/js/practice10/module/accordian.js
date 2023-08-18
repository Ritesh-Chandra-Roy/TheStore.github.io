const accordian1 = document.getElementsByClassName('left-nav__list-item')
const accordian2 = document.querySelectorAll('.filters__list-item');

/**
 * @param {}
 * @return {}
 * adds/removes opened class to create accordian
 * 
 */
function setAccordian() {
    console.log(accordian1[0])
    accordian1[0].addEventListener('click', function(e) {
        console.log(accordian1[0])
        if (this.classList.contains('opened')) {
            this.classList.remove('opened');
          } else {
            this.classList.add('opened');
          }
    })
    accordian2.forEach( (element) => {
        element.addEventListener('click', function(e) {
            if (this.classList.contains('opened')) {
                this.classList.remove('opened');
              } else {
                this.classList.add('opened');
              }
        });
    });


}
export {setAccordian}