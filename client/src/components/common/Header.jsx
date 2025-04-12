import { Link , useNavigate } from "react-router-dom"
import {useClerk,useUser} from '@clerk/clerk-react'
import { useContext } from "react"
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
function Header() {
   const {signOut}=useClerk()
   const {isSignedIn,user,isLoaded}=useUser()
   const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
   const navigate=useNavigate()

   //function to signout
   async function handleSignout(){
      await signOut();
      setCurrentUser(null)
      navigate('/')
   }

  return (
    <div >
        <nav className="header d-flex justify-content-between align-items-center py-2">
            <div className="d-flex justify-content-center">
            <Link href='/'>
               <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/floral-logo.jpg" width="65px" className="ms-4" />
            </Link>
          </div>
          <ul className="d-flex list-unstyled header-links justify-content-around">

          {
          !isSignedIn?
              <>
                <li>
              <Link to='' className="link me-4">Home</Link>
            </li>
            <li>
              <Link to='signin' className="link me-4">Signin</Link>
            </li>
            <li>
              <Link to='signup' className="link me-4">Signup</Link>
            </li>
            <li>
              <Link to='login' className="link me-4">Admin</Link>
            </li>
            
              </>:
             <div className="user-button d-flex align-items-center justify-content-around">
                <div style={{position:'relative'}}>
                   <img src={user.imageUrl} width="40px" className="rounded-circle" alt="" />
                
                <p className="role" style={{position:'absolute',top:"0px",right:"-20px"}}>{currentUser.role}</p> 
                <p className="mb-0 user-name">{user.firstName}</p>
                </div>

                <button className="btn btn-danger signout-btn" onClick={handleSignout}>Signout</button>
                
               
             </div>

            }
            
          </ul>
        </nav>
    </div>
  )
}

export default Header