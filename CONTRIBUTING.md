# Contributing to Visual Intelligence Lab Website

Thank you for your interest in contributing to the Visual Intelligence Lab website! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the GitHub Issues
2. If not, create a new issue with a clear title and description
3. Include steps to reproduce (for bugs) or detailed explanation (for features)

### Making Changes

1. **Fork the Repository**
   ```bash
   git clone https://github.com/VILab-Drexel/VILab.github.io.git
   cd VILab.github.io
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Test your changes locally
   - Ensure the website displays correctly on different screen sizes

4. **Test Locally**
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve
   ```

   Visit `http://localhost:8000` to test your changes

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Brief description of your changes"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your changes

## Content Updates

### Updating Lab Information

To update the lab information, news, team members, or publications, edit the `info.json` file:

- **Team Members**: Add to the appropriate section (`faculty`, `phd_students`, `masters_students`, `undergraduate_students`, `former_members`)
- **Publications**: Add to the `publications` array
- **News**: Add to the `news` array (newest first)
- **FAQ**: Add to the `faq` array

### Adding Images

1. Place faculty photos in `assets/faculty/`
2. Place student photos in `assets/students/`
3. Use descriptive filenames (e.g., `firstname_lastname.jpg`)
4. Optimize images for web (recommended max width: 500px)
5. Update the corresponding entry in `info.json` with the image path

### Style Guidelines

- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow the existing naming conventions
- **JavaScript**: Use modern ES6+ syntax
- **JSON**: Maintain proper indentation (2 spaces)

### Code Quality

- Ensure your code is clean and well-commented
- Remove any console.log statements before committing
- Verify that all links work correctly
- Test on multiple browsers (Chrome, Firefox, Safari)
- Ensure responsive design works on mobile devices

## Review Process

1. All pull requests will be reviewed by lab maintainers
2. You may be asked to make changes or improvements
3. Once approved, your changes will be merged
4. Changes are automatically deployed via GitHub Pages

## Questions?

If you have questions about contributing, please contact:

- Prof. Feng Liu: fl397@drexel.edu
- Open an issue on GitHub for technical questions

## Code of Conduct

- Be respectful and professional in all interactions
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

Thank you for contributing to the Visual Intelligence Lab website!
