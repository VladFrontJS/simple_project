import styled from 'styled-components';

export const Button = styled.button`
    padding: 0 1rem;
    background-color: var(--colors-bg);
    color: var(--colors-text);
    border-radius: var(--radii);
    border: none;
    box-shadow: var(--shadow);
    line-height: 2.5;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
`;