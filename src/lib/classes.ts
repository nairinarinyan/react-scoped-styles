export const classes = (condition: boolean, classToApply: string, defaultClasses: string = '') => {
    return defaultClasses + (condition ? ' ' + classToApply : '');
}