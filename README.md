# Umbral

A modern, glassmorphic dashboard site featuring dark mode, purple accent, and sitewide settings. Includes login, dashboard, games, and settings pages. Games are loaded dynamically from a JSON file. Designed for deployment on GitHub Pages at `/umbral`.

## Features
- **Glassmorphism UI**: Stylish, blurred backgrounds and liquid glass effects
- **Dark Mode**: Black background with purple hue
- **Sitewide Settings**: Theme, font size, accent color, reduced motion, notifications
- **Login Page**: Custom styled input and authentication
- **Dashboard**: Card grid layout, navigation, header/footer, logo
- **Games Page**: Loads game cards from JSON, responsive grid
- **Settings Page**: Change sitewide preferences, instant effect
- **GitHub Pages Deployment**: All links auto-prefixed for `/umbral`

## Getting Started

### Prerequisites
- Modern web browser
- GitHub account (for deployment)

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/buggzradio/umbral.git
   cd umbral
   ```
2. **Open in VS Code or your preferred editor**
3. **Serve locally (optional)**
   - You can use a simple HTTP server:
     ```bash
     python3 -m http.server
     # or
     npx serve .
     ```
   - Visit `http://localhost:8000` (or the port shown)

### Project Structure
```
index.html                  # Login page
README.md                   # This file
LICENSE                     # License
/dashboard/index.html       # Dashboard
/dashboard/games.html       # Games page
/dashboard/games/games.json # Game data
/dashboard/settings/index.html # Settings page
/.github/workflows/gh-pages-build.yml # GitHub Pages workflow
```

### Sitewide Settings
- Settings are stored in `localStorage` and applied on all pages
- Change theme, font size, accent color, reduced motion, notifications from the Settings page

### Adding Games
- Edit `/dashboard/games/games.json` to add new games:
  ```json
  [
    {
      "name": "Game Name",
      "location": "/umbral/dashboard/games/game-folder",
      "logo": "https://link-to-logo.png"
    }
  ]
  ```
- The games page will automatically load new entries

## Deployment (GitHub Pages)

1. **Push your changes to GitHub**
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```
2. **GitHub Actions Workflow**
   - The workflow in `.github/workflows/gh-pages-build.yml` will build and deploy the site to GitHub Pages
   - All links are automatically amended to use `/umbral` as the base path
3. **Access your site**
   - Visit `https://buggzradio.github.io/umbral/`

### Manual Deployment
If you want to deploy manually:
1. Build the site (if you have a build step)
2. Push the contents to the `gh-pages` branch
3. Set GitHub Pages source to `gh-pages` branch in repository settings

## Customization
- **Styling**: Edit CSS in `<style>` blocks in each HTML file
- **Settings**: Update settings logic in JS in each page
- **Games**: Add/remove games in `games.json`

## Troubleshooting
- If links are broken, ensure they start with `/umbral/`
- If settings do not apply, clear browser cache/localStorage
- For deployment issues, check GitHub Actions logs

## License
This project is licensed under the MIT License. See `LICENSE` for details.

## Credits
Created by buggzradio. Contributions welcome!
