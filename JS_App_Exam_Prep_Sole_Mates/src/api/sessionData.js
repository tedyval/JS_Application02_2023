
export function setDataUser(data){
  localStorage.setItem('user',JSON.stringify(data))
}

export function getUserData(){
  return  JSON.parse(localStorage.getItem('user'));
}

export function clearDataUser(){
  localStorage.removeItem("user")
}