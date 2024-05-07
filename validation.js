// Elements
const inputElement = document.querySelector("input");
const formElement = document.querySelector("form");
const modalElement = document.querySelector(".sucess-modal")
const emailTextElement = document.querySelector("#emailTextElement")

// Variables
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let isEmailValid = false;
let email = "";

// Validation
const emailValidation = () => {

    if(inputElement.value.toLowerCase().match(emailRegex)){
        isEmailValid = true;
        email = inputElement.value;
        inputElement.value = "";
        handleSuccessModal(isEmailValid, email);
        sendEmail(isEmailValid, email)
    } else {
        isEmailValid = false;
        inputElement.value = "";
    }

    return elementEmailValidation(isEmailValid);

}

const sendEmail = async (isEmail, email) => {
    if(isEmail){
        const params = {
            email_id: email
        }
        emailjs.send("service_h3yvlo", "template_sd835mg", params).then(() => {
            email = "";
            console.log("Email enviado");
        })

        isEmailValid = false;
    } else {
        return;
    }
}

const elementEmailValidation = (isEmailValid) => {

    if(isEmailValid) {
        inputElement.classList.remove("wrong-email");
    } else {
        inputElement.classList.add("wrong-email");
    }

}

const handleSuccessModal = (isEmailValid, email) => {
    if (isEmailValid) {
        formElement.style.display = "none";
        modalElement.style.display = "flex";
        emailTextElement.innerHTML = `
        A confirmation email has been sent to <strong>${email}</strong>. Please open it and click the button inside to confirm your subscription
        `;
    } else {
        formElement.style.display = "flex";
        modalElement.style.display = "none";
    }
}

formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    emailValidation();
})

modalElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleSuccessModal(false, "");
    inputElement.classList.remove("wrong-email");
})