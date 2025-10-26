# Vision Intelligence Lab Website

A modern, responsive website for a computer science research lab focusing on computer vision and artificial intelligence.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Single Page Application**: Smooth navigation between sections without page reloads
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **5 Main Sections**:
  - **Home**: Introduction to the lab with featured highlights
  - **Research**: Showcase of current research projects and areas
  - **Publication**: List of academic publications with links
  - **Team**: Meet the researchers, faculty, and students
  - **Contact**: Contact information and inquiry form

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (no frameworks required)
- Google Fonts (Inter)

## Getting Started

1. Simply open `index.html` in your web browser
2. No build process or dependencies required
3. The website is fully functional as static files

## Customization

### Updating Content

- **Lab Name**: Edit the `<h1>` in the `.logo` section of `index.html`
- **Hero Section**: Modify the `.hero-content` section
- **Research Projects**: Update the `.research-card` elements
- **Publications**: Edit the `.publication-item` elements
- **Team Members**: Modify the `.team-card` elements
- **Contact Info**: Update the `.info-card` elements

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --accent-color: #1e40af;
    /* ... other colors ... */
}
```

### Adding Images

Replace the placeholder elements (`.placeholder-image` and `.placeholder-photo`) with actual images:

```html
<!-- Instead of: -->
<div class="placeholder-image">🖼️</div>

<!-- Use: -->
<img src="path/to/image.jpg" alt="Description">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This website template is free to use for academic and research purposes.

## Contact

For questions or support, please reach out through the contact form on the website.

