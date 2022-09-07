months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

days_to_speech = [
    "first",
    "second",
    "third"
]


module.exports = {
    Time: () => {
        const date = new Date();
        const time_prefix = date.getHours() <= 12 ? "AM" : "PM";
        const minute = date.getMinutes();
        const hour = date.getHours() % 12;

        return `It is now ${hour} ${minute} ${time_prefix}`;
    },

    Date: () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        let day = date.getDate();
        if (0 < day%10 && day%10 < 4 && Math.floor(day/10) != 1){
            day = `${String(Math.floor(day/10)*10)} ${days_to_speech[day%10-1]}`;
        }
    
        else{
            day = `${String(day)}th`;
        }
    
        console.log(`Today is the ${day} of ${month}, ${year}`);
        return `Today is the ${day} of ${month}, ${year}`;
    }
}