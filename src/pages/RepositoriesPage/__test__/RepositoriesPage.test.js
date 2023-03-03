import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../../context/auth-context';
import RepositoriesPage from '../RepositoriesPage';

const mockData = {
    Bira: { 'min-qty': 5, qty: 8 },
    Kabel: { 'min-qty': 5, qty: 2 },
    ownerId: "M8woO4jFfQRXmgrdzppKZmdOL3E3",
}

const MockItemsPage = () => {
    return (
        <AuthContextProvider>
            <MemoryRouter initialEntries={["/repositories"]}>
                <RepositoriesPage />
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

const mockDataRepos = {
    '-NNI_BsZe8-2NG6RKbr2': 'Repo 1',
    '-NNI_BsZe8-3NG6RKbr3': 'Repo 3',
};





describe('RepositoriesPage Component', () => {

    beforeAll(async () => {
        window.localStorage.setItem('token', 'token');
        window.localStorage.setItem('userId', 'M8woO4jFfQRXmgrdzppKZmdOL3E3');
        window.localStorage.setItem('userEmail', 'kraskata@abv.bg');
    });


    it('Should show all repos of the user', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: () => mockDataRepos,
            ok: true
        });

        act(() => {
            render(<MockItemsPage />);
        });


        const divEls = await screen.findAllByTestId('repo-wrapper', {}, 5000);
        expect(divEls).toHaveLength(2);
    });
});