export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    getDates,
    hoverEffect,
    format,
    getMonthsMap,
}

function makeId(length = 6) {
    var txt = ""
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = [
        "The sky",
        "above",
        "the port",
        "was",
        "the color of television",
        "tuned",
        "to",
        "a dead channel",
        ".",
        "All",
        "this happened",
        "more or less",
        ".",
        "I",
        "had",
        "the story",
        "bit by bit",
        "from various people",
        "and",
        "as generally",
        "happens",
        "in such cases",
        "each time",
        "it",
        "was",
        "a different story",
        ".",
        "It",
        "was",
        "a pleasure",
        "to",
        "burn",
    ]
    var txt = ""
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + " "
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}


function getDates() {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    const month = months[getRandomIntInclusive(0, months.length - 1)]

    const day = getRandomIntInclusive(1, 31)
    let lastDay = day + 4
    if (lastDay > 31) {
        let diff = lastDay - 31
        lastDay = diff
        if (month === "Dec") return `${month} ${day} - Jan ${lastDay}`
        return `${month} ${day} - ${
            months[months.indexOf(month) + 1]
        } ${lastDay}`
    }
    return `${month} ${day} - ${lastDay}`
}

function hoverEffect(ev) {
    const button = ev.target
    const { x, y } = button.getBoundingClientRect()
    button.style.setProperty("--x", ev.clientX - x + "px")
    button.style.setProperty("--y", ev.clientY - y + "px")
}

function format(num) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })
    let price = formatter.format(num)
    let dotIdx = price.indexOf(".")
    return price[dotIdx + 1] === "0" ? price.slice(0, dotIdx) : price
}

function getMonthsMap() {
    const months = {
        January: {
            firstDay: 1,
            days: 31,
        },
        February: {
            firstDay: 4,
            days: 28,
        },
        March: {
            firstDay: 4,
            days: 31,
        },
        April: {
            firstDay: 0,
            days: 30,
        },
        May: {
            firstDay: 2,
            days: 31,
        },
        June: {
            firstDay: 5,
            days: 30,
        },
        July: {
            firstDay: 0,
            days: 31,
        },
        August: {
            firstDay: 3,
            days: 31,
        },
        September: {
            firstDay: 6,
            days: 30,
        },
        October: {
            firstDay: 1,
            days: 31,
        },
        November: {
            firstDay: 4,
            days: 30,
        },
        December: {
            firstDay: 6,
            days: 31,
        },
    }
    return months
}
