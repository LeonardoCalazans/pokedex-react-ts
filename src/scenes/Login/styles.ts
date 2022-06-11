import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20%;
    background-color: #fff;
`;

export const Content = styled.div`
    margin-top: -10em;
    background-color: #87CEEB;
    border-radius: 2em;
    padding: 0 4em 8em;   

`;

export const Title = styled.h1`
    margin-top: 4em;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    color: #222;
`;


export const Button = styled.button`
    background-color: #ea4335;
    border-radius: 2em;
    border: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    padding: 1em 2em;
    margin-top: 2em;
    margin-left: 12.6em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        filter: brightness(0.9);
    }
`;


