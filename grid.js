const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
	#cells;
	constructor(gridElement) {
		gridElement.style.setProperty("--grid-size", `${GRID_SIZE}`);
		gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
		gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
		// let's create some cells
		this.#cells = createCellElement(gridElement).map((cellElement, i) => {
			return new Cell(cellElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE));
		});
	}
	get cellsByColumn() {
		return this.#cells.reduce((cellGrid, cell) => {
			cellGrid[cell.x] = cellGrid[cell.x] || []; //if there is no array for this row then add an array
			cellGrid[cell.x][cell.y] = cell; //cell.y represent the column
			return cellGrid; //it's an array of array
		}, []);
	}
	get cellsByRow() {
		return this.#cells.reduce((cellGrid, cell) => {
			cellGrid[cell.y] = cellGrid[cell.y] || []; //if there is no array for this row then add an array
			cellGrid[cell.y][cell.x] = cell; //cell.y represent the row
			return cellGrid; //it's an array of array
		}, []);
	}
	get #emptyCells() {
		return this.#cells.filter((cell) => cell.tile == null);
	}
	randomEmptyCell() {
		const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
		return this.#emptyCells[randomIndex];
	}
	get cells() {
		return this.#cells
	   }
	 
}

class Cell {
	#cellElement;
	#x;
	#y;
	#tile;
	#mergeTile;
	constructor(cellElement, x, y) {
		this.#cellElement = cellElement;
		this.#x = x;
		this.#y = y;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get tile() {
		return this.#tile;
	}
	set tile(value) {
		this.#tile = value;
		if (value == null) return;
		this.tile.x = this.#x;
		this.tile.y = this.#y;
	}
	get mergeTile() {
		return this.#mergeTile;
	}
	set mergeTile(value) {
		this.#mergeTile = value;
		if (value == null) return;
		this.#mergeTile.x = this.#x;
		this.#mergeTile.y = this.#y;
	}
	canAccept(tile) {
		return this.tile == null || (this.mergeTile == null && this.tile.value === tile.value);
	}
	mergeTiles() {
		if (this.tile == null || this.mergeTile == null) return
		this.tile.value = this.tile.value + this.mergeTile.value
		this.mergeTile.remove()
		this.mergeTile = null
	   }
}

function createCellElement(gridElement) {
	const cells = [];
	for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		gridElement.append(cell);
		cells.push(cell);
	}
	return cells;
}
