const API = "https://sagepaths-dev-api.sagejherm.co/api/client_auth_api";

/**
 * Generic fetch wrapper that safely parses JSON
 */
async function fetchJSON(url: string, options?: RequestInit) {
    const res = await fetch(url, options);
    const text = await res.text();

    try {
        return text ? JSON.parse(text) : {};
    } catch (err) {
        console.error("Failed to parse JSON from:", url);
        console.error("Response text:", text);
        throw err;
    }
}

/**
 * LOGIN
 */
export const login = async (clientname: string, password: string) => {
    return fetchJSON(`${API}/users/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientname, password })
    });
};

/**
 * GET CLIENT ITEMS
 */
export const getItems = async (token: string) => {
    return fetchJSON(`${API}/clients/read.php`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};

/**
 * CREATE ITEM
 */
export const createItem = async (token: string, name: string) => {
    return fetchJSON(`${API}/clients/create.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });
};

/**
 * UPDATE ITEM
 */
export const updateItem = async (token: string, id: number, name: string) => {
    return fetchJSON(`${API}/clients/update.php`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, name })
    });
};

/**
 * DELETE ITEM
 */
export const deleteItem = async (token: string, id: number) => {
    return fetchJSON(`${API}/clients/delete.php?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
};
