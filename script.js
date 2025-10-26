// Load data from info.json
let siteData = {};

// Fetch and load data
fetch('info.json')
    .then(response => response.json())
    .then(data => {
        siteData = data;
        loadContent();
    })
    .catch(error => console.error('Error loading data:', error));

function loadContent() {
    // Load lab info
    loadLabInfo();

    // Load highlights
    loadHighlights();

    // Load rolling news
    loadRollingNews();

    // Load news
    loadNews();

    // Load team
    loadTeam();

    // Load publications
    loadPublications();

    // Load FAQ
    loadFAQ();

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

function loadRollingNews() {
    if (siteData.news && siteData.news.length > 0) {
        const rollingTrack = document.querySelector('.rolling-news-track');
        rollingTrack.innerHTML = '';

        // Duplicate the news items to create seamless loop
        const newsItems = [...siteData.news, ...siteData.news];

        newsItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'rolling-news-item';

            // Format date
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            div.innerHTML = `
                <i class="fas fa-star"></i>
                <span class="rolling-news-date">${formattedDate}</span>
                <span class="rolling-news-text">${item.title}</span>
            `;
            rollingTrack.appendChild(div);
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
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            newsContainer.appendChild(div);
        });
    }
}

function loadTeam() {
    if (siteData.team) {
        // Load Faculty
        loadTeamSection('faculty', 'Faculty');
        
        // Load PhD Students
        loadTeamSection('phd_students', 'PhD Students');
        
        // Load Masters Students
        loadTeamSection('masters_students', 'Masters Students');
        
        // Load Undergraduate Students
        loadTeamSection('undergraduate_students', 'Undergraduate Students');
        
        // Load Alumni (includes former members)
        loadAlumni();
    }
}

function loadTeamSection(sectionKey, sectionTitle) {
    const members = siteData.team[sectionKey];
    if (!members || members.length === 0) return;
    
    // Find the section header
    const headers = document.querySelectorAll('#team h2');
    let targetHeader = null;
    headers.forEach(header => {
        if (header.textContent === sectionTitle) {
            targetHeader = header;
        }
    });
    
    if (!targetHeader) return;
    
    // Find the team-list div after the header
    const teamList = targetHeader.nextElementSibling;
    if (!teamList) return;
    
    teamList.innerHTML = '';
    
    members.forEach(member => {
        const div = document.createElement('div');
        div.className = 'member';
        
        // Create photo element
        let photoHTML = '';
        if (member.image) {
            photoHTML = `
                <div class="member-photo">
                    <img src="${member.image}" alt="${member.name}">
                </div>
            `;
        } else {
            photoHTML = `
                <div class="member-photo">
                    <div class="placeholder-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            `;
        }
        
        // Create links HTML
        let linksHTML = '<div class="member-links">';
        if (member.email) {
            linksHTML += `<a href="mailto:${member.email}" title="Email"><i class="fas fa-envelope"></i></a>`;
        }
        if (member.website) {
            linksHTML += `<a href="${member.website}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>`;
        }
        if (member.github) {
            linksHTML += `<a href="${member.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;
        }
        if (member.linkedin) {
            linksHTML += `<a href="${member.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
        }
        if (member.google_scholar) {
            linksHTML += `<a href="${member.google_scholar}" target="_blank" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>`;
        }
        linksHTML += '</div>';
        
        // Build member card
        let memberHTML = photoHTML;
        memberHTML += `<h3>${member.name}</h3>`;
        if (member.role) {
            memberHTML += `<p class="role">${member.role}</p>`;
        }
        if (member.description) {
            memberHTML += `<p>${member.description}</p>`;
        }
        if (member.school) {
            memberHTML += `<p class="school">${member.school}</p>`;
        }
        memberHTML += linksHTML;
        
        div.innerHTML = memberHTML;
        teamList.appendChild(div);
    });
}

