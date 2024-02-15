import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPass2 = () => {
  const navigate = useNavigate();

  const [emailCode, setEmailCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4001/user/emailOtpvarify', { emailCode })
      .then((res) => {
        console.log(res.data.message);
        var email = res.data.userEmail;
        setUserEmail(email);
        alert(res.data.success);
        setVerificationStatus('verified');
      })
      .catch((err) => {
        alert(err);
        setVerificationStatus('incorrect');
      });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setEmailCode('');
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordSent = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      axios
        .post('http://localhost:4001/user/setpasword', { userEmail, newPassword })
        .then((res) => {
          console.log(res.data.userEmail);
          alert(res.data.success);
          navigate('/login');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white px-8 py-20 w-full max-w-xl border border-black rounded-lg">
        <form>
          <div className="flex space-x-1 items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
            <p className="text-black text-lg font-semibold">{verificationStatus === 'verified' ? 'Email Verified' : 'Email Verification Code'}</p>
          </div>
          {verificationStatus !== 'verified' && (
            <div className="flex space-x-4">
              <div className="flex rounded-md overflow-hidden w-full">
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  className="w-full rounded-md rounded-r-none border border-black"
                />
                <button
                  onClick={(e) => handleVerify(e)}
                  className={`bg-${verificationStatus === 'incorrect' ? 'red' : 'indigo'}-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md`}
                >
                  Verify
                </button>
              </div>
              <button onClick={(e) => handleClear(e)} className="bg-white px-6 text-lg font-semibold py-4 rounded-md border border-black">
                Clear
              </button>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded border-black py-2 px-20 text-grey-darker"
              id="newPassword"
              type="text"
              placeholder="New Password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="shadow appearance-none border border-red rounded border-black py-2 px-20 text-grey-darker mb-3"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button
            className="bg-indigo-600 text-white px-6 text-lg font-semibold py-2 rounded-md"
            onClick={(e) => passwordSent(e)}
            disabled={verificationStatus !== 'verified'}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass2;
