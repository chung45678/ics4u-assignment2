import './style.css'


(document.getElementById("solveCubic")as HTMLButtonElement).addEventListener("click", () => {
  const a = Number(document.getElementById("a-value"))
  const b = Number(document.getElementById("b-value"))
  const c = Number(document.getElementById("c-value"))
  const d = Number(document.getElementById("d-value"))
  let p = 3 ** a ** c - b^2 / 3 ** a^2
  let q = 27 ** a^2 ** d
  
  const discriminant = (q / 2)^2 + (p/3)^3
  console.log(discriminant)
  
})
