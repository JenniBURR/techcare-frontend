document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display data for each table
    function fetchTableData(endpoint, tableBodyId, limit) {
      fetch(`${endpoint}?_limit=${limit}`)
          .then(response => response.json())
          .then(data => {
              const tableBody = document.getElementById(tableBodyId);
              tableBody.innerHTML = ''; // Clear existing rows
  
              if (data.length > 0) {
                  data.forEach(item => {
                      const row = document.createElement('tr');
                      // Adjust the row creation based on the actual structure of your data
                      // Use the correct key names for the Supplier table
                      row.innerHTML = `<td>${item.supplier_id}</td><td>${item.supplier_name}</td><td>${item.contact_info}</td>`;
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

    // Function to handle table navigation buttons
    function handleTableNavigation(tableId, navigationType) {
        const table = document.getElementById(tableId);
        const tableRows = table.querySelectorAll('tbody tr');
        let currentIndex = 0;
        tableRows.forEach((row, index) => {
            if (row.style.display !== 'none') {
                currentIndex = index;
            }
            row.style.display = 'none';
        });

        if (navigationType === 'next') {
            currentIndex = (currentIndex + 1) % tableRows.length;
        } else if (navigationType === 'prev') {
            currentIndex = (currentIndex - 1 + tableRows.length) % tableRows.length;
        }

        const end = Math.min(currentIndex + 5, tableRows.length);
        for (let i = currentIndex; i < end; i++) {
            tableRows[i].style.display = '';
        }
    }

    // Initial fetch when the page loads
    const limit = 5;
    fetchTableData('http://127.0.0.1:8000/api/medicine', 'medicineTableBody', limit);
    fetchTableData('http://127.0.0.1:8000/api/supplier', 'supplierTableBody', limit);
    fetchTableData('http://127.0.0.1:8000/api/inventory', 'inventoryTableBody', limit);
    fetchTableData('http://127.0.0.1:8000/api/stock', 'stocksTableBody', limit);

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
