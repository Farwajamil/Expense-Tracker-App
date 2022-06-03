import React from 'react';
import Home from './Home.js'
import "./Header.css"
function Header()
{
    return(
        
        <div className='img'>
            <div className='container shadow'>
            <h1 className="text-center text-white">Expense Tracker App</h1>
            <Home/>
            </div>
        </div>
    );
}
export default Header;