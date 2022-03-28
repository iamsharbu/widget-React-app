import React, { useEffect } from "react";
import { useState } from "react";

import Search from "../search/Search";
import Icon from "../icon/Icon";

import { ExpandIcon } from "../../../public/ExpandIcon";
import { CollapseIcon } from "../../../public/CollapseIcon";
import { MaximiseIcon } from "../../../public/MaximiseIcon";
import { MinimiseIcon } from "../../../public/MinimiseIcon";

import './Widget.css';

const Widget = (props) => {

    const widgetProps = props.widgetProps;

    const [widgetOpenState, setWidgetOpenState] = useState(true);
    const [widgetExpandState, setWidgetExpandState] = useState(true);

    const widgetToggleHandler = () => {
        setWidgetOpenState(widgetOpenState => !widgetOpenState);
        setWidgetExpandState(!widgetOpenState);
    }

    const widgetMaxMinHandler = () => {
        setWidgetExpandState(widgetExpandState => !widgetExpandState);
    }

    const theme = widgetProps.theme;

    const widgetStyle = {
        widgetComponent : {
            ...(widgetOpenState ? (widgetExpandState ? theme.size.open : theme.size.mini) : theme.size.close),
            backgroundColor : theme.type.primaryColorScheme,
            color : theme.type.fontColor
        }
    }

    return (
        <React.Fragment>
            <div className="widget--component" style={widgetStyle.widgetComponent}>
                
                <div className='widget--title'>
                    <span className={!widgetOpenState ? 'collapseTitle' : null}>{widgetProps.title}</span>
                </div>

                <div className="widget--inlineOptions">

                    { 
                        widgetOpenState && 
                        (widgetExpandState ? (<Icon icon={MinimiseIcon} theme={theme.type} onClick={widgetMaxMinHandler}/>) : (<Icon icon={MaximiseIcon} theme={theme.type} onClick={widgetMaxMinHandler}/>))
                    }

                    { 
                        widgetOpenState ? (<Icon icon={CollapseIcon} theme={theme.type} onClick={widgetToggleHandler}/>) : (<Icon rotate={90} isCollapse={true} icon={ExpandIcon} theme={theme.type} onClick={widgetToggleHandler}/>)
                    }
                
                </div>
                
                {widgetOpenState && 
                    widgetProps.type == 'search' && 
                        <Search data={widgetProps.data} theme={theme} show={widgetExpandState}/>
                }
            
            </div>
        </React.Fragment>
    );
}

export default Widget;