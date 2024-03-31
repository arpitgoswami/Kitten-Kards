import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Implement login logic here, e.g., sending a request to a server
    console.log("Logging in with:", username, password);
  };

  const handleSignUp = () => {
    // Implement sign-up logic here, e.g., navigating to a sign-up page
    console.log("Signing up");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-normal text-[#EEEEEE]">
            🐱 Kitten Kards
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span
                className="bg-[#00ADB5] rounded-md px-4 py-2 text-[#222831] cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </div>
            <div className="text-sm">
              <span
                onClick={handleLogin}
                className="bg-[#00ADB5] rounded-md px-4 py-2 text-[#222831] cursor-pointer"
              >
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
