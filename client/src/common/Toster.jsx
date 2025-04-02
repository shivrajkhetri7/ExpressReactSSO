import React from 'react';

import { ToastContainer } from 'react-toastify';

export default function Toaster(props) {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition={Bounce}
        />
    );
}