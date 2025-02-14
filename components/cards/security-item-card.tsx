import Image, { StaticImageData } from "next/image";

interface SecurityItemCardProps {
    imageSrc: string | StaticImageData;
    imageAlt: string;
    title: string;
    description: string;
}

const SecurityItemCard = ({ imageSrc, imageAlt, title, description }: SecurityItemCardProps) => (
    <div className="security-item p-8 bg-white text-gray-900 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-4">
            <Image src={imageSrc} alt={imageAlt} width={60} height={60} />
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-sm">{description}</p>
    </div>
);

export default SecurityItemCard;
