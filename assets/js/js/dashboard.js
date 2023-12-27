document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display summaries
    function fetchSummaries() {
        // ... (unchanged code for fetching summaries)
    }

    // Function to fetch and display data for each table
    function fetchTableData(endpoint, tableBodyId) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById(tableBodyId);
                tableBody.innerHTML = ''; // Clear existing rows

                if (data.length > 0) {
                    data.forEach(item => {
                        const row = document.createElement('tr');
                        // Adjust the row creation based on the actual structure of your data
                        // For example: row.innerHTML = `<td>${item.field1}</td><td>${item.field2}</td>...`;
                        
                        // Add table data cells without Edit and Delete buttons
                        Object.keys(item).forEach(key => {
                            if (key !== 'id' && key !== 'edit' && key !== 'delete') {
                                const cell = document.createElement('td');
                                cell.textContent = item[key];
                                row.appendChild(cell);
                            }
                        });

                        tableBody.appendChild(row);
                    });
                } else {
                    // Display a message when no data is available
                    const row = document.createElement('tr');
                    row.innerHTML = `<td colspan="3">No data found</td>`;
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial fetch when the page loads
    fetchSummaries();
    fetchTableData('http://127.0.0.1:8000/api/medicine', 'medicineTableBody');
    fetchTableData('http://127.0.0.1:8000/api/supplier', 'supplierTableBody');
    fetchTableData('http://127.0.0.1:8000/api/inventory', 'inventoryTableBody');
    fetchTableData('http://127.0.0.1:8000/api/stock', 'stocksTableBody');
});
