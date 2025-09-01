// Show loading spinner before fetch
const tableContainer = document.getElementById('tableContainer');
tableContainer.innerHTML = `<div id="loadingSpinner" style="text-align:center; padding:40px 0;"><span class="spinner-border text-primary" role="status"></span><br><span style="color:#0056d2; font-weight:bold;">Loading...</span></div>`;

fetch("/api/alltimeipl")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const statsData = data.stats;
        const fullNames = data.fn;
        const defunctFullNames = data.dfn;
        const allFn = {...fullNames, ...defunctFullNames};
        // Now you can use statsData and fullNames in your JavaScript
        window.statsData = statsData; // Make it globally accessible
        window.fullNames = fullNames; // Make it globally accessible
        window.defunctFullNames = defunctFullNames; // Make it globally accessible
        window.allFn = allFn; // Make it globally accessible
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
  const initialData = statsData['Current Teams'];
  currentTeamsTable(initialData);
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
    if (optionTitle.includes('Records')) {
        tableData = statsData['Records'];
    } else {
        tableData = statsData[optionTitle];
    }
    

  switch(optionTitle) {
        case 'Current Teams':
            currentTeamsTable(tableData);
            break;
        case 'Defunct Teams':
            defunctTeamsTable(tableData);
            break;
        case 'Tournament Summary':
            tournamentSummaryTable(tableData);
            break;
        case 'Editions and Results':
            editionsAndResultsTable(tableData);
            break;
        case 'Performance by Teams':
            performanceByTeamsTable(tableData);
            break;
        case 'Position Each Season':
            positionEachSeasonTable(tableData);
            break;
        case 'All Time Standings':
            allTimeStandingsTable(tableData);
            break;
        case 'Batting Records':
            battingRecordsTable(tableData);
            break;
        case 'Bowling Records':
            bowlingRecordsTable(tableData);
            break;
        case 'Fielding Records':
            fieldingRecordsTable(tableData);
            break;
        case 'Team Records':
            teamRecordsTable(tableData);
            break;
        case 'Most Appearences':
            mostAppearancesTable(tableData);
            break;
    }
  }

  function currentTeamsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="currentTeams-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Team Name</th>'; // Player name column
  tableHTML += '<th>City</th>'; // Match column
  tableHTML += '<th>Home Ground</th>'; // Innings column
  tableHTML += '<th>Debut</th>'; // Runs column
  tableHTML += '<th>Captain</th>'; // Average column
  tableHTML += '<th>Head Coach</th>'; // SR column
  tableHTML += '<th>Owner</th>'; // 4s column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            const logoUrl = `/static/images/squad_logos/${team.team === 'RR' ? 'RR1' : team.team}.png`;
            tableHTML += `<td class="logo-col"><img src="${logoUrl}" alt="${team.team}" class="team-logo" onerror="this.style.display='none'"></td>`; // Logo
            // Use full name if available, fallback to short name. Remove any digits from the full name.
            const rawFullName = fullNames[team.team] || team.team;
            const teamFullName = (typeof rawFullName === 'string') ? rawFullName.replace(/\d+/g, '').trim() : rawFullName;
            tableHTML += `<td class="fw-bold text-blue">${teamFullName}</td>`; // Team name (full name)
            tableHTML += `<td>${team.city}</td>`; // City
            tableHTML += `<td class="fw-bold">${team.home_ground}</td>`; // Home Ground
            tableHTML += `<td class="fw-bold text-green">${team.debut}</td>`; // Debut
            tableHTML += `<td class="fw-bold">${team.captain}</td>`; // Captain
            tableHTML += `<td class="fw-bold">${team.head_coach}</td>`; // Head Coach
            
            // Format owner column
            let ownerText = '';
            if (team.owner && typeof team.owner === 'object') {
                const owners = Object.entries(team.owner);
                if (owners.length === 1 && owners[0][1] === '100') {
                    // Single owner with 100% - show only name
                    ownerText = owners[0][0];
                } else {
                    // Multiple owners or not 100% - show name (percentage%)
                    ownerText = owners.map(([name, percentage]) => `${name} <i>(${percentage}%)</i>`).join('<br> ');
                }
            }
            tableHTML += `<td>${ownerText}</td>`; // Owner
            
            tableHTML += '</tr>';
        });
    }

  tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function defunctTeamsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table class="defunctTeams-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Team Name</th>'; // Player name column
    tableHTML += '<th>City</th>'; // Match column
    tableHTML += '<th>State</th>'; // Innings column
    tableHTML += '<th>Home Ground</th>'; // Runs column
    tableHTML += '<th>Debut</th>'; // Innings column
    tableHTML += '<th>Dissolved</th>'; // Runs column
    tableHTML += '<th>Owner</th>'; // Average column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((team, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            const logoUrl = `/static/images/squad_logos/${team.team}.png`;
            tableHTML += `<td class="logo-col"><img src="${logoUrl}" alt="${team.team}" class="team-logo" onerror="this.style.display='none'"></td>`; // Logo
            const teamFullName = defunctFullNames[team.team] || team.team; // Use full name if available, fallback to short name
            tableHTML += `<td class="fw-bold text-blue">${teamFullName}</td>`; // Team name
            tableHTML += `<td>${team.city}</td>`; // City
            tableHTML += `<td>${team.state}</td>`; // State
            tableHTML += `<td class="fw-bold">${team.home_ground}</td>`; // Home Ground
            tableHTML += `<td class="fw-bold text-green">${team.debut}</td>`; // Debut
            tableHTML += `<td class="fw-bold text-orange">${team.dissolved}</td>`; // Dissolved
            tableHTML += `<td>${team.owner}</td>`; // Owner
            tableHTML += '</tr>';
        });
    }

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function tournamentSummaryTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position"></th>'; // Position column
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Won</th>'; // Won column
    tableHTML += '<th>Runners-up</th>'; // Runners-up column
    tableHTML += '<th>Playoffs Played</th>'; // Playoffs Played column
    tableHTML += '<th>Seasons Played</th>'; // Finals Played column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((summary, index) => {
            tableHTML += Object.values(defunctFullNames).includes(summary.team) ? '<tr class="defunctTeams">' : '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Position
            let logoUrl = Object.keys(allFn).find(key => allFn[key] === summary.team.replace(/[^a-zA-Z0-9 ]/g, '').trim());
            tableHTML += `<td class="logo-col"><img src="/static/images/squad_logos/${logoUrl === 'RR' ? 'RR1' : logoUrl}.png" alt="${summary.team}" class="team-logo" onerror="this.style.display='none'"></td>`; // Logo
            tableHTML += `<td class="fw-bold text-blue">${summary.team}</td>`; // Team
            
            // Format Won data
            let wonText = '-';
            let wonClass = '';
            if (summary.won && typeof summary.won === 'object') {
                const wonEntries = Object.entries(summary.won);
                if (wonEntries.length > 0) {
                    wonText = wonEntries.map(([champsCount, years]) => {
                        const yearsList = Array.isArray(years) ? years.join(', ') : years;
                        return `<b>${champsCount}</b> (${yearsList})`;
                    }).join('<br>');
                    wonClass = 'bg-gold'; // Add gold background if data exists
                }
            }
            tableHTML += `<td class="${wonClass}">${wonText}</td>`; // Won
            
            // Format Runner-up data
            let runnerUpText = '-';
            let runnerUpClass = '';
            if (summary.runner_up && typeof summary.runner_up === 'object') {
                const runnerUpEntries = Object.entries(summary.runner_up);
                if (runnerUpEntries.length > 0) {
                    runnerUpText = runnerUpEntries.map(([runnersCount, years]) => {
                        const yearsList = Array.isArray(years) ? years.join(', ') : years;
                        return `<b>${runnersCount}</b> (${yearsList})`;
                    }).join('<br>');
                    runnerUpClass = 'bg-silver'; // Add silver background if data exists
                }
            }
            tableHTML += `<td class="${runnerUpClass}">${runnerUpText}</td>`; // Runners-up

            tableHTML += `<td>${summary.playoffs || '-'}</td>`; // Playoffs Played
            tableHTML += `<td>${summary.played || '-'}</td>`; // Seasons Played
            tableHTML += '</tr>';
        });
    }

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function editionsAndResultsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

     // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th rowspan="2">Year</th>'; // Season column
    tableHTML += '<th colspan="3" class="no-bottom-border" style="text-align: center;">Final</th>'; // Winner column
    tableHTML += '<th rowspan="2">Venue</th>'; // Runner-up column
    tableHTML += '<th rowspan="2">POTM</th>'; // Playoffs Played column
    tableHTML += '<th rowspan="2">POTS</th>'; // Finals Played column
    tableHTML += '</tr>';
    tableHTML += '<tr>';
    tableHTML += '<th>Winner</th>'; // Winner column
    tableHTML += '<th>Result</th>'; // Runner-up column
    tableHTML += '<th>Runner-up</th>'; // Result column
    tableHTML += '</tr></thead><tbody>';
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((edition, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td>${edition.year}</td>`; // Year
            
            // Winner
            let winnerCell = '';
            if (edition.winner && typeof edition.winner === 'object') {
                const t = edition.winner.Team || '-';
                const r = edition.winner.Runs || '-';
                const w = edition.winner.Wkts || '-';
                const o = edition.winner.Overs || '-';
                winnerCell = `<span class='fw-bold text-blue'>${t}</span><br><span>${r}/${w} (${o} overs)</span>`;
            } else {
                winnerCell = `<span class='fw-bold text-blue'>${edition.winner}</span>`;
            }
            tableHTML += `<td>${winnerCell}</td>`;
            
            // Result
            tableHTML += `<td class="fw-bold">${edition.result || '-'}</td>`;

            // Runner-up
            let runnerUpCell = '';
            if (edition.runner_up && typeof edition.runner_up === 'object') {
                const t = edition.runner_up.Team || '-';
                const r = edition.runner_up.Runs || '-';
                const w = edition.runner_up.Wkts || '-';
                const o = edition.runner_up.Overs || '-';
                runnerUpCell = `<span class='fw-bold text-blue'>${t}</span><br><span>${r}/${w} (${o} overs)</span>`;
            } else {
                runnerUpCell = `<span class='fw-bold text-blue'>${edition.runner_up}</span>`;
            }
            tableHTML += `<td>${runnerUpCell}</td>`;
            
            tableHTML += `<td>${edition.venue || '-'}</td>`; // Venue
            // POTM
            let potmCell = '';
            if (edition.potm && typeof edition.potm === 'object') {
                const n = edition.potm.Name || '-';
                const t = edition.potm.Team || '-';
                potmCell = `${n} <i>(${t})</i>`;
            } else {
                potmCell = edition.potm || '-';
            }
            tableHTML += `<td>${potmCell}</td>`;
            // POTS
            let potsCell = '';
            if (edition.pots && typeof edition.pots === 'object') {
                const n = edition.pots.Name || '-';
                const t = edition.pots.Team || '-';
                potsCell = `${n} <i>(${t})</i>`;
            } else {
                potsCell = edition.pots || '-';
            }
            tableHTML += `<td>${potsCell}</td>`;
            
            tableHTML += '</tr>';
        });
    }

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    
  }

  function performanceByTeamsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Get years from the first team's season_stats
    const years = Object.keys(data[0].season_stats).sort();

    // Build HTML table
    let tableHTML = '<table class="performance-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="logo-col"></th>'; // Logo column
    tableHTML += '<th>Team</th>'; // Team column
    // Add year columns
    years.forEach(year => {
        tableHTML += `<th>${year}</th>`;
    });
    
    tableHTML += '</tr></thead><tbody>';

    // Function to get cell class based on result
    function getCellClass(result) {
        if (result === 'C') return 'cell-champion';
        if (result === 'RU') return 'cell-runner-up';
        if (result === '3rd' || result === '4th' || result === 'SF') return 'cell-semifinal';
        if (result === '–' || result === 'Suspended') return 'cell-inactive';
        return '';
    }

    // Split teams into non-defunct and defunct
    const nonDefunctTeams = data.filter(team => !team.defunct);
    const defunctTeams = data.filter(team => team.defunct);

    // Render non-defunct teams
    nonDefunctTeams.forEach(team => {
        tableHTML += '<tr>';
        const logoUrl = Object.keys(allFn).find(key => allFn[key] === team.team.replace(/[^a-zA-Z0-9 ]/g, '').trim());
        tableHTML += `<td class="logo-col"><img src="/static/images/squad_logos/${logoUrl === 'RR' ? 'RR1' : logoUrl}.png" class="team-logo" alt="${team.team}" /></td>`; // Logo column
        tableHTML += `<td class="fw-bold text-blue">${team.team}</td>`; // Team name

        // Process year stats to handle merging
        let currentSpan = 0;
        let currentValue = '';

        for (let i = 0; i < years.length; i++) {
            const yearStats = team.season_stats[years[i]] || '–';
            
            // Skip if this cell should be part of a previous merge
            if (currentSpan > 0) {
                currentSpan--;
                continue;
            }

            // Check for mergeable cells ahead
            let spanCount = 1;
            while (i + spanCount < years.length) {
                const nextStats = team.season_stats[years[i + spanCount]] || '–';
                if ((yearStats === '–' || yearStats === 'Suspended') && 
                    (nextStats === '–' || nextStats === 'Suspended')) {
                    spanCount++;
                } else {
                    break;
                }
            }

            // Add the cell with appropriate colspan and background color
            const cellClass = getCellClass(yearStats);
            if (spanCount > 1) {
                tableHTML += `<td class="fw-bold merged-cell ${cellClass}" colspan="${spanCount}">${yearStats}</td>`;
                currentSpan = spanCount - 1;
            } else {
                tableHTML += `<td class="fw-bold ${cellClass}">${yearStats}</td>`;
            }
        }
        
        tableHTML += '</tr>';
    });

    // Add Defunct Teams label row if there are any defunct teams
    if (defunctTeams.length > 0) {
        tableHTML += `<tr><td colspan="${years.length + 2}" style="text-align:center; font-weight:bold; background:#f8d7da;">Defunct Teams</td></tr>`;
    }

    // Render defunct teams
    defunctTeams.forEach(team => {
        tableHTML += '<tr>';
        const logoUrl = Object.keys(allFn).find(key => allFn[key] === team.team.replace(/[^a-zA-Z0-9 ]/g, '').trim());
        tableHTML += `<td class="logo-col"><img src="/static/images/squad_logos/${logoUrl}.png" class="team-logo" alt="${team.team}" /></td>`; // Logo column
        tableHTML += `<td class="fw-bold text-blue">${team.team}</td>`; // Team name

        // Process year stats to handle merging
        let currentSpan = 0;
        let currentValue = '';

        for (let i = 0; i < years.length; i++) {
            const yearStats = team.season_stats[years[i]] || '–';
            
            // Skip if this cell should be part of a previous merge
            if (currentSpan > 0) {
                currentSpan--;
                continue;
            }

            // Check for mergeable cells ahead
            let spanCount = 1;
            while (i + spanCount < years.length) {
                const nextStats = team.season_stats[years[i + spanCount]] || '–';
                if ((yearStats === '–' || yearStats === 'Suspended') && 
                    (nextStats === '–' || nextStats === 'Suspended')) {
                    spanCount++;
                } else {
                    break;
                }
            }

            // Add the cell with appropriate colspan and background color
            const cellClass = getCellClass(yearStats);
            if (spanCount > 1) {
                tableHTML += `<td class="fw-bold merged-cell ${cellClass}" colspan="${spanCount}">${yearStats}</td>`;
                currentSpan = spanCount - 1;
            } else {
                tableHTML += `<td class="fw-bold ${cellClass}">${yearStats}</td>`;
            }
        }
        
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function positionEachSeasonTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Function to get cell class based on result
    function getCellClass(result) {
        if (result === 'C') return 'cell-champion';
        if (result === 'R') return 'cell-runner-up';
        if (result === 'P') return 'cell-semifinal';
        if (result === '–') return 'cell-inactive';
        return '';
    }

    // Build HTML table
    let tableHTML = '<table><thead><tr>';
    console.log(data);
    const sampleRow = data[0].stats; // Use first season's row for header
    console.log(sampleRow);
    const posHeaders = sampleRow.map(item => item.pos);
    console.log(posHeaders);

    // Add custom headers
    tableHTML += '<th rowspan="2">Year</th>'; // Team column
    tableHTML += '<th colspan="10" class="no-bottom-border" style="text-align:center;">League Table</th>'; // Year column
    tableHTML += '</tr>';
    tableHTML += '<tr>';
    // Add league table headers
    posHeaders.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr><tbody>';
    data.forEach(entry => {
        tableHTML += '<tr>';
        tableHTML += `<td class="fw-bold">${entry.year}</td>`;
        entry.stats.forEach(stat => {
          const cellClass = getCellClass(stat.place);
          if (stat.team === '–') {
            tableHTML += `<td class="fw-bold ${cellClass}"></td>`;
          }
          else {
            tableHTML += `<td class="fw-bold text-blue ${cellClass}">${stat.team}</td>`;
          }
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function allTimeStandingsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th rowspan="2" class="logo-col"></th>'; // Logo column
    tableHTML += '<th rowspan="2">Team</th>'; // Team column
    tableHTML += '<th colspan="3" class="no-bottom-border" style="text-align:center;">Appearances</th>'; // Appearances column
    tableHTML += '<th rowspan="2">Best Result</th>'; // Best Result column
    tableHTML += '<th colspan="7" class="no-bottom-border" style="text-align:center;">Statistics</th>'; // Statistics column
    tableHTML += '</tr>';
    tableHTML += '<tr>';
    tableHTML += '<th>Total</th>'; // Total column
    tableHTML += '<th>First</th>'; // First column
    tableHTML += '<th>Lastest</th>'; // Lastest column
    tableHTML += '<th>Played</th>'; // Played column
    tableHTML += '<th>Won</th>'; // Won column
    tableHTML += '<th>Lost</th>'; // Lost column
    tableHTML += '<th>Tied+W</th>'; // Tied+W column
    tableHTML += '<th>Tied+L</th>'; // Tied+L column
    tableHTML += '<th>NR</th>'; // No Result column
    tableHTML += '<th>Win%</th>'; // Win% column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach(team => {
            // Check if team is defunct
            const isDefunct = team.defunct ? 'defunct-team' : '';
            tableHTML += '<tr class="' + isDefunct + '">';
            const logoUrl = Object.keys(allFn).find(key => allFn[key] === team.team.replace(/[^a-zA-Z0-9 ]/g, '').trim());
            tableHTML += `<td class="logo-col"><img src="/static/images/squad_logos/${logoUrl === 'RR' ? 'RR1' : logoUrl}.png" class="team-logo" alt="${team.team}" /></td>`; // Logo column
            tableHTML += `<td class="fw-bold text-blue">${team.team}</td>`; // Team name
            
            // Appearances
            tableHTML += `<td class="fw-bold">${team.total}</td>`; // Total appearances
            tableHTML += `<td class="fw-bold">${team.first}</td>`; // First appearance
            tableHTML += `<td class="fw-bold">${team.latest}</td>`; // Latest appearance

            // Best Result
            let bestResultText = '-';
            let bestResultClass = '';
            if (team.best_result && typeof team.best_result === 'object') {
                const entries = Object.entries(team.best_result);
                if (entries.length > 0) {
                    // Only use the first entry (e.g., Champions or Runners-up)
                    const [resultType, years] = entries[0];
                    bestResultText = `<b>${resultType}</b> (${years.join(', ')})`;
                    if (resultType === 'Champions') {
                        bestResultClass = 'cell-champion';
                    } else if (resultType === 'Runners-up') {
                        bestResultClass = 'cell-runner-up';
                    }
                }
            } else if (typeof team.best_result === 'string') {
                bestResultText = team.best_result;
            }
            tableHTML += `<td class="${bestResultClass}">${bestResultText}</td>`; // Best Result
            
            // Statistics
            tableHTML += `<td>${team.played}</td>`; // Played
            tableHTML += `<td>${team.won}</td>`; // Won
            tableHTML += `<td>${team.lost}</td>`; // Lost
            tableHTML += `<td>${team.tiedW}</td>`; // Tied+W
            tableHTML += `<td>${team.tiedL}</td>`; // Tied+L
            tableHTML += `<td>${team.NR}</td>`; // No Result
            tableHTML += `<td class="fw-bold">${team.winP}%</td>`; // Win%
            
            tableHTML += '</tr>';
        });
    }
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function mostAppearancesTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table class="mostapps-table"><thead><tr>';

    // Add custom headers
    tableHTML += '<th class="position">Rank</th>'; // Rank column
    tableHTML += '<th>Player</th>'; // Player name column
    tableHTML += '<th>Team</th>'; // Team column
    tableHTML += '<th>Years Active</th>'; // Years Active column
    tableHTML += '<th>Apps</th>'; // Apps column
    tableHTML += '<th>Runs</th>'; // Runs column
    tableHTML += '<th>Wkts</th>'; // Wkts column
    tableHTML += '</tr></thead><tbody>';
    
    // Add data rows
    if (data && Array.isArray(data)) {
        data.forEach((player, index) => {
            tableHTML += '<tr>';
            tableHTML += `<td class="position">${index + 1}</td>`; // Rank
            tableHTML += `<td class="fw-bold text-blue">${player.player}</td>`; // Player name
            
            // Team column: if array, join with comma
            let teamText = Array.isArray(player.team) ? player.team.join(', ') : player.team;
            tableHTML += `<td>${teamText}</td>`; // Team
            tableHTML += `<td>${player.years}</td>`; // Years Active
            tableHTML += `<td class="fw-bold cell-lightgrey">${player.apps}</td>`; // Apps
            tableHTML += `<td>${player.runs}</td>`; // Runs
            tableHTML += `<td>${player.wkts}</td>`; // Wkts
            tableHTML += '</tr>';
        });
    }

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function battingRecordsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Record</th>'; // Record column
    tableHTML += '<th>Player</th>'; // Player name column
    tableHTML += '<th>Stats</th>'; // Value column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    data.slice(0,5).forEach((record, index) => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${record.category}</td>`; // Record category
      let player = Object.values(record.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`; // Player name and team
      let stats = Object.values(record.stats);
      tableHTML += `<td class="fw-bold">${stats[0]}</td>`; // Stats value
      tableHTML += '</tr>';
    });

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[5].category}</td>`;
    let player = Object.values(data[5].player);
    tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
    let stats = Object.values(data[5].stats);
    tableHTML += `<td><b>${stats[0]}</b> (${stats[1]})</td>`;
    tableHTML += '</tr>';

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[6].category}</td>`;
    let player1 = Object.values(data[6].player);
    tableHTML += `<td class="fw-bold text-blue">${player1[0]} <span class="fw-normal text-black">(${player1[1]})</span></td>`;
    let stats1 = Object.values(data[6].stats);
    tableHTML += `<td class="fw-bold">${stats1[0]}</td>`;
    tableHTML += '</tr>';

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[7].category}</td>`;
    let player2 = Object.values(data[7].player);
    tableHTML += `<td class="fw-bold text-blue">${player2[0]} <span class="fw-normal text-black">(${player2[1]})</span></td>`;
    let stats2 = ["HS", "vs", "Date"].map(key => data[7].stats[key]);
    tableHTML += `<td><b>${stats2[0]}</b> vs <b>${stats2[1]}</b><br>(${stats2[2]})</td>`;
    tableHTML += '</tr>';

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[8].category}</td>`;
    let player3 = Object.values(data[8].player);
    tableHTML += `<td class="fw-bold text-blue">${player3[0][0]} <span class="fw-normal text-black">and</span> ${player3[0][1]} <span class="fw-normal text-black">(${player3[1]})</span></td>`;
    let stats3 = ["HP", "vs", "Date"].map(key => data[8].stats[key]);
    tableHTML += `<td><b>${stats3[0]}</b> vs <b>${stats3[1]}</b><br>(${stats3[2]})</td>`;
    tableHTML += '</tr>';

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function bowlingRecordsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Record</th>'; // Record column
    tableHTML += '<th>Player</th>'; // Player name column
    tableHTML += '<th>Stats</th>'; // Value column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[9].category}</td>`;
    let player = Object.values(data[9].player);
    tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`;
    let stats = Object.values(data[9].stats);
    tableHTML += `<td class="fw-bold">${stats[0]}</td>`;
    tableHTML += '</tr>';

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[10].category}</td>`;
    let player1 = Object.values(data[10].player);
    tableHTML += `<td class="fw-bold text-blue">${player1[0]} <span class="fw-normal text-black">(${player1[1]})</span></td>`;
    let stats1 = ["BBF", "vs", "Date"].map(key => data[10].stats[key]);
    tableHTML += `<td><b>${stats1[0]}</b> vs <b>${stats1[1]}</b><br>(${stats1[2]})</td>`;
    tableHTML += '</tr>';

    tableHTML += '<tr>';
    tableHTML += `<td class="fw-bold">${data[11].category}</td>`;
    let player2 = Object.values(data[11].player);
    let player3 = Object.values(data[12].player);
    tableHTML += `<td class="fw-bold text-blue">${player2[0]} <span class="fw-normal text-black">(${player2[1]})</span><br>${player3[0]} <span class="fw-normal text-black">(${player3[1]})</span></td>`;
    let stats2 = Object.values(data[11].stats);
    let stats3 = Object.values(data[12].stats);
    tableHTML += `<td><b>${stats2[0]}</b> (${stats2[1]})<br><b>${stats3[0]}</b> (${stats3[1]})</td>`;
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function fieldingRecordsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Record</th>'; // Record column
    tableHTML += '<th>Player</th>'; // Player name column
    tableHTML += '<th>Stats</th>'; // Value column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
    data.slice(13, 15).forEach((record) => {
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${record.category}</td>`; // Record category
      let player = Object.values(record.player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]} <span class="fw-normal text-black">(${player[1]})</span></td>`; // Player name and team
      let stats = Object.values(record.stats);
      tableHTML += `<td class="fw-bold">${stats[0]}</td>`; // Stats value
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }

  function teamRecordsTable(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Build HTML table
    let tableHTML = '<table><thead><tr>';

    // Add custom headers
    tableHTML += '<th>Record</th>'; // Record column
    tableHTML += '<th>Team</th>'; // Team name column
    tableHTML += '<th>Stats</th>'; // Value column
    tableHTML += '</tr></thead><tbody>';

    // Add data rows
      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${data[15].category}</td>`; // Record category
      let player = Object.values(data[15].player);
      tableHTML += `<td class="fw-bold text-blue">${player[0]}</td>`; // Player name and team
      let stats = ["HT", "vs", "Date"].map(key => data[15].stats[key]);
      tableHTML += `<td><b>${stats[0]}</b> vs <b>${stats[1]}</b><br>(${stats[2]})</td>`; // Stats value
      tableHTML += '</tr>';

      tableHTML += '<tr>';
      tableHTML += `<td class="fw-bold">${data[16].category}</td>`; // Record category
      let player1 = Object.values(data[16].player);
      tableHTML += `<td class="fw-bold text-blue">${player1[0]}</td>`; // Player name and team
      let stats1 = ["LT", "vs", "Date"].map(key => data[16].stats[key]);
      tableHTML += `<td><b>${stats1[0]}</b> vs <b>${stats1[1]}</b><br>(${stats1[2]})</td>`; // Stats value
      tableHTML += '</tr>';

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }
