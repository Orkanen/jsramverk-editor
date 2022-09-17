import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Editor from './editor';

const faker = jest.fn();

describe('Editor', () => {
    it('Click button to reveal Titles in list', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} />);
        const button = screen.getByText(/Document/i);
        fireEvent.click(button);
        const label = screen.getByText(/Title/i);
        expect(label).toBeInTheDocument();
    }),

    it('Read text of document', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} />);
        const button = screen.getByText(/Document/i);
        fireEvent.click(button);
        const label = screen.getByText(/Title/i);
        fireEvent.click(label);
        const text = screen.getByText(/Test TEXT./i);
        expect(text).toBeInTheDocument();
    })
});