const ui = require('@acme/ui/tailwind')

module.exports = {
  presets: [ui],
  // `ui.content` includes a path to the components that are using tailwind in @acme/ui
  content: ui.content.concat([
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ]),
}
