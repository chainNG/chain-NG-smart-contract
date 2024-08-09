import React from "react";

export const NavBurger = (props) => {
  return (
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="0.677643" width="32" height="3" fill="currentcolor" />
      <rect y="6.67764" width="32" height="3" fill="currentcolor" />
      <rect y="12.6776" width="32" height="3" fill="currentcolor" />
    </svg>
  );
};

export const NavClose = (props) => {
  return (
    <svg
      width="32"
      height="27"
      viewBox="0 0 32 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="5.1582"
        y="24.5518"
        width="32"
        height="3"
        transform="rotate(-45.5773 5.1582 24.5518)"
        fill="currentcolor"
      />
      <rect
        x="6.90088"
        y="1.70139"
        width="32"
        height="3"
        transform="rotate(44.4227 6.90088 1.70139)"
        fill="currentcolor"
      />
    </svg>
  );
};

export const NavDropdown = (props) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5471 5.80355C16.671 5.68131 16.8381 5.61278 17.0122 5.61278C17.1862 5.61278 17.3533 5.68131 17.4772 5.80355C17.5382 5.86366 17.5867 5.93531 17.6198 6.01433C17.6529 6.09335 17.6699 6.17816 17.6699 6.26383C17.6699 6.34949 17.6529 6.4343 17.6198 6.51332C17.5867 6.59234 17.5382 6.66399 17.4772 6.7241L9.96459 14.1626C9.84068 14.2848 9.67362 14.3534 9.49957 14.3534C9.32551 14.3534 9.15845 14.2848 9.03454 14.1626L1.52194 6.7241C1.46091 6.66399 1.41243 6.59234 1.37935 6.51332C1.34626 6.4343 1.32922 6.34949 1.32922 6.26383C1.32922 6.17816 1.34626 6.09335 1.37935 6.01433C1.41243 5.93531 1.46091 5.86366 1.52194 5.80355C1.64585 5.68131 1.81291 5.61278 1.98697 5.61278C2.16103 5.61278 2.32808 5.68131 2.45199 5.80355L9.50004 12.5875L16.5471 5.80355Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export const LoadingAnimation = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const ArrowRight = (props) => {
  return (
    <svg
      width="25"
      height="16"
      viewBox="0 0 25 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9H24V7H0V9Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export const Star = () => {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 0L6.73483 3.80041H10.7308L7.49799 6.14919L8.73282 9.94959L5.5 7.60081L2.26718 9.94959L3.50201 6.14919L0.269189 3.80041H4.26517L5.5 0Z"
        fill="#FC7100"
      />
    </svg>
  );
};

