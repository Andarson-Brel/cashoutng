import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function SignUpPgae({ bankNames }) {
  const [formStep, setFormStep] = useState(0);
  const generateUniqueId = () => {
    return uuidv4();
  };
  const navigate = useNavigate();
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    selectedBank: "",
    accountNumber: "",
    accountName: "",
    userRole: "user",
    userId: generateUniqueId(),
  };
  const [formData, setFormData] = useState({
    initialState,
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function nextStep() {
    setFormStep((cur) => cur + 1);
  }
  function prevStep() {
    setFormStep((cur) => cur - 1);
  }
  function handleSubmit() {
    if (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.accountName &&
      formData.accountNumber &&
      formData.selectedBank
    ) {
      const existingUserData =
        JSON.parse(localStorage.getItem("userDatas")) || [];

      const userExists = existingUserData.some(
        (user) => user.email === formData.email
      );

      if (!userExists) {
        const updatedUserData = [...existingUserData, formData];

        localStorage.setItem("userDatas", JSON.stringify(updatedUserData));
      }

      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        selectedBank: "",
        accountNumber: "",
        accountName: "",
        userRole: "user",
      });
      navigate("/dashboard");
      toast.success("Account Created Successfully!");
    } else {
      toast.error("All Fields are required");
    }
  }

  // console.log(formData);
  return (
    <>
      <div className="form-container">
        <form className="sign-up-form">
          {formStep > 0 && (
            <img
              src="/images/back-arrow.svg"
              alt="back arrow"
              className="back-arrow"
              onClick={prevStep}
            />
          )}
          {formStep <= 1 && (
            <div>
              {" "}
              <h3 className="sign-up-title">Sign Up</h3>
              <p className="sign-up-desc">
                Delve into the World of Speed and Simplicity
              </p>
            </div>
          )}
          {formStep === 0 && (
            <section>
              <h4>Personal Details</h4>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </section>
          )}
          {formStep === 1 && (
            <section>
              <h4>Bank Details</h4>
              <select
                name="selectedBank"
                value={formData.selectedBank}
                onChange={handleChange}
              >
                <option>Select Bank</option>
                {bankNames.map((bankName, index) => (
                  <option key={index} value={bankName}>
                    {bankName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={handleChange}
              />
            </section>
          )}
          {formStep <= 1 ? (
            <button
              type="button"
              onClick={formStep === 0 ? nextStep : handleSubmit}
            >
              {formStep === 0 ? "Next" : "Submit"}
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
