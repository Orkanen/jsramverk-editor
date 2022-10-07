const temp = `{ users { email fname lname username } }`;

const adminModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    getAdminUsers: async function getList(token, quer) {
        console.log(quer);
        const response = await fetch(`${adminModel.baseUrl}/graphql?query=${temp}`, {
            headers: {
                "x-access-token": token.token,
            },
        });

        const lists = await response.json();

        //console.log(lists);
        return lists.data;
    },
};

export default adminModel;
