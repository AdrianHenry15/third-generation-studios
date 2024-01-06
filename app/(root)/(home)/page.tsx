import Row from "@/components/layout/row";
import VideoPlayer from "@/components/video-player";
import { WebsiteProjects } from "@/lib/projects";

export default function HomePage() {
    return (
        <div>
            <VideoPlayer src="/web-nodes.mp4" />
            <Row item={WebsiteProjects} />
        </div>
    );
}
