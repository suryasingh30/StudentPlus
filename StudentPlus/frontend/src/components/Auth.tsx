import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { signupInput, SignupInput } from '@suryasingh_30/mask-validate';
import emailjs from "@emailjs/browser";
import { BACKEND_URL } from './config';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: '',
    password: '',
    fullCollegeName: ''
  });

  const [colleges, setColleges] = useState<string[]>([]);
  const [enterOtp, setEnterOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/v1/user/colleges`);
        const collegesData = response.data.colleges.map((college: { fullName: string }) => college.fullName);
        setColleges(collegesData);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const sendOtp = async () => {

    const response = await axios.post(
      `${BACKEND_URL}api/v1/user/checkUser`,
      {email: postInputs.email}
    );

    if (response.data.exists) {
      alert('Email ID already exists!');
      navigate('/signin')
      return;
    }

    // Generate OTP only when "Send OTP" button is clicked
    const otp_val = (Math.floor(Math.random() * 10000) + 1000).toString(); // Ensure it's a 4-digit number
    setGeneratedOtp(otp_val); // Store the generated OTP

    setEnterOtp(true); // Show the OTP input field

    let templateParameter = {
      reply_to: postInputs.email,
      OTP: otp_val
    };

    const parsedResult = signupInput.safeParse(postInputs);
    if(!parsedResult.success){
      alert('Invalid Inputs')
      return ({
        message: "inputs are incorrect",
        errors: parsedResult.error.format()
      });
    };

    try {
      await emailjs.send('service_hxdr8sv', 'template_txz1rbm', templateParameter, 'JlZsRsmsauWRw7_zx');
      alert('OTP sent to your email!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const verify = () => {
    if (otp === generatedOtp) {
      sendRequest();
    } else {
      alert("Invalid OTP");
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
    } catch (error) {
      console.error("Error during authentication:", error);
      setError('An error occurred during authentication. Please try again.');
    }
  };

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
              placeholder="surya@bitdurg.ac.in"
              onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
              />
              {type === 'signup' && (
                    <h2 className='text-white pt-2'>Minimum of length 6</h2>
                  )}
            {type === 'signup' && (
              <LabelledDropdown
              label="College"
              options={colleges}
              onChange={(e) => setPostInputs({ ...postInputs, fullCollegeName: e.target.value })}
              />
            )}
            {type === 'signup' && (
              <h2 className='text-white pt-2'>Select Gmail account if you are using gmail ID</h2>
            )}
            {type === 'signin' && (
              <button
                onClick={sendRequest}
                type="button"
                className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {'Sign in'}
              </button>
            )}
            {!enterOtp && type === 'signup' && (
              <button
                onClick={sendOtp}
                type="button"
                className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {'Send Otp'}
              </button>
            )}
            {enterOtp && (
  <div className="flex flex-col">
    <label className="text-white mb-1">Enter OTP</label>
    <input
      type="text"
      value={otp}
      placeholder="Enter OTP"
      onChange={(e) => {
        setOtp(e.target.value); // Store the entered OTP
      }}
      className="p-2 rounded bg-gray-700 text-white border border-gray-500"
    />
  </div>
)}

            {enterOtp && (
              <button className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={verify}>Verify</button>
            )}
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

// Other components (LabelledDropdown, LabelledInput) remain the same


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
      <label className="block mb-0 text-sm text-black font-semibold pt-0">{label}</label>
      <select
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
      <label className="block mb-0 text-sm text-black font-semibold pt-0">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
