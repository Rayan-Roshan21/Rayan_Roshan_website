import React from "react";
import "./GridFour.css"

function GridFour() {
    return (
        <div className="grid-four-container">
            <div className="grid-box">
                <h2 className="Grid-title">Technical Skills</h2>
                <ul>
                    <li>JavaScript / TypeScript / Python / Java / Swift / C / Bash</li>
                    <li>React.js / Next.js / Node.js / Flask</li>
                    <li>HTML5 / CSS3 / Responsive Web Design</li>
                    <li>Data Structures & Algorithms / Object-Oriented Programming</li>
                    <li>REST APIs / JSON / Secure API Design</li>
                    <li>SQL / MongoDB / NoSQL Concepts</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">AI & Systems</h2>
                <ul>
                    <li>RAG pipelines: chunking, embeddings, vector search, reranking</li>
                    <li>LLM orchestration & model routing across OpenAI and Gemini</li>
                    <li>Passwordless auth: email OTP, short-lived JWTs</li>
                    <li>Serverless deployment: Vercel functions, Railway persistent processes</li>
                    <li>CI/CD and environment-specific configuration</li>
                    <li>Technical leadership: architecture, roadmaps, code review</li>
                </ul>
            </div>
            <div className="grid-box">
                <h2 className="Grid-title">Tools & Platforms</h2>
                <ul>
                    <li>Firebase / Google Cloud Platform / Azure</li>
                    <li>Git / GitHub / CI/CD Pipelines</li>
                    <li>TensorFlow / Scikit-learn / Pandas / NumPy</li>
                    <li>OpenAI & Google Gemini APIs / Pinecone</li>
                    <li>Vercel / Railway / Resend</li>
                    <li>VS Code / Figma / Framer Motion</li>
                </ul>
            </div>
        </div>
    );
}

export default GridFour;