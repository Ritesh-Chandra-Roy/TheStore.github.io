const body = document.getElementsByTagName('body')[0]

/**
 * @param {}
 * @return {}
 * create a new button element for moving to the top and add event listner to it.
 */
function createButton() {
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "top");
    button.innerText = "Top";
    console.log(document.getElementsByTagName('body')[0])
    document.body.insertBefore(button, body.firstChild);
    button.addEventListener("click", topFunction)
}

/**
 * @param {}
 * @returns {}
 * makes got Top button visible when user scrools down the page.
 */
function appear() {
    let top = document.getElementById('top')
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        top.style.display = "block";
      } else {
        top.style.display = "none";
      }
}

/**
 * @param {}
 * @returns {}
 * scrolls to top.
 */
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
export {createButton, appear, topFunction}