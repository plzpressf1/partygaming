import { observable, action, makeObservable } from "mobx";

class Store {
    public authModalActive = false;

    constructor() {
        makeObservable(this, {
            authModalActive: observable,
            setAuthModalActive: action,
        });
    }

    setAuthModalActive(active: boolean) {
        this.authModalActive = active;
    }
}

export const UserStore = new Store();
