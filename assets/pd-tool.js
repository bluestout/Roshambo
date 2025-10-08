                  

var clientId = "fa3e9425-06f1-4d6d-b20b-ea3fde9ac1e1"; // Use the Client ID you got from 6Over6

var serverUrl = "https://api.glasseson.com/prod/"

var profileName = "web"; // Use the Profile Name you got from 6Over6

var options = {

    themeColor: "#5FB8E3",

    fontFamily: "Arial",

    profileName: profileName,

    fullPage : true,
    
    flow: "pd"
};

function handleSuccess() {

    glasseson.setResultCallback(resultCallback);

    glasseson.setCloseCallback(closeCallback);

}

function getPrescriptionClicked(e) {
    glasseson.open("pd");

}

function handleError(error) {

    console.log(error);

}

glasseson.init(clientId, serverUrl, options).then(

    response => {
    handleSuccess();

    },

    error => {
    handleError(error);

    }

);

function closeCallback(result) {

   console.log('pd tool is now closed...')

}

function resultCallback(result) {
    if(document.querySelector(`#pd-number`) != null){
        document.querySelector(`#pd-number`).value = Number(result.data.pd)
    }

    if (result['isFlowComplete'] == true) {
        glasseson.close();
    }

}

function landingSubmit(button){
    let parent = button.parentElement;
    let pd = parent.querySelector(`#pd-number`);
    let email = parent.querySelector(`#pd-email`);
    let order = parent.querySelector(`#pd-order`);
    let notes = parent.querySelector(`#pd-notes`);
    let elements = [pd, email, order, notes];
    let unfilled = elements.filter(element => element.value == "");
    if(unfilled.length > 0){
        resetHighlights();
        document.querySelector(`#submit-pd`).classList.add(`shake`)
        unfilled.forEach(element => {
            element.classList.add(`error-highlight`)
        })
        setTimeout(() => {
            document.querySelector(`#submit-pd`).classList.remove(`shake`)
        }, 1200);
    }else{
        resetHighlights();
        if(!isEmail(email.value)){
            email.classList.add(`error-highlight`)
        }else{
            let data = {
                PD: pd.value,
                Email: email.value,
                Order: order.value,
                Notes: notes.value,
                Date: new Date().toLocaleDateString("en-US")
            }

            $.ajax(`https://t6gbodypptfcd2m6dvvne6tyue0zseiv.lambda-url.us-east-1.on.aws/`, {
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(data) {
                    console.log(data)
                },
                error: function(error) {
                    console.log(error)
                },
                complete: function(data) {
                    console.log(`complete`, data)
                    document.querySelector(`#submit-pd`).innerHTML = `E-Mail has been sent!`;

                    setTimeout(() => {
                        document.querySelector(`#submit-pd`).innerHTML = `Submit Your PD`;
                    }, 3000);
                   
                    elements.forEach(e => {
                        e.value = "";
                    })

                    document.querySelector(`.confirm-message`).style.display = `block`;

                }
            });

        }

    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function resetHighlights(){
    let container = document.querySelector(`.pd-inputs`);
    let inputs = container.querySelectorAll(`input`);
    inputs.forEach(input => {
        input.classList.remove(`error-highlight`)
    })
}
