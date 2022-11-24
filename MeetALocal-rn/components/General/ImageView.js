import ImageView from "react-native-image-viewing";
const ImageViewer=({images, imageView, setImageView})=>{
    return(
        <ImageView
        images={images}
        imageIndex={0}
        visible={imageView}
        onRequestClose={() => setImageView(false)}/>
    )
}
export default ImageViewer