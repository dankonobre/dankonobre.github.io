
type Color = { [shade: number]: string };
export type BaseColors = { [colorName: string]: Color };
export type OnBaseColors = { [colorName: string]: Color };
export type Utils = { [utilName: string]: string };
export type DefaultShades = { [colorName: string]: { light: number, dark: number } };

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const threshold = 1000;

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

        const shadeClasses = shades.flatMap(shade => {
            const darkShade = threshold - shade;
            const lightShade = invertShades ? threshold - shade : shade;
            return [
                { [`.${e(`${util}-${colorName}-${lightShade}`)}`]: { [cssProperty]: color[shade] } },
                { [`.dark .${e(`${util}-${colorName}-${lightShade}`)}`]: { [cssProperty]: color[darkShade] } },
            ];
        });

        return [...baseClasses, ...shadeClasses];
    });

    return Object.assign({}, ...utilitiesForColor);
};

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

