import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const AppBreadCrumb = ({ match }) => {
  const path = match.path;
  const page = path.split("/")[1];
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/"}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{page}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadCrumb;
