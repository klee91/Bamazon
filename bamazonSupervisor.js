var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

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

function viewProducts() {
	
	//grab values from departments/products
	connection.query("SELECT * FROM departments ORDER BY department_id", function(err,res) {
	
		var table = new Table({ head: ["", "department_id", "department_name", "over_head_costs", "total_sales", "total_profit"] });

	 	for ( var i = 0; i < res.length; i++) {

	 		var a = res[i].department_id;
			var b = res[i].department_name;
			var c = res[i].over_head_costs;
			var d = res[i].total_sales;
			var e = (d-c);
			
	 		table.push(
		    { "": [a,b,c,d,e] }
			);
		}
		console.log(table.toString());
		connection.end();
 	});
};


//add department onto departments table
function createDepart() {

	inquirer.prompt([
	{
		type: "input",
		name: "department_name",
		message: "Enter a department name (All Caps):",
	}, {
		type: "input",
		name: "overhead_costs",
		message:"Enter the over head costs:",
	}
	]).then(function(answer) {
		var a = answer.overhead_costs;
		var b = answer.department_name;
		
		//will add to inventory quantity for specific item
		connection.query("INSERT departments VALUES (department_id,?,?,?)",[a,b,0.00], function(err,res) {
			if (err) {console.log(err)};
			console.log("NEW DEPARTMENT ADDED");
			
			connection.query("SELECT * FROM departments ORDER BY department_id DESC LIMIT 1;", function(err,res) {
				if (err) {console.log(err)};

				console.log(" ");
				console.log("DEPARTMENT ID: " + res[0].department_id);
				console.log("DEPARTMENT NAME: " + res[0].department_name);
				console.log("OVER HEAD COSTS: " + res[0].over_head_costs);
				console.log("TOTAL SALES: " + res[0].total_sales);
				console.log("-------------------------------------------------------");

				connection.end();
			});
		});
	});

};

//Start supervisor app
function supervisorStart() {
	inquirer.prompt([
	{
		type: "list",
		name: "option",
		message:"Choose a menu option",
		choices: ["View Product Sales by Department", "Create New Department"]
	}
	]).then(function(answer) {
		
		switch (answer.option) {
			case "View Product Sales by Department":
				viewProducts();
			break;
			case "Create New Department":
				createDepart();
		}
	});
}

supervisorStart();