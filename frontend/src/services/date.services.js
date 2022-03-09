const defaultOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

/**
 * @param date: string Y-m-d H:i:s
 */
export const getDifferenceInDaysBetweenDates = (target, other = false) => {
    const targetDate = new Date(target); // target: string
    const endDate = other ? new Date(other) : new Date();

    const difference = Math.abs(endDate.getTime() - targetDate.getTime());
    return Math.floor(difference / (1000 * 3600 * 24));
}


export const formatDate = (date, format = 'es-ES', options) => {
    if (!date || date === '') return '';
    const finalOptions = options ? options : defaultOptions;

    if (typeof date === 'string') {
        return new Date(date).toLocaleDateString(format, options)
    }

    return date.toLocaleDateString(format, options)
}