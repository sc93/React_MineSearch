import React from 'react';
import styled from 'styled-components';
import useForm from '../hooks/useForm';

const FormBlock = styled.div`
    display: flex;
    div {
        margin: 0 20px;
    }
`;
const Form = () => {
    const { game, onChange, onClick } = useForm();
    // console.log('form render');
    return (
        <FormBlock>
            <div>
                <label>width </label>
                <input value={game.width} onChange={onChange} name="width" />
            </div>
            <div>
                <label>height </label>
                <input value={game.height} onChange={onChange} name="height" />
            </div>
            <div>
                <label>mines </label>
                <input value={game.mines} onChange={onChange} name="mines" />
            </div>
            <div>
                <button onClick={onClick}>New Game</button>
            </div>
        </FormBlock>
    );
};

export default Form;
