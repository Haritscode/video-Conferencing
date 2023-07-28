// A custom value for styling input of otp which is a to configure the external liberary. 

interface innerTypes{
   width:string,
   height:string
}

interface otpInputStylesTypes{
   "450px":innerTypes,
   "650px":innerTypes,
   "750px":innerTypes,
   "1200px":innerTypes,
   "1400px":innerTypes
   
}

const otpInputStyles:otpInputStylesTypes={
   "450px":{
    width:"20px",
    height:"20px"
   },
   "650px":{
      width:"25px",
      height:"25px"
   },
   "750px":{
      width:"30px",
      height:"30px"
   },
   "1200px":{
      width:"35px",
      height:"35px"
   },
   "1400px":{
    width:"40px",
    height:"40px"
   }
}
export default otpInputStyles;