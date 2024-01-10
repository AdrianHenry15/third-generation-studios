import Row from "@/components/layout/rows/website-row";
import { ClientProjects, PersonalProjects, SchoolProjects } from "@/lib/projects";
import MovieSplash from "@/components/layout/movies/movie-splash";

import Lotus from "@/public/music/wlotus.jpg";
import Search from "@/components/search";

export default function MoviePicksPage() {
    const CarouselClient = [...ClientProjects, ...ClientProjects, ...ClientProjects];
    const CarouselPersonal = [...PersonalProjects, ...PersonalProjects, ...PersonalProjects];
    const CarouselSchool = [...SchoolProjects, ...SchoolProjects, ...SchoolProjects];
    return (
        <div className="bg-black h-screen">
            <Search />
            <h5 className="font-semibold text-4xl text-white text-center mb-2">Only 5 Star Movies</h5>
            <p className="text-gray-500 text-sm text-center">(4 star movies also included)</p>
            <MovieSplash src={Lotus} name="" />
            <Row name="Client Websites" item={CarouselClient} />
            <Row name="Personal Projects" item={CarouselPersonal} />
            <Row name="School Projects" item={CarouselSchool} />
        </div>
    );
}
