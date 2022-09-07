//defines the time and date speech-commands for jarvis
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
        const time_prefix = date.getHours() <= 12 ? "AM" : "PM";    //AM after midnight, PM after noon
        const minute = date.getMinutes();
        const hour = date.getHours() % 12;

        return `It is now ${hour} ${minute} ${time_prefix}`;
    },

    Date: () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = months[date.getMonth()];  //convert month number to name
        let day = date.getDate();
        
        //adds "first" if the day ends wth 1, "second" if it ends with 2, "third" if t ends with 3 or "th" if it ends with anything else
        if (0 < day%10 && day%10 < 4 && Math.floor(day/10) != 1){
            day = `${String(Math.floor(day/10)*10)} ${days_to_speech[day%10-1]}`;
        }
    
        else{
            day = `${String(day)}th`;
        }
    
        return `Today is the ${day} of ${month}, ${year}`;
    }
}