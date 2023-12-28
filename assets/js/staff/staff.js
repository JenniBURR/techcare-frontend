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
