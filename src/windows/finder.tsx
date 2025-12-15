/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { Search } from "lucide-react"
import WindowControls from "../components/window-controls"
import WindowWrapper from "../hoc/window-wrapper"
import { locations, type LocationChildrenType, type LocationType } from "../constants"
import useLocationStore from "../store/location"
import clsx from "clsx"
import useWindowStore from "../store/window"

const Finder = () => {

    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();

    const renderList = (name: string, items: LocationType[]) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(
                            item.id === activeLocation.id ? "active" : "not-active"
                        )}
                    >
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-4"
                        />
                        <p className="text-sm font-medium truncate">{item.name}</p>
                    </li>))}
            </ul>
        </div>
    )

    const renderChildrenList = (name: string, items: LocationChildrenType[]) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        onClick={() => {
                            if (item.kind === "folder" && item.children) {
                                // Convert LocationChildrenType to LocationType for folders
                                const folderAsLocation: LocationType = {
                                    id: item.id,
                                    name: item.name,
                                    icon: item.icon,
                                    kind: item.kind,
                                    children: item.children
                                };
                                setActiveLocation(folderAsLocation);
                            }
                        }}
                        className={clsx(
                            item.id === activeLocation.id ? "active" : "not-active"
                        )}
                    >
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-4"
                        />
                        <p className="text-sm font-medium truncate">{item.name}</p>
                    </li>))}
            </ul>
        </div>
    )

    const openItem = (item: LocationChildrenType) => {
        if (item.fileType === "pdf") return openWindow("resume")
        if (item.kind === "folder" && item.children) {
            // Convert LocationChildrenType to LocationType for folders
            const folderAsLocation: LocationType = {
                id: item.id,
                name: item.name,
                icon: item.icon,
                kind: item.kind,
                children: item.children
            };
            setActiveLocation(folderAsLocation);
        }
        if (item.fileType && ['fig', 'url'].includes(item.fileType) && item.href) {
            return window.open(item.href, "_blank")
        }

        openWindow(`${item.fileType}${item.kind}`, item);

    }

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList("Favourites", Object.values(locations))}
                    {renderChildrenList("My Apps", locations.work.children)}
                </div>
                <ul className="content">
                    {activeLocation.children.map(item => (
                        <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

const FinderWindow = WindowWrapper(Finder, "finder")

export default FinderWindow