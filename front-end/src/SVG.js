import React from "react"

const svg = {

  Copy() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M768 832a128 128 0 01-128 128H192A128 128 0 0164 832V384a128 128 0 01128-128v64a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64h64z"
        ></path>
        <path
          fill="currentColor"
          d="M384 128a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64V192a64 64 0 00-64-64H384zm0-64h448a128 128 0 01128 128v448a128 128 0 01-128 128H384a128 128 0 01-128-128V192A128 128 0 01384 64z"
        ></path>
      </svg>
    );
  },

  Update() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
      >
        <path d="M14 11.51h2.42a1 1 0 00.71-.29l4.58-4.58a1 1 0 000-1.42L19.29 2.8a1 1 0 00-1.42 0l-4.58 4.58a1.05 1.05 0 00-.29.71v2.42a1 1 0 001 1zm1-3l3.58-3.58 1 1L16 9.51h-1zm6 2a1 1 0 00-1 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V8.9l5.88 5.89a3 3 0 004.27 0 1 1 0 000-1.4 1 1 0 00-1.43 0 1 1 0 01-1.4 0l-5.91-5.9H10a1 1 0 000-2H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3v-7a1 1 0 00-1-1z"></path>
      </svg>
    );
  },

  Packge() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-box"
        viewBox="0 0 16 16"
      >
        <path d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z"></path>
      </svg>
    );
  },

  Share() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-share-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5z"></path>
      </svg>
    );
  },

  Cloud() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-cloud-arrow-up-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 2a5.53 5.53 0 00-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 01-.708.708L8.5 6.707V10.5a.5.5 0 01-1 0V6.707L6.354 7.854a.5.5 0 11-.708-.708l2-2a.5.5 0 01.708 0l2 2z"></path>
      </svg>
    );
  },

  Plus() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-circle"
        color="#29B474"
        viewBox="0 0 16 16"
      >
        <path
          fill="#29b474"
          d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
        ></path>
        <path
          fill="#29b474"
          d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"
        ></path>
      </svg>
    );
  },

  Minus() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-minus-circle"
        color="#EB5757"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12L16 12"></path>
      </svg>
    );
  },


  ArrowRight() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4 12a1 1 0 001 1h7.59l-2.3 2.29a1 1 0 000 1.42 1 1 0 001.42 0l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33l-4-4a1 1 0 10-1.42 1.42l2.3 2.29H5a1 1 0 00-1 1zM17 2H7a3 3 0 00-3 3v3a1 1 0 002 0V5a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3z"></path>
      </svg>
    );
  },

  Cube() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 13H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1zm-1 7H4v-5h5zM21 2h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zm-1 7h-5V4h5zm1 4h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1zm-1 7h-5v-5h5zM10 2H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zM9 9H4V4h5z"></path>
      </svg>
    );
  },


  Folder() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 5.5h-6.28l-.32-1a3 3 0 00-2.84-2H5a3 3 0 00-3 3v13a3 3 0 003 3h14a3 3 0 003-3v-10a3 3 0 00-3-3zm1 13a1 1 0 01-1 1H5a1 1 0 01-1-1v-13a1 1 0 011-1h4.56a1 1 0 01.95.68l.54 1.64a1 1 0 00.95.68h7a1 1 0 011 1z"></path>
      </svg>
    );
  },

  ArrowDown() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17 9.17a1 1 0 00-1.41 0L12 12.71 8.46 9.17a1 1 0 00-1.41 0 1 1 0 000 1.42l4.24 4.24a1 1 0 001.42 0L17 10.59a1 1 0 000-1.42z"></path>
      </svg>
    );
  },

  People() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12.3 12.22A4.92 4.92 0 0014 8.5a5 5 0 00-10 0 4.92 4.92 0 001.7 3.72A8 8 0 001 19.5a1 1 0 002 0 6 6 0 0112 0 1 1 0 002 0 8 8 0 00-4.7-7.28zM9 11.5a3 3 0 113-3 3 3 0 01-3 3zm9.74.32A5 5 0 0015 3.5a1 1 0 000 2 3 3 0 013 3 3 3 0 01-1.5 2.59 1 1 0 00-.5.84 1 1 0 00.45.86l.39.26.13.07a7 7 0 014 6.38 1 1 0 002 0 9 9 0 00-4.23-7.68z"></path>
      </svg>
    );
  },

  Message() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 11a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm4 0a1 1 0 101 1 1 1 0 00-1-1zm-4-9A10 10 0 002 12a9.89 9.89 0 002.26 6.33l-2 2a1 1 0 00-.21 1.09A1 1 0 003 22h9a10 10 0 000-20zm0 18H5.41l.93-.93a1 1 0 00.3-.71 1 1 0 00-.3-.7A8 8 0 1112 20z"></path>
      </svg>
    );
  },

  Star() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 9.67a1 1 0 00-.86-.67l-5.69-.83L12.9 3a1 1 0 00-1.8 0L8.55 8.16 2.86 9a1 1 0 00-.81.68 1 1 0 00.25 1l4.13 4-1 5.68a1 1 0 001.47 1.08l5.1-2.67 5.1 2.67a.93.93 0 00.46.12 1 1 0 00.59-.19 1 1 0 00.4-1l-1-5.68 4.13-4A1 1 0 0022 9.67zm-6.15 4a1 1 0 00-.29.88l.72 4.2-3.76-2a1.06 1.06 0 00-.94 0l-3.76 2 .72-4.2a1 1 0 00-.29-.88l-3-3 4.21-.61a1 1 0 00.76-.55L12 5.7l1.88 3.82a1 1 0 00.76.55l4.21.61z"></path>
      </svg>
    );
  },

  ArrowLeft() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17 11H9.41l3.3-3.29a1 1 0 10-1.42-1.42l-5 5a1 1 0 00-.21.33 1 1 0 000 .76 1 1 0 00.21.33l5 5a1 1 0 001.42 0 1 1 0 000-1.42L9.41 13H17a1 1 0 000-2z"></path>
      </svg>
    );
  },

  Home() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 8l-6-5.26a3 3 0 00-4 0L4 8a3 3 0 00-1 2.26V19a3 3 0 003 3h12a3 3 0 003-3v-8.75A3 3 0 0020 8zm-6 12h-4v-5a1 1 0 011-1h2a1 1 0 011 1zm5-1a1 1 0 01-1 1h-2v-5a3 3 0 00-3-3h-2a3 3 0 00-3 3v5H6a1 1 0 01-1-1v-8.75a1 1 0 01.34-.75l6-5.25a1 1 0 011.32 0l6 5.25a1 1 0 01.34.75z"></path>
      </svg>
    );
  },

  Magnifier() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <circle
          cx="8.26"
          cy="8.26"
          r="7.482"
          stroke="#2F80ED"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        ></circle>
        <path
          stroke="#2F80ED"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.464 13.852l2.933 2.926"
        ></path>
      </svg>
    );
  },

  Lock() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 13a1.49 1.49 0 00-1 2.61V17a1 1 0 002 0v-1.39A1.49 1.49 0 0012 13zm5-4V7A5 5 0 007 7v2a3 3 0 00-3 3v7a3 3 0 003 3h10a3 3 0 003-3v-7a3 3 0 00-3-3zM9 7a3 3 0 016 0v2H9zm9 12a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1h10a1 1 0 011 1z"></path>
      </svg>
    );
  },

  Eye() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 000 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 000-.8zM12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6zm0-10a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"></path>
      </svg>
    );
  },

  Pen() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 7.24a1 1 0 00-.29-.71l-4.24-4.24a1 1 0 00-.71-.29 1 1 0 00-.71.29l-2.83 2.83L2.29 16.05a1 1 0 00-.29.71V21a1 1 0 001 1h4.24a1 1 0 00.76-.29l10.87-10.93L21.71 8a1.19 1.19 0 00.22-.33 1 1 0 000-.24.7.7 0 000-.14zM6.83 20H4v-2.83l9.93-9.93 2.83 2.83zM18.17 8.66l-2.83-2.83 1.42-1.41 2.82 2.82z"></path>
      </svg>
    );
  },

  Delete() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z"></path>
      </svg>
    );
  }
};


export default svg;