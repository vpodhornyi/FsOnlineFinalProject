import React from "react";

export const ThemeContext = React.createContext({
    fontSize: "3rem",
    setFontSize: () => {
    },
    color: "rgb(29, 155, 240)",
    setColor: () => {
    },
    backgroundColor: '#ffffff',
    setBackgroundColor: () => {
    },

});