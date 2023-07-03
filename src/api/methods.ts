import { useAppSelector } from "../../hooks";

export const urlBackend = "http://192.168.99.113:8000/api/";
export const storageBackend = "http://192.168.99.113:8000";

export async function GET(route: string, token?: string) {
  return await fetch(`${urlBackend + route}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
}

export async function POST(route: string, data: any, token?: string) {
  return await fetch(`${urlBackend + route}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    body: data
  });
}
export async function UPDATE(route: string, id: number, data: {}, token?: string) {
  return await fetch(`${urlBackend + route}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}
export async function DELETE(route: string, id: number, token?: string) {
  return await fetch(`${urlBackend + route}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
