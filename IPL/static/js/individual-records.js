// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/individualrecords")
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
  const initialData = statsData.filter(item => item.record === 'Most Matches Played');
  mostMatchesPlayedTable(initialData);
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
        case 'Most Matches Played':
            mostMatchesPlayedTable(tableData);
            break;
        case 'Most Matches Played as Captain':
            mostMatchesPlayedAsCaptainTable(tableData);
            break;
        case 'Most Consecutive Wins':
            mostConsecutiveWinsTable(tableData);
            break;
        case 'Most Consecutive Losses':
            mostConsecutiveLossesTable(tableData);
            break;
        case 'Most POTM Awards':
            mostPOTMAwardsTable(tableData);
            break;
    }
  }


  function mostMatchesPlayedTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Individual-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
  tableHTML += '<th>Teams</th>'; // Margin column
  tableHTML += '<th>Span</th>'; // Balls Rem column
  tableHTML += '<th>Mat</th>'; // Target column
  tableHTML += '<th>Runs</th>'; // Overs column
  tableHTML += '<th>HS</th>'; // Max column
  tableHTML += '<th>Batting Avg</th>'; // Opponent column
  tableHTML += '<th>100s</th>'; // Venue column
  tableHTML += '<th>Wkts</th>'; // Date column
    tableHTML += '<th>BBI</th>'; // Result column
    tableHTML += '<th>Bowling Avg</th>'; // Date column
    tableHTML += '<th>5W</th>'; // Date column
    tableHTML += '<th>Catches</th>'; // Date column
    tableHTML += '<th>Stumpings</th>'; // Date column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Runs", "HS", "Bat Avg", "100s", "Wkts", "BBI", "Bowl Avg", "5W", "Catches", "Stumpings"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td>${stat[1]}</td>`;
        tableHTML += `<td>${stat[2]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[3]}</td>`;
        tableHTML += `<td>${stat[4]}</td>`;
        tableHTML += `<td>${stat[5]}</td>`;
        tableHTML += `<td>${stat[6]}</td>`;
        tableHTML += `<td>${stat[7]}</td>`;
        tableHTML += `<td>${stat[8]}</td>`;
        tableHTML += `<td>${stat[9]}</td>`;
        tableHTML += `<td>${stat[10]}</td>`;
        tableHTML += `<td>${stat[11]}</td>`;
        tableHTML += `<td>${stat[12]}</td>`;
        tableHTML += `<td>${stat[13]}</td>`;
        tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function mostMatchesPlayedAsCaptainTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Individual-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Teams</th>'; // Margin column
    tableHTML += '<th>Span</th>'; // Balls Rem column
    tableHTML += '<th>Mat</th>'; // Target column
    tableHTML += '<th>Won</th>'; // Overs column
    tableHTML += '<th>Lost</th>'; // Max column
    tableHTML += '<th>Tied</th>'; // Result column
    tableHTML += '<th>Draw</th>'; // Date column
    tableHTML += '<th>NR</th>'; // Date column
    tableHTML += '<th>W/L Ratio</th>'; // Date column
    tableHTML += '<th>Win %</th>'; // Date column
    tableHTML += '<th>Loss %</th>'; // Date column
    tableHTML += '<th>Draw %</th>'; // Date column
    tableHTML += '<th>Tied %</th>'; // Date column
    tableHTML += '<th>NR %</th>'; // Date column
    tableHTML += '<th>Result %</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Won", "Lost", "Tied", "Draw", "NR", "W/L", "%W", "%L", "%Draw", "%Tied", "%NR", "%Result"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td>${stat[1]}</td>`;
        tableHTML += `<td>${stat[2]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[3]}</td>`;
        tableHTML += `<td>${stat[4]}</td>`;
        tableHTML += `<td>${stat[5]}</td>`;
        tableHTML += `<td>${stat[6]}</td>`;
        tableHTML += `<td>${stat[7]}</td>`;
        tableHTML += `<td>${stat[8]}</td>`;
        tableHTML += `<td>${stat[9]}</td>`;
        tableHTML += `<td>${stat[10]}</td>`;
        tableHTML += `<td>${stat[11]}</td>`;
        tableHTML += `<td>${stat[12]}</td>`;
        tableHTML += `<td>${stat[13]}</td>`;
        tableHTML += `<td>${stat[14]}</td>`;
        tableHTML += `<td>${stat[15]}</td>`;
        tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
    }

    function mostConsecutiveWinsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Individual2-Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Team</th>'; // Winner column
    tableHTML += '<th>Wins</th>'; // Margin column
    tableHTML += '<th>Span</th>'; // Balls Rem column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Team", "Wins", "Span"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
        tableHTML += `<td>${stat[2]}</td>`;
        tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

function mostConsecutiveLossesTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Individual2-Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Team</th>'; // Winner column
    tableHTML += '<th>Losses</th>'; // Margin column
    tableHTML += '<th>Span</th>'; // Balls Rem column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Team", "Losses", "Span"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
        tableHTML += `<td>${stat[2]}</td>`;
        tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

function mostPOTMAwardsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Individual-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
  tableHTML += '<th>Teams</th>'; // Margin column
  tableHTML += '<th>Span</th>'; // Balls Rem column
  tableHTML += '<th>Mat</th>'; // Target column
  tableHTML += '<th>POTM Awards</th>'; // Overs column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Awards"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
        tableHTML += `<td>${stat[1]}</td>`;
        tableHTML += `<td>${stat[2]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[3]}</td>`;
        tableHTML += `<td class="fw-bold">${stat[4]}</td>`;
        tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }
  