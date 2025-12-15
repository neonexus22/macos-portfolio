import WindowControls from "../components/window-controls"
import { socials } from "../constants"
import WindowWrapper from "../hoc/window-wrapper"

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>
            <div className="p-5 space-y-5">
                <img
                    src="/images/nishant.jpg"
                    className="w-20 h-20 rounded-full"
                    alt="Nishant" />
                <h3>Let's Connect</h3>
                <p>Got an idea? A bug to squash? Or just wanna talk?
                    I'm in.</p>
                <p>I specialize in building high-quality, scalable, user-friendly web applications using modern frontend technologies.
                    With 7+ years of experience, I focus on clean architecture, performance, UI/UX, and maintainability.</p>
                <p>myemail@myemail.com</p>

                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a
                                href={link}
                                title={text}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ContactWindow = WindowWrapper(Contact, "contact")

export default ContactWindow