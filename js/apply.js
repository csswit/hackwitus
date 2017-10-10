$('#resumeLink').on('change',() => {
  const link = document.getElementById("resumeLink").value
  if (isURL(link)) {
    $('#resumeUpload').hide()
  } else {
    $('#resumeUpload').show()
  }
})
$(window).on('load',() => {
  $("#loadingSection").hide()
})
const schoolListArray =  schoolList.split("\n")
const validResumeType = ["pdf", "doc", "docx", "jpg", "ppt", "pptx", "jpeg"]

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

$("#school").autocomplete({
  maxShowItems: 5,
  source: schoolListArray
})

$("#applicationForm").submit(e => {
  e.preventDefault()
  if (!($('#confirmation').is(':checked'))) {
      alert("Please confirm that you are older than 18 and you will follow MLH and HackWITus policies")
  }
  else {
    const rawFormData = document.forms.applicationForm;
    const newUserData = {
      "name": rawFormData.name.value,
      "birthDate": "01/01/1990",
      "gender": rawFormData.gender.value,
      "email": rawFormData.email.value,
      "phoneNumber": "123-456-789",
      "school": rawFormData.school.value,
      "shirtSize": rawFormData.shirtSize.value,
      "resumeURL": rawFormData.resumeLink.value,
      "dietaryRestriction": rawFormData.dietaryRestriction.value,
      "accommodations": rawFormData.accommodations.value,
      "additionalComment": rawFormData.additionalComment.value
    };
    const resumeUploadedFile = rawFormData.resumeUpload.files[0]
    if (resumeUploadedFile.name != "") {
      if (isValidFile(resumeUploadedFile.name)){
        const randString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        newUserData.resumeURL = `${newUserData.name}_${randString}`
        uploadFileToAMZS3ThenSubmitNewUser(resumeUploadedFile, newUserData.resumeURL, newUserData)
      } else {
        alert("We only accept .pdf, .doc, .docx, .jpg, .ppt, .pptx, .jpeg")
      }
    } else if (newUserData.resumeURL != ""){
      if (isURL(newUserData.resumeURL)) submitNewUser(newUserData)
      else alert("Please provide a valid URL")
    } else {
      $("#applicationForm").show();
      alert("Please upload your resume!")
    }
  }
})

function isValidFile(fileName){
  const extension = getExt(fileName)
  console.log(extension)
  let result = false
  validResumeType.forEach(acceptedType => {
    if (extension.toString() == acceptedType.toString()) result = true
  })
  return result
}

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
  $("#applicationForm").trigger('reset')
  $("#applicationForm").hide();
  $("#school").autocomplete("destroy")
  $("#loadingSection").show()
  $.post("https://hackwitus-fall-2017-reg-app.herokuapp.com/users/", data)
  .done((data) => { $(location).attr('href', 'success.html') })
}

function getExt(filename){
  return filename.split('.').pop();
}
