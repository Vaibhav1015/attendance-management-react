const ReactInput = ({
  type,
  name,
  label,
  position,
  error,
  icon,
  register,
  placeholder,
  inputClassName,
  reactInputClassName,
  asterisk,
  onChange,
  onClick,
  value,
  rows,
}) => {
  return (
    <div className={`react-input ${reactInputClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`form-label ${position === "stacked" ? "stacked" : ""}`}
        >
          {label}
          {asterisk && <span className="text-danger asterisk">*</span>}
        </label>
      )}

      <div className="innerInput">
        <input
          className={`form-control ${inputClassName}`}
          type={type}
          name={name}
          {...register}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          value={value}
          rows={rows}
          autocomplete="new-password"
        />

        {icon && <p className="icon">{icon}</p>}
        {/* {icon && <img className="icon" src={icon} alt="icon" />} */}
      </div>

      {error && <p className="text-danger errorMsg">{error}</p>}
    </div>
  );
};

export default ReactInput;
