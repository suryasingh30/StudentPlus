import axios from 'axios';

export const toggleLike = async (id: string, token: string) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8787/api/v1/blog/${id}/like`, {}, {
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
