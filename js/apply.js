$('#resumeLink').on('change',() => {
  const link = document.getElementById("resumeLink").value
  if (isURL(link)) {
    $('#fileUpload').hide()
  } else {
    $('#fileUpload').show()
  }
})

function isURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(str);
}


$('#resumeFile').on('change',() =>{
     const filePath = document.getElementById("resumeFile").value
     if (filePath == ""){
       $('#resumeLink').prop("disabled", false)
     } else {
       $('#resumeLink').val("")
       $('#resumeLink').prop("disabled", true)
     }
 });

$("#applicationForm").submit(e => {
  e.preventDefault()
  $("#applicationForm").hide();
  const rawFormData = document.forms.applicationForm;
  const formData = new FormData(rawFormData);
  const newUserData = {
    "name": formData.get('name'),
    "birthDate": formData.get('birthDate'),
    "gender": formData.get('gender'),
    "email": formData.get('email'),
    "phoneNumber": formData.get('phoneNumber'),
    "school": formData.get('school'),
    "shirtSize": formData.get('shirtSize'),
    "resumeURL": formData.get('resumeLink'),
    "dietaryRestriction": formData.get('dietaryRestriction'),
    "accommodations": formData.get('accommodations'),
    "additionalComment": formData.get('additionalComment')
  };
  $("#applicationForm").trigger('reset')
  // console.log(newUserData)
  const resumeFile = formData.get('resumeUpload');
  console.log(resumeFile)
  if (resumeFile.name != "") {
    const birthDate = new Date(newUserData.birthDate).toISOString().slice(0,10).replace(/-/g,"");
    newUserData.resumeURL = `${newUserData.name}_${birthDate}_${newUserData.phoneNumber}`
    uploadFileToAMZS3ThenSubmitNewUser(resumeFile, newUserData.resumeURL, newUserData)
  } else if (newUserData.resumeURL != ""){
    submitNewUser(newUserData)
  } else {
    $("#applicationForm").show();
    alert("Please upload your resume!")
  }
})

function uploadFileToAMZS3ThenSubmitNewUser(file, fileName, newUser){
  const postFormData = new FormData();
  postFormData.append("Content-Type","multipart/form-data");
  postFormData.append("acl","public-read");
  postFormData.append("key",`${fileName}.${getExt(file.name)}`);
  postFormData.append("file",file);

  const reqOptions = {
    method:'POST',
    body:postFormData
  }

  fetch('http://hackwitus-fall2017-resume.s3.amazonaws.com/', reqOptions)
  .then(res => { submitNewUser(newUser) });
}

function submitNewUser(data) {
  $.post("https://hackwitus-fall-2017-reg-app.herokuapp.com/users/", data)
  .done((data) => { $(location).attr('href', 'success.html') })
}

function getExt(filename){
  return filename.split('.').pop();
}
