import { request } from "./request";

export const signin = async (values) => {
    try {
        const response = await request({
            url: '/users/login',
            method: 'post',
            data: values,
        });

        // Got Token, store in async storage.
        if (response?.data?.token) {
            // await AsyncStorage.setItem('auth_token', response?.data?.token); (For local storage)
            return response?.data?.token;
        }

    } catch (e) {
        console.log(e);
    }
    
}

export const signup = async (values) => {
    try {
        const response = await request({
            url: '/users/register',
            method: 'post',
            data: values,
        });

        if (response) {
            const { email, password } = values;
            const token = await signin({email, password});
            return token;
        }

    } catch (e) {
        console.log(e);
    }
    
}

// Here, once we sign up, we sequentially log in to get the token.
