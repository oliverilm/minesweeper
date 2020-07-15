
/**
 * 
 * @param {string} el - dom element 
 * @param {string} cl - class name 
 * @param {string} id - id string 
 * @param {string} innerValue - elements inner value
 * @param {{string: string}} customParameters - object of custom paramenters for element.
 */
const createElement = (el, customParameters) => {
    const e = document.createElement(el)
    Object.keys(customParameters).forEach(param => {
        e.setAttribute(param, customParameters[param])
    })
    return e
}


const cell = (isMine, x, y, checkNextTo, fail, recursiveCheck) => {
    let flagged = false;
    let isRevealed = false;
    const el = createElement("div", {class: "cell", x, y, isMine})
    

    el.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        if (el.innerHTML.length > 0) {
            isRevealed = true
        }
        if (!isRevealed) {
            if (flagged) {
                el.style.backgroundImage = "";
                el.style.backgroundSize = ""
            } else {
                el.style.backgroundImage = "url('flag.png')";
                el.style.backgroundSize = "cover"
            }
            flagged = !flagged
        }
    })

    el.addEventListener("click", () => {
        if (!flagged) {
        isRevealed = true

            if (isMine) {
                el.style.backgroundImage = "url('mine2.png')";
                el.style.backgroundSize = "cover"
                fail()
            } else {
                const numberOfMines = checkNextTo(x, y)
                
                if (numberOfMines === 0) {
                    recursiveCheck(x,y)
                } else {
                    el.disabled = true
                    el.style.backgroundColor = "#cfcfcf"
                    el.innerHTML = numberOfMines;
                }
            }
        }
    })

    return el
}