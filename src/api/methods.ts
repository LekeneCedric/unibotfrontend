import { useAppSelector } from "../../hooks";

const url = "http://192.168.212.113:8000/api/";
export async function GET(route: string,token?:string)
{
  return await fetch(`${url+route}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
}
export async function POST(route:string,data:any,token?:string)
{
  return await fetch(`${url+route}`,{
    method: "POST",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    body: data
  });
}
export async function UPDATE(route:string,id:number,data:{},token?:string)
{
  return await fetch(`${url+route}`,{
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}
export async function DELETE(route:string,id:number,token?:string)
{
  return await fetch(`${url+route}`,{
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
