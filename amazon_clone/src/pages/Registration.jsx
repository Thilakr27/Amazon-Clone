import React, { useState } from "react";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  //Err messages start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  // Loading State Start
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  //handle function start
  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  //email validation start
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  // submit button start
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Please enter your email");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
        firebaseErr("");
      }
      if (!password) {
        setErrPassword("Please enter your password");
      } else {
        if (password.length < 6) {
          setErrPassword("Password must be at least 6 characters");
        }
      }
      if (!cPassword) {
        setErrCPassword("confirm your password");
      } else {
        if (cPassword !== password) {
          setErrCPassword("Password not matched");
        }
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
          });
          // Signed up

          setLoading(false);
          setSuccessMsg("Account Created successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, Try another one");
          }
        });
      setclientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setFirebaseErr("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <Link to="/">
            <img className="w-32 h-16 " src={darkLogo} alt="darkLogo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  className="w-full py-1 border border-zinc-400 px-2 text-base
                rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100  "
                  type="text"
                  value={clientName}
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont  font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or mobile number </p>
                <input
                  onChange={handleEmail}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base
                rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100  "
                  type="email"
                  value={email}
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont  font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont  font-extrabold text-base">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password </p>
                <input
                  onChange={handlePassword}
                  className="w-full py-1 border border-zinc-400 px-2 text-base
                rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100  "
                  type="password"
                  value={password}
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont  font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password </p>
                <input
                  onChange={handleCPassword}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base
                rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100  "
                  type="password"
                  value={cPassword}
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont  font-extrabold text-base">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be at least 6 characters.
                </p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    visible={true}
                    color="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    width="50"
                  />
                </div>
              )}
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, Opacity: 0 }}
                    animate={{ y: 0, Opacity: 1 }}
                    transitioon={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's
              <span className="text-blue-600">
                Condition of Use{""}
              </span>and{" "}
              <span className="text-blue-600 "> Private Notice.</span>
            </p>

            <div>
              <p className="text-xs text-black">
                Already have an account?{" "}
                <Link to="/signin">
                  <span
                    className="
                text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1
                cursor-pointer duration-100"
                  >
                    Sign in
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                Buying for work?
                <span
                  className="text-xs  text-blue-600 hover:text-orange-600 hover:underline
              underline-offset-1 cursor-pointer duration-100"
                >
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div
        className="w-full bg-gradient-to-t from-white via-white   to-zinc-200
      flex flex-col gap-4 justify-center items-center p-10"
      >
        <div className="flex items-center gap-6">
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer
    duration-100"
          >
            Condition of Use
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer
    duration-100"
          >
            Privacy Notice
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer
    duration-100"
          >
            Condition of Use
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
