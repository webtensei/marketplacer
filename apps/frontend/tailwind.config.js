const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const {nextui} = require("@nextui-org/react");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    "./../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ...createGlobPatternsForDependencies(__dirname)
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
    },
    keyframes: {
      aurora: {
        from: {
          backgroundPosition: "50% 50%, 50% 50%",
        },
        to: {
          backgroundPosition: "350% 50%, 350% 50%",
        },
      },
    },
  },
  plugins: [addVariablesForColors, nextui(

    {
      "themes": {
            "light": {
            
        },
        "dark": {
          "colors": {
            "background": "#161719",
          }
        }
      },
      "layout": {
        "disabledOpacity": "0.4",
        "radius": {
          "small": "4px",
          "medium": "8px",
          "large": "12px"
        }
      }
    }


  )],
};


function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}