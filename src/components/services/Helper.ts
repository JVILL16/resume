export async function handleResponse(res: Response) {
  const json = await res.json().catch(() => ({}));

  return {
    ok: res.ok,
    status: res.status,
    data: json.data,
    message: json.message,
  };
}