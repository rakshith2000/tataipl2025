// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/individualwicketkeepingrecords")
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
  const initialData = statsData.filter(item => item.record === 'Most Career Dismissals');
  mostCareerDismissalsTable(initialData);
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
        case 'Most Career Dismissals':
            mostCareerDismissalsTable(tableData);
            break;
        case 'Most Catches as Wicket Keeper':
            mostCatchesAsWicketKeeperTable(tableData);
            break;
        case 'Most Stumpings as Wicket Keeper':
            mostStumpingsAsWicketKeeperTable(tableData);
            break;
        case 'Most Dismissals in an Innings':
            mostDismissalsInInningsTable(tableData);
            break;
        case 'Most Dismissals in a Season':
            mostDismissalsInSeasonTable(tableData);
            break;
    }
  }

  function mostCareerDismissalsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="WicketKeeping-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
  tableHTML += '<th>Teams</th>'; // Margin column
  tableHTML += '<th>Span</th>'; // Balls Rem column
  tableHTML += '<th>Mat</th>'; // Target column
  tableHTML += '<th>Inns</th>'; // Overs column
  tableHTML += '<th>Dismissed</th>'; // Balls column
  tableHTML += '<th>Catches</th>'; // Runs column
    tableHTML += '<th>Stumpings</th>'; // HS column
    tableHTML += '<th>MaxDisInns</th>'; // Avg column
    tableHTML += '<th>Dis/Inn</th>'; // Balls Faced column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Dismissed", "Catches", "Stumping", "MaxDisInns", "Dis/Inn"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td>${stat[7]}</td>`;
            tableHTML += `<td>${stat[8]}</td>`;
            tableHTML += `<td>${stat[9]}</td>`;
            tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function mostCatchesAsWicketKeeperTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="WicketKeeping-Records-table"><thead><tr>';
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Teams</th>'; // Margin column
    tableHTML += '<th>Span</th>'; // Balls Rem column
    tableHTML += '<th>Mat</th>'; // Target column
    tableHTML += '<th>Inns</th>'; // Overs column
    tableHTML += '<th>Dismissed</th>'; // Balls column
    tableHTML += '<th>Catches</th>'; // Runs column
    tableHTML += '<th>Stumpings</th>'; // HS column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Dismissed", "Catches", "Stumping"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[6]}</td>`;
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

    function mostStumpingsAsWicketKeeperTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="WicketKeeping-Records-table"><thead><tr>';
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Teams</th>'; // Margin column
    tableHTML += '<th>Span</th>'; // Balls Rem column
    tableHTML += '<th>Mat</th>'; // Target column
    tableHTML += '<th>Inns</th>'; // Overs column
    tableHTML += '<th>Dismissed</th>'; // Balls column
    tableHTML += '<th>Catches</th>'; // Runs column
    tableHTML += '<th>Stumpings</th>'; // HS column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Dismissed", "Catches", "Stumping"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[7]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
    }

    function mostDismissalsInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="WicketKeeping-Records-table"><thead><tr>';
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Dismissed</th>'; // Margin column
    tableHTML += '<th>Catches</th>'; // Balls Rem column
    tableHTML += '<th>Stumpings</th>'; // Target column
    tableHTML += '<th>Team</th>'; // Balls column
    tableHTML += '<th>Opponent</th>'; // Balls column
    tableHTML += '<th>Venue</th>'; // Runs column
    tableHTML += '<th>Date</th>'; // Balls column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Dismissed", "Catches", "Stumpings", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
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

    function mostDismissalsInSeasonTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="WicketKeeping-Records-table"><thead><tr>';
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Team</th>'; // Margin column
    tableHTML += '<th>Season</th>'; // Balls Rem column
    tableHTML += '<th>Mat</th>'; // Target column
    tableHTML += '<th>Inns</th>'; // Overs column
    tableHTML += '<th>Dismissed</th>'; // Balls column
    tableHTML += '<th>Catches</th>'; // Runs column
    tableHTML += '<th>Stumpings</th>'; // HS column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Team", "Year", "Matches", "Inns", "Dismissed", "Catches", "Stumpings"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
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
