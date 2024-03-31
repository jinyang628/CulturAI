
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function transformImage(formData: FormData) {
    const response = await axios.post( 
        `${API_URL}/api/transform_image`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data
}