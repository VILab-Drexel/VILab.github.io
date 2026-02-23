// Load data from info.json
let siteData = {};
let isDataLoaded = false;
let isGoogleMapsLoaded = false;

// Fetch and load data with cache-busting parameter
fetch('info.json?v=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        siteData = data;
        isDataLoaded = true;
        loadContent();
        // Try to initialize map if Google Maps is already loaded
        tryInitMap();
    })
    .catch(error => console.error('Error loading data:', error));

function loadContent() {
    // Load lab info
    loadLabInfo();

    // Load highlights
    loadHighlights();

    // Load news
    loadNews();

    // Load team
    loadTeam();

    // Load publications
    loadPublications();

    // Load projects
    loadProjects();

    // Load FAQ
    loadFAQ();

    // Load photos
    loadPhotos();

    // Load contact
    loadContact();
}

function loadLabInfo() {
    if (siteData.lab) {
        document.querySelector('.logo').textContent = siteData.lab.name;
        document.querySelector('title').textContent = siteData.lab.name;
        document.querySelector('.intro').textContent = siteData.lab.description;
    }
}

function loadAboutHome() {
    if (siteData.about) {
        const aboutContentHome = document.querySelector('.about-content-home');
        aboutContentHome.innerHTML = '';

        // Mission statement
        if (siteData.about.mission) {
            const missionDiv = document.createElement('div');
            missionDiv.className = 'about-mission';
            missionDiv.textContent = siteData.about.mission;
            aboutContentHome.appendChild(missionDiv);
        }

        // Research areas
        if (siteData.about.research_areas && siteData.about.research_areas.length > 0) {
            const researchSection = document.createElement('div');
            researchSection.className = 'about-section';
            researchSection.innerHTML = '<h3>Research Areas</h3><div class="research-areas"></div>';

            const researchAreasContainer = researchSection.querySelector('.research-areas');
            siteData.about.research_areas.forEach(area => {
                const div = document.createElement('div');
                div.className = 'research-area';
                div.innerHTML = `
                    <h4>${area.title}</h4>
                    <p>${area.description}</p>
                `;
                researchAreasContainer.appendChild(div);
            });

            aboutContentHome.appendChild(researchSection);
        }
    }
}

function loadHighlights() {
    if (siteData.highlights) {
        const highlightsContainer = document.querySelector('.highlights');
        highlightsContainer.innerHTML = '';

        siteData.highlights.forEach(highlight => {
            const div = document.createElement('div');
            div.className = 'highlight-item';
            div.innerHTML = `
                <h3>${highlight.title}</h3>
                <p>${highlight.description}</p>
            `;
            highlightsContainer.appendChild(div);
        });
    }
}

function loadNews() {
    if (siteData.news) {
        const newsContainer = document.querySelector('.news-list');
        newsContainer.innerHTML = '';

        siteData.news.forEach(item => {
            const div = document.createElement('div');
            div.className = 'news-item';

            // Format date
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            div.innerHTML = `
                <span class="news-date">${formattedDate}</span>
                <p class="news-title">${item.title}</p>
            `;
            newsContainer.appendChild(div);
        });
    }
}

function loadAbout() {
    if (siteData.about) {
        const aboutContent = document.querySelector('.about-content');
        aboutContent.innerHTML = '';

        // Mission statement
        if (siteData.about.mission) {
            const missionDiv = document.createElement('div');
            missionDiv.className = 'about-mission';
            missionDiv.textContent = siteData.about.mission;
            aboutContent.appendChild(missionDiv);
        }

        // Research areas
        if (siteData.about.research_areas && siteData.about.research_areas.length > 0) {
            const researchSection = document.createElement('div');
            researchSection.className = 'about-section';
            researchSection.innerHTML = '<h2>Research Areas</h2><div class="research-areas"></div>';

            const researchAreasContainer = researchSection.querySelector('.research-areas');
            siteData.about.research_areas.forEach(area => {
                const div = document.createElement('div');
                div.className = 'research-area';
                div.innerHTML = `
                    <h3>${area.title}</h3>
                    <p>${area.description}</p>
                `;
                researchAreasContainer.appendChild(div);
            });

            aboutContent.appendChild(researchSection);
        }

        // Values
        if (siteData.about.values && siteData.about.values.length > 0) {
            const valuesSection = document.createElement('div');
            valuesSection.className = 'about-section';
            valuesSection.innerHTML = '<h2>Our Values</h2><ul class="values-list"></ul>';

            const valuesList = valuesSection.querySelector('.values-list');
            siteData.about.values.forEach(value => {
                const li = document.createElement('li');
                li.textContent = value;
                valuesList.appendChild(li);
            });

            aboutContent.appendChild(valuesSection);
        }
    }
}

