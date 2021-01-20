function Upload() {

    var fileInput = document.getElementById("fileInput");

    // // To convert a File into Blob (not recommended)
    // var blob = null;
    // var file = fileInput.files[0];
    // let reader = new FileReader();
    // reader.readAsArrayBuffer(file)
    // reader.onload = function (e) {
    //     blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
    //     console.log(blob);
    // }

    console.log("fileInput: ", fileInput);
    console.log("fileInput: ", fileInput.files[0]);

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("myFile", fileInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
    // formData.append("myFile", blob, "myFileNameAbc"); // you can also send file in Blob form (but you really dont need to covert a File into blob since it is Actually same, Blob is just a new implementation and nothing else, and most of the time (as of january 2021) when someone function says I accept Blob it means File or Blob) see: https://stackoverflow.com/questions/33855167/convert-data-file-to-blob
    formData.append("myName", "Razzaq"); // this is how you add some text data along with file
    formData.append("myDetails",
        JSON.stringify({
            "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
            "year": "2021"
        })
    );

    // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
    axios({
        method: 'post',
        url: "http://localhost:5000/upload",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(res => {
            console.log("Upload Success " + res.data.message);
            alert(res.data.message);
            document.getElementById("showPic").innerHTML = res.data.file;
        })
        .catch(err => {
            console.log(err);
        })

    return false; // dont get confused with return false, it is there to prevent html page to reload/default behaviour, and this have nothing to do with actual file upload process but if you remove it page will reload on submit -->
}

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type = file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function (){
        // Conver image file to base64
        preview.src = reader.result;
    }, false);
    if(file) {
        reader.readAsDataURL(file);
    }
    return false;
}