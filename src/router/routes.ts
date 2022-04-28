import React from "react";
import pages from "../pages"

interface keyInterface {
    key: keyof typeof pages;
    name: string;
}
const routeKeys = Object.keys(pages).map(e => ({key: e, name: e} as keyInterface))

interface routeInterface {
    route: string;
    as: string;
    component: React.FC;
}
const routes = routeKeys.map(({key, name}) => (
   {
        route: name === 'Home' ? '/' : `/${name.toLowerCase().replaceAll(' ', '')}`,
        as: name,
        component: pages[key]
    } as routeInterface
))
console.log('ROUTER CREATED', routes)
export default routes