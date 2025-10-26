# Vision Intelligence Lab Website

Official website for the Vision Intelligence Lab at Drexel University, led by Prof. Feng Liu.

## About

The Vision Intelligence Lab is a research group at Drexel University focused on advancing computer vision, machine learning, and artificial intelligence. Our research areas include:

- **3D Vision & Intelligence**: Next-generation methods for 3D object/scene understanding and immersive VR/AR applications
- **Generative AI**: Controllable and explainable generative models with applications in healthcare and education
- **AI for Societal Impact**: Leveraging AI for healthcare, education, and human-centered applications

## Live Site

Visit our website at: [https://vilab-drexel.github.io/VILab.github.io/](https://vilab-drexel.github.io/VILab.github.io/)

## Project Structure

```
VILab.github.io/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── info.json           # Lab information, team, publications, and news
├── assets/             # Images and media files
│   ├── faculty/        # Faculty photos
│   └── students/       # Student photos
├── GOOGLE_MAPS_SETUP.md # Google Maps API setup instructions
└── README.md           # This file
```

## Features

- Responsive design with mobile navigation
- Dynamic content loading from `info.json`
- Team member profiles with photos and links
- Publications listing
- News and announcements
- FAQ section
- Interactive Google Maps integration
- Smooth section navigation

## Updating Content

To update the website content, edit the `info.json` file. This file contains all the dynamic content including:

- Lab description and highlights
- News and announcements
- Team members (faculty, PhD students, masters students, undergraduate students, alumni)
- Publications
- FAQ
- Contact information

### Adding Team Members

Add new team members to the appropriate array in `info.json`:

```json
{
  "name": "Name",
  "description": "Research area",
  "email": "email@drexel.edu",
  "image": "assets/students/photo.jpg",
  "school": "Drexel University",
  "github": "https://github.com/username",
  "linkedin": "https://www.linkedin.com/in/username",
  "google_scholar": "https://scholar.google.com/citations?user=..."
}
```

### Adding Publications

Add new publications to the `publications` array:

```json
{
  "title": "Paper Title",
  "authors": "Author1, Author2, & Author3",
  "venue": "Conference/Journal Name",
  "year": 2024,
  "links": {
    "paper": "https://...",
    "code": "https://github.com/..."
  }
}
```

### Adding News

Add announcements to the `news` array (newest first):

```json
{
  "date": "2024-10-15",
  "title": "Announcement Title",
  "description": "Description of the announcement."
}
```

## Google Maps Setup

To configure the Google Maps integration:

1. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Replace the API key in `index.html` line 112
3. Update the map coordinates in `info.json` under `contact.map`

See `GOOGLE_MAPS_SETUP.md` for detailed instructions.

## Development

This is a static website built with vanilla HTML, CSS, and JavaScript. No build process is required.

To develop locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/VILab-Drexel/VILab.github.io.git
   cd VILab.github.io
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Make your changes and test locally

4. Commit and push to deploy (GitHub Pages automatically serves from the main branch)

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Contact

For questions or collaboration inquiries, please contact:

**Prof. Feng Liu**
Assistant Professor
Department of Computer Science
Drexel University
Email: fl397@drexel.edu
Website: [https://liufeng2915.github.io/](https://liufeng2915.github.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
