import React from 'react';
import styled from 'styled-components';

const AddedButton = () => {
  return (
    <StyledWrapper>
      <button>
        <p>Added</p>
        <svg className="icon" id="Play" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
          <path className="color000000 svgShape" style={{ fill: "#ffffff" , stroke: "#ffffff"}} d="M58.3945,32.1563,42.9961,50.625l-5.3906-6.4629a5.995,5.995,0,1,0-9.211,7.6758l9.9961,12a5.9914,5.9914,0,0,0,9.211.0059l20.0039-24a5.9988,5.9988,0,1,0-9.211-7.6875Z" /> <path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"></path>
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    background-color: #fff;
    border: 1px solid #25D366;
    padding: 5px;
    position: relative;
    width: 6.2em;
    height: 2em;
    transition: 0.5s;
    font-size: 20px;
    border-radius: 0.2em;
  }

  button p {
    position: absolute;
    top: 0.4em;
    left: 1.15em;
    margin: 0;
    padding: 0;
    transition: .5s;
    color: #25D366;
  }

  button svg {
    position: absolute;
    top: 0.45em;
    right: 0.5em;
    margin: 0;
    padding: 0;
    opacity: 0;
    transition: 0.5s;
    height: 1em;
    fill: #fff
  }

  button:hover p {
    left: 0.5em;
    color: #fff
  }

  button:hover svg {
    opacity: 1;
  }

  button:hover {
    background-color: #25D366;
  }`;

export default AddedButton;
