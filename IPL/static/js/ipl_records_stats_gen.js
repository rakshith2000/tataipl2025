 function toggleDropdown() {
    const chevron = document.querySelector('.dropdown-toggle .fa-chevron-down, .dropdown-toggle .fa-chevron-up');
    const dropdown = document.querySelector('.dropdown');
    const menu = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
    if (dropdown.classList.contains('show')) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
        menu.style.display = 'block';
    } else {
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
        setTimeout(() => { menu.style.display = 'none'; }, 500); // Wait for animation
    }
  }

  // Close dropdown when clicking outside
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
      var dropdowns = document.getElementsByClassName("dropdown");
      var chevrons = document.querySelectorAll('.dropdown-toggle .fa-chevron-up');
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          chevrons.forEach(chevron =>{
            chevron.classList.remove('fa-chevron-up');
          chevron.classList.add('fa-chevron-down');
          });
        }
      }
    }
  }

  function applyTableSorting(table) {
  const ths = table.querySelectorAll('thead th');
  const tbody = table.querySelector('tbody');
  let currentSort = { col: null, asc: true };
  ths.forEach((th, colIdx) => {
    th.classList.add('sortable-header');
    // Remove any previous sort icon
    let icon = th.querySelector('.sort-icon');
    if (icon) icon.remove();
    // Add new sort icon
    icon = document.createElement('i');
    icon.className = 'sort-icon fa fa-sort';
    th.appendChild(icon);
    th.onclick = function() {
      ths.forEach((h, i) => {
        const ic = h.querySelector('.sort-icon');
        if (ic) {
          ic.className = 'sort-icon fa fa-sort';
        }
        h.classList.remove('active');
      });
      th.classList.add('active');
      let sortAsc = true;
      if (currentSort.col === colIdx) sortAsc = !currentSort.asc;
      currentSort = { col: colIdx, asc: sortAsc };
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const lastColIdx = ths.length - 1;
      const sortedRows = rows.sort((a, b) => {
        const aText = a.querySelectorAll('td')[colIdx].textContent.trim();
        const bText = b.querySelectorAll('td')[colIdx].textContent.trim();
        // If this is the last column, try to parse as date
        if (colIdx === lastColIdx) {
          const aDate = new Date(aText);
          const bDate = new Date(bText);
          if (!isNaN(aDate) && !isNaN(bDate)) {
            return sortAsc ? aDate - bDate : bDate - aDate;
          }
        }
        // Numeric sort if both are numbers
        if (!isNaN(aText) && !isNaN(bText) && aText !== '' && bText !== '') {
          return sortAsc ? (Number(aText) - Number(bText)) : (Number(bText) - Number(aText));
        }
        // String sort
        return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });
      sortedRows.forEach(row => tbody.appendChild(row));
      // Update icon for sorted column
      icon.className = sortAsc ? 'sort-icon fa fa-sort-up' : 'sort-icon fa fa-sort-down';
    };
  });
}

/* Add to <script> for horizontal scrollable tabs */
(function() {
  function updateFades(wrapper) {
    const inner = wrapper.querySelector('.tab-scroll-inner');
    if (!inner) return;
    const scrollLeft = inner.scrollLeft;
    const maxScroll = inner.scrollWidth - inner.clientWidth;
    const threshold = 6;
    if (scrollLeft > threshold) wrapper.classList.add('fade-left'); else wrapper.classList.remove('fade-left');
    if (scrollLeft < maxScroll - threshold) wrapper.classList.add('fade-right'); else wrapper.classList.remove('fade-right');
  }
  function setupAllTabScrollWrappers() {
    const wrappers = document.querySelectorAll('.tab-scroll-wrapper');
    wrappers.forEach(wrapper => {
      const inner = wrapper.querySelector('.tab-scroll-inner');
      if (!inner) return;
      requestAnimationFrame(() => updateFades(wrapper));
      inner.addEventListener('scroll', () => updateFades(wrapper), { passive: true });
      window.addEventListener('resize', () => updateFades(wrapper));
      if (window.MutationObserver) {
        const mo = new MutationObserver(() => updateFades(wrapper));
        mo.observe(inner, { childList: true, subtree: true, characterData: true });
      }
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupAllTabScrollWrappers();
  } else {
    document.addEventListener('DOMContentLoaded', setupAllTabScrollWrappers);
  }
})();

// Scroll active tab to center in tab-scroll-wrapper
function scrollActiveTabToCenter() {
  var wrapper = document.querySelector('.tab-scroll-wrapper');
  var inner = wrapper && wrapper.querySelector('.tab-scroll-inner');
  if (!inner) return;
  var active = inner.querySelector('ul.nav-tabs li .active');
  if (!active) return;
  // Find the li element
  var li = active.closest('li');
  if (!li) return;
  // Calculate center position
  var liRect = li.getBoundingClientRect();
  var innerRect = inner.getBoundingClientRect();
  var scrollLeft = inner.scrollLeft;
  var liCenter = liRect.left + liRect.width / 2;
  var innerCenter = innerRect.left + innerRect.width / 2;
  var offset = liCenter - innerCenter;
  // Animate scroll
  inner.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
}
// Call after DOM ready and after tab change
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  scrollActiveTabToCenter();
} else {
  document.addEventListener('DOMContentLoaded', scrollActiveTabToCenter);
}
// If tabs can change dynamically, also call after tab change
const tabLinks = document.querySelectorAll('.tab-scroll-inner ul.nav-tabs a[data-bs-toggle="tab"]');
tabLinks.forEach(link => {
  link.addEventListener('shown.bs.tab', scrollActiveTabToCenter);
});