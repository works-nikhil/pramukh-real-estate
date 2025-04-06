import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useTheme } from "next-themes";

const BrandMarquee = () => {
  // Create an array of 5 items to duplicate the logo for a fuller marquee
  const logoItemsWhite = Array(5).fill([
    { name: 'Brand Logo 1', logo: '/logos/white1.png' },
    { name: 'Brand Logo 3', logo: '/logos/white3.png' },
    { name: 'Brand Logo 4', logo: '/logos/white4.png' },
    { name: 'Brand Logo 5', logo: '/logos/white5.png' },
    { name: 'Brand Logo 6', logo: '/logos/white6.png' },
    { name: 'Brand Logo 7', logo: '/logos/white7.png' },
    { name: 'Brand Logo 8', logo: '/logos/white8.png' },
    { name: 'Brand Logo 9', logo: '/logos/white9.png' },
    { name: 'Brand Logo 10', logo: '/logos/white10.png' },
    { name: 'Brand Logo 11', logo: '/logos/white11.png' },
    { name: 'Brand Logo 12', logo: '/logos/white12.png' },
    { name: 'Brand Logo 13', logo: '/logos/white13.png' },
  ]).flat();

  const logoItemsBlack = Array(5).fill([
    { name: 'Brand Logo 1', logo: '/logos/black1.png' },
    { name: 'Brand Logo 2', logo: '/logos/black2.png' },
    { name: 'Brand Logo 3', logo: '/logos/black3.png' },
    { name: 'Brand Logo 4', logo: '/logos/black4.png' },
    { name: 'Brand Logo 5', logo: '/logos/black5.png' },
    { name: 'Brand Logo 6', logo: '/logos/black6.png' },
    { name: 'Brand Logo 7', logo: '/logos/black7.png' },
    { name: 'Brand Logo 8', logo: '/logos/black8.png' },
    { name: 'Brand Logo 9', logo: '/logos/black9.png' },
    { name: 'Brand Logo 10', logo: '/logos/black10.png' },
    { name: 'Brand Logo 11', logo: '/logos/black11.png' },
    { name: 'Brand Logo 12', logo: '/logos/black12.png' },
    { name: 'Brand Logo 13', logo: '/logos/black13.png' },
  ]).flat();

  const { theme, setTheme } = useTheme("dark");
  const [mounted, setMounted] = useState(false);
  const logoItems = theme === 'dark' ? logoItemsWhite : logoItemsBlack;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className="mt-10 laptop:mt-30 p-2 laptop:p-0 relative">
        {theme === 'dark' ? (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-10"></div>
          </>
        ) : (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          </>
        )}
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          direction="left"
          className="py-4"
        >
          {logoItems.map((_, index) => (
            <div key={index} className="m-10 inline-flex items-center">
              <Image
                src={_.logo}
                alt={_.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain filter dark:brightness-0 dark:invert"
              />
            </div>
          ))}
        </Marquee>
      </div>
    )
  );
};

export default BrandMarquee;