import React from "react";
import pages from "../pages"

interface keyInterface {
    key: keyof typeof pages;
    name: string;
}
const routeKeys = Object.keys(pages).map(e => 
    (<keyInterface>{
        key: e,
        name: e
    })
    )

interface routeInterface {
    route: string;
    as: string;
    component: React.FC;
}
const routes = routeKeys.map(({key, name}) => (
    <routeInterface>{
        route: name === 'Home' ? '/' : `/${name.toLowerCase().replaceAll(' ', '')}`,
        as: name,
        component: pages[key]
    }
))
export default routes