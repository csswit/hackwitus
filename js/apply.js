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
  }
  console.log(newUserData)
  const resumeFile = formData.get('resumeUpload');
  if (resumeFile != null) {
    newUserData.resumeURL = `${newUserData.name}_${newUserData.birthDate}_${newUserData.phoneNumber}`
    uploadFileToAMZS3(resumeFile, newUserData.resumeURL)
  }

  $.post("https://hackwitus-fall-2017-reg-app.herokuapp.com/users/", newUserData)
  .done((data) => {
    console.log(data)
    $(location).attr('href', 'success.html')
  })
})

function uploadFileToAMZS3(file, fileName){
  const postFormData = new FormData();
  postFormData.append("Content-Type","multipart/form-data");
  postFormData.append("acl","public-read");
  postFormData.append("key",`${fileName}.${getExt(file.name)}`);
  postFormData.append("file",file)

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://hackwitus-fall2017-resume.s3.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND

  xhr.send(postFormData);
}

function getExt(filename){
  return filename.split('.').pop();
}
