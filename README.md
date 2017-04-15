# Bamazon

**Bamazon** is a mock 'Amazon' online store inventory, integreated as a Node CLI application. 
It prompts different questions to the user depending if they are a customer, manager, or supervisor. Three files
are included:  ```bamazonCustomer.js```, ```bamazonManager.js```, ```bamazonSupervisor.js```

You can call one of these by entering the command line ```node bamazon.....js```

There are two types of flashcards:

1. [```bamazonCustomer.js```] prompts a list of items for a customer to purchase.
	![alt tag](http://url/to/img.png)
2. [```bamazonManager.js```] prompts to the manager several options:
	1. View Products for Sale
	![alt tag](http://url/to/img.png)
	2. View Low Inventory
	![alt tag](http://url/to/img.png)
	3. Add to Inventory
	![alt tag](http://url/to/img.png)
	4. Add New Product
	![alt tag](http://url/to/img.png)
3. [```bamazonSupervisor.js```] prompts to the supervisor two options:
	1. View Product Sales by Department
	![alt tag](http://url/to/img.png)
	2. Create New Department
	![alt tag](http://url/to/img.png)

This CLI uses the inquirer, mysql, and cli-table NPM packages.