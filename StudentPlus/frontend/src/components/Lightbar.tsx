import React from 'react';

const Lightbar: React.FC = () => {
  return (
    <div className="flex flex-col items-center pt-[40px] md:pt-[230px]">
      <div className="relative z-0 flex min-h-[450px] w-full flex-col items-center justify-start overflow-hidden rounded-md bg-slate-950">
        <div className="relative isolate z-0 flex w-full flex-1 scale-y-75 items-center justify-center md:scale-y-110">
          <div
            className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[50vw] overflow-visible from-[#18ACFE] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
            style={{
              backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
              opacity: 1,
              width: '50vw',
            }}
          >
            <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
            <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]"></div>
          </div>
          <div
            className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[50vw] from-transparent via-transparent to-[#18ACFE] text-white [--conic-position:from_290deg_at_center_top]"
            style={{
              backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
              opacity: 1,
              width: '50vw',
            }}
          >
            <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]"></div>
            <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
          </div>
          <div
            className="absolute inset-auto z-50 h-36 -translate-y-1/2 rounded-full bg-[#18ACFE] blur-3xl md:w-[28rem]"
            style={{ opacity: 0.5 }}
          ></div>
          <div
            className="absolute inset-auto z-50 h-0.5 w-[50vw] -translate-y-[7rem] bg-[#18ACFE]"
            style={{ width: '50vw' }}
          ></div>
        </div>
        <div className="relative z-50 flex -translate-y-60 flex-col items-center md:px-5">
          <h1
            className="flex flex-col gap-3 bg-gradient-to-b from-white to-slate-500 to-[80%] bg-clip-text pt-5 text-center text-4xl font-medium tracking-tight text-transparent md:gap-5 md:text-7xl"
            style={{ opacity: 1, transform: 'none' }}
          >
            <p className="lamp-1 mt-12 text-[13px] font-medium -tracking-[0.5px] md:mt-0 md:text-[20px]">
              Move Over traditional courses
            </p>
            <div>
              <p className="lamp-2 text-[24px] font-semibold leading-8 -tracking-[1.6px] md:text-[44px] md:font-medium md:leading-[52px]">
                Start Making Progress
              </p>
              <p className="lamp-2 text-[24px] font-semibold leading-8 -tracking-[1.6px] md:text-[44px] md:font-medium md:leading-[52px]">
                with 1:1 Long Term Mentorship
              </p>
            </div>
          </h1>
        </div>
      </div>
      <div
        className="common-sub-frame-box z-[1] -mt-[180px] flex w-full flex-col gap-[23px] md:flex-row md:px-6"
        style={{ opacity: 1, transform: 'none' }}
      >
        <div className="mx-6 items-center rounded-[16px] border border-[#ffffff1f] md:mx-0 md:w-1/3">
          <div className="relative flex items-center justify-center gap-1 overflow-hidden md:flex-col md:pt-4">
            <svg
              width="222"
              height="108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="z-1 absolute mb-2 md:scale-125"
            >
              <g clipPath="url(#30_svg__a)">
                <mask
                  id="30_svg__b"
                  maskUnits="userSpaceOnUse"
                  x="-2"
                  y="-39"
                  width="226"
                  height="149"
                  style={{ maskType: 'luminance' }}
                >
                  <path d="M224-39H-2v149h226V-39Z" fill="#fff"></path>
                  <path d="M50.202 " fill="#fff" fillOpacity="0.12"></path>
                </mask>
              </g>
              <defs>
                <clipPath id="30_svg__a">
                  <path fill="#fff" transform="translate(0 -37)" d="M0 0h222v145H0z"></path>
                </clipPath>
              </defs>
            </svg>
            <div className="flex items-center justify-center gap-1 bg-gradient-to-b from-[#18ACFE] to-[#0677B5] bg-clip-text pt-[80px] text-[24px] leading-[40px] md:flex-col md:gap-0 md:pt-5">
              <p className="font-bold text-transparent md:text-[32px]">30%</p>
              <p className="font-medium text-transparent md:text-[32px]">Cheaper</p>
            </div>
          </div>
          <p className="px-1 pb-3 text-center text-[12px] leading-[20px] text-white md:pb-6 md:pt-4 md:text-[14px]">
            Compared to any 6 month course
          </p>
        </div>
        <div className="mx-6 items-center rounded-[16px] border border-[#ffffff1f] md:mx-0 md:w-1/3">
          <div className="relative flex items-center justify-center gap-1 overflow-hidden md:flex-col md:pt-4">
            <svg
              width="140"
              height="105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="z-1 absolute mb-2 md:scale-125"
            >
              <path
                d="M1 73.293v1h80.974V104h36.103V74.293H139V43.659h-20.923V-67H71.88l-.295.465L1.155 44.619 1 44.864v28.429Zm37.915-29.666L82.633-25.68v69.34H38.915v-.032Z"
                stroke="#fff"
                strokeOpacity="0.12"
                strokeWidth="2"
              ></path>
            </svg>
            <div className="flex items-center justify-center gap-1 bg-gradient-to-b from-[#18ACFE] to-[#0677B5] bg-clip-text pt-[80px] text-[24px] leading-[40px] md:flex-col md:gap-0 md:pt-5">
              <p className="font-bold text-transparent md:text-[32px]">4x</p>
              <p className="font-medium text-transparent md:text-[32px]">Results</p>
            </div>
          </div>
          <p className="px-1 pb-3 text-center text-[12px] leading-[20px] text-white md:pb-6 md:pt-4 md:text-[14px]">
            As compared to any online courses
          </p>
        </div>
        <div className="mx-6 items-center rounded-[16px] border border-[#ffffff1f] md:mx-0 md:w-1/3">
          <div className="relative flex items-center justify-center gap-1 overflow-hidden md:flex-col md:pt-4">
            <svg
              width="216"
              height="107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="z-1 absolute mb-2 md:scale-125"
            >
              <g clipPath="url(#50_svg__a)">
                <mask
                  id="50_svg__b"
                  maskUnits="userSpaceOnUse"
                  x="-2"
                  y="-40"
                  width="220"
                  height="149"
                  style={{ maskType: 'luminance' }}
                >
                  <path d="M218-40H-2v149h220V-40Z" fill="#fff"></path>
                  <path
                    d="M139.683 4.147C145.256 3.02 150.205-4 151.686-11.503c1.48-7.503-1.68-14.517-7.253-13.39-5.574 1.127-10.522 8.147-12.004 15.65-1.48 7.503 1.68 14.517 7.254 13.39Z"
                    fill="#fff"
                    fillOpacity="0.12"
                  ></path>
                </mask>
              </g>
              <defs>
                <clipPath id="50_svg__a">
                  <path fill="#fff" transform="translate(0 -39)" d="M0 0h216v146H0z"></path>
                </clipPath>
              </defs>
            </svg>
            <div className="flex items-center justify-center gap-1 bg-gradient-to-b from-[#18ACFE] to-[#0677B5] bg-clip-text pt-[80px] text-[24px] leading-[40px] md:flex-col md:gap-0 md:pt-5">
              <p className="font-bold text-transparent md:text-[32px]">1:1</p>
              <p className="font-medium text-transparent md:text-[32px]">Attention</p>
            </div>
          </div>
          <p className="px-1 pb-3 text-center text-[12px] leading-[20px] text-white md:pb-6 md:pt-4 md:text-[14px]">
            From top mentors in the industry
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lightbar;
