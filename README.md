# Hana Razia Jahangiri Portfolio

Built with React and Vite.
[https://hanarazia.github.io](https://hanarazia.github.io).

## Features
- About Me landing section (with hero image)
- Projects section
- Contact section (with links and resume)
- Animated falling leaves on scroll
- Modular, easy-to-edit components

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages
1. Set the `homepage` field in `package.json` to `"https://hanarazia.github.io"`.
2. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add the following scripts to your `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Deploy with:
   ```bash
   npm run deploy
   ```

## Customization
- Edit the components in `src/` to update your About, Projects, Contact, and Resume sections.
- Replace the hero image in `public/` as needed.
- Tweak the falling leaves animation in the `FallingLeaves` component.
