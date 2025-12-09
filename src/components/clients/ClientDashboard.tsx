import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../APIHelper.ts";

export default function ClientDashboard() {
  const token = localStorage.getItem("clientToken");
  const [items, setItems] = useState<any[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(():any => {
    if (!token) return (window.location.href = "/client/login");

    load();
  }, []);

  async function load() {
    const res = await getItems(token!);
    console.log(res);
    setItems(res);
  }

  async function addNew() {
    await createItem(token!, newName);
    setNewName("");
    load();
  }

  async function save(id: number, name: string) {
    await updateItem(token!, id, name);
    load();
  }

  async function remove(id: number) {
    await deleteItem(token!, id);
    load();
  }

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-4">Client Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input className="p-2" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button onClick={addNew} className="bg-green-600 p-2 rounded">Add</button>
      </div>

      {items.map(item => (
        <div key={item.id} className="p-2 mb-2 bg-gray-800 rounded flex justify-between">
          <input
            className="bg-transparent"
            value={item.name}
            onChange={(e) =>
              setItems(items.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))
            }
          />
          <div className="flex gap-2">
            <button onClick={() => save(item.id, item.name)} className="bg-blue-600 p-1 px-2 rounded">
              Save
            </button>
            <button onClick={() => remove(item.id)} className="bg-red-600 p-1 px-2 rounded">
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
