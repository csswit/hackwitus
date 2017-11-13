$(window).on('load',() => {
    $("#loadingSection").hide()
    $("#errorSection").hide()
    $("#yesSection").hide()
    $("#noSection").hide()
})
$("#rsvpForm").submit(e => {
    e.preventDefault()
    
    const rawFormData = document.forms.rsvpForm;
    const updateUserData = {
    "email": rawFormData.email.value,
    "rsvp": rawFormData.rsvp.value
    };
    updateUser(updateUserData)
})

function updateUser(data) {
    $("#rsvpForm").trigger('reset')
    $("#rsvpForm").hide();
    $("#loadingSection").show()
    $.post("https://hackwitus-fall-2017-reg-app.herokuapp.com/rsvp", data)
    .done((user) => { 
        console.log("done");
        $("#loadingSection").hide()
        if (user != null) {
            if (data.rsvp == 'y') {
                $("#yesSection").show()
            } else if (data.rsvp == 'n') {
                $("#noSection").show()                
            }
        } else {
            $("#errorSection").show()
        }
    })
}
$("#redoRSVP").click(()=>{
    $("#rsvpForm").show();
    $("#loadingSection").hide()
    $("#errorSection").hide()
    $("#yesSection").hide()
    $("#noSection").hide()
})
