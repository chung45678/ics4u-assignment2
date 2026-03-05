import './style.css'




(document.getElementById("solveCubic")as HTMLButtonElement).addEventListener("click", () => {
  const a = Number(document.getElementById("a-value").value)
  const b = Number(document.getElementById("b-value").value)
  const c = Number(document.getElementById("c-value").value)
  const d = Number(document.getElementById("d-value").value)
  
  let p = (3 * a * c - b**2) / (3 * a**2)
  let q = ((27 * a * a * d) - (9*a*b*c) + (2*b**3)) / (27*a**3)

  console.log(p)
  console.log(q)
  
  const discriminant = (q / 2)**2 + (p/3)**3
  console.log(discriminant)
  console.log("cardano" + cardanosMethod(a,b,p,q))

  if (discriminant < 0)[
    
  ]
})

function cardanosMethod(a: number, b: number, p : number, q: number){
  return (
    Math.cbrt (
      -q / 2 + Math.sqrt((q/2)**2) + ((p/3)**3) + Math.cbrt(-q/2 - ((q/2)**2) + (p/3)**3) - (b/3*a)
    )
  )
}

function
