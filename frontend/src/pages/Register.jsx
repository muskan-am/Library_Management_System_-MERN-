import { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import {
  bootstrapFirstAdmin,
  getBootstrapStatus,
  resetAuthSlice,
  register,
} from "../store/slices/authSlice";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setupKey, setSetupKey] = useState("");
  const [isFirstAdmin, setIsFirstAdmin] = useState(false);
  const [firstAdminAllowed, setFirstAdminAllowed] = useState(null);

  const dispatch = useDispatch();
  const { error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getBootstrapStatus()).then((result) => {
      if (result && typeof result.firstAdminAllowed === "boolean") {
        setFirstAdminAllowed(result.firstAdminAllowed);
      } else {
        setFirstAdminAllowed(null);
      }

      if (result?.firstAdminAllowed === false) {
        setIsFirstAdmin(false);
        setSetupKey("");
      }
    });
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFirstAdmin) {
      dispatch(bootstrapFirstAdmin({ name, email, password, setupKey }));
      return;
    }

    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (!isFirstAdmin) {
      setSetupKey("");
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());

      if (isAuthenticated) {
        navigateTo("/");
      } else {
        navigateTo(`/otp-verification/${email}`);
      }
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, email, navigateTo, isAuthenticated, isFirstAdmin]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        
        {/* LEFT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-black
        text-white md:flex flex-col items-center justify-center p-8
        rounded-tr-[80px] rounded-br-[80px]
        ">
          <div className="text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo" 
              className="mb-12 h-44 w-auto"/>
            </div>
            <p className="text-gray-300 mb-12">Already have Account? Sign in now.</p>
            <Link to={"/login"}
            className="border-2 rounded-lg font-semibold
            border-white py-2 px-8 hover:bg-white 
            hover:text-black transition"
            >
              SIGN IN</Link> 
          </div>
        </div>

        {/* RIGHT SIDE (form agar baad me add karna ho) */}
        <div className="w-full md:w-1/2 flex items-center
        justify-center bg-white p-8">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-12">
                  <div className="flex flex-col-reverse
                  sm:flex-row items-center justify-center gap-5">
                    <h3 className="font-medium text-4xl
                    overflow-hidden">Sign Up</h3>
                    <img src={logo} alt="logo" className="h-auto
                    w-24 object-cover" />
                  </div>
                </div>
                  <p className="text-gray-800 text-center mb-12">
                    Please provide your information to sign up.
                  </p>
                  <form onSubmit={handleRegister}>
                    <div className="mb-2">
                      <input type="text" value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name" className="w-full px-4
                      border border-black rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="mb-2">
                      <input type="email" value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email" 
                      className="w-full px-4
                      border border-black rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="mb-2">
                      <input type="password" value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" className="w-full px-4
                      border border-black rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="mb-4 rounded-md border border-dashed border-gray-300 p-3">
                      {firstAdminAllowed === null ? (
                        <p className="text-xs text-gray-500">
                          Unable to verify first-admin status. Make sure backend is running on port 4000.
                        </p>
                      ) : firstAdminAllowed ? (
                        <>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <input
                              type="checkbox"
                              checked={isFirstAdmin}
                              onChange={(e) => setIsFirstAdmin(e.target.checked)}
                            />
                            Create first admin account
                          </label>
                          {isFirstAdmin && (
                            <div className="mt-3">
                              <input
                                type="password"
                                value={setupKey}
                                onChange={(e) => setSetupKey(e.target.value)}
                                placeholder="Setup Key"
                                className="w-full px-4 py-2 border border-black rounded-md focus:outline-none"
                              />
                              <p className="mt-2 text-xs text-gray-500">
                                Use this only for very first admin setup.
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">
                          First admin account is already set up.
                        </p>
                      )}
                    </div>
                    <div className="block md:hidden font-semibold mt-5">
                        <p>Already have Account?
                           <Link to="/login" className="text-sm text-gray-500 hover:underline">Sign In</Link>
                        </p> 
                    </div>
                    <button type="submit" className="border-2 mt-5 border-black w-full font-semibold
                    bg-black text-white py-2 rounded-lg 
                    hover:bg-white hover:text-black transition">SIGN UP</button>
                  </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default Register;