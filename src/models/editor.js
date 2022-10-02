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
                "email": email,
            }
        });

        const lists = await response.json();

        return lists.data;
    },
    saveList: async function saveList(idEdit, textEdit, userEmail, titleEdit) {
        //console.log(idEdit, textEdit);

        const response = await fetch(`${editorModel.baseUrl}/list/create`, {
            body: JSON.stringify({text: textEdit, title: titleEdit, owners: [userEmail]}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        console.log(result);
    },
    updateList: async function updateList(idEdit, textEdit, titleEdit) {
        const response = await fetch(`${editorModel.baseUrl}/list/update`, {
            body: JSON.stringify({id: idEdit, text: textEdit, title: titleEdit}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH'
        });

        const result = await response.json();

        console.log(result);
    },
    addOwner: async function addOwner(idEdit, newOwner) {
        const response = await fetch(`${editorModel.baseUrl}/list/addOwner`, {
            body: JSON.stringify({id: idEdit, owner: newOwner}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH'
        });

        const result = await response.json();

        console.log(result);
    }
};

export default editorModel;
