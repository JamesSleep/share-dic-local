import React from 'react';
import Head from "next/head";
import DaumPostcode from 'react-daum-postcode';

const Postcode = ({ visible=Boolean, setVisible=Function, setState=Function }) => {
  const handleComplete = (data) => {
    console.log(data);
    const {
      zonecode: zipcode, 
      roadAddress: address1 
    } = data;
    setVisible(false);
    setState(state => {
      return { ...state, zipcode, address1 }
    });
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/local/Postcode.css" />
      </Head>
      { visible && (
        <div className="modal_bg">
          <div className="post_cont">
            <DaumPostcode
              onComplete={handleComplete}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Postcode;