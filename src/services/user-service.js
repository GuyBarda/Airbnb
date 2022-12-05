import { storageService } from './async-storage-service';
import { utilService } from './utils-service.js';
import { houseService } from './house-service-local';
// import { httpService } from './http.service'
import { store } from '../store/store';
import { orderService } from './order-service-local';

import {
    socketService,
    SOCKET_EVENT_USER_UPDATED,
    SOCKET_EMIT_USER_WATCH,
} from './socket-service';
import { showSuccessMsg } from './event-bus-service';
import usersJson from '../../data/users.json' assert { type: 'json' };

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

// utilService.saveToStorage('user', usersJson);

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    setWishlist,
    getTripsByUserId,
};

window.userService = userService;

function getUsers() {
    let users = storageService.query('user');
    // var users = utilService.loadFromStorage(KEY);
    // if (!users || !users.length) {
    //     users = usersJson;
    //     utilService.saveToStorage(KEY, users.slice(0, 100));
    // }
    // // gusers = users;
    return users;
}

async function getTripsByUserId(userId) {
    let orders = await orderService.query();
    return orders.filter((order) => order.buyer._id === userId);
}

function onUserUpdate(user) {
    showSuccessMsg(
        `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    );
    store.dispatch({ type: 'setWatchedUser', user });
}

async function getById(userId) {
    const user = await storageService.get('user', userId);
    // const user = await httpService.get(`user/${userId}`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate);
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate);

    return user;
}
function remove(userId) {
    return storageService.remove('user', userId);
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user);
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user);
    return user;
}

async function login(userCred) {
    const users = await storageService.query('user');

    const user = users.find((user) => user.username === userCred.username);
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user);
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl)
        userCred.imgUrl =
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';

    userCred.orders = [];
    userCred.trips = [];
    userCred.wishlist = [];
    userCred.houses = [];

    const user = await storageService.post('user', userCred);
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user);
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    socketService.logout();
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser();
    if (!user) throw new Error('Not loggedin');
    user.score = user.score + by || by;
    await update(user);
    return user.score;
}

function saveLocalUser(user) {
    delete user.password;
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    localStorage.setItem('loggedinUser', JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    const user =
        JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) ||
        JSON.parse(localStorage.getItem('loggedinUser'));
    return user;
}

async function setWishlist(houseId){
    const { _id } = getLoggedinUser();
    const user = await getById(_id);
    const idx = user.wishlist.findIndex(
        (house) => house._id === houseId
    );
    if (idx > -1) {
        user.wishlist.splice(idx, 1);
        await update(user);
        return;
    }
    const { name, imgUrls, loc } = await houseService.getById(houseId);
    const miniHouse = {
        _id: houseId,
        name,
        imgUrls,
        address: loc.address,
    };
    user.wishlist.push(miniHouse);
    await update(user);
}
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
