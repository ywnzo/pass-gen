const char_amount = document.querySelector('#char-amount-slider');
const slider_value = document.querySelector('#slider-value');
const generate_btn = document.querySelector('#generate-btn');
const password_output = document.querySelector('#password');
const copied_alert = document.querySelector('#copied-alert');

class PasswordGenerator {
    chars = "qwertyuopasdfghkzxcvbnmQWERTYUOPASDFGHKZXCVBNM1234567890";

    get_random() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
    
    generate() {
        var amount = char_amount.value;
        var password = '';
        
        for (let i = 0; i < amount; i++) {
            const char = this.get_random();
            password += char;
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