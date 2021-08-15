import user from "../asset/sample.jpg";

const ContactCard = ({ contactList }) => {
  
  return (
    <>
      {contactList?.map((contact, index) => (
        <figure key={index} className="bg-white h-80 w-80 rounded-lg shadow-md pt-7">
          <img
            alt="user"
            src={contact.picture.large}
            className="w-32 h-32 rounded-full mx-auto"
          />
          <figcaption className="text-center mt-5">
            <p className="text-xl text-gray-700 font-semibold mb-2">
              {contact.name.first} {contact.name.last}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Email : </span>
              {contact.email}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Phone : </span>{contact.phone}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">City : </span>{contact.location.city}
            </p>
          </figcaption>
        </figure>
      ))}
    </>
  );
};

export default ContactCard;
