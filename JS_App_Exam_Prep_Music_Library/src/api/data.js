import {get,post,put,del} from './api.js';


export async function getAll(){
    return get(`/data/albums?sortBy=_createdOn%20desc`);
}

export async function getById(id){
    return get(`/data/albums/${id}`);
}

export async function deleteById(id){
    return del(`/data/albums/${id}`);
}

export async function createAlbum({singer,album,imageUrl,release,label,sales}){
    return post(`/data/albums`,{singer,album,imageUrl,release,label,sales});
}

export async function updateAlbum(id,{singer,album,imageUrl,release,label,sales}){
    return put(`/data/albums/${id}`,{singer,album,imageUrl,release,label,sales});
}

export async function getTotalLikes(albumId){
     return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}

export async function getOwnLikes(albumId,userId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}


export async function addLike(id){
   return post(`/data/likes`,{id})
}