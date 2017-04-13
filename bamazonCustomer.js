
var inquirer = require('inquirer');
var mysql = require('mysql');
var id;
var units;
var total;
var depart;
var prodSales;
var overHead;
var totalProfit;
//SQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Jaklee91!",
  database: "bamazon"
});

//customer start
function customerStart() {
	//list of all items
	connection.query("SELECT * FROM products", function(err,res) {
		if (err) {console.log(err)};

		for (var i = 0; i < res.length; i++) {
			console.log("ID: " + res[i].item_id);
			console.log("PRODUCT: " + res[i].product_name);
			console.log("PRICE: " + res[i].price);
			console.log("-------------------------------------------------------");
		};
	});
};

function prompt() {
	inquirer.prompt([
		{
			type: "input",
			name: "id",
			message:"What is the ID of the product you would like to purchase?"
		}, {
			type: "input",
			name: "units",
			message:"How many of this item would you like to purchase?"
		}
		]).then(function(answer) {
			id = parseInt(answer.id);
			units = parseInt(answer.units);

			//check if quantity is available
			connection.query("SELECT * FROM products where item_id=?",[id], function(err,res) {
				if (err) {console.log(err)};
				
				var a = res[0].product_name;
				var b = res[0].price;
				var c = res[0].stock_quantity;
				depart = res[0].department_name;
				
				//if item is not in stock, alert insufficient quantity
				if (units > c) {
					console.log("Insufficient Quantity!");
					connection.end();

				//otherwise, update stock and alert the total
				} else {

					//add customer order and update SQL database for remaining quantity
					//after updating DB, show customer's total cost
					var newQuant = c - units;

					connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[newQuant, id], function(err,res) {
						if (err) {console.log(err)};

						total = (units * b)
						console.log("  ");
						console.log("PRODUCT: " + a);
						console.log("QUANTITY: " + units);
						console.log("------------------------");
						console.log("TOTAL: " + "$" + total);
						
						//update product sales for item bought
						connection.query("UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?",[total, id], function(err,res) {
							if (err) {console.log(err)};
						});

						//grab new product sales revenue
						connection.query("SELECT * FROM products where item_id=?",[id], function(err,res) { 
							if (err) {console.log(err)};
							prodSales = res[0].product_sales;
						});

						//update total sales for department
						connection.query("UPDATE departments SET total_sales = total_sales + ? WHERE department_name = ?",[total, depart], function(err,res) {
							if (err) {console.log(err)};

							//create instacen of total profit = product sales - over head costs

							connection.query("SELECT * FROM departments WHERE department_name = ?",[depart], function(err,res) {
								if (err) {console.log(err)};

								overHead = res[0].over_head_costs;
								exports.totalProfit = (prodSales - overHead);
								connection.end();

							});
						});
						
					});

				}

			});

	});
}

// exports.totalProfit = totalProfit;

setTimeout(prompt, 1000);

customerStart();