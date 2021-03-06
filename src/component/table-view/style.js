export const containerStyle = ({ theme }) => {
  return {
    display: 'flex',
    flex: '1',
    maxWidth: '700px',
    flexDirection: 'column',
    lineHeight: 2
  };
};

export const rowStyle = ({ theme }) => {
  return {
    alignSelf: "center",
    display: 'flex',
    width: '100%',
    border: '1px solid #000',
    borderTop: 0,
    padding:'2px 10px',
    '&:first-of-type': {
        borderTop: '1px solid #000'
    }
  };
};

export const keyStyle = ({ theme }) => {
  return {
    flex:"1"
  };
};
export const valueStyle = ({ theme }) => {
  return {
    flex:"1 1"
  };
};
