import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css";
import '../../App.css';

function MainViewController() {

    const uploadModalstyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0, 
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex:15
        },
        content: {
            position: 'absolute',
            width: '1000px',
            height: '860px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '1%',
            outline: 'none',
            padding: '2%',
            zIndex:20,
        }
    }



    const [isLogin, setLogin] = useState(false)
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [videoName, setVideoName] = useState("Sample Video 4");  
    const [parameter1, setParameter1] = useState(0)
    const [parameter2, setParameter2] = useState(0)

    return <div className={ModuleStyle.pageStyle}>
        <header className="header">
        <h1 className="logo">Video Blurring Website</h1>
        <nav className="nav">
            <a href="#main" className="nav-item">Main Page</a>
            <a href="#my-page" className="nav-item">My Page</a>
            <a href="#video-editing" className="nav-item">Video Editing</a>
            </nav>
       </header>

        <section className="hero">
            <div className="hero-content">
                <h2>Video Blurring Made Easy</h2>
                <p>Edit and blur videos effortlessly with intuitive controls.</p>
                {(isLogin) && <button className="cta-button" onClick={() => setUploadModal(true)}>Upload Video</button>}
                {(!isLogin) && <button className="cta-button" onClick={() => setLogin(true)}>Get Started</button>}
            </div>
            <div className="hero-image"></div>
        </section>

        {(isLogin) && <section className="video-library">
            <h2>Video Library</h2>
            <div className="video-grid">
                <div>
                    <div className="video-item">
                        <p>thumnail</p>
                    </div>
                    <h4 style={{textAlign:"center", marginTop:"10px"}}>Sample video1</h4>
                </div>
                <div>
                    <div className="video-item">
                        <p>thumnail</p>
                    </div>
                    <h4 style={{textAlign:"center", marginTop:"10px"}}>Sample video2</h4>
                </div>
                <div>
                    <div className="video-item">
                        <p>thumnail</p>
                    </div>
                    <h4 style={{textAlign:"center", marginTop:"10px"}}>Sample video3</h4>
                </div>
            </div>
        </section>}
        
        <section className="video-library">
            <h2>Try Video Edit</h2>
        </section>

        <footer className="footer">
            <div className="footer-content">
                <div className="footer-info">
                    <h2>Video Blurring Website</h2>
                    <p>
                    Edit videos, apply blur effects, and manage your account seamlessly.
                    </p>
                </div>
                <div className="footer-navigation">
                    <h3>Navigation</h3>
                    <ul>
                    <li>Main Page</li>
                    <li>My Page</li>
                    <li>Video Editing</li>
                    </ul>
                </div>
            </div>
        </footer>

        {(isUploadModalOpen) && <Modal style={uploadModalstyle} isOpen={isUploadModalOpen}>
            <div style={{display:"flex"}}>
                <h1 style={{marginTop:"-10px"}}>Video Upload</h1>
                <button className={ModuleStyle.cancelButton} onClick={() => setUploadModal(false)}>X</button>                
            </div>
            
            <div className="video-name">
                <label htmlFor="video-name-input" className="video-name-label">Video Name:</label>
                <input
                    type="text"
                    id="video-name-input"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    className="video-name-input"
                />
            </div>
            
            <h3>Blur Select</h3>
            <div style={{display:"flex"}}>
                <div>
                    <button className={ModuleStyle.imageCellStyle}>Person1 Image</button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>Person1</h5>
                </div>
                <div>
                    <button className={ModuleStyle.imageCellStyle}>Person2 Image</button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>Person2</h5>
                </div>
                <div>
                    <button className={ModuleStyle.imageCellStyle}>Person3 Image</button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>Person3</h5>
                </div>
                <div>
                    <button className={ModuleStyle.imageCellStyle}>Person4 Image</button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>Person4</h5>
                </div>
            </div>

            <h3>Video</h3>
            <div style={{display:"flex", marginTop:"-30px"}}>
                <button className={ModuleStyle.video}> 
                    <h2 style={{marginTop:"220px"}}>Video Upload</h2> 
                </button>

                <div className={ModuleStyle.editOptionContainer}> 
                    <h3 style={{marginLeft:"20px"}}> Edit Options </h3> 
                    <h4 style={{marginLeft:"20px"}}>bluring Option</h4>
                    <div style={{display:"flex", marginTop:"-20px"}}>
                        <div className={ModuleStyle.editOption_gaussian}></div>
                        <div className={ModuleStyle.editOption_mozaik}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"white", border:"1px solid black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"gray"}}></div>
                    </div>    
                    <h4 style={{marginLeft:"20px"}}>Yolo Option</h4>
                    <h5 style={{marginLeft:"20px"}}>parameter1</h5>
                    <input style={{marginLeft:"20px"}} 
                    type="range" min={0} max={1} color="gray" step={0.02} value={parameter1} onChange={(event) => { setParameter1(event.target.valueAsNumber); }}/>
                    {parameter1}
                    <h5 style={{marginLeft:"20px"}}>parameter2</h5>
                    <input style={{marginLeft:"20px"}}  
                    type="range" min={0} max={1} color="gray" step={0.02} value={parameter2} onChange={(event) => { setParameter2(event.target.valueAsNumber); }}/>
                    {parameter2}
                    <button className="edit-button">Save and Apply</button>
                </div>

            </div>
        </Modal>}
    </div>        
}

export default MainViewController