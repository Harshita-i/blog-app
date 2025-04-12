import {useContext,useEffect,useState} from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import {useUser} from '@clerk/clerk-react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSelectRole(e) {
      setError('');
      const selectedRole = e.target.value;
      currentUser.role = selectedRole;

      try {
          let res = null;

          if (selectedRole === 'author') {
              res = await axios.post('http://localhost:3000/author-api/author', currentUser);
          } 
          if (selectedRole === 'user') {
              res = await axios.post('http://localhost:3000/user-api/user', currentUser);
          }

          if (res) {
              const { message, payload } = res.data;

              if (message === selectedRole) {
                  const updatedCurrentUser = { ...currentUser, ...payload };
                  setCurrentUser(updatedCurrentUser);

                  // Fetch the latest user data to check `isActive` status
                  const userFromAPI = await axios.get('http://localhost:3000/admin-api/users-authors');
                  const finalUser = userFromAPI.data.payload.find(u => u.email === updatedCurrentUser.email);

                  if (finalUser && !finalUser.isActive) {
                      setError('Your account is blocked. Contact admin.');
                  } else {
                      localStorage.setItem('currentuser', JSON.stringify(finalUser));
                      if (selectedRole === 'user') {
                          navigate(`/user-profile/${finalUser.email}`);
                      } else if (selectedRole === 'author') {
                          navigate(`/author-profile/${finalUser.email}`);
                      }
                  }
              } else {
                  setError(message);
              }
          }
      } catch (err) {
          setError('Error while selecting role. Please try again.');
      }
  }

  useEffect(() => {
      if (isSignedIn) {
          const updatedUser = {
              ...currentUser,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.emailAddresses[0].emailAddress,
              profileImageUrl: user.imageUrl,
          };
          setCurrentUser(updatedUser);

          axios.get('http://localhost:3000/admin-api/users-authors')
              .then((userFromAPI) => {
                  const storedUser = JSON.parse(localStorage.getItem('currentuser'));
                  if (storedUser) {
                      const finalUser = userFromAPI.data.payload.find(u => u.email === storedUser.email);
                      if (finalUser && !finalUser.isActive) {
                          setError('Your account is blocked. Contact admin.');
                      }
                  }
              })
              .catch((error) => {
                  console.error('Error fetching user data:', error);
              });
      }
  }, [isLoaded]);
  return (
    <div className='container'>
      {
        isSignedIn===false && <div className='container'>
          <h1 className='display-4 fw-bold'>Welcome to Our Platform!</h1>
          <p className='lead mt-4'>Discover, connect, and explore a world of ideas. Whether you're here to share your thoughts, learn from others, or simply stay informed, we've got you covered.</p>
          <div className="row my-5 mb-3">
        <div className="col-md-4 mb-3">
            <div className="p-4 border rounded shadow-sm bg-light">
                <h3 className="text-primary">For Readers</h3>
                <p>Explore diverse articles, gain insights, and stay updated with fresh content every day.</p>
            </div>
        </div>

        <div className="col-md-4 mb-3">
            <div className="p-4 border rounded shadow-sm bg-light">
                <h3 className="text-success">For Authors</h3>
                <p>Share your ideas with the world, inspire others, and grow your audience.</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="p-4 border rounded shadow-sm bg-light">
                <h3 className="text-warning">For Everyone</h3>
                <p>Join a community that values knowledge, creativity, and meaningful discussions.</p>
            </div>
        </div>
    </div>

    <div className="alert alert-info">
        Start your journey with us today and become part of something amazing!
    </div>
        </div>
      }

      {/* {
        
         isSignedIn===true && 
         <div>
         <div className='d-flex justify-content-evenly bg-info p-3 align-items-center'>
           <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
           <p className="display-5">{user.firstName}</p>
         </div>
          
            <p className='lead'>Select role</p>
            {
              error.length!==0 &&(
                 <p
                    className='text-danger fs-5'
                    style={{fontFamily:"sans-serif"}}
                 >{error}</p>
              )
            }
             <div className='d-flex role-radio py-3 justify-content-center'>
           <div className="form-check me-4">
          <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole}/>
          <label htmlFor="author" className="form-check-label">Author</label>
         </div>
         <div className="form-check">
          <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole}/>
          <label htmlFor="user" className="form-check-label">User</label>
         </div>
           </div>
         </div>

      } */}
      {isSignedIn === true && (
  <div className="container mt-5">
    {/* User Profile Section */}
    <div className="card shadow-sm p-4 text-center bg-light">
      <img
        src={user.imageUrl}
        width="120px"
        className="rounded-circle mx-auto border border-3 border-primary p-1"
        alt="User Profile"
      />
      <h2 className="mt-3 text-dark">{user.firstName}</h2>
    </div>

    {/* Role Selection Section */}
    <div className="mt-4 text-center">
      <p className="lead fw-bold">Select Your Role</p>

      {/* Error Message */}
      {error.length !== 0 && (
        <p className="text-danger fs-5 fw-bold">{error}</p>
      )}

      {/* Role Selection */}
      <div className="d-flex justify-content-center gap-4">
        <div className="form-check form-check-inline role-option">
          <input
            type="radio"
            name="role"
            id="author"
            value="author"
            className="form-check-input"
            onChange={onSelectRole}
          />
          <label htmlFor="author" className="form-check-label btn btn-outline-primary px-4 py-2 rounded-pill">
            Author
          </label>
        </div>

        <div className="form-check form-check-inline role-option">
          <input
            type="radio"
            name="role"
            id="user"
            value="user"
            className="form-check-input"
            onChange={onSelectRole}
          />
          <label htmlFor="user" className="form-check-label btn btn-outline-success px-4 py-2 rounded-pill">
            User
          </label>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Home