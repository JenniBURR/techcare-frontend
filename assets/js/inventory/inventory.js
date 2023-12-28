document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display data for each table
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
                        let rowHTML = '';

                        // Adjust the row creation based on the actual structure of your data
                        switch (tableBodyId) {
                            case 'medicineTableBody':
                                rowHTML = `<td>${item.medicine_id}</td>
                                            <td>${item.medicine_name}</td>
                                            <td>${item.manufacturer}</td>
                                            <td>${item.expirydate}</td>
                                            <td>${item.quantity}</td>
                                            <td>${item.price}</td>`;
                                break;
                            case 'supplierTableBody':
                                rowHTML = `<td>${item.supplier_id}</td>
                                            <td>${item.supplier_name}</td>
                                            <td>${item.contact_info}</td>`;
                                break;
                            case 'inventoryTableBody':
                                rowHTML = `<td>${item.inventory_id}</td>
                                            <td>${item.medicine_id}</td>
                                            <td>${item.supplier_id}</td>
                                            <td>${item.quantity}</td>
                                            <td>${item.purchase_date}</td>`;
                                break;
                                case 'stocksTableBody':
                                    rowHTML = `<td>${item.stock_id}</td>
                                                <td>${item.inventory_id}</td>
                                                <td>${item.branch_id}</td>
                                                <td>${item.movement_type}</td>
                                                <td>${item.quantity}</td>`;
                                    break;
        
                                default:
                                    break;
                            }
        
                            row.innerHTML = `${rowHTML}`;
                            tableBody.appendChild(row);
                        });
                    } else {
                        // Display a message when no data is available
                        const row = document.createElement('tr');
                        row.innerHTML = `<td colspan="5">No data found</td>`; // Assuming there are 5 columns in the stocks table
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
    document.getElementById('nextMedicine').addEventListener('click', function () {
        handleTableNavigation('medicineTable', 'next');
    });

    document.getElementById('prevMedicine').addEventListener('click', function () {
        handleTableNavigation('medicineTable', 'prev');
    });

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

    // Function to handle table navigation
    function handleTableNavigation(tableId, direction) {
        // Implement logic for navigating through the table
        console.log(`Navigating ${direction} in table ${tableId}`);
    }

     // Function to handle adding a new item to the table
function addNewItem(endpoint, newItem, tableBodyId) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
        .then(response => response.json())
        .then(data => {
            // Assuming the response includes the newly added item
            const tableBody = document.getElementById(tableBodyId);
            const row = document.createElement('tr');
            let rowHTML = '';

            // Adjust the row creation based on the actual structure of your data
            switch (tableBodyId) {
                case 'medicineTableBody':
                    rowHTML = `<td>${data.medicine_id}</td>
                                <td>${data.medicine_name}</td>
                                <td>${data.manufacturer}</td>
                                <td>${data.expirydate}</td>
                                <td>${data.quantity}</td>
                                <td>${data.price}</td>`;
                    break;
                case 'supplierTableBody':
                    rowHTML = `<td>${data.supplier_id}</td>
                                <td>${data.supplier_name}</td>
                                <td>${data.contact_info}</td>`;
                    break;
                case 'inventoryTableBody':
                    rowHTML = `<td>${data.inventory_id}</td>
                                <td>${data.medicine_id}</td>
                                <td>${data.supplier_id}</td>
                                <td>${data.quantity}</td>
                                <td>${data.purchase_date}</td>`;
                    break;
                case 'stocksTableBody':
                    rowHTML = `<td>${data.stock_id}</td>
                                <td>${data.inventory_id}</td>
                                <td>${data.branch_id}</td>
                                <td>${data.movement_type}</td>
                                <td>${data.quantity}</td>`;
                    break;
                default:
                    break;
            }

            row.innerHTML = `${rowHTML}`;
            tableBody.appendChild(row);

            // Clear the form fields
            document.getElementById(`add${tableBodyId}Form`).reset();
        })
        .catch(error => console.error('Error adding new item:', error));
}

    // Function to handle deleting an item
    window.deleteItem = function (tableBodyId, itemId) {
        // You can implement the delete functionality here, e.g., show a confirmation modal
        console.log(`Delete item with ID ${itemId} in table ${tableBodyId}`);
    }

    // Event listeners for adding new items
    document.getElementById('addMedicineForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newMedicineItem = {
            medicine_name: formData.get('medicine_name'),
            manufacturer: formData.get('manufacturer'),
            expirydate: formData.get('expirydate'),
            quantity: formData.get('quantity'),
            price: formData.get('price'),
        };

        addNewItem('http://127.0.0.1:8000/api/medicine', newMedicineItem, 'medicineTableBody');
    });

    document.getElementById('addSupplierForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newSupplierItem = {
            supplier_name: formData.get('supplier_name'),
            contact_info: formData.get('contact_info'),
        };

        addNewItem('http://127.0.0.1:8000/api/supplier', newSupplierItem, 'supplierTableBody');
    });

    document.getElementById('addInventoryForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newInventoryItem = {
            medicine_id: formData.get('medicine_id'),
            supplier_id: formData.get('supplier_id'),
            quantity: formData.get('quantity'),
            purchase_date: formData.get('purchase_date'),
        };

        addNewItem('http://127.0.0.1:8000/api/inventory', newInventoryItem, 'inventoryTableBody');
    });

    document.getElementById('addStocksForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newStocksItem = {
            inventory_id: formData.get('inventory_id'),
            branch_id: formData.get('branch_id'),
            movement_type: formData.get('movement_type'),
            quantity: formData.get('quantity'),
        };

        addNewItem('http://127.0.0.1:8000/api/stock', newStocksItem, 'stocksTableBody');
    });
});

