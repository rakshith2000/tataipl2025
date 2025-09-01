// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/resultrecords")
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
    const initialData = window.statsData.filter(item => item.record.toLowerCase() === 'highest win margin by runs');
    highestWinByRunsTable(initialData);
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
        case 'Highest Win Margin by Runs':
            highestWinByRunsTable(tableData);
            break;
        case 'Highest Win Margin by Balls Remaining':
            highestWinByBallsRemainingTable(tableData);
            break;
        case 'Highest Win Margin by Wickets':
            highestWinByWicketsTable(tableData);
            break;
        case 'Lowest Win Margin by Runs':
            lowestWinByRunsTable(tableData);
            break;
        case 'Lowest Win Margin by Balls Remaining':
            lowestWinByBallsRemainingTable(tableData);
            break;
        case 'Lowest Win Margin by Wickets':
            lowestWinByWicketsTable(tableData);
            break;
        case 'Highest Successful Run Chases':
            highestSuccessfulRunChasesTable(tableData);
            break;
        case 'Lowest Successful Score Defends':
            lowestSuccessfulScoreDefendsTable(tableData);
            break;
        case 'Tied Matches':
            tiedMatchesTable(tableData);
            break;
    }
  }

  function highestWinByRunsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .merged-cell {
        text-align: center;
      }
      .Records-table td {
        text-align: center;
        padding: 8px;
      }
      .Records-table td {
        white-space: nowrap;
      }
    `;
    document.head.appendChild(styleElement);

     // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
  tableHTML += '<th>Margin</th>'; // Margin column
  tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
  tableHTML += '<th>Target</th>'; // Target column
  tableHTML += '<th>Overs</th>'; // Overs column
  tableHTML += '<th>Max</th>'; // Max column
  tableHTML += '<th>Opponent</th>'; // Opponent column
  tableHTML += '<th>Venue</th>'; // Venue column
  tableHTML += '<th>Date</th>'; // Date column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Max", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[6]}</td>`;
            tableHTML += `<td>${stat[7]}</td>`;
            tableHTML += `<td>${stat[8]}</td>`;
            tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

    function highestWinByBallsRemainingTable(data) {
        const tableContainer = document.getElementById('tableContainer');
    
        // Add required CSS styles
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
        `;
        document.head.appendChild(styleElement);
    
         // Build HTML table
        let tableHTML = '<table class="Records-table"><thead><tr>';
    
        // Add custom headers
        tableHTML += '<th class="position"></th>'; // Position column
        tableHTML += '<th>Winner</th>'; // Winner column
        tableHTML += '<th>Margin</th>'; // Margin column
        tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
        tableHTML += '<th>Target</th>'; // Target column
        tableHTML += '<th>Overs</th>'; // Overs column
        tableHTML += '<th>Max</th>'; // Max column
        tableHTML += '<th>Opponent</th>'; // Opponent column
        tableHTML += '<th>Venue</th>'; // Venue column
        tableHTML += '<th>Date</th>'; // Date column
        tableHTML += '</tr></thead><tbody>';
        
        // Add data rows
        if (data && Array.isArray(data)) {
            data.forEach((team, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td class="position">${index + 1}</td>`; // Position
                let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Max", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
                tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
                tableHTML += `<td>${stat[1]}</td>`;
                tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
                tableHTML += `<td>${stat[3]}</td>`;
                tableHTML += `<td>${stat[4]}</td>`;
                tableHTML += `<td>${stat[5]}</td>`;
                tableHTML += `<td class="fw-bold fst-italic">${stat[6]}</td>`;
                tableHTML += `<td>${stat[7]}</td>`;
                tableHTML += `<td>${stat[8]}</td>`;
                tableHTML += '</tr>';
            });
        }
        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
        // Apply sorting to the new table
        const table = tableContainer.querySelector('table');
        applyTableSorting(table);
    }

    function highestWinByWicketsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Margin</th>'; // Margin column
    tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
    tableHTML += '<th>Target</th>'; // Target column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Max</th>'; // Max column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Max", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[6]}</td>`;
            tableHTML += `<td>${stat[7]}</td>`;
            tableHTML += `<td>${stat[8]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

    function lowestWinByRunsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Margin</th>'; // Margin column
    tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
    tableHTML += '<th>Target</th>'; // Target column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[5]}</td>`;
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

    function lowestWinByBallsRemainingTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Margin</th>'; // Margin column
    tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
    tableHTML += '<th>Target</th>'; // Target column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>Max</th>'; // Max column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Max", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[6]}</td>`;
            tableHTML += `<td>${stat[7]}</td>`;
            tableHTML += `<td>${stat[8]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

    function lowestWinByWicketsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Margin</th>'; // Margin column
    tableHTML += '<th>Balls Rem</th>'; // Balls Rem column
    tableHTML += '<th>Target</th>'; // Target column
    tableHTML += '<th>Overs</th>'; // Overs column  
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Margin", "Balls Rem", "Target", "Overs", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[5]}</td>`;
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

    function highestSuccessfulRunChasesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Score</th>'; // Score column
    tableHTML += '<th>Overs</th>'; // Overs column
    tableHTML += '<th>RPO</th>'; // RPO column
    tableHTML += '<th>Opponent</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Score", "Overs", "RPO", "Opposition", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

    function lowestSuccessfulScoreDefendsTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Score</th>'; // Score column
    tableHTML += '<th>Opponent</th>'; // Overs column
    tableHTML += '<th>Score</th>'; // RPO column
    tableHTML += '<th>Result</th>'; // Opponent column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Winner", "Winner Score", "Opposition", "Opposition Score", "Result", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td>${stat[1]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td>${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

    function tiedMatchesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    // Add required CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .merged-cell {
            text-align: center;
        }
        .Records-table td {
            text-align: center;
            padding: 8px;
        }
        .Records-table td {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleElement);
    // Build HTML table
    let tableHTML = '<table class="Records-table"><thead><tr>';
    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Team 1</th>'; // Winner column
    tableHTML += '<th>Team 2</th>'; // Score column
    tableHTML += '<th>Venue</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Team 1", "Team 2", "Ground", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
    const table = tableContainer.querySelector('table');
    applyTableSorting(table);
}

//Initial table render - same approach as battingStat.html
//const initialData = statsData.filter(item => item.record === 'Highest Win Margin by Runs');
//highestWinByRunsTable(initialData);
