  const saturate=document.getElementById('saturate')
  const contrast=document.getElementById('contrast')
  const Brightness=document.getElementById('Brightness')
  const sepia=document.getElementById('sepia')
  const huerotate=document.getElementById('huerotate')
  const Blur=document.getElementById('Blur')
  const Grayscale=document.getElementById('Grayscale')
  const upload =document.getElementById('upload')
  const download =document.getElementById('download')
  const img =document.getElementById('img')
  const reset=document.querySelector('span')
  const img_box=document.querySelector('.img-box')
  const canvas=document.getElementById('canvas')
  const ctx = canvas.getContext('2d') 
 
    // if the window is not loaded the buttons download , reset should not be displayed
    window.addEventListener('load',()=>{
      download.style.display='none'
      reset.style.display='none'
      img_box.style.display='none'
    })

    //filereader api
    // const reader=new FileReader()
    //reader.readAsText(input.files[0])
    //reader.readAsDatURL(...)*/          
      function resetvalue()
      { 
        ctx.filter='none'
        ctx.drawImage(img,0,0,canvas.width,canvas.height)

        saturate.value='100'
        contrast.value='100'
        Brightness.value='100'
        sepia.value='0'
        huerotate.value='0'
        Blur.value='0'
        Grayscale.value='0'

      }

       upload.onchange=function(e){
            resetvalue();

            download.style.display='block';
            reset.style.display='block';
            img_box.style.display='block'; 
              // intialize file reader
            let reader=new FileReader();

            reader.readAsDataURL(upload.files[0]);

              reader.onload=function(){
              img.src=reader.result;
            } 
             img.onload =function(){
                canvas.height=img.height
                canvas.width=img.width
                ctx.drawImage(img,0,0,canvas.width,canvas.height)
                img.style.display='none'

              }
            }

//SO NOW let's apply our filters
// using this method : we are not able to apply two filters at the same time
// so we have to apply it on a container 

/*window.addEventListener('input',()=>{
  img.style.filter=`saturate(${saturate.value}%)`;})
  
contrast.addEventListener('input',()=>{
  img.style.filter=`contrast(${contrast.value}%)`;
})*/



let filters= document.querySelectorAll("ul li input")

filters.forEach(filter=>{
  filter.addEventListener('input',function(){
    ctx.filter=
                      `saturate(${saturate.value}%)
                       contrast(${contrast.value}%)
                       Brightness(${Brightness.value}%)
                       sepia(${sepia.value}%)
                       hue-rotate(${huerotate.value}deg)
                       Blur(${Blur.value}px)
                       Grayscale(${Grayscale.value})

              
                      `
        ctx.drawImage(img,0,0,canvas.width,canvas.height)

        
  })
})


// reset the filters 
reset.addEventListener('click',()=>resetvalue())
download.addEventListener('click',()=>{
  download.href=canvas.toDataURL('image/jpeg');
 
  
})