function loadAlumni() {
    const alumniList = document.querySelector('.alumni-list');
    if (!alumniList) return;
    
    alumniList.innerHTML = '';
    
    // Combine both former_members and alumni
    const allAlumni = [];
    
    if (siteData.team.former_members) {
        allAlumni.push(...siteData.team.former_members);
    }
    
    if (siteData.team.alumni) {
        allAlumni.push(...siteData.team.alumni);
    }
    
    if (allAlumni.length === 0) return;
    
    allAlumni.forEach(person => {
        const div = document.createElement('div');
        div.className = 'alumni-item';
        
        let html = `<h3>${person.name}</h3>`;
        
        // Handle role, degree, or description
        if (person.role) {
            html += `<p class="degree">${person.role}</p>`;
        } else if (person.degree) {
            html += `<p class="degree">${person.degree}</p>`;
        } else if (person.description) {
            html += `<p class="degree">${person.description}</p>`;
        }
        
        // Show thesis if available
        if (person.thesis) {
            html += `<p class="thesis"><em>"${person.thesis}"</em></p>`;
        }
        
        // Show current position
        if (person.current_position) {
            html += `<p class="current-position">Now: ${person.current_position}</p>`;
        }
        
        div.innerHTML = html;
        alumniList.appendChild(div);
    });
}

function loadPublications() {
    if (siteData.publications) {
        const pubContainer = document.querySelector('#publication .container');
        
        // Keep the title
        const title = pubContainer.querySelector('h1');
        pubContainer.innerHTML = '';
        pubContainer.appendChild(title);
        
        siteData.publications.forEach(pub => {
            const div = document.createElement('div');
            div.className = 'publication';
            
            let linksHTML = '<div class="links">';
            if (pub.links) {
                if (pub.links.paper) {
                    linksHTML += `<a href="${pub.links.paper}">Paper</a>`;
                }
                if (pub.links.code) {
                    linksHTML += `<a href="${pub.links.code}">Code</a>`;
                }
                if (pub.links.project) {
                    linksHTML += `<a href="${pub.links.project}">Project</a>`;
                }
                if (pub.links.slides) {
                    linksHTML += `<a href="${pub.links.slides}">Slides</a>`;
                }
                if (pub.links.demo) {
                    linksHTML += `<a href="${pub.links.demo}">Demo</a>`;
                }
            }
            linksHTML += '</div>';
            
            div.innerHTML = `
                <h3>${pub.title}</h3>
                <p class="authors">${pub.authors}</p>
                <p class="venue">${pub.venue}</p>
                ${linksHTML}
            `;
            
            pubContainer.appendChild(div);
        });
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

function loadContact() {
    if (siteData.contact) {
        const contactInfo = document.querySelector('.contact-info');
        contactInfo.innerHTML = '';
        
        // Address
        if (siteData.contact.address) {
            const addr = siteData.contact.address;
            const div = document.createElement('div');
            div.className = 'info-item';
            div.innerHTML = `
                <h3>Address</h3>
                <p>${addr.department}<br>
                ${addr.building}<br>
                ${addr.street}<br>
                ${addr.city}</p>
            `;
            contactInfo.appendChild(div);
        }
        
        // Email
        if (siteData.contact.email) {
            const div = document.createElement('div');
            div.className = 'info-item';
            div.innerHTML = `
                <h3>Email</h3>
                <p>${siteData.contact.email}</p>
            `;
            contactInfo.appendChild(div);
        }
        
        // Phone
        if (siteData.contact.phone) {
            const div = document.createElement('div');
            div.className = 'info-item';
            div.innerHTML = `
                <h3>Phone</h3>
                <p>${siteData.contact.phone}</p>
            `;
            contactInfo.appendChild(div);
        }
        
        // Initialize map if map data exists
        if (siteData.contact.map && typeof google !== 'undefined') {
            initMap();
        }
    }
}

// Initialize Google Map
function initMap() {
    if (!siteData.contact || !siteData.contact.map) return;
    
    const mapData = siteData.contact.map;
    const location = { 
        lat: mapData.latitude, 
        lng: mapData.longitude 
    };
    
    const map = new google.maps.Map(document.getElementById('map'), {
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
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

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
