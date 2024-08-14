import axios from 'axios';
import { BACKEND_URL } from './config';

export const toggleLike = async (id: any, token: any) => {
    try {
        const response = await axios.post(`${BACKEND_URL}api/v1/blog/${id}/like`, {}, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};
