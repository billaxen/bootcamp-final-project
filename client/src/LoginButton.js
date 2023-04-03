import {useAuth0} from '@auth0/auth0-react';

const LoginButon = () => {
    // const {loginWithRedirect, isAuthenticated} = useAuth0();

    return(
        !isAuthenticated ? (
            <button 
            // onClick={()=>loginWithRedirect()}
            >
                Sign In
            </button>
        ): null
    )
}

export default LoginButon