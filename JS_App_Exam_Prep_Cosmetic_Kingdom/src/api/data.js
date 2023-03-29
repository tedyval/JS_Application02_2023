import { get, post, put, del } from './api.js'

export async function getAll() {
     return get('/data/products?sortBy=_createdOn%20desc');
}

export async function getById(id) {
     return get('/data/products/' + id);
}

export async function deleteById(id) {
     return del('/data/products/' + id);
}

export async function createItem({ name, imageUrl, category, description, price }) {
     return post('/data/products', { name, imageUrl, category, description, price });
}

export async function updateItem(id, { name, imageUrl, category, description, price }) {
     return put(`/data/products/${id}`, { name, imageUrl, category, description, price });
}

export async function boughtItem(productId) {
     return post(`/data/bought`, { productId })
}

export async function boughtCount(productId) {
     return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`)
}

export async function isBought(productId, userId) {
     return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}