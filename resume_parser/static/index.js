const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const submitButton = document.getElementById('submitButton');
const loadingText = document.getElementById('loadingText');
const resultTextarea = document.getElementById('result');
const resultSection = document.getElementById('resultSection');
const errorMessage = document.getElementById('errorMessage');
const csrftoken = document.querySelector('[name=csrf-token]').content;


fileInput.addEventListener('change', () => {
    fileName.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : '';
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    submitButton.disabled = true;
    loadingText.style.display = 'block';
    resultSection.style.display = 'none';

    fetch("upload-resume/", {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrftoken
        }
    })
    .then(response => response.json())
    .then(data => {
        resultSection.style.display = 'block';
        if (data.error) {
            errorMessage.textContent = data.error;
            resultTextarea.style.display = 'none';
        } else {
            resultTextarea.value = JSON.stringify(data, null, 2);
            errorMessage.textContent = '';
            resultTextarea.style.display = 'block';
        }
    })
    .catch(error => {
        resultSection.style.display = 'block';
        errorMessage.textContent = 'An error occurred: ' + error;
        resultTextarea.style.display = 'none';
    })
    .finally(() => {
        submitButton.disabled = false;
        loadingText.style.display = 'none';
    });
});