import { useState,  } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false); 
  const [resetEmail, setResetEmail] = useState(""); 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return alert("Please enter a valid email address");
    }

    if (isRegister) {
      if (!firstName.trim() || !lastName.trim()) {
        return alert("Please enter your full name");
      }

      if (email !== confirmEmail) {
        return alert("Emails do not match");
      }

      if (!validateEmail(confirmEmail)) {
        return alert("Please enter a valid confirmation email");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      if (password.length < 6) {
        return alert("Password must be at least 6 characters");
      }
    } else {
      if (password.length < 6) {
        return alert("Password must be at least 6 characters");
      }
    }

    setLoading(true);

    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          provider: "email",
          createdAt: Date.now(),
        });

        alert("✅ Account created successfully!");
        
        
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful!");
       
      }
    } catch (error) {
    
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Try again later";
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

 
  const handleResetPassword = async () => {
    if (!validateEmail(resetEmail)) {
      return alert("Please enter a valid email address");
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("📧 Password reset email sent! Check your inbox.");
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  
  const saveUserIfNotExists = async (user, provider) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        photo: user.photoURL,
        provider,
        createdAt: Date.now(),
      });
    }
  };

  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserIfNotExists(result.user, "google");
      alert("✅ Google login successful!");
      // navigate('/dashboard');
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login popup was closed";
      } else if (error.code === "auth/cancelled-popup-request") {
        errorMessage = "Login request was cancelled";
      }
      alert(errorMessage);
    }
  };

  
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserIfNotExists(result.user, "facebook");
      alert("✅ Facebook login successful!");
      // navigate('/dashboard');
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email";
      }
      alert(errorMessage);
    }
  };

  
  if (showResetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Reset Password
          </h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
            <button
              onClick={() => setShowResetPassword(false)}
              className="w-full border py-3 rounded-xl hover:bg-gray-100"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Confirm Email"
                className="input"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : isRegister ? "Create Account" : "Login"}
          </button>
        </form>

      
        {!isRegister && (
          <p
            className="text-center text-sm text-blue-600 cursor-pointer mt-3 hover:underline"
            onClick={() => setShowResetPassword(true)}
          >
            Forgot your password?
          </p>
        )}

        <p
          className="text-center text-sm text-indigo-600 cursor-pointer mt-4 hover:underline"
          onClick={() => {
            setIsRegister(!isRegister);
            resetForm();
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Create one"}
        </p>

        {!isRegister && (
          <>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-100 mb-3"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="Google"
              />
              Continue with Google
            </button>

            <button
              onClick={handleFacebookLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="w-5 bg-white rounded"
                alt="Facebook"
              />
              Continue with Facebook
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;