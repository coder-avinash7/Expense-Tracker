import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>

            {/* Calendar icon styling */}
            <style>
                {`
                    .input-box input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(18%) sepia(95%) saturate(5000%) hue-rotate(350deg) brightness(95%) contrast(100%);
                        cursor: pointer;
                        opacity: 1;
                    }
                `}
            </style>

            <label className='text-[13px] text-white'>{label}</label>

            <div className='input-box'>

                <input
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none px-[14px] text-slate-100'
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className='text-primary cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className='text-slate-400 cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default Input