// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/partnershiprecords")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const statsData = data.stats;
        const fullNames = data.fn;
        // Now you can use statsData and fullNames in your JavaScript
        window.statsData = statsData; // Make it globally accessible
        window.fullNames = fullNames; // Make it globally accessible
        window.dispatchEvent(new Event('statsReady')); // Notify that data is ready
    })
    .catch(error => {
        tableContainer.innerHTML = '<div style="color:red; text-align:center; padding:40px 0;">Failed to load data.</div>';
    });

window.addEventListener('statsReady', () => {
    // Remove loading spinner
    if (document.getElementById('loadingSpinner')) {
        document.getElementById('loadingSpinner').remove();
    }
    // Initial table render - same approach as battingStat.html
  const initialData = statsData.filter(item => item.record === 'Highest Partnership by Wickets');
  highestPartnershipByWicketsTable(initialData);
});

function selectOption(element, optionTitle) {
    // Remove active from all
    const items = document.querySelectorAll('.dropdown-menu a');
    items.forEach(item => item.classList.remove('activeD'));
    
    // Set active to clicked one
    element.classList.add('activeD');

    // Update button text
    document.getElementById('dropdownButton').innerHTML = `${optionTitle} <i class="fa fa-chevron-down font_10 ms-1"></i>`;

    // Close dropdown
    document.querySelector('.dropdown').classList.remove('show');
    let tableData;
    tableData = statsData.filter(item => item.record.toLowerCase() === optionTitle.toLowerCase());
    
  switch(optionTitle) {
        case 'Highest Partnership by Wickets':
            highestPartnershipByWicketsTable(tableData);
            break;
        case 'Highest Partnership by Runs':
            highestPartnershipByRunsTable(tableData);
            break;
        case 'Partnerships List':
            partnershipsListTable(tableData);
            break;
    }
  }


  function highestPartnershipByWicketsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Partnership-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Wickets</th>'; // Winner column
  tableHTML += '<th>Runs</th>'; // Margin column
  tableHTML += '<th colspan="2">Partners</th>'; // Balls Rem column
  tableHTML += '<th>Team</th>'; // Target column
  tableHTML += '<th>Opponent</th>'; // Overs column
  tableHTML += '<th>Venue</th>'; // Max column
  tableHTML += '<th>Date</th>'; // Opponent column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Wickets", "Runs", "Partner 1", "Partner 2", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
        tableHTML += `<td class="fw-bold">${stat[0]}</td>`;
        tableHTML += `<td>${stat[1]}</td>`;
        tableHTML += `<td class="fw-bold text-blue">${stat[2]}</td>`;
        tableHTML += `<td class="fw-bold text-blue">${stat[3]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[4]}</td>`;
        tableHTML += `<td>${stat[5]}</td>`;
        tableHTML += `<td>${stat[6]}</td>`;
        tableHTML += `<td>${stat[7]}</td>`;
        tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }
  
  function highestPartnershipByRunsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Partnership2-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th colspan="2">Partners</th>'; // Winner column
    tableHTML += '<th>Runs</th>'; // Margin column
    tableHTML += '<th>Wickets</th>'; // Balls Rem column
    tableHTML += '<th>Team</th>'; // Target column
    tableHTML += '<th>Opponent</th>'; // Overs column
    tableHTML += '<th>Venue</th>'; // Max column
    tableHTML += '<th>Date</th>'; // Opponent column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Partner 1", "Partner 2", "Runs", "Wickets", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
        tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td class="fw-bold text-blue">${stat[1]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
        tableHTML += `<td>${stat[3]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[4]}</td>`;
        tableHTML += `<td>${stat[5]}</td>`;
        tableHTML += `<td>${stat[6]}</td>`;
        tableHTML += `<td>${stat[7]}</td>`;
        tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
    }

    function partnershipsListTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Partnership2-Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th colspan="2">Partners</th>'; // Winner column
    tableHTML += '<th>Runs</th>'; // Margin column
    tableHTML += '<th>Wickets</th>'; // Balls Rem column
    tableHTML += '<th>Team</th>'; // Target column
    tableHTML += '<th>Opponent</th>'; // Overs column
    tableHTML += '<th>Venue</th>'; // Max column
    tableHTML += '<th>Date</th>'; // Opponent column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Partner 1", "Partner 2", "Runs", "Wickets", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
        tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td class="fw-bold text-blue">${stat[1]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
        tableHTML += `<td>${stat[3]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[4]}</td>`;
        tableHTML += `<td>${stat[5]}</td>`;
        tableHTML += `<td>${stat[6]}</td>`;
        tableHTML += `<td>${stat[7]}</td>`;
        tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
    }
