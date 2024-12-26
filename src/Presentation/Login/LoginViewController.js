import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css";
import '../../App.css';
import Network from "../../Domain/Network/Network";

function LoginViewController() {

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

    const network = new Network();
    const navigate = useNavigate();

    const logining = async () => {
        let data = {"username":ID, "password":PW}
        try{
            const response = await network.post(data, "/api/auth/login/")
        
            if(response) {
                console.log(response)
                dataToSend.token = response.access
                navigate("/", {state: dataToSend})
            }
            else {
                alert("로그인에 실패했습니다.")
            }
        } catch (error) {
            console.error('Error: ', error)
        }
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
                    <h2  onClick={() => {navigate("/")}}> Login </h2>
                    <div style={{marginTop:"-20px"}}>
                        <div>
                            <input className={ModuleStyle.inputBox} placeholder="   아이디" onChange={saveID}/><p style={{height:"0px"}}/>
                            <input type="password" style={{marginTop:"0px"}} className={ModuleStyle.inputBox} placeholder="   비밀번호" onChange={savePW}/>
                        </div>
                        <button className="edit-button" style={{marginTop:"20px"}} onClick={() => {logining()}}>로그인</button>
                    </div>
                    <div style={{display:"flex", marginTop:"10px"}}>
                    <nav className="nav" style={{margin:"auto"}}>
                        <a href="/" className="nav-item">비밀번호 찾기</a>
                        <a href="/register" className="nav-item">회원가입</a>               
                    </nav>
                    </div>
                </div>
            </div>
    </div>
}

export default LoginViewController;