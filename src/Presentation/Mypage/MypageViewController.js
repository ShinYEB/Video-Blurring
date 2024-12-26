import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css"
import Network from "../../Domain/Network/Network";

function MypageViewController() {

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
    

    const network = new Network()
    const location = useLocation();

    const { token } = location.state || {}
    const [isModalOpen, setModal] = useState(false)
    const [isAddModalOpen, setAddModal] = useState(false)
    const [name, setName] = useState("Name");  
    const [peopleList, setPeopleList] = useState([{"name":"한지민", "img":`${process.env.PUBLIC_URL}/HJM.png`}])
    const [isPeopleList, setIsPeopleList] = useState(false)
    const [imageList, setImageList] = useState([])
    const [isImageList, setIsImageList] = useState(false)

    const [addImageList, setAddImageList] = useState([])
    const [isAddImage, setIsAddImage] = useState(false)

    const [person1, setperson1] = useState(false)
    const [person2, setperson2] = useState(false)
    const [person3, setperson3] = useState(false)
    const [person4, setperson4] = useState(false)
    const [person5, setperson5] = useState(false)

    const pl = [person1, person2, person3, person4, person5]
    const sl = [setperson1, setperson2, setperson3, setperson4, setperson5]


    const fileInputRef = useRef(null);
    
    const handleButtonClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력 클릭
    }

    const handleFileChange = (event) => {
        const files =  Array.from(event.target.files);
        const newFile = files.map((file) => URL.createObjectURL(file));
        if (newFile) {
            console.log("선택된 파일:", newFile);
            setImageList(newFile)       
            setIsAddImage(true)
        }
    };

    const handleFileChangeManage = (event) => {
        const files =  Array.from(event.target.files);
        const newFile = files.map((file) => URL.createObjectURL(file));
        if (newFile) {
            console.log("선택된 파일:", newFile);
            setImageList([...imageList, newFile])       
            setIsAddImage(true)
        }
    };

    const getPeopleList = async () => {
        try{
            const response = await network.get_with_token("/api/people", token)
            if(response.code == "200") {
                
                setPeopleList(response.data.people)
                setIsPeopleList(true)
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    const getImageList = async (id) => {
        console.log(peopleList)
        try{
            const response = await network.get_with_token("/api/photo/"+id, token)
            if(response.code == "200") {
                
                setImageList(response.data.image)
                setIsImageList(true)
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    const addPerson = async () => {
        const data = {
            "name": name
        }
        try{
            const response = await network.post_with_token(data, "/api/people/create", token)
            if(response.code == "200") {
                uploadImages()
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    const uploadImages = async () => {
        try{
            const formData = new FormData();

            imageList.forEach((file, index) => {
                formData.append('face_images', file); // 'face_images' 필드 이름
            });


            const response = await network.post_multi(formData,"/api/photo/add", token)

            if (response.message == "Video processed successfully") {
                alert("업로드 성공!")
                setModal(false)
            }
            else {
                alert("업로드 실패")
            }
        } catch (error) {
            console.error('Error :', error)
        }
    }
    

    useState(() => {
        if (token) {
            getPeopleList()
        }
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

       <h2 style={{marginTop:"100px", marginLeft:"270px"}}>Mypage</h2>

        <div style={{marginLeft:"270px"}}>
            <h3>블러 제외 대상 관리</h3>
            <div style={{backgroundColor:"#f1e9df", width:"550px", height:"80px", padding:"50px", borderRadius:"1%"}}>
            <h3 style={{marginLeft:"35px"}}>Tip : 정면1장 필수! 측면 사진을 더해주면 성능이 올라가요! </h3>
            </div>
            <div style={{display:"flex", marginTop:"20px"}}>
                {peopleList.map((people, index) => (<div>
                    
                    {(pl[index]) && <div style={{border:"1px solid blue", width:"120px", height:"120px", borderRadius:"5%", marginLeft:"10px"}}>
                    <button className={ModuleStyle.imageCellStyle} style={{marginLeft:"0px"}} onClick={() => {sl[index](false)}}><img src={people.img} style={{width:"100px", height:"105px"}}/></button>
                    <h5 style={{textAlign:"center", marginTop:"10px"}}>{people.name}</h5>
                    </div>}
                    {(!pl[index]) && <div style={{border:"1px solid white", width:"120px", height:"120px", borderRadius:"5%", marginLeft:"10px"}}>
                        <button className={ModuleStyle.imageCellStyle} style={{marginLeft:"0px"}} onClick={() => {sl[index](false)}}><img src={people.img} style={{width:"100px", height:"105px"}}/></button>
                        <h5 style={{textAlign:"center", marginTop:"10px"}}>{people.name}</h5>
                    </div>}
                </div>))}
                <button className={ModuleStyle.personAddButton} style={{backgroundImage:"/public/", width:"50px", height:"50px", marginTop:"35px"}} onClick={() => {setAddModal(true)}}></button>
            </div>


            <h3 style={{marginTop:"150px"}}>내 정보</h3>

            <h4>사용자 이름 : name </h4>

            <div style={{display:"flex"}}>
                <h4>비밀번호 : **** </h4>
                <button className="pw-edit-button"> edit </button>
            </div>
            <a href="/" className="nav-item" >회원탈퇴</a>

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


        {(isModalOpen) && <Modal style={uploadModalstyle} isOpen={isModalOpen}>
            <div style={{display:"flex"}}>
                <h1 style={{marginTop:"-10px"}}>Image Management</h1>
                <button className={ModuleStyle.cancelButton} onClick={() => {setImageList([]); setModal(false);}}>X</button>                
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
            <div style={{display:"flex", marginLeft:"-20px"}}>
                {(isImageList) && imageList.map((image) => (
                    <div style={{display:"flex"}}>
                        <button className={ModuleStyle.imageCellStyle}>
                            <img src={image} style={{ width: "100px", height:"100px" }} />
                        </button>
                        <button className={ModuleStyle.imageDeleteButton}>X</button>
                    </div>

                    
                ))}
                <button className={ModuleStyle.imageCellStyle} style={{width:"50px", height:"50px", marginTop:"35px"}} onClick={handleButtonClick}>Add</button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChangeManage}
                />
            </div>

            <div style={{display:"flex", margin:"auto", marginTop:"60px", width:"400px"}}>
                <button className="edit-button" style={{backgroundColor:"#d19c97"}}>삭제</button>
                <button className="edit-button">저장</button>
            </div>
        </Modal>}

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
                <button className="edit-button" style={{backgroundColor:"#f1e9df", color:"gray"}} onClick={handleButtonClick}>이미지 추가</button>
                <input
                    type="file"
                    accept="image/*"
                    multiple 
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <button className="edit-button" onClick={() => {  setPeopleList([...peopleList, { 
                        name: name,
                        img: imageList[0]
                        }]); alert("추가했습니다!"); setAddModal(false)}}>저장</button>
            </div>
        </Modal>}
    </div>
}

export default MypageViewController