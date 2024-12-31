import React from "react";
import { AdminLayoutHocProps } from "./AdminLayoutHoc";


const AdminContent = (props:AdminLayoutHocProps) => {
  const {contentTitle, contentTitleButton, url} = props

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col">
                  <h1>{ contentTitle }</h1>
                </div>
            </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
            {props.children}
        </div>
      </section>
    </div>
  );
};

export default AdminContent;
