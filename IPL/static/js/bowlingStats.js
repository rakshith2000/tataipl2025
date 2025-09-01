// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/bowlingstats")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const statsData = data.stats;
        // Now you can use statsData and fullNames in your JavaScript
        window.statsData = statsData; // Make it globally accessible
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
      const initialData = statsData['Most Wickets']
  mostWicketsTable(initialData);
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

    const tableData = statsData[optionTitle];

	switch(optionTitle) {
        case 'Most Wickets':
            mostWicketsTable(tableData);
            break;
        case 'Best Bowling Average':
            bestBowlingAverageTable(tableData);
            break;
        case 'Best Bowling Strike Rate':
            bestBowlingStrikeRateTable(tableData);
            break;
        case 'Best Bowling':
            bestBowlingTable(tableData);
            break;
        case 'Most 5 Wickets Haul':
            most5WicketsHaulTable(tableData);
            break;
        case 'Best Economy':
            bestEconomyTable(tableData);
            break;
    }
  }

  function mostWicketsTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>M</th>'; // Match column
	tableHTML += '<th>O</th>'; // Innings column
	tableHTML += '<th>B</th>'; // Runs column
	tableHTML += '<th>R</th>'; // Average column
	tableHTML += '<th>W</th>'; // Average column
	tableHTML += '<th>Avg</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Player'])}">${row['Player']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Overs']}</td>`;
        tableHTML += `<td>${row['Balls']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Wkts']}</td>`;
        tableHTML += `<td>${row['Avg']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestBowlingAverageTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>M</th>'; // Match column
	tableHTML += '<th>O</th>'; // Innings column
	tableHTML += '<th>W</th>'; // Average column
	tableHTML += '<th>Avg</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Bowler'])}">${row['Bowler']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Overs']}</td>`;
        tableHTML += `<td>${row['Wkts']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Avg']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestBowlingTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>O</th>'; // Match column
	tableHTML += '<th>BBI</th>'; // Average column
	tableHTML += '<th>Vs</th>'; // Average column
	tableHTML += '<th>Econ</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Bowler'])}">${row['Bowler']}</a></td>`;
        tableHTML += `<td>${row['Ovs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Bbi']}</td>`;
        tableHTML += `<td>${row['Vs']}</td>`;
        tableHTML += `<td>${row['Econ']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function most5WicketsHaulTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>M</th>'; // Match column
	tableHTML += '<th>O</th>'; // Innings column
	tableHTML += '<th>R</th>'; // Average column
	tableHTML += '<th>W</th>'; // Average column
	tableHTML += '<th>5-fers</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Bowler'])}">${row['Bowler']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Overs']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td>${row['Wkts']}</td>`;
        tableHTML += `<td class="fw-bold">${row['5-fers']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestEconomyTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>M</th>'; // Match column
	tableHTML += '<th>I</th>'; // Innings column
	tableHTML += '<th>O</th>'; // Runs column
	tableHTML += '<th>W</th>'; // Average column
	tableHTML += '<th>Eco</th>'; // Average column
	tableHTML += '<th>Avg</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Bowler'])}">${row['Bowler']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Overs']}</td>`;
        tableHTML += `<td>${row['Wkts']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Eco']}</td>`;
        tableHTML += `<td>${row['Avg']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestBowlingStrikeRateTable(data) {
    const container = document.getElementById('tableContainer');

    if (!data || data.length === 0) {
      container.innerHTML = '<p>No data available.</p>';
      return;
    }

    // Extract headers from the first dictionary (excluding Team and Batter which we'll handle specially)
    const headers = Object.keys(data[0]).filter(key => !['Team'].includes(key));

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Player</th>'; // Player name column
	tableHTML += '<th>M</th>'; // Match column
	tableHTML += '<th>O</th>'; // Innings column
	tableHTML += '<th>W</th>'; // Average column
	tableHTML += '<th>SR</th>'; // SR column
    tableHTML += '</tr></thead><tbody>';

    // Add rows
    data.forEach((row, index) => {
      tableHTML += '<tr>';

      // Position number (1st column)
      tableHTML += `<td class="position">${index + 1}</td>`;

      // Team logo (2nd column)
      const teamCode = row['Team'];
      const logoUrl = `/static/images/squad_logos/${teamCode === 'RR' ? 'RR1' : teamCode}.png`;
      tableHTML += `<td class="logo-col"><img src="${logoUrl}" class="team-logo" alt="${teamCode}"></td>`;

      // Remaining columns
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Bowler'])}">${row['Bowler']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Overs']}</td>`;
        tableHTML += `<td>${row['Wkts']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Sr']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }
