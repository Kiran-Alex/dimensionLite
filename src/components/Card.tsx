

interface cardProps  {
    image  :  React.ReactNode,
    title :  string,
    connected  : boolean,
    url? : string,
    loading? : boolean
}

const Card:React.FC<cardProps> = ({image,title,connected,loading}) => {
  return ( 
  <>
  <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 hover:bg-gray-100 cursor-pointer">
  <div className="p-6 flex flex-col justify-center items-center">
  {image}
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    {title}
    </h5>
      {loading == true &&  <span className="bg-gray-200 animate-pulse w-2/5 h-6" ></span>  }
     {connected == true && <span className="text-green-400" >Connected</span> }
     {connected == false && loading==false && <span className="text-gray-500">Not Connected</span>}
  </div>
   
</div> 
  </>
  )
}

export default Card