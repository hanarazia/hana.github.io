import React from "react";

const contactItems = [
  {
    title: "email",
    icon: "/3.png", 
    link: "mailto:hanarjahangiri@gmail.com",
  },
  {
    title: "linkedin",
    icon: "/8.png",
    link: "https://www.linkedin.com/in/hanarj/",
  },
  {
    title: "resume",
    icon: "/6.png",
    link: "/resume.pdf",
  },
];

const Contact = () => {
  return (
    <div className="contact-container">
      {contactItems.map((item, index) => (
        <div
          className="contact-slot"
          key={index}
          onClick={() => window.open(item.link, "_blank")}
        >
          <div className="contact-header">
            <img className="contact-icon" src={item.icon} alt={`${item.title} icon`} />
            <div className="contact-title-and-description">
              <div className="contact-title">{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
