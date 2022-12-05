import { houseService } from '../services/house-service-local.js'

export function getActionRemoveHouse(houseId) {
    return {
        type: 'removeHouse',
        houseId
    }
}
export function getActionAddHouse(house) {
    return {
        type: 'addHouse',
        house
    }
}
export function getActionUpdateHouse(house) {
    return {
        type: 'updateHouse',
        house
    }
}

export function getActionAddHouseMsg(houseId) {
    return {
        type: 'addHouseMsg',
        houseId,
        txt: 'Stam txt'
    }
}

export const houseStore = {
    state: {
        houses: [],
        filterBy: {}
    },
    getters: {
        houses({ houses }) {
            console.log(houses);
            return Object.values(houses)
        },
    },
    mutations: {
        setHouses(state, { houses }) {
            state.houses= houses
        },
        addHouse(state, { house }) {
            state.houses.push(house)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = { ...state.filterBy, ...JSON.parse(JSON.stringify(filterBy)) }
        },
        updateHouse(state, { house }) {
            const idx = state.houses.findIndex(c => c.id === house._id)
            state.houses.splice(idx, 1, house)
        },
        removeHouse(state, { houseId }) {
            state.houses = state.houses.filter(house => house._id !== houseId)
        },
        addHouseMsg(state, { houseId, msg }) {
            const house = state.houses.find(house => house._id === houseId)
            if (!house.msgs) house.msgs = []
            house.msgs.push(msg)
        },
    },
    actions: {
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadHouses' })
            // state.filterBy = {...filterBy,...state.filterBy}
        },
        async addHouse(context, { house }) {
            try {
                house = await houseService.save(house)
                context.commit(getActionAddHouse(house))
                return house
            } catch (err) {
                console.log('houseStore: Error in addHouse', err)
                throw err
            }
        },
        async updateHouse(context, { house }) {
            try {
                console.log('house', house)
                house = await houseService.save(house)

                context.commit(getActionUpdateHouse(house))
                return house
            } catch (err) {
                console.log('houseStore: Error in updateHouse', err)
                throw err
            }
        },
        async loadHouses({ commit, state }) {
            try {
                let houses = await houseService.query(state.filterBy)
<<<<<<< HEAD
                
=======
>>>>>>> 01e48f9f9ce6d245bfd3fe85e2110e453c6f37bd
                commit({ type: 'setHouses', houses })
                return houses
            } catch (err) {
                console.log('houseStore: Error in loadHouses', err)
                throw err
            }
        },
        async removeHouse(context, { houseId }) {
            try {
                await houseService.remove(houseId)
                context.commit(getActionRemoveHouse(houseId))
            } catch (err) {
                console.log('houseStore: Error in removeHouse', err)
                throw err
            }
        },
        async addHouseMsg(context, { houseId, txt }) {
            try {
                const msg = await houseService.addHouseMsg(houseId, txt)
                context.commit({ type: 'addHouseMsg', houseId, msg })
            } catch (err) {
                console.log('houseStore: Error in addHouseMsg', err)
                throw err
            }
        },

    }
}