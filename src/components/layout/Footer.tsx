import { Copyright } from "lucide-react";
import Typography from "@/components/general/Typography";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-6 dark:bg-gray-900">
      <div className="flex items-center justify-center gap-1">
        <Typography className="flex items-center" variant="body3">
          <Copyright className="mr-1 inline-block h-4 w-4" />
          {new Date().getFullYear()} | Portafolio con React + Vite
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
