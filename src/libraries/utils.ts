export const capitalize = (string : string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
export const subObject = ({properties, avoid, object}:{properties?: Array<string>, avoid?: Array<string>, object: {[key: string]: any}}) => {
  if(!properties?.length) {
    properties = Object.keys(object)
  }
  return properties?.reduce((a,b) => {
    if(avoid?.includes(b)) return {...a}
    return ({...a,[b]: object[b]})
  },{})
}


// const arrayInfo = (({ starships, vehicles, films }) => ({ starships, vehicles, films }))(state)