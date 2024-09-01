from django.core.files.uploadedfile import UploadedFile
from django.core.exceptions import ValidationError

import os

VALID_EXTENSIONS = [
    ".pdf",
    ".docx",
    ".doc"
]

def validate_file_extension(file_object: UploadedFile):
    ext: str = os.path.splitext(file_object.name)[1]
    if ext.lower() not in VALID_EXTENSIONS:
        raise ValidationError(f"Only PDF and DOC files are accepted. {ext} file detected")
    
    return ext
    
    

def validate_file_size(file_object: UploadedFile):
    MAX_UPLOAD_SIZE = 2_097_152 # bytes
    if file_object.size > MAX_UPLOAD_SIZE:
        raise ValidationError(f"Max file size is 2MB. You uploaded {file_object.size/1_048_576:.2f}MB")
    