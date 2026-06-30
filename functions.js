const grid = document.getElementById("grid");

const h = MAP.length;
const w = MAP[0].length;

let player = { x: 0, y: 0 };

let revealed = new Set();
let path = new Set();


for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        if (MAP[y][x] === "S") {
            player = { x, y };
        }
    }
}


function key(x, y) {
    return x + "," + y;
}

function inside(x, y) {
    return x >= 0 && y >= 0 && x < w && y < h;
}

function walkable(x, y) {
    return inside(x, y) && MAP[y][x] !== "#";
}


function reveal(x, y) {
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            let nx = x + dx;
            let ny = y + dy;

            if (inside(nx, ny)) {
                revealed.add(key(nx, ny));
            }
        }
    }
}

function moveTo(x, y) {

    if (Math.abs(player.x - x) + Math.abs(player.y - y) !== 1) return;

    if (!walkable(x, y)) return;

    player = { x, y };

    path.add(key(x, y));
    reveal(x, y);

    if (MAP[y][x] === "E") {

        // Reset et augmenter conteur mais azy j'ai la flm la tt de suite
    }

    render();
}

function render() {

    grid.innerHTML = "";

    for (let y = 0; y < h; y++) {

        const row = document.createElement("div");
        row.className = "row";

        for (let x = 0; x < w; x++) {

            const tile = document.createElement("div");
            tile.className = "tile";

            const k = key(x, y);
            const visible = revealed.has(k);

            if (!visible) {
                tile.classList.add("hidden");
            } else {
                const cell = MAP[y][x];

                if (cell === "#") tile.classList.add("wall");
                else if (cell === "S") tile.classList.add("start");
                else if (cell === "E") tile.classList.add("end");
                else tile.classList.add("floor");
            }

            if (path.has(k)) tile.classList.add("path");

            if (player.x === x && player.y === y) {
                tile.classList.add("player");
            }

            tile.onclick = () => moveTo(x, y);

            row.appendChild(tile);
        }

        grid.appendChild(row);
    }
}

document.addEventListener("keydown", (e) => {

    let x = player.x;
    let y = player.y;

    if (e.key === "ArrowUp" || e.key === "w") y--;
    else if (e.key === "ArrowDown" || e.key === "s") y++;
    else if (e.key === "ArrowLeft" || e.key === "a") x--;
    else if (e.key === "ArrowRight" || e.key === "d") x++;
    else return;

    e.preventDefault();
    moveTo(x, y);
});



reveal(player.x, player.y);
render();