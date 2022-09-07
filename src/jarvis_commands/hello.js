//defines the hello speech-command for jarvis
greetings = [
    "Hi ",
    "Hello ",
    "How are you?",
    "How are you doing today ",
]

module.exports = {
    Hello: () => {
        const rand_ind = Math.floor(Math.random() * greetings.length);  //choose a random reply from the greeting list
        return greetings[rand_ind]; // + name
    }
}