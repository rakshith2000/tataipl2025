// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/iplawards")
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
  const initialData = statsData.filter(item => item.award === 'Orange Cap');
  orangeCapTable(initialData);
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
    tableData = statsData.filter(item => item.award === optionTitle);
    

  switch(optionTitle) {
        case 'Orange Cap':
            orangeCapTable(tableData);
            break;
        case 'Purple Cap':
            purpleCapTable(tableData);
            break;
        case 'Most Sixes':
            mostSixesTable(tableData);
            break;
        case 'Most Fours':
            mostFoursTable(tableData);
            break;
        case 'Most Valuable Player':
            mostValuablePlayerTable(tableData);
            break;
        case 'Player of the Final':
            playerOfTheFinalTable(tableData);
            break;
        case 'Emerging Player':
            emergingPlayerTable(tableData);
            break;
        case 'Highest Strike Rate':
            highestStrikeRateTable(tableData);
            break;
        case 'Best Catch':
            bestCatchTable(tableData);
            break;
        case 'Fair Play Award':
            fairPlayAwardTable(tableData);
            break;
    }
  }

  function orangeCapTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Matches</th>'; // Matches column
    tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td>${statistics[0]}</td>`;
      tableHTML += `<td class="fw-bold">${statistics[1]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function purpleCapTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Matches</th>'; // Matches column
    tableHTML += '<th>Wickets</th>'; // Wickets column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td>${statistics[0]}</td>`;
      tableHTML += `<td class="fw-bold">${statistics[1]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function mostSixesTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Matches</th>'; // Matches column
    tableHTML += '<th>Sixes</th>'; // Sixes column
    tableHTML += '</tr></thead><tbody>';
    
    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td>${statistics[0]}</td>`;
      tableHTML += `<td class="fw-bold">${statistics[1]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function mostFoursTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Matches</th>'; // Matches column
    tableHTML += '<th>Fours</th>'; // Fours column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td>${statistics[1]}</td>`;
      tableHTML += `<td class="fw-bold">${statistics[0]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function mostValuablePlayerTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Points</th>'; // Points column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td class="fw-bold">${statistics[0]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function playerOfTheFinalTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function emergingPlayerTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function highestStrikeRateTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '<th>Strike Rate</th>'; // Strike Rate column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      let statistics = Object.values(item.statistics);
      tableHTML += `<td class="fw-bold">${statistics[0]}</td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }

  function bestCatchTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Player</th>'; // Player column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let player = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
    applyTableSorting(table);
  }

  function fairPlayAwardTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Season</th>'; // Season column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '</tr></thead><tbody>';

    data.forEach(item => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${item.season}</td>`;
      let team = Object.values(item.player);
      tableHTML += `<td class="fw-bold text-blue">${team[0]}</span></td>`;
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    // Apply sorting to the new table
  const table = tableContainer.querySelector('table');
  applyTableSorting(table);
  }
