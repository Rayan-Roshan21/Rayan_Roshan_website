import React from "react";
import "./Grid_Four.css"

function GridFour() {
    return (
        <div className="grid-four-container">
            <div className="grid-box">
                <h2 className="Grid-title">Technical Skills</h2>
                <ul>
                    <li>JavaScript / TypeScript / Python / Java / Swift / C / Bash</li>
                    <li>React.js / Next.js / Node.js / Vite</li>
                    <li>HTML5 / CSS3 / Responsive Web Design</li>
                    <li>Data Structures & Algorithms / Object-Oriented Programming</li>
                    <li>REST APIs / JSON / Secure API Design</li>
                    <li>SQL & NoSQL Concepts</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">Core Competencies</h2>
                <ul>
                    <li>Full-Stack Application Development</li>
                    <li>AI/ML Integration & LLM-Based Systems</li>
                    <li>System Design & Architecture</li>
                    <li>Problem Solving, Debugging & Optimization</li>
                    <li>Agile & Team-Based Development</li>
                    <li>Technical Leadership & Project Execution</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">Tools & Platforms</h2>
                <ul>
                    <li>Firebase / Google Cloud Platform / Azure</li>
                    <li>Git / GitHub / CI/CD Pipelines</li>
                    <li>TensorFlow / Scikit-learn / Pandas / NumPy</li>
                    <li>OpenAI & Google Gemini APIs / Pinecone</li>
                    <li>VS Code / Jupyter Notebook</li>
                    <li>Figma / Framer Motion</li>
                </ul>
            </div>
        </div>
    );
}

export default GridFour;