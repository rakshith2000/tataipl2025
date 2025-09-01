// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/individualbattingrecords")
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
  const initialData = statsData.filter(item => item.record === 'Highest Career Runs');
  highestCareerRunsTable(initialData);
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
        case 'Highest Career Runs':
            highestCareerRunsTable(tableData);
            break;
        case 'Highest Individual Score':
            highestIndividualScoreTable(tableData);
            break;
        case 'Most Centuries':
            mostCenturiesTable(tableData);
            break;
        case 'Most Half Centuries':
            mostHalfCenturiesTable(tableData);
            break;
        case 'Most Runs in a Season':
            mostRunsInSeasonTable(tableData);
            break;
        case 'Most Career Sixes':
            mostCareerSixesTable(tableData);
            break;
        case 'Most Career Fours':
            mostCareerFoursTable(tableData);
            break;
        case 'Most Sixes in an Innings':
            mostSixesInInningsTable(tableData);
            break;
        case 'Highest Average':
            highestAverageTable(tableData);
            break;
        case 'Highest Strike Rate':
            highestStrikeRateTable(tableData);
            break;
        case 'Highest Strike Rate in an Innings':
            highestStrikeRateInInningsTable(tableData);
            break;
        case 'Most Runs From 4s + 6s in an Innings':
            mostRunsFrom4sAnd6sInInningsTable(tableData);
            break;
        case 'Most Career Ducks':
            mostCareerDucksTable(tableData);
            break;
    }
  }

  function highestCareerRunsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    
     // Build HTML table
    let tableHTML = '<table class="Batting-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
  tableHTML += '<th>Teams</th>'; // Margin column
  tableHTML += '<th>Span</th>'; // Balls Rem column
  tableHTML += '<th>Mat</th>'; // Target column
  tableHTML += '<th>Inns</th>'; // Overs column
  tableHTML += '<th>Not Outs</th>'; // Balls column
  tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '<th>HS</th>'; // HS column
    tableHTML += '<th>Avg</th>'; // Avg column
    tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
    tableHTML += '<th>SR</th>'; // SR column
    tableHTML += '<th>100s</th>'; // 100s column
    tableHTML += '<th>50s</th>'; // 50s column
    tableHTML += '<th>0s</th>'; // 0s column
    tableHTML += '<th>4s</th>'; // 4s column
    tableHTML += '<th>6s</th>'; // 6s column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[6]}</td>`;
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

  function highestIndividualScoreTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Batting-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Player</th>'; // Winner column
    tableHTML += '<th>Runs</th>'; // Margin column
    tableHTML += '<th>Mins</th>'; // Balls Rem column
    tableHTML += '<th>Balls</th>'; // Target column
    tableHTML += '<th>4s</th>'; // Overs column
    tableHTML += '<th>6s</th>'; // Balls column
    tableHTML += '<th>SR</th>'; // Runs column
    tableHTML += '<th>Team</th>'; // HS column
    tableHTML += '<th>Opponent</th>'; // Avg column
    tableHTML += '<th>Venue</th>'; // Balls Faced column
    tableHTML += '<th>Date</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Player", "Runs", "Mins", "Balls", "4s", "6s", "SR", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[7]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[8]}</td>`;
            tableHTML += `<td>${stat[9]}</td>`;
            tableHTML += `<td>${stat[10]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
    }

    function mostCenturiesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[11]}</td>`;
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

    function mostHalfCenturiesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += `<td>${stat[11]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[12]}</td>`;
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

    function mostRunsInSeasonTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Team</th>'; // Margin column
        tableHTML += '<th>Season</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Year", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0].split(' (')[0]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[0].split(' (')[1]?.split(')')[0] || ''}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += `<td>${stat[11]}</td>`;
                tableHTML += `<td>${stat[12]}</td>`;
                tableHTML += `<td>${stat[13]}</td>`;
                tableHTML += `<td>${stat[14]}</td>`;
                tableHTML += '</tr>';
            });
        }
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        // Apply sorting to the new table
        const table = tableContainer.querySelector('table');
        applyTableSorting(table);
    }

    function mostCareerSixesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
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
                tableHTML += `<td class="fw-bold">${stat[15]}</td>`;
                tableHTML += '</tr>';
            });
        }
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        // Apply sorting to the new table
        const table = tableContainer.querySelector('table');
        applyTableSorting(table);
    }

    function mostCareerFoursTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "Balls Faced", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
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
                tableHTML += `<td class="fw-bold">${stat[14]}</td>`;
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

    function mostSixesInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Runs</th>'; // Margin column
        tableHTML += '<th>Mins</th>'; // Balls Rem column
        tableHTML += '<th>Balls</th>'; // Target column
        tableHTML += '<th>4s</th>'; // Overs column
        tableHTML += '<th>6s</th>'; // Balls column
        tableHTML += '<th>SR</th>'; // Runs column
        tableHTML += '<th>Team</th>'; // HS column
        tableHTML += '<th>Opponent</th>'; // Avg column
        tableHTML += '<th>Venue</th>'; // Balls Faced column
        tableHTML += '<th>Date</th>'; // SR column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Runs", "Mins", "Balls", "4s", "6s", "SR", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[7]}</td>`;
                tableHTML += `<td class="fw-bold fst-italic">${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += '</tr>';
            });
        }
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        // Apply sorting to the new table
        const table = tableContainer.querySelector('table');
        applyTableSorting(table);
    }

    function mostCareerDucksTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>Ducks</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "BF", "SR", "100s", "50s", "Ducks", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += `<td>${stat[11]}</td>`;
                tableHTML += `<td>${stat[12]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[13]}</td>`;
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

    function highestAverageTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "BF", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[8]}</td>`;
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

    function highestStrikeRateTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Teams</th>'; // Margin column
        tableHTML += '<th>Span</th>'; // Balls Rem column
        tableHTML += '<th>Mat</th>'; // Target column
        tableHTML += '<th>Inns</th>'; // Overs column
        tableHTML += '<th>Not Outs</th>'; // Balls column
        tableHTML += '<th>Runs</th>'; // Runs column
        tableHTML += '<th>HS</th>'; // HS column
        tableHTML += '<th>Avg</th>'; // Avg column
        tableHTML += '<th>Balls Faced</th>'; // Balls Faced column
        tableHTML += '<th>SR</th>'; // SR column
        tableHTML += '<th>100s</th>'; // 100s column
        tableHTML += '<th>50s</th>'; // 50s column
        tableHTML += '<th>0s</th>'; // 0s column
        tableHTML += '<th>4s</th>'; // 4s column
        tableHTML += '<th>6s</th>'; // 6s column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Teams", "Span", "Matches", "Inns", "Not Outs", "Runs", "HS", "Avg", "BF", "SR", "100s", "50s", "0s", "4s", "6s"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[10]}</td>`;
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

    function highestStrikeRateInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Runs</th>'; // Margin column
        tableHTML += '<th>Balls</th>'; // Target column
        tableHTML += '<th>4s</th>'; // Overs column
        tableHTML += '<th>6s</th>'; // Balls column
        tableHTML += '<th>SR</th>'; // Runs column
        tableHTML += '<th>Team</th>'; // HS column
        tableHTML += '<th>Opponent</th>'; // Avg column
        tableHTML += '<th>Venue</th>'; // Balls Faced column
        tableHTML += '<th>Date</th>'; // SR column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Runs", "Balls", "4s", "6s", "SR", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[6]}</td>`;
                tableHTML += `<td class="fw-bold fst-italic">${stat[7]}</td>`;
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

    function mostRunsFrom4sAnd6sInInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
        // Build HTML table
        let tableHTML = '<table class="Batting-Records-table"><thead><tr>';
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Player</th>'; // Winner column
        tableHTML += '<th>Runs</th>'; // Margin column
        tableHTML += '<th>Balls</th>'; // Target column
        tableHTML += '<th>4s</th>'; // Overs column
        tableHTML += '<th>6s</th>'; // Balls column
        tableHTML += '<th>Runs (4s+6s)</th>'; // Runs column
        tableHTML += '<th>SR</th>'; // Runs column
        tableHTML += '<th>Team</th>'; // HS column
        tableHTML += '<th>Opponent</th>'; // Avg column
        tableHTML += '<th>Venue</th>'; // Balls Faced column
        tableHTML += '<th>Date</th>'; // SR column
        tableHTML += '</tr></thead><tbody>';
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Player", "Runs", "Balls", "4s", "6s", "4+6", "SR", "Team", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td>${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[5]}</td>`;
                tableHTML += `<td>${stat[6]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[7]}</td>`;
                tableHTML += `<td class="fw-bold fst-italic">${stat[8]}</td>`;
                tableHTML += `<td>${stat[9]}</td>`;
                tableHTML += `<td>${stat[10]}</td>`;
                tableHTML += '</tr>';
            });
        }
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        // Apply sorting to the new table
        const table = tableContainer.querySelector('table');
        applyTableSorting(table);
    }
