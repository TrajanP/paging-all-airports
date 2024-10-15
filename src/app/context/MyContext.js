'use client'
// Created React Context for app

import { createContext, useState, useContext } from 'react';

// Airport Context, which is set in the initial API call with User Input for Airport Code
export const MyContext = createContext({        
    code: "1234",
    name: "Airport Name",
    city: "Airport City",
    country: "Airport Country",
    timezone: "Airport TZ",
    wiki_url: "Wiki Link"});

// A Provider component which wraps all inner components
// Providing access to the airport and setAirport state
export const MyContextProvider = ({ children }) => {
    const [airport, setAirport] = useState({
        code: "1234",
        name: "Airport Name",
        city: "Airport City",
        country: "Airport Country",
        timezone: "Airport TZ",
        wiki_url: "Wiki Link",
    });
    return (
        <MyContext.Provider value={{ airport, setAirport }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;