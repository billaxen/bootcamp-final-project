import {useAuth0} from '@auth0/auth0-react';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();

    return(
        <div>
            <h1>nothing yet</h1>
        </div>
        )
    
}

export default Profile