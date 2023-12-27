/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// Wait for the DOM to be ready before initializing DataTable
document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    const dataTable = new simpleDatatables.DataTable('#dataTable');

    // Add event listener for the search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            // Search and filter the table based on user input
            dataTable.search(this.value);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var sidebarToggle = document.getElementById('sidebarToggle');
    var layoutSidenavContent = document.getElementById('layoutSidenav_content');

    sidebarToggle.addEventListener('click', function () {
        var isSidebarCollapsed = layoutSidenavContent.classList.toggle('sidebar-collapsed');

        // If the sidebar is collapsed, adjust the left margin of the content
        if (isSidebarCollapsed) {
            layoutSidenavContent.style.marginLeft = '60px'; // Adjust the value based on your sidebar width
        } else {
            layoutSidenavContent.style.marginLeft = '240px'; // Adjust the value based on your sidebar width
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var layoutSidenav = document.getElementById('layoutSidenav');
    var layoutSidenavContent = document.getElementById('layoutSidenav_content');
    var welcomeMessage = document.getElementById('welcomeMessage');

    var isSidebarCollapsed = window.innerWidth < 768; // Adjust the breakpoint based on your design

    if (isSidebarCollapsed) {
        layoutSidenav.style.width = '60px';
        layoutSidenavContent.style.marginLeft = '60px';
        welcomeMessage.style.marginLeft = '60px';
    } else {
        layoutSidenav.style.width = '240px';
        layoutSidenavContent.style.marginLeft = '240px';
        welcomeMessage.style.marginLeft = '240px';
    }
});
