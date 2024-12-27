import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css";
import '../../App.css';
import Network from "../../Domain/Network/Network";

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
            height: '880px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '1%',
            outline: 'none',
            padding: '2%',
            zIndex:20,
        }
    }

    const AddPeopleModalstyle = {
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
            width: '750px',
            height: '645px',
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

    const dataToSend = {
        video_title: "",
        video_path: "/public/video.mp4"
    };

    const network = new Network()
    const location = useLocation();
    const { token, peoples } = location.state || {}; // 전달된 값 받기
    
    const navigate = useNavigate();

    const [isLogin, setLogin] = useState(false)
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [videoName, setVideoName] = useState("Video Title");  

    const [videos, setVideos] = useState([]);
    const [isVideo, setIsVideo] = useState(false);

    const [videoFile, setVideoFile] = useState(null);
    const [faceImages, setFaceImages] = useState([]);
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);

    const [parameter1, setParameter1] = useState(0)
    const [parameter2, setParameter2] = useState(0)

    const [imageList, setImageList] = useState([])
    const [isAddImage, setIsAddImage] = useState(false)

    const [peopleList, setPeopleList] = useState([])

    const [name, setName] = useState("Name");  
    const [isAddModalOpen, setAddModal] = useState(false)

    const [person1, setperson1] = useState(false)
    const [person2, setperson2] = useState(false)
    const [person3, setperson3] = useState(false)
    const [person4, setperson4] = useState(false)
    const [person5, setperson5] = useState(false)

    const pl = [person1, person2, person3, person4, person5]
    const sl = [setperson1, setperson2, setperson3, setperson4, setperson5]

    const [button1, setbutton1] = useState(false)
    const [button2, setbutton2] = useState(true)
    const [button3, setbutton3] = useState(false)

    const [showTooltip, setShowTooltip] = useState(false);


    const [uploadingtime, setUploadtime] = useState(false)
    const [edittime, setEdittime] = useState(false)
    const [canDownload, setCanDownload] = useState(false)

    const [isDownloadModalOpen, setDownloadModal] = useState(false)

    const handleButtonClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력 클릭
    };

    const handleButtonClick2 = () => {
        fileInputRef2.current.click(); // 숨겨진 파일 입력 클릭
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const videoUrl = URL.createObjectURL(file); // 업로드된 동영상 URL 생성
        setVideoFile(videoUrl); // 동영상 파일 저장
        }
    };

    const handleFileChangeImage = (event) => {
        const files =  Array.from(event.target.files);
        const newFile = files.map((file) => URL.createObjectURL(file));
        if (newFile) {
            console.log("선택된 파일:", newFile);
            setImageList(newFile)       
            setIsAddImage(true)
        }
    };

    const handleDownload = async (video) => {
        console.log(video)
            try {
              const response = await fetch(video.dl);
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


    const loadVideo = async () => {
        try{
            const response = await network.get_with_token("/api/video", token)
            if(response.code == "200") {
               setVideos(response.data)
               setIsVideo(true)
               console.log(response.data)
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    const videoUpload = async () => {
        try{
            const formData = new FormData();
            
            if (videoFile) {
                formData.append('video_file', videoFile); // 'video_file' 필드 이름
            }

            faceImages.forEach((file, index) => {
                formData.append('face_images', file); // 'face_images' 필드 이름
            });


            const response = await network.post_multi(formData,"/api/video/video-blur", token)

            if (response.message == "Video processed successfully") {
                alert("업로드 성공!")
                setUploadModal(false)
            }
            else {
                alert("업로드 실패")
            }
        } catch (error) {
            console.error('Error :', error)
        }

    }

    useEffect(() => {
        if (token) {
            setLogin(true)
            //loadVideo()
            setVideos([{"title":"Video", "id":1, "video_file":"https://drive.google.com/file/d/10P_jUe3P8aY66F04CUbAWxJQ3BxXu9gT/preview", "download":"https://a2b1.s3.us-east-1.amazonaws.com/processed_videos/ex1.mp4", "dl":"https://a2b1.s3.us-east-1.amazonaws.com/processed_videos/output_with_audio.mp4","dl2":"https://a2b1.s3.us-east-1.amazonaws.com/processed_videos/blur12.mp4","created_at": "2024-12-25T18:45:44.610474+09:00"}])
            setIsVideo(true)
            setPeopleList(peoples)
        }
    }, []);
    
    return <div className={ModuleStyle.pageStyle}>
        <header className="header">
        <h1 className="logo"></h1>
        <nav className="nav">
            <a href="/" className="nav-item">Main Page</a>
            {(isLogin) && <Link to="/mypage" className="nav-item" state={{token:token, peoples:peopleList}}>My Page</Link>}
            {(!isLogin) && <Link to="/login" className="nav-item">Log In</Link>}
            {(isLogin) && <Link to="/home" className="nav-item">Log out</Link>}
            </nav>
       </header>

        <section className="hero">
            <div className="hero-content">
                <h2>Video Blurring Made Easy</h2>
                <p> 동영상을 쉽게 편집하고 블러를 추가하세요.</p>
                {(isLogin) && <button className="cta-button" onClick={() => setUploadModal(true)}>Upload Video</button>}
                {(!isLogin) && <button className="cta-button" onClick={() => navigate("\login")}>Get Started</button>}
            </div>
            <div className="hero-image"></div>
        </section>

        {(isLogin) && <section className="video-library">
            <h2>Video Library</h2>
            <div className="video-grid">
                {(isVideo) && videos.map((video) => (
                <button className="video-button" onClick={() => {dataToSend.video_title="Sample video1"; navigate("/video", {state: {"video":video, "token":token, "peoples":peopleList}})}}>
                    <div className="video-item" style={{display:"flex"}}>
                        <video src={video.video_file} style={{width:"300px", height:"230px"}} />
                        <div style={{marginLeft:"20px"}}>
                            <h3 style={{textAlign:"left", marginTop:"20px"}}>{video.title}</h3>
                            <h3 style={{textAlign:"left", marginTop:"-10px"}}>00 : 00 : 17</h3>
                            <h3 style={{textAlign:"left", marginTop:"140px"}}>upload : {video.created_at.substr(0, 10)}</h3>
                        </div>
                    </div>
                </button>))}
            </div>
        </section>}
        
        {/*<section className="video-library">
            <h2>Try Video Edit</h2>
        </section>*/}

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
                <button className={ModuleStyle.cancelButton} onClick={() => {setShowTooltip(false); setUploadModal(false); setVideoFile(false);}}>X</button>                
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
            
            <h4 >블러 제외 선택</h4>
            <div style={{display:"flex", height:"180px"}}>
                {peopleList.map((people, index) => (<div>
                    
                    {(pl[index]) && <div style={{border:"1px solid blue", width:"120px", height:"120px", borderRadius:"5%", marginLeft:"10px"}}>
                    <button className={ModuleStyle.imageCellStyle} style={{marginLeft:"0px"}} onClick={() => {sl[index](false)}}><img src={people.img} style={{width:"100px", height:"105px"}}/></button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>{people.name}</h5>
                    </div>}
                    {(!pl[index]) && <div style={{border:"1px solid white", width:"120px", height:"120px", borderRadius:"5%", marginLeft:"10px"}}>
                        <button className={ModuleStyle.imageCellStyle} style={{marginLeft:"0px"}} onClick={() => {sl[index](true)}}><img src={people.img} style={{width:"100px", height:"105px"}}/></button>
                        <h5 style={{textAlign:"center", marginTop:"10px"}}>{people.name}</h5>
                    </div>}
                </div>))}
                
                
                <button className={ModuleStyle.personAddButton} style={{backgroundImage:"/public/", width:"50px", height:"50px", marginTop:"35px"}}  onClick={() => {setAddModal(true)}}></button>
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
                        <video src={videoFile} controls width="400"  style={{width:"700px", height:"450px"}}/>
                    </div>
                </>
                )}
                
                <div className={ModuleStyle.editOptionContainer}> 
                    <h3 style={{marginLeft:"20px"}}> Edit Options </h3> 
                    <h4 style={{marginLeft:"20px"}}>bluring Option</h4>
                    <div style={{display:"flex", marginTop:"-20px"}}>
                        <div style={{width:"35px", height:"35px", margin:"20px"}}>
                            <div className={ModuleStyle.editOption_gaussian} style={{}}></div>
                        </div>
                        
                        {/*<div className={ModuleStyle.editOption_mozaik}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"white", border:"1px solid black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"black"}}></div>
                        <div className={ModuleStyle.editOption} style={{backgroundColor:"gray"}}></div>*/}
                    </div>    
                    <div style={{display:"flex"}}>
                        <h4 style={{marginLeft:"20px"}}>얼굴 인식 강도</h4>
                        <button onClick={() => {setShowTooltip(!showTooltip)}} style={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"white", marginTop:"25px", marginLeft:"10px"}} ><p style={{marginTop:"-2px", marginLeft:"-4px"}}>?</p></button>
                    </div>
                    <div style={{display:"flex", marginLeft:"20px", marginTop:"-20px"}}>
                        <div>
                            <p>약</p>
                            {(button1) && <button onClick={() => {setbutton1(false); setbutton2(false); setbutton3(false);}} style={{width:"70px", height:"30px", backgroundColor:"#a47864", border:"1px solid gray", borderRadius:"10%"}}></button>}
                            {(!button1) && <button onClick={() => {setbutton1(true); setbutton2(false); setbutton3(false);}} style={{width:"70px", height:"30px", backgroundColor:"white", border:"1px solid gray", borderRadius:"10%"}}></button>}
                        </div>
                        <div style={{marginLeft:"5px", marginTop:"53px"}}>
                            {(button2) && <button onClick={() => {setbutton1(false); setbutton2(true); setbutton3(false);}} style={{width:"70px", height:"30px", backgroundColor:"#a47864", border:"1px solid gray", borderRadius:"10%"}}></button>}
                            {(!button2) && <button onClick={() => {setbutton1(false); setbutton2(true); setbutton3(false);}} style={{width:"70px", height:"30px", backgroundColor:"white", border:"1px solid gray", borderRadius:"10%"}}></button>}
                        </div>
                        <div style={{marginLeft:"5px"}}>
                            <p style={{marginLeft:"45px"}}>강</p>
                            {(button3) && <button onClick={() => {setbutton1(false); setbutton2(false); setbutton3(true);}} style={{width:"70px", height:"30px", backgroundColor:"#a47864", border:"1px solid gray", borderRadius:"10%"}}></button>}
                            {(!button3) && <button onClick={() => {setbutton1(false); setbutton2(false); setbutton3(true);}} style={{width:"70px", height:"30px", backgroundColor:"white", border:"1px solid gray", borderRadius:"10%"}}></button>}
                        </div>
                        
                    </div>
                    <div style={{display:"flex", marginTop:"-20px"}}>
                        
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

                    {(!canDownload) && <div>
                    {(!edittime) && <button className="edit-button2" onClick={() => 
                    {setUploadtime(true); setTimeout(() => {setVideos([...videos, { 
                        title: name,
                        id: 1, 
                        video_file: videoFile, 
                        created_at: "2024-12-27T18:45:44.610474+09:00",
                        dl2: "https://a2b1.s3.us-east-1.amazonaws.com/processed_videos/output_with_audio.mp4"
                        }]);
                        alert("업로드 되었습니다."); setUploadtime(false); setEdittime(true); setShowTooltip(false);}, 7000); ; }} 
                        
                        style={{height:"50px"}}>
                            {(uploadingtime) && <div className="spinner"></div>}
                            {(!uploadingtime) && <div style={{height:"28px"}}/>}
                            <p style={{marginTop:"-25px"}}>업로드</p>
                        </button>}

                    {(edittime) && <button className="edit-button2" onClick={() => 
                    {setUploadtime(true); setTimeout(() => {
                        setCanDownload(true); setShowTooltip(false); }, 20000); ; }} 
                        
                        style={{height:"50px"}}>
                            {(uploadingtime) && <div className="spinner"></div>}
                            {(!uploadingtime) && <div style={{height:"28px"}}/>}
                            <p style={{marginTop:"-25px"}}>블러링 처리</p>
                        </button>}
                    </div>}
                    
                    {(canDownload) && <button className="edit-button2" onClick={() => 
                    {setDownloadModal(true);setShowTooltip(false);  }} 
                        
                        style={{height:"50px"}}>
                            <div style={{height:"28px"}}/>
                            <p style={{marginTop:"-25px"}}>다운로드</p>
                        </button>}

                </div>

            </div>
        </Modal>}

        {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: "72.7%",
            transform: "translateX(-50%)",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
            whiteSpace: "nowrap",
          }}
        >
            강: 영상에서 추출한 얼굴이면 좋아요 <br/>
            중: 등록사진과 영상 사진의 얼굴이 달라도 괜찮아요 <br/>
            약: 조명과 안경 유무에도 유연해요 <br/>
        </div>
      )}

      {(isAddModalOpen) && <Modal style={AddPeopleModalstyle} isOpen={isAddModalOpen}>
            <div style={{display:"flex"}}>
                <h1 style={{marginTop:"-10px"}}>블러 대상 추가</h1>
                <button className={ModuleStyle.cancelButton} onClick={() => {setImageList([]); setAddModal(false);}}>X</button>                
            </div>

            <div className="video-name">
                <label htmlFor="video-name-input" className="video-name-label">Name:</label>
                <input
                    type="text"
                    id="video-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="video-name-input"
                />
            </div>
            <h3>Images</h3>
            <div style={{width:"750px", height:"400px", display:"flex", marginLeft:"-15px"}}>
                {(isAddImage) && imageList.map((image) => (<div style={{border:"1px solid gray", borderRadius:"5%", width:"110px", height:"110px", paddingLeft:"5px", paddingTop:"5px", marginTop:"15x", marginLeft:"15px"}}>
                        <img src={image} style={{ width: "100px", height:"100px" }} />
                    </div>
                ))}
            </div>
            <div style={{display:"flex", margin:"auto", marginTop:"-200px", width:"400px"}}>
                <button className="edit-button" style={{backgroundColor:"#f1e9df", color:"gray"}} onClick={handleButtonClick2}>이미지 추가</button>
                <input
                    type="file"
                    accept="image/*"
                    multiple 
                    ref={fileInputRef2}
                    style={{ display: "none" }}
                    onChange={handleFileChangeImage}
                />
                <button className="edit-button" onClick={() => {  setPeopleList([...peopleList, { 
                        name: name,
                        img: imageList[0]
                        }]); alert("추가했습니다!"); setAddModal(false)}}>저장</button>
            </div>
        </Modal>}

        {(isDownloadModalOpen) && <Modal style={downloadModalstyle} isOpen={isDownloadModalOpen}>
            <div style={{display:"flex"}}>
                <h1 style={{marginTop:"-10px"}}>Download</h1>
                <button className={ModuleStyle.cancelButton} onClick={() => {setDownloadModal(false);}}>X</button>                
            </div>

            <div className="video-preview" style={{marginLeft:"90px", marginTop:"50px"}}>
                <video src={videos[0].dl} controls width="400" />
            </div>

                     
        
        </Modal>}
    </div>        
}

export default MainViewController