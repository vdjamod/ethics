import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="bg-white py-4 border-t border-gray-200 fixed inset-x-0 bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <Typography color="gray" className="font-normal text-gray-700">
            &copy; 2024{" "}
            <a href="/" className="hover:text-blue-500 transition-colors">
              Ethics Social Hub
            </a>
          </Typography>
          <ul className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <li>
              <Typography
                as="a"
                href="/aboutus"
                color="gray"
                className="font-normal transition-colors hover:text-blue-500"
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="/license"
                color="gray"
                className="font-normal transition-colors hover:text-blue-500"
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="https://github.com/hbsolanki/Ethics-Explore_Travel_Social_Hub"
                color="gray"
                className="font-normal transition-colors hover:text-blue-500"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="/contactus"
                color="gray"
                className="font-normal transition-colors hover:text-blue-500"
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
