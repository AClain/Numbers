import axios from 'axios';

class Calls {
    getRandomActivity() {
        return new Promise((resolve, reject) => {
            axios.get('https://www.boredapi.com/api/activity')
                .then(
                    (res) => {
                        resolve(res.data.activity);
                    }, (err) => {
                        reject(err);
                    }
                );
        });
    }

    getNumberFact(number, type) {
        return new Promise((resolve, reject) => {
            axios.get('https://numbersapi.com/' + number + '/' + type)
                .then(
                    (res) => {
                        resolve(res.data);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }

    getDateFact(date) {
        const currDate = new Date(date);
        const currDateMonth = currDate.getMonth() + 1;
        const currDateDay = currDate.getDate();

        return new Promise((resolve, reject) => {
            axios.get('https://numbersapi.com/' + currDateMonth + '/' + currDateDay + '/date')
                .then(
                    (res) => {
                        resolve(res.data);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }
}

export default new Calls();
