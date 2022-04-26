import React from 'react';
import { Routes, Route } from 'react-router-dom'
import routes from './routes';
type Props = {
    className: string;
  };
const ComponentWrapper = ({ Component } : { Component: React.FC<Props>}) => (
    <div className={`p-5 min-h-screen pt-20 flex items-stretch bg-slate-900 text-white`}>
      <Component className='flex flex-col bg-slate-800 w-full rounded-lg p-3'/>
    </div>
  )
const Router = () => {
    return (
        <Routes>
            {routes.map(({route, as, component}) => (
                <Route key={as} path={route} element={<ComponentWrapper Component={component} />} />
            ))}
        </Routes>
    );
};

export default Router;