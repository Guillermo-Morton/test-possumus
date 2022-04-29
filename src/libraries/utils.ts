export const capitalize = (string : string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
export const subObject = (properties: Array<string>, object: {[key: string]: any}) => properties.reduce((a,b) => ({...a,[b]: object[b]}),{})

// const arrayInfo = (({ starships, vehicles, films }) => ({ starships, vehicles, films }))(state)