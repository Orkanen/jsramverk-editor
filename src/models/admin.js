//const temp = `{ users { email fname lname username } }`;

const adminModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1337" :
        "https://jsramverk-editor-fian12.azurewebsites.net",
    getAdminUsers: async function getList(token, quer) {
        //console.log(`{ user(email:${quer}) { email fname lname username } }`);
        if (quer.toLowerCase()) {
            const response = await fetch(`${adminModel.baseUrl}/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token.token,
                },
                body: JSON.stringify({
                    query: `{ user(email: "${quer.toLowerCase()}") { email fname lname username } }`
                })
            });

            const lists = await response.json();



            //console.log(lists.data.user);
            if (lists.data.user) {
                return [lists.data.user];
            }

            const temp = [{
                email: null,
                fname: null,
                lname: null,
                username: "No such user found."
            }];

            return temp;
        } else {
            const response = await fetch(`${adminModel.baseUrl}/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token.token,
                },
                body: JSON.stringify({
                    query: `{ users { email fname lname username } }`
                })
            });

            const lists = await response.json();

            //console.log(lists.data.users);
            return lists.data.users;
        }
    },
};

export default adminModel;
