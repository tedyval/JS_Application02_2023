import {get,put,post,del} from './api.js'

let endpoints = {
    allIdeas: "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    detailsById: "data/ideas/",
    deleteIdea: "data/ideas/",
    postIdea: "data/ideas"
}

export async function getAllIdeas(){
  return  get(endpoints.allIdeas);
}

export async function getDetailsById(id){
    return get(endpoints.detailsById + id);
}

export async function deleteIdeaById(id){
    return del(endpoints.deleteIdea + id);
}

export async function postNewIdea({title,description,imageURL}){
    return post(endpoints.postIdea,{title,description,imageURL})
}