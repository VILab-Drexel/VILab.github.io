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

    // Load news
    loadNews();

    // Load team
    loadTeam();

    // Load vacancies
    loadVacancies();

    // Load publications
    loadPublications();

    // Load projects
    loadProjects();

    // Load photos
    loadPhotos();
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
        const pubContainer = document.querySelector('#publications .container');
        
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

function loadVacancies() {
    if (siteData.vacancies && siteData.vacancies.length > 0) {
        const vacancyContainer = document.querySelector('#vacancies .container');

        // Keep the title
        const title = vacancyContainer.querySelector('h1');
        vacancyContainer.innerHTML = '';
        vacancyContainer.appendChild(title);

        siteData.vacancies.forEach(vacancy => {
            const div = document.createElement('div');
            div.className = 'vacancy-item';
            div.innerHTML = `
                <h3>${vacancy.title}</h3>
                <p>${vacancy.description}</p>
                ${vacancy.link ? `<a href="${vacancy.link}" target="_blank">Learn More</a>` : ''}
            `;
            vacancyContainer.appendChild(div);
        });
    }
}

function loadProjects() {
    if (siteData.projects && siteData.projects.length > 0) {
        const projectContainer = document.querySelector('#projects .container');

        // Keep the title
        const title = projectContainer.querySelector('h1');
        projectContainer.innerHTML = '';
        projectContainer.appendChild(title);

        siteData.projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project-item';

            let linksHTML = '<div class="links">';
            if (project.links) {
                if (project.links.website) {
                    linksHTML += `<a href="${project.links.website}" target="_blank">Website</a>`;
                }
                if (project.links.github) {
                    linksHTML += `<a href="${project.links.github}" target="_blank">GitHub</a>`;
                }
                if (project.links.demo) {
                    linksHTML += `<a href="${project.links.demo}" target="_blank">Demo</a>`;
                }
            }
            linksHTML += '</div>';

            div.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${linksHTML}
            `;
            projectContainer.appendChild(div);
        });
    }
}

function loadPhotos() {
    if (siteData.photos && siteData.photos.length > 0) {
        const photoGallery = document.querySelector('.photo-gallery');
        photoGallery.innerHTML = '';

        siteData.photos.forEach(photo => {
            const div = document.createElement('div');
            div.className = 'photo-item';
            div.innerHTML = `
                <img src="${photo.url}" alt="${photo.caption || ''}">
                ${photo.caption ? `<p class="photo-caption">${photo.caption}</p>` : ''}
            `;
            photoGallery.appendChild(div);
        });
    }
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
});
