# Bamazon

**Bamazon** is a mock 'Amazon' online store inventory, integreated as a Node CLI application. 
It prompts different questions to the user depending if they are a customer, manager, or supervisor. Three files
are included:  ```bamazonCustomer.js```, ```bamazonManager.js```, ```bamazonSupervisor.js```

You can call one of these by entering the command line ```node bamazon.....js```

There are two types of flashcards:

1. [```bamazonCustomer.js```] prompts a list of items for a customer to purchase.
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/customer.png)
2. [```bamazonManager.js```] prompts to the manager several options:
	1. View Products for Sale
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/manager_list_all.png)
	2. View Low Inventory
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/manager_low_inventory.png)
	3. Add to Inventory
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/manager_add_inventory.png)
	4. Add New Product
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/manager_add_product.png)
3. [```bamazonSupervisor.js```] prompts to the supervisor two options:
	1. View Product Sales by Department
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/supervisor_view.png)
	2. Create New Department
	![alt tag](https://github.com/klee91/Bamazon/blob/master/images/supervisor_create_dept.png)

This CLI uses the inquirer, mysql, and cli-table NPM packages.