function changeColor(newColor) {
    let box = document.querySelector("#test-box");
    if (box) {
        console.log("Changing color to:", newColor);
        box.setAttribute("color", newColor);
    } else {
        console.error("Box not found!");
    }
}
