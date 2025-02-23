const localData = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key){
        const stored = localStorage.getItem(key);
        return stored == null ? undefined : JSON.parse(stored)
    },
    remove(key){
        localStorage.removeItem(key)
    }
}

export function AuthPlayer(id, name){
    localData.set("userName", name);
    localData.set("isLoggedIn", true);
}

export function CheckAuthStatus(){
    return localData.get("isLoggedIn");
}

export function Logout(){
    localData.remove("userName");
    localData.remove("isLoggedIn");
}