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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the table row with the edited data
            updateSupplierTableRow('supplierTableBody', data);
            // Close the edit modal
            $('#editSupplierModal').modal('hide');
        })
        .catch(error => console.error('Error editing supplier:', error));
};

// Function to update the table row with edited supplier data
function updateSupplierTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.supplier_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.supplier_name;
            cells[2].innerText = editedItem.contact_info;
            break;
        }
    }
}

window.editInventoryItem = function () {
    const editInventoryId = document.getElementById('editInventoryId').value;
    const editSupplierId = document.getElementById('editSupplierId').value;
    const editMedicineId = document.getElementById('editMedicineId').value;
    const editQuantity = document.getElementById('editQuantity').value;
    const editPurchaseDate = document.getElementById('editPurchaseDate').value;

    const editedInventory = {
        supplier_id: editSupplierId,
        medicine_id: editMedicineId,
        quantity: editQuantity,
        purchase_date: editPurchaseDate,
    };

    fetch(`http://127.0.0.1:8000/api/inventory/${editInventoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedInventory),
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response from server:', data);
        // Update the table row with the edited data
        updateInventoryTableRow('inventoryTableBody', data);
        // Close the edit modal
        $('#editInventoryModal').modal('hide');
    })
    .catch(error => console.error('Error editing inventory:', error));
};

// Function to update the table row with edited inventory data
function updateInventoryTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.inventory_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.supplier_id;
            cells[2].innerText = editedItem.medicine_id;
            cells[3].innerText = editedItem.quantity;
            cells[4].innerText = editedItem.purchase_date;
            break;
        }
    }
}

// Function to handle editing a stock item
window.editStockItem = function () {
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the table row with the edited data
            updateStockTableRow('stocksTableBody', data);
            // Close the edit modal
            $('#editStockModal').modal('hide');
        })
        .catch(error => console.error('Error editing stock:', error));
};

// Function to update the table row with edited stock data
function updateStockTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.stock_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.inventory_id;
            cells[2].innerText = editedItem.branch_id;
            cells[3].innerText = editedItem.movement_type;
            cells[4].innerText = editedItem.quantity;
            break;
        }
    }
}

let selectedMedicineRow; // Variable to store the selected medicine row

    // Event listener to store the selected row when the delete modal is shown
    $('#deleteMedicineModal').on('show.bs.modal', function (event) {
        // Get the button that triggered the modal
        const button = $(event.relatedTarget);
        // Get the row associated with the button
        selectedMedicineRow = button.closest('tr');
    });

    // Function to prompt for medicine ID before deleting
    function promptDeleteMedicine() {
        // Clear any previous input
        document.getElementById('medicineIdToDelete').value = '';
        // Show the delete modal
        $('#deleteMedicineModal').modal('show');
    }

    // Function to delete a medicine item by ID
    function deleteMedicineById() {
        // Get the medicine ID to delete
        const medicineId = document.getElementById('medicineIdToDelete').value;

        // Validate that the ID is not empty
        if (!medicineId.trim()) {
            alert('Please enter a valid Medicine ID.');
            return;
        }

        // Call the delete function with the medicine ID
        deleteMedicine(medicineId);
    }

    // Function to delete a medicine item
    function deleteMedicine(medicineId) {
        // Simulate the backend interaction (replace with actual backend logic)
        fetch(`http://127.0.0.1:8000/api/medicine/${medicineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // If the request is successful, update the table or perform other actions
                console.log(`Successfully deleted medicine with ID ${medicineId}`);
                // Remove the selected row from the table
                selectedMedicineRow.remove();
            })
            .catch(error => {
                console.error('Error deleting medicine:', error);
                // TODO: Handle the error appropriately (e.g., show an error message)
            })
            .finally(() => {
                // Close the delete modal regardless of success or failure
                $('#deleteMedicineModal').modal('hide');
            });
    }

    let selectedSupplierRow; // Variable to store the selected supplier row

// Event listener to store the selected row when the delete modal is shown
$('#deleteSupplierModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedSupplierRow = button.closest('tr');
});

// Function to prompt for supplier ID before deleting
function promptDeleteSupplier() {
    // Clear any previous input
    document.getElementById('supplierIdToDelete').value = '';
    // Show the delete modal
    $('#deleteSupplierModal').modal('show');
}

// Function to delete a supplier item by ID
function deleteSupplierById() {
    // Get the supplier ID to delete
    const supplierId = document.getElementById('supplierIdToDelete').value;

    // Validate that the ID is not empty
    if (!supplierId.trim()) {
        alert('Please enter a valid Supplier ID.');
        return;
    }

    // Call the delete function with the supplier ID
    deleteSupplier(supplierId);
}

// Function to delete a supplier item
function deleteSupplier(supplierId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/supplier/${supplierId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // If the request is successful, update the table or perform other actions
            console.log(`Successfully deleted supplier with ID ${supplierId}`);
            // Remove the selected row from the table
            selectedSupplierRow.remove();
        })
        .catch(error => {
            console.error('Error deleting supplier:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteSupplierModal').modal('hide');
        });
}

let selectedInventoryRow; // Variable to store the selected inventory row

// Event listener to store the selected row when the delete modal is shown
$('#deleteInventoryModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedInventoryRow = button.closest('tr');
});

// Function to prompt for inventory ID before deleting
function promptDeleteInventoryItem() {
    // Clear any previous input
    document.getElementById('inventoryIdToDelete').value = '';
    // Show the delete modal
    $('#deleteInventoryModal').modal('show');
}

// Function to delete an inventory item by ID
function deleteInventoryItemById() {
    // Get the inventory ID to delete
    const inventoryId = document.getElementById('inventoryIdToDelete').value;

    // Validate that the ID is not empty
    if (!inventoryId.trim()) {
        alert('Please enter a valid Inventory ID.');
        return;
    }

    // Call the delete function with the inventory ID
    deleteInventoryItem(inventoryId);
}

// Function to delete an inventory item
function deleteInventoryItem(inventoryId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/inventory/${inventoryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // If the request is successful, update the table or perform other actions
            console.log(`Successfully deleted inventory with ID ${inventoryId}`);
            // Remove the selected row from the table
            selectedInventoryRow.remove();
        })
        .catch(error => {
            console.error('Error deleting inventory:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteInventoryModal').modal('hide');
        });
}

let selectedStockRow; // Variable to store the selected stock row

// Event listener to store the selected row when the delete modal is shown
$('#deleteStockModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedStockRow = button.closest('tr');
});

// Function to prompt for stock ID before deleting
function promptDeleteStockItem() {
    // Clear any previous input
    document.getElementById('stockIdToDelete').value = '';
    // Show the delete modal
    $('#deleteStockModal').modal('show');
}

// Function to delete a stock item by ID
function deleteStockById() {
    // Get the stock ID to delete
    const stockId = document.getElementById('stockIdToDelete').value;

    // Validate that the ID is not empty
    if (!stockId.trim()) {
        alert('Please enter a valid Stock ID.');
        return;
    }

    // Call the delete function with the stock ID
    deleteStockItem(stockId);
}

// Function to delete a stock item
function deleteStockItem(stockId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/stock/${stockId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // If the request is successful, update the table or perform other actions
            console.log(`Successfully deleted stock with ID ${stockId}`);
            // Remove the selected row from the table
            selectedStockRow.remove();
        })
        .catch(error => {
            console.error('Error deleting stock:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteStockModal').modal('hide');
        });
}
