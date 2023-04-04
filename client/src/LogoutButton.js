import {useAuth0} from '@auth0/auth0-react';
import styled from 'styled-components';

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <Button 
            onClick={ () => logout()}
            >
                Sign Out
            </Button>
        )
    )
}

const Button= styled.button`
  margin: 0.5rem 0.5rem 0.5rem;
  font: inherit;
  font-size: 1rem;
  padding: 0.5em 1.5em;
  cursor: pointer;
  border-radius: 0.5rem;
`
export default LogoutButton