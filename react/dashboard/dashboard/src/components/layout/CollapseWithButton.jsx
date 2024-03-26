import React, {useState} from 'react';

const CollapseWithButton = ({title, children, coverToggle}) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggle = () => {
        setCollapsed(!collapsed);
    }

    const modalCloseStyle = {
        position: "fixed",
        top: "-4.9rem", left: "-5rem",
        width: "100vw", height: "100vh",
        zIndex: 2,
        backgroundColor: "rgba(0,0,0,0.1)"
    };

    return (
        <>
            {coverToggle && !collapsed && <div onClick={toggle} style={modalCloseStyle}></div>}
            <button className={"btn dropdown-toggle " + (collapsed ? "collapsed" : "")}
                    onClick={toggle}>{title}</button>
            <div className={"collapse " + (collapsed ? '' : "show")}>
                {children}
            </div>
        </>
    )
};

export default CollapseWithButton