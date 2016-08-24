module.exports = {

    subscribers: new Set(),

    signIn(auth) {
        if(auth) {
            localStorage.auth = JSON.stringify(auth);
            this.onAuth(true);
        }
    },

    logOut() {
        delete localStorage.auth;
        this.onAuth(false);
    },

    loggedIn() {
        return !!localStorage.auth;
    },

    sub(component) {
        this.subscribers.add(component);
        component.onAuth(this.loggedIn());
    },

    unsub(component) {
        this.subscribers.delete(component);
    },

    onAuth(loggedIn) {
        this.subscribers.forEach( (sub) => {
            sub.onAuth.bind(sub)(loggedIn);
        });
    }
};