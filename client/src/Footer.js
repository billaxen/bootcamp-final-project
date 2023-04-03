import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Categories>
        <li>
          <Link to="/">Back to Home</Link>
        </li>
      </Categories>
    </Wrapper>
  );
};

const Wrapper = styled.div`
height: 40px;
background-color: orange;
`


const Categories = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`

export default Footer;
