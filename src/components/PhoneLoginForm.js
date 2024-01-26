import { useState } from "react";
import {OtpInput} from "./index"

const PhoneLoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputValueChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber);

    // phone validation
    const regex = /[^0-9]/g;

    if (phoneNumber.length > 10 || regex.test(phoneNumber)) {
      alert("Please enter a valid phone number");
      return;
    }

    // call backend API
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) =>{
    console.log("login succesfull", otp)
  }

  return (
    <>
      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleInputValueChange}
            placeholder="Enter Phone Number"
          />
          <button type="submit">login</button>
        </form>
      ) : (
        <div>
          <p>Enter Otp Sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </>
  );
};
export default PhoneLoginForm;
