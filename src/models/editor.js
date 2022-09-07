const editorModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    getList: async function getList() {
        const response = await fetch(`${editorModel.baseUrl}/list`);

        const lists = await response.json();
        //console.log(lists);
        return lists;
    },
    saveList: async function saveList(newDoc) {
        const response = await fetch(`${editorModel.baseUrl}/list/add`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        console.log(result);
    }
};

export default editorModel;