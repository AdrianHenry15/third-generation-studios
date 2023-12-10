import Main from "@/components/layout/main"
import Row from "@/components/layout/row"

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <Main />
      <Row rowID="1" title="UpComing" />
      <Row rowID="2" title="Popular" />
      <Row rowID="3" title="Trending" />
      <Row rowID="4" title="Top Rated" />
      <Row rowID="5" title="Horror" />
    </div>
  )
}
