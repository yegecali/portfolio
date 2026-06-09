import { SocialIcon } from "react-social-icons";
import { usePortfolio } from "@/hooks/usePortfolio";

const SocialIcons = () => {
  const { socialLinks } = usePortfolio();

  return (
    <div className="flex gap-4">
      {socialLinks.map((socialLink, index) => (
        <SocialIcon
          key={index}
          url={socialLink.url}
          target="_blank"
          rel="noopener noreferrer"
          fgColor="currentColor"
          bgColor="transparent"
          className="transition-transform duration-300 hover:scale-110"
          style={{
            width: "40px",
            height: "40px",
            color: "currentColor",
          }}
        />
      ))}
    </div>
  );
};

export default SocialIcons;
