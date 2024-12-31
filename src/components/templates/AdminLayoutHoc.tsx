// import "../../app/styles/index.scss"
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminControlSidebar from "./AdminControlSidebar";
import AdminContent from "./AdminContent";
import AdminFooter from "./AdminFooter";
import React, { ReactNode } from "react";

/**
 * Main admin layout - A Higher Order Component
 */
export type AdminLayoutHocProps = {
	children?: ReactNode;
	contentTitle: string;
	contentTitleButton: any;
	url: string;
};

const AdminLayoutHoc = (props: AdminLayoutHocProps) => {

	return (
		<>
			<div className="wrapper">
				<AdminHeader />
				<AdminSidebar />
				<AdminContent {...props} />
				<AdminControlSidebar />
				<AdminFooter />
			</div>
		</>
	)
}

export default AdminLayoutHoc