document.addEventListener('DOMContentLoaded', function () {
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

  // Add event listener to refresh the table when a search is submitted (if you have search functionality)
  document.querySelector('form[name="medicineSearchForm"]').addEventListener('submit', function (event) {
      event.preventDefault();
      fetchMedicines();
  });
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

  // Add event listener to refresh the table when a search is submitted (if you have search functionality)
  document.querySelector('form[name="suppliersSearchForm"]').addEventListener('submit', function (event) {
      event.preventDefault();
      fetchSuppliers();
  });

  // Add event listener for form submission (create/update)
  document.querySelector('form[name="suppliersForm"]').addEventListener('submit', function (event) {
      event.preventDefault();
      // Implement the logic for creating or updating suppliers
      // You may use the Fetch API or another library (e.g., Axios) to make HTTP requests to your Laravel backend.
  });

  // Add event listeners for edit and delete buttons (implement the logic accordingly)
  document.getElementById('suppliersTableBody').addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('btn-info')) {
          // Implement logic for editing a supplier
      } else if (target.classList.contains('btn-danger')) {
          // Implement logic for deleting a supplier
      }
  });
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

  // Add event listener to refresh the table when a search is submitted (if you have search functionality)
  document.querySelector('form[name="inventorySearchForm"]').addEventListener('submit', function (event) {
      event.preventDefault();
      fetchInventory();
  });

  // Add event listener for form submission (create/update)
  document.querySelector('form[name="inventoryForm"]').addEventListener('submit', function (event) {
      event.preventDefault();
      // Implement the logic for creating or updating inventory items
      // You may use the Fetch API or another library (e.g., Axios) to make HTTP requests to your Laravel backend.
  });

  // Add event listeners for edit and delete buttons (implement the logic accordingly)
  document.getElementById('inventoryTableBody').addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('btn-info')) {
          // Implement logic for editing an inventory item
      } else if (target.classList.contains('btn-danger')) {
          // Implement logic for deleting an inventory item
      }
  });
});

