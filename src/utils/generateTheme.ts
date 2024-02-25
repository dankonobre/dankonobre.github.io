import plugin from 'tailwindcss/plugin';

type BaseColors = {
    surface: any;
    primary: any;
    secondary: any;
    tertiary: any;
    [key: string]: any;
};

type OnBaseColors = {
    'on-surface': any;
    'on-primary': any;
    'on-secondary': any;
    'on-tertiary': any;
    [key: string]: any;
  };

  type Utils = {
    bg: string;
    text: string;
    fill: string;
    border: string;
    outline: string;
    ring: string;
    accent: string;
    [key: string]: string;
  };

type DefaultShades = {
    surface: { light: number; dark: number; };
    'on-surface': { light: number; dark: number; };
    primary: { light: number; dark: number; };
    'on-primary': { light: number; dark: number; };
    secondary: { light: number; dark: number; };
    'on-secondary': { light: number; dark: number; };
    tertiary: { light: number; dark: number; };
    'on-tertiary': { light: number; dark: number; };
    [key: string]: { light: number; dark: number; };
};

type Utilities = {
    [key: string]: any;
  };

export default plugin(function ({ addUtilities, e, theme }) {
    const colors = theme('colors') ?? {};

    const baseColors: BaseColors = {
        'surface': colors.themed?.['mauve'],
        'primary': colors.themed?.['plum'],
        'secondary': colors.themed?.['dim'],
        'tertiary': colors.themed?.['olivine'],
    };

    const onBaseColors: OnBaseColors = {
        'on-surface': colors.themed?.['mauve'],
        'on-primary': colors.themed?.['plum'],
        'on-secondary': colors.themed?.['dim'],
        'on-tertiary': colors.themed?.['olivine'],
    }

    const utils: Utils = {
        'bg': 'background-color',
        'text': 'color',
        'fill': 'fill',
        'border': 'border-color',
        'outline': 'outline-color',
        'ring': 'ring-color',
        'accent': 'accent-color',
    };

    const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const opacities = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];

    const defaultShades: DefaultShades = {
        'surface': { light: 200, dark: 300 },
        'on-surface': { light: 900, dark: 800 },

        'primary': { light: 200, dark: 300 },
        'on-primary': { light: 900, dark: 800 },

        'secondary': { light: 200, dark: 300 },
        'on-secondary': { light: 900, dark: 800 },

        'tertiary': { light: 400, dark: 500 },
        'on-tertiary': { light: 900, dark: 800 },
    };

    const utilities: Utilities = {};

    for (const colorName in defaultShades) {
        if (!(colorName in baseColors) && !(colorName in onBaseColors)) {
            throw new Error(`Color name "${colorName}" specified in defaultShades does not exist in baseColors or onBaseColors.`);
        }

        const colorObject = baseColors[colorName] || onBaseColors[colorName];
        const { light, dark } = defaultShades[colorName];

        if (!(light in colorObject)) {
            throw new Error(`Light shade value "${light}" for color name "${colorName}" does not exist.`);
        }

        if (!(dark in colorObject)) {
            throw new Error(`Dark shade value "${dark}" for color name "${colorName}" does not exist.`);
        }
    }

    for (const colorName in baseColors) {
        for (const util in utils) {
            utilities[`.${e(`${util}-${colorName}`)}`] = { [utils[util]]: baseColors[colorName][defaultShades[colorName].light] };
            utilities[`.dark .${e(`${util}-${colorName}`)}`] = { [utils[util]]: baseColors[colorName][defaultShades[colorName].dark] };

            for (const shade of shades) {
                const className = `.${e(`${util}-${colorName}-${shade}`)}`;
                utilities[className] = { [utils[util]]: baseColors[colorName][shade] };

                const darkShade = 1000 - shade;
                utilities[`.dark ${className}`] = { [utils[util]]: baseColors[colorName][darkShade] };

                for (const opacity of opacities) {
                    const classNameOpacity = `.${e(`${util}-${colorName}-${shade}/${opacity}`)}`;
                    utilities[classNameOpacity] = { [utils[util]]: `rgba(${baseColors[colorName][shade]}, ${opacity / 100})` };

                    utilities[`.dark ${classNameOpacity}`] = { [utils[util]]: `rgba(${baseColors[colorName][darkShade]}, ${opacity / 100})` };
                }
            }
        }
    }

    for (const colorName in onBaseColors) {
        for (const util in utils) {
            utilities[`.${e(`${util}-${colorName}`)}`] = { [utils[util]]: onBaseColors[colorName][defaultShades[colorName].dark] };
            utilities[`.dark .${e(`${util}-${colorName}`)}`] = { [utils[util]]: onBaseColors[colorName][defaultShades[colorName].light] };

            for (const shade of shades) {
                const className = `.${e(`${util}-${colorName}-${shade}`)}`;
                const darkShade = 1000 - shade;
                utilities[className] = { [utils[util]]: onBaseColors[colorName][darkShade] };
                utilities[`.dark ${className}`] = { [utils[util]]: onBaseColors[colorName][shade] };

                for (const opacity of opacities) {
                    const classNameOpacity = `.${e(`${util}-${colorName}-${shade}/${opacity}`)}`;
                    utilities[classNameOpacity] = { [utils[util]]: `rgba(${onBaseColors[colorName][darkShade]}, ${opacity / 100})` };

                    utilities[`.dark ${classNameOpacity}`] = { [utils[util]]: `rgba(${onBaseColors[colorName][shade]}, ${opacity / 100})` };
                }
            }
        }
    }

    addUtilities(utilities);
})