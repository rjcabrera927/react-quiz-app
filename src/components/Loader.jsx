import { Bars } from 'react-loader-spinner';

function Loader() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <Bars
        height='80'
        width='80'
        color='#fff'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
}

export default Loader;
