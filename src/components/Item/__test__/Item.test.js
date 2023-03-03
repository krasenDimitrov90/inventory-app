import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../Item';

describe("Item Component", () => {



    describe('Item Options Component', () => {

        beforeEach(() => render(<Item btnHandler={() => {}} />));

        it('should NOT show item options', () => {
            const optionsEl = screen.queryByTestId('item-options');
            expect(optionsEl).not.toBeInTheDocument();
        });

        it('should SHOW item options when item is clicked', () => {
            const itemParaEl = screen.getByTestId('item-card-paragraph');
            fireEvent.click(itemParaEl);

            const optionsEl = screen.queryByTestId('item-options');
            expect(optionsEl).toBeInTheDocument();
        });

        it('should HIDE item options when item is cleked twice', () => {
            const itemParaEl = screen.getByTestId('item-card-paragraph');
            fireEvent.click(itemParaEl);
            fireEvent.click(itemParaEl);

            const optionsEl = screen.queryByTestId('item-options');
            expect(optionsEl).not.toBeInTheDocument();
        });

        it('Should NOT hide the options if input is empty and update is clicked', () => {
            const itemParaEl = screen.getByTestId('item-card-paragraph');
            fireEvent.click(itemParaEl);

            const optionsEl = screen.queryByTestId('item-options');
            const buttonEl = screen.getAllByRole('button')[0];
            fireEvent.click(buttonEl);
            expect(optionsEl).toBeInTheDocument();
        });

        it('Should HIDE the options if input is filled and update is clicked', () => {
            const itemParaEl = screen.getByTestId('item-card-paragraph');
            fireEvent.click(itemParaEl);

            const inputEl = screen.getByPlaceholderText('Enter new quantity');
            fireEvent.change(inputEl, { target: { value: 123 } });

            const optionsEl = screen.queryByTestId('item-options');
            const buttonEl = screen.getAllByRole('button')[0];
            fireEvent.click(buttonEl);
            expect(optionsEl).toBeInTheDocument();
        });
    });

    describe("Item",() => {

        it('Should show the item\'s name', () => {
            render(<Item item={'Beer'} />);

            const paraEl = screen.getByTestId('item-card-paragraph');
            expect(paraEl.textContent).toBe('Beer');
        });

        it('Should show the item\'s quantity', () => {
            render(<Item qty={5} />);

            const qtyEl = screen.getByTestId('item-card-qty');
            expect(Number(qtyEl.textContent)).toBe(5);
        });
    });

});