function loadTeam() {
    if (!siteData.team) return;

    const container = document.querySelector('#team .container');
    const title = container.querySelector('h1');
    container.innerHTML = '';
    container.appendChild(title);

    const sections = [
        { key: 'faculty', label: 'Faculty' },
        { key: 'phd_students', label: 'PhD Students' },
        { key: 'masters_students', label: 'Masters Students' },
        { key: 'undergraduate_students', label: 'Undergraduate Students' }
    ];

    sections.forEach(section => {
        const members = siteData.team[section.key];
        if (!members || members.length === 0) return;

        const heading = document.createElement('h2');
        heading.textContent = section.label;
        container.appendChild(heading);

        const table = document.createElement('table');
        table.className = 'people-table';
        table.innerHTML = '<colgroup><col width="30%"><col width="70%"></colgroup>';
        const tbody = document.createElement('tbody');

        members.forEach(member => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdDesc = document.createElement('td');

            const link = member.website || member.linkedin || member.google_scholar;
            if (link) {
                tdName.innerHTML = `<a href="${link}" target="_blank">${member.name}</a>`;
            } else {
                tdName.textContent = member.name;
            }

            tdDesc.textContent = member.description || '';

            tr.appendChild(tdName);
            tr.appendChild(tdDesc);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    });

    // Alumni
    const allAlumni = [];
    if (siteData.team.former_members) allAlumni.push(...siteData.team.former_members);
    if (siteData.team.alumni) allAlumni.push(...siteData.team.alumni);

    if (allAlumni.length > 0) {
        const heading = document.createElement('h2');
        heading.textContent = 'Alumni';
        container.appendChild(heading);

        const table = document.createElement('table');
        table.className = 'people-table';
        table.innerHTML = '<colgroup><col width="30%"><col width="70%"></colgroup>';
        const tbody = document.createElement('tbody');

        allAlumni.forEach(person => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdDesc = document.createElement('td');

            const link = person.website || person.linkedin || person.google_scholar;
            if (link) {
                tdName.innerHTML = `<a href="${link}" target="_blank">${person.name}</a>`;
            } else {
                tdName.textContent = person.name;
            }

            let desc = '';
            if (person.degree) desc += person.degree + ' ';
            if (person.duration) desc += '(' + person.duration + ')';
            if (person.current_position) {
                desc += (desc ? ' ' : '') + 'Now: ' + person.current_position;
            }
            if (!desc && person.description) desc = person.description;
            tdDesc.textContent = desc.trim();

            tr.appendChild(tdName);
            tr.appendChild(tdDesc);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    }
}

function loadPublications() {
    if (siteData.publications && siteData.publications.length > 0) {
        const pubContainer = document.querySelector('#publication .container');

        const title = pubContainer.querySelector('h1');
        pubContainer.innerHTML = '';
        pubContainer.appendChild(title);

        const scholarNote = document.createElement('p');
        scholarNote.innerHTML = 'For a complete list of publications, please see <a href="https://scholar.google.com/citations?user=8Y9iUz0AAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>.';
        pubContainer.appendChild(scholarNote);

        const sections = [
            { type: 'preprint', label: 'Preprints' },
            { type: 'published', label: 'Published' }
        ];

        sections.forEach(section => {
            const pubs = siteData.publications
                .filter(pub => pub.type === section.type)
                .sort((a, b) => (b.year || 0) - (a.year || 0));

            if (pubs.length === 0) return;

            const heading = document.createElement('h2');
            heading.textContent = section.label;
            pubContainer.appendChild(heading);

            const ul = document.createElement('ul');
            ul.className = 'publication-list';

            pubs.forEach(pub => {
                const li = document.createElement('li');
                li.className = 'publication';

                const linkOrder = [
                    { key: 'project', label: 'Project' },
                    { key: 'paper', label: 'Paper' },
                    { key: 'arxiv', label: 'arXiv' },
                    { key: 'code', label: 'Code' }
                ];
                const linkParts = [];
                linkOrder.forEach(item => {
                    const url = pub.links && pub.links[item.key];
                    if (url) {
                        const target = (item.key === 'arxiv' || item.key === 'code') ? ' target="_blank"' : '';
                        linkParts.push(`<a href="${url}"${target}>${item.label}</a>`);
                    }
                });
                const linksHTML = linkParts.length > 0
                    ? `<span class="links">${linkParts.join(' | ')}</span>`
                    : '';

                li.innerHTML = `
                    <span class="pub-title">${pub.title}</span>
                    <span class="authors">${pub.authors}</span>
                    <span class="venue">${pub.venue}</span>
                    ${linksHTML}
                `;

                ul.appendChild(li);
            });

            pubContainer.appendChild(ul);
        });

    }
}

function loadProjects() {
    if (siteData.projects && siteData.projects.length > 0) {
        const projContainer = document.querySelector('#research .container');

        const title = projContainer.querySelector('h1');
        projContainer.innerHTML = '';
        projContainer.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'project-grid';

        siteData.projects.forEach(project => {
            const card = document.createElement('a');
            card.className = 'project-card';
            card.href = project.url;

            let linksHTML = '';
            if (project.links) {
                linksHTML = '<div class="project-links">';
                if (project.links.paper) {
                    linksHTML += `<a href="${project.links.paper}" onclick="event.stopPropagation()">Paper</a>`;
                }
                if (project.links.arxiv) {
                    linksHTML += `<a href="${project.links.arxiv}" target="_blank" onclick="event.stopPropagation()">arXiv</a>`;
                }
                if (project.links.code) {
                    linksHTML += `<a href="${project.links.code}" target="_blank" onclick="event.stopPropagation()">Code</a>`;
                }
                if (project.links.data) {
                    linksHTML += `<a href="${project.links.data}" target="_blank" onclick="event.stopPropagation()">Data</a>`;
                }
                linksHTML += '</div>';
            }

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
                ${linksHTML}
            `;

            grid.appendChild(card);
        });

        projContainer.appendChild(grid);
    }
}

function loadFAQ() {
    if (siteData.faq) {
        const faqContainer = document.querySelector('#faq .container');

        // Keep the title
        const title = faqContainer.querySelector('h1');
        faqContainer.innerHTML = '';
        faqContainer.appendChild(title);

        siteData.faq.forEach(item => {
            const div = document.createElement('div');
            div.className = 'faq-item';
            div.innerHTML = `
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            `;
            faqContainer.appendChild(div);
        });
    }
}

function loadPhotos() {
    if (siteData.photos && siteData.photos.length > 0) {
        const photoGallery = document.querySelector('.photo-gallery');
        photoGallery.innerHTML = '';

        siteData.photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';

            photoItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
                <div class="photo-caption">
                    ${photo.category ? `<span class="photo-category">${photo.category}</span>` : ''}
                    <div>${photo.caption}</div>
                </div>
            `;

            photoGallery.appendChild(photoItem);
        });
    }
}

function loadContact() {
    if (siteData.contact) {
        const contactInfo = document.querySelector('.contact-info');
        contactInfo.innerHTML = '';

        // Name
        if (siteData.contact.name) {
            const div = document.createElement('div');
            div.className = 'info-item';
            div.innerHTML = `
                <div class="info-icon"><i class="fas fa-user"></i></div>
                <div class="info-content">
                    <h3>Contact</h3>
                    <p>${siteData.contact.name}</p>
                </div>
            `;
            contactInfo.appendChild(div);
        }

        // Address
        if (siteData.contact.address) {
            const addr = siteData.contact.address;
            const div = document.createElement('div');
            div.className = 'info-item';
            div.innerHTML = `
                <div class="info-icon"><i class="fas fa-location-dot"></i></div>
                <div class="info-content">
                    <h3>Office Address</h3>
                    <p>${addr.building}, ${addr.department}<br>
                    ${addr.university}<br>
                    ${addr.street}<br>
                    ${addr.city}</p>
                </div>
            `;
            contactInfo.appendChild(div);
        }

        // Email
        if (siteData.contact.email) {
            const div = document.createElement('div');
            div.className = 'info-item';
            const email = siteData.contact.email.trim();
            div.innerHTML = `
                <div class="info-icon"><i class="fas fa-envelope"></i></div>
                <div class="info-content">
                    <h3>Email</h3>
                    <p><a href="mailto:${email}">${email}</a></p>
                </div>
            `;
            contactInfo.appendChild(div);
        }
    }
}

// Called by Google Maps API when it's ready
function initMap() {
    isGoogleMapsLoaded = true;
    tryInitMap();
}

// Try to initialize the map only when both data and Google Maps are loaded
function tryInitMap() {
    if (!isDataLoaded || !isGoogleMapsLoaded) {
        return; // Wait for both to be ready
    }

    if (!siteData.contact || !siteData.contact.map) {
        return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        return;
    }

    const mapData = siteData.contact.map;
    const location = {
        lat: mapData.latitude,
        lng: mapData.longitude
    };

    const map = new google.maps.Map(mapElement, {
        zoom: mapData.zoom || 16,
        center: location,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    // Add marker
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: siteData.lab.name || 'Visual Intelligence Lab',
        animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #07294d;">${siteData.lab.name || 'Visual Intelligence Lab'}</h3>
                <p style="margin: 0; color: #666;">
                    ${siteData.contact.address.building}<br>
                    ${siteData.contact.address.street}<br>
                    ${siteData.contact.address.city}
                </p>
            </div>
        `
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal section links (those starting with #)
            if (!href.startsWith('#')) {
                return; // Let external links work normally
            }

            e.preventDefault();

            const targetId = href.substring(1);

            // Remove active class
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');

            // Update URL hash
            window.location.hash = targetId;

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle initial hash on page load
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Remove active class
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to matching section and nav link
            const targetSection = document.getElementById(hash);
            const targetLink = document.querySelector(`a[href="#${hash}"]`);

            if (targetSection) {
                targetSection.classList.add('active');
            }
            if (targetLink) {
                targetLink.classList.add('active');
            }
        }
    }

    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial load
    handleHashChange();
});
