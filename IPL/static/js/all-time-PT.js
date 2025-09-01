// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/alltimept")
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
  const initialData = statsData.filter(item => item.season === 2025);
  renderPT(initialData);
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
    tableData = statsData.filter(item => item.season === parseInt(optionTitle));
    renderPT(tableData);
  }

  function renderPT(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table class="renderPT-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position">Rank</th>'; // Season column
    tableHTML += '<th class="logo-col"></th>'; // Player column
    tableHTML += '<th>Team</th>'; // Matches column
    tableHTML += '<th>Played</th>'; // Runs column
    tableHTML += '<th>Won</th>'; // Won column
    tableHTML += '<th>Lost</th>'; // Lost column
    tableHTML += '<th>NR</th>'; // NR column
    tableHTML += '<th>Points</th>'; // Points column
    tableHTML += '<th>NRR</th>'; // NRR column
    tableHTML += '</tr></thead><tbody>';

    data.forEach((item, index) => {
        tableHTML += '<tr>';
        tableHTML += item.champion === 'C' ? `<td class="logo-col"><img src="/static/images/trophy.png" alt="${item.team}" class="team-logo" onerror="this.style.display='none'"></td>` : `<td class="position">${index <= 3 ? "<b class='text-green'>Q</b>" : item.rank}</td>`; // Rank
        const logoUrl = `/static/images/squad_logos/${item.team}.png`;
        tableHTML += `<td class="logo-col"><img src="${logoUrl}" alt="${item.team}" class="team-logo" onerror="this.style.display='none'"></td>`; // Logo
        // Use full name if available, fallback to short name. Remove any digits from the full name.
        const rawFullName = fullNames[item.team] || item.team;
        const teamFullName = (typeof rawFullName === 'string') ? rawFullName.replace(/\d+/g, '').trim() : rawFullName;
        tableHTML += `<td class="fw-bold text-blue">${teamFullName}</td>`; // Team name
        tableHTML += `<td>${item.match}</td>`; // Played
        tableHTML += `<td>${item.won}</td>`; // Won
        tableHTML += `<td>${item.lost}</td>`; // Lost
        tableHTML += `<td>${item.nr}</td>`; // NR
        tableHTML += `<td class="fw-bold">${item.points}</td>`; // Points
        tableHTML += `<td>${item.nrr}</td>`; // NRR
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }
