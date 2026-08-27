import React from "react";

const ContactItem = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Icon size={16} className="text-slate-500" />
      <span>{text}</span>
    </div>
  );
};

export default ContactItem;