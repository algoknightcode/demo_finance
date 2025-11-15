import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      {/* Label */}
      <label className="text-sm font-semibold text-gray-700 tracking-wide mb-1">
        {label}
      </label>

      {/* Input Box */}
      <div className="flex items-center bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm px-4 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:shadow-lg">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 font-medium tracking-wide"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle Icon */}
        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-purple-500 cursor-pointer ml-3 hover:scale-110 transition-transform duration-200"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-gray-400 cursor-pointer ml-3 hover:text-purple-400 hover:scale-110 transition-transform duration-200"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>

      {/* Small helper text */}
      <p className="text-xs text-gray-500 mt-1 pl-1">
        {type === 'password' ? 'Use 8 or more characters with a mix of letters, numbers & symbols.' : ''}
      </p>
    </div>
  );
};

export default Input;