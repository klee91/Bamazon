
var inquirer = require('inquirer');
var mysql = require('mysql');
var selection;
var id;
var units;

//SQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jaklee91!",
  database: "bamazon"
});

//list of all items
function listAll() {
	connection.query("SELECT * FROM products", function(err,res) {
		if (err) {console.log(err)};
		console.log("PRODUCTS FOR SALE:");
		console.log(" ");
		for (var i = 0; i < res.length; i++) {
			console.log("ID: " + res[i].item_id);
			console.log("PRODUCT: " + res[i].product_name);
			console.log("PRICE: " + res[i].price);
			console.log("QUANTITY: " + res[i].stock_quantity);
			console.log("-------------------------------------------------------");
		};
	});
};

//show all items that have inventory of less than 5
function lowInventory() {
	connection.query("SELECT * FROM products", function(err,res) {
		if (err) {console.log(err)};
		console.log("LOW INVENTORY:");
		console.log(" ");
		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity < 5) {
				console.log(" ");
				console.log("ID: " + res[i].item_id);
				console.log("PRODUCT: " + res[i].product_name);
				console.log("QUANTITY: " + res[i].stock_quantity);
				console.log("-------------------------------------------------------");
			}
		};
	});
}

//add to inventory additional quantity of a current item
function addInventory() {

	inquirer.prompt([
	{
		type: "input",
		name: "id",
		message:"Which item would you like to add inventory to? (Input item ID #)",
	}, {
		type: "input",
		name: "units",
		message: "How many would you like to add to inventory?"
	}
	]).then(function(answer) {
		id = parseInt(answer.id);
		units = parseInt(answer.units);
			
			//will add to inventory quantity for specific item
			connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",[units,id], function(err,res) {
				if (err) {console.log(err)};
				console.log("UPDATED INVENTORY:");
				
				connection.query("SELECT * FROM products WHERE item_id = ?",[id], function(err,res) {
					if (err) {console.log(err)};

					console.log(" ");
					console.log("ID: " + res[0].item_id);
					console.log("PRODUCT: " + res[0].product_name);
					console.log("QUANTITY: " + res[0].stock_quantity);
					console.log("-------------------------------------------------------");

					connection.end();
				});
			});
	});
}

//add new product to Bamazon DB
function addProduct() {
	inquirer.prompt([
	{
		type: "input",
		name: "product",
		message:"Enter the name of your product:",
	}, {
		type: "list",
		name: "department",
		message: "Choose a department it should be classified under:",
		choices: ["HOME & KITCHEN","ELECTRONICS","BOOKS","ENTERTAINMENT","HEALTH & FOOD",
				  "SPORTS & OUTDOORS","CLOTHING, SHOES & JEWELRY","AUTOMOTIVE & INDUSTRIAL","TOYS, KIDS & BABY"]
	}, {
		type: "input",
		name: "price",
		message: "Enter the price for each unit for sale *Note: In ###.## format :",
	}, {
		type: "input",
		name: "quantity",
		message: "Enter the quantity amount in current inventory:"
	}
	//, {
	// 	message: "Validating..",
	// 	name: "quantity_validate",
	// 	validate: function(quantity) {
	// 	    // Declare function as asynchronous, and save the done callback 
	// 	    var done = this.async();
		 
	// 	    // Do async stuff 
	// 	    setTimeout(function () {
	// 	      if (typeof quantity !== 'number') {
	// 	        // Pass the return value in the done callback 
	// 	        done('You need to provide a number');
	// 	        return;
	// 	      }
	// 	      // Pass the return value in the done callback 
	// 	      done(null, true);
	// 	    }, 1000);
 //  		}
 //  	}
	]).then(function(answer) {
		var a = answer.product;
		var b = answer.department;
		var c = answer.price;
		var d = answer.quantity;
			//will add to inventory quantity for specific item
			connection.query("INSERT products VALUES (item_id,?,?,?,?)",[a,b,c,d], function(err,res) {
				if (err) {console.log(err)};
				console.log("NEW PRODUCT ADDED");
				
				connection.query("SELECT * FROM products ORDER BY item_id DESC LIMIT 1;", function(err,res) {
					if (err) {console.log(err)};

					console.log(" ");
					console.log("ID: " + res[0].item_id);
					console.log("PRODUCT: " + res[0].product_name);
					console.log("DEPARTMENT: " + res[0].department_name);
					console.log("PRICE: " + res[0].price);
					console.log("QUANTITY: " + res[0].stock_quantity);
					console.log("-------------------------------------------------------");

					connection.end();
				});
			});
	});
}

//Start manager app
function managerStart() {
	inquirer.prompt([
	{
		type: "list",
		name: "option",
		message:"Choose a menu option",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
	]).then(function(answer) {
		
		switch (answer.option) {
			case "View Products for Sale":
				listAll();
			break;
			case "View Low Inventory":
				lowInventory();
			break;
			case "Add to Inventory":
				addInventory();
			break;
			case "Add New Product":
				addProduct();
		}
	});
}

managerStart();