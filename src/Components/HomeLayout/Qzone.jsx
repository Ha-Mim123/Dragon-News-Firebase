import React from 'react';
import swimmingImage from "../../assets/swimming.png"
import classImage from "../../assets/class.png"
import playGroundImg from "../../assets/playground.png"

const Qzone = () => {
    return (
        <div className='bg-base-200 p-3'>
            <h2 className='font-bold mb-5'>Q-Zone</h2>
            <div className="space-y-8">
                <img src={swimmingImage} alt="" />
                <img src={classImage} alt="" />
                <img src={playGroundImg} alt="" />
            </div>
        </div>
    );
};

export default Qzone;