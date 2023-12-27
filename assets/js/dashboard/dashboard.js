document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize and configure Simple Datatables
    function initializeDatatable(tableId) {
      const table = new simpleDatatables.DataTable(`#${tableId}`, {
          searchable: true,
          perPage: 5,
          labels: {
              noRows: 'No data found',
              info: 'Showing {start} to {end} of {rows} entries',
          },
      });
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
                      // Use the correct key names for the Supplier table
                      row.innerHTML = `<td>${item.supplier_id}</td><td>${item.supplier_name}</td><td>${item.contact_info}</td>`;
                      tableBody.appendChild(row);
                  });
              } else {
                  // Display a message when no data is available
                  const row = document.createElement('tr');
                  row.innerHTML = '<td colspan="3">No data found</td>';
                  tableBody.appendChild(row);
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  // Helper function to create row HTML based on keys
  function createRowHTML(item, keys) {
    const row = document.createElement('tr');
    keys.forEach(key => {
        row.innerHTML += `<td>${item[key]}</td>`;
    });
    return row;
}

  // Initial fetch when the page loads
  const medicineKeys = ['medicine_id', 'name', 'manufacturer', 'expiry_date', 'quantity', 'price'];
  const supplierKeys = ['supplier_id', 'name', 'contact_info'];
  const inventoryKeys = ['inventory_id', 'medicine_id', 'supplier_id', 'quantity', 'purchase_date'];
  const stockKeys = ['stock_id', 'inventory_id', 'branch_id', 'movement_type', 'quantity'];

  // Initial fetch when the page loads
  fetchTableData('http://127.0.0.1:8000/api/medicine', 'medicineTableBody');
  fetchTableData('http://127.0.0.1:8000/api/supplier', 'supplierTableBody');
  fetchTableData('http://127.0.0.1:8000/api/inventory', 'inventoryTableBody');
  fetchTableData('http://127.0.0.1:8000/api/stock', 'stocksTableBody');
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
                          <td>${item.name}</td>
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
  // Function to fetch and display stock
  function fetchStock() {
      fetch('http://127.0.0.1:8000/api/stock')
          .then(response => response.json())
          .then(data => {
              const stocksTableBody = document.getElementById('stocksTableBody');
              stocksTableBody.innerHTML = ''; // Clear existing rows

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
                      stocksTableBody.appendChild(row);
                  });
              } else {
                  // Display a message when no inventory items are available
                  const row = document.createElement('tr');
                  row.innerHTML = '<td colspan="6">No stock items found</td>';
                  stocksTableBody.appendChild(row);
              }
          })
          .catch(error => console.error('Error fetching inventory:', error));
  }

  // Initial fetch when the page loads
  fetchStock();
});
