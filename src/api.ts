import { User } from './type'


const BASE = 'https://jsonplaceholder.typicode.com'


async function handleResponse(res: Response) {
if (!res.ok) {
const text = await res.text()
throw new Error(`${res.status} ${res.statusText} - ${text}`)
}
return res.json()
}


export const api = {
async fetchUsers(): Promise<User[]> {
const res = await fetch(`${BASE}/users`)
return handleResponse(res)
},
async createUser(user: User): Promise<User> {
const res = await fetch(`${BASE}/users`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(user),
})
return handleResponse(res)
},
async updateUser(id: number, user: User): Promise<User> {
const res = await fetch(`${BASE}/users/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(user),
})
return handleResponse(res)
},
async deleteUser(id: number): Promise<{}> {
const res = await fetch(`${BASE}/users/${id}`, {
method: 'DELETE',
})
return handleResponse(res)
}
}