import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ===============================
  // Email Login / Register
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!firstName || !lastName) {
        return alert("Please enter your full name");
      }

      if (email !== confirmEmail) {
        return alert("Emails do not match");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

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
          firstName,
          lastName,
          email,
          provider: "email",
          createdAt: Date.now(),
        });

        alert("✅ Account created successfully. Please login.");

        // ⛔ logout بعد التسجيل
        await signOut(auth);

        setIsRegister(false);
        resetForm();
      } else {
        // 🔐 Login فقط
        await signInWithEmailAndPassword(auth, email, password);
        // ❌ مفيش navigate هنا
      }
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

  // ===============================
  // Save Social User
  // ===============================
  const saveUserIfNotExists = async (user, provider) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        photo: user.photoURL,
        provider,
        createdAt: Date.now(),
      });
    }
  };

  // ===============================
  // Google Login
  // ===============================
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserIfNotExists(result.user, "google");
      // ❌ مفيش navigate
    } catch (error) {
      alert(error.message);
    }
  };

  // ===============================
  // Facebook Login
  // ===============================
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserIfNotExists(result.user, "facebook");
      // ❌ مفيش navigate
    } catch (error) {
      alert(error.message);
    }
  };

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
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Loading..." : isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        <p
          className="text-center text-sm text-indigo-600 cursor-pointer mt-4"
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
              className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-100 mb-3"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="w-5 bg-white rounded"
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
