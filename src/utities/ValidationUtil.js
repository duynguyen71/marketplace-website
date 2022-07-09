export const isImage = (file) => {
    if (!file || file.isEmpty) {
        console.log('image is  empty');
        return false;
    }
    if (file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
        return true;
    }
    console.log('image extensions not match');
    return false;
}