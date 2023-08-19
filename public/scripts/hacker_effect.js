const useHackerEffect = (element) => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%^!";
    const actualText = element.innerText
    const maxIterations = actualText.length 
    let itr = -1
    let i = -1
    return (speed=50)=> {
        const interval = setInterval(()=> {
          if(itr >= maxIterations)
          {
              itr = -1;
              clearInterval(interval)
              return
          }
          element.innerText = actualText.split("").map((e, idx)=>{
              if(itr >=  idx) return actualText[idx]
              return alphabets[Math.round(Math.random() * alphabets.length)]
          }).join("");
           i += 1;
           if(i % 5 == 0) itr += 1
        }, speed)
    }
}
