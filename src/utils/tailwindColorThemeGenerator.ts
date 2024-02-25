import plugin from 'tailwindcss/plugin';
import { generateUtilitiesForColors } from './tailwindColorUtilitiesGenerator';
import type { BaseColors, OnBaseColors, Utils, DefaultShades } from './tailwindColorUtilitiesGenerator';

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
    };

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
        'primary': { light: 200, dark: 300 },
        'secondary': { light: 200, dark: 300 },
        'tertiary': { light: 300, dark: 400 },
    };

    const onDefaultShades: DefaultShades = {
        'on-surface': { light: 900, dark: 800 },
        'on-primary': { light: 900, dark: 800 },
        'on-secondary': { light: 900, dark: 800 },
        'on-tertiary': { light: 900, dark: 800 },
    };


    const utilities = [
        ...generateUtilitiesForColors(e, utils, baseColors, defaultShades),
        ...generateUtilitiesForColors(e, utils, onBaseColors, onDefaultShades, true)
    ];

    addUtilities(Object.assign({}, ...utilities));
});
