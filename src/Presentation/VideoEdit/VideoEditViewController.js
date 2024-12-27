import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css"

function VideoEditViewController() {

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

    const downloadModalstyle = {
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
            width: '900px',
            height: '720px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '1%',
            outline: 'none',
            padding: '2%',
            zIndex:20,
        }
    }

    const [videoFile, setVideoFile] = useState(null);
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [isDownloadModalOpen, setDownloadModal] = useState(false)


    const location = useLocation();
    const { video, token } = location.state || {}; // 전달된 값 받기

    const handleDownload = async () => {
        console.log(video.video_file)
        try {
          const response = await fetch(video.video_file);
          const blob = await response.blob();
    
          // Blob URL 생성
          const blobUrl = URL.createObjectURL(blob);
    
          // 임시 링크 생성 후 다운로드
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = "video.mp4"; // 저장될 파일 이름
          document.body.appendChild(link);
          link.click();
    
          // 링크 제거 및 Blob URL 해제
          link.remove();
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error("Download failed:", error);
        }
      };

    useState(() => {
        
    }, [])

    return <div className={ModuleStyle.contentPageStyle}>
        <header className="header">
        <h1 className="logo"></h1>
        <nav className="nav">
           <Link to="/" className="nav-item" state={{token:token}}>main Page</Link>
            <Link to="/mypage" className="nav-item" state={{token:token}}>My Page</Link>
            <Link to="/home" className="nav-item">Log out</Link>
        </nav>
       </header>

       <h2 style={{marginTop:"100px", marginLeft:"180px"}}>Video</h2>
       <div className="video-preview" style={{margin:"auto"}}>
            <video src={video.video_file} controls width="400" />
        </div>
        {(false) && <button className="cta-button" style={{marginLeft:"480px", marginTop:"30px"}} onClick={() => setUploadModal(true)}>  Video Edit </button>}    
        <h2 style={{marginTop:"100px", marginLeft:"190px"}}>Video Download</h2>
        
        <div style={{marginLeft:"180px", display:"flex"}}>
            <button className="thumbnail" onClick={() => {setDownloadModal(true)}}>
                <video src={video.video_file} style={{width:"275px", height:"200px"}}/>
            </button>
        </div>


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
                video.video_title
            </div>
            
            <h4>블러 제외 선택</h4>
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
                
                
                <div className="video-preview">
                    <video src={video.video_file} controls width="400" />
                </div>
                
                
                
                <div className={ModuleStyle.editOptionContainer}> 
                    <h3 style={{marginLeft:"20px"}}> Edit Options </h3> 
                    <h4 style={{marginLeft:"20px"}}>bluring Option</h4>
                    <div style={{display:"flex", marginTop:"-20px"}}>
                        <div className={ModuleStyle.editOption_gaussian} style={{marginTop:"20px", marginLeft:"20px"}}></div>
                    </div>    
    
                    <button className="edit-button" style={{marginTop:"280px"}}>저장</button>
                </div>

            </div>
        </Modal>}

        {(isDownloadModalOpen) && <Modal style={downloadModalstyle} isOpen={isDownloadModalOpen}>
            <div style={{display:"flex"}}>
                <h1 style={{marginTop:"-10px"}}>Download</h1>
                <button className={ModuleStyle.cancelButton} onClick={() => {setDownloadModal(false);}}>X</button>                
            </div>

            <div className="video-preview" style={{marginLeft:"90px", marginTop:"50px"}}>
                <video src={video.video_file} controls width="400" />
            </div>

            <button className="edit-button" style={{marginTop:"30px", width:"250px", height:"55px", marginTop:"70px", marginLeft:"330px"}} onClick={handleDownload}>download</button>                
        
        </Modal>}
    
    </div>
}

export default VideoEditViewController