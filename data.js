const productsData = [
	{
		id: 1,
		name: "Faz 2000",
		bid: 25999,
		category: "Lifestyle",
		cardImg: "./assets/img/calzados/Lifestyle/1.jpg",
	},
    {
		id: 2,
		name: "Ultra Rex",
		bid: 32999,
		category: "Lifestyle",
		cardImg: "./assets/img/calzados/Lifestyle/2.jpg",
	},
    {
		id: 3,
		name: "",
		bid: 10000,
		category: "Lifestyle",
		cardImg: "./assets/img/calzados/Lifestyle/3.jpg",
	},
    {
		id: 4,
		name: "Agravic Flow",
		bid: 34900,
		category: "Lifestyle",
		cardImg: "./assets/img/calzados/Lifestyle/4.jpg",
	},
    {
		id: 5,
		name: "Terrex",
		bid: 40000,
		category: "Lifestyle",
		cardImg: "./assets/img/calzados/Lifestyle/5.jpg",
	},
    {
		id: 6,
		name: "MasterBost",
		bid: 25999,
		category: "Running",
		cardImg: "./assets/img/calzados/Running/1.jpg",
	},
    {
		id: 7,
		name: "BYW Hard",
		bid: 25500,
		category: "Running",
		cardImg: "./assets/img/calzados/Running/2.jpg",
	},
    {
		id: 8,
		name: "AirPress",
		bid: 20999,
		category: "Running",
		cardImg: "./assets/img/calzados/Running/3.jpg",
	},
    {
		id: 9,
		name: "FastRun",
		bid: 26999,
		category: "Running",
		cardImg: "./assets/img/calzados/Running/4.jpg",
	},
    {
		id: 10,
		name: "Try TWZ",
		bid: 30999,
		category: "Running",
		cardImg: "./assets/img/calzados/Running/5.jpg",
	},
    {
		id: 11,
		name: "Pandora++",
		bid: 30999,
		category: "Basketball",
		cardImg: "./assets/img/calzados/Basketball/1.jpg",
	},
    {
		id: 12,
		name: "PointSevens",
		bid: 27999,
		category: "Basketball",
		cardImg: "./assets/img/calzados/Basketball/2.jpg",
	},
    {
		id: 13,
		name: "Cross Level",
		bid: 49000,
		category: "Basketball",
		cardImg: "./assets/img/calzados/Basketball/3.jpg",
	},
    {
		id: 14,
		name: "Predator",
		bid: 75500,
		category: "Soccer",
		cardImg: "./assets/img/calzados/Soccer/1.jpg",
	},
    {
		id: 15,
		name: "SpeedPortal",
		bid: 49000,
		category: "Soccer",
		cardImg: "./assets/img/calzados/Soccer/2.jpg",
	},
    {
		id: 16,
		name: "MundialGoal",
		bid: 60000,
		category: "Soccer",
		cardImg: "./assets/img/calzados/Soccer/3.jpg",
	},
    {
		id: 17,
		name: "Golden",
		bid: 89000,
		category: "Soccer",
		cardImg: "./assets/img/calzados/Soccer/4.jpg",
	},
];

const splitProducts = (size) => {
	let dividedProducts = [];

	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(6),
	nextProductsIndex: 1,
	productsLimit: splitProducts(6).length,
};
