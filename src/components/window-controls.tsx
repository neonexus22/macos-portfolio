/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import type { WINDOW_CONFIG_KEY } from "../constants"
import useWindowStore from "../store/window"

const WindowControls = ({ target }: { target: WINDOW_CONFIG_KEY }) => {

    const { closeWindow } = useWindowStore();

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize" />
            <div className="maximize" />
        </div>
    )
}

export default WindowControls