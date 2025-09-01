// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/individualbowlingrecords")
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
  const initialData = statsData.filter(item => item.record === 'Most Career Wickets');
  mostCareerWicketsTable(initialData);
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
        case 'Most Career Wickets':
            mostCareerWicketsTable(tableData);
            break;
        case 'Best Bowling Figures':
            bestBowlingFiguresTable(tableData);
            break;
        case '5W Hauls':
            fiveWicketsHaulsTable(tableData);
            break;
        case 'Hat-tricks':
            hatTricksTable(tableData);
            break;
        case 'Most Wickets in a Season':
            mostWicketsInSeasonTable(tableData);
            break;
        case 'Most Runs Conceded in an Innings':
            mostRunsConcededInInningsTable(tableData);
            break;
        case 'Most Career Dot Balls':
            mostCareerDotBallsTable(tableData);
            break;
        case 'Most Dot Balls in an Innings':
            mostDotBallsInInningsTable(tableData);
            break;
    }
  }

  function mostCareerWicketsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
  tableHTML += '<th>Teams</th>'; // Margin column
  tableHTML += '<th>Span</th>'; // Balls Rem column
  tableHTML += '<th>Mat</th>'; // Target column
  tableHTML += '<th>Inns</th>'; // Overs column
  tableHTML += '<th>Balls</th>'; // Balls column
  tableHTML += '<th>Overs</th>'; // Runs column
    tableHTML += '<th>Mdns</th>'; // HS column
    tableHTML += '<th>Runs</th>'; // Avg column
    tableHTML += '<th>Wkts</th>'; // Balls Faced column
    tableHTML += '<th>BBI</th>'; // SR column
    tableHTML += '<th>Avg</th>'; // 100s column
    tableHTML += '<th>Econ</th>'; // 50s column
    tableHTML += '<th>SR</th>'; // 0s column
    tableHTML += '<th>4W</th>'; // 4s column
    tableHTML += '<th>5W</th>'; // 6s column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Balls", "Overs", "Mdns", "Runs", "Wkts", "BBI", "Avg", "Econ", "SR", "4W", "5W"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td>${stat[7]}</td>`;
            tableHTML += `<td>${stat[8]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[9]}</td>`;
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

  function bestBowlingFiguresTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Mdns</th>'; // Mdns column
    tableHTML += '<th>Runs Conceded</th>'; // Runs column
    tableHTML += '<th>Wkts Taken</th>'; // Wkts column
    tableHTML += '<th>Econ</th>'; // Econ column
    tableHTML += '<th>Inn</th>'; // Inn column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Opponent</th>'; // Opposition column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Overs", "Mdns", "Runs", "Wkts", "Econ", "Inns", "Team", "Opposition", "Ground", "Date"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td>${stats[1]}</td>`;
            tableHTML += `<td>${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td>${stats[6]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += `<td>${stats[9]}</td>`;
            tableHTML += `<td>${stats[10]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function fiveWicketsHaulsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Inn</th>'; // Inns column
    tableHTML += '<th>Runs Conceded</th>'; // Runs column
    tableHTML += '<th>Wkts Taken</th>'; // Wkts column
    tableHTML += '<th>Econ</th>'; // Econ column
    tableHTML += '<th>Result</th>'; // BBI column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Overs", "Inns", "Runs", "Wkts", "Econ", "Result", "Team", "Opposition", "Ground", "Date"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td>${stats[1]}</td>`;
            tableHTML += `<td>${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td ${stats[6] === "Won" ? 'class="text-green fw-bold"' : 'class="text-orange fw-bold"'}>${stats[6]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += `<td>${stats[9]}</td>`;
            tableHTML += `<td>${stats[10]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function hatTricksTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Year</th>'; // Year column
    tableHTML += '<th>Team</th>'; // Overs column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Victims</th>'; // Victims column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Season", "Team", "Opposition", "Ground", "Victims"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td>${stats[1]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td>${stats[4]}</td>`;
            tableHTML += `<td>${stats[5].join(', ')}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function mostWicketsInSeasonTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Year</th>'; // Year column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Mat</th>'; // Mat column
    tableHTML += '<th>Balls</th>'; // Balls column
    tableHTML += '<th>Inns</th>'; // Inns column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Mdns</th>'; // Mdns column
    tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '<th>Wkts</th>'; // Wickets column
    tableHTML += '<th>BBI</th>'; // BBI column
    tableHTML += '<th>Avg</th>'; // Avg column
    tableHTML += '<th>Econ</th>'; // Econ column
    tableHTML += '<th>SR</th>'; // SR column
    tableHTML += '<th>4W</th>'; // 4W column
    tableHTML += '<th>5W</th>'; // 5W column
    tableHTML += '<th>10W</th>'; // 10W column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Year", "Team", "Matches", "Balls", "Inns", "Overs", "Mdns", "Runs", "Wickets", "BBI", "Avg", "Econ", "SR", "4W", "5W", "10W"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td>${stats[1]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td>${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td>${stats[6]}</td>`;
            tableHTML += `<td>${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[9]}</td>`;
            tableHTML += `<td>${stats[10]}</td>`;
            tableHTML += `<td>${stats[11]}</td>`;
            tableHTML += `<td>${stats[12]}</td>`;
            tableHTML += `<td>${stats[13]}</td>`;
            tableHTML += `<td>${stats[14]}</td>`;
            tableHTML += `<td>${stats[15]}</td>`;
            tableHTML += `<td>${stats[16]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function mostRunsConcededInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Overs</th>'; // Year column
    tableHTML += '<th>Mdns</th>'; // Team column
    tableHTML += '<th>Runs Conceded</th>'; // Runs column
    tableHTML += '<th>Wkts Taken</th>'; // Wkts column
    tableHTML += '<th>Econ</th>'; // Econ column
    tableHTML += '<th>Team</th>'; // Inns column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Ground column
    tableHTML += '<th>Date</th>'; // Runs Conceded column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Overs", "Mdns", "Runs", "Wkts", "Econ", "Team", "Opposition", "Ground", "Date"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td>${stats[1]}</td>`;
            tableHTML += `<td>${stats[2]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[3]}</td>`;
            tableHTML += `<td>${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[6]}</td>`;
            tableHTML += `<td>${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += `<td>${stats[9]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function mostCareerDotBallsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Latest Team</th>'; // Inns column
    tableHTML += '<th>Matches</th>'; // Span column
    tableHTML += '<th>Overs</th>'; // Year column
    tableHTML += '<th>Mdns</th>'; // Team column
    tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '<th>Wkts</th>'; // Wkts column
    tableHTML += '<th>Dots</th>'; // Dots column
    tableHTML += '<th>Avg</th>'; // Avg column
    tableHTML += '<th>Econ</th>'; // Econ column
    tableHTML += '<th>BBI</th>'; // BBI column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Team", "Matches", "Overs", "Mdns", "Runs", "Wkts", "Dots", "Avg", "Econ", "BBI"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[1]}</td>`;
            tableHTML += `<td>${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td>${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td>${stats[6]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += `<td>${stats[9]}</td>`;
            tableHTML += `<td>${stats[10]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function mostDotBallsInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table class="Bowling-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Mdns</th>'; // Mdns column
    tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '<th>Wkts</th>'; // Wkts column
    tableHTML += '<th>Dots</th>'; // Dots column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`;
            const stats = ["Player", "Team", "Overs", "Mdns", "Runs", "Wkts", "Dots", "Opposition", "Date"].map(key => item.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stats[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[1]}</td>`;
            tableHTML += `<td>${stats[2]}</td>`;
            tableHTML += `<td>${stats[3]}</td>`;
            tableHTML += `<td>${stats[4]}</td>`;
            tableHTML += `<td>${stats[5]}</td>`;
            tableHTML += `<td class="fw-bold">${stats[6]}</td>`;
            tableHTML += `<td>${stats[7]}</td>`;
            tableHTML += `<td>${stats[8]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }
