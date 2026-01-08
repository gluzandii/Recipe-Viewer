export interface User {
    id: number;
    name: string;
    email: string;
}

export async function useAuthUser() {
    const user = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
        method: 'GET'
    });

    if (!user.ok) {
        return null;
    }

    const userData = await user.json();
    if (!userData) {
        return null;
    }

    return userData as { user: User };
}
