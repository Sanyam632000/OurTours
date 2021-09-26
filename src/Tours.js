import React, { Component } from 'react';
import Tour from './Tour';

const Tours =({tour})=>{
    return <>
      {tour.map((tours) =>{
        return <Tour key={tour.id} {...tour}></Tour>
      })}
    </>
    }

    export default Tours;