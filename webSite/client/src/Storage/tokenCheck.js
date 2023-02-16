import { makeAutoObservable } from "mobx"

export default class tokenEmpCheck {
    constructor(){
        this._isAuthEmp = false
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuthEmp(bool){
        this._isAuthEmp = bool
    }
    setUser(user){
        this._user = user
    }

    get isAuthEmp() {
        return this._isAuthEmp
    }
    get user(){
        return this._user
    }

}