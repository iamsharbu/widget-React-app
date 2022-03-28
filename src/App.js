import React, { useState, useEffect } from "react";

import { WIDGET_LOCATIONS, WIDGET_TYPE_SEARCH, WIDGET_SIZE, WIDGET_THEME_TYPE } from "./constants/GlobalConstants";
import jsonData from './MOCK_DATA.json';
import { preProcessData } from "./utils/preProcessData";
import Widget from "./components/widget/Widget";

import './App.css';

const App = () => {

    const initialWidgetProps = {
        title : WIDGET_LOCATIONS,
        type : WIDGET_TYPE_SEARCH,
        data : preProcessData(jsonData),
        theme : {
            type : WIDGET_THEME_TYPE.DARK,
            size : WIDGET_SIZE.MEDIUM,
        }
    }

    return (
        <React.Fragment>

            <Widget widgetProps={initialWidgetProps}/>

        </React.Fragment>
    );
}

export default App;