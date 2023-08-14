import { render, screen, fireEvent } from '@testing-library/react';
import ItemsPage from '../ItemsPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../../context/auth-context';
import { act } from 'react-dom/test-utils';

import ReactDOM from 'react-dom/client';



const mockData = {
    Bira: { 'min-qty': 5, qty: 8 },
    Kabel: { 'min-qty': 5, qty: 2 },
    ownerId: "M8woO4jFfQRXmgrdzppKZmdOL3E3",
}


const MockItemsPage = () => {
    return (
        <AuthContextProvider>
            <MemoryRouter initialEntries={["/repo/-NNI_BsZe8-2NG6RKbr2/items"]}>
                <ItemsPage />
            </MemoryRouter>
        </AuthContextProvider>
    );
}

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}
window.localStorage = new LocalStorageMock;




describe('ItemsPage Component', () => {

    beforeAll(async () => {
        window.localStorage.setItem('token', 'token');
        window.localStorage.setItem('userId', 'zkgJ6UcH6LSpmezwunrExdu5xI32');
        window.localStorage.setItem('userEmail', 'try@free.com');
    });

    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'root';
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('Should show the all item\'s', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });
        act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        expect(divEls).toHaveLength(2);
    });

    it('Should show the right quantity', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        divEls.map((itemCard, index) => {
            const [item, qty] = itemCard.querySelectorAll('p');
            expect(mockData[item.textContent].qty).toBe(Number(qty.textContent));
        });
    });

    it('Should increase item\'s qty if plus btn is clecked', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        divEls.map((itemCard, index) => {
            const [item, qty] = itemCard.querySelectorAll('p');
            const plusBtnEl = itemCard.querySelectorAll('button')[0];
            const currMockQty = mockData[item.textContent].qty
            act(() => {
                fireEvent.click(plusBtnEl);
            });
            expect(Number(qty.textContent)).toBe(currMockQty + 1);
        });
    });

    it('Should decrease item\'s qty if minus btn is clecked', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        divEls.map((itemCard, index) => {
            const [item, qty] = itemCard.querySelectorAll('p');
            const minusBtnEl = itemCard.querySelectorAll('button')[1];
            const currMockQty = mockData[item.textContent].qty
            act(() => {
                fireEvent.click(minusBtnEl);
            });
            act(() => {
                fireEvent.click(minusBtnEl);
            });
            expect(Number(qty.textContent)).toBe(currMockQty - 2);
        });
    });

    it('Should NOT decrease item\'s qty if minus btn is clecked and qty gets negative', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        divEls.map((itemCard, index) => {
            const [item, qty] = itemCard.querySelectorAll('p');
            const minusBtnEl = itemCard.querySelectorAll('button')[1];
            const currMockQty = mockData[item.textContent].qty
            const currQtyInTheDocument = Number(qty.textContent);

            for (let i = 1; i <= currQtyInTheDocument + 5; i++) {
                act(() => {
                    fireEvent.click(minusBtnEl);
                });
            }
            expect(Number(qty.textContent)).toBe(0);
        });
    });

    it('Should NOT decrease item\'s qty if minus btn is clecked and qty gets negative', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        await act(() => {
            ReactDOM.createRoot(container).render(<MockItemsPage />);
        });

        const divEls = await screen.findByTestId('add-item-btn');
        
        expect(divEls).toBeInTheDocument();
    });
});