import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css"

function MypageViewController() {

    return <div className={ModuleStyle.contentPageStyle}>
        <div className={ModuleStyle.images}>
            identifier persons<br/>
            person1
            <div style={{display:"flex"}}>
                <div className={ModuleStyle.imageCellStyle}>person1 image1</div>
                <div className={ModuleStyle.imageCellStyle}>person1 image2</div>
                <div className={ModuleStyle.imageCellStyle}>person1 image3</div>
                <div className={ModuleStyle.imageCellStyle}>person1 image4</div>
                <button className={ModuleStyle.videoPlusButton}> Image Add Button </button>
            </div>
            person2
            <div style={{display:"flex"}}>
                <div className={ModuleStyle.imageCellStyle}>person2 image1</div>
                <button className={ModuleStyle.videoPlusButton}> Image Add Button </button>
            </div>
        </div>

        <div className={ModuleStyle.mypageInfo}>
            <text>Mypage<br/></text>
            <text>NickName : user nickname nickname Edit button<br/></text>
            <text>id : qwer1234<br/></text>
            <text>pw : ******* password edit button<br/></text>
            <text>logout button withdraw button<br/></text>
        </div>
    </div>
}

export default MypageViewController