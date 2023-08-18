// Task #1 This Code is used to make Border Pink
$(".product-item__badge").each(function () {
    if ($(this).text() == "Sale") {
        $(this).parent().css("border-color", "pink");
    }
})


// Task #2 This code is used to make even list elements blue bg.

let itemNumber = 0;
$(".filters__size-swatch-link").each(function () {
    if (itemNumber % 2 == 0)
        $(this).css("background-color", "blue");
    itemNumber++;
})


// Task #3 This code is used to make clone of last two elements.
for (var i = 0; i<2; i++){
    let fetchedItem = $(".product-list li:nth-last-child(2)")
    let clonedItem = fetchedItem.clone(true)
    $(".product-list").append(clonedItem)
}

// Task #4 visibilitymade hidden for the Occasion Filter Item.
$(".filters__list-name").each(function () {
    if ($(this).text() == "Occasion") {
        $(this).parent().css("display", "none");
    }
})