import { observable, action, makeObservable } from "mobx";
import { Maybe } from "@pg/types";
import { TokenizedUser } from "@pg/interfaces";

class Store {
    public user: Maybe<TokenizedUser> = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
        });
    }

    setUser(user: Maybe<TokenizedUser>) {
        this.user = user;
    }
}

export const UserStore = new Store();
