import React, { useEffect } from "react";
import { useNavigate  } from "react-router-dom";
function LogoutViewController() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
    }, []);


    return <div>

    </div>
}

export default LogoutViewController;