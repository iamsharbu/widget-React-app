import React from 'react';

import './Icon.css';

const Icon = (props) => {
    return (
        <div className={`icon--container ${props.isCollapse ? 'collapseIcon' : null} ${props.type == 'search' ? 'SearchIcon' : null}`} onClick={props.onClick ? props.onClick : null}>
            <span className='icon--span' style={{fill : props.theme.secondaryColorScheme}}>
                <props.icon rotate={props.rotate && props.rotate} theme={props.theme && props.theme}/>
            </span>
        </div>
    );
}

export default Icon;