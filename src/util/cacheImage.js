import{Image} from 'react-native';
export function cacheImage(images){
    return images.map(image=>{
        if(typeof image==='string'){
            return Image.prefetch(image);
        }
    });
}