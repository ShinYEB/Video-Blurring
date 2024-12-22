import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate, useLocation  } from "react-router-dom";
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
            height: '870px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '1%',
            outline: 'none',
            padding: '2%',
            zIndex:20,
        }
    }

    const dataToSend = {
        video_title: "",
        video_path: "/public/video.mp4"
    };


    const location = useLocation();
    const { token } = location.state || {}; // 전달된 값 받기
    
    const navigate = useNavigate();

    const [isLogin, setLogin] = useState(false)
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [videoName, setVideoName] = useState("Sample Video 4");  

    const [videoFile, setVideoFile] = useState(null);
    const fileInputRef = useRef(null);

    const [parameter1, setParameter1] = useState(0)
    const [parameter2, setParameter2] = useState(0)

    const handleButtonClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력 클릭
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const videoUrl = URL.createObjectURL(file); // 업로드된 동영상 URL 생성
        setVideoFile(videoUrl); // 동영상 파일 저장
        }
    };

    useEffect(() => {
        if (token) {
            setLogin(true)
        }
    }, []);
    
    return <div className={ModuleStyle.pageStyle}>
        <header className="header">
        <h1 className="logo">Video Blurring Website</h1>
        <nav className="nav">
            <a href="/" className="nav-item">Main Page</a>
            {(isLogin) && <a href="/mypage" className="nav-item">My Page</a>}
            {(!isLogin) && <a href="/login" className="nav-item">Log In</a>}
            {(isLogin) && <a href="/home" className="nav-item">Log out</a>}
            </nav>
       </header>

        <section className="hero">
            <div className="hero-content">
                <h2>Video Blurring Made Easy</h2>
                <p>Edit and blur videos effortlessly with intuitive controls.</p>
                {(isLogin) && <button className="cta-button" onClick={() => setUploadModal(true)}>Upload Video</button>}
                {(!isLogin) && <button className="cta-button" onClick={() => navigate("\login")}>Get Started</button>}
            </div>
            <div className="hero-image"></div>
        </section>

        {(isLogin) && <section className="video-library">
            <h2>Video Library</h2>
            <div className="video-grid">
                <button className="video-button" onClick={() => {dataToSend.video_title="Sample video1"; navigate("/video", {state: dataToSend})}}>
                    <div className="video-item" style={{display:"flex"}}>
                        <div className="thumbnail">thumbnail</div>
                        <div style={{marginLeft:"20px"}}>
                            <h2 style={{textAlign:"left", marginTop:"20px"}}>Sample video1</h2>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>00 : 05 : 00</h3>
                            <h3 style={{textAlign:"left", marginTop:"90px"}}>upload : 24.12.22</h3>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>last update : 24.12.22</h3>
                        </div>
                    </div>
                </button>
                <button className="video-button" onClick={() => {dataToSend.video_title="Sample video2"; navigate("/video", {state: dataToSend})}}>
                    <div className="video-item" style={{display:"flex"}}>
                        <div className="thumbnail">thumbnail</div>
                        <div style={{marginLeft:"20px"}}>
                            <h2 style={{textAlign:"left", marginTop:"20px"}}>Sample video2</h2>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>00 : 05 : 00</h3>
                            <h3 style={{textAlign:"left", marginTop:"90px"}}>upload : 24.12.22</h3>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>last update : 24.12.22</h3>
                        </div>
                    </div>
                </button>
                <button className="video-button" onClick={() => {dataToSend.video_title="Sample video3"; navigate("/video", {state: dataToSend})}}>
                    <div className="video-item" style={{display:"flex"}}>
                        <div className="thumbnail">thumbnail</div>
                        <div style={{marginLeft:"20px"}}>
                        <h2 style={{textAlign:"left", marginTop:"20px"}}>Sample video3</h2>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>00 : 05 : 00</h3>
                            <h3 style={{textAlign:"left", marginTop:"90px"}}>upload : 24.12.22</h3>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>last update : 24.12.22</h3>
                        </div>
                    </div>
                </button>
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
                <button className={ModuleStyle.cancelButton} onClick={() => {setUploadModal(false); setVideoFile(false);}}>X</button>                
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
                {!videoFile && (
                    <>
                    <button className={ModuleStyle.video} onClick={handleButtonClick}>
                        <h2 style={{marginTop:"220px"}}>Video Upload</h2> 
                    </button>
                    {/* 숨겨진 파일 입력 */}
                    <input
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    </>
                )}

                {videoFile && (
                <>
                    <div className="video-preview">
                        <video src={videoFile} controls width="400" />
                    </div>
                </>
                )}
                
                <div className={ModuleStyle.editOptionContainer}> 
                    <h3 style={{marginLeft:"20px"}}> Edit Options </h3> 
                    <h4 style={{marginLeft:"20px"}}>bluring Option</h4>
                    <div style={{display:"flex", marginTop:"-20px"}}>
                        <div style={{width:"35px", height:"35px", backgroundColor:"#7391c8", margin:"30px"}}>
                            <div className={ModuleStyle.editOption_gaussian} style={{}}></div>
                        </div>
                        
                        {/*<div className={ModuleStyle.editOption_mozaik}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"white", border:"1px solid black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"gray"}}></div>*/}
                    </div>    
                    {/*<h4 style={{marginLeft:"20px"}}>Yolo Option</h4>
                    <h5 style={{marginLeft:"20px"}}>parameter1</h5>
                    <input style={{marginLeft:"20px"}} 
                    type="range" min={0} max={1} color="gray" step={0.02} value={parameter1} onChange={(event) => { setParameter1(event.target.valueAsNumber); }}/>
                    {parameter1}
                    <h5 style={{marginLeft:"20px"}}>parameter2</h5>
                    <input style={{marginLeft:"20px"}}  
                    type="range" min={0} max={1} color="gray" step={0.02} value={parameter2} onChange={(event) => { setParameter2(event.target.valueAsNumber); }}/>
                    {parameter2}
                    */}
                    <button className="edit-button">Save and Apply</button>
                </div>

            </div>
        </Modal>}
    </div>        
}

export default MainViewController