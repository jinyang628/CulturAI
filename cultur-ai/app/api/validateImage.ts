
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function validateImage(formData: FormData) {
    const response = await axios.post( 
        `${API_URL}/api/validate_image`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    console.log(response);
    return response
}