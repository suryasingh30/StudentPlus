import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { SignupInput } from '@suryasingh_30/mask-validate';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: '',
    password: '',
    fullCollegeName: ''
  });

  const [colleges, setColleges] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8787/api/v1/user/colleges');
        const collegesData = response.data.colleges.map((college: { fullName: string }) => college.fullName);
        setColleges(collegesData);
        // console.log(collegesData);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        // Handle the error and update UI accordingly
        // Note: You should manage the error state and display the alert accordingly in your component
      }
    };

    fetchColleges();
  }, []);

  const [error, setError] = useState<string | null>(null);

  async function sendRequest() {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8787/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
    } catch (error) {
      console.error("Error during authentication:", error);
      setError('An error occurred during authentication. Please try again.');
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-2">
            <div className="text-3xl font-extrabold">
              {type === 'signup' ? 'Create an account' : 'Sign in'}
            </div>
            <div className="text-slate-500">
              {type === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-1 underline" to={type === 'signin' ? "/signup" : "/signin"}>
                {type === 'signin' ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-1">
            <LabelledInput
              label="email"
              placeholder="surya@bit.ac.in"
              onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
            />
            {type === 'signup' && (
              <LabelledDropdown
                label="College"
                options={colleges}
                onChange={(e) => setPostInputs({ ...postInputs, fullCollegeName: e.target.value })}
              />
            )}
            <button
              onClick={sendRequest}
              type="button"
              className="mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
            {error && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledDropdownType {
  label: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledDropdown({ label, options, onChange }: LabelledDropdownType) {
  return (
    <div>
      <label className="block mb-0 text-sm text-black font-semibold pt-1">{label}</label>
      <select
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      >
        <option value="">Select a college</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-0 text-sm text-black font-semibold pt-1">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
