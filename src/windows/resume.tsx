import { Download } from "lucide-react"
import { pdfjs, Document, Page } from 'react-pdf';

import WindowControls from "../components/window-controls"
import WindowWrapper from "../hoc/window-wrapper"

import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>
                <a
                    href="files/resume.pdf"
                    download
                    className="cursor-pointer"
                    title="Download resume"
                >
                    <Download className="icon" />
                </a>
            </div>
            <Document file="files/resume.pdf" >
                <Page pageNumber={1} renderTextLayer={false}
                    renderAnnotationLayer={false} />
            </Document>
        </>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow