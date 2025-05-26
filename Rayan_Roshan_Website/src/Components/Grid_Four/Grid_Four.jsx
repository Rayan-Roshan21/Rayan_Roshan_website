import React from "react";
import "../Grid_Four/Grid_Four.css"

function GridFour() {
    return (
        <div className="grid-four-container">
            <div className="grid-box">
                <h2 className="Grid-title">Technical Skills</h2>
                <ul>
                    <li>JavaScript / React</li>
                    <li>HTML / CSS</li>
                    <li>Java</li>
                    <li>Python</li>
                    <li>Git & GitHub</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">Soft Skills</h2>
                <ul>
                    <li>Communication</li>
                    <li>Teamwork</li>
                    <li>Problem Solving</li>
                    <li>Adaptability</li>
                    <li>Time Management</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">Softwares</h2>
                <ul>
                    <li>VS Code</li>
                    <li>Figma</li>
                    <li>Canva</li>
                    <li>Google Suite</li>
                    <li>Microsoft Office</li>
                </ul>
            </div>
        </div>
    );
}

export default GridFour;