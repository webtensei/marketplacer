const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const {nextui} = require("@nextui-org/react");

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
  theme: {
    extend: {}
  },
  plugins: [nextui(

    {
      "themes": {
            "light": {
          "colors": {
            "default": {
              "50": "#f8f8f8",
              "100": "#ededed",
              "200": "#e3e3e3",
              "300": "#d8d8d8",
              "400": "#cecece",
              "500": "#c3c3c3",
              "600": "#a1a1a1",
              "700": "#7f7f7f",
              "800": "#5d5d5d",
              "900": "#3b3b3b",
              "foreground": "#000",
              "DEFAULT": "#c3c3c3"
            },
            "primary": {
              "50": "#dfe6fc",
              "100": "#b3c4f7",
              "200": "#86a1f2",
              "300": "#597eed",
              "400": "#2d5ce8",
              "500": "#0039e3",
              "600": "#002fbb",
              "700": "#002594",
              "800": "#001b6c",
              "900": "#001144",
              "foreground": "#fff",
              "DEFAULT": "#0039e3"
            },
            "secondary": {
              "50": "#dfedf3",
              "100": "#b3d3e2",
              "200": "#86b9d0",
              "300": "#599fbf",
              "400": "#2d86ae",
              "500": "#006c9d",
              "600": "#005982",
              "700": "#004666",
              "800": "#00334b",
              "900": "#00202f",
              "foreground": "#fff",
              "DEFAULT": "#006c9d"
            },
            "success": {
              "50": "#dffce0",
              "100": "#b3f8b5",
              "200": "#86f389",
              "300": "#59ef5e",
              "400": "#2dea32",
              "500": "#00e607",
              "600": "#00be06",
              "700": "#009605",
              "800": "#006d03",
              "900": "#004502",
              "foreground": "#000",
              "DEFAULT": "#00e607"
            },
            "warning": {
              "50": "#fff8df",
              "100": "#ffefb3",
              "200": "#ffe586",
              "300": "#ffdb59",
              "400": "#ffd22d",
              "500": "#ffc800",
              "600": "#d2a500",
              "700": "#a68200",
              "800": "#795f00",
              "900": "#4d3c00",
              "foreground": "#000",
              "DEFAULT": "#ffc800"
            },
            "danger": {
              "50": "#ffeaea",
              "100": "#ffcece",
              "200": "#ffb1b1",
              "300": "#ff9494",
              "400": "#ff7777",
              "500": "#ff5a5a",
              "600": "#d24a4a",
              "700": "#a63b3b",
              "800": "#792b2b",
              "900": "#4d1b1b",
              "foreground": "#000",
              "DEFAULT": "#ff5a5a"
            },
            "background": "#f2f3f4",
            "foreground": "#000000",
            "content1": {
              "DEFAULT": "#ffffff",
              "foreground": "#000"
            },
            "content2": {
              "DEFAULT": "#f4f4f5",
              "foreground": "#000"
            },
            "content3": {
              "DEFAULT": "#e4e4e7",
              "foreground": "#000"
            },
            "content4": {
              "DEFAULT": "#d4d4d8",
              "foreground": "#000"
            },
            "focus": "#006FEE",
            "overlay": "#000000"
          }
        },
        "dark": {
          "colors": {
            "default": {
              "50": "#e6e6e6",
              "100": "#c2c2c2",
              "200": "#9e9e9e",
              "300": "#7a7a7a",
              "400": "#575757",
              "500": "#333333",
              "600": "#2a2a2a",
              "700": "#212121",
              "800": "#181818",
              "900": "#0f0f0f",
              "foreground": "#fff",
              "DEFAULT": "#333333"
            },
            "primary": {
              "50": "#dfe6fc",
              "100": "#b3c4f7",
              "200": "#86a1f2",
              "300": "#597eed",
              "400": "#2d5ce8",
              "500": "#0039e3",
              "600": "#002fbb",
              "700": "#002594",
              "800": "#001b6c",
              "900": "#001144",
              "foreground": "#fff",
              "DEFAULT": "#0039e3"
            },
            "secondary": {
              "50": "#dfedf3",
              "100": "#b3d3e2",
              "200": "#86b9d0",
              "300": "#599fbf",
              "400": "#2d86ae",
              "500": "#006c9d",
              "600": "#005982",
              "700": "#004666",
              "800": "#00334b",
              "900": "#00202f",
              "foreground": "#fff",
              "DEFAULT": "#006c9d"
            },
            "success": {
              "50": "#dff0e5",
              "100": "#b3dac1",
              "200": "#86c49d",
              "300": "#59ae79",
              "400": "#2d9955",
              "500": "#008331",
              "600": "#006c28",
              "700": "#005520",
              "800": "#003e17",
              "900": "#00270f",
              "foreground": "#fff",
              "DEFAULT": "#008331"
            },
            "warning": {
              "50": "#edeadf",
              "100": "#d3ccb3",
              "200": "#baae86",
              "300": "#a09159",
              "400": "#87732d",
              "500": "#6d5500",
              "600": "#5a4600",
              "700": "#473700",
              "800": "#342800",
              "900": "#211a00",
              "foreground": "#fff",
              "DEFAULT": "#6d5500"
            },
            "danger": {
              "50": "#f2dfdf",
              "100": "#e0b3b3",
              "200": "#ce8686",
              "300": "#bb5959",
              "400": "#a92d2d",
              "500": "#970000",
              "600": "#7d0000",
              "700": "#620000",
              "800": "#480000",
              "900": "#2d0000",
              "foreground": "#fff",
              "DEFAULT": "#970000"
            },
            "background": "#202124",
            "foreground": "#fff",
            "content1": {
              "DEFAULT": "#18181b",
              "foreground": "#fff"
            },
            "content2": {
              "DEFAULT": "#27272a",
              "foreground": "#fff"
            },
            "content3": {
              "DEFAULT": "#3f3f46",
              "foreground": "#fff"
            },
            "content4": {
              "DEFAULT": "#52525b",
              "foreground": "#fff"
            },
            "focus": "#0048ff",
            "overlay": "#ffffff"
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
