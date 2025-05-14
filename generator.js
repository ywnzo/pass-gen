const char_amount = document.querySelector('#char-amount-slider');
const slider_value = document.querySelector('#slider-value');
const generate_btn = document.querySelector('#generate-btn');
const password_output = document.querySelector('#password');
const copied_alert = document.querySelector('#copied-alert');

class PasswordGenerator {
    chars = "qwertyuopasdfghkzxcvbnmQWERTYUOPASDFGHKZXCVBNM1234567890";
    capitals = "QWERTYUOPASDFGHKZXCVBNM";
    numbers = "1234567890";

    get_random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    generate() {
        var amount = char_amount.value;
        var password = '';

        var hasNumbers = false;
        var hasCapital = false;
        
        for (let i = 0; i < amount; i++) {
            const char = this.get_random(this.chars);
            password += char;
        }

        for (let i = 0; i < password.length; i++) {
            if(this.capitals.includes(password[i])) {
                hasCapital = true;
            }
            if(this.numbers.includes(password[i])) {
                hasNumbers = true;
            }
        }

        if(!hasCapital) {
            for (let i = 0; i < password.length; i++) {
                if(!this.numbers.includes(password[i])) {
                    password = password.replace(password[1], this.get_random(this.capitals))
                    break;
                }
            }
        }

        if(!hasNumbers) {
            for (let i = 0; i < password.length; i++) {
                if(!this.capitals.includes(password[i])) {
                    password = password.replace(password[1], this.get_random(this.numbers))
                    break;
                }
            }
        }
        
        password_output.style.scale = '0.9';
        setTimeout(() => {
            password_output.innerHTML = password;
            password_output.style.scale = '1';
        }, 100);
    }
}


function load_value_text() {
    slider_value.innerHTML = char_amount.value;
}

function main() {
    const generator = new PasswordGenerator();
    load_value_text();
    char_amount.addEventListener('input', () => {
        load_value_text();
        generator.generate();
    })

    generate_btn.addEventListener('click', () => {
        generator.generate();
    });

    password_output.addEventListener('click', () => {
        navigator.clipboard.writeText(password_output.innerHTML);
        copied_alert.style.transform = 'translate(-50%, 0)';
        setTimeout(() => {
            copied_alert.style.transform = 'translate(-50%, -320px)';
        }, 1500)
    })

    generator.generate();
}

main();