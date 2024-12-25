import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css";
import '../../App.css';
import Network from "../../Domain/Network/Network";

function JoinViewController() {


    const [ID, setID] = useState("")
    const [PW, setPW] = useState("")

    const dataToSend = {
        token: "loginToken"
    };

    const saveID = event => {
        setID(event.target.value);
    };

    const savePW = event => {
        setPW(event.target.value);
    };

    const navigate = useNavigate();
    const network = new Network()

    const registering = () => {
        let data = {"username":ID, "password":PW}
        network.post(data, "/api/auth/register")
    }

    return <div className={ModuleStyle.pageStyle}>
        <header className="header">
        <h1 className="logo"></h1>
        <nav className="nav">
            <a href="/" className="nav-item">Main Page</a>
            <a href="/mypage" className="nav-item">My Page</a>
            <a href="#video-editing" className="nav-item">Video Editing</a>
            </nav>
       </header>

        <div style={{margin:"auto", marginTop:"300px", display:"table"}}>
                <div style={{display:"table-cell", verticalAlign:"middle"}}>
                    <h2  onClick={() => {navigate("/")}}> 회원가입 </h2>
                    <div style={{marginTop:"-20px"}}>
                        <div>
                            <input className={ModuleStyle.inputBox} placeholder="   아이디" onChange={saveID}/><p style={{height:"0px"}}/>
                            <input type="password" style={{marginTop:"0px"}} className={ModuleStyle.inputBox} placeholder="   비밀번호" onChange={savePW}/>
                        </div>
                        <button className="edit-button" style={{marginTop:"20px"}} onClick={() => {registering()}}>회원가입</button>
                    </div>
                </div>
            </div>
    </div>
}

export default JoinViewController;