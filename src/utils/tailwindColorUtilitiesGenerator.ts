
/**
 * Represents a color with different shades.
 * Each shade is a number from 50 to 950 and maps to a string which is the color value.
 */
type Color = { [shade: number]: string };
/**
 * Represents a collection of base colors.
 * Each color is a string which is the color name and maps to a Color object.
 */
export type BaseColors = { [colorName: string]: Color };

/**
 * Represents a collection of on-base colors.
 * Each color is a string which is the color name and maps to a Color object.
 */
export type OnBaseColors = { [colorName: string]: Color };

/**
 * Represents a collection of utilities.
 * Each utility is a string which is the utility name and maps to a function that takes a color value and returns an object with CSS properties.
 */
export type Utils = { [utilName: string]: (value: string) => { [key: string]: string } };

/**
 * Represents the default shades for each color.
 * Each color is a string which is the color name and maps to an object with light and dark shades.
 */
export type DefaultShades = { [colorName: string]: { light: number, dark: number } };

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const opacities = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const threshold = 1000;

/**
 * Generates utility classes for a single color.
 * 
 * @param {Function} e - The escape function provided by Tailwind CSS.
 * @param {Utils} utilities - The utilities to generate classes for.
 * @param {string} colorName - The name of the color to generate classes for.
 * @param {Color} color - The color object to generate classes for.
 * @param {{ light: number, dark: number }} defaultShade - The default shades for the color.
 * @param {boolean} invertShades - Whether to invert the shades for dark mode.
 * @returns {object} The generated utility classes.
 */
const generateUtilitiesForColor = (
    e: Function,
    utilities: { [key: string]: (value: string) => { [key: string]: string } },
    colorName: string,
    color: Color,
    defaultShade: { light: number, dark: number },
    invertShades: boolean = false
): object => {
    const utilitiesForColor = Object.entries(utilities).flatMap(([util, cssPropertyFunction]) => {
        const baseClasses = [
            { [`.${e(`${util}-${colorName}`)}`]: cssPropertyFunction(color[defaultShade.light]) },
            { [`.dark .${e(`${util}-${colorName}`)}`]: cssPropertyFunction(color[defaultShade.dark]) },
        ];

        const shadeClasses = shades.flatMap(shade => {
            const darkShade = threshold - shade;
            const lightShade = invertShades ? threshold - shade : shade;
            return [
                { [`.${e(`${util}-${colorName}-${lightShade}`)}`]: cssPropertyFunction(color[shade]) },
                { [`.dark .${e(`${util}-${colorName}-${lightShade}`)}`]: cssPropertyFunction(color[darkShade]) },
                ...opacities.flatMap(opacity => [
                    { [`.${e(`${util}-${colorName}-${lightShade}/${opacity}`)}`]: cssPropertyFunction(`${color[shade]}${opacity / 100}`) },
                    { [`.dark .${e(`${util}-${colorName}-${lightShade}/${opacity}`)}`]: cssPropertyFunction(`${color[darkShade]}${opacity / 100}`) },
                ])
            ];
        });

        return [...baseClasses, ...shadeClasses];
    });

    return Object.assign({}, ...utilitiesForColor);
};

/**
 * Generates utility classes for multiple colors.
 * 
 * @param {Function} e - The escape function provided by Tailwind CSS.
 * @param {Utils} utils - The utilities to generate classes for.
 * @param {BaseColors | OnBaseColors} colors - The colors to generate classes for.
 * @param {DefaultShades} defaultShades - The default shades for the colors.
 * @param {boolean} invertShades - Whether to invert the shades for dark mode.
 * @returns {object[]} The generated utility classes.
 */
export const generateUtilitiesForColors = (
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

