/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import clsx from "clsx";
import { locations, type LocationChildrenType, type LocationType } from "../constants"
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    useGSAP(() => {
        Draggable.create(".folder")
    })

    const handleOpenProjectFilder = (project: LocationChildrenType) => {
        const folderAsLocation: LocationType = {
            id: project.id,
            name: project.name,
            icon: project.icon,
            kind: project.kind,
            children: project.children ?? []
        };
        setActiveLocation(folderAsLocation)
        openWindow("finder", folderAsLocation);
    }

    return (
        <section id="home">
            <ul>
                {projects.map(project => (
                    <li key={project.id} className={clsx("group folder",
                        project.windowPosition
                    )}
                        onClick={() => handleOpenProjectFilder(project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Home