import {useAuth0} from '@auth0/auth0-react';
import styled from 'styled-components';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();

    return(
       isAuthenticated && (
        <Column>
            {user?.picture && <Image src={user.picture} alt={user?.name}/>}
            <h2>{user?.name} - @{user.nickname}</h2>
            <p>{user.email}</p>

        </Column>
       )
        )
    
}

const Column = styled.article`
 display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Image = styled.img`
 width: 200px;
    border: 0.5rem double #000;
    border-radius: 50%;
    margin: 0 1rem 1rem;`



export default Profile