const navToggle = document.querySelector('.toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => navLinks.classList.remove('show'));
  });
}

const THEME_KEY = 'hirameki_theme';
const themeSelect = document.getElementById('themeSelect');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // localStorage が利用できない場合は静かにスキップ
  }

  if (themeSelect) {
    themeSelect.value = theme;
  }
}

let storedTheme = null;

try {
  storedTheme = localStorage.getItem(THEME_KEY);
} catch (error) {
  storedTheme = null;
}

applyTheme(storedTheme || 'light');

if (themeSelect) {
  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });
}

const membersSection = document.getElementById('members');

if (membersSection) {
  const filterContainer = membersSection.querySelector('.member-filter');
  const groups = Array.from(membersSection.querySelectorAll('.member-group'));

  if (filterContainer && groups.length > 0) {
    const uniqueGrades = Array.from(new Set(groups.map((group) => group.dataset.grade)));

    uniqueGrades.forEach((grade) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'member-filter__button';
      button.dataset.filter = grade;
      button.textContent = grade;
      filterContainer.appendChild(button);
    });

    const filterButtons = () => Array.from(filterContainer.querySelectorAll('.member-filter__button'));

    const applyFilter = (filter) => {
      groups.forEach((group) => {
        const match = filter === 'all' || group.dataset.grade === filter;
        group.hidden = !match;
      });

      filterButtons().forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === filter);
      });
    };

    filterContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const filterValue = target.dataset.filter;
      if (!filterValue) {
        return;
      }

      applyFilter(filterValue);
    });

    applyFilter('all');
  }
}
