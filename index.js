let width = 10
let height = 10
let root;
const visited = []
let amountOfMines = 20;

window.onload = () => {

    const button = document.getElementById("start")
    root = document.getElementById("container")
   
    button.addEventListener("click", () => {
        root.innerHTML = ""
        generateCellValues()
    })
    
}

/**
 * Get cell basend on its x and y coordinate.
 * 
 * @param {number} x - x position in grid
 * @param {number} y - y position in grid 
 */
const getCell = (x, y) => {
    return Array.from(document.querySelectorAll(`[x="${x}"]`))[y]
}


const generateCellValues = () => {
    for (let y = 0; y < width; y++) {
        const row = createElement("div", {class: "row"})
        for (let x = 0; x < width; x++) {
            row.append(cell(
                Math.random(1) < amountOfMines / (width*height), x, y, 
                () => surroundingMines(x,y), 
                
                () => {
                    console.log("fail")
                }, recursiveCheck)
            )
        }
        root.append(row)
    }
}

const surroundingMines = (x,y) => {
    let amount = 0
    for (let i = y-1; i< y+2; i++) {
        for (let j = x-1; j< x+2; j++) {
            if (i<width && i >= 0 && j<width && j >=0) {            
                amount += getCell(j, i).getAttribute("ismine") == "true" ? 1 : 0
            }
        }
    }
    return amount
}

const recursiveCheck = (x,y) => {
    if (visited.find(a => a[0] == x && a[1]==y) != undefined ) {
        return;
    }
    const cell = getCell(x,y)
    cell.style.backgroundColor = "#cfcfcf"
    cell.disabled = true
    const surr = surroundingMines(x,y)
    visited.push([x, y])
    if (surr > 0) {
        cell.innerHTML = surr;
        return;
    } else {
        cell.innerHTML = " "
        for (let i = y-1; i< y+2; i++) {
            for (let j = x-1; j< x+2; j++) {
                if (i<width && i >= 0 && j<width && j >=0) {            
                    recursiveCheck(j,i)
                }
            }
        }
    }
}