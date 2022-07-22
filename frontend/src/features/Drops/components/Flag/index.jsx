const Flag = ({ text, status }) => {
  return (
    <div className='flex items-center'>
      <span
        className={`w-2 h-2  rounded-full mr-1 ${
          status ? 'bg-dropGreen' : 'bg-dropYellow'
        }`}
      ></span>
      <span
        className={`text-xs ${status ? 'text-dropGreen' : 'text-dropYellow'}`}
      >
        {text}
      </span>
    </div>
  );
};

export default Flag;
