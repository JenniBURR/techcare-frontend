document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display data for each table
    function fetchTableData(endpoint, tableBodyId, limit) {
        const url = new URL(endpoint);
        url.searchParams.set('_limit', limit);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById(tableBodyId);
                tableBody.innerHTML = ''; // Clear existing rows

                if (data.length > 0) {
                    data.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `<td>${item.id}</td>
                                    <td>${item.name || item.medicine_name || item.supplier_name || item.inventory_id}</td>
                                    <td>${item.manufacturer || item.contact_info || item.branch_id || item.movement_type}</td>
                                    <td>${item.expirydate || item.purchase_date || item.quantity || ''}</td>
                                    <td>${item.quantity || item.price || ''}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm" onclick="editItem('${tableBodyId}', ${item.id})">Edit</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteItem('${tableBodyId}', ${item.id})">Delete</button>
                                    </td>`;
                        tableBody.appendChild(row);
                    });
                } else {
                    // Display a message when no data is available
                    const row = document.createElement('tr');
                    row.innerHTML = `<td colspan="6">No data found</td>`;
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial fetch when the page loads
    fetchTableData('http://127.0.0.1:8000/api/medicine', 'medicineTableBody', 5);
    fetchTableData('http://127.0.0.1:8000/api/supplier', 'supplierTableBody', 5);
    fetchTableData('http://127.0.0.1:8000/api/inventory', 'inventoryTableBody', 5);
    fetchTableData('http://127.0.0.1:8000/api/stock', 'stocksTableBody', 5);

    // Add event listener to refresh the table when a search is submitted
    document.querySelectorAll('.search-form').forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const endpoint = form.dataset.endpoint;
            const tableBodyId = form.dataset.tableBody;
            const searchTerm = form.search.value.trim();
            const limit = form.dataset.limit;

            const url = new URL(endpoint);
            url.searchParams.set('search', searchTerm);

            fetchTableData(url.toString(), tableBodyId, limit);
        });
    });

    // Event listeners for table navigation buttons
    document.getElementById('nextSupplier').addEventListener('click', function () {
        handleTableNavigation('supplierTable', 'next');
    });

    document.getElementById('prevSupplier').addEventListener('click', function () {
        handleTableNavigation('supplierTable', 'prev');
    });

    document.getElementById('nextInventory').addEventListener('click', function () {
        handleTableNavigation('inventoryTable', 'next');
    });

    document.getElementById('prevInventory').addEventListener('click', function () {
        handleTableNavigation('inventoryTable', 'prev');
    });

    document.getElementById('nextStocks').addEventListener('click', function () {
        handleTableNavigation('stocksTable', 'next');
    });

    document.getElementById('prevStocks').addEventListener('click', function () {
        handleTableNavigation('stocksTable', 'prev');
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Function to fetch and display medicines
        function fetchMedicines() {
            fetch('http://127.0.0.1:8000/api/medicine')
                .then(response => response.json())
                .then(data => {
                    const medicineTableBody = document.getElementById('medicineTableBody');
                    medicineTableBody.innerHTML = ''; // Clear existing rows
      
                    if (data.length > 0) {
                        data.forEach(medicine => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${medicine.medicine_id}</td>
                                <td>${medicine.medicine_name}</td>
                                <td>${medicine.manufacturer}</td>
                                <td>${medicine.expirydate}</td>
                                <td>${medicine.quantity}</td>
                                <td>${medicine.price}</td>
                            `;
                            medicineTableBody.appendChild(row);
                        });
                    } else {
                        // Display a message when no medicines are available
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="6">No medicines found</td>';
                        medicineTableBody.appendChild(row);
                    }
                })
                .catch(error => console.error('Error fetching medicines:', error));
        }
      
        // Initial fetch when the page loads
        fetchMedicines();
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        // Function to fetch and display suppliers
        function fetchSuppliers() {
            fetch('http://127.0.0.1:8000/api/supplier')
                .then(response => response.json())
                .then(data => {
                    const suppliersTableBody = document.getElementById('suppliersTableBody');
                    suppliersTableBody.innerHTML = ''; // Clear existing rows
      
                    if (data.length > 0) {
                        data.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${item.supplier_id}</td>
                                <td>${item.supplier_name}</td>
                                <td>${item.contact_info}</td>
                            `;
                            suppliersTableBody.appendChild(row);
                        });
                    } else {
                        // Display a message when no suppliers are available
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="3">No suppliers found</td>';
                        suppliersTableBody.appendChild(row);
                    }
                })
                .catch(error => console.error('Error fetching suppliers:', error));
        }
      
        // Initial fetch when the page loads
        fetchSuppliers();
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        // Function to fetch and display inventory
        function fetchInventory() {
            fetch('http://127.0.0.1:8000/api/inventory')
                .then(response => response.json())
                .then(data => {
                    const inventoryTableBody = document.getElementById('inventoryTableBody');
                    inventoryTableBody.innerHTML = ''; // Clear existing rows
      
                    if (data.length > 0) {
                        data.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${item.inventory_id}</td>
                                <td>${item.medicine_id}</td>
                                <td>${item.supplier_id}</td>
                                <td>${item.quantity}</td>
                                <td>${item.purchase_date}</td>
                            `;
                            inventoryTableBody.appendChild(row);
                        });
                    } else {
                        // Display a message when no inventory items are available
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="6">No inventory items found</td>';
                        inventoryTableBody.appendChild(row);
                    }
                })
                .catch(error => console.error('Error fetching inventory:', error));
        }
      
        // Initial fetch when the page loads
        fetchInventory();
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        // Function to fetch and display inventory
        function fetchStock() {
            fetch('http://127.0.0.1:8000/api/inventory')
                .then(response => response.json())
                .then(data => {
                    const stockTableBody = document.getElementById('stockTableBody');
                    stockTableBody.innerHTML = ''; // Clear existing rows
      
                    if (data.length > 0) {
                        data.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${item.stock_id}</td>
                                <td>${item.inventory_id}</td>
                                <td>${item.branch_id}</td>
                                <td>${item.movement_type}</td>
                                <td>${item.quantity}</td>
                            `;
                            stockTableBody.appendChild(row);
                        });
                    } else {
                        // Display a message when no inventory items are available
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="6">No stock items found</td>';
                        inventoryTableBody.appendChild(row);
                    }
                })
                .catch(error => console.error('Error fetching stocks:', error));
        }
      
        // Initial fetch when the page loads
        fetchStock();
      });
      

    // Function to handle table navigation
    function handleTableNavigation(tableId, direction) {
        // Implement logic for navigating through the table
        console.log(`Navigating ${direction} in table ${tableId}`);
    }

    // Function to handle editing an item
    window.editItem = function (tableBodyId, itemId) {
        console.log(`Editing item with ID ${itemId} in table ${tableBodyId}`);
        // Implement logic to show a modal or redirect to the edit page for the specific item
        // Example: window.location.href = `/edit-item.html?id=${itemId}&table=${tableBodyId}`;
    };

    // Function to handle deleting an item
    window.deleteItem = function (tableBodyId, itemId) {
        console.log(`Deleting item with ID ${itemId} in table ${tableBodyId}`);
        // Implement logic to confirm deletion and make an API request to delete the item
        const deleteConfirmed = confirm(`Are you sure you want to delete this item with ID ${itemId}?`);

        if (deleteConfirmed) {
            // Assuming you have an API endpoint like '/api/items/:id' for deleting
            fetch(`http://127.0.0.1:8000/api/${tableBodyId}/${itemId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Item deleted successfully, refresh the table
                        fetchTableData(`http://127.0.0.1:8000/api/${tableBodyId}`, tableBodyId, 5);
                    } else {
                        console.error(`Error deleting item with ID ${itemId} from table ${tableBodyId}:`, response.statusText);
                    }
                })
                .catch(error => console.error(`Error deleting item with ID ${itemId} from table ${tableBodyId}:`, error));
        }
    };
});
