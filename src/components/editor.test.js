import { fireEvent, render, screen, waitForElement, waitFor } from '@testing-library/react';
import { act, Simulate } from 'react-dom/test-utils';
import Editor from './editor';
import SocketMock from 'socket.io-mock';

const faker = jest.fn();

describe('Editor*', () => {
    let socket = new SocketMock();


    it('Button in dropdown.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const button = screen.getByText(/Documents/i);
        fireEvent.click(button);
        const label = screen.getByRole('button', {name: /Title/i});
        expect(label).toBeInTheDocument();
    }),

    it('Click dropdown button.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const button = screen.getByText(/Documents/i);
        fireEvent.click(button);
        const label = screen.getByRole('button', {name: /Title/i});
        fireEvent.click(label);
        const text = screen.getByText(/Test TEXT./i);
        expect(text).toBeInTheDocument();
    })
}),

describe('Comments', () => {
    let socket = new SocketMock();

    it('Click Comment-button.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const label = screen.getByRole('button', {name: /Comment/i});
        fireEvent.click(label);
        const text = screen.getByText(/No selection made./i);
        expect(text).toBeInTheDocument();
    })
}),

describe('PDF*', () => {
    let socket = new SocketMock();

    it('Download PDF.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        jest.mock('file-saver', ()=> ({ saveAs: jest.fn() }));
        const FileSaver = require('file-saver');
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const label = screen.getByRole('button', {name: /PDF-Viewer/i});
        fireEvent.click(label);
        const button = screen.getByRole('button', {name: /Save PDF/i});
        fireEvent.click(button);
        waitFor(() => {
            expect(FileSaver.saveAs).toBeCalled();
        });
    })
}),

describe('Mail*', () => {
    let socket = new SocketMock();

    it('Add User.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "<p>Test TEXT.</p>"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const inputBox = screen.getByLabelText("Recipient's email");
        fireEvent.change(inputBox, {target: {value: 'Hello'}});
        const label = screen.getByRole('button', {name: /Add User/i});
        fireEvent.click(label);
        waitFor(() => {
            expect(screen.getByRole('div', {name: /User not found./i})).toBeInTheDocument();
        });
    })
}),

describe('Code-mode*', () => {
    let socket = new SocketMock();

    it('Code accepted.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "console.log('hello world');"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const codeButton = screen.getByRole('button', {name: /Code-mode/i});
        fireEvent.click(codeButton);
        const execButton = screen.getByRole('button', {name: /Execute/i});
        fireEvent.click(execButton);
        waitFor(() => {
            expect(screen.getByRole('div', {name: /hello world./i})).toBeInTheDocument();
        });
    }),

    it('Code Failed.', () => {
        var list = [{"_id": "123456", "docTitle": "Title", "docText": "hello world"}];
        const faker = jest.fn();
    
        render(<Editor lists={list} submitFunction={faker} socket={socket} email={"test@home.se"} />);
        const codeButton = screen.getByRole('button', {name: /Code-mode/i});
        fireEvent.click(codeButton);
        const execButton = screen.getByRole('button', {name: /Execute/i});
        fireEvent.click(execButton);
        waitFor(() => {
            expect(screen.getByRole('div', {name: /Command Failed/i})).toBeInTheDocument();
        });
    })
});