import { render, screen } from '@testing-library/react';
import Editor from './editor';

const faker = jest.fn();

test('renders?', () => {
    render(<Editor/>);
    const label = screen.getByText(/loading../);
    expect(label).toBeInTheDocument();
});