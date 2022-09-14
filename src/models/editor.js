const editorModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    getList: async function getList() {
        const response = await fetch(`${editorModel.baseUrl}/list`);
        //console.log(response);
        const lists = await response.json();
        //console.log(lists.data);
        return lists.data;
    },
    saveList: async function saveList(idEdit, textEdit) {
        //console.log(idEdit, textEdit);
        
        const response = await fetch(`${editorModel.baseUrl}/list/create`, {
            body: JSON.stringify({text: textEdit}),
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
    }
};

export default editorModel;