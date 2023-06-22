import { get,del,put,post } from "./api.js";

export async function getAll(){
    return get('/data/shoes?sortBy=_createdOn%20desc')
}

export async function getById(id){
    return get(`/data/shoes/${id}`)
}

export async function deleteById(id){
    return del(`/data/shoes/${id}`);
}

export async function updateById(id,{brand,model,imageUrl,release,designer,value}){
    return put(`/data/shoes/${id}`,{brand,model,imageUrl,release,designer,value});
}

export async function create({brand,model,imageUrl,release,designer,value}){
    return post(`/data/shoes`,{brand,model,imageUrl,release,designer,value});
}


export async function getSerchedItems(inpValue){
    return get(`/data/shoes?where=brand%20LIKE%20%22${inpValue}%22`);
}


