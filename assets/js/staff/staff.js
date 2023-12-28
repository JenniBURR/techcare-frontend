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

                        switch (tableBodyId) {
                            case 'managerTableBody':
                                rowHTML = `<td>${item.manager_id}</td>
                                            <td>${item.manager_name}</td>
                                            <td>${item.age}</td>
                                            <td>${item.address}</td>`;
                                break;
                            case 'staffTableBody':
                                rowHTML = `<td>${item.staff_id}</td>
                                            <td>${item.staff_name}</td>
                                            <td>${item.age}</td>
                                            <td>${item.address}</td>`;
                                break;
                            case 'branchTableBody':
                                rowHTML = `<td>${item.branch_id}</td>
                                            <td>${item.staff_id}</td>
                                            <td>${item.manager_id}</td>
                                            <td>${item.branch_name}</td>
                                            <td>${item.address}</td>`;
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
                    row.innerHTML = `<td colspan="4">No data found</td>`; // Adjust colspan based on the number of columns
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial fetch when the page loads
    fetchTableData('http://127.0.0.1:8000/api/manager', 'managerTableBody', 5);
    fetchTableData('http://127.0.0.1:8000/api/staff', 'staffTableBody', 5);
    fetchTableData('http://127.0.0.1:8000/api/branch', 'branchTableBody', 5);

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

    // Function to handle table navigation
    function handleTableNavigation(tableId, direction) {
        // Implement logic for navigating through the table
        console.log(`Navigating ${direction} in table ${tableId}`);
    }
});

document.addEventListener('DOMContentLoaded', function () {
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
                    case 'managerTableBody':
                        rowHTML = `<td>${data.manager_id}</td>
                                    <td>${data.manager_name}</td>
                                    <td>${data.age}</td>
                                    <td>${data.address}</td>`;
                        break;
                    case 'staffTableBody':
                        rowHTML = `<td>${data.staff_id}</td>
                                    <td>${data.staff_name}</td>
                                    <td>${data.age}</td>
                                    <td>${data.address}</td>`;
                        break;
                    case 'branchTableBody':
                        rowHTML = `<td>${data.branch_id}</td>
                                    <td>${data.staff_id}</td>
                                    <td>${data.manager_id}</td>
                                    <td>${data.branch_name}</td>
                                    <td>${data.address}</td>`;
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
    document.getElementById('addManagerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newManagerItem = {
            manager_name: formData.get('manager_name'),
            age: formData.get('age'),
            address: formData.get('address'),
        };

        addNewItem('http://127.0.0.1:8000/api/manager', newManagerItem, 'managerTableBody');
    });

    document.getElementById('addStaffForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newStaffItem = {
            staff_name: formData.get('staff_name'),
            age: formData.get('age'),
            address: formData.get('address'),
        };

        addNewItem('http://127.0.0.1:8000/api/staff', newStaffItem, 'staffTableBody');
    });

    document.getElementById('addBranchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        const newBranchItem = {
            staff_id: formData.get('staff_id'),
            manager_id: formData.get('manager_id'),
            branch_name: formData.get('branch_name'),
            address: formData.get('address'),
        };

        addNewItem('http://127.0.0.1:8000/api/branch', newBranchItem, 'branchTableBody');
    });
});

// Function to handle editing a manager item
window.editManager = function () {
    const editManagerId = document.getElementById('editManagerId').value;
    const editManagerName = document.getElementById('editManagerName').value;
    const editAge = document.getElementById('editAge').value;
    const editAddress = document.getElementById('editAddress').value;

    const editedManager = {
        manager_name: editManagerName,
        age: editAge,
        address: editAddress,
    };

    fetch(`http://127.0.0.1:8000/api/manager/${editManagerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedManager),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('managerTableBody', data);
            // Close the edit modal
            $('#editManagerModal').modal('hide');
        })
        .catch(error => console.error('Error editing manager:', error));
};

// Function to update the table row with edited data
function updateTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.manager_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.manager_name;
            cells[2].innerText = editedItem.age;
            cells[3].innerText = editedItem.address;
            break;
        }
    }
}

// Function to handle editing a staff item
window.editStaff = function () {
    const editStaffId = document.getElementById('editStaffId').value;
    const editStaffName = document.getElementById('editStaffName').value;
    const editStaffAge = document.getElementById('editStaffAge').value;
    const editStaffAddress = document.getElementById('editStaffAddress').value;

    const editedStaff = {
        staff_name: editStaffName,
        age: editStaffAge,
        address: editStaffAddress,
    };

    fetch(`http://127.0.0.1:8000/api/staff/${editStaffId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedStaff),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('staffTableBody', data);
            // Close the edit modal
            $('#editStaffModal').modal('hide');
        })
        .catch(error => console.error('Error editing staff:', error));
};

// Function to update the table row with edited data
function updateTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.staff_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.staff_name;
            cells[2].innerText = editedItem.age;
            cells[3].innerText = editedItem.address;
            break;
        }
    }
}

