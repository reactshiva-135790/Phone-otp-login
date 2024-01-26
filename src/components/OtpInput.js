import { useEffect, useRef, useState } from "react";
import "../styles/otpInput.css";

const OtpInput = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [selectionRange, setSelectionRange] = useState();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];

    // allow only one input element
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join(" ");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // move to next input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  
    // Move to the previous input field if the current one is empty and the previous one is filled
    if (index > 0 && !otp[index - 1]) {
      for (let i = index - 1; i >= 0; i--) {
        if (otp[i]) {
          inputRefs.current[i].focus();
          break;
        }
      }
    }
  };
  

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index + 1]
    ) {
      // move focus to previous input field on backspace
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div>
      {otp.map((item, index) => (
        <input
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          type="text"
          value={item}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otp-input"
        />
      ))}
    </div>
  );
};
export default OtpInput;
