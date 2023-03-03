import { render, screen, fireEvent } from '@testing-library/react';
import ItemsPage from '../ItemsPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../../context/auth-context';



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

    it('Should show the item\'s name', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockData,
            ok: true
        });

        render(<MockItemsPage />);

        const divEls = await screen.findAllByTestId('item-card', {}, 5000);
        expect(divEls).toHaveLength(2);
    });
});