export const wrapperStyles = ({ theme }) => ({
  backgroundColor: theme.headerColor,
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: 0
});

export const inputStyles = ({ theme }) => ({
  background: theme.inputColor,
  borderRadius: "3px",
  border: "transparent",
  width: "100%",
  padding: "10px",
  lineHeight: 1.5,
  outline: 0
});

export const suggestionWrapperStyles = ({ theme }) => ({
  position: "absolute",
  background: theme.inputColor,
  border: `1px solid ${theme.headerColor}`,
  borderRadius: "0 0 3px 3px",
  top: "100%",
  margin: "0",
  left: "0",
  right: "0",
  overflow: "scroll",
  height: "150px",
  listStyle: "none",
  padding: 0
});

export const suggestionStyle = ({ theme, isActive }) => ({
  padding: "10px 10px",
  backgroundColor: isActive ? theme.hoverColor : "",
  cursor: "pointer"
});
