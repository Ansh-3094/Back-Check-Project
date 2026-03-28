import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <div className="app-panel w-full max-w-2xl rounded-xl p-8 text-white shadow-lg">
        <div className="mb-5 ">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <div className="mb-4">
          <ul className="list-disc list-inside ">
            <li className="mb-2">
              This project is to showcase my skills in web development.
            </li>
            <li className="mb-2">This web app is still in development.</li>
            <li className="mb-2">Do not upload videos greater than 100 MB.</li>
            <li className="mb-2">
              Upload no explicit content meant to be emotionally gratifying.
            </li>
          </ul>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2 transform scale-125"
          />
          <label htmlFor="termsCheckbox" className="font-bold">
            I agree to the terms and conditions
          </label>
        </div>
        <div>
          {isChecked && (
            <Link
              to="/"
              className="rounded bg-(--brand) px-4 py-2 font-bold text-white hover:bg-(--brand-strong)"
            >
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
