import {Buffer} from 'buffer';

const editorModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    getList: async function getList(token) {
        const response = await fetch(`${editorModel.baseUrl}/list`, {
            headers: {
                "x-access-token": token,
            }
        });

        const lists = await response.json();

        return lists.data;
    },
    getUserLists: async function getList(token, email) {
        const response = await fetch(`${editorModel.baseUrl}/list/user`, {
            headers: {
                "x-access-token": token,
                "email": email.toLowerCase(),
            }
        });

        const lists = await response.json();

        //console.log(lists);

        return lists.data;
    },
    saveList: async function saveList(idEdit, textEdit, userEmail, titleEdit, comments, codeEdit) {
        //console.log(idEdit, textEdit);

        const response = await fetch(`${editorModel.baseUrl}/list/create`, {
            body: JSON.stringify({
                text: textEdit,
                title: titleEdit,
                owners: [userEmail],
                comments: comments,
                code: codeEdit
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        return result;
    },
    updateList: async function updateList(idEdit, textEdit, titleEdit, commentsEdit, codeEdit) {
        const response = await fetch(`${editorModel.baseUrl}/list/update`, {
            body: JSON.stringify({
                id: idEdit,
                text: textEdit,
                title: titleEdit,
                comments: commentsEdit,
                code: codeEdit
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH'
        });

        const result = await response.json();

        return result;
    },
    addOwner: async function addOwner(idEdit, newOwner, sender) {
        const response = await fetch(`${editorModel.baseUrl}/list/addOwner`, {
            body: JSON.stringify({id: idEdit, owner: newOwner, email: sender}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH'
        });

        const result = await response.json();

        return result;
    },
    base64Code: async function base64Code(data) {
        const response = await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                let decodedOutput = Buffer.from(result.data, 'base64').toString('utf-8');

                return decodedOutput;
            });

        const result = await response;

        return result;
    }
};

export default editorModel;