// Function to handle editing a branch item
window.editBranch = function () {
    const editBranchId = document.getElementById('editBranchId').value;
    const editBranchName = document.getElementById('editBranchName').value;
    const editBranchStaffId = document.getElementById('editBranchStaffId').value;
    const editBranchManagerId = document.getElementById('editBranchManagerId').value;
    const editBranchAddress = document.getElementById('editBranchAddress').value;

    const editedBranch = {
        branch_name: editBranchName,
        staff_id: editBranchStaffId,
        manager_id: editBranchManagerId,
        address: editBranchAddress,
    };

    fetch(`http://127.0.0.1:8000/api/branch/${editBranchId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBranch),
    })
        .then(response => response.json())
        .then(data => {
            // Update the table row with the edited data
            updateTableRow('branchTableBody', data);
            // Close the edit modal
            $('#editBranchModal').modal('hide');
        })
        .catch(error => console.error('Error editing branch:', error));
};

// Function to update the table row with edited data
function updateTableRow(tableBodyId, editedItem) {
    const tableBody = document.getElementById(tableBodyId);
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const itemId = cells[0].innerText; // Assuming the first column contains the ID

        if (itemId == editedItem.branch_id) {
            // Update the corresponding row with the edited data
            cells[1].innerText = editedItem.staff_id;
            cells[2].innerText = editedItem.manager_id;
            cells[3].innerText = editedItem.branch_name;
            cells[4].innerText = editedItem.address;
            break;
        }
    }
}

let selectedManagerRow; // Variable to store the selected manager row

// Event listener to store the selected row when the delete modal is shown
$('#deleteManagerModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedManagerRow = button.closest('tr');
});

// Function to prompt for manager ID before deleting
function promptDeleteManagerItem() {
    // Clear any previous input
    document.getElementById('managerIdToDelete').value = '';
    // Show the delete modal
    $('#deleteManagerModal').modal('show');
}

// Function to delete a manager item by ID
function deleteManagerById() {
    // Get the manager ID to delete
    const managerId = document.getElementById('managerIdToDelete').value;

    // Validate that the ID is not empty
    if (!managerId.trim()) {
        alert('Please enter a valid Manager ID.');
        return;
    }

    // Call the delete function with the manager ID
    deleteManagerItem(managerId);
}

// Function to delete a manager item
function deleteManagerItem(managerId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/manager/${managerId}`, {
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
            console.log(`Successfully deleted manager with ID ${managerId}`);
            // Remove the selected row from the table
            selectedManagerRow.remove();
        })
        .catch(error => {
            console.error('Error deleting manager:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteManagerModal').modal('hide');
        });
}

let selectedStaffRow; // Variable to store the selected staff row

// Event listener to store the selected row when the delete modal is shown
$('#deleteStaffModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedStaffRow = button.closest('tr');
});

// Function to prompt for staff ID before deleting
function promptDeleteStaffItem() {
    // Clear any previous input
    document.getElementById('staffIdToDelete').value = '';
    // Show the delete modal
    $('#deleteStaffModal').modal('show');
}

// Function to delete a staff item by ID
function deleteStaffById() {
    // Get the staff ID to delete
    const staffId = document.getElementById('staffIdToDelete').value;

    // Validate that the ID is not empty
    if (!staffId.trim()) {
        alert('Please enter a valid Staff ID.');
        return;
    }

    // Call the delete function with the staff ID
    deleteStaffItem(staffId);
}

// Function to delete a staff item
function deleteStaffItem(staffId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/staff/${staffId}`, {
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
            console.log(`Successfully deleted staff with ID ${staffId}`);
            // Remove the selected row from the table
            selectedStaffRow.remove();
        })
        .catch(error => {
            console.error('Error deleting staff:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteStaffModal').modal('hide');
        });
}

let selectedBranchRow; // Variable to store the selected branch row

// Event listener to store the selected row when the delete modal is shown
$('#deleteBranchModal').on('show.bs.modal', function (event) {
    // Get the button that triggered the modal
    const button = $(event.relatedTarget);
    // Get the row associated with the button
    selectedBranchRow = button.closest('tr');
});

// Function to prompt for branch ID before deleting
function promptDeleteBranchItem() {
    // Clear any previous input
    document.getElementById('branchIdToDelete').value = '';
    // Show the delete modal
    $('#deleteBranchModal').modal('show');
}

// Function to delete a branch item by ID
function deleteBranchById() {
    // Get the branch ID to delete
    const branchId = document.getElementById('branchIdToDelete').value;

    // Validate that the ID is not empty
    if (!branchId.trim()) {
        alert('Please enter a valid Branch ID.');
        return;
    }

    // Call the delete function with the branch ID
    deleteBranchItem(branchId);
}

// Function to delete a branch item
function deleteBranchItem(branchId) {
    // Simulate the backend interaction (replace with actual backend logic)
    fetch(`http://127.0.0.1:8000/api/branch/${branchId}`, {
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
            console.log(`Successfully deleted branch with ID ${branchId}`);
            // Remove the selected row from the table
            selectedBranchRow.remove();
        })
        .catch(error => {
            console.error('Error deleting branch:', error);
            // TODO: Handle the error appropriately (e.g., show an error message)
        })
        .finally(() => {
            // Close the delete modal regardless of success or failure
            $('#deleteBranchModal').modal('hide');
        });
}
