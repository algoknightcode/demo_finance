import React, { useState } from "react";
import AuthLayout from "../../components/layout/authlayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import ProfilePhotoSelector from "../../components/profilePhotoSelector";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apipath";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // validators (unchanged)
  const validateEmail = (v) =>
    !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validateFullName = (v) => !!v && v.trim().length >= 2;
  const validatePassword = (v) => !!v && v.length >= 8;

  const handleSignup = async (e) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!validateFullName(trimmedName))
      return setError("Please enter your full name (at least 2 characters).");
    if (!validateEmail(trimmedEmail))
      return setError("Please enter a valid email address.");
    if (!validatePassword(password))
      return setError("Password must be at least 8 characters long.");

    setError("");
    setIsLoading(true);

    try {
      let uploadedImageUrl = null;

      if (profilePic) {
        const formData = new FormData();
        formData.append("image", profilePic);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedImageUrl = uploadResponse.data?.imageUrl ?? null;
      }

      await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: trimmedName,
        email: trimmedEmail,
        password,
        profileImageUrl: uploadedImageUrl,
      });

      navigate("/login");
    } catch (signupError) {
      const message = signupError.response?.data?.message ||
        "Signup failed. Please try again in a moment.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* PAGE WRAPPER */}
      <div className="min-h-screen w-full grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
        {/* CARD */}
        <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/30">
          {/* Card header */}
          <div className="px-8 pt-8">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Create an Account
            </h3>
            <p className="text-sm text-slate-600 mt-1 mb-6">
              Join us today by entering your details below.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="px-8 pb-8 space-y-6">
             <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white
                           px-3 focus:outline-none focus:border-primary/60
                           focus:ring-4 focus:ring-primary/20 transition
                           placeholder:text-slate-400"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
                className="w-full h-11 rounded-xl border border-slate-200 bg-white
                           px-3 focus:outline-none focus:border-primary/60
                           focus:ring-4 focus:ring-primary/20 transition
                           placeholder:text-slate-400"
              />

              <div className="md:col-span-2">
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Min 8 Characters"
                  type="password"
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white
                             px-3 focus:outline-none focus:border-primary/60
                             focus:ring-4 focus:ring-primary/20 transition
                             placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Use 8+ characters with a mix of letters, numbers & symbols.
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-semibold
                         bg-gradient-to-r from-primary to-cyan-500 text-black
                         shadow-md hover:shadow-lg hover:brightness-105
                         focus:outline-none focus:ring-4 focus:ring-primary/30
                         disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Signing up..." : "SIGN UP"}
            </button>

            <p className="text-sm text-center text-slate-600">
              Already have an account?{" "}
              <Link
                className="font-semibold text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
