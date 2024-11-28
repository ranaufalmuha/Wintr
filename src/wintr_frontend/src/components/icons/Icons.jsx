import React from 'react';

// LinkIcon Component
export const LinkIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.1625 18.4876L13.4417 19.2084C11.053 21.5971 7.18019 21.5971 4.79151 19.2084C2.40283 16.8198 2.40283 12.9469 4.79151 10.5583L5.51236 9.8374"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M9.8374 14.1625L14.1625 9.8374"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M9.8374 5.51236L10.5583 4.79151C12.9469 2.40283 16.8198 2.40283 19.2084 4.79151M18.4876 14.1625L19.2084 13.4417C20.4324 12.2177 21.0292 10.604 20.9988 9"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

// DotsIcon Component
export const DotsIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`} // Use text-current for inheriting text color
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z"
            fill="currentColor" // Use currentColor for fill
        />
        <path
            d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z"
            fill="currentColor" // Use currentColor for fill
        />
        <path
            d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"
            fill="currentColor" // Use currentColor for fill
        />
    </svg>
);

// LogoutIcon Component
export const LogoutIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`} // Use text-current for inheriting text color
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15 12H3.62"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
            stroke="currentColor" // Use currentColor for stroke
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// DeleteIcon Component
export const DeleteIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 576 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7L288 480l9.4 0L512 480c17.7 0 32-14.3 32-32s-14.3-32-32-32l-124.1 0L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416l-9.4 0-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
    </svg>
);

// Globe Component
export const GlobeIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" />
    </svg>
);

export const WalletIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l336 0c48.6 0 88-39.4 88-88l0-176c0-48.6-39.4-88-88-88l-304 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l304 0c22.1 0 40 17.9 40 40l0 176c0 22.1-17.9 40-40 40L88 432c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l368 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32zM384 336a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
    </svg>
);

export const SnowIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M224 0c13.3 0 24 10.7 24 24l0 46.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-57 57 0 76.5 66.2-38.2 20.9-77.8c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4L373 142.2l37.1-21.4c11.5-6.6 26.2-2.7 32.8 8.8s2.7 26.2-8.8 32.8L397 183.8l31.5 8.4c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-77.8-20.9L272 256l66.2 38.2 77.8-20.9c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4L397 328.2l37.1 21.4c11.5 6.6 15.4 21.3 8.8 32.8s-21.3 15.4-32.8 8.8L373 369.8l8.4 31.5c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-20.9-77.8L248 297.6l0 76.5 57 57c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-23-23 0 46.1c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-46.1-23 23c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57 0-76.5-66.2 38.2-20.9 77.8c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4L75 369.8 37.9 391.2c-11.5 6.6-26.2 2.7-32.8-8.8s-2.7-26.2 8.8-32.8L51 328.2l-31.5-8.4c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l77.8 20.9L176 256l-66.2-38.2L31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4L51 183.8 13.9 162.4c-11.5-6.6-15.4-21.3-8.8-32.8s21.3-15.4 32.8-8.8L75 142.2l-8.4-31.5c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l20.9 77.8L200 214.4l0-76.5L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L200 24c0-13.3 10.7-24 24-24z" />
    </svg>
);

export const MoonIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
    </svg>
);

export const SunIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        />
    </svg>
);


// Line SubscribeIcon Component
export const SubscribeIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 576 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
    </svg>
);

// MobilePhoneIcon Component
export const MobilePhoneIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64L80 64l0 320 224 0 0-320z" />
    </svg>
);

// AddIcon Component
export const AddIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
    </svg>
);

// ClipboardIcon Component
export const ClipboardIcon = ({ size = 24, className = '' }) => (
    <svg
        className={`text-current ${className}`}
        width={size}
        height={size}
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    </svg>
);