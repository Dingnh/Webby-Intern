import { domain } from '@/config/domain'

export const Auth = {
    async registerAccount({fullname, email, mobile, password}) {
        const response = await fetch(`${domain}/graphql`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
                mutation{
                    register(input: {
                        user_fullname: "${fullname}",
                        user_email: "${email}",
                        user_mobile: "${mobile}",
                        password: "${password}",
                    })
                }
            `,
          }),
        });
        const responseData = await response.json();
        console.log("response", responseData);
        return responseData
    },
    async login({mobile, password}) {
        const response = await fetch(`${domain}/graphql`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                mutation{
                    login( input:{
                        user_mobile:"${mobile}",
                        password:"${password}"}
                    ) 
                    {
                        token
                        user {
                            user_id
                        }
                    }
                }
              `,
            }),
          });
          const responseData = await response.json();
          console.log("response", responseData);
          return responseData
    },
    async logout({token}) {
        const response = await fetch(`${domain}/graphql`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
            body: JSON.stringify({
              query: `
                mutation{
                    logout {
                        status 
                        message
                    }
                }
              `,
            }),
          });
          const responseData = await response.json();
          console.log("response", responseData);
          return responseData
    }
}