export const isImage = (file) => {
    if (!file || file.isEmpty) {
        return false;
    }
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        return true;
    }
    return false;
}