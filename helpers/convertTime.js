function convertTime(startPoint,endPoint){
  let start =startPoint.getTime()
  let end =endPoint.getTime()
  let result= end - start

 let realTime= new Date(result).getMinutes()

 
 return realTime  

}

