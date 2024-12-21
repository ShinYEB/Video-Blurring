import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ModuleStyle from "../../ModuleStyle.module.css"

function VideoEditViewController() {

    return <div className={ModuleStyle.contentPageStyle}>
        Videos
        <div style={{display:"flex"}}>
            <div className={ModuleStyle.videoCellStyle}>Video 1 Select Button</div>
            <div className={ModuleStyle.videoCellStyle}>Video 2 Select Button</div>
            <div className={ModuleStyle.videoCellStyle}>Video 3 Select Button</div>
            <div className={ModuleStyle.videoCellStyle}>Video 4 Select Button</div>
            <button className={ModuleStyle.videoPlusButton}> Video Add Button </button>
        </div>

        Video
        <div style={{display:"flex"}}>
            <div className={ModuleStyle.video}> Upload Button & Video Preview </div>
            <div className={ModuleStyle.editOptionContainer}> Edit Options 
                <div className={ModuleStyle.editOption}>Option1</div>
                <div className={ModuleStyle.editOption}>Option2</div>
                <div className={ModuleStyle.editOption}>Option3</div>
                <div className={ModuleStyle.editOption}>...</div>
                
                <button className={ModuleStyle.editButton}>Edit Button</button>
            </div>
        </div>

        download
        <div style={{display:"flex", marginTop:"30px"}}>
            <div className={ModuleStyle.videoCellStyle}>Edited Video 1 Option1 download Button</div>
            <div className={ModuleStyle.videoCellStyle}>Edited Video 1 Option2 download Button</div>
            <div className={ModuleStyle.videoCellStyle}>Edited Video 1 Option3 download Button</div>
            <div className={ModuleStyle.videoCellStyle}>Edited Video 1 Option4 download Button</div>
        </div>
    </div>
}

export default VideoEditViewController