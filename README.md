# FiveM Custom Loading Screen

A customizable loading screen for your FiveM server.

## Installation

1. Download all the files to your server's resource folder
2. Add the following to your `server.cfg`:
```
ensure loading-screen
```

## Customization

### Basic Customization

1. Open `script.js` and modify the `config` object at the top:
   - `serverName`: Your server's name
   - `serverDescription`: A welcome message or server description
   - `discordLink`: Your Discord server invite link
   - `websiteLink`: Your server's website URL
   - `backgroundImage`: Path to your background image
   - `rules`: Array of server rules

### Advanced Customization

1. Modify `styles.css` to change colors, fonts, and layout
2. Edit `index.html` to add or remove sections
3. Update `script.js` to add new features or modify loading behavior

## Features

- Customizable server information
- Loading progress bar
- Server rules display
- Social media links
- Responsive design
- Smooth animations
- Easy to customize

## Notes

- Place your background image in the same directory and name it `background.jpg`
- Make sure all links in the config are valid
- Test the loading screen locally before deploying to your server
