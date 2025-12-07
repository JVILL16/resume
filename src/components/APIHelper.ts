const API = "https://sagepaths.dev.api.sagejherm.co/api/client_auth_api";

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/auth.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};

export const getItems = async (token: string) => {
    const res = await fetch(`${API}/clients/read.php`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const createItem = async (token: string, name: string) => {
    const res = await fetch(`${API}/clients/create.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });
    return res.json();
};

export const updateItem = async (token: string, id: number, name: string) => {
    const res = await fetch(`${API}/clients/update.php`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, name })
    });
    return res.json();
};

export const deleteItem = async (token: string, id: number) => {
    const res = await fetch(`${API}/clients/delete.php?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};
