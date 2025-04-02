interface ContactInputProps {
  label: string;
  name: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  widthFull?: boolean;
  placeholder?: string;
}

const ContactInput: React.FC<ContactInputProps> = ({
  label,
  name,
  value,
  disabled = false,
  onChange,
  widthFull,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className={`relative w-full`}>
      <label
        htmlFor={name}
        className="absolute -top-10 left-0 text-black text-lg transition-all"
      >
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${
          widthFull ? "w-full" : "w-80"
        } border-0 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none focus:ring-0 text-lg`}
      />
    </div>
  );
};

export default ContactInput;
