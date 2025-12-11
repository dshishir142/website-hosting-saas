export const storeAuthData = (token: string, user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}
