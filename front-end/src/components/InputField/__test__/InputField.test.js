import { render, screen, fireEvent, logDOM } from '@testing-library/react';
import InputField from '../InputField';

describe("InputField Component", () => {


    it('should return the right value', () => {
        render(<InputField
            placeholder={'Enter email'}
            type={'text'}
            id={'test-id'}
            name={'test-id'}
            value={'Item 1'}
            onChange={() => console.log('Change')}
        />);
        const inputElement = screen.getByPlaceholderText(/Enter email/i);

        expect(inputElement.value).toBe('Item 1');
    });

    it('should return the right placeholder', () => {
        render(<InputField
            placeholder={'Enter email'}
            type={'text'}
            id={'test-id'}
            name={'test-id'}
            value={'Item 1'}
            onChange={() => console.log('Change')}
        />);
        const inputElement = screen.getByPlaceholderText(/Enter email/i);

        expect(inputElement.placeholder).toBe('Enter email');
    });


    it('should return the right entered value', () => {
        render(<InputField
            placeholder={'Enter email'}
            type={'text'}
            id={'test-id'}
            name={'test-id'}
        />);
        const inputElement = screen.getByPlaceholderText(/Enter email/i);

        fireEvent.input(inputElement, { target: { value: 'test@example.com' } })
        expect(inputElement.value).toBe('test@example.com');
        fireEvent.change(inputElement, { target: { value: '' } })
        expect(inputElement.value).toBe('');
    });

    it('should return an error message', () => {
        render(<InputField
            placeholder={'Enter email'}
            type={'text'}
            id={'test-id'}
            name={'test-id'}
            inputIsInvalid={true}
            invalidMessage={'error'}
        />);

        const paraElement = screen.getByText(/error/i);
        expect(paraElement).toBeInTheDocument();
    });

    it('should NOT return an error message', () => {
        render(<InputField
            placeholder={'Enter email'}
            type={'text'}
            id={'test-id'}
            name={'test-id'}
            inputIsInvalid={false}
            invalidMessage={'error'}
        />);

        const paraElement = screen.queryByText(/error/i);
        expect(paraElement).not.toBeInTheDocument();
    });

});