// Function to handle editing a medicine item
window.editMedicine = function () {
    const editMedicineId = document.getElementById('editMedicineId').value;
    const editMedicineName = document.getElementById('editMedicineName').value;
    const editManufacturer = document.getElementById('editManufacturer').value;
    const editExpiryDate = document.getElementById('editExpiryDate').value;
    const editQuantity = document.getElementById('editQuantity').value;
    const editPrice = document.getElementById('editPrice').value;

    const editedMedicine = {
        medicine_name: editMedicineName,
        manufacturer: editManufacturer,
        expirydate: editExpiryDate,
        quantity: editQuantity,
        price: editPrice,
    };

    fetch(`http://127.0.0.1:8000/api/medicine/${editMedicineId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMedicine),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('medicineTableBody', data);
            // Close the edit modal
            $('#editMedicineModal').modal('hide');
        })
        .catch(error => console.error('Error editing medicine:', error));
};

// Function to update the table row with edited data
function updateTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.medicine_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.medicine_name;
            cells[2].innerText = editedItem.manufacturer;
            cells[3].innerText = editedItem.expirydate;
            cells[4].innerText = editedItem.quantity;
            cells[5].innerText = editedItem.price;
            break;
        }
    }
}

// Function to handle editing a supplier item
window.editSupplier = function (supplierId) {
    // Fetch the supplier data using the supplierId
    fetch(`http://127.0.0.1:8000/api/supplier/${supplierId}`)
        .then(response => response.json())
        .then(data => {
            // Populate the edit form fields with the existing data
            document.getElementById('editSupplierId').value = data.supplier_id;
            document.getElementById('editSupplierName').value = data.supplier_name;
            document.getElementById('editContactInfo').value = data.contact_info;

            // Show the edit modal
            $('#editSupplierModal').modal('show');
        })
        .catch(error => console.error('Error fetching supplier data for edit:', error));
};

// Function to handle editing a supplier item
window.editSupplier = function () {
    const editSupplierId = document.getElementById('editSupplierId').value;
    const editSupplierName = document.getElementById('editSupplierName').value;
    const editContactInfo = document.getElementById('editContactInfo').value;

    const editedSupplier = {
        supplier_name: editSupplierName,
        contact_info: editContactInfo,
    };

    fetch(`http://127.0.0.1:8000/api/supplier/${editSupplierId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSupplier),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('supplierTableBody', data);
            // Close the edit modal
            $('#editSupplierModal').modal('hide');
        })
        .catch(error => console.error('Error editing supplier:', error));
};

// Function to handle editing an inventory item
window.editInventory = function (inventoryId) {
    // Fetch the inventory data using the inventoryId
    fetch(`http://127.0.0.1:8000/api/inventory/${inventoryId}`)
        .then(response => response.json())
        .then(data => {
            // Populate the edit form fields with the existing data
            document.getElementById('editInventoryId').value = data.inventory_id;
            document.getElementById('editMedicineId').value = data.medicine_id;
            document.getElementById('editSupplierId').value = data.supplier_id;
            document.getElementById('editQuantityInventory').value = data.quantity;
            document.getElementById('editPurchaseDate').value = data.purchase_date;

            // Show the edit modal
            $('#editInventoryModal').modal('show');
        })
        .catch(error => console.error('Error fetching inventory data for edit:', error));
};

// Function to handle editing an inventory item
window.editInventory = function () {
    const editInventoryId = document.getElementById('editInventoryId').value;
    const editMedicineId = document.getElementById('editMedicineId').value;
    const editSupplierId = document.getElementById('editSupplierId').value;
    const editQuantityInventory = document.getElementById('editQuantityInventory').value;
    const editPurchaseDate = document.getElementById('editPurchaseDate').value;

    const editedInventory = {
        medicine_id: editMedicineId,
        supplier_id: editSupplierId,
        quantity: editQuantityInventory,
        purchase_date: editPurchaseDate,
    };

    fetch(`http://127.0.0.1:8000/api/inventory/${editInventoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedInventory),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('inventoryTableBody', data);
            // Close the edit modal
            $('#editInventoryModal').modal('hide');
        })
        .catch(error => console.error('Error editing inventory:', error));
};

// Function to handle editing a stocks item
window.editStocks = function (stockId) {
    // Fetch the stocks data using the stockId
    fetch(`http://127.0.0.1:8000/api/stock/${stockId}`)
        .then(response => response.json())
        .then(data => {
            // Populate the edit form fields with the existing data
            document.getElementById('editStockId').value = data.stock_id;
            document.getElementById('editInventoryId').value = data.inventory_id;
            document.getElementById('editBranchId').value = data.branch_id;
            document.getElementById('editMovementType').value = data.movement_type;
            document.getElementById('editQuantity').value = data.quantity;

            // Show the edit modal
            $('#editStockModal').modal('show');
        })
        .catch(error => console.error('Error fetching stocks data for edit:', error));
};

// Function to handle editing a stocks item
window.editStock = function () {
    const editStockId = document.getElementById('editStockId').value;
    const editInventoryId = document.getElementById('editInventoryId').value;
    const editBranchId = document.getElementById('editBranchId').value;
    const editMovementType = document.getElementById('editMovementType').value;
    const editQuantity = document.getElementById('editQuantity').value;

    const editedStock = {
        inventory_id: editInventoryId,
        branch_id: editBranchId,
        movement_type: editMovementType,
        quantity: editQuantity,
    };

    fetch(`http://127.0.0.1:8000/api/stock/${editStockId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedStock),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('stocksTableBody', data);
            // Close the edit modal
            $('#editStockModal').modal('hide');
        })
        .catch(error => console.error('Error editing stocks:', error));
};