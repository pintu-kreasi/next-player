import React, { ReactNode } from "react";

export interface ISkillItem {
	children?: ReactNode;
  title: string;
  value: number;
}

const SkillItem = (props: ISkillItem) => {
    let bg = 'bg-success';
    if (props.value < 70) bg = 'bg-warning';
    if (props.value < 40) bg = 'bg-danger';

    return (
      <div className="row align-items-center">
        <div className="col-4">
          <strong>{props.title}</strong>  
        </div>
        <div className="col-6">
          <div className="progress">
            <div className={"progress-bar "+bg} role="progressbar" style={{"width": props.value+"%"}} />
          </div>
        </div>
        <div className="col-2">{props.value}</div>
      </div> 
    )
}

export default SkillItem