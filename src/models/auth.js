const authModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    login: async function login(user) {
        const response = await fetch(`${authModel.baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        //console.log(result);
        return result;
    },
    register: async function register(user) {
        const response = await fetch(`${authModel.baseUrl}/auth/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        //console.log(result);
        return result;
    }
};

export default authModel;
