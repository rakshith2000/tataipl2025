// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/teamscoringrecords")
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
  const initialData = statsData.filter(item => item.record === 'Highest Team Total');
  highestTeamTotalTable(initialData);
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
        case 'Highest Team Total':
            highestTeamTotalTable(tableData);
            break;
        case 'Lowest Team Total':
            lowestTeamTotalTable(tableData);
            break;
        case 'Highest Match Aggregates':
            HighestMatchAggregatesTable(tableData);
            break;
        case 'Lowest Match Aggregates':
            lowestMatchAggregatesTable(tableData);
            break;
        case 'Most Extras in an Innings':
            mostExtrasInAnInningsTable(tableData);
            break;
    }
  }


  function highestTeamTotalTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Team-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Team</th>'; // Winner column
  tableHTML += '<th>Score</th>'; // Margin column
  tableHTML += '<th>Overs</th>'; // Balls Rem column
  tableHTML += '<th>RR</th>'; // Target column
  tableHTML += '<th>Inns</th>'; // Overs column
  tableHTML += '<th>Opponent</th>'; // Max column
  tableHTML += '<th>Venue</th>'; // Opponent column
  tableHTML += '<th>Result</th>'; // Venue column
  tableHTML += '<th>Date</th>'; // Date column
  tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Team", "Score", "Overs", "RR", "Inns", "Opposition", "Ground", "Result", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td ${stat[7] === "won" ? 'class="text-green fw-bold"' : 'class="text-orange fw-bold"'}>${stat[7]}</td>`;
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

  function lowestTeamTotalTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="Team-Records-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th>Team</th>'; // Winner column
    tableHTML += '<th>Score</th>'; // Margin column
    tableHTML += '<th>Overs</th>'; // Balls Rem column
    tableHTML += '<th>RR</th>'; // Target column
    tableHTML += '<th>Inns</th>'; // Overs column
    tableHTML += '<th>Opponent</th>'; // Max column
    tableHTML += '<th>Venue</th>'; // Opponent column
    tableHTML += '<th>Result</th>'; // Venue column
    tableHTML += '<th>Date</th>'; // Date column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let stat = ["Team", "Score", "Overs", "RR", "Inns", "Opposition", "Ground", "Result", "Date"].map(key => team.stats[key]);
            tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
            tableHTML += `<td class="fw-bold">${stat[1]}</td>`;
            tableHTML += `<td>${stat[2]}</td>`;
            tableHTML += `<td>${stat[3]}</td>`;
            tableHTML += `<td>${stat[4]}</td>`;
            tableHTML += `<td class="fw-bold fst-italic">${stat[5]}</td>`;
            tableHTML += `<td>${stat[6]}</td>`;
            tableHTML += `<td ${stat[7] === "won" ? 'class="text-green fw-bold"' : 'class="text-orange fw-bold"'}>${stat[7]}</td>`;
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

    function HighestMatchAggregatesTable(data) {
    const tableContainer = document.getElementById('tableContainer');
      // Build HTML table
      let tableHTML = '<table class="Team-Records-table"><thead><tr>';
      // Add custom headers
      tableHTML += '<th class="position"></th>'; // Position column
      tableHTML += '<th>Team 1</th>'; // Team 1 column
      tableHTML += '<th>Team 2</th>'; // Team 2 column
      tableHTML += '<th>Team Runs</th>'; // Team Runs column
      tableHTML += '<th>Team Wickets</th>'; // Team Wickets column
      tableHTML += '<th>Overs</th>'; // Overs column
      tableHTML += '<th>RR</th>'; // RR column
      tableHTML += '<th>Venue</th>'; // Venue column
      tableHTML += '<th>Date</th>'; // Date column
      tableHTML += '</tr></thead><tbody>';
      // Add data rows
      if (data && Array.isArray(data)) {
          data.forEach((match, index) => {
              tableHTML += '<tr>';
              tableHTML += `<td class="position">${index + 1}</td>`; // Position
              let stat = ["Team 1", "Team 2", "Team Runs", "Team Wickets", "Overs", "RR", "Ground", "Date"].map(key => match.stats[key]);
              tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
              tableHTML += `<td class="fw-bold text-blue">${stat[1]}</td>`;
              tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
              tableHTML += `<td>${stat[3]}</td>`;
              tableHTML += `<td>${stat[4]}</td>`;
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

    function lowestMatchAggregatesTable(data) {
    const tableContainer = document.getElementById('tableContainer');

      // Build HTML table
      let tableHTML = '<table class="Team-Records-table"><thead><tr>';
      // Add custom headers
      tableHTML += '<th class="position"></th>'; // Position column
      tableHTML += '<th>Team 1</th>'; // Team 1 column
      tableHTML += '<th>Team 2</th>'; // Team 2 column
      tableHTML += '<th>Team Runs</th>'; // Team Runs column
      tableHTML += '<th>Team Wickets</th>'; // Team Wickets column
      tableHTML += '<th>Overs</th>'; // Overs column
      tableHTML += '<th>RR</th>'; // RR column
      tableHTML += '<th>Venue</th>'; // Venue column
      tableHTML += '<th>Date</th>'; // Date column
      tableHTML += '</tr></thead><tbody>';
      // Add data rows
      if (data && Array.isArray(data)) {
          data.forEach((match, index) => {
              tableHTML += '<tr>';
              tableHTML += `<td class="position">${index + 1}</td>`; // Position
              let stat = ["Team 1", "Team 2", "Team Runs", "Team Wickets", "Overs", "RR", "Ground", "Date"].map(key => match.stats[key]);
              tableHTML += `<td class="fw-bold text-blue">${stat[0]}</td>`;
              tableHTML += `<td class="fw-bold text-blue">${stat[1]}</td>`;
              tableHTML += `<td class="fw-bold">${stat[2]}</td>`;
              tableHTML += `<td>${stat[3]}</td>`;
              tableHTML += `<td>${stat[4]}</td>`;
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

  function mostExtrasInAnInningsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

      // Build HTML table
      let tableHTML = '<table class="Team-Records-table"><thead><tr>';
      // Add custom headers
      tableHTML += '<th class="position"></th>'; // Position column
      tableHTML += '<th>Team</th>'; // Team column
      tableHTML += '<th>Score</th>'; // Score column
      tableHTML += '<th>Overs</th>'; // Overs column
      tableHTML += '<th>Extras</th>'; // RR column
      tableHTML += '<th>Byes</th>'; // Opponent column
      tableHTML += '<th>Leg Byes</th>'; // Venue column
      tableHTML += '<th>Wides</th>'; // Result column
      tableHTML += '<th>No Balls</th>'; // Date column
      tableHTML += '<th>RR</th>'; // RR column
      tableHTML += '<th>Inn</th>'; // Inns column
      tableHTML += '<th>Opponent</th>'; // Opponent column
      tableHTML += '<th>Venue</th>'; // Venue column
      tableHTML += '<th>Date</th>'; // Date column
      tableHTML += '</tr></thead><tbody>';
      // Add data rows
      if (data && Array.isArray(data)) {
          data.forEach((match, index) => {
              tableHTML += '<tr>';
              tableHTML += `<td class="position">${index + 1}</td>`; // Position
              let stat = ["Team", "Score", "Overs", "Extras", "Byes", "Leg Byes", "Wides", "No Balls", "RR", "Inns", "Opposition", "Ground", "Date"].map(key => match.stats[key]);
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
              tableHTML += '</tr>';
          });
      }
      tableHTML += '</tbody></table>';
      tableContainer.innerHTML = tableHTML;
      // Apply sorting to the new table
      const table = tableContainer.querySelector('table');
      applyTableSorting(table);
  }

  