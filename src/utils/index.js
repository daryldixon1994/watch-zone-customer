export const baseUrl = "https://watch-zone.onrender.com/api/customer";
// export const baseUrl = "http://localhost/50000/api/customer";
export function getToken() {
  let token = localStorage.getItem("token");
  return token;
}
