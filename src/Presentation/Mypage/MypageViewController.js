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

    const network = new Network()
    const location = useLocation();

    const { token } = location.state || {}
    const [isModalOpen, setModal] = useState(false)
    const [name, setName] = useState("Name");  
    const [peopleList, setPeopleList] = useState([])
    const [isPeopleList, setIsPeopleList] = useState(false)

    const getPeopleList = async () => {
        try{
            const response = await network.get_with_token("/api/people", token)
            if(response.code == "200") {
               setPeopleList(response.data)
               setIsPeopleList(true)
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    useState(() => {
        if (token) {

        }
    }, [])

    return <div className={ModuleStyle.contentPageStyle}>
        <header className="header">
        <h1 className="logo"></h1>
        <nav className="nav">
            <a href="/" className="nav-item">Main Page</a>
            <a href="/mypage" className="nav-item">My Page</a>
            </nav>
       </header>

       <h2 style={{marginTop:"100px", marginLeft:"270px"}}>Mypage</h2>

        <div style={{marginLeft:"270px"}}>
            <h3>블러 대상 관리</h3>
            <div style={{display:"flex", marginLeft:"-20px"}}>
                {(isPeopleList) && peopleList.map((people) => (
                    <div>
                        <button className={ModuleStyle.imageCellStyle} onClick={() => {setModal(true)}}>Person1 Image</button>
                        <h5 style={{textAlign:"center", marginTop:"10px", marginLeft:"20px"}}>Person1</h5>
                    </div>
                ))}
            </div>


            <h3 style={{marginTop:"50px"}}>내 정보</h3>

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
                <button className={ModuleStyle.cancelButton} onClick={() => {setModal(false);}}>X</button>                
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
                <div style={{display:"flex"}}>
                    <button className={ModuleStyle.imageCellStyle}>Person1 Image1</button>
                    <button className={ModuleStyle.imageDeleteButton}>X</button>
                </div>
                <div style={{display:"flex"}}>
                    <button className={ModuleStyle.imageCellStyle}>Person1 Image2</button>
                    <button className={ModuleStyle.imageDeleteButton}>X</button>
                </div>
                <div style={{display:"flex"}}>
                    <button className={ModuleStyle.imageCellStyle}>Person1 Image3</button>
                    <button className={ModuleStyle.imageDeleteButton}>X</button>
                </div>
                <div style={{display:"flex"}}>
                    <button className={ModuleStyle.imageCellStyle}>Person1 Imag4</button>
                    <button className={ModuleStyle.imageDeleteButton}>X</button>
                </div>
            </div>

            <div style={{display:"flex", margin:"auto", marginTop:"60px", width:"400px"}}>
                <button className="edit-button" style={{backgroundColor:"#d19c97"}}>Delete</button>
                <button className="edit-button">Save</button>
            </div>
        </Modal>}
    </div>
}

export default MypageViewController