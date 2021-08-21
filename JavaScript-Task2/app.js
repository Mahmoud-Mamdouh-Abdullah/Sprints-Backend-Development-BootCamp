const dayMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const person = {
    name: '',
    password: 0,
    month: 0,
    day: 0,
    horoscope: ''
}

const getName = function() {
    let personName = prompt("Enter your name please!");

    while(personName.length <= 0 || personName == null) {
        personName = prompt("Enter your name please!");
    }
    
    return personName;
}

const getPassword = function() {
    let cnt = 0;
    let pass;
    while(cnt < 3) {
        pass = parseInt(prompt("Enter your password please!"));
        if(pass === 123)
            return pass;
        cnt ++;
        console.log(`pass = ${pass} and cnt = ${cnt}`);
    }
    if(cnt === 3 && pass !== 123) {
        alert("“you’ve entered wrong password 3 times");
    }
    return false;

}

const getMonth = function() {
    let month = parseInt(prompt("Enter your birth month"));
    while(true) {
        if(month >= 1 && month <= 12) {
            return month;
        } else {
            month = parseInt(prompt("Enter your birth month"));
        }
    }
}

const getDay = function(month) {
    let day = parseInt(prompt('Enter your birthday'));
    let maxDays = dayMonth[month - 1];

    while(true) {
        if(day >= 0 && day <= maxDays) return day;
        else day = parseInt(prompt('Enter your birthday'));
    }
}

const getHoroscope = function(day, month) {
    let horoscope;
    if((day >= 21 && month === 3) || (day <= 19 && month === 4)) {
        horoscope = 'Aries';
    } else if((day >= 20 && month === 4) || (day <= 20 && month === 5)) {
        horoscope = 'Taurus';
    } else if((day >= 21 && month === 5) || (day <= 21 && month === 6)) {
        horoscope = 'Gemini ';
    } else if((day >= 22 && month === 6) || (day <= 22 && month === 7)) {
        horoscope = 'Cancer ';
    } else if((day >= 23 && month === 7) || (day <= 22 && month === 8)) {
        horoscope = 'Leo';
    } else if((day >= 23 && month === 8) || (day <= 22 && month === 9)) {
        horoscope = 'Virgo';
    } else if((day >= 23 && month === 9) || (day <= 23 && month === 10)) {
        horoscope = 'Libra';
    } else if((day >= 24 && month === 10) || (day <= 21 && month === 11)) {
        horoscope = 'Scorpius';
    } else if((day >= 22 && month === 11) || (day <= 21 && month === 12)) {
        horoscope = 'Sagittarius';
    } else if((day >= 22 && month === 12) || (day <= 19 && month === 1)) {
        horoscope = 'Capricornus';
    } else if((day >= 20 && month === 1) || (day <= 15 && month === 2)) {
        horoscope = 'Aquarius';
    } else if((day >= 19 && month === 2) || (day <= 20 && month === 3)) {
        horoscope = 'Pisces';
    }

    return horoscope;
}

const run = () =>  {
    person.name = getName();
    person.password = getPassword();
    if(person.password === 123) {
        person.month = getMonth();
        person.day = getDay(person.month);
        person.horoscope = getHoroscope(person.day, person.month);
        alert(`Your horoscope is ${person.horoscope}`);
    }
    console.log(person);
}

run();