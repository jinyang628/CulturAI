
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function testAPI() {
    const response: string = await axios.post( 
        `${API_URL}/api/post_message`,
        {
            message: "Hello from the client!"
        }
    );
    console.log(response);
    return response
}