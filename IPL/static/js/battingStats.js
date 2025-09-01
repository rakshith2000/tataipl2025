// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/battingstats")
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
    const initialData = statsData['Most Runs']
  mostRunsTable(initialData);
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
        case 'Most Runs':
            mostRunsTable(tableData);
            break;
        case 'Highest Scores':
            highestScoresTable(tableData);
            break;
        case 'Best Batting Average':
            bestBattingAverageTable(tableData);
            break;
        case 'Best Batting Strike Rate':
            bestBattingStrikeRateTable(tableData);
            break;
        case 'Most Hundreds':
            mostHundredsTable(tableData);
            break;
        case 'Most Fifties':
            mostFiftiesTable(tableData);
            break;
        case 'Most Fours':
            mostFoursTable(tableData);
            break;
        case 'Most Sixes':
            mostSixesTable(tableData);
            break;
        case 'Most Nineties':
            mostNinetiesTable(tableData);
            break;
    }
  }

  function mostRunsTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>Avg</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Player'])}">${row['Player']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td><b>${row['Runs']}</b></td>`;
        tableHTML += `<td>${row['Avg']}</td>`;
        tableHTML += `<td>${row['Sr']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function highestScoresTable(data) {
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
	tableHTML += '<th>R</th>'; // Match column
	tableHTML += '<th>B</th>'; // Innings column
	tableHTML += '<th>SR</th>'; // Runs column
	tableHTML += '<th>Vs</th>'; // Average column
	tableHTML += '<th>4s</th>'; // SR column
	tableHTML += '<th>6s</th>'; // SR column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td><b>${row['Runs']}</b></td>`;
        tableHTML += `<td>${row['Balls']}</td>`;
        tableHTML += `<td>${row['Sr']}</td>`;
        tableHTML += `<td>${row['Vs']}</td>`;
        tableHTML += `<td>${row['4s']}</td>`;
        tableHTML += `<td>${row['6s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestBattingAverageTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>Avg</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Avg']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function bestBattingStrikeRateTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>Avg</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td>${row['Avg']}</td>`;
        tableHTML += `<td class="fw-bold">${row['Sr']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function mostHundredsTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>100s</th>'; // Average column
	tableHTML += '<th>H.S</th>'; // SR column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['100s']}</td>`;
        tableHTML += `<td>${row['H.s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function mostFiftiesTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>50s</th>'; // Average column
	tableHTML += '<th>H.S</th>'; // SR column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['50s']}</td>`;
        tableHTML += `<td>${row['H.s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function mostFoursTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>4s</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['4s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function mostSixesTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>6s</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['6s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }

  function mostNinetiesTable(data) {
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
	tableHTML += '<th>R</th>'; // Runs column
	tableHTML += '<th>90s</th>'; // Average column
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
        tableHTML += `<td class="fw-bold text-blue"><a href="/${encodeURIComponent(row['Team'])}/squad_details/${encodeURIComponent(row['Batter'])}">${row['Batter']}</a></td>`;
        tableHTML += `<td>${row['Matches']}</td>`;
        tableHTML += `<td>${row['Inns']}</td>`;
        tableHTML += `<td>${row['Runs']}</td>`;
        tableHTML += `<td class="fw-bold">${row['90s']}</td>`;

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
  }