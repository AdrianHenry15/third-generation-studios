export default function MusicPage() {
    return (
        <div className="flex justify-center bg-black">
            <iframe src={`https://player.beatstars.com/?storeId=${process.env.BEATSTORE_ID}`} width="100%" height="800" />
        </div>
    );
}
