import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
        <li>
          <Link to="/">Back to Home</Link>
        </li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
height: 40px;
background-color: orange;
margin-top: auto;
  padding: 1rem;
  margin-top: 50%;
`

export default Footer;
