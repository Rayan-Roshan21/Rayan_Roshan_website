import React from "react";
import "../Grid_Four/Grid_Four.css"

function GridFour() {
    return (
        <div className="grid-four-container">
            <div className="grid-box">
                <h2>Technical Skills</h2>
                <ul>
                    <li>JavaScript / React</li>
                    <li>HTML / CSS</li>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Git & GitHub</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2>Soft Skills</h2>
                <ul>
                    <li>Communication</li>
                    <li>Teamwork</li>
                    <li>Problem Solving</li>
                    <li>Adaptability</li>
                    <li>Time Management</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2>Softwares I Use</h2>
                <ul>
                    <li>VS Code</li>
                    <li>Figma</li>
                    <li>Adobe Photoshop</li>
                    <li>Slack</li>
                    <li>Postman</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2>Hobbies</h2>
                <ul>
                    <li>Photography</li>
                    <li>Traveling</li>
                    <li>Reading</li>
                    <li>Music</li>
                    <li>Gaming</li>
                </ul>
            </div>
        </div>
    );
}

export default GridFour;