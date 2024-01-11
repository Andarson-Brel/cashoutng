import { useState } from "react";

export default function SignUpPgae({ bankNames }) {
  const [formStep, setFormStep] = useState(0);
  function nextStep() {
    setFormStep((cur) => cur + 1);
  }
  function prevStep() {
    setFormStep((cur) => cur - 1);
  }
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
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="number" placeholder="Phone Number" />
              <input type="password" placeholder="Password" />
            </section>
          )}
          {formStep === 1 && (
            <section>
              <h4>Bank Details</h4>
              <select>
                <option>Select Bank</option>
                {bankNames.map((bankName, index) => (
                  <option key={index} value={bankName}>
                    {bankName}
                  </option>
                ))}
              </select>
              <input type="number" placeholder="Account Number" />
              <input type="text" placeholder="Account Name" />
            </section>
          )}
          {formStep <= 1 ? (
            <button type="button" onClick={nextStep}>
              {formStep === 0 ? "Next" : "Submit"}
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
