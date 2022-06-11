import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    width: 100%;
    height: 100%; 
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    border: none;
    background-color: #FFBFC0;
    padding: 1rem;
    border-radius: 1rem;
    :hover{
        background-color: #CF0C0F;
        transition: .3s;
    }
`;

export const Title = styled.h1``;

