module.exports = {
    Google: () => {
        const rand_ind = Math.floor(Math.random() * greetings.length);
        return greetings[rand_ind]; // + name
    }
}