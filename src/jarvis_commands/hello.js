greetings = [
    "Hi ",
    "Hello ",
    "How are you?",
    "How are you doing today ",
]

module.exports = {
    Hello: () => {
        const rand_ind = Math.floor(Math.random() * greetings.length);
        return greetings[rand_ind]; // + name
    }
}