/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import WindowControls from "../components/window-controls"
import WindowWrapper from "../hoc/window-wrapper"
import useWindowStore from "../store/window"

const Image = () => {

    const { windows } = useWindowStore();
    const data = windows?.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
            </div>
            <div className="p-5 space-y-6 bg-white">
                {imageUrl ? (
                    <div className="w-full">
                        <img src={imageUrl} alt={name} className="w-full h-auto rounded" />
                    </div>
                ) : null}
            </div>
        </>
    )

}

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;