import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate} from 'react-router-dom';
import { useCallback } from 'react';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const response = await fetchApiAuthGoogle(userData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // Display user-friendly error message
      console.error("Sign-in with Google failed:", error.message);
      alert("Sign-in with Google failed. Please try again later.");
    }
  }, [dispatch, navigate]);

  // Function for API call
  const fetchApiAuthGoogle = useCallback(async (userData) => {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return response;
  }, []);

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-white text-grey p-3 rounded-lg hover:opacity-95'>
      CONTINUE WITH GOOGLE
    </button>
  );
}