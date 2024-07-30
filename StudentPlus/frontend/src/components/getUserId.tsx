// utils/getUserIdFromToken.ts
import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        // console.log(decoded);
        return decoded.id; // Adjust this based on your JWT structure
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
