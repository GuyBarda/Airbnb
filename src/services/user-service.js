import { storageService } from './async-storage-service';
import { utilService } from './utils-service.js';
// import { stayService } from './stay-service-local.js';
import { stayService } from './stay-service.js';
import { httpService } from './http-service.js';
import { store } from '../store/store';
// import { orderService } from './order-service-local';
import { orderService } from './order-service.js';

import {
    socketService,
    SOCKET_EVENT_USER_UPDATED,
    SOCKET_EMIT_USER_WATCH,
} from './socket-service';
import { showSuccessMsg, showErrorMsg, WishlistMsg } from './event-bus-service';
// import usersJson from '../../data/users.json' assert { type: 'json' };

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
const STORAGE_KEY_USER = 'users';
let gUsers;
// _createUsers();
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
    setWishlist,
    getTripsByUserId,
    addToUserStays,
};

window.userService = userService;

function getUsers() {
    return httpService.get(`user`);
    let users = storageService.query('user');
    showSuccessMsg(`This user  just got updated from socket, new score:`);
    return users;
}

async function getTripsByUserId(buyerId) {
    return await orderService.query({ buyerId });
    // return orders.filter((order) => order.buyer._id === userId);
}

function onUserUpdate(user) {
    showSuccessMsg(
        `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    );
    store.dispatch({ type: 'setWatchedUser', user });
}

async function getById(userId) {
    // const user = await storageService.get(STORAGE_KEY_USER, userId);
    const user = await httpService.get(`user/${userId}`);

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate);
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate);

    return user;
}
function remove(userId) {
    // return storageService.remove(STORAGE_KEY_USER, userId);
    return httpService.delete(`user/${userId}`);
}

async function update(user) {
    // await storageService.put(STORAGE_KEY_USER, user);
    user = await httpService.put(`user/${user._id}`, user);
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user);
    return user;
}

async function login(userCred) {
    // const users = await storageService.query(STORAGE_KEY_USER);

    // const user = users.find((user) => user.username === userCred.username);
    const user = await httpService.post('auth/login', userCred);
    if (user) {
        showSuccessMsg(` user ${user.fullname}  just login`);
        // socketService.login(user._id)
        return saveLocalUser(user);
    }
}
async function signup(userCred) {
    // guest 1
    // gg gg1
    // Nadir 123
    // Shon shon1 (?)
    if (!userCred.imgUrl)
        userCred.imgUrl =
            // 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
            'https://res.cloudinary.com/dirvusyaz/image/upload/v1670419729/77_eaxuqe.png';
    // 'https://res.cloudinary.com/dirvusyaz/image/upload/v1670345530/nadir_ri9xaj.png';
    // 'https://res.cloudinary.com/dirvusyaz/image/upload/v1670419391/65b33e0e-4ac6-43c9-b226-ce2cb5799465_gd6sox.webp';
    // 'https://res.cloudinary.com/dirvusyaz/image/upload/v1670419617/Gigi-Hadid-ujawnila-imie-swojej-coki.-Zrobila-to-w-nietypowy-sposob_article_gybjfe.jpg';
    // const user = await storageService.post(STORAGE_KEY_USER, userCred);
    const user = await httpService.post('auth/signup', userCred);
    // socketService.login(user._id)
    showSuccessMsg(` user ${user.fullname}  just signup`);
    return saveLocalUser(user);
}
async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    socketService.logout();
    showErrorMsg(` user just logout`);
    return await httpService.post('auth/logout');
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

async function setWishlist(stayId) {
    const { _id } = getLoggedinUser();
    const user = await getById(_id);

    const idx = user.wishlist.findIndex((stay) => stay._id === stayId);
    if (idx > -1) {
        user.wishlist.splice(idx, 1);
        return await update(user);
    }
    const { name, imgUrls, loc } = await stayService.getById(stayId);
    const miniStay = {
        _id: stayId,
        name,
        imgUrls,
        address: loc.address,
    };
    user.wishlist.push(miniStay);
    return await update(user);
}

async function addToUserStays(miniStay) {
    const { _id } = getLoggedinUser();
    const user = await getById(_id);
    user.stays.push(miniStay);
    return await update(user);
}
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

// function _createUsers() {
//     var users = utilService.loadFromStorage(STORAGE_KEY_USER);
//     if (!users || !users.length) {
//         users = usersJson;
//         utilService.saveToStorage(STORAGE_KEY_USER, users);
//     }
//     gUsers = users;
//     return users;
// }
