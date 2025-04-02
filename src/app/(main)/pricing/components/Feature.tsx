import React from 'react';
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

interface FeatureProps {
    title: string;
    disabled: boolean
  }

const Feature: React.FC<FeatureProps> = ({ title, disabled}) => {
  return (
    <div className={`text-lg flex font-poppins space-x-2 ${disabled? "text-gray-400": "text-black"}`}>
        {disabled?
        <RxCross2/>
        
        :
        <BsCheck2/>
        }
        <p className='text-sm '>{title}</p>
    </div>
  );
};

export default Feature;