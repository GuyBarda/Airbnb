import { userService } from '../services/user-service';
import { stayService } from '../services/stay-service-local';
import { utilService } from '../services/utils-service';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket-service'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        watchedUser: null,
    },
    getters: {
        users({ users }) {
            return users;
        },
        loggedinUser({ loggedinUser }) {
            return loggedinUser;
        },
        watchedUser({ watchedUser }) {
            return watchedUser;
        },
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as for score not reactive from birth
            state.loggedinUser = user ? { ...user } : null;
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter((user) => user._id !== userId);
        },
        setUserScore(state, { score }) {
            state.loggedinUser.score = score;
        },
    },
    actions: {
        async setWishlist({ commit,state }, { miniStay }) {
            try {
<<<<<<< HEAD
                await userService.setWishlist(state.loggedinUser,miniStay);
=======
                let user = await userService.setWishlist(stayId);
                commit({ type: 'setLoggedinUser', user });
                return user;
>>>>>>> f9434bf82991d0272a4205e231d11c09e8a72f4b
            } catch {
                console.log('cant add to wishlist');
            }
        },
        async login({ commit }, { cred }) {
            try {
                const user = await userService.login(cred);
                commit({ type: 'setLoggedinUser', user });
                return user;
            } catch (err) {
                console.log('userStore: Error in login', err);
                throw err;
            }
        },
        async signup({ commit }, { cred }) {
            try {
                const user = await userService.signup(cred);
                commit({ type: 'setLoggedinUser', user });
                return user;
            } catch (err) {
                console.log('userStore: Error in signup', err);
                throw err;
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout();

                commit({ type: 'setLoggedinUser', user: null });
            } catch (err) {
                console.log('userStore: Error in logout', err);
                throw err;
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers();
                commit({ type: 'setUsers', users });
            } catch (err) {
                console.log('userStore: Error in loadUsers', err);
                throw err;
            }
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                commit({ type: 'setWatchedUser', user });
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err);
                throw err;
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId);
                commit({ type: 'removeUser', userId });
            } catch (err) {
                console.log('userStore: Error in removeUser', err);
                throw err;
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user);
                commit({ type: 'setUser', user });
            } catch (err) {
                console.log('userStore: Error in updateUser', err);
                throw err;
            }
        },
        async increaseScore({ commit }) {
            try {
                const score = await userService.changeScore(100);
                commit({ type: 'setUserScore', score });
            } catch (err) {
                console.log('userStore: Error in increaseScore', err);
                throw err;
            }
        },
        async loadUser({ commit }) {
            // TODO: loading
            try {
                const user = await userService.getLoggedinUser();
                commit({ type: 'setLoggedinUser', user });
            } catch (err) {
                console.log('userStore: Error in loadUsers', err);
                throw err;
            }
        },
        async addOrderToUser({ commit }, { order }) {
            let { _id } = userService.getLoggedinUser();
            let user = await userService.getById(_id);
            user.orders.push(order);
            user = await userService.update(user);
        },
        // Keep this action for compatability with a common user.service ReactJS/VueJS
        setWatchedUser({ commit }, payload) {
            commit(payload);
        },
    },
};
