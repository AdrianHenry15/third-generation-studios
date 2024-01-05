import Row from "@/components/layout/row";
import VideoPlayer from "@/components/video-player";

export default function HomePage() {
    return (
        <div>
            <VideoPlayer src="/web-nodes.mp4" />
            <Row />
        </div>
    );
}
