import React, { useEffect, useRef } from "react";
import { useState } from "react";

import './Search.css';

import getCountryFlag from "../../utils/getCountryFlag";

import { SearchIcon } from "../../../public/SearchIcon";

import { CLEAR_ALL } from "../../constants/GlobalConstants";

import Icon from "../icon/Icon";

const Search = (props) => {

    const locationData = props.data;

    const [searchQuery, setSearchQuery] = useState('');

    const [searchIndices, setSearchIndices] = useState(new Set());

    useEffect(() => {setSearchIndices(filteredIndices.current)}, [searchQuery]);

    let filteredIndices = useRef(new Set());

    const getFilteredJSON = (searchQuery, jsonData) => {
        filteredIndices.current = new Set();
        const filteredData = jsonData.filter((location) => {
            if(
            (location.City != null && location.City.toLowerCase().includes(searchQuery.toLocaleLowerCase())) || 
            (location.Country != null && location.Country.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
            ){
                location.City != null && filteredIndices.current.add(location.City[0]);
                return location;
            }
        });
        return filteredData;
    }

    let scrollTopLocationIndexMap = new Map();

    const searchInputHandler = (e) => {
        setSearchQuery(e.target.value);
    }

    const clearSearchInput = () => {
        setSearchQuery('');
    }

    const indexClickHandler = (index) => {
        scrollTopLocationIndexMap.get(index).scrollIntoView();
    }

    const locationRef = useRef([]);

    const theme = props.theme.type;

    return (
        <React.Fragment>
            <div className="search--component" style={!props.show ? {display:'none'} : {}}>
                
                <div className="search--input--container">
                    <Icon icon={SearchIcon} theme={theme} type='search'/>
                    <input type="text" className="search--input" placeholder="Filter locations" onChange={searchInputHandler} value={searchQuery} style={{background : theme.darkerColor, borderColor : theme.darkerColor, color: theme.fontColor}}/>
                </div>

                {searchQuery && 
                    <div className="clear--search" onClick={clearSearchInput} style={{color : theme.secondaryColorScheme}}>
                        <span>{`X ${CLEAR_ALL}`}</span>
                    </div>
                }
                
                <div className="search--listing" style={searchQuery ? {height: `calc(90% - 35px)`} : {height: `calc(90%)`}}>
                    <div className="location--item--container">
                        {getFilteredJSON(searchQuery, locationData).map((val, key) => {
                            if(val.City!=null && !scrollTopLocationIndexMap.has(val.City[0])){
                                scrollTopLocationIndexMap.set(val.City[0], locationRef.current[key]);
                            }
                            return (
                                <div ref={el => locationRef.current[key] = el} key={key} className="location--item">
                                    <input className="location--item--input" type="checkbox" name={key}/>
                                    <img alt="" className="location--flag" src={getCountryFlag(val.Country)}></img>
                                    <label>{val.City + " - " + val.Country}</label>
                                </div>
                            );
                        }
                        )}
                    </div>
                </div>

                <div className="search--indexing">
                    {[...searchIndices].map((index) => {
                        return (
                            <li key={index} onClick={() => {indexClickHandler(index)}} className="search--index--item">{index}</li>
                        )
                    })}
                </div>

            </div>
        </React.Fragment>
    );
}

export default Search;