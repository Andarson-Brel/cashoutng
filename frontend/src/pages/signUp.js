import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function SignUpPgae({ bankNames, bankList }) {
  const [formStep, setFormStep] = useState(0);
  const [account, setAccount] = useState([]);
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
    bankCode: "", // Add bankCode field
  };

  const [formData, setFormData] = useState({
    initialState,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "selectedBank") {
      const selectedBank = bankList.find((bank) => bank.bank_name === value);

      if (selectedBank) {
        const bankCode = selectedBank.code;
        // console.log(bankCode);
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          bankCode: bankCode,
        }));
      }
    } else {
      // For other fields, update the state as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        bank: formData.selectedBank,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        isAdmin: false,
        username: `${formData.firstName} ${formData.lastName}`,
        // userId: formData.userId,
        // bankCode: formData.bankCode,
      };

      axios.interceptors.request.use((config) => {
        config.withCredentials = true;
        return config;
      });
      axios
        .post("http://localhost:5000/auth/signup", userData)
        .then((response) => {
          // Handle success, e.g., redirect to dashboard
          navigate("/dashboard");
          console.log("signup successful");
          toast.success("Account Created Successfully!");
        })
        .then((response) => {})
        .catch((error) => {
          // Handle error, e.g., show error toast
          toast.error("Failed to create account. Please try again.");
        });
    } else {
      toast.error("All Fields are required");
    }
  }

  useEffect(() => {
    if (formData.bankCode) {
      axios
        .get(
          `https://app.nuban.com.ng/api/NUBAN-VPWTUJWJ1943?bank_code=${formData.bankCode}&acc_no=${formData.accountNumber}`
        )
        .then((response) => {
          const { account_name } = response.data[0];
          setAccount(response.data[0]);
          setFormData((prevData) => ({
            ...prevData,
            accountName: account_name,
          }));
          // console.log(account_name);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [formData.bankCode, formData.accountNumber]);

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
                placeholder={formData.accountName}
                value={formData.accountName}
                onChange={handleChange}
                readOnly
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
