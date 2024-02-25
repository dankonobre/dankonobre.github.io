import plugin from 'tailwindcss/plugin';

type Color = { [shade: number]: string };
type BaseColors = { [colorName: string]: Color };
type OnBaseColors = { [colorName: string]: Color };
type Utils = { [utilName: string]: string };
type DefaultShades = { [colorName: string]: { light: number, dark: number } };

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const MAX_SHADE = 1000;

const generateUtilitiesForColor = (
    e: Function,
    utils: Utils,
    colorName: string,
    color: Color,
    defaultShade: { light: number, dark: number },
    invertShades: boolean = false
): object => {
    const utilitiesForColor = Object.entries(utils).flatMap(([util, cssProperty]) => {
        const baseClasses = [
            { [`.${e(`${util}-${colorName}`)}`]: { [cssProperty]: color[defaultShade.light] } },
            { [`.dark .${e(`${util}-${colorName}`)}`]: { [cssProperty]: color[defaultShade.dark] } },
        ];

        const shadeClasses = SHADES.flatMap(shade => {
            const darkShade = MAX_SHADE - shade;
            const lightShade = invertShades ? MAX_SHADE - shade : shade;
            return [
                { [`.${e(`${util}-${colorName}-${lightShade}`)}`]: { [cssProperty]: color[shade] } },
                { [`.dark .${e(`${util}-${colorName}-${lightShade}`)}`]: { [cssProperty]: color[darkShade] } },
            ];
        });

        return [...baseClasses, ...shadeClasses];
    });

    return Object.assign({}, ...utilitiesForColor);
};

const generateUtilitiesForColors = (
    e: Function,
    utils: Utils,
    colors: BaseColors | OnBaseColors,
    defaultShades: DefaultShades,
    invertShades: boolean = false
): object[] => {
    return Object.entries(colors).map(([colorName, color]) => {
        const defaultShade = defaultShades[colorName];
        return generateUtilitiesForColor(e, utils, colorName, color, defaultShade, invertShades);
    });
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
        'stroke': 'stroke',
    };

    const defaultShades: DefaultShades = {
        'surface': { light: 200, dark: 300 },
        'on-surface': { light: 900, dark: 800 },

        'primary': { light: 200, dark: 300 },
        'on-primary': { light: 900, dark: 800 },

        'secondary': { light: 200, dark: 300 },
        'on-secondary': { light: 900, dark: 800 },

        'tertiary': { light: 300, dark: 400 },
        'on-tertiary': { light: 900, dark: 800 },
    };

    const utilities = [
        ...generateUtilitiesForColors(e, utils, baseColors, defaultShades),
        ...generateUtilitiesForColors(e, utils, onBaseColors, defaultShades, true)
    ];

    addUtilities(Object.assign({}, ...utilities));